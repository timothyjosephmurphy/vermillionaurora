// Enhance the native reader only after a two-page spread renders successfully.
const version = '6.3.289';
const libraryBase = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${version}/`;
let library;
function getLibrary() {
  return library ||= import(`${libraryBase}build/pdf.mjs`).then(pdfjs => {
    pdfjs.GlobalWorkerOptions.workerSrc = `${libraryBase}build/pdf.worker.mjs`;
    return pdfjs;
  });
}
async function enhance(frame) {
  const url = frame.src.split('#')[0];
  const reader = document.createElement('div');
  reader.className = 'book-reader';
  reader.hidden = true;
  reader.innerHTML = `<nav class="book-thumbnail-nav" aria-label="Page thumbnails"><button type="button" data-thumbs-prev aria-label="Scroll thumbnails left">←</button><div class="book-thumbnails" aria-label="Choose a page"></div><button type="button" data-thumbs-next aria-label="Scroll thumbnails right">→</button></nav><div class="book-reader-controls" role="group" aria-label="Book viewer controls">
    <button type="button" data-prev aria-label="Previous spread">← Previous</button>
    <span role="status" aria-live="polite"></span>
    <button type="button" data-next aria-label="Next spread">Next →</button>
    <label>Layout <select><option value="2" selected>Two pages</option><option value="1">Single page</option></select></label>
  </div><div class="book-reader-pages" aria-label="Book pages"></div>`;
  frame.before(reader);
  const previous = reader.querySelector('[data-prev]');
  const next = reader.querySelector('[data-next]');
  const layout = reader.querySelector('select');
  const pages = reader.querySelector('.book-reader-pages');
  const status = reader.querySelector('[role="status"]');
  const thumbnails = reader.querySelector('.book-thumbnails');
  const thumbnailButtons = [];
  const motion = () => matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth';
  let firstPage = 1;
  let pageCount = 2;
  let busy = false;
  let pdf;
  async function render() {
    if (busy) return;
    busy = true;
    previous.disabled = next.disabled = layout.disabled = true;
    reader.setAttribute('aria-busy', 'true');
    try {
      const fragment = document.createDocumentFragment();
      const lastPage = Math.min(firstPage + pageCount - 1, pdf.numPages);
      const width = Math.max(160, (frame.parentElement.clientWidth - 44) / pageCount);
      for (let n = firstPage; n <= lastPage; n++) {
        const page = await pdf.getPage(n);
        const original = page.getViewport({scale:1});
        const viewport = page.getViewport({scale:width / original.width * Math.min(devicePixelRatio || 1, 1.5)});
        const canvas = document.createElement('canvas');
        canvas.width = Math.ceil(viewport.width);
        canvas.height = Math.ceil(viewport.height);
        canvas.setAttribute('role', 'img');
        canvas.setAttribute('aria-label', `Book page ${n}. Use the original PDF link for selectable text.`);
        await page.render({canvasContext:canvas.getContext('2d'), viewport}).promise;
        fragment.append(canvas);

      }
      pages.style.gridTemplateColumns = `repeat(${pageCount}, minmax(0, 1fr))`;
      pages.replaceChildren(fragment);
      thumbnailButtons.forEach((button, i) => {
        const selected = i + 1 >= firstPage && i + 1 <= lastPage;
        button.setAttribute('aria-pressed', String(selected));
      });
      const selected = thumbnailButtons[firstPage - 1];
      if (selected) {
        const left = selected.offsetLeft;
        if (left < thumbnails.scrollLeft || left + selected.offsetWidth > thumbnails.scrollLeft + thumbnails.clientWidth) {
          thumbnails.scrollTo({left:Math.max(0, left - (thumbnails.clientWidth - selected.offsetWidth) / 2), behavior:motion()});
        }
      }
      status.textContent = `Pages ${firstPage}${lastPage > firstPage ? '–' + lastPage : ''} of ${pdf.numPages}`;
    } finally {
      busy = false;
      previous.disabled = firstPage === 1;
      next.disabled = firstPage + pageCount > pdf.numPages;
      layout.disabled = false;
      reader.removeAttribute('aria-busy');
    }
  }
  function setupThumbnails() {
    const queue = [];
    let rendering = false;
    async function drain() {
      if (rendering) return;
      rendering = true;
      try {
        while (queue.length) {
          const button = queue.shift();
          try {
            const page = await pdf.getPage(Number(button.dataset.page));
            const original = page.getViewport({scale:1});
            const viewport = page.getViewport({scale:150 / original.height});
            const canvas = document.createElement('canvas');
            canvas.width = Math.ceil(viewport.width);
            canvas.height = Math.ceil(viewport.height);
            canvas.setAttribute('aria-hidden', 'true');
            await page.render({canvasContext:canvas.getContext('2d'), viewport}).promise;
            button.querySelector('.book-thumbnail-preview').replaceChildren(canvas);
          } catch (error) {
            // The numbered page button remains usable if its thumbnail fails.
            console.warn('Page thumbnail could not load', error);
          }
        }
      } finally { rendering = false; }
    }
    const thumbnailObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          thumbnailObserver.unobserve(entry.target);
          queue.push(entry.target);
        }
      });
      drain();
    }, {root:thumbnails, rootMargin:'0px 200px'});
    for (let n = 1; n <= pdf.numPages; n++) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'book-thumbnail';
      button.dataset.page = n;
      button.setAttribute('aria-label', `Go to page ${n}`);
      button.setAttribute('aria-pressed', String(n <= pageCount));
      button.innerHTML = `<span class="book-thumbnail-preview" aria-hidden="true"></span><span>${n}</span>`;
      button.addEventListener('click', () => {
        if (busy) return;
        firstPage = pageCount === 2 ? n - ((n - 1) % 2) : n;
        render().catch(fallback);
      });
      button.addEventListener('keydown', event => {
        let target;
        if (event.key === 'ArrowRight') target = Math.min(pdf.numPages - 1, n);
        if (event.key === 'ArrowLeft') target = Math.max(0, n - 2);
        if (event.key === 'Home') target = 0;
        if (event.key === 'End') target = pdf.numPages - 1;
        if (target !== undefined) {event.preventDefault(); thumbnailButtons[target].focus();}
      });
      thumbnails.append(button);
      thumbnailButtons.push(button);
      thumbnailObserver.observe(button);
    }
    reader.querySelector('[data-thumbs-prev]').addEventListener('click', () => thumbnails.scrollBy({left:-thumbnails.clientWidth * .8, behavior:motion()}));
    reader.querySelector('[data-thumbs-next]').addEventListener('click', () => thumbnails.scrollBy({left:thumbnails.clientWidth * .8, behavior:motion()}));
  }
  function fallback(error) {
    console.warn('Enhanced book viewer unavailable; using native PDF viewer.', error);
    reader.hidden = true;
    frame.hidden = false;
  }
  try {
    const pdfjs = await getLibrary();
    pdf = await pdfjs.getDocument({url, disableAutoFetch:true, disableStream:true, rangeChunkSize:262144, cMapUrl:`${libraryBase}cmaps/`, cMapPacked:true, standardFontDataUrl:`${libraryBase}standard_fonts/`, wasmUrl:`${libraryBase}wasm/`}).promise;
    await render();
    frame.hidden = true;
    reader.hidden = false;
    setupThumbnails();
    previous.addEventListener('click', () => {if (!busy) { firstPage = Math.max(1, firstPage - pageCount); render().catch(fallback); }});
    next.addEventListener('click', () => {if (!busy && firstPage + pageCount <= pdf.numPages) {firstPage += pageCount; render().catch(fallback);}});
    layout.addEventListener('change', () => {pageCount = Number(layout.value); render().catch(fallback);});
    let timer;
    window.addEventListener('resize', () => {clearTimeout(timer); timer = setTimeout(() => render().catch(fallback), 200);});
  } catch (error) { fallback(error); }
}
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {observer.unobserve(entry.target); enhance(entry.target);}
  });
}, {rootMargin:'200px'});
document.querySelectorAll('.book-preview iframe').forEach(frame => observer.observe(frame));
