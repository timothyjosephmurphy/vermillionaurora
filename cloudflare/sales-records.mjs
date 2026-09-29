// Normalized accounting records. Never store OAuth tokens, payment instruments or raw provider payloads.
export const money = value => typeof value === 'string' && /^-?\d+(\.\d{1,2})?$/.test(value) ? Number(value).toFixed(2) : null;
const text = (value, limit=200) => typeof value === 'string' ? value.replace(/\0/g,'').slice(0,limit) : '';
const iso = value => value && Number.isFinite(Date.parse(value)) ? new Date(value).toISOString() : null;
export const monthOf = record => record.paidAt.slice(0,7);
export const ledgerFor = (env,record) => env.SALES_LEDGER.getByName(`${record.mode}:${monthOf(record)}`);

export function captureDetails(order) {
  const capture=order.purchase_units?.[0]?.payments?.captures?.[0];
  const breakdown=capture?.seller_receivable_breakdown;
  return {paidAt:iso(capture?.create_time),fee:money(breakdown?.paypal_fee?.value),net:money(breakdown?.net_amount?.value),
    feeCurrency:text(breakdown?.paypal_fee?.currency_code,3),netCurrency:text(breakdown?.net_amount?.currency_code,3),
    buyerName:text(order.payer?.name ? [order.payer.name.given_name,order.payer.name.surname].filter(Boolean).join(' ') : ''),
    buyerEmail:text(order.payer?.email_address,254)};
}
export function checkoutRecord(env,row,slug,job,details={},recordedAt=new Date().toISOString()) {
  const quote=job?.quote || {};
  return {schemaVersion:1,id:`payment:${row.capture_id}`,kind:'sale',mode:env.PAYPAL_MODE,source:'checkout',provider:details.provider || 'paypal',
    ...(details.provider==='btcpay'?{invoiceId:details.invoiceId,bitcoinPayments:details.bitcoinPayments || []}:{}),
    transactionId:row.capture_id,orderId:row.order_id,parentTransactionId:'',status:'COMPLETED',
    paidAt:details.paidAt || recordedAt,dateEstimated:!details.paidAt,recordedAt,
    slug,title:quote.title || slug,currency:'USD',itemAmount:money(quote.base),shipping:money(row.shipping),tax:money(row.tax),gross:money(row.total),
    paypalFee:details.fee ?? null,paypalNet:details.net ?? null,feeCurrency:details.feeCurrency||'',netCurrency:details.netCurrency||'',
    buyerName:details.buyerName || quote.address?.name || '',buyerEmail:details.buyerEmail || '',
    shippingAddress:quote.address || (row.destination ? JSON.parse(row.destination) : null),
    taxCalculationId:row.tax_calc_id || '',fulfillment:fulfillmentRecord(row,job)};
}
export function fulfillmentRecord(row,job) {
  return {inventoryPublished:!!row.published,taxRecorded:!!row.tax_recorded,labelStatus:job?.status || 'unavailable',
    carrier:job?.quote?.carrier || '',service:job?.quote?.service || '',shippoTransactionId:job?.transactionId || '',
    trackingNumber:job?.trackingNumber || '',insuranceAmount:job?.quote?.insurance?.amount || null,
    insuranceConfirmed:!!job?.insuranceConfirmed,insuranceFee:job?.quote?.insurance?.fee || null,
    emailId:job?.emailId || '',emailSentAt:job?.emailedAt ? new Date(job.emailedAt).toISOString() : null};
}
export function ipnRecord(env,fields) {
  const status=fields.get('payment_status');
  if(!['Completed','Refunded','Reversed','Canceled_Reversal'].includes(status))return null;
  const id=text(fields.get('txn_id'),100),currency=text(fields.get('mc_currency'),3),gross=money(fields.get('mc_gross'));
  if(!id || !/^[A-Z]{3}$/.test(currency) || gross===null)throw Error('Missing IPN accounting data');
  const date=iso(fields.get('payment_date')),now=new Date().toISOString();
  const fee=money(fields.get('mc_fee'));
  const shipping=money(fields.get('mc_shipping') || fields.get('shipping'));
  const tax=money(fields.get('tax'));
  return {schemaVersion:1,id:status==='Completed'?`payment:${id}`:`adjustment:${id}:${status}`,kind:status==='Completed'?'sale':'adjustment',
    mode:'live',source:'ipn',transactionId:id,orderId:'',parentTransactionId:text(fields.get('parent_txn_id'),100),status,
    paidAt:date||now,dateEstimated:!date,providerDate:text(fields.get('payment_date'),100),recordedAt:now,
    slug:'',title:text(fields.get('item_name1')||fields.get('item_name')||'PayPal payment — review item details'),currency,
    itemAmount:money(fields.get('mc_gross_1')),shipping,tax,gross,paypalFee:fee,
    paypalNet:fee===null?null:(Number(gross)-Number(fee)).toFixed(2),feeCurrency:fee===null?'':currency,netCurrency:fee===null?'':currency,
    buyerName:text([fields.get('first_name'),fields.get('last_name')].filter(Boolean).join(' ')),buyerEmail:text(fields.get('payer_email'),254),
    shippingAddress:{name:text(fields.get('address_name')),street1:text(fields.get('address_street')),city:text(fields.get('address_city')),
      state:text(fields.get('address_state')),zip:text(fields.get('address_zip')),country:text(fields.get('address_country_code'))}};
}

const columns=['paidAt','kind','status','title','slug','currency','itemAmount','shipping','tax','gross','paypalFee','feeCurrency','paypalNet','netCurrency',
  'provider','invoiceId','transactionId','orderId','parentTransactionId','source','dateEstimated','buyerName','buyerEmail','labelStatus','carrier','trackingNumber','shippoTransactionId','insuranceAmount','insuranceConfirmed','taxRecorded','inventoryPublished','emailSentAt'];
export function salesCsv(records) {
  const cell=value=>{
    let str=value==null?'':String(value);
    // Quoting alone does not stop spreadsheet formulas in buyer-controlled text.
    if(/^[\s]*[=+@-]/.test(str) && !/^-?\d+(\.\d+)?$/.test(str))str="'"+str;
    return '"'+str.replaceAll('"','""')+'"';
  };
  return '\uFEFF'+[columns.map(cell).join(','),...records.map(record=>columns.map(k=>cell(record[k]??record.fulfillment?.[k])).join(','))].join('\r\n')+'\r\n';
}
