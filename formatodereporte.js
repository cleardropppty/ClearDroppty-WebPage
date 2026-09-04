/*=========================================
        REPORTES.JS
        ClearDrop
=========================================*/
/*=========================================
        SISTEMA DE AUTENTICACIÓN PARA REPORTES
        ClearDrop
=========================================*/

// Configuración de rutas de autenticación
const RUTAS_AUTH_REPORTES = {
  login: 'login.html',
  registro: 'registro.html'
};

/**
 * Valida que el usuario esté autenticado antes de permitir reportes
 * Si no está autenticado, muestra un modal y bloquea la acción
 * @returns {boolean} true si está autenticado, false si no
 */
function validarUsuarioParaReporte() {
  if (!usuarioEstaAutenticado()) {
    mostrarModalAutenticacionRequerida(
      'Crear una cuenta te permite reportar problemas de agua, hacer seguimiento de tus reportes y ayudar a mantener nuestra comunidad más limpia.'
    );
    return false;
  }
  return true;
}
document.addEventListener("DOMContentLoaded", () => {

    /*==============================================
                FORMULARIO
    ==============================================*/

    const formulario = document.getElementById("cdFormularioReporte");


    /*==============================================
                ELEMENTOS
    ==============================================*/

    const descripcion = document.getElementById("cdDescripcion");
    const contador = document.getElementById("cdContadorCaracteres");

    const otroRadio = document.getElementById("cdOtroReporte");
    const otroContainer = document.getElementById("cdOtroContainer");

    const fechaRadio = document.getElementById("cdFechaPersonalizadaRadio");
    const fechaContainer = document.getElementById("cdFechaPersonalizada");

    const dropZone = document.getElementById("cdDropZone");
    const inputImagenes = document.getElementById("cdImagenes");
    const previewContainer = document.getElementById("cdPreviewContainer");
    const imageError = document.getElementById("cdImageError");

    /*==============================================
            VARIABLES
    ==============================================*/

    let imagenesSeleccionadas = [];

    /*==============================================
            CONTADOR
    ==============================================*/

    descripcion.addEventListener("input", () => {

        contador.textContent =
            `${descripcion.value.length} / 600`;

    });

    /*==============================================
            CAMPO OTRO
    ==============================================*/

    document
        .querySelectorAll("input[name='tipo_reporte']")
        .forEach(radio => {

            radio.addEventListener("change", () => {

                if (otroRadio.checked) {

                    otroContainer.classList.add("active");

                } else {

                    otroContainer.classList.remove("active");

                }

            });

        });

    /*==============================================
        FECHA PERSONALIZADA
    ==============================================*/

    document
        .querySelectorAll("input[name='fecha_reporte']")
        .forEach(radio => {

            radio.addEventListener("change", () => {

                if (fechaRadio.checked) {

                    fechaContainer.classList.add("active");

                } else {

                    fechaContainer.classList.remove("active");

                }

            });

        });

    /*==============================================
            DRAG & DROP
    ==============================================*/

    dropZone.addEventListener("click", () => {

        inputImagenes.click();

    });

    dropZone.addEventListener("dragover", e => {

        e.preventDefault();

        dropZone.classList.add("dragover");

    });

    dropZone.addEventListener("dragleave", () => {

        dropZone.classList.remove("dragover");

    });

    dropZone.addEventListener("drop", e => {

        e.preventDefault();

        dropZone.classList.remove("dragover");

        agregarImagenes(e.dataTransfer.files);

    });

    inputImagenes.addEventListener("change", e => {

        agregarImagenes(e.target.files);

    });

    /*==============================================
        AGREGAR IMÁGENES
    ==============================================*/

    function agregarImagenes(files){

        imageError.textContent="";

        [...files].forEach(file=>{

            if(imagenesSeleccionadas.length>=3){

                imageError.textContent=
                "Solo puedes agregar un máximo de 3 imágenes.";

                return;
            }

            if(file.size>5*1024*1024){

                imageError.textContent=
                "Cada imagen debe ser menor a 5 MB.";

                return;
            }

            imagenesSeleccionadas.push(file);

        });

        actualizarVistaPrevia();

    }

    /*==============================================
        VISTA PREVIA
    ==============================================*/

    function actualizarVistaPrevia(){

        previewContainer.innerHTML="";

        imagenesSeleccionadas.forEach((imagen,index)=>{

            const reader=new FileReader();

            reader.onload=e=>{

                const card=document.createElement("div");

                card.className="cd-preview-card";

                card.innerHTML=`

                    <img
                    class="cd-preview-image"
                    src="${e.target.result}">

                    <div class="cd-preview-content">

                        <div class="cd-preview-name">

                            ${imagen.name}

                        </div>

                        <div class="cd-preview-size">

                            ${(imagen.size/1024/1024).toFixed(2)} MB

                        </div>

                        <button
                        type="button"
                        class="cd-preview-remove">

                            Eliminar

                        </button>

                    </div>

                `;

                card
                .querySelector(".cd-preview-remove")
                .addEventListener("click",()=>{

                    imagenesSeleccionadas.splice(index,1);

                    actualizarVistaPrevia();

                });

                previewContainer.appendChild(card);

            };

            reader.readAsDataURL(imagen);

        });

    }

        /*==============================================
                ELEMENTOS DEL MAPA
    ==============================================*/

    const direccionTexto = document.getElementById("cdDireccion");
    const latitudTexto = document.getElementById("cdLatitud");
    const longitudTexto = document.getElementById("cdLongitud");

    const direccionInput = document.getElementById("cdDireccionInput");
    const latitudInput = document.getElementById("cdLatitudInput");
    const longitudInput = document.getElementById("cdLongitudInput");

    const botonUbicacion = document.getElementById("cdUbicacionActual");

    /*==============================================
                INICIALIZAR MAPA
    ==============================================*/

    const mapa = L.map("cdMapa").setView([8.433390, -82.426965], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {

        attribution: "&copy; OpenStreetMap"

    }).addTo(mapa);

    let marcador = null;

    /*==============================================
            BUSCADOR DE DIRECCIONES
    ==============================================*/

    const geocoder = L.Control.geocoder({

        defaultMarkGeocode: false

    })
    .on("markgeocode", function(event){

        const centro = event.geocode.center;

        colocarMarcador(centro.lat, centro.lng);

        mapa.setView(centro,16);

    })
    .addTo(mapa);

    /*==============================================
            CLICK EN EL MAPA
    ==============================================*/

    mapa.on("click", function(event){

        colocarMarcador(

            event.latlng.lat,

            event.latlng.lng

        );

    });

    /*==============================================
            UBICACIÓN ACTUAL
    ==============================================*/

    botonUbicacion.addEventListener("click",()=>{

        if(!navigator.geolocation){

            mostrarError("Tu navegador no soporta geolocalización.");

            return;

        }

        navigator.geolocation.getCurrentPosition(

            posicion=>{

                const lat = posicion.coords.latitude;
                const lng = posicion.coords.longitude;

                colocarMarcador(lat,lng);

                mapa.setView([lat,lng],16);

            },

            ()=>{

                mostrarError("No fue posible obtener tu ubicación.");

            }

        );

    });

    /*==============================================
            COLOCAR MARCADOR
    ==============================================*/

    function colocarMarcador(lat,lng){

        if(marcador){

            marcador.setLatLng([lat,lng]);

        }else{

            marcador = L.marker([lat,lng]).addTo(mapa);

        }

        actualizarUbicacion(lat,lng);

    }

    /*==============================================
        ACTUALIZAR INFORMACIÓN
    ==============================================*/

    function actualizarUbicacion(lat,lng){

        latitudTexto.textContent = lat.toFixed(6);
        longitudTexto.textContent = lng.toFixed(6);

        latitudInput.value = lat;
        longitudInput.value = lng;

        obtenerDireccion(lat,lng);

    }

    /*==============================================
        OBTENER DIRECCIÓN
    ==============================================*/

    function obtenerDireccion(lat,lng){

        fetch(

            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`

        )

        .then(res=>res.json())

        .then(data=>{

            const direccion =

                data.display_name ||

                "Dirección no encontrada";

            direccionTexto.textContent = direccion;

            direccionInput.value = direccion;

        })

        .catch(()=>{

            direccionTexto.textContent =

                "No fue posible obtener la dirección.";

        });

    }

    /*==============================================
            MENSAJES
    ==============================================*/

    function mostrarError(mensaje){

        imageError.textContent = mensaje;

        setTimeout(()=>{

            imageError.textContent="";

        },4000);

    }

        /*==============================================
            ELEMENTOS DEL ENVÍO
    ==============================================*/

    const botonEnviar = document.getElementById("cdEnviarReporte");
    const spinner = document.getElementById("cdSpinner");

    const mensajeError = document.getElementById("cdErrorGeneral");
    const mensajeExito = document.getElementById("cdSuccessGeneral");

    /*==============================================
            VALIDAR FORMULARIO
    ==============================================*/

    function validarFormulario(){

        mensajeError.classList.remove("show");
        mensajeExito.classList.remove("show");

        // Tipo de reporte

        if(!document.querySelector("input[name='tipo_reporte']:checked")){

            return mostrarMensajeError(
                "Selecciona un tipo de reporte."
            );

        }

        // Campo otro

        if(otroRadio.checked){

            const otro = document
                .getElementById("cdOtroInput")
                .value
                .trim();

            if(otro===""){

                return mostrarMensajeError(
                    "Especifica el otro tipo de reporte."
                );

            }

        }

        // Ubicación

        if(latitudInput.value===""){

            return mostrarMensajeError(
                "Selecciona una ubicación en el mapa."
            );

        }

        // Imagen

        if(imagenesSeleccionadas.length===0){

            return mostrarMensajeError(
                "Debes agregar al menos una imagen."
            );

        }

        // Descripción

        if(descripcion.value.trim().length<10){

            return mostrarMensajeError(
                "La descripción es demasiado corta."
            );

        }

        // Fecha

        if(!document.querySelector("input[name='fecha_reporte']:checked")){

            return mostrarMensajeError(
                "Selecciona cuándo ocurrió el incidente."
            );

        }

        if(fechaRadio.checked){

            if(document.getElementById("cdFecha").value===""){

                return mostrarMensajeError(
                    "Selecciona la fecha."
                );

            }

        }

        // Gravedad

        if(!document.querySelector("input[name='gravedad']:checked")){

            return mostrarMensajeError(
                "Selecciona el nivel de gravedad."
            );

        }

        return true;

    }

    /*==============================================
            MENSAJES
    ==============================================*/

    function mostrarMensajeError(texto){

        mensajeError.textContent = texto;

        mensajeError.classList.add("show");

        mensajeError.scrollIntoView({

            behavior:"smooth",

            block:"center"

        });

        return false;

    }

    function mostrarMensajeExito(texto){

        mensajeExito.textContent = texto;

        mensajeExito.classList.add("show");

    }

    /*==============================================
            ENVIAR
    ==============================================*/

    formulario.addEventListener("submit", async function(e){

        e.preventDefault();

        if(!validarFormulario()) return;

        botonEnviar.disabled = true;

        spinner.classList.add("active");

        const datos = new FormData(formulario);

        imagenesSeleccionadas.forEach(imagen=>{

            datos.append("imagenes[]",imagen);

        });

        try{

            const respuesta = await fetch(

                formulario.action,

                {

                    method:"POST",

                    body:datos

                }

            );

            const resultado = await respuesta.json();

            if(resultado.success){

                mostrarMensajeExito(

                    "✅ Tu reporte fue enviado correctamente."

                );

                limpiarFormulario();

            }else{

                throw new Error();

            }

        }catch(error){

            mostrarMensajeError(

                "Ocurrió un error al enviar el reporte. Inténtalo nuevamente."

            );

        }

        spinner.classList.remove("active");

        botonEnviar.disabled=false;

    });

    /*==============================================
        LIMPIAR FORMULARIO
    ==============================================*/

    function limpiarFormulario(){

        formulario.reset();

        descripcion.value="";

        contador.textContent="0 / 600";

        otroContainer.classList.remove("active");

        fechaContainer.classList.remove("active");

        imagenesSeleccionadas=[];

        previewContainer.innerHTML="";

        direccionTexto.textContent="Ninguna ubicación seleccionada.";

        latitudTexto.textContent="--";

        longitudTexto.textContent="--";

        direccionInput.value="";

        latitudInput.value="";

        longitudInput.value="";

        if(marcador){

            mapa.removeLayer(marcador);

            marcador=null;

        }

        mapa.setView([8.9824,-79.5199],13);

        setTimeout(()=>{

            mensajeExito.classList.remove("show");

        },5000);

    }
            /*==============================================
            PROTECCIÓN DE REPORTES - AUTENTICACIÓN
    ==============================================*/

    // Interceptar el envío del formulario para validar autenticación
    formulario.addEventListener('submit', function(e) {
      // Verificar autenticación ANTES de cualquier otra validación
      if (!validarUsuarioParaReporte()) {
        e.preventDefault(); // Bloquear SOLO si no está autenticado
        return false;
      }
      // Si llegó aquí, el usuario está autenticado
      // NO hacer preventDefault aquí, permitir que continúe el flujo normal
    }, true); // Usar capture phase para que se ejecute primero

    // Función para actualizar estado del formulario
    function actualizarEstadoFormulario() {
      const botonEnviar = document.getElementById("cdEnviarReporte");
      if (!usuarioEstaAutenticado()) {
        botonEnviar.title = "Debes iniciar sesión para enviar reportes";
      } else {
        botonEnviar.title = "";
      }
    }

    // Actualizar estado del formulario al cargar
    actualizarEstadoFormulario();

    // Actualizar si cambia la autenticación (multi-tab)
    window.addEventListener('storage', () => {
      actualizarEstadoFormulario();
    });

});