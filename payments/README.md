# Archived hosted-link setup notes

This historical workflow was superseded by the shared checkout and catalog migration. For current behavior and file paths, read [CUSTOM-CHECKOUT.md](CUSTOM-CHECKOUT.md) and the root README. Do not follow the old GitHub inventory-publication setup below.

## PayPal (removed)

PayPal checkout, hosted PayPal links, the PayPal IPN listener and the PayPal sandbox pages were removed from the site and Workers in October 2026 (studio-tracker #133). Checkout takes cards through Square and Bitcoin through BTCPay; see [SQUARE-CHECKOUT.md](SQUARE-CHECKOUT.md) and [BITCOIN-SETUP.md](BITCOIN-SETUP.md). Historical PayPal sales stay in the sales ledger and CSV exports, including their PayPal fee columns.

## Sales bookkeeping

Automatic private sales records and monthly CSV exports are documented in [SALES-RECORDS.md](./SALES-RECORDS.md). Open Cloudflare R2 → `vermillion-sales-records` → `sales/live/YYYY-MM/sales.csv`.
