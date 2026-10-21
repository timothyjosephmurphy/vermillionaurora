import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { renderAdded } from '../worker/catalog-pages.mjs';
// Admin-added paintings render from the Astro-built shell (studio-tracker #133), not a hand-written template.
test('admin-added painting page fills the Astro product shell', async () => {
  const shell = fs.readFileSync('dist/catalog-shell/product/index.html', 'utf8');
  assert.match(shell, /noindex/);
  const env = { ASSETS: { fetch: async (r) => new URL(r.url).pathname === '/catalog-shell/product/' ? new Response(shell) : new Response('missing', { status: 404 }) } };
  const p = { id: 'new-one', slug: 'new-one', title: 'New <One>', medium: 'Watercolor', year: 2026, width: 9, height: 12, unit: 'in', price_amount: '300.00', description: 'Fresh.' };
  const live = { images: new Map([['new-one', [{ key: 'display/new-one-960.webp', width: 960, rev: 2 }]]]), status: new Map() };
  const html = await renderAdded(env, p, live);
  assert.doesNotMatch(html, /noindex/);
  assert.match(html, /<title>New &lt;One&gt; — TJ Murphy<\/title>/);
  assert.match(html, /<link rel="canonical" href="https:\/\/tjm.art\/products\/new-one\/"/);
  assert.match(html, /<main class="container product-detail" data-product-id="new-one">/);
  assert.match(html, /class="site-header"/); assert.match(html, /class="site-footer"/);
  assert.equal((html.match(/application\/ld\+json/g) || []).length, 1);
  assert.match(html, /og:image" content="https:\/\/img.tjm.art\/display\/new-one-960.webp\?v=2"/);
  const noImage = await renderAdded(env, p, { images: new Map(), status: new Map() });
  assert.doesNotMatch(noImage, /og:image/);
});
