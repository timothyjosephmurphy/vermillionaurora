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

## Price audit before adding links

The inventory data and visible product pages currently disagree for these available paintings. Resolve each discrepancy before creating its PayPal listing:

| Product slug | Product page | Inventory JSON |
| --- | ---: | ---: |
| `painting-portrait-with-hat` | $3,000 | $1,200 |
| `painting-portrait-in-green` | $200 | $400 |
| `painting-insect-garden` | $1,000 | $3,000 |
| `painting-emergence` | $1,000 | $3,000 |
| `painting-twin-dragons` | $1,000 | $3,000 |
| `paul-murphy-painting-1` | $300 | $25 |

The payment button validates against the visible product page price, but stale inventory data can still cause incorrect purchase-inquiry messages.
