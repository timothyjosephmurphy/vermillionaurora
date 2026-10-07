# Testimonials

Edit `src/data/testimonials.json` (an array). Nothing appears unless `consent.publish` is `true`.

```json
{
  "id": "2026-10-jane-portrait",
  "name": "Jane Doe",
  "anonymous": false,
  "painting": "Portrait of Jane's grandmother",
  "paintingHref": "/commissions/#portrait",
  "quote": "It captures her exactly.",
  "photo": "/testimonials/images/jane-painting.webp",
  "selfie": "/testimonials/images/jane-selfie.webp",
  "city": "Tacoma, WA",
  "lat": 47.2529,
  "lng": -122.4443,
  "consent": { "publish": true, "name": true, "photo": true, "selfie": false, "city": true, "map": true },
  "received": "2026-10-06"
}
```

- `name` is shown only when `consent.name` is true and `anonymous` is false; otherwise "A collector".
- `photo` (the painting in its new home), `selfie`, `city`, and the map pin (`lat`/`lng`, `consent.map`) are each optional and each need their own consent flag.
- Pins appear on /exhibitions/world-map/ in green with a "Collector testimonials" legend entry. Use city-level coordinates, never a home address.
- Put images in `static/testimonials/images/` as WebP, ideally ≤ 1600px wide.
- After a testimonial, issue an at-cost print code if appropriate (see docs/print-codes.md).
