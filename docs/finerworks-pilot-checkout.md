# Dorian and Chase checkout pilot

The sandbox page is `/checkout/print-test` on `vermillion-checkout-sandbox`.
It offers one copy of either or both paintings at $25 / $45 / $75 on Watercolor
Bright White paper. PayPal uses sandbox funds; FinerWorks uses both `test_mode`
and the documented `xxxx` test payment token. No physical print is produced.

Two deterministic JPEG test sheets preserve the complete existing images within
white trim margins. Source resolution remains low and both are `testOnly`.
They cannot appear in the live payment catalog. The generated image bundle is
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
PayPal mode and approved non-test print files. `invoice` requires FinerWorks
invoice billing approval; do not assume the API keys confer it. Production
print checkout remains disabled until the controlled purchase is ready.

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
- The broader deployment audit still fails the separate two-copy mat preflight;
  unframed checks passed and mat variants remain unavailable for purchase.

The production readiness check found no `FINERWORKS_WEB_API_KEY`,
`FINERWORKS_APP_KEY`, or `FINERWORKS_PAYMENT_TOKEN` binding on
`vermillion-commissions`. Its print provider and enablement flags are also unset.
Configure those secrets before a controlled paid sample release. This check
only reports binding presence; it neither reads secret values nor enables sales.
