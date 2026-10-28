// Prev/next, keyboard, and a position readout for .blog-painting-carousel.
// Swipe and scroll-snap work without this script. See static/blog/painting-carousel.md.
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const behavior = () => (reduced.matches ? 'auto' : 'smooth');

  document.querySelectorAll('.blog-painting-carousel').forEach((carousel, index) => {
    const track = carousel.querySelector('.blog-painting-track');
    const status = carousel.querySelector('.blog-painting-status');
    const controls = carousel.querySelector('.blog-painting-controls');
    if (!track || !controls) return;
    const slides = () => [...track.querySelectorAll('.blog-painting-slide')];
    if (!track.id) track.id = `blog-painting-track-${index + 1}`;
    controls.querySelectorAll('button').forEach(button => button.setAttribute('aria-controls', track.id));

    const maxScroll = () => Math.max(0, track.scrollWidth - track.clientWidth);
    const current = () => {
      const items = slides();
      if (!items.length) return 0;
      return items.reduce((best, slide, i) => (
        Math.abs(slide.offsetLeft - track.scrollLeft) < Math.abs(items[best].offsetLeft - track.scrollLeft) ? i : best
      ), 0);
    };
    const step = () => {
      const items = slides();
      if (items.length < 2) return track.clientWidth;
      return items[1].offsetLeft - items[0].offsetLeft || items[0].getBoundingClientRect().width;
    };

    function update() {
      const items = slides();
      const count = items.length;
      const at = count ? Math.min(current(), count - 1) : 0;
      if (status) status.textContent = count ? `${at + 1} / ${count}` : '0 / 0';
      const overflow = maxScroll() > 2 && count > 1;
      controls.hidden = !overflow;
      const prev = controls.querySelector('[data-dir="-1"]');
      const next = controls.querySelector('[data-dir="1"]');
      if (prev) prev.disabled = track.scrollLeft <= 2;
      if (next) next.disabled = track.scrollLeft >= maxScroll() - 2;
    }

    function move(direction) {
      const items = slides();
      if (items.length < 2) return;
      const max = maxScroll();
      const target = Math.max(0, Math.min(max, track.scrollLeft + direction * step()));
      track.scrollTo({ left: target, behavior: behavior() });
    }

    controls.querySelectorAll('[data-dir]').forEach(button => {
      button.addEventListener('click', () => move(Number(button.dataset.dir)));
    });
    carousel.addEventListener('keydown', event => {
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      if (event.key === 'ArrowRight') { event.preventDefault(); move(1); }
      else if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); }
      else if (event.key === 'Home') { event.preventDefault(); track.scrollTo({ left: 0, behavior: behavior() }); }
      else if (event.key === 'End') { event.preventDefault(); track.scrollTo({ left: maxScroll(), behavior: behavior() }); }
    });
    track.addEventListener('scroll', update, { passive: true });
    track.addEventListener('load', update, true);
    window.addEventListener('resize', update);
    reduced.addEventListener('change', update);
    update();
  });
})();
