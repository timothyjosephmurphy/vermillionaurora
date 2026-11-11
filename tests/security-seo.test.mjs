import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import worker from '../worker/site.mjs';
import { rewritePlayEntryHtml, ensurePlayLang } from '../worker/play-gallery.mjs';
import { CSP_REPORT_ONLY, SITE_SECURITY_HEADERS, withSiteSecurityHeaders } from '../worker/security-headers.mjs';
import { blogPostingScript } from '../scripts/enrich-html-seo.mjs';

const headersFile = fs.readFileSync('static/_headers', 'utf8');

test('static/_headers carries the site security policy and keeps the gallery frame cache rule', () => {
  assert.match(headersFile, /^\/play\/g\/\*\r?\n[ \t]+Cache-Control: public, max-age=0, must-revalidate, no-transform\s*$/m);
  for (const [name, value] of Object.entries(SITE_SECURITY_HEADERS)) {
    assert.ok(headersFile.includes(`${name}: ${value}`), name);
  }
  assert.equal(headersFile.includes('Content-Security-Policy:'), false);
  assert.ok(CSP_REPORT_ONLY.includes("frame-ancestors 'self'"));
  assert.ok(CSP_REPORT_ONLY.includes("'unsafe-inline'"));
  assert.ok(CSP_REPORT_ONLY.includes("'wasm-unsafe-eval'"));
  for (const host of ['https://web.squarecdn.com', 'https://js.squareup.com', 'https://pci-connect.squareup.com', 'https://applepay.cdn-apple.com', 'https://static.cloudflareinsights.com', 'https://img.tjm.art', 'https://media.vermillionaurora.com', 'https://pay.tjm.art', 'https://vermillion-nostr-publisher.timothyjosephmurphy.workers.dev', 'blob:', 'mediastream:']) {
    assert.ok(CSP_REPORT_ONLY.includes(host), host);
  }
});

test('Worker HTML responses gain the security headers; asset and JSON responses stay untouched', async () => {
  const html = new Response('<!doctype html><html lang="en"></html>', { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'public, max-age=0' } });
  const secured = withSiteSecurityHeaders(html);
  for (const [name, value] of Object.entries(SITE_SECURITY_HEADERS)) assert.equal(secured.headers.get(name), value, name);
  assert.equal(secured.headers.get('cache-control'), 'public, max-age=0');
  const denied = withSiteSecurityHeaders(new Response('<html></html>', { headers: { 'content-type': 'text/html', 'x-frame-options': 'DENY', 'referrer-policy': 'same-origin' } }));
  assert.equal(denied.headers.get('X-Frame-Options'), 'DENY');
  assert.equal(denied.headers.get('Referrer-Policy'), 'same-origin');
  const asset = new Response('x', { headers: { 'content-type': 'image/webp', 'cache-control': 'public, max-age=0, must-revalidate' } });
  assert.equal(withSiteSecurityHeaders(asset).headers.get('Content-Security-Policy-Report-Only'), null);
  const env = { PRIMARY_HOST: 'tjm.art', ASSETS: { fetch: () => new Response('<!doctype html><html lang="en"><title>Home</title></html>', { headers: { 'content-type': 'text/html; charset=utf-8' } }) } };
  const home = await worker.fetch(new Request('https://tjm.art/'), env);
  assert.equal(home.headers.get('Permissions-Policy'), SITE_SECURITY_HEADERS['Permissions-Policy']);
  assert.equal(home.headers.get('X-Frame-Options'), 'SAMEORIGIN');
  const jpeg = await worker.fetch(new Request('https://tjm.art/display/a.webp'), { ...env, ASSETS: { fetch: () => new Response('x', { headers: { 'content-type': 'image/webp', 'cache-control': 'public, max-age=0, must-revalidate' } }) } });
  assert.equal(jpeg.headers.get('cache-control'), 'public, max-age=0, must-revalidate');
  assert.equal(jpeg.headers.get('Content-Security-Policy-Report-Only'), null);
});

