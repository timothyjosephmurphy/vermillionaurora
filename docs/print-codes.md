# At-cost print codes

Codes are typed into the **Code** field on /cart/ before "Calculate shipping & tax".

## Collector codes (single use)
For a collector after a testimonial, and for someone who joins the email list. Prints only (not originals or deposits), priced at the print lab's
production cost per copy plus shipping, with no markup. Each code works for one paid order.

```sh
COMMISSION_MANAGER_TOKEN='<the existing manager token>' node scripts/issue-print-code.mjs --name "Jane Doe" --email "jane@example.com" --note "Testimonial Oct 2026"
```
Omit the env var to be prompted instead. Add `--sandbox` to issue on the sandbox worker. The code prints once;
only its hash is stored (CartOrder Durable Object `print-code:<hash>`, plus `print-codes/<mode>/<hash>.json` in the sales archive
with the name, email and note).

Lifecycle: checked at quote, claimed when payment starts, released if that checkout is cancelled, expires, or the card is
declined, redeemed when payment completes. A claimed code cannot be used in a second checkout at the same time.

## Newsletter signup

Joining the list on the site (`POST /newsletter/subscribe`) subscribes that address with the Buttondown API and emails one collector code. The note is `Newsletter signup YYYY-MM-DD`. The same address does not get a second newsletter code. A testimonial code for that address stays separate.

The checkout Worker (`vermillion-commissions`) needs secret `BUTTONDOWN_API_KEY` (Buttondown → Settings → API). Without it the form says the list isn’t accepting signups and does not issue a code. This secret is not on the Worker yet.

Optional: secret `BUTTONDOWN_WEBHOOK_SECRET` and a Buttondown webhook for `subscriber.created` and `subscriber.confirmed` aimed at `https://tjm.art/newsletter/buttondown-webhook`. The signature is `X-Buttondown-Signature: sha256=` plus the HMAC-SHA256 hex of the raw body. If the event only includes a subscriber id, the handler loads the address with `BUTTONDOWN_API_KEY`. No webhook is configured yet.

Verify without adding a stranger to the list: `node --test cloudflare/newsletter.test.mjs` mocks Buttondown and Gmail. After the API key is saved and this is deployed, sign up with an address you control. One code email should arrive from tj@tjm.art. Submitting that address again should not send a second code.

## Owner code (TJ, unlimited)
Stored only as a SHA-256 hash in `cloudflare/print-codes.mjs`. Prints at production cost; originals at $0 plus shipping
(you still pay shipping and any sales tax on it). Normal fulfillment runs: the painting is marked sold and a shipping label is
created. Not valid on commission deposits. To rotate it, replace `OWNER_CODE_HASH` with
`sha256("va-print-code:" + CODE uppercased with non-alphanumerics removed)`.

Print-lab orders are still placed and checked at the listed retail price, so the provider price guard is unchanged; the
receipt records `printCode.kind` and the list total.

## PayPal
PayPal checkout was removed from the site and Workers (studio-tracker #133). It cannot be restored by a config flag.

