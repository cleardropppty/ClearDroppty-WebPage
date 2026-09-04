/* ═══════════════════════════════════════════════════════════
   translate.js — ES ↔ EN toggle for ClearDrop
   ═══════════════════════════════════════════════════════════ */

// ── Translation map ───────────────────────────────────────
const TRANSLATIONS = {

  // NAVBAR
  "Inicio":         "Home",
  "Mapas":          "Maps",
  "Reportes":       "Reports",
  "Educación":      "Education",
  "Únete":          "Join Us",
  "Comunidad":      "Community",
  "Noticias":       "News",
  "Tienda":         "Marketplace",
  "Sobre nosotros": "About Us",
  "Abrir menú":     "Open menu",
  "Cerrar sesión": "Log out",
  "Iniciar sesión": "Log in", 
  "Crear cuenta": "Create account",

  // HERO
  "Educación azul": "Blue education",
  "para un futuro verde":          "for a green future",
  "Conecta a personas con soluciones de agua. Reporta fugas, explora el mapa interactivo y únete a la comunidad ambiental de Panamá.":
    "Connect people with water solutions. Report leaks, explore the interactive map, and join Panama's environmental community.",
  "Reportar problema": "Report issue",
  "Explorar mapa":     "Explore map",

  // QUICK ACTIONS
  "Acciones rápidas":       "Quick actions",
  "¿Qué deseas hacer hoy?": "What would you like to do today?",
  "Ver noticias":          "View news",
  "Infórmate sobre las actualizaciones del servicio del agua cerca de tu comunidad.":
    "Find out about water service updates near your community.",
  "Ver mapa interactivo":   "View interactive map",
  "Explora el mapa de Panamá con reportes en tiempo real y puntos de atención.":
    "Explore the Panama map with real-time reports and service points.",
  "Aprender sobre el agua": "Learn about water",
  "Accede a recursos educativos sobre el cuidado del agua y medio ambiente.":
    "Access educational resources on water care and the environment.",
  "Unirse como voluntario": "Join as a volunteer",
  "Únete a nuestra red de voluntarios y contribuye al uso responsable del agua.":
    "Join our volunteer network and contribute to responsible water use.",

  // STATS STRIP
  "En la provincia de Chiriquí": "In the Chiriqui province",
  "Datos recolectados":          "Collected data",
  "Personas encuestadas":        "People surveyed",
  "Tienen afectaciones con el servicio del agua":
    "Have issues with water service",
  "Corregimientos abarcados":    "Districts covered",
  "Exige una solución":          "Demand a solution",

  // MAP SECTION
  "Mapa interactivo":  "Interactive map",
  "Reportes en tiempo real en Panamá": "Real-time reports across Panama",
  "Visualiza el estado del agua en todo el país. Los marcadores muestran fugas activas, zonas en reparación y puntos de distribución de agua potable.":
    "View the water status across the country. Markers show active leaks, repair zones, and drinking water distribution points.",
  "Ver mapa completo": "View full map",
  "Panamá":            "Panama",
  "Fuga activa":       "Active leak",
  "En proceso":        "In progress",
  "Resuelto":          "Resolved",
  "Distribución":      "Distribution",

  // NEWS / ALERTS
  "Alertas & Noticias":      "Alerts & News",
  "Últimas actualizaciones": "Latest updates",
  "Ver todas":               "View all",
  "En vivo":                 "Live",

  // Ticker
  "Corte de agua programado en David – 12:45 AM":
    "Scheduled water outage in David – 12:45 AM",
  "Fuga reparada en Av. Balboa, Panamá Ciudad":
    "Leak repaired on Av. Balboa, Panama City",
  "Campaña de ahorro de agua activa en Chiriquí":
    "Water-saving campaign active in Chiriqui",
  "Nuevo punto de distribución en Colón":
    "New distribution point in Colon",
  "Taller de educación ambiental – Registro abierto":
    "Environmental education workshop – Registration open",

  // Alert 1
  "IDAAN suspenderá el servicio en comunidades por 9 horas": "IDAAN will suspend service in communities for 9 hours",
  "La planta potabilizadora Jaime Díaz Quintero de La Chorrera, reducirá su operación por limpieza y mantenimiento.":
    "The Jaime Díaz Quintero Water Treatment Plant in La Chorrera will scale back operations for cleaning and maintenance.",
  "09:14 AM – 21 de agosto": "9:14 a.m. – August 21",
  "URGENTE":        "URGENT",

  // Alert 2
  "MiAmbiente vigila la calidad del agua en Donoso": "MiAmbiente monitors water quality in Donoso",
  "La iniciativa busca verificar el cumplimiento de las acciones contempladas en el Plan de Gestión Segura.":
    "The initiative aims to verify compliance with the measures outlined in the Safety Management Plan.",
  "11:33 AM – 24 de agosto": "11:33 a.m. – August 24",
  "EN PROCESO": "IN PROCESS",

  // Alert 3
  "Fuga de agua en Av. Balboa debido a una tubería dañada": "Water leak on Balboa Avenue due to a damaged pipe.",
  "El servicio de agua potable fue restaurado con éxito. Todo Gracias a los 14 reportes de la comunidad, realizados por ciudadanos activos.": "Drinking water service was successfully restored. This was all thanks to the 14 reports from the community, submitted by active citizens.",
  "11:30 PM - Ayer": "11:30 PM - Yesterday",
  "FINALIZADO": "FINISHED",

  // Alert 4
  "Taller de Educación Ambiental": "Environmental Education Workshop",
  "Únete al taller virtual Agua para Todos el próximo viernes. Registro gratuito.":
    "Join the “Water for All” virtual workshop next Friday. Registration is free.",
  "6:00 PM - Vie, 5 Jun": "6:00 PM - Friday, June 5",
  "EVENTO": "EVENT",

  // Alert 5
  "Corte de agua en Calle Central": "Water Outage on Calle Central",
  "Se realizará suspensión del servicio por mantenimiento de tuberías principales.":
    "Service will be suspended due to maintenance on the main water lines.",
  "Hace 15 minutos": "15 minutes ago",

  // Alert 6
  "Nuevo punto de distribución en Colón": "New distribution point in Colon",
  "Disponible desde hoy en el Parque Bolívar, de lunes a viernes.":
    "Available starting today at Bolívar Park, Monday through Friday.",
  "Hoy – 8:00 AM": "Today – 8:00 AM",

  // FOOTER
  "Conectando comunidades con soluciones de agua limpia para un Panamá sostenible.":
    "Connecting communities with clean water solutions for a sustainable Panama.",
  "Plataforma":      "Platform",
  "Mapa interactivo": "Interactive map",
  "Reportar fuga": "Report a leak",
  "Voluntariado":    "Volunteering",
  "Foros":           "Forums",
  "Eventos":         "Events",
  "Blog ambiental":  "Environmental blog",
  "Legal":           "Legal",
  "Términos de uso": "Terms of use",
  "Privacidad":      "Privacy",
  "Contacto":        "Contact",
  "© 2026 ClearDrop. Todos los derechos reservados.":
    "© 2026 ClearDrop. All rights reserved.",
  "Hecho con 💧 para Panamá": "Made with 💧 for Panama",

  // FAB
  "Reportar ahora": "Report now",
};

