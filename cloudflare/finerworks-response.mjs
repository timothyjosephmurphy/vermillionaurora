// Narrow, credential-redacted diagnostics. No raw bodies, headers, debug or account data.
export function finerworksFailureDetails(path, data, secrets = []) {
  const redact = value => {
    if (typeof value !== 'string') return null;
    let text = value;
    for (const secret of secrets.filter(v => typeof v === 'string' && v)) {
      for (const form of new Set([secret, encodeURIComponent(secret)])) text = text.split(form).join('[redacted]');
    }
    return text.replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, '[email redacted]').replace(/[\r\n\t]/g, ' ').slice(0, 400);
  };
  const kind = value => Array.isArray(value) ? `array:${value.length}` : value === null ? 'null' : typeof value;
  const shape = value => value && typeof value === 'object' && !Array.isArray(value) ? Object.fromEntries(Object.keys(value).filter(key => !/debug|account|credential|key|billing|customer|user/i.test(key)).slice(0, 40).map(key => [redact(key), kind(value[key])])) : {};
  const status = data && typeof data.status === 'object' && data.status !== null ? data.status : {};
  const success = typeof status.success === 'boolean' ? status.success : null;
  let encodedShape = null;
  if (typeof data === 'string') {
    try { const inner = JSON.parse(data); encodedShape = {kind:kind(inner),fields:shape(inner),firstItem:Array.isArray(inner)?shape(inner[0]):null}; } catch {}
  }
  const shapes = {};
  for (const key of ['status', 'Status', 'success', 'Success', 'media_types', 'style_types', 'prices', 'error', 'Message', 'message']) {
    if (data && Object.hasOwn(data, key)) shapes[key] = kind(data[key]);
  }
  return {
    ...(path==='/v3/validate_product'&&Array.isArray(data?.product_validations)?{validationErrors:data.product_validations.slice(0,50).map(v=>({code:typeof v.product_code==='string'&&/^[A-Za-z0-9._-]{1,160}$/.test(v.product_code)?v.product_code:null,valid:typeof v.valid==='boolean'?v.valid:null,message:redact(v.validation_message)}))}:{}),
    endpoint: path,
    providerStatusCode: Number.isInteger(status.status_code) ? status.status_code : null,
    providerSuccess: success,
    successType: typeof status.success,
    referenceId: redact(status.reference_id),
    providerMessage: redact(status.message ?? data?.Message ?? data?.message),
    responseShape: shapes,
    rootKind: kind(data),
    rootFields: shape(data),
    firstItemFields: Array.isArray(data) ? shape(data[0]) : null,
    envelopeFields: data && typeof data === 'object' && !Array.isArray(data) ? Object.fromEntries(Object.keys(data).filter(key => !/debug|account|credential|key|billing|customer|user/i.test(key)).slice(0, 12).map(key => [redact(key), shape(Array.isArray(data[key])?data[key][0]:data[key])])) : null,
    encodedShape
  };
}
