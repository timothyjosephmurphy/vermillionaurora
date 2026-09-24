// Native scrolling keeps the exhibition links usable without JavaScript.
document.querySelectorAll('.ex-carousel').forEach(carousel => {
  const track = carousel.querySelector('.ex-track');
  const slides = [...track.children];
  const status = carousel.querySelector('.ex-position');
  const toggle = carousel.querySelector('.ex-autoplay');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  carousel.querySelector('.ex-controls').hidden = false;
  let paused = reducedMotion.matches;
  let hovered = false;
  let focused = false;
  let touching = false;
  let direction = 1;
  let position = track.scrollLeft;
  let lastTime = 0;
  let resumeAt = 0;
  const maxScroll = () => track.scrollWidth - track.clientWidth;
  const current = () => slides.reduce((best, slide, i) => Math.abs(slide.offsetLeft - track.scrollLeft) < Math.abs(slides[best].offsetLeft - track.scrollLeft) ? i : best, 0);
  function updateToggle() {
    toggle.textContent = paused ? 'Play' : 'Pause';
    toggle.setAttribute('aria-label', `${paused ? 'Start' : 'Pause'} automatic exhibition scrolling`);
  }
  function move(step) {
    resumeAt = performance.now() + 5000;
    const distance = slides[1].offsetLeft - slides[0].offsetLeft;
    let target = track.scrollLeft + step * distance;
    if (step > 0 && track.scrollLeft >= maxScroll() - 2) target = 0;
    if (step < 0 && track.scrollLeft <= 2) target = maxScroll();
    track.scrollTo({left: Math.max(0, Math.min(maxScroll(), target)), behavior: reducedMotion.matches ? 'instant' : 'smooth'});
  }
  carousel.querySelectorAll('[data-direction]').forEach(button => button.addEventListener('click', () => move(Number(button.dataset.direction))));
  toggle.addEventListener('click', () => { paused = !paused; updateToggle(); });
  reducedMotion.addEventListener('change', () => { paused = reducedMotion.matches; updateToggle(); });
  carousel.addEventListener('pointerenter', event => { if (event.pointerType !== 'touch') hovered = true; });
  carousel.addEventListener('pointerleave', () => { hovered = false; });
  carousel.addEventListener('focusin', () => { focused = true; });
  carousel.addEventListener('focusout', event => { focused = carousel.contains(event.relatedTarget); });
  track.addEventListener('pointerdown', () => { touching = true; });
  window.addEventListener('pointerup', () => { if (touching) resumeAt = performance.now() + 5000; touching = false; });
  window.addEventListener('pointercancel', () => { touching = false; resumeAt = performance.now() + 5000; });
  track.addEventListener('wheel', () => { resumeAt = performance.now() + 5000; }, {passive:true});
  track.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1);}
  });
  track.addEventListener('scroll', () => {status.textContent = `${current() + 1} / ${slides.length}`;}, {passive: true});
  function animate(time) {
    const elapsed = lastTime ? Math.min(time - lastTime, 50) : 0;
    lastTime = time;
    const bounds = carousel.getBoundingClientRect();
    const visible = bounds.bottom > 0 && bounds.top < window.innerHeight;
    if (paused || hovered || focused || touching || document.hidden || !visible || time < resumeAt) {
      position = track.scrollLeft;
    } else if (maxScroll() > 0) {
      position += direction * elapsed * 0.018; // Gentle 18 pixels per second.
      if (position >= maxScroll()) { position = maxScroll(); direction = -1; }
      if (position <= 0) { position = 0; direction = 1; }
      track.scrollLeft = position;
    }
    requestAnimationFrame(animate);
  }
  updateToggle();
  requestAnimationFrame(animate);
});
const viewer = document.querySelector('.ex-lightbox');
if (viewer && typeof viewer.showModal === 'function') {
  const photos = [...document.querySelectorAll('[data-lightbox]')];
  let index = 0;
  let opener;
  const show = n => {
    index = (n + photos.length) % photos.length;
    viewer.querySelector('img').src = photos[index].href;
    viewer.querySelector('img').alt = photos[index].querySelector('img').alt;
    viewer.querySelector('[role="status"]').textContent = `${index + 1} / ${photos.length}`;
  };
  photos.forEach((photo, n) => photo.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault(); opener = photo; show(n); viewer.showModal(); document.body.style.overflow = 'hidden';
  }));
  viewer.querySelector('.ex-close').addEventListener('click', () => viewer.close());
  viewer.querySelector('.ex-prev').addEventListener('click', () => show(index - 1));
  viewer.querySelector('.ex-next').addEventListener('click', () => show(index + 1));
  viewer.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {event.preventDefault(); show(index + (event.key === 'ArrowRight' ? 1 : -1));}
  });
  viewer.addEventListener('click', event => {if (event.target === viewer) viewer.close();});
  viewer.addEventListener('close', () => {document.body.style.overflow = ''; opener?.focus();});
}
