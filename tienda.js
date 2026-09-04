/* ============================================================
   tienda.js - JavaScript para la página Tienda
   (Imagen por producto + Carrito + Modal de detalle con slider)
   Ahora con soporte bilingüe (ES/EN) sin afectar el filtro
   ============================================================ */

// ---------- IDIOMA ACTUAL ----------
let currentLang = localStorage.getItem('clearDropLang') || 'es';

// ---------- DATOS DE PRODUCTOS ----------
const products = [
  {
    id: 1,
    name: 'Rotoplas 500 L',
    name_en: 'Rotoplas 500 L',
    desc: 'Tanque de agua Rotoplas 500 L',
    desc_en: 'Rotoplas 500 L Water Tank',
    price: 125.00,
    category: 'tanques',
    brand: 'Rotoplas',
    badge: '500 L',
    icon: 'fa-water',
    image: 'img/rotop5.png',
    images: ['img/rotop5.png', 'img/rotop5-2.png', 'img/rotop5-3.png'],
    details: 'El Tanque de Agua Rotoplas está fabricado en polietileno de alta densidad (PEAD) con protección UV, ofreciendo resistencia, durabilidad y seguridad para el almacenamiento de agua. Su diseño cuenta con interior liso para facilitar la limpieza, tapa de cierre seguro y salida inferior para conexión hidráulica. Es ideal para uso doméstico, comercial e industrial.',
    details_en: 'The Rotoplas Water Tank is made of high-density polyethylene (HDPE) with UV protection, offering strength, durability, and safety for water storage. Its design features a smooth interior for easy cleaning, a secure locking lid, and a bottom outlet for plumbing connection. Ideal for household, commercial, and industrial use.'
  },
  {
    id: 2,
    name: 'Filtro de agua 5 etapas',
    name_en: '5-Stage Water Filter',
    desc: 'Filtro de agua 5 etapas',
    desc_en: '5-Stage Water Filter',
    price: 89.99,
    category: 'filtros',
    brand: 'Filtro',
    badge: '5 etapas',
    icon: 'fa-filter',
    image: 'img/filtro5etapas.png',
    images: ['img/filtro5etapas.png', 'img/filtro5etapas-2.png', 'img/FILTROO.png'],
    details: 'El filtro de agua 5 etapas está fabricado con materiales de alta calidad, incluyendo carbón activado y membranas de filtración, para eliminar impurezas, sedimentos y contaminantes del agua potable. Su diseño compacto permite una fácil instalación en sistemas domésticos, garantizando agua limpia y segura para consumo diario.',
    details_en: 'The 5-stage water filter is made with high-quality materials, including activated carbon and filtration membranes, to remove impurities, sediment, and contaminants from drinking water. Its compact design allows for easy installation in household systems, ensuring clean and safe water for daily use.'
  },
  {
    id: 3,
    name: 'Llave de paso bronce 1/2"',
    name_en: '1/2" Bronze Shut-off Valve',
    desc: 'Llave de paso bronce 1/2"',
    desc_en: '1/2" Bronze Shut-off Valve',
    price: 8.50,
    category: 'llaves',
    brand: 'Bronce',
    badge: '1/2"',
    icon: 'fa-faucet',
    image: 'img/llavepaso.png',
    images: ['img/llavepaso.png', 'img/llavepaso-2.png', 'img/llave-paso-3.png'],
    details: 'Llave de paso de bronce de 1/2", ideal para controlar el flujo de agua en tuberías domésticas. Resistente a la corrosión y fácil de instalar, con un diseño compacto y duradero.',
    details_en: 'A 1/2" bronze shut-off valve, ideal for controlling water flow in household pipes. Corrosion-resistant and easy to install, with a compact, durable design.'
  },
  {
    id: 4,
    name: 'Bomba periférica 1 HP',
    name_en: '1 HP Peripheral Pump',
    desc: 'Bomba de agua periférica 1 HP',
    desc_en: '1 HP Peripheral Water Pump',
    price: 110.00,
    category: 'bombas',
    brand: 'Periférica',
    badge: '1 HP',
    icon: 'fa-pump',
    image: 'img/bombaperi.png',
    images: ['img/bombaperi.png', 'img/bombaperi-2.png', 'img/bombaperi-3.png'],
    details: 'Bomba periférica TOTAL de 1 HP, ideal para uso doméstico y sistemas de abastecimiento de agua. Ofrece buen rendimiento, diseño compacto y resistente, fácil instalación y funcionamiento eficiente para mantener una presión de agua constante.',
    details_en: 'A 1 HP TOTAL peripheral pump, ideal for household use and water supply systems. It offers good performance, a compact and durable design, easy installation, and efficient operation to maintain constant water pressure.'
  },
  {
    id: 5,
    name: 'Filtro sedimentos 10"',
    name_en: '10" Sediment Filter',
    desc: 'Filtro de sedimentos 10 pulgadas',
    desc_en: '10-inch Sediment Filter',
    price: 15.00,
    category: 'accesorios',
    brand: 'Sedimentos',
    badge: '10"',
    icon: 'fa-tools',
    image: 'img/filtrosedi.png',
    images: ['img/filtrosedi.png', 'img/filtrosedi-2.png'],
    details: 'Filtro de sedimentos de 10 pulgadas, diseñado para eliminar partículas sólidas y sedimentos del agua potable. Fabricado con materiales duraderos, es fácil de instalar y mantener, asegurando agua limpia y libre de impurezas para uso doméstico.',
    details_en: 'A 10-inch sediment filter, designed to remove solid particles and sediment from drinking water. Made with durable materials, it is easy to install and maintain, ensuring clean water free of impurities for household use.'
  },
  {
    id: 6,
    name: 'Rotoplas 1000 L',
    name_en: 'Rotoplas 1000 L',
    desc: 'Tanque de agua Rotoplas 1000 L',
    desc_en: 'Rotoplas 1000 L Water Tank',
    price: 210.00,
    category: 'tanques',
    brand: 'Rotoplas',
    badge: '1000 L',
    icon: 'fa-water',
    image: 'img/rotoplas.png',
    images: ['img/rotoplas.png', 'img/rotoplas-2.png'],
    details: 'El Tanque de Agua Rotoplas está fabricado en polietileno de alta densidad (PEAD) con protección UV, ofreciendo resistencia, durabilidad y seguridad para el almacenamiento de agua. Su diseño cuenta con interior liso para facilitar la limpieza, tapa de cierre seguro y salida inferior para conexión hidráulica. Es ideal para uso doméstico, comercial e industrial.',
    details_en: 'The Rotoplas Water Tank is made of high-density polyethylene (HDPE) with UV protection, offering strength, durability, and safety for water storage. Its design features a smooth interior for easy cleaning, a secure locking lid, and a bottom outlet for plumbing connection. Ideal for household, commercial, and industrial use.'
  },
  {
    id: 7,
    name: 'Filtro de carbón activado',
    name_en: 'Activated Carbon Filter',
    desc: 'Filtro de carbón activado 10"',
    desc_en: '10" Activated Carbon Filter',
    price: 25.00,
    category: 'filtros',
    brand: 'Carbón',
    badge: '10"',
    icon: 'fa-filter',
    image: 'img/filtroc10.png',
    images: ['img/filtroc10.png', 'img/filtroc10-2.png'],
    details: 'Filtro de carbón activado de 10 pulgadas, diseñado para eliminar cloro, malos olores y sabores del agua potable. Fabricado con materiales de alta calidad, es fácil de instalar y mantener, garantizando agua limpia y segura para consumo diario.',
    details_en: 'A 10-inch activated carbon filter, designed to remove chlorine, bad odors, and tastes from drinking water. Made with high-quality materials, it is easy to install and maintain, ensuring clean and safe water for daily consumption.'
  },
  {
    id: 8,
    name: 'Llave de paso PVC 1/2"',
    name_en: '1/2" PVC Shut-off Valve',
    desc: 'Llave de paso PVC 1/2"',
    desc_en: '1/2" PVC Shut-off Valve',
    price: 5.50,
    category: 'llaves',
    brand: 'PVC',
    badge: '1/2"',
    icon: 'fa-faucet',
    image: 'img/llave-paso.png',
    images: ['img/llave-paso.png',],
    details: 'Llave de paso PVC de 1/2 pulgada, diseñada para controlar el flujo de agua en sistemas hidráulicos. Fabricada con materiales resistentes, es fácil de instalar y mantener, garantizando un funcionamiento eficiente y seguro.',
    details_en: 'A 1/2-inch PVC shut-off valve, designed to control water flow in plumbing systems. Made with sturdy materials, it is easy to install and maintain, ensuring efficient and safe operation.'
  },
];

