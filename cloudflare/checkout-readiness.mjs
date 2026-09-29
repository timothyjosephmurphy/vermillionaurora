import { sellerMailToken } from './shipping-email.mjs';
import { priceOrder } from './checkout-pricing.mjs';

// Administrative provider checks without payments or label purchases. The deployment job creates and removes
// this random credential; public callers cannot trigger provider requests.
export async function checkoutReadiness(request,env) {
  const reply=(value,status=200)=>Response.json(value,{status,headers:{'Cache-Control':'no-store'}});
  if(request.method!=='POST'||!env.CHECKOUT_AUDIT_TOKEN||request.headers.get('Authorization')!==`Bearer ${env.CHECKOUT_AUDIT_TOKEN}`)return reply({error:'Not found'},404);
  if(env.PAYPAL_MODE!=='live')return reply({error:'Expected live configuration'},409);
  const checks={};
  const get=async(url,authorization,extra={})=>{
    const r=await fetch(url,{headers:{Authorization:authorization,...extra},signal:AbortSignal.timeout(15000)});
    if(!r.ok)throw Error(`HTTP ${r.status}`);
    return r.json();
  };
  try {
    const r=await fetch('https://api-m.paypal.com/v1/oauth2/token',{method:'POST',headers:{Authorization:`Basic ${btoa(`${env.PAYPAL_CLIENT_ID}:${env.PAYPAL_CLIENT_SECRET}`)}`,'Content-Type':'application/x-www-form-urlencoded'},body:'grant_type=client_credentials',signal:AbortSignal.timeout(15000)});
    const auth=await r.json();
    if(!r.ok||!auth.access_token)throw Error(`HTTP ${r.status}`);
    checks.paypalAuthentication=true;
    const hook=await get('https://api-m.paypal.com/v1/notifications/webhooks/'+encodeURIComponent(env.PAYPAL_WEBHOOK_ID),`Bearer ${auth.access_token}`);
    checks.paypalWebhook=hook.url==='https://vermillion-commissions.timothyjosephmurphy.workers.dev/checkout/webhook'&&hook.event_types?.some(x=>['PAYMENT.CAPTURE.COMPLETED','*'].includes(x.name));
    checks.merchantMatchesConfirmedAccount=env.PAYPAL_MERCHANT_ID==='8DYAVLDCWDESE';
  }catch(error){checks.paypalError=error.message;}
  try {
    if(!/^[sr]k_live_/.test(env.STRIPE_SECRET_KEY||''))throw Error('Expected a live Stripe key');
    const settings=await get('https://api.stripe.com/v1/tax/settings',`Bearer ${env.STRIPE_SECRET_KEY}`);
    checks.stripeTax=settings.livemode===true&&settings.status==='active';
    const registrations=await get('https://api.stripe.com/v1/tax/registrations?status=active&limit=100',`Bearer ${env.STRIPE_SECRET_KEY}`);
    checks.taxRegistrations=(registrations.data||[]).map(x=>({country:x.country,state:x.country_options?.us?.state||null}));
  }catch(error){checks.stripeError=error.message;}
  try {
    if(!env.SHIPPO_TOKEN?.startsWith('shippo_live_'))throw Error('Expected a live Shippo token');
    const accounts=await get('https://api.goshippo.com/carrier_accounts/?results=100',`ShippoToken ${env.SHIPPO_TOKEN}`,{'SHIPPO-API-VERSION':'2018-02-08'});
    checks.shippoAuthentication=true;
    checks.activeCarriers=(accounts.results||[]).filter(x=>x.active===true).map(x=>x.carrier);
  }catch(error){checks.shippoError=error.message;}
  checks.inventoryBinding=!!env.PAINTING_STOCK;
  checks.salesLedger=!!env.SALES_LEDGER&&!!env.SALES_ARCHIVE;
  checks.shippingOrigin=!!env.SHIP_FROM_STREET;
  if (env.CHECKOUT_PILOT_ENABLED==='true') {
    checks.pilotRestriction=env.PAYPAL_CHECKOUT_SLUGS==='painting-portrait-in-green' && env.SHIPPO_CARRIER_ALLOWLIST==='UPS';
    checks.automaticLabels=env.SHIPPO_AUTO_LABEL_ENABLED==='true';
    try { await sellerMailToken(env); checks.sellerEmail=true; }
    catch(error) { checks.sellerEmailError=error.message; }
    try {
      const slug='painting-portrait-in-green';
      checks.pilotStock=await env.PAINTING_STOCK.getByName(slug).status();
      if(checks.pilotStock==='sold') {
        checks.completedPilot=true;
      } else {
      // A quote only, addressed to the configured origin. No PayPal order,
      // tax transaction, shipping label or email is created by this check.
      const quote=await priceOrder(env,slug,{name:'Live checkout verification',street1:env.SHIP_FROM_STREET,city:'Seattle',state:'WA',zip:'98122'});
      checks.pilotQuote={base:quote.base,shipping:quote.shipping,tax:quote.tax,total:quote.total,carrier:quote.carrier,
        insurance:quote.insurance?.amount||null,insuranceFee:quote.insurance?.fee||null};
      checks.insuredQuote=quote.base==='20.00'&&quote.insurance?.amount==='20.00'&&quote.carrier==='UPS';
      }
    } catch(error) { checks.pilotQuoteError=error.message; }
  }
  const pilotReady=env.CHECKOUT_PILOT_ENABLED!=='true' ||
    (checks.pilotRestriction&&checks.automaticLabels&&checks.sellerEmail&&(checks.completedPilot||(checks.insuredQuote&&checks.pilotStock==='available')));
  const ready=checks.paypalAuthentication&&checks.paypalWebhook&&checks.merchantMatchesConfirmedAccount&&checks.stripeTax&&checks.shippoAuthentication&&checks.activeCarriers?.length>0&&checks.inventoryBinding&&checks.shippingOrigin&&checks.salesLedger&&pilotReady;
  return reply({mode:env.PAYPAL_MODE,enabled:env.PAYPAL_CHECKOUT_ENABLED==='true',release:env.CHECKOUT_RELEASE||null,ready:!!ready,checks},ready?200:503);
}
