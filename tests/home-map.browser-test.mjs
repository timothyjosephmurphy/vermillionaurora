import {chromium} from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {projectPin} from '../exhibitions/world-map/live-pins.js';

const root = path.resolve('dist');
const origin = 'https://tjm.art';
const approved = {testimonials: [
  {id: 'mock-tokyo', name: 'A collector', city: 'Tokyo', quote: 'A sentence that must stay off the map.', pin: [35.68, 139.76], photos: [], video: null},
  {id: 'mock-seattle', name: 'A collector', city: 'Seattle', quote: 'Beside the gallery.', pin: [47.6062, -122.3321], photos: [], video: null},
]};
const types = {'.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp'};

const browser = await chromium.launch({headless: true, ...(process.env.CHROMIUM_EXECUTABLE ? {executablePath: process.env.CHROMIUM_EXECUTABLE, args: ['--no-sandbox', '--disable-dev-shm-usage']} : {})});
try {
  const page = await browser.newPage({viewport: {width: 1280, height: 900}, reducedMotion: 'reduce'});
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.route('**/*', async route => {
    const url = new URL(route.request().url());
    if (url.hostname !== 'tjm.art') return route.abort();
    if (url.pathname === '/testimonials/api/approved') return route.fulfill({status: 404, body: 'missing'});
    const file = path.join(root, decodeURIComponent(url.pathname), url.pathname.endsWith('/') ? 'index.html' : '');
    if (fs.existsSync(file) && fs.statSync(file).isFile()) {
      return route.fulfill({body: fs.readFileSync(file), contentType: types[path.extname(file)] || 'application/octet-stream'});
    }
    return route.fulfill({status: 404, body: 'missing'});
  });

  await page.goto(origin + '/');
  await page.locator('.atlas-compact [data-pin="exhibition"]').first().waitFor();
  assert.equal(await page.locator('.atlas-compact [data-pin="exhibition"]').count(), 6, 'build-time exhibition dots stay when the approved list fails');
  assert.equal(await page.locator('.atlas-compact [data-pin="testimonial"]').count(), 0);
  assert.equal(await page.locator('.atlas-compact-note').isHidden(), true);
  assert.equal(await page.locator('.atlas-compact').evaluate(el => el.closest('a')?.getAttribute('href')), '/exhibitions/world-map/');

  await page.route('**/testimonials/api/approved', route => route.fulfill({
    status: 200,
    contentType: 'application/json',
    headers: {'cache-control': 'public, max-age=60, must-revalidate'},
    body: JSON.stringify(approved),
  }));
  await page.goto(origin + '/');
  await page.locator('.atlas-compact [data-pin="testimonial"]').nth(1).waitFor();
  assert.equal(await page.locator('.atlas-compact [data-pin="exhibition"]').count(), 6);
  const dots = await page.locator('.atlas-compact [data-pin="testimonial"]').evaluateAll(nodes => nodes.map(node => ({
    cx: Number(node.getAttribute('cx')),
    cy: Number(node.getAttribute('cy')),
    fill: node.getAttribute('fill'),
    events: node.getAttribute('pointer-events'),
  })));
  assert.equal(dots.length, 2);
  assert.ok(dots.every(dot => dot.fill === '#2f8a4c' && dot.events === 'none'));
  const expectedTokyo = projectPin(35.68, 139.76);
  const tokyo = dots.find(dot => Math.hypot(dot.cx - expectedTokyo.x, dot.cy - expectedTokyo.y) < 1);
  assert.ok(tokyo, `Tokyo pin missing: ${JSON.stringify(dots)}`);
  const seattle = projectPin(47.6062, -122.3321);
  const nudged = dots.find(dot => dot !== tokyo);
  const gap = Math.hypot(nudged.cx - seattle.x, nudged.cy - seattle.y);
  assert.ok(gap >= 15 && gap <= 17, gap);
  assert.equal(await page.locator('.atlas-compact-note').isVisible(), true);
  assert.equal((await page.locator('.atlas-compact-note').innerText()).trim(), 'Collector testimonials');
  assert.equal(await page.getByText('A sentence that must stay off the map.').count(), 0);
  assert.match(await page.locator('.atlas-compact svg').getAttribute('aria-label'), /Berlín/);
  assert.match(await page.locator('.atlas-compact svg').getAttribute('aria-label'), /Tokyo/);
  const hit = await page.evaluate(() => {
    const link = document.querySelector('.atlas-compact').closest('a');
    link.scrollIntoView({block: 'center'});
    const dot = [...document.querySelectorAll('.atlas-compact [data-pin="testimonial"]')].at(-1);
    const box = dot.getBoundingClientRect();
    const target = document.elementFromPoint(box.x + box.width / 2, box.y + box.height / 2);
    return target?.closest('a')?.getAttribute('href') || target?.tagName || '';
  });
  assert.equal(hit, '/exhibitions/world-map/');
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), true);

  await page.goto(origin + '/testimonials/#share');
  await page.locator('.share-map [data-pin="testimonial"]').first().waitFor();
  assert.equal((await page.locator('.share-map-caption').innerText()).trim(), 'Collectors around the world');
  assert.equal(await page.locator('.share-map [data-pin="exhibition"]').count(), 0);
  assert.equal(await page.locator('.share-map').getAttribute('href'), '/exhibitions/world-map/');
  assert.equal(await page.locator('.share-map').evaluate(el => el.parentElement.classList.contains('share-copy') && !!el.previousElementSibling?.matches('.share-points')), true);
  const desktop = await page.evaluate(() => {
    const map = document.querySelector('.share-map').getBoundingClientRect();
    const form = document.querySelector('.share-form-wrap').getBoundingClientRect();
    const copy = document.querySelector('.share-copy').getBoundingClientRect();
    return {mapH: map.height, formH: form.height, copyBottom: copy.bottom, formBottom: form.bottom, mapTop: map.top, bulletsBottom: document.querySelector('.share-points').getBoundingClientRect().bottom};
  });
  assert.ok(desktop.mapH >= 280, desktop.mapH);
  assert.ok(Math.abs(desktop.copyBottom - desktop.formBottom) < 2, JSON.stringify(desktop));
  assert.ok(desktop.mapTop >= desktop.bulletsBottom - 1);
  assert.equal(await page.locator('.share-map', {hasText: 'A sentence that must stay off the map.'}).count(), 0);
  const shareHit = await page.evaluate(() => {
    const link = document.querySelector('.share-map');
    link.scrollIntoView({block: 'center'});
    const dot = [...document.querySelectorAll('.share-map [data-pin="testimonial"]')].at(-1);
    const box = dot.getBoundingClientRect();
    const target = document.elementFromPoint(box.x + box.width / 2, box.y + box.height / 2);
    return target?.closest('a')?.getAttribute('href') || target?.tagName || '';
  });
  assert.equal(shareHit, '/exhibitions/world-map/');

  await page.setViewportSize({width: 390, height: 844});
  await page.goto(origin + '/testimonials/#share');
  await page.locator('.share-map [data-pin="testimonial"]').first().waitFor();
  const mobile = await page.evaluate(() => {
    const map = document.querySelector('.share-map').getBoundingClientRect();
    const canvas = document.querySelector('.share-map-canvas').getBoundingClientRect();
    const form = document.querySelector('.share-form-wrap').getBoundingClientRect();
    const bullets = document.querySelector('.share-points').getBoundingClientRect();
    return {canvasH: canvas.height, mapBottom: map.bottom, formTop: form.top, bulletsBottom: bullets.bottom, overflow: document.documentElement.scrollWidth <= innerWidth + 1};
  });
  assert.ok(mobile.overflow, 'no horizontal overflow');
  assert.ok(mobile.bulletsBottom <= mobile.mapBottom && mobile.mapBottom <= mobile.formTop + 1, JSON.stringify(mobile));
  assert.ok(mobile.canvasH >= 170 && mobile.canvasH <= 210, mobile.canvasH);
  assert.equal((await page.locator('.share-map-caption').innerText()).trim(), 'Collectors around the world');
  assert.deepEqual(errors, []);
  console.log('PASS: homepage card and testimonials map pick up approved pins at runtime.');
} finally {
  await browser.close();
}
