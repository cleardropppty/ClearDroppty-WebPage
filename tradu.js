/* ============================================================
   tradu.js — ES ↔ EN toggle for ClearDrop (EXTENDIDO para contenido dinámico)
   ============================================================ */

/* ---------------- TRANSLATIONS (ES -> EN) ----------------
   --- Mantén este objeto tal cual; es la fuente canonical ---
   (He copiado tu mapa TRANSLATIONS tal como estaba en el proyecto)
*/
const TRANSLATIONS = {

  // ──── NAVBAR ────────────────────────────────────────────
  "Inicio": "Home",
  "Mapas": "Maps",
  "Reportes": "Reports",
  "Educación": "Education",
  "Únete": "Join Us",
  "Comunidad": "Community",
  "Voluntariado": "Volunteering",
  "Noticias": "News",
  "Tienda": "Marketplace",
  "Sobre nosotros": "About Us",
  "Abrir menú": "Open menu",
  "Cerrar sesión": "Log out",

  // ──── HERO (index) ──────────────────────────────────────
  "Educación azul": "Blue education",
  "para un futuro verde": "for a green future",
  "Conecta a personas con soluciones de agua. Reporta fugas, explora el mapa interactivo y únete a la comunidad ambiental de Panamá.":
    "Connect people with water solutions. Report leaks, explore the interactive map, and join Panama's environmental community.",
  "Reportar problema": "Report issue",
  "Explorar mapa": "Explore map",

  // ──── QUICK ACTIONS (index) ────────────────────────────
  "Acciones rápidas": "Quick actions",
  "¿Qué deseas hacer hoy?": "What would you like to do today?",
  "Ver noticias": "View news",
  "Infórmate sobre las actualizaciones del servicio del agua cerca de tu comunidad.":
    "Find out about water service updates near your community.",
  "Ver mapa interactivo": "View interactive map",
  "Explora el mapa de Panamá con reportes en tiempo real y puntos de atención.":
    "Explore the Panama map with real-time reports and service points.",
  "Aprender sobre el agua": "Learn about water",
  "Accede a recursos educativos sobre el cuidado del agua y medio ambiente.":
    "Access educational resources on water care and the environment.",
  "Unirse como voluntario": "Join as a volunteer",
  "Únete a nuestra red de voluntarios y contribuye al uso responsable del agua.":
    "Join our volunteer network and contribute to responsible water use.",

  // ──── STATS STRIP (index) ──────────────────────────────
  "En la provincia de Chiriquí": "In the Chiriqui province",
  "Datos recolectados": "Collected data",
  "Personas encuestadas": "People surveyed",
  "Tienen afectaciones con el servicio del agua":
    "Have issues with water service",
  "Corregimientos abarcados": "Districts covered",
  "Exige una solución": "Demand a solution",

  // ──── MAP SECTION (index) ──────────────────────────────
  "Mapa interactivo": "Interactive map",
  "Reportes en tiempo real en Panamá": "Real-time reports across Panama",
  "Visualiza el estado del agua en todo el país. Los marcadores muestran fugas activas, zonas en reparación y puntos de distribución de agua potable.":
    "View the water status across the country. Markers show active leaks, repair zones, and drinking water distribution points.",
  "Ver mapa completo": "View full map",
  "Panamá": "Panama",
  "Fuga activa": "Active leak",
  "En proceso": "In progress",
  "Resuelto": "Resolved",
  "Distribución": "Distribution",

  // ──── NEWS / ALERTS (index) ────────────────────────────
  "Alertas & Noticias": "Alerts & News",
  "Últimas actualizaciones": "Latest updates",
  "Ver todas": "View all",
  "En vivo": "Live",

  // ──── TICKER (index) ────────────────────────────────────
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

  // ──── ALERT 1 ───────────────────────────────────────────
  "Corte de agua programado en David": "Scheduled water outage in David",
  "Interrupción del servicio entre las 10 PM y las 4 AM por mantenimiento de tubería principal.":
    "Service interruption from 10 PM to 4 AM due to main pipeline maintenance.",
  "12:45 AM – Hoy": "12:45 AM – Today",
  "Urgente": "Urgent",

  // ──── ALERT 2 ───────────────────────────────────────────
  "Fuga detectada en Penonomé": "Leak detected in Penonome",
  "Equipo técnico ya fue despachado. Se estima reparación en 3 horas.":
    "Technical team has been dispatched. Repair estimated within 3 hours.",
  "2:10 AM – Hoy": "2:10 AM – Today",

  // ──── ALERT 3 ───────────────────────────────────────────
  "Taller de Educación Ambiental": "Environmental Education Workshop",
  "Únete al taller virtual \"Agua para Todos\" el próximo viernes. Registro gratuito.":
    "Join the virtual workshop \"Water for All\" next Friday. Free registration.",
  "Vie, 5 Jun — 6:00 PM": "Fri, Jun 5 — 6:00 PM",
  "Evento": "Event",

  // ──── ALERT 4 ───────────────────────────────────────────
  "Fuga en Av. Balboa reparada": "Leak on Av. Balboa repaired",
  "El servicio fue restaurado con éxito. Gracias a los 14 reportes de la comunidad.":
    "Service successfully restored. Thanks to 14 community reports.",
  "Ayer – 11:30 PM": "Yesterday – 11:30 PM",

  // ──── ALERT 5 ───────────────────────────────────────────
  "Campaña de ahorro en Chiriquí": "Water-saving campaign in Chiriqui",
  "Se solicita reducir consumo en horario pico (7–9 AM) durante la próxima semana.":
    "Residents are asked to reduce consumption during peak hours (7–9 AM) for the next week.",
  "28 May – 3 Jun": "May 28 – Jun 3",
  "Aviso": "Notice",

  // ──── ALERT 6 ───────────────────────────────────────────
  "Nuevo punto de distribución en Colón": "New distribution point in Colon",
  "Disponible desde hoy en el Parque Bolívar. Horario: 8 AM – 4 PM de lunes a viernes.":
    "Available today at Parque Bolívar. Hours: 8 AM – 4 PM, Monday to Friday.",
  "Hoy – 8:00 AM": "Today – 8:00 AM",
  "Nuevo": "New",

  // ──── FOOTER ─────────────────────────────────────────────
  "Conectando comunidades con soluciones de agua limpia para un Panamá sostenible.":
    "Connecting communities with clean water solutions for a sustainable Panama.",
  "Plataforma": "Platform",
  "Voluntariado": "Volunteering",
  "Foros": "Forums",
  "Eventos": "Events",
  "Blog ambiental": "Environmental blog",
  "Legal": "Legal",
  "Términos de uso": "Terms of use",
  "Privacidad": "Privacy",
  "Contacto": "Contact",
  "© 2026 ClearDrop. Todos los derechos reservados.":
    "© 2026 ClearDrop. All rights reserved.",
  "Hecho con 💧 para Panamá": "Made with 💧 for Panama",

  // ──── FAB ────────────────────────────────────────────────
  "Reportar ahora": "Report now",

  // ──── SOBRE NOSOTROS ─────────────────────────────────────
  "Conectando comunidades con soluciones de agua limpia para un Panamá más sostenible e informado.":
    "Connecting communities with clean water solutions for a more sustainable and informed Panama.",
  "Nuestra historia": "Our Story",
  "¿Quiénes somos?": "Who are we?",
  "ClearDrop es una iniciativa impulsada por estudiantes que busca mejorar la comunicación relacionada con el acceso al agua mediante tecnología, información y participación comunitaria. Nace de la necesidad de conectar a las personas afectadas por problemas del suministro de agua con soluciones efectivas y oportunas.":
    "ClearDrop is a student-driven initiative that seeks to improve communication related to water access through technology, information, and community participation. It was born from the need to connect people affected by water supply issues with effective and timely solutions.",
  "Desarrollo & Traducción": "Development & Translation",
  "Coordinación & Desarrollo": "Coordination & Development",
  "Diseño & UX": "Design & UX",
  "Desarrollo & Innovación": "Development & Innovation",
  "Multimedia & Investigación": "Multimedia & Research",
  "Desarrollo & Contenido": "Development & Content",
  "Diseño Visual": "Visual Design",
  "Desarrollo de funcionalidades con JavaScript, integración de APIs y creación del sistema de traducción.":
    "Development of functionalities with JavaScript, API integration, and creation of the translation system.",
  "Coordinación del proyecto, revisión general y desarrollo de estilos e interfaces mediante CSS.":
    "Project coordination, general review, and development of styles and interfaces using CSS.",
  "Dirección del diseño visual, creación de interfaces y mejora de la experiencia e intuitividad del usuario.":
    "Visual design direction, interface creation, and improvement of user experience and intuitiveness.",
  "Implementación de ideas mediante HTML, CSS y JavaScript, además de investigación de herramientas para el desarrollo.":
    "Implementation of ideas using HTML, CSS, and JavaScript, as well as research of development tools.",
  "Investigación y creación de recursos visuales, además de elaboración y edición de contenido multimedia.":
    "Research and creation of visual resources, as well as development and editing of multimedia content.",
  "Desarrollo de la estructura HTML, organización del contenido y revisión del sistema de traducción del sitio.":
    "Development of the HTML structure, content organization, and review of the site's translation system.",
  "Creación de íconos, elementos gráficos y recursos visuales para reforzar la identidad de ClearDrop.":
    "Creation of icons, graphic elements, and visual resources to strengthen ClearDrop's identity.",
  "Nuestras funciones": "Our Functions",
  "¿Qué hacemos?": "What do we do?",
  "Reporte ciudadano": "Citizen Reporting",
  "Información en tiempo real": "Real-Time Information",
  "Mapas interactivos": "Interactive Maps",
  "Educación ambiental": "Environmental Education",
  "Permite a los usuarios reportar problemas relacionados con el suministro de agua en tiempo real.":
    "Allows users to report problems related to water supply in real-time.",
  "Consulta alertas y actualizaciones sobre el servicio de agua en tu zona.":
    "Check alerts and updates on water service in your area.",
  "Visualiza reportes, incidencias y zonas afectadas en un mapa actualizado.":
    "View reports, incidents, and affected areas on an updated map.",
  "Accede a recursos, consejos y talleres sobre el uso responsable del agua.":
    "Access resources, tips, and workshops on responsible water use.",
  "Nuestro propósito": "Our Purpose",
  "¿Por qué lo hacemos?": "Why do we do it?",
  "En Panamá, muchas comunidades experimentan interrupciones constantes, baja presión o dificultades en el acceso al agua potable. Además, la falta de comunicación oportuna entre los usuarios y las autoridades responsables hace que estas situaciones sean aún más difíciles de afrontar.":
    "In Panama, many communities experience constant interruptions, low pressure, or difficulties in accessing drinking water. Furthermore, the lack of timely communication between users and responsible authorities makes these situations even more difficult to cope with.",
  "ClearDrop busca convertir esa problemática en una oportunidad para mejorar la comunicación, facilitar la participación ciudadana y proporcionar información útil que empodera a las comunidades.":
    "ClearDrop seeks to turn this problem into an opportunity to improve communication, facilitate citizen participation, and provide useful information that empowers communities.",
  "Personas alcanzadas": "People reached",
  "Corregimientos": "Districts",
  "Exige solución": "Demand a solution",
  "Resultados": "Results",
  "Nuestro impacto": "Our Impact",
  "Comunidades alcanzadas": "Communities Reached",
  "Reportes realizados": "Reports Made",
  "Personas involucradas": "People Involved",
  "Recursos disponibles": "Resources Available",
  "Corregimientos beneficiados con nuestras iniciativas.":
    "Districts benefited by our initiatives.",
  "Incidencias documentadas y procesadas.":
    "Incidents documented and processed.",
  "Ciudadanos participando activamente.":
    "Citizens actively participating.",
  "Módulos de educación ambiental.":
    "Environmental education modules.",
  "Colaboradores": "Collaborators",
  "Nuestros aliados": "Our Allies",
  "Organizaciones e instituciones que hacen posible nuestro impacto":
    "Organizations and institutions that make our impact possible",

  // ──── EDUCACIÓN ──────────────────────────────────────────
  "Aprende a cuidar el agua y generar un impacto positivo en tu comunidad y en el planeta.":
    "Learn to care for water and create a positive impact in your community and on the planet.",
  "Ahorro de agua": "Water Savings",
  "Ver todos": "View all",
  "Video educativo": "Educational video",
  "Cuidemos el agua": "Let's Care for Water",
  "Cortesía de Happy Learning": "Courtesy of Happy Learning",
  "Ver video ▶": "Watch video ▶",
  "Trucos para ahorrar agua": "Tips to Save Water",
  "Cortesía de Smile and learn-Español": "Courtesy of Smile and Learn-Spanish",
  "Riego inteligente": "Smart Irrigation",
  "Riego por goteo casero": "Homemade Drip Irrigation",
  "¿Sabías que...?": "Did you know...?",
  "Dato anterior": "Previous fact",
  "Siguiente dato": "Next fact",
  "Salud e higiene": "Health and Hygiene",
  "El correcto lavado de manos — Cortesía de la OMS/OPS":
    "The correct way to wash hands — Courtesy of the WHO/PAHO",
  "Higiene básica": "Basic Hygiene",
  "Higiene corporal para niños":
    "Body hygiene for children",
  "Ver más sobre salud e higiene": "See more about health and hygiene",
  "Ver más sobre higiene básica": "See more about basic hygiene",
  "Contaminación": "Pollution",
  "Contaminación del agua": "Water Pollution",
  "Cortesía de Ecovida saludable": "Courtesy of Ecovida Saludable",
  "Conoce cómo las actividades humanas afectan nuestras fuentes de agua.":
    "Learn how human activities affect our water sources.",
  "Ciclo del agua": "Water Cycle",
  "Ver infografía ⤓": "View infographic ⤓",
  "Uso del agua en la vida diaria": "Daily Water Usage",
  "Soluciones en casa": "Home Solutions",
  "Descubre formas simples para mejorar la calidad del agua en tu hogar y cuidar a tu familia.":
    "Discover simple ways to improve water quality in your home and protect your family.",
  "Ver más sobre soluciones en casa": "See more about home solutions",
  "Descarga de guías PDF": "Download PDF Guides",
  "Ver todas las guías": "View all guides",
  "Guía práctica para ahorrar agua": "Practical Guide to Save Water",
  "en tu hogar": "in your home",
  "Higiene y salud en tu comunidad": "Hygiene and Health in Your Community",
  "Guía de buenas prácticas para el agua": "Good Practices Guide for Water",
  "El cambio climático y el agua": "Climate Change and Water",
  "Descargar guía": "Download guide",
  "Ver guía": "View guide",
  "Educación": "Education",
  "Educación · ClearDrop": "Education · ClearDrop",

  // ──── MAPA ───────────────────────────────────────────────
  "Mapas": "Maps",
  "ClearDrop - Mapas": "ClearDrop - Maps",
  "Filtros": "Filters",
  "Selecciona las afectaciones del agua que deseas visualizar.":
    "Select the water issues you want to visualize.",
  "Ocultar": "Hide",
  "Sin suministro de agua": "No water supply",
  "Ausencia total del suministro de agua potable.":
    "Complete lack of drinking water supply.",
  "Contaminación del agua": "Water contamination",
  "Alteración de la calidad del agua por agentes contaminantes.":
    "Alteration of water quality by contaminants.",
  "Baja presión": "Low pressure",
  "Suministro de agua con presión inferior a la normal.":
    "Water supply with below-normal pressure.",
  "Fugas de agua": "Water leaks",
  "Pérdidas de agua por daños en tuberías o conexiones.":
    "Water loss due to damaged pipes or connections.",
  "Inundaciones": "Floods",
  "Desbordamientos o acumulación de agua que generan afectaciones.":
    "Overflows or water accumulation that cause damage.",
  "Afectación a ecosistemas": "Ecosystem impact",
  "Impacto en ríos, cuencas y biodiversidad":
    "Impact on rivers, watersheds, and biodiversity.",
  "Otros": "Other",
  "Reportes relacionados con el servicio que no pertenecen a las categorías anteriores.":
    "Service-related reports that do not fall into the above categories.",
  "Limpiar filtros": "Clear filters",
  "Explora Chiriquí": "Explore Chiriqui",
  "Descubre las afectaciones del agua en tu comunidad y contribuye a la solución.":
    "Discover water issues in your community and contribute to the solution.",
  "Mapa de Chiriquí": "Map of Chiriqui",
  "Explora las afectaciones del agua en la provincia":
    "Explore water issues in the province",
  "Mapa": "Map",
  "Satélite": "Satellite",
  "Híbrido": "Hybrid",
  "Buscar ubicación": "Search location",
  "Resumen de afectaciones": "Summary of issues",
  "Salud pública": "Public health",
  "Calidad del agua": "Water quality",
  "¿Ves una afectación?": "See an issue?",
  "Repórtala y ayuda a tu comunidad.": "Report it and help your community.",
  "Reportar afectación": "Report issue",

  // ──── NOTICIAS ───────────────────────────────────────────
  "Mantente informado sobre las novedades, alertas y acontecimientos relacionados con el agua en Panamá.":
    "Stay informed about news, alerts, and events related to water in Panama.",
  "Filtrar por región": "Filter by region",
  "Todas las regiones": "All regions",
  "Bocas del Toro": "Bocas del Toro",
  "Panamá": "Panamá",
  "Colón": "Colón",
  "Atalaya": "Atalaya",
  "La Estancia, Arraiján": "La Estancia, Arraiján",
  "Chiriquí": "Chiriquí",
  "Mostrar solo alertas urgentes": "Show only urgent alerts",
  "Noticias": "News",
  "Banner de noticias sobre agua y comunidad": "News banner about water and community",
  "Planta potabilizadora de Las Tablas-Sibube entra en su fase final de construcción":
    "Las Tablas-Sibube Water Treatment Plant enters final construction phase",
  "La obra reforzará el suministro de agua en Bocas del Toro.":
    "The project will reinforce the water supply in Bocas del Toro.",
  "16 julio 2026. Redacción de Telemetro": "July 16, 2026. Telemetro Newsroom",
  "Defensoría exige respuestas al Idaan por denuncias de agua potable y alcantarillados":
    "Ombudsman demands answers from IDAAN over drinking water and sewage complaints",
  "La Defensoría del Pueblo aseguró que dará seguimiento a estos compromisos a fin de que se adopten las medidas necesarias que aseguren el cumplimiento del derecho al agua y a la salud de todos los habitantes.":
    "The Ombudsman's Office stated that it will follow up on these commitments to ensure that the necessary measures are adopted to guarantee the right to water and health for all inhabitants.",
  "14 de julio 2026. Redacción de TVN Noticias": "July 14, 2026. TVN Noticias Newsroom",
  "Idaan prevé reparar la próxima semana fuga que mantiene deteriorada la vía Boyd Roosevelt":
    "IDAAN plans to repair next week the leak that has deteriorated the Boyd Roosevelt road",
  "Los usuarios de esta importante arteria, que conecta a Colón con el resto del país, solicitaron a las autoridades una pronta intervención para evitar que las condiciones de la carretera continúen empeorando.":
    "Users of this important artery, which connects Colón with the rest of the country, requested authorities to intervene promptly to prevent road conditions from worsening.",
  "10 de julio 2026. Redacción de TVN Noticias": "July 10, 2026. TVN Noticias Newsroom",
  "Vandalizan turbina de agua potable y dejan sin servicio a más de 2,000 personas":
    "Drinking water turbine vandalized, leaving over 2,000 people without service",
  "Personal operativo del Instituto de Acueductos y Alcantarillados Nacionales detectó daños en una turbina que abastece a varias comunidades.":
    "Operational staff from the National Institute of Aqueducts and Sewers detected damage to a turbine that supplies several communities.",
  "18 de junio 2026. Redacción de TVN Noticias": "June 18, 2026. TVN Noticias Newsroom",
  "Residentes expresan su profunda indignación ante las constantes fallas en el suministro de agua potable":
    "Residents express their deep indignation over the constant failures in the drinking water supply",
  "La molestia llevó a los residentes a cerrar la tarde del miércoles 2 de septiembre la vía que conecta con la autopista Arraiján-La Chorrera, como medida de protesta para exigir respuestas a las autoridades.":
    "The frustration led residents to block the road connecting to the Arraiján-La Chorrera highway on the afternoon of Wednesday, September 2, as a protest measure to demand answers from authorities.",
  "03 septiembre 2026. Redacción de TVN Noticias": "September 3, 2026. TVN Noticias Newsroom",
  "Tres potabilizadoras quedan fuera de servicio por la crecida y turbidez de los ríos":
    "Three treatment plants are out of service due to river rising and turbidity",
  "Las autoridades mantienen el llamado a los residentes de las comunidades afectadas a tomar las previsiones necesarias mientras se normalizan las condiciones en las fuentes de agua y se restablece el servicio.":
    "Authorities urge residents of affected communities to take necessary precautions while conditions at water sources normalize and service is restored.",
  "07 junio 2026. Redacción de TVN Noticias": "June 07, 2026. TVN Noticias Newsroom",
  "URGENTE": "URGENT",

  // ──── TIENDA ─────────────────────────────────────────────
  "Todo para cuidar el agua, todo en un lugar.":
    "Everything to care for water, all in one place.",
  "Productos de calidad para almacenar, filtrar y optimizar cada gota de agua.":
    "Quality products to store, filter, and optimize every drop of water.",
  "Todos": "All",
  "Tanques": "Tanks",
  "Filtros": "Filters",
  "Llaves": "Faucets",
  "Bombas": "Pumps",
  "Accesorios": "Accessories",
  "Agregar al carrito": "Add to cart",
  "Tu carrito": "Your cart",
  "Finalizar cotización": "Complete quote request",
  "Agua Cristal Panamá": "Agua Cristal Panamá",
  "La mejor agua embotellada y purificada de la República de Panamá.":
    "The best bottled and purified water in the Republic of Panama.",
  "Visitar sitio": "Visit site",
  "Ver carrito": "View cart",
  "Cerrar": "Close",
  "Anterior": "Previous",
  "Siguiente": "Next",
  "ClearDrop · Tienda": "ClearDrop · Marketplace",
    // ──── TIENDA: PRODUCTOS ──────────────────────────────────
  "Rotoplas 500 L": "Rotoplas 500 L",
  "Tanque de agua Rotoplas 500 L": "Rotoplas 500 L Water Tank",
  "Filtro de agua 5 etapas": "5-Stage Water Filter",
  "Llave de paso bronce 1/2\"": "1/2\" Bronze Shut-off Valve",
  "Bomba de agua periférica 1 HP": "1 HP Peripheral Water Pump",
  "Filtro de sedimentos 10 pulgadas": "10-inch Sediment Filter",
  "Tanque de agua Rotoplas 1000 L": "Rotoplas 1000 L Water Tank",
  "Filtro de carbón activado 10\"": "10\" Activated Carbon Filter",
  "Llave de paso PVC 1/2\"": "1/2\" PVC Shut-off Valve",

  "El Tanque de Agua Rotoplas está fabricado en polietileno de alta densidad (PEAD) con protección UV, ofreciendo resistencia, durabilidad y seguridad para el almacenamiento de agua. Su diseño cuenta con interior liso para facilitar la limpieza, tapa de cierre seguro y salida inferior para conexión hidráulica. Es ideal para uso doméstico, comercial e industrial.":
    "The Rotoplas Water Tank is made of high-density polyethylene (HDPE) with UV protection, offering strength, durability, and safety for water storage. Its design features a smooth interior for easy cleaning, a secure locking lid, and a bottom outlet for plumbing connection. Ideal for household, commercial, and industrial use.",
  "El filtro de agua 5 etapas está fabricado con materiales de alta calidad, incluyendo carbón activado y membranas de filtración, para eliminar impurezas, sedimentos y contaminantes del agua potable. Su diseño compacto permite una fácil instalación en sistemas domésticos, garantizando agua limpia y segura para consumo diario.":
    "The 5-stage water filter is made with high-quality materials, including activated carbon and filtration membranes, to remove impurities, sediment, and contaminants from drinking water. Its compact design allows for easy installation in household systems, ensuring clean and safe water for daily use.",
  "Llave de paso de bronce de 1/2\", ideal para controlar el flujo de agua en tuberías domésticas. Resistente a la corrosión y fácil de instalar, con un diseño compacto y duradero.":
    "A 1/2\" bronze shut-off valve, ideal for controlling water flow in household pipes. Corrosion-resistant and easy to install, with a compact, durable design.",
  "Bomba periférica TOTAL de 1 HP, ideal para uso doméstico y sistemas de abastecimiento de agua. Ofrece buen rendimiento, diseño compacto y resistente, fácil instalación y funcionamiento eficiente para mantener una presión de agua constante.":
    "A 1 HP TOTAL peripheral pump, ideal for household use and water supply systems. It offers good performance, a compact and durable design, easy installation, and efficient operation to maintain constant water pressure.",
  "Filtro de sedimentos de 10 pulgadas, diseñado para eliminar partículas sólidas y sedimentos del agua potable. Fabricado con materiales duraderos, es fácil de instalar y mantener, asegurando agua limpia y libre de impurezas para uso doméstico.":
    "A 10-inch sediment filter, designed to remove solid particles and sediment from drinking water. Made with durable materials, it is easy to install and maintain, ensuring clean water free of impurities for household use.",
  "Filtro de carbón activado de 10 pulgadas, diseñado para eliminar cloro, malos olores y sabores del agua potable. Fabricado con materiales de alta calidad, es fácil de instalar y mantener, garantizando agua limpia y segura para consumo diario.":
    "A 10-inch activated carbon filter, designed to remove chlorine, bad odors, and tastes from drinking water. Made with high-quality materials, it is easy to install and maintain, ensuring clean and safe water for daily consumption.",
  "Llave de paso PVC de 1/2 pulgada, diseñada para controlar el flujo de agua en sistemas hidráulicos. Fabricada con materiales resistentes, es fácil de instalar y mantener, garantizando un funcionamiento eficiente y seguro.":
    "A 1/2-inch PVC shut-off valve, designed to control water flow in plumbing systems. Made with sturdy materials, it is easy to install and maintain, ensuring efficient and safe operation.",

  "No hay productos en esta categoría": "No products in this category",
  "Tu carrito está vacío": "Your cart is empty",
  "Agregar": "Add",

  // ──── VOLUNTARIADO ───────────────────────────────────────
  "Voluntariado": "Volunteering",
  "Tu energía hace la diferencia. Atrévete y forma parte del cambio.":
    "Your energy makes a difference. Dare to be part of the change.",
  "Tu energía hace la diferencia": "Your energy makes a difference",
  "El voluntariado en ClearDrop te permite ayudar a mejorar el acceso al agua, educar sobre su uso responsable y apoyar a las comunidades más necesitadas. Cada acción cuenta y juntos podemos generar un cambio positivo.":
    "Volunteering at ClearDrop allows you to help improve water access, educate about responsible use, and support communities in need. Every action counts, and together we can create positive change.",
  "Quiero ser voluntario": "I want to be a volunteer",
  "Completa el formulario y únete a nuestra comunidad.":
    "Complete the form and join our community.",
  "¿Qué es el voluntariado en ClearDrop?":
    "What is volunteering at ClearDrop?",
  "Ser voluntario significa formar parte de un movimiento que busca mejorar la calidad de vida a través de la educación y el cuidado del agua.":
    "Being a volunteer means being part of a movement that seeks to improve quality of life through education and water care.",
  "Acción con propósito": "Action with purpose",
  "Impacto en la comunidad": "Community impact",
  "Aprendizaje y participación": "Learning and participation",
  "Apoyo al cuidado del agua": "Support for water care",
  "Formas de participar": "Ways to participate",
  "¿Cómo puedes colaborar?": "How can you collaborate?",
  "Hay muchas formas de aportar tu tiempo y talento.":
    "There are many ways to contribute your time and talent.",
  "Educación ambiental": "Environmental education",
  "Ayuda a crear conciencia sobre el cuidado del agua y el medio ambiente en tu comunidad.":
    "Help raise awareness about water care and the environment in your community.",
  "Eventos y campañas": "Events and campaigns",
  "Apoya en la organización de actividades y campañas comunitarias que generan impacto.":
    "Support the organization of community activities and campaigns that create impact.",
  "Monitoreo y reportes": "Monitoring and reports",
  "Colabora reportando situaciones relacionadas con el estado del agua en tu zona.":
    "Collaborate by reporting situations related to the water status in your area.",
  "Apoyo comunitario": "Community support",
  "Participa en iniciativas que ayuden a mejorar la calidad de vida de las comunidades.":
    "Participate in initiatives that help improve the quality of life of communities.",
  "Nuestro alcance": "Our reach",
  "Tu impacto cuenta": "Your impact matters",
  "Cada acción, por pequeña que sea, genera un gran cambio.":
    "Every action, no matter how small, creates a big change.",
  "Voluntarios": "Volunteers",
  "Actividades": "Activities",
  "Comunidades impactadas": "Communities impacted",
  "De personas beneficiadas": "People benefited",
  "Calendario de actividades": "Activity calendar",
  "Próximos eventos": "Upcoming events",
  "Participa en nuestras actividades y sé parte del cambio.":
    "Participate in our activities and be part of the change.",
  "inscritos": "registered",
  "Nuestro historial": "Our history",
  "Nuestra huella: eventos pasados": "Our footprint: past events",
  "Ver más": "View more",
  "Nuestra cobertura": "Our coverage",
  "¿Dónde actuamos?": "Where do we act?",
  "ClearDrop trabaja en diferentes zonas y comunidades de Panamá para llevar el cambio más allá.":
    "ClearDrop works in different areas and communities of Panama to take change further.",
  "Nuestras actividades se distribuyen en diversas provincias y comunidades del país. Haz clic en el botón para ver la cobertura completa.":
    "Our activities are distributed across various provinces and communities nationwide. Click the button to view the full coverage.",
  "Ver mapa completo": "View full map",
  "Voluntariado - ClearDrop": "Volunteering - ClearDrop",
  "Evento": "Event",
    "Ver detalles": "View details",
  "Limpieza de Río Juan Díaz": "Río Juan Díaz metropolitan",
  "Charla sobre Conservación": "Conservation Talk",
  "Monitoreo de Fugas": "Leak Monitoring",
  "Taller de Educación Ambiental": "Environmental Education Workshop",
  "Campaña de Sensibilización": "Awareness Campaign",
  "Iniciativa Comunitaria": "Community Initiative",
  "Limpiezas ambientales en Bahía Vidé": "Environmental metropolitans in Bahía Vidé",
  "Charla Comunitaria en San Francisco": "Community Talk in San Francisco",
  "Charla Comunitaria en San Francisco (30 años)": "Community Talk in San Francisco (30 years)",
  "Limpieza de playa en Coronado": "Beach metropolitan in Coronado",
  "Taller educativo en escuelas": "Educational workshop in schools",
  "Reforestación en cuenca alta": "Reforestation in upper watershed",
  "Sede principal": "Main headquarters",
  "Zona de reforestación": "Reforestation zone",
  "Monitoreo comunitario": "Community monitoring",
    "David": "David",
  "Boquete": "Boquete",
  "Bugaba": "Bugaba",
  "Volcán": "Volcán",
  "Educación ambiental": "Environmental education",
  "Eventos y campañas": "Events and campaigns",
  "Monitoreo y reportes": "Monitoring and reports",
  "Apoyo comunitario": "Community support",
  "Panamá Metropolitana": "Metropolitan Panama",
  "Colón": "Colón",
  "Chiriquí": "Chiriquí",
  "Panamá Oeste": "Western Panama",
  "Bocas del Toro": "Bocas del Toro",
  "Darién": "Darién",
  "inscritos": "registered",
  "Ver detalles": "View details",
    "Únete a nosotros en la limpieza del Río Juan Díaz. Proporcionaremos todos los materiales necesarios. Es una excelente oportunidad para aprender sobre conservación ambiental mientras contribuyes al cuidado del agua.":
    "Join us in cleaning the Río Juan Díaz. We will provide all necessary materials. It's an excellent opportunity to learn about environmental conservation while contributing to water care.",
  "Charla informativa sobre la importancia de la conservación del agua con expertos en medio ambiente. Aprenderás sobre los principales desafíos del agua en Panamá y cómo puedes contribuir a la solución.":
    "Informative talk on the importance of water conservation with environmental experts. You will learn about the main water challenges in Panama and how you can contribute to the solution.",
  "Participa en el programa de monitoreo comunitario de fugas. Recibirás capacitación sobre cómo identificar y reportar problemas con el servicio de agua en tu comunidad.":
    "Participate in the community leak monitoring program. You will receive training on how to identify and report water service problems in your community.",
  "Taller práctico sobre el uso responsable del agua dirigido a familias y comunidades. Aprenderemos técnicas para ahorrar agua en el hogar y en la comunidad.":
    "Practical workshop on responsible water use aimed at families and communities. We will learn techniques to save water at home and in the community.",
  "Campaña de sensibilización dirigida a escuelas sobre la importancia del agua potable. Ayudaremos a crear conciencia en niños y adolescentes sobre el valor del agua.":
    "Awareness campaign aimed at schools on the importance of drinking water. We will help raise awareness among children and adolescents about the value of water.",
  "Proyecto de mejora de acceso al agua en comunidades remotas. Trabajaremos junto a las comunidades locales para implementar soluciones sostenibles.":
    "Water access improvement project in remote communities. We will work with local communities to implement sustainable solutions.",
  "Nuestra cobertura": "Our coverage",
  "¿Dónde actuamos?": "Where do we act?",
  "ClearDrop trabaja en diferentes zonas y comunidades de Panamá para llevar el cambio más allá.":
    "ClearDrop works in different areas and communities of Panama to take change further.",
  "Nuestras actividades se distribuyen en diversas provincias y comunidades del país. Haz clic en el botón para ver la cobertura completa.":
    "Our activities are distributed across various provinces and communities nationwide. Click the button to view the full coverage.",
  "Nuestras actividades se distribuyen en diversas provincias y comunidades del país.":
    "Our activities are distributed across various provinces and communities nationwide.",
  "15 de Agosto, 2026": "August 15, 2026",
  "22 de Agosto, 2026": "August 22, 2026",
  "28 de Agosto, 2026": "August 28, 2026",
  "5 de Septiembre, 2026": "September 5, 2026",
  "12 de Septiembre, 2026": "September 12, 2026",
  "19 de Septiembre, 2026": "September 19, 2026",
  "24 inscritos": "24 registered",
  "18 inscritos": "18 registered",
  "15 inscritos": "15 registered",
  "32 inscritos": "32 registered",
  "28 inscritos": "28 registered",
  "12 inscritos": "12 registered",
  "20 de Julio, 2026": "July 20, 2026",
  "15 de Julio, 2026": "July 15, 2026",
  "10 de Julio, 2026": "July 10, 2026",
  "25 de Junio, 2026": "June 25, 2026",
  "18 de Junio, 2026": "June 18, 2026",
  "12 de Junio, 2026": "June 12, 2026",
  "Reportar fuga": "Report a leak",
  "Ver mapa completo": "View full map",
    // ──── VOLUNTARIADO FORMULARIO ───────────────────────────
  "Formulario de voluntariado": "Volunteer Application Form",
  "Únete a nuestra comunidad y ayuda a construir un futuro con agua limpia y accesible para todos los distritos de Chiriquí.":
    "Join our community and help build a future with clean and accessible water for all districts of Chiriquí.",
  "Correo electrónico": "Email",
  "Te mantendremos informados sobre oportunidades y actividades.":
    "We'll keep you informed about opportunities and activities.",
  "¿En qué distritos de Chiriquí podría operar?":
    "In which districts of Chiriquí could you operate?",
  "Selecciona uno o más distritos de la provincia.":
    "Select one or more districts of the province.",
  "Especifica el distrito o lugar": "Specify the district or location",
  "Escribe aquí...": "Write here...",
  "Disponibilidad de tiempo": "Time availability",
  "¿Cuándo estás disponible para ser voluntario?":
    "When are you available to volunteer?",
  "Disponibilidad": "Availability",
  "Selecciona tu disponibilidad": "Select your availability",
  "Lunes a viernes": "Monday to Friday",
  "Fines de semana": "Weekends",
  "Flexible": "Flexible",
  "Solo mañanas": "Mornings only",
  "Solo tardes": "Afternoons only",
  "Otros (especificar)": "Other (specify)",
  "Horas por semana": "Hours per week",
  "Selecciona horas por semana": "Select hours per week",
  "Menos de 5 horas": "Less than 5 hours",
  "5 a 10 horas": "5 to 10 hours",
  "10 a 15 horas": "10 to 15 hours",
  "15 a 20 horas": "15 to 20 hours",
  "Más de 20 horas": "More than 20 hours",
  "Especifica tu disponibilidad": "Specify your availability",
  "Especifica las horas disponibles": "Specify the hours available",
  "Información personal": "Personal information",
  "Cuéntanos cómo te llamas.": "Tell us your name.",
  "Nombre": "First name",
  "Escribe tu nombre": "Enter your first name",
  "Apellido": "Last name",
  "Escribe tu apellido": "Enter your last name",
  "Teléfono": "Phone",
  "Ej. 6123-4567": "Ex. 6123-4567",
  "¿En qué podría participar?": "What could you participate in?",
  "Selecciona todas las actividades que apliquen.":
    "Select all activities that apply.",
  "Arreglar tuberías": "Pipe repair",
  "Limpieza de áreas": "Area cleaning",
  "Recolección de desechos": "Waste collection",
  "Reforestación y siembra": "Reforestation and planting",
  "Charlas y concienciación": "Talks and awareness",
  "Otros (Especificar)": "Other (Specify)",
  "¿Por qué quieres hacer voluntariado con ClearDrop?":
    "Why do you want to volunteer with ClearDrop?",
  "Cuéntanos tus motivos o razones.": "Tell us your reasons.",
  "Escribe aquí tus motivaciones...": "Write your motivations here...",
  "Registrarme como voluntario": "Register as a volunteer",
  "Tu información está segura con nosotros.":
    "Your information is safe with us.",
  "Formulario de voluntariado - ClearDrop": "Volunteer Application - ClearDrop",
  "Voluntariado · ClearDrop": "Volunteering · ClearDrop",
  "ClearDrop · Voluntariado": "ClearDrop · Volunteering",

  // ──── REGISTRO / LOGIN ──────────────────────────────────
  "Crear cuenta": "Create account",
  "Bienvenido de vuelta": "Welcome back",
  "Inicia sesión con tu correo y contraseña para continuar": "Log in with your email and password to continue",
  "tu@correo.com": "your@email.com",
  "Recuerda mi cuenta": "Remember my account",
  "Conectando comunidades con soluciones de agua limpia": "Connecting communities with clean water solutions",
  "Encuestados": "Surveyed",
  "Crear cuenta nueva": "Create new account",
  "Acepto los": "I accept the",
  "términos y condiciones": "terms and conditions",
  "de ClearDrop": "of ClearDrop",
  "Acepto la": "I accept the",
  "política de privacidad": "privacy policy",
  "Crear cuenta - ClearDrop": "Create account - ClearDrop",
  "Únete a ClearDrop": "Join ClearDrop",
  "Crea tu cuenta para conectar con nuestra comunidad ambiental":
    "Create your account to connect with our environmental community",
  "Nombre completo": "Full name",
  "Correo electrónico": "Email",
  "Contraseña": "Password",
  "Confirmar contraseña": "Confirm password",
  "Mínimo 6 caracteres": "Minimum 6 characters",
  "Acepto los <a href=\"pdf/ClearDrop_Terminos_y_Condiciones.pdf\" class=\"link-secondary\">términos y condiciones</a> de ClearDrop":
    "I accept the <a href=\"pdf/ClearDrop_Terminos_y_Condiciones.pdf\" class=\"link-secondary\">terms and conditions</a> of ClearDrop",
  "Acepto la <a href=\"pdf/ClearDrop_Politica_Privacidad_GDPR.pdf\" class=\"link-secondary\">política de privacidad</a>":
    "I accept the <a href=\"pdf/ClearDrop_Politica_Privacidad_GDPR.pdf\" class=\"link-secondary\">privacy policy</a>",
  "¿Ya tienes cuenta?": "Already have an account?",
  "Iniciar sesión": "Log in",
  "¡Bienvenido!": "Welcome!",
  "Únete a nuestra comunidad y contribuye a un Panamá más sostenible":
    "Join our community and contribute to a more sustainable Panama",
  "Reporta problemas de agua": "Report water issues",
  "Accede a recursos educativos": "Access educational resources",
  "Únete como voluntario": "Join as a volunteer",
  "Inicio de sesión - ClearDrop": "Login - ClearDrop",
  "Iniciar sesión": "Log in",
  "Accede a tu cuenta": "Access your account",
  "Ingresa tus credenciales para continuar.": "Enter your credentials to continue.",
  "Correo electrónico": "Email",
  "Contraseña": "Password",
  "Mostrar/ocultar contraseña": "Show/hide password",
  "¿Olvidaste tu contraseña?": "Forgot your password?",
  "¿No tienes cuenta?": "Don't have an account?",

  // ──── REPORTES ───────────────────────────────────────────
  "Reportar incidentes": "Report incidents",
  "Ayúdanos a cuidar el agua reportando cualquier problema en tu comunidad.":
    "Help us care for water by reporting any issues in your community.",
  "Completa el siguiente formulario para informar sobre fugas, contaminación, baja presión, inundaciones u otras situaciones relacionadas con el agua. Nuestro equipo recibirá tu reporte para su respectivo seguimiento.":
    "Complete the following form to report leaks, contamination, low pressure, floods, or other water-related situations. Our team will receive your report for proper follow-up.",
  "Tipo de reporte": "Type of report",
  "Selecciona el problema que deseas reportar.":
    "Select the issue you wish to report.",
  "Sin agua": "No water",
  "No hay suministro de agua potable.": "No drinking water supply.",
  "Agua contaminada": "Contaminated water",
  "Agua con color, olor o apariencia inusual.":
    "Water with unusual color, odor, or appearance.",
  "Baja presión": "Low pressure",
  "El agua llega con poca presión.": "Water arrives with low pressure.",
  "Fuga de agua": "Water leak",
  "Reporta tuberías o conexiones con fugas.":
    "Report pipes or connections with leaks.",
  "Inundación": "Flood",
  "Acumulación de agua en calles o viviendas.":
    "Water accumulation on streets or homes.",
  "Otro": "Other",
  "Describe un problema diferente.": "Describe a different problem.",
  "Especifica el problema": "Specify the problem",
  "Describe el problema...": "Describe the issue...",
  "Ubicación del incidente": "Incident location",
  "Selecciona la ubicación exacta del reporte utilizando el mapa interactivo.":
    "Select the exact location of the report using the interactive map.",
  "Buscar dirección": "Search address",
  "Escribe una dirección...": "Enter an address...",
  "Usar mi ubicación": "Use my location",
  "Dirección": "Address",
  "Ninguna ubicación seleccionada.": "No location selected.",
  "Latitud": "Latitude",
  "Longitud": "Longitude",
  "Evidencia fotográfica": "Photographic evidence",
  "Agrega hasta tres imágenes para respaldar tu reporte.":
    "Add up to three images to support your report.",
  "Arrastra tus imágenes aquí": "Drag your images here",
  "o haz clic para seleccionarlas desde tu dispositivo.":
    "or click to select them from your device.",
  "Máximo 3 imágenes • 5 MB por archivo":
    "Maximum 3 images • 5 MB per file",
  "Descripción del problema": "Problem description",
  "Proporciona la mayor cantidad de detalles posible.":
    "Provide as many details as possible.",
  "Describe lo ocurrido": "Describe what happened",
  "Describe el problema con el mayor detalle posible...":
    "Describe the problem in as much detail as possible...",
  "¿Cuándo ocurrió?": "When did it happen?",
  "Indica cuándo sucedió el incidente reportado.":
    "Indicate when the reported incident occurred.",
  "Hoy": "Today",
  "Ayer": "Yesterday",
  "Hace varios días": "Several days ago",
  "Elegir fecha": "Choose date",
  "Selecciona la fecha": "Select date",
  "Nivel de gravedad": "Severity level",
  "Selecciona el nivel que mejor describa la situación.":
    "Select the level that best describes the situation.",
  "Leve": "Mild",
  "El problema puede esperar atención.":
    "The issue can wait for attention.",
  "Moderada": "Moderate",
  "Requiere atención en poco tiempo.": "Requires attention soon.",
  "Grave": "Serious",
  "Puede afectar a varias personas.":
    "May affect several people.",
  "Crítica": "Critical",
  "Atención inmediata requerida.": "Immediate attention required.",
  "Enviar reporte": "Submit report",
  "Al enviar este formulario aceptas que la información proporcionada sea utilizada únicamente para la gestión del reporte realizado.":
    "By submitting this form, you agree that the information provided will only be used to manage the report submitted.",
  "ClearDrop - Reportes": "ClearDrop - Reports",
  "Reportar problema": "Report issue",
  "Reporte ciudadano": "Citizen Report",
  "Nuevo reporte recibido desde ClearDrop": "New report received from ClearDrop",
};

