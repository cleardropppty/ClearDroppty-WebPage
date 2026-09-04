/* ==========================================
   CONFIGURACIÓN DE EMAILJS
   ========================================== */

// 🔑 PEGA AQUÍ TU PUBLIC KEY
const EMAILJS_PUBLIC_KEY = "Zzhd0wQyJa_7NDeX2";

// 📧 PEGA AQUÍ TU SERVICE ID
const EMAILJS_SERVICE_ID = "service_hvukf2b";

// 📨 PEGA AQUÍ TU TEMPLATE ID
const EMAILJS_TEMPLATE_ID = "template_e76nr06";


/* ==========================================
   ELEMENTOS DEL DOM
   ========================================== */

const form = document.getElementById('volunteerForm');
const submitBtn = document.getElementById('submitBtn');
const statusMessage = document.getElementById('statusMessage');

// Checkbox "Otros" de actividades
const otrosCheckbox = document.getElementById('otros-checkbox');
const otrosEspecificacionGroup = document.getElementById('otros-especificacion-group');
const otrosEspecificacionInput = document.getElementById('otros_especificacion');

// Checkbox "Otros" de distritos
const otrosDistritoCheckbox = document.getElementById('otros-distrito-checkbox');
const otrosDistritoGroup = document.getElementById('otros-distrito-especificacion-group');
const otrosDistritoInput = document.getElementById('otros_distrito_especificacion');

// Select "Otros" de disponibilidad
const disponibilidadSelect = document.getElementById('disponibilidad');
const otrosDisponibilidadGroup = document.getElementById('otros-disponibilidad-especificacion-group');
const otrosDisponibilidadInput = document.getElementById('otros_disponibilidad_especificacion');

// Select "Otros" de horas por semana
const horasSemanaSelect = document.getElementById('horas_semana');
const otrosHorasGroup = document.getElementById('otros-horas-especificacion-group');
const otrosHorasInput = document.getElementById('otros_horas_especificacion');

// Array de todos los inputs del formulario para validación
const allInputs = {
    correo: document.getElementById('correo'),
    disponibilidad: document.getElementById('disponibilidad'),
    horas_semana: document.getElementById('horas_semana'),
    nombre: document.getElementById('nombre'),
    apellido: document.getElementById('apellido'),
    telefono: document.getElementById('telefono'),
    motivacion: document.getElementById('motivacion')
};

const actividadesCheckboxes = document.querySelectorAll('input[name="actividades"]');
const comunidadesCheckboxes = document.querySelectorAll('input[name="comunidades"]');


/* ==========================================
   INICIALIZACIÓN
   ========================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar EmailJS
    emailjs.init(EMAILJS_PUBLIC_KEY);
    
    // Event listeners
    form.addEventListener('submit', handleSubmit);
    otrosCheckbox.addEventListener('change', toggleOtrosEspecificacion);
    otrosDistritoCheckbox.addEventListener('change', toggleOtrosDistrito);
    disponibilidadSelect.addEventListener('change', toggleOtrosDisponibilidad);
    horasSemanaSelect.addEventListener('change', toggleOtrosHoras);
    
    // Event listeners para validación en tiempo real
    Object.values(allInputs).forEach(input => {
        if (input) {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            input.addEventListener('focus', function() {
                clearFieldError(this);
            });
        }
    });
});


/* ==========================================
   VALIDACIÓN
   ========================================== */

/**
 * Valida un campo individual
 * @param {HTMLElement} field - Campo a validar
 * @returns {boolean} - True si es válido
 */
