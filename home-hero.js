// Homepage: (1) slow opacity crossfade of the hero background through wide Featured works, preloading only
// the next image; first image only for prefers-reduced-motion. (2) Painting Wall peek above the page: its
// image loads only when the visitor scrolls up toward it.
(() => {
  const box = document.querySelector('.hero-slideshow');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  if (box) {
    let urls = [];
    try { urls = JSON.parse(box.dataset.heroSlides || '[]'); } catch {}
    const layers = [...box.querySelectorAll('.hero-slide')];
    const first = layers[0].currentSrc || layers[0].src, all = [first, ...urls];
    let at = 0, front = 0, timer = null;
    const HOLD = 9000;
    const advance = () => {
      if (motion.matches || document.hidden || all.length < 2) return schedule();
      const next = (at + 1) % all.length, back = layers[1 - front];
      const show = () => { back.classList.add('is-active'); layers[front].classList.remove('is-active'); front = 1 - front; at = next; schedule(); };
      if (back.getAttribute('src') === all[next] && back.complete) return show();
      back.onload = () => { back.onload = null; back.onerror = null; show(); };
      back.onerror = () => { back.onload = null; back.onerror = null; all.splice(next, 1); schedule(); };
      back.src = all[next];
    };
    function schedule() { clearTimeout(timer); timer = setTimeout(advance, HOLD); }
    if (!motion.matches) schedule();
    motion.addEventListener?.('change', () => { if (motion.matches) clearTimeout(timer); else schedule(); });
  }
  const wall = document.getElementById('painting-wall-peek'), img = wall?.querySelector('img[data-wall-src]');
  if (img) {
    const load = () => { if (!img.src) img.src = img.dataset.wallSrc; };
    const near = () => { if (window.scrollY < wall.offsetHeight + 40) { load(); window.removeEventListener('scroll', onScroll); } };
    let landed = window.scrollY;
    const onScroll = () => { if (window.scrollY < landed - 1 || window.scrollY < wall.offsetHeight - 2) near(); };
    // Visitors who start at the very top (reload at top, or a deep link back to it) need it now.
    if (window.scrollY < wall.offsetHeight - 2) load(); else window.addEventListener('scroll', onScroll, {passive: true});
  }
})();
