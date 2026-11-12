import test from 'node:test';
import assert from 'node:assert/strict';
import {checkPrintPriceTable,reviewLivePrintCost,PRICE_BLOCK_MESSAGE} from '../catalog/print-price-table.mjs';
import prints from '../catalog/prints.json' with {type:'json'};
import books from '../catalog/book-prints.json' with {type:'json'};

test('offline price table: every enabled catalog price maps to saved cost plus margin', () => {
  const result = checkPrintPriceTable(prints, books);
  assert.equal(result.ok, true, result.errors.slice(0, 10).join('\n'));
  assert.ok(result.counts.unframed > 100);
  assert.ok(result.counts.framed > 100);
});

test('offline price table rejects a framed amount that drops the saved supplier extras', () => {
  const copy = structuredClone(prints);
  const art = Object.values(copy.artworks).find(a => a.enabled && Object.values(a.variants)[0]?.frameOptions);
  const variant = Object.values(art.variants)[0];
  const frame = Object.values(variant.frameOptions)[0];
  frame.amount = variant.amount;
  const result = checkPrintPriceTable(copy, {});
  assert.equal(result.ok, false);
  assert.ok(result.errors.some(e => /framed amount must exceed unframed|Invalid framed print price/.test(e)));
});

const live = (over = {}) => ({
  ok: true, quantity: 1, currency: 'USD', productionCost: '7.00', baseCost: '7.00',
  matCost: '0.00', secondMatCost: '0.00', frameCost: '0.00', glazingCost: '0.00',
  shippingIncluded: false, taxIncluded: false, ...over,
});

test('live cost match keeps the saved retail', () => {
  const item = {id: 'print-x-small', title: 'X', sku: '5M144M8S7.5X6', amount: '25.00'};
  assert.equal(reviewLivePrintCost(item, live()).status, 'ok');
});

test('live cost rise with positive margin asks for a corrected price confirmation', () => {
  const item = {id: 'print-x-small', title: 'X', sku: '5M144M8S7.5X6', amount: '25.00'};
  const review = reviewLivePrintCost(item, live({productionCost: '8.00', baseCost: '8.00'}));
  assert.equal(review.status, 'confirm');
  assert.equal(review.amount, '30.00');
  assert.equal(review.storedAmount, '25.00');
  assert.equal(review.liveCost, '8.00');
});

test('live cost that erases margin blocks with a friendly message', () => {
  const item = {id: 'print-x-small', title: 'X', sku: '5M144M8S7.5X6', amount: '25.00'};
  const review = reviewLivePrintCost(item, live({productionCost: '25.00', baseCost: '25.00'}));
  assert.equal(review.status, 'block');
  assert.equal(review.message, PRICE_BLOCK_MESSAGE);
});

test('framed live extras that still leave positive margin ask for confirmation', () => {
  const item = {
    id: 'print-x-small-frame-black', title: 'X framed', sku: 'FRAME-SKU', amount: '59.63',
    unframedAmount: '25.00', frame: {key: 'black'},
  };
  const quote = live({
    productionCost: '42.63', baseCost: '7.00', matCost: '6.63', frameCost: '22.00', glazingCost: '7.00',
  });
  const review = reviewLivePrintCost(item, quote);
  assert.equal(review.status, 'confirm');
  assert.equal(review.amount, '60.63');
});

test('framed quote whose artwork margin goes negative is blocked', () => {
  const item = {
    id: 'print-x-small-frame-black', title: 'X framed', sku: 'FRAME-SKU', amount: '59.63',
    unframedAmount: '25.00', frame: {key: 'black'},
  };
  const quote = live({
    productionCost: '56.63', baseCost: '20.00', matCost: '6.63', frameCost: '23.00', glazingCost: '7.00',
  });
  const review = reviewLivePrintCost(item, quote);
  assert.equal(review.status, 'block');
  assert.equal(review.message, PRICE_BLOCK_MESSAGE);
});
