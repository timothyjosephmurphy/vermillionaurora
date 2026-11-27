# Etsy original sales from seller email

Originals on tjm.art are marked sold from Etsy’s seller-sale emails, not from a frequent receipts poll. Reactivation is still owner-only. Prints are ignored.

The five-minute (and 15-minute) Etsy receipts cron is removed. A daily safety check still runs on the checkout Worker at 16:15 UTC (11:15 AM Eastern in winter, 12:15 PM Eastern in summer). That run honors Etsy’s `Retry-After` and only reconciles sold or unavailable originals.

## How it works

Etsy already sends sale notices to `tj@vermillionaurora.com` (not the personal Gmail). The first sale on Oct 2, 2026 used the first-sale template:

- From: `Etsy <emails@mail.etsy.com>`
- Subject: `TJ, congrats on your first sale! Here are your order details.`
- Fields: `Order number`, `Transaction ID`, `Item` (title), `Quantity`

Later sales use the ordinary seller template from `Etsy Transactions <transaction@etsy.com>`, with a subject like `You made a sale on Etsy - Ship by Nov 4 - [$1,100.00, Order #4299000111]`. Those messages often include an `etsy.com/listing/<id>` link. Refund, cancel, and shipment mail is ignored.

A Gmail filter forwards only those sale emails to `etsy-sales@reply.tjm.art`. Cloudflare Email Routing on the `reply.tjm.art` subdomain (already used for `stories@reply.tjm.art`) delivers them to the `vermillion-commissions` Worker. The Worker accepts a message only when:

- it is addressed to `etsy-sales@reply.tjm.art`
- the From or Sender address is on `etsy.com`
- Cloudflare’s `Authentication-Results` (or Cloudflare-attested ARC) shows `dkim=pass` or `dmarc=pass` for an Etsy domain

A spoofed email cannot mark a painting sold. The order number is the Etsy receipt id, so a repeat of the same email is a no-op. If the mail cannot be parsed or an item cannot be matched to a known original or print, TJ gets one alert per issue, then a recovery is not required. Buyer addresses in the email are not stored or logged.

## What TJ does after this is merged

These steps stay on `reply.tjm.art`. Do not enable Email Routing on `tjm.art` or `vermillionaurora.com`; that would replace the Google Workspace MX records.

1. In Cloudflare Dashboard → Email Routing for the `tjm.art` zone → the `reply.tjm.art` subdomain, add a rule:
   - Custom address: `etsy-sales@reply.tjm.art`
   - Action: Send to the Worker `vermillion-commissions`
   - Do not change the existing `stories@reply.tjm.art` rule
2. In Gmail for `tj@vermillionaurora.com` (Settings → See all settings → Forwarding and POP/IMAP → Add a forwarding address), add `etsy-sales@reply.tjm.art`. Gmail will send a confirmation to that address. The Worker forwards confirmation mail to `tj@vermillionaurora.com`. Open that confirmation and click the link.
3. Still in that Gmail account, create a filter:
   - From: `transaction@etsy.com OR emails@mail.etsy.com`
   - Subject: `("You made a sale on Etsy") OR ("congrats on your first sale") OR ("order details")`
   - Doesn’t have: `refund OR canceled OR cancelled OR shipped`
   - Action: Forward it to `etsy-sales@reply.tjm.art`
   - Keep a copy in the inbox (do not delete it)
4. Optional check: forward (or resend from Gmail) a past sale email to `etsy-sales@reply.tjm.art` after the rule is live. A print-only sale should change nothing. An original sale should mark that painting sold on tjm.art and take the Etsy listing down.

The Etsy shop login email can stay `tj@vermillionaurora.com`. Changing it is not required.
