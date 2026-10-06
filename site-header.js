// Mobile hide-on-scroll for the shared site header.
// The whole sticky header (site title, main nav, and the "Book a commission"
// button) slides away while scrolling down and returns on any scroll up.
// It always shows near the top of the page and on desktop widths.
(() => {
  const header = document.querySelector('.site-header');
  if (!header || header.dataset.scrollHide) return;
  header.dataset.scrollHide = 'on';
  const mobile = window.matchMedia('(max-width: 980px)');
  const tolerance = 6;
  let lastY = 0;
  let queued = false;
  const currentY = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    // Clamp so iOS overscroll bounce at either end never reads as a direction change.
    return Math.min(Math.max(window.scrollY, 0), Math.max(max, 0));
  };
  const setHidden = hidden => header.classList.toggle('is-scroll-hidden', hidden);
  const update = () => {
    queued = false;
    const y = currentY();
    // Only hide once the header's own space has scrolled past, so nothing blank shows.
    if (!mobile.matches || y <= header.offsetHeight) {
      setHidden(false);
      lastY = y;
      return;
    }
    if (Math.abs(y - lastY) < tolerance) return;
    setHidden(y > lastY);
    lastY = y;
  };
  const queue = () => {
    if (queued) return;
    queued = true;
    window.requestAnimationFrame(update);
  };
  lastY = currentY();
  window.addEventListener('scroll', queue, { passive: true });
  window.addEventListener('resize', queue, { passive: true });
  mobile.addEventListener('change', update);
})();
