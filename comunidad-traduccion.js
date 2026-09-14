/* ═══════════════════════════════════════════════════════════
   comunidad-traduccion.js — ES ↔ EN toggle for ClearDrop (página Comunidad)
   ═══════════════════════════════════════════════════════════ */

// ── Translation map (ES → EN) ─────────────────────────────
const TRANSLATIONS = {
  // NAVBAR
  "Inicio":         "Home",
  "Mapas":          "Maps",
  "Reportes":       "Reports",
  "Educación":      "Education",
  "Únete":         "Join us",
  "Voluntariado":    "Volunteering",
  "Comunidad":      "Community",
  "Noticias":       "News",
  "Tienda":         "Marketplace",
  "Sobre nosotros": "About Us",
  "Abrir menú":     "Open menu",
  "Cerrar sesión":   "Log out",
  "Iniciar sesión": "Log in",
  "Crear cuenta": "Create account",

  // ENCABEZADO DE COMUNIDAD
  "Comparte preguntas, consejos y experiencias para cuidar el agua y construir un futuro sostenible juntos.":
    "Share questions, tips, and experiences to care for water and build a sustainable future together.",
  "Personas compartiendo experiencias sobre el cuidado del agua":
    "People sharing experiences about water conservation",

  // BUSCADOR
  "Buscar en la comunidad": "Search the community",

  // FILTROS
  "Todas":         "All",
  "Preguntas":     "Questions",
  "Consejos":      "Tips",
  "Experiencias":  "Experiences",
  "Necesidades":   "Needs",

  // PUBLICACIONES — genéricos
  "Más opciones":         "More options",
  "Comentar":              "Comment",
  "Colapsar respuestas":   "Collapse replies",

  // Publicación 1
  "Hace 20 horas": "20 hours ago",
  "Todos los días no tenemos agua y siempre la misma excusa no hay respeto para los residentes por parte de las autoridades de la comunidad.":
    "Every day we have no water and always the same excuse — no respect for residents from the community authorities.",
  "#agua #comunidad #experiencia #respetoparaelagua #respetociudadano":
    "#water #community #experience #respectforwater #citizenrespect",
  "Hace 17 horas": "17 hours ago",
  "Por la urbanización Lassonde, se han presentado muchas quejas al IDAAN. Hace 3 años revisaron y la presión del agua mejoró, pero de nuevo tenemos baja presión.":
    "In the Lassonde neighborhood, many complaints have been filed with IDAAN. Three years ago they inspected it and water pressure improved, but now we have low pressure again.",
  "Hace 11 horas": "11 hours ago",
  "Entiendo tu frustración. Es importante que la comunidad se una para exigir mejores servicios. ¿Has intentado contactar a los representantes locales o a organizaciones de derechos humanos?":
    "I understand your frustration. It's important for the community to come together to demand better services. Have you tried contacting local representatives or human rights organizations?",
  "Escribe una respuesta...": "Write a response...",

  // Publicación 2
  "Hace 21 horas": "21 hours ago",
  "Cuidado con nuestros recursos hídricos: Tenemos que protegerlos para no tener problemas con la falta de agua en nuestro país.":
    "Be careful with our water resources: We must protect them to avoid problems with water scarcity in our country.",
  "#agua #consejo #cuidado #recursoshídricos #futuroverde #sostenibilidad":
    "#water #tip #care #waterresources #greenfuture #sustainability",
  "Escribe un comentario...": "Write a comment...",

  // Publicación 3
  "¿Qué hago si mi agua sale con sedimentos?": "What should I do if my water comes out with sediments?",
  "He intentado de todo, y nunca se filtra al 100%.": "I've tried everything, and it never filters 100%.",

  // SIDEBAR
  "Categorías populares":         "Popular categories",
  "Top Colaboradores":            "Top contributors",
  "Ver todos los colaboradores":  "View all contributors",

  "Crear publicación": "Create post",

  // FOOTER
  "Conectando comunidades con soluciones de agua limpia para un Panamá sostenible.":
    "Connecting communities with clean water solutions for a sustainable Panama.",
  "Plataforma":       "Platform",
  "Mapa interactivo": "Interactive map",
  "Reportar fuga":    "Report a leak",
  "Foros":            "Forums",
  "Eventos":          "Events",
  "Blog ambiental":   "Environmental blog",
  "Legal":            "Legal",
  "Términos de uso":  "Terms of use",
  "Privacidad":       "Privacy",
  "Contacto":         "Contact",
  "© 2026 ClearDrop. Todos los derechos reservados.":
    "© 2026 ClearDrop. All rights reserved.",
  "Educación azul para un futuro verde":
    "Blue education for a green future",

  // FAB
  "Reportar ahora": "Report now",
};

