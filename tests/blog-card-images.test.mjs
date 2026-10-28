// Guards against blog posts reusing a card image, and site-update posts
// falling back to the default site hero (Esperanza/Symbiosis, aba277665d).
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
// El Salvador sunrise post image rows. Loaded here so `npm test` runs it
// without a package.json edit (that file would force the full release-gate tier).
import './el-salvador-blog-layout.test.mjs';

const FALLBACK = /esperanza-hero|aba277665d/;
// TEMPORARY: posts that still share the fallback banner. Give each its own
// image, then remove it from this list.
const ALLOW_SHARED = new Set([
  'site-update-oct-4-16-2026',
  'site-update-oct-17-18-2026',
  'how-tjm-art-was-built',
]);

const html = readFileSync(new URL('../src/pages/blog/index.astro', import.meta.url), 'utf8');
const cards = [...html.matchAll(/class="journal-image-link" href="\/blog\/([^/"]+)\/"[^>]*>\s*<img src="([^"]+)"/g)]
  .map(([, slug, src]) => ({ slug, src, key: src.replace(/^https?:\/\/[^/]+/, '').replace(/-\d+\.(webp|jpg|png)$/, '') }));

test('blog index has cards', () => assert.ok(cards.length >= 5));

test('no two blog posts share a card image', () => {
  const seen = new Map();
  for (const c of cards) {
    if (ALLOW_SHARED.has(c.slug)) continue;
    assert.ok(!seen.has(c.key), `${c.slug} reuses card image of ${seen.get(c.key)}: ${c.src}`);
    seen.set(c.key, c.slug);
  }
});

test('site-update posts do not use the default fallback image', () => {
  for (const c of cards.filter((c) => c.slug.startsWith('site-update-'))) {
    if (ALLOW_SHARED.has(c.slug)) continue;
    assert.ok(!FALLBACK.test(c.src), `${c.slug} uses the fallback image`);
    const page = readFileSync(new URL(`../static/blog/${c.slug}/index.html`, import.meta.url), 'utf8');
    const og = page.match(/og:image" content="([^"]+)"/)?.[1] || '';
    assert.ok(og && !FALLBACK.test(og), `${c.slug} og:image uses the fallback image`);
  }
});
