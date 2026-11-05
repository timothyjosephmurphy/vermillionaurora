// iPhone landscape: camera and the dancer stage sit side by side, and the sliders stay reachable.
import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {extname, join} from 'node:path';
import {mkdirSync} from 'node:fs';

const root = new URL('..', import.meta.url).pathname;
const mime = {'.html': 'text/html', '.js': 'text/javascript', '.wasm': 'application/wasm', '.css': 'text/css'};
const liveHtml = (await readFile(new URL('../src/pages/neural-dance/live/index.astro', import.meta.url), 'utf8')).replace(/^---[\s\S]*?---\n/, '');
const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://127.0.0.1');
    if (url.pathname === '/neural-dance/live/' || url.pathname === '/neural-dance/live/index.html') {
      res.writeHead(200, {'content-type': 'text/html', 'cache-control': 'no-store'});
      return res.end(liveHtml);
    }
    let path = decodeURIComponent(url.pathname);
    const file = join(root, path);
    if (!file.startsWith(root)) { res.writeHead(403); return res.end(); }
    const body = await readFile(file);
    res.writeHead(200, {'content-type': mime[extname(file)] || 'application/octet-stream', 'cache-control': 'no-store'});
    res.end(body);
  } catch { res.writeHead(404); res.end('missing'); }
});
await new Promise(r => server.listen(0, '127.0.0.1', r));
const origin = `http://127.0.0.1:${server.address().port}`;
mkdirSync('/opt/cursor/artifacts', {recursive: true});
const browser = await chromium.launch();
try {
  const page = await browser.newPage({viewport: {width: 844, height: 390}});
  await page.goto(origin + '/neural-dance/live/', {waitUntil: 'domcontentloaded'});
  await page.waitForFunction(() => document.getElementById('nd-room-lab')?.dataset.roomReady === '1');
  const boxes = await page.evaluate(() => {
    const box = sel => {
      const el = document.querySelector(sel);
      const r = el.getBoundingClientRect();
      return {x: r.x, y: r.y, w: r.width, h: r.height, right: r.right, bottom: r.bottom};
    };
    return {
      stage: box('#nd-room-projector'),
      camera: box('#nd-camera-mode'),
      frame: box('#nd-camera-mode .camera-frame'),
      sliders: box('[data-control="gravity"]'),
      quiet: box('[data-control="quiet"]'),
      bar: box('.nd-live-bar'),
      exit: document.querySelector('[data-live="exit-align"]').hidden,
      header: document.querySelector('.site-header, footer')
    };
  });
  assert.equal(boxes.header, null);
  assert.ok(boxes.stage.w > 800 && boxes.stage.h > 340, `stage is not full screen ${boxes.stage.w}x${boxes.stage.h}`);
  assert.ok(boxes.camera.w < 420 && boxes.camera.w < boxes.stage.w * 0.55, `camera is not a small preview ${boxes.camera.w}`);
  assert.ok(boxes.camera.right > 700 && boxes.camera.bottom > 300, 'camera preview is not in the corner');
  assert.ok(boxes.bar.y < 30 && boxes.bar.h > 20, 'control bar is not at the top');
  assert.ok(boxes.sliders.h > 10 && boxes.quiet.h > 10);
  assert.equal(boxes.exit, true);
  const hit = await page.evaluate(() => {
    const slider = document.querySelector('[data-control="gravity"]');
    const r = slider.getBoundingClientRect();
    const top = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2);
    return slider.contains(top) || top === slider;
  });
  assert.equal(hit, true, 'gravity slider is covered');
  await page.screenshot({path: '/opt/cursor/artifacts/neural-dance-live-landscape.png'});

  await page.click('[data-action="align"]');
  await page.waitForFunction(() => document.body.classList.contains('nd-live-aligning') && document.querySelector('[data-cal-pattern]').hidden === false && document.querySelector('[data-live="exit-align"]').hidden === false);
  const during = await page.evaluate(() => {
    const exit = document.querySelector('[data-live="exit-align"]');
    const r = exit.getBoundingClientRect();
    const top = document.elementFromPoint(r.x + 8, r.y + r.height / 2);
    const slider = document.querySelector('[data-control="gravity"]').getBoundingClientRect();
    const pattern = document.querySelector('[data-cal-pattern]');
    const stage = document.getElementById('nd-room-projector').getBoundingClientRect();
    const canvas = document.querySelector('#nd-room-projector [data-stage]');
    return {
      exitHit: exit.contains(top) || top === exit,
      mapping: document.getElementById('nd-room-lab').classList.contains('is-mapping'),
      sliderHit: (() => {
        const s = document.querySelector('[data-control="gravity"]');
        const sr = s.getBoundingClientRect();
        const el = document.elementFromPoint(sr.x + 8, sr.y + sr.height / 2);
        return s.contains(el) || el === s;
      })(),
      patternBg: getComputedStyle(pattern).backgroundColor,
      canvasShown: getComputedStyle(canvas).display !== 'none' && canvas.getBoundingClientRect().width > 800,
      stageW: stage.width,
      stageH: stage.height
    };
  });
  assert.equal(during.exitHit, true, 'Exit align is covered');
  assert.equal(during.mapping, false, 'maptastic mapping trapped the page');
  assert.equal(during.sliderHit, true, 'sliders are covered during align');
  assert.equal(during.canvasShown, true, 'dancers are hidden during align');
  assert.ok(during.stageW > 800 && during.stageH > 340);
  assert.ok(during.patternBg === 'rgba(0, 0, 0, 0)' || during.patternBg === 'transparent', `align field is not transparent ${during.patternBg}`);
  await page.screenshot({path: '/opt/cursor/artifacts/neural-dance-live-align.png'});
  await page.click('[data-live="exit-align"]');
  await page.waitForFunction(() => !document.body.classList.contains('nd-live-aligning') && document.querySelector('[data-cal-pattern]').hidden === true);

  await page.setViewportSize({width: 390, height: 844});
  const portrait = await page.evaluate(() => {
    const stage = document.getElementById('nd-room-projector').getBoundingClientRect();
    const camera = document.getElementById('nd-camera-mode').getBoundingClientRect();
    const bar = document.querySelector('.nd-live-bar').getBoundingClientRect();
    return {stageW: stage.width, stageH: stage.height, cameraW: camera.width, barTop: bar.top};
  });
  assert.ok(portrait.stageW > 370 && portrait.stageH > 800, `portrait stage is not full screen ${portrait.stageW}x${portrait.stageH}`);
  assert.ok(portrait.cameraW < 250, `portrait camera is not a corner preview ${portrait.cameraW}`);
  assert.ok(portrait.barTop < 20);
  await page.locator('[data-control="quiet"]').scrollIntoViewIfNeeded();
  const quietBox = await page.locator('[data-control="quiet"]').boundingBox();
  assert.ok(quietBox && quietBox.y >= 0 && quietBox.y < 844, `quiet slider not reachable in portrait ${quietBox && quietBox.y}`);
} finally {
  await browser.close();
  await new Promise(r => server.close(r));
}
