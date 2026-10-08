// QuickBooks Online (Accounting API only) helpers shared by the sync Durable Object and its routes.
// Edition-neutral: only Customer, Vendor, Item, Account, SalesReceipt, Purchase, CompanyInfo and Preferences are used.
// USD only (no CurrencyRef / multicurrency), no automated sales-tax API (tax is a plain line), no webhooks, no CDC.
// Never log tokens, client credentials or authorization codes.
export const QBO_SCOPE = 'com.intuit.quickbooks.accounting';
export const MINOR_VERSION = '75';
export const DISCOVERY = {
  production: 'https://developer.api.intuit.com/.well-known/openid_configuration',
  sandbox: 'https://developer.api.intuit.com/.well-known/openid_sandbox_configuration'
};
export const API_BASE = { production: 'https://quickbooks.api.intuit.com', sandbox: 'https://sandbox-quickbooks.api.intuit.com' };
// Redirect URIs registered with Intuit; the callback must match exactly.
// Production is served on tjm.art: the website Worker forwards /quickbooks/* API paths to this Worker (service binding).
export const QBO_ORIGINS = {
  production: 'https://tjm.art',
  sandbox: 'https://vermillion-checkout-sandbox.timothyjosephmurphy.workers.dev'
};
export const environment = env => env.QBO_ENVIRONMENT === 'sandbox' ? 'sandbox' : 'production';
export const callbackUrl = env => `${QBO_ORIGINS[environment(env)]}/quickbooks/callback`;
export const configured = env => Boolean(env.QBO_CLIENT_ID && env.QBO_CLIENT_SECRET);
export const syncEnabled = env => env.QBO_SYNC_ENABLED === 'true' && configured(env);
export const DISCONNECTED_PAGE = 'https://tjm.art/quickbooks/disconnected/';

const encoder = new TextEncoder();
const b64 = bytes => btoa(String.fromCharCode(...new Uint8Array(bytes)));
const b64url = bytes => b64(bytes).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const unb64url = value => Uint8Array.from(atob(value.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((value.length + 3) % 4)), c => c.charCodeAt(0));
export const randomToken = () => b64url(crypto.getRandomValues(new Uint8Array(32)));
export const sha256Hex = async value => [...new Uint8Array(await crypto.subtle.digest('SHA-256', encoder.encode(value)))].map(b => b.toString(16).padStart(2, '0')).join('');

export class QboError extends Error {
  // kind: transient (retry with backoff), auth (refresh access token), invalid_grant (reconnect),
  // validation (request rejected; needs review), config, error (other non-retryable)
  constructor(message, { kind = 'error', status = 0, tid = '', faultType = '', faultCode = '', retryAfter = 0 } = {}) {
    super(message); this.name = 'QboError'; Object.assign(this, { kind, status, tid, faultType, faultCode, retryAfter });
  }
}

// Signed, expiring OAuth state (CSRF). The nonce is also single-use in durable storage and bound to a browser cookie.
async function stateKey(env) {
  const material = await crypto.subtle.importKey('raw', encoder.encode(env.QBO_CLIENT_SECRET), 'HKDF', false, ['deriveKey']);
  return crypto.subtle.deriveKey({ name: 'HKDF', hash: 'SHA-256', salt: encoder.encode(env.QBO_CLIENT_ID), info: encoder.encode('vermillion-qbo-state-v1') },
    material, { name: 'HMAC', hash: 'SHA-256', length: 256 }, false, ['sign', 'verify']);
}
export async function signState(env, nonce, expiresAt) {
  const payload = b64url(encoder.encode(JSON.stringify({ n: nonce, e: expiresAt, v: environment(env) })));
  const signature = b64url(await crypto.subtle.sign('HMAC', await stateKey(env), encoder.encode(payload)));
  return `${payload}.${signature}`;
}
export async function verifyState(env, state, now = Date.now()) {
  if (typeof state !== 'string' || state.length > 512 || !/^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/.test(state)) return null;
  const [payload, signature] = state.split('.');
  let valid = false;
  try { valid = await crypto.subtle.verify('HMAC', await stateKey(env), unb64url(signature), encoder.encode(payload)); } catch { return null; }
  if (!valid) return null;
  let data; try { data = JSON.parse(new TextDecoder().decode(unb64url(payload))); } catch { return null; }
  if (typeof data.n !== 'string' || !Number.isFinite(data.e) || data.e <= now || data.v !== environment(env)) return null;
  return data.n;
}

