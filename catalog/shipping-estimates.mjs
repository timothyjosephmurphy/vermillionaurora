import {deriveParcel} from './shipping.mjs';

const GRAMS_PER_OUNCE = 28.349523125;
const SQUARE_METERS_PER_SQUARE_INCH = 0.00064516;

/**
 * Estimate the packed weight from artwork dimensions and the configured parcel type.
 *
 * Paper basis: one 300 gsm watercolor sheet, a same-size envelope with two
 * 180 gsm faces, and 10 g for the envelope flap/closure and shipping label.
 * Flat parcels add 4 oz for mailer protection; tube parcels add 4 oz per 12 in
 * of tube length. Framed parcels use 1 lb per square foot of outer parcel face
 * for frame/protection plus 8 oz of carton allowance. These are estimates, not
 * measured weights. Product-specific owner-approved profiles remain overrides.
 */
export function estimatePaperParcelWeightLb(product) {
  const {dimensions, checkout} = product;
  const shipping = checkout?.shipping;
  if (!dimensions || !shipping) throw new Error('Artwork dimensions and shipping profile are required');

  const areaM2 = dimensions.unit === 'cm'
    ? (dimensions.width * dimensions.height) / 10_000
    : dimensions.width * dimensions.height * SQUARE_METERS_PER_SQUARE_INCH;
  const paperEnvelopeGrams = areaM2 * (300 + (2 * 180)) + 10;
  const paperEnvelopeOunces = paperEnvelopeGrams / GRAMS_PER_OUNCE;
  const rollable = !(product.framing && !/unframed/i.test(product.framing));
  const parcel = deriveParcel(dimensions, 2, shipping.height, {rollable});

  if (product.framing && !/unframed/i.test(product.framing)) {
    const outerFaceSquareFeet = (parcel.length * parcel.width) / 144;
    const estimateOunces = paperEnvelopeOunces + (outerFaceSquareFeet * 16) + 8;
    return Math.ceil(estimateOunces / 16);
  }

  const packageAllowanceOunces = parcel.packaging === 'tube'
    ? Math.ceil(parcel.length / 12) * 4
    : 4;
  return Math.ceil(paperEnvelopeOunces + packageAllowanceOunces) / 16;
}
