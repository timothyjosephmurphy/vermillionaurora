import catalog from './checkout-catalog.mjs';
import { priceOrder } from './checkout-pricing.mjs';

const SITE = 'https://vermillionaurora.com';
const ORDER_ID = /^[A-Z0-9]{1,36}$/;
const HOLD_ID = /^[0-9a-f-]{36}$/;
const SLUG = /^[a-z0-9-]+$/;
const site = env => env.PAYPAL_MODE === 'sandbox' ? env.SANDBOX_RETURN_ORIGIN : SITE;
const cors = env => ({ 'Access-Control-Allow-Origin':site(env), 'Access-Control-Allow-Methods':'GET, POST, OPTIONS', 'Access-Control-Allow-Headers':'Content-Type', 'Vary':'Origin', 'Cache-Control':'no-store' });
const json = (body, status=200, env={}) => new Response(JSON.stringify(body), {status, headers:{...cors(env),'Content-Type':'application/json'}});
const configured = env => ['live','sandbox'].includes(env.PAYPAL_MODE) && env.PAYPAL_CLIENT_ID && env.PAYPAL_CLIENT_SECRET && env.PAYPAL_MERCHANT_ID && (env.PAYPAL_MODE === 'sandbox' ? env.SANDBOX_RETURN_ORIGIN && !env.GITHUB_TOKEN : env.GITHUB_TOKEN) && env.PAINTING_STOCK && env.SHIPPO_TOKEN && env.STRIPE_SECRET_KEY && env.SHIP_FROM_STREET && env.PAYPAL_WEBHOOK_ID;
const stock = (env, slug) => env.PAINTING_STOCK.getByName(slug);
const paypalBase = env => env.PAYPAL_MODE === 'sandbox' ? 'https://api-m.sandbox.paypal.com' : 'https://api-m.paypal.com';

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
export async function checkout(request, env) {
  const url = new URL(request.url);
  const respond = (body,status=200) => json(body,status,env);
  if (request.method === 'OPTIONS') return new Response(null,{status:204,headers:cors(env)});
  if (!configured(env)) return respond({error:'Checkout is being set up.'},503,env);
  // Pausing new purchases must still let existing orders settle and reconcile.
  const finishing = ['/checkout/capture','/checkout/cancel'].includes(url.pathname);
  if (!finishing && env.PAYPAL_CHECKOUT_ENABLED !== 'true') return respond({error:'Checkout is being set up.'},503);
  const origin = request.headers.get('Origin');
  if (origin && origin !== site(env)) return respond({error:'Origin not allowed.'},403,env);

  if (url.pathname === '/checkout/status' && request.method === 'GET') {
    const slug = url.searchParams.get('slug');
    if (!catalog[slug]) return respond({error:'Painting not in checkout catalog.'},404);
    return respond({status:await stock(env,slug).status(),title:catalog[slug].title,amount:catalog[slug].amount,currency:'USD'});
  }
  if (!['/checkout/quote','/checkout/create','/checkout/capture','/checkout/cancel'].includes(url.pathname) || request.method !== 'POST') return respond({error:'Not found.'},404);
  let data;
  try { data = await request.json(); } catch { return respond({error:'Invalid request.'},400); }
  const slug = data?.slug;
  if (typeof slug !== 'string' || !SLUG.test(slug) || !catalog[slug]) return respond({error:'Painting not in checkout catalog.'},404);
  const item = catalog[slug];
  const stub = stock(env,slug);

  if (url.pathname === '/checkout/quote') {
    if (await stub.status() !== 'available') return respond({error:'This painting is reserved or sold.'},409);
    try {
      const quote = await priceOrder(env,slug,data.address);
      return respond({base:quote.base,shipping:quote.shipping,tax:quote.tax,total:quote.total,carrier:quote.carrier,service:quote.service,packaging:quote.packaging});
    } catch (error) {
      console.error('Shipping or tax quote failed:',slug,error.message);
      return respond({error:'Unable to quote shipping and tax for this address.'},422);
    }
  }

  if (url.pathname === '/checkout/create') {
    const holdId = crypto.randomUUID();
    if (!await stub.reserve(holdId)) return respond({error:'This painting is reserved or sold.'},409);
    await stub.initialize(slug);
    try {
      const quote = await priceOrder(env,slug,data.address);
      if (quote.total !== data.expectedTotal) throw new Error('Checkout total changed; get a new quote');
      const accessToken = await token(env);
      const order = await paypal(env,'/v2/checkout/orders',accessToken,{
        intent:'CAPTURE',
        purchase_units:[{reference_id:slug,custom_id:slug,description:item.title,
          amount:{currency_code:'USD',value:quote.total,breakdown:{item_total:{currency_code:'USD',value:item.amount},shipping:{currency_code:'USD',value:quote.shipping},tax_total:{currency_code:'USD',value:quote.tax}}},
          shipping:{name:{full_name:quote.address.name},address:{address_line_1:quote.address.street1,
            ...(quote.address.street2 ? {address_line_2:quote.address.street2} : {}),admin_area_2:quote.address.city,
            admin_area_1:quote.address.state,postal_code:quote.address.zip,country_code:'US'}}}],
        payment_source:{paypal:{experience_context:{brand_name:'Vermillion Aurora',user_action:'PAY_NOW',shipping_preference:'SET_PROVIDED_ADDRESS',
          return_url:env.PAYPAL_MODE === 'sandbox' ? `${site(env)}/checkout/test?slug=${slug}&checkout=return&hold=${holdId}` : `${SITE}/products/${slug}/?checkout=return&hold=${holdId}`,
          cancel_url:env.PAYPAL_MODE === 'sandbox' ? `${site(env)}/checkout/test?slug=${slug}&checkout=cancel&hold=${holdId}` : `${SITE}/products/${slug}/?checkout=cancel&hold=${holdId}`}}}
      },holdId);
      const payeeId = order.purchase_units?.[0]?.payee?.merchant_id;
      if (payeeId && payeeId !== env.PAYPAL_MERCHANT_ID) throw new Error('PayPal order merchant does not match configured merchant');
      const approve = order.links?.find(link => link.rel === 'payer-action' || link.rel === 'approve')?.href;
      const allowedHosts = env.PAYPAL_MODE === 'sandbox' ? ['sandbox.paypal.com','www.sandbox.paypal.com'] : ['paypal.com','www.paypal.com'];
      if (!ORDER_ID.test(order.id || '') || !approve || new URL(approve).protocol !== 'https:' || !allowedHosts.includes(new URL(approve).hostname) ||
          !await stub.bindOrder(holdId,order.id,quote)) throw new Error('Invalid PayPal approval response');
      return respond({url:approve, ...(env.PAYPAL_MODE === 'sandbox' ? {testOrderId:order.id,testHoldId:holdId} : {})});
    } catch (error) {
      await stub.release(holdId);
      console.error('Checkout create failed:',slug,error.message);
      return respond({error:'Could not start checkout. Please try again.'},502);
    }
  }
  if (!ORDER_ID.test(data.orderId || '') || !HOLD_ID.test(data.holdId || '')) return respond({error:'Invalid checkout return.'},400);
  if (url.pathname === '/checkout/cancel') {
    await stub.releaseOrder(data.orderId,data.holdId);
    return respond({status:'cancelled'});
  }
  const state = await stub.beginCapture(data.orderId,data.holdId);
  if (state === 'sold') return respond({status:'sold'});
  if (state === 'invalid' || state === 'expired') return respond({error:'This checkout has expired.'},409);
  try {
    const accessToken = await token(env);
    const expected = await stub.order();
    if (expected?.orderId !== data.orderId || !expected.total) throw new Error('Missing server-side order total');
    let order = await paypal(env,`/v2/checkout/orders/${data.orderId}`,accessToken);
    if (order.status !== 'COMPLETED') {
      const unit = order.purchase_units?.[0];
      if (order.status !== 'APPROVED' || order.purchase_units?.length !== 1 || unit?.reference_id !== slug || unit?.custom_id !== slug ||
          unit?.amount?.currency_code !== 'USD' || unit?.amount?.value !== expected.total) throw new Error('Order did not match the painting or is not approved');
      order = await paypal(env,`/v2/checkout/orders/${data.orderId}/capture`,accessToken,{},`capture-${data.orderId}`);
    }
    const capture = validateCapture(order,slug,env,expected);
    if (!capture || !await stub.complete(data.orderId,capture)) throw new Error('Capture is not completed or did not match');
    return respond({status:'sold'});
  } catch (error) {
    // A timed-out capture may still complete. Keep the lock and reconcile by webhook or retry.
    console.error('Checkout capture needs reconciliation:',slug,data.orderId,error.message);
    return respond({error:'We could not confirm the payment yet. Please check PayPal Activity before trying again.'},503);
  }
}

