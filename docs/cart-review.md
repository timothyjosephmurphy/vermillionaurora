# Originals shopping cart — review before deployment

This branch implements a guest cart for original paintings. It has not been deployed. Prints are the next feature, after this review.

## Customer behavior

- Add to cart / Buy now on eligible original product pages. Each original has quantity one; a cart can contain up to 12 originals.
- Persistent selections in the same browser, a cart count throughout the site, and responsive `/cart/` checkout.
- Buy now checks out the selected original while preserving other cart selections.
- One US delivery address and contact email, separately priced parcels, one tax calculation, and one payment with PayPal or Bitcoin/Lightning when enabled for every selected item.
- One order confirmation with all purchased items, plus a printable confirmation page. Successful payment removes only the purchased items from the cart.
- Inquiry-only works, commissions and Amazon books keep their existing flows.

## Review images

These are local browser captures using test customer details and mocked payment, shipping and tax responses. They show the selected Chase Toole and Dorian Nakamoto pilots at $20 each. Shipping and tax totals are illustrative, not live quotes.

[Desktop cart](cart-preview/cart-desktop.png) · [Mobile cart](cart-preview/cart-mobile.png) · [Confirmation](cart-preview/confirmation-mobile.png)

## Implementation

`catalog/products.json` remains the editing source. Existing product URLs and per-original inventory IDs remain stable. A new SQLite Durable Object, `CartOrder`, stores an immutable quote, provider references, recovery state, and individual shipping jobs. The cart uses the existing `PaintingStock` objects, so legacy PayPal, Bitcoin and cart purchases compete for the same originals.

Prices and payment eligibility come from the server. The browser stores only product IDs/quantities and an opaque order ID/access key; it does not persist addresses or card data. Private order status requires a 256-bit key, stored hashed on the server. Changing the address or cart invalidates the displayed quote.

Adding to the cart does not reserve stock. Starting payment acquires every original in a consistent order. If one is unavailable, all earlier holds are released. A durable alarm cleans up interrupted acquisition. Once provider creation is attempted, locks remain owned by the order until the provider outcome is known. Uncertain captures, confirming Bitcoin transactions, partial payments, and late payments cannot silently release or resell an original.

PayPal creation uses a stable request ID for recovery. Bitcoin invoice creation is never blindly repeated: recovery searches by our order ID. Existing signed webhook endpoints route cart events to the coordinator. Legacy payment returns and webhooks continue to work after the new flow is enabled.

The coordinator creates one sales record and one tax transaction per payment. Each parcel has a separately persisted label job, so retries cannot purchase all labels again. Accounting JSON includes item and shipment arrays; the existing CSV keeps one financial row per order. Historic single-item receipts are preserved.

Gmail does not provide a send idempotency key. An uncertain confirmation-send outcome is flagged for review rather than resent automatically. The buyer can still print the confirmed order. Review records are saved privately under `orders/<mode>/<order-id>-review.json`; paid receipts and shipment information use `orders/<mode>/<order-id>.json`.

## Decisions before launch

1. The owner selected **Dorian Nakamoto** (`painting-portrait-in-gold`) on September 29 as the second pilot and set its price to **$20**. This branch includes both it and the $20 Chase Toole portrait in the PayPal and Bitcoin allowlists. Dorian’s parcel remains the existing estimated 12 × 4 × 4-inch, 2-lb tube; confirm its packing before deployment. No shipping measurements were changed or marked verified.
2. Confirm separate-parcel shipping for the first release. Combined packaging is a later improvement.
3. Approve deployment of the API binding/migration and website together. No production or sandbox deployments, real charges, label purchases, or emails were made while developing this branch.
4. Run a provider sandbox acceptance checkout before launching the two-item pilot. Automated tests mock external payment, shipping, tax, and email services.

The branch sets `CART_CHECKOUT_ENABLED=true` for its proposed production configuration. Setting it to `false` pauses new cart quotes; existing orders can still settle. Provider allowlists restrict the proposed release to these two portraits. Do not remove the new Durable Object binding or roll back its schema while any cart payment is unresolved. Refunds and exceptions requiring human judgment remain manual.

## Checks

- Astro production build and generated checkout-catalog consistency.
- Existing catalog, PayPal, inventory, shipping, insurance, Bitcoin and sales-record tests.
- Cart tests: competing buyers, all-or-nothing reservation acquisition, interrupted acquisition, provider timeouts, repeated attempts, incorrect totals/merchant/address/items, signed webhook routing, unpaid expiry, late/partial Bitcoin payments, order-key authorization, one tax/sale/receipt and multiple parcel labels.
- Browser checks: desktop/mobile layout, navigation persistence, quantity-one enforcement, input changes invalidating quotes, reload during payment, confirmation, unavailable items, corrupted browser data, and Buy now preserving the rest of the cart.
- Worker bundle dry run; no deployment.

## Prints next

Order records already contain typed item arrays and separate fulfillment jobs. The next phase adds print variants and quantities, print-provider quotes, and provider fulfillment jobs alongside original-art parcels. No print orders are created by this branch.
