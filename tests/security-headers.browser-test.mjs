// Security headers on static HTML, and the pages that must keep loading under them.
// Report-only CSP must not block /cart/, the /play/ shell (same-origin /play/g frame),
// or /neural-dance/live/ (wasm, and a policy that still allows camera and microphone).
import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { SITE_SECURITY_HEADERS } from '../worker/security-headers.mjs';

const root = new URL('../dist', import.meta.url).pathname;
const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.woff2': 'font/woff2', '.wasm': 'application/wasm', '.ico': 'image/x-icon' };

function headerRules(text) {
  const rules = [];
  let current = null;
  for (const line of text.split(/\r?\n/)) {
    if (!line.trim() || line.trim().startsWith('#')) continue;
    if (!/^[ \t]/.test(line)) {
      current = { path: line.trim(), headers: {} };
      rules.push(current);
    } else if (current) {
      const match = line.match(/^[ \t]+([^:]+):\s*(.*)$/);
      if (match) current.headers[match[1]] = match[2];
    }
  }
  return rules;
}

const rules = headerRules(readFileSync(new URL('../static/_headers', import.meta.url), 'utf8'));
function headersFor(pathname) {
  const headers = {};
  for (const rule of rules) {
    const pattern = rule.path
      .replace(/[.+?^${}()|[\]\\]/g, '\\$&')
      .replace(/\*/g, '.*');
    if (new RegExp(`^${pattern}$`).test(pathname)) Object.assign(headers, rule.headers);
  }
  return headers;
}

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://127.0.0.1');
    let path = decodeURIComponent(url.pathname);
    const headers = headersFor(path);
    if (path.endsWith('/')) path += 'index.html';
    const file = join(root, path);
    if (!file.startsWith(root)) { res.writeHead(403); return res.end(); }
    const body = await readFile(file);
    res.writeHead(200, { ...headers, 'content-type': mime[extname(file)] || 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(404, headersFor(new URL(req.url, 'http://127.0.0.1').pathname));
    res.end('missing');
  }
});
await new Promise(r => server.listen(0, '127.0.0.1', r));
const origin = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch();

function blocked(failure) {
  return /blocked|csp/i.test(failure || '');
}

try {
  for (const path of ['/cart/', '/play/', '/blog/walk-my-paintings-3d-gallery/', '/products/strawberry-point-11/']) {
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    const refused = [];
    const cspBlocked = [];
    page.on('console', msg => { if (/^Refused to /i.test(msg.text())) refused.push(msg.text()); });
    page.on('requestfailed', req => { if (blocked(req.failure()?.errorText)) cspBlocked.push(req.url()); });
    const response = await page.goto(origin + path, { waitUntil: 'domcontentloaded', timeout: 60000 });
    assert.equal(response.status(), 200, path);
    for (const [name, value] of Object.entries(SITE_SECURITY_HEADERS)) {
      assert.equal(response.headers()[name.toLowerCase()], value, `${path} ${name}`);
    }
    assert.equal(response.headers()['content-security-policy'], undefined, `${path} must not enforce CSP`);
    if (path === '/play/') {
      await page.waitForFunction(() => document.querySelector('iframe.g')?.contentDocument?.documentElement?.lang === 'en', null, { timeout: 60000 });
    }
    if (path === '/blog/walk-my-paintings-3d-gallery/') {
      const posting = await page.evaluate(() => {
        const nodes = [...document.querySelectorAll('script[type="application/ld+json"]')];
        return nodes.map(node => JSON.parse(node.textContent)).find(data => data['@type'] === 'BlogPosting');
      });
      assert.equal(posting.headline, 'Walk My 206 Paintings in 3D');
      assert.equal(posting.author.name, 'TJ Murphy');
      assert.equal(posting.author.url, 'https://tjm.art/about/');
    }
    if (path === '/products/strawberry-point-11/') {
      const label = await page.locator('a.painting-image-trigger').getAttribute('aria-label');
      const visible = await page.locator('.painting-image-hint').evaluate(el => [...el.childNodes].filter(node => node.nodeType === Node.TEXT_NODE).map(node => node.textContent).join('').replace(/\s+/g, ' ').trim());
      assert.equal(visible, 'View full screen');
      assert.ok(label.startsWith(`${visible}:`), label);
      const levels = await page.evaluate(() => [...document.querySelectorAll('h1,h2,h3,h4')].map(el => Number(el.tagName[1])));
      let previous = 0;
      for (const level of levels) {
        assert.ok(level <= previous + 1, `heading jumped to h${level} after h${previous}`);
        previous = level;
      }
    }
    assert.deepEqual(cspBlocked, [], `${path} blocked ${cspBlocked.join(', ')}`);
    assert.deepEqual(refused, [], `${path} refused ${refused.join(' | ')}`);
    await ctx.close();
  }
  console.log('security headers ok');
} finally {
  await browser.close();
  server.close();
}
