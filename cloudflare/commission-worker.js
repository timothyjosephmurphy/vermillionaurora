import {printCodesApi} from './print-codes.mjs';
import {commissionForm} from './commission-form.mjs';
import {commissionPrivacy,purgeCommissionReferences} from './commission-privacy.mjs';
import {cartCheckout} from './cart-checkout.mjs';
import {squareWebhook} from './square-webhook.mjs';
import {printApi} from './print-api.mjs';
import {stickerCheckout} from './printful-stickers.mjs';
import {ownerPrintOrder} from './owner-print-order.mjs';
import {etsyConnection} from './etsy-connection.mjs';
import {etsyListings} from './etsy-listings.mjs';
import {bufferApi} from './buffer-api.mjs';
export {CartOrder} from './cart-order.mjs';
import { inventoryStatus } from './inventory-api.mjs';
import { originalStatusApi } from './original-status.mjs';
import { runOriginalInventorySync } from './etsy-original-sync.mjs';
import { catalogVersion } from './checkout-catalog.mjs';
import { applyCatalogOverlay, catalogSource } from './catalog-overlay.mjs';
export { SalesLedger } from './sales-ledger.mjs';
export { BitcoinOrder } from './bitcoin-order.mjs';
import { bitcoinCheckout, bitcoinWebhook } from './bitcoin-checkout.mjs';
// Deployed automatically from GitHub via Cloudflare Builds.
import { salesMaintenance } from './sales-maintenance.mjs';
import { checkoutReadiness } from './checkout-readiness.mjs';
export { PaintingStock } from './painting-stock.mjs';
export { QuickbooksSync } from './quickbooks-sync.mjs';
import { markAtCostOrders } from './quickbooks-sync.mjs';
import { quickbooksApi } from './quickbooks-api.mjs';
import { pollTips } from './btcpay-tips.mjs';
import { testimonialsApi, purgeTestimonialRateLimits, purgeVideos as purgeTestimonialVideos } from './testimonials.mjs';
import { handleTestimonialEmail } from './testimonial-reply.mjs';
export default {
  // Cloudflare Email Routing (stories@reply.tjm.art). Does not run for ordinary HTTP requests.
  async email(message, env, ctx) {
    await handleTestimonialEmail(message, env, ctx);
  },
  async scheduled(event,env,ctx) {
    await applyCatalogOverlay(env);
    if (event?.cron === '*/5 * * * *') { ctx.waitUntil(runOriginalInventorySync(env).catch(()=>console.error('Etsy original sync failed'))); return; }
    ctx.waitUntil(purgeCommissionReferences(env)); ctx.waitUntil(purgeTestimonialRateLimits(env).catch(()=>console.error('Testimonial rate-limit cleanup failed'))); ctx.waitUntil(purgeTestimonialVideos(env).catch(()=>console.error('Testimonial video cleanup failed'))); ctx.waitUntil(markAtCostOrders(env).catch(()=>console.error('QuickBooks at-cost marker backfill failed'))); ctx.waitUntil(pollTips(env).catch(()=>console.error('Lightning tip poll failed')));
  },
  async fetch(request, env, ctx) {
    const path = new URL(request.url).pathname;
    // Live catalog (D1) over the built catalog; built values if D1 is unavailable.
    await applyCatalogOverlay(env);
    if (path.startsWith('/testimonials/api/')) return testimonialsApi(request,env,ctx);
    if (path.startsWith('/buffer/')) return bufferApi(request,env);
    if (path.startsWith('/etsy/listings/')) return etsyListings(request,env);
    if (path.startsWith('/etsy/')) return etsyConnection(request,env);
    if (path.startsWith('/quickbooks/')) return quickbooksApi(request,env);
    if (path === '/commission-privacy') return commissionPrivacy(request,env);
    if (path.startsWith('/checkout/prints/')) return printApi(request,env);
    if (path.startsWith('/checkout/stickers/')) return stickerCheckout(request,env);
    if (path === '/checkout/print-codes/issue') return printCodesApi(request,env);
    if (path === '/checkout/owner/print-order') return ownerPrintOrder(request,env);
    if (path.startsWith('/checkout/cart/')) return cartCheckout(request,env);
    if (path === '/checkout/square/webhook') return squareWebhook(request,env);
    if (path === '/inventory/originals') return originalStatusApi(request,env);
    if (path === '/inventory/status') return inventoryStatus(request,env,ctx);
    if (path === '/checkout/bitcoin/webhook') return bitcoinWebhook(request,env);
    if (path.startsWith('/checkout/bitcoin/')) return bitcoinCheckout(request,env);
    if (path === '/checkout/health' && request.method === 'GET') return Response.json({catalogVersion,mode:env.CHECKOUT_MODE,release:env.CHECKOUT_RELEASE || null,catalogSource:catalogSource()},{headers:{'Cache-Control':'no-store'}});
    if (path === '/checkout/sales-maintenance') return salesMaintenance(request,env);
    if (path === '/checkout/readiness') return checkoutReadiness(request,env);
    if (path.startsWith('/checkout/')) return Response.json({error:'Not found.'},{status:404,headers:{'Cache-Control':'no-store'}});
    return commissionForm(request,env);
  }
};
