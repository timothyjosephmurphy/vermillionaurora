// Live stock moves homepage painting cards between Featured works and Collector's Items
// (catalog/availability.js). A move must not shift the slide the visitor is looking at, and a card
// that comes back (a 15-minute cart hold expiring) returns to its build-order place, not the end.
// Runs on a small fixture with the real availability.js and exhibitions.js, so it needs no build.
import {chromium, webkit, devices} from 'playwright';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const availabilityJs = readFileSync(new URL('../catalog/availability.js', import.meta.url), 'utf8');
const exhibitionsJs = readFileSync(new URL('../exhibitions/exhibitions.js', import.meta.url), 'utf8');
const card = i => `<article class="product-card card-tile ex-slide" data-product-id="p${i}" data-buy="true"><a class="product-title-link" href="#p${i}">Painting ${i}</a><div style="height:120px;background:hsl(${i * 37},50%,60%)"></div></article>`;
const controls = '<div class="ex-controls" hidden><button type="button" class="ex-autoplay">Pause</button><button type="button" data-direction="-1">←</button><p class="ex-position">1 / 1</p><button type="button" data-direction="1">→</button></div>';
const html = `<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1">
<style>body{margin:0;font:14px sans-serif}.ex-track{display:flex;overflow-x:auto;gap:18px}.ex-slide{flex:0 0 160px;min-width:0}</style></head><body>
<div class="ex-carousel" aria-label="Featured works"><div class="ex-track" data-available-paintings tabindex="0">${Array.from({length: 24}, (_, i) => card(i)).join('')}</div>${controls}</div>
<div class="ex-carousel" aria-label="Collector items"><div class="ex-track" data-collector-paintings tabindex="0">${Array.from({length: 6}, (_, i) => card(100 + i)).join('')}</div>${controls}</div>
<script>window.setInterval=((si)=>(f,ms,...a)=>si(f,ms===30000?300:ms,...a))(window.setInterval);</script>
<script src="/exhibitions.js"></script><script src="/availability.js"></script></body></html>`;

for (const [name, engine, opts] of [['chromium', chromium, {viewport: {width: 1280, height: 800}}], ['webkit', webkit, {...devices['iPhone 13']}]]) {
  if (process.env.PW_ENGINE && process.env.PW_ENGINE !== name) continue;
  const browser = await engine.launch();
  try {
    const page = await browser.newPage({...opts, reducedMotion: 'reduce'});
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    let reserved = false;
    await page.route('**/*', route => {
      const url = new URL(route.request().url());
      if (url.pathname === '/') return route.fulfill({contentType: 'text/html', body: html});
      if (url.pathname === '/availability.js') return route.fulfill({contentType: 'text/javascript', body: availabilityJs});
      if (url.pathname === '/exhibitions.js') return route.fulfill({contentType: 'text/javascript', body: exhibitionsJs});
      if (url.pathname === '/inventory/status') {
        const ids = url.searchParams.get('ids').split(',');
        return route.fulfill({json: {availability: Object.fromEntries(ids.map(id => [id, id === 'p1' && reserved ? 'reserved' : Number(id.slice(1)) >= 100 ? 'sold' : 'available']))}});
      }
      return route.fulfill({status: 404});
    });
    await page.goto('http://fixture.test/');
    await page.waitForTimeout(500);
    const state = () => page.evaluate(() => {
      const track = document.querySelector('[data-available-paintings]'), left = track.getBoundingClientRect().left;
      const first = [...track.children].find(child => child.getBoundingClientRect().right > left + 1);
      return {first: first.dataset.productId, x: Math.round(first.getBoundingClientRect().left - left), ids: [...track.children].map(child => child.dataset.productId), collectors: [...document.querySelectorAll('[data-collector-paintings] > *')].map(child => child.dataset.productId)};
    });
    // Look at the sixth card, past the one that will move.
    await page.evaluate(() => { const track = document.querySelector('[data-available-paintings]'); track.scrollLeft = track.children[5].offsetLeft - track.children[0].offsetLeft; });
    await page.waitForTimeout(100);
    const before = await state();
    assert.equal(before.first, 'p5', `${name}: fixture starts on the sixth card`);

    reserved = true;
    await page.waitForFunction(() => !document.querySelector('[data-available-paintings] [data-product-id="p1"]'));
    const held = await state();
    assert.equal(held.first, before.first, `${name}: the visible card stays put when another card leaves the track`);
    assert(Math.abs(held.x - before.x) <= 1, `${name}: no sideways jump (${before.x} -> ${held.x})`);
    assert.deepEqual(held.collectors, ['p1', 'p100', 'p101', 'p102', 'p103', 'p104', 'p105'], `${name}: a reserved card joins Collector's Items in build order`);

    reserved = false;
    await page.waitForFunction(() => document.querySelector('[data-available-paintings] [data-product-id="p1"]'));
    const back = await state();
    assert.deepEqual(back.ids, before.ids, `${name}: the card returns to its own place, not the end`);
    assert.equal(back.first, before.first, `${name}: the visible card stays put when the card comes back`);
    assert(Math.abs(back.x - before.x) <= 1, `${name}: no sideways jump on return (${before.x} -> ${back.x})`);
    assert.deepEqual(errors, []);
    console.log(`PASS ${name}: homepage carousels keep their place through live stock moves`);
  } finally {
    await browser.close();
  }
}