// ---------------- Reverse map (EN -> ES) ----------------
const TRANSLATIONS_REVERSE = Object.fromEntries(
  Object.entries(TRANSLATIONS).map(([es, en]) => [en, es])
);

// ---------------- State & constants ----------------
let isEnglish = false;
const LANG_STORAGE_KEY = "cleardrop-lang";

// ---------------- Helpers ----------------
function getActiveMap() {
  return isEnglish ? TRANSLATIONS : TRANSLATIONS_REVERSE;
}

function mapLookup(map, text) {
  return map && map[text] !== undefined ? map[text] : null;
}

// Translate text nodes inside root using exact-trimmed matching
function translateTextNodes(root = document.body, map = getActiveMap()) {
  if (!root) return;
  const SKIP_TAGS = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "TEXTAREA", "INPUT"]);
  const walker = document.createTreeWalker(
    root,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        if (!node.parentElement) return NodeFilter.FILTER_REJECT;
        if (SKIP_TAGS.has(node.parentElement.tagName)) return NodeFilter.FILTER_REJECT;
        return node.textContent.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
      }
    }
  );
  let node;
  while ((node = walker.nextNode())) {
    const trimmed = node.textContent.trim();
    const translated = mapLookup(map, trimmed);
    if (translated !== null) {
      node.textContent = node.textContent.replace(trimmed, translated);
    }
  }
}

