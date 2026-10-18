import test from 'node:test';
import assert from 'node:assert/strict';
import { tipSkipReason, tipPayments, tipReceipt, tipSalesReceiptPayload, tipRate, recordTipInvoice, tipFromWebhook, pollTips, tipDocNumber, validateTip, tipSyncEnabled } from './btcpay-tips.mjs';
import { validBitcoinSignature } from './bitcoin-api.mjs';
import { ACCOUNT_DEFAULTS, ITEM_DEFAULTS } from './quickbooks-core.mjs';

const settledAt = Date.parse('2026-10-18T04:30:00Z');
const invoice = (over = {}) => ({ id: 'TipInv1234567890abcdXYZ', storeId: 'store1', status: 'Settled', additionalStatus: 'None', currency: 'SATS', amount: '21000',
  createdTime: settledAt / 1000 - 30, metadata: { itemDesc: 'Portrait in Gold' }, ...over });
const methods = (over = {}) => [{ paymentMethodId: 'BTC-LN', currency: 'BTC', rate: '100000000', payments: [{ id: 'p1', value: '0.00021', status: 'Settled', receivedDate: settledAt / 1000 }], ...over },
  { paymentMethodId: 'BTC-CHAIN', currency: 'BTC', rate: '100000000', payments: [] }];
const env = (over = {}) => ({ BTCPAY_URL: 'https://btcpay.example.test', BTCPAY_STORE_ID: 'store1', BTCPAY_API_KEY: 'k', QBO_CLIENT_ID: 'c', QBO_CLIENT_SECRET: 's',
  QBO_SYNC_ENABLED: 'true', QBO_TIP_SYNC_ENABLED: 'true', ...over });
// Mocked BTCPay (read-only GETs) and Coinbase. Nothing is paid.
function mockFetch(t, { list = [invoice()], storeRate = '68000.5', coinbase = '67000.25' } = {}) {
  const calls = [];
  t.mock.method(globalThis, 'fetch', async (input, init = {}) => {
    const url = new URL(input); calls.push({ url, method: init.method });
    assert.notEqual(init.method, 'POST', 'BTCPay is only read');
    if (url.hostname === 'api.coinbase.com') return Response.json({ data: { amount: coinbase } });
    if (url.pathname.endsWith('/payment-methods')) return Response.json(methods());
    if (url.pathname.endsWith('/rates')) return Response.json([{ currencyPair: 'BTC_USD', errors: [], rate: storeRate }]);
    if (url.pathname.endsWith('/invoices')) return Response.json(list);
    throw Error(`Unexpected ${url.href}`);
  });
  return calls;
}
const queueStub = () => { const seen = new Map(); return { seen, QUICKBOOKS: { getByName: () => ({ enqueueTip: async tip => { const dup = seen.has(tip.orderId); seen.set(tip.orderId, tip); return { queued: true, duplicate: dup }; } }) } }; };

test('tjm.art checkout invoices and unsettled invoices are never tips', () => {
  assert.match(tipSkipReason(invoice({ metadata: { orderId: 'va-cart-3f2a9c1e-1111-4222-8333-444455556666' } })), /checkout order/);
  assert.match(tipSkipReason(invoice({ metadata: { orderId: 'va-btc-3f2a9c1e-1111-4222-8333-444455556666' } })), /checkout order/);
  assert.match(tipSkipReason(invoice({ status: 'Processing' })), /status/);
  assert.match(tipSkipReason(invoice({ additionalStatus: 'PaidPartial' })), /additional/);
  assert.equal(tipSkipReason(invoice()), null);
  assert.equal(tipSkipReason(invoice({ additionalStatus: 'PaidOver' })), null);
});

test('maps a zap to a non-taxable SalesReceipt with sats, USD at receipt, rate, rate source, invoice id and work', () => {
  const payments = tipPayments(methods());
  assert.deepEqual(payments, { sats: 21000, receivedAt: '2026-10-18T04:30:00.000Z', method: 'BTC-LN', invoiceRate: 100000000 });
  const tip = tipReceipt(invoice(), payments, { value: 68000.5, source: 'BTCPay store rate', at: '2026-10-18T04:30:05.000Z' });
  assert.equal(tip.gross, '14.28'); // 21,000 sats × $68,000.50 / 1e8
  assert.equal(tip.orderId, 'tip:TipInv1234567890abcdXYZ');
  const p = tipSalesReceiptPayload(tip, { itemId: '9', depositAccountId: '91', customerId: '58' });
  assert.equal(p.DocNumber, tipDocNumber(tip.transactionId)); assert.ok(p.DocNumber.length <= 21);
  assert.equal(p.TxnDate, '2026-10-17', 'Pacific date of receipt');
  assert.deepEqual(p.DepositToAccountRef, { value: '91' });
  assert.equal(p.Line.length, 1); assert.equal(p.Line[0].Amount, 14.28);
  assert.equal(p.Line[0].SalesItemLineDetail.TaxCodeRef.value, 'NON');
  for (const s of ['taxable business income (not a gift)', '21,000 sats', '$14.28', 'BTC/USD 68,000.50', 'BTCPay store rate', 'BTCPay invoice TipInv1234567890abcdXYZ', 'For: Portrait in Gold'])
    assert.ok(p.PrivateNote.includes(s), s);
  assert.equal(ACCOUNT_DEFAULTS[ITEM_DEFAULTS.tip.account].name, 'Tips & Zaps Income');
  assert.equal(ACCOUNT_DEFAULTS.tips.type, 'Income');
  assert.throws(() => validateTip({ ...tip, gross: '0.00' }), /USD value/);
});

