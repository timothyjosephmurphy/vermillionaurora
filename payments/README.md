# PayPal checkout setup

The site uses PayPal-hosted payment links. This requires no payment credentials or order API in the website. Until a link is configured, product pages keep their existing inquiry action and show no PayPal button.

## Merchant setup

1. Use a PayPal Business account. In PayPal, go to **Pay & Get Paid → Create Payment Links and Buttons**.
2. Create a fixed-price payment link for one original painting. Set the product name and USD amount exactly as shown on its product page. Set available stock to **one** and disable multiple quantities if offered. Configure shipping address, shipping charge, and tax appropriately in PayPal. Leave confirmation on PayPal; a browser return alone does not verify a payment.
3. Test the link's displayed title, currency, total, inventory behavior, and checkout options. Confirm a test transaction in PayPal Activity before offering a painting for immediate purchase.
4. Add an entry to `payments/paypal-links.json`, keyed by the product page slug:

```json
{
  "warszawska-syrenka": {
    "title": "Warszawska Syrenka",
    "amount": "1200.00",
    "currency": "USD",
    "url": "https://www.paypal.com/ncp/payment/PASTE-YOUR-REAL-ID"
  }
}
```

5. Publish the JSON after verifying its link belongs to the intended PayPal Business account. The button appears only if the product page is marked Available and the configured title and amount match its visible title and price. Production checkout accepts only live `paypal.com` payment links.
6. When a unique original sells, set its website availability to Sold **and** disable or mark the PayPal listing out of stock. An old link shared elsewhere may remain accessible even after the website button disappears. Confirm payment in PayPal before shipping; a redirect is not proof of payment.

## Product details source

Use the current product page title and price when creating a PayPal listing. The inventory titles and prices were synced to those product pages on September 28, 2026. The checkout button validates its configured price against the visible page price before appearing.

## Automatic sold status for the Chase Toole portrait

The `vermillion-commissions` Worker includes a PayPal IPN listener at:

`https://vermillion-commissions.timothyjosephmurphy.workers.dev/paypal-ipn`

It remains disabled until the merchant finishes the following setup. Do not put account credentials or tokens in this repository.

1. In the Cloudflare dashboard, open **Workers & Pages → vermillion-commissions → Settings → Variables and Secrets**. Add `GITHUB_TOKEN` as an encrypted secret: a fine-grained GitHub token limited to `timothyjosephmurphy/vermillionaurora` with **Contents: Read and write**. Add `PAYPAL_MERCHANT_ID` as the PayPal Business account's merchant ID. `PAYPAL_IPN_ENABLED=true` is set in the Worker configuration; `keep_vars` preserves other dashboard variables across GitHub builds. Keep the existing Gmail and R2 bindings intact. Confirm the new Worker deployment is active.
2. In PayPal Business account settings, enable **Instant Payment Notifications** and use the listener URL above as the Notification URL. IPN is account-wide, so unrelated transactions will be verified and ignored by this listener. Only the configured Chase Toole portrait is eligible for automatic inventory updates.
3. On the Chase Toole payment link, set **Quantity in stock: 1** and **do not allow out-of-stock purchases**. The website change happens after PayPal sends the notification and Cloudflare publishes the GitHub commit; PayPal must prevent another buyer from purchasing during that interval. The link itself remains shareable after the site removes its button.
4. Verify the item name in PayPal remains **Chase Toole Portrait** and the fixed price is **$20 USD**. A completed payment is matched by the verified IPN, your PayPal merchant ID, exact item name, USD currency, and an amount of at least $20 to allow shipping and tax. A pending or failed payment does not mark it sold.
5. Make a controlled end-to-end test before relying on automation: inspect the PayPal Activity transaction, IPN delivery history, Worker logs, the new GitHub commit, and the live product and gallery pages. PayPal retries failed IPN deliveries. If an actual sale happened before IPN was enabled, update the site manually; earlier events are not automatically backfilled.

On a matching completed payment, the Worker makes one atomic GitHub commit: inventory price becomes `0`, availability becomes `Sold`, the product page and its homepage/gallery cards show `Sold`, and the PayPal URL is removed from `paypal-links.json`. GitHub/Cloudflare deployment is asynchronous. The checkout script fetches the link map without browser caching. The existing inquiry link remains available on the sold product page.