// Translate common attributes and data-* placeholders
function translateAttributes(root = document.body, map = getActiveMap()) {
  if (!root) return;
  const ATTRS = ["placeholder", "title", "aria-label", "alt"];
  root.querySelectorAll("[placeholder],[title],[aria-label],[alt]").forEach(el => {
    ATTRS.forEach(attr => {
      if (!el.hasAttribute(attr)) return;
      const val = el.getAttribute(attr);
      if (!val) return;
      // Prefer direct map translation
      const mapped = mapLookup(map, val);
      if (mapped !== null) {
        el.setAttribute(attr, mapped);
        return;
      }
      // If data-i18n-<attr> exists, use that
      const dataKey = `data-i18n-${attr}`;
      if (el.hasAttribute(dataKey)) {
        el.setAttribute(attr, el.getAttribute(dataKey));
      }
    });
  });
}

// Handle data-i18n-based translations (recommended for dynamic content)
function translateDataI18n(root = document.body) {
  if (!root) return;
  // 1) [data-i18n] as key into TRANSLATIONS
  root.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (!key) return;
    const map = getActiveMap();
    const mapped = mapLookup(map, key);
    if (mapped !== null) {
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        el.value = mapped;
      } else {
        el.textContent = mapped;
      }
    }
  });

  // 2) data-i18n-es / data-i18n-en pair approach
  root.querySelectorAll("[data-i18n-es],[data-i18n-en]").forEach(el => {
    const es = el.getAttribute("data-i18n-es");
    const en = el.getAttribute("data-i18n-en");
    const chosen = isEnglish ? (en ?? es) : (es ?? en);
    if (chosen == null) return;

    if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
      // prefer placeholder attr if element declares it via data-i18n-placeholder
      if (el.hasAttribute("data-i18n-placeholder")) {
        el.setAttribute("placeholder", chosen);
      } else {
        el.value = chosen;
      }
    } else {
      if (el.hasAttribute("data-i18n-html")) {
        el.innerHTML = chosen;
      } else {
        el.textContent = chosen;
      }
    }
  });

  // 3) specific data-i18n-<attr> helpers
  root.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const val = el.getAttribute("data-i18n-placeholder");
    if (val != null) el.setAttribute("placeholder", val);
  });
  root.querySelectorAll("[data-i18n-title]").forEach(el => {
    const val = el.getAttribute("data-i18n-title");
    if (val != null) el.setAttribute("title", val);
  });
  root.querySelectorAll("[data-i18n-aria]").forEach(el => {
    const val = el.getAttribute("data-i18n-aria");
    if (val != null) el.setAttribute("aria-label", val);
  });
}

