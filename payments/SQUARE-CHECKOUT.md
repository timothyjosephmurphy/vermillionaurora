# Square checkout

Square is an optional card processor alongside PayPal. The sandbox Worker is configured for a one-item pilot; Square stays disabled until its sandbox credentials and webhook are configured. Production Square remains disabled.

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

Production has separate credentials and webhook signature key. Keep `SQUARE_CHECKOUT_ENABLED=false` until sandbox testing is complete and production credentials are deliberately configured. Stripe Tax continues to calculate checkout tax; this integration does not change tax or shipping calculation.

## Local verification

The focused Square tests are in `cloudflare/test/square-checkout.test.mjs`. The full Worker and browser suites run in the repository release gate.
