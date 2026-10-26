import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { load } from 'cheerio';

const page = (slug) => load(fs.readFileSync(`dist/products/${slug}/index.html`, 'utf8'));
const starters = [
  ['painting-shoreline-at-dusk', 'El Zonte at Dawn'],
  ['honeybadger-and-cub-with-genesis-block', 'Honeybadger and Cub with Genesis Block'],
  ['warszawska-syrenka', 'Warszawska Syrenka'],
];

test('sticker order sits beside print order on the starter paintings only', () => {
  for (const [slug, title] of starters) {
    const $ = page(slug);
    assert.equal($('h1').first().text(), title);
    const print = $('.product-print-action');
    const sticker = $('.product-sticker-action');
    assert.equal(print.length, 1, slug);
    assert.equal(sticker.length, 1, slug);
    assert.equal(sticker.parent().attr('class'), 'product-purchase-actions');
    assert.equal(sticker.prev().is('.product-print-action'), true, slug);
    assert.equal(sticker.find('[data-sticker-open]').text(), 'Order a sticker');
    assert.equal(print.find('[data-print-open]').text(), 'Buy a print');
    assert.equal($('[data-sticker-dialog]').length, 1);
    assert.equal($('[data-sticker-form]').attr('action'), '/checkout/stickers/order');
    assert.match($('script[src="/payments/stickers.js"]').attr('src') || '', /stickers\.js/);
    assert.equal($.html().includes('PRINTFUL_API_TOKEN'), false);
    assert.equal($.html().includes('2.34'), false);
  }
  const before = page('el-zonte-before-dawn');
  assert.equal(before('h1').first().text(), 'El Zonte Before Dawn');
  assert.equal(before('[data-sticker-open]').length, 0);
  assert.equal(before('[data-sticker-dialog]').length, 0);
});