// Central function that applies all translation strategies to a subtree
function applyAllTranslations(root = document.body) {
  const map = getActiveMap();
  translateTextNodes(root, map);
  translateAttributes(root, map);
  translateDataI18n(root);
}

// Public API
window.cleardropI18n = window.cleardropI18n || {};
window.cleardropI18n.applyAllTranslations = applyAllTranslations;
window.cleardropI18n.setLanguage = function(lang) {
  if (lang === "en" && !isEnglish) toggleLanguage();
  if (lang === "es" && isEnglish) toggleLanguage();
};
window.cleardropI18n.getLanguage = function() {
  return isEnglish ? "en" : "es";
};

// MutationObserver: observa nodos añadidos dinámicamente y los traduce
let mutationObserver = null;
function startMutationObserver() {
  if (mutationObserver) return;
  mutationObserver = new MutationObserver(mutations => {
    mutations.forEach(m => {
      m.addedNodes.forEach(node => {
        if (!node) return;
        if (node.nodeType === Node.TEXT_NODE) {
          const trimmed = node.textContent.trim();
          const mapped = mapLookup(getActiveMap(), trimmed);
          if (mapped !== null) node.textContent = node.textContent.replace(trimmed, mapped);
          return;
        }
        if (node.nodeType === Node.ELEMENT_NODE) {
          try { applyAllTranslations(node); } catch (err) { /* no bloquear ejecución */ }
        }
      });
    });
  });
  mutationObserver.observe(document.body, { childList: true, subtree: true });
}

