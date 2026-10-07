# At-cost print codes

Codes are typed into the **Code** field on /cart/ before "Calculate shipping & tax".

## Collector codes (single use)
For a collector after a testimonial. Prints only (not originals or deposits), priced at the print lab's
production cost per copy plus shipping, with no markup. Each code works for one paid order.

```sh
COMMISSION_MANAGER_TOKEN='<the existing manager token>' node scripts/issue-print-code.mjs --name "Jane Doe" --email "jane@example.com" --note "Testimonial Oct 2026"
```
Omit the env var to be prompted instead. Add `--sandbox` to issue on the sandbox worker. The code prints once;
only its hash is stored (CartOrder Durable Object `print-code:<hash>`, plus `print-codes/<mode>/<hash>.json` in the sales archive
with the name, email and note).

Lifecycle: checked at quote, claimed when payment starts, released if that checkout is cancelled, expires, or the card is
declined, redeemed when payment completes. A claimed code cannot be used in a second checkout at the same time.

## Owner code (TJ, unlimited)
Stored only as a SHA-256 hash in `cloudflare/print-codes.mjs`. Prints at production cost; originals at $0 plus shipping
(you still pay shipping and any sales tax on it). Normal fulfillment runs: the painting is marked sold and a shipping label is
created. Not valid on commission deposits. To rotate it, replace `OWNER_CODE_HASH` with
`sha256("va-print-code:" + CODE uppercased with non-alphanumerics removed)`.

Print-lab orders are still placed and checked at the listed retail price, so the provider price guard is unchanged; the
receipt records `printCode.kind` and the list total.

## PayPal
PayPal is hidden by `PAYPAL_DEPRECATED: "true"` in both Worker configs (the sandbox keeps `PAYPAL_CHECKOUT_ENABLED: "true"` because its
deploy workflow requires it). Remove `PAYPAL_DEPRECATED` (and set production `PAYPAL_CHECKOUT_ENABLED` back to `"true"`) to restore PayPal.
