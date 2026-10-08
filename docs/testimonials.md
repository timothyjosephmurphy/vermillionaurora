# Testimonials

Collectors (people TJ has given or sold paintings to) share testimonials on https://tjm.art/testimonials/.

## Flow
1. **Form** on /testimonials/: name (optional, as shown; blank appears publicly as "A collector", plus the city if given),
   email (private, optional: only for the thank-you print code), painting (picker of TJ's paintings and/or free text), testimonial (required unless a video is
   attached), optional city, up to 4 photos (JPEG/PNG/WebP/HEIC, ≤10 MB each), then the optional video right below the photos.
   **No consent checkbox:** a short notice sits just above the submit button (text and version in
   `cloudflare/testimonial-notice.mjs`): "By sending this, you’re OK with TJ showing your name (if you give one), city, words and
   photos on tjm.art." Submitting is the consent; the record stores
   `publishConsent: 'implied-by-submit'` and `consent: {publish: true, basis: 'implied-by-submit', notice, noticeVersion,
   shownVersion, scope, at}` (`shownVersion` is the version the page sent in the hidden `publishNotice` field). The two video
   permission boxes are unchanged and still separate. The thank-you email greets by first name, or "Hi there" without one.
   **No email:** the testimonial is still saved, notified and publishable, but approval issues no code and sends nothing
   (`thanks` result `{noEmail: true, emailSkipped: 'No email, so no code sent'}`; `issueCode`/`sendThanks` answer 409), and
   the moderation card says "No email, so no code sent". Video upload tokens and rate limits never use the email.
   Honeypot field `website`; rate limit 5 per visitor
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

## Video testimonials

The optional video control sits directly below "Add photos" (no separate encouragement box since 2026-10-08). Phones get two
buttons: **Record a selfie video** (`capture="user"`, front camera) and **Choose from my videos** (library, no `capture`).
A video makes the written words optional; at least one of words or video is required.

- **Formats and size:** MP4, MOV (iPhone) or WebM, up to **50 MB** (lowered from 500 MB on 2026-10-08; roughly 1–3 minutes of
  default 1080p phone video). There is no hint text under the photo or video buttons: format and size are only explained
  in the error shown when a file doesn't fit ("Videos need to be MP4, MOV or WebM, up to 50 MB." / "That file type won’t
  work. Please use JPEG, PNG, WebP or HEIC." / "… is too large. Photos need to be 10 MB or smaller.").
- **Upload:** browser → Worker → R2 multipart (`POST /testimonials/api/video/start`, `PUT …/part?id=&n=` with 8 MiB parts
  and an HMAC upload token, `POST …/complete`, `POST …/abort`). The Worker relays each part, so no R2 API keys,
  presigned URLs or bucket CORS are needed. It checks the declared type and size, every part's exact length and the
  file signature (ISO-BMFF `ftyp`/QuickTime atoms or WebM EBML) on part 1. Upload starts are rate limited (4 per visitor
  and 40 total per UTC day); submissions keep the existing limits and honeypot (a honeypot hit deletes the video).
- **Location:** phones store the recording location as an ISO 6709 string; the browser blanks it in the whole file and
  the Worker blanks it again in each part (same length, so the file stays valid).
- **Poster:** the browser captures a frame (canvas → JPEG) and sends it with the form; metadata is stripped like photos.
  Without a poster the public player uses `preload="metadata"` once it nears the viewport.
- **Permissions:** two optional boxes, stored on the record as `video.consent.site` and `video.consent.social`.
  A video is public only if the testimonial is approved, TJ leaves "Show the video on tjm.art" on, and `consent.site` is
  true. Otherwise it stays private (approval still issues the code and sends the thank-you; the words can be published;
  the email leaves out the site link when nothing is shown). The manager has a **Videos OK for social media** view with
  download links, and buttons to record that a collector withdrew either permission.
- **Playback:** public `GET /testimonials/api/video/<id>` (and `/poster`) serves only videos in the public index, with
  HTTP Range support. Moderation uses signed links (`/testimonials/api/video/private/<id>/video?exp=&sig=`, 6 hours).
  `.mov` is served as `video/mp4` so Chrome/Firefox play H.264 iPhone clips; HEVC clips need Safari or a download.
- **Retention (hourly cron):** uploads not attached to a testimonial within 24 hours are aborted and deleted; videos on
  testimonials still unapproved 90 days after arrival (or after unpublishing) are deleted and the record is marked
  `video.expired`; videos whose record is gone are deleted; Delete removes the video with the record. Approved videos
  are kept.
- **Storage:** `testimonials/videos/<id>/video.<ext>`, `testimonials/videos/<id>/poster.jpg`,
  `testimonials/uploads/<id>.json` in `COMMISSION_UPLOADS`.

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

## Thank-you print codes in QuickBooks

Orders paid with a single-use at-cost collector code (`VA-XXXX-XXXX-XXXX`) are marketing spend. The QuickBooks sync
starts the internal **Memo** (PrivateNote) of the order's Sales Receipt (`VA-…`) and of its production-cost Purchases
(`VP-…` print lab, `VL-…` labels) with:

    At-cost testimonial print code — marketing (code VA-…-WXYZ).

Only the last group of the code is shown (orders paid before this was added show the marker without it). Amounts,
accounts, items and the customer-facing message are unchanged, and nothing has to be set up in QuickBooks (no Class,
Tag or custom field). Find them with QuickBooks search or a report filtered on Memo containing "testimonial print code".
The owner code is never marked. Records synced earlier were backfilled once by the hourly cron (Memo-only sparse
update); its report is in the sales-records bucket under `quickbooks/<environment>/at-cost-marker/`.
