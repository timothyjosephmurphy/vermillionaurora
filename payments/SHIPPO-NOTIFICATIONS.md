# Shippo label and seller email setup

After a verified PayPal capture, the painting's Durable Object buys the **same Shippo rate quoted at checkout** and sends a printable PDF and tracking information to **tj@vermillionaurora.com**. Email uses the existing commission form's Gmail identity. It does not send mail to the buyer or control a physical printer. The default PDF is suitable for a regular printer; `PDF_4x6` selects a thermal label.

This feature defaults **off in production** and is enabled in the isolated sandbox configuration. The implementation branch does not enable production checkout, change its credentials, or deploy the PayPal buttons. Integrate it with the checkout release from PR #3 before enabling it. It applies only to the shared `/checkout/` flow, not legacy hosted PayPal links or IPN payments.

## Worker settings

Configure these on the Worker, not in public source code. Do not paste API tokens into GitHub or chat.

| Setting | Production `vermillion-commissions` | Isolated `vermillion-checkout-sandbox` |
| --- | --- | --- |
| `SHIPPO_TOKEN` (secret) | Existing token must begin `shippo_live_` | Token must begin `shippo_test_` |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REFRESH_TOKEN` (secrets) | Reuse the commission form's Gmail credentials for `tj@vermillionaurora.com` | Configure credentials authorized to send a test email from that same address |
| `SHIPPO_AUTO_LABEL_ENABLED` (variable) | Set `true` only after the sandbox email and package checks below | Set `true` for the test |
| `SHIPPING_LABEL_FORMAT` (variable) | `PDF` (default), or `PDF_4x6` | Use the format being tested |

The checkout's existing `SHIP_FROM_STREET`, PayPal and Stripe settings remain required. Shippo needs a valid billing method and a usable carrier account for the quoted service. The release preparation found a production `SHIPPO_TOKEN` already present; its value, mode and billing readiness have not been verified by this change.

Read-only check on September 29, 2026 at 08:16 UTC: both Workers now have all five required secret entries. Secret values were not retrieved. [Configuration check](https://github.com/timothyjosephmurphy/vermillionaurora/actions/runs/36538360061/job/109318396571).

## Validate, then activate

1. Merge this branch into the shared checkout branch. The sandbox deployment must bundle `shipping-fulfillment.mjs` and `shipping-email.mjs` alongside `painting-stock.mjs`.
2. On the isolated sandbox Worker, configure the email secrets, test Shippo token and variables above. Deploy it. Its existing configuration uses `keep_vars=true`, so newly added runtime settings survive deployment.
3. Complete a **new** sandbox order for an available painting. The Honeybadger used in the earlier PayPal test is already sold in the sandbox; use another original. Orders created before the feature was enabled remain excluded, even if they complete later.
4. Confirm that `tj@vermillionaurora.com` receives `[TEST] Shipping label ready`, that the PDF opens, and that Shippo marks it as a test transaction. Resend the PayPal capture webhook and confirm there is no second Shippo purchase. Test labels cannot be used for actual shipping.
5. Before enabling live labels, measure the actual packed dimensions and weight, including tube end caps and padding. The catalog currently estimates **2 lb**. Chase Toole uses owner-authorized estimates of 15 × 12 × 0.125 inches and 4 oz, with $20 insurance. Other paintings retain the generic package estimates. Insurance is requested for items with `insuranceRequested:true`, at the actual sale value, through Shippo/XCover. Correct the package catalog before accepting live orders if those estimates are wrong.
6. Deploy the reviewed checkout and shipping code to production as part of the coordinated PayPal release. Verify Gmail and the live Shippo token/billing. Set `SHIPPO_AUTO_LABEL_ENABLED=true`; optionally set `SHIPPING_LABEL_FORMAT=PDF_4x6`. Keep the PayPal rollout limited to the chosen controlled-purchase product until that new paid order produces one real label and a delivered email.

Local tests use mocked providers and send no mail. The separate **Deploy and verify sandbox label email** workflow generates a Shippo test label and sends a real, clearly marked test email to the seller. It uses a fixed sample order in its own `ShippingCheck` Durable Object, without creating a PayPal purchase, changing painting stock, or recording a Stripe tax transaction. A random diagnostic credential protects `/checkout/shipping-check` and is removed after the run. The route and test object are included only in the sandbox Worker. Repeated runs reuse the persisted transaction/email result. This provider check complements the previously verified PayPal capture/webhook tests; a new complete checkout and a controlled live label remain release checks.

## Retry and recovery behavior

- The original is marked sold only after PayPal capture validation. Labels and seller emails run in the background; a tax or inventory publication outage does not block them.
- Shippo purchase state is committed to SQLite **before** the transaction request. Duplicate captures/alarms and object restarts do not repeat the purchase.
- `WAITING`/`QUEUED` transactions are polled by ID. After an hour still waiting, the seller receives an attention email. Rate quotes seven days old are not purchased.
- If the purchase response is lost or the process stops while purchasing, the seller receives **Shipping needs attention**. Search Shippo using the capture reference (`paypal-<capture ID>`) and the transaction ID, if available. Check for an existing label before buying manually. Shippo does not document an idempotency key for transaction creation, so uncertain requests are never automatically submitted again.
- Email failures retry every minute using the existing transaction. A lost Gmail acknowledgement can result in a duplicate email, but not a second label purchase. A stable Message-ID is included; it is not a Gmail deduplication guarantee.
- If attaching the PDF fails, the email includes the Shippo download link. If the link has expired, retrieve the label from the transaction in the Shippo dashboard.
- Setting `SHIPPO_AUTO_LABEL_ENABLED=false` prevents new automatic purchases. Already purchased/queued labels still finish their notification. Pending enabled orders receive an attention email when captured; orders created while disabled stay excluded.
- Existing sold records without a shipping job are not backfilled. Production needs no additional Durable Object namespace or class migration. The sandbox-only diagnostic adds the separate `ShippingCheck` class and `shipping-check-v1` migration. Preserve `stock` and `shipping_job` state during deployment/rollback.

For diagnosis, inspect the per-painting `shipping_job` table in Cloudflare's Durable Object storage. It contains status, transaction ID, email ID and timestamps plus private order/address data. Do not expose that table through public endpoints or paste buyer addresses into public issues. `review` plus an email ID means automatic work has stopped and manual shipping is required. Do not reset `purchasing`, `waiting`, `ready` or `review` to `pending` without checking Shippo first.

## Local verification

```sh
node --test cloudflare/paypal-inventory.test.mjs cloudflare/paypal-orders.test.mjs cloudflare/checkout-recovery.test.mjs
npm --prefix cloudflare/test ci
npm --prefix cloudflare/test test
```

The Workers Vitest suite uses real SQLite Durable Objects with mocked provider requests. It tests completed capture, duplicate events, eviction/restart, queued labels, failed email and tax services, uncertain label purchases, mode mismatch, expired quotes, missing email credentials, and PDF-link fallback. All test credentials are fake. The separate test configuration must never be deployed.

API references: [Shippo label creation](https://docs.goshippo.com/api-reference/transactions/create-a-shipping-label), [Shippo test mode](https://docs.goshippo.com/guides/testing), [Cloudflare alarm semantics](https://developers.cloudflare.com/durable-objects/api/alarms/).

## Insurance verification

The catalog builder reads `payments/shipping-overrides.json`. Insured items send `extra.insurance` with amount, currency and contents to Shippo. A matching shipment and a rate with `included_insurance_price` are required. Shippo includes that premium in `rate.amount`; checkout never adds it again. The saved rate/shipment are checked again before purchase, and the transaction must refer to that insured rate before the seller email reports coverage. Missing or changed insurance stops the purchase or flags the existing label for review, without buying another label.

The **Verify insured Chase Toole shipping** workflow runs `node payments/verify-shipping.mjs --insurance` in the sandbox only. It uses a separate durable sample (`label-email-chase-insurance-v1`) and confirms $20 insurance, a test label, and its PDF email without a PayPal charge or inventory write. The original uninsurable/failed samples remain preserved. Re-running it reuses the existing sample and does not buy another label. Coverage is not active until a successful live label purchase.

Reference: https://docs.goshippo.com/shipments/shipping-insurance
