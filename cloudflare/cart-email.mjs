import {sellerMailToken} from './shipping-email.mjs';
const encode=text=>{let s='';for(const b of new TextEncoder().encode(text))s+=String.fromCharCode(b);return btoa(s);};
export async function sendCartEmail(env,order,type) {
  const token=await sellerMailToken(env),review=type==='review',q=order.quote;
  const subject=review?'Art order needs review':`Your Vermillion Aurora order ${order.id.slice(0,8)}`;
  const body=review?`Order ${order.id}\n${order.reason}\nPayment: ${order.method}\nProvider reference: ${order.providerId||'Check by order ID'}\nDo not release inventory or ship until the payment is resolved.`:
    `Thank you for collecting my work. Your payment is confirmed.\n\nOrder: ${order.id}\n${q.items.map(i=>`${i.title} — $${i.amount} USD`).join('\n')}\n\nArtwork: $${q.base}\nShipping: $${q.shipping}\nTax: $${q.tax}\nTotal paid: $${q.total} USD\n\nShip to:\n${q.address.name}\n${q.address.street1}\n${q.address.street2||''}\n${q.address.city}, ${q.address.state} ${q.address.zip}\n\nOriginals are packed separately. Please reply with any questions.\n\nTJ Murphy\nhttps://vermillionaurora.com`;
  const mime=[`From: Vermillion Aurora <tj@vermillionaurora.com>`,`To: ${review?'tj@vermillionaurora.com':q.email}`,
    `Subject: =?UTF-8?B?${encode((order.mode==='sandbox'?'[TEST] ':'')+subject)}?=`,`Message-ID: <cart-${order.id}-${type}@vermillionaurora.com>`,
    'MIME-Version: 1.0','Content-Type: text/plain; charset=UTF-8','Content-Transfer-Encoding: base64','',encode(body)].join('\r\n');
  const response=await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send',{method:'POST',signal:AbortSignal.timeout(20000),headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json'},body:JSON.stringify({raw:encode(mime).replaceAll('+','-').replaceAll('/','_').replace(/=+$/,'')})});
  const result=await response.json();if(!response.ok||!result.id)throw Error('Order email needs review');return result.id;
}
