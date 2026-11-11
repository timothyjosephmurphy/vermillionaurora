// Print-on-demand books through RPI (Read Print Inc).
// RPI_API_KEY is the full Authorization header value ("Basic …"). Use it as-is.
// Never log it, and never persist it on an order.
import {books} from './checkout-catalog.mjs';

const ORIGIN = 'https://open.api.rpiprint.com';
const TERMINAL = new Set(['complete', 'review', 'cancelled', 'failed']);
const FAILED = new Set(['FAILED', 'REJECTED', 'EXCEPTION']);

export function rpiAuthorization(env) {
  const value = env?.RPI_API_KEY;
  if (typeof value !== 'string' || !value.startsWith('Basic ') || value.length < 12 || value.length > 500 || /[\r\n]/.test(value)) {
    throw Error('RPI fulfillment is not configured');
  }
  return value;
}

function safeMessage(data, fallback) {
  const raw = data?.errorDescription || data?.errorDetails || data?.message || fallback || '';
  return String(raw).replace(/Basic\s+\S+/g, 'Basic [redacted]').slice(0, 240);
}

// Allow-list: shipping estimates and order create/read. No cancel, no other host.
async function rpiRequest(env, method, path, body) {
  if (method !== 'GET' && method !== 'POST') throw Error('Unexpected RPI request');
  if (path !== '/orders/shipping/estimate' && path !== '/orders/create' && !/^\/orders\/[A-Za-z0-9-]{1,40}$/.test(path)) throw Error('Unexpected RPI request');
  const response = await fetch(`${ORIGIN}${path}`, {
    method,
    redirect: 'manual',
    signal: AbortSignal.timeout(20_000),
    headers: {
      Authorization: rpiAuthorization(env),
      Accept: 'application/json',
      ...(body === undefined ? {} : {'Content-Type': 'application/json'})
    },
    body: body === undefined ? undefined : JSON.stringify(body)
  });
  if (response.status >= 300 && response.status < 400) throw Error(`RPI request was redirected (${response.status})`);
  const text = await response.text();
  let data = null;
  try { data = text ? JSON.parse(text) : null; } catch { data = null; }
  return {status: response.status, data};
}

function fitLine(value, label) {
  const text = String(value || '').trim();
  if (text.length <= 50) return {head: text, rest: ''};
  const cut = text.lastIndexOf(' ', 50);
  const at = cut > 20 ? cut : 50;
  const head = text.slice(0, at).trim();
  const rest = text.slice(at).trim();
  if (!head || head.length > 50) throw Object.assign(Error(`The ${label} is too long for the printer. Shorten it and try again.`), {code: 'DESTINATION'});
  return {head, rest};
}

export function rpiDestination(address, email) {
  if (!address || (address.country !== 'US' && address.country !== 'CA')) {
    throw Object.assign(Error('Printed books ship to the United States and Canada. Email tj@tjm.art to arrange another destination.'), {code: 'DESTINATION'});
  }
  if (address.country === 'US' && ['AA', 'AE', 'AP'].includes(address.state)) {
    throw Object.assign(Error('Printed books cannot ship to military mail addresses. Email tj@tjm.art.'), {code: 'DESTINATION'});
  }
  if (typeof email !== 'string' || email.length > 100 || !email.includes('@')) throw Object.assign(Error('Enter an email address of 100 characters or less.'), {code: 'DESTINATION'});
  const street = fitLine(address.street1, 'street address');
  const extra = [street.rest, address.street2].filter(Boolean).join(' ');
  const second = fitLine(extra, 'second address line');
  if (second.rest) throw Object.assign(Error('That street address is too long for the printer. Shorten it and try again.'), {code: 'DESTINATION'});
  if (address.city.length > 50 || address.name.length > 200 || address.zip.length > 20) {
    throw Object.assign(Error('Check the name, city, and postal code. One of them is too long for the printer.'), {code: 'DESTINATION'});
  }
  // US and Canada take regionCode and omit state. RPI treats the two as alternatives.
  const destination = {
    name: address.name,
    address1: street.head,
    ...(second.head ? {address2: second.head} : {}),
    city: address.city,
    regionCode: address.state,
    postal: address.zip,
    country: address.country,
    email
  };
  if (address.phone && address.phone.length <= 20) destination.phone = address.phone;
  return destination;
}

