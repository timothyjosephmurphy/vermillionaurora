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
  const status = data && typeof data.status === 'object' && data.status !== null ? data.status : {};
  const success = typeof status.success === 'boolean' ? status.success : null;
  const shapes = {};
  for (const key of ['status', 'Status', 'success', 'Success', 'media_types', 'style_types', 'prices', 'error', 'Message', 'message']) {
    if (data && Object.hasOwn(data, key)) shapes[key] = Array.isArray(data[key]) ? `array:${data[key].length}` : data[key] === null ? 'null' : typeof data[key];
  }
  return {
    endpoint: path,
    providerStatusCode: Number.isInteger(status.status_code) ? status.status_code : null,
    providerSuccess: success,
    successType: typeof status.success,
    referenceId: redact(status.reference_id),
    providerMessage: redact(status.message ?? data?.Message ?? data?.message),
    responseShape: shapes
  };
}
