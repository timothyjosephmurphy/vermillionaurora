# Dorian and Chase checkout pilot

## Limited live sample release

The owner approved real sample purchases on 2026-09-30 using the existing
lower-resolution images. `/print-test/` offers Dorian and Chase in three sizes,
$25 / $45 / $75, one copy and one size per painting. The page and cart disclose
that these are real paid samples, not finished editions. Product pages now offer
three portrait sizes, unframed or with black, white, or natural wood framing.
The confirmed 12-wide by 15-high measurements replace the reversed dimensions.
Current files are cropped to fill the paper without added white margins. See
`print-framing.md` for the exact crop and preservation of previous order files.

The approved images are built deterministically to `/print-samples/<sha256>.jpg`
on the production website. Deployment checks their bytes and matching page/catalog
before enabling API purchases. Sandbox images remain isolated by URL policy.
`sampleOnly` and explicit `liveSampleApproved` preserve the normal quality gate;
runtime `LIVE_PRINT_SAMPLE_ENABLED` and 24 exact `PRINT_CHECKOUT_IDS` limit the
release. `testOnly` files remain blocked from all live fulfillment. Mat variants
remain unavailable pending their separate layout approval.

The live test uses normal cart, PayPal, Stripe tax, ledger, R2 archive and emails.
FinerWorks receives `test_mode:false` and the saved payment token only after a
verified customer payment. A mocked live Worker test covers payment-before-order,
single submission and token-free records. The deployment creates one unpaid
PayPal order for a Seattle verification address and cancels it; it does not
capture money or submit a FinerWorks order. The owner completes the actual paid
test with their delivery address at `https://vermillionaurora.com/print-test/`.

Disable new sample purchases with `LIVE_PRINT_SAMPLE_ENABLED=false`. Already
recorded payments and saved fulfillment continue through their existing recovery
flow; review a paid order before changing fulfillment settings.

## Earlier sandbox verification

Active print development uses `finerworks-print-ordering`. It replaces the old
`prodigi-print-ordering` branch name; FinerWorks is the selected provider.
The old reference remains available for other open work, but deployment and
verification workflows follow the FinerWorks branch. Continue changes there.

The sandbox page is `/checkout/print-test` on `vermillion-checkout-sandbox`.
It offers one copy of either or both paintings at $25 / $45 / $75 on Watercolor
Bright White paper. PayPal uses sandbox funds; FinerWorks uses both `test_mode`
and the documented `xxxx` test payment token. No physical print is produced.

Two deterministic JPEG test sheets preserve the complete existing images within
white trim margins. Source resolution remains low; they were originally `testOnly`
and are now explicitly approved `sampleOnly` files for the limited release above.
The generated sandbox image bundle is
built from committed source files, validated against its saved SHA-256, and
served only by the sandbox Worker. Do not treat these as production masters.

Payment capture uses the existing durable cart, sales ledger and private R2
archive. Print orders preserve both image line items even when manufacturing
codes match. Rechecking costs may stop fulfillment for review. Before submission,
the request and unique PO are persisted. An uncertain submission is reconciled
by PO; it is never automatically resubmitted. Disabled settings after payment
still produce a recorded payment and a fulfillment review.

`payments/verify-print-sandbox.mjs --test-orders --pilot-checkout` checks all six
shipping quotes, both image hashes, both order preflights, and two unbilled
provider test orders. Test references are stable per release/artwork. These
unpaid tests have explicit private test records, never fake sale records.
The mat-option diagnostics remain available without `--pilot-checkout` and are
separate from this unframed pilot. Mat purchases remain gated by their approvals.
Push deployments use read-only quotes and preflight. A manual workflow run can
explicitly set `test_print_orders` to exercise unbilled provider test orders.
A commit explicitly marked `[print-pilot-test]` also requests that isolated test.

The provider adapter supports a later live release only with explicit
`FINERWORKS_ORDER_ENABLED=true`, a configured `FINERWORKS_PAYMENT_TOKEN`, live
PayPal mode and approved print files. `invoice` requires FinerWorks
invoice billing approval; do not assume the API keys confer it. Production
print checkout is limited to the six approved sample options above.

Validation: print/pricing/mat unit suites, FinerWorks durable checkout tests
(capture, combined order, records, email mocks, lost-response reconciliation,
cost changes, configuration changes), and browser checkout/return/mobile tests.
Completing the deployed PayPal checkout requires a sandbox buyer login.

Verified 2026-09-30 on deployed release `f5d51db`:
- Six unframed shipping quotes and both image hashes/preflights passed.
- FinerWorks accepted an unbilled test order for each painting on `154bbfa`.
- The combined small-print cart quoted $50 plus $6.95 shipping ($56.95 total,
  $0 sandbox tax) for the Seattle test address and reached PayPal sandbox
  approval. The unpaid checkout was then canceled; no payment was captured.
- The Worker suite passed all 88 tests. Desktop and mobile checkout tests passed.
- Mat-inclusive shipping and two-copy preflight subsequently passed on `256be33`.
  Mat variants remain unavailable for purchase until their layout is approved.

Production credential setup completed on 2026-09-30: `FINERWORKS_WEB_API_KEY`,
`FINERWORKS_APP_KEY`, and `FINERWORKS_PAYMENT_TOKEN` are present on
`vermillion-commissions`. The saved-card token was retrieved from FinerWorks and
stored by the encrypted setup workflow on `c2fe673`; temporary setup credentials
were removed. Credential presence is verified; a paid production print order
still requires the owner's checkout. The limited release above enables that test.

Saved-card setup uses `payments/configure-finerworks-billing.mjs`, explicitly
requested by the `[configure-finerworks-billing]` commit marker. It retrieves the
sole or default payment method from the authenticated FinerWorks account,
transfers its token with session-bound RSA encryption, and stores it only as
the production `FINERWORKS_PAYMENT_TOKEN` secret. The temporary sandbox setup
credential is deleted in `finally`. No token or private key is logged or saved
as an artifact. This operation does not enable purchases or submit an order.
