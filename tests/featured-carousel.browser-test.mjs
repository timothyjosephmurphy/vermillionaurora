import {chromium} from 'playwright';
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

const browser = await chromium.launch();
const viewports = [
  ['desktop-1440', {width:1440, height:900}],
  ['desktop-1366', {width:1366, height:900}],
  ['mobile-375', {width:375, height:812, isMobile:true, hasTouch:true}],
];

function spread(samples, pick) {
  const vals = samples.map(pick).filter(v => v != null);
  return vals.length ? Math.max(...vals) - Math.min(...vals) : 0;
}

for (const [label, vp] of viewports) {
  const ctx = await browser.newContext({
    viewport: {width: vp.width, height: vp.height},
    isMobile: !!vp.isMobile,
    hasTouch: !!vp.hasTouch,
  });
  await ctx.addInitScript(() => {
    window.__cls = 0;
    try {
      new PerformanceObserver(list => {
        for (const e of list.getEntries()) if (!e.hadRecentInput) window.__cls += e.value;
      }).observe({type: 'layout-shift', buffered: true});
    } catch {}
  });
  const page = await ctx.newPage();
  await page.goto(origin + '/', {waitUntil: 'load'});
  await page.waitForSelector('.featured-slide.featured-front .featured-painting');
  await page.waitForTimeout(500);
  await page.evaluate(() => {
    const t = document.querySelector('.featured-controls [data-toggle]');
    if (t && t.textContent === 'Pause') t.click();
    window.scrollTo(0, 0);
  });

  const sample = () => page.evaluate(() => {
    const hero = document.querySelector('.hero');
    const card = document.querySelector('.featured-art');
    const stage = document.querySelector('.featured-stage');
    const front = document.querySelector('.featured-slide.featured-front');
    const buy = front?.querySelector('.card-buy:not([hidden])');
    const scrollY = window.scrollY || 0;
    const box = el => {
      if (!el) return null;
      const b = el.getBoundingClientRect();
      return {y: b.y + scrollY, width: b.width, height: b.height};
    };
    return {
      hero: box(hero), card: box(card), stage: box(stage),
      buy: buy ? {w: buy.getBoundingClientRect().width, h: buy.getBoundingClientRect().height, text: buy.textContent.trim()} : null,
      overflow: getComputedStyle(card).overflow + '/' + getComputedStyle(stage).overflow,
    };
  });

  const samples = [await sample()];
  const nSlides = await page.evaluate(() => Number(document.querySelector('.featured-position')?.textContent.split('/')[1] || 0));
  assert(nSlides >= 4, `${label}: need >=4 slides`);

  for (let i = 0; i < 4; i++) {
    const p = page.evaluate(() => document.querySelector('.featured-carousel [data-next]').click());
    const start = Date.now();
    while (Date.now() - start < 700) {
      samples.push(await sample());
      await page.waitForTimeout(50);
    }
    await p;
    await page.waitForTimeout(150);
    samples.push(await sample());
  }

  // Reduced-motion hard cut
  await page.emulateMedia({reducedMotion: 'reduce'});
  await page.evaluate(() => document.querySelector('.featured-carousel [data-next]').click());
  await page.waitForTimeout(120);
  samples.push(await sample());
  await page.emulateMedia({reducedMotion: 'no-preference'});

  const heroH = spread(samples, s => s.hero?.height);
  const heroY = spread(samples, s => s.hero?.y);
  const cardH = spread(samples, s => s.card?.height);
  const cardW = spread(samples, s => s.card?.width);
  const cardY = spread(samples, s => s.card?.y);
  const stageH = spread(samples, s => s.stage?.height);
  const badBuy = samples.filter(s => s.buy && (s.buy.text !== 'Buy' || s.buy.h < 24 || s.buy.h > 32 || s.buy.w < 40));

  assert(heroH <= 1, `${label}: hero height spread ${heroH}`);
  assert(heroY <= 1, `${label}: hero y spread ${heroY}`);
  assert(cardH <= 1, `${label}: card height spread ${cardH}`);
  assert(cardW <= 1, `${label}: card width spread ${cardW}`);
  assert(cardY <= 1, `${label}: card y spread ${cardY}`);
  assert(stageH <= 1, `${label}: stage height spread ${stageH}`);
  assert.equal(badBuy.length, 0, `${label}: pill ${JSON.stringify(badBuy[0])}`);
  assert(samples.every(s => !/scroll|auto/.test(s.overflow.split('/')[0])), `${label}: overflow ${samples[0].overflow}`);

  // CLS over ~20s with a few more advances
  const elapsed = await page.evaluate(() => performance.now());
  if (elapsed < 20000) await page.waitForTimeout(20000 - elapsed);
  for (let i = 0; i < 3; i++) {
    await page.evaluate(() => document.querySelector('.featured-carousel [data-next]').click());
    await page.waitForTimeout(600);
  }
  const cls = await page.evaluate(() => window.__cls);
  assert(cls < 0.02, `${label}: CLS ${cls}`);
  console.log(`${label}: ${samples.length} samples, 0 layout spread, CLS ${cls.toFixed(4)}, pill always Buy`);
  await ctx.close();
}

await browser.close();
server.close();
console.log('PASS: featured hero carousel stays stable across transitions (desktop 1440/1366, mobile 375, reduced-motion)');
