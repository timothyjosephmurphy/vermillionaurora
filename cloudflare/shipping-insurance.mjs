// Shippo includes this premium in rate.amount; never add it a second time.
// https://docs.goshippo.com/shipments/shipping-insurance
const cents = value => typeof value === 'string' || typeof value === 'number'
  ? (/^\d+(?:\.\d{1,2})?$/.test(String(value)) ? Math.round(Number(value) * 100) : NaN) : NaN;
const id = value => typeof value === 'string' && /^[a-zA-Z0-9_-]+$/.test(value);

export function insuranceRequest(item) {
  if (!item.insuranceRequested) return null;
  if (item.currency !== 'USD' || !(cents(item.amount) > 0)) throw new Error('Invalid insured painting value');
  return {amount:Number(item.amount).toFixed(2),currency:'USD',content:`Original painting: ${item.title}`};
}

export function insuredShipmentMatches(shipment, insurance) {
  const actual = shipment?.extra?.insurance;
  return id(shipment?.object_id) && actual?.currency === insurance.currency &&
    cents(actual?.amount) === cents(insurance.amount) && actual?.content === insurance.content;
}

export function insuredRateMatches(rate, shipmentId) {
  const fee = cents(rate?.included_insurance_price), total = cents(rate?.amount);
  return id(rate?.object_id) && rate.shipment === shipmentId && rate.currency === 'USD' &&
    Number.isSafeInteger(fee) && fee >= 0 && Number.isSafeInteger(total) && total > 0 && fee <= total;
}

export async function verifyQuotedInsurance(env, quote) {
  if (!quote.insurance) return true;
  const insurance = quote.insurance;
  if (!id(quote.rateId) || !id(insurance.shipmentId) || !(cents(insurance.amount) > 0)) return false;
  const get = async path => {
    const response = await fetch(`https://api.goshippo.com/${path}/`, {
      headers:{Authorization:`ShippoToken ${env.SHIPPO_TOKEN}`,'SHIPPO-API-VERSION':'2018-02-08'},
      signal:AbortSignal.timeout(20_000)
    });
    if (!response.ok) throw new Error(`Insured shipping rate verification failed (${response.status})`);
    return response.json();
  };
  const rate = await get(`rates/${encodeURIComponent(quote.rateId)}`);
  if (rate.object_id !== quote.rateId || !insuredRateMatches(rate, insurance.shipmentId) ||
      cents(rate.amount) !== cents(quote.shipping) || cents(rate.included_insurance_price) !== cents(insurance.fee)) return false;
  const shipment = await get(`shipments/${encodeURIComponent(insurance.shipmentId)}`);
  return shipment.object_id === insurance.shipmentId && insuredShipmentMatches(shipment, insurance);
}

export function insuredTransactionMatches(transaction, quote) {
  const rate = transaction?.rate;
  if (typeof rate === 'string') return rate === quote.rateId;
  return rate?.object_id === quote.rateId && insuredRateMatches(rate, quote.insurance.shipmentId) &&
    cents(rate.amount) === cents(quote.shipping) && cents(rate.included_insurance_price) === cents(quote.insurance.fee);
}
