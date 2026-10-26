// The book reader (thumbnails, controls, and the page spread) fits in one viewport under
// the sticky header. Colored canvases stand in for the PDF so this does not fetch one.
// Studio-tracker #334.
import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {extname, join} from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const mime = {'.html':'text/html', '.js':'text/javascript', '.css':'text/css', '.svg':'image/svg+xml', '.webp':'image/webp', '.png':'image/png', '.jpg':'image/jpeg', '.woff2':'font/woff2'};
const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://127.0.0.1');
    let pathname = decodeURIComponent(url.pathname);
    if (pathname.endsWith('/')) pathname += 'index.html';
    const file = join(root, pathname);
    if (!file.startsWith(root)) { res.writeHead(403); return res.end(); }
    const body = await readFile(file);
    res.writeHead(200, {'content-type': mime[extname(file)] || 'application/octet-stream'});
    res.end(body);
  } catch { res.writeHead(404); res.end('missing'); }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({headless:true, ...(process.env.CHROMIUM_EXECUTABLE ? {executablePath:process.env.CHROMIUM_EXECUTABLE, args:['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage', '--no-zygote']} : {})});

function fits(name, box) {
  assert(box.headingTop >= box.headerBottom - 1, `${name}: heading is under the header (${box.headingTop} vs ${box.headerBottom})`);
  assert(Math.abs(box.previewBottom - box.innerHeight) <= 1, `${name}: preview fills the viewport (${box.previewBottom} vs ${box.innerHeight})`);
  assert(box.pagesOverflow <= 1, `${name}: page area scrolls`);
  assert.equal(box.fit, 'contain', `${name}: object-fit`);
  assert(box.canvases.length === box.expected, `${name}: ${box.canvases.length} pages`);
  for (const canvas of box.canvases) {
    assert(canvas.top >= box.headerBottom - 1, `${name}: page starts below the header`);
    assert(canvas.bottom <= box.innerHeight + 1, `${name}: page bottom ${canvas.bottom} is below ${box.innerHeight}`);
    assert(canvas.height > 80, `${name}: page is visible`);
    assert(Math.abs(canvas.width / canvas.height - 850 / 1100) < 0.03, `${name}: full page aspect`);
  }
}

try {
  const page = await browser.newPage({viewport:{width:1440, height:900}, reducedMotion:'reduce'});
  await page.goto(origin + '/tests/fixtures/book-viewer-fit.html#read-book', {waitUntil:'load'});
  await page.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; });
  const read = () => page.evaluate(() => {
    const header = document.querySelector('.site-header').getBoundingClientRect();
    const preview = document.querySelector('.book-preview').getBoundingClientRect();
    const pages = document.querySelector('.book-reader-pages');
    const canvas = pages.querySelector('canvas');
    return {
      innerHeight,
      headerBottom: header.bottom,
      headingTop: document.querySelector('#book-preview-title').getBoundingClientRect().top,
      previewBottom: preview.bottom,
      pagesOverflow: pages.scrollHeight - pages.clientHeight,
      thumb: document.querySelector('.book-thumbnail-preview').getBoundingClientRect().height,
      fit: getComputedStyle(canvas).objectFit,
      canvases: [...pages.querySelectorAll('canvas')].map(node => {
        const box = node.getBoundingClientRect();
        return {top:box.top, bottom:box.bottom, width:box.width, height:box.height};
      }),
    };
  });
  fits('desktop two-page', {...await read(), expected:2});
  assert.equal((await read()).thumb, 100, 'desktop thumbnails stay full size');
  await page.selectOption('select', '1');
  fits('desktop single-page', {...await read(), expected:1});

  const settle = () => page.waitForFunction(() => Math.abs(document.querySelector('.book-preview').getBoundingClientRect().bottom - innerHeight) <= 1);
  await page.setViewportSize({width:1280, height:640});
  await page.evaluate(() => document.getElementById('read-book').scrollIntoView({block:'start', behavior:'instant'}));
  await settle();
  await page.selectOption('select', '2');
  const short = await read();
  fits('short two-page', {...short, expected:2});
  assert(short.thumb <= 48, `short thumbnails shrink (${short.thumb})`);

  await page.setViewportSize({width:375, height:667});
  await page.evaluate(() => document.getElementById('read-book').scrollIntoView({block:'start', behavior:'instant'}));
  await settle();
  const phone = await read();
  fits('phone two-page', {...phone, expected:2});
  assert(phone.thumb < 100, `phone thumbnails shrink (${phone.thumb})`);
  await page.selectOption('select', '1');
  await settle();
  fits('phone single-page', {...await read(), expected:1});

  await page.setViewportSize({width:1440, height:900});
  await page.evaluate(() => scrollTo(0, 0));
  await page.getByRole('link', {name:'Read the book'}).click();
  await page.waitForFunction(() => Math.abs(document.querySelector('.book-preview').getBoundingClientRect().bottom - innerHeight) <= 1);
  await page.selectOption('select', '2');
  fits('link to #read-book', {...await read(), expected:2});
  console.log('PASS: book spread fits under the header');
} finally {
  await browser.close();
  await new Promise(resolve => server.close(resolve));
}