// Token storage encryption (application-level, inside the Durable Object's private storage).
async function sealKey(env) {
  const material = await crypto.subtle.importKey('raw', encoder.encode(env.QBO_CLIENT_SECRET), 'HKDF', false, ['deriveKey']);
  return crypto.subtle.deriveKey({ name: 'HKDF', hash: 'SHA-256', salt: encoder.encode(env.QBO_CLIENT_ID), info: encoder.encode('vermillion-qbo-connection-v1') },
    material, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);
}
export async function seal(env, value) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const data = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, await sealKey(env), encoder.encode(JSON.stringify(value)));
  return JSON.stringify({ v: 1, iv: b64(iv), data: b64(data) });
}
export async function unseal(env, sealed) {
  const { iv, data } = JSON.parse(sealed);
  const from = s => Uint8Array.from(atob(s), c => c.charCodeAt(0));
  return JSON.parse(new TextDecoder().decode(await crypto.subtle.decrypt({ name: 'AES-GCM', iv: from(iv) }, await sealKey(env), from(data))));
}

export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const TRANSIENT_STATUS = new Set([408, 425, 429, 500, 502, 503, 504]);
function faultOf(body) {
  const fault = body?.Fault || body?.fault;
  const error = fault?.Error?.[0] || fault?.error?.[0];
  return { faultType: String(fault?.type || ''), faultCode: String(error?.code || ''), message: String(error?.Detail || error?.Message || body?.error_description || body?.error || '').slice(0, 500) };
}
export function classify(status, body) {
  const fault = faultOf(body);
  if (status === 400 && (body?.error === 'invalid_grant')) return { kind: 'invalid_grant', ...fault };
  if (status === 401) return { kind: 'auth', ...fault };
  if (TRANSIENT_STATUS.has(status) || /SystemFault|ServiceFault/i.test(fault.faultType)) return { kind: 'transient', ...fault };
  if (status === 400) return { kind: 'validation', ...fault };
  return { kind: 'error', ...fault };
}

// One HTTPS call with intuit_tid capture and logging. Transient failures retry with exponential backoff.
export async function intuitFetch(url, init, { op, log = () => {}, orderId = '', attempts = 3, wait = sleep, fetcher = fetch } = {}) {
  let last;
  for (let attempt = 1; attempt <= attempts; attempt++) {
    let response, body = null, tid = '';
    const started = Date.now();
    try {
      response = await fetcher(url, { ...init, redirect: 'manual', signal: AbortSignal.timeout(20000) });
      tid = response.headers.get('intuit_tid') || '';
      const text = await response.text();
      try { body = text ? JSON.parse(text) : null; } catch { body = { error: 'unparseable_response' }; }
    } catch (error) {
      last = new QboError(`Network error during ${op}`, { kind: 'transient' });
      await log({ level: 'warn', op, status: 0, tid: '', orderId, attempt, message: error.name === 'TimeoutError' ? 'timeout' : 'network error', ms: Date.now() - started });
      if (attempt < attempts) await wait(backoffMs(attempt));
      continue;
    }
    if (response.ok) {
      await log({ level: 'info', op, status: response.status, tid, orderId, attempt, ms: Date.now() - started });
      return { body, tid, status: response.status };
    }
    const c = classify(response.status, body);
    const retryAfter = Math.min(Number(response.headers.get('Retry-After')) || 0, 30) * 1000;
    last = new QboError(`${op} failed: HTTP ${response.status}${c.faultCode ? ` code ${c.faultCode}` : ''}${c.message ? ` — ${c.message}` : ''}`, { kind: c.kind, status: response.status, tid, faultType: c.faultType, faultCode: c.faultCode, retryAfter });
    await log({ level: c.kind === 'transient' ? 'warn' : 'error', op, status: response.status, tid, orderId, attempt, faultType: c.faultType, faultCode: c.faultCode, message: c.message, ms: Date.now() - started });
    if (c.kind !== 'transient' || attempt === attempts) break;
    await wait(Math.max(retryAfter, backoffMs(attempt)));
  }
  throw last;
}
export const backoffMs = attempt => Math.min(500 * 2 ** (attempt - 1), 8000) + Math.floor(Math.random() * 250);
// Queue-level retry schedule for orders: 1 min, 5 min, 15 min, 1 h, 3 h, then every 6 h.
export const queueDelayMs = attempts => [60e3, 300e3, 900e3, 3600e3, 10800e3][attempts - 1] ?? 21600e3;

