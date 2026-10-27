# Testimonials

Collectors (people TJ has given or sold paintings to) share testimonials on https://tjm.art/testimonials/.

## Flow
1. **Form** on /testimonials/: name (optional, as shown; blank appears publicly as "A collector", plus the city/region if given),
   email (private, optional: only for the thank-you print code), painting (picker of TJ's paintings and/or free text), testimonial (required unless a video is
   attached), optional city/state/country (never a street address), up to 4 photos (JPEG/PNG/WebP/HEIC, ≤10 MB each), then the optional video right below the photos.
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
6. **Display**: /testimonials/, the /exhibitions/world-map/ map, the homepage exhibitions card, and the map beside “Share your story”
   fetch `GET /testimonials/api/approved` at page load (`cache: no-store`; the response is `public, max-age=60, must-revalidate`),
   so an approval or unpublish shows on the next view and within a minute where a shared cache keeps the JSON. No rebuild.
   Approve, unpublish and delete rebuild `testimonials/approved.json`, which is what that endpoint reads. Approved photos are
   served from `/testimonials/api/photo/<id>/<n>`. On the full map, pins are green speech-mark markers with a "Collector testimonials"
   legend entry. The homepage card keeps its build-time exhibition dots and adds unlabeled green dots (nearby pins merged). The
   testimonials page map is only those collector pins, captioned “Collectors around the world”, and links to the full map.
7. **Thank-you code and email**: approving from Pending issues the person's single-use at-cost print code (same issuer as
   `scripts/issue-print-code.mjs`, note `Testimonial <id>`) and, if **Send thank-you email** is ticked (default), emails it to
   them from `TJ Murphy <tj@tjm.art>` (a send-as alias of the site's existing Gmail mailbox, tj@vermillionaurora.com; set the
   Worker var `TESTIMONIAL_EMAIL_FROM` to `tj@vermillionaurora.com` to switch back) with `Reply-To: tj@tjm.art`. The copy is
   `thanksEmail()` in `cloudflare/testimonials.mjs`: subject "Thank you for your testimonial, {first name}" (or without the
   name), written as a personal note so Gmail keeps it out of Promotions: plain text plus a minimal HTML mirror (no images,
   logo, buttons, styling or footer; plain links only), no List-Unsubscribe/bulk headers, no promo wording ("discount",
   "offer", "deal", exclamation marks), and an invitation to reply. The VA-… string appears after "Use this at checkout:".
   There is no confirmation email on submission; instead, when an email is given, the on-page thank-you says the print
   code comes separately from tj@tjm.art and to check Gmail's Promotions tab (non-JS posts redirect with `&code=1`). Each submission gets at most one code
   and one email (the code is stored on the private record and always shown on the owner page; an email attempt is recorded
   before sending, and an unknown outcome needs an explicit resend). Untick to approve quietly and use **Send thank-you email**
   later. Set the Worker var `TESTIMONIAL_THANKS_EMAIL` to `"false"` to turn automatic emails off. Editing a published
   testimonial never issues or sends anything.

The site Worker (`worker/site.mjs`) forwards `/testimonials/api/*` on tjm.art to the checkout Worker through the `CHECKOUT`
service binding, like the QuickBooks routes.

## Reply by email (no form)

A collector can reply to an email from TJ instead of using the form. SMS is not part of this path. The website form is unchanged.

The ask is a normal email from `TJ Murphy <tj@tjm.art>` with `Reply-To: stories@reply.tjm.art`. The address is a subdomain on purpose: `tjm.art` mail is Google Workspace, and turning on Cloudflare Email Routing for the apex would replace those MX records. Routing stays on `reply.tjm.art` only. The copy below is `ASK_TEMPLATE` in `cloudflare/testimonial-reply.mjs` (notice version `2026-10-27`). The consent sentence has to stay exact.

```
Subject: A photo of your painting?

From: TJ Murphy <tj@tjm.art>
Reply-To: stories@reply.tjm.art

Hi,

If you have a moment, reply to this email with a photo of the painting in your home, a few words about what it means to you, or both. A photo by itself is perfect.

By replying, you’re OK with TJ showing your first name or initials, your words, and your photos on tjm.art after he’s read them.

If you want the page to name the painting or your city, add lines like these (a city only, never your street address):

Painting: Honeybadger and Cub with Genesis Block
City: Tacoma, WA

Thank you,
TJ
```

What the Worker does with a reply:

1. Cloudflare Email Routing delivers `stories@reply.tjm.art` to the checkout Worker’s `email()` handler (`cloudflare/commission-worker.js`). Set `TESTIMONIAL_REPLY_ADDRESS` only if that address changes.
2. Quoted reply text, signatures (`-- `, “Sent from my iPhone”, Outlook “Original Message”), and `>` lines are removed. A `Painting:` line or a catalog title in the reply fills the painting when there is one clear match. A `City:` line is geocoded like the form; a street address on that line is ignored.
3. Photos (JPEG, PNG, WebP, HEIC) are stripped of EXIF/GPS the same way as form uploads. When the Worker has the Images binding, each photo is also re-encoded as a JPEG whose long edge is at most 2000px. HEIC that cannot be converted stays private and cannot be published. At most four photos are kept. An image under 8 KB is skipped when a larger photo is attached (signature logos). A reply whose only photo is smaller is kept if the file is at least 400 bytes.
4. Replying to the ask is the consent (`publishConsent: 'implied-by-reply'`), recorded with the notice above. The public name is the first name, or initials when the From header has no given name. The email address stays private and is used only for the thank-you print code.
5. The submission is **pending**. It shows on `/testimonial-manager/` with an “Email reply” badge. Approve, unpublish, and delete are the same actions as a form submission. A photo with no words can be approved. Nothing is added to `/testimonials/`, the exhibitions map, or the homepage pins until then.
6. The same pipeline is available to the owner API as `POST /testimonials/api/owner` action `ingestReply` with base64 `raw` (the RFC 5322 message), for a check without sending mail. It still requires `Authorization: Bearer $COMMISSION_MANAGER_TOKEN` and `Origin: https://tjm.art`.

To receive real replies, add `reply.tjm.art` as an Email Routing subdomain (dashboard: Email Routing → the tjm.art zone → Settings → Subdomains) and route `stories@reply.tjm.art` to the Worker `vermillion-commissions`. Do not enable Email Routing on the apex. After the subdomain answers, send the ask above and reply to it from another mailbox.

An authenticated check of the same ingest, without SMTP:

```
curl -sS https://tjm.art/testimonials/api/owner \
  -H "Origin: https://tjm.art" \
  -H "Authorization: Bearer $COMMISSION_MANAGER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"action":"ingestReply","raw":"<base64 of a reply>"}'
```

Then approve that id on `/testimonial-manager/` (or `action: "approve"`). Delete the test row when you are done so it does not stay on the public page.

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
City, state and country text (e.g. “Seattle, WA, USA” or “Warsaw, Poland”), never a street address: OpenStreetMap Nominatim (settlement search), falling back to Open-Meteo/GeoNames, rounded to
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
  "city": "Tacoma, WA, USA",
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
