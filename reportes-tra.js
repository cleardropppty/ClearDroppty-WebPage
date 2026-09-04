/* =========================================================
   REPORTES - TRADUCCIÓN ES / EN
   Sigue el mismo patrón usado en noticias.html:
   - currentLang es la única fuente de verdad
   - clonamos el botón de idioma para eliminar listeners
     duplicados que pueda añadir script.js
   ========================================================= */

(function () {

  // ---------------------------------------------------------
  // Estado actual del idioma (fuente de verdad)
  // ---------------------------------------------------------
  let currentLang = "es";

  // ---------------------------------------------------------
  // Diccionario de traducciones
  // ---------------------------------------------------------
  const translations = {
    es: {
      langLabel: "English",

      heroBadge: "REPORTAR INCIDENTES",
      heroTitle: "Ayúdanos a cuidar el agua reportando cualquier problema en tu comunidad.",
      heroDescription:
        "Completa el siguiente formulario para informar sobre fugas, contaminación, " +
        "baja presión, inundaciones u otras situaciones relacionadas con el agua. " +
        "Nuestro equipo recibirá tu reporte para su respectivo seguimiento.",

      // Sección 01
      step01Title: "Tipo de reporte",
      step01Subtitle: "Selecciona el problema que deseas reportar.",
      cardSinAguaTitle: "Sin agua",
      cardSinAguaDesc: "No hay suministro de agua potable.",
      cardContaminadaTitle: "Agua contaminada",
      cardContaminadaDesc: "Agua con color, olor o apariencia inusual.",
      cardPresionTitle: "Baja presión",
      cardPresionDesc: "El agua llega con poca presión.",
      cardFugaTitle: "Fuga de agua",
      cardFugaDesc: "Reporta tuberías o conexiones con fugas.",
      cardInundacionTitle: "Inundación",
      cardInundacionDesc: "Acumulación de agua en calles o viviendas.",
      cardOtroTitle: "Otro",
      cardOtroDesc: "Describe un problema diferente.",
      otroLabel: "Especifica el problema",
      otroPlaceholder: "Describe el problema...",

      // Sección 02
      step02Title: "Ubicación del incidente",
      step02Subtitle: "Selecciona la ubicación exacta del reporte utilizando el mapa interactivo.",
      buscarDireccionLabel: "Buscar dirección",
      buscarDireccionPlaceholder: "Escribe una dirección...",
      usarUbicacion: "Usar mi ubicación",
      direccionLabel: "Dirección",
      direccionVacia: "Ninguna ubicación seleccionada.",
      latitudLabel: "Latitud",
      longitudLabel: "Longitud",

      // Sección 03
      step03Title: "Evidencia fotográfica",
      step03Subtitle: "Agrega hasta tres imágenes para respaldar tu reporte.",
      dropzoneTitle: "Arrastra tus imágenes aquí",
      dropzoneText: "o haz clic para seleccionarlas desde tu dispositivo.",
      dropzoneSmall: "Máximo 3 imágenes • 5 MB por archivo",

      // Sección 04
      step04Title: "Descripción del problema",
      step04Subtitle: "Proporciona la mayor cantidad de detalles posible.",
      descripcionLabel: "Describe lo ocurrido",
      descripcionPlaceholder: "Describe el problema con el mayor detalle posible...",

      // Sección 05
      step05Title: "¿Cuándo ocurrió?",
      step05Subtitle: "Indica cuándo sucedió el incidente reportado.",
      fechaHoy: "Hoy",
      fechaAyer: "Ayer",
      fechaVarios: "Hace varios días",
      fechaElegir: "Elegir fecha",
      fechaPersonalizadaLabel: "Selecciona la fecha",

      // Sección 06
      step06Title: "Nivel de gravedad",
      step06Subtitle: "Selecciona el nivel que mejor describa la situación.",
      gravedadLeveTitle: "Leve",
      gravedadLeveDesc: "El problema puede esperar atención.",
      gravedadModeradaTitle: "Moderada",
      gravedadModeradaDesc: "Requiere atención en poco tiempo.",
      gravedadGraveTitle: "Grave",
      gravedadGraveDesc: "Puede afectar a varias personas.",
      gravedadCriticaTitle: "Crítica",
      gravedadCriticaDesc: "Atención inmediata requerida.",

      // Botón y nota final
      enviarReporte: "Enviar reporte",
      submitNote:
        "Al enviar este formulario aceptas que la información proporcionada " +
        "sea utilizada únicamente para la gestión del reporte realizado.",

      // Navbar
      navInicio: "Inicio",
      navNoticias: "Noticias",
      navMapas: "Mapas",
      navEducacion: "Educación",
      navUnete: "Únete",
      navComunidad: "Comunidad",
      navVoluntariado: "Voluntariado",
      navTienda: "Tienda",
      navSobreNosotros: "Sobre nosotros",
      navMiHuella: "Mi huella",
      navGuardados: "Guardados",
      navConfiguracion: "Configuración",
      navCambiarCuenta: "Cambiar cuenta",
      navCerrarSesion: "Cerrar sesión",

      // Footer
      footerTagline: "Conectando comunidades con soluciones de agua limpia para un Panamá sostenible.",
      footerPlataforma: "Plataforma",
      footerInicio: "Inicio",
      footerMapa: "Mapa interactivo",
      footerReportar: "Reportar fuga",
      footerEducacion: "Educación",
      footerComunidad: "Comunidad",
      footerVoluntariado: "Voluntariado",
      footerForos: "Foros",
      footerEventos: "Eventos",
      footerBlog: "Blog ambiental",
      footerLegal: "Legal",
      footerTerminos: "Términos de uso",
      footerPrivacidad: "Privacidad",
      footerSobreNosotros: "Sobre nosotros",
      footerContacto: "Contacto",
      footerCopy: "© 2026 ClearDrop. Todos los derechos reservados."
    },

    en: {
      langLabel: "Español",

      heroBadge: "REPORT INCIDENTS",
      heroTitle: "Help us take care of water by reporting any problem in your community.",
      heroDescription:
        "Fill out the form below to report leaks, contamination, low pressure, " +
        "flooding, or other water-related issues. Our team will receive your report " +
        "for proper follow-up.",

      // Sección 01
      step01Title: "Report type",
      step01Subtitle: "Select the issue you want to report.",
      cardSinAguaTitle: "No water",
      cardSinAguaDesc: "There is no drinking water supply.",
      cardContaminadaTitle: "Contaminated water",
      cardContaminadaDesc: "Water with unusual color, smell, or appearance.",
      cardPresionTitle: "Low pressure",
      cardPresionDesc: "Water is coming through with low pressure.",
      cardFugaTitle: "Water leak",
      cardFugaDesc: "Report leaking pipes or connections.",
      cardInundacionTitle: "Flooding",
      cardInundacionDesc: "Water buildup in streets or homes.",
      cardOtroTitle: "Other",
      cardOtroDesc: "Describe a different problem.",
      otroLabel: "Specify the problem",
      otroPlaceholder: "Describe the problem...",

      // Sección 02
      step02Title: "Incident location",
      step02Subtitle: "Select the exact location of the report using the interactive map.",
      buscarDireccionLabel: "Search address",
      buscarDireccionPlaceholder: "Type an address...",
      usarUbicacion: "Use my location",
      direccionLabel: "Address",
      direccionVacia: "No location selected.",
      latitudLabel: "Latitude",
      longitudLabel: "Longitude",

      // Sección 03
      step03Title: "Photo evidence",
      step03Subtitle: "Add up to three images to support your report.",
      dropzoneTitle: "Drag your images here",
      dropzoneText: "or click to select them from your device.",
      dropzoneSmall: "Maximum 3 images • 5 MB per file",

      // Sección 04
      step04Title: "Problem description",
      step04Subtitle: "Provide as much detail as possible.",
      descripcionLabel: "Describe what happened",
      descripcionPlaceholder: "Describe the problem in as much detail as possible...",

      // Sección 05
      step05Title: "When did it happen?",
      step05Subtitle: "Indicate when the reported incident occurred.",
      fechaHoy: "Today",
      fechaAyer: "Yesterday",
      fechaVarios: "Several days ago",
      fechaElegir: "Choose date",
      fechaPersonalizadaLabel: "Select the date",

      // Sección 06
      step06Title: "Severity level",
      step06Subtitle: "Select the level that best describes the situation.",
      gravedadLeveTitle: "Mild",
      gravedadLeveDesc: "The problem can wait for attention.",
      gravedadModeradaTitle: "Moderate",
      gravedadModeradaDesc: "Requires attention soon.",
      gravedadGraveTitle: "Severe",
      gravedadGraveDesc: "May affect several people.",
      gravedadCriticaTitle: "Critical",
      gravedadCriticaDesc: "Immediate attention required.",

      // Botón y nota final
      enviarReporte: "Submit report",
      submitNote:
        "By submitting this form you agree that the information provided will be " +
        "used solely for managing the submitted report.",

      // Navbar
      navInicio: "Home",
      navNoticias: "News",
      navMapas: "Maps",
      navEducacion: "Education",
      navUnete: "Join Us",
      navComunidad: "Community",
      navVoluntariado: "Volunteering",
      navTienda: "Marketplace",
      navSobreNosotros: "About us",
      navMiHuella: "My footprint",
      navGuardados: "Saved",
      navConfiguracion: "Settings",
      navCambiarCuenta: "Switch account",
      navCerrarSesion: "Log out",

      // Footer
      footerTagline: "Connecting communities with clean water solutions for a sustainable Panama.",
      footerPlataforma: "Platform",
      footerInicio: "Home",
      footerMapa: "Interactive map",
      footerReportar: "Report a leak",
      footerEducacion: "Education",
      footerComunidad: "Community",
      footerVoluntariado: "Volunteering",
      footerForos: "Forums",
      footerEventos: "Events",
      footerBlog: "Environmental blog",
      footerLegal: "Legal",
      footerTerminos: "Terms of use",
      footerPrivacidad: "Privacy",
      footerSobreNosotros: "About us",
      footerContacto: "Contact",
      footerCopy: "© 2026 ClearDrop. All rights reserved."
    }
  };

  // ---------------------------------------------------------
  // Mapa: clave de traducción -> selector(es) + propiedad a actualizar
  // ---------------------------------------------------------
  function applyTranslations(lang) {
    const t = translations[lang];
    if (!t) return;

    const setText = (selector, value) => {
      document.querySelectorAll(selector).forEach((el) => {
        el.textContent = value;
      });
    };

    const setPlaceholder = (selector, value) => {
      document.querySelectorAll(selector).forEach((el) => {
        el.setAttribute("placeholder", value);
      });
    };

    // Botón de idioma
    setText("#langLabel", t.langLabel);

    // Hero
    setText(".cd-reportes__hero-badge", t.heroBadge);
    setText(".cd-reportes__hero-title", t.heroTitle);
    setText(".cd-reportes__hero-description", t.heroDescription);

    // Sección 01 - Tipo de reporte
    const section01 = document.querySelectorAll(".cd-section")[0];
    if (section01) {
      section01.querySelector(".cd-section__title").textContent = t.step01Title;
      section01.querySelector(".cd-section__subtitle").textContent = t.step01Subtitle;
    }

    const reportCards = document.querySelectorAll(".cd-report-card");
    const reportCardKeys = [
      ["cardSinAguaTitle", "cardSinAguaDesc"],
      ["cardContaminadaTitle", "cardContaminadaDesc"],
      ["cardPresionTitle", "cardPresionDesc"],
      ["cardFugaTitle", "cardFugaDesc"],
      ["cardInundacionTitle", "cardInundacionDesc"],
      ["cardOtroTitle", "cardOtroDesc"]
    ];
    reportCards.forEach((card, i) => {
      const [titleKey, descKey] = reportCardKeys[i] || [];
      if (!titleKey) return;
      const h3 = card.querySelector("h3");
      const p = card.querySelector("p");
      if (h3) h3.textContent = t[titleKey];
      if (p) p.textContent = t[descKey];
    });

    const otroLabel = document.querySelector('label[for="cdOtroInput"]');
    if (otroLabel) otroLabel.textContent = t.otroLabel;
    setPlaceholder("#cdOtroInput", t.otroPlaceholder);

    // Sección 02 - Ubicación
    const section02 = document.querySelectorAll(".cd-section")[1];
    if (section02) {
      section02.querySelector(".cd-section__title").textContent = t.step02Title;
      section02.querySelector(".cd-section__subtitle").textContent = t.step02Subtitle;
    }
    const buscarLabel = document.querySelector('label[for="cdBuscarDireccion"]');
    if (buscarLabel) buscarLabel.textContent = t.buscarDireccionLabel;
    setPlaceholder("#cdBuscarDireccion", t.buscarDireccionPlaceholder);
    setText("#cdUbicacionActual", t.usarUbicacion);

    const locationLabels = document.querySelectorAll(".cd-location-label");
    if (locationLabels[0]) locationLabels[0].textContent = t.direccionLabel;
    if (locationLabels[1]) locationLabels[1].textContent = t.latitudLabel;
    if (locationLabels[2]) locationLabels[2].textContent = t.longitudLabel;

    // Solo actualizar el texto de dirección si sigue en su estado vacío por defecto
    const direccionEl = document.getElementById("cdDireccion");
    if (direccionEl && (
      direccionEl.textContent.trim() === translations.es.direccionVacia ||
      direccionEl.textContent.trim() === translations.en.direccionVacia
    )) {
      direccionEl.textContent = t.direccionVacia;
    }

    // Sección 03 - Evidencia fotográfica
    const section03 = document.querySelectorAll(".cd-section")[2];
    if (section03) {
      section03.querySelector(".cd-section__title").textContent = t.step03Title;
      section03.querySelector(".cd-section__subtitle").textContent = t.step03Subtitle;
    }
    const dropzoneH3 = document.querySelector("#cdDropZone h3");
    const dropzoneP = document.querySelector("#cdDropZone p");
    const dropzoneSmall = document.querySelector("#cdDropZone small");
    if (dropzoneH3) dropzoneH3.textContent = t.dropzoneTitle;
    if (dropzoneP) dropzoneP.textContent = t.dropzoneText;
    if (dropzoneSmall) dropzoneSmall.textContent = t.dropzoneSmall;

    // Sección 04 - Descripción
    const section04 = document.querySelectorAll(".cd-section")[3];
    if (section04) {
      section04.querySelector(".cd-section__title").textContent = t.step04Title;
      section04.querySelector(".cd-section__subtitle").textContent = t.step04Subtitle;
    }
    const descripcionLabel = document.querySelector('label[for="cdDescripcion"]');
    if (descripcionLabel) descripcionLabel.textContent = t.descripcionLabel;
    setPlaceholder("#cdDescripcion", t.descripcionPlaceholder);

    // Sección 05 - Fecha
    const section05 = document.querySelectorAll(".cd-section")[4];
    if (section05) {
      section05.querySelector(".cd-section__title").textContent = t.step05Title;
      section05.querySelector(".cd-section__subtitle").textContent = t.step05Subtitle;
    }
    const dateCards = document.querySelectorAll(".cd-date-grid .cd-option-card");
    const dateKeys = ["fechaHoy", "fechaAyer", "fechaVarios", "fechaElegir"];
    dateCards.forEach((card, i) => {
      const h3 = card.querySelector("h3");
      if (h3 && dateKeys[i]) h3.textContent = t[dateKeys[i]];
    });
    const fechaPersonalizadaLabel = document.querySelector('label[for="cdFecha"]');
    if (fechaPersonalizadaLabel) fechaPersonalizadaLabel.textContent = t.fechaPersonalizadaLabel;

    // Sección 06 - Gravedad
    const section06 = document.querySelectorAll(".cd-section")[5];
    if (section06) {
      section06.querySelector(".cd-section__title").textContent = t.step06Title;
      section06.querySelector(".cd-section__subtitle").textContent = t.step06Subtitle;
    }
    const severityCards = document.querySelectorAll(".cd-severity-card");
    const severityKeys = [
      ["gravedadLeveTitle", "gravedadLeveDesc"],
      ["gravedadModeradaTitle", "gravedadModeradaDesc"],
      ["gravedadGraveTitle", "gravedadGraveDesc"],
      ["gravedadCriticaTitle", "gravedadCriticaDesc"]
    ];
    severityCards.forEach((card, i) => {
      const [titleKey, descKey] = severityKeys[i] || [];
      if (!titleKey) return;
      const h3 = card.querySelector("h3");
      const p = card.querySelector("p");
      if (h3) h3.textContent = t[titleKey];
      if (p) p.textContent = t[descKey];
    });

    // Botón enviar + nota
    setText(".cd-submit-text", t.enviarReporte);
    setText(".cd-submit-note", t.submitNote);

    // Navbar (escritorio)
    const navLinks = document.querySelectorAll(".nav-links > li > a");
    navLinks.forEach((a) => {
      const href = a.getAttribute("href") || "";
      if (href === "index.html") a.textContent = t.navInicio;
      else if (href === "noticias.html") a.textContent = t.navNoticias;
      else if (href === "mapa.html") a.textContent = t.navMapas;
      else if (href === "educacion.html") a.textContent = t.navEducacion;
      else if (href === "tienda.html") a.textContent = t.navTienda;
      else if (href === "sobre-nosotros.html") a.textContent = t.navSobreNosotros;
    });

    document.querySelectorAll(".nav-dropdown-toggle").forEach((btn) => {
      // Solo el botón "Únete" tiene texto (el de perfil solo tiene imagen)
      if (btn.textContent.trim().length > 0) {
        const arrow = btn.querySelector("svg");
        btn.childNodes.forEach((node) => {
          if (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0) {
            node.textContent = t.navUnete + " ";
          }
        });
      }
    });

    document.querySelectorAll(".nav-dropdown-menu a").forEach((a) => {
      const href = a.getAttribute("href") || "";
      if (href === "comunidad.html") a.textContent = t.navComunidad;
      else if (href === "voluntariado.html") a.textContent = t.navVoluntariado;
    });

    document.querySelectorAll(".nav-dropdown-perfil a").forEach((a) => {
      const href = a.getAttribute("href") || "";
      if (href === "#mi-huella") a.textContent = t.navMiHuella;
      else if (href === "#guardados") a.textContent = t.navGuardados;
      else if (href === "#configuracion") a.textContent = t.navConfiguracion;
      else if (href === "#cambiar-cuenta") a.textContent = t.navCambiarCuenta;
      else if (href === "#cerrar-sesion") a.textContent = t.navCerrarSesion;
    });

    // Nav móvil
    document.querySelectorAll(".mobile-nav > a").forEach((a) => {
      const href = a.getAttribute("href") || "";
      if (href === "index.html") a.textContent = t.navInicio;
      else if (href === "noticias.html") a.textContent = t.navNoticias;
      else if (href === "mapa.html") a.textContent = t.navMapas;
      else if (href === "educacion.html") a.textContent = t.navEducacion;
      else if (href === "tienda.html") a.textContent = t.navTienda;
      else if (href === "sobre-nosotros.html") a.textContent = t.navSobreNosotros;
    });

    document.querySelectorAll(".mobile-nav-submenu a").forEach((a) => {
      const href = a.getAttribute("href") || "";
      if (href === "comunidad.html") a.textContent = t.navComunidad;
      else if (href === "voluntariado.html") a.textContent = t.navVoluntariado;
    });

    // Footer
    const footerTagline = document.querySelector(".footer-brand p");
    if (footerTagline) footerTagline.textContent = t.footerTagline;

    const footerHeadings = document.querySelectorAll(".footer-heading");
    const footerHeadingKeys = ["footerPlataforma", "footerComunidad", "footerLegal"];
    footerHeadings.forEach((h, i) => {
      if (footerHeadingKeys[i]) h.textContent = t[footerHeadingKeys[i]];
    });

    const footerLinkGroups = document.querySelectorAll(".footer-links");
    if (footerLinkGroups[0]) {
      const links = footerLinkGroups[0].querySelectorAll("a");
      const keys = ["footerInicio", "footerMapa", "footerReportar", "footerEducacion"];
      links.forEach((a, i) => { if (keys[i]) a.textContent = t[keys[i]]; });
    }
    if (footerLinkGroups[1]) {
      const links = footerLinkGroups[1].querySelectorAll("a");
      const keys = ["footerVoluntariado", "footerForos", "footerEventos", "footerBlog"];
      links.forEach((a, i) => { if (keys[i]) a.textContent = t[keys[i]]; });
    }
    if (footerLinkGroups[2]) {
      const links = footerLinkGroups[2].querySelectorAll("a");
      const keys = ["footerTerminos", "footerPrivacidad", "footerSobreNosotros", "footerContacto"];
      links.forEach((a, i) => { if (keys[i]) a.textContent = t[keys[i]]; });
    }

    const footerBottom = document.querySelector(".footer-bottom span");
    if (footerBottom) footerBottom.textContent = t.footerCopy;

    // Atributo lang del documento
    document.documentElement.setAttribute("lang", lang);
  }

  // ---------------------------------------------------------
  // Toggle de idioma
  // ---------------------------------------------------------
  function toggleLang() {
    currentLang = currentLang === "es" ? "en" : "es";
    applyTranslations(currentLang);
  }

  // ---------------------------------------------------------
  // Inicialización: clonamos el botón para eliminar cualquier
  // listener duplicado que script.js pudiera haberle agregado,
  // y le añadimos SOLO nuestro listener de traducción.
  // ---------------------------------------------------------
  function init() {
    const original = document.getElementById("langToggle");
    if (!original) return;

    const clean = original.cloneNode(true);
    original.parentNode.replaceChild(clean, original);

    clean.addEventListener("click", toggleLang);

    // Estado inicial (español, coincide con el HTML)
    currentLang = "es";
    applyTranslations(currentLang);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }


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
})();