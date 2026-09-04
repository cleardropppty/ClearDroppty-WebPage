/* ==========================================================================
   CLEARDROP — LÓGICA DE INTERFAZ + MAPA (Leaflet / OpenStreetMap)
   ==========================================================================
   Índice:
   1. Inicialización de íconos (Lucide)
   2. Datos de afectaciones (fuente única de datos para los marcadores)
   3. Inicializar el mapa (Leaflet + capas de tiles)
   4. Crear ícono de marcador (divIcon reutilizable)
   5. Renderizar marcadores en el mapa, agrupados por tipo
   6. Filtros del sidebar (switches) -> muestran/ocultan capas del mapa
   7. Mostrar / ocultar sidebar
   8. Limpiar filtros
   9. Cambiar de vista: Mapa / Satélite / Híbrido
   10. Seleccionar un marcador -> tarjeta de detalle
   11. Cerrar tarjeta de detalle
   12. Controles propios: zoom, ubicación, pantalla completa
   13. Buscador de ubicación (geocodificación con Nominatim/OSM, gratis)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ------------------------- 1. Inicialización de íconos ------------------ */
  if (window.lucide) lucide.createIcons();

  /* ==========================================================================
     2. DATOS DE AFECTACIONES
     ==========================================================================
     Fuente única de datos. En una versión conectada a un backend, este
     arreglo se reemplazaría por el resultado de un fetch() a tu propia API,
     por ejemplo:

        const AFECTACIONES = await fetch("/api/afectaciones").then(r => r.json());

     Cada elemento necesita lat/lng reales (coordenadas GPS) para ubicarse
     en el mapa. Las coordenadas de abajo son aproximadas para distritos
     de la provincia de Chiriquí, Panamá — ajústalas a tus datos reales.
     ========================================================================== */
  const AFECTACIONES = [
    
{ id: 2, tipo: "inundaciones", titulo: "Sector Gualaca", lugar: "Gualaca, Chiriquí", desc: "Desbordamiento tras lluvias recientes.", impacto: "Alto", lat: 8.5311, lng: -82.2867 },
{ id: 16, tipo: "inundaciones", titulo: "Sector Concepción", lugar: "Concepción, Chiriquí", desc: "Desbordamiento de quebrada local.", impacto: "Medio", lat: 8.5167, lng: -82.6167 },
{ id: 3, tipo: "inundaciones", titulo: "Sector Boquerón", lugar: "Boquerón, Chiriquí", desc: "Acumulación de agua en zonas bajas.", impacto: "Medio", lat: 8.5077, lng: -82.5707 },
{ id: 10, tipo: "inundaciones", titulo: "Sector San Lorenzo", lugar: "San Lorenzo, Chiriquí", desc: "Calles inundadas tras temporal.", impacto: "Alto", lat: 8.3094, lng: -82.1026 },

{ id: 9, tipo: "baja_presion", titulo: "Sector Barú", lugar: "Barú, Chiriquí", desc: "Racionamiento de agua potable.", impacto: "Medio", lat: 8.2833, lng: -82.8667 },
{ id: 13, tipo: "baja_presion", titulo: "Sector San Félix", lugar: "San Félix, Chiriquí", desc: "Pozos con bajo nivel de agua.", impacto: "Medio", lat: 8.2933, lng: -81.8692 },
{ id: 4, tipo: "baja_presion", titulo: "Planta de David", lugar: "David, Chiriquí", desc: "Daños en tubería principal de distribución.", impacto: "Alto", lat: 8.4333, lng: -82.4333 },
{ id: 18, tipo: "baja_presion", titulo: "Sector Las Lajas", lugar: "Las Lajas, Chiriquí", desc: "Baja disponibilidad de agua en verano.", impacto: "Bajo", lat: 8.2452, lng: -81.8701 },

{ id: 8, tipo: "ecosistemas", titulo: "Río Dolega", lugar: "Dolega, Chiriquí", desc: "Reducción de especies acuáticas nativas.", impacto: "Bajo", lat: 8.5531, lng: -82.4328 },
{ id: 5, tipo: "ecosistemas", titulo: "Cuenca cercana a David", lugar: "David, Chiriquí", desc: "Impacto en biodiversidad ribereña.", impacto: "Medio", lat: 8.4450, lng: -82.4100 },
{ id: 11, tipo: "ecosistemas", titulo: "Cuenca San Lorenzo", lugar: "San Lorenzo, Chiriquí", desc: "Sedimentación afecta flora acuática.", impacto: "Bajo", lat: 8.3289, lng: -82.1198 },

{ id: 6, tipo: "contaminacion", titulo: "Quebrada Boquerón", lugar: "Boquerón, Chiriquí", desc: "Vertimientos detectados en el cauce.", impacto: "Alto", lat: 8.5333, lng:-82.5833 },
{ id: 7, tipo: "contaminacion", titulo: "Río David", lugar: "David, Chiriquí", desc: "Presencia de desechos sólidos y vertimientos en el cauce del río.", impacto: "Alto", lat: 8.3667, lng: -82.4000 },
{ id: 17, tipo: "contaminacion", titulo: "Río Alanje", lugar: "Alanje, Chiriquí", desc: "Contaminación por residuos agrícolas.", impacto: "Medio", lat: 8.3494, lng: -82.5431 },    

{ id: 12, tipo: "otros", titulo: "Sistema de Barú", lugar: "Barú, Chiriquí", desc: "Fugas en red de saneamiento.", impacto: "Medio", lat: 8.3000, lng: -82.8400 },
{ id: 15, tipo: "otros", titulo: "Sistema Cerro Punta", lugar: "Cerro Punta, Chiriquí", desc: "Daños por deslizamiento en las tubería.", impacto: "Medio", lat: 8.8333, lng: -82.5667 },
  ];

  const AFECTACIONES_COMUNIDADES = [
{ id: 20, tipo: "sin_suministro", titulo: "Los Valles de Los Algarrobos", lugar: "Dolega, Chiriquí", desc: "La bomba del pozo presenta fallas frecuentes, quemándose varias veces al month, dejando sin suministro por más de dos días.", impacto: "Alto", lat: 8.4999, lng: -82.4147, imagen: null },
{ id: 24, tipo: "sin_suministro", titulo: "Capacidad insuficiente", lugar: "Las Lomas, Llano Grande Arriba, Chiriquí", desc: "Pozo sin suficiente capacidad, los residentes cuentan con agua aproximadamente cuatro horas al día.", impacto: "Alto", lat: 8.4411, lng: -82.3942, imagen: null },
{ id: 26, tipo: "sin_suministro", titulo: "Cortes frecuentes", lugar: "Residencial Las Cumbres, San Pablo Viejo, Santo Domingo, Chiriquí", desc: "Cortes frecuentes del suministro de agua que afectan actividades cotidianas y necesidades básicas del hogar.", impacto: "Medio", lat: 8.4833, lng: -82.5000, imagen: null },
{ id: 29, tipo: "sin_suministro", titulo: "Acueducto insuficiente", lugar: "Aserrío de Gariché, Chiriquí", desc: "Históricamente no ha contado con suministro adecuado de agua potable. Necesario atender para garantizar acceso al vital líquido.", impacto: "Bajo", lat: 8.5333, lng: -82.8000, imagen: null },
   
{ id: 22, tipo: "contaminacion", titulo: "Agua turbia y con residuos", lugar: "Área de David, Chiriquí", desc: "Agua llega turbia con residuos de arenilla y exceso de cloro en determinados momentos, generando preocupación por la calidad.", impacto: "Medio", lat: 8.4200, lng: -82.4200, imagen: null },
{ id: 23, tipo: "contaminacion", titulo: "Agua con tierra tras lluvias", lugar: "Loma Colorada, Chiriquí", desc: "Durante algunas lluvias, el agua llega acompañada de tierra durante los primeros minutos. Problema ocasional.", impacto: "Bajo", lat: 8.4167, lng: -82.4167, imagen: null },
{ id: 27, tipo: "contaminacion", titulo: "Contaminación de recursos hídricos", lugar: "El Higo, San Pablo Viejo Arriba, Chiriquí", desc: "Tanques sépticos de barriadas pueden contaminar continuamente las aguas y afectar los ríos de la zona.", impacto: "Alto", lat: 8.4833, lng: -82.5000, imagen: null },

{ id: 25, tipo: "fugas", titulo: "Rupturas en tuberías", lugar: "Las Fuentes, Bágala, Boquerón, Chiriquí", desc: "Rupturas en varios puntos de las tuberías debido a la presión del pozo Chorro Blanco. Problema sin solución definitiva desde hace 5-6 años.", impacto: "Alto", lat: 8.5950, lng: -82.6190, imagen: null },
    
{ id: 28, tipo: "baja_presion", titulo: "Baja presión recurrente", lugar: "Urbanización Lassonde, David Sur, Chiriquí", desc: "Múltiples quejas por baja presión del agua. Mejoras anteriores han sido temporales, problema persiste.", impacto: "Medio", lat: 8.4161, lng: -82.4426, imagen: null },
{ id: 21, tipo: "baja_presion", titulo: "Sector David Centro", lugar: "David, Chiriquí", desc: "Servicio de agua irregular con baja presión principalmente durante el día y fines de semana, dificultando el uso normal del servicio.", impacto: "Medio", lat: 8.4300, lng: -82.4300, imagen: null },
  ];

  //  COMBINA AMBOS ARRAYS
  const TODAS_AFECTACIONES = [...AFECTACIONES, ...AFECTACIONES_COMUNIDADES];

  const TIPO_NOMBRE = {
    sin_suministro: "Sin suministro de agua",
    contaminacion: "Contaminación del agua",
    baja_presion: "Baja presión",
    fugas: "Fugas de agua",
    inundaciones: "Inundaciones",
    ecosistemas: "Afectación a ecosistemas",
    otros: "Otros",
  };

  const IMPACTO_CLASE = {
    Alto: "impact-badge--alto",
    Medio: "impact-badge--medio",
    Bajo: "impact-badge--bajo",
  };

  // Centro aproximado de la provincia de Chiriquí, Panamá
  const CENTRO_CHIRIQUI = [8.55, -82.55];

  /* ==========================================================================
     3. INICIALIZAR EL MAPA (Leaflet + OpenStreetMap)
     ==========================================================================
     No requiere API key. Usamos tiles públicos de OpenStreetMap para la
     vista "Mapa", y tiles satelitales de Esri (también gratuitos) para
     las vistas "Satélite" e "Híbrido".
     ========================================================================== */
  const map = L.map("leafletMap", {
    zoomControl: false,      // usamos nuestros propios botones de zoom
    attributionControl: true,
  }).setView(CENTRO_CHIRIQUI, 10);

  // Capa base: calles (OpenStreetMap)
  const capaCalles = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  });

  // Capa base: satélite (Esri World Imagery, gratuita)
  const capaSatelite = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    { maxZoom: 19, attribution: "Tiles &copy; Esri" }
  );

  // Capa de etiquetas (nombres de lugares) para superponer sobre el satélite -> "Híbrido"
  const capaEtiquetas = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
    { maxZoom: 19, attribution: "Tiles &copy; Esri" }
  );

  capaCalles.addTo(map); // vista inicial: "Mapa"

  /* ==========================================================================
     4. CREAR ÍCONO DE MARCADOR (divIcon reutilizable)
     ========================================================================== */
  const ICONO_SVG = {
    sin_suministro: "droplet-off",
    contaminacion: "droplet",
    fugas: "wrench",
    inundaciones: "waves",
    ecosistemas: "leaf",
    baja_presion: "trending-down",
    otros: "layout-grid",
  };

  function crearIcono(tipo, seleccionado) {
    const tamaño = seleccionado ? 42 : 34;
    return L.divIcon({
      className: "", // evita estilos por defecto de Leaflet
      html: `<div class="marker-pin marker-pin--${tipo}${seleccionado ? " marker-pin--selected" : ""}">
               <i data-lucide="${ICONO_SVG[tipo] || "droplet"}"></i>
             </div>`,
      iconSize: [tamaño, tamaño],
      iconAnchor: [tamaño / 2, tamaño / 2],
    });
  }

  /* ==========================================================================
     5. RENDERIZAR MARCADORES, AGRUPADOS POR TIPO
     ==========================================================================
     Cada tipo de afectación vive en su propio L.layerGroup, así los switches
     del sidebar simplemente agregan/quitan el layerGroup completo del mapa.
     ========================================================================== */
  const capasPorTipo = {}; // { contaminacion: L.layerGroup, escasez: L.layerGroup, ... }
  const marcadoresPorId = {}; // acceso rápido a cada L.marker por id de afectación

  Object.keys(TIPO_NOMBRE).forEach((tipo) => {
    capasPorTipo[tipo] = L.layerGroup().addTo(map);
  });

  //  USA TODAS_AFECTACIONES (combinado)
  TODAS_AFECTACIONES.forEach((afectacion) => {
    const marker = L.marker([afectacion.lat, afectacion.lng], {
      icon: crearIcono(afectacion.tipo, false),
    });

    marker.on("click", () => seleccionarAfectacion(afectacion.id));
    marker.addTo(capasPorTipo[afectacion.tipo]);
    marcadoresPorId[afectacion.id] = marker;
  });

  if (window.lucide) lucide.createIcons(); // dibuja los íconos recién insertados

  /* ------------------------- 6. Filtros del sidebar ------------------------ */
  const switches = document.querySelectorAll(".switch");

  switches.forEach((sw) => {
    sw.addEventListener("click", () => {
      const isOn = sw.classList.toggle("switch--on");
      sw.setAttribute("aria-checked", String(isOn));
      aplicarFiltros();
    });
  });

  function aplicarFiltros() {
    document.querySelectorAll(".filter-item").forEach((item) => {
      const tipo = item.dataset.filter;
      const activo = item.querySelector(".switch").classList.contains("switch--on");
      const capa = capasPorTipo[tipo];
      if (!capa) return;

      if (activo && !map.hasLayer(capa)) capa.addTo(map);
      if (!activo && map.hasLayer(capa)) map.removeLayer(capa);
    });
    actualizarContador();
  }

  function actualizarContador() {
    const tiposActivos = Array.from(document.querySelectorAll(".filter-item"))
      .filter((item) => item.querySelector(".switch").classList.contains("switch--on"))
      .map((item) => item.dataset.filter);

    const visibles = TODAS_AFECTACIONES.filter((a) => tiposActivos.includes(a.tipo)).length;
    const counter = document.getElementById("afectacionesCount");
    if (counter) counter.textContent = visibles;
  }

  /* ------------------------- 7. Mostrar / ocultar sidebar ------------------ */
  const filterList = document.getElementById("filterList");
  const toggleSidebarBtn = document.getElementById("toggleSidebarBtn");

  toggleSidebarBtn?.addEventListener("click", () => {
    filterList.classList.toggle("filter-list--collapsed");
    const collapsed = filterList.classList.contains("filter-list--collapsed");
    toggleSidebarBtn.innerHTML = collapsed
      ? 'Mostrar <i data-lucide="chevron-down"></i>'
      : 'Ocultar <i data-lucide="chevron-up"></i>';
    if (window.lucide) lucide.createIcons();
  });

  /* ------------------------- 8. Limpiar filtros ----------------------------- */
  document.getElementById("clearFiltersBtn")?.addEventListener("click", () => {
    switches.forEach((sw) => {
      sw.classList.add("switch--on");
      sw.setAttribute("aria-checked", "true");
    });
    aplicarFiltros();
  });

  /* ------------------------- 9. Cambiar de vista del mapa ------------------- */
  const viewButtons = document.querySelectorAll(".view-btn");

  viewButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      viewButtons.forEach((b) => b.classList.remove("view-btn--active"));
      btn.classList.add("view-btn--active");

      // Quitamos todas las capas base antes de agregar la elegida
      [capaCalles, capaSatelite, capaEtiquetas].forEach((capa) => {
        if (map.hasLayer(capa)) map.removeLayer(capa);
      });

      switch (btn.dataset.view) {
        case "satelite":
          capaSatelite.addTo(map);
          break;
        case "hibrido":
          capaSatelite.addTo(map);
          capaEtiquetas.addTo(map);
          break;
        default: // "mapa"
          capaCalles.addTo(map);
      }
    });
  });

  /* ------------------------- 10. Seleccionar afectación --------------------- */
  const detailCard = document.getElementById("detailCard");
  let idSeleccionado = null;

  function seleccionarAfectacion(id) {
    //  USA TODAS_AFECTACIONES
    const afectacion = TODAS_AFECTACIONES.find((a) => a.id === id);
    if (!afectacion) return;

    // Restaurar el ícono anterior a su tamaño normal
    if (idSeleccionado !== null && marcadoresPorId[idSeleccionado]) {
      const anterior = TODAS_AFECTACIONES.find((a) => a.id === idSeleccionado);
      marcadoresPorId[idSeleccionado].setIcon(crearIcono(anterior.tipo, false));
    }

    // Resaltar el nuevo marcador seleccionado
    marcadoresPorId[id].setIcon(crearIcono(afectacion.tipo, true));
    if (window.lucide) lucide.createIcons();
    idSeleccionado = id;

    // Rellenar la tarjeta de detalle
    document.getElementById("detailTag").textContent = TIPO_NOMBRE[afectacion.tipo];
    document.getElementById("detailTitulo").textContent = afectacion.titulo;
    document.getElementById("detailLugar").textContent = afectacion.lugar;
    document.getElementById("detailDesc").textContent = afectacion.desc;
    document.getElementById("detailActualizado").textContent =
      afectacion.actualizado || "Actualizado recientemente";

    const impactoEl = document.getElementById("detailImpacto");
    impactoEl.textContent = afectacion.impacto;
    impactoEl.className = "impact-badge " + (IMPACTO_CLASE[afectacion.impacto] || "impact-badge--medio");

    detailCard.style.display = "block";
    // En móvil, añadir clase open para animación
    detailCard.classList.add("open");

    // Centra el mapa suavemente sobre el marcador elegido
    map.panTo([afectacion.lat, afectacion.lng]);
  }

  /* ------------------------- 11. Cerrar tarjeta de detalle ------------------ */
  document.getElementById("closeDetailCard")?.addEventListener("click", () => {
    detailCard.style.display = "none";
    detailCard.classList.remove("open");
    if (idSeleccionado !== null && marcadoresPorId[idSeleccionado]) {
      const anterior = TODAS_AFECTACIONES.find((a) => a.id === idSeleccionado);
      marcadoresPorId[idSeleccionado].setIcon(crearIcono(anterior.tipo, false));
      if (window.lucide) lucide.createIcons();
    }
    idSeleccionado = null;
  });

  /* ------------------------- 12. Controles propios del mapa ----------------- */
  document.getElementById("zoomInBtn")?.addEventListener("click", () => map.zoomIn());
  document.getElementById("zoomOutBtn")?.addEventListener("click", () => map.zoomOut());

  document.getElementById("locateBtn")?.addEventListener("click", () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => map.setView([pos.coords.latitude, pos.coords.longitude], 13),
      () => console.warn("No se pudo obtener la ubicación del usuario.")
    );
  });

  document.getElementById("fullscreenBtn")?.addEventListener("click", () => {
    const container = document.getElementById("mapContainer");
    if (!document.fullscreenElement) {
      container.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
    setTimeout(() => map.invalidateSize(), 200);
  });

  /* ==========================================================================
     13. BUSCADOR DE UBICACIÓN
     ==========================================================================
     Usa el geocodificador gratuito de OpenStreetMap (Nominatim). No requiere
     API key, pero tiene límite de uso razonable (uso personal/bajo tráfico).
     Para producción con mucho tráfico, se recomienda un proveedor con SLA
     (por ejemplo, Mapbox Geocoding API o Google Geocoding API).
     ========================================================================== */
  const searchInput = document.getElementById("mapSearchInput");

  searchInput?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") buscarUbicacion(searchInput.value);
  });

  async function buscarUbicacion(consulta) {
    if (!consulta || consulta.trim().length < 3) return;

    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(
        consulta + ", Chiriquí, Panamá"
      )}`;
      const res = await fetch(url, { headers: { "Accept-Language": "es" } });
      const resultados = await res.json();

      if (resultados && resultados.length > 0) {
        const { lat, lon } = resultados[0];
        map.setView([parseFloat(lat), parseFloat(lon)], 13);
      } else {
        console.warn("No se encontraron resultados para:", consulta);
      }
    } catch (err) {
      console.error("Error buscando ubicación:", err);
    }
  }

  /* ==========================================================================
     14. MENÚ MÓVIL (HAMBURGUESA) Y BOTÓN DE IDIOMA
     ==========================================================================
     Misma lógica que la página principal de ClearDrop, para que la navbar
     se comporte igual en todas las páginas del sitio.
     ========================================================================== */
  const menuBtn = document.getElementById("menuBtn");
  const menuClose = document.getElementById("menuClose");
  const mobileNav = document.getElementById("mobileNav");

  menuBtn?.addEventListener("click", () => mobileNav.classList.add("open"));
  menuClose?.addEventListener("click", () => mobileNav.classList.remove("open"));

  // Cierra el menú móvil al tocar cualquiera de sus enlaces
  mobileNav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => mobileNav.classList.remove("open"));
  });

  // Botón de idioma: alterna la etiqueta visual (Español/English).
  // NOTA: aquí solo se cambia el texto del botón. Para traducir el
  // contenido real de la página, conecta esto con tu script de traducción
  // (por ejemplo, el "tra.js" usado en la página principal).
  function alternarIdioma(boton) {
    const esEn = boton.classList.toggle("is-en");
    const etiqueta = boton.querySelector(".lang-label");
    if (etiqueta) etiqueta.textContent = esEn ? "Español" : "English";
  }

  document.getElementById("langToggle")?.addEventListener("click", (e) => alternarIdioma(e.currentTarget));
  document.getElementById("langToggleMobile")?.addEventListener("click", (e) => alternarIdioma(e.currentTarget));

  /* ============================================================
   nav-dropdown.js — Menús agrupados del navbar (Novedades / Comunidad)
   - En escritorio: se abren con hover (CSS) Y con click (esta clase .open)
   - En móvil: funcionan como acordeón dentro del menú hamburguesa
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Dropdowns de escritorio ---------- */
  const dropdowns = document.querySelectorAll('.nav-dropdown');

  dropdowns.forEach((dropdown) => {
    const toggle = dropdown.querySelector('.nav-dropdown-toggle');

    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = dropdown.classList.contains('open');

      // Cierra los demás dropdowns abiertos antes de abrir este
      dropdowns.forEach((d) => {
        d.classList.remove('open');
        d.querySelector('.nav-dropdown-toggle').setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        dropdown.classList.add('open');
        toggle.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Cierra el dropdown si se hace click fuera de él
  document.addEventListener('click', () => {
    dropdowns.forEach((d) => {
      d.classList.remove('open');
      d.querySelector('.nav-dropdown-toggle').setAttribute('aria-expanded', 'false');
    });
  });

  // Cierra el dropdown con la tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      dropdowns.forEach((d) => {
        d.classList.remove('open');
        d.querySelector('.nav-dropdown-toggle').setAttribute('aria-expanded', 'false');
      });
    }
  });

  /* ---------- Acordeón del menú móvil ---------- */
  const mobileGroups = document.querySelectorAll('.mobile-nav-group');

  mobileGroups.forEach((group) => {
    const toggle = group.querySelector('.mobile-nav-toggle');

    toggle.addEventListener('click', () => {
      const isOpen = group.classList.contains('open');

      mobileGroups.forEach((g) => {
        g.classList.remove('open');
        g.querySelector('.mobile-nav-toggle').setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        group.classList.add('open');
        toggle.setAttribute('aria-expanded', 'true');
      }
    });
  });

});


/* lang-toggle.js
   - Muestra EN / ES y cambia el icono al alternar
   - Guarda selección en localStorage ('site_lang')
   - Actualiza <html lang="...">
   - Emite evento 'languagechange' con detail { lang }
   - El HTML esperado: <button id="langToggle" class="lang-toggle" aria-pressed="false">...</button>
*/
(() => {
  const LANG_KEY = 'site_lang';
  const button = document.getElementById('langToggle');
  if (!button) return;

  const label = button.querySelector('.label');
  const iconEn = button.querySelector('.icon--en');
  const iconEs = button.querySelector('.icon--es');

  // Aplica estado visual (clases) y atributos ARIA
  function applyVisualState(lang) {
    button.classList.toggle('is-en', lang === 'en');
    button.classList.toggle('is-es', lang === 'es');
    if (label) label.textContent = lang.toUpperCase();
    button.setAttribute('aria-pressed', String(lang === 'es')); // ejemplo: pressed cuando es ES
  }

  // Guarda y emite evento
  function finalizeLang(lang, save = true) {
    try { document.documentElement.lang = lang; } catch (e) {}
    applyVisualState(lang);
    if (save) localStorage.setItem(LANG_KEY, lang);
    document.dispatchEvent(new CustomEvent('languagechange', { detail: { lang } }));
  }

  // Detecta idioma inicial: localStorage -> atributo html -> navigator -> 'en'
  function detectInitialLang() {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved === 'es' || saved === 'en') return saved;
    const docLang = (document.documentElement.lang || '').toLowerCase();
    if (docLang.startsWith('es')) return 'es';
    if (docLang.startsWith('en')) return 'en';
    const nav = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
    if (nav.startsWith('es')) return 'es';
    return 'en';
  }

  // Inicializa el componente
  function init(save = false) {
    const lang = detectInitialLang();
    finalizeLang(lang, save);
  }

  // Click para alternar
  button.addEventListener('click', () => {
    const current = localStorage.getItem(LANG_KEY) || (document.documentElement.lang || 'en');
    const next = (current === 'es') ? 'en' : 'es';
    finalizeLang(next, true);
  });

  // Permite alternar con Enter / Space cuando el botón tiene foco
  button.addEventListener('keydown', (ev) => {
    if (ev.key === 'Enter' || ev.key === ' ') {
      ev.preventDefault();
      button.click();
    }
  });

  // Opcional: ejemplo simple de traducción para elementos con data-i18n (puedes eliminarlo)
  const i18n = {
    en: { welcome: "Welcome", hello: "Hello world" },
    es: { welcome: "Bienvenido", hello: "Hola mundo" }
  };
  function translatePage(lang) {
    document.querySelectorAll('[data-i18n]').forEach(n => {
      const key = n.getAttribute('data-i18n');
      if (i18n[lang] && i18n[lang][key]) n.textContent = i18n[lang][key];
    });
  }
  document.addEventListener('languagechange', (e) => translatePage(e.detail.lang));

  // Arranque: si el DOM ya está listo, inicializa; si no, espera DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => init(false));
  } else {
    init(false);
  }
})();

  /* ------------------------- 15. SIDEBAR TOGGLE PARA MÓVIL ------------------ */
  // Añadir botón toggle para sidebar en móvil
  (function agregarSidebarToggle() {
    const header = document.querySelector('.map-panel__header');
    if (!header) return;

    // Crear botón toggle
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'sidebar-toggle-btn';
    toggleBtn.innerHTML = '<i data-lucide="menu"></i> Filtros';
    toggleBtn.setAttribute('aria-label', 'Abrir filtros');
    toggleBtn.setAttribute('aria-expanded', 'false');
    header.appendChild(toggleBtn);

    // Crear overlay
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);

    // Función para abrir/cerrar sidebar
    function toggleSidebar() {
      const sidebar = document.getElementById('sidebar');
      const isOpen = sidebar.classList.toggle('open');
      toggleBtn.setAttribute('aria-expanded', String(isOpen));
      overlay.classList.toggle('open', isOpen);
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }

    toggleBtn.addEventListener('click', toggleSidebar);
    overlay.addEventListener('click', () => {
      if (document.getElementById('sidebar').classList.contains('open')) {
        toggleSidebar();
      }
    });

    // Cerrar sidebar con Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && document.getElementById('sidebar').classList.contains('open')) {
        toggleSidebar();
      }
    });

    // Refrescar íconos Lucide
    if (window.lucide) lucide.createIcons();
  })();

  /* ------------------------- Estado inicial --------------------------------- */
  aplicarFiltros();
  seleccionarAfectacion(7); // abre "Río David" al cargar, igual que en el diseño original

  // El mapa necesita re-medirse una vez que el layout terminó de pintarse
  setTimeout(() => map.invalidateSize(), 300);
});