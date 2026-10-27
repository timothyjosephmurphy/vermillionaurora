// Kiss-cut sticker checkout. Printful draft orders are created only when
// PRINTFUL_STICKERS_MODE=draft, PRINTFUL_API_TOKEN is set, and the painting file
// is marked fileReady. Anything else returns a mock preview and does not call
// Printful. Confirming an order (POST /v2/orders/{id}/confirm) is not implemented:
// a draft is not charged and is not shipped.
import stickers from '../catalog/printful-stickers.json' with { type: 'json' };
import { US_STATES } from '../catalog/printful-stickers.mjs';

export const STICKERS_API = '/checkout/stickers/';
export const PRINTFUL_ORDERS_URL = 'https://api.printful.com/v2/orders';
const STATE_CODES = new Set(US_STATES.map(([code]) => code));
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ZIP = /^\d{5}(?:-\d{4})?$/;
const PHONE = /^[0-9+().\-\s]{7,20}$/;

const json = (data, status = 200) => Response.json(data, { status, headers: { 'Cache-Control': 'no-store' } });

export function stickerFulfillment(env) {
  const token = typeof env?.PRINTFUL_API_TOKEN === 'string' ? env.PRINTFUL_API_TOKEN.trim() : '';
  const requested = String(env?.PRINTFUL_STICKERS_MODE || 'mock').trim().toLowerCase();
  if (requested === 'draft' && token) return { mode: 'draft', token };
  return { mode: 'mock' };
}

const field = (value, max) => {
  const text = String(value ?? '').trim().replace(/\s+/g, ' ');
  if (!text || text.length > max || /[\u0000-\u001F\u007F<>]/.test(text)) return '';
  return text;
};

export function stickerFileUrl(fileUrl) {
  if (!fileUrl || typeof fileUrl !== 'string') return '';
  if (/^https:\/\/tjm\.art\/[^\s]+$/.test(fileUrl)) return fileUrl;
  if (fileUrl.startsWith('/gallery-images/')) return `https://tjm.art${fileUrl}`;
  return '';
}

export function readStickerOrder(body, catalog = stickers) {
  const productId = field(body?.productId, 80);
  const painting = catalog.paintings[productId];
  if (!painting?.enabled) return { error: 'Stickers are not offered for this painting.' };
  const variantKey = field(body?.variantId, 40);
  const variant = catalog.variants[variantKey];
  if (!painting.variantIds.includes(variantKey) || !variant?.offered) return { error: 'Choose a sticker size.' };
  const quantity = Number(body?.quantity ?? 1);
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) return { error: 'Choose between 1 and 10 stickers.' };
  const recipient = body?.recipient && typeof body.recipient === 'object' ? body.recipient : body;
  const name = field(recipient?.name, 80);
  const email = field(recipient?.email, 120).toLowerCase();
  const address1 = field(recipient?.address1, 100);
  const address2 = String(recipient?.address2 ?? '').trim().replace(/\s+/g, ' ');
  const city = field(recipient?.city, 80);
  const state = field(recipient?.state, 2).toUpperCase();
  const zip = field(recipient?.zip, 10);
  const country = field(recipient?.country || 'US', 2).toUpperCase();
  const phone = String(recipient?.phone ?? '').trim();
  if (!name) return { error: 'Enter the recipient’s name.' };
  if (!EMAIL.test(email)) return { error: 'Enter an email address.' };
  if (!address1) return { error: 'Enter a street address.' };
  if (address2 && (address2.length > 100 || /[\u0000-\u001F\u007F<>]/.test(address2))) return { error: 'Check the apartment or unit.' };
  if (!city) return { error: 'Enter a city.' };
  if (!STATE_CODES.has(state)) return { error: 'Stickers currently ship to US states and Washington, DC.' };
  if (country !== 'US') return { error: 'Stickers currently ship within the United States.' };
  if (!ZIP.test(zip)) return { error: 'Enter a US ZIP code.' };
  if (phone && !PHONE.test(phone)) return { error: 'Check the phone number, or leave it blank.' };
  return {
    value: {
      productId,
      painting,
      variant: { id: variantKey, ...variant },
      quantity,
      recipient: {
        name, email, address1, ...(address2 ? { address2 } : {}), city,
        state_code: state, country_code: 'US', zip, ...(phone ? { phone } : {}),
      },
    },
  };
}

export function printfulDraftBody(order, catalog = stickers) {
  const fileUrl = stickerFileUrl(order.painting.fileUrl);
  // TODO(printful-template): order.painting.printfulTemplateId is null until a
  // token can create the store product template. Until then the draft uses the
  // public catalog variant. Do not confirm the draft from this code.
  return {
    external_id: order.externalId,
    shipping: catalog.shipping.method,
    recipient: order.recipient,
    customization: {
      packing_slip: {
        store_name: catalog.shipping.whiteLabel.storeName,
        email: catalog.shipping.whiteLabel.email,
        message: catalog.shipping.whiteLabel.message,
      },
    },
    order_items: [{
      source: 'catalog',
      catalog_variant_id: order.variant.catalogVariantId,
      external_id: `${order.productId}:${order.variant.id}`,
      quantity: order.quantity,
      name: `${order.painting.title} — kiss-cut sticker`,
      placements: [{
        placement: catalog.product.placement,
        technique: catalog.product.technique,
        layers: [{ type: 'file', url: fileUrl }],
      }],
    }],
  };
}

