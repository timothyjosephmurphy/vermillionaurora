import { sellerMailToken } from './shipping-email.mjs';
import { priceOrder } from './checkout-pricing.mjs';
import catalog from './checkout-catalog.mjs';
import { squareRequest } from './square-provider.mjs';
import { bitcoinApi } from './bitcoin-api.mjs';
import { waRate } from './wa-sales-tax.mjs';

// Administrative provider checks without payments or label purchases. The deployment job creates and removes
// this random credential; public callers cannot trigger provider requests.
const APPLE_PAY_DOMAIN='tjm.art';
// Seattle City Hall, a public address used only to confirm the DOR lookup answers.
export const WA_TAX_CHECK_ADDRESS={street1:'600 4th Ave',city:'Seattle',state:'WA',zip:'98104'};
export async function checkoutReadiness(request,env) {
  const reply=(value,status=200)=>Response.json(value,{status,headers:{'Cache-Control':'no-store'}});
  if(request.method!=='POST'||!env.CHECKOUT_AUDIT_TOKEN||request.headers.get('Authorization')!==`Bearer ${env.CHECKOUT_AUDIT_TOKEN}`)return reply({error:'Not found'},404);
  if(env.CHECKOUT_MODE!=='live')return reply({error:'Expected live configuration'},409);
  const checks={};
  const get=async(url,authorization,extra={})=>{
    const r=await fetch(url,{headers:{Authorization:authorization,...extra},signal:AbortSignal.timeout(15000)});
    if(!r.ok)throw Error(`HTTP ${r.status}`);
    return r.json();
  };
  try {
    // Washington DOR rate lookup (public, no credential). Warn only: a DOR outage never blocks checkout (fallback rate).
    const wa=await waRate(WA_TAX_CHECK_ADDRESS);
    checks.waTaxRate={rate:wa.rate,loccode:wa.loccode,jurisdiction:wa.jurisdiction,period:wa.period,basis:wa.basis,resultCode:wa.resultCode};
    checks.waTaxLookup=wa.basis==='address'&&Number(wa.rate)>=0.065;
    if(!checks.waTaxLookup)checks.waTaxWarning='DOR lookup did not match at street level; checkout would use the ZIP-level rate';
  }catch(error){checks.waTaxLookup=false;checks.waTaxError=error.message;checks.waTaxWarning='DOR lookup failing; checkout uses the 10.55% fallback rate (warning only)';}
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
    // Report-only (studio-tracker #71): does the store webhook to this Worker send 'invoice settled'? Tip sync
    // and order settlement both rely on it. Never blocks readiness; URLs and secrets are not echoed.
    try {
      const hooks=await bitcoinApi(env,'/webhooks');
      checks.bitcoinWebhooks=(Array.isArray(hooks)?hooks:[]).filter(h=>/\/checkout\/bitcoin\/webhook\/?$/.test(h?.url||'')).map(h=>{
        const everything=h.authorizedEvents?.everything===true,events=Array.isArray(h.authorizedEvents?.specificEvents)?h.authorizedEvents.specificEvents:[];
        return {enabled:h.enabled!==false,host:(()=>{try{return new URL(h.url).host;}catch{return null;}})(),everything,events,
          sendsInvoiceSettled:h.enabled!==false&&(everything||events.includes('InvoiceSettled')),automaticRedelivery:h.automaticRedelivery===true};
      });
      checks.bitcoinWebhookSendsInvoiceSettled=checks.bitcoinWebhooks.some(h=>h.sendsInvoiceSettled);
    } catch(error) { checks.bitcoinWebhookCheckError=error.message; }
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
    if(checks.squareConfiguration) {
      // Apple Pay on the web: register the storefront domain with Square (idempotent; TJ approved).
      // The association file is served by the site worker at /.well-known/. Informational only: never affects readiness.
      try {
        const response=await fetch('https://connect.squareup.com/v2/apple-pay/domains',{method:'POST',signal:AbortSignal.timeout(15000),
          headers:{Authorization:`Bearer ${env.SQUARE_ACCESS_TOKEN}`,'Content-Type':'application/json','Square-Version':'2026-08-19'},
          body:JSON.stringify({domain_name:APPLE_PAY_DOMAIN})});
        const result=await response.json().catch(()=>({}));
        checks.applePayDomain=response.ok?{domain:APPLE_PAY_DOMAIN,status:result.status||'UNKNOWN'}:
          {domain:APPLE_PAY_DOMAIN,error:`HTTP ${response.status}`,codes:(result.errors||[]).map(e=>[e.category,e.code].filter(Boolean).join(':')).slice(0,3),
            detail:String(result.errors?.[0]?.detail||'').slice(0,200)};
      } catch(error) { checks.applePayDomain={domain:APPLE_PAY_DOMAIN,error:error.message}; }
    }
  }
  checks.inventoryBinding=!!env.PAINTING_STOCK;
  checks.salesLedger=!!env.SALES_LEDGER&&!!env.SALES_ARCHIVE;
  checks.shippingOrigin=!!env.SHIP_FROM_STREET;
  if (env.CHECKOUT_PILOT_ENABLED==='true') {
    const pilotSlugs=(env.CHECKOUT_PILOT_SLUGS||'').split(',').map(s=>s.trim()).sort().join(',');
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
      // A quote only, addressed to the configured origin. No payment,
      // shipping label or email is created by this check.
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
  const ready=bitcoinReady&&squareReady&&checks.shippoAuthentication&&checks.activeCarriers?.length>0&&checks.inventoryBinding&&checks.shippingOrigin&&checks.salesLedger&&pilotReady;
  return reply({mode:env.CHECKOUT_MODE,release:env.CHECKOUT_RELEASE||null,ready:!!ready,checks},ready?200:503);
}
