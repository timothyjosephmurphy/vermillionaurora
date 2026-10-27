import stickers from './printful-stickers.json' with { type: 'json' };

export const stickerCatalog = stickers;

export const US_STATES = [
  ['AL', 'Alabama'], ['AK', 'Alaska'], ['AZ', 'Arizona'], ['AR', 'Arkansas'], ['CA', 'California'],
  ['CO', 'Colorado'], ['CT', 'Connecticut'], ['DE', 'Delaware'], ['DC', 'District of Columbia'], ['FL', 'Florida'],
  ['GA', 'Georgia'], ['HI', 'Hawaii'], ['ID', 'Idaho'], ['IL', 'Illinois'], ['IN', 'Indiana'],
  ['IA', 'Iowa'], ['KS', 'Kansas'], ['KY', 'Kentucky'], ['LA', 'Louisiana'], ['ME', 'Maine'],
  ['MD', 'Maryland'], ['MA', 'Massachusetts'], ['MI', 'Michigan'], ['MN', 'Minnesota'], ['MS', 'Mississippi'],
  ['MO', 'Missouri'], ['MT', 'Montana'], ['NE', 'Nebraska'], ['NV', 'Nevada'], ['NH', 'New Hampshire'],
  ['NJ', 'New Jersey'], ['NM', 'New Mexico'], ['NY', 'New York'], ['NC', 'North Carolina'], ['ND', 'North Dakota'],
  ['OH', 'Ohio'], ['OK', 'Oklahoma'], ['OR', 'Oregon'], ['PA', 'Pennsylvania'], ['RI', 'Rhode Island'],
  ['SC', 'South Carolina'], ['SD', 'South Dakota'], ['TN', 'Tennessee'], ['TX', 'Texas'], ['UT', 'Utah'],
  ['VT', 'Vermont'], ['VA', 'Virginia'], ['WA', 'Washington'], ['WV', 'West Virginia'], ['WI', 'Wisconsin'],
  ['WY', 'Wyoming'],
];

const publicVariant = (id, variant) => ({ id, label: variant.label, size: variant.size, catalogVariantId: variant.catalogVariantId });

export function stickerOffer(productId, catalog = stickers) {
  const painting = catalog.paintings[productId];
  if (!painting?.enabled) return null;
  const variants = painting.variantIds.map((id) => {
    const variant = catalog.variants[id];
    if (!variant?.offered) throw new Error(`Sticker variant ${id} is not offered`);
    return publicVariant(id, variant);
  });
  if (!variants.length) throw new Error(`Sticker painting ${productId} has no sizes`);
  return {
    productId,
    title: painting.title,
    path: painting.path,
    defaultVariantId: variants[0].id,
    variants,
  };
}

export function enabledStickerOffers(catalog = stickers) {
  return Object.keys(catalog.paintings).map((id) => stickerOffer(id, catalog)).filter(Boolean);
}
