# Studio notes email list (self-hosted)

As of Nov 20 2026 the list does not use any newsletter service. TJ sends studio notes from his own Gmail.

## Where the list lives

1. **Live store:** private R2 bucket `vermillion-commission-uploads` on the checkout Worker (`vermillion-commissions`):
   - `newsletter/subscribers/<sha256>.json`: one record per address with `email`, `status` (`subscribed` or `unsubscribed`), `subscribedAt`, `unsubscribedAt`, `source` (the page the form was on), `ipHash` (daily salted hash used for rate limiting), and `code` (the at-cost print code).
   - `newsletter/codes/<sha256>.json`: signups from before Nov 20 2026. These are read as subscribers (`source` = `before-nov-2026`).
   - `newsletter/rate/<day>/…`: rate-limit counters (5 per network per day, 40 per day in total).
2. **Source of truth for sending:** the private GitHub repo `timothyjosephmurphy/newsletter-list`. Its hourly Action pulls the CSV export below into `subscribers.csv` and commits any change. Subscriber emails never go in this public repo.

## Endpoints (all on https://tjm.art, forwarded to the checkout Worker)

- `POST /newsletter/subscribe` is the site form. It validates the address, checks the honeypot (`website`), dedupes, rate limits, issues one print code, shows it on the page, and emails TJ (`tj@vermillionaurora.com`, from the site's Gmail identity `tj@tjm.art`) with the new address and page.
- `GET /newsletter/unsubscribe?e=<email>&t=<token>` shows a confirm button. `POST` to the same URL unsubscribes. The token is an HMAC of the email, and each row of the export carries its own `unsubscribe_url`.
- `GET /newsletter/export.csv` with `Authorization: Bearer <NEWSLETTER_EXPORT_TOKEN>` returns every subscriber as CSV: `email,status,subscribed_at,unsubscribed_at,source,print_code,unsubscribe_url`. `COMMISSION_MANAGER_TOKEN` also works.

## Getting the list as CSV

- Open `subscribers.csv` in the private repo `timothyjosephmurphy/newsletter-list`. Run its "Sync subscribers" Action to refresh it immediately.
- Or run: `curl -H "Authorization: Bearer $NEWSLETTER_EXPORT_TOKEN" https://tjm.art/newsletter/export.csv -o subscribers.csv`

## Removing someone by hand

Use their `unsubscribe_url` from the CSV, or delete the record:
`npx wrangler r2 object delete vermillion-commission-uploads/newsletter/subscribers/<sha256>.json --remote`
(`<sha256>` is the SHA-256 hex of `newsletter-code:<lowercased email>`).

## Secrets

- `NEWSLETTER_EXPORT_TOKEN` on `vermillion-commissions` and as the Actions secret of the same name in `newsletter-list`.
- The old `BUTTONDOWN_API_KEY` and `BUTTONDOWN_WEBHOOK_SECRET` are no longer read and can be deleted.
