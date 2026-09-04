/**
 * script-comunidad.js — Comunidad interactiva ClearDrop
 * Gestión de publicaciones, comentarios, likes, filtros y localStorage.
 */

(function () {
  'use strict';

  /* ============================================================
     CONSTANTES Y CONFIGURACIÓN
     ============================================================ */

  const STORAGE_KEY = 'cleardrop_comunidad';
  const CATEGORIAS_VALIDAS = ['preguntas', 'consejos', 'experiencias', 'necesidades'];
  const USUARIO_DEFAULT = '@Usuario_ClearDrop';
  const AVATAR_DEFAULT = 'img/perfil hombre.png';

  const AVATARES = {
    '@Noellys.jor25': 'img/perfil mujer.png',
    '@Eitan17Artun_ag': 'img/perfil hombre.png',
    '@Dani.big47#': 'img/perfil incognito.png',
    '@Dians_27cdz': 'img/perfil hombre.png',
    '@Carl0$-123#': 'img/perfil hombre.png',
    '@Usuario_ClearDrop': 'img/perfil hombre.png'
  };

  const BADGES = ['🏆', '🥈', '🥉', '🏅', '🟢', '⭐', '💧'];

  const PUNTOS = {
    publicacion: 10,
    comentario: 5,
    respuesta: 3,
    likeRecibido: 1
  };

  /** Colaboradores iniciales de ejemplo (puntos base) */
  const COLABORADORES_INICIALES = {
    '@Dani.big47#': { avatar: 'img/perfil incognito.png', puntosBase: 320 },
    '@Eitan17Artun_ag': { avatar: 'img/perfil hombre.png', puntosBase: 240 },
    '@Noellys.jor25': { avatar: 'img/perfil mujer.png', puntosBase: 180 },
    '@Dians_27cdz': { avatar: 'img/perfil hombre.png', puntosBase: 150 },
    '@Carl0$-123#': { avatar: 'img/perfil hombre.png', puntosBase: 120 }
  };

  /* ============================================================
     ESTADO DE LA APLICACIÓN
     ============================================================ */

  let publicaciones = [];
  let reacciones = {};
  let filtroActivo = 'todas';
  let busquedaActiva = '';
  /** @type {{ postId: string, commentId: string|null }|null} */
  let modoRespuesta = null;

  /* ============================================================
     REFERENCIAS DOM
     ============================================================ */

  const feedEl = document.getElementById('communityFeed');
  const searchInput = document.getElementById('communitySearchInput');
  const filterPills = document.getElementById('filterPills');
  const btnCrearPublicacion = document.getElementById('btnCrearPublicacion');
  const modalCrear = document.getElementById('modalCrearPublicacion');
  const formCrear = document.getElementById('formCrearPublicacion');
  const modalUsuarioActual = document.getElementById('modalUsuarioActual');
  const btnCancelarPublicacion = document.getElementById('btnCancelarPublicacion');
  const cerrarModalCrear = document.getElementById('cerrarModalCrear');
  const modalColaboradores = document.getElementById('modalColaboradores');
  const btnVerColaboradores = document.getElementById('btnVerColaboradores');
  const cerrarModalColaboradores = document.getElementById('cerrarModalColaboradores');
  const colaboradoresModalList = document.getElementById('colaboradoresModalList');
  const collaboratorsList = document.getElementById('collaboratorsList');
  const toastEl = document.getElementById('comunidadToast');

  /* ============================================================
     UTILIDADES
     ============================================================ */

  function generarId(prefix) {
    return prefix + '-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 7);
  }

  function horasAtras(horas) {
    return Date.now() - horas * 60 * 60 * 1000;
  }

  function obtenerAvatar(usuario) {
    return AVATARES[usuario] || AVATAR_DEFAULT;
  }

  function obtenerUsuarioActual() {
    if (typeof getCurrentUserName === 'function') {
      const nombre = getCurrentUserName();
      if (nombre && nombre.trim()) {
        const handle = nombre.trim().replace(/\s+/g, '');
        return handle.startsWith('@') ? handle : '@' + handle;
      }
    }
    return USUARIO_DEFAULT;
  }

  function sanitizarTexto(texto) {
    return String(texto || '').trim();
  }

  function crearElemento(tag, className, texto) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (texto !== undefined && texto !== null) el.textContent = texto;
    return el;
  }

  function mostrarToast(mensaje) {
    if (!toastEl) return;
    toastEl.textContent = mensaje;
    toastEl.classList.add('show');
    clearTimeout(mostrarToast._timer);
    mostrarToast._timer = setTimeout(() => toastEl.classList.remove('show'), 3200);
  }

  function contarComentarios(comentarios) {
    if (!Array.isArray(comentarios)) return 0;
    return comentarios.reduce((total, c) => {
      const respuestas = Array.isArray(c.respuestas) ? c.respuestas.length : 0;
      return total + 1 + respuestas;
    }, 0);
  }

  function nombreCategoria(categoria) {
    const mapa = {
      preguntas: 'Preguntas',
      consejos: 'Consejos',
      experiencias: 'Experiencias',
      necesidades: 'Necesidades'
    };
    return mapa[categoria] || categoria;
  }

  /* ============================================================
     FECHAS DINÁMICAS
     ============================================================ */

  function formatearFecha(timestamp) {
    if (!timestamp) return 'Recién publicado';

    const diff = Date.now() - timestamp;
    const segundos = Math.floor(diff / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);
    const semanas = Math.floor(dias / 7);
    const meses = Math.floor(dias / 30);

    if (segundos < 10) return 'Hace unos segundos';
    if (segundos < 60) return 'Hace ' + segundos + ' segundos';
    if (minutos === 1) return 'Hace 1 minuto';
    if (minutos < 60) return 'Hace ' + minutos + ' minutos';
    if (horas === 1) return 'Hace 1 hora';
    if (horas < 24) return 'Hace ' + horas + ' horas';
    if (dias === 1) return 'Hace 1 día';
    if (dias < 7) return 'Hace ' + dias + ' días';
    if (semanas === 1) return 'Hace 1 semana';
    if (semanas < 5) return 'Hace ' + semanas + ' semanas';
    if (meses === 1) return 'Hace 1 mes';
    return 'Hace ' + meses + ' meses';
  }

  function obtenerTextoFecha(item) {
    if (item.fechaFija) return item.fechaFija;
    return formatearFecha(item.fecha);
  }

  /* ============================================================
     DATOS INICIALES
     ============================================================ */

  function obtenerPublicacionesIniciales() {
    return [
      {
        id: 'post-inicial-1',
        usuario: '@Noellys.jor25',
        avatar: 'img/perfil mujer.png',
        titulo: 'Todos los días no tenemos agua y siempre la misma excusa no hay respeto para los residentes por parte de las autoridades de la comunidad.',
        contenido: '#agua #comunidad #experiencia #respetoparaelagua #respetociudadano',
        categoria: 'experiencias',
        fecha: horasAtras(20),
        fechaFija: 'Hace 20 horas',
        likes: 5,
        comentarios: [
          {
            id: 'comment-inicial-1',
            usuario: '@Dani.big47#',
            avatar: 'img/perfil incognito.png',
            texto: 'Por la urbanización Lassonde, se han presentado muchas quejas al IDAAN. Hace 3 años revisaron y la presión del agua mejoró, pero de nuevo tenemos baja presión.',
            fecha: horasAtras(17),
            fechaFija: 'Hace 17 horas',
            respuestas: [
              {
                id: 'reply-inicial-1',
                usuario: '@Dians_27cdz',
                avatar: 'img/perfil hombre.png',
                texto: 'Entiendo tu frustración. Es importante que la comunidad se una para exigir mejores servicios. ¿Has intentado contactar a los representantes locales o a organizaciones de derechos humanos?',
                fecha: horasAtras(11),
                fechaFija: 'Hace 11 horas'
              }
            ]
          }
        ]
      },
      {
        id: 'post-inicial-2',
        usuario: '@Eitan17Artun_ag',
        avatar: 'img/perfil hombre.png',
        titulo: 'Cuidado con nuestros recursos hídricos: Tenemos que protegerlos para no tener problemas con la falta de agua en nuestro país.',
        contenido: '#agua #consejo #cuidado #recursoshídricos #futuroverde #sostenibilidad',
        categoria: 'consejos',
        fecha: horasAtras(21),
        fechaFija: 'Hace 21 horas',
        likes: 0,
        comentarios: []
      }
    ];
  }

  /* ============================================================
     LOCALSTORAGE
     ============================================================ */

  function cargarPublicaciones() {
    try {
      const datos = localStorage.getItem(STORAGE_KEY);
      if (datos) {
        const parsed = JSON.parse(datos);
        if (parsed && Array.isArray(parsed.publicaciones)) {
          publicaciones = parsed.publicaciones;
          reacciones = parsed.reacciones && typeof parsed.reacciones === 'object'
            ? parsed.reacciones
            : {};
          return;
        }
      }
    } catch (e) {
      console.warn('No se pudo cargar localStorage, usando datos iniciales.', e);
    }
    publicaciones = obtenerPublicacionesIniciales();
    reacciones = {};
    guardarPublicaciones();
  }

  function guardarPublicaciones() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        publicaciones,
        reacciones
      }));
    } catch (e) {
      console.error('Error al guardar en localStorage:', e);
    }
  }

  /* ============================================================
     COLABORADORES Y CATEGORÍAS
     ============================================================ */

  function calcularColaboradores() {
    const puntos = {};

    Object.entries(COLABORADORES_INICIALES).forEach(([usuario, data]) => {
      puntos[usuario] = {
        usuario,
        avatar: data.avatar,
        puntos: data.puntosBase
      };
    });

    publicaciones.forEach(post => {
      if (!puntos[post.usuario]) {
        puntos[post.usuario] = { usuario: post.usuario, avatar: post.avatar || obtenerAvatar(post.usuario), puntos: 0 };
      }
      puntos[post.usuario].puntos += PUNTOS.publicacion;
      puntos[post.usuario].puntos += (post.likes || 0) * PUNTOS.likeRecibido;

      (post.comentarios || []).forEach(comentario => {
        if (!puntos[comentario.usuario]) {
          puntos[comentario.usuario] = {
            usuario: comentario.usuario,
            avatar: comentario.avatar || obtenerAvatar(comentario.usuario),
            puntos: 0
          };
        }
        puntos[comentario.usuario].puntos += PUNTOS.comentario;

        (comentario.respuestas || []).forEach(respuesta => {
          if (!puntos[respuesta.usuario]) {
            puntos[respuesta.usuario] = {
              usuario: respuesta.usuario,
              avatar: respuesta.avatar || obtenerAvatar(respuesta.usuario),
              puntos: 0
            };
          }
          puntos[respuesta.usuario].puntos += PUNTOS.respuesta;
        });
      });
    });

    return Object.values(puntos).sort((a, b) => b.puntos - a.puntos);
  }

  function actualizarCategorias() {
    const conteos = { preguntas: 0, consejos: 0, experiencias: 0, necesidades: 0 };
    publicaciones.forEach(p => {
      if (conteos[p.categoria] !== undefined) conteos[p.categoria]++;
    });

    document.querySelectorAll('[data-count]').forEach(el => {
      const cat = el.getAttribute('data-count');
      if (conteos[cat] !== undefined) el.textContent = conteos[cat];
    });
  }

  function renderColaboradorItem(colaborador, index, contenedor) {
    const item = crearElemento('div', 'collaborator-item');
    const img = document.createElement('img');
    img.className = 'collaborator-avatar';
    img.src = colaborador.avatar || AVATAR_DEFAULT;
    img.alt = '';
    item.appendChild(img);
    item.appendChild(crearElemento('span', 'collaborator-name', colaborador.usuario));
    const badge = BADGES[index] || '💧';
    item.appendChild(crearElemento('span', 'collaborator-badge', badge + ' ' + colaborador.puntos));
    contenedor.appendChild(item);
  }

  function actualizarColaboradores() {
    if (!collaboratorsList) return;
    const todos = calcularColaboradores();
    collaboratorsList.replaceChildren();
    todos.slice(0, 5).forEach((col, i) => renderColaboradorItem(col, i, collaboratorsList));
  }

  function abrirModalColaboradores() {
    if (!modalColaboradores || !colaboradoresModalList) return;
    const todos = calcularColaboradores();
    colaboradoresModalList.replaceChildren();

    if (todos.length === 0) {
      colaboradoresModalList.appendChild(crearElemento('p', '', 'Aún no hay colaboradores registrados.'));
    } else {
      todos.forEach((col, i) => {
        const item = crearElemento('div', 'colaborador-modal-item');
        item.appendChild(crearElemento('span', 'colaborador-modal-rank', String(i + 1)));
        const img = document.createElement('img');
        img.className = 'collaborator-avatar';
        img.src = col.avatar || AVATAR_DEFAULT;
        img.alt = '';
        item.appendChild(img);
        item.appendChild(crearElemento('span', 'collaborator-name', col.usuario));
        item.appendChild(crearElemento('span', 'collaborator-badge', (BADGES[i] || '💧') + ' ' + col.puntos));
        colaboradoresModalList.appendChild(item);
      });
    }

    abrirModal(modalColaboradores);
  }

  /* ============================================================
     FILTROS Y BÚSQUEDA
     ============================================================ */

  function obtenerPublicacionesFiltradas() {
    let resultado = [...publicaciones];

    if (filtroActivo !== 'todas') {
      resultado = resultado.filter(p => p.categoria === filtroActivo);
    }

    const termino = busquedaActiva.trim().toLowerCase();
    if (termino) {
      resultado = resultado.filter(p => {
        const cat = nombreCategoria(p.categoria).toLowerCase();
        return (
          (p.usuario && p.usuario.toLowerCase().includes(termino)) ||
          (p.titulo && p.titulo.toLowerCase().includes(termino)) ||
          (p.contenido && p.contenido.toLowerCase().includes(termino)) ||
          cat.includes(termino) ||
          (p.categoria && p.categoria.toLowerCase().includes(termino))
        );
      });
    }

    return resultado.sort((a, b) => (b.fecha || 0) - (a.fecha || 0));
  }

  function filtrarPublicaciones(categoria) {
    filtroActivo = categoria;
    if (filterPills) {
      filterPills.querySelectorAll('.filter-pill').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === categoria);
      });
    }
    renderizarPublicaciones();
  }

  function buscarPublicaciones(termino) {
    busquedaActiva = termino;
    renderizarPublicaciones();
  }

  /* ============================================================
     LIKES
     ============================================================ */

  function darLike(postId) {
    const post = publicaciones.find(p => p.id === postId);
    if (!post) return;

    const yaReacciono = !!reacciones[postId];
    if (yaReacciono) {
      post.likes = Math.max(0, (post.likes || 0) - 1);
      delete reacciones[postId];
    } else {
      post.likes = (post.likes || 0) + 1;
      reacciones[postId] = true;
    }

    guardarPublicaciones();
    actualizarColaboradores();
    renderizarPublicaciones();
  }

  /* ============================================================
     COMENTARIOS Y RESPUESTAS
     ============================================================ */

  function crearComentario(postId, texto) {
    const post = publicaciones.find(p => p.id === postId);
    if (!post) return false;

    const contenido = sanitizarTexto(texto);
    if (!contenido || contenido.length > 1000) return false;

    if (!Array.isArray(post.comentarios)) post.comentarios = [];

    const usuario = obtenerUsuarioActual();
    post.comentarios.push({
      id: generarId('comment'),
      usuario,
      avatar: obtenerAvatar(usuario),
      texto: contenido,
      fecha: Date.now(),
      respuestas: []
    });

    guardarPublicaciones();
    actualizarColaboradores();
    return true;
  }

  function crearRespuesta(postId, commentId, texto) {
    const post = publicaciones.find(p => p.id === postId);
    if (!post) return false;

    const comentario = (post.comentarios || []).find(c => c.id === commentId);
    if (!comentario) return false;

    const contenido = sanitizarTexto(texto);
    if (!contenido || contenido.length > 1000) return false;

    if (!Array.isArray(comentario.respuestas)) comentario.respuestas = [];

    const usuario = obtenerUsuarioActual();
    comentario.respuestas.push({
      id: generarId('reply'),
      usuario,
      avatar: obtenerAvatar(usuario),
      texto: contenido,
      fecha: Date.now()
    });

    guardarPublicaciones();
    actualizarColaboradores();
    return true;
  }

  /* ============================================================
     CREAR PUBLICACIÓN
     ============================================================ */

  function crearPublicacion(datos) {
    const titulo = sanitizarTexto(datos.titulo);
    const contenido = sanitizarTexto(datos.contenido);
    const categoria = datos.categoria;

    if (!titulo || titulo.length > 200) return { ok: false, mensaje: 'El título es obligatorio (máx. 200 caracteres).' };
    if (!contenido || contenido.length > 2000) return { ok: false, mensaje: 'El contenido es obligatorio (máx. 2000 caracteres).' };
    if (!CATEGORIAS_VALIDAS.includes(categoria)) return { ok: false, mensaje: 'Selecciona una categoría válida.' };

    const usuario = obtenerUsuarioActual();
    const nueva = {
      id: generarId('post'),
      usuario,
      avatar: obtenerAvatar(usuario),
      titulo,
      contenido,
      categoria,
      fecha: Date.now(),
      likes: 0,
      comentarios: []
    };

    publicaciones.unshift(nueva);
    guardarPublicaciones();
    actualizarCategorias();
    actualizarColaboradores();
    renderizarPublicaciones();
    return { ok: true };
  }

  /* ============================================================
     RENDERIZADO
     ============================================================ */

  function crearIconoLike() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M12 2C8 8 4 12 4 16a8 8 0 0016 0c0-4-4-8-8-14z');
    svg.appendChild(path);
    return svg;
  }

  function crearIconoComentario() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z');
    svg.appendChild(path);
    return svg;
  }

  function crearIconoEnviar() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line1.setAttribute('x1', '22');
    line1.setAttribute('y1', '2');
    line1.setAttribute('x2', '11');
    line1.setAttribute('y2', '13');
    const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    poly.setAttribute('points', '22 2 15 22 11 13 2 9 22 2');
    svg.appendChild(line1);
    svg.appendChild(poly);
    return svg;
  }

  function renderizarRespuesta(respuesta) {
    const row = crearElemento('div', 'comment-row reply');
    row.dataset.replyId = respuesta.id;

    const avatar = document.createElement('img');
    avatar.className = 'comment-avatar';
    avatar.src = respuesta.avatar || AVATAR_DEFAULT;
    avatar.alt = 'img.usuario';
    row.appendChild(avatar);

    const content = crearElemento('div', 'comment-content');
    const header = crearElemento('div', 'comment-header');
    header.appendChild(crearElemento('span', 'comment-author', respuesta.usuario));
    header.appendChild(crearElemento('span', 'comment-time', obtenerTextoFecha(respuesta)));
    content.appendChild(header);
    content.appendChild(crearElemento('p', 'comment-text', respuesta.texto));
    row.appendChild(content);

    return row;
  }

  function renderizarComentario(comentario, postId) {
    const fragment = document.createDocumentFragment();
    const tieneRespuestas = comentario.respuestas && comentario.respuestas.length > 0;
    const threadId = 'thread-' + comentario.id;

    const row = crearElemento('div', 'comment-row');
    row.dataset.commentId = comentario.id;

    if (tieneRespuestas) {
      const toggle = crearElemento('button', 'comment-toggle');
      toggle.type = 'button';
      toggle.dataset.toggle = threadId;
      toggle.setAttribute('aria-label', 'Colapsar respuestas');
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('width', '14');
      svg.setAttribute('height', '14');
      svg.setAttribute('viewBox', '0 0 24 24');
      svg.setAttribute('fill', 'none');
      svg.setAttribute('stroke', 'currentColor');
      svg.setAttribute('stroke-width', '2');
      const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
      poly.setAttribute('points', '6 9 12 15 18 9');
      svg.appendChild(poly);
      toggle.appendChild(svg);
      row.appendChild(toggle);
    } else {
      const spacer = crearElemento('span', 'comment-toggle-spacer');
      spacer.style.width = '14px';
      spacer.style.flexShrink = '0';
      row.appendChild(spacer);
    }

    const avatar = document.createElement('img');
    avatar.className = 'comment-avatar';
    avatar.src = comentario.avatar || AVATAR_DEFAULT;
    avatar.alt = 'img.usuario';
    row.appendChild(avatar);

    const content = crearElemento('div', 'comment-content');
    const header = crearElemento('div', 'comment-header');
    header.appendChild(crearElemento('span', 'comment-author', comentario.usuario));
    header.appendChild(crearElemento('span', 'comment-time', obtenerTextoFecha(comentario)));
    content.appendChild(header);
    content.appendChild(crearElemento('p', 'comment-text', comentario.texto));

    const actions = crearElemento('div', 'comment-actions');
    const btnResponder = crearElemento('button', 'btn-responder', 'Responder');
    btnResponder.type = 'button';
    btnResponder.dataset.postId = postId;
    btnResponder.dataset.commentId = comentario.id;
    if (modoRespuesta && modoRespuesta.postId === postId && modoRespuesta.commentId === comentario.id) {
      btnResponder.classList.add('active');
    }
    actions.appendChild(btnResponder);
    content.appendChild(actions);
    row.appendChild(content);
    fragment.appendChild(row);

    if (tieneRespuestas) {
      const group = crearElemento('div', 'comment-replies-group');
      group.id = threadId;
      comentario.respuestas.forEach(r => group.appendChild(renderizarRespuesta(r)));
      fragment.appendChild(group);
    }

    return fragment;
  }

  function renderizarCajaComentario(postId) {
    const box = crearElemento('div', 'add-comment-box');
    box.dataset.postId = postId;

    const indicador = crearElemento('div', 'reply-mode-indicator');
    if (modoRespuesta && modoRespuesta.postId === postId && modoRespuesta.commentId) {
      indicador.classList.add('visible');
      indicador.appendChild(document.createTextNode('Respondiendo a un comentario'));
      const cancel = crearElemento('button', 'btn-cancel-reply', 'Cancelar');
      cancel.type = 'button';
      cancel.dataset.postId = postId;
      indicador.appendChild(cancel);
    }

    const wrapper = document.createElement('div');
    wrapper.style.flex = '1';

    if (indicador.classList.contains('visible')) {
      wrapper.appendChild(indicador);
    }

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'comment-input-field';
    input.dataset.postId = postId;
    input.maxLength = 1000;
    input.setAttribute('aria-label', 'Escribir comentario');

    const esRespuesta = modoRespuesta && modoRespuesta.postId === postId && modoRespuesta.commentId;
    input.placeholder = esRespuesta ? 'Escribe una respuesta...' : 'Escribe un comentario...';
    wrapper.appendChild(input);
    box.appendChild(wrapper);

    const btnEnviar = crearElemento('button', 'btn-enviar-comentario');
    btnEnviar.type = 'button';
    btnEnviar.dataset.postId = postId;
    btnEnviar.setAttribute('aria-label', 'Enviar comentario');
    btnEnviar.appendChild(crearIconoEnviar());
    box.appendChild(btnEnviar);

    return box;
  }

  function renderizarPublicacion(post) {
    const article = crearElemento('article', 'post-card reveal');
    article.dataset.category = post.categoria;
    article.dataset.postId = post.id;

    const header = crearElemento('div', 'post-header');
    const avatar = document.createElement('img');
    avatar.className = 'post-avatar';
    avatar.src = post.avatar || AVATAR_DEFAULT;
    avatar.alt = 'img.usuario';
    header.appendChild(avatar);

    const meta = crearElemento('div', 'post-meta');
    meta.appendChild(crearElemento('div', 'post-author', post.usuario));
    meta.appendChild(crearElemento('div', 'post-time', obtenerTextoFecha(post)));
    header.appendChild(meta);

    const options = crearElemento('button', 'post-options', '\u2026');
    options.type = 'button';
    options.setAttribute('aria-label', 'Más opciones');
    header.appendChild(options);
    article.appendChild(header);

    article.appendChild(crearElemento('span', 'post-category-badge', nombreCategoria(post.categoria)));
    article.appendChild(crearElemento('h3', 'post-title', post.titulo));
    article.appendChild(crearElemento('p', 'post-text', post.contenido));

    const totalComentarios = contarComentarios(post.comentarios);
    const liked = !!reacciones[post.id];

    const actions = crearElemento('div', 'post-actions');
    const actionsLeft = crearElemento('div', 'post-actions-left');

    const btnLike = crearElemento('button', 'post-action-btn' + (liked ? ' liked' : ''));
    btnLike.type = 'button';
    btnLike.dataset.action = 'like';
    btnLike.dataset.postId = post.id;
    btnLike.appendChild(crearIconoLike());
    btnLike.appendChild(document.createTextNode(' ' + (post.likes || 0)));
    actionsLeft.appendChild(btnLike);

    const btnComments = crearElemento('button', 'post-action-btn');
    btnComments.type = 'button';
    btnComments.dataset.action = 'focus-comment';
    btnComments.dataset.postId = post.id;
    btnComments.appendChild(crearIconoComentario());
    btnComments.appendChild(document.createTextNode(' ' + totalComentarios));
    actionsLeft.appendChild(btnComments);

    actions.appendChild(actionsLeft);

    const btnComentar = crearElemento('button', 'btn-comment', 'Comentar');
    btnComentar.type = 'button';
    btnComentar.dataset.postId = post.id;
    actions.appendChild(btnComentar);
    article.appendChild(actions);

    const thread = crearElemento('div', 'comment-thread');
    (post.comentarios || []).forEach(c => {
      thread.appendChild(renderizarComentario(c, post.id));
    });
    thread.appendChild(renderizarCajaComentario(post.id));
    article.appendChild(thread);

    return article;
  }

  function renderizarPublicaciones() {
    if (!feedEl) return;

    const lista = obtenerPublicacionesFiltradas();
    feedEl.replaceChildren();

    if (lista.length === 0) {
      const empty = crearElemento('div', 'feed-empty-message reveal');
      const hayBusqueda = busquedaActiva.trim().length > 0;
      const hayFiltro = filtroActivo !== 'todas';

      if (hayBusqueda) {
        empty.appendChild(crearElemento('strong', '', 'No encontramos publicaciones que coincidan con tu búsqueda.'));
        empty.appendChild(crearElemento('p', '', 'Prueba con otras palabras o revisa los filtros activos.'));
      } else if (hayFiltro) {
        empty.appendChild(crearElemento('strong', '', 'No hay publicaciones que coincidan con este filtro.'));
        empty.appendChild(crearElemento('p', '', 'Selecciona otra categoría o crea una nueva publicación.'));
      } else {
        empty.appendChild(crearElemento('strong', '', 'Aún no hay publicaciones en la comunidad.'));
        empty.appendChild(crearElemento('p', '', 'Sé el primero en compartir una experiencia o consejo.'));
      }
      feedEl.appendChild(empty);
    } else {
      lista.forEach(post => feedEl.appendChild(renderizarPublicacion(post)));
    }

    initRevealObserver();
  }

  /* ============================================================
     MODALES
     ============================================================ */

  function abrirModal(modal) {
    if (!modal) return;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function cerrarModal(modal) {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    if (!document.querySelector('.comunidad-modal-overlay.open')) {
      document.body.style.overflow = '';
    }
  }

  function abrirModalCrear() {
    if (modalUsuarioActual) {
      modalUsuarioActual.textContent = 'Publicando como ' + obtenerUsuarioActual();
    }
    if (formCrear) formCrear.reset();
    abrirModal(modalCrear);
    const tituloInput = document.getElementById('postTitulo');
    if (tituloInput) setTimeout(() => tituloInput.focus(), 100);
  }

  function cerrarModalCrearFn() {
    cerrarModal(modalCrear);
    if (formCrear) formCrear.reset();
  }

  /* ============================================================
     INTERACCIONES
     ============================================================ */

  function enviarComentario(postId, texto) {
    const contenido = sanitizarTexto(texto);
    if (!contenido) return;

    let ok = false;
    if (modoRespuesta && modoRespuesta.postId === postId && modoRespuesta.commentId) {
      ok = crearRespuesta(postId, modoRespuesta.commentId, contenido);
      if (ok) modoRespuesta = null;
    } else {
      ok = crearComentario(postId, contenido);
    }

    if (ok) {
      renderizarPublicaciones();
      enfocarInputComentario(postId);
    }
  }

  function enfocarInputComentario(postId) {
    const input = feedEl && feedEl.querySelector('.comment-input-field[data-post-id="' + postId + '"]');
    if (input) input.focus();
  }

  function activarModoRespuesta(postId, commentId) {
    if (modoRespuesta && modoRespuesta.postId === postId && modoRespuesta.commentId === commentId) {
      modoRespuesta = null;
    } else {
      modoRespuesta = { postId, commentId };
    }
    renderizarPublicaciones();
    enfocarInputComentario(postId);
  }

  function toggleComentarios(btn) {
    const targetId = btn.dataset.toggle;
    if (!targetId) return;
    const target = document.getElementById(targetId);
    btn.classList.toggle('collapsed');
    if (target) target.classList.toggle('collapsed');
  }

  /* ============================================================
     EVENT LISTENERS
     ============================================================ */

  function initEventListeners() {
    if (btnCrearPublicacion) {
      btnCrearPublicacion.addEventListener('click', abrirModalCrear);
    }

    if (btnCancelarPublicacion) {
      btnCancelarPublicacion.addEventListener('click', cerrarModalCrearFn);
    }

    if (cerrarModalCrear) {
      cerrarModalCrear.addEventListener('click', cerrarModalCrearFn);
    }

    if (modalCrear) {
      modalCrear.addEventListener('click', (e) => {
        if (e.target === modalCrear) cerrarModalCrearFn();
      });
    }

    if (formCrear) {
      formCrear.addEventListener('submit', (e) => {
        e.preventDefault();
        const titulo = document.getElementById('postTitulo');
        const contenido = document.getElementById('postContenido');
        const categoria = document.getElementById('postCategoria');

        const resultado = crearPublicacion({
          titulo: titulo ? titulo.value : '',
          contenido: contenido ? contenido.value : '',
          categoria: categoria ? categoria.value : ''
        });

        if (!resultado.ok) {
          mostrarToast(resultado.mensaje);
          return;
        }

        cerrarModalCrearFn();
        mostrarToast('Publicación creada correctamente.');
      });
    }

    if (btnVerColaboradores) {
      btnVerColaboradores.addEventListener('click', abrirModalColaboradores);
    }

    if (cerrarModalColaboradores) {
      cerrarModalColaboradores.addEventListener('click', () => cerrarModal(modalColaboradores));
    }

    if (modalColaboradores) {
      modalColaboradores.addEventListener('click', (e) => {
        if (e.target === modalColaboradores) cerrarModal(modalColaboradores);
      });
    }

    if (filterPills) {
      filterPills.addEventListener('click', (e) => {
        const btn = e.target.closest('.filter-pill');
        if (btn && btn.dataset.filter) filtrarPublicaciones(btn.dataset.filter);
      });
    }

    if (searchInput) {
      searchInput.addEventListener('input', (e) => buscarPublicaciones(e.target.value));
    }

    if (feedEl) {
      feedEl.addEventListener('click', (e) => {
        const likeBtn = e.target.closest('[data-action="like"]');
        if (likeBtn) {
          darLike(likeBtn.dataset.postId);
          return;
        }

        const focusBtn = e.target.closest('[data-action="focus-comment"]');
        if (focusBtn) {
          modoRespuesta = null;
          renderizarPublicaciones();
          enfocarInputComentario(focusBtn.dataset.postId);
          return;
        }

        const btnComentar = e.target.closest('.btn-comment');
        if (btnComentar) {
          modoRespuesta = null;
          renderizarPublicaciones();
          enfocarInputComentario(btnComentar.dataset.postId);
          return;
        }

        const btnResponder = e.target.closest('.btn-responder');
        if (btnResponder) {
          activarModoRespuesta(btnResponder.dataset.postId, btnResponder.dataset.commentId);
          return;
        }

        const btnCancelReply = e.target.closest('.btn-cancel-reply');
        if (btnCancelReply) {
          modoRespuesta = null;
          renderizarPublicaciones();
          return;
        }

        const btnEnviar = e.target.closest('.btn-enviar-comentario');
        if (btnEnviar) {
          const postId = btnEnviar.dataset.postId;
          const input = feedEl.querySelector('.comment-input-field[data-post-id="' + postId + '"]');
          if (input) enviarComentario(postId, input.value);
          return;
        }

        const toggle = e.target.closest('.comment-toggle');
        if (toggle) toggleComentarios(toggle);
      });

      feedEl.addEventListener('keydown', (e) => {
        if (e.key !== 'Enter') return;
        const input = e.target.closest('.comment-input-field');
        if (!input) return;
        e.preventDefault();
        enviarComentario(input.dataset.postId, input.value);
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (modalCrear && modalCrear.classList.contains('open')) cerrarModalCrearFn();
        if (modalColaboradores && modalColaboradores.classList.contains('open')) cerrarModal(modalColaboradores);
      }
    });
  }

  /* ============================================================
     ANIMACIÓN REVEAL
     ============================================================ */

  let revealObserver = null;

  function initRevealObserver() {
    const revealEls = document.querySelectorAll('.reveal:not(.visible)');
    if (!revealObserver) {
      revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      }, { threshold: 0.15 });
    }
    revealEls.forEach(el => revealObserver.observe(el));
  }

  /* ============================================================
     INICIALIZACIÓN
     ============================================================ */

  function initComunidad() {
    if (!feedEl) return;

    cargarPublicaciones();
    initEventListeners();
    actualizarCategorias();
    actualizarColaboradores();
    renderizarPublicaciones();
    initRevealObserver();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initComunidad);
  } else {
    initComunidad();
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
})();
