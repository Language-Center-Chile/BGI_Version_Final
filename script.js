/* ============================================================
   BGI PROPIEDADES – script.js
   - Scroll suave (menú de navegación)
   - Menú hamburguesa (mobile)
   - Header scroll shadow
   - Carrusel infinito (CSS puro, JS solo como respaldo)
   - Popup flotante WhatsApp
   - Formulario de contacto conectado a n8n webhook
   ============================================================ */

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {
  initSmoothScroll();
  initHamburger();
  initHeaderScroll();
  initContactForm();
  console.log('Desarrollado por TOZZTY-UI y yennibarreto2025');
});

/* ============================================================
   1. SCROLL SUAVE
   Captura todos los enlaces con href que comience con "#"
   y desplaza suavemente a la sección destino.
   ============================================================ */
function initSmoothScroll() {
  const HEADER_HEIGHT = 72; // altura del header fijo en px

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      e.preventDefault();

      const targetTop = targetEl.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT;

      window.scrollTo({
        top: targetTop,
        behavior: 'smooth'
      });

      // Cerrar el menú móvil si está abierto
      const nav = document.getElementById('mainNav');
      if (nav && nav.classList.contains('open')) {
        nav.classList.remove('open');
        updateHamburgerIcon(false);
      }
    });
  });
}

/* ============================================================
   3. MENÚ HAMBURGUESA (mobile)
   ============================================================ */
function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('mainNav');

  if (!hamburger || !nav) return;

  hamburger.addEventListener('click', function () {
    const isOpen = nav.classList.toggle('open');
    updateHamburgerIcon(isOpen);
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Cerrar al hacer clic fuera
  document.addEventListener('click', function (e) {
    if (nav.classList.contains('open') &&
        !nav.contains(e.target) &&
        !hamburger.contains(e.target)) {
      nav.classList.remove('open');
      updateHamburgerIcon(false);
    }
  });
}

function updateHamburgerIcon(isOpen) {
  const icon = document.querySelector('#hamburger i');
  if (!icon) return;
  icon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
}

/* ============================================================
   4. HEADER: SOMBRA AL HACER SCROLL
   ============================================================ */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', function () {
    if (window.scrollY > 20) {
      header.style.boxShadow = '0 4px 30px rgba(0,0,0,0.25)';
    } else {
      header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)';
    }
  }, { passive: true });
}

