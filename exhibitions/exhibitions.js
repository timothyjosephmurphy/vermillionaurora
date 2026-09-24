// Native scrolling keeps the exhibition links usable without JavaScript.
document.querySelectorAll('.ex-carousel').forEach(carousel => {
  const track = carousel.querySelector('.ex-track');
  const slides = [...track.children];
  const status = carousel.querySelector('.ex-position');
  carousel.querySelector('.ex-controls').hidden = false;
  const current = () => slides.reduce((best, slide, i) => Math.abs(slide.offsetLeft - track.scrollLeft) < Math.abs(slides[best].offsetLeft - track.scrollLeft) ? i : best, 0);
  function move(direction) {
    const index = (current() + direction + slides.length) % slides.length;
    track.scrollTo({left: slides[index].offsetLeft, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
  }
  carousel.querySelectorAll('[data-direction]').forEach(button => button.addEventListener('click', () => move(Number(button.dataset.direction))));
  track.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1);}
  });
  track.addEventListener('scroll', () => {status.textContent = `${current() + 1} / ${slides.length}`;}, {passive: true});
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
