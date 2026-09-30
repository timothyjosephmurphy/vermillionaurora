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

// Observed on 2026-09-30: validate_product sends HTTP/status 404 and an empty
// status message even when every exact requested code has valid:true. Accept
// only that typed per-product result, never an auth error or an invalid code.
export function finerworksValidationEnvelope(path, httpStatus, data, body) {
  if(path!=='/v3/validate_product'||httpStatus!==404||data?.status?.status_code!==404||data.status.message!=='')return null;
  const codes=body?.skus_or_codes,values=data.product_validations;
  if(!Array.isArray(codes)||!codes.length||codes.length>50||new Set(codes).size!==codes.length||codes.some(c=>typeof c!=='string'||!/^[A-Za-z0-9._-]{1,160}$/.test(c)))return null;
  if(!Array.isArray(values)||values.length!==codes.length||!values.every(v=>row(v)&&v.valid===true))return null;
  if(!codes.every(code=>values.filter(v=>v.product_code===code||v.product_sku===code).length===1))return null;
  return {product_validations:values};
}