function validateCapture(order,slug,env,expected) {
  const item = catalog[slug];
  const unit = order?.purchase_units?.[0];
  const captures = unit?.payments?.captures;
  const capture = captures?.[0];
  const address = unit?.shipping?.address;
  if (order?.status !== 'COMPLETED' || order.purchase_units.length !== 1 || unit.reference_id !== slug || unit.custom_id !== slug ||
      unit.amount?.currency_code !== 'USD' || unit.amount?.value !== expected?.total ||
      unit.amount?.breakdown?.item_total?.value !== item.amount || unit.amount?.breakdown?.shipping?.value !== expected.shipping ||
      unit.amount?.breakdown?.tax_total?.value !== expected.tax || captures?.length !== 1 ||
      address?.country_code !== 'US' || address?.postal_code !== expected.destination?.zip || address?.admin_area_1 !== expected.destination?.state ||
      capture?.status !== 'COMPLETED' || capture.amount?.currency_code !== 'USD' || capture.amount?.value !== expected.total ||
      (unit.payee?.merchant_id && unit.payee.merchant_id !== env.PAYPAL_MERCHANT_ID) || !capture.id) return null;
  return capture.id;
}

export async function checkoutWebhook(request,env) {
  if (request.method !== 'POST') return new Response('Method not allowed',{status:405});
  if (!configured(env) || !env.PAYPAL_WEBHOOK_ID || !env.PAYPAL_MERCHANT_ID) return new Response('Not configured',{status:503});
  const raw = await request.text();
  if (raw.length > 64000) return new Response('Too large',{status:413});
  try {
    const event = JSON.parse(raw);
    const accessToken = await token(env);
    const verification = await paypal(env,'/v1/notifications/verify-webhook-signature',accessToken,{
      auth_algo:request.headers.get('paypal-auth-algo'),cert_url:request.headers.get('paypal-cert-url'),
      transmission_id:request.headers.get('paypal-transmission-id'),transmission_sig:request.headers.get('paypal-transmission-sig'),
      transmission_time:request.headers.get('paypal-transmission-time'),webhook_id:env.PAYPAL_WEBHOOK_ID,webhook_event:event
    });
    if (verification.verification_status !== 'SUCCESS') return new Response('Invalid signature',{status:400});
    if (event.event_type !== 'PAYMENT.CAPTURE.COMPLETED') return new Response('Ignored');
    const orderId = event.resource?.supplementary_data?.related_ids?.order_id;
    if (!ORDER_ID.test(orderId || '')) return new Response('Ignored');
    const order = await paypal(env,`/v2/checkout/orders/${orderId}`,accessToken);
    const slug = order.purchase_units?.[0]?.reference_id;
    if (!catalog[slug]) return new Response('Ignored');
    const stub = stock(env,slug);
    const expected = await stub.order();
    if (expected?.orderId !== orderId) return new Response('Unrecognized order',{status:409});
    const captureId = validateCapture(order,slug,env,expected);
    if (!captureId || captureId !== event.resource?.id) return new Response('Invalid capture',{status:400});
    if (!await stub.complete(orderId,captureId)) return new Response('Unrecognized order',{status:409});
    await stub.recordWebhook(orderId,captureId);
    return new Response('OK');
  } catch(error) {
    console.error('Checkout webhook failed:',error.message);
    return new Response('Retry later',{status:503});
  }
}

