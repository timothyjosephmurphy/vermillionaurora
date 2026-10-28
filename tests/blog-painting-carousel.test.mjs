import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { byId } from '../catalog/catalog.mjs';
import displayImages from '../scripts/display-images.json' with { type: 'json' };

const root = new URL('..', import.meta.url);
const read = path => readFileSync(new URL(path, root), 'utf8');
const unpublished = ['bitcoiners-el-salvador', 'bounty-of-satoshi-collaborators', 'bitcoiners-south-africa', 'conference-bitcoiners'];
const guide = read('static/blog/painting-carousel.md');
const uncommented = guide.replace(/<!--[\s\S]*?-->/g, '');

function slideIds(label) {
  const section = uncommented.split(`aria-label="${label}"`)[1]?.split('</section>')[0] || '';
  return [...section.matchAll(/data-product-id="([^"]+)"/g)].map(match => match[1]);
}

test('carousel snippet lists the three unpublished posts and not a bounty post', () => {
  assert.deepEqual(slideIds('Bitcoiners in El Salvador'), [
    'book-art-4afb5cab4bdbe1ff6845',
    'book-art-b38b9ae1893908d604da',
    'book-art-4d53927ad111f0259402',
    'book-art-c04c7e48687fe35e65f5',
  ]);
  assert.deepEqual(slideIds('Bitcoiners in South Africa'), [
    'book-art-504e3fafdacd7c9bbcd0',
    'book-art-4a0bb9cdd6c404c4e77c',
  ]);
  assert.deepEqual(slideIds('Conference Bitcoiners'), [
    'book-art-7a498f39e7a66a2e8eb5',
    'book-art-b57fc2205e7bce68d524',
    'book-art-0ee2717bc04e65d0507e',
    'book-art-e4bbfe556c3c847d9c90',
    'painting-chef-in-white',
    'book-art-5a462e9705ba39d756a2',
    'book-art-d95085ce3029e490bb31',
    'book-art-6ef848d3ccb6b48184ab',
    'book-art-044d157c01c7bb07eeab',
  ]);
  assert.doesNotMatch(guide, /bounty-of-satoshi-collaborators|book-art-d6e03f6907615dac3797|book-art-ec22daff29e72f16eb76|book-art-43a3f16ac35df7262254/);
  assert.match(guide, /srcset=/);
  assert.match(guide, /prefers-reduced-motion/);
});

test('each documented slide links to a real catalog image', () => {
  const ids = ['Bitcoiners in El Salvador', 'Bitcoiners in South Africa', 'Conference Bitcoiners'].flatMap(slideIds);
  assert.ok(ids.length >= 15);
  for (const id of ids) {
    const product = byId[id];
    const figure = uncommented.match(new RegExp(`<figure class="blog-painting-slide" data-product-id="${id}">[\\s\\S]*?</figure>`))?.[0];
    assert.ok(product && figure, id);
    assert.match(figure, new RegExp(`href="/products/${id}/"`));
    const variants = displayImages[product.image.src]?.variants;
    if (variants?.length) {
      assert.match(figure, /srcset="/);
      for (const variant of variants) assert.match(figure, new RegExp(variant.src.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    } else {
      assert.match(figure, new RegExp(product.image.src.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
      assert.match(figure, /\.webp/);
    }
  }
});

test('carousel assets snap, expose controls, and respect reduced motion', () => {
  const css = read('static/blog/painting-carousel.css');
  const js = read('static/blog/painting-carousel.js');
  assert.match(css, /scroll-snap-type:\s*x mandatory/);
  assert.match(css, /@media \(prefers-reduced-motion:\s*reduce\)/);
  assert.match(css, /max-width:\s*800px/);
  assert.match(js, /ArrowRight/);
  assert.match(js, /ArrowLeft/);
  assert.match(js, /prefers-reduced-motion/);
  assert.match(js, /data-dir/);
  assert.match(js, /scrollTo/);
});

test('trip posts are not on the live blog', () => {
  const index = read('src/pages/blog/index.astro');
  const slugs = readdirSync(new URL('static/blog', root), { withFileTypes: true }).filter(entry => entry.isDirectory()).map(entry => entry.name);
  for (const slug of unpublished) {
    assert.equal(existsSync(new URL(`static/blog/${slug}/index.html`, root)), false, slug);
    assert.equal(slugs.includes(slug), false, slug);
    assert.doesNotMatch(index, new RegExp(`/blog/${slug}/`));
  }
});
