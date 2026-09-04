/**
 * ============================================================
 * auth.js — Sistema de Autenticación ClearDrop
 * ============================================================
 * 
 * IMPORTANTE: Este sistema utiliza localStorage únicamente
 * como prototipo temporal. No debe considerarse como
 * autenticación segura de producción.
 * 
 * Estructura preparada para migración futura a backend/BD:
 * - Funciones reutilizables y modularizadas
 * - Separación clara entre lógica de autenticación y almacenamiento
 * - Interfaz consistente para facilitar cambio de proveedor
 * 
 * ============================================================
 */

// ============================================================
// Claves de localStorage
// ============================================================

const STORAGE_KEYS = {
  users: 'cleardrop_users',
  currentUser: 'cleardrop_current_user',
  userReports: 'cleardrop_user_reports'
};

// ============================================================
// Configuración de rutas
// ============================================================

const AUTH_ROUTES = {
  login: 'login.html',
  register: 'registro.html'
};

// ============================================================
// Inicialización
// ============================================================

/**
 * Inicializa el sistema de autenticación
 * Se ejecuta al cargar la página
 */
function initAuth() {
  // Restaurar sesión si existe
  const currentUser = getCurrentUser();
  
  // Actualizar UI del navbar
  updateAuthUI();
  
  // Opcional: listeners globales para cambios de storage (multi-tab)
  window.addEventListener('storage', () => {
    updateAuthUI();
  });
}

// ============================================================
// OBTENER ESTADO ACTUAL
// ============================================================

/**
 * Obtiene el usuario actualmente autenticado
 * @returns {Object|null} Usuario autenticado o null
 */
function getCurrentUser() {
  try {
    const userJSON = localStorage.getItem(STORAGE_KEYS.currentUser);
    return userJSON ? JSON.parse(userJSON) : null;
  } catch (e) {
    console.error('Error al obtener usuario actual:', e);
    return null;
  }
}

/**
 * Verifica si existe una sesión activa
 * @returns {boolean} true si usuario está autenticado
 */
function isLoggedIn() {
  return getCurrentUser() !== null;
}

/**
 * Obtiene el email del usuario actual (seguro)
 * @returns {string|null}
 */
function getCurrentUserEmail() {
  const user = getCurrentUser();
  return user ? user.email : null;
}

/**
 * Obtiene el nombre del usuario actual (seguro)
 * @returns {string|null}
 */
function getCurrentUserName() {
  const user = getCurrentUser();
  return user ? user.name : null;
}

// ============================================================
// VERIFICACIÓN DE AUTENTICACIÓN REUTILIZABLE
// ============================================================

/**
 * Requiere autenticación para una acción
 * Si el usuario no está autenticado, muestra un modal
 * Si está autenticado, ejecuta el callback
 * @param {Function} callback - Función a ejecutar si está autenticado
 * @param {string} mensaje - Mensaje personalizado (opcional)
 * @returns {boolean} true si está autenticado, false si no
 */
function requerirAutenticacion(callback, mensaje = null) {
  if (isLoggedIn()) {
    // Usuario autenticado, ejecutar callback
    if (typeof callback === 'function') {
      callback();
    }
    return true;
  } else {
    // Usuario no autenticado, mostrar modal
    mostrarModalAutenticacionRequerida(mensaje);
    return false;
  }
}

/**
 * Verifica si usuario está autenticado sin ejecutar callback
 * Útil para validaciones simples
 * @returns {boolean}
 */
function usuarioEstaAutenticado() {
  return isLoggedIn();
}

// ============================================================
// REGISTRO
// ============================================================

/**
 * Registra un nuevo usuario
 * @param {string} name - Nombre completo
 * @param {string} email - Correo electrónico
 * @param {string} password - Contraseña
 * @returns {Object} { success: boolean, message: string, user?: Object }
 */
function registerUser(name, email, password) {
  // Validaciones
  const validation = validateRegistrationInput(name, email, password);
  if (!validation.valid) {
    return { success: false, message: validation.message };
  }

  // Obtener usuarios existentes
  let users = getAllUsers();

  // Verificar si email ya existe
  if (users.some(u => u.email === email)) {
    return { 
      success: false, 
      message: 'Este correo electrónico ya está registrado.' 
    };
  }

  // Crear nuevo usuario
  const newUser = {
    id: generateUserId(),
    name: name.trim(),
    email: email.toLowerCase().trim(),
    password: password, // ⚠️ PROTOTIPO: Sin hash. En producción usar backend
    createdAt: new Date().toISOString(),
    reportsCount: 0
  };

  // Guardar usuario
  users.push(newUser);
  try {
    localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users));
  } catch (e) {
    console.error('Error al guardar usuario:', e);
    return { 
      success: false, 
      message: 'Error al guardar los datos. Intenta de nuevo.' 
    };
  }

  // Iniciar sesión automáticamente
  loginUserByCredentials(email, password);

  return { 
    success: true, 
    message: '¡Cuenta creada correctamente!',
    user: { id: newUser.id, name: newUser.name, email: newUser.email }
  };
}

