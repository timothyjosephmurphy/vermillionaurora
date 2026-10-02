const weightUnits = new Set(['oz', 'lb', 'g', 'kg']);
const dimensionUnits = new Set(['in', 'ft', 'mm', 'cm', 'm', 'yd', 'inches']);
const measurements = ['item_weight', 'item_length', 'item_width', 'item_height'];

export function estimateShippingPackages(works) {
  return Object.fromEntries(works.map(work => {
    const unframed = [], framed = [];
    for (const size of work.variants) {
      const weight = estimatePaperParcelWeightLb({dimensions: size.paperSize, checkout: {shipping: {height: 2}}});
      unframed.push(deriveParcel(size.paperSize, weight, 2));
      for (const frame of size.frames) {
        const weight = estimatePaperParcelWeightLb({dimensions: frame.outerSize, framing: 'Framed', checkout: {shipping: {height: 2}}});
        framed.push(deriveParcel(frame.outerSize, weight, 2, {rollable: false}));
      }
    }
    // A listing has one shipping profile for all variations. Use the largest
    // framed parcel when frames are offered, and the existing paper parcel otherwise.
    const parcels = framed.length ? framed : unframed;
    if (!parcels.length) throw Error('No print dimensions are available to estimate shipping for ' + work.title + '.');
    return [work.id, {
      item_weight: Math.max(...parcels.map(p => p.weight)),
      item_length: Math.max(...parcels.map(p => p.length)),
      item_width: Math.max(...parcels.map(p => p.width)),
      item_height: Math.max(...parcels.map(p => p.height)),
      item_weight_unit: 'lb',
      item_dimensions_unit: 'in'
    }];
  }));
}

export function shippingChoice(profile) {
  const profileType = ['manual', 'calculated'].includes(profile.profile_type) ? profile.profile_type : 'unknown';
  const label = profileType === 'calculated' ? 'Calculated — estimates provided' : profileType === 'manual' ? 'Fixed rate' : 'Shipping type unavailable';
  return {id: profile.shipping_profile_id, name: (profile.title || 'Shipping profile ' + profile.shipping_profile_id) + ' · ' + label, profileType};
}

// Etsy stores these measurements per listing, not per size or frame variation.
export function shippingPackages(profileType, input, works) {
  if (profileType === 'manual') return null;
  if (profileType !== 'calculated') throw Error('Etsy did not identify this shipping profile as fixed rate or calculated. Reload setup or choose another profile.');
  const estimates = estimateShippingPackages(works);
  const result = {};
  for (const work of works) {
    const values = {...estimates[work.id], ...input?.[work.id]};
    const fields = {};
    for (const key of measurements) {
      const value = values?.[key];
      if (!['string', 'number'].includes(typeof value) || !Number.isFinite(Number(value)) || Number(value) <= 0) {
        throw Error('Calculated shipping requires a positive item weight, length, width, and height for ' + work.title + '. Keep the estimate, enter a measured value, or choose a fixed-rate shipping profile.');
      }
      fields[key] = Number(value);
    }
    if (!weightUnits.has(values.item_weight_unit) || !dimensionUnits.has(values.item_dimensions_unit)) {
      throw Error('Choose valid weight and dimension units for ' + work.title + '.');
    }
    fields.item_weight_unit = values.item_weight_unit;
    fields.item_dimensions_unit = values.item_dimensions_unit;
    result[work.id] = fields;
  }
  return result;
}
import {estimatePaperParcelWeightLb} from '../catalog/shipping-estimates.mjs';
import {deriveParcel} from '../catalog/shipping.mjs';