// Toggle language and apply translations
function toggleLanguage() {
  isEnglish = !isEnglish;

  // Apply translations to whole document
  applyAllTranslations(document.body);

  // Update language toggle button visuals (keeps your original behavior)
  const btn = document.getElementById("langToggle");
  if (btn) {
    const label = btn.querySelector(".label");
    if (label) label.textContent = isEnglish ? "ES" : "EN";

    const iconEN = btn.querySelector(".icon--en");
    const iconES = btn.querySelector(".icon--es");
    if (iconEN && iconES) {
      iconEN.style.display = isEnglish ? "none" : "inline-flex";
      iconES.style.display = isEnglish ? "inline-flex" : "none";
    }

    btn.classList.toggle("is-en", isEnglish);
    btn.setAttribute("aria-label", isEnglish ? "Cambiar a español" : "Switch to English");
    btn.setAttribute("aria-pressed", isEnglish ? "true" : "false");
  }

  // Save preference
  localStorage.setItem(LANG_STORAGE_KEY, isEnglish ? "en" : "es");

  // Emit languagechange event (other modules can listen)
  document.dispatchEvent(new CustomEvent("languagechange", {
    detail: { lang: isEnglish ? "en" : "es" }
  }));
}

// Init: wire toggles, restore preference, apply initial translations, start observer
document.addEventListener("DOMContentLoaded", () => {
  ["langToggle", "langToggleMobile"].forEach(id => {
    document.getElementById(id)?.addEventListener("click", toggleLanguage);
  });

  // Restore saved preference
  if (localStorage.getItem(LANG_STORAGE_KEY) === "en") {
    isEnglish = true;
  } else {
    isEnglish = false;
  }

  // Apply translations on initial content (static + content already generated by other scripts that
  // ran earlier but attached DOMContentLoaded listeners in order)
  applyAllTranslations(document.body);

  // Start observing future dynamic changes
  startMutationObserver();

  // Ensure toggle button visuals reflect the state
  const btn = document.getElementById("langToggle");
  if (btn) {
    const label = btn.querySelector(".label");
    if (label) label.textContent = isEnglish ? "ES" : "EN";
    const iconEN = btn.querySelector(".icon--en");
    const iconES = btn.querySelector(".icon--es");
    if (iconEN && iconES) {
      iconEN.style.display = isEnglish ? "none" : "inline-flex";
      iconES.style.display = isEnglish ? "inline-flex" : "none";
    }
    btn.classList.toggle("is-en", isEnglish);
    btn.setAttribute("aria-pressed", isEnglish ? "true" : "false");
    btn.setAttribute("aria-label", isEnglish ? "Cambiar a español" : "Switch to English");
  }
});