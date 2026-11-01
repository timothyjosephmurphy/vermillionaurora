// PaintingImage draws the painting through ArtworkImage. A scoped `img` selector
// never matches that child, so the height attribute stretches the photo.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const src = fs.readFileSync('src/components/PaintingImage.astro', 'utf8');
const style = src.match(/<style>([\s\S]*?)<\/style>/)[1];

test('product and lightbox images reach the ArtworkImage img', () => {
  assert.doesNotMatch(style, /(?<!:global\()\.painting-lightbox img \{/);
  assert.match(style, /:global\(\.painting-lightbox img\) \{[^}]*width: auto/);
  assert.match(style, /:global\(\.painting-lightbox img\) \{[^}]*height: auto/);
  assert.match(style, /:global\(\.painting-lightbox img\) \{[^}]*max-height: 100%/);
  assert.match(style, /:global\(\.painting-lightbox img\) \{[^}]*object-fit: contain/);
  assert.match(style, /:global\(\.painting-image-trigger img\) \{[^}]*height: auto/);
  assert.match(style, /:global\(\.painting-image-trigger img\) \{[^}]*object-fit: contain/);
});
