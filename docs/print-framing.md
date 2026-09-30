# FinerWorks framed print ordering

Painting product pages show print availability independently of original-artwork
availability. Configured live samples for Dorian Nakamoto and Chase Toole offer
three sizes, with unframed, black, white, or natural wood framing. Other paintings
show that prints are not yet available. Existing sample-quality disclosures and
one-copy-per-artwork limits continue to apply.

The three frame choices are FinerWorks Gallery Economy IDs 1, 2, and 7, verified
through the authenticated catalog on September 30, 2026. Framed prints include
Snow White 4-ply matting (ID 1) and Premium Clear acrylic glazing (ID 1). The frame
fit follows the mat outer dimensions: 10 × 8, 14 × 11, or 20 × 16 inches. These are
frame opening dimensions, not exterior moulding dimensions.

| Print size | Unframed | Black or white frame | Natural wood frame |
| --- | ---: | ---: | ---: |
| 7.5 × 6 in | $25 | $150 | $180 |
| 11.25 × 9 in | $45 | $205 | $245 |
| 15 × 12 in | $75 | $335 | $385 |

Prices use the existing approved rule: 3.5 times the complete manufacturing cost,
rounded up to $5, with a $25 minimum. Destination shipping is quoted separately
without markup; applicable tax is separate. Checkout revalidates materials,
dimensions, complete product codes, pricing and shipping. It cannot silently
replace a frame or charge an unframed price for a framed order.

Each finish has a separate catalog/cart ID. Orders, customer and seller emails,
public order summaries, and the private fulfillment record retain the selected
frame, mat, glazing, and size. Saved orders retain their original configuration.
The existing idempotent payment/fulfillment flow is unchanged.

The current sample files retain 32 pixels of clear edge space on a 1250 × 1000
sheet. At the smallest print size the clear margin is at least 0.192 inch per
edge. FinerWorks describes its nominal mat window as approximately 1/8 inch
smaller than the print; the sample artwork therefore remains inside the window.
This layout check applies only to the exact approved sample hashes. New print
masters and other artworks still need their own file and layout approval.

Standalone mat variants remain behind their separate layout gate. Amazon frame
suggestions are retained under "Prefer to buy your own frame?" for unframed
selections and hidden when a FinerWorks frame is included.

Validation uses `payments/inspect-finerworks-frames.mjs`: all nine frame/size
prices, destination-based shipping, and validation-only preflights for both
artworks. It never submits a production order. Browser checks exercise the
product-page selector through cart quoting at desktop and mobile widths.

Provider references:
- https://v2.api.finerworks.com/Help/Api/POST-v3-list_collections
- https://v2.api.finerworks.com/Help/Api/POST-v3-build_product_code
- https://v2.api.finerworks.com/Help/Api/POST-v3-list_glazing
- https://support.finerworks.com/news/print-frame-and-mat-your-artwork-or-photography/
