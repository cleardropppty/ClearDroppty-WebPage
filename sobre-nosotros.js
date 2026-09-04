/* =========================================================
   SOBRE NOSOTROS - JAVASCRIPT
   ========================================================= */

/* =========================================================
   Animaciones de revelación en scroll (reutiliza del script principal)
   Se ejecuta cuando los elementos entran en viewport
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Scroll reveal para elementos con clase .reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => revealObs.observe(el));

  /* ---------- Efecto de pausa en marquee con mouse ---------- */
  const marqueeTrack = document.querySelector('.marquee-track');
  
  if (marqueeTrack) {
    const marqueeContainer = document.querySelector('.allies-marquee');
    
    marqueeContainer.addEventListener('mouseenter', () => {
      marqueeTrack.style.animationPlayState = 'paused';
    });

    marqueeContainer.addEventListener('mouseleave', () => {
      marqueeTrack.style.animationPlayState = 'running';
    });

    /* Pausa también en touch (móvil) */
    marqueeContainer.addEventListener('touchstart', () => {
      marqueeTrack.style.animationPlayState = 'paused';
    });

    marqueeContainer.addEventListener('touchend', () => {
      marqueeTrack.style.animationPlayState = 'running';
    });
  }

  /* ---------- Efecto hover en tarjetas de equipo ---------- */
  const teamCards = document.querySelectorAll('.team-card');
  
  teamCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px)';
    });

    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });

  /* ---------- Efecto hover en tarjetas "Qué hacemos" ---------- */
  const whatCards = document.querySelectorAll('.what-card');
  
  whatCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px)';
    });

    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });

  /* ---------- Efecto hover en tarjetas de impacto ---------- */
  const impactCards = document.querySelectorAll('.impact-card');
  
  impactCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-6px)';
    });

    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });

  /* ---------- Efecto hover en tarjetas de aliados ---------- */
  const allyCards = document.querySelectorAll('.ally-card');
  
  allyCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-4px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  /* ---------- Smooth scroll para enlaces internos ---------- */
  const internalLinks = document.querySelectorAll('a[href^="#"]');
  
  internalLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href !== '#' && document.querySelector(href)) {
        e.preventDefault();
        
        const target = document.querySelector(href);
        const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;
        const offsetTop = target.offsetTop - navHeight;
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ---------- Animación de contadores (si existen) ---------- */
  const statElements = document.querySelectorAll('.why-stat-number');
  
  const animateStats = () => {
    statElements.forEach(el => {
      const text = el.textContent.trim();
      const number = parseInt(text.replace(/\D/g, ''));
      const suffix = text.replace(/\d/g, '').trim();
      
      if (!isNaN(number)) {
        let current = 0;
        const increment = Math.ceil(number / 30);
        
        const counter = setInterval(() => {
          current += increment;
          if (current >= number) {
            current = number;
            clearInterval(counter);
          }
          el.textContent = current + suffix;
        }, 50);
      }
    });
  };

  /* Ejecuta la animación cuando la sección entra en viewport */
  const whySection = document.querySelector('.section-why');
  
  if (whySection) {
    const statsObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          animateStats();
          statsObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });

    statsObs.observe(whySection);
  }

  /* ---------- Parallax suave en hero (opcional) ---------- */
  

  /* ---------- Accesibilidad: Enfoque en tarjetas ---------- */
  const allInteractiveCards = document.querySelectorAll(
    '.team-card, .what-card, .impact-card, .ally-card'
  );
  
  allInteractiveCards.forEach(card => {
    card.setAttribute('tabindex', '0');
    
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        card.click();
      }
    });

    card.addEventListener('focus', function() {
      this.style.outline = '3px solid var(--blue-sky)';
      this.style.outlineOffset = '2px';
    });

    card.addEventListener('blur', function() {
      this.style.outline = 'none';
    });
  });

  /* ---------- Efecto ripple en botones CTA ---------- */
  const ctaButtons = document.querySelectorAll('.section-cta .btn');
  
  ctaButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.position = 'absolute';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.borderRadius = '50%';
      ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
      ripple.style.top = y + 'px';
      ripple.style.left = x + 'px';
      ripple.style.pointerEvents = 'none';
      ripple.style.transform = 'scale(0)';
      ripple.style.animation = 'ripple-anim 0.6s ease-out';
      
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });

  /* ---------- Animación de entrada en cards de equipo con delay ---------- */
  const teamCardsWithDelay = document.querySelectorAll('.team-card');
  
  teamCardsWithDelay.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.animation = `fadeUp 0.6s ease ${index * 0.08}s forwards`;
  });

  /* ---------- Animación de entrada en cards "Qué hacemos" con delay ---------- */
  const whatCardsWithDelay = document.querySelectorAll('.what-card');
  
  whatCardsWithDelay.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.animation = `fadeUp 0.6s ease ${index * 0.1}s forwards`;
  });

  /* ---------- Animación de entrada en cards de impacto con delay ---------- */
  const impactCardsWithDelay = document.querySelectorAll('.impact-card');
  
  impactCardsWithDelay.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.animation = `fadeUp 0.6s ease ${index * 0.08}s forwards`;
  });

  /* ---------- Manejo de imágenes fallidas (placeholder fallback) ---------- */
  const teamAvatars = document.querySelectorAll('.team-avatar img');
  const allyImages = document.querySelectorAll('.ally-card img');

  const handleImageError = (img) => {
    img.style.display = 'none';
    const fallback = document.createElement('div');
    fallback.style.width = '100%';
    fallback.style.height = '100%';
    fallback.style.backgroundColor = '#E8F2FB';
    fallback.style.display = 'flex';
    fallback.style.alignItems = 'center';
    fallback.style.justifyContent = 'center';
    fallback.style.fontSize = '2rem';
    fallback.style.color = '#38B6E8';
    fallback.innerHTML = '👤';
    img.parentElement.appendChild(fallback);
  };

  teamAvatars.forEach(img => {
    img.addEventListener('error', () => handleImageError(img));
  });

  allyImages.forEach(img => {
    img.addEventListener('error', () => {
      img.style.display = 'none';
      const fallback = document.createElement('div');
      fallback.style.display = 'flex';
      fallback.style.alignItems = 'center';
      fallback.style.justifyContent = 'center';
      fallback.style.fontSize = '1.5rem';
      fallback.style.color = '#999';
      fallback.innerHTML = '📦';
      img.parentElement.appendChild(fallback);
    });
  });

  /* ---------- Detector de movimiento en hero (parallax sutil) ---------- */
  const heroVisual = document.querySelector('.hero-about-visual');
  
  if (heroVisual && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    document.addEventListener('mousemove', (e) => {
      if (window.scrollY < 500) {
        const x = (window.innerWidth / 2 - e.clientX) / 50;
        const y = (window.innerHeight / 2 - e.clientY) / 50;
        
        heroVisual.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg)`;
      }
    });

    document.addEventListener('mouseleave', () => {
      heroVisual.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
  }

  /* ---------- Analytics (opcional): Registro de secciones visitadas ---------- */
  const sections = document.querySelectorAll('[id^="quienes"], [id^="que-"], [id^="por-"], [id^="impacto"], [id^="aliados"], [id^="cta"]');
  
  const sectionObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const sectionId = e.target.id;
        // Aquí podrías enviar datos a Google Analytics u otro servicio
        // console.log('Usuario visitó sección:', sectionId);
      }
    });
  }, { threshold: 0.5 });

  sections.forEach(section => sectionObs.observe(section));

});

/* =========================================================
   Estilos adicionales inyectados dinámicamente
   ========================================================= */
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple-anim {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }

  /* Fallback para navegadores que no soportan CSS variables en JS */
  .section-cta .btn:focus-visible {
    outline: 3px solid rgba(255, 255, 255, 0.5);
    outline-offset: 2px;
  }

  /* Mejora de accesibilidad para reduce motion */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;
document.head.appendChild(style);

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