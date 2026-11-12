# FinerWorks pricing and staged launch

## Approved retail policy
USD retail = manufacturing-only single-copy cost multiplied by 3.5, rounded UP to the next $5, with a $25 minimum. Shipping is quoted for the destination and charged separately without markup. Customer sales tax is calculated separately by the existing checkout tax service; supplier sales tax is a fulfillment cost, not a second customer tax.

For framed prints, that multiplier applies only to the unframed artwork. Add the exact supplier frame, mat and glazing costs to the saved unframed selling price, with no markup or further rounding. `catalog/frame-pricing.mjs` validates the complete component breakdown and checkout requires the saved price to equal this total. Supplier cost changes in either direction require review. Previously paid orders keep their saved totals.

`catalog/print-pricing.mjs` uses integer cents. `reviewPrintPrice` returns recommendations and flags changes; it never changes a published retail price. Saved amounts and their exact FinerWorks codes live in `catalog/prints.json`. An explicit `priceOverride` requires an amount at least $25 and a reason. Changing media or dimensions requires requoting and reapproval. The quote guard pauses checkout rather than silently reducing the standard margin after a provider cost increase.

The Watercolor Bright White pilots (Dorian Nakamoto and Chase Toole) have saved small/medium/full retail prices of $25/$45/$75 based on the September 30 provider quotes. The code mapping is product type 5, media 144, style 8. No supplier costs are exposed in public HTML, cart responses or repository pricing snapshots.

## Size and file gates
Default scales are 100%, 75%, and 50% of each original dimension. A larger dimension override or scale is rejected. Unsupported sizes are not rounded up. The FinerWorks catalog supports exact fractional sizes subject to style constraints.

Both pilots remain disabled and sandbox-only. The old Prodigi PDF layouts and approvals have been removed from the active config. Current web photos are low-resolution and their proportions do not match the recorded landscape measurements; they must not be treated as print masters. FinerWorks requires new JPG/PNG assets with exact dimensions, matching source and asset hashes, and explicit layout approval. Borderless style 8 uses trimming bleed; final edge treatment needs approval.

## Shipping and preflight
`cloudflare/print-provider.mjs` routes selected FinerWorks quotes to the new destination-aware adapter. It refuses to send a FinerWorks item to Prodigi. Existing original-artwork shipping, tax, payment and saved legacy jobs are preserved.

Shipping responses must match the requested product codes, quantities and purchase-order identity and reconcile manufacturing, shipping, supplier tax and grand totals. The exact service ID is saved. Shipping markup is zero. A quote is bound to the item selection and destination and expires before preflight.

The only allowed submit-endpoint call is validation-only: sandbox checkout, `validate_only: true`, `payment_token: "xxxx"`, and every order `test_mode: true`. The adapter rejects attempts to remove any guard before making a request. This validates an order structure; it does not place an order.

## Verification and next work
CI and deploys do **not** call FinerWorks for sampled quotes. The release gate runs an offline check (`scripts/ci/check-print-price-table.mjs`) against the committed print/frame price table so every catalog retail maps to the saved supplier cost plus the intended margin, with zero network calls.

The real customer checkout quote is the live price check. If FinerWorks’ manufacturing cost differs from the cost implied by the saved retail, checkout never charges the stale price and never returns a generic 422: when margin is still positive it returns a corrected price for the buyer to confirm in the cart; when margin goes negative it blocks that size with a friendly message, logs the mismatch, and emails `tj@vermillionaurora.com` through the existing owner-alert path (deduped per product code). There is no daily or cron quote job.

Manual `workflow_dispatch` sandbox pilots (`[print-pilot-test]` / verify-finerworks-framing) remain available when an explicit quote or framing audit is needed. Cost reports from those runs are encrypted with the committed public audit key.
