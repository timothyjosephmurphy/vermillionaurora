import test from 'node:test';
import assert from 'node:assert/strict';
import { salesReceiptPayload, classify, intuitFetch, signState, verifyState, discover, qboString, qboName, docNumberFor, pacificDate,
  accountingClient, callbackUrl, authorizationUrl, refreshTokens, QboError, queueDelayMs, seal, unseal } from './quickbooks-core.mjs';

const env = { QBO_CLIENT_ID: 'client-id', QBO_CLIENT_SECRET: 'client-secret', QBO_ENVIRONMENT: 'sandbox' };
const refs = { customerId: '58', depositAccountId: '91', items: { original: '1', print: '2', deposit: '3', shipping: '4', tax: '5', discount: '6' } };
const receipt = (over = {}) => ({ kind: 'sale', status: 'COMPLETED', provider: 'square', currency: 'USD', orderId: 'cart:3f2a9c1e-1111-4222-8333-444455556666',
  transactionId: 'SQUAREPAYMENTID1234567890', paidAt: '2026-10-08T03:15:00.000Z', buyerName: 'Ada Lovelace', buyerEmail: 'ada@example.test',
  shippingAddress: { name: 'Ada Lovelace', street1: '600 4th Ave', street2: '', city: 'Seattle', state: 'WA', zip: '98104', country: 'US' },
  items: [
    { id: 'painting-portrait-in-gold', type: 'original', title: 'Dorian Nakamoto', amount: '200.00', quantity: 1 },
    { id: 'print-painting-portrait-in-green-small', type: 'print', title: 'Chase Toole — Small print', amount: '10.00', listAmount: '35.00', priceCode: 'owner', quantity: 2 },
    { id: 'deposit-small-landscape-12x15', type: 'deposit', title: 'Commission deposit', amount: '125.00', quantity: 1, commission: { packageTitle: 'Landscape 12 × 15' } }
  ],
  printCode: { kind: 'owner', hash: 'abcdef123456' }, shipping: '7.95', tax: '34.07', gross: '387.02', taxCalculationId: 'taxcalc_123', ...over });