test('rate source: BTCPay invoice rate for USD invoices, BTCPay store rate near settlement, Coinbase daily spot later', async t => {
  const calls = mockFetch(t);
  const payments = tipPayments(methods({ rate: '67500.12' }));
  assert.deepEqual(await tipRate(env(), invoice({ currency: 'USD' }), payments), { value: 67500.12, source: 'BTCPay invoice rate at settlement' });
  assert.equal(calls.length, 0);
  const near = await tipRate(env(), invoice(), tipPayments(methods()), { now: settledAt + 5000 });
  assert.equal(near.value, 68000.5); assert.equal(near.source, 'BTCPay store rate');
  const late = await tipRate(env(), invoice(), tipPayments(methods()), { now: settledAt + 3 * 3600e3 });
  assert.equal(late.value, 67000.25); assert.match(late.source, /Coinbase/); assert.equal(late.at, '2026-10-18');
});

test('signed InvoiceSettled webhook for a tip queues it once; disabled sync, order invoices and other events do nothing', async t => {
  mockFetch(t);
  const raw = JSON.stringify({ type: 'InvoiceSettled', storeId: 'store1', invoiceId: invoice().id });
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode('whsec'), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = 'sha256=' + [...new Uint8Array(await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(raw)))].map(b => b.toString(16).padStart(2, '0')).join('');
  assert.equal(await validBitcoinSignature(raw, sig, 'whsec'), true);
  assert.equal(await validBitcoinSignature(raw.replace('Settled', 'Expired'), sig, 'whsec'), false);
  const q = queueStub(), e = env(q), event = JSON.parse(raw);
  assert.deepEqual(await tipFromWebhook(e, event, invoice()), { invoiceId: invoice().id, queued: true, duplicate: false });
  assert.deepEqual(await tipFromWebhook(e, event, invoice()), { invoiceId: invoice().id, queued: true, duplicate: true });
  assert.equal(q.seen.size, 1);
  assert.match((await tipFromWebhook(e, event, invoice({ metadata: { orderId: 'va-cart-x' } }))).skipped, /checkout order/);
  assert.ok((await tipFromWebhook(e, { ...event, type: 'InvoiceReceivedPayment' }, invoice())).skipped);
  assert.ok((await tipFromWebhook(env({ ...q, QBO_TIP_SYNC_ENABLED: undefined }), event, invoice())).skipped);
  assert.equal(q.seen.size, 1);
});

test('poll/backfill is idempotent by invoice id, skips tjm.art orders, and dry run never queues', async t => {
  const order = invoice({ id: 'OrderInv1', metadata: { orderId: 'va-cart-3f2a9c1e-1111-4222-8333-444455556666' } });
  const calls = mockFetch(t, { list: [invoice(), order] });
  const q = queueStub(), e = env(q);
  assert.equal(tipSyncEnabled(env({ QBO_TIP_SYNC_ENABLED: 'false' })), false);
  assert.deepEqual(await pollTips(env({ QBO_TIP_SYNC_ENABLED: 'false' })), { skipped: 'tip sync disabled (QBO_TIP_SYNC_ENABLED)' });
  assert.equal(calls.length, 0, 'disabled: no BTCPay calls');
  const dry = await pollTips(e, { dryRun: true, now: settledAt + 3600e3 });
  assert.equal(q.seen.size, 0); assert.equal(dry.results[0].tip.gross, '14.07'); assert.match(dry.results[1].skipped, /checkout order/);
  const first = await pollTips(e, { now: settledAt + 3600e3 }), second = await pollTips(e, { now: settledAt + 3600e3 });
  assert.equal(first.queued, 1); assert.equal(second.queued, 0); assert.equal(q.seen.size, 1);
  assert.ok(calls.every(c => c.method !== 'POST'));
  assert.match(calls.find(c => c.url.pathname.endsWith('/invoices')).url.search, /status=Settled/);
});

test('a dust zap worth under one cent is skipped', async t => {
  t.mock.method(globalThis, 'fetch', async input => new URL(input).pathname.endsWith('/payment-methods')
    ? Response.json(methods({ payments: [{ id: 'p', value: '0.00000001', status: 'Settled', receivedDate: settledAt / 1000 }] }))
    : Response.json([{ currencyPair: 'BTC_USD', errors: [], rate: '68000' }]));
  assert.match((await recordTipInvoice(env(queueStub()), invoice(), { now: settledAt })).skipped, /one cent/);
});
