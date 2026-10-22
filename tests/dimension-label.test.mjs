import test from 'node:test';
import assert from 'node:assert/strict';
import { dimensionLabel, dimensionLabelBoth, products } from '../catalog/catalog.mjs';
// Gallery cards show inches and centimetres (studio-tracker #91 comment: units mixed cm and in).
test('card size line shows both units, W x H unless the work is stored H x W', () => {
  assert.equal(dimensionLabelBoth({ dimensions: { width: 13, height: 24, unit: 'in' } }), '13 × 24 in (33 × 61 cm) (W × H)');
  assert.equal(dimensionLabelBoth({ dimensions: { width: 70, height: 100, unit: 'cm' } }), '27.6 × 39.4 in (70 × 100 cm) (W × H)');
  assert.equal(dimensionLabelBoth({ dimensionOrder: 'height-width', dimensions: { width: 9, height: 12, unit: 'in' } }), '12 × 9 in (30 × 23 cm) (H × W)');
  assert.equal(dimensionLabelBoth({ dimensions: { width: 8.5, height: 11, unit: 'in' } }), '8.5 × 11 in (22 × 28 cm) (W × H)');
});
test('no size or an unknown unit falls back to the plain label', () => {
  assert.equal(dimensionLabelBoth({}), 'Measurements available on request');
  const odd = { dimensions: { width: 3, height: 4, unit: 'ft' } };
  assert.equal(dimensionLabelBoth(odd), dimensionLabel(odd));
});
test('every product with a size gets a two-unit label', () => {
  for (const p of products.filter((x) => x.dimensions)) assert.match(dimensionLabelBoth(p), /^[\d.]+ × [\d.]+ in \(\d+ × \d+ cm\) \([WH] × [WH]\)$/, p.id);
});
