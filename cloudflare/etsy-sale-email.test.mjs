import test from 'node:test';
import assert from 'node:assert/strict';
import {write} from './etsy-connection.mjs';
import {originalTitle, ORIGINAL_WORKS} from './etsy-sync-plan.mjs';
import {
  DEFAULT_SALE_ADDRESS, classifySaleSubject, etsyAuthenticated, looksLikePrintTitle, mapSaleItem,
  parseEtsySaleEmail, parseRfc822, processEtsySaleEmail, matchOriginalByTitle, isEtsySaleRecipient,
  isForwardingConfirmation
} from './etsy-sale-email.mjs';

const now = Date.parse('2026-10-02T19:41:16Z');
const original = ORIGINAL_WORKS.find(work => work.id === 'el-zonte-before-dawn');
const originalName = originalTitle(original);

class Bucket {
  data = new Map(); sequence = 0;
  async get(key) { const item = this.data.get(key); return item ? {etag: item.etag, json: async () => JSON.parse(item.value)} : null; }
  async put(key, value, options = {}) {
    const prev = this.data.get(key), condition = options.onlyIf || {};
    if (condition.etagMatches && prev?.etag !== condition.etagMatches) return null;
    if (condition.etagDoesNotMatch === '*' && prev) return null;
    const item = {value, etag: String(++this.sequence)}; this.data.set(key, item); return item;
  }
}
function stock() {
  const rows = new Map();
  return {getByName(id) {
    return {
      async recordEtsySale(receiptId, at) {
        const row = rows.get(id);
        if (row?.capture_id === 'etsy:' + receiptId) return {ok: true, duplicate: true, status: 'sold'};
        if (row?.state === 'sold' && row.capture_id && row.capture_id !== 'etsy:' + receiptId) return {ok: false, conflict: true, status: 'sold'};
        rows.set(id, {state: 'sold', capture_id: 'etsy:' + receiptId, at});
        return {ok: true, status: 'sold'};
      }
    };
  }, rows};
}

const AUTH = 'Authentication-Results: mx.cloudflare.net; dkim=pass header.i=@etsy.com header.s=em; spf=pass smtp.mailfrom=em968.etsy.com; dmarc=pass header.from=mail.etsy.com';

