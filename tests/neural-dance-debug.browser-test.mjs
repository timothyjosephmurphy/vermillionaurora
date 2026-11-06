// Share live debug stays off until asked, then the viewer page and a tuning banner work.
import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {extname, join} from 'node:path';
import {mkdirSync} from 'node:fs';

const root = new URL('..', import.meta.url).pathname;
const mime = {'.html': 'text/html', '.js': 'text/javascript', '.wasm': 'application/wasm', '.css': 'text/css'};

function pageHtml(source) {
  return source.replace(/^---[\s\S]*?---\n/, '').replace(/<BaseLayout\b[^>]*\/?>\s*/g, '');
}

const liveHtml = pageHtml(await readFile(new URL('../src/pages/neural-dance/live/index.astro', import.meta.url), 'utf8'));
const debugHtml = pageHtml(await readFile(new URL('../src/pages/neural-dance/debug/index.astro', import.meta.url), 'utf8'));
const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://127.0.0.1');
    if (url.pathname === '/neural-dance/live/' || url.pathname === '/neural-dance/live/index.html') {
      res.writeHead(200, {'content-type': 'text/html', 'cache-control': 'no-store'});
      return res.end(liveHtml);
    }
    if (url.pathname === '/neural-dance/debug/' || url.pathname === '/neural-dance/debug/index.html') {
      res.writeHead(200, {'content-type': 'text/html', 'cache-control': 'no-store'});
      return res.end(debugHtml);
    }
    const path = decodeURIComponent(url.pathname);
    const file = join(root, path);
    if (!file.startsWith(root)) { res.writeHead(403); return res.end(); }
    const body = await readFile(file);
    res.writeHead(200, {'content-type': mime[extname(file)] || 'application/octet-stream', 'cache-control': 'no-store'});
    res.end(body);
  } catch { res.writeHead(404); res.end('missing'); }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
