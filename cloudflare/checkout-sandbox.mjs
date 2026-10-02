export { SalesLedger } from './sales-ledger.mjs';
export {CartOrder} from './cart-order.mjs';
export { BitcoinOrder } from './bitcoin-order.mjs';
import {cartCheckout} from './cart-checkout.mjs';
import {printApi} from './print-api.mjs';
import {finerworksBillingSetup} from './finerworks-billing-setup.mjs';
import catalog from './checkout-catalog.mjs';
import { checkout, checkoutWebhook } from './paypal-orders.mjs';
import { verifySandbox } from './checkout-verification.mjs';
import { shippingCheck } from './shipping-check.mjs';
import {printTestPage} from './print-test-page.mjs';
import {squareWebhook} from './square-webhook.mjs';
import printTestAssets from './print-test-assets.generated.mjs';
import printCatalog from './print-catalog.mjs';
export { PaintingStock } from './painting-stock.mjs';
export { ShippingCheck } from './shipping-check.mjs';

const page = `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Vermillion Aurora sandbox checkout</title>
<style>body{font:16px system-ui;max-width:600px;margin:40px auto;padding:0 16px}label{display:block;margin:12px 0}input,select,button{font:inherit;padding:8px;width:100%;box-sizing:border-box}button{margin:12px 0}pre{white-space:pre-wrap}</style>
<h1>Sandbox checkout</h1><p>PayPal sandbox funds only. This test does not change the live painting inventory.</p>
<form id="form"><label>Painting<select name="slug" id="slug"></select></label><label>Name<input name="name" required></label><label>Street<input name="street1" required></label><label>Apartment<input name="street2"></label><label>City<input name="city" required></label><label>State (two letters)<input name="state" maxlength="2" required></label><label>ZIP<input name="zip" required></label><button type="submit">Get shipping and tax quote</button></form>
<div id="result" role="status"></div><button id="buy" hidden>Continue to sandbox PayPal</button>
<script type="module">
const items=${JSON.stringify(Object.entries(catalog).map(([slug,item])=>({slug,title:item.title,amount:item.amount})))};
const form=document.querySelector('#form'), result=document.querySelector('#result'), buy=document.querySelector('#buy'), select=document.querySelector('#slug');
for(const item of items){const o=document.createElement('option');o.value=item.slug;o.textContent=item.title+' — $'+item.amount;select.append(o)}
const params=new URLSearchParams(location.search);if(items.some(x=>x.slug===params.get('slug')))select.value=params.get('slug');
let quote=null,address=null;
async function post(path,data){const res=await fetch('/checkout/'+path,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});const body=await res.json();if(!res.ok)throw Error(body.error||'Request failed');return body}
form.addEventListener('submit',async e=>{e.preventDefault();buy.hidden=true;quote=null;result.textContent='Getting quote…';try{const values=new FormData(form);address=Object.fromEntries(['name','street1','street2','city','state','zip'].map(k=>[k,values.get(k)]));quote=await post('quote',{slug:select.value,address});result.textContent='Painting $'+quote.base+' + shipping $'+quote.shipping+' + tax $'+quote.tax+' = $'+quote.total;buy.hidden=false}catch(err){result.textContent=err.message}});
buy.addEventListener('click',async()=>{buy.disabled=true;result.textContent='Starting sandbox PayPal…';try{const order=await post('create',{slug:select.value,address,expectedTotal:quote.total});location.assign(order.url)}catch(err){result.textContent=err.message;buy.disabled=false}});
if(params.get('checkout')==='return'||params.get('checkout')==='cancel'){form.hidden=true;result.textContent='Checking sandbox order…';const data={slug:params.get('slug'),holdId:params.get('hold'),orderId:params.get('token')};post(params.get('checkout')==='return'?'capture':'cancel',data).then(x=>{result.textContent=x.status==='sold'?'Sandbox capture completed. Test stock is sold.':'Sandbox checkout cancelled.'}).catch(err=>{result.textContent=err.message})}
</script></html>`;

export default {
  fetch(request,env) {
    if (env.PAYPAL_MODE !== 'sandbox' || env.GITHUB_TOKEN) return new Response('Sandbox isolation failure',{status:503});
    const path=new URL(request.url).pathname;
    if(request.method==='GET'&&Object.hasOwn(printTestAssets,path)) {
      const asset=printTestAssets[path],bytes=Uint8Array.from(atob(asset.base64),c=>c.charCodeAt(0));
      return new Response(bytes,{headers:{'Content-Type':'image/jpeg','Cache-Control':'public, max-age=31536000, immutable','ETag':asset.sha256}});
    }
    if(request.method==='GET'&&(path==='/checkout/print-test'||path==='/cart/'))return new Response(printTestPage,{headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'}});
    if(request.method==='GET'&&path==='/checkout/print-preview') {
      const id=new URL(request.url).searchParams.get('product'),p=Object.values(printCatalog).find(p=>p.productId===id&&(p.testOnly||p.sampleOnly));
      if(p)return Response.redirect(p.assetUrl,302);
      return new Response('Not found',{status:404});
    }
    if (path==='/checkout/prints/billing-setup')return finerworksBillingSetup(request,env);
    if (path.startsWith('/checkout/prints/')) return printApi(request,env);
    if (path.startsWith('/checkout/cart/')) return cartCheckout(request,env);
    if (path==='/checkout/square/webhook')return squareWebhook(request,env);
    if (path==='/checkout/shipping-check') return shippingCheck(request,env);
    if (path==='/checkout/verification') return verifySandbox(request,env);
    if (path==='/checkout/test' && request.method==='GET') return new Response(page,{headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'}});
    if (path==='/checkout/health' && request.method==='GET') return Response.json({mode:'sandbox',enabled:env.PAYPAL_CHECKOUT_ENABLED==='true',release:env.CHECKOUT_RELEASE||null},{headers:{'Cache-Control':'no-store'}});
    if (path==='/checkout/webhook') return checkoutWebhook(request,env);
    if (path.startsWith('/checkout/')) return checkout(request,env);
    return new Response('Not found',{status:404});
  }
};
