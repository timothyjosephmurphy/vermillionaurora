(() => {
  const card = document.querySelector('.featured-art');
  let products = [...document.querySelectorAll('.available-paintings-carousel .product-card')];
  if (!card || !products.length) return;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const itemFor = product => {
    const link = product.querySelector('.product-title-link');
    const image = product.querySelector('img');
    const background = product.querySelector('.product-image');
    const source = image ? image.src : getComputedStyle(background).backgroundImage.replace(/^url\(["']?|["']?\)$/g, '');
    return {id:product.dataset.productId,href:link.href, title:link.textContent, source, detail:product.querySelector('.product-info p').textContent};
  };
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
  const stage = document.createElement('div');
  stage.className = 'featured-stage';
  function slide(item) {
    const panel = document.createElement('article');
    panel.className = 'featured-slide';
    const link = document.createElement('a');
    link.href = item.href;
    const image = document.createElement('img');
    image.src = item.source;
    image.alt = item.title;
    image.className = 'featured-painting';
    link.append(image);
    const meta = document.createElement('div');
    meta.className = 'featured-caption';
    const title = document.createElement('h2');
    const titleLink = document.createElement('a');
    titleLink.href = item.href;
    titleLink.textContent = item.title;
    title.append(titleLink);
    const detail = document.createElement('p');
    detail.textContent = item.detail;
    meta.append(title, detail);
    panel.append(link, meta);
    return panel;
  }
  stage.append(slide(items[index]));
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
    const preload = new Image();
    preload.src = items[(index + 1) % items.length].source;
  }
  async function advance(direction) {
    if (busy || !items.length) return;
    busy = true;
    const target = (index + direction + items.length) % items.length;
    const outgoing = stage.firstElementChild;
    const incoming = slide(items[target]);
    incoming.classList.add('featured-entering');
    incoming.inert = true;
    stage.append(incoming);
    const duration = motion.matches ? 0 : 350;
    const animations = [
      outgoing.animate([{transform:'translateX(0)'}, {transform:`translateX(${-direction * 100}%)`}], {duration, easing:'ease-in-out', fill:'forwards'}),
      incoming.animate([{transform:`translateX(${direction * 100}%)`}, {transform:'translateX(0)'}], {duration, easing:'ease-in-out', fill:'forwards'})
    ];
    await Promise.allSettled(animations.map(animation => animation.finished));
    outgoing.remove();
    incoming.classList.remove('featured-entering');
    incoming.inert = false;
    animations.forEach(animation => animation.cancel());
    index = items.length ? target % items.length : 0;
    busy = false;
    if (pendingSync) {
      pendingSync = false;
      if (items.length) stage.replaceChildren(slide(items[index]));
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
    else if(items.length)stage.replaceChildren(slide(items[index]));
    update();
    schedule();
  });
  update();
  schedule();
})();