function validateField(field) {
    const fieldName = field.name || field.id;
    let isValid = true;
    let errorMessage = '';

    // Validación por tipo de campo
    if (fieldName === 'correo') {
        isValid = validateEmail(field.value);
        errorMessage = !isValid ? 'Por favor ingresa un correo válido.' : '';
    } 
    else if (fieldName === 'disponibilidad' || fieldName === 'horas_semana') {
        isValid = field.value !== '' && field.value !== 'disabled';
        errorMessage = !isValid ? 'Este campo es obligatorio.' : '';
    }
    else if (fieldName === 'nombre' || fieldName === 'apellido') {
        isValid = field.value.trim().length >= 2;
        errorMessage = !isValid ? 'Este campo requiere al menos 2 caracteres.' : '';
    }
    else if (fieldName === 'telefono') {
        isValid = validatePhone(field.value);
        errorMessage = !isValid ? 'Ingresa un número de teléfono válido (mínimo 7 dígitos).' : '';
    }
    else if (fieldName === 'motivacion') {
        isValid = field.value.trim().length >= 10;
        errorMessage = !isValid ? 'Por favor escribe al menos 10 caracteres.' : '';
    }
    else if (fieldName === 'otros_especificacion') {
        // Solo validar si el checkbox "Otros" está marcado
        if (otrosCheckbox.checked) {
            isValid = field.value.trim().length >= 3;
            errorMessage = !isValid ? 'Por favor especifica la actividad.' : '';
        }
    }
    else if (fieldName === 'otros_distrito_especificacion') {
        // Solo validar si el checkbox "Otros" de distritos está marcado
        if (otrosDistritoCheckbox.checked) {
            isValid = field.value.trim().length >= 3;
            errorMessage = !isValid ? 'Por favor especifica el distrito o lugar.' : '';
        }
    }
    else if (fieldName === 'otros_disponibilidad_especificacion') {
        // Solo validar si se seleccionó "Otros" en disponibilidad
        if (disponibilidadSelect.value === 'Otros') {
            isValid = field.value.trim().length >= 3;
            errorMessage = !isValid ? 'Por favor especifica tu disponibilidad.' : '';
        }
    }
    else if (fieldName === 'otros_horas_especificacion') {
        // Solo validar si se seleccionó "Otros" en horas por semana
        if (horasSemanaSelect.value === 'Otros') {
            isValid = field.value.trim().length >= 3;
            errorMessage = !isValid ? 'Por favor especifica las horas disponibles.' : '';
        }
    }

    // Mostrar o limpiar error
    if (!isValid) {
        showFieldError(field, errorMessage);
    } else {
        clearFieldError(field);
    }

    return isValid;
}

/**
 * Valida todas las actividades seleccionadas
 * @returns {boolean} - True si hay al menos una actividad seleccionada
 */
function validateActivities() {
    const anyChecked = Array.from(actividadesCheckboxes).some(cb => cb.checked);
    const errorElement = document.getElementById('actividades-error');
    
    if (!anyChecked) {
        errorElement.textContent = 'Selecciona al menos una actividad.';
        return false;
    } else {
        errorElement.textContent = '';
        return true;
    }
}

/**
 * Valida que al menos un distrito de Chiriquí haya sido seleccionado
 * @returns {boolean} - True si hay al menos un distrito seleccionado
 */
function validateComunidades() {
    const anyChecked = Array.from(comunidadesCheckboxes).some(cb => cb.checked);
    const errorElement = document.getElementById('comunidades-error');

    if (!anyChecked) {
        errorElement.textContent = 'Selecciona al menos un distrito.';
        return false;
    } else {
        errorElement.textContent = '';
        return true;
    }
}

/**
 * Valida un correo electrónico
 * @param {string} email - Correo a validar
 * @returns {boolean}
 */
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Valida un número de teléfono
 * Acepta dígitos, espacios, guiones, paréntesis y un signo + opcional al inicio.
 * Requiere al menos 7 dígitos numéricos.
 * @param {string} phone - Teléfono a validar
 * @returns {boolean}
 */
function validatePhone(phone) {
    const cleaned = phone.trim();
    const formatRegex = /^\+?[\d\s\-()]+$/;
    const digitsOnly = cleaned.replace(/\D/g, '');
    return formatRegex.test(cleaned) && digitsOnly.length >= 7;
}

/**
 * Valida el formulario completo
 * @returns {boolean} - True si el formulario es válido
 */
