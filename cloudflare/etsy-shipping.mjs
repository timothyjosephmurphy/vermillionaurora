const weightUnits = new Set(['oz', 'lb', 'g', 'kg']);
const dimensionUnits = new Set(['in', 'ft', 'mm', 'cm', 'm', 'yd', 'inches']);
const measurements = ['item_weight', 'item_length', 'item_width', 'item_height'];

export function shippingChoice(profile) {
  const profileType = ['manual', 'calculated'].includes(profile.profile_type) ? profile.profile_type : 'unknown';
  const label = profileType === 'calculated' ? 'Calculated — item measurements required' : profileType === 'manual' ? 'Fixed rate' : 'Shipping type unavailable';
  return {id: profile.shipping_profile_id, name: (profile.title || 'Shipping profile ' + profile.shipping_profile_id) + ' · ' + label, profileType};
}

// Etsy stores these measurements per listing, not per size or frame variation.
export function shippingPackages(profileType, input, works) {
  if (profileType === 'manual') return null;
  if (profileType !== 'calculated') throw Error('Etsy did not identify this shipping profile as fixed rate or calculated. Reload setup or choose another profile.');
  const result = {};
  for (const work of works) {
    const values = input?.[work.id];
    const fields = {};
    for (const key of measurements) {
      const value = values?.[key];
      if (!['string', 'number'].includes(typeof value) || !Number.isFinite(Number(value)) || Number(value) <= 0) {
        throw Error('Calculated shipping requires a positive item weight, length, width, and height for ' + work.title + '. Enter the measured values or choose a fixed-rate shipping profile.');
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
