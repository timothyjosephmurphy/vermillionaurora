import catalog, {catalogVersion} from './checkout-catalog.mjs';
import { priceOrder } from './checkout-pricing.mjs';
import { captureDetails } from './sales-records.mjs';

import { PRIMARY_SITE as SITE, SITE_ORIGINS, isSiteOrigin, withCors } from './site-origins.mjs';
const ORDER_ID = /^[A-Z0-9]{1,36}$/;
const HOLD_ID = /^[0-9a-f-]{36}$/;
const SLUG = /^[a-z0-9-]+$/;
const site = env => env.CHECKOUT_MODE === 'sandbox' ? env.SANDBOX_RETURN_ORIGIN : SITE;
const siteOrigins = env => env.CHECKOUT_MODE === 'sandbox' ? [env.SANDBOX_RETURN_ORIGIN] : SITE_ORIGINS;
const cors = env => ({ 'Access-Control-Allow-Origin':site(env), 'Access-Control-Allow-Methods':'GET, POST, OPTIONS', 'Access-Control-Allow-Headers':'Content-Type', 'Vary':'Origin', 'Cache-Control':'no-store' });
const json = (body, status=200, env={}) => new Response(JSON.stringify(body), {status, headers:{...cors(env),'Content-Type':'application/json'}});
const stock = (env, slug) => env.PAINTING_STOCK.getByName(slug);
const paypalBase = env => env.CHECKOUT_MODE === 'sandbox' ? 'https://api-m.sandbox.paypal.com' : 'https://api-m.paypal.com';

async function token(env) {
  const response = await fetch(`${paypalBase(env)}/v1/oauth2/token`, {
    method:'POST',
    headers:{Authorization:`Basic ${btoa(`${env.PAYPAL_CLIENT_ID}:${env.PAYPAL_CLIENT_SECRET}`)}`, 'Content-Type':'application/x-www-form-urlencoded'},
    body:'grant_type=client_credentials'
  });
  const body = await response.json();
  if (!response.ok || !body.access_token) throw new Error(`PayPal token: ${response.status}`);
  return body.access_token;
}
async function paypal(env, path, accessToken, body, requestId) {
  const response = await fetch(`${paypalBase(env)}${path}`, {
    method:body === undefined ? 'GET' : 'POST',
    headers:{Authorization:`Bearer ${accessToken}`, 'Content-Type':'application/json', 'Prefer':'return=representation', ...(requestId ? {'PayPal-Request-Id':requestId} : {})},
    body:body === undefined ? undefined : JSON.stringify(body)
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(`PayPal API: ${response.status} ${result.name || ''}`);
    error.status = response.status;
    throw error;
  }
  return result;
}
function validateCapture(order,slug,env,expected) {
  const unit = order?.purchase_units?.[0];
  const captures = unit?.payments?.captures;
  const capture = captures?.[0];
  const address = unit?.shipping?.address;
  if (order?.status !== 'COMPLETED' || order.purchase_units.length !== 1 || unit.reference_id !== slug || unit.custom_id !== slug ||
      unit.amount?.currency_code !== 'USD' || unit.amount?.value !== expected?.total ||
      unit.amount?.breakdown?.item_total?.value !== (expected.base || ((Math.round(Number(expected.total)*100)-Math.round(Number(expected.shipping)*100)-Math.round(Number(expected.tax)*100))/100).toFixed(2)) || unit.amount?.breakdown?.shipping?.value !== expected.shipping ||
      unit.amount?.breakdown?.tax_total?.value !== expected.tax || captures?.length !== 1 ||
      address?.country_code !== 'US' || address?.postal_code !== expected.destination?.zip || address?.admin_area_1 !== expected.destination?.state ||
      capture?.status !== 'COMPLETED' || capture.amount?.currency_code !== 'USD' || capture.amount?.value !== expected.total ||
      (unit.payee?.merchant_id && unit.payee.merchant_id !== env.PAYPAL_MERCHANT_ID) || !capture.id) return null;
  return capture.id;
}

// Authenticated maintenance can reconstruct a receipt from an already captured order.
// GET only: never create/capture/refund payments or purchase labels here.
export async function backfillCheckoutSale(env,slug) {
  const stub=stock(env,slug),expected=await stub.order();
  if(expected?.state!=='sold' || !expected.captureId)return {recorded:false,status:expected?.state||'available'};
  // Bitcoin receipts are already durably saved by settlement; never send their
  // order IDs to PayPal during accounting maintenance or relisting.
  if(expected.orderId?.startsWith('cart:'))return env.CART_ORDERS.getByName(expected.orderId.slice(5)).archiveSale();
  if(expected.orderId?.startsWith('btcpay:'))return stub.archiveSale();
  if(expected.orderId===`ipn:${expected.captureId}`) {
    // Legacy payment links have transaction IDs, not Orders API IDs. The signed
    // IPN handler already saved their receipts before updating inventory.
    const current=new Date().toISOString().slice(0,7),periods=new Set([current]);
    const recorded=period=>env.SALES_LEDGER.getByName(`live:${period}`).hasRecordedIpnSale(expected.captureId);
    if(await recorded(current))return {recorded:true,period:current};
    let cursor;
    do {
      const page=await env.SALES_ARCHIVE.list({prefix:'sales/live/',delimiter:'/',...(cursor?{cursor}:{})});
      for(const prefix of page.delimitedPrefixes||[]) {
        const period=prefix.match(/^sales\/live\/(\d{4}-\d{2})\/$/)?.[1];
        if(period&&!periods.has(period)){periods.add(period);if(await recorded(period))return {recorded:true,period};}
      }
      cursor=page.truncated?page.cursor:null;
    }while(cursor);
    throw Error('Verified IPN sale receipt is missing from the ledger');
  }
  const accessToken=await token(env);
  const order=await paypal(env,`/v2/checkout/orders/${expected.orderId}`,accessToken);
  const captureId=validateCapture(order,slug,env,expected);
  if(!captureId || captureId!==expected.captureId)throw Error('Historical capture validation failed');
  await stub.complete(expected.orderId,captureId,captureDetails(order));
  return stub.archiveSale();
}
