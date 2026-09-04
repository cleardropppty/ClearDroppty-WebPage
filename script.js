/* ---- Mobile menu ---- */ // En esta sección se manejan los eventos para abrir y cerrar el menú. También guarda datos automáticamente al hacer clic en un enlace del menú, que luego podrá utiilzar//
const menuBtn = document.getElementById('menuBtn'); 
const mobileNav = document.getElementById('mobileNav');
const menuClose = document.getElementById('menuClose');

menuBtn.addEventListener('click', () => mobileNav.classList.add('open'));
menuClose.addEventListener('click', () => mobileNav.classList.remove('open'));
mobileNav.querySelectorAll('a').forEach(a =>
a.addEventListener('click', () => mobileNav.classList.remove('open'))
); //En esta sección se configura la palabra "open" para que se añada al monento de abrir el menú, y que se oculte al cerrarlo. Activa la opción en el CSS//

/* ---- Navbar shadow on scroll ---- */
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
navbar.style.boxShadow = window.scrollY > 20
? '0 4px 24px rgba(11,61,110,.12)'
: 'none';
}); //En esta sección se configura la sombra del menú al hacer scroll. //

/* ---- Scroll reveal ---- */ //En esta sección se configuran los elementos que serán revelados, y los guarda en una lista//
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
entries.forEach(e => {
if (e.isIntersecting) {
e.target.classList.add('visible');
revealObs.unobserve(e.target);
}
});
}, { threshold: 0.12 }); //Esta parte trabaja con un API, el cual cambia el estado del elemento a "visible" y luego a "invisible"//
revealEls.forEach(el => revealObs.observe(el)); //Esta parte se encarga de permitir al usuario observar cada elemento.//

/* ---- Counter animation ---- */ //En toda esta sección se configuran los fps de animación, y también permite animaciones más suaves, evitando el sobrecargar el navegador con muchas cosas.//
function animateCount(el, target, suffix) {
let start = 0;
const step = target / 60;
const tick = () => {
start = Math.min(start + step, target);
const display = target >= 100 ? Math.round(start).toLocaleString() : Math.round(start);
el.innerHTML = `${display}<span>${suffix}</span>`;  
if (start < target) requestAnimationFrame(tick);
};
requestAnimationFrame(tick);
}

const statObs = new IntersectionObserver((entries) => {
entries.forEach(e => {
if (e.isIntersecting) {
const el = e.target;
const target = parseInt(el.dataset.target);
const span = el.querySelector('span');
animateCount(el, target, span ? span.textContent : '');
statObs.unobserve(el);
}
});
}, { threshold: 0.5 });
document.querySelectorAll('.stat-value[data-target]').forEach(el => statObs.observe(el)); //convierte valores string a number en el HTML//


/* ---- Google Maps ---- */
function initMap() {
  const panama = { lat: 8.994, lng: -79.519 };

  const mapStyles = [
    { featureType: 'water',       elementType: 'geometry',   stylers: [{ color: '#B8E4FC' }] },
    { featureType: 'landscape',   elementType: 'geometry',   stylers: [{ color: '#C8E6A0' }] },
    { featureType: 'road',        elementType: 'geometry',   stylers: [{ color: '#ffffff' }, { weight: 0.8 }] },
    { featureType: 'road',        elementType: 'labels.text.fill', stylers: [{ color: '#3A5368' }] },
    { featureType: 'poi',         elementType: 'all',        stylers: [{ visibility: 'off' }] },
    { featureType: 'transit',     elementType: 'all',        stylers: [{ visibility: 'off' }] },
    { featureType: 'administrative', elementType: 'geometry.stroke', stylers: [{ color: '#7AAD55' }, { weight: 1 }] },
    { featureType: 'administrative', elementType: 'labels.text.fill', stylers: [{ color: '#0B3D6E' }] }
  ];

  const map = new google.maps.Map(document.getElementById('googleMap'), {
    center: panama,
    zoom: 7,
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
    zoomControlOptions: { position: google.maps.ControlPosition.RIGHT_BOTTOM }
  });

  const locations = [
    { lat: 8.994,  lng: -79.519, label: 'Fuga activa – Panamá Ciudad', color: '#EF5350' },
    { lat: 9.359,  lng: -79.900, label: 'Resuelto – Colón',            color: '#4CAF78' },
    { lat: 7.964,  lng: -80.527, label: 'En proceso – Chitré',         color: '#FFC107' },
    { lat: 7.762,  lng: -80.272, label: 'Distribución – Las Tablas',   color: '#29B6F6' },
    { lat: 8.427,  lng: -82.433, label: 'Resuelto – David',            color: '#4CAF78' },
    { lat: 8.517,  lng: -80.351, label: 'Fuga activa – Penonomé',      color: '#EF5350' }
  ];

  const infoWindow = new google.maps.InfoWindow();

  locations.forEach(loc => {
    const marker = new google.maps.Marker({
      position: { lat: loc.lat, lng: loc.lng },
      map,
      title: loc.label,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: loc.color,
        fillOpacity: 1,
        strokeColor: '#ffffff',
        strokeWeight: 2,
        scale: 9
      }
    });

    marker.addListener('click', () => {
      infoWindow.setContent(
        `<div style="font-family:'DM Sans',sans-serif;font-size:.82rem;font-weight:600;color:#0D2233;padding:.15rem .2rem">${loc.label}</div>`
      );
      infoWindow.open(map, marker);
    });
  });
}

/* ---- Action cards subtle entrance ---- */
document.querySelectorAll('.action-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.08}s`;
});

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