function shippingOptions(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.options)) return data.options;
  if (Array.isArray(data?.shippingOptions)) return data.shippingOptions;
  return [];
}
export function selectBookShipping(options) {
  options = shippingOptions(options);
  if (!options.length) {
    throw Object.assign(Error('Printed books cannot be shipped to that address yet. Email tj@tjm.art.'), {code: 'DESTINATION'});
  }
  const offered = options.filter(option => Number.isFinite(option?.price) && option.price > 0 && ['standard', 'expedited', 'rush'].includes(String(option.methodClassification || '').toLowerCase()));
  const standard = offered.find(option => String(option.methodClassification).toLowerCase() === 'standard');
  const choice = standard || [...offered].sort((a, b) => a.price - b.price)[0];
  if (!choice) throw Object.assign(Error('Printed books cannot be shipped to that address yet. Email tj@tjm.art.'), {code: 'DESTINATION'});
  const cents = Math.round(choice.price * 100);
  if (cents <= 0 || cents > 50000) throw Error('Unexpected book shipping price');
  const classification = String(choice.methodClassification).toLowerCase();
  return {classification, shipping: (cents / 100).toFixed(2), service: choice.methodName || classification, carrier: 'RPI'};
}

export async function quoteBookShipping(env, items, address, email) {
  const destination = rpiDestination(address, email);
  const orderItems = items.map(item => {
    const book = books[item.id];
    if (!book || book.sku !== item.sku || item.quantity < 1) throw Error('A book in this cart is no longer available.');
    return {sku: book.sku, quantity: item.quantity};
  });
  let result;
  try { result = await rpiRequest(env, 'POST', '/orders/shipping/estimate', {currency: 'USD', destination, orderItems}); }
  catch (error) {
    if (error.code === 'DESTINATION') throw error;
    throw Object.assign(Error('Book shipping could not be calculated. Check the address and try again.'), {code: 'BOOK_SHIPPING'});
  }
  if (result.status === 200) return {...selectBookShipping(result.data), destination};
  const message = safeMessage(result.data, '');
  if (result.status === 400 && /not supported|cannot be estimated|military/i.test(message)) {
    throw Object.assign(Error('Printed books cannot be shipped to that address yet. Email tj@tjm.art.'), {code: 'DESTINATION'});
  }
  console.error('RPI shipping estimate failed', result.status, message);
  throw Object.assign(Error(result.status === 400 && /No products found/i.test(message)
    ? 'These books are not ready to ship yet. Email tj@tjm.art.'
    : 'Book shipping could not be calculated. Check the address and try again.'), {code: 'BOOK_SHIPPING'});
}

export function newRpiBookJob(env, order, items) {
  rpiAuthorization(env);
  const customerOrderId = order.id;
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(customerOrderId || '')) throw Error('Book order id is not a site order id');
  const classification = order.quote?.bookQuote?.classification || 'standard';
  if (!['standard', 'expedited', 'rush'].includes(classification)) throw Error('Book shipping speed is not one RPI offers');
  const destination = rpiDestination(order.quote.address, order.quote.email);
  const orderItems = items.map(item => {
    const book = books[item.id];
    if (!book || book.sku !== item.sku || book.amount !== item.amount) throw Error('Book catalog changed after payment');
    return {
      sku: book.sku,
      quantity: item.quantity,
      retailPrice: book.amount,
      itemDescription: book.title.slice(0, 255),
      product: {pageCount: book.pageCount, coverUrl: book.coverUrl, gutsUrl: book.gutsUrl}
    };
  });
  return {
    provider: 'rpi',
    status: 'pending',
    mode: order.mode,
    customerOrderId,
    classification,
    quotedShipping: order.quote.bookQuote?.shipping || null,
    items: items.map(item => ({id: item.id, sku: item.sku, quantity: item.quantity, title: item.title, amount: item.amount})),
    request: {currency: 'USD', shippingClassification: classification, customerOrderId, destination, orderItems}
  };
}