/**
 * Valida los datos de registro
 * @private
 */
function validateRegistrationInput(name, email, password) {
  if (!name || !email || !password) {
    return { valid: false, message: 'Todos los campos son obligatorios.' };
  }

  if (name.trim().length < 2) {
    return { valid: false, message: 'El nombre debe tener al menos 2 caracteres.' };
  }

  if (!isValidEmail(email)) {
    return { valid: false, message: 'El correo electrónico no es válido.' };
  }

  if (password.length < 6) {
    return { valid: false, message: 'La contraseña debe tener al menos 6 caracteres.' };
  }

  return { valid: true };
}

/**
 * Valida formato de email
 * @private
 */
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// ============================================================
// INICIO DE SESIÓN
// ============================================================

/**
 * Inicia sesión con email y contraseña
 * @param {string} email - Correo
 * @param {string} password - Contraseña
 * @returns {Object} { success: boolean, message: string, user?: Object }
 */
function loginUserByCredentials(email, password) {
  if (!email || !password) {
    return { 
      success: false, 
      message: 'Por favor ingresa correo y contraseña.' 
    };
  }

  const users = getAllUsers();
  const user = users.find(u => u.email === email.toLowerCase().trim());

  if (!user) {
    return { 
      success: false, 
      message: 'Correo o contraseña incorrectos.' 
    };
  }

  // ⚠️ PROTOTIPO: Comparación de texto plano. En producción: hash + verificación en servidor
  if (user.password !== password) {
    return { 
      success: false, 
      message: 'Correo o contraseña incorrectos.' 
    };
  }

  // Crear sesión
  const sessionUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    loginTime: new Date().toISOString()
  };

  try {
    localStorage.setItem(STORAGE_KEYS.currentUser, JSON.stringify(sessionUser));
  } catch (e) {
    console.error('Error al guardar sesión:', e);
    return { 
      success: false, 
      message: 'Error al iniciar sesión. Intenta de nuevo.' 
    };
  }

  updateAuthUI();

  return { 
    success: true, 
    message: '¡Sesión iniciada correctamente!',
    user: sessionUser
  };
}

// ============================================================
// CIERRE DE SESIÓN
// ============================================================

/**
 * Cierra sesión del usuario actual
 * NO elimina la cuenta, solo la sesión
 * @returns {Object} { success: boolean, message: string }
 */
function logoutUser() {
  try {
    localStorage.removeItem(STORAGE_KEYS.currentUser);
    updateAuthUI();
    return { 
      success: true, 
      message: 'Sesión cerrada correctamente.' 
    };
  } catch (e) {
    console.error('Error al cerrar sesión:', e);
    return { 
      success: false, 
      message: 'Error al cerrar sesión.' 
    };
  }
}

// ============================================================
// ADMINISTRACIÓN DE USUARIOS (Base de datos local)
// ============================================================

/**
 * Obtiene todos los usuarios registrados
 * @private
 * @returns {Array} Array de usuarios
 */
function getAllUsers() {
  try {
    const usersJSON = localStorage.getItem(STORAGE_KEYS.users);
    return usersJSON ? JSON.parse(usersJSON) : [];
  } catch (e) {
    console.error('Error al obtener usuarios:', e);
    return [];
  }
}

/**
 * Genera un ID único para usuario
 * @private
 */
