// Production costs for QuickBooks: what the print lab (FinerWorks, legacy Prodigi) and the label service (Shippo) charged
// the owner's card for one website order. Read-only against the vendors; QuickBooks writes happen in the sync Durable Object.
import { finerworksRequest } from './finerworks-api.mjs';
import { QboError, docNumberFor, costDocNumber } from './quickbooks-core.mjs';

const DAY = 24 * 3600 * 1000;
// How long to wait for the vendor to report the charged amount before falling back to the quoted cost.
export const ACTUAL_WAIT_MS = 2 * DAY;
const cents = value => { const n = Math.round(Number(value) * 100); return Number.isFinite(n) ? n : NaN; };
const usd = c => `$${(c / 100).toFixed(2)}`;
const iso = value => { const t = typeof value === 'number' ? value : Date.parse(value || ''); return Number.isFinite(t) && t > 0 ? new Date(t).toISOString() : null; };
const PLACED_PRINT = new Set(['in-production', 'complete', 'test-complete']);

// Cost records for one cart order (CartOrder durable data). Commission deposits have no production cost.
// A print cost exists once the lab order is placed; label costs once every label job has finished.
export function costSources(order) {
  if (!order || order.status !== 'paid') return [];
  const orderId = `cart:${order.id}`, base = { kind: 'cost', orderId, saleDocNumber: docNumberFor(orderId), mode: order.mode, paidAt: iso(order.paidAt) };
  const sources = [];
  const job = order.printJob;
  if (job?.providerId && PLACED_PRINT.has(job.status) && ['finerworks', 'prodigi'].includes(job.provider)) {
    sources.push({ ...base, type: 'print', vendor: job.provider, vendorPo: job.request?.merchantReference || '', providerOrderId: String(job.providerId),
      placedAt: iso(job.attemptedAt) || base.paidAt,
      quoted: { production: job.quotedProductionCost ?? null, shipping: job.quotedShipping ?? null, maximum: job.maximumProviderCost ?? null },
      ...(job.provider === 'prodigi' ? { charges: (job.charges || []).map(c => ({ amount: c.totalCost?.amount ?? null, currency: c.totalCost?.currency || '' })) } : {}),
      items: (job.items || []).map(i => ({ id: i.id, sku: i.sku, quantity: i.quantity, framed: Boolean(i.frame), matted: Boolean(i.mat) })) });
  }
  const jobs = order.jobs || [];
  const unfinished = jobs.some(j => ['pending', 'purchasing', 'waiting'].includes(j.status));
  const labels = jobs.filter(j => j.transactionId && j.status === 'ready');
  if (!unfinished && labels.length) {
    sources.push({ ...base, type: 'label', vendor: 'shippo',
      placedAt: iso(Math.min(...labels.map(j => j.attemptedAt || Infinity))) || base.paidAt,
      labels: labels.map(j => ({ slug: j.quote?.slug || '', title: j.quote?.title || '', transactionId: j.transactionId, rateId: j.quote?.rateId || '',
        quoted: j.quote?.shipping ?? null, carrier: j.quote?.carrier || '', service: j.quote?.service || '', trackingNumber: j.trackingNumber || '' })) });
  }
  return sources;
}

export class CostPending extends Error {}

function allocateQuoted(totalCents, quoted) {
  // Quoted split: lab shipping and supplier tax from the quote, the remainder is production.
  const production = cents(quoted.production), shipping = cents(quoted.shipping), maximum = cents(quoted.maximum);
  const tax = Number.isFinite(maximum) && Number.isFinite(production) && Number.isFinite(shipping) ? Math.max(0, maximum - production - shipping) : 0;
  const ship = Number.isFinite(shipping) ? Math.min(shipping, totalCents) : 0;
  const taxed = Math.min(tax, totalCents - ship);
  return { production: totalCents - ship - taxed, shipping: ship, tax: taxed };
}

function printLines(cost, vendorLabel, parts) {
  const ref = `${vendorLabel} order ${cost.providerOrderId}`;
  return [
    { account: 'cogsPrints', cents: parts.production, description: `Print production — ${ref}` },
    { account: 'cogsPrints', cents: parts.framing || 0, description: `Framing (frame, mat, glazing) — ${ref}` },
    { account: 'cogsPrints', cents: parts.tax || 0, description: `Sales tax charged by ${vendorLabel} — ${ref}` },
    { account: 'cogsShipping', cents: parts.shipping, description: `Print-lab shipping — ${ref}` }
  ].filter(l => l.cents > 0);
}

