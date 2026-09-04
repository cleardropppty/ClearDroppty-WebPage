/* ============================================================
   TRA.JS — Sistema de traducción ES/EN para ClearDrop (mapa.html)
   ------------------------------------------------------------
   - currentLang es la ÚNICA fuente de verdad sobre el idioma activo.
   - Los textos traducibles se definen en el objeto TRANSLATIONS,
     usando selectores CSS como llave.
   - Antes de enganchar el evento de click, clonamos el botón
     (cloneNode(true)) y lo reemplazamos en el DOM. Esto elimina
     cualquier listener que otro script (ej. script.js) le haya
     agregado previamente, evitando que el label se "trabe" o
     que el toggle se dispare varias veces.
   ============================================================ */

(function () {
  "use strict";

  // ------------------------------------------------------------
  // 1. ESTADO GLOBAL DEL IDIOMA
  // ------------------------------------------------------------
  // 'es' = Español (idioma por defecto del sitio)
  // 'en' = English
  let currentLang = localStorage.getItem("clearDropLang") || "es";

  // ------------------------------------------------------------
  // 2. DICCIONARIO DE TRADUCCIONES
  // ------------------------------------------------------------
  // Cada entrada usa un selector CSS único (o el más específico
  // posible) como llave, y un objeto { es, en } con los textos.
  // Si necesitas agregar más textos, solo añade una línea aquí.
  
  const TRANSLATIONS = {
    // --- Navbar ---
    'a[href="index.html"]': { es: "Inicio", en: "Home" },
    'a[href="noticias.html"]': { es: "Noticias", en: "News" },
    'a[href="mapa.html"].active': { es: "Mapas", en: "Maps" },
    'a[href="educacion.html"]': { es: "Educación", en: "Education" },
    'a[href="tienda.html"]': { es: "Tienda", en: "Marketplace" },
    'a[href="sobre-nosotros.html"]': { es: "Sobre nosotros", en: "About us" },
    ".nav-dropdown-toggle": { es: "Únete", en: "Join us" },

    // Submenú "Únete"
    'a[href="comunidad.html"]': { es: "Comunidad", en: "Community" },
    'a[href="voluntariado.html"]': { es: "Voluntariado", en: "Volunteering" },

    // Submenú de perfil
    'a[href="#perfil"]': { es: "Mi perfil", en: "My profile" },
    'a[href="#mi-huella"]': { es: "Mi huella", en: "My footprint" },
    'a[href="#guardados"]': { es: "Guardados", en: "Saved" },
    'a[href="#configuracion"]': { es: "Configuración", en: "Settings" },
    'a[href="#cambiar-cuenta"]': { es: "Cambiar cuenta", en: "Switch account" },
    'a[href="#cerrar-sesion"]': { es: "Cerrar sesión", en: "Log out" },

    // --- Menú móvil ---
    '.mobile-nav > a[href="index.html"]': { es: "Inicio", en: "Home" },
    '.mobile-nav > a[href="#noticias"]': { es: "Noticias", en: "News" },
    '.mobile-nav > a[href="mapa.html"]': { es: "Mapas", en: "Maps" },
    '.mobile-nav > a[href="#educacion"]': { es: "Educación", en: "Education" },
    '.mobile-nav > a[href="#tienda"]': { es: "Tienda", en: "Store" },
    '.mobile-nav > a[href="#nosotros"]': { es: "Sobre nosotros", en: "About us" },
    ".mobile-nav-toggle": { es: "Comunidad", en: "Community" },
    '.mobile-nav-submenu > a[href="comunidad.html"]': { es: "Comunidad", en: "Community" },
    '.mobile-nav-submenu > a[href="#voluntariado"]': { es: "Voluntariado", en: "Volunteering" },
    '.mobile-nav-submenu > a[href="#cuenta"]': { es: "Mi cuenta", en: "My account" },
    '.mobile-nav-submenu > a[href="#agregar"]': { es: "Agregar cuenta", en: "Add account" },
    '.mobile-nav-submenu > a[href="#cerrar-sesion"]': { es: "Cerrar sesión", en: "Log out" },

    // --- Sidebar de filtros ---
    ".sidebar__header h2": { es: "Filtros", en: "Filters" },
    ".sidebar__subtitle": {
      es: "Selecciona las afectaciones del agua que deseas visualizar.",
      en: "Select the water issues you want to display.",
    },
    "#toggleSidebarBtn": { es: "Ocultar", en: "Hide" },

    // Filtros individuales (título)
    '.filter-item[data-filter="sin_suministro"] .filter-copy__title': {
      es: "Sin suministro de agua",
      en: "No water supply",
    },
    '.filter-item[data-filter="sin_suministro"] p': {
      es: "Ausencia total del suministro de agua potable.",
      en: "Total absence of drinking water supply.",
    },
    '.filter-item[data-filter="contaminacion"] .filter-copy__title': {
      es: "Contaminación del agua",
      en: "Water contamination",
    },
    '.filter-item[data-filter="contaminacion"] p': {
      es: "Alteración de la calidad del agua por agentes contaminantes.",
      en: "Water quality alteration caused by contaminants.",
    },
    '.filter-item[data-filter="baja_presion"] .filter-copy__title': {
      es: "Baja presión",
      en: "Low pressure",
    },
    '.filter-item[data-filter="baja_presion"] p': {
      es: "Suministro de agua con presión inferior a la normal.",
      en: "Water supply with below-normal pressure.",
    },
    '.filter-item[data-filter="fugas"] .filter-copy__title': {
      es: "Fugas de agua",
      en: "Water leaks",
    },
    '.filter-item[data-filter="fugas"] p': {
      es: "Pérdidas de agua por daños en tuberías o conexiones.",
      en: "Water loss due to damaged pipes or connections.",
    },

    // Los dos <li> con data-filter="ecosistemas" (Inundaciones, Afectación a ecosistemas, Otros)
    // Como comparten selector, los tratamos por índice más abajo (ver TRANSLATIONS_INDEXED).

    "#clearFiltersBtn": { es: "Limpiar filtros", en: "Clear filters" },

    ".promo-card h3": { es: "Explora Chiriquí", en: "Explore Chiriquí" },
    ".promo-card p": {
      es: "Descubre las afectaciones del agua en tu comunidad y contribuye a la solución.",
      en: "Discover water issues in your community and help solve them.",
    },
    ".promo-card__footer": {
      es: "buscar se actualizan constantemente.",
      en: "Data is updated constantly.",
    },

    // --- Panel principal del mapa ---
    ".map-panel__header h1": { es: "Mapa de Chiriquí", en: "Map of Chiriqui" },
    ".map-panel__header > div > p": {
      es: "Explora las afectaciones del agua en la provincia",
      en: "Explore water issues across the province",
    },
    '.view-btn[data-view="mapa"]': { es: "Mapa", en: "Map" },
    '.view-btn[data-view="satelite"]': { es: "Satélite", en: "Satellite" },
    '.view-btn[data-view="hibrido"]': { es: "Híbrido", en: "Hybrid" },
    "#legendBtn": { es: "Leyenda", en: "Legend" },
    "#mapSearchInput": { es: "Buscar ubicación", en: "Search location", attr: "placeholder" },

    // Contador y widgets flotantes
    ".counter-card__number span": { es: "Afectaciones", en: "Issues" },
    ".counter-card__updated": { es: "Actualizado hace 5 min", en: "Updated 5 min ago" },
    ".summary-bar > span:first-child": { es: "Resumen de afectaciones", en: "Issues summary" },

    // Tarjeta de detalle
    "#detailTag": { es: "Contaminación del agua", en: "Water contamination" },
    "#detailLugar": { es: "David, Chiriquí", en: "David, Chiriqui" },
    "#detailTitulo": { es: "Río David", en: "David River" },
    "#detailDesc": {
      es: "Presencia de desechos sólidos y vertimientos en el cauce del río.",
      en: "Presence of solid waste and discharge in the riverbed.",
    },
    "#detailActualizado": { es: "Actualizado recientemente", en: "Recently updated" },
    ".detail-card__impact > span:first-child": { es: "Impacto", en: "Impact" },
    "#detailImpacto": { es: "Alto", en: "High" },
    ".detail-card__meta span:nth-child(1)": { es: "Salud pública", en: "Public health" },
    ".detail-card__meta span:nth-child(2)": { es: "Calidad del agua", en: "Water quality" },
    ".detail-card__button-text": { es: "Ver en reportes", en: "View in reports" },

    // Widget de reporte
    ".report-widget h4": { es: "¿Ves una afectación?", en: "Spotted an issue?" },
    ".report-widget p": {
      es: "Repórtala y ayuda a tu comunidad.",
      en: "Report it and help your community.",
    },
    "#reportBtn": { es: "Reportar afectación", en: "Report issue" },

    // --- Footer ---
    ".footer-brand p": {
      es: "Conectando comunidades con soluciones de agua limpia para un Panamá sostenible.",
      en: "Connecting communities with clean water solutions for a sustainable Panama.",
    },
    ".footer-grid > div:nth-child(2) .footer-heading": { es: "Plataforma", en: "Platform" },
    ".footer-grid > div:nth-child(3) .footer-heading": { es: "Comunidad", en: "Community" },
    ".footer-grid > div:nth-child(4) .footer-heading": { es: "Legal", en: "Legal" },
  };

  // ------------------------------------------------------------
  // 2b. TRADUCCIONES POR ÍNDICE
  // ------------------------------------------------------------
  // Para elementos que comparten exactamente el mismo selector
  // (los 3 <li data-filter="ecosistemas">), traducimos por orden
  // de aparición en el DOM.
  const INDEXED_TRANSLATIONS = [
    {
      selector: '.filter-item[data-filter="inundaciones"] .filter-copy__title',
      values: [
        { es: "Inundaciones", en: "Flooding" },
      ],
    },
    {
      selector: '.filter-item[data-filter="inundaciones"] p',
      values: [
        {
          es: "Desbordamientos o acumulación de agua que generan afectaciones.",
          en: "Overflow or water accumulation causing damage.",
        },
      ],
    },
    {
      selector: '.filter-item[data-filter="ecosistemas"] .filter-copy__title',
      values: [
        { es: "Afectación a ecosistemas", en: "Ecosystem impact" },
      ],
    },
    {
      selector: '.filter-item[data-filter="ecosistemas"] p',
      values: [
        {
          es: "Impacto en ríos, cuencas y biodiversidad",
          en: "Impact on rivers, watersheds and biodiversity",
        },
        {
          es: "Reportes relacionados con el servicio que no pertenecen a las categorías anteriores.",
          en: "Service-related reports that don't fit the categories above.",
        },
      ],
    },
    {
      selector: '.filter-item[data-filter="otros"] .filter-copy__title',
      values: [
        { es: "Otros", en: "Other" },
      ],
    },
    {
      selector: '.filter-item[data-filter="otros"] p',
      values: [
        {
          es: "Reportes relacionados con el servicio que no pertenecen a las categorías anteriores.",
          en: "Service-related reports that don't fit the categories above.",
        },
      ],
    },
    {
      selector: '.footer-links',
      // Cada <ul class="footer-links"> tiene 4 <li><a> — traducimos por bloque
      lists: [
        [
          { es: "Inicio", en: "Home" },
          { es: "Mapa interactivo", en: "Interactive map" },
          { es: "Reportar fuga", en: "Report a leak" },
          { es: "Educación", en: "Education" },
        ],
        [
          { es: "Voluntariado", en: "Volunteering" },
          { es: "Foros", en: "Forums" },
          { es: "Eventos", en: "Events" },
          { es: "Blog ambiental", en: "Environmental blog" },
        ],
        [
          { es: "Términos de uso", en: "Terms of use" },
          { es: "Privacidad", en: "Privacy" },
          { es: "Sobre nosotros", en: "About us" },
          { es: "Contacto", en: "Contact" },
        ],
      ],
    },
  ];

  // ------------------------------------------------------------
  // 3. APLICAR TRADUCCIÓN AL DOM
  // ------------------------------------------------------------
  function applyTranslations(lang) {
    // --- Traducciones simples por selector único ---
    Object.keys(TRANSLATIONS).forEach((selector) => {
      const entry = TRANSLATIONS[selector];
      const el = document.querySelector(selector);
      if (!el) return;

      const text = lang === "en" ? entry.en : entry.es;

      if (entry.attr) {
        el.setAttribute(entry.attr, text);
      } else {
        // Si el elemento tiene nodos hijos con íconos (ej. <i data-lucide>),
        // solo tocamos el texto, no el HTML interno completo.
        setTextPreservingIcons(el, text);
      }
    });

    // --- Traducciones por índice (elementos repetidos) ---
    INDEXED_TRANSLATIONS.forEach((group) => {
      if (group.lists) {
        // caso especial: footer-links (listas completas)
        const lists = document.querySelectorAll(group.selector);
        lists.forEach((ul, listIndex) => {
          const values = group.lists[listIndex];
          if (!values) return;
          const links = ul.querySelectorAll("a");
          links.forEach((a, i) => {
            if (values[i]) {
              a.textContent = lang === "en" ? values[i].en : values[i].es;
            }
          });
        });
        return;
      }

      const elements = document.querySelectorAll(group.selector);
      elements.forEach((el, i) => {
        const values = group.values[i];
        if (!values) return;
        const text = lang === "en" ? values.en : values.es;
        setTextPreservingIcons(el, text);
      });
    });

    // --- Placeholder especial: nav-logo-nombre / atributos alt ---
    const langLabel = document.getElementById("langLabel");
    if (langLabel) {
      // Muestra el idioma AL QUE SE PUEDE CAMBIAR, no el actual
      langLabel.textContent = lang === "en" ? "Español" : "English";
    }

    // --- Actualiza atributo lang del <html> ---
    document.documentElement.setAttribute("lang", lang);
  }

  // Reemplaza solo el texto visible de un elemento, sin borrar
  // íconos <i> o <svg> que pueda contener antes del texto.
  function setTextPreservingIcons(el, newText) {
    if (el.children.length === 0) {
      // Elemento sin hijos (ej. <p>, <h1>, <a> simple): reemplazo directo
      el.textContent = newText;
      return;
    }

    // Elemento CON hijos (íconos, spans, etc.):
    // Eliminamos TODOS los nodos de texto existentes (incluyendo los
    // de solo espacios en blanco) para evitar duplicados, y luego
    // agregamos un único nodo de texto limpio al final.
    const textNodes = [];
    el.childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        textNodes.push(node);
      }
    });
    textNodes.forEach((node) => el.removeChild(node));

    el.appendChild(document.createTextNode(" " + newText));
  }

  // ------------------------------------------------------------
  // 4. TOGGLE DE IDIOMA
  // ------------------------------------------------------------
  function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem("clearDropLang", currentLang);
    applyTranslations(currentLang);
  }

  function toggleLanguage() {
    setLanguage(currentLang === "es" ? "en" : "es");
  }

  // ------------------------------------------------------------
  // 5. ENGANCHAR EL BOTÓN — LIMPIANDO LISTENERS PREVIOS
  // ------------------------------------------------------------
  // Clonamos el botón y lo reemplazamos por su clon: esto elimina
  // CUALQUIER event listener agregado por otros scripts (ej.
  // script.js) sin afectar sus atributos ni su HTML interno.
  function bindLangToggle() {
    const original = document.getElementById("langToggle");
    if (!original) return;

    const clone = original.cloneNode(true);
    original.parentNode.replaceChild(clone, original);

    clone.addEventListener("click", (e) => {
      e.preventDefault();
      toggleLanguage();
    });
  }

  // ------------------------------------------------------------
  // 6. INICIALIZACIÓN
  // ------------------------------------------------------------
  function init() {
    bindLangToggle();
    applyTranslations(currentLang);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    // El script tiene 'defer', así que normalmente el DOM ya está listo,
    // pero por seguridad esperamos también a que Leaflet/lucide corran.
    init();
  }

  // Exponemos utilidades por si mapa.js necesita consultarlas
  window.ClearDropI18n = {
    getLang: () => currentLang,
    setLang: setLanguage,
    toggle: toggleLanguage,
  };
})();