# FinerWorks framed print ordering

Painting product pages show print availability independently of original-artwork
availability. Every image-proportional edition (Paul Murphy, TJ Murphy, archive,
older work, and book prints) uses layout `full-image-white-border-v2`: the
photograph keeps its size and the paper grows by 1.00 inch of white on every
side. The sold file is FinerWorks style 8 (borderless). Style 9 adds only a
1/2 inch lab border and crops an embedded margin, so it is not used for new
sales. Style 8 can trim about 0.06 inch, and its description allows up to about
1/8 inch, so the finished white can land slightly under 1 inch. The file itself
is exactly 1.00 inch.

Both the physical print size and nominal mat opening use the complete paper
size; the supplier's small mat overlap falls on the white margin. The print is
not resized to its inner image dimensions or cropped to fit a standard frame.
Assembled FinerWorks frames are custom sized to the selected print with a
1.5-inch mat border on all four sides. Very small prints use the smallest equal
border that satisfies the mat's 8-inch minimum (up to about 2 inches). The full
paper and its white margin remain intact. The frame changes with the print size,
and the preview uses a common physical scale so small prints also appear smaller.
Standalone mats for customer-supplied frames retain their stock frame sizes.
Original artwork dimensions, availability and prices are independent of these
print products.

Prices and frame product codes for the larger sheets are withheld until a live
FinerWorks quote is approved. Until then the editions stay off sale
(`enabled: false`). Do not put them back on sale at the previous dollar amounts.

`payments/quote-paul-frames.mjs` retrieves authenticated, read-only supplier
validation and pricing in the existing isolated sandbox. Its temporary audit
credential is removed afterward. `payments/apply-paul-frame-quotes.mjs` applies
only a complete current result that matches every source hash, print-file hash,
base product code, mat, frame and unframed price. No print order is placed.

The three frame choices are FinerWorks Gallery Economy IDs 1, 2, and 7, verified
through the authenticated catalog on September 30, 2026. Framed prints include
Snow White 4-ply matting (ID 1) and Premium Clear acrylic glazing (ID 1). The frame
fit follows the custom mat outer dimensions for current print editions.
The retired portrait sample configurations retain their original stock-frame
dimensions for historical validation. These are
frame opening dimensions, not exterior moulding dimensions.

| Print size | Unframed | Black or white frame | Natural wood frame |
| --- | ---: | ---: | ---: |
| 6 × 7.5 in | $25 | $59.63 | $68.63 |
| 9 × 11.25 in | $45 | $91 | $102 |
| 12 × 15 in | $75 | $149 | $164 |

The table above describes the retired portrait samples. Current edition sizes
use exact, newly quoted custom frame dimensions and prices.

The unframed artwork price retains the approved rule: 3.5 times print production
cost, rounded up to $5, with a $25 minimum. At the owner's direction, framed
prices add the exact frame, mat and glazing costs to that unframed selling price.
There is no markup or additional rounding on framing. For example, the small
black frame is $25 + $34.63 = $59.63. Destination shipping is quoted separately
without markup; applicable tax is separate. Checkout revalidates materials,
dimensions, complete product codes, pricing and shipping. It cannot silently
replace a frame or charge an unframed price for a framed order.
Any change to the quoted framing cost pauses checkout for a price review, so
lower supplier costs cannot turn into an unapproved framing margin either.

Each finish has a separate catalog/cart ID. Orders, customer and seller emails,
public order summaries, and the private fulfillment record retain the selected
frame, mat, glazing, and size. Saved orders retain their original configuration.
The existing idempotent payment/fulfillment flow is unchanged.

`payments/refresh-print-frame-quotes.mjs` refreshes all currently enabled print
editions through authenticated, read-only sandbox diagnostics. It verifies every
exact frame/mat size, source and file hash, product code, and retail price before
updating either catalog. It never submits orders. Its temporary credential is
rotated between settled batches when needed and removed after completion.

The owner corrected both original measurements to 12 inches wide by 15 inches
high on September 30, 2026. Current sample files fill a 1000 × 1250 portrait
sheet without added white margins. The source photographs are center-cropped
to 4:5 without stretching: Dorian removes 24 source pixels from each side;
Chase removes 16. The product preview uses that exact print file and discloses
the crop, normal borderless trimming and slight mat overlap. Higher-resolution
masters still need a new file and layout review.

Previously paid orders retain their saved product code, orientation and file
URL. `catalog/frozen-order-editions.json` lists the 1/8 inch sheets and the
style 9 unframed crops sold before the 1 inch margin. The asset builder
reproduces those files byte-for-byte at their original content-addressed URLs
so a new release cannot change an existing order's image. Book sheets that
already live on R2 are left in place. No existing order is changed or resubmitted.

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