// FinerWorks: list_orders gives the order date, guid and charged total; get_order gives the charged breakdown.
async function finerworksActual(env, cost) {
  const list = await finerworksRequest(env, '/v3/list_orders', { order_pos: [cost.vendorPo], per_page: 5, page_number: 1, show_cancelled: true });
  const rows = (list?.orders || []).filter(o => o?.order_po === cost.vendorPo && String(o.order_id) === cost.providerOrderId);
  if (rows.length !== 1) return null;
  const row = rows[0], listTotal = cents(row.total);
  let totals = null;
  if (typeof row.order_guid === 'string' && /^[0-9a-f-]{36}$/i.test(row.order_guid) && typeof row.order_email === 'string' && row.order_email) {
    try {
      const detail = await finerworksRequest(env, `/v3/get_order?order_guid=${encodeURIComponent(row.order_guid)}&order_email=${encodeURIComponent(row.order_email)}`, undefined, 'GET');
      if (String(detail?.order?.order_id) === cost.providerOrderId) totals = detail.order.totals || null;
    } catch { totals = null; }
  }
  return { placedAt: iso(row.order_date), listTotal: Number.isFinite(listTotal) && listTotal > 0 ? listTotal : null, totals, status: String(row.status || '') };
}

function finerworksBreakdown(totals) {
  if (!totals) return null;
  const subtotal = cents(totals.order_subtotal), shipping = cents(totals.order_shipping_rate ?? 0), discount = cents(totals.order_discount ?? 0),
    tax = cents(totals.order_sales_tax ?? 0), expedite = cents(totals.order_expedite_fee ?? 0), credits = cents(totals.order_credits_used ?? 0), grand = cents(totals.order_grand_total);
  if (![subtotal, shipping, discount, tax, expedite, credits, grand].every(Number.isFinite) || subtotal <= 0 || grand <= 0) return null;
  if (Math.abs(subtotal + shipping + tax + expedite - discount - grand) > 1) return null;
  if (credits > 0) throw new QboError(`FinerWorks applied ${usd(credits)} of account credits to this order; record it by hand`, { kind: 'validation' });
  // Per-copy option prices (FinerWorks total_price includes them); framing is reported separately when present.
  const framing = Math.round((totals.product_pricing || []).reduce((sum, p) => {
    const qty = Number.isInteger(p?.product_qty) && p.product_qty > 0 ? p.product_qty : 0;
    return sum + ['add_frame_price', 'add_mat_1_price', 'add_mat_2_price', 'add_glazing_price'].reduce((s, k) => s + (Number(p?.[k]) > 0 ? Number(p[k]) : 0), 0) * qty * 100;
  }, 0));
  const production = subtotal - discount - (framing > 0 && framing < subtotal - discount ? framing : 0);
  return { production, framing: framing > 0 && framing < subtotal - discount ? framing : 0, tax, shipping: shipping + expedite, grand: subtotal + shipping + tax + expedite - discount };
}

async function shippoGet(env, path) {
  const response = await fetch(`https://api.goshippo.com/${path}`, { headers: { Authorization: `ShippoToken ${env.SHIPPO_TOKEN}`, 'SHIPPO-API-VERSION': '2018-02-08' }, signal: AbortSignal.timeout(20000) });
  if (!response.ok) throw Error(`Shippo ${path.split('/')[0]} lookup failed (${response.status})`);
  return response.json();
}

