# Shared checkout for original paintings

The product page calls the `vermillion-commissions` Worker. One SQLite Durable Object per stable product ID serializes PayPal and Bitcoin reservations. `cloudflare/checkout-catalog.mjs` is generated from `catalog/products.json` by `npm run build`; never edit it by hand or scrape prices from HTML.

A buyer enters a US shipping address, receives a Shippo shipping quote plus a Stripe Tax calculation, then approves the full USD total with the selected provider. Server-side reservation and total checks prevent concurrent purchase of an original. Existing orders retain their original price, shipping, tax, address, and fulfillment snapshot even if the catalog changes. New pages send a catalog hash; mismatches reject new quote/create requests with a reload message. Payment returns and verified webhooks do not depend on the latest catalog hash.

A confirmed payment immediately marks the Durable Object sold. `/inventory/status` supplies live status to the website independently of whether checkout is enabled. Sales never rewrite GitHub HTML or wait for a deployment. The recovery alarm archives receipts, records tax, fulfills shipping, and notifies the seller. It retains retries when a provider is unavailable. Never clear a `capturing` lock before reconciling its provider payment.

## Production configuration

Keep credentials in Cloudflare secrets: PayPal client ID/secret, merchant ID and webhook ID; Shippo token and shipping origin; Stripe Tax secret; Gmail OAuth values; and BTCPay credentials when enabled. The production Worker no longer needs `GITHUB_TOKEN`. Sandbox continues to reject that credential as a configuration guard.

`PAYPAL_CHECKOUT_ENABLED` and `PAYPAL_CHECKOUT_SLUGS` control new PayPal purchases. Bitcoin uses its separate existing enable flag and slug allowlist. Pausing new purchases does not interrupt pending returns or webhook reconciliation. The existing production pilot is still only `painting-portrait-in-green`; this migration does not expand it or enable Bitcoin.

Shipping is explicit at each product's `checkout.shipping`: parcel dimensions in inches, weight in pounds, packaging, insurance request, verification state, and notes. Existing generic estimates remain marked `estimated`; do not enable additional originals before checking their packed dimensions and weight. The pilot retains the authorized 15 × 12 × 0.125-inch, 0.25-lb envelope and sale-value insurance.

## Legacy links and sandbox

The Warsaw Syrenka stock-limited hosted PayPal link is stored on its catalog record and generated to `/payments/paypal-links.json`. Its existing inventory-matching opt-in remains unchanged. Verified IPN payments always reach the private ledger; explicitly matched enabled links update durable stock idempotently. Conflicting active reservations require reconciliation. New originals should use shared checkout, not reusable hosted links.

`cloudflare/wrangler.sandbox.jsonc` names the isolated sandbox Worker and its separate objects. Never copy live provider keys into it. Local Worker and browser tests mock external effects; the CI production verification checks provider readiness without a payment, tax transaction, label purchase, or seller email.

See the root README for content editing, validation, preview, deployment, and rollback.
