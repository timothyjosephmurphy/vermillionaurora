# Printful kiss-cut stickers

Studio-tracker #401. Vinyl kiss-cut stickers on the painting page, shipped by Printful to the customer with a TJ Murphy packing slip. This does not charge the customer and does not confirm a Printful order.

## Which Dawn painting

`painting-shoreline-at-dusk` is titled **El Zonte at Dawn**. That is the sticker. `el-zonte-before-dawn` is a different painting, **El Zonte Before Dawn**, and has no sticker control.

| Painting | Catalog id | Page |
| --- | --- | --- |
| El Zonte at Dawn | `painting-shoreline-at-dusk` | https://tjm.art/products/painting-shoreline-at-dusk/ |
| Honeybadger and Cub with Genesis Block | `honeybadger-and-cub-with-genesis-block` | https://tjm.art/products/honeybadger-and-cub-with-genesis-block/ |
| Warszawska Syrenka | `warszawska-syrenka` | https://tjm.art/products/warszawska-syrenka/ |
| Card-back art | `card-back` | Config hook only. `enabled: false` until an asset is chosen. No page. |

The map is `catalog/printful-stickers.json`. Product pages show **Order a sticker** beside **Buy a print** only for the enabled rows.

## Printful ids

Read from the public catalog `GET https://api.printful.com/products/358` on 2026-10-26. No token. These are catalog ids, not store product-template ids.

| | Id |
| --- | --- |
| Kiss-Cut Stickers (Stickers \| Kiss Cut \| White) | product `358` |
| 3 × 3 in | variant `10163` |
| 4 × 4 in | variant `10164` |
| 5.5 × 5.5 in | variant `10165` |
| 15 × 3.75 in | variant `16362` (not offered on the page) |

`printfulTemplateId` is `null` on the product and on each painting. Store template ids come from Printful’s product-template API and need `PRINTFUL_API_TOKEN`. TODO: after the token is in the Worker, confirm technique `digital` and placement `default` with `GET /v2/catalog-products/358`, create one template per painting, and fill `printfulTemplateId`. Leave `fileReady` false until the file is a print-ready PNG. The gallery JPEGs in the config are placeholders only.

The supplier prices in that JSON (`printfulBasePriceUsd`) are Printful’s catalog base prices. They are not the customer price and they are not shown on the page.

## Worker secrets

Set these on the checkout Worker `vermillion-commissions` (Cloudflare → Workers → Settings → Variables and Secrets, or Wrangler). Do not put them in git, GitHub Actions, or the site Worker.

| Name | Kind | Purpose |
| --- | --- | --- |
| `PRINTFUL_API_TOKEN` | Secret | Bearer token for `https://api.printful.com`. Absent means every sticker request stays a mock preview. |
| `PRINTFUL_STORE_ID` | Secret, optional | Sent as `X-PF-Store-Id` for an account-level token. Omit for a private store token. |
| `PRINTFUL_STICKERS_MODE` | Plain var | `mock` in `cloudflare/wrangler.jsonc` and `cloudflare/wrangler.sandbox.jsonc`. `draft` is the only other value this code honors. |

```bash
npx wrangler secret put PRINTFUL_API_TOKEN --config cloudflare/wrangler.jsonc
npx wrangler secret put PRINTFUL_STORE_ID --config cloudflare/wrangler.jsonc
```

Creating the Printful account and the token is the studio manager’s step, not this change.

The website Worker forwards `POST /checkout/stickers/order` and `GET /checkout/stickers/catalog` to `vermillion-commissions`. US addresses only (states and Washington, DC). Standard shipping. The packing slip name is TJ Murphy and the slip email is tj@tjm.art. The return address still comes from the Printful store settings (Settings → Stores → Returns). Set that to the studio before any real shipment. Printful’s own mark can still appear on the carrier label; the packing slip is the white-label piece this order sets.

## What an order does

`PRINTFUL_STICKERS_MODE=mock`, a missing token, or any other flag: the route returns a preview id and does not call Printful.

`draft` plus a token, while `fileReady` is false: `409`. Printful is not called.

`draft` plus a token, after a painting’s `fileReady` is true: one `POST https://api.printful.com/v2/orders`. Printful creates that order as a draft. This code never calls `POST /v2/orders/{id}/confirm`. A draft is not charged and is not picked up for fulfillment. A request that asks to confirm is rejected.

## Test-order steps

TJ has to approve before any paid sticker order. Do not confirm a draft in the Printful dashboard until then. Confirming charges the Printful wallet and ships the sticker.

1. Open one of the three product URLs. **Order a sticker** is next to **Buy a print**.
2. Submit a US address. With the committed `mock` flag, the page says it is a preview. Nothing is charged and Printful is not contacted.
3. `curl -sS -X POST https://tjm.art/checkout/stickers/order -H 'content-type: application/json' -d '{"productId":"painting-shoreline-at-dusk","variantId":"3x3","quantity":1,"recipient":{"name":"A Collector","email":"collector@example.com","address1":"123 Test St","city":"Seattle","state":"WA","zip":"98122","country":"US"}}'`
4. Expect `"mode":"mock"` and `"charged":false`.
5. Later, and only with TJ’s OK: put the token in the Worker, replace the placeholder file with a print-ready PNG, set that painting’s `fileReady` to true, and set `PRINTFUL_STICKERS_MODE` to `draft` on a non-production Worker first. The route will create an unconfirmed draft. Delete that draft in Printful, or `DELETE /v2/orders/{id}`, if it should not remain. Do not confirm it from the dashboard unless TJ has approved a paid test.