// Resolve what the vendor actually charged. Throws CostPending while the vendor has not reported it yet (within ACTUAL_WAIT_MS).
export async function resolveCost(env, cost, { now = Date.now() } = {}) {
  const young = now - Date.parse(cost.placedAt || cost.paidAt || 0) < ACTUAL_WAIT_MS;
  const memoBase = `Production cost for Vermillion Aurora order ${cost.saleDocNumber} (${cost.orderId})`;
  if (cost.type === 'print') {
    const vendorLabel = cost.vendor === 'finerworks' ? 'FinerWorks' : 'Prodigi';
    const memoRef = `${vendorLabel} order ${cost.providerOrderId}${cost.vendorPo ? ` (PO ${cost.vendorPo})` : ''}`;
    let actual = null, failure = '';
    if (cost.vendor === 'finerworks') { try { actual = await finerworksActual(env, cost); } catch (error) { failure = error.message; } }
    if (cost.vendor === 'prodigi' && cost.charges?.length && cost.charges.every(c => c.currency === 'USD' && Number.isFinite(cents(c.amount)))) {
      actual = { listTotal: cost.charges.reduce((s, c) => s + cents(c.amount), 0), totals: null, placedAt: null };
    }
    const breakdown = actual ? finerworksBreakdown(actual.totals) : null;
    if (breakdown && (!actual.listTotal || Math.abs(actual.listTotal - breakdown.grand) <= 1)) {
      return { placedAt: actual.placedAt || cost.placedAt, totalCents: breakdown.grand, amountSource: 'actual',
        lines: printLines(cost, vendorLabel, breakdown), memo: `${memoBase}; ${memoRef}; amounts are the actual charge reported by ${vendorLabel}.` };
    }
    if (actual?.listTotal) {
      const parts = allocateQuoted(actual.listTotal, cost.quoted || {});
      return { placedAt: actual.placedAt || cost.placedAt, totalCents: actual.listTotal, amountSource: 'actual-total',
        lines: printLines(cost, vendorLabel, parts), memo: `${memoBase}; ${memoRef}; total is the actual charge reported by ${vendorLabel}; the split between lines is estimated from the quote.` };
    }
    if (young) throw new CostPending(`${vendorLabel} has not reported the charged amount yet${failure ? ` (${failure})` : ''}`);
    const quotedTotal = cents(cost.quoted?.maximum);
    if (!Number.isFinite(quotedTotal) || quotedTotal <= 0) throw new QboError('No vendor charge or quoted lab cost is available', { kind: 'validation' });
    return { placedAt: cost.placedAt, totalCents: quotedTotal, amountSource: 'quoted', lines: printLines(cost, vendorLabel, allocateQuoted(quotedTotal, cost.quoted)),
      memo: `${memoBase}; ${memoRef}; QUOTED lab cost — ${vendorLabel} did not report the charged amount, check the card statement.` };
  }
  // Shipping labels bought through Shippo for originals.
  const lines = []; let quotedAny = false, failure = '';
  for (const label of cost.labels || []) {
    let amount = NaN;
    try {
      const transaction = await shippoGet(env, `transactions/${encodeURIComponent(label.transactionId)}/`);
      if (transaction.object_id !== label.transactionId) throw Error('Shippo transaction mismatch');
      const rateId = typeof transaction.rate === 'string' ? transaction.rate : transaction.rate?.object_id || label.rateId;
      const rate = await shippoGet(env, `rates/${encodeURIComponent(rateId)}/`);
      if (rate.currency === 'USD') amount = cents(rate.amount);
    } catch (error) { failure = error.message; }
    if (!Number.isFinite(amount) || amount <= 0) {
      if (young) throw new CostPending(`Shippo label cost not available yet${failure ? ` (${failure})` : ''}`);
      amount = cents(label.quoted); quotedAny = true;
      if (!Number.isFinite(amount) || amount <= 0) throw new QboError('No label cost is available', { kind: 'validation' });
    }
    lines.push({ account: 'cogsShipping', cents: amount, description: `Shipping label — ${[label.carrier, label.service].filter(Boolean).join(' ') || 'carrier'}${label.title ? ` — ${label.title}` : ''}${label.trackingNumber ? ` (tracking ${label.trackingNumber})` : ''}`.slice(0, 4000) });
  }
  if (!lines.length) throw new QboError('Order has no purchased labels', { kind: 'validation' });
  return { placedAt: cost.placedAt, totalCents: lines.reduce((s, l) => s + l.cents, 0), amountSource: quotedAny ? 'quoted' : 'actual', lines,
    memo: `${memoBase}; Shippo labels ${cost.labels.map(l => l.transactionId).join(', ')}; ${quotedAny ? 'QUOTED label rate used where Shippo did not report the amount, check the card statement.' : 'amounts are the label rates Shippo charged.'}` };
}
export { costDocNumber };
