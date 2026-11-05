// Room-music rings: a kick sine wiggles kick dancers and leaves hi-hat rings round,
// then a hi-hat sine does the opposite. Sensitivities stay at 0 so onsets do not fire.
import {chromium} from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

const root = path.resolve('dist');
const origin = 'https://tjm.art';
assert(fs.existsSync(path.join(root, 'neural-dance/index.html')), 'Run npm run build first');
assert(fs.existsSync(path.join(root, 'neural-dance/wave-ring.js')), 'wave-ring.js missing from dist');
fs.mkdirSync('/opt/cursor/artifacts', {recursive: true});

function prototypePositions() {
  let seed = 0x5eed;
  const rand = () => {
    seed |= 0;
    seed = seed + 0x6D2B79F5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
  const CX = 500, CY = 310, SX = 1.18, SY = 0.72, out = [];
  for (let i = 0; i < 24; i++) {
    const a = rand() * Math.PI * 2, r = 50 + rand() * 260;
    out.push({x: CX + Math.cos(a) * r * SX * 0.94, y: CY + Math.sin(a) * r * SY * 0.94, k: i % 4});
  }
  return out;
}

function isolated(positions, band) {
  let best = null, gap = -1;
  for (const p of positions.filter(d => d.k === band)) {
    const nearest = Math.min(...positions.filter(o => o !== p).map(o => Math.hypot(o.x - p.x, o.y - p.y)));
    if (nearest > gap) { gap = nearest; best = p; }
  }
  assert.ok(best && gap > 40, `band ${band} isolation ${gap}`);
  return best;
}

const positions = prototypePositions();
const kickAt = isolated(positions, 0);
const hatAt = isolated(positions, 3);

const browser = await chromium.launch({
  headless: true,
  args: ['--autoplay-policy=no-user-gesture-required', '--no-sandbox', '--disable-dev-shm-usage'],
  ...(process.env.CHROMIUM_EXECUTABLE ? {executablePath: process.env.CHROMIUM_EXECUTABLE} : {}),
});
const page = await browser.newPage({viewport: {width: 1280, height: 900}});
const errors = [];
page.on('pageerror', e => errors.push(e.message));
await page.addInitScript(() => {
  const origRead = AnalyserNode.prototype.getFloatTimeDomainData;
  let reads = 0;
  const rmsLog = [];
  AnalyserNode.prototype.getFloatTimeDomainData = function (arr) {
    reads++;
    origRead.call(this, arr);
    let sum = 0;
    for (let i = 0; i < arr.length; i++) sum += arr[i] * arr[i];
    const rms = Math.sqrt(sum / arr.length);
    rmsLog.push(Number(rms.toFixed(4)));
    if (rmsLog.length > 16) rmsLog.shift();
  };
  window.__rmsLog = () => rmsLog.slice();
  const origFilter = AudioContext.prototype.createBiquadFilter;
  let filters = 0;
  AudioContext.prototype.createBiquadFilter = function () {
    filters++;
    return origFilter.call(this);
  };
  window.__waveReads = () => reads;
  window.__biquads = () => filters;
  navigator.mediaDevices.getUserMedia = async () => {
    const ac = new AudioContext();
    await ac.resume();
    const o = ac.createOscillator();
    o.type = 'sine';
    o.frequency.value = 90;
    const g = ac.createGain();
    g.gain.value = 0.9;
    const dest = ac.createMediaStreamDestination();
    o.connect(g).connect(dest);
    o.start();
    window.__mic = {ac, o};
    return dest.stream;
  };
});
await page.route('**/*', async route => {
  const url = new URL(route.request().url());
  if (url.hostname !== 'tjm.art') return route.abort();
  let file = path.join(root, decodeURIComponent(url.pathname));
  if (url.pathname.endsWith('/')) file = path.join(file, 'index.html');
  if (!file.startsWith(root) || !fs.existsSync(file) || !fs.statSync(file).isFile()) return route.fulfill({status: 404, body: 'missing'});
  const types = {'.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.wasm': 'application/wasm', '.jpeg': 'image/jpeg', '.jpg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.woff2': 'font/woff2', '.svg': 'image/svg+xml'};
  return route.fulfill({body: fs.readFileSync(file), contentType: types[path.extname(file).toLowerCase()] || 'application/octet-stream'});
});

async function measure() {
  return page.locator('#nd-room-lab [data-stage]').evaluate((canvas, points) => {
    const ctx = canvas.getContext('2d');
    const image = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = image.data;
    const width = canvas.width;
    const height = canvas.height;
    const kickMatch = (r, g, b) => r > 170 && g > 80 && g < 210 && b < 180 && r > b + 30;
    const hatMatch = (r, g, b) => b > 170 && r < 200 && g > 90 && b > r + 20;
    function profile(cx, cy, match) {
      const radii = [];
      for (let a = 0; a < 72; a++) {
        const ang = a / 72 * Math.PI * 2;
        const dx = Math.cos(ang), dy = Math.sin(ang);
        const blocked = points.all.some(b => {
          const vx = b.x - cx, vy = b.y - cy;
          const along = vx * dx + vy * dy;
          const side = Math.abs(vx * dy - vy * dx);
          return along > 8 && along < 90 && side < 24;
        });
        if (blocked) continue;
        let found = 0;
        for (let r = 14; r <= 36; r++) {
          const x = Math.round(cx + dx * r);
          const y = Math.round(cy + dy * r);
          if (x < 1 || y < 1 || x >= width - 1 || y >= height - 1) continue;
          const i = (y * width + x) * 4;
          const hit = shift => match(data[i + shift], data[i + shift + 1], data[i + shift + 2]);
          if (hit(0) || hit(4) || hit(-4)) found = r;
        }
        if (found) radii.push(found);
      }
      if (radii.length < 20) return {count: radii.length, std: 0, mean: 0};
      const mean = radii.reduce((s, v) => s + v, 0) / radii.length;
      const variance = radii.reduce((s, v) => s + (v - mean) ** 2, 0) / radii.length;
      return {count: radii.length, std: Math.sqrt(variance), mean};
    }
    return {kick: profile(points.kick.x, points.kick.y, kickMatch), hat: profile(points.hat.x, points.hat.y, hatMatch)};
  }, {kick: kickAt, hat: hatAt, all: positions});
}

try {
  await page.goto(origin + '/neural-dance/', {waitUntil: 'domcontentloaded'});
  await page.waitForFunction(() => /Ready/.test(document.querySelector('#nd-room-lab [data-status]')?.textContent || ''));
  const room = page.locator('#nd-room-lab');
  await room.locator('[data-stage]').scrollIntoViewIfNeeded();
  await room.evaluate(root => {
    for (const input of root.querySelectorAll('[data-control="sens"]')) {
      input.value = '0';
      input.dispatchEvent(new Event('input', {bubbles: true}));
    }
    const gravity = root.querySelector('[data-control="gravity"]');
    gravity.value = '4.2';
    gravity.dispatchEvent(new Event('input', {bubbles: true}));
  });
  assert.equal(await room.locator('[data-value="gravity"]').textContent(), '4.2×');
  assert.equal(await room.locator('[data-value="sens-0"]').textContent(), '0.00×');
  assert.equal(await room.locator('[data-value="sens-3"]').textContent(), '0.00×');
  await room.locator('[data-stage]').evaluate(canvas => canvas.scrollIntoView({block: 'center'}));
  await room.locator('[data-action="play"]').evaluate(button => button.click());
  await room.locator('[data-action="listen"]').evaluate(button => button.click());
  try {
    await page.waitForFunction(() => document.querySelector('#nd-room-lab [data-mic]')?.textContent === 'Listening', {timeout: 8000});
  } catch (error) {
    const info = await page.evaluate(() => {
      const stage = document.querySelector('#nd-room-lab [data-stage]');
      const rect = stage?.getBoundingClientRect();
      return {mic: document.querySelector('#nd-room-lab [data-mic]')?.textContent, status: document.querySelector('#nd-room-lab [data-status]')?.textContent, play: document.querySelector('#nd-room-lab [data-action="play"]')?.textContent, rect: rect && {top: rect.top, bottom: rect.bottom, height: rect.height}, inner: innerHeight};
    });
    throw new Error(`not listening ${JSON.stringify(info)} errors=${errors.join(' | ')} (${error.message})`);
  }
  await page.waitForFunction(() => window.__waveReads() > 20 && window.__biquads() >= 8);
  await page.waitForTimeout(700);
  const kickTone = await measure();
  const kickWave = kickTone.kick;
  const hatQuiet = kickTone.hat;
  await page.locator('#nd-room-lab [data-stage]').screenshot({path: '/opt/cursor/artifacts/neural-dance-kick-ring.png'});
  console.log('kick-tone', await page.evaluate(() => window.__rmsLog()), kickWave, hatQuiet);
  assert.ok(kickWave.std > 3 && kickWave.std > hatQuiet.std + 1.5, `90 Hz kick std ${kickWave.std.toFixed(2)} (n ${kickWave.count}, mean ${kickWave.mean.toFixed(1)}) vs hi-hat ${hatQuiet.std.toFixed(2)} (n ${hatQuiet.count}, mean ${hatQuiet.mean.toFixed(1)})`);
  assert.ok(hatQuiet.std < 2, `hi-hat ring should stay round on a kick, std ${hatQuiet.std}`);

  await page.evaluate(() => { window.__mic.o.frequency.value = 8000; });
  await page.waitForTimeout(800);
  const hatTone = await measure();
  const kickQuiet = hatTone.kick;
  const hatWave = hatTone.hat;
  await page.locator('#nd-room-lab [data-stage]').screenshot({path: '/opt/cursor/artifacts/neural-dance-hihat-ring.png'});
  console.log('hat-tone', await page.evaluate(() => window.__rmsLog()), kickQuiet, hatWave);
  assert.ok(hatWave.std > 3 && hatWave.std > kickQuiet.std + 1.5, `8 kHz hi-hat std ${hatWave.std.toFixed(2)} (n ${hatWave.count}, mean ${hatWave.mean.toFixed(1)}) vs kick ${kickQuiet.std.toFixed(2)} (n ${kickQuiet.count}, mean ${kickQuiet.mean.toFixed(1)})`);
  assert.ok(kickQuiet.std < 2, `kick ring should stay round on a hi-hat, std ${kickQuiet.std}`);

  await page.goto(origin + '/neural-dance/live/', {waitUntil: 'domcontentloaded'});
  await page.waitForFunction(() => /Ready|Running|Listening/.test(document.querySelector('#nd-room-lab [data-status]')?.textContent || ''));
  assert.equal(await page.locator('.site-header, footer').count(), 0);
  assert.equal(await page.locator('#nd-room-lab [data-value="quiet"]').textContent(), '0.08');
  const live = page.locator('#nd-room-lab');
  await live.evaluate(root => {
    for (const input of root.querySelectorAll('[data-control="sens"]')) {
      input.value = '0';
      input.dispatchEvent(new Event('input', {bubbles: true}));
    }
  });
  if ((await live.locator('[data-action="play"]').textContent()).trim() === 'Start') {
    await live.locator('[data-action="play"]').evaluate(button => button.click());
  }
  await live.locator('[data-action="listen"]').evaluate(button => button.click());
  await page.waitForFunction(() => document.querySelector('#nd-room-lab [data-mic]')?.textContent === 'Listening', {timeout: 8000});
  await page.waitForFunction(() => window.__waveReads() > 20 && window.__biquads() >= 8);
  await page.waitForTimeout(700);
  const liveTone = await measure();
  assert.ok(liveTone.kick.std > 3 && liveTone.kick.std > liveTone.hat.std + 1.5, `live page kick std ${liveTone.kick.std.toFixed(2)} vs hi-hat ${liveTone.hat.std.toFixed(2)}`);
  assert.ok(liveTone.hat.std < 2, `live page hi-hat should stay round, std ${liveTone.hat.std}`);
  assert.deepEqual(errors, []);
  console.log(`PASS kick std ${kickWave.std.toFixed(2)} quiet-hat ${hatQuiet.std.toFixed(2)}; hat std ${hatWave.std.toFixed(2)} quiet-kick ${kickQuiet.std.toFixed(2)}`);
} finally {
  await browser.close();
}
