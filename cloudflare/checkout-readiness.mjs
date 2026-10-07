import { sellerMailToken } from './shipping-email.mjs';
import { priceOrder } from './checkout-pricing.mjs';
import catalog from './checkout-catalog.mjs';
import { squareRequest } from './square-provider.mjs';
import { bitcoinApi } from './bitcoin-api.mjs';

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
  if(env.BTCPAY_CHECKOUT_ENABLED==='true') {
    try {
      if(!env.BTCPAY_API_KEY||!env.BTCPAY_STORE_ID)throw Error('Missing BTCPay API key or store ID');
      const invoices=await bitcoinApi(env,'/invoices?take=1');
      if(!Array.isArray(invoices))throw Error('Invalid BTCPay invoice response');
      checks.bitcoinInvoiceAccess=true;
      checks.bitcoinReservedOrders=[];
      for(const slug of (env.BTCPAY_CHECKOUT_SLUGS||'').split(',').map(s=>s.trim()).filter(Boolean)){
        const stock=await env.PAINTING_STOCK.getByName(slug).order();
        if(stock?.state==='cart-held'&&stock.orderId?.startsWith('cart:')){
          checks.bitcoinReservedOrders.push({slug,...await env.CART_ORDERS.getByName(stock.orderId.slice(5)).bitcoinDiagnostics()});
        }
      }
    } catch(error) {
      checks.bitcoinInvoiceAccess=false;
      checks.bitcoinInvoiceAccessError=error.message;
    }
  }
  if(env.SQUARE_CHECKOUT_ENABLED==='true') {
    try {
      const required=['SQUARE_ACCESS_TOKEN','SQUARE_APPLICATION_ID','SQUARE_LOCATION_ID','SQUARE_WEBHOOK_SIGNATURE_KEY','SQUARE_WEBHOOK_URL'];
      const missing=required.filter(name=>!env[name]);
      if(missing.length)throw Error('Missing production Square settings: '+missing.join(', '));
      checks.squareConfiguration=env.SQUARE_MODE==='live'&&!env.SQUARE_APPLICATION_ID.startsWith('sandbox-')&&
        env.SQUARE_WEBHOOK_URL==='https://vermillion-commissions.timothyjosephmurphy.workers.dev/checkout/square/webhook'&&
        (env.SQUARE_CHECKOUT_ALL==='true'||!!env.SQUARE_CHECKOUT_SLUGS);
      if(!checks.squareConfiguration)throw Error('Expected production Square mode, application, webhook URL, and eligible items');
      const [locationResult,webhooks]=await Promise.all([
        squareRequest(env,'/v2/locations/'+encodeURIComponent(env.SQUARE_LOCATION_ID)),
        squareRequest(env,'/v2/webhooks/subscriptions?limit=100')
      ]);
      const location=locationResult.location;
      checks.squareLocation=location?.id===env.SQUARE_LOCATION_ID&&location.status==='ACTIVE'&&location.currency==='USD'&&location.capabilities?.includes('CREDIT_CARD_PROCESSING')===true;
      checks.squareWebhook=webhooks.subscriptions?.some(h=>h.enabled===true&&h.notification_url===env.SQUARE_WEBHOOK_URL&&h.event_types?.includes('payment.updated'))===true;
    } catch(error) { checks.squareError=error.message; }
  }
  checks.inventoryBinding=!!env.PAINTING_STOCK;
  checks.salesLedger=!!env.SALES_LEDGER&&!!env.SALES_ARCHIVE;
  checks.shippingOrigin=!!env.SHIP_FROM_STREET;
  if (env.CHECKOUT_PILOT_ENABLED==='true') {
    const pilotSlugs=(env.PAYPAL_CHECKOUT_SLUGS||'').split(',').map(s=>s.trim()).sort().join(',');
    checks.pilotRestriction=['painting-portrait-in-green','painting-portrait-in-gold,painting-portrait-in-green'].includes(pilotSlugs) && env.SHIPPO_CARRIER_ALLOWLIST==='UPS';
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
      const listed=catalog[slug]?.amount;
      checks.insuredQuote=!!listed&&quote.base===listed&&quote.insurance?.amount===listed&&quote.carrier==='UPS';
      }
    } catch(error) { checks.pilotQuoteError=error.message; }
  }
  const pilotReady=env.CHECKOUT_PILOT_ENABLED!=='true' ||
    (checks.pilotRestriction&&checks.automaticLabels&&checks.sellerEmail&&(checks.completedPilot||(checks.insuredQuote&&checks.pilotStock==='available')));
  const squareReady=env.SQUARE_CHECKOUT_ENABLED!=='true'||(checks.squareConfiguration&&checks.squareLocation&&checks.squareWebhook);
  const bitcoinReady=env.BTCPAY_CHECKOUT_ENABLED!=='true'||checks.bitcoinInvoiceAccess===true;
  const ready=bitcoinReady&&squareReady&&checks.paypalAuthentication&&checks.paypalWebhook&&checks.merchantMatchesConfirmedAccount&&checks.stripeTax&&checks.shippoAuthentication&&checks.activeCarriers?.length>0&&checks.inventoryBinding&&checks.shippingOrigin&&checks.salesLedger&&pilotReady;
  return reply({mode:env.PAYPAL_MODE,enabled:env.PAYPAL_CHECKOUT_ENABLED==='true',release:env.CHECKOUT_RELEASE||null,ready:!!ready,checks},ready?200:503);
}