mkdirSync('/opt/cursor/artifacts', {recursive: true});
const browser = await chromium.launch();
try {
  const page = await browser.newPage({viewport: {width: 1280, height: 900}});
  await page.addInitScript(() => {
    window.__ndWs = [];
    window.__ndFetch = [];
    const original = window.fetch;
    window.fetch = function (input, init) {
      const url = typeof input === 'string' ? input : (input && input.url) || '';
      if (String(url).includes('/api/neural-dance/debug/')) window.__ndFetch.push(String(url));
      return original.apply(this, arguments);
    };
    class Sock {
      constructor(url) {
        this.url = url;
        this.readyState = 1;
        this.sent = [];
        window.__ndWs.push(this);
      }
      send(data) { this.sent.push(String(data)); }
      close() { this.readyState = 3; if (this.onclose) this.onclose({}); }
    }
    window.WebSocket = Sock;
  });
  await page.goto(origin + '/neural-dance/live/', {waitUntil: 'load'});
  await page.waitForFunction(() => document.body.dataset.debugReady === '1' && document.getElementById('nd-room-lab')?.dataset.roomReady === '1');
  const before = await page.evaluate(() => ({
    pressed: document.querySelector('[data-debug-share]').getAttribute('aria-pressed'),
    label: document.querySelector('[data-debug-share]').textContent,
    panel: document.querySelector('[data-debug-panel]').hidden,
    auto: document.querySelector('[data-debug-auto]').checked,
    sockets: window.__ndWs.length,
    fetches: window.__ndFetch.length
  }));
  assert.equal(before.pressed, 'false');
  assert.equal(before.label, 'Share live debug');
  assert.equal(before.panel, true);
  assert.equal(before.auto, true);
  assert.equal(before.sockets, 0);
  assert.equal(before.fetches, 0);

  await page.locator('[data-debug-share]').click();
  await page.waitForFunction(() => window.__ndWs.some(socket => socket.sent.some(body => body.includes('"type":"frame"'))));
  const shared = await page.evaluate(() => {
    const link = document.querySelector('[data-debug-link]');
    return {
      pressed: document.querySelector('[data-debug-share]').getAttribute('aria-pressed'),
      code: document.querySelector('[data-debug-code]').textContent,
      href: link.getAttribute('href'),
      hidden: document.querySelector('[data-debug-panel]').hidden,
      socket: window.__ndWs[0].url
    };
  });
  assert.equal(shared.pressed, 'true');
  assert.equal(shared.hidden, false);
  assert.match(shared.code, /^ND-[ABCDEFGHJKLMNPQRSTUVWXYZ23456789]{6}$/);
  assert.match(shared.href, new RegExp('/neural-dance/debug/\\?room=' + shared.code + '&key='));
  assert.equal(shared.href.includes('secret'), false);
  assert.match(shared.socket, /role=publisher/);
  assert.match(shared.socket, /secret=/);
  await page.screenshot({path: '/opt/cursor/artifacts/neural-dance-debug-share.png'});

  await page.evaluate(() => {
    const socket = window.__ndWs[0];
    socket.onmessage({data: JSON.stringify({
      type: 'propose_patch',
      patchId: 1,
      pendingPatch: {id: 1, at: 10, patch: {noteSensitivity: 0.91, quietThreshold: 0.22}}
    })});
  });
  await page.waitForFunction(() => document.querySelector('[data-control="sat"]').value === '0.91' && document.querySelector('[data-debug-banner]').hidden === true);
  const applied = await page.evaluate(() => ({
    note: document.querySelector('[data-control="sat"]').value,
    quiet: document.querySelector('[data-control="quiet"]').value,
    size: document.querySelector('[data-control="size"]').value
  }));
  assert.equal(applied.note, '0.91');
  assert.equal(applied.quiet, '0.22');
  assert.equal(applied.size, '22');
  await page.locator('[data-debug-auto]').uncheck();

  await page.evaluate(() => {
    window.__ndWs[0].onmessage({data: JSON.stringify({
      type: 'propose_patch',
      patchId: 2,
      pendingPatch: {id: 2, at: 11, patch: {minBlobSize: 40}}
    })});
  });
  await page.waitForFunction(() => document.querySelector('[data-debug-banner]').hidden === false);
  assert.match(await page.locator('[data-debug-banner-text]').innerText(), /Suggested tuning received/);
  await page.locator('[data-debug-dismiss]').click();
  assert.equal(await page.locator('[data-control="size"]').inputValue(), '22');
  assert.equal(await page.locator('[data-debug-banner]').isHidden(), true);

  await page.goto(origin + shared.href, {waitUntil: 'load'});
  await page.waitForFunction(() => document.body.dataset.viewerReady === '1' && document.querySelector('[data-debug-app]').hidden === false);
  const viewer = await page.evaluate(() => ({
    robots: document.querySelector('meta[name="robots"]').content,
    title: document.querySelector('h1').textContent,
    camera: document.querySelector('[data-debug-camera]').width,
    stage: document.querySelector('[data-debug-stage]').getAttribute('width'),
    missing: document.querySelector('[data-debug-missing]').hidden,
    header: document.querySelector('.site-header, footer')
  }));
  assert.match(viewer.robots, /noindex/);
  assert.match(viewer.title, /Neural Dance debug/);
  assert.equal(viewer.camera, 480);
  assert.equal(viewer.stage, '480');
  assert.equal(viewer.missing, true);
  assert.equal(viewer.header, null);
  await page.evaluate(() => {
    const socket = window.__ndWs.at(-1);
    socket.onmessage({data: JSON.stringify({
      type: 'frame',
      telemetry: {
        t: 1, fps: 8, videoWidth: 1920, videoHeight: 1080, detectWidth: 480, detectHeight: 253,
        cameraLabel: 'iPhone Camera', facingMode: 'environment', aligned: true,
        quad: [{x: 0.1, y: 0.1}, {x: 0.9, y: 0.1}, {x: 0.9, y: 0.9}, {x: 0.1, y: 0.9}],
        quadMedianRgb: [40, 50, 60],
        pink: [{grid: [120, 80], stage: [200, 140], area: 42, rgb: [240, 180, 210], luminanceRatio: 1.4}],
        stickers: [{grid: [300, 100], stage: [640, 220], area: 18, rgb: [12, 14, 16], luminanceRatio: 0.2}],
        markers: [{id: 1, x: 200, y: 140, kind: 'pink'}],
        audio: {source: 'mic', kick: 0.4, bass: 0.7, snare: 0.2, hat: 0.1, silenceGate: false, noiseFloor: 0.04, micGain: 1},
        controls: {markerMode: 'both', noteSensitivity: 0.91, stickerSensitivity: 0.5, hueTolerance: 48, minBlobSize: 18, maxBlobSize: 160, quietThreshold: 0.22}
      }
    })});
  });
  await page.waitForFunction(() => document.querySelector('[data-debug-summary]').textContent.includes('iPhone Camera'));
  assert.match(await page.locator('[data-debug-summary]').innerText(), /quad RGB 40 50 60/);
  assert.match(await page.locator('[data-debug-table]').innerText(), /pink/);
  assert.match(await page.locator('[data-debug-gate]').innerText(), /open/);
  await page.locator('[data-debug-send]').click();
  const proposed = await page.evaluate(() => window.__ndWs.some(socket => socket.sent.some(body => body.includes('propose_patch') && body.includes('noteSensitivity'))));
  assert.equal(proposed, true);
  assert.equal(await page.locator('[data-debug-action="align"]').count(), 1);
  assert.equal(await page.locator('[data-debug-action="clear-sim"]').count(), 1);
  assert.equal(await page.locator('[data-debug-action="sim-seed"]').count(), 1);
  assert.equal(await page.locator('[data-debug-control="gravity"]').count(), 1);
  await page.locator('[data-debug-action="clear-sim"]').click();
  const cleared = await page.evaluate(() => window.__ndWs.some(socket => socket.sent.some(body => body.includes('clear-sim'))));
  assert.equal(cleared, true);
  await page.locator('[data-debug-stage]').click({position: {x: 80, y: 60}});
  const added = await page.evaluate(() => window.__ndWs.some(socket => socket.sent.some(body => body.includes('add-sim'))));
  assert.equal(added, true);
  await page.screenshot({path: '/opt/cursor/artifacts/neural-dance-debug-viewer.png'});

  await page.goto(origin + '/neural-dance/debug/', {waitUntil: 'load'});
  const bare = await page.evaluate(() => ({
    missing: document.querySelector('[data-debug-missing]').hidden === false,
    app: document.querySelector('[data-debug-app]').hidden,
    sockets: window.__ndWs.length,
    fetches: window.__ndFetch.length
  }));
  assert.equal(bare.missing, true);
  assert.equal(bare.app, true);
  assert.equal(bare.sockets, 0);
  assert.equal(bare.fetches, 0);
} finally {
  await browser.close();
  await new Promise(resolve => server.close(resolve));
}
