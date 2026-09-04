//====================================================
// CLEARDROP - EMAILJS
// Parte 1
//====================================================
//====================================================
// CLEARDROP - VALIDACIÓN DE AUTENTICACIÓN
//====================================================

/**
 * Verifica que el usuario esté autenticado antes de enviar
 * Esta función se ejecutará en el evento submit
 */
function verificarAutenticacionEnvio() {
  if (!usuarioEstaAutenticado()) {
    mostrarModalAutenticacionRequerida(
      'Para enviar un reporte necesitas tener una cuenta en ClearDrop. Inicia sesión o crea una cuenta para continuar.'
    );
    return false;
  }
  return true;
}
//============================================
// CONFIGURACIÓN EMAILJS
//============================================

emailjs.init({
    publicKey: "Zzhd0wQyJa_7NDeX2"
});

//============================================
// ELEMENTOS DEL DOM
//============================================

const formulario = document.getElementById("cdFormularioReporte");

const botonEnviar = document.getElementById("cdEnviarReporte");
const spinner = document.getElementById("cdSpinner");

const successBox = document.getElementById("cdSuccessGeneral");
const errorBox = document.getElementById("cdErrorGeneral");

//============================================
// MOSTRAR MENSAJES
//============================================

function mostrarError(mensaje){

    errorBox.style.display = "block";
    errorBox.textContent = mensaje;

    successBox.style.display = "none";

}

function mostrarExito(mensaje){

    successBox.style.display = "block";
    successBox.textContent = mensaje;

    errorBox.style.display = "none";

}

function limpiarMensajes(){

    successBox.style.display = "none";
    errorBox.style.display = "none";

}

//============================================
// SPINNER
//============================================

function activarCarga(){

    botonEnviar.disabled = true;

    spinner.style.display = "inline-block";

}

function desactivarCarga(){

    botonEnviar.disabled = false;

    spinner.style.display = "none";

}

//============================================
// OBTENER RADIO SELECCIONADO
//============================================

function obtenerRadio(nombre){

    const radio = document.querySelector(
        `input[name="${nombre}"]:checked`
    );

    return radio ? radio.value : "";

}

//============================================
// VALIDACIÓN
//============================================

function validarFormulario(){

    limpiarMensajes();

    const tipo = obtenerRadio("tipo_reporte");

    if(tipo === ""){

        mostrarError(
            "Seleccione el tipo de reporte."
        );

        return false;

    }

    const descripcion =
        document
        .getElementById("cdDescripcion")
        .value
        .trim();

    if(descripcion.length < 20){

        mostrarError(
            "La descripción debe contener al menos 20 caracteres."
        );

        return false;

    }

    const direccion =
        document
        .getElementById("cdDireccionInput")
        .value
        .trim();

    if(direccion === ""){

        mostrarError(
            "Debe seleccionar una ubicación en el mapa."
        );

        return false;

    }

    const gravedad = obtenerRadio("gravedad");

    if(gravedad === ""){

        mostrarError(
            "Seleccione el nivel de gravedad."
        );

        return false;

    }

    const fecha = obtenerRadio("fecha_reporte");

    if(fecha === ""){

        mostrarError(
            "Seleccione cuándo ocurrió el incidente."
        );

        return false;

    }

    return true;

}

//============================================
// EVENTO SUBMIT
//============================================