// ── Reverse map (EN → ES), generado automáticamente ───────
const TRANSLATIONS_REVERSE = Object.fromEntries(
  Object.entries(TRANSLATIONS).map(([es, en]) => [en, es])
);

// ── Recorre el DOM y sustituye los textos según el mapa ───
function applyTranslations(map) {
  const SKIP = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "TEXTAREA", "INPUT"]);

  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        if (SKIP.has(node.parentElement?.tagName)) return NodeFilter.FILTER_REJECT;
        return node.textContent.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
      },
    }
  );

  let node;
  while ((node = walker.nextNode())) {
    const trimmed = node.textContent.trim();
    // Colapsa saltos de línea / espacios internos (por indentación en el HTML)
    // a un solo espacio para poder buscarlo en el diccionario.
    const normalized = trimmed.replace(/\s+/g, " ");
    if (map[normalized] !== undefined) {
      node.textContent = node.textContent.replace(trimmed, map[normalized]);
    }
  }

  // Atributos (placeholder, title, aria-label, alt)
  document.querySelectorAll("[placeholder],[title],[aria-label],[alt]").forEach(el => {
    ["placeholder", "title", "ariaLabel", "alt"].forEach(attr => {
      const val = el[attr];
      if (val && map[val]) el[attr] = map[val];
    });
  });
}

/* lang-toggle.js
   - Muestra EN / ES y cambia el icono al alternar
   - Guarda selección en localStorage ('site_lang')
   - Actualiza <html lang="...">
   - Traduce el contenido de la página usando TRANSLATIONS / TRANSLATIONS_REVERSE
   - Emite evento 'languagechange' con detail { lang }
   - El HTML esperado: <button id="langToggle" class="lang-toggle" aria-pressed="false">...</button>
*/
(() => {
  const LANG_KEY = 'site_lang';
  const button = document.getElementById('langToggle');
  if (!button) return;

  const label = button.querySelector('.label');

  // Aplica estado visual (clases) y atributos ARIA
  function applyVisualState(lang) {
    button.classList.toggle('is-en', lang === 'en');
    button.classList.toggle('is-es', lang === 'es');
    if (label) label.textContent = lang.toUpperCase();
    button.setAttribute('aria-pressed', String(lang === 'es')); // ejemplo: pressed cuando es ES
  }

  // Traduce el contenido visible según el idioma de destino
  function translateContent(lang) {
    applyTranslations(lang === 'en' ? TRANSLATIONS : TRANSLATIONS_REVERSE);
  }

  // Guarda, traduce y emite evento
  function finalizeLang(lang, save = true) {
    try { document.documentElement.lang = lang; } catch (e) {}
    applyVisualState(lang);
    translateContent(lang);
    if (save) localStorage.setItem(LANG_KEY, lang);
    document.dispatchEvent(new CustomEvent('languagechange', { detail: { lang } }));
  }

  // Detecta idioma inicial: localStorage -> atributo html -> navigator -> 'es'
  function detectInitialLang() {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved === 'es' || saved === 'en') return saved;
    const docLang = (document.documentElement.lang || '').toLowerCase();
    if (docLang.startsWith('es')) return 'es';
    if (docLang.startsWith('en')) return 'en';
    const nav = (navigator.language || navigator.userLanguage || 'es').toLowerCase();
    if (nav.startsWith('en')) return 'en';
    return 'es';
  }

  // Inicializa el componente
  function init(save = false) {
    const lang = detectInitialLang();
    finalizeLang(lang, save);
  }

  // Click para alternar
  button.addEventListener('click', () => {
    const current = localStorage.getItem(LANG_KEY) || (document.documentElement.lang || 'es');
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

  // El feed de publicaciones (#communityFeed) se genera dinámicamente con
  // script-comunidad.js (al filtrar, buscar o crear una publicación). Cuando
  // eso ocurre, el contenido vuelve a insertarse en español. Este observer
  // reaplica la traducción automáticamente si el idioma activo es inglés.
  function watchFeedForReRenders() {
    const feedEl = document.getElementById('communityFeed');
    if (!feedEl || typeof MutationObserver === 'undefined') return;

    const observer = new MutationObserver(() => {
      const current = localStorage.getItem(LANG_KEY) || (document.documentElement.lang || 'es');
      if (current === 'en') applyTranslations(TRANSLATIONS);
    });

    observer.observe(feedEl, { childList: true, subtree: true });
  }

  // Arranque: si el DOM ya está listo, inicializa; si no, espera DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      init(false);
      watchFeedForReRenders();
    });
  } else {
    init(false);
    watchFeedForReRenders();
  }
})();