function applyFound(job, data) {
  const order = data?.order;
  if (!order || order.customerOrderId !== job.customerOrderId) throw Error('RPI returned a different order');
  const stage = String(order.status || '');
  const status = stage === 'SHIPPED' ? 'complete' : stage === 'CANCELLED' ? 'cancelled' : FAILED.has(stage) ? 'review' : 'in-production';
  const reason = status === 'review' ? `RPI reported ${stage}. The customer payment is recorded. Review this order before placing another.` : status === 'cancelled' ? 'RPI cancelled this order. Review the payment.' : '';
  return {
    ...job,
    providerOrderId: order.orderPublicId || job.providerOrderId || '',
    stage,
    status,
    ...(reason ? {reason} : {}),
    updatedAt: Date.now()
  };
}

async function lookup(env, customerOrderId) {
  const result = await rpiRequest(env, 'GET', `/orders/${customerOrderId}`);
  if (result.status === 200) return result.data;
  if (result.status === 404) return null;
  throw Error(`RPI order lookup failed (${result.status})`);
}

// One RPI order per paid site order. customerOrderId is the site order id.
// A repeat looks the order up first. Create is only attempted when that lookup is 404.
export async function fulfillRpiBooks(env, job, persist) {
  if (TERMINAL.has(job.status)) return true;
  if (job.provider !== 'rpi' || job.request?.customerOrderId !== job.customerOrderId) throw Error('RPI job does not match this order');
  let found;
  try { found = await lookup(env, job.customerOrderId); }
  catch (error) {
    await persist({...job, lastErrorAt: Date.now(), lastError: safeMessage(null, error.message)});
    return false;
  }
  if (found) {
    const next = applyFound(job, found);
    await persist(next);
    return TERMINAL.has(next.status);
  }
  const attempts = (job.createAttempts || 0) + 1;
  if (attempts > 2) {
    await persist({...job, status: 'review', reason: 'RPI did not confirm this order. No further print order was sent. Review the payment before trying again.'});
    return true;
  }
  const creating = {...job, status: 'creating', attemptedAt: Date.now(), createAttempts: attempts};
  await persist(creating);
  let created;
  try { created = await rpiRequest(env, 'POST', '/orders/create', job.request); }
  catch (error) {
    // A timeout may have created the order. The next pass looks it up and does not assume it failed.
    await persist({...creating, lastErrorAt: Date.now(), lastError: safeMessage(null, error.message)});
    return false;
  }
  if (created.status === 201 && created.data?.customerOrderId === job.customerOrderId) {
    try {
      const again = await lookup(env, job.customerOrderId);
      const next = again ? applyFound(creating, again) : {...creating, status: 'in-production', stage: 'RECEIVED'};
      await persist(next);
      return TERMINAL.has(next.status);
    } catch (error) {
      await persist({...creating, status: 'in-production', stage: 'RECEIVED', lastError: safeMessage(null, error.message)});
      return false;
    }
  }
  // 400 on a reused customerOrderId means the order already exists and was not duplicated.
  if (created.status === 400) {
    try {
      const again = await lookup(env, job.customerOrderId);
      if (again) {
        const next = applyFound(creating, again);
        await persist(next);
        return TERMINAL.has(next.status);
      }
    } catch { /* fall through to review */ }
  }
  await persist({...creating, status: 'review', reason: `RPI did not accept this order (${created.status}). ${safeMessage(created.data, 'No print order was confirmed.')}`});
  return true;
}

export function rpiFulfillmentRecord(job) {
  return {
    provider: 'rpi',
    customerOrderId: job.customerOrderId,
    providerOrderId: job.providerOrderId || '',
    status: job.status,
    stage: job.stage || '',
    shipping: job.quotedShipping,
    classification: job.classification,
    items: job.items,
    reason: job.reason || ''
  };
}
