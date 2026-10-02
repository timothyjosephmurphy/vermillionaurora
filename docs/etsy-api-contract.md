# Etsy listing API contract review

Reviewed 2026-10-02 against the current official reference, OpenAPI schema, tutorials, and seller help. Scope: the owner-only five-painting draft flow, from authorization through images and inventory. This is not a claim that live Etsy acceptance or automated fulfillment has been verified.

## Sources

- [OpenAPI schema](https://www.etsy.com/openapi/generated/oas/3.0.0.json) and [API reference](https://developers.etsy.com/documentation/reference): endpoint fields, types, scopes, and enums.
- [Listings tutorial](https://developers.etsy.com/documentation/tutorials/listings/): draft/image/inventory sequence, numeric request prices, custom properties, variation dependencies, and product-count limits.
- [Processing profiles](https://developers.etsy.com/documentation/tutorials/migration/): readiness IDs on listings and offerings, `legacy=false`.
- [Authentication](https://developers.etsy.com/documentation/essentials/authentication/) and [request standards](https://developers.etsy.com/documentation/essentials/requests/): credentials, OAuth scopes, PKCE, refresh, and UTF-8.
- [Create a listing](https://help.etsy.com/hc/en-us/articles/115015628707-How-to-Create-a-Listing) and [tags](https://help.etsy.com/hc/en-gb/articles/360000336307-How-to-Use-Tags-to-Get-Found-in-Search): title/tag limits.
- [Calculated shipping](https://help.etsy.com/hc/en-us/articles/115013946647-How-to-Set-Up-Calculated-Shipping) and [shipping variations](https://help.etsy.com/hc/en-us/articles/115014115187-How-to-Set-Up-Shipping-Information): item measurements and the shared listing shipping configuration.
- [Image requirements](https://help.etsy.com/hc/en-us/articles/115015663347-Requirements-and-Best-Practices-for-Images-in-Your-Etsy-Shop) and [rate limits](https://developers.etsy.com/documentation/essentials/rate-limits/).

## Findings and enforcement

| Area | Requirement or observation | Implementation |
| --- | --- | --- |
| SKU | The live API rejected `/sku` over 32 characters. The downloaded schema only says string and does **not** encode this limit. | 27-character, artwork-specific aliases; exact provider codes retained separately. All 44 identities validated before writes. |
| Titles and tags | Title at most 140 characters; character restrictions; at most 13 tags, each at most 20 characters. | Validate length, characters, restricted punctuation, and comma-separated tag encoding. |
| Draft | Required physical-listing fields, shipping profile, and readiness ID. | Build all five complete payloads before the first write; preserve draft-only behavior. |
| Inventory | Requests use numeric prices, not response Money objects. Send the complete variation set; exclude response IDs/deletion fields. | Validate outgoing products and offerings. |
| Currency | Listing amounts use the shop's currency. | Verify the shop is USD before submitting the USD catalog amounts; do not silently convert or change shop settings. |
| Variations | Custom IDs 513 and 514 cover the two choices. Values cannot contain parentheses. Dependency arrays must match the fields that vary. | Validate property IDs, unique combinations, and SKU/price/quantity/readiness consistency. Explicit two-variation query parameter. |
| Processing profiles | Readiness IDs appear on each offering. Collection is paginated. | Apply the selected ID throughout and read subsequent pages when needed. |
| Production partner | The shop may return a public description instead of its private partner name. | Select and validate its saved ID, never infer identity from the name. |
| Shipping | Calculated profiles require four positive measurements and units; measurements belong to the listing. | Reuse existing paper/frame parcel estimates, retain owner overrides, and validate before writes. Largest framed option covers combined listings; smaller variants may be overestimated. |
| Return policy | A saved shop policy can be supplied by ID. | Validate the owner's selected ID; do not invent policy terms. |
| Images | Upload binary multipart data. WebP is absent from Etsy's documented formats. | This integration accepts JPEG/PNG, fetches before creating a new draft, and sets rank 1 with overwrite and bounded alt text. The 8 MB cap is our own limit, not an asserted Etsy limit. |
| Authorization | Shop reads and listing reads/writes require their respective scopes. | Existing `shops_r listings_r listings_w`, keystring:secret header, PKCE, state, refresh, and encrypted storage reviewed. No new scopes needed for this listing fix. |
| Rate limits | HTTP 429 supplies `retry-after`. | Stop the batch and show Etsy's wait interval. No immediate automatic write retry. |
| Retry | A POST with uncertain outcome must not be blindly repeated. | Preserve listing IDs and completed steps. Reuse the existing Warsaw draft/image after the SKU rejection. |

## SKU mapping and future fulfillment

The alias is `VA-` plus the first 24 hexadecimal characters of SHA-256 over `vermillion-etsy-sku-v1:` and the canonical print ID. It is stable across title, price, and provider-code changes. Collisions or repeated print identities abort validation.

Before any Etsy write, the private draft batch saves `skuMapVersion: 1` and a map from every alias to its `printId`, artwork ID, size, frame, and **complete** FinerWorks SKU. Future order processing must resolve this mapping and the approved print asset; it must not send the short alias directly to FinerWorks.

Order syncing is still separate work. Receipt reading and shipment updates need transaction scopes and a new owner authorization when those scopes are added. Idempotent fulfillment, paid-order verification, and address access must be completed before enabling automatic orders.

## Verification and remaining limits

Focused tests cover all real catalog combinations, the live 32-character regression, malformed request fields, validation before any listing write, SKU identity stability, saved-draft resume, profile pagination, shipping, and image rejection. These tests do not establish that every shop-specific restriction has been accepted by Etsy. Production deployment checks verify the Worker release; the authenticated owner retry confirms live listing acceptance.

Future API changes should update this contract and its tests from authoritative documentation and observed responses. Schema validation alone is insufficient because some enforced constraints, including the observed SKU limit, are omitted from the schema.
