/* ==========================================================
   ClearDrop · Sección Educación — interacciones
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* =========================================================
     CARRUSEL "¿SABÍAS QUE...?"
     ========================================================= */

  // Datos del carrusel en ambos idiomas
  const facts = {
    es: [
      'Solo el 2.5% del agua del planeta es dulce.',
      'Un grifo goteando puede desperdiciar más de 11,000 litros de agua al año.',
      'Una ducha de 5 minutos usa menos de la mitad del agua que un baño en tina.',
      'El 70% del agua dulce del mundo se destina a la agricultura.',
      'Reparar una fuga a tiempo puede ahorrar hasta 10% en tu factura de agua.'
    ],

    en: [
      'Only 2.5% of the planet’s water is fresh.',
      'A dripping faucet can waste more than 11,000 liters of water per year.',
      'A 5-minute shower uses less than half the water of a bathtub.',
      '70% of the world’s freshwater is used for agriculture.',
      'Repairing a leak in time can save up to 10% on your water bill.'
    ]
  };

  // Idioma actual del carrusel
  let currentLang = localStorage.getItem('cleardrop-lang') || 'es';

  // Si por alguna razón existe un idioma no válido, usamos español
  if (currentLang !== 'es' && currentLang !== 'en') {
    currentLang = 'es';
  }

  let factIndex = 0;

  const factText = document.getElementById('factText');
  const factDots = document.getElementById('factDots');
  const factPrev = document.getElementById('factPrev');
  const factNext = document.getElementById('factNext');
  const factCard = document.getElementById('factCard');


  /* ---------- Verificar que exista el carrusel ---------- */

  if (factText && factDots && factPrev && factNext) {

    /* ---------- Crear los puntos ---------- */

    function renderDots() {
      factDots.innerHTML = '';

      facts[currentLang].forEach((_, i) => {

        const dot = document.createElement('button');

        dot.className =
          'fact-dot' + (i === factIndex ? ' active' : '');

        // También traducimos el aria-label
        dot.setAttribute(
          'aria-label',
          currentLang === 'en'
            ? `Go to fact ${i + 1}`
            : `Ir al dato ${i + 1}`
        );

        dot.addEventListener('click', () => {
          factIndex = i;
          updateFact();
        });

        factDots.appendChild(dot);
      });
    }


    /* ---------- Actualizar el dato ---------- */

    function updateFact() {

      // Evitar errores si el índice no existe
      if (!facts[currentLang][factIndex]) {
        factIndex = 0;
      }

      factText.textContent = facts[currentLang][factIndex];

      renderDots();
    }


    /* ---------- Botón anterior ---------- */

    factPrev.addEventListener('click', () => {

      factIndex =
        (factIndex - 1 + facts[currentLang].length) %
        facts[currentLang].length;

      updateFact();
    });


    /* ---------- Botón siguiente ---------- */

    factNext.addEventListener('click', () => {

      factIndex =
        (factIndex + 1) %
        facts[currentLang].length;

      updateFact();
    });


    /* ---------- Mostrar primer dato ---------- */

    updateFact();


    /* ---------- Autoplay ---------- */

    let autoplay = setInterval(() => {

      factIndex =
        (factIndex + 1) %
        facts[currentLang].length;

      updateFact();

    }, 6000);


    /* ---------- Detener autoplay al pasar el mouse ---------- */

    if (factCard) {
      factCard.addEventListener('mouseenter', () => {
        clearInterval(autoplay);
      });
    }


    /* ---------- Cambiar idioma ---------- */

    document.addEventListener('languagechange', (event) => {

      const newLang = event.detail?.lang;

      if (newLang !== 'es' && newLang !== 'en') {
        return;
      }

      currentLang = newLang;

      // Conservamos el mismo dato que estaba viendo el usuario
      // siempre que exista en el nuevo idioma.
      if (factIndex >= facts[currentLang].length) {
        factIndex = 0;
      }

      updateFact();
    });

  }


  /* =========================================================
     REPRODUCIR VIDEOS
     ========================================================= */

  document.querySelectorAll('.video-card').forEach(card => {

    const youtubeUrl = card.dataset.youtube;
    const playBtn = card.querySelector('.play-btn');
    const watchBtn = card.querySelector('.btn-dark');

    function playVideo() {

      if (youtubeUrl) {
        window.open(
          youtubeUrl,
          '_blank',
          'noopener,noreferrer'
        );
      }

    }

    if (playBtn) {
      playBtn.addEventListener('click', playVideo);
    }

    if (watchBtn) {
      watchBtn.addEventListener('click', playVideo);
    }

  });


  /* =========================================================
     BOTONES "VER INFOGRAFÍA"
     ========================================================= */

  document.querySelectorAll('.btn-outline').forEach(btn => {

    btn.addEventListener('click', () => {

      const pdfUrl = btn.dataset.pdf;

      if (pdfUrl) {

        window.open(
          pdfUrl,
          '_blank',
          'noopener,noreferrer'
        );

      } else {

        const infoCard = btn.closest('.info-card');

        if (infoCard) {

          const title =
            infoCard.querySelector('h3')?.textContent || '';

          console.log(`Abrir infografía: ${title}`);

        }

      }

    });

  });


  /* =========================================================
     BOTONES "DESCARGAR GUÍA"
     ========================================================= */

  document.querySelectorAll('.guide-download').forEach(btn => {

    btn.addEventListener('click', () => {

      const pdfUrl = btn.dataset.pdf;

      if (pdfUrl) {

        window.open(
          pdfUrl,
          '_blank',
          'noopener,noreferrer'
        );

      }

    });

  });


  /* =========================================================
     TARJETAS DE CONSEJO (TIP-CARD)
     ========================================================= */

  document.querySelectorAll('.tip-arrow').forEach(btn => {

    btn.addEventListener('click', () => {

      const tipCard = btn.closest('.tip-card');

      if (tipCard) {

        const title =
          tipCard.querySelector('h3')?.textContent || '';

        console.log(`Ver detalle de: ${title}`);

      }

    });

  });

});