test('maps a completed sale to an edition-neutral, USD, non-taxable SalesReceipt with tax, shipping and discount lines', () => {
  const p = salesReceiptPayload(receipt(), refs);
  assert.equal(p.DocNumber, 'VA-3f2a9c1e1111422283');
  assert.ok(p.DocNumber.length <= 21);
  assert.equal(p.TxnDate, '2026-10-07', 'Pacific date of payment');
  assert.deepEqual(p.CustomerRef, { value: '58' });
  assert.deepEqual(p.DepositToAccountRef, { value: '91' });
  assert.equal(p.PaymentRefNum.length <= 21, true);
  assert.match(p.PrivateNote, /cart:3f2a9c1e/);
  assert.equal(p.CurrencyRef, undefined, 'no multicurrency');
  assert.equal(p.TxnTaxDetail, undefined, 'no automated sales tax');
  const lines = p.Line.map(l => [l.SalesItemLineDetail.ItemRef.value, l.Amount, l.SalesItemLineDetail.Qty, l.SalesItemLineDetail.UnitPrice]);
  assert.deepEqual(lines, [['1', 200, 1, 200], ['2', 70, 2, 35], ['3', 125, 1, 125], ['6', -50, 1, -50], ['4', 7.95, 1, 7.95], ['5', 34.07, 1, 34.07]]);
  assert.ok(p.Line.every(l => l.SalesItemLineDetail.TaxCodeRef.value === 'NON'));
  assert.ok(p.Line.every(l => Math.round(l.Amount * 100) === Math.round(l.SalesItemLineDetail.UnitPrice * l.SalesItemLineDetail.Qty * 100)));
  assert.match(p.Line[3].Description, /owner code/);
  assert.equal(p.ShipAddr.CountrySubDivisionCode, 'WA');
});
test('rejects sales that do not balance, are not USD, or come from PayPal', () => {
  assert.throws(() => salesReceiptPayload(receipt({ gross: '400.00' }), refs), e => e.kind === 'validation' && /does not match/.test(e.message));
  assert.throws(() => salesReceiptPayload(receipt({ currency: 'EUR' }), refs), e => e.kind === 'validation');
  assert.throws(() => salesReceiptPayload(receipt({ provider: 'paypal' }), refs), e => e.kind === 'validation');
  assert.equal(salesReceiptPayload(receipt({ provider: 'btcpay' }), refs).PrivateNote.includes('BTCPay invoice'), true);
});
test('classifies Intuit responses', () => {
  const fault = (type, code) => ({ Fault: { Error: [{ Message: 'msg', Detail: 'detail', code }], type } });
  assert.equal(classify(400, fault('ValidationFault', '6000')).kind, 'validation');
  assert.equal(classify(400, fault('ValidationFault', '4000')).faultCode, '4000');
  assert.equal(classify(400, { error: 'invalid_grant' }).kind, 'invalid_grant');
  assert.equal(classify(401, fault('AuthenticationFault', '3200')).kind, 'auth');
  for (const s of [429, 500, 502, 503, 504]) assert.equal(classify(s, null).kind, 'transient');
  assert.equal(classify(500, fault('SystemFault', '10000')).kind, 'transient');
  assert.equal(classify(403, fault('AuthorizationFault', '003100')).kind, 'error');
});
const response = (status, body, tid) => new Response(body === undefined ? '' : JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', ...(tid ? { intuit_tid: tid } : {}) } });
test('captures intuit_tid on every call and retries only transient failures', async () => {
  const logs = [], waits = [];
  let n = 0;
  const fetcher = async () => [response(503, null, 'tid-1'), response(429, null, 'tid-2'), response(200, { ok: true }, 'tid-3')][n++];
  const r = await intuitFetch('https://sandbox-quickbooks.api.intuit.com/x', {}, { op: 'test', log: e => logs.push(e), wait: ms => waits.push(ms), fetcher });
  assert.equal(r.tid, 'tid-3');
  assert.deepEqual(logs.map(l => [l.status, l.tid, l.level]), [[503, 'tid-1', 'warn'], [429, 'tid-2', 'warn'], [200, 'tid-3', 'info']]);
  assert.equal(waits.length, 2);
  assert.ok(waits[1] >= waits[0] - 250, 'exponential backoff');
});
test('API syntax and validation errors are not retried and keep the intuit_tid', async () => {
  const logs = []; let calls = 0;
  const syntax = { Fault: { Error: [{ Message: 'Error parsing query', Detail: "QueryParserError: Encountered \" <INTEGER>", code: '4000' }], type: 'ValidationFault' } };
  await assert.rejects(intuitFetch('https://x.intuit.com/q', {}, { op: 'query Customer', log: e => logs.push(e), fetcher: async () => { calls++; return response(400, syntax, 'tid-syntax'); } }),
    e => e instanceof QboError && e.kind === 'validation' && e.tid === 'tid-syntax' && e.faultCode === '4000');
  assert.equal(calls, 1);
  assert.equal(logs[0].tid, 'tid-syntax'); assert.equal(logs[0].level, 'error'); assert.equal(logs[0].faultCode, '4000');
  const validation = { Fault: { Error: [{ Message: 'Required param missing', Detail: 'Required parameter Line.Amount is missing', code: '2020' }], type: 'ValidationFault' } };
  await assert.rejects(intuitFetch('https://x.intuit.com/c', {}, { op: 'create SalesReceipt', log: () => {}, fetcher: async () => response(400, validation, 'tid-v') }),
    e => e.kind === 'validation' && /Line.Amount/.test(e.message));
  let networkCalls = 0;
  await assert.rejects(intuitFetch('https://x.intuit.com/n', {}, { op: 'n', log: () => {}, wait: () => {}, fetcher: async () => { networkCalls++; throw new TypeError('fetch failed'); } }), e => e.kind === 'transient');
  assert.equal(networkCalls, 3);
});
test('signed OAuth state is tamper-evident, expiring and environment-bound', async () => {
  const state = await signState(env, 'nonce-1', Date.now() + 60000);
  assert.equal(await verifyState(env, state), 'nonce-1');
  assert.equal(await verifyState(env, state.slice(0, -2) + (state.endsWith('A') ? 'BB' : 'AA')), null);
  assert.equal(await verifyState({ ...env, QBO_CLIENT_SECRET: 'other' }, state), null);
  assert.equal(await verifyState({ ...env, QBO_ENVIRONMENT: 'production' }, state), null);
  assert.equal(await verifyState(env, await signState(env, 'n', Date.now() - 1)), null);
  assert.equal(await verifyState(env, 'not a state'), null);
});
test('discovery endpoints must be Intuit HTTPS URLs; authorization uses the accounting scope and registered redirect', async () => {
  const doc = { authorization_endpoint: 'https://appcenter.intuit.com/connect/oauth2', token_endpoint: 'https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer', revocation_endpoint: 'https://developer.api.intuit.com/v2/oauth2/tokens/revoke' };
  const endpoints = await discover(env, { fetcher: async url => { assert.match(url, /openid_sandbox_configuration$/); return response(200, doc, 'tid-d'); } });
  assert.equal(endpoints.token_endpoint, doc.token_endpoint);
  await assert.rejects(discover(env, { fetcher: async () => response(200, { ...doc, token_endpoint: 'https://evil.example/token' }) }), e => e.kind === 'config');
  const url = new URL(authorizationUrl(env, endpoints, 'STATE'));
  assert.equal(url.searchParams.get('scope'), 'com.intuit.quickbooks.accounting');
  assert.equal(url.searchParams.get('redirect_uri'), 'https://vermillion-checkout-sandbox.timothyjosephmurphy.workers.dev/quickbooks/callback');
  assert.equal(callbackUrl({ ...env, QBO_ENVIRONMENT: 'production' }), 'https://tjm.art/quickbooks/callback');
});
test('refresh rotates tokens and invalid_grant is reported for reconnection', async () => {
  const endpoints = { token_endpoint: 'https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer' };
  const t = await refreshTokens(env, endpoints, 'R1', { now: 1000, fetcher: async (url, init) => {
    assert.equal(init.headers.Authorization, `Basic ${btoa('client-id:client-secret')}`);
    assert.match(init.body, /grant_type=refresh_token&refresh_token=R1/);
    return response(200, { access_token: 'A2', refresh_token: 'R2', token_type: 'bearer', expires_in: 3600, x_refresh_token_expires_in: 8640000 }, 'tid-r');
  } });
  assert.deepEqual(t, { accessToken: 'A2', refreshToken: 'R2', accessExpiresAt: 3601000, refreshExpiresAt: 8640001000 });
  await assert.rejects(refreshTokens(env, endpoints, 'R1', { fetcher: async () => response(400, { error: 'invalid_grant' }, 'tid-ig') }), e => e.kind === 'invalid_grant' && e.tid === 'tid-ig');
});
test('accounting client uses minorversion, requestid and the company path', async () => {
  const seen = [];
  const client = accountingClient(env, { realmId: '9130354', accessToken: () => 'TOKEN', log: () => {}, fetcher: async (url, init) => { seen.push([url, init]); return response(200, { SalesReceipt: { Id: '77' }, QueryResponse: { Customer: [{ Id: '5' }] } }, 'tid'); } });
  assert.equal((await client.create('SalesReceipt', { Line: [] }, 'req-1')).Id, '77');
  assert.deepEqual(await client.query(`select Id from Customer where PrimaryEmailAddr = ${qboString("o'neil@example.test")}`, 'Customer'), [{ Id: '5' }]);
  const created = new URL(seen[0][0]), queried = new URL(seen[1][0]);
  assert.equal(created.pathname, '/v3/company/9130354/salesreceipt');
  assert.equal(created.searchParams.get('requestid'), 'req-1');
  assert.equal(created.searchParams.get('minorversion'), '75');
  assert.equal(created.hostname, 'sandbox-quickbooks.api.intuit.com');
  assert.equal(queried.searchParams.get('query'), "select Id from Customer where PrimaryEmailAddr = 'o\\'neil@example.test'");
  assert.equal(seen[0][1].headers.Authorization, 'Bearer TOKEN');
  assert.throws(() => accountingClient(env, { realmId: '../x', accessToken: () => '' }), e => e.kind === 'config');
});
test('names, document numbers, dates, retry schedule and sealed storage', async () => {
  assert.equal(qboName('A: B\tC\nD'), 'A B C D');
  assert.equal(docNumberFor('cart:abc-def'), 'VA-abcdef');
  assert.equal(pacificDate('2026-07-01T06:59:00Z'), '2026-06-30');
  assert.deepEqual([1, 2, 3, 4, 5, 6, 20].map(queueDelayMs), [60e3, 300e3, 900e3, 3600e3, 10800e3, 21600e3, 21600e3]);
  const sealed = await seal(env, { refreshToken: 'secret-refresh' });
  assert.ok(!sealed.includes('secret-refresh'));
  assert.deepEqual(await unseal(env, sealed), { refreshToken: 'secret-refresh' });
});

test('production-cost sources: placed print orders and finished labels only; deposits have none', async () => {
  const { costSources } = await import('./quickbooks-costs.mjs');
  const base = { id: '9a8b7c6d-1111-4222-8333-444455556666', status: 'paid', mode: 'live', paidAt: '2026-10-02T22:48:12.197Z', jobs: [] };
  assert.deepEqual(costSources({ ...base, quote: { items: [{ type: 'deposit' }] } }), []);
  assert.deepEqual(costSources({ ...base, status: 'review' }), []);
  const print = { provider: 'finerworks', status: 'creating', request: { merchantReference: 'va-cart-x-prints' }, quotedProductionCost: '31.20', quotedShipping: '9.95', maximumProviderCost: '41.15', items: [] };
  assert.deepEqual(costSources({ ...base, printJob: print }), []);
  const [placed] = costSources({ ...base, printJob: { ...print, status: 'in-production', providerId: '812345', attemptedAt: Date.parse('2026-10-02T22:49:00Z') } });
  assert.equal(placed.type, 'print'); assert.equal(placed.vendor, 'finerworks'); assert.equal(placed.saleDocNumber, 'VA-9a8b7c6d1111422283');
  assert.equal(placed.placedAt, '2026-10-02T22:49:00.000Z'); assert.deepEqual(placed.quoted, { production: '31.20', shipping: '9.95', maximum: '41.15' });
  const ready = { status: 'ready', transactionId: 'tx_1', attemptedAt: Date.parse('2026-10-02T23:00:00Z'), quote: { slug: 'a', rateId: 'rate_1', shipping: '20.00', carrier: 'UPS', service: 'Ground' } };
  assert.deepEqual(costSources({ ...base, jobs: [ready, { status: 'waiting' }] }), []);
  const [labels] = costSources({ ...base, jobs: [ready, { status: 'review' }] });
  assert.equal(labels.type, 'label'); assert.equal(labels.labels.length, 1); assert.equal(labels.labels[0].quoted, '20.00');
});

// ---------- At-cost (collector) print code marker ----------
const collector = { kind: 'collector', hash: '0123456789ab', suffix: 'V6DE' };
const printOnly = over => receipt({ items: [{ id: 'print-x-small', type: 'print', title: 'Emergence — Small print', amount: '7.00', listAmount: '35.00', priceCode: 'collector', quantity: 2 }],
  shipping: '7.95', tax: '1.98', gross: '23.93', printCode: collector, ...over });
test('at-cost collector code: Memo marker with masked code, amounts and lines unchanged; owner code never marked', async () => {
  const { AT_COST_MARKER, purchasePayload, withAtCostMarker } = await import('./quickbooks-core.mjs');
  assert.equal(AT_COST_MARKER, 'At-cost testimonial print code — marketing');
  const marked = salesReceiptPayload(printOnly(), refs), plain = salesReceiptPayload(printOnly({ printCode: { kind: 'owner', hash: 'abcdef123456' } }), refs);
  assert.equal(marked.PrivateNote, 'At-cost testimonial print code — marketing (code VA-…-V6DE). Vermillion Aurora order cart:3f2a9c1e-1111-4222-8333-444455556666; Square payment SQUAREPAYMENTID1234567890');
  assert.equal(plain.PrivateNote, 'Vermillion Aurora order cart:3f2a9c1e-1111-4222-8333-444455556666; Square payment SQUAREPAYMENTID1234567890', 'owner-code orders are not marked');
  const { PrivateNote: _a, Line: linesA, ...restA } = marked, { PrivateNote: _b, Line: linesB, ...restB } = plain;
  assert.deepEqual(restA, restB, 'only the Memo differs');
  assert.deepEqual(linesA.map(l => [l.Amount, l.SalesItemLineDetail.ItemRef.value]), linesB.map(l => [l.Amount, l.SalesItemLineDetail.ItemRef.value]));
  assert.equal(marked.CustomerMemo, undefined, 'customer-facing message untouched');
  assert.equal(salesReceiptPayload(printOnly({ printCode: undefined }), refs).PrivateNote.includes(AT_COST_MARKER), false);
  // Older sales (no stored suffix) and anything that is not a clean code group get the marker without a code reference.
  assert.equal(salesReceiptPayload(printOnly({ printCode: { kind: 'collector', hash: 'x' } }), refs).PrivateNote.startsWith('At-cost testimonial print code — marketing. Vermillion'), true);
  assert.equal(salesReceiptPayload(printOnly({ printCode: { kind: 'collector', suffix: 'VA-ABCD-EFGH-JKLM' } }), refs).PrivateNote.includes('ABCD'), false);
  assert.equal(withAtCostMarker(marked.PrivateNote, collector), marked.PrivateNote, 'idempotent');
  // Matching production-cost Purchase.
  const cost = { kind: 'cost', type: 'print', vendor: 'finerworks', orderId: 'cart:3f2a9c1e-1111-4222-8333-444455556666', saleDocNumber: 'VA-3f2a9c1e1111422283' };
  const resolved = { placedAt: '2026-10-08T03:20:00Z', totalCents: 1795, amountSource: 'actual', memo: 'Production cost for Vermillion Aurora order VA-3f2a9c1e1111422283 (cart:3f2a9c1e-1111-4222-8333-444455556666); FinerWorks order 1', lines: [{ account: 'cogsPrints', cents: 1400, description: 'Print production' }, { account: 'cogsShipping', cents: 395, description: 'Print-lab shipping' }] };
  const prefs = { cardAccountId: '9', vendorId: '12', accounts: { cogsPrints: '20', cogsShipping: '21' } };
  const p1 = purchasePayload(cost, resolved, prefs, collector), p0 = purchasePayload(cost, resolved, prefs);
  assert.equal(p1.PrivateNote, `At-cost testimonial print code — marketing (code VA-…-V6DE). ${resolved.memo}`);
  assert.equal(p0.PrivateNote, resolved.memo);
  const { PrivateNote: _c, ...r1 } = p1, { PrivateNote: _d, ...r0 } = p0;
  assert.deepEqual(r1, r0, 'Purchase amounts, accounts and lines unchanged');
});
test('backfill sparse-updates only PrivateNote, skips marked records and never touches another order', async () => {
  const { markAtCostRecords } = await import('./quickbooks-markers.mjs');
  const orderId = 'cart:3f2a9c1e-1111-4222-8333-444455556666';
  const store = {
    'salesreceipt/101': { Id: '101', SyncToken: '0', TotalAmt: 23.93, PrivateNote: `Vermillion Aurora order ${orderId}; Square payment X` },
    'purchase/202': { Id: '202', SyncToken: '3', TotalAmt: 17.95, PrivateNote: `Production cost for Vermillion Aurora order VA-3f2a9c1e1111422283 (${orderId}); FinerWorks order 1` },
    'salesreceipt/103': { Id: '103', SyncToken: '1', TotalAmt: 5, PrivateNote: 'At-cost testimonial print code — marketing. Vermillion Aurora order cart:other' },
    'salesreceipt/104': { Id: '104', SyncToken: '1', TotalAmt: 5, PrivateNote: 'Typed by hand' }
  };
  const updates = [];
  const client = { read: async path => store[path] ? { ...store[path] } : null,
    update: async (entity, payload) => { updates.push([entity, payload]); const key = `${entity.toLowerCase()}/${payload.Id}`; store[key] = { ...store[key], ...payload, SyncToken: String(Number(payload.SyncToken) + 1) }; return store[key]; } };
  const result = await markAtCostRecords(client, {
    sales: [{ orderId, qboId: '101', docNumber: 'VA-3f2a9c1e1111422283', printCode: { kind: 'collector' } }, { orderId: 'cart:other', qboId: '103', docNumber: 'VA-other' }, { orderId: 'cart:third', qboId: '104', docNumber: 'VA-third' }],
    costs: [{ orderId, qboId: '202', docNumber: 'VP-3f2a9c1e1111422283', printCode: { kind: 'collector' } }] });
  assert.deepEqual(result.marked, ['SalesReceipt VA-3f2a9c1e1111422283', 'Purchase VP-3f2a9c1e1111422283']);
  assert.deepEqual(result.already, ['SalesReceipt VA-other']);
  assert.match(result.errors[0], /VA-third: memo does not name this order/);
  assert.deepEqual(updates.map(([e, p]) => [e, Object.keys(p).sort()]), [['SalesReceipt', ['Id', 'PrivateNote', 'SyncToken', 'sparse']], ['Purchase', ['Id', 'PrivateNote', 'SyncToken', 'sparse']]]);
  assert.equal(updates[1][1].SyncToken, '3'); assert.equal(updates[0][1].sparse, true);
  assert.equal(store['salesreceipt/101'].PrivateNote, `At-cost testimonial print code — marketing. Vermillion Aurora order ${orderId}; Square payment X`);
  // Running again changes nothing.
  updates.length = 0;
  const again = await markAtCostRecords(client, { sales: [{ orderId, qboId: '101', docNumber: 'VA-1', printCode: { kind: 'collector' } }], costs: [{ orderId, qboId: '202', docNumber: 'VP-1', printCode: { kind: 'collector' } }] });
  assert.equal(updates.length, 0); assert.equal(again.already.length, 2);
  // A changed total is reported, not hidden.
  const bad = { read: async () => ({ Id: '9', SyncToken: '0', TotalAmt: 10, PrivateNote: `x ${orderId}` }), update: async (e, p) => ({ ...p, TotalAmt: 11 }) };
  assert.match((await markAtCostRecords(bad, { sales: [{ orderId, qboId: '9', docNumber: 'VA-9', printCode: { kind: 'collector' } }] })).errors[0], /total changed/);
});
test('accounting client sparse update posts to the entity with operation=update', async () => {
  const seen = [];
  const client = accountingClient(env, { realmId: '9130354', accessToken: () => 'TOKEN', log: () => {}, fetcher: async (url, init) => { seen.push([url, init]); return response(200, { Purchase: { Id: '5', SyncToken: '2' } }, 'tid'); } });
  assert.equal((await client.update('Purchase', { Id: '5', SyncToken: '1', sparse: true, PrivateNote: 'n' })).SyncToken, '2');
  const u = new URL(seen[0][0]);
  assert.equal(u.pathname, '/v3/company/9130354/purchase'); assert.equal(u.searchParams.get('operation'), 'update'); assert.equal(seen[0][1].method, 'POST');
  assert.deepEqual(JSON.parse(seen[0][1].body), { Id: '5', SyncToken: '1', sparse: true, PrivateNote: 'n' });
});
