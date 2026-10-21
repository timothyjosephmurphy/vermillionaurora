import catalog, {catalogVersion} from './checkout-catalog.mjs';
import { priceOrder } from './checkout-pricing.mjs';

import { PRIMARY_SITE as SITE, SITE_ORIGINS, isSiteOrigin, withCors } from './site-origins.mjs';
const ORDER_ID = /^[A-Z0-9]{1,36}$/;
const HOLD_ID = /^[0-9a-f-]{36}$/;
const SLUG = /^[a-z0-9-]+$/;
const site = env => env.CHECKOUT_MODE === 'sandbox' ? env.SANDBOX_RETURN_ORIGIN : SITE;
const siteOrigins = env => env.CHECKOUT_MODE === 'sandbox' ? [env.SANDBOX_RETURN_ORIGIN] : SITE_ORIGINS;
const cors = env => ({ 'Access-Control-Allow-Origin':site(env), 'Access-Control-Allow-Methods':'GET, POST, OPTIONS', 'Access-Control-Allow-Headers':'Content-Type', 'Vary':'Origin', 'Cache-Control':'no-store' });
const json = (body, status=200, env={}) => new Response(JSON.stringify(body), {status, headers:{...cors(env),'Content-Type':'application/json'}});
const stock = (env, slug) => env.PAINTING_STOCK.getByName(slug);


// Authenticated maintenance can reconstruct a receipt from an already captured order.
// GET only: never create/capture/refund payments or purchase labels here.
export async function backfillCheckoutSale(env,slug) {
  const stub=stock(env,slug),expected=await stub.order();
  if(expected?.state!=='sold' || !expected.captureId)return {recorded:false,status:expected?.state||'available'};
  // Bitcoin receipts are already durably saved by settlement; never send their
  // order IDs to an outside API during accounting maintenance or relisting.
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
  // PayPal was removed (studio-tracker #133). Already captured PayPal sales keep the
  // receipt saved at capture time; archive that stored receipt without calling PayPal.
  return stub.archiveSale();
}
