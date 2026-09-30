# Amazon frame recommendations

`catalog/frames.json` is the checked list of size-specific Amazon product variants.
The ten black upsimples single-frame listings were checked on 2026-09-30 against
their product titles and size options. They accept the listed paper size without
the supplied mat; the seller says the visible opening is about 0.5 inch smaller
overall. Product links do not promise live availability, pricing, UV protection,
or conservation-grade backing. No Amazon product images or prices are copied.

`FrameRecommendations.astro` renders two options, preferring an exact sheet fit,
then the smallest larger checked frames with room for a custom mat. It excludes
undersized frames and does not round a sheet down to a nominal frame size.
Larger frames require at least 0.5 inch of space on every side of the paper.
The supplied mat is not represented as fitting an arbitrary image. Unknown paper
sizes and oversized artwork get an explanatory state instead of a purchase link.

Originals: render only for available, unframed paintings on paper. Canvas and
already framed originals are excluded. For prints, place the component inside
`[data-print-options]` with `context="print"`, `paper={options[0]?.paper}`, and
`image={options[0]?.image}`. It follows the checked size radio using the existing
`data-options` array, accepting `paper`/`image` or `paperSize`/`imageSize` fields.
It never falls back to image dimensions when sheet dimensions are unconfirmed.
If print configuration changes without a radio change, dispatch the bubbling
`print:selectionchange` event on the print selector after updating `data-options`.

All links open Amazon in a separate tab and make clear that frames are ordered
and shipped separately. `affiliateTag` is currently null: these are ordinary
links and earn no affiliate commission. After the owner's Amazon Associates
account/site is approved, set their real US tracking ID. The component then adds
the tag, sponsored link attribute, and the Amazon Associate disclosure beside
the recommendations. Do not invent an ID or hardcode prices.

Recheck Amazon variants periodically and remove unavailable or changed listings.
Checks: `node --test tests/frames.test.mjs`, `npm run build`, and
`node tests/frames.browser-test.mjs`. The frame workflow exercises product pages
and the print-preview selector when present, and saves desktop/mobile previews.
This integration does not enable print purchases or change vendor fulfillment.
