// Enhance the existing gallery; keep its links available if JavaScript is disabled.
document.querySelectorAll('.exhibition-grid').forEach(grid => {
  const items = [...grid.children].map(node => {
    const img = node.querySelector('img');
    const video = node.querySelector('video');
    return img ? {src: node.href, alt: img.alt} : video ? {src: video.querySelector('source')?.src || video.src, alt: video.getAttribute('aria-label'), video: true} : null;
  }).filter(Boolean);
  if (!items.length) return;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const box = document.createElement('section');
  box.className = 'exhibition-viewer';
  box.setAttribute('aria-label', 'Exhibition gallery');
  box.setAttribute('aria-roledescription', 'carousel');
  box.innerHTML = `<div class="ev-stage"></div><div class="ev-controls"><button type="button" data-prev aria-label="Previous image">←</button><button type="button" data-play>Pause</button><span class="ev-count"></span><button type="button" data-next aria-label="Next image">→</button><a class="ev-original" target="_blank" rel="noopener">Open full size ↗</a></div><div class="ev-thumbs" aria-label="Choose an image"></div><label class="ev-slider">Browse images<input type="range" min="1" max="${items.length}" value="1" aria-label="Choose gallery image"></label>`;
  const stage = box.querySelector('.ev-stage');
  const thumbs = box.querySelector('.ev-thumbs');
  const slider = box.querySelector('input');
  const play = box.querySelector('[data-play]');
  let index = 0, paused = motion.matches, visible = false, hovered = false, focused = false, timer;
  items.forEach((item, i) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('aria-label', `${item.video ? 'Video' : 'Image'} ${i + 1}: ${item.alt || ''}`);
    if (item.video) button.textContent = `▶ Video ${i + 1}`;
    else { const img = document.createElement('img'); img.src = item.src; img.alt = ''; img.loading = 'lazy'; img.decoding = 'async'; button.append(img); }
    button.addEventListener('click', () => show(i));
    thumbs.append(button);
  });
  function schedule() {
    clearTimeout(timer);
    if (!paused && visible && !document.hidden && !hovered && !focused && !items[index].video) timer = setTimeout(() => show(index + 1), 5000);
  }
  function show(n) {
    index = (n + items.length) % items.length;
    const item = items[index];
    stage.querySelector('video')?.pause();
    const media = document.createElement(item.video ? 'video' : 'img');
    media.src = item.src;
    if (item.video) { media.controls = true; media.playsInline = true; media.preload = 'metadata'; media.setAttribute('aria-label', item.alt || 'Exhibition video'); media.addEventListener('ended', () => { if (!paused) show(index + 1); }); }
    else { media.alt = item.alt || `Exhibition image ${index + 1}`; media.decoding = 'async'; }
    stage.replaceChildren(media);
    if (!motion.matches && media.animate) media.animate([{opacity:0},{opacity:1}], {duration:250});
    [...thumbs.children].forEach((button, i) => button.setAttribute('aria-current', String(i === index)));
    const active = thumbs.children[index];
    thumbs.scrollTo({left:active.offsetLeft - (thumbs.clientWidth - active.clientWidth) / 2, behavior:motion.matches ? 'instant' : 'smooth'});
    slider.value = String(index + 1);
    slider.setAttribute('aria-valuetext', `${index + 1} of ${items.length}`);
    box.querySelector('.ev-count').textContent = `${index + 1} / ${items.length}`;
    box.querySelector('.ev-original').href = item.src;
    schedule();
  }
  function updatePlay() { play.textContent = paused ? 'Play' : 'Pause'; play.setAttribute('aria-label', `${paused ? 'Start' : 'Pause'} automatic slideshow`); schedule(); }
  box.querySelector('[data-prev]').addEventListener('click', () => show(index - 1));
  box.querySelector('[data-next]').addEventListener('click', () => show(index + 1));
  play.addEventListener('click', () => { paused = !paused; updatePlay(); });
  slider.addEventListener('input', () => show(Number(slider.value) - 1));
  thumbs.addEventListener('keydown', event => { if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); show(index + (event.key === 'ArrowRight' ? 1 : -1)); thumbs.children[index].focus({preventScroll:true}); } });
  box.addEventListener('pointerenter', event => { if (event.pointerType !== 'touch') { hovered = true; schedule(); } });
  box.addEventListener('pointerleave', () => { hovered = false; schedule(); });
  box.addEventListener('focusin', () => { focused = true; schedule(); });
  box.addEventListener('focusout', event => { focused = box.contains(event.relatedTarget); schedule(); });
  document.addEventListener('visibilitychange', schedule);
  motion.addEventListener('change', () => { paused = motion.matches; updatePlay(); });
  grid.before(box);
  grid.hidden = true;
  const page = grid.closest('.exhibition-page');
  const hero = page?.querySelector('.exhibition-hero');
  if (hero) hero.hidden = true;
  const description = box.previousElementSibling?.querySelector('p');
  if (description) description.textContent = 'Browse the thumbnails or use the slider to explore the gallery.';
  new IntersectionObserver(entries => { visible = entries[0].isIntersecting; schedule(); }, {threshold:0.1}).observe(box);
  show(0); updatePlay();
});