// ---------- HELPERS DE IDIOMA (no tocan category/icon/image/badge) ----------
function getDesc(p) {
  return currentLang === 'en' ? (p.desc_en || p.desc) : p.desc;
}
function getName(p) {
  return currentLang === 'en' ? (p.name_en || p.name) : p.name;
}
function getDetails(p) {
  return currentLang === 'en' ? (p.details_en || p.details) : p.details;
}
function t(es, en) {
  return currentLang === 'en' ? en : es;
}

// Cambiar idioma desde afuera (botón langToggle / tradu.js)
function setLanguage(lang) {
  currentLang = lang === 'en' ? 'en' : 'es';
  localStorage.setItem('clearDropLang', currentLang);

  const activePill = document.querySelector('.filter-pill.active');
  const currentFilter = activePill ? activePill.dataset.filter : 'todos';
  renderProducts(currentFilter);
  renderCart();
}
window.setLanguage = setLanguage;

// Si tradu.js dispara un evento personalizado al cambiar idioma, lo escuchamos
document.addEventListener('clearDropLangChange', (e) => {
  if (e.detail && e.detail.lang) setLanguage(e.detail.lang);
});

// ---------- ELEMENTO DEL DOM ----------
const grid = document.getElementById('productGrid');

// ---------- RENDERIZAR PRODUCTOS ----------
function renderProducts(category = 'todos') {
  const filtered = category === 'todos'
    ? products
    : products.filter(p => p.category === category); // category NUNCA se traduce: el filtro sigue intacto

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column:1/-1; text-align:center; padding:2rem; color:var(--text-body);">
        ${t('No hay productos en esta categoría', 'No products in this category')}
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(p => `
    <div class="product-card" data-id="${p.id}">
      <img src="${p.image}" alt="${getDesc(p)}" class="product-image">
      <div class="product-brand">
        <i class="fas ${p.icon}"></i> ${p.brand}
        <span class="product-badge">${p.badge}</span>
      </div>
      <div class="product-name">${getDesc(p)}</div>
      <div class="product-price">$${p.price.toFixed(2)}</div>
      <button class="product-action" data-id="${p.id}">
        <i class="fas fa-cart-plus"></i> ${t('Agregar', 'Add')}
      </button>
    </div>
  `).join('');

  // Botones "Agregar" -> agregan al carrito sin abrir el modal de detalle
  document.querySelectorAll('.product-action').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      const id = parseInt(this.dataset.id);
      const product = products.find(p => p.id === id);
      if (product) {
        addToCart(product);
      }
    });
  });

  // Click en la tarjeta -> abre el modal de detalle del producto
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', function () {
      const id = parseInt(this.dataset.id);
      const product = products.find(p => p.id === id);
      if (product) openProductModal(product);
    });
  });
}