formulario.addEventListener("submit", async function(e){

    e.preventDefault();

    // ⭐ NUEVA VERIFICACIÓN: Comprobar autenticación
    if (!verificarAutenticacionEnvio()) {
      return; // Bloquear envío si no está autenticado
    }

    if(!validarFormulario()){

        return;

    }

    activarCarga();

    //----------------------------------------------------
    // Obtener información del formulario
    //----------------------------------------------------

    const tipoReporte =
        obtenerRadio("tipo_reporte");

    const otroReporte =
        document
        .getElementById("cdOtroInput")
        .value
        .trim();

    const direccion =
        document
        .getElementById("cdDireccionInput")
        .value;

    const latitud =
        document
        .getElementById("cdLatitudInput")
        .value;

    const longitud =
        document
        .getElementById("cdLongitudInput")
        .value;

    const descripcion =
        document
        .getElementById("cdDescripcion")
        .value
        .trim();

    const gravedad =
        obtenerRadio("gravedad");

    const fechaIncidente =
        obtenerRadio("fecha_reporte");

    const fechaPersonalizada =
        document
        .getElementById("cdFecha")
        .value;

    //----------------------------------------------------
    // Obtener imágenes
    //----------------------------------------------------

    const imagenes =
        document
        .getElementById("cdImagenes")
        .files;

    let nombresImagenes = "";

    if(imagenes.length > 0){

        for(let i=0;i<imagenes.length;i++){

            nombresImagenes +=
                "• " +
                imagenes[i].name +
                "\n";

        }

    }else{

        nombresImagenes = "No se adjuntaron imágenes.";

    }

    //----------------------------------------------------
    // Fecha de envío
    //----------------------------------------------------

    const fechaEnvio =
        new Date().toLocaleString(
            "es-PA",
            {
                dateStyle:"full",
                timeStyle:"medium"
            }
        );

    //----------------------------------------------------
    // Continúa en la Parte 2...
    //----------------------------------------------------

        //----------------------------------------------------
    // Construcción del correo
    //----------------------------------------------------

    const mensajeCorreo = `
==========================================
        NUEVO REPORTE - CLEARDROP
==========================================

📌 TIPO DE REPORTE
------------------------------------------
${tipoReporte}

${tipoReporte === "Otro"
    ? "Detalle: " + (otroReporte || "No especificado")
    : ""}

📍 UBICACIÓN
------------------------------------------
Dirección:
${direccion}

Latitud:
${latitud}

Longitud:
${longitud}

📝 DESCRIPCIÓN
------------------------------------------
${descripcion}

📅 FECHA DEL INCIDENTE
------------------------------------------
${fechaIncidente}

${fechaIncidente === "Elegir fecha"
    ? "Fecha seleccionada: " + fechaPersonalizada
    : ""}

🚨 NIVEL DE GRAVEDAD
------------------------------------------
${gravedad}

📷 IMÁGENES
------------------------------------------
${nombresImagenes}

==========================================
INFORMACIÓN DEL ENVÍO
==========================================

Fecha del envío:
${fechaEnvio}

Navegador:
${navigator.userAgent}

Sistema:
${navigator.platform}

Idioma:
${navigator.language}

==========================================
Reporte generado automáticamente
desde la plataforma ClearDrop.
==========================================
`;

    //----------------------------------------------------
    // Parámetros para EmailJS
    //----------------------------------------------------

    const templateParams = {

        mensaje: mensajeCorreo,

        tipo_reporte: tipoReporte,

        descripcion: descripcion,

        direccion: direccion,

        latitud: latitud,

        longitud: longitud,

        gravedad: gravedad,

        fecha_incidente:
            fechaIncidente === "Elegir fecha"
                ? fechaPersonalizada
                : fechaIncidente,

        imagenes: nombresImagenes,

        fecha_envio: fechaEnvio

    };

    //----------------------------------------------------
    // Enviar correo
    //----------------------------------------------------

    try{

        const respuesta = await emailjs.send(

            "service_hvukf2b",

            "template_fxozms1",

            templateParams

        );

        console.log(
            "Email enviado:",
            respuesta.status,
            respuesta.text
        );

        mostrarExito(
            "✅ El reporte fue enviado correctamente."
        );

        //------------------------------------------------
        // Continúa en la Parte 3...
        //------------------------------------------------


                //------------------------------------------------
        // Limpiar formulario
        //------------------------------------------------

        formulario.reset();

        // Ocultar campo "Otro"
        const otroContainer = document.getElementById("cdOtroContainer");

        if(otroContainer){

            otroContainer.style.display = "none";

        }

        // Limpiar descripción
        const descripcionInput =
            document.getElementById("cdDescripcion");

        if(descripcionInput){

            descripcionInput.value = "";

        }

        // Reiniciar contador
        const contador =
            document.getElementById("cdContadorCaracteres");

        if(contador){

            contador.textContent = "0 / 600";

        }

        // Limpiar ubicación

        document.getElementById("cdDireccionInput").value = "";
        document.getElementById("cdLatitudInput").value = "";
        document.getElementById("cdLongitudInput").value = "";

        document.getElementById("cdDireccion").textContent =
            "Ninguna ubicación seleccionada.";

        document.getElementById("cdLatitud").textContent = "--";

        document.getElementById("cdLongitud").textContent = "--";

        // Limpiar imágenes

        document.getElementById("cdImagenes").value = "";

        const preview =
            document.getElementById("cdPreviewContainer");

        if(preview){

            preview.innerHTML = "";

        }

        // Limpiar mensajes de imágenes

        const imageError =
            document.getElementById("cdImageError");

        if(imageError){

            imageError.textContent = "";

        }

    }

    catch(error){

        console.error(error);

        mostrarError(

            "Ocurrió un error al enviar el reporte. Inténtalo nuevamente."

        );

    }

    finally{

        desactivarCarga();

    }

});

//====================================================
// FIN DEL ARCHIVO
//====================================================