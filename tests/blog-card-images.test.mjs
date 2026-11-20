// Guards against blog posts reusing a card image, and site-update posts
// falling back to the default site hero (Esperanza/Symbiosis, aba277665d).
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const FALLBACK = /esperanza-hero|aba277665d/;
// TEMPORARY: posts that still share the fallback banner. Give each its own
// image, then remove it from this list.
const ALLOW_SHARED = new Set([
  'site-update-oct-4-16-2026',
  'site-update-oct-17-18-2026',
  'how-tjm-art-was-built',
]);

const html = readFileSync(new URL('../src/pages/blog/index.astro', import.meta.url), 'utf8');
const cards = html.split('<article class="journal-entry" data-static-story>').slice(1).map(block => {
  const chunk = block.split('</article>')[0];
  const slug = chunk.match(/href="\/blog\/([^/"]+)\//)?.[1] || '';
  const src = chunk.match(/<img src="([^"]+)"/)?.[1] || '';
  return { slug, src, key: src.replace(/^https?:\/\/[^/]+/, '').replace(/-\d+\.(webp|jpg|png)$/, '') };
}).filter(card => card.slug && card.src);

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
    // The article HTML is generated at build time and gitignored, so the blog
    // gate checkout does not have static/blog/<slug>/index.html. The post module
    // is the source of the og:image.
    const source = readFileSync(new URL(`../src/content/blog/posts/${c.slug}.mjs`, import.meta.url), 'utf8');
    const og = source.match(/property="og:image" content="([^"]+)"/)?.[1] || '';
    assert.ok(og && !FALLBACK.test(og), `${c.slug} og:image uses the fallback image`);
  }
});
