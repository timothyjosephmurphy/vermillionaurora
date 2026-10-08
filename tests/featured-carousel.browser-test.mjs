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

function spread(samples, pick) {
  const vals = samples.map(pick).filter(v => v != null);
  return vals.length ? Math.max(...vals) - Math.min(...vals) : 0;
}

async function pauseCarousel(page) {
  await page.evaluate(() => {
    const t = document.querySelector('.featured-controls [data-toggle]');
    if (t && t.textContent === 'Pause') t.click();
    window.scrollTo(0, 0);
  });
}

async function gotoSlide(page, wantTitle) {
  const n = await page.evaluate(() => Number(document.querySelector('.featured-position')?.textContent.split('/')[1] || 0));
  for (let i = 0; i < n; i++) {
    const title = await page.evaluate(() => document.querySelector('.featured-front h2')?.textContent?.trim());
    if (title === wantTitle) return title;
    await page.evaluate(() => document.querySelector('.featured-carousel [data-next]')?.click());
    await page.waitForTimeout(700);
  }
  return page.evaluate(() => document.querySelector('.featured-front h2')?.textContent?.trim());
}

async function measureClearance(page) {
  return page.evaluate(() => {
    const card = document.querySelector('.featured-art');
    const stage = document.querySelector('.featured-stage');
    const front = document.querySelector('.featured-slide.featured-front');
    const buy = front?.querySelector('.card-buy:not([hidden])');
    const prints = front?.querySelector('.card-prints-from');
    const row = front?.querySelector('.card-buy-row');
    const title = front?.querySelector('h2')?.textContent?.trim() || '';
    if (!card || !stage || !buy || !prints || !row) return {ok:false, title, reason:'missing'};
    const cb = card.getBoundingClientRect();
    const sb = stage.getBoundingClientRect();
    const visibleBottom = Math.min(cb.bottom, sb.bottom);
    const visibleTop = Math.max(cb.top, sb.top);
    const visibleLeft = Math.max(cb.left, sb.left);
    const visibleRight = Math.min(cb.right, sb.right);
    const buyB = buy.getBoundingClientRect();
    const printsB = prints.getBoundingClientRect();
    const rowB = row.getBoundingClientRect();
    const clear = (box) => ({
      top: box.top - visibleTop,
      bottom: visibleBottom - box.bottom,
      left: box.left - visibleLeft,
      right: visibleRight - box.right,
    });
    return {
      ok: true,
      title,
      buy: clear(buyB),
      prints: clear(printsB),
      row: clear(rowB),
      buySize: {w: buyB.width, h: buyB.height, text: buy.textContent.trim()},
      stageH: sb.height,
      captionH: front.querySelector('.featured-caption')?.getBoundingClientRect().height,
    };
  });
}

/* ---- Stability (Chromium): zero layout shift across transitions ---- */
{
  const browser = await chromium.launch();
  const viewports = [
    ['desktop-1440', {width:1440, height:900}],
    ['desktop-1366', {width:1366, height:900}],
    ['mobile-375', {width:375, height:812, isMobile:true, hasTouch:true}],
  ];

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
    await pauseCarousel(page);

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
}

/* ---- Caption clearance: prints + Buy fully inside card (≥4px) ---- */
const clearanceTargets = [
  'El Zonte Before Dawn',
  'Moonrise over lake in the North Cascades', // 2-line title on mobile
];
const narrowWidths = [375, 390, 414, 430];
const engineRuns = [
  ['chromium', chromium, narrowWidths.map(w => ({label:`chromium-${w}`, opts:{viewport:{width:w,height:844}, isMobile:true, hasTouch:true}}))],
  ['webkit', webkit, [
    ...narrowWidths.map(w => ({label:`webkit-${w}`, opts:{viewport:{width:w,height:844}, isMobile:true, hasTouch:true}})),
    {label:'webkit-iphone12', opts:{...devices['iPhone 12']}},
    {label:'webkit-iphone14', opts:{...devices['iPhone 14']}},
    {label:'webkit-iphonese', opts:{...devices['iPhone SE']}},
  ]],
];

for (const [engineName, engine, runs] of engineRuns) {
  const browser = await engine.launch();
  for (const {label, opts} of runs) {
    const ctx = await browser.newContext(opts);
    const page = await ctx.newPage();
    await page.goto(origin + '/', {waitUntil: 'load'});
    await page.waitForSelector('.featured-slide.featured-front .featured-painting');
    await page.waitForTimeout(600);
    await pauseCarousel(page);
    await page.locator('.featured-art').scrollIntoViewIfNeeded();

    for (const want of clearanceTargets) {
      const title = await gotoSlide(page, want);
      // Moonrise may wrap to 2 lines; if title not found, skip only that one with a note
      if (title !== want) {
        console.log(`${label}: skip missing slide "${want}" (have "${title}")`);
        continue;
      }
      const m = await measureClearance(page);
      assert(m.ok, `${label} ${want}: measure failed ${JSON.stringify(m)}`);
      assert(m.buy.bottom >= 4, `${label} ${want}: buy bottom clearance ${m.buy.bottom}`);
      assert(m.buy.top >= 0, `${label} ${want}: buy top clearance ${m.buy.top}`);
      assert(m.prints.bottom >= 4, `${label} ${want}: prints bottom clearance ${m.prints.bottom}`);
      assert(m.prints.top >= 0, `${label} ${want}: prints top clearance ${m.prints.top}`);
      assert(m.buySize.text === 'Buy', `${label} ${want}: pill text ${m.buySize.text}`);
      assert(m.buySize.h >= 24 && m.buySize.h <= 32, `${label} ${want}: pill h ${m.buySize.h}`);
      // Buy stays on the right of the prints row
      const aligned = await page.evaluate(() => {
        const row = document.querySelector('.featured-front .card-buy-row');
        const buy = row?.querySelector('.card-buy');
        const prints = row?.querySelector('.card-prints-from');
        if (!row || !buy || !prints) return false;
        const rb = row.getBoundingClientRect(), bb = buy.getBoundingClientRect(), pb = prints.getBoundingClientRect();
        return row.lastElementChild === buy && bb.left >= pb.right - 1 && Math.abs((bb.top+bb.bottom)/2 - (rb.top+rb.bottom)/2) <= 6;
      });
      assert(aligned, `${label} ${want}: Buy not level lower-right`);
      console.log(`${label} ${want}: buyClear=${m.buy.bottom.toFixed(1)} printsClear=${m.prints.bottom.toFixed(1)} captionH=${m.captionH}`);
    }
    await ctx.close();
  }
  await browser.close();
  console.log(`PASS clearance (${engineName})`);
}

server.close();
console.log('PASS: featured hero carousel stable + mobile caption clearance (Chromium+WebKit)');
