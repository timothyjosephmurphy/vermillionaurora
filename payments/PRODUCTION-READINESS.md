# Checkout release preparation — September 29, 2026

Pull request #3 is merged. Production checkout is deployed with purchases disabled.

## Current release status — September 29, 2026

- Production verification run 36539118165, attempt 3, passed the live PayPal authentication/webhook/merchant, Stripe Tax settings, Shippo carrier, GitHub repository access, inventory binding, and shipping-origin checks. Checkout reported `mode=live`, `enabled=false`, `ready=true`. The new restricted Stripe live key's write permissions have not yet been exercised.
- Stripe returned no active tax registrations. The owner submitted the Washington business license application and is awaiting processing. Keep real purchases disabled while the required licensing and tax setup are pending.
- Live verification evidence: https://github.com/timothyjosephmurphy/vermillionaurora/actions/runs/36539118165

## Selected first-purchase painting and shipping requirements

The owner selected **Chase Toole** (`painting-portrait-in-green`) for the next controlled purchase, with these instructions on September 29:

- Ship flat in an envelope.
- Envelope exterior dimensions confirmed by the owner: 12 × 15 inches.
- Contents: one sheet of watercolor paper and an envelope. At the owner's explicit request, use an estimated packed weight of **4 oz (0.25 lb)** and thickness of **1/8 inch (0.125 in)**. These are estimates, not measurements. Further measurements are not a blocker for preparing the test.
- Shipping insurance is requested. The intended test sale price is $20, as previously specified by the owner. Set insured value to the actual sale value when preparing the label; no insurance has been purchased or implemented by this note.

Current `main` inventory and the product page both mark this painting **Sold** after the earlier payment. The inventory price field is 0 and the painting is absent from the shared checkout catalog. Before another live purchase, deliberately restore the intended $20 price and available inventory, verify stock/payment state, route the product through shared checkout rather than its legacy hosted link, and rebuild the catalog. Preserve the existing completed-payment history; do not reset it as a side effect of recording shipping preferences.

The parcel override is saved in `payments/shipping-overrides.json`. The catalog builder uses its flat 15 × 12 × 0.125-inch, 0.25-lb parcel when this painting becomes eligible for shared checkout. It overrides the generic 2-lb/tube estimate. `insuranceRequested` records the requirement for the separate label integration; it does not buy coverage or add an insurance charge. Still needed for this painting: restore test availability and finish insurance support in that integration.

## Pre-deployment verification (historical)

- Merged the current `main` into the checkout branch and resolved the sandbox workflow conflict.
- Eight automated checks pass. They include inventory/page transformations for all 57 checkout paintings, concurrent reservation rejection, capture, invalid webhook signatures, wrong merchant/amount, replay, and settling an existing order while new checkout is paused.
- The catalog rebuild matches all 57 product titles, prices, availability, and recorded dimensions.
- A real sandbox buyer completed the Honeybadger purchase. Its isolated stock is sold.
- PayPal's actual capture event was resent through the registered sandbox webhook. The Worker verified it and recorded receipt. The Stripe test tax transaction is recorded.
- Cloudflare's production settings contain `PAYPAL_CLIENT_ID`, `PAYPAL_CLIENT_SECRET`, `PAYPAL_MERCHANT_ID`, `PAYPAL_WEBHOOK_ID`, `GITHUB_TOKEN`, `SHIPPO_TOKEN`, `STRIPE_SECRET_KEY`, and `SHIP_FROM_STREET`. Secret values were not retrieved. Presence alone does not validate the live credentials.
- The live webhook was previously configured by the owner; it must be checked against the live app again during deployment verification.

Evidence: https://github.com/timothyjosephmurphy/vermillionaurora/actions/runs/36537716207

## Deployment sequence and remaining launch work

1. **Complete:** PR #3 is merged and deployed to `vermillion-commissions` with `PAYPAL_MODE=live`, `PAYPAL_CHECKOUT_ENABLED=false`, and the `PAINTING_STOCK` binding.
2. **Connection verification complete:** live provider credentials and webhook registration passed the diagnostic. Tax-calculation and transaction-write access remain to be exercised. Live webhook URL: `https://vermillion-commissions.timothyjosephmurphy.workers.dev/checkout/webhook`; event: `PAYMENT.CAPTURE.COMPLETED`.
3. Finish shipping and insurance setup before accepting live orders. Chase Toole has owner-confirmed envelope dimensions and owner-authorized weight/thickness estimates in the override above. Other current quotes estimate 2 lb per package, with a 4-inch tube for works whose longer side exceeds 12 inches and flat packages for smaller works. Tube length currently equals the rounded-up shorter painting dimension; allow for end caps and padding when measuring the real package. No insurance is explicitly purchased by this checkout.
4. Set `PAYPAL_CHECKOUT_SLUGS` to one chosen product slug for a controlled live purchase, then set `PAYPAL_CHECKOUT_ENABLED=true`. The optional comma-separated slug list restricts new checkout to selected paintings; blank or absent allows the whole catalog. These runtime values should be set in the release configuration before deployment because Wrangler explicitly manages the enable flag.
5. Verify the paid order, immediate sold state, GitHub inventory/page commit, public site update, webhook, and Stripe Tax record. This live inventory write was deliberately not performed by the sandbox test.
6. Clear `PAYPAL_CHECKOUT_SLUGS` after the controlled purchase succeeds and shipping is ready for all paintings.

To pause new purchases, set `PAYPAL_CHECKOUT_ENABLED=false`. Existing capture/cancel requests and signed webhooks continue to work while credentials remain configured. Preserve the Durable Object namespace and its state. Do not clear a capturing or sold record as a rollback step.

## Sandbox verification

The deployment workflow installs a temporary diagnostic credential on the sandbox Worker, confirms the recorded webhook receipt and Stripe test tax record, and removes the credential. Requesting a fresh PayPal capture-event replay is an optional workflow action; the prior successful replay is already recorded. The diagnostic route exists only in the isolated sandbox entry point and is inaccessible without the temporary credential. Responses contain state flags, not buyer details or provider secrets.

Production checkout does not buy a shipping label or email one. That separate fulfillment integration must be coordinated before it is added to this checkout branch.