function validateForm() {
    let isValid = true;

    // Validar todos los inputs
    Object.values(allInputs).forEach(input => {
        if (input && !validateField(input)) {
            isValid = false;
        }
    });

    // Validar distritos
    if (!validateComunidades()) {
        isValid = false;
    }

    // Validar actividades
    if (!validateActivities()) {
        isValid = false;
    }

    // Validar campo "Otros" de actividades si está activado
    if (otrosCheckbox.checked) {
        if (!validateField(otrosEspecificacionInput)) {
            isValid = false;
        }
    }

    // Validar campo "Otros" de distritos si está activado
    if (otrosDistritoCheckbox.checked) {
        if (!validateField(otrosDistritoInput)) {
            isValid = false;
        }
    }

    // Validar campo "Otros" de disponibilidad si fue seleccionado
    if (disponibilidadSelect.value === 'Otros') {
        if (!validateField(otrosDisponibilidadInput)) {
            isValid = false;
        }
    }

    // Validar campo "Otros" de horas por semana si fue seleccionado
    if (horasSemanaSelect.value === 'Otros') {
        if (!validateField(otrosHorasInput)) {
            isValid = false;
        }
    }

    return isValid;
}

/**
 * Muestra el error de un campo
 * @param {HTMLElement} field - Campo con error
 * @param {string} message - Mensaje de error
 */
function showFieldError(field, message) {
    field.classList.add('error');
    const errorElement = document.getElementById(`${field.id}-error`);
    if (errorElement) {
        errorElement.textContent = message;
    }
}

/**
 * Limpia el error de un campo
 * @param {HTMLElement} field - Campo a limpiar
 */
function clearFieldError(field) {
    field.classList.remove('error');
    const errorElement = document.getElementById(`${field.id}-error`);
    if (errorElement) {
        errorElement.textContent = '';
    }
}


/* ==========================================
   MOSTRAR/OCULTAR CAMPO OTROS
   ========================================== */

/**
 * Muestra u oculta el campo de especificación para "Otros" (actividades)
 */
function toggleOtrosEspecificacion() {
    if (otrosCheckbox.checked) {
        otrosEspecificacionGroup.classList.add('visible');
        otrosEspecificacionInput.focus();
    } else {
        otrosEspecificacionGroup.classList.remove('visible');
        otrosEspecificacionInput.value = '';
        clearFieldError(otrosEspecificacionInput);
    }
}

/**
 * Muestra u oculta el campo de especificación para "Otros" (distritos)
 */
function toggleOtrosDistrito() {
    if (otrosDistritoCheckbox.checked) {
        otrosDistritoGroup.classList.add('visible');
        otrosDistritoInput.focus();
    } else {
        otrosDistritoGroup.classList.remove('visible');
        otrosDistritoInput.value = '';
        clearFieldError(otrosDistritoInput);
    }
}

/**
 * Muestra u oculta el campo de especificación para "Otros" (disponibilidad)
 */
function toggleOtrosDisponibilidad() {
    if (disponibilidadSelect.value === 'Otros') {
        otrosDisponibilidadGroup.classList.add('visible');
        otrosDisponibilidadInput.focus();
    } else {
        otrosDisponibilidadGroup.classList.remove('visible');
        otrosDisponibilidadInput.value = '';
        clearFieldError(otrosDisponibilidadInput);
    }
}

/**
 * Muestra u oculta el campo de especificación para "Otros" (horas por semana)
 */
function toggleOtrosHoras() {
    if (horasSemanaSelect.value === 'Otros') {
        otrosHorasGroup.classList.add('visible');
        otrosHorasInput.focus();
    } else {
        otrosHorasGroup.classList.remove('visible');
        otrosHorasInput.value = '';
        clearFieldError(otrosHorasInput);
    }
}


/* ==========================================
   ENVÍO CON EMAILJS
   ========================================== */

/**
 * Maneja el envío del formulario
 * @param {Event} event - Evento del submit
 */
async function handleSubmit(event) {
    event.preventDefault();

    // Validar formulario
    if (!validateForm()) {
        showStatusMessage('Por favor completa todos los campos obligatorios.', 'error');
        return;
    }

    // Desabilitar botón
    submitBtn.disabled = true;

    // Mostrar estado de carga
    showStatusMessage('Enviando registro...', 'loading');

    try {
        // Recopilar datos del formulario
        const formData = collectFormData();

        // Enviar con EmailJS
        const response = await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            formData
        );

        // Éxito
        showStatusMessage('¡Registro enviado correctamente! Gracias por querer formar parte de nuestros voluntarios.', 'success');
        
        // Limpiar formulario
        resetForm();

    } catch (error) {
        console.error('Error al enviar:', error);
        showStatusMessage('No pudimos enviar tu registro. Inténtalo nuevamente.', 'error');
    } finally {
        // Habilitar botón
        submitBtn.disabled = false;
    }
}