// ---------- EVENTOS DE LOS BOTONES (PILLS) ----------
const filterPills = document.querySelectorAll('.filter-pill');

filterPills.forEach(pill => {
  pill.addEventListener('click', function () {
    filterPills.forEach(p => p.classList.remove('active'));
    this.classList.add('active');
    renderProducts(this.dataset.filter); // dataset.filter no se toca: sigue en español
  });
});

// ============================================================
// CARRITO
// ============================================================
let cart = [];

function updateCartCount() {
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  const countEl = document.querySelector('.cart-count');
  if (countEl) countEl.textContent = totalQty;
}

function addToCart(product) {
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  updateCartCount();
  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCartCount();
  renderCart();
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(id);
  } else {
    updateCartCount();
    renderCart();
  }
}

function renderCart() {
  const cartBody = document.getElementById('cartBody');
  const cartTotal = document.getElementById('cartTotal');
  if (!cartBody || !cartTotal) return;

  if (cart.length === 0) {
    cartBody.innerHTML = `<div class="cart-empty">${t('Tu carrito está vacío', 'Your cart is empty')}</div>`;
    cartTotal.textContent = '$0.00';
    return;
  }

  cartBody.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${getDesc(item)}">
      <div class="cart-item-info">
        <div class="cart-item-name">${getDesc(item)}</div>
        <div class="cart-item-qty">
          <button class="qty-minus" data-id="${item.id}">−</button>
          <span>${item.qty}</span>
          <button class="qty-plus" data-id="${item.id}">+</button>
        </div>
      </div>
      <div class="cart-item-price">$${(item.price * item.qty).toFixed(2)}</div>
      <button class="cart-item-remove" data-id="${item.id}"><i class="fas fa-trash"></i></button>
    </div>
  `).join('');

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  cartTotal.textContent = `$${total.toFixed(2)}`;

  cartBody.querySelectorAll('.qty-plus').forEach(btn => {
    btn.addEventListener('click', () => changeQty(parseInt(btn.dataset.id), 1));
  });
  cartBody.querySelectorAll('.qty-minus').forEach(btn => {
    btn.addEventListener('click', () => changeQty(parseInt(btn.dataset.id), -1));
  });
  cartBody.querySelectorAll('.cart-item-remove').forEach(btn => {
    btn.addEventListener('click', () => removeFromCart(parseInt(btn.dataset.id)));
  });
}

// Abrir / cerrar modal del carrito
const cartModal = document.getElementById('cartModal');

document.getElementById('cartBtn')?.addEventListener('click', () => {
  cartModal?.classList.add('open');
});

document.getElementById('cartClose')?.addEventListener('click', () => {
  cartModal?.classList.remove('open');
});

cartModal?.addEventListener('click', (e) => {
  if (e.target === cartModal) cartModal.classList.remove('open');
});

// ============================================================
// MODAL DE DETALLE DE PRODUCTO (CON SLIDER)
// ============================================================
const productModal = document.getElementById('productModal');

// Slider state
let sliderIndex = 0;
let sliderImages = [];

// Navegar a slide
function goToSlide(index) {
  if (!sliderImages || sliderImages.length === 0) return;

  if (index < 0) index = sliderImages.length - 1;
  if (index >= sliderImages.length) index = 0;
  sliderIndex = index;

  const track = document.getElementById('sliderTrack');
  if (track) {
    track.style.transform = `translateX(-${sliderIndex * 100}%)`;
  }

  document.querySelectorAll('.slider-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === sliderIndex);
  });
}

function openProductModal(product) {
  // Obtener array de imágenes (si product.images existe, usarlo; sino usar image única)
  sliderImages = product.images && product.images.length ? product.images : [product.image];
  sliderIndex = 0;

  // Construir el track del carrusel
  const track = document.getElementById('sliderTrack');
  if (track) {
    track.innerHTML = sliderImages.map(img => `<img src="${img}" alt="${getDesc(product)}">`).join('');
    track.style.transform = 'translateX(0%)';
  }

  // Construir los puntos
  const dots = document.getElementById('sliderDots');
  if (dots) {
    dots.innerHTML = sliderImages.map((_, i) =>
      `<span class="slider-dot ${i === 0 ? 'active' : ''}" data-index="${i}"></span>`
    ).join('');

    dots.querySelectorAll('.slider-dot').forEach(dot => {
      dot.addEventListener('click', (e) => {
        const idx = parseInt(dot.dataset.index);
        goToSlide(idx);
      });
    });
  }

  // Rellenar datos del modal
  const brandEl = document.getElementById('productModalBrand');
  const nameEl = document.getElementById('productModalName');
  const descEl = document.getElementById('productModalDesc');
  const detailsEl = document.getElementById('productModalDetails');
  const priceEl = document.getElementById('productModalPrice');

  if (brandEl) brandEl.innerHTML =
    `<i class="fas ${product.icon}"></i> ${product.brand} <span class="product-badge">${product.badge}</span>`;
  if (nameEl) nameEl.textContent = getName(product);
  if (descEl) descEl.textContent = getDesc(product);
  if (detailsEl) detailsEl.textContent = getDetails(product) || '';
  if (priceEl) priceEl.textContent = `$${product.price.toFixed(2)}`;

  // Botón agregar desde modal
  const addBtn = document.getElementById('productModalAdd');
  if (addBtn) {
    addBtn.onclick = () => {
      addToCart(product);
      productModal.classList.remove('open');
    };
  }

  productModal.classList.add('open');
}

// Prev / Next del slider (listener únicos, previene comportamiento por defecto)
document.getElementById('sliderPrev')?.addEventListener('click', (e) => {
  e.stopPropagation();
  goToSlide(sliderIndex - 1);
});

document.getElementById('sliderNext')?.addEventListener('click', (e) => {
  e.stopPropagation();
  goToSlide(sliderIndex + 1);
});

// Cerrar modal
document.getElementById('productModalClose')?.addEventListener('click', () => {
  productModal?.classList.remove('open');
});

productModal?.addEventListener('click', (e) => {
  if (e.target === productModal) productModal.classList.remove('open');
});

// ---------- MENÚ MÓVIL ----------
const hamburgerBtn = document.getElementById('menuBtn');
const mobileNav = document.getElementById('mobileNav');
const menuClose = document.getElementById('menuClose');

hamburgerBtn?.addEventListener('click', () => mobileNav.classList.add('open'));
menuClose?.addEventListener('click', () => mobileNav.classList.remove('open'));

// ---------- ANIMACIÓN REVEAL ----------
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.15 });
revealEls.forEach(el => observer.observe(el));

// ---------- INICIALIZAR ----------
document.addEventListener('DOMContentLoaded', () => {
  renderProducts('todos');
  updateCartCount();
  renderCart();
});