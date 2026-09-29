# Sales records

Every completed payment through shared PayPal checkout is saved with the sold state in the painting's private SQLite Durable Object before the server confirms success. An independent retrying job copies it into a monthly ledger and a dedicated private R2 bucket, `vermillion-sales-records`. Verified legacy PayPal IPN payments are recorded before the notification is acknowledged, including payments that do not match an automatic inventory link. Verified IPN refunds and reversals are retained as separate adjustments.

## Open the records

In Cloudflare, select this account → R2 Object Storage → **vermillion-sales-records** → **sales/live/YYYY-MM/**.

- **sales.csv**: current monthly bookkeeping export, readable in Excel, Numbers, or Google Sheets.
- **sales.json**: complete receipt data, shipping address, fulfillment details, and change history.
- **history/revision-N.json**: retained snapshots of previous revisions.

The month is based on the provider's payment timestamp in UTC. New records and fulfillment updates normally appear within a minute. Public r2.dev access and custom domains must remain disabled; the deployment checks this. No customer data is written into GitHub, workflow logs, the public website, or public media storage. Access is through the Cloudflare account. No extra password or token needs to be managed by the owner.

## Recorded fields

Payment date, artwork title and slug, currency, artwork price, shipping charged, tax collected, gross payment, PayPal fees and net receipt with their currencies, order/capture IDs, buyer name and email when provided, and shipping address. Fulfillment fields include label status, Shippo transaction, tracking, requested insurance and confirmation, seller-email status, and inventory/tax recording flags.

Amounts are the actual saved checkout/provider values. Missing legacy fields remain blank, not invented as zero. PayPal net receipt is not business profit: postage, materials, refunds, and other expenses still need reconciliation. A generated label does not establish carrier pickup or delivery.

The ledger rejects conflicting totals for the same transaction. Repeated notifications do not create extra sales. A shipping/email outage does not lose the sale. An R2 outage leaves the SQLite ledger intact and schedules another export. Test payments remain in the sandbox's separate Durable Object namespace and never enter the live bucket.

## Existing sales and scope

Each production deployment checks already-sold shared-checkout objects and backfills missing receipts using read-only PayPal order lookups. This includes the completed Chase Toole live checkout. It does not charge, refund, purchase another label, or reset inventory. Sold checkout profiles remain in the generated catalog for settlement and accounting, but cannot be purchased again.

Earlier legacy transactions that occurred before this ledger was deployed cannot be reconstructed from a Sold flag alone. Use PayPal Activity/export or resend the original verified IPN to import those receipts. Offline cash/check sales, payments made outside these connected flows, and refunds not delivered through IPN are not automatically discovered. Reconcile the ledger against PayPal Activity; do not treat it as a complete historical tax return or general ledger.

## Maintenance and recovery

`POST /checkout/sales-maintenance` requires the deployment's temporary `CHECKOUT_AUDIT_TOKEN`. It returns only archive counts/status/paths, never buyer details. The deployment creates and removes this credential in a finally block. There is no public accounting-download endpoint.

Canonical records are in `PaintingStock.sale_receipt` and the monthly `SalesLedger` SQLite tables (`sales`, `versions`, `archive`). Ledger names are `live:YYYY-MM` and `sandbox:YYYY-MM`. Do not delete/reset stock or receipts to retry an export. Keep the private R2 bucket and Durable Object namespaces when redeploying. The deployment rechecks privacy before enabling the archive binding.