export async function discover(env, { log, fetcher } = {}) {
  const { body } = await intuitFetch(DISCOVERY[environment(env)], { method: 'GET', headers: { Accept: 'application/json' } }, { op: 'discovery', log, fetcher });
  const endpoints = {};
  for (const key of ['authorization_endpoint', 'token_endpoint', 'revocation_endpoint']) {
    const value = body?.[key];
    let url; try { url = new URL(value); } catch { throw new QboError(`Discovery document is missing ${key}`, { kind: 'config' }); }
    if (url.protocol !== 'https:' || !/(^|\.)intuit\.com$/.test(url.hostname)) throw new QboError(`Discovery ${key} is not an Intuit HTTPS endpoint`, { kind: 'config' });
    endpoints[key] = url.href;
  }
  return { ...endpoints, fetchedAt: Date.now() };
}
export function authorizationUrl(env, endpoints, state) {
  const url = new URL(endpoints.authorization_endpoint);
  url.search = new URLSearchParams({ client_id: env.QBO_CLIENT_ID, response_type: 'code', scope: QBO_SCOPE, redirect_uri: callbackUrl(env), state }).toString();
  return url.href;
}
const basic = env => `Basic ${btoa(`${env.QBO_CLIENT_ID}:${env.QBO_CLIENT_SECRET}`)}`;
function tokensFrom(body, now) {
  if (typeof body?.access_token !== 'string' || typeof body?.refresh_token !== 'string' || !Number.isFinite(body?.expires_in) || String(body?.token_type).toLowerCase() !== 'bearer')
    throw new QboError('Token response was incomplete', { kind: 'error' });
  return { accessToken: body.access_token, refreshToken: body.refresh_token, accessExpiresAt: now + body.expires_in * 1000,
    refreshExpiresAt: Number.isFinite(body.x_refresh_token_expires_in) ? now + body.x_refresh_token_expires_in * 1000 : null };
}
export async function exchangeCode(env, endpoints, code, { log, fetcher, now = Date.now() } = {}) {
  const { body } = await intuitFetch(endpoints.token_endpoint, { method: 'POST', headers: { Authorization: basic(env), Accept: 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'authorization_code', code, redirect_uri: callbackUrl(env) }).toString() }, { op: 'token exchange', log, fetcher });
  return tokensFrom(body, now);
}
export async function refreshTokens(env, endpoints, refreshToken, { log, fetcher, now = Date.now() } = {}) {
  const { body } = await intuitFetch(endpoints.token_endpoint, { method: 'POST', headers: { Authorization: basic(env), Accept: 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'refresh_token', refresh_token: refreshToken }).toString() }, { op: 'token refresh', log, fetcher });
  return tokensFrom(body, now);
}
export async function revokeToken(env, endpoints, token, { log, fetcher } = {}) {
  await intuitFetch(endpoints.revocation_endpoint, { method: 'POST', headers: { Authorization: basic(env), Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ token }) }, { op: 'token revoke', log, fetcher });
}

// Accounting API client bound to one company and access token.
export function accountingClient(env, { realmId, accessToken, log, fetcher, orderId = '' }) {
  if (!/^\d{1,30}$/.test(String(realmId))) throw new QboError('Invalid company id', { kind: 'config' });
  const base = `${API_BASE[environment(env)]}/v3/company/${realmId}`;
  const headers = () => ({ Authorization: `Bearer ${accessToken()}`, Accept: 'application/json', 'Content-Type': 'application/json' });
  const call = (path, params, init, op) => {
    const url = new URL(`${base}/${path}`);
    url.search = new URLSearchParams({ minorversion: MINOR_VERSION, ...params }).toString();
    return intuitFetch(url.href, { ...init, headers: headers() }, { op, log, fetcher, orderId }).then(r => r.body);
  };
  return {
    query: (statement, entity) => call('query', { query: statement }, { method: 'GET' }, `query ${entity}`).then(b => b?.QueryResponse?.[entity] || []),
    create: (entity, payload, requestId) => call(entity.toLowerCase(), requestId ? { requestid: requestId } : {}, { method: 'POST', body: JSON.stringify(payload) }, `create ${entity}`).then(b => b?.[entity]),
    // Sparse update: only the fields in payload change (payload carries Id, SyncToken and sparse: true).
    update: (entity, payload) => call(entity.toLowerCase(), { operation: 'update' }, { method: 'POST', body: JSON.stringify(payload) }, `update ${entity}`).then(b => b?.[entity]),
    read: (path, entity) => call(path, {}, { method: 'GET' }, `read ${entity}`).then(b => b?.[entity])
  };
}

