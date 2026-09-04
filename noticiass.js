document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Filtro de alertas urgentes ---------- */
 /* const urgentCheckbox = document.getElementById('urgentOnly');
  const cards = document.querySelectorAll('.news-card');

  if (urgentCheckbox) {
    urgentCheckbox.addEventListener('change', () => {
      cards.forEach(card => {
        if (urgentCheckbox.checked) {
          card.style.display = card.classList.contains('urgent') ? 'flex' : 'none';
        } else {
          card.style.display = 'flex';
        }
      });
    });
  }/*

    /* ---------- Filtro combinado: región + urgentes ---------- */
  const urgentCheckbox = document.getElementById('urgentOnly');
  const filterRegion = document.getElementById('filterRegion');
  const cards = document.querySelectorAll('.news-card');

  function aplicarFiltros() {
    const region = filterRegion ? filterRegion.value : 'todas';
    const soloUrgentes = urgentCheckbox ? urgentCheckbox.checked : false;

    cards.forEach(card => {
      const coincideRegion = (region === 'todas' || card.dataset.region === region);
      const coincideUrgente = (!soloUrgentes || card.classList.contains('urgent'));
      card.style.display = (coincideRegion && coincideUrgente) ? 'flex' : 'none';
    });
  }

  if (urgentCheckbox) urgentCheckbox.addEventListener('change', aplicarFiltros);
  if (filterRegion) filterRegion.addEventListener('change', aplicarFiltros);

  /* ---------- Dropdowns de escritorio (Novedades / Únete) ---------- */
  const dropdowns = document.querySelectorAll('.nav-dropdown');

  dropdowns.forEach(drop => {
    const toggle = drop.querySelector('.nav-dropdown-toggle');
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = drop.classList.contains('open');
      dropdowns.forEach(d => { d.classList.remove('open'); d.querySelector('.nav-dropdown-toggle').setAttribute('aria-expanded', 'false'); });
      if (!isOpen) {
        drop.classList.add('open');
        toggle.setAttribute('aria-expanded', 'true');
      }
    });
  });

  document.addEventListener('click', () => {
    dropdowns.forEach(d => { d.classList.remove('open'); d.querySelector('.nav-dropdown-toggle').setAttribute('aria-expanded', 'false'); });
  });

  /* ---------- Menú hamburguesa / panel móvil ---------- */
  const menuBtn = document.getElementById('menuBtn');
  const menuClose = document.getElementById('menuClose');
  const mobileNav = document.getElementById('mobileNav');

  function openMobileNav() {
    mobileNav.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeMobileNav() {
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (menuBtn) menuBtn.addEventListener('click', openMobileNav);
  if (menuClose) menuClose.addEventListener('click', closeMobileNav);

  /* ---------- Submenús dentro del panel móvil ---------- */
  const mobileGroups = document.querySelectorAll('.mobile-nav-group');
  mobileGroups.forEach(group => {
    const toggle = group.querySelector('.mobile-nav-toggle');
    toggle.addEventListener('click', () => {
      const isOpen = group.classList.contains('open');
      mobileGroups.forEach(g => { g.classList.remove('open'); g.querySelector('.mobile-nav-toggle').setAttribute('aria-expanded', 'false'); });
      if (!isOpen) {
        group.classList.add('open');
        toggle.setAttribute('aria-expanded', 'true');
      }
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

});
