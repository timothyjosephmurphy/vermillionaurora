import catalog from './checkout-catalog.mjs';
import { priceOrder } from './checkout-pricing.mjs';
import { SITE, ORDER, bitcoinApi, bitcoinOffered, validBitcoinSignature } from './bitcoin-api.mjs';

const cors = {'Access-Control-Allow-Origin':SITE,'Access-Control-Allow-Methods':'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers':'Content-Type','Vary':'Origin','Cache-Control':'no-store'};
const json = (body,status=200) => Response.json(body,{status,headers:cors});
export async function bitcoinCheckout(request,env) {
  const url = new URL(request.url), path = url.pathname;
  if (request.method === 'OPTIONS') return new Response(null,{status:204,headers:cors});
  if (request.headers.get('Origin') && request.headers.get('Origin') !== SITE) return json({error:'Origin not allowed.'},403);
  if (path === '/checkout/bitcoin/status' && request.method === 'GET') {
    const slug = url.searchParams.get('slug'), item = catalog[slug];
    if (!item || !bitcoinOffered(env,slug)) return json({enabled:false});
    return json({enabled:true,status:item.available===false?'sold':await env.PAINTING_STOCK.getByName(slug).status(),
      title:item.title,amount:item.amount,currency:'USD'});
  }
  if (request.method !== 'POST' || !['/checkout/bitcoin/quote','/checkout/bitcoin/create','/checkout/bitcoin/order'].includes(path)) return json({error:'Not found.'},404);
  let data;
  try { const raw=await request.text(); if(raw.length>8000)return json({error:'Request too large.'},413); data=JSON.parse(raw); }
  catch { return json({error:'Invalid request.'},400); }
  if (path === '/checkout/bitcoin/order') {
    if (!ORDER.test(data?.orderId || '') || !env.BITCOIN_ORDERS) return json({error:'Invalid Bitcoin order.'},400);
    try { return json(await env.BITCOIN_ORDERS.getByName(data.orderId).publicStatus(data.slug)); }
    catch { return json({error:'Payment status is temporarily unavailable. Please keep your invoice and check again.'},503); }
  }
  const slug=data?.slug,item=catalog[slug];
  if (!item || !bitcoinOffered(env,slug)) return json({error:'Bitcoin checkout is being set up.'},503);
  if (item.available===false || await env.PAINTING_STOCK.getByName(slug).status() !== 'available') return json({error:'This painting is reserved or sold.'},409);
  try {
    const quote=await priceOrder(env,slug,data.address);
    if (path.endsWith('/quote')) return json({base:quote.base,shipping:quote.shipping,tax:quote.tax,total:quote.total,
      carrier:quote.carrier,service:quote.service,packaging:quote.packaging});
    if (quote.total !== data.expectedTotal) return json({error:'Shipping or tax changed. Please calculate your total again.'},409);
    const orderId=crypto.randomUUID();
    const result=await env.BITCOIN_ORDERS.getByName(orderId).start(orderId,slug,quote);
    // Even an uncertain creation returns its durable order reference for recovery.
    return json({orderId,...result});
  } catch(error) {
    console.error('Bitcoin checkout failed',error.message);
    return json({error:'Could not start Bitcoin checkout. Please try again shortly.'},503);
  }
}

export async function bitcoinWebhook(request,env) {
  if (request.method !== 'POST') return new Response('Method not allowed',{status:405});
  if (!env.BTCPAY_WEBHOOK_SECRET || !env.BITCOIN_ORDERS) return new Response('Not configured',{status:503});
  const raw=await request.text();
  if (raw.length>64000) return new Response('Too large',{status:413});
  if (!await validBitcoinSignature(raw,request.headers.get('BTCPay-Sig'),env.BTCPAY_WEBHOOK_SECRET)) return new Response('Invalid signature',{status:400});
  try {
    const event=JSON.parse(raw);
    if (event.storeId!==env.BTCPAY_STORE_ID || !/^[a-zA-Z0-9]{1,100}$/.test(event.invoiceId||'')) return new Response('Ignored');
    // Read authoritative invoice state, rather than trusting event order or browser redirects.
    const invoice=await bitcoinApi(env,`/invoices/${encodeURIComponent(event.invoiceId)}`);
    const orderId=invoice.metadata?.orderId?.replace(/^va-btc-/,'');
    if (!invoice.metadata?.orderId?.startsWith('va-btc-') || !ORDER.test(orderId||'')) return new Response('Ignored');
    await env.BITCOIN_ORDERS.getByName(orderId).refresh(event.invoiceId);
    return new Response('OK');
  } catch(error) {
    console.error('Bitcoin webhook needs retry',error.message);
    return new Response('Retry later',{status:503});
  }
}
