(() => {
  const card = document.querySelector('.featured-art');
  let products = [...document.querySelectorAll('.available-paintings-carousel .product-card')];
  if (!card || !products.length) return;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const SLIDE_SIZES = '(max-width: 980px) 80vw, 340px';
  const itemFor = product => {
    const link = product.querySelector('.product-title-link');
    const image = product.querySelector('img');
    const background = product.querySelector('.product-image');
    const source = image ? image.src : getComputedStyle(background).backgroundImage.replace(/^url\(["']?|["']?\)$/g, '');
    // Carry the responsive WebP candidates so phones download a right-sized image, not the 960px file.
    return {id:product.dataset.productId,href:link.href, title:link.textContent, source, srcset:image?.getAttribute('srcset')||'', detail:priceLine(product), printsFrom:product.dataset.printsFrom||'', buy:product.dataset.buy==='true'};
  };
  // The price line ("Watercolor pastel · $600") only, never the card's Buy cue: on cards without prints the price shares its row with the pill.
  function priceLine(product) {
    const price = product.querySelector('[data-card-price]');
    return ((price && price.parentElement) || product.querySelector('.product-info p')).textContent.trim();
  }
  let items = products.map(itemFor);
  let index = Math.max(0, items.findIndex(item => item.href === card.querySelector('a').href));
  let busy = false;
  let pendingSync = false;
  let paused = motion.matches;
  let hovered = false;
  let focused = false;
  let visible = true;
  card.classList.add('featured-carousel');
  card.setAttribute('role', 'region');
  card.setAttribute('aria-roledescription', 'carousel');
  card.setAttribute('aria-label', 'Featured paintings');
  // Two stacked layers: the outgoing layer keeps the card's size while the incoming layer crossfades in.
  const stage = document.createElement('div');
  stage.className = 'featured-stage';
  const layers = [0,1].map(() => {
    const layer = document.createElement('article');
    layer.className = 'featured-slide';
    layer.setAttribute('aria-hidden', 'true');
    const media = document.createElement('a');
    media.className = 'featured-media';
    const image = document.createElement('img');
    image.className = 'featured-painting';
    image.alt = '';
    image.sizes = SLIDE_SIZES;
    media.append(image);
    const meta = document.createElement('div');
    meta.className = 'featured-caption';
    const title = document.createElement('h2');
    const titleLink = document.createElement('a');
    title.append(titleLink);
    const detail = document.createElement('p');
    detail.className = 'featured-detail';
    const row = document.createElement('p');
    row.className = 'card-buy-row';
    const prints = document.createElement('span');
    prints.className = 'card-prints-from';
    const priceInRow = document.createElement('span');
    priceInRow.className = 'featured-detail';
    const buy = document.createElement('span');
    buy.className = 'card-buy';
    buy.setAttribute('aria-hidden', 'true');
    buy.textContent = 'Buy';
    buy.hidden = true;
    row.append(prints, priceInRow, buy);
    meta.append(title, detail, row);
    layer.append(media, meta);
    stage.append(layer);
    return {layer, media, image, titleLink, detail, prints, priceInRow, buy, row};
  });
  let front = 0;
  function fill(slot, item) {
    slot.media.href = item.href;
    slot.titleLink.href = item.href;
    slot.titleLink.textContent = item.title;
    slot.image.alt = item.title;
    if (item.srcset) slot.image.srcset = item.srcset; else slot.image.removeAttribute('srcset');
    slot.image.src = item.source;
    // Always the same three blocks (title / price / last row) so caption height never changes between slides.
    slot.detail.textContent = item.detail;
    slot.detail.hidden = false;
    slot.prints.textContent = item.printsFrom || '';
    slot.prints.hidden = false; // keep the node in flow; empty text still reserves the line via CSS min-height on the row's first child when needed
    slot.prints.classList.toggle('is-empty', !item.printsFrom);
    slot.priceInRow.textContent = '';
    slot.priceInRow.hidden = true;
    slot.buy.hidden = !item.buy;
  }
  function showFront() {
    layers.forEach((slot, i) => {
      slot.layer.classList.toggle('featured-front', i === front);
      slot.layer.classList.toggle('featured-back', i !== front);
      slot.layer.setAttribute('aria-hidden', i === front ? 'false' : 'true');
      slot.layer.inert = i !== front;
    });
  }
  async function decodeImage(img) {
    try {
      if (typeof img.decode === 'function') await img.decode();
      else if (!img.complete) await new Promise(resolve => { img.addEventListener('load', resolve, {once:true}); img.addEventListener('error', resolve, {once:true}); });
    } catch {}
  }
  async function preload(item) {
    const probe = new Image();
    if (item.srcset) { probe.srcset = item.srcset; probe.sizes = SLIDE_SIZES; }
    probe.src = item.source;
    await decodeImage(probe);
  }
  fill(layers[front], items[index]);
  showFront();
  const controls = document.createElement('div');
  controls.className = 'featured-controls';
  controls.innerHTML = '<button type="button" data-prev aria-label="Previous featured painting">←</button><button type="button" data-toggle>Pause</button><span class="featured-position"></span><button type="button" data-next aria-label="Next featured painting">→</button>';
  card.replaceChildren(stage, controls);
  const toggle = controls.querySelector('[data-toggle]');
  function update() {
    if (!items.length) {
      controls.querySelector('.featured-position').textContent = '0 / 0';
      toggle.disabled = true;
      return;
    }
    toggle.disabled = false;
    toggle.textContent = paused ? 'Play' : 'Pause';
    toggle.setAttribute('aria-label', `${paused ? 'Start' : 'Pause'} featured painting slideshow`);
    controls.querySelector('.featured-position').textContent = `${index + 1} / ${items.length}`;
    const next = items[(index + 1) % items.length];
    if (next) preload(next);
  }
  async function advance(direction) {
    if (busy || !items.length) return;
    busy = true;
    const target = (index + direction + items.length) % items.length;
    const incoming = layers[1 - front];
    fill(incoming, items[target]);
    await decodeImage(incoming.image);
    const duration = motion.matches ? 0 : 400;
    if (duration === 0) {
      front = 1 - front;
      showFront();
    } else {
      incoming.layer.classList.add('featured-entering');
      incoming.layer.style.opacity = '0';
      // Force a frame so the opacity:0 starting point sticks before we animate.
      incoming.layer.getBoundingClientRect();
      const fadeIn = incoming.layer.animate([{opacity:0}, {opacity:1}], {duration, easing:'ease-in-out', fill:'forwards'});
      const fadeOut = layers[front].layer.animate([{opacity:1}, {opacity:0}], {duration, easing:'ease-in-out', fill:'forwards'});
      await Promise.allSettled([fadeIn.finished, fadeOut.finished]);
      fadeIn.cancel();
      fadeOut.cancel();
      incoming.layer.style.opacity = '';
      incoming.layer.classList.remove('featured-entering');
      front = 1 - front;
      showFront();
    }
    index = items.length ? target % items.length : 0;
    busy = false;
    if (pendingSync) {
      pendingSync = false;
      if (items.length) {
        fill(layers[front], items[index]);
        await decodeImage(layers[front].image);
      }
    }
    update();
  }
  let timer;
  function schedule() {
    clearInterval(timer);
    timer = setInterval(() => {
      if (!paused && !hovered && !focused && visible && !document.hidden) advance(1);
    }, 5000);
  }
  controls.querySelector('[data-prev]').addEventListener('click', () => {advance(-1); schedule();});
  controls.querySelector('[data-next]').addEventListener('click', () => {advance(1); schedule();});
  toggle.addEventListener('click', () => {paused = !paused; update(); schedule();});
  card.addEventListener('pointerenter', event => {if (event.pointerType !== 'touch') hovered = true;});
  card.addEventListener('pointerleave', () => {hovered = false; schedule();});
  card.addEventListener('focusin', () => {focused = true;});
  // Touch: hold the current painting while touched and for 5 seconds afterwards.
  let touchTimer;
  card.addEventListener('pointerdown', event => {if (event.pointerType === 'touch') {clearTimeout(touchTimer); hovered = true;}});
  const releaseTouch = event => {if (event.pointerType === 'touch') {clearTimeout(touchTimer); touchTimer = setTimeout(() => {hovered = false; schedule();}, 5000);}};
  card.addEventListener('pointerup', releaseTouch);
  card.addEventListener('pointercancel', releaseTouch);
  card.addEventListener('focusout', event => {focused = card.contains(event.relatedTarget); schedule();});
  motion.addEventListener('change', () => {paused = motion.matches; update(); schedule();});
  new IntersectionObserver(entries => {visible = entries[0].isIntersecting; schedule();}).observe(card);
  document.addEventListener('catalog:availability',()=>{
    const currentId=items[index]?.id;
    products=[...document.querySelectorAll('.available-paintings-carousel .product-card')];
    items=products.map(itemFor);
    card.hidden=items.length===0;
    index=Math.max(0,items.findIndex(item=>item.id===currentId));
    if(busy)pendingSync=true;
    else if(items.length){
      fill(layers[front], items[index]);
      decodeImage(layers[front].image);
    }
    update();
    schedule();
  });
  update();
  schedule();
})();