// ── Reverse map (EN → ES) built automatically ─────────────
const TRANSLATIONS_REVERSE = Object.fromEntries(
  Object.entries(TRANSLATIONS).map(([es, en]) => [en, es])
);

// ── State ─────────────────────────────────────────────────
let isEnglish = false;

// ── Core walker ───────────────────────────────────────────
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
    if (map[trimmed] !== undefined) {
      node.textContent = node.textContent.replace(trimmed, map[trimmed]);
    }
  }

  // Attributes
  document.querySelectorAll("[placeholder],[title],[aria-label]").forEach(el => {
    ["placeholder", "title", "aria-Label"].forEach(attr => {
      const val = el[attr];
      if (val && map[val]) el[attr] = map[val];
    });
  });
}

function toggleLanguage() {
  isEnglish = !isEnglish;

  // Cambiar textos de la página
  applyTranslations(
    isEnglish ? TRANSLATIONS : TRANSLATIONS_REVERSE
  );

  // ─────────────────────────────────────────────
  // BOTÓN DE IDIOMA
  // ─────────────────────────────────────────────

  const btn = document.getElementById("langToggle");

  if (btn) {
    // Cambiar etiqueta EN / ES
    const label = btn.querySelector(".label");

    if (label) {
      label.textContent = isEnglish ? "ES" : "EN";
    }

    // Iconos
    const iconEN = btn.querySelector(".icon--en");
    const iconES = btn.querySelector(".icon--es");

    if (iconEN && iconES) {
      iconEN.style.display = isEnglish ? "none" : "inline-flex";
      iconES.style.display = isEnglish ? "inline-flex" : "none";
    }

    // Estado del botón
    btn.classList.toggle("is-en", isEnglish);

    btn.setAttribute(
      "aria-label",
      isEnglish
        ? "Cambiar a español"
        : "Switch to English"
    );

    btn.setAttribute(
      "aria-pressed",
      isEnglish ? "true" : "false"
    );
  }

  // Guardar idioma
  localStorage.setItem(
    "cleardrop-lang",
    isEnglish ? "en" : "es"
  );
}

// ── Init ──────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  // Wire up both toggle buttons
  ["langToggle", "langToggleMobile"].forEach(id => {
    document.getElementById(id)?.addEventListener("click", toggleLanguage);
  });

  // Restore saved preference
  if (localStorage.getItem("cleardrop-lang") === "en") {
    toggleLanguage();
  }
});