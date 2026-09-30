# Original artwork framing requests

This release offers Framebridge mail-in framing alongside an eligible original
purchase. It is a request for a final quote, not a charge for framing and not an
automatic supplier order. Production deployment has not been performed.

## Customer flow

1. On an eligible original's product page or in the cart, select **Request
   professional framing**. Unframed delivery remains the default.
2. Choose a frame preference: black, white, natural wood, or help me choose.
   Standard white mat and UV-protective acrylic are described as the baseline.
3. See a size-based Framebridge estimate, explicitly excluding tax and upgrades.
   The estimate includes its published $10 mail-in fee and $25 outgoing delivery
   for XL/Grand. It does not enter the artwork price, tax calculation, or payment.
4. Pay for the artwork and its normal shipping/tax. Shipping paid for a requested
   original is recorded as a credit toward its eventual delivery cost, not an
   extra delivery charge on top of the final framing quote.
5. The confirmation and receipt explain that TJ will confirm the frame, artwork
   suitability, final price, and timing by email. The original is held until the
   buyer approves framing or chooses unframed delivery. Other items proceed.

Selecting this option before adding to cart, changing it in the cart, reloading,
and Buy now all preserve the choice. Editing it invalidates the payment quote.
Stale or unsupported framing preferences block checkout until reviewed/removed.

## Eligibility and prices

`catalog/original-framing.mjs` owns eligibility, retail estimates, preference
values, source URLs, and the terms version. Only available, unframed originals
on paper with known measurements fitting the mail-in limits qualify. The
existing payment allowlists still decide whether online purchase is available.
Existing framed pieces, prints, inquiry-only work, and oversized/unknown-size
pieces do not get this offer.

Physical-art retail tiers checked September 30, 2026:

| Art size up to, inches | Frame | Mail-in | Delivery | Estimate |
| --- | ---: | ---: | ---: | ---: |
| 5 × 7 | $85 | $10 | $0 | $95 |
| 9 × 12 | $115 | $10 | $0 | $125 |
| 12 × 18 | $150 | $10 | $0 | $160 |
| 18 × 24 | $200 | $10 | $0 | $210 |
| 24 × 34 | $265 | $10 | $25 | $300 |
| 32 × 40 | $365 | $10 | $25 | $400 |

Sources: [pricing](https://www.framebridge.com/pages/pricing),
[mail-in](https://www.framebridge.com/pages/mail-in-service),
[artist program](https://www.framebridge.com/pages/artists-program).
These are published retail estimates, not supplier quotes. Do not assume an
artist discount, tax treatment, extra insurance, or specialty finish is included.
Preferences do not promise a particular supplier SKU. Confirm the exact frame,
mat, medium/mounting requirements, insurance, destination, tax, and shipping
with Framebridge before giving the customer a binding quote.

Update the terms version when estimates or terms change, then run the build and
commit the generated checkout catalog. This also versions new cart quotes.
Already-paid orders keep the accepted estimate and choices in their snapshots.

## Seller fulfillment

After verified payment, the seller receives **Framing requested — hold original**
with buyer contact/delivery details, selected preference, estimate, and the
shipping credit per requested original. The message provides the follow-up steps.

1. Agree the exact frame and mat with the buyer and get a current Framebridge
   quote, including coverage appropriate to the original and final delivery.
2. Give the buyer the final amount due after applying the saved shipping credit.
   Collect their approval and arrange the additional payment separately. Handle
   any difference or refund explicitly; this release does not charge it.
3. Place the supplier order manually, set delivery to the buyer, and mail the
   original according to Framebridge's packaging instructions.
4. Send the buyer the order confirmation and tracking. If framing is declined,
   confirm unframed delivery and arrange the label manually using the shipping
   payment already collected. Do not reuse an expired saved rate.

There is no public Framebridge ordering API verified for this implementation,
no account signup performed, no automatic charge for framing, and no automatic
supplier submission. The website records the request and purchase; final quote,
separate payment, supplier order, delivery updates, and decline handling remain
seller tasks. The receipt describes the request, not a supplier production status.

## Persistence and fulfillment behavior

- The browser sends only a style preference and terms version. The server
  calculates eligibility/estimate and ignores client-supplied costs or status.
- The saved item and shipment retain the request. The shipment also saves the
  delivery credit. Public order responses contain these descriptions, never the
  supplier credentials or shipping-label IDs.
- Only the affected shipping job becomes `framing-requested`. Fulfillment never
  purchases its saved direct-to-buyer Shippo label, including on alarm retries.
  Unframed originals and print jobs follow their existing fulfillment paths.
- The paid order is archived in R2 and the sales ledger with the framing request,
  held shipment status, and seller-notification status. No inventory IDs or paid
  amounts change. Payment settlement still marks each original sold once.
- Notifications use the existing durable Gmail send handling. An uncertain send
  is marked for review rather than sent twice. Inspect the private order archive
  if a required notification is missing.

## Verification

`npm run build`, `npm test`, `npm run test:worker`,
`node tests/cart.browser-test.mjs`, and
`node tests/print-framing.browser-test.mjs`.

Tests cover size tiers, rotated/cm dimensions, eligibility, forged prices,
invalid/stale requests, no framing charge, shipping credit, mixed original
fulfillment, duplicate payment/recovery behavior, seller/buyer notices, receipt
and archive persistence, mobile layout, Buy now, and existing print framing.
All provider calls in these checks are mocked. No payment, supplier order,
label purchase, or email is sent during local verification.
