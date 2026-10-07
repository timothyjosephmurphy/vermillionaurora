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
    if (!mobile.matches || y <= header.offsetHeight || header.classList.contains('is-menu-open')) {
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

  // Mobile hamburger menu: brand, Cart and "Book a commission" stay in the row,
  // the rest of the main navigation opens in a panel under the header.
  const toggle = header.querySelector('.nav-toggle');
  const menu = toggle && document.getElementById(toggle.getAttribute('aria-controls'));
  if (!toggle || !menu) return;
  const links = () => [...menu.querySelectorAll('a[href]')].filter(a => a.offsetParent !== null);
  const isOpen = () => toggle.getAttribute('aria-expanded') === 'true';
  const setOpen = (open, { focus = true } = {}) => {
    toggle.setAttribute('aria-expanded', String(open));
    header.classList.toggle('is-menu-open', open);
    if (open) {
      setHidden(false);
      if (focus) links()[0]?.focus();
    } else if (focus) {
      toggle.focus();
    }
  };
  toggle.addEventListener('click', () => setOpen(!isOpen()));
  menu.addEventListener('click', event => {
    if (event.target.closest('a') && isOpen()) setOpen(false, { focus: false });
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && isOpen()) { event.preventDefault(); setOpen(false); }
  });
  document.addEventListener('click', event => {
    if (isOpen() && !header.contains(event.target)) setOpen(false, { focus: false });
  });
  header.addEventListener('focusout', event => {
    if (isOpen() && event.relatedTarget && !header.contains(event.relatedTarget)) setOpen(false, { focus: false });
  });
  mobile.addEventListener('change', () => { if (!mobile.matches && isOpen()) setOpen(false, { focus: false }); });
})();
