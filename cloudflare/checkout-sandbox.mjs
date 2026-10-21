export { SalesLedger } from './sales-ledger.mjs';
export {CartOrder} from './cart-order.mjs';
export { BitcoinOrder } from './bitcoin-order.mjs';
import {printCodesApi} from './print-codes.mjs';
import {cartCheckout} from './cart-checkout.mjs';
import {printApi} from './print-api.mjs';
import {finerworksBillingSetup} from './finerworks-billing-setup.mjs';
import { shippingCheck } from './shipping-check.mjs';
import {squareWebhook} from './square-webhook.mjs';
import {squareTestPage,squareTestPageEnabled} from './square-test-page.mjs';
import printTestAssets from './print-test-assets.generated.mjs';
import printCatalog from './print-catalog.mjs';
export { PaintingStock } from './painting-stock.mjs';
export { ShippingCheck } from './shipping-check.mjs';
export { QuickbooksSync } from './quickbooks-sync.mjs';
import { quickbooksApi } from './quickbooks-api.mjs';


export default {
  fetch(request,env) {
    if (env.CHECKOUT_MODE !== 'sandbox' || env.GITHUB_TOKEN) return new Response('Sandbox isolation failure',{status:503});
    const path=new URL(request.url).pathname;
    if(request.method==='GET'&&Object.hasOwn(printTestAssets,path)) {
      const asset=printTestAssets[path],bytes=Uint8Array.from(atob(asset.base64),c=>c.charCodeAt(0));
      return new Response(bytes,{headers:{'Content-Type':'image/jpeg','Cache-Control':'public, max-age=31536000, immutable','ETag':asset.sha256}});
    }
    if(request.method==='GET'&&path==='/checkout/print-preview') {
      const id=new URL(request.url).searchParams.get('product'),p=Object.values(printCatalog).find(p=>p.productId===id&&(p.testOnly||p.sampleOnly));
      if(p)return Response.redirect(p.assetUrl,302);
      return new Response('Not found',{status:404});
    }
    if (path==='/checkout/prints/billing-setup')return finerworksBillingSetup(request,env);
    if (path.startsWith('/checkout/prints/')) return printApi(request,env);
    if (path === '/checkout/print-codes/issue') return printCodesApi(request,env);
    if (path.startsWith('/quickbooks/')) return quickbooksApi(request,env);
    if (path.startsWith('/checkout/cart/')) return cartCheckout(request,env);
    if (path==='/checkout/square/webhook')return squareWebhook(request,env);
    if (path==='/checkout/shipping-check') return shippingCheck(request,env);
    if (path==='/checkout/square-test' && request.method==='GET') {
      if (!squareTestPageEnabled(env)) return new Response('Not found',{status:404});
      return new Response(squareTestPage,{headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'}});
    }
    if (path==='/checkout/health' && request.method==='GET') return Response.json({mode:'sandbox',release:env.CHECKOUT_RELEASE||null},{headers:{'Cache-Control':'no-store'}});
    return new Response('Not found',{status:404});
  }
};
