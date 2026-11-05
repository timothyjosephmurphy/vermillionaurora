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
  assert.ok(boxes.camera.right <= boxes.stage.x + 4, `camera overlaps stage ${boxes.camera.right} vs ${boxes.stage.x}`);
  assert.ok(boxes.camera.h > 70 && boxes.stage.h > 70, `short panes camera ${boxes.camera.h} stage ${boxes.stage.h}`);
  assert.ok(Math.abs(boxes.camera.y - boxes.stage.y) < 8, 'camera and stage are not side by side');
  assert.ok(boxes.sliders.y >= boxes.stage.bottom - 4, `gravity slider is not below the stage ${boxes.sliders.y} vs ${boxes.stage.bottom}`);
  assert.ok(boxes.quiet.y < 390 && boxes.quiet.y >= boxes.stage.bottom - 4, `quiet slider not reachable ${boxes.quiet.y}`);
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
    return {
      exitHit: exit.contains(top) || top === exit,
      mapping: document.getElementById('nd-room-lab').classList.contains('is-mapping'),
      sliderTop: slider.top,
      stageBottom: document.getElementById('nd-room-projector').getBoundingClientRect().bottom
    };
  });
  assert.equal(during.exitHit, true, 'Exit align is covered');
  assert.equal(during.mapping, false, 'maptastic mapping trapped the page');
  assert.ok(during.sliderTop >= during.stageBottom - 4);
  await page.screenshot({path: '/opt/cursor/artifacts/neural-dance-live-align.png'});
  await page.click('[data-live="exit-align"]');
  await page.waitForFunction(() => !document.body.classList.contains('nd-live-aligning') && document.querySelector('[data-cal-pattern]').hidden === true);

  await page.setViewportSize({width: 390, height: 844});
  const portrait = await page.evaluate(() => {
    const stage = document.getElementById('nd-room-projector').getBoundingClientRect();
    const camera = document.getElementById('nd-camera-mode').getBoundingClientRect();
    const details = document.querySelector('.nd-live-details').getBoundingClientRect();
    return {stageBottom: stage.bottom, cameraTop: camera.top, cameraBottom: camera.bottom, detailsTop: details.top, detailsBottom: details.bottom, cameraH: camera.height};
  });
  assert.ok(portrait.cameraTop >= portrait.stageBottom - 4, 'portrait should stack the camera under the stage');
  assert.ok(portrait.detailsTop >= portrait.cameraBottom - 4, `sliders overlap the camera ${portrait.detailsTop} vs ${portrait.cameraBottom}`);
  assert.ok(portrait.detailsBottom <= 846 && portrait.detailsTop < 844, `slider tray offscreen ${portrait.detailsTop}-${portrait.detailsBottom}`);
  await page.locator('[data-control="quiet"]').scrollIntoViewIfNeeded();
  const quietBox = await page.locator('[data-control="quiet"]').boundingBox();
  assert.ok(quietBox.y >= 0 && quietBox.y < 844, `quiet slider not reachable in portrait ${quietBox.y}`);
  assert.ok(portrait.cameraH > 40);
} finally {
  await browser.close();
  await new Promise(r => server.close(r));
}
