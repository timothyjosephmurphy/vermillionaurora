import { ipnRecord, ledgerFor } from './sales-records.mjs';
import { legacyLinks } from './checkout-catalog.mjs';
const IPN_VERIFY = 'https://ipnpb.paypal.com/cgi-bin/webscr';

export async function handlePaypalIpn(request, env) {
  if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 });
  if (env.PAYPAL_IPN_ENABLED !== 'true' || !env.PAYPAL_MERCHANT_ID) {
    return new Response('Inventory listener is not configured', { status: 503 });
  }

  const raw = new Uint8Array(await request.arrayBuffer());
  if (!raw.length || raw.length > 32768) return new Response('Invalid message size', { status: 400 });

  try {
    // Send the unchanged form body, in its original order, back to PayPal.
    const prefix = new TextEncoder().encode('cmd=_notify-validate&');
    const verificationBody = new Uint8Array(prefix.length + raw.length);
    verificationBody.set(prefix);
    verificationBody.set(raw, prefix.length);
    const verification = await fetch(IPN_VERIFY, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'User-Agent': 'VermillionAurora-IPN/1.0' },
      body: verificationBody
    });
    if (!verification.ok) throw new Error('PayPal verification unavailable');
    if ((await verification.text()).trim() !== 'VERIFIED') {
      return new Response('Invalid notification', { status: 400 });
    }

    const fields = new URLSearchParams(new TextDecoder().decode(raw));
    if (fields.get('receiver_id') !== env.PAYPAL_MERCHANT_ID) return new Response('Wrong merchant', { status: 400 });
    if (fields.get('test_ipn') === '1') return new Response('Sandbox notification', { status: 400 });
    const record=ipnRecord(env,fields);
    if(!record)return new Response('Ignored',{status:200});
    if(!env.SALES_LEDGER)throw Error('Sales ledger is not configured');
    // Record every verified merchant payment even when no inventory link matches.
    // A failed write receives 503 so PayPal retries; never acknowledge and lose it.
    await ledgerFor(env,record).record(record);
    if(fields.get('payment_status')!=='Completed')return new Response('Recorded',{status:200});
    const isCart = fields.get('txn_type') === 'cart';
    const nameKey = isCart ? 'item_name1' : 'item_name';
    if (fields.get('mc_currency') !== 'USD' || !single(fields, 'txn_id') || !single(fields, nameKey) ||
        (isCart && fields.has('item_name') && fields.get('item_name') !== fields.get(nameKey))) {
      return new Response('Missing transaction data', { status: 400 });
    }
    if (['quantity', 'quantity1'].some(key => fields.has(key) && fields.get(key) !== '1') ||
        (fields.has('num_cart_items') && fields.get('num_cart_items') !== '1')) {
      return new Response('Unexpected quantity', { status: 400 });
    }

    const sale=Object.entries(legacyLinks).find(([,item])=>item.autoInventory===true && item.paypalTitle===fields.get(nameKey) && item.currency==='USD');
    if(!sale)return new Response('Recorded',{status:200});
    const [slug,item]=sale,gross=Number(fields.get('mc_gross'));
    if(!Number.isFinite(gross)||gross<Number(item.amount)||Number(item.amount)<=0)return new Response('Amount below item price',{status:400});
    const stock=env.PAINTING_STOCK.getByName(slug);
    await stock.initialize(slug);
    if(!await stock.recordExternalSale(fields.get('txn_id')))throw Error('Inventory conflict requires reconciliation');
    return new Response('OK');
  } catch (error) {
    console.error('Inventory notification failed:', error.message);
    // PayPal retries non-2xx IPN deliveries. Never acknowledge a failed write.
    return new Response('Retry later', { status: 503 });
  }
}

function single(params, key) {
  return params.getAll(key).length === 1 && Boolean(params.get(key));
}