function rawMessage({subject, from = 'Etsy Transactions <transaction@etsy.com>', to = DEFAULT_SALE_ADDRESS, body, auth = AUTH, extra = []}) {
  return [
    'Return-Path: <bounces@em968.etsy.com>',
    auth,
    `From: ${from}`,
    'Sender: noreply@mail.etsy.com',
    `To: ${to}`,
    `Subject: ${subject}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=utf-8',
    ...extra,
    '',
    body
  ].join('\r\n');
}

function env() {
  return {ETSY_KEYSTRING: 'test-key', ETSY_SHARED_SECRET: 'test-secret', COMMISSION_MANAGER_TOKEN: 'manager', COMMISSION_UPLOADS: new Bucket(), PAINTING_STOCK: stock(), GOOGLE_CLIENT_ID: 'id', GOOGLE_CLIENT_SECRET: 'secret', GOOGLE_REFRESH_TOKEN: 'refresh'};
}

test('sale subjects are recognized and refunds are ignored', () => {
  assert.equal(classifySaleSubject('You made a sale on Etsy - Ship by Nov 4 - [$1,100.00, Order #4299000111]'), 'sale');
  assert.equal(classifySaleSubject('TJ, congrats on your first sale! Here are your order details.'), 'sale');
  assert.equal(classifySaleSubject('You have issued a refund (Order #4189847829)'), 'ignore');
  assert.equal(classifySaleSubject('Your transaction has been canceled'), 'ignore');
  assert.equal(isEtsySaleRecipient('etsy-sales@reply.tjm.art', {}), true);
  assert.equal(isEtsySaleRecipient('stories@reply.tjm.art', {}), false);
});

test('only Cloudflare-authenticated Etsy mail is trusted', () => {
  const parsed = parseRfc822(rawMessage({subject: 'You made a sale on Etsy', body: 'Order number: 1\n'}));
  assert.equal(etsyAuthenticated(parsed.headers).ok, true);
  const spoofed = parseRfc822(rawMessage({subject: 'You made a sale on Etsy', body: 'Order number: 1\n', auth: 'Authentication-Results: mx.evil.example; dkim=pass header.i=@etsy.com; dmarc=pass header.from=mail.etsy.com'}));
  assert.equal(etsyAuthenticated(spoofed.headers).ok, false);
  const unauth = parseRfc822(rawMessage({subject: 'You made a sale on Etsy', body: 'Order number: 1\n', auth: 'X-Ignore: none'}));
  assert.equal(etsyAuthenticated(unauth.headers).ok, false);
  const notEtsy = parseRfc822(rawMessage({subject: 'You made a sale on Etsy', from: 'Eve <eve@example.com>', body: 'Order number: 1\n'}));
  assert.equal(etsyAuthenticated(notEtsy.headers).ok, false);
  const forwarded = parseRfc822(rawMessage({
    subject: 'You made a sale on Etsy', body: 'Order number: 1\n',
    auth: 'Authentication-Results: mx.cloudflare.net; spf=pass smtp.mailfrom=google.com; arc=pass',
    extra: ['ARC-Authentication-Results: i=1 mx.google.com; dkim=pass header.i=@etsy.com; dmarc=pass header.from=mail.etsy.com']
  }));
  // Cloudflare verified the ARC chain, so the prior hop's Etsy DKIM result is accepted (Gmail auto-forward).
  assert.equal(etsyAuthenticated(forwarded.headers).ok, true);
  const gmailOnly = parseRfc822(rawMessage({
    subject: 'You made a sale on Etsy', body: 'Order number: 1\n',
    auth: 'Authentication-Results: mx.cloudflare.net; spf=pass smtp.mailfrom=google.com; dkim=pass header.i=@google.com; arc=pass',
    extra: ['ARC-Authentication-Results: i=1 mx.google.com; dkim=pass header.i=@google.com']
  }));
  assert.equal(etsyAuthenticated(gmailOnly.headers).ok, false);
  const forwardedOk = parseRfc822(rawMessage({
    subject: 'You made a sale on Etsy', body: 'Order number: 1\n',
    auth: 'Authentication-Results: mx.cloudflare.net; arc=pass\nARC-Authentication-Results: mx.cloudflare.net; dkim=pass header.i=@etsy.com; dmarc=pass header.from=transaction.etsy.com'
  }));
  assert.equal(etsyAuthenticated(forwardedOk.headers).ok, true);
});

test('the first-sale print email is parsed and not treated as an original', () => {
  const raw = rawMessage({
    from: 'Etsy <emails@mail.etsy.com>',
    subject: 'TJ, congrats on your first sale! Here are your order details.',
    body: [
      'Order details',
      'Order number: 4189847829',
      'Transaction ID:     5238904298',
      'Item:               El Zonte at Sunrise, El Salvador — Landscape Art Print · Framed or Unframed',
      'Print size: Large',
      'Frame: Unframed',
      'Quantity:           1',
      'Item price:         $25.00',
      'Item total:         $25.00',
      'Shipping:           $14.46  (USPS Priority Mail)',
      'Order Total:        $43.62'
    ].join('\n')
  });
  const sale = parseEtsySaleEmail(parseRfc822(raw));
  assert.equal(sale.kind, 'sale');
  assert.equal(sale.orderId, '4189847829');
  assert.equal(sale.items[0].title.includes('Art Print'), true);
  assert.equal(sale.items[0].quantity, 1);
  assert.equal(sale.transactionIds.includes('5238904298'), true);
  assert.equal(looksLikePrintTitle(sale.items[0].title), true);
  assert.equal(mapSaleItem(sale.items[0], {}).kind, 'print');
});

test('a later original sale is mapped by listing id or official title', () => {
  const raw = rawMessage({
    subject: 'You made a sale on Etsy - Ship by Nov 4 - [$1,100.00, Order #4299000111]',
    body: [
      'Congratulations, you sold 1 item.',
      'Order number: 4299000111',
      'Item:               ' + originalName,
      'Quantity:           1',
      'https://www.etsy.com/listing/4591466297/el-zonte-before-dawn',
      'https://www.etsy.com/your/orders/4299000111'
    ].join('\n')
  });
  const sale = parseEtsySaleEmail(parseRfc822(raw));
  assert.equal(sale.orderId, '4299000111');
  assert.equal(sale.items[0].listingId, '4591466297');
  const mapped = mapSaleItem(sale.items[0], {});
  assert.equal(mapped.kind, 'original');
  assert.equal(mapped.productId, 'el-zonte-before-dawn');
  assert.equal(mapped.listingId, 4591466297);
  const byTitle = matchOriginalByTitle(originalName, {});
  assert.equal(byTitle.productId, 'el-zonte-before-dawn');
});

test('a print-only sale does not call Etsy or mark a painting sold', async t => {
  const setup = env();
  const calls = [];
  t.mock.method(globalThis, 'fetch', async url => { calls.push(String(url)); throw Error('unexpected ' + url); });
  const raw = rawMessage({
    from: 'Etsy <emails@mail.etsy.com>',
    subject: 'TJ, congrats on your first sale! Here are your order details.',
    body: 'Order number: 4189847829\nItem: El Zonte at Sunrise, El Salvador — Landscape Art Print · Framed or Unframed\nQuantity: 1\n'
  });
  const result = await processEtsySaleEmail(setup, raw, {envelopeTo: DEFAULT_SALE_ADDRESS, now});
  assert.equal(result.ok, true);
  assert.equal(result.results[0].skipped, 'print');
  assert.equal(calls.length, 0);
  assert.equal(setup.PAINTING_STOCK.rows.size, 0);
});

test('an authenticated original sale marks the painting once and deactivates the listing', async t => {
  const setup = env();
  await write(setup, {connection: {shopId: 42, shopName: 'VermillionAurora', userId: '123', accessToken: '123.access', refreshToken: '123.refresh', expiresAt: now + 3600000, scopes: ['listings_w', 'transactions_r']}}, null);
  const calls = [];
  t.mock.method(globalThis, 'fetch', async (url, options = {}) => {
    const target = String(url); calls.push({url: target, method: options.method || 'GET'});
    if (target.endsWith('/listings/4591466297') && (!options.method || options.method === 'GET')) return Response.json({listing_id: 4591466297, state: 'active', quantity: 1});
    if (options.method === 'PATCH' && target.endsWith('/listings/4591466297')) return Response.json({listing_id: 4591466297, state: 'inactive'});
    if (target.includes('oauth2.googleapis.com')) return Response.json({access_token: 'mail'});
    if (target.includes('gmail.googleapis.com')) return Response.json({id: 'mail'});
    throw Error('unexpected ' + target);
  });
  const raw = rawMessage({
    subject: 'You made a sale on Etsy - Ship by Nov 4 - [$1,100.00, Order #4299000111]',
    body: 'Order number: 4299000111\nItem: ' + originalName + '\nQuantity: 1\nhttps://www.etsy.com/listing/4591466297/el-zonte-before-dawn\n'
  });
  const first = await processEtsySaleEmail(setup, raw, {envelopeTo: DEFAULT_SALE_ADDRESS, now});
  assert.equal(first.ok, true);
  assert.equal(first.results[0].productId, 'el-zonte-before-dawn');
  assert.equal(first.results[0].status, 'sold');
  assert.equal(calls.some(call => call.method === 'PATCH' && call.url.endsWith('/listings/4591466297')), true);
  assert.equal(calls.filter(call => /\/listings\/\d+$/.test(call.url) && call.method === 'GET').length, 1);
  const second = await processEtsySaleEmail(setup, raw, {envelopeTo: DEFAULT_SALE_ADDRESS, now: now + 1000});
  assert.equal(second.results[0].duplicate, true);
  assert.equal(calls.filter(call => call.method === 'PATCH').length, 1);
});

test('a spoofed sale email does not change stock', async t => {
  const setup = env();
  t.mock.method(globalThis, 'fetch', async url => { throw Error('unexpected ' + url); });
  const raw = rawMessage({
    subject: 'You made a sale on Etsy - Order #4299000111',
    body: 'Order number: 4299000111\nItem: ' + originalName + '\nQuantity: 1\nhttps://www.etsy.com/listing/4591466297/x\n',
    auth: 'X-Ignore: none'
  });
  const result = await processEtsySaleEmail(setup, raw, {envelopeTo: DEFAULT_SALE_ADDRESS, now});
  assert.equal(result.skipped, 'unauthenticated');
  assert.equal(setup.PAINTING_STOCK.rows.size, 0);
});

test('a parse failure emails once per issue and a Gmail confirm is forwarded', async t => {
  const setup = env();
  const mails = [];
  t.mock.method(globalThis, 'fetch', async (url, options = {}) => {
    if (String(url).includes('oauth2.googleapis.com')) return Response.json({access_token: 'mail'});
    if (String(url).includes('gmail.googleapis.com')) { mails.push(JSON.parse(options.body || '{}')); return Response.json({id: 'mail'}); }
    throw Error('unexpected ' + url);
  });
  const raw = rawMessage({subject: 'You made a sale on Etsy', body: 'Congratulations, but this copy has no order fields.\n'});
  const first = await processEtsySaleEmail(setup, raw, {envelopeTo: DEFAULT_SALE_ADDRESS, now});
  const second = await processEtsySaleEmail(setup, raw, {envelopeTo: DEFAULT_SALE_ADDRESS, now: now + 1000});
  assert.equal(first.skipped, 'parse-failed');
  assert.equal(second.skipped, 'parse-failed');
  assert.equal(mails.length, 1);
  const confirm = parseRfc822([
    'From: Gmail Team <forwarding-noreply@google.com>',
    'To: ' + DEFAULT_SALE_ADDRESS,
    'Subject: Gmail Forwarding Confirmation - Receive Mail from tj@vermillionaurora.com',
    '',
    'Click this link to confirm forwarding.'
  ].join('\r\n'));
  assert.equal(isForwardingConfirmation(confirm.headers), true);
});
