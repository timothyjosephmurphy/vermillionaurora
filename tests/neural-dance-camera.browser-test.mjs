// The camera preview has to play a real frame. A canvas stream stands in for
// Continuity Camera: pink paint, deviceId "iPhone (3) Camera", no resolution constraint.
import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {extname, join} from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const mime = {'.html': 'text/html', '.js': 'text/javascript'};
const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://127.0.0.1');
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
const browser = await chromium.launch();
try {
  const page = await browser.newPage({viewport: {width: 900, height: 700}});
  await page.goto(origin + '/tests/fixtures/neural-dance-camera.html', {waitUntil: 'load'});
  await page.evaluate(() => {
    const paint = document.createElement('canvas');
    paint.width = 320;
    paint.height = 180;
    const ctx = paint.getContext('2d');
    const draw = () => {
      ctx.fillStyle = '#080910';
      ctx.fillRect(0, 0, 320, 180);
      ctx.fillStyle = 'rgb(242, 36, 139)';
      ctx.fillRect(103, 55, 24, 20);
      requestAnimationFrame(draw);
    };
    draw();
    const stream = paint.captureStream(15);
    window.__calls = [];
    navigator.mediaDevices.getUserMedia = async constraints => {
      window.__calls.push(constraints);
      if (constraints.video && constraints.video.deviceId && constraints.video.deviceId.exact && constraints.video.deviceId.exact !== 'phone') {
        throw Object.assign(new Error('over'), {name: 'OverconstrainedError'});
      }
      return stream;
    };
    navigator.mediaDevices.enumerateDevices = async () => [
      {kind: 'videoinput', deviceId: 'facetime', label: 'FaceTime HD Camera'},
      {kind: 'videoinput', deviceId: 'phone', label: 'iPhone (3) Camera'}
    ];
  });
  await page.click('[data-action="camera"]');
  await page.waitForFunction(() => {
    const video = document.querySelector('[data-preview]');
    return video && video.videoWidth > 0 && video.readyState >= 2 && video.paused === false && video.muted === true && video.playsInline === true && video.currentTime > 0;
  });
  const chosen = await page.evaluate(() => {
    const calls = window.__calls;
    const exact = calls.find(c => c.video && c.video.deviceId && c.video.deviceId.exact === 'phone');
    const video = document.querySelector('[data-preview]');
    return {
      exact: exact || null,
      audio: calls.every(c => c.audio === false),
      sized: calls.some(c => c.video && ('width' in c.video || 'height' in c.video)),
      first: calls[0] && calls[0].video,
      label: document.querySelector('[data-control="device"]').selectedOptions[0].textContent,
      width: video.videoWidth,
      currentTime: video.currentTime
    };
  });
  assert.deepEqual(chosen.first, {facingMode: {ideal: 'environment'}});
  assert.ok(chosen.exact, 'exact deviceId was requested for iPhone (3) Camera');
  assert.equal(chosen.exact.audio, false);
  assert.equal('width' in chosen.exact.video, false);
  assert.equal('height' in chosen.exact.video, false);
  assert.equal(chosen.sized, false);
  assert.equal(chosen.audio, true);
  assert.equal(chosen.label, 'iPhone (3) Camera');
  assert.equal(chosen.width, 320);
  assert.ok(chosen.currentTime > 0, 'a frame was presented');

  await page.waitForFunction(() => {
    const overlay = document.querySelector('[data-overlay]');
    if (!overlay.width || !overlay.height) return false;
    const data = overlay.getContext('2d').getImageData(0, 0, overlay.width, overlay.height).data;
    let pink = 0;
    for (let i = 0; i < data.length; i += 16) {
      if (data[i] > 180 && data[i + 2] > 80 && data[i + 1] < 130) pink++;
    }
    return pink > 8;
  });

  await page.click('[data-action="calibrate"]');
  const box = await page.locator('[data-overlay]').boundingBox();
  assert.ok(box && box.width > 100);
  const corners = [
    [box.x + 12, box.y + 12],
    [box.x + box.width - 12, box.y + 12],
    [box.x + box.width - 12, box.y + box.height - 12],
    [box.x + 12, box.y + box.height - 12]
  ];
  for (const [x, y] of corners) await page.mouse.click(x, y);
  await page.click('[data-action="markers"]');
  await page.waitForFunction(() => Array.isArray(window.__markers) && window.__markers.length === 1, {timeout: 4000});
  const marker = await page.evaluate(() => window.__markers[0]);
  assert.equal(marker.type, 0);
  assert.ok(marker.x > 150 && marker.x < 700, `projected x ${marker.x}`);
  assert.ok(marker.y > 50 && marker.y < 450, `projected y ${marker.y}`);
  assert.ok(await page.evaluate(() => window.__pokes > 0));

  const ios = await browser.newPage({viewport: {width: 900, height: 700}});
  await ios.addInitScript(() => {
    localStorage.setItem('nd.camera.v1', JSON.stringify({deviceId: 'front', deviceLabel: 'Front Camera', hueTolerance: 5, saturationSensitivity: 0}));
  });
  await ios.goto(origin + '/tests/fixtures/neural-dance-camera.html', {waitUntil: 'load'});
  await ios.evaluate(() => {
    const paint = document.createElement('canvas');
    paint.width = 160;
    paint.height = 90;
    const ctx = paint.getContext('2d');
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, 160, 90);
    const stream = paint.captureStream(5);
    navigator.mediaDevices.getUserMedia = async () => stream;
    navigator.mediaDevices.enumerateDevices = async () => [
      {kind: 'videoinput', deviceId: 'front', label: 'Front Camera'},
      {kind: 'videoinput', deviceId: 'ultra', label: 'Back Ultra Wide Camera'},
      {kind: 'videoinput', deviceId: 'back', label: 'Back Camera'},
      {kind: 'videoinput', deviceId: 'tele', label: 'Back Telephoto Camera'}
    ];
  });
  await ios.click('[data-action="camera"]');
  await ios.waitForFunction(() => {
    const selected = document.querySelector('[data-control="device"]');
    return selected && selected.selectedOptions[0] && selected.selectedOptions[0].textContent === 'Back Camera';
  });
  const picked = await ios.evaluate(() => document.querySelector('[data-control="device"]').selectedOptions[0].textContent);
  assert.equal(picked, 'Back Camera');
  await ios.close();
} finally {
  await browser.close();
  await new Promise(r => server.close(r));
}
