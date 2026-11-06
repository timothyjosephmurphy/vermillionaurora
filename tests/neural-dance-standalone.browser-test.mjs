// iPhone Home Screen: the site header is gone and the Neural Dance stage fills the phone.
import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import fs from 'node:fs';
import {extname, join} from 'node:path';
import {mkdirSync} from 'node:fs';

const root = join(new URL('..', import.meta.url).pathname, 'dist');
assert.ok(fs.existsSync(join(root, 'neural-dance/index.html')), 'Run npm run build first');
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.wasm': 'application/wasm',
  '.webmanifest': 'application/manifest+json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};
const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://127.0.0.1');
    let pathname = decodeURIComponent(url.pathname);
    if (pathname.endsWith('/')) pathname += 'index.html';
    const file = join(root, pathname);
    if (!file.startsWith(root)) { res.writeHead(403); return res.end(); }
    const body = await readFile(file);
    res.writeHead(200, {'content-type': mime[extname(file)] || 'application/octet-stream', 'cache-control': 'no-store'});
    res.end(body);
  } catch { res.writeHead(404); res.end('missing'); }
});
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
mkdirSync('/opt/cursor/artifacts', {recursive: true});

async function hit(page, selector) {
  const found = await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return {ok: false, reason: 'missing'};
    el.scrollIntoView({block: 'center', inline: 'center'});
    const style = getComputedStyle(el);
    if (style.display === 'none' || style.visibility === 'hidden') return {ok: false, reason: 'hidden'};
    const rect = el.getBoundingClientRect();
    const x = Math.min(Math.max(rect.x + Math.min(rect.width / 2, 12), 1), window.innerWidth - 2);
    const y = Math.min(Math.max(rect.y + rect.height / 2, 1), window.innerHeight - 2);
    const top = document.elementFromPoint(x, y);
    return {
      ok: !!top && (el === top || el.contains(top) || top.contains(el)),
      reason: top ? top.tagName + '.' + (top.className || top.id || '') : 'none',
      box: {x: rect.x, y: rect.y, w: rect.width, h: rect.height},
    };
  }, selector);
  assert.equal(found.ok, true, `${selector} is not clickable (${found.reason})`);
}

const browser = await chromium.launch({
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
  ...(process.env.CHROMIUM_EXECUTABLE ? {executablePath: process.env.CHROMIUM_EXECUTABLE} : {}),
});
try {
  const open = await browser.newPage({viewport: {width: 844, height: 390}});
  await open.goto(origin + '/neural-dance/', {waitUntil: 'domcontentloaded'});
  const shown = await open.evaluate(() => getComputedStyle(document.querySelector('.site-header')).display);
  assert.notEqual(shown, 'none');
  assert.equal(await open.evaluate(() => document.documentElement.classList.contains('nd-standalone')), false);
  await open.close();

  const page = await browser.newPage({viewport: {width: 844, height: 390}});
  await page.addInitScript(() => {
    Object.defineProperty(Navigator.prototype, 'standalone', {configurable: true, get: () => true});
  });
  await page.goto(origin + '/neural-dance/', {waitUntil: 'domcontentloaded'});
  await page.waitForSelector('.site-header');
  const standalone = await page.evaluate(() => {
    const header = document.querySelector('.site-header');
    const stage = document.querySelector('#nd-room-projector');
    const rect = stage.getBoundingClientRect();
    return {
      className: document.documentElement.classList.contains('nd-standalone'),
      header: getComputedStyle(header).display,
      footer: document.querySelector('.site-footer') ? getComputedStyle(document.querySelector('.site-footer')).display : 'absent',
      stage: {x: rect.x, y: rect.y, w: rect.width, h: rect.height},
      view: {w: window.innerWidth, h: window.innerHeight},
      back: getComputedStyle(document.querySelector('a.back')).display,
      story: getComputedStyle(document.querySelector('.project-story')).display,
    };
  });
  assert.equal(standalone.className, true);
  assert.equal(standalone.header, 'none');
  assert.equal(standalone.back, 'none');
  assert.equal(standalone.story, 'none');
  assert.ok(standalone.stage.w >= standalone.view.w - 2, `stage width ${standalone.stage.w}`);
  assert.ok(standalone.stage.h >= standalone.view.h - 2, `stage height ${standalone.stage.h}`);
  assert.ok(Math.abs(standalone.stage.x) <= 1 && Math.abs(standalone.stage.y) <= 1);
  await hit(page, '[data-action="listen"]');
  await hit(page, '[data-action="align"]');
  await hit(page, '[data-control="quiet"]');
  await hit(page, '#fullscreen');
  await hit(page, '#nd-camera-mode [data-action="camera"]');
  await page.screenshot({path: '/opt/cursor/artifacts/neural-dance-standalone-landscape.png'});
  await page.close();

  const media = await browser.newPage({viewport: {width: 844, height: 390}, javaScriptEnabled: false});
  const client = await media.context().newCDPSession(media);
  await client.send('Emulation.setEmulatedMedia', {features: [{name: 'display-mode', value: 'standalone'}]});
  await media.goto(origin + '/neural-dance/', {waitUntil: 'domcontentloaded'});
  const cssOnly = await media.evaluate(() => {
    const header = getComputedStyle(document.querySelector('.site-header')).display;
    const rect = document.querySelector('#nd-room-projector').getBoundingClientRect();
    return {header, w: rect.width, h: rect.height, standalone: document.documentElement.classList.contains('nd-standalone')};
  });
  assert.equal(cssOnly.standalone, false);
  assert.equal(cssOnly.header, 'none');
  assert.ok(cssOnly.w >= 840 && cssOnly.h >= 388, `media stage ${cssOnly.w}x${cssOnly.h}`);
  await media.close();
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}
