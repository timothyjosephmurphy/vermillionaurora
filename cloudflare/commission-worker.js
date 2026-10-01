import {commissionForm} from './commission-form.mjs';
import {commissionPrivacy,purgeCommissionReferences} from './commission-privacy.mjs';
import {cartCheckout} from './cart-checkout.mjs';
import {printApi} from './print-api.mjs';
export {CartOrder} from './cart-order.mjs';
import { inventoryStatus } from './inventory-api.mjs';
import { catalogVersion } from './checkout-catalog.mjs';
export { SalesLedger } from './sales-ledger.mjs';
export { BitcoinOrder } from './bitcoin-order.mjs';
import { bitcoinCheckout, bitcoinWebhook } from './bitcoin-checkout.mjs';
// Deployed automatically from GitHub via Cloudflare Builds.
import { handlePaypalIpn } from "./paypal-inventory.mjs";
import { checkout, checkoutWebhook } from "./paypal-orders.mjs";
import { salesMaintenance } from './sales-maintenance.mjs';
import { checkoutReadiness } from './checkout-readiness.mjs';
export { PaintingStock } from './painting-stock.mjs';
export default {
  async scheduled(event,env,ctx) { ctx.waitUntil(purgeCommissionReferences(env)); },
  async fetch(request, env) {
    const path = new URL(request.url).pathname;
    if (path === '/commission-privacy') return commissionPrivacy(request,env);
    if (path.startsWith('/checkout/prints/')) return printApi(request,env);
    if (path.startsWith('/checkout/cart/')) return cartCheckout(request,env);
    if (path === '/inventory/status') return inventoryStatus(request,env);
    if (path === '/checkout/bitcoin/webhook') return bitcoinWebhook(request,env);
    if (path.startsWith('/checkout/bitcoin/')) return bitcoinCheckout(request,env);
    if (path === '/checkout/health' && request.method === 'GET') return Response.json({catalogVersion,mode:env.PAYPAL_MODE,enabled:env.PAYPAL_CHECKOUT_ENABLED==='true',release:env.CHECKOUT_RELEASE || null},{headers:{'Cache-Control':'no-store'}});
    if (path === '/checkout/sales-maintenance') return salesMaintenance(request,env);
    if (path === '/checkout/readiness') return checkoutReadiness(request,env);
    if (path === "/paypal-ipn") {
      return handlePaypalIpn(request, env);
    }
    if (path === '/checkout/webhook') return checkoutWebhook(request,env);
    if (path.startsWith('/checkout/')) return checkout(request,env);
    return commissionForm(request,env);
  }
};
