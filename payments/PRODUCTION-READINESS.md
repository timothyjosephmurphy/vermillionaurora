# Checkout release preparation — September 29, 2026

Branch: `shared-paypal-checkout`, pull request #3.

## Verified

- Merged the current `main` into the checkout branch and resolved the sandbox workflow conflict.
- Eight automated checks pass. They include inventory/page transformations for all 57 checkout paintings, concurrent reservation rejection, capture, invalid webhook signatures, wrong merchant/amount, replay, and settling an existing order while new checkout is paused.
- The catalog rebuild matches all 57 product titles, prices, availability, and recorded dimensions.
- A real sandbox buyer completed the Honeybadger purchase. Its isolated stock is sold.
- PayPal's actual capture event was resent through the registered sandbox webhook. The Worker verified it and recorded receipt. The Stripe test tax transaction is recorded.
- Cloudflare's production settings contain `PAYPAL_CLIENT_ID`, `PAYPAL_CLIENT_SECRET`, `PAYPAL_MERCHANT_ID`, `PAYPAL_WEBHOOK_ID`, `GITHUB_TOKEN`, `SHIPPO_TOKEN`, `STRIPE_SECRET_KEY`, and `SHIP_FROM_STREET`. Secret values were not retrieved. Presence alone does not validate the live credentials.
- The live webhook was previously configured by the owner; it must be checked against the live app again during deployment verification.

Evidence: https://github.com/timothyjosephmurphy/vermillionaurora/actions/runs/36537716207

## Deployment sequence

1. Merge the reviewed PR into `main` and deploy `cloudflare/wrangler.jsonc` to `vermillion-commissions`. The checked-in configuration sets `PAYPAL_MODE=live` and `PAYPAL_CHECKOUT_ENABLED=false` and creates the `PAINTING_STOCK` binding. The September 29 preflight found no deployed checkout mode flag or inventory binding yet; the new deployment supplies them.
2. Confirm the live provider credentials and webhook registration. Live webhook URL: `https://vermillion-commissions.timothyjosephmurphy.workers.dev/checkout/webhook`; event: `PAYMENT.CAPTURE.COMPLETED`.
3. Confirm actual packed dimensions and weight and decide insurance before accepting live orders. Current quotes estimate 2 lb per package, with a 4-inch tube for works whose longer side exceeds 12 inches and flat packages for smaller works. Tube length currently equals the rounded-up shorter painting dimension; allow for end caps and padding when measuring the real package. No insurance is explicitly purchased by this checkout.
4. Set `PAYPAL_CHECKOUT_SLUGS` to one chosen product slug for a controlled live purchase, then set `PAYPAL_CHECKOUT_ENABLED=true`. The optional comma-separated slug list restricts new checkout to selected paintings; blank or absent allows the whole catalog. These runtime values should be set in the release configuration before deployment because Wrangler explicitly manages the enable flag.
5. Verify the paid order, immediate sold state, GitHub inventory/page commit, public site update, webhook, and Stripe Tax record. This live inventory write was deliberately not performed by the sandbox test.
6. Clear `PAYPAL_CHECKOUT_SLUGS` after the controlled purchase succeeds and shipping is ready for all paintings.

To pause new purchases, set `PAYPAL_CHECKOUT_ENABLED=false`. Existing capture/cancel requests and signed webhooks continue to work while credentials remain configured. Preserve the Durable Object namespace and its state. Do not clear a capturing or sold record as a rollback step.

## Sandbox verification

The deployment workflow installs a temporary diagnostic credential on the sandbox Worker, requests the actual capture-event replay, confirms verified receipt and the Stripe test tax record, and removes the credential. The diagnostic route exists only in the isolated sandbox entry point and is inaccessible without the temporary credential. Responses contain state flags, not buyer details or provider secrets.

Production checkout does not buy a shipping label or email one. That separate fulfillment integration must be coordinated before it is added to this checkout branch.
