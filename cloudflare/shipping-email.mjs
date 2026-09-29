// Reuses the commission form's authenticated Gmail identity. No customer email is sent.
const seller = 'tj@vermillionaurora.com';
const request = (url, options = {}) => fetch(url, {...options, signal:AbortSignal.timeout(20_000)});
const encode = bytes => {
  let text = '';
  for (let i = 0; i < bytes.length; i += 0x8000) text += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(text);
};
const utf8 = text => encode(new TextEncoder().encode(text));

export async function sellerMailToken(env) {
  const clientId = env.GOOGLE_CLIENT_ID?.trim(), clientSecret = env.GOOGLE_CLIENT_SECRET?.trim(), refreshToken = env.GOOGLE_REFRESH_TOKEN?.trim();
  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error('Seller email credentials are not configured');
  }
  const response = await request('https://oauth2.googleapis.com/token', {
    method:'POST', headers:{'Content-Type':'application/x-www-form-urlencoded'},
    body:new URLSearchParams({client_id:clientId,client_secret:clientSecret,
      refresh_token:refreshToken,grant_type:'refresh_token'})
  });
  const data = await response.json();
  if (!response.ok || !data.access_token) {
    const reason = ['invalid_client','invalid_grant','unauthorized_client','invalid_request','invalid_scope'].includes(data.error) ? data.error : 'unknown';
    throw new Error(`Seller email authorization failed (${response.status}: ${reason})`);
  }
  return data.access_token;
}

export function secureUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && !url.username && !url.password ? url.href : '';
  } catch { return ''; }
}

async function labelAttachment(url) {
  // The URL comes only from the authenticated Shippo transaction response.
  let response;
  for (let hop = 0; hop <= 4; hop++) {
    if (!secureUrl(url)) throw new Error('Label URL is not HTTPS');
    response = await request(url, {redirect:'manual'});
    if (![301,302,303,307,308].includes(response.status)) break;
    const location = response.headers.get('Location');
    await response.body?.cancel();
    if (!location || hop === 4) throw new Error('Label redirect limit');
    url = new URL(location,url).href;
  }
  if (!response.ok) throw new Error(`Label HTTP ${response.status}`);
  if (!response.body) throw new Error('Label download failed');
  const reader = response.body.getReader(), chunks = [];
  let length = 0;
  try {
    while (true) {
      const {done,value} = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > 5 * 1024 * 1024) throw new Error('Label PDF is too large');
      chunks.push(value);
    }
  } finally { await reader.cancel(); }
  const bytes = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
  if (new TextDecoder().decode(bytes.subarray(0,5)) !== '%PDF-') throw new Error('Label is not a PDF');
  return encode(bytes).match(/.{1,76}/g).join('\r\n');
}

