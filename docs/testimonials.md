# Testimonials

Collectors (people TJ has given or sold paintings to) share testimonials on https://tjm.art/testimonials/.

## Flow
1. **Form** on /testimonials/: name (as shown), email (private, required), painting (picker of TJ's paintings and/or free text),
   testimonial (required), optional city, up to 4 photos (JPEG/PNG/WebP/HEIC, ≤10 MB each), and one consent checkbox to publish
   name, words, photos and city (including an approximate city pin on the map). Honeypot field `website`; rate limit 5 per visitor
   (hashed IP) per UTC day and 60 total per day. Works without JavaScript (303 back to `/testimonials/?thanks=1`).
2. **Photos**: the browser resizes to ≤2000 px JPEG, which drops all metadata (HEIC is converted with heic2any, lazy-loaded from
   jsDelivr with SRI, when the browser can't decode it). The Worker strips metadata again (`cloudflare/image-metadata.mjs`):
   JPEG EXIF/XMP/IPTC/comments/trailers (orientation is kept as a one-tag EXIF block), PNG text/eXIf/tIME chunks, WebP EXIF/XMP.
   HEIC that reaches the Worker unconverted is stored privately and can never be published.
3. **Storage** (existing private R2 bucket `COMMISSION_UPLOADS`, checkout Worker `vermillion-commissions`):
   `testimonials/records/<id>.json`, `testimonials/images/<id>/<n>.<ext>`, `testimonials/approved.json` (public index).
4. **Notification**: an email to tj@vermillionaurora.com from the same Gmail identity as commission requests, with Reply-To set to
   the submitter, and a link to the owner page. Photos are not attached. Submissions are saved even if the email fails.
5. **Moderation**: https://tjm.art/testimonial-manager/ (noindex; enter `COMMISSION_MANAGER_TOKEN`). Pending → **Approve & publish**
   (edit name, wording, painting, slug, city, pin, photos first), **Unpublish**, **Delete (reject)**. API:
   `POST /testimonials/api/owner` with `Origin: https://tjm.art` and `Authorization: Bearer $COMMISSION_MANAGER_TOKEN`
   (actions `list`, `photo`, `geocode`, `approve`, `unpublish`, `delete`, `issueCode`).
6. **Display**: /testimonials/ and the /exhibitions/world-map/ map fetch `GET /testimonials/api/approved` at page load, so approval
   is live within a minute with no rebuild. Approved photos are served from `/testimonials/api/photo/<id>/<n>`. Pins are green
   speech-mark markers with a "Collector testimonials" legend entry.
7. **Thank-you code and email**: approving from Pending issues the person's single-use at-cost print code (same issuer as
   `scripts/issue-print-code.mjs`, note `Testimonial <id>`) and, if **Send thank-you email** is ticked (default), emails it to
   them from `TJ Murphy <tj@vermillionaurora.com>` (the site's existing Gmail identity, same as order emails) with
   `Reply-To: tj@tjm.art`. The copy is `thanksEmail()` in `cloudflare/testimonials.mjs`. Each submission gets at most one code
   and one email (the code is stored on the private record and always shown on the owner page; an email attempt is recorded
   before sending, and an unknown outcome needs an explicit resend). Untick to approve quietly and use **Send thank-you email**
   later. Set the Worker var `TESTIMONIAL_THANKS_EMAIL` to `"false"` to turn automatic emails off. Editing a published
   testimonial never issues or sends anything.

The site Worker (`worker/site.mjs`) forwards `/testimonials/api/*` on tjm.art to the checkout Worker through the `CHECKOUT`
service binding, like the QuickBooks routes.

## Geocoding
City text only, never an address: OpenStreetMap Nominatim (settlement search), falling back to Open-Meteo/GeoNames, rounded to
2 decimals (≈1 km). TJ can edit or clear the pin before approving.

## Hand-curated entries (optional)
`src/data/testimonials.json` still works for entries added by hand (rendered at build time). Nothing appears unless
`consent.publish` is `true`.

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
  "lat": 47.25,
  "lng": -122.44,
  "consent": { "publish": true, "name": true, "photo": true, "selfie": false, "city": true, "map": true },
  "received": "2026-10-06"
}
```
Put those images in `static/testimonials/images/` as WebP, ideally ≤ 1600px wide.