test('/play/ entry is indexable with lang and canonical; /play/g frames stay noindex', async () => {
  const shell = fs.readFileSync('static/play/index.html', 'utf8');
  assert.match(shell, /<html[^>]*\slang="en"/);
  assert.match(shell, /rel="canonical" href="https:\/\/tjm\.art\/play\/"/);
  assert.equal(/noindex/i.test(shell), false);
  const frames = fs.readdirSync('static/play/g').filter(name => fs.existsSync(`static/play/g/${name}/index.html`));
  assert.ok(frames.length > 0);
  for (const id of frames) {
    const html = fs.readFileSync(`static/play/g/${id}/index.html`, 'utf8');
    assert.match(html, /name="robots" content="noindex,nofollow"/, id);
  }
  const bare = '<!doctype html><html><head><meta name="robots" content="noindex,nofollow"><meta name="googlebot" content="noindex"><link rel="canonical" href="https://preview.example/play/"><meta property="og:image" content="https://example.test/old.jpg"></head><body></body></html>';
  const out = rewritePlayEntryHtml(bare);
  assert.match(out, /<html lang="en">/);
  assert.equal(/noindex/i.test(out), false);
  assert.match(out, /rel="canonical" href="https:\/\/tjm\.art\/play\/"/);
  assert.equal(ensurePlayLang('<html lang="en" class="play">'), '<html lang="en" class="play">');
  assert.equal(out.includes('example.test/old.jpg'), false);
  assert.equal(rewritePlayEntryHtml(out), out);
  const sitemap = fs.readFileSync('scripts/generate-sitemap.mjs', 'utf8');
  assert.match(sitemap, /noindex/);
  const skips = html => [...html.matchAll(/<meta\b[^>]*>/gi)].some(([tag]) => /\bname\s*=\s*["']robots["']/i.test(tag) && /noindex/i.test(tag));
  assert.equal(skips(shell), false);
  assert.equal(frames.every(id => skips(fs.readFileSync(`static/play/g/${id}/index.html`, 'utf8'))), true);
  const { playGallery, proxyHexPlay } = await import('../worker/play-gallery.mjs');
  const indexed = await proxyHexPlay(new Request('https://tjm.art/play/'), async () => new Response(bare, { headers: { 'content-type': 'text/html', 'x-robots-tag': 'noindex, nofollow' } }));
  assert.equal(/noindex/i.test(await indexed.text()), false);
  assert.equal(indexed.headers.get('x-robots-tag'), null);
  const head = await proxyHexPlay(new Request('https://tjm.art/play/', { method: 'HEAD' }), async () => new Response(null, { headers: { 'content-type': 'text/html', 'x-robots-tag': 'noindex, nofollow' } }));
  assert.equal(head.headers.get('x-robots-tag'), null);
  const frame = await playGallery(new Request('https://tjm.art/play/g/play/'), { ASSETS: { fetch: () => new Response('<html></html>', { status: 200, headers: { 'content-type': 'text/html' } }) } });
  assert.equal(frame.headers.get('x-robots-tag'), 'noindex, nofollow');
  const asset = await playGallery(new Request('https://tjm.art/play/g/play/app.js'), { ASSETS: { fetch: () => new Response('js', { status: 200, headers: { 'content-type': 'application/javascript' } }) } });
  assert.equal(asset.headers.get('x-robots-tag'), 'noindex, nofollow');
});

test('blog stories emit BlogPosting JSON-LD and skip the index shape', () => {
  const post = `<!doctype html><html lang="en"><head>
<meta name="description" content="A walkable gallery.">
<meta property="og:image" content="https://img.tjm.art/social/walk.jpg">
<meta property="article:published_time" content="2026-11-04">
<meta property="article:modified_time" content="2026-11-05">
</head><body><h1>Walk My 206 Paintings in 3D</h1></body></html>`;
  const script = blogPostingScript(post, 'https://tjm.art/blog/walk-my-paintings-3d-gallery/');
  const data = JSON.parse(script.replace(/^<script type="application\/ld\+json">/, '').replace(/<\/script>$/, ''));
  assert.equal(data['@context'], 'https://schema.org');
  assert.equal(data['@type'], 'BlogPosting');
  assert.equal(data.headline, 'Walk My 206 Paintings in 3D');
  assert.equal(data.description, 'A walkable gallery.');
  assert.equal(data.datePublished, '2026-11-04');
  assert.equal(data.dateModified, '2026-11-05');
  assert.equal(data.image, 'https://img.tjm.art/social/walk.jpg');
  assert.deepEqual(data.author, { '@type': 'Person', name: 'TJ Murphy', url: 'https://tjm.art/about/' });
  assert.equal(data.publisher.name, 'Vermillion Aurora Productions');
  assert.equal(data.mainEntityOfPage['@id'], 'https://tjm.art/blog/walk-my-paintings-3d-gallery/');
  assert.equal(blogPostingScript(post.replace('article:modified_time" content="2026-11-05"', 'article:modified_time" content=""') + script, 'https://tjm.art/blog/walk-my-paintings-3d-gallery/'), '');
  const plain = blogPostingScript(post.replace('<meta property="article:modified_time" content="2026-11-05">', ''), 'https://tjm.art/blog/x/');
  assert.equal(JSON.parse(plain.replace(/^<script type="application\/ld\+json">/, '').replace(/<\/script>$/, '')).dateModified, undefined);
});

test('/play keeps lang=en and the Neural Dance share image stays public', () => {
  const shell = fs.readFileSync('static/play/index.html', 'utf8');
  assert.match(shell, /<html lang="en">/);
  assert.match(shell, /iframe\.g/);
  assert.match(shell, /\/play\/g\//);
});

test('home featured slides are real links with sized images, and product labels and headings line up', () => {
  const home = fs.readFileSync('src/pages/index.astro', 'utf8');
  assert.match(home, /class="sp-hero-source"[\s\S]*width=\{p\.display\.width\} height=\{p\.display\.height\}/);
  const carousel = fs.readFileSync('featured-carousel/carousel.js', 'utf8');
  assert.match(carousel, /slot\.image\.width = item\.width/);
  assert.match(carousel, /fill\(layers\[1 - front\]/);
  const image = fs.readFileSync('src/components/PaintingImage.astro', 'utf8');
  assert.match(image, /aria-label=\{`View full screen: \$\{title\}`\}/);
  assert.match(image, /View full screen: \$\{d\.alt\}/);
  assert.match(image, /painting-image-hint">View full screen/);
  const trust = fs.readFileSync('src/components/PurchaseReassurance.astro', 'utf8');
  assert.match(trust, /<h2>What you get<\/h2>/);
  assert.match(trust, /<h2>About this print<\/h2>/);
  assert.equal(/<h3>What you get<\/h3>/.test(trust), false);
  const share = fs.readFileSync('static/brand/neural-dance-share.jpg');
  assert.equal(share.readUInt16BE(0), 0xffd8);
  assert.ok(share.length < 150 * 1024, `share image is ${share.length} bytes`);
  let i = 2;
  let size = null;
  while (i + 8 < share.length) {
    if (share[i] !== 0xff) break;
    const marker = share[i + 1];
    const len = share.readUInt16BE(i + 2);
    if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
      size = { height: share.readUInt16BE(i + 5), width: share.readUInt16BE(i + 7) };
      break;
    }
    i += 2 + len;
  }
  assert.deepEqual(size, { width: 1200, height: 630 });
});

test('report-only CSP names a reporting endpoint (Safari) and the Worker collects reports', async () => {
  assert.match(CSP_REPORT_ONLY, /(?:^|; )report-to csp-endpoint(?:;|$)/);
  assert.match(CSP_REPORT_ONLY, /(?:^|; )report-uri \/csp-report(?:;|$)/);
  assert.equal(SITE_SECURITY_HEADERS['Reporting-Endpoints'], 'csp-endpoint="/csp-report"');
  assert.ok(headersFile.includes('Reporting-Endpoints: csp-endpoint="/csp-report"'));
  const env = { PRIMARY_HOST: 'tjm.art', ASSETS: { fetch: () => new Response('asset', { status: 404 }) } };
  const report = await worker.fetch(new Request('https://tjm.art/csp-report', { method: 'POST', headers: { 'content-type': 'application/csp-report' }, body: JSON.stringify({ 'csp-report': { 'violated-directive': 'frame-src', 'blocked-uri': 'https://example.test/x.pdf', 'document-uri': 'https://tjm.art/' } }) }), env);
  assert.equal(report.status, 204);
  assert.equal((await worker.fetch(new Request('https://tjm.art/csp-report'), env)).status, 405);
  assert.equal((await worker.fetch(new Request('https://tjm.art/csp-report', { method: 'POST', headers: { 'content-type': 'text/plain' }, body: 'x' }), env)).status, 415);
});

test('the "Read the book" PDF frame from media.vermillionaurora.com is allowed', () => {
  const frameSrc = CSP_REPORT_ONLY.split('; ').find(d => d.startsWith('frame-src '));
  assert.ok(frameSrc.split(' ').includes('https://media.vermillionaurora.com'));
  assert.ok(headersFile.includes(frameSrc));
});