export async function sendShippingEmail(token, sale, job) {
  const ready = job.status === 'ready';
  const integrationTest = job.mode === 'sandbox' && sale.integrationTest === true;
  const quote = job.quote, address = quote.address, parcel = quote.parcel;
  const bitcoin = sale.capture_id?.startsWith('btcpay:');
  const subject = `${job.mode === 'sandbox' ? '[TEST] ' : ''}${ready ? 'Shipping label ready' : 'Shipping needs attention'} — ${quote.title || sale.slug}`;
  let attachment = null, attachmentError = null;
  if (ready) {
    try { attachment = await labelAttachment(secureUrl(job.labelUrl)); }
    catch (error) {
      // Only fixed download errors/status codes may enter diagnostic logs.
      attachmentError = /^(Label HTTP [0-9]{3}|Label URL is not HTTPS|Label redirect limit|Label PDF is too large|Label is not a PDF)$/.test(error.message)
        ? error.message : 'Label download failed';
    }
  }
  const lines = [
    integrationTest ? 'INTEGRATION TEST — sample order, no PayPal charge. This label is not valid for shipping.' :
      job.mode === 'sandbox' ? 'TEST SALE — this label is not valid for shipping.' : 'Payment confirmed.', '',
    `Painting: ${quote.title || sale.slug}`, `Product: https://vermillionaurora.com/products/${sale.slug}/`,
    `${integrationTest ? 'Sample order' : bitcoin ? 'Bitcoin order' : 'PayPal order'}: ${sale.order_id}`, `${integrationTest ? 'Test reference' : bitcoin ? 'BTCPay invoice' : 'PayPal capture'}: ${sale.capture_id}`,
    `Painting: $${quote.base} | Shipping: $${quote.shipping} | Tax: $${quote.tax} | Total: $${quote.total}`, '',
    'Ship to:', address.name, address.street1, address.street2,
    `${address.city}, ${address.state} ${address.zip}`, address.country, '',
    `Service: ${quote.carrier} — ${quote.service}`,
    ...(quote.insurance ? [job.insuranceConfirmed
      ? `Insurance: $${quote.insurance.amount} ${quote.insurance.currency} requested through XCover; premium $${quote.insurance.fee} included in shipping. Insured rate confirmed on the label.`
      : `Insurance requested: $${quote.insurance.amount} ${quote.insurance.currency}. Coverage is not confirmed; review Shippo before shipping.`] : []),
    `Package: ${quote.packaging}, ${parcel.length} × ${parcel.width} × ${parcel.height} inches, ${parcel.weight} lb`, '',
    ...(ready ? [
      attachment ? 'Print the attached PDF at actual size (100%).' : 'Use the label download link below to print your label.',
      `Label: ${secureUrl(job.labelUrl)}`, `Tracking number: ${job.trackingNumber || 'See Shippo'}`,
      ...(secureUrl(job.trackingUrl) ? [`Tracking: ${secureUrl(job.trackingUrl)}`] : []),
      `Shippo transaction: ${job.transactionId}`
    ] : [
      job.reason, `Shippo reference: ${job.metadata || 'paypal-' + sale.capture_id}`,
      ...(job.transactionId ? [`Shippo transaction: ${job.transactionId}`] : []),
      'Open Shippo and check for an existing label before purchasing one manually.',
      'The automatic process will not attempt another label purchase for this order.'
    ])
  ].filter(line => line !== undefined && line !== null);
  const boundary = 'shipping_' + crypto.randomUUID().replaceAll('-', '');
  // Encode both subject and body so buyer-entered address text cannot inject MIME headers/parts.
  const parts = [
    `From: Vermilion Aurora Shipping <${seller}>`, `To: ${seller}`,
    `Subject: =?UTF-8?B?${utf8(subject)}?=`,
    `Message-ID: <shippo-${sale.capture_id.replace(/[^a-zA-Z0-9]/g,'')}-${job.status}@vermillionaurora.com>`,
    'MIME-Version: 1.0', `Content-Type: multipart/mixed; boundary="${boundary}"`, '',
    `--${boundary}`, 'Content-Type: text/plain; charset="UTF-8"', 'Content-Transfer-Encoding: base64', '',
    utf8(lines.join('\r\n')).match(/.{1,76}/g).join('\r\n')
  ];
  if (attachment) parts.push(`--${boundary}`, 'Content-Type: application/pdf; name="shipping-label.pdf"',
    'Content-Transfer-Encoding: base64', 'Content-Disposition: attachment; filename="shipping-label.pdf"', '', attachment);
  parts.push(`--${boundary}--`, '');
  const response = await request('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
    method:'POST', headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json'},
    body:JSON.stringify({raw:utf8(parts.join('\r\n')).replaceAll('+','-').replaceAll('/','_').replace(/=+$/,'')})
  });
  const result = await response.json();
  if (!response.ok || !result.id) throw new Error(`Seller email delivery failed (${response.status})`);
  return {id:result.id,pdfAttached:!!attachment,attachmentError};
}