// QuickBooks query literal: escape backslashes and quotes, strip control characters.
export const qboString = value => `'${String(value).replace(/[\u0000-\u001f]/g, ' ').replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
// Names cannot contain ':' (sub-entity separator), tabs or newlines; 100-character limit.
export const qboName = value => String(value || '').replace(/[:\t\r\n]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 100);
const cents = value => Math.round(Number(value) * 100);
const dollars = value => (value / 100).toFixed(2);
export const pacificDate = iso => new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Los_Angeles', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(iso));
export const docNumberFor = orderId => `VA-${String(orderId).replace(/^cart:/, '').replace(/[^A-Za-z0-9]/g, '').slice(0, 18)}`;

export const ITEM_DEFAULTS = {
  original: { env: 'QBO_ITEM_ORIGINAL', name: 'Original painting', account: 'income' },
  print: { env: 'QBO_ITEM_PRINT', name: 'Fine-art print', account: 'income' },
  deposit: { env: 'QBO_ITEM_DEPOSIT', name: 'Commission deposit', account: 'deposit' },
  shipping: { env: 'QBO_ITEM_SHIPPING', name: 'Shipping', account: 'shipping' },
  tax: { env: 'QBO_ITEM_TAX', name: 'Sales tax collected', account: 'tax' },
  discount: { env: 'QBO_ITEM_DISCOUNT', name: 'Discounts', account: 'discount' }
};
export const ACCOUNT_DEFAULTS = {
  income: { env: 'QBO_INCOME_ACCOUNT', name: 'Art sales', type: 'Income', subType: 'SalesOfProductIncome' },
  deposit: { env: 'QBO_DEPOSIT_INCOME_ACCOUNT', name: 'Commission deposits', type: 'Income', subType: 'ServiceFeeIncome' },
  shipping: { env: 'QBO_SHIPPING_ACCOUNT', name: 'Shipping income', type: 'Income', subType: 'OtherPrimaryIncome' },
  tax: { env: 'QBO_TAX_ACCOUNT', name: 'Sales tax collected', type: 'Other Current Liability', subType: 'OtherCurrentLiabilities' },
  discount: { env: 'QBO_DISCOUNT_ACCOUNT', name: 'Discounts given', type: 'Income', subType: 'DiscountsRefundsGiven' },
  square: { env: 'QBO_SQUARE_DEPOSIT_ACCOUNT', name: 'Square clearing', type: 'Other Current Asset', subType: 'OtherCurrentAssets' },
  bitcoin: { env: 'QBO_BITCOIN_DEPOSIT_ACCOUNT', name: 'Bitcoin clearing', type: 'Other Current Asset', subType: 'OtherCurrentAssets' },
  // Production costs (Purchases to the print lab and the label service)
  cogsPrints: { env: 'QBO_COGS_PRINTS_ACCOUNT', name: 'Cost of goods sold – prints & framing', type: 'Cost of Goods Sold', subType: 'SuppliesMaterialsCogs' },
  cogsShipping: { env: 'QBO_COGS_SHIPPING_ACCOUNT', name: 'Cost of goods sold – shipping', type: 'Cost of Goods Sold', subType: 'ShippingFreightDeliveryCos' },
  vendorCard: { env: 'QBO_VENDOR_CARD_ACCOUNT', name: 'Print vendor card', type: 'Credit Card', subType: 'CreditCard' }
};
// Vendors that charge the owner's card for each order: the print lab (prints, framing, lab shipping) and the label service.
export const VENDOR_DEFAULTS = {
  finerworks: { env: 'QBO_PRINT_VENDOR', name: 'FinerWorks' },
  prodigi: { env: 'QBO_PRINT_VENDOR', name: 'Prodigi' },
  shippo: { env: 'QBO_LABEL_VENDOR', name: 'Shippo' }
};
export const vendorName = (env, key) => qboName(env[VENDOR_DEFAULTS[key].env] || VENDOR_DEFAULTS[key].name);
export const costSyncEnabled = env => syncEnabled(env) && env.QBO_COST_SYNC_ENABLED === 'true';
export const accountName = (env, key) => qboName(env[ACCOUNT_DEFAULTS[key].env] || ACCOUNT_DEFAULTS[key].name);
export const itemName = (env, key) => qboName(env[ITEM_DEFAULTS[key].env] || ITEM_DEFAULTS[key].name);

export function validateReceipt(receipt) {
  if (!receipt || receipt.kind !== 'sale' || receipt.status !== 'COMPLETED') throw new QboError('Only completed sales are recorded', { kind: 'validation' });
  if (!['square', 'btcpay'].includes(receipt.provider)) throw new QboError(`Unsupported payment provider ${receipt.provider}`, { kind: 'validation' });
  if (receipt.currency !== 'USD') throw new QboError('Only USD sales are recorded', { kind: 'validation' });
  if (typeof receipt.orderId !== 'string' || !/^cart:[A-Za-z0-9-]{1,80}$/.test(receipt.orderId)) throw new QboError('Missing order id', { kind: 'validation' });
  if (!Array.isArray(receipt.items) || !receipt.items.length) throw new QboError('Sale has no items', { kind: 'validation' });
  for (const key of ['shipping', 'tax', 'gross']) if (!/^\d+\.\d{2}$/.test(receipt[key] || '')) throw new QboError(`Sale ${key} is invalid`, { kind: 'validation' });
  return receipt;
}

// Pure mapping from the website's sales receipt to a QuickBooks SalesReceipt. Every line is non-taxable ('NON')
// so a company with automated sales tax does not add tax again; collected tax is its own line.
export function salesReceiptPayload(receipt, refs) {
  validateReceipt(receipt);
  const nonTaxable = { TaxCodeRef: { value: 'NON' } };
  const line = (itemKey, amountCents, description, qty = 1) => ({
    DetailType: 'SalesItemLineDetail', Amount: Number(dollars(amountCents)), Description: String(description).slice(0, 4000),
    SalesItemLineDetail: { ItemRef: { value: refs.items[itemKey] }, Qty: qty, UnitPrice: Number(dollars(Math.round(amountCents / qty))), ...nonTaxable }
  });
  const lines = []; let discount = 0;
  for (const item of receipt.items) {
    const kind = item.type === 'print' ? 'print' : item.type === 'deposit' ? 'deposit' : 'original';
    const qty = Number.isInteger(item.quantity) && item.quantity > 0 ? item.quantity : 1;
    const list = cents(item.listAmount ?? item.amount), paid = cents(item.amount);
    if (!Number.isFinite(list) || !Number.isFinite(paid) || list < 0 || paid < 0) throw new QboError('Sale item amount is invalid', { kind: 'validation' });
    const label = kind === 'deposit' ? `Commission deposit — ${item.commission?.packageTitle || item.title}` : kind === 'print' ? `Fine-art print — ${item.title}` : `Original painting — ${item.title}`;
    lines.push(line(kind, list * qty, `${label} (${item.id})`, qty));
    discount += (list - paid) * qty;
  }
  if (discount > 0) lines.push(line('discount', -discount, `Discount${receipt.printCode?.kind ? ` — ${receipt.printCode.kind} code` : ''}`));
  if (cents(receipt.shipping) > 0) lines.push(line('shipping', cents(receipt.shipping), 'Shipping'));
  if (cents(receipt.tax) > 0) lines.push(line('tax', cents(receipt.tax), `Sales tax collected${receipt.taxCalculationId ? ` (${String(receipt.taxCalculationId).slice(0, 60)})` : ''}`));
  const total = lines.reduce((sum, l) => sum + cents(l.Amount), 0);
  if (total !== cents(receipt.gross)) throw new QboError(`Line total ${dollars(total)} does not match the sale total ${receipt.gross}`, { kind: 'validation' });
  const address = receipt.shippingAddress || {};
  return {
    DocNumber: docNumberFor(receipt.orderId),
    TxnDate: pacificDate(receipt.paidAt),
    CustomerRef: { value: refs.customerId },
    DepositToAccountRef: { value: refs.depositAccountId },
    PaymentRefNum: String(receipt.transactionId || '').slice(-21),
    PrivateNote: withAtCostMarker(`Vermillion Aurora order ${receipt.orderId}; ${receipt.provider === 'btcpay' ? 'BTCPay invoice' : 'Square payment'} ${receipt.transactionId}`, receipt.printCode),
    ...(receipt.buyerEmail ? { BillEmail: { Address: String(receipt.buyerEmail).slice(0, 100) } } : {}),
    ...(address.street1 ? { ShipAddr: { Line1: String(address.street1).slice(0, 500), ...(address.street2 ? { Line2: String(address.street2).slice(0, 500) } : {}),
      City: String(address.city || '').slice(0, 255), CountrySubDivisionCode: String(address.state || '').slice(0, 255), PostalCode: String(address.zip || '').slice(0, 30), Country: String(address.country || 'US').slice(0, 255) } } : {}),
    Line: lines
  };
}
// Orders paid with a single-use at-cost collector code (the VA-XXXX-XXXX-XXXX testimonial/thank-you print codes) are
// marketing spend, not ordinary sales. They are marked in the internal Memo (PrivateNote) of the Sales Receipt and of its
// production-cost Purchases: a plain-text marker needs nothing set up in QuickBooks and works whether or not Classes,
// Locations or Tags are turned on. Only a masked reference is shown (last group of the code); the owner code is never marked.
export const AT_COST_MARKER = 'At-cost testimonial print code — marketing';
export function atCostNote(printCode) {
  if (printCode?.kind !== 'collector') return '';
  const suffix = typeof printCode.suffix === 'string' && /^[A-Z2-9]{4}$/.test(printCode.suffix) ? printCode.suffix : '';
  return suffix ? `${AT_COST_MARKER} (code VA-…-${suffix})` : AT_COST_MARKER;
}
// Prepends the marker (so it is the first thing in the Memo column) unless it is already there. Idempotent.
export function withAtCostMarker(note, printCode) {
  const marker = atCostNote(printCode), text = String(note || '');
  if (!marker || text.includes(AT_COST_MARKER)) return text.slice(0, 4000);
  return `${marker}. ${text}`.slice(0, 4000);
}
export const depositAccountKey = receipt => receipt.provider === 'btcpay' ? 'bitcoin' : 'square';

// Production-cost Purchases: one per order per vendor. VP- = print lab, VL- = shipping labels (21-character DocNumber limit).
export const costDocNumber = (orderId, type) => `${type === 'label' ? 'VL' : 'VP'}-${String(orderId).replace(/^cart:/, '').replace(/[^A-Za-z0-9]/g, '').slice(0, 18)}`;
export const costId = (orderId, type) => `${orderId}:${type}`;
export function validateCost(cost) {
  if (!cost || cost.kind !== 'cost' || !['print', 'label'].includes(cost.type)) throw new QboError('Not a production cost', { kind: 'validation' });
  if (typeof cost.orderId !== 'string' || !/^cart:[A-Za-z0-9-]{1,80}$/.test(cost.orderId)) throw new QboError('Missing order id', { kind: 'validation' });
  if (!VENDOR_DEFAULTS[cost.vendor]) throw new QboError(`Unknown vendor ${cost.vendor}`, { kind: 'validation' });
  return cost;
}
// Pure mapping from a resolved cost ({placedAt, lines:[{account, cents, description}], amountSource, memo}) to a QuickBooks
// Purchase paid by credit card. Lines are positive and must add up to the resolved total.
// printCode is the sale's code ({kind, suffix}) so the Purchase carries the same at-cost marker as its Sales Receipt.
export function purchasePayload(cost, resolved, refs, printCode = null) {
  validateCost(cost);
  const lines = resolved.lines.filter(l => l.cents > 0);
  if (!lines.length || resolved.lines.some(l => !Number.isInteger(l.cents) || l.cents < 0)) throw new QboError('Production cost has no valid lines', { kind: 'validation' });
  const total = lines.reduce((sum, l) => sum + l.cents, 0);
  if (total !== resolved.totalCents) throw new QboError(`Cost lines ${dollars(total)} do not match the vendor total ${dollars(resolved.totalCents)}`, { kind: 'validation' });
  return {
    PaymentType: 'CreditCard',
    AccountRef: { value: refs.cardAccountId },
    EntityRef: { value: refs.vendorId, type: 'Vendor' },
    TxnDate: pacificDate(resolved.placedAt),
    DocNumber: costDocNumber(cost.orderId, cost.type),
    PrivateNote: withAtCostMarker(resolved.memo, printCode),
    Line: lines.map(l => ({ DetailType: 'AccountBasedExpenseLineDetail', Amount: Number(dollars(l.cents)), Description: String(l.description).slice(0, 4000),
      AccountBasedExpenseLineDetail: { AccountRef: { value: refs.accounts[l.account] } } }))
  };
}
