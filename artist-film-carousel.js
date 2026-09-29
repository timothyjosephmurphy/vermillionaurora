(() => {
  const carousel = document.querySelector('.artist-film-carousel');
  if (!carousel) return;
  const track = carousel.querySelector('.artist-film-track');
  const slides = [...track.children];
  const controls = carousel.querySelector('.artist-film-controls');
  const previous = controls.querySelector('[data-artist-film-prev]');
  const next = controls.querySelector('[data-artist-film-next]');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const maxScroll = () => Math.max(0, track.scrollWidth - track.clientWidth);

  function updateControls() {
    const maximum = maxScroll();
    controls.hidden = maximum <= 2;
    previous.disabled = track.scrollLeft <= 2;
    next.disabled = track.scrollLeft >= maximum - 2;
  }

  function move(direction) {
    const distance = slides[1].offsetLeft - slides[0].offsetLeft;
    track.scrollTo({
      left: Math.max(0, Math.min(maxScroll(), track.scrollLeft + direction * distance)),
      behavior: reducedMotion.matches ? 'instant' : 'smooth'
    });
  }

  previous.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  track.addEventListener('scroll', updateControls, {passive:true});
  track.addEventListener('keydown', event => {
    // Keep links, buttons, and the embedded video's own keyboard controls intact.
    if (event.target !== track) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      move(event.key === 'ArrowRight' ? 1 : -1);
    }
  });

  function revealFilm() {
    if (location.hash === '#film') {
      track.scrollTo({left: maxScroll(), behavior:'instant'});
      updateControls();
    }
  }

  if ('ResizeObserver' in window) new ResizeObserver(updateControls).observe(track);
  window.addEventListener('resize', updateControls);
  window.addEventListener('hashchange', revealFilm);
  // Both cards stay in place while visitors read or watch the documentary.
  updateControls();
  revealFilm();
})();