function generateUserId() {
  return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

/**
 * Obtiene un usuario por ID
 * @private
 */
function getUserById(userId) {
  const users = getAllUsers();
  return users.find(u => u.id === userId) || null;
}

// ============================================================
// REPORTES ASOCIADOS A USUARIO
// ============================================================

/**
 * Obtiene todos los reportes del usuario actual
 * (Preparado para futura implementación)
 * @returns {Array} Array de reportes
 */
function getCurrentUserReports() {
  const user = getCurrentUser();
  if (!user) return [];

  try {
    const reportsJSON = localStorage.getItem(STORAGE_KEYS.userReports);
    const allReports = reportsJSON ? JSON.parse(reportsJSON) : [];
    return allReports.filter(r => r.userId === user.id);
  } catch (e) {
    console.error('Error al obtener reportes:', e);
    return [];
  }
}

/**
 * Asocia un nuevo reporte al usuario actual
 * (Preparado para futura implementación)
 * @param {Object} reportData - Datos del reporte
 * @returns {Object} { success: boolean, message: string, reportId?: string }
 */
function createUserReport(reportData) {
  const user = getCurrentUser();
  if (!user) {
    return { success: false, message: 'Debes iniciar sesión para hacer reportes.' };
  }

  const report = {
    id: 'report_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
    userId: user.id,
    userEmail: user.email,
    createdAt: new Date().toISOString(),
    status: 'pending',
    ...reportData
  };

  try {
    let allReports = [];
    const reportsJSON = localStorage.getItem(STORAGE_KEYS.userReports);
    if (reportsJSON) {
      allReports = JSON.parse(reportsJSON);
    }
    
    allReports.push(report);
    localStorage.setItem(STORAGE_KEYS.userReports, JSON.stringify(allReports));

    return { 
      success: true, 
      message: 'Reporte guardado correctamente.',
      reportId: report.id
    };
  } catch (e) {
    console.error('Error al guardar reporte:', e);
    return { 
      success: false, 
      message: 'Error al guardar el reporte.' 
    };
  }
}

// ============================================================
// PROTECCIÓN DE RUTAS CON MODAL BONITO
// ============================================================

/**
 * Muestra un modal bonito pidiendo autenticación para una acción específica
 * Diseño mejorado con icono y decoraciones
 * @param {string} mensaje - Mensaje personalizado (opcional)
 */
function mostrarModalAutenticacionRequerida(mensaje = null) {
  // Verificar si el modal ya existe
  if (document.getElementById('authRequiredOverlay')) {
    return;
  }

  // Crear overlay
  const overlay = document.createElement('div');
  overlay.id = 'authRequiredOverlay';
  overlay.className = 'auth-required-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-labelledby', 'authRequiredTitle');

  // Crear modal
  const modal = document.createElement('div');
  modal.className = 'auth-required-modal';

  const mensajeTexto = mensaje || 'Crear una cuenta te permite reportar problemas de agua, hacer seguimiento de tus reportes y ayudar a mantener nuestra comunidad más limpia.';

  modal.innerHTML = `
    <button class="auth-required-modal-close" aria-label="Cerrar modal">✕</button>
    
    <div class="auth-required-modal-icon">🔒</div>
    
    <h2 class="auth-required-modal-title" id="authRequiredTitle">
      Necesitas crear una cuenta para hacer reportes
    </h2>
    
    <p class="auth-required-modal-description">
      ${mensajeTexto}
    </p>
    
    <div class="auth-required-modal-actions">
      <button class="auth-required-btn-primary" onclick="irARegistro()">
        Crear cuenta
      </button>
      <button class="auth-required-btn-secondary" onclick="irALogin()">
        Iniciar sesión
      </button>
    </div>
    
    <div class="auth-required-modal-security">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
      <span>Tu información está segura con nosotros.</span>
    </div>
  `;

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  // Botón cerrar
  const closeBtn = modal.querySelector('.auth-required-modal-close');
  closeBtn.addEventListener('click', cerrarModalAutenticacion);

  // Cerrar modal al hacer clic en el overlay (fuera del modal)
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      cerrarModalAutenticacion();
    }
  });

  // Cerrar con Escape
  const handleEscape = (e) => {
    if (e.key === 'Escape' && document.getElementById('authRequiredOverlay')) {
      cerrarModalAutenticacion();
      document.removeEventListener('keydown', handleEscape);
    }
  };
  document.addEventListener('keydown', handleEscape);
}

/**
 * Cierra el modal de autenticación requerida
 */
function cerrarModalAutenticacion() {
  const overlay = document.getElementById('authRequiredOverlay');
  if (overlay) {
    overlay.remove();
  }
}

/**
 * Redirige a la página de login
 */
function irALogin() {
  window.location.href = AUTH_ROUTES.login + '?redirect=' + encodeURIComponent(window.location.pathname);
}

/**
 * Redirige a la página de registro
 */
function irARegistro() {
  window.location.href = AUTH_ROUTES.register + '?redirect=' + encodeURIComponent(window.location.pathname);
}

/**
 * Versión heredada: Requiere autenticación para continuar (mejorada con modal)
 * Si no está autenticado, muestra un modal bonito
 * 
 * Uso en HTML:
 * <script>requireAuth();</script>
 */
