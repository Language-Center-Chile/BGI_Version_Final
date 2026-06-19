/* ============================================================
   NAVIGATION & UI EFFECTS MODULE
   ============================================================ */

export function initSmoothScroll() {
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

export function initHamburger() {
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

export function initHeaderScroll() {
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