/* ============================================================
   4. FORMULARIO DE CONTACTO CONECTADO A N8N
   Todos los campos del formulario se envían al webhook de n8n
   ============================================================ */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  // Reemplaza esta URL con tu webhook de n8n
  const N8N_WEBHOOK_URL = 'https://n8n-es8k0oos8kks4s8gc0gsw08w.72.62.165.86.sslip.io/webhook/69ad6d33-9216-4e35-a7c8-74c617904c42';

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Capturar TODOS los inputs del formulario para enviar a n8n
    const formData = new FormData(form);
    const nombre = formData.get('nombre').trim();
    const email = formData.get('email').trim();
    const telefono = formData.get('telefono')?.trim() || ''; // Campo teléfono (si existe)
    const asunto = formData.get('asunto')?.trim() || ''; // Campo asunto (si existe)
    const mensaje = formData.get('mensaje').trim();
    
    const msgBox = document.getElementById('formMessage');
    const btnText = document.getElementById('btnText');
    const btnIcon = document.getElementById('btnIcon');
    const submitBtn = document.getElementById('submitBtn');

    // Validaciones
    if (!nombre || !email || !mensaje) {
      showFormMessage(msgBox, 'Por favor, completa los campos obligatorios (nombre, correo y mensaje).', 'error');
      return;
    }
    if (!isValidEmail(email)) {
      showFormMessage(msgBox, 'Por favor, ingresa un correo electrónico válido.', 'error');
      return;
    }
    if (!isValidRealEmailDomain(email)) {
      showFormMessage(msgBox, 'Por favor, usa un correo electrónico de un proveedor válido. Ej: gmail.com, outlook.com, yahoo.com, etc.', 'error');
      return;
    }
    if (telefono && !isValidPhone(telefono)) {
      showFormMessage(msgBox, 'Por favor, ingresa un número de teléfono válido (9 dígitos).', 'error');
      return;
    }

    // Preparar payload completo para enviar a n8n
    const payload = {
      nombre,
      email,
      telefono,
      asunto :"Gracias por contactarte",
      mensaje,
      timestamp: new Date().toISOString(),
      origen: window.location.href
    };

    // Cambiar estado del botón mientras se envía
    submitBtn.disabled = true;
    btnText.textContent = 'Enviando...';
    btnIcon.className = 'fa-solid fa-spinner fa-spin';
    hideFormMessage(msgBox);

    try {
      // Enviar datos al webhook de n8n
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Error al enviar el formulario');

      // Éxito: mostrar mensaje y resetear formulario
      btnText.textContent = 'Enviado';
      btnIcon.className = 'fa-solid fa-check';
      showFormMessage(msgBox, 'Gracias por escribirnos. Te contactaremos pronto.', 'success');
      form.reset();

    } catch (error) {
      // Error: mostrar mensaje de error
      btnText.textContent = 'Error';
      btnIcon.className = 'fa-solid fa-exclamation-triangle';
      showFormMessage(msgBox, 'Hubo un error al enviar tu mensaje. Inténtalo nuevamente o contáctanos por WhatsApp.', 'error');
    } finally {
      // Resetear botón después de 3 segundos
      setTimeout(function () {
        resetBtn(submitBtn, btnText, btnIcon);
      }, 3000);
    }
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Validate that email uses one of the allowed real provider domains
function isValidRealEmailDomain(email) {
  const allowedDomains = ['gmail.com', 'outlook.com', 'yahoo.com', 'hotmail.com', 'icloud.com', 'proton.me'];
  const emailDomain = email.split('@')[1].toLowerCase();
  return allowedDomains.includes(emailDomain);
}

function isValidPhone(phone) {
  return /^\d{9}$/.test(phone);
}

function showFormMessage(el, text, type) {
  el.textContent = text;
  el.className = 'form-message ' + type;
}

function hideFormMessage(el) {
  el.className = 'form-message';
  el.textContent = '';
}

function resetBtn(btn, textEl, iconEl) {
  btn.disabled = false;
  textEl.textContent = 'Enviar mensaje';
  iconEl.className = 'fa-solid fa-paper-plane';
}

/* ============================================================
   5. CARRUSEL INFINITO – RESPALDO JS
   El carrusel corre por CSS (animation: scrollLeft).
   Este bloque sólo actúa si prefers-reduced-motion está activo:
   en ese caso construye un carrusel básico con botones opcionales.
   ============================================================ */
(function () {
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!motionQuery.matches) return; // la animación CSS se encarga

  // Si el usuario prefiere no animación, detenemos el CSS y añadimos scroll
  // manual con drag/swipe (sin botones visibles, accesible por teclado).
  const track = document.getElementById('carouselTrack');
  if (!track) return;

  track.style.animation = 'none';
  track.style.overflowX = 'auto';
  track.style.scrollSnapType = 'x mandatory';
  track.style.cursor = 'grab';

  let isDown = false;
  let startX;
  let scrollLeft;

  track.addEventListener('mousedown', function (e) {
    isDown = true;
    track.style.cursor = 'grabbing';
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
  });
  track.addEventListener('mouseleave', function () { isDown = false; track.style.cursor = 'grab'; });
  track.addEventListener('mouseup',    function () { isDown = false; track.style.cursor = 'grab'; });
  track.addEventListener('mousemove',  function (e) {
    if (!isDown) return;
    e.preventDefault();
    const x    = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 1.5;
    track.scrollLeft = scrollLeft - walk;
  });
})();
