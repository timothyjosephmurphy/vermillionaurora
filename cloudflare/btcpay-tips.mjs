// Lightning tips and Nostr zaps paid to the BTCPay store, recorded in QuickBooks as business income (taxable income,
// not gifts). tjm.art checkout invoices (metadata.orderId va-btc-… / va-cart-…) are synced as orders and never as tips.
//   Detection: the existing signed BTCPay webhook (/checkout/bitcoin/webhook, InvoiceSettled) plus an hourly poll of
//   recently settled invoices and an owner backfill (POST /quickbooks/tips/backfill). All three key the QuickBooks queue by
//   tip:<BTCPay invoice id>, so a tip is queued once however often it is seen.
//   Inert unless QBO_TIP_SYNC_ENABLED is 'true' (and the QuickBooks sync itself is enabled).
import { bitcoinApi, bitcoinServer } from './bitcoin-api.mjs';
import { QboError, qboName, pacificDate, syncEnabled, environment } from './quickbooks-core.mjs';

export const tipSyncEnabled = env => env.QBO_TIP_SYNC_ENABLED === 'true' && syncEnabled(env);
export const SITE_ORDER = /^va-(btc|cart)-/;
export const isSiteOrder = invoice => SITE_ORDER.test(String(invoice?.metadata?.orderId || ''));
export const tipOrderId = invoiceId => `tip:${invoiceId}`;
// SalesReceipt DocNumber limit is 21 characters.
export const tipDocNumber = invoiceId => `TIP-${String(invoiceId).replace(/[^A-Za-z0-9]/g, '').slice(0, 17)}`;
const INVOICE_ID = /^[A-Za-z0-9]{1,100}$/;
const STORE_RATE_WINDOW = 30 * 60 * 1000;
const sats = value => Math.round(Number(value) * 1e8);
const fmt = (n, digits = 0) => Number(n).toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits });

// Why an invoice is (not) a tip, from the invoice alone. Returns null when it is a tip candidate.
export function tipSkipReason(invoice) {
  if (!INVOICE_ID.test(invoice?.id || '')) return 'invalid invoice id';
  if (isSiteOrder(invoice)) return 'tjm.art checkout order (synced as an order)';
  if (invoice.status !== 'Settled') return `status ${invoice.status}`;
  if (!['None', 'PaidOver'].includes(invoice.additionalStatus || 'None')) return `additional status ${invoice.additionalStatus}`;
  return null;
}

// Bitcoin received on the invoice (sats), its time and payment method, from GET …/invoices/{id}/payment-methods.
export function tipPayments(methods) {
  if (!Array.isArray(methods)) throw Error('Invalid invoice payment methods');
  const paid = methods.filter(m => (m.payments || []).length);
  if (!paid.length) return null;
  if (paid.some(m => m.currency !== 'BTC')) throw new QboError('Tip was paid in a currency other than BTC', { kind: 'validation' });
  const payments = paid.flatMap(m => m.payments.filter(p => !p.status || p.status === 'Settled').map(p => ({ ...p, method: m.paymentMethodId, rate: m.rate })));
  const total = payments.reduce((sum, p) => sum + sats(p.value), 0);
  const received = Math.max(...payments.map(p => Number(p.receivedDate) || 0));
  const lightning = paid.find(m => /LN|Lightning/i.test(String(m.paymentMethodId)));
  return { sats: total, receivedAt: received ? new Date(received * 1000).toISOString() : null,
    method: (lightning || paid[0]).paymentMethodId, invoiceRate: Number((lightning || paid[0]).rate) };
}

// Work the tip was for, when the tip page or zap set it (never the payer's comment).
export const tipWork = invoice => qboName(invoice?.metadata?.workTitle || invoice?.metadata?.itemDesc || '');

// Pure: the queued QuickBooks record for a tip. rate is {value (USD per BTC), source, at}.
export function tipReceipt(invoice, payments, rate) {
  const usdCents = Math.round(payments.sats * rate.value / 1e6);
  return { kind: 'tip', status: 'COMPLETED', provider: 'btcpay', currency: 'USD', orderId: tipOrderId(invoice.id), transactionId: invoice.id,
    paidAt: payments.receivedAt || new Date(Number(invoice.createdTime) * 1000).toISOString(), gross: (usdCents / 100).toFixed(2),
    sats: payments.sats, btcUsd: rate.value.toFixed(2), rateSource: rate.source, rateAt: rate.at || null, paymentMethod: String(payments.method || ''),
    ...(tipWork(invoice) ? { work: tipWork(invoice) } : {}) };
}
export function validateTip(tip) {
  if (!tip || tip.kind !== 'tip' || tip.status !== 'COMPLETED' || tip.provider !== 'btcpay' || tip.currency !== 'USD') throw new QboError('Not a completed BTCPay tip', { kind: 'validation' });
  if (!INVOICE_ID.test(tip.transactionId || '') || tip.orderId !== tipOrderId(tip.transactionId)) throw new QboError('Missing BTCPay invoice id', { kind: 'validation' });
  if (!/^\d+\.\d{2}$/.test(tip.gross || '') || Number(tip.gross) <= 0) throw new QboError('Tip USD value is invalid', { kind: 'validation' });
  if (!Number.isInteger(tip.sats) || tip.sats <= 0 || !(Number(tip.btcUsd) > 0) || !tip.rateSource) throw new QboError('Tip sats or rate is missing', { kind: 'validation' });
  return tip;
}
export const tipMemo = tip => [`Lightning tip — taxable business income (not a gift)`,
  `${fmt(tip.sats)} sats = $${tip.gross} at BTC/USD ${fmt(tip.btcUsd, 2)} (${tip.rateSource}${tip.rateAt ? `, ${tip.rateAt}` : ''})`,
  `BTCPay invoice ${tip.transactionId}${tip.paymentMethod ? ` (${tip.paymentMethod})` : ''}`, ...(tip.work ? [`For: ${tip.work}`] : [])].join('; ').slice(0, 4000);