/**
 * Recopila todos los datos del formulario
 * @returns {Object} - Objeto con los datos formateados para EmailJS
 */
function collectFormData() {
    // Obtener actividades seleccionadas
    let actividadesSeleccionadas = Array.from(actividadesCheckboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value);

    // Si se especificó "Otros" en actividades, reemplazar por el texto ingresado
    if (otrosCheckbox.checked && otrosEspecificacionInput.value.trim()) {
        actividadesSeleccionadas = actividadesSeleccionadas.map(item =>
            item === 'Otros' ? `Otros: ${otrosEspecificacionInput.value.trim()}` : item
        );
    }

    // Obtener distritos de Chiriquí seleccionados
    let comunidadesSeleccionadas = Array.from(comunidadesCheckboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value);

    // Si se especificó "Otros" en distritos, reemplazar por el texto ingresado
    if (otrosDistritoCheckbox.checked && otrosDistritoInput.value.trim()) {
        comunidadesSeleccionadas = comunidadesSeleccionadas.map(item =>
            item === 'Otros' ? `Otros: ${otrosDistritoInput.value.trim()}` : item
        );
    }

    // Disponibilidad: si es "Otros", usar el texto especificado
    const disponibilidadFinal = (disponibilidadSelect.value === 'Otros' && otrosDisponibilidadInput.value.trim())
        ? `Otros: ${otrosDisponibilidadInput.value.trim()}`
        : disponibilidadSelect.value;

    // Horas por semana: si es "Otros", usar el texto especificado
    const horasSemanaFinal = (horasSemanaSelect.value === 'Otros' && otrosHorasInput.value.trim())
        ? `Otros: ${otrosHorasInput.value.trim()}`
        : horasSemanaSelect.value;

    // IMPORTANTE:
    // Los nombres de estas variables DEBEN coincidir exactamente con los nombres
    // de las variables utilizadas en tu plantilla de EmailJS.
    //
    // Si tu plantilla EmailJS utiliza nombres diferentes, reemplaza los nombres aquí.
    // Por ejemplo, si tu plantilla usa {{full_name}} en lugar de {{nombre}}, cambia "nombre" por "full_name".
    //
    // Estructura esperada en EmailJS Template:
    // {{nombre}} {{apellido}}
    // {{correo}}
    // {{telefono}}
    // {{comunidades}}
    // {{disponibilidad}}
    // {{horas_semana}}
    // {{actividades}}
    // {{motivacion}}

    const templateParams = {
        nombre: allInputs.nombre.value.trim(),
        apellido: allInputs.apellido.value.trim(),
        correo: allInputs.correo.value.trim(),
        telefono: allInputs.telefono.value.trim(),
        comunidades: comunidadesSeleccionadas.join(', '),
        disponibilidad: disponibilidadFinal,
        horas_semana: horasSemanaFinal,
        actividades: actividadesSeleccionadas.join(', '),
        motivacion: allInputs.motivacion.value.trim(),
        fecha_registro: new Date().toLocaleString('es-ES')
    };

    return templateParams;
}


/* ==========================================
   MENSAJES DE ESTADO
   ========================================== */

/**
 * Muestra un mensaje de estado
 * @param {string} message - Mensaje a mostrar
 * @param {string} type - Tipo de mensaje: 'success', 'error', 'loading'
 */
