/* ============================================================
   INFINITE CAROUSEL JS MODULE
   ============================================================ */

export function initCarouselBackup() {
  const track = document.getElementById('carouselTrack');
  if (!track) return;

  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  
  if (motionQuery.matches) {
    setupManualScroll(track);
    return;
  }

  setupInfiniteTicker(track);
}

function setupManualScroll(track) {
  track.style.animation = 'none';
  track.style.overflowX = 'auto';
  track.style.scrollSnapType = 'x mandatory';
  track.style.cursor = 'grab';

  let isDown = false;
  let startX;
  let scrollLeft;

  track.addEventListener('mousedown', (e) => {
    isDown = true;
    track.style.cursor = 'grabbing';
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
  });
  track.addEventListener('mouseleave', () => { isDown = false; track.style.cursor = 'grab'; });
  track.addEventListener('mouseup',    () => { isDown = false; track.style.cursor = 'grab'; });
  track.addEventListener('mousemove',  (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 1.5;
    track.scrollLeft = scrollLeft - walk;
  });
}

function setupInfiniteTicker(track) {
  const originalLogos = Array.from(track.children);
  if (originalLogos.length === 0) return;

  // Creamos un contenedor temporal para medir el ancho exacto del set original
  const measureContainer = document.createElement('div');
  measureContainer.style.display = 'flex';
  measureContainer.style.gap = '3rem';
  measureContainer.style.width = 'max-content';
  measureContainer.style.visibility = 'hidden';
  measureContainer.style.position = 'absolute';

  originalLogos.forEach(logo => {
    measureContainer.appendChild(logo.cloneNode(true));
  });
  document.body.appendChild(measureContainer);

  let initialized = false;

  const measureAndInitialize = () => {
    if (initialized) return;
    const singleSetWidth = measureContainer.getBoundingClientRect().width;
    if (singleSetWidth <= 0) return; // Esperamos a que los logos tengan dimensiones reales
    
    initialized = true;
    document.body.removeChild(measureContainer);

    // Limpiamos el track original
    track.innerHTML = '';

    // Calculamos cuántas copias necesitamos para llenar la pantalla y garantizar scroll infinito
    const viewWidth = window.innerWidth;
    const copiesNeeded = Math.ceil((viewWidth * 2) / singleSetWidth) + 1;

    for (let i = 0; i < copiesNeeded; i++) {
      originalLogos.forEach(logo => {
        track.appendChild(logo.cloneNode(true));
      });
    }

    // Distancia exacta de un set completo de logos más un gap
    const remToPx = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    const gapPx = 3 * remToPx;
    const scrollDistance = singleSetWidth + gapPx;

    track.style.setProperty('--scroll-dist', `-${scrollDistance}px`);

    // Ajustamos la duración para mantener una velocidad constante (aprox. 45px por segundo)
    const speed = 45; 
    const duration = scrollDistance / speed;
    track.style.setProperty('--scroll-duration', `${duration}s`);
  };

  // Escuchar a que cargue la ventana para medir las imágenes
  window.addEventListener('load', measureAndInitialize);
  
  // Por si ya todo cargó, intentar iniciar inmediatamente
  measureAndInitialize();
}
