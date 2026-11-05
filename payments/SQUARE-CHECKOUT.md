# Square checkout

Square provides the public credit-card checkout option. The sandbox Worker has a tested one-item pilot. Production shows “Pay with credit card” for eligible originals and print editions, plus Bitcoin where available. Square is offered only when its credentials, webhook settings, environment, and product eligibility are configured.

## Sandbox Worker variables

Set these as regular Cloudflare Worker variables:

- `SQUARE_MODE=sandbox` (must match `CHECKOUT_MODE`).
- `SQUARE_CHECKOUT_ENABLED=false` until sandbox testing is ready.
- `SQUARE_CHECKOUT_SLUGS=painting-portrait-in-green` for the pilot allowlist.
- `SQUARE_APPLICATION_ID` from the Square sandbox application. This is an application identifier, not a secret.
- `SQUARE_LOCATION_ID` from the sandbox account.
- `SQUARE_WEBHOOK_URL=https://vermillion-checkout-sandbox.timothyjosephmurphy.workers.dev/checkout/square/webhook`.

Set these as Cloudflare secrets:

- `SQUARE_ACCESS_TOKEN` from the Square sandbox credentials.
- `SQUARE_WEBHOOK_SIGNATURE_KEY`, generated for the Square sandbox webhook subscription. It is separate from the application ID and access token.

In Square Developer Console, add a Sandbox webhook subscription for `payment.updated` using the exact URL above. Copy its signature key into the Cloudflare secret. The Worker verifies the HMAC signature, retrieves the payment from Square, and checks payment status, order reference, location, currency, and amount before settling inventory.

After adding the webhook secret, set `SQUARE_CHECKOUT_ENABLED=true` in the sandbox Worker to expose Square for the allowlisted pilot item. The sandbox Worker also exposes `/checkout/square-test`, a small same-origin test form that uses Square's sandbox Web Payments SDK without cloning the storefront. It is hidden unless sandbox mode, Square checkout, and `SQUARE_SANDBOX_NO_FULFILLMENT=true` are all active. A successful test marks the painting sold in sandbox inventory only; it does not record tax, purchase a label, submit print fulfillment, or send order email. The quote does send its sample shipping address to the configured shipping and tax quote providers. Test approved and declined card flows and verify the webhook before considering production.

## Production

The production Worker is **vermillion-commissions**. In Square Developer Console, select the same application and switch to **Production**. Configure the following in Cloudflare → Workers & Pages → vermillion-commissions → Settings → Variables and Secrets:

| Name | Cloudflare type | Value |
| --- | --- | --- |
| `SQUARE_ACCESS_TOKEN` | Secret | Production access token |
| `SQUARE_WEBHOOK_SIGNATURE_KEY` | Secret | Signature key for the production webhook subscription |
| `SQUARE_APPLICATION_ID` | Text | Production application ID |
| `SQUARE_LOCATION_ID` | Text | Production location ID |

Create an enabled Production webhook subscription for `payment.updated` at the exact notification URL `https://vermillion-commissions.timothyjosephmurphy.workers.dev/checkout/square/webhook`. Its signature key is separate from the application ID and Sandbox subscription.

The checked-in production configuration sets `SQUARE_MODE=live`, `SQUARE_CHECKOUT_ENABLED=true`, `SQUARE_CHECKOUT_ALL=true`, and `SQUARE_WEBHOOK_URL` to that production URL. The all-catalog setting admits only known, eligible products; print fulfillment and availability restrictions still apply. Sandbox keeps its pilot allowlist.

The production deployment checks Square authentication, an active USD location enabled for credit card processing, and the matching enabled webhook subscription without taking payment. Missing credentials keep the Square option hidden and are reported by verification. Successful live Square payments use the existing reservation, tax recording, fulfillment, sales records, and customer email flow. The sandbox no-fulfillment guard cannot apply in live mode.

Washington sales tax is calculated from the Washington Department of Revenue rate lookup (see `cloudflare/wa-sales-tax.mjs`); other US destinations are not taxed. The public cart does not offer a new PayPal checkout. Saved PayPal order recovery, return handling, and webhooks remain supported. Sandbox cards cannot be used in production; any deliberate live payment uses a real card and has normal fulfillment effects.

## Apple Pay and Google Pay

The cart offers Apple Pay and Google Pay only after a server shipping-and-tax quote, and only when Square's Web Payments SDK accepts that wallet. When Apple Pay is accepted, its button is first, above Google Pay. The card form stays available.

Apple Pay on the web has two real paths. Both use Apple's code. The cart does not draw its own QR code.

- **Safari on iPhone, iPad, or Mac.** The button opens the Apple Pay sheet on that device.
- **Desktop Chrome, Firefox, and Edge.** Apple's Pay JS SDK (`applepay.cdn-apple.com/jsapi/1.latest/apple-pay-sdk.js`, version 1.2.0 or later) installs `ApplePaySession` in those browsers. The cart loads that script before `payments.applePay()`. A click calls `tokenize()`, and Apple opens its own "Scan Code with iPhone" sheet (a circular Apple Pay code, not a merchant QR). The buyer scans it with the iPhone camera. iOS 18 or iPadOS 18 or later is required on the phone. Checked live on `tjm.art` from desktop Chrome on 2026-11-05: Square returned an Apple Pay instance, and `tokenize()` opened Apple's scan sheet for `https://tjm.art`.

Square's published Web Payments page still says Apple Pay is Safari-only. Their SDK accepts the session once Apple's script is on the page. On 27 October 2026 a Square developer confirmed that load order on the Square developer forum and said the flow is technically unsupported until Square's docs change: [Apple Pay in Chrome and other non-Safari browsers](https://developer.squareup.com/forums/t/apple-pay-in-chrome-and-other-non-safari-browsers-with-the-web-payments-sdk-apple-pay-js-sdk/28342).

Apple's SDK reports `canMakePayments()` false when `navigator.userAgentData.mobile` is true, so a phone browser does not get the scan sheet. On an iPhone, use Safari for the on-device sheet.

`tjm.art` serves Square's domain association file at `/.well-known/apple-developer-merchantid-domain-association`. The site worker prefers Square's current copy and falls back to `worker/apple-pay-domain-association.mjs`. `vermillionaurora.com` redirects to `tjm.art`; Apple does not follow that redirect, so the domain registered with Square is `tjm.art`.

To check: in desktop Chrome or Firefox, open `https://tjm.art/cart/`, add an available piece, calculate shipping and tax, and choose Apple Pay. Apple's scan sheet should appear. On an iPhone, use Safari for the same checkout; the black Apple Pay button should be first, and the Wallet needs a card. If Safari has no button, allow Apple Pay under Settings → Safari → Privacy.

## Local verification

The focused Square tests are in `cloudflare/test/square-checkout.test.mjs`. The full Worker and browser suites run in the repository release gate.