async function readBody(request) {
  const length = Number(request.headers.get('content-length') || 0);
  if (Number.isFinite(length) && length > 8000) return { error: json({ error: 'That request is too large.' }, 413) };
  const type = request.headers.get('content-type') || '';
  try {
    if (type.includes('application/json')) {
      const text = await request.text();
      if (text.length > 8000) return { error: json({ error: 'That request is too large.' }, 413) };
      const body = JSON.parse(text);
      if (body?.confirm === true) return { error: json({ error: 'Paid Printful orders are not enabled.' }, 400) };
      return { body };
    }
    if (type.includes('application/x-www-form-urlencoded') || type.includes('multipart/form-data')) {
      const form = await request.formData();
      if (form.get('confirm') === 'true') return { error: json({ error: 'Paid Printful orders are not enabled.' }, 400) };
      return { body: {
        productId: form.get('productId'),
        variantId: form.get('variantId'),
        quantity: form.get('quantity'),
        recipient: {
          name: form.get('name'), email: form.get('email'), phone: form.get('phone'),
          address1: form.get('address1'), address2: form.get('address2'),
          city: form.get('city'), state: form.get('state'), zip: form.get('zip'), country: form.get('country') || 'US',
        },
      } };
    }
  } catch {
    return { error: json({ error: 'The sticker request could not be read.' }, 400) };
  }
  return { error: json({ error: 'The sticker request could not be read.' }, 400) };
}

function catalogResponse(catalog) {
  const paintings = Object.entries(catalog.paintings).flatMap(([id, painting]) => {
    if (!painting.enabled) return [];
    return [{
      id,
      title: painting.title,
      path: painting.path,
      fileReady: painting.fileReady === true,
      printfulTemplateId: painting.printfulTemplateId ?? null,
      variants: painting.variantIds.map((key) => ({ id: key, label: catalog.variants[key].label, catalogVariantId: catalog.variants[key].catalogVariantId })),
    }];
  });
  return {
    country: catalog.shipping.country,
    ordersOpen: false,
    charged: false,
    product: { catalogProductId: catalog.product.catalogProductId, name: catalog.product.name, printfulTemplateId: catalog.product.printfulTemplateId },
    paintings,
  };
}

function redact(value) {
  const text = typeof value === 'string' ? value : 'Printful did not accept the draft.';
  return text.replace(/bearer\s+\S+/gi, 'bearer [redacted]').slice(0, 240);
}

export async function stickerCheckout(request, env = {}, deps = {}) {
  const catalog = deps.catalog || stickers;
  const url = new URL(request.url);
  const path = url.pathname.replace(/\/+$/, '') || '/';
  if (path.endsWith('/confirm') || url.searchParams.get('confirm') === 'true') return json({ error: 'Confirming a Printful order is not enabled.' }, 404);
  if (path === '/checkout/stickers/catalog') {
    if (request.method !== 'GET') return json({ error: 'Not found.' }, 405);
    return json({ ...catalogResponse(catalog), mode: stickerFulfillment(env).mode });
  }
  if (path !== '/checkout/stickers/order') return json({ error: 'Not found.' }, 404);
  if (request.method !== 'POST') return json({ error: 'Not found.' }, 405);
  const incoming = await readBody(request);
  if (incoming.error) return incoming.error;
  const parsed = readStickerOrder(incoming.body, catalog);
  if (parsed.error) return json({ error: parsed.error }, 400);
  const order = { ...parsed.value, externalId: `tjm-sticker-${crypto.randomUUID()}` };
  const fulfillment = stickerFulfillment(env);
  const fileReady = order.painting.fileReady === true && Boolean(stickerFileUrl(order.painting.fileUrl));
  if (fulfillment.mode === 'draft' && !fileReady) {
    return json({
      ok: false,
      mode: 'draft',
      ordersOpen: false,
      charged: false,
      confirmed: false,
      fileReady: false,
      error: 'This sticker file is not approved, so no Printful order was created.',
    }, 409);
  }
  if (fulfillment.mode !== 'draft') {
    return json({
      ok: true,
      mode: 'mock',
      ordersOpen: false,
      charged: false,
      confirmed: false,
      fileReady,
      previewId: order.externalId,
      message: 'Preview only. No sticker was ordered, Printful was not contacted, and you were not charged.',
    });
  }
  const payload = printfulDraftBody(order, catalog);
  let response;
  try {
    const headers = { Authorization: `Bearer ${fulfillment.token}`, 'Content-Type': 'application/json', Accept: 'application/json' };
    const storeId = typeof env.PRINTFUL_STORE_ID === 'string' ? env.PRINTFUL_STORE_ID.trim() : '';
    if (storeId) headers['X-PF-Store-Id'] = storeId;
    response = await (deps.fetch || fetch)(PRINTFUL_ORDERS_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(15000),
    });
  } catch {
    return json({ error: 'Printful could not be reached. No order was confirmed.' }, 502);
  }
  const result = await response.json().catch(() => null);
  if (!response.ok) return json({ error: redact(result?.error?.message), charged: false, confirmed: false }, 502);
  const created = result?.data || result?.result;
  if (!created?.id) return json({ error: 'Printful did not return a draft order.', charged: false, confirmed: false }, 502);
  if (created.status && created.status !== 'draft') console.error(JSON.stringify({ event: 'printful-sticker-unexpected-status', status: created.status, id: created.id }));
  return json({
    ok: true,
    mode: 'draft',
    ordersOpen: false,
    charged: false,
    confirmed: false,
    fileReady: true,
    printfulOrderId: created.id,
    printfulStatus: created.status || 'draft',
    message: 'Printful draft saved. It is not confirmed, you were not charged, and it will not ship. TJ has to approve before any paid sticker order.',
  });
}
