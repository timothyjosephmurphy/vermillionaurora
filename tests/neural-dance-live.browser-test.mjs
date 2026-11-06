// iPhone landscape: camera and the dancer stage sit side by side, and the sliders stay reachable.
import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {extname, join} from 'node:path';
import {mkdirSync} from 'node:fs';

const root = new URL('..', import.meta.url).pathname;
const mime = {'.html': 'text/html', '.js': 'text/javascript', '.wasm': 'application/wasm', '.css': 'text/css'};
const liveHtml = (await readFile(new URL('../src/pages/neural-dance/live/index.astro', import.meta.url), 'utf8')).replace(/^---[\s\S]*?---\n/, '').replace(/<BaseLayout\b[^>]*\/?>\s*/g, '');
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
  await page.evaluate(() => {
    document.body.classList.add('nd-live-hidden');
    const banner = document.querySelector('[data-align-banner]');
    banner.hidden = false;
    banner.textContent = 'Aligning camera to projector grid…';
  });
  const toast = await page.evaluate(() => {
    const banner = document.querySelector('[data-align-banner]');
    const chrome = document.querySelector('.nd-live-chrome');
    const style = getComputedStyle(banner);
    return {
      display: style.display,
      z: style.zIndex,
      chrome: getComputedStyle(chrome).display,
      text: banner.textContent
    };
  });
  assert.notEqual(toast.display, 'none');
  assert.equal(toast.chrome, 'none');
  assert.equal(Number(toast.z) > 1000000, true);
  assert.match(toast.text, /Aligning camera/);
  await page.evaluate(() => document.body.classList.remove('nd-live-hidden'));
  await page.waitForFunction(() => document.getElementById('nd-room-lab')?.dataset.roomReady === '1');
  const boxes = await page.evaluate(() => {
    const box = sel => {
      const el = document.querySelector(sel);
      const r = el.getBoundingClientRect();
      return {x: r.x, y: r.y, w: r.width, h: r.height, right: r.right, bottom: r.bottom};
    };
    const overlaps = (a, b) => a.right > b.x + 1 && b.right > a.x + 1 && a.bottom > b.y + 1 && b.bottom > a.y + 1;
    const chrome = box('.nd-live-chrome');
    const camera = box('#nd-camera-mode');
    return {
      stage: box('#nd-room-projector'),
      camera,
      frame: box('#nd-camera-mode .camera-frame'),
      bar: box('.nd-live-bar'),
      chrome,
      overlap: overlaps(chrome, camera),
      collapsed: document.body.classList.contains('nd-live-collapsed'),
      help: document.querySelector('#nd-room-lab .mural-help, #nd-camera-mode .mural-help'),
      tune: document.querySelector('[data-camera-tune]')?.textContent,
      exit: document.querySelector('[data-live="exit-align"]').hidden,
      header: document.querySelector('.site-header, footer')
    };
  });
  assert.equal(boxes.header, null);
  assert.equal(boxes.help, null);
  assert.equal(boxes.collapsed, true);
  assert.equal(boxes.overlap, false, 'collapsed chrome overlaps the camera');
  assert.equal(boxes.tune, 'Tune');
  assert.ok(boxes.stage.w > 800 && boxes.stage.h > 340, `stage is not full screen ${boxes.stage.w}x${boxes.stage.h}`);
  assert.ok(boxes.camera.w < 420 && boxes.camera.w < boxes.stage.w * 0.55, `camera is not a small preview ${boxes.camera.w}`);
  assert.ok(boxes.camera.right > 700 && boxes.camera.bottom > 300, 'camera preview is not in the corner');
  assert.ok(boxes.frame.h >= 72 && boxes.frame.h <= 84, `camera preview is not a small thumbnail ${boxes.frame.h}`);
  assert.ok(boxes.bar.y < 30 && boxes.bar.h > 16, 'control bar is not at the top');
  assert.equal(boxes.exit, true);
  await page.click('[data-live="collapse"]');
  await page.click('[data-camera-tune]');
  const expanded = await page.evaluate(() => {
    const box = sel => {
      const el = document.querySelector(sel);
      const r = el.getBoundingClientRect();
      return {x: r.x, y: r.y, w: r.width, h: r.height, right: r.right, bottom: r.bottom};
    };
    const overlaps = (a, b) => a.right > b.x + 1 && b.right > a.x + 1 && a.bottom > b.y + 1 && b.bottom > a.y + 1;
    const chrome = box('.nd-live-chrome');
    const camera = box('#nd-camera-mode');
    const sliders = box('[data-control="gravity"]');
    const quiet = box('[data-control="quiet"]');
    return {overlap: overlaps(chrome, camera), sliders, quiet, tuned: document.getElementById('nd-camera-mode').classList.contains('is-tuned')};
  });
  assert.equal(expanded.overlap, false, 'expanded chrome overlaps the camera');
  assert.equal(expanded.tuned, true);
  assert.ok(expanded.sliders.h > 10 && expanded.quiet.h > 10);
  const hit = await page.evaluate(() => {
    const slider = document.querySelector('[data-control="gravity"]');
    const r = slider.getBoundingClientRect();
    const top = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2);
    return slider.contains(top) || top === slider;
  });
  assert.equal(hit, true, 'gravity slider is covered');
  await page.screenshot({path: '/opt/cursor/artifacts/neural-dance-live-landscape.png'});

  await page.click('[data-action="align"]');
  await page.waitForFunction(() => document.body.classList.contains('nd-live-aligning') && document.querySelector('[data-cal-pattern]').hidden === false && document.querySelector('[data-cancel-align]').hidden === false);
  const during = await page.evaluate(() => {
    const cancel = document.querySelector('[data-cancel-align]');
    const r = cancel.getBoundingClientRect();
    const top = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2);
    const pattern = document.querySelector('[data-cal-pattern]');
    const stage = document.getElementById('nd-room-projector').getBoundingClientRect();
    const canvas = document.querySelector('#nd-room-projector [data-stage]');
    const video = document.querySelector('#nd-camera-mode [data-preview]');
    const camera = document.getElementById('nd-camera-mode');
    const banner = document.querySelector('[data-align-banner]');
    const bannerStyle = getComputedStyle(banner);
    return {
      cancelHit: cancel.contains(top) || top === cancel,
      chrome: getComputedStyle(document.querySelector('.nd-live-chrome')).display,
      reveal: getComputedStyle(document.querySelector('.nd-live-reveal')).display,
      cameraTransform: getComputedStyle(camera).transform,
      videoDisplay: getComputedStyle(video).display,
      videoMounted: !!video.parentNode,
      mapping: document.getElementById('nd-room-lab').classList.contains('is-mapping'),
      patternBg: getComputedStyle(pattern).backgroundColor,
      canvasShown: getComputedStyle(canvas).display !== 'none' && canvas.getBoundingClientRect().width > 800,
      stageW: stage.width,
      stageH: stage.height,
      locks: document.querySelectorAll('.nd-note-lock').length,
      bannerBottom: bannerStyle.bottom,
      bannerLeft: bannerStyle.left,
      bannerTop: bannerStyle.top
    };
  });
  assert.equal(during.cancelHit, true, 'Cancel align is covered');
  assert.equal(during.chrome, 'none', 'chrome stays up during align');
  assert.equal(during.reveal, 'none');
  assert.match(during.cameraTransform, /matrix|translate/);
  assert.notEqual(during.videoDisplay, 'none');
  assert.equal(during.videoMounted, true);
  assert.equal(during.mapping, false, 'maptastic mapping trapped the page');
  assert.equal(during.canvasShown, true, 'dancers are hidden during align');
  assert.equal(during.locks, 0);
  assert.ok(during.stageW > 800 && during.stageH > 340);
  assert.ok(during.patternBg === 'rgba(0, 0, 0, 0)' || during.patternBg === 'transparent', `align field is not transparent ${during.patternBg}`);
  assert.notEqual(during.bannerTop, '16px');
  assert.ok(parseFloat(during.bannerLeft) < 40, `banner is not at the left ${during.bannerLeft}`);
  assert.ok(parseFloat(during.bannerBottom) < 40, `banner is not at the bottom ${during.bannerBottom}`);
  await page.screenshot({path: '/opt/cursor/artifacts/neural-dance-live-align.png'});
  await page.click('[data-cancel-align]');
  await page.waitForFunction(() => !document.body.classList.contains('nd-live-aligning') && document.querySelector('[data-cal-pattern]').hidden === true && document.querySelector('[data-cancel-align]').hidden === true);

  async function panels(width, height) {
    await page.setViewportSize({width, height});
    return page.evaluate(() => {
      const box = sel => {
        const el = document.querySelector(sel);
        const r = el.getBoundingClientRect();
        return {x: r.x, y: r.y, w: r.width, h: r.height, right: r.right, bottom: r.bottom, top: r.top};
      };
      const overlaps = (a, b) => a.right > b.x + 1 && b.right > a.x + 1 && a.bottom > b.y + 1 && b.bottom > a.y + 1;
      const chrome = box('.nd-live-chrome');
      const camera = box('#nd-camera-mode');
      const stage = box('#nd-room-projector');
      const bar = box('.nd-live-bar');
      return {stageW: stage.w, stageH: stage.h, cameraW: camera.w, barTop: bar.top, overlap: overlaps(chrome, camera)};
    });
  }
  await page.click('[data-live="collapse"]');
  const portrait = await panels(390, 844);
  assert.ok(portrait.stageW > 370 && portrait.stageH > 800, `portrait stage is not full screen ${portrait.stageW}x${portrait.stageH}`);
  assert.ok(portrait.cameraW < 250, `portrait camera is not a corner preview ${portrait.cameraW}`);
  assert.ok(portrait.barTop < 20);
  assert.equal(portrait.overlap, false, 'portrait chrome overlaps the camera');
  await page.click('[data-live="collapse"]');
  const portraitOpen = await panels(390, 844);
  assert.equal(portraitOpen.overlap, false, 'open portrait chrome overlaps the camera');
  const phone = await panels(402, 874);
  assert.equal(phone.overlap, false, '402×874 chrome overlaps the camera');
  await page.click('[data-live="collapse"]');
  const phoneClosed = await panels(402, 874);
  assert.equal(phoneClosed.overlap, false, 'collapsed 402×874 chrome overlaps the camera');
  await page.setViewportSize({width: 844, height: 390});
  const landscape = await panels(844, 390);
  assert.equal(landscape.overlap, false, 'landscape chrome overlaps the camera');
  await page.setViewportSize({width: 390, height: 844});
  if (!(await page.evaluate(() => document.body.classList.contains('nd-live-collapsed')))) {
    await page.click('[data-live="collapse"]');
  }
  await page.click('[data-live="collapse"]');
  await page.locator('[data-control="quiet"]').scrollIntoViewIfNeeded();
  const quietBox = await page.locator('[data-control="quiet"]').boundingBox();
  assert.ok(quietBox && quietBox.y >= 0 && quietBox.y < 844, `quiet slider not reachable in portrait ${quietBox && quietBox.y}`);
} finally {
  await browser.close();
  await new Promise(r => server.close(r));
}