function requireAuth() {
  if (!isLoggedIn()) {
    mostrarModalAutenticacionRequerida();
    // Prevenir que se ejecute más código de la página
    throw new Error('Usuario no autenticado');
  }
  return true;
}

/**
 * Redirige a página anterior o a inicio si usuario autenticado
 * Útil para login/registro exitosos
 */
function redirectAfterAuth() {
  const params = new URLSearchParams(window.location.search);
  const redirectUrl = params.get('redirect') || 'index.html';
  window.location.href = redirectUrl;
}

// ============================================================
// ACTUALIZACIÓN DE UI
// ============================================================

/**
 * Actualiza el navbar según estado de autenticación
 */
function updateAuthUI() {
  const user = getCurrentUser();
  const navDropdownPerfil = document.querySelector('.nav-dropdown-perfil');
  const navDropdownToggle = document.querySelector('.nav-dropdown:last-of-type .nav-dropdown-toggle');

  if (!navDropdownPerfil || !navDropdownToggle) return;

  if (user) {
    // Usuario autenticado
    updateAuthenticatedUI(user, navDropdownPerfil, navDropdownToggle);
  } else {
    // Usuario no autenticado
    updateUnauthenticatedUI(navDropdownPerfil, navDropdownToggle);
  }
}

/**
 * Actualiza UI para usuario autenticado
 * @private
 */
function updateAuthenticatedUI(user, profileDropdown, toggleButton) {
  // Cambiar contenido del dropdown
  profileDropdown.innerHTML = `
    <li><p>${user.email}</p></li>
    <li style="border-top: 1px solid #E8EEF5; margin-top: 8px; padding-top: 8px;">
      <a href="#" onclick="handleLogout(event)" style="color: #DC2626;">Cerrar sesión</a>
    </li>
  `;
  //Aquí agregar funciones de configuración y otros a futuro.
  // Mostrar nombre o email en el toggle
  const displayName = user.name.split(' ')[0]; // Primer nombre
  toggleButton.innerHTML = `
    <img src="img/perfil hombre.png" class="post-avatar" alt="${displayName}">
    <span style="font-size: 0.85rem; max-width: 100px; overflow: hidden; text-overflow: ellipsis;">
      ${displayName}
    </span>
    <svg class="dropdown-arrow" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>
  `;
}

/**
 * Actualiza UI para usuario no autenticado
 * @private
 */
function updateUnauthenticatedUI(profileDropdown, toggleButton) {
  // Mostrar opciones de login/registro
  profileDropdown.innerHTML = `
    <li><a href="login.html">Iniciar sesión</a></li>
    <li><a href="registro.html">Crear cuenta</a></li>
  `;

  // Mostrar icono de usuario en el toggle
  toggleButton.innerHTML = `
    <img src="img/perfil hombre.png" class="post-avatar" alt="Cuenta">
    <svg class="dropdown-arrow" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>
  `;
}

/**
 * Manejador para cerrar sesión
 */
function handleLogout(event) {
  event.preventDefault();
  const result = logoutUser();
  
  if (result.success) {
    // Mostrar mensaje y redirigir
    showNotification(result.message, 'success');
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1500);
  } else {
    showNotification(result.message, 'error');
  }
}

// ============================================================
// UTILIDADES DE NOTIFICACIONES
// ============================================================

/**
 * Muestra una notificación temporal
 * (Reutilizable en formularios)
 * @param {string} message - Mensaje a mostrar
 * @param {string} type - 'success' | 'error' | 'warning'
 * @param {number} duration - Duración en ms (default 3000)
 */
function showNotification(message, type = 'info', duration = 3000) {
  // Si existe elemento .notification, usarlo
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.textContent = message;
    existingNotification.className = `notification notification--${type} show`;
    setTimeout(() => {
      existingNotification.classList.remove('show');
    }, duration);
    return;
  }

  // Crear elemento temporal (fallback)
  const notification = document.createElement('div');
  notification.className = `notification notification--${type} show`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 80px;
    right: 20px;
    padding: 16px 24px;
    border-radius: 12px;
    font-weight: 600;
    z-index: 2000;
    max-width: 400px;
    animation: slideIn 0.3s ease;
  `;

  if (type === 'success') {
    notification.style.background = '#16A34A';
    notification.style.color = 'white';
  } else if (type === 'error') {
    notification.style.background = '#DC2626';
    notification.style.color = 'white';
  }

  document.body.appendChild(notification);
  setTimeout(() => {
    notification.remove();
  }, duration);
}

// ============================================================
// INICIALIZACIÓN AL CARGAR
// ============================================================

// Ejecutar al cargar DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAuth);
} else {
  initAuth();
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