function showStatusMessage(message, type) {
    statusMessage.textContent = message;
    statusMessage.className = `status-message show ${type}`;
    statusMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Oculta el mensaje de estado
 */
function hideStatusMessage() {
    statusMessage.classList.remove('show');
}


/* ==========================================
   LIMPIAR FORMULARIO
   ========================================== */

/**
 * Limpia y reinicia el formulario
 */
function resetForm() {
    // Limpiar todos los inputs
    form.reset();

    // Limpiar estados visuales
    Object.values(allInputs).forEach(input => {
        if (input) {
            input.classList.remove('error');
        }
    });

    // Limpiar todos los checkboxes de actividades
    actividadesCheckboxes.forEach(checkbox => {
        checkbox.checked = false;
    });

    // Limpiar todos los checkboxes de distritos
    comunidadesCheckboxes.forEach(checkbox => {
        checkbox.checked = false;
    });

    // Limpiar campo de "Otros" de actividades
    otrosEspecificacionInput.value = '';
    otrosEspecificacionGroup.classList.remove('visible');
    otrosCheckbox.checked = false;

    // Limpiar campo de "Otros" de distritos
    otrosDistritoInput.value = '';
    otrosDistritoGroup.classList.remove('visible');
    otrosDistritoCheckbox.checked = false;

    // Limpiar campo de "Otros" de disponibilidad
    otrosDisponibilidadInput.value = '';
    otrosDisponibilidadGroup.classList.remove('visible');

    // Limpiar campo de "Otros" de horas por semana
    otrosHorasInput.value = '';
    otrosHorasGroup.classList.remove('visible');

    // Limpiar errores
    document.querySelectorAll('.error-message').forEach(el => {
        el.textContent = '';
    });

    // Ocultar mensaje de estado después de 5 segundos
    setTimeout(hideStatusMessage, 5000);
}


/* ==========================================
   FUNCIONES ADICIONALES
   ========================================== */

/**
 * Maneja cambios en inputs para validación en tiempo real
 */
allInputs.correo?.addEventListener('change', function() {
    validateField(this);
});

// Validar distritos en tiempo real al marcar/desmarcar
comunidadesCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', validateComunidades);
});


/* ==========================================
   DEBUGGING Y LOGS
   ========================================== */

/**
 * Función auxiliar para revisar datos antes de enviar (descomentar si es necesario)
 */
function debugFormData() {
    const data = collectFormData();
    console.log('Datos del formulario:', data);
    console.log('Correo será enviado a:', data.correo);
    return data;
}

// Descomentar la siguiente línea si necesitas debuggear en consola:
// window.debugFormData = debugFormData;

document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  const menuClose = document.getElementById('menuClose');

  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', () => mobileNav.classList.add('open'));
    if (menuClose) menuClose.addEventListener('click', () => mobileNav.classList.remove('open'));
    mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileNav.classList.remove('open')));
  }

  // Navbar shadow on scroll (same visual as index)
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const onScroll = () => {
      navbar.style.boxShadow = window.scrollY > 20 ? '0 4px 24px rgba(11,61,110,.12)' : 'none';
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
  }

  // Dropdowns (escritorio y accesibilidad con teclado)
  const dropdowns = document.querySelectorAll('.nav-dropdown');
  if (dropdowns.length) {
    dropdowns.forEach((dropdown) => {
      const toggle = dropdown.querySelector('.nav-dropdown-toggle');
      if (!toggle) return;
      toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = dropdown.classList.contains('open');

        // cerrar otros
        dropdowns.forEach((d) => {
          d.classList.remove('open');
          const t = d.querySelector('.nav-dropdown-toggle');
          if (t) t.setAttribute('aria-expanded', 'false');
        });

        if (!isOpen) {
          dropdown.classList.add('open');
          toggle.setAttribute('aria-expanded', 'true');
        }
      });
    });

    // Cerrar al click fuera
    document.addEventListener('click', () => {
      dropdowns.forEach((d) => {
        d.classList.remove('open');
        const t = d.querySelector('.nav-dropdown-toggle');
        if (t) t.setAttribute('aria-expanded', 'false');
      });
    });

    // Cerrar con Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        dropdowns.forEach((d) => {
          d.classList.remove('open');
          const t = d.querySelector('.nav-dropdown-toggle');
          if (t) t.setAttribute('aria-expanded', 'false');
        });
      }
    });
  }

  // Acordeón del menú móvil (grupos dentro de mobile-nav)
  const mobileGroups = document.querySelectorAll('.mobile-nav-group');
  mobileGroups.forEach((group) => {
    const toggle = group.querySelector('.mobile-nav-toggle');
    if (!toggle) return;
    toggle.addEventListener('click', () => {
      const isOpen = group.classList.contains('open');
      mobileGroups.forEach((g) => {
        g.classList.remove('open');
        const t = g.querySelector('.mobile-nav-toggle');
        if (t) t.setAttribute('aria-expanded', 'false');
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