/* ============================================================
   INFINITE CAROUSEL JS BACKUP MODULE
   ============================================================ */

export function initCarouselBackup() {
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
}
