// Enhance the existing gallery; keep its links available if JavaScript is disabled.
document.querySelectorAll('.exhibition-grid, .painting-gallery-page .product-grid, .painting-gallery-page .painting-list').forEach(grid => {
  let items = [...grid.children].map(node => {
    const img = node.querySelector('img');
    const product = node.querySelector('.product-title-link');
    if (product) {
      const imageLink = node.querySelector('.gallery-product-image, .product-image');
      const background = imageLink && getComputedStyle(imageLink).backgroundImage.match(/url\(["']?(.*?)["']?\)/);
      const src = img?.src || background?.[1];
      return src ? {id:node.dataset.productId,node,price:Number(node.dataset.price)||null,area:Number(node.dataset.area)||null,src, alt: product.textContent, product: product.href, availability: node.dataset.availability} : null;
    }
    const video = node.querySelector('video');
    return img ? {id:node.dataset.productId,src: img.src, alt: img.alt, caption: node.dataset.caption, product: node.dataset.product} : video ? {src: video.querySelector('source')?.src || video.src, alt: video.getAttribute('aria-label'), video: true} : null;
  }).filter(Boolean);
  if (!items.length) return;
  const allItems = items;
  const threeUp = true;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const box = document.createElement('section');
  box.className = 'exhibition-viewer' + (threeUp ? ' ev-three-up' : '');
  box.setAttribute('aria-label', grid.closest('.painting-gallery-page')?'Paintings carousel':'Exhibition gallery');
  box.setAttribute('aria-roledescription', 'carousel');
  box.innerHTML = `<div class="ev-stage"></div><div class="ev-controls"><button type="button" data-prev aria-label="Previous image">←</button><button type="button" data-play>Pause</button><span class="ev-count"></span><button type="button" data-next aria-label="Next image">→</button><a class="ev-original" target="_blank" rel="noopener">Open full size ↗</a></div><div class="ev-thumbs" aria-label="Choose an image"></div><label class="ev-slider">Browse images<input type="range" min="1" max="${items.length}" value="1" aria-label="Choose gallery image"></label>`;
  const stage = box.querySelector('.ev-stage');
  const thumbs = box.querySelector('.ev-thumbs');
  const slider = box.querySelector('input');
  const play = box.querySelector('[data-play]');
  function primeVideoFrame(video) {
    video.preload = 'metadata';
    const showFirstFrame = () => {
      if (video.duration > 0 && video.currentTime === 0) {
        try { video.currentTime = Math.min(0.01, video.duration / 2); } catch {}
      }
    };
    if (video.readyState >= 1) showFirstFrame();
    else video.addEventListener('loadedmetadata', showFirstFrame, {once:true});
  }
  let index = 0, paused = motion.matches, visible = false, hovered = false, focused = false, timer;
  function buildItems() {
    stage.replaceChildren(); thumbs.replaceChildren();
  items.forEach((item, i) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('aria-label', `${item.video ? 'Video' : 'Image'} ${i + 1}: ${item.alt || ''}${item.caption ? `, ${item.caption}` : ''}`);
    if (item.video) button.textContent = `▶ Video ${i + 1}`;
    else { const img = document.createElement('img'); img.src = item.src; img.alt = ''; img.loading = 'lazy'; img.decoding = 'async'; button.append(img); }
    button.addEventListener('click', () => show(i));
    thumbs.append(button);
  });
  if (threeUp) {
    items.forEach(item => {
      const cell = document.createElement(item.product ? 'a' : 'div'); cell.className = 'ev-cell';
      if (item.product) { cell.href = item.product; cell.setAttribute('aria-label', `View ${item.alt}`); }
      const media = document.createElement(item.video ? 'video' : 'img');
      media.src = item.src;
      if (item.video) { media.controls = true; media.playsInline = true; primeVideoFrame(media); }
      else { media.alt = item.alt || 'Exhibition image'; media.loading = 'lazy'; media.decoding = 'async'; }
      cell.append(media);
      if (item.caption) { const caption = document.createElement('span'); caption.className = 'ev-caption'; caption.textContent = item.caption; cell.append(caption); }
      stage.append(cell);
    });
  }
  }
  buildItems();
  let autoPosition = 0, autoDirection = 1, lastFrame = 0, interacting = false, resumeAt = 0;
  function animate(time) {
    const elapsed = lastFrame ? Math.min(time - lastFrame, 50) : 0; lastFrame = time;
    const playingVideo = [...stage.querySelectorAll('video')].some(video => !video.paused);
    if (!paused && visible && !document.hidden && !hovered && !focused && !interacting && !playingVideo && time > resumeAt) {
      const max = stage.scrollWidth - stage.clientWidth;
      autoPosition += autoDirection * elapsed * .018;
      if (autoPosition >= max) { autoPosition = max; autoDirection = -1; }
      if (autoPosition <= 0) { autoPosition = 0; autoDirection = 1; }
      stage.scrollLeft = autoPosition;
    } else autoPosition = stage.scrollLeft;
    requestAnimationFrame(animate);
  }
  if (threeUp) {
    let dragStart = null, suppressClick = false;
    stage.addEventListener('pointerdown', event => { interacting = true; dragStart = {x:event.clientX, y:event.clientY}; suppressClick = false; });
    stage.addEventListener('pointermove', event => {
      if (dragStart && Math.hypot(event.clientX - dragStart.x, event.clientY - dragStart.y) > 10) suppressClick = true;
    });
    stage.addEventListener('click', event => { if (suppressClick) { event.preventDefault(); suppressClick = false; } });
    const release = () => { if (interacting) resumeAt = performance.now() + 5000; interacting = false; dragStart = null; };
    window.addEventListener('pointerup', release); window.addEventListener('pointercancel', release);
    stage.addEventListener('wheel', () => { resumeAt = performance.now() + 5000; }, {passive:true});
    stage.addEventListener('scroll', () => {
      const width = stage.children[1]?.offsetLeft - (stage.children[0]?.offsetLeft || 0);
      const n = width ? Math.round(stage.scrollLeft / width) : 0;
      if (n !== index) show(n, true);
    }, {passive:true});
    requestAnimationFrame(animate);
  }
  function schedule() {
    clearTimeout(timer);
    if (!threeUp && !paused && visible && !document.hidden && !hovered && !focused && !items[index].video) timer = setTimeout(() => show(index + 1), 5000);
  }
  function show(n, fromScroll = false) {
    if (!items.length) return;
    index = (n + items.length) % items.length;
    const item = items[index];
    if (threeUp && !fromScroll) {
      const target = stage.children[index];
      stage.scrollLeft = target.offsetLeft - stage.children[0].offsetLeft;
      autoPosition = stage.scrollLeft;
      resumeAt = performance.now() + 5000;
    }
    if (!threeUp) {
    stage.querySelector('video')?.pause();
    const media = document.createElement(item.video ? 'video' : 'img');
    media.src = item.src;
    if (item.video) { media.controls = true; media.playsInline = true; primeVideoFrame(media); media.setAttribute('aria-label', item.alt || 'Exhibition video'); media.addEventListener('ended', () => { if (!paused) show(index + 1); }); }
    else { media.alt = item.alt || `Exhibition image ${index + 1}`; media.decoding = 'async'; }
    stage.replaceChildren(media);
    if (!motion.matches && media.animate) media.animate([{opacity:0},{opacity:1}], {duration:250});
    }
    [...thumbs.children].forEach((button, i) => button.setAttribute('aria-current', String(i === index)));
    const active = thumbs.children[index];
    thumbs.scrollTo({left:active.offsetLeft - (thumbs.clientWidth - active.clientWidth) / 2, behavior:motion.matches ? 'instant' : 'smooth'});
    slider.value = String(index + 1);
    slider.setAttribute('aria-valuetext', `${index + 1} of ${items.length}`);
    box.querySelector('.ev-count').textContent = `${index + 1} / ${items.length}`;
    box.querySelector('.ev-original').href = item.product || item.src;
    box.querySelector('.ev-original').textContent = item.product ? 'View painting ↗' : 'Open full size ↗';
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

  // Horizontal gestures change images; vertical gestures and pinch zoom stay native.
  let gesture = null;
  stage.style.touchAction = threeUp ? 'auto' : 'pan-y pinch-zoom';
  stage.addEventListener('dragstart', event => event.preventDefault());
  stage.addEventListener('pointerdown', event => {
    if (threeUp) return;
    if (!event.isPrimary || event.button !== 0 || event.target.closest('video')) { gesture = null; return; }
    gesture = {id:event.pointerId, x:event.clientX, y:event.clientY};
    stage.setPointerCapture(event.pointerId);
    clearTimeout(timer);
  });
  stage.addEventListener('pointerup', event => {
    if (!gesture || gesture.id !== event.pointerId) return;
    const dx = event.clientX - gesture.x, dy = event.clientY - gesture.y;
    gesture = null;
    if (Math.abs(dx) >= 45 && Math.abs(dx) > Math.abs(dy) * 1.3) show(index + (dx < 0 ? 1 : -1));
    else schedule();
  });
  stage.addEventListener('pointercancel', () => { gesture = null; schedule(); });
  stage.addEventListener('lostpointercapture', () => { gesture = null; });

  (grid.closest('[data-gallery-list]')||grid).before(box);
  grid.hidden = !grid.closest('.painting-gallery-page');
  const page = grid.closest('.exhibition-page');
  const hero = page?.querySelector('.exhibition-hero');
  if (hero && !hero.hasAttribute('data-featured-hero')) hero.hidden = true;
  const description = box.previousElementSibling?.querySelector('p');
  // Keep page-specific guidance (such as the Paul Murphy print-ordering note)\n  // intact; only add the carousel hint where the description is generic.\n  if (description && grid.classList.contains('exhibition-grid') && !/prints are available/i.test(description.textContent)) description.textContent = 'Swipe to browse or choose a thumbnail.';
  new IntersectionObserver(entries => { visible = entries[0].isIntersecting; schedule(); }, {threshold:0.1}).observe(box);
  show(0); updatePlay();
  let refreshFilter;
  const filter = document.querySelector('#available-only');
  if (filter && grid.closest('.painting-gallery-page')) {
    const count = document.querySelector('#gallery-result-count');
    const sort = document.querySelector('#gallery-sort');
    const empty = document.querySelector('.gallery-empty');
    const available = value => value === 'Available' || value === 'Available by inquiry';
    // Sold and not-for-sale works have no current sale price and follow priced
    // works. Size sorting compares area across inches and centimetres.
    const priceGroup = item => available(item.availability)&&item.price!==null?0:item.availability==='Sold'?2:item.availability==='Not for sale'?3:1;
    function sortedItems() {
      if(!sort)return allItems;
      const [kind,direction]=sort.value.split('-'),field=kind==='size'?'area':'price',sign=direction==='asc'?1:-1;
      return [...allItems].sort((a,b)=>{
        if(field==='price'&&priceGroup(a)!==priceGroup(b))return priceGroup(a)-priceGroup(b);
        if(field==='price'&&priceGroup(a)!==0)return 0;
        if(a[field]===null||b[field]===null)return (a[field]===null)-(b[field]===null);
        return sign*(a[field]-b[field]);
      });
    }
    function applyFilter() {
      const ordered=sortedItems();
      if(sort)ordered.forEach(item=>grid.append(item.node));
      items = filter.checked ? ordered.filter(item => available(item.availability)) : ordered;
      [...grid.children].forEach(row => { row.hidden = filter.checked && !available(row.dataset.availability); });
      index = 0; autoPosition = 0; autoDirection = 1;
      buildItems(); slider.max = String(Math.max(1, items.length));
      box.hidden = !items.length;
      count.textContent = `${items.length} of ${allItems.length} paintings`;
      if(empty)empty.hidden=items.length>0;
      if (items.length) show(0);
    }
    refreshFilter=applyFilter;
    filter.closest('.gallery-filter').hidden = false;
    filter.addEventListener('change', applyFilter);
    sort?.addEventListener('change',applyFilter);
    applyFilter();
  }
  document.addEventListener('catalog:availability',()=>{
    allItems.forEach(item=>{if(!item.id)return;const node=[...grid.children].find(node=>node.dataset.productId===item.id);if(node){item.availability=node.dataset.availability;item.caption=node.dataset.caption;}});
    if(refreshFilter)refreshFilter();else{buildItems();show(index);}
  });
});
