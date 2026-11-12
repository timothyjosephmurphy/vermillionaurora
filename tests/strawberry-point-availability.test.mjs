import test from 'node:test';
import assert from 'node:assert/strict';
import products from '../catalog/strawberry-point-products.mjs';

const byIndex = index => products.find(product => product.id === `strawberry-point-${index}`);
const original = product => product.facts.find(fact => fact.label === 'Original').value;

test('show originals are not for sale and the rest keep their prices', () => {
  for (const index of [1, 2]) {
    const product = byIndex(index);
    assert.equal(product.listing.status, 'unavailable');
    assert.equal(product.listing.price, null);
    assert.equal(product.checkout.mode, 'inquiry');
    assert.equal(original(product), 'Not currently available · WAA Sip & Stroll, Woodinville');
  }
  for (const index of [4, 5, 6]) {
    const product = byIndex(index);
    assert.equal(product.listing.status, 'unavailable');
    assert.equal(product.listing.price, null);
    assert.equal(product.checkout.mode, 'inquiry');
    assert.equal(original(product), 'Not currently available · Ghost Gallery Holiday Mini');
    assert.equal(product.facts.find(fact => fact.label === 'Prints').value, 'Archival prints on watercolor paper, never larger than the original');
  }
  const third = byIndex(3);
  assert.equal(third.listing.status, 'available');
  assert.equal(third.listing.price.amount, '450.00');
  assert.equal(third.checkout.mode, 'integrated');
  assert.equal(original(third), 'Available · $450');
  assert.equal(third.dimensions.width, 15);
  assert.equal(third.dimensions.height, 15);
  const prices = { 7: '75.00', 8: '100.00', 9: '100.00', 10: '100.00', 11: '200.00', 12: '200.00', 13: '200.00', 14: '200.00', 15: '100.00' };
  for (const [index, amount] of Object.entries(prices)) {
    const product = byIndex(Number(index));
    assert.equal(product.listing.status, 'available');
    assert.equal(product.listing.price.amount, amount);
    assert.equal(product.checkout.mode, 'integrated');
    assert.equal(original(product), `Available · $${Number(amount)}`);
  }
  for (const id of ['strawberry-point-set-a', 'strawberry-point-set-b', 'strawberry-point-set-c']) {
    const product = products.find(item => item.id === id);
    assert.equal(product.listing.status, 'inquiry');
    assert.equal(product.listing.price, null);
  }
});
