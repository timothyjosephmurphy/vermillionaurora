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
  reader.innerHTML = `<div class="book-reader-controls" role="group" aria-label="Book viewer controls">
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
        page.cleanup();
      }
      pages.style.gridTemplateColumns = `repeat(${pageCount}, minmax(0, 1fr))`;
      pages.replaceChildren(fragment);
      status.textContent = `Pages ${firstPage}${lastPage > firstPage ? '–' + lastPage : ''} of ${pdf.numPages}`;
    } finally {
      busy = false;
      previous.disabled = firstPage === 1;
      next.disabled = firstPage + pageCount > pdf.numPages;
      layout.disabled = false;
      reader.removeAttribute('aria-busy');
    }
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