// Pure mapping to a QuickBooks SalesReceipt: one non-taxable line on the tips item, deposited to Bitcoin clearing.
export function tipSalesReceiptPayload(tip, refs) {
  validateTip(tip);
  const amount = Number(tip.gross);
  return { DocNumber: tipDocNumber(tip.transactionId), TxnDate: pacificDate(tip.paidAt), CustomerRef: { value: refs.customerId },
    DepositToAccountRef: { value: refs.depositAccountId }, PaymentRefNum: tip.transactionId.slice(-21), PrivateNote: tipMemo(tip),
    Line: [{ DetailType: 'SalesItemLineDetail', Amount: amount, Description: `Lightning tip — ${fmt(tip.sats)} sats${tip.work ? ` — ${tip.work}` : ''}`.slice(0, 4000),
      SalesItemLineDetail: { ItemRef: { value: refs.itemId }, Qty: 1, UnitPrice: amount, TaxCodeRef: { value: 'NON' } } }] };
}

// BTC/USD for a tip: BTCPay's own invoice rate when the invoice was priced in USD; otherwise BTCPay's store rate when the
// tip is recorded within 30 minutes of settlement (webhook); otherwise Coinbase's daily BTC-USD spot for the settlement date.
export async function tipRate(env, invoice, payments, { now = Date.now(), fetcher = fetch } = {}) {
  if (invoice.currency === 'USD' && payments.invoiceRate > 0) return { value: payments.invoiceRate, source: 'BTCPay invoice rate at settlement' };
  const settled = Date.parse(payments.receivedAt || '') || now;
  if (now - settled <= STORE_RATE_WINDOW) {
    try {
      const rates = await bitcoinApi(env, '/rates?currencyPair=BTC_USD');
      const value = Number((Array.isArray(rates) ? rates : []).find(r => r.currencyPair === 'BTC_USD' && !(r.errors || []).length)?.rate);
      if (value > 0) return { value, source: 'BTCPay store rate', at: new Date(now).toISOString() };
    } catch {}
  }
  const day = new Date(settled).toISOString().slice(0, 10);
  const response = await fetcher(`https://api.coinbase.com/v2/prices/BTC-USD/spot?date=${day}`, { redirect: 'manual', signal: AbortSignal.timeout(20_000) });
  const value = response.ok ? Number((await response.json())?.data?.amount) : 0;
  if (!(value > 0)) throw Error('BTC/USD rate unavailable');
  return { value, source: 'Coinbase BTC-USD daily spot (BTCPay rate not available)', at: day };
}

// One BTCPay invoice → queued tip (or the reason it was skipped). dryRun reads but never queues.
export async function recordTipInvoice(env, invoice, { dryRun = false, now, fetcher } = {}) {
  const skip = tipSkipReason(invoice);
  if (skip) return { invoiceId: invoice?.id, skipped: skip };
  const payments = tipPayments(await bitcoinApi(env, `/invoices/${encodeURIComponent(invoice.id)}/payment-methods`));
  if (!payments || payments.sats <= 0) return { invoiceId: invoice.id, skipped: 'no settled payments' };
  const tip = tipReceipt(invoice, payments, await tipRate(env, invoice, payments, { now, fetcher }));
  if (tip.gross === '0.00') return { invoiceId: invoice.id, skipped: 'worth less than one cent' };
  if (dryRun) return { invoiceId: invoice.id, tip };
  return { invoiceId: invoice.id, ...(await env.QUICKBOOKS.getByName(environment(env)).enqueueTip(tip)) };
}

// Webhook path: called with the authoritative invoice for a non-order BTCPay event.
export async function tipFromWebhook(env, event, invoice) {
  if (!tipSyncEnabled(env) || !env.QUICKBOOKS || event?.type !== 'InvoiceSettled') return { skipped: 'not a settled tip or tip sync disabled' };
  return recordTipInvoice(env, invoice);
}

// Poll/backfill: settled invoices from the last `days` days (max 400 invoices). Idempotent.
export async function pollTips(env, { days = 2, dryRun = false, now = Date.now(), fetcher } = {}) {
  if (!dryRun && (!tipSyncEnabled(env) || !env.QUICKBOOKS)) return { skipped: 'tip sync disabled (QBO_TIP_SYNC_ENABLED)' };
  if (!env.BTCPAY_API_KEY || !env.BTCPAY_STORE_ID) return { skipped: 'BTCPay is not configured' };
  bitcoinServer(env);
  const start = Math.floor(now / 1000) - Math.min(Math.max(Number(days) || 2, 1), 400) * 86400;
  const results = [];
  for (let skip = 0; skip < 400; skip += 100) {
    const page = await bitcoinApi(env, `/invoices?status=Settled&startDate=${start}&take=100&skip=${skip}`);
    if (!Array.isArray(page)) throw Error('Invalid BTCPay invoice list');
    for (const invoice of page) {
      try { results.push(await recordTipInvoice(env, invoice, { dryRun, now, fetcher })); }
      catch (error) { results.push({ invoiceId: invoice?.id, error: String(error.message).slice(0, 200) }); }
    }
    if (page.length < 100) break;
  }
  return { dryRun, checked: results.length, queued: results.filter(r => r.queued && !r.duplicate).length, results };
}
