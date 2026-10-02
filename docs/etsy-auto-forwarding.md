# Etsy to FinerWorks order forwarding

The Cloudflare Worker checks Etsy for recently modified, paid, unshipped receipts on its existing hourly cron. It forwards only line items whose Etsy SKU and listing ID match the completed print-draft batch saved by the Etsy setup flow.

Before a supplier order is submitted, the Worker verifies that the receipt is paid and not canceled or shipped, that the receipt contains recognized print variants, that Etsy returned a complete US delivery address, and that the FinerWorks quote does not exceed the Etsy item plus shipping proceeds. Address data is kept in memory while the order is prepared; the encrypted R2 record stores only the receipt reference, item SKUs, supplier PO, cost, and fulfillment status.

FinerWorks orders use a deterministic PO derived from the Etsy shop and receipt IDs. The Worker saves a submission intent before calling FinerWorks. If the response is uncertain, it checks that PO with FinerWorks and does not submit a second order automatically.

## Release controls

- `ETSY_AUTO_FULFILLMENT_ENABLED` defaults to `false` in `wrangler.jsonc`. The scheduled handler makes no Etsy or FinerWorks calls while it is false.
- Etsy FinerWorks mode is independent of the website checkout mode: `ETSY_FINERWORKS_MODE=sandbox` is the safe default. Set it to `live` only after sandbox validation.
- Reauthorize Etsy after deployment so the saved token includes `transactions_r` and `transactions_w`.
- Validate using a sandbox Worker and FinerWorks test mode first. Do not use the live payment token for this check.
- Enable the production variable only after the Etsy app can read receipt addresses and after the sandbox supplier submission succeeds. The first successful sync records an activation time; receipts modified before then are ignored.
- The status endpoint is `POST /etsy/fulfillment/status`, restricted to the Etsy setup origin and the commission manager token. It reports state without returning customer addresses.
- FinerWorks tracking is checked by the hourly job and sent to Etsy once when possible. Multiple packages, unsupported carriers, or Etsy tracking API restrictions are surfaced for manual follow-up.
- This direct FinerWorks route does not use Shippo. FinerWorks supplies the fulfillment shipment and tracking details.

Etsy restricts shipping-address visibility and its tracking-write endpoint for some API apps. Having the OAuth scopes alone does not guarantee access. If the Worker reports a missing address or an Etsy 403 for tracking, obtain the required Etsy app approval; the Worker will not bypass the restriction or send an order without the address.
