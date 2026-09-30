// Some FinerWorks v3 read endpoints return a bare list, while the published
// examples wrap that list with a status object. Normalize only typed read lists.
// Authentication and order responses never use this compatibility path.
const id = value => Number.isSafeInteger(value) && value >= 0;
const row = value => value !== null && typeof value === 'object' && !Array.isArray(value)
  && !Object.hasOwn(value, 'status') && !Object.hasOwn(value, 'error');
const contracts = new Map([
  ['/v3/list_mats', ['mats', value => row(value) && id(value.id) && typeof value.name === 'string']],
  ['/v3/validate_product', ['product_validations', value => row(value) && typeof value.valid === 'boolean' && (typeof value.product_code === 'string' || typeof value.product_sku === 'string')]],
  ['/v3/list_media_types', ['media_types', value => row(value) && id(value.id)
    && id(value.product_type_id) && typeof value.name === 'string'
    && Array.isArray(value.style_ids) && value.style_ids.every(id)]],
  ['/v3/list_style_types', ['style_types', value => row(value) && id(value.id)
    && typeof value.name === 'string' && typeof value.custom_sizing === 'boolean'
    && typeof value.allow_decimal === 'boolean' && typeof value.allow_rotate === 'boolean']],
  ['/v3/get_prices', ['prices', value => row(value) && Number.isSafeInteger(value.product_qty)
    && value.product_qty > 0 && (typeof value.product_code === 'string' || typeof value.product_sku === 'string')
    && typeof value.product_price === 'number' && Number.isFinite(value.product_price)
    && typeof value.total_price === 'number' && Number.isFinite(value.total_price)]]
]);
export function finerworksListEnvelope(path, data) {
  const contract = contracts.get(path);
  if (!contract || !Array.isArray(data) || data.length > 5000 || !data.every(contract[1])) return null;
  // Do not fabricate a provider success status. Callers still validate IDs,
  // size limits, exact requested product codes, quantities and positive prices.
  return {[contract[0]]: data};
}
