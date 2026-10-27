import {chromium, webkit, devices} from 'playwright';
import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {extname, join} from 'node:path';

const root = new URL('../dist', import.meta.url).pathname;
const mime = {'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.woff2':'font/woff2'};
const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://127.0.0.1');
    let path = decodeURIComponent(url.pathname);
    if (path.endsWith('/')) path += 'index.html';
    const file = join(root, path);
    if (!file.startsWith(root)) { res.writeHead(403); return res.end(); }
    const body = await readFile(file);
    res.writeHead(200, {'content-type': mime[extname(file)] || 'application/octet-stream'});
    res.end(body);
  } catch { res.writeHead(404); res.end('missing'); }
});
await new Promise(r => server.listen(0, '127.0.0.1', r));
const origin = `http://127.0.0.1:${server.address().port}`;


// Homepage hero: slow opacity crossfade through wide Featured works, a small card cycling Strawberry Point paintings, Painting Wall peek
// above the landing position, and the 3D gallery corner link.
const browser = await chromium.launch();
try {
  for (const [name, opts] of [['desktop', {viewport: {width: 1440, height: 900}}], ['mobile', {...devices['iPhone 13']}]]) {
    const ctx = await browser.newContext(opts), page = await ctx.newPage();
    await page.goto(origin + '/', {waitUntil: 'load'});
    const s = await page.evaluate(() => {
      const wall = document.getElementById('painting-wall-peek'), hero = document.querySelector('.hero');
      return {y: scrollY, wall: wall?.offsetHeight, heroTop: hero.getBoundingClientRect().top, card: document.querySelectorAll('.hero .featured-art').length, sp: [...document.querySelectorAll('.sp-hero-source .product-card')].map(c=>c.dataset.spId),
        overlap: (()=>{const c=document.querySelector('.hero .featured-art').getBoundingClientRect();return [...document.querySelectorAll('.hero-copy h1,.hero-copy .button,.hero-room-link')].some(e=>{const r=e.getBoundingClientRect();return r.left<c.right&&r.right>c.left&&r.top<c.bottom&&r.bottom>c.top;});})(),
        cardHref: document.querySelector('.featured-art .featured-media')?.getAttribute('href'),
        slides: JSON.parse(document.querySelector('.hero-slideshow').dataset.heroSlides).length, wallImg: wall.querySelector('img').getAttribute('src'),
        room: document.querySelector('.hero-room-link')?.getAttribute('href'), transition: getComputedStyle(document.querySelector('.hero-slide')).transitionProperty};
    });
    assert.equal(s.card, 1, `${name}: hero carousel card`);
    assert.equal(s.sp.length, 15, `${name}: all Strawberry Point paintings`);
    assert(s.sp.every(id => id.startsWith('strawberry-point-')), `${name}: only Strawberry Point paintings`);
    assert(/^\/products\/strawberry-point-\d+\/$/.test(new URL(s.cardHref, origin).pathname), `${name}: card links to its painting`);
    assert(!s.overlap, `${name}: card clear of headline/CTA`);
    assert(s.slides >= 2, `${name}: wide paintings queued`);
    assert(s.wall > 200 && Math.abs(s.y - s.wall) <= 2, `${name}: lands below the wall (${s.y} vs ${s.wall})`);
    assert(s.heroTop >= 0 && s.heroTop < 140, `${name}: hero right under the header (${s.heroTop})`);
    assert.equal(s.wallImg, null, `${name}: wall image waits until the visitor scrolls up`);
    assert.equal(s.room, 'https://preview-251.tjm-tag-gallery-preview.pages.dev/play/');
    assert.equal(s.transition, 'opacity', `${name}: crossfade is opacity only`);
    await page.evaluate(() => scrollTo(0, 0)); await page.waitForTimeout(300);
    assert(await page.evaluate(() => !!document.querySelector('#painting-wall-peek img').getAttribute('src')), `${name}: wall image loads when revealed`);
    // Deep links keep their target.
    const deep = await ctx.newPage(); await deep.goto(origin + '/#gallery', {waitUntil: 'load'});
    // CI runners are slow; give late image layout a few seconds to settle before judging the landing spot.
    const landed = await deep.waitForFunction(() => Math.abs(document.getElementById('gallery').getBoundingClientRect().top) < 200, null, {timeout: 5000}).then(() => true, () => false);
    assert(landed, `${name}: #gallery deep link`);
    await ctx.close();
  }
  const ctx = await browser.newContext({viewport: {width: 1280, height: 800}, reducedMotion: 'reduce'}), page = await ctx.newPage();
  await page.clock?.install?.();
  await page.goto(origin + '/', {waitUntil: 'load'});
  await page.waitForTimeout(500);
  assert.equal(await page.evaluate(() => document.querySelectorAll('.hero-slide')[1].getAttribute('src')), null, 'reduced motion: first image only, nothing preloaded');
  await ctx.close();
  console.log('home hero ok');
} finally { await browser.close(); server.close(); }
