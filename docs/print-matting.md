# Print with a conservation mat

The FinerWorks print selector has a Print only / Print with white conservation mat
choice. Image dimensions stay at the selected original-size, 75%, or 50% scale.
Mat outer dimensions use the smallest checked standard frame size with at least
one inch around the physical paper on every side. Unsupported sizes have no mat
variant. Frame recommendations follow the selected mat's outer dimensions and
only link to a frame that fits that mat. Frames are purchased separately.

`catalog/matting.mjs` owns geometry. `finerworks-mats.json` records the verified
material. Each print variant's `matOptions.snow-white` stores the provider's exact
combined product code, base print code, geometry, dated retail price and separate
layout approval. The mat window is nominally sized for the image; FinerWorks' cut
window slightly overlaps the edges. The proof must confirm the actual overlap,
signature clearance and assembly before this finish becomes sellable.

The combined manufacturing quote uses the approved 3.5x retail rule, rounded up
to $5 with a $25 minimum. Shipping and tax are separate. Missing or mismatched
prices never inherit the print-only price. Mat variants have separate cart IDs,
and saved cart/order items retain their mat specification.

The server retrieves active mat and paper definitions, builds the combined code,
validates it separately (the builder alone does not validate materials), retrieves
its price, and uses that exact code for shipping and validation-only preflight.
Client prices, codes and mat geometry cannot replace the catalog values. A fresh
quote is required after configuration, quantity or destination changes.

Production print purchasing and mat layout approval remain gated. The separate
unframed Dorian/Chase sandbox pilot can be tested independently; no mat variant
is enabled by that approval. Production print masters and print/mat layout
approvals remain required. Mat verification only quotes and validates orders.

Verified 2026-09-30 for both configured pilots on Watercolor Bright White:

| Print size | Mat outer / frame size | Print with mat |
| --- | --- | --- |
| 7.5 × 6 in | 10 × 8 in | $50 |
| 11.25 × 9 in | 14 × 11 in | $75 |
| 15 × 12 in | 20 × 16 in | $135 |

Prices include one Snow White 4-ply mat. Frames, shipping and tax are separate.
The supplier's product validation currently returns HTTP/status 404 with an
empty status message even for valid codes. Compatibility handling accepts only
explicit `valid:true` rows matching every requested code exactly; invalid rows,
auth errors and other HTTP failures still fail closed.

Checks: `node --test tests/print*.test.mjs cloudflare/finerworks-*.test.mjs`,
`node tests/print-matting.browser-test.mjs`, and the sandbox workflow. Its
VERIFIED_MAT_OPTION output contains public catalog fields and retail prices;
supplier costs remain in the existing encrypted audit artifact.
