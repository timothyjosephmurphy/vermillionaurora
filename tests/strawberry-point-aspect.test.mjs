// Strawberry Point paintings are square. The gallery page draws them through AvifImage,
// so a scoped <style> never reaches the <img> and the global max-width:100% rule leaves
// the height attribute (about 960px) in place. That stretches every painting in the row.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const src = fs.readFileSync('src/pages/gallery/strawberry-point.astro', 'utf8');
const style = src.match(/<style is:global>([\s\S]*?)<\/style>/)[1];

test('Strawberry Point image rules apply through AvifImage and keep each painting square', () => {
  assert.match(src, /<style is:global>/);
  assert.match(style, /\.sp-card img\{[^}]*width:100%/);
  assert.match(style, /\.sp-card img\{[^}]*height:auto/);
  assert.match(style, /\.sp-card img\{[^}]*aspect-ratio:1\/1/);
  assert.match(style, /\.sp-card img\{[^}]*object-fit:contain/);
  assert.doesNotMatch(style, /\.sp-card img\{[^}]*object-fit:cover/);
  assert.match(style, /\.archive-image img\{[^}]*object-fit:contain/);
});
