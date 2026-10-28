// The El Salvador sunrise post keeps its paintings in the story, in compact
// rows. A full-width portrait stack (the follow-up to #756) is the regression.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const html = fs.readFileSync('static/blog/el-salvador-sunrises-sunsets/index.html', 'utf8');
const css = html.match(/<style>([\s\S]*?)<\/style>/)[1];
const main = html.match(/<main class="article">([\s\S]*?)<\/main>/)[1];

const figures = [...main.matchAll(/<figure class="photo[^"]*">[\s\S]*?<\/figure>/g)].map(match => match[0]);
const rows = [...main.matchAll(/<div class="painting-row(?: quad)?">([\s\S]*?)<\/div>/g)].map(match => match[1]);

test('El Salvador paintings stay in the article as compact rows', () => {
  assert.equal(figures.length, 18);
  assert.equal(rows.length, 6);

  const topLevel = main
    .replace(/<div class="painting-row(?: quad)?">[\s\S]*?<\/div>/g, '')
    .match(/<figure class="photo/g);
  assert.equal(topLevel?.length ?? 0, 1, 'only the opening painting sits outside a row');
  assert.match(figures[0], /El Zonte at Dawn/);

  for (const row of rows) {
    const count = row.match(/<figure class="photo/g)?.length ?? 0;
    assert.ok(count >= 2, 'a painting row needs more than one image');
  }
  const quad = main.match(/<div class="painting-row quad">([\s\S]*?)<\/div>/);
  assert.equal(quad[1].match(/<figure class="photo/g).length, 4);

  const madeByHand = main.indexOf('Made by hand');
  const rowsBefore = [...main.slice(0, madeByHand).matchAll(/class="painting-row/g)].length;
  const rowsAfter = [...main.slice(madeByHand).matchAll(/class="painting-row/g)].length;
  assert.ok(rowsBefore >= 2, 'paintings stay with the earlier sections');
  assert.ok(rowsAfter >= 1, 'later paintings stay in the closing section');

  for (const figure of figures) {
    assert.match(figure, /<figcaption><a href="https:\/\/tjm\.art\/products\/[^"]+"/);
    assert.match(figure, /alt="[^"]+\S[^"]*"/);
  }
});

test('El Salvador painting CSS does not stretch figures to the column', () => {
  assert.match(css, /figure\.photo\{[^}]*width:min\(100%,480px\)/);
  assert.match(css, /\.painting-row figure\.photo\{[^}]*max-width:200px/);
  assert.match(css, /\.painting-row figure\.photo\.wide\{[^}]*max-width:340px/);
  assert.match(css, /\.painting-row figure\.photo img\{[^}]*max-height:240px/);
  assert.match(css, /\.painting-row\{[^}]*display:flex[^}]*flex-wrap:wrap/);
  assert.match(css, /figure\.photo\.panorama\{[^}]*width:100%/);
  assert.doesNotMatch(css, /max-height:\s*82vh/);
  assert.doesNotMatch(css, /grid-template-columns:\s*1fr/);
  assert.doesNotMatch(css, /figure\.photo\{[^}]*margin:[^}]*-/);
});
