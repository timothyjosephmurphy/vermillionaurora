// Renders static/brand/neural-dance-share.jpg from the live Neural Dance stage.
// The dancers, sacred-geometry field, and colors come from neural-dance/room-lab.js
// and neural-dance.wasm. Glowing rings use NeuralDanceRings.radialWavePoint with a
// stand-in waveform so the card shows the rings without a microphone.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { chromium } from 'playwright';
import sharp from 'sharp';

const root = new URL('..', import.meta.url).pathname;
const mime = { '.js': 'text/javascript', '.wasm': 'application/wasm', '.html': 'text/html; charset=utf-8' };
const pageHtml = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<style>
  html,body{margin:0;background:#080910}
  #nd-room-lab{--background:#080910;--foreground:#f4f6fb;--viz-series-1:#ff927d;--viz-series-2:#eb92f5;--viz-series-3:#7fe8b3;--viz-series-4:#81b7fc}
  [data-stage]{display:block;width:1200px;height:744px;background:#080910}
  [data-spectrum],button,span,select,input{position:absolute;left:-9999px}
</style></head><body>
<section id="nd-room-lab" data-mic="off">
  <canvas data-stage width="1200" height="744"></canvas>
  <canvas data-spectrum width="320" height="72"></canvas>
  <button type="button" data-action="play">Start</button>
  <button type="button" data-action="listen">Listen</button>
  <button type="button" data-action="align">Align</button>
  <span data-status></span><span data-mic></span><span data-floor></span>
  <span data-legend="0"></span><span data-legend="1"></span><span data-legend="2"></span><span data-legend="3"></span>
  <input data-control="gravity" type="range" value="2.5">
  <input data-control="wander" type="range" value="0.25">
  <input data-control="threshold" type="range" value="1.4">
  <input data-control="peak" type="range" value="2.8">
  <input data-control="quiet" type="range" value="0.08">
  <select data-control="type"><option value="1">Bass</option></select>
</section>
<script src="/neural-dance/silence-gate.js"></script>
<script src="/neural-dance/wave-ring.js"></script>
<script type="module" src="/neural-dance/room-lab.js"></script>
</body></html>`;

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://127.0.0.1');
    if (url.pathname === '/share.html') {
      res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
      res.end(pageHtml);
      return;
    }
    const file = join(root, decodeURIComponent(url.pathname));
    if (!file.startsWith(root)) { res.writeHead(403); return res.end(); }
    const body = await readFile(file);
    res.writeHead(200, { 'content-type': mime[extname(file)] || 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(404);
    res.end('missing');
  }
});
await new Promise(r => server.listen(0, '127.0.0.1', r));
const origin = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch();
try {
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 2 });
  const page = await context.newPage();
  page.on('pageerror', error => console.error('pageerror', error.message));
  await page.addInitScript(() => {
    Object.defineProperty(window, 'NeuralDanceRings', {
      configurable: true,
      set(api) {
        const create = api.createSession;
        api.createSession = function () {
          const session = create.call(api);
          session.stroke = (ctx, x, y, radius, band, color) => {
            const ring = Math.max(radius * 3.4, 62);
            const n = 96;
            ctx.save();
            ctx.shadowColor = color || '#fff';
            ctx.shadowBlur = 18;
            ctx.beginPath();
            ctx.strokeStyle = color || '#fff';
            ctx.globalAlpha = 0.95;
            ctx.lineWidth = 2.2;
            ctx.lineJoin = 'round';
            for (let i = 0; i <= n; i++) {
              const sample = Math.sin((i / n) * Math.PI * 10 + band * 1.3) * 0.42
                + Math.sin((i / n) * Math.PI * 3 + band) * 0.18;
              const p = api.radialWavePoint(x, y, ring, (i / n) * Math.PI * 2, sample);
              if (i) ctx.lineTo(p[0], p[1]);
              else ctx.moveTo(p[0], p[1]);
            }
            ctx.closePath();
            ctx.stroke();
            ctx.restore();
          };
          return session;
        };
        Object.defineProperty(window, 'NeuralDanceRings', { value: api, writable: true, configurable: true });
      },
    });
  });
  await page.goto(origin + '/share.html', { waitUntil: 'load' });
  await page.waitForFunction(() => document.getElementById('nd-room-lab')?.dataset.roomReady === '1', null, { timeout: 20000 });
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  const png = await page.locator('[data-stage]').screenshot({ type: 'png' });
  const title = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#080910" stop-opacity="0"/>
      <stop offset="1" stop-color="#080910" stop-opacity="0.62"/>
    </linearGradient></defs>
    <rect x="0" y="500" width="1200" height="130" fill="url(#fade)"/>
    <text x="56" y="578" fill="#f4f6fb" fill-opacity="0.92" font-family="Georgia, 'Times New Roman', serif" font-size="44">Neural Dance</text>
  </svg>`);
  const out = join(root, 'static/brand/neural-dance-share.jpg');
  let quality = 78;
  let bytes;
  for (; quality >= 50; quality -= 6) {
    bytes = await sharp(png)
      .resize(1200, 630, { fit: 'cover', position: 'centre' })
      .composite([{ input: title, top: 0, left: 0 }])
      .jpeg({ quality, mozjpeg: true })
      .toBuffer();
    if (bytes.length < 150 * 1024) break;
  }
  await sharp(bytes).toFile(out);
  console.log(`wrote ${out} ${bytes.length} bytes q=${quality}`);
} finally {
  await browser.close();
  server.close();
}
