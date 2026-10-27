import test from 'node:test';
import assert from 'node:assert/strict';
import {nextMarketSale, stockStatus} from './original-availability.mjs';

const now = Date.parse('2026-10-23T20:00:00Z');

test('first marketplace sale wins and marks the original sold', () => {
  const next = nextMarketSale(null, 'abc', now);
  assert.equal(next.state, 'sold');
  assert.equal(next.capture_id, 'market:abc');
  assert.equal(stockStatus(next, now), 'sold');
});

test('the same marketplace order again is a duplicate, a different one is a conflict', () => {
  const sold = {state: 'sold', capture_id: 'market:abc'};
  assert.equal(nextMarketSale(sold, 'abc', now).duplicate, true);
  assert.equal(nextMarketSale(sold, 'def', now).conflict, true);
  assert.equal(nextMarketSale({state: 'sold', capture_id: 'etsy:9'}, 'abc', now).conflict, true);
  assert.equal(nextMarketSale({state: 'capturing'}, 'abc', now).conflict, true);
});

test('a confirmed marketplace payment replaces a live site hold', () => {
  assert.equal(nextMarketSale({state: 'held', expires_at: now + 1000}, 'abc', now).replacedHold, true);
  assert.equal(nextMarketSale({state: 'held', expires_at: now - 1000}, 'abc', now).replacedHold, false);
  assert.equal(nextMarketSale({state: 'cart-held'}, 'abc', now).replacedHold, true);
});
