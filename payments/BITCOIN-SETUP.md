# Bitcoin checkout through BTCPay

The product checkout can offer **Buy with Bitcoin** alongside card checkout (Square). It uses the
existing US shipping quote, Washington DOR sales tax calculation, per-original reservation,
shipping-label workflow and private sales ledger. BTCPay converts the complete
USD total to BTC and presents on-chain and Lightning methods that are enabled in
the store. The invoice requires full payment and one on-chain confirmation
(`MediumSpeed`); Lightning can settle immediately.

## Finish configuration

1. Let the BTCPay Bitcoin node finish synchronizing. Confirm the store wallet's
   receive address matches the wallet you control. Configure Lightning separately
   if wanted; on-chain checkout does not require Lightning.
2. In BTCPay **Account → Manage Account → API keys**, create a key restricted to
   this store with only **View invoices** (`btcpay.store.canviewinvoices`) and
   **Create invoice** (`btcpay.store.cancreateinvoice`). The website does not need
   wallet-spending, refund, admin or manually-mark-paid permissions.
3. In Cloudflare, open **Workers & Pages → vermillion-commissions → Settings →
   Variables and Secrets**. Add these as **secrets**, without quotes or whitespace:
   - `BTCPAY_API_KEY`: the API key above.
   - `BTCPAY_STORE_ID`: the store ID from BTCPay store settings.
4. In BTCPay **Store Settings → Webhooks**, create an enabled webhook to:

   `https://vermillion-commissions.timothyjosephmurphy.workers.dev/checkout/bitcoin/webhook`

   Select all invoice events (or all events) and enable automatic redelivery.
   Copy the generated secret into Cloudflare as `BTCPAY_WEBHOOK_SECRET`.
5. The checked-in `BTCPAY_URL` is `https://pay.tjm.art`.
   Bitcoin is offered for every available original and print, including mixed
   carts (studio-tracker #120). There is no per-painting allowlist any more;
   `BTCPAY_CHECKOUT_SLUGS` is ignored by checkout.
6. Once the wallet and webhook are ready, add the text variable
   `BTCPAY_CHECKOUT_ENABLED=true` and deploy the settings. This switch is omitted
   from Wrangler's checked-in vars so `keep_vars` preserves a dashboard pause.
   To pause new Bitcoin orders, set it to `false`; existing invoices still
   reconcile. Do not remove the API/webhook credentials while invoices exist.
7. Open the Chase product page, calculate shipping and tax, and verify the
   Bitcoin invoice shows the same USD total. Before a paid test, confirm the
   existing label automation is ready: a settled invoice can purchase postage.

No API keys, webhook secrets, wallet private keys, or seed phrases belong in Git,
product-page scripts or screenshots shared for troubleshooting.

## Payment lifecycle and recovery

- `BitcoinOrder` stores an immutable quote and order ID before invoice creation.
  `PaintingStock` prevents another Bitcoin or card attempt buying that original.
- A 15-minute invoice expiration is distinct from a pending transaction. A paid
  invoice keeps the painting reserved while it confirms. An expired invoice is
  released only after BTCPay reports no payment and an empty payment list.
- HMAC-SHA256 authenticates webhook bodies. The Worker then fetches authoritative
  invoice/payment data and checks store, invoice, order, painting, USD currency
  and saved total. A browser redirect alone never marks a painting sold.
- Only a normally settled BTC invoice triggers the existing sold update, tax
  record, shipping label and seller email. Duplicate notifications reuse the
  same receipt and shipping job.
- Partial, late, overpaid, invalid or manually marked payments require review.
  A late invoice cannot fulfill against a reservation now owned by another buyer.
  The seller receives a review email; uncertain payments do not purchase labels.
- Durable alarms recover missing webhooks and interrupted requests. An uncertain
  invoice POST is searched by `metadata.orderId`; it is never blindly recreated.
  If no unique invoice can be found, the lock stays in place for review.
- Bitcoin order snapshots, including review cases, are private R2 objects at
  `bitcoin/live/<order-id>.json` in `vermillion-sales-records`. Completed receipts
  also appear in the existing monthly sales JSON/CSV with `provider=btcpay` and an
  invoice ID; the JSON preserves individual Bitcoin payment amounts and IDs.
- Before releasing a review reservation, check the invoice and transaction in
  BTCPay. Refunds and manual resolution are deliberately operator actions. There
  is no public endpoint for overriding payment or inventory state.

## Local verification

```sh
npm --prefix cloudflare/test ci
npm --prefix cloudflare/test test
node --test cloudflare/checkout-recovery.test.mjs cloudflare/checkout-readiness.test.mjs
node payments/build-checkout-catalog.mjs
node payments/bitcoin-checkout.browser-test.cjs
```

Browser tests require Playwright and Chromium. `CHROMIUM_EXECUTABLE` optionally
selects an installed browser. All payment/label network calls in these tests are
mocked; passing tests do not establish live BTCPay readiness.

References:
- https://docs.btcpayserver.org/Development/ecommerce-integration-guide/
- https://docs.btcpayserver.org/API/Greenfield/v1/
- https://developers.cloudflare.com/durable-objects/api/alarms/

## Lightning tips and zaps → QuickBooks

Settled BTCPay invoices that are not tjm.art checkout orders (no `va-btc-`/`va-cart-` order id) are recorded in QuickBooks
as business income: one Sales Receipt per invoice (DocNumber `TIP-…`), customer `Nostr/Lightning tips`, item
`Lightning tips & zaps` → income account `Tips & Zaps Income` (created on the first tip unless `QBO_TIPS_ACCOUNT` names an
existing account), deposited to `Bitcoin clearing`. The memo carries sats, USD value, BTC/USD rate and its source, the BTCPay
invoice id, and the work (invoice `metadata.workTitle` or `itemDesc`) when present.

Detection: the existing signed webhook `/checkout/bitcoin/webhook` (`InvoiceSettled`, `BTCPAY_WEBHOOK_SECRET`), plus an hourly
poll of the last two days of settled invoices and an owner backfill (`POST /quickbooks/tips/backfill {days, dryRun}`; dry run
by default). All paths are keyed by `tip:<invoice id>`, so a tip is recorded once.

Setup: set the Worker var `QBO_TIP_SYNC_ENABLED` to `true`. Until then nothing is queued or polled. The BTCPay store webhook
must send "An invoice has been settled" (or all events), and the `BTCPAY_API_KEY` needs "View invoices" (already required by
checkout); "View your stores" lets the store's own BTC/USD rate be used for sats-priced zaps (otherwise Coinbase's daily spot).
