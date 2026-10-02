# Square checkout

Square is an optional card processor alongside PayPal. The sandbox Worker has a tested one-item pilot. Production offers a separate “Pay with Square using credit card” button alongside PayPal for eligible originals and print editions. Square is offered only when its credentials, webhook settings, environment, and product eligibility are configured.

## Sandbox Worker variables

Set these as regular Cloudflare Worker variables:

- `SQUARE_MODE=sandbox` (must match `PAYPAL_MODE`).
- `SQUARE_CHECKOUT_ENABLED=false` until sandbox testing is ready.
- `SQUARE_CHECKOUT_SLUGS=painting-portrait-in-green` for the pilot allowlist.
- `SQUARE_APPLICATION_ID` from the Square sandbox application. This is an application identifier, not a secret.
- `SQUARE_LOCATION_ID` from the sandbox account.
- `SQUARE_WEBHOOK_URL=https://vermillion-checkout-sandbox.timothyjosephmurphy.workers.dev/checkout/square/webhook`.

Set these as Cloudflare secrets:

- `SQUARE_ACCESS_TOKEN` from the Square sandbox credentials.
- `SQUARE_WEBHOOK_SIGNATURE_KEY`, generated for the Square sandbox webhook subscription. It is separate from the application ID and access token.

In Square Developer Console, add a Sandbox webhook subscription for `payment.updated` using the exact URL above. Copy its signature key into the Cloudflare secret. The Worker verifies the HMAC signature, retrieves the payment from Square, and checks payment status, order reference, location, currency, and amount before settling inventory.

After adding the webhook secret, set `SQUARE_CHECKOUT_ENABLED=true` in the sandbox Worker to expose Square for the allowlisted pilot item. PayPal remains available as a separate checkout button. The sandbox Worker also exposes `/checkout/square-test`, a small same-origin test form that uses Square's sandbox Web Payments SDK without cloning the storefront. It is hidden unless sandbox mode, Square checkout, and `SQUARE_SANDBOX_NO_FULFILLMENT=true` are all active. A successful test marks the painting sold in sandbox inventory only; it does not record tax, purchase a label, submit print fulfillment, or send order email. The quote does send its sample shipping address to the configured shipping and tax quote providers. Test approved and declined card flows and verify the webhook before considering production.

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

Stripe Tax continues to calculate checkout tax. PayPal remains a separate payment option. Sandbox cards cannot be used in production; any deliberate live payment uses a real card and has normal fulfillment effects.

## Local verification

The focused Square tests are in `cloudflare/test/square-checkout.test.mjs`. The full Worker and browser suites run in the repository release gate.
