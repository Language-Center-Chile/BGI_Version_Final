/* ============================================================
   BGI PROPIEDADES – script.js (Main Entrypoint)
   ============================================================ */

import { initSmoothScroll, initHamburger, initHeaderScroll } from './js/navigation.js';
import { initContactForm } from './js/contact-form.js';
import { initCarouselBackup } from './js/carousel.js';

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {
  initSmoothScroll();
  initHamburger();
  initHeaderScroll();
  initContactForm();
  initCarouselBackup();
  console.log('Desarrollado por TOZZTY-UI y yennibarreto2025');
});
