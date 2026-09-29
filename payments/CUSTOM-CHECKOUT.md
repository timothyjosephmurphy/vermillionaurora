# Shared checkout for original paintings

The product page script calls the `vermillion-commissions` Worker. One SQLite-backed Durable Object per painting holds the reservation, PayPal order, and sold state. The Worker reads its fixed-price catalog from `cloudflare/checkout-catalog.mjs`, generated with `node payments/build-checkout-catalog.mjs`. That generator rejects a product title or displayed price that differs from inventory and excludes sold/not-for-sale works and paintings with a separate hosted PayPal link. Rebuild the catalog when inventory or product prices change.

## Enablement

Checkout ships **disabled** (`PAYPAL_CHECKOUT_ENABLED=false` in `cloudflare/wrangler.jsonc`). Product pages retain their inquiry links while it is disabled. To go live:

1. Set encrypted `PAYPAL_CLIENT_ID` and `PAYPAL_CLIENT_SECRET` on the **Cloudflare `vermillion-commissions` Worker**, using the same live Business REST app. GitHub Actions secrets do not supply these to the Worker. Keep `GITHUB_TOKEN` (Contents read/write on this repository) and `PAYPAL_MERCHANT_ID` configured there too. Never commit secrets.
2. In the PayPal Developer Dashboard for that live app, subscribe `https://vermillion-commissions.timothyjosephmurphy.workers.dev/checkout/webhook` to `PAYMENT.CAPTURE.COMPLETED`. Set the resulting webhook ID as encrypted Worker secret `PAYPAL_WEBHOOK_ID`. This is separate from the legacy account-wide IPN listener at `/paypal-ipn`.
3. Confirm the shipping and tax policy. The current order charges exactly the displayed USD painting price, requests a shipping address in PayPal, and adds **no shipping or sales tax**. Do not enable live checkout until the displayed price can be the entire charged total or shipping/tax logic is added.
4. Test the sandbox flow with sandbox credentials and `PAYPAL_MODE=sandbox` in a separate test deployment, including two simultaneous buyers, a cancellation, completed capture, webhook delivery, and the GitHub inventory commit. Never change the production Worker's mode to sandbox while live buttons are enabled.
5. Set `PAYPAL_CHECKOUT_ENABLED=true` in the Wrangler configuration, deploy the Worker and website, and verify one controlled live purchase before promoting the remaining products.

When a PayPal capture is completed, the Durable Object marks the original sold immediately. An alarm retries the GitHub inventory/page commit until it succeeds; product buttons consult the object directly while the static site catches up. A create order failure releases its hold. An abandoned hold expires after 20 minutes. An uncertain capture remains locked until a retry or a verified PayPal webhook reconciles it. Never manually clear a `capturing` lock without checking PayPal Activity.

The old API-created reusable payment links must remain unpublished; they cannot enforce a stock limit. Retire them through PayPal API once the new flow is live. The separate Warsaw stock-limited link remains in `payments/paypal-links.json` and uses its current flow.
