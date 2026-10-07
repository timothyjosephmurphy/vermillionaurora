# Purchase support and commission privacy

Effective 2026-10-01. Public terms: /shipping-returns/ and /privacy/.

## Daily order handling

- Answer purchase and privacy requests at tj@vermillionaurora.com within two business days.
- Dispatch originals in 3–5 business days, unframed prints in 3–5, framed/matted prints in 7–12, excluding carrier transit. Check production status and send tracking at dispatch. Original label creation is not proof of dispatch; the seller notification now includes this reminder.
- Before accepting purchases during travel or a known interruption, update the public lead times in both the policy and PurchaseReassurance component. If needed disable affected purchasing until the notice is live.
- If dispatch will be late, contact the customer with a revised date and their choice of waiting or cancelling unshipped items for a full refund. Save their response; do not assume silence is consent.
- For originals, accept return requests within 14 days of delivery and give packing instructions and the correct private return address. Customer ships within 14 days of approval. No restocking fee; change-of-mind return postage is the buyer’s responsibility and original postage is not refunded.
- Contact the print lab immediately on cancellation requests to establish whether production started. Made-to-order prints are final sale for change of mind once production starts, subject to consumer rights.
- Handle damage/defect/missing/wrong-item cases directly. Ask for artwork, packaging and label photos; preserve packaging. Do not reject an otherwise valid claim solely because seven days have passed. Submit carrier/print-lab claims promptly; provider deadlines do not replace our customer remedy. Agree replacement, repair or refund; cover remedy costs.
- Issue approved refunds within five business days of return inspection or damage approval. Use payment-provider refund tools and retain the adjustment. For Bitcoin agree amount and verify destination in writing; never send to an address inferred from an explorer.

## Private reference manager

Open https://tjm.art/commission-manager/ and use the dedicated `COMMISSION_MANAGER_TOKEN` for the checkout Worker. It is an owner credential: never share with customers or place it in a URL, email, git, screenshot, or browser storage. One-time setup: in Cloudflare → Workers & Pages → vermillion-commissions → Settings → Variables and Secrets, add `COMMISSION_MANAGER_TOKEN` as an encrypted secret using a unique password of at least 32 random characters saved in your password manager. Alternatively run `npx wrangler secret put COMMISSION_MANAGER_TOKEN --config cloudflare/wrangler.jsonc` from an authenticated checkout. The existing checkout audit token is rotated automatically by deployment and must not be used for this purpose. No new secret is embedded in the site.

- New inquiry files have a 90-day expiry. Notification emails contain request IDs and a manager link, not attachments. Match the ID to the inquiry email.
- On accepting a project, agree a dated retention/review period with the customer, save that correspondence, then select Active and enter that date. Dates can be at most a year ahead. Review before expiry and renew only while needed and agreed.
- On completion or cancellation, promptly record the actual date. This schedules deletion after 90 days. The hourly Worker cron processes up to 200 records at a time with a persisted pagination cursor. Monitor cron failures and backlog so deletions finish within the public 24-hour window.
- Download only to a protected working location. On closing work schedule deletion of local copies and older email attachments too. The Worker cannot erase a download, an email attachment, or a provider backup.
- `Review older uploads` lists existing uploads that predate retention manifests. Match each request ID to correspondence, import the reference, then immediately record the actual completion date or the agreed active-project date. Importing alone starts a 90-day schedule. Historical references are not blindly erased because project status is unknown.
- `Delete private reference files now` permanently removes that request's reference/palette files and retention record. It never touches payment, inventory or accounting records. Deletion is restricted to the commission key prefix.
- Lock the page after use. Management requests use an Authorization header; responses are no-store, files download as attachments, and the key is held only in page memory.

## Privacy requests and consent

1. Match a request to the originating email/order reference. Verify proportionately; do not solicit card details or routine ID documents.
2. Acknowledge within two business days; complete within 30 days or any shorter applicable deadline. Track due dates in your business task system.
3. Locate references by the ID in correspondence. Provide requested copies using an appropriately verified private delivery method. Correct/delete unnecessary data in private storage, email, local working files and relevant service providers.
4. Preserve only the accounting, tax, payment, shipping, fraud/dispute or legal records actually needed; explain any exception and its purpose to the requester. Review retained records annually with the accountant and delete when obligations end. Do not indiscriminately clear sales Durable Objects or accounting archives.
5. Marketing is not enabled by the contact form or checkout. Any future mailing list needs its own optional opt-in and unsubscribe process. Ask for separate, specific written permission before publishing private reference photos, customer names or stories; save scope/date and any withdrawal.
6. Monitor access and scheduled cleanup; restrict Cloudflare and Google account access. Investigate a suspected incident, contain access, document affected data, and assess applicable notification duties.

## Deployment verification

The production workflow verifies that both R2 buckets have managed and custom public access disabled before deploying the API. Private management requests without a valid owner credential return 404. Privacy tests exercise authorization, key isolation, legacy adoption, expiry, race handling, failed-upload cleanup and attachment-free notifications without sending real email. No live customer data is deleted by tests.

Providers: Cloudflare, Google/Gmail and Google Fonts, PayPal, BTCPay hosting, Stripe Tax, Shippo/carriers (including shipping insurance partners when selected), FinerWorks; embedded YouTube/maps and external links have their own data handling. Re-audit this list whenever integrations change.
