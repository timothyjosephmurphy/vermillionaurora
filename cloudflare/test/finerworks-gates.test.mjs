import {env} from 'cloudflare:workers';
import {it,expect} from 'vitest';
import prints from '../print-catalog.mjs';
import {paymentMethods,publicCartItem} from '../cart-policy.mjs';
import {newPrintJob} from '../print-fulfillment.mjs';
it('FinerWorks quote work cannot accidentally accept payments or create a Prodigi job',()=>{
  const id='finerworks-gate-test',item={id,type:'print',provider:'finerworks',amount:'25.00',assetUrl:'private-print-master',productionCost:'7.00'};
  prints[id]=item;
  try {
    for(const mode of ['sandbox','live'])expect(paymentMethods({...env,PAYPAL_MODE:mode,PRINT_PROVIDER:'finerworks',PRINT_CHECKOUT_ENABLED:'true',PRINT_CHECKOUT_IDS:id,PRODIGI_API_KEY:'legacy',PRODIGI_ENV:mode},id)).toEqual([]);
    expect(()=>newPrintJob(env,{quote:{printQuote:{provider:'finerworks'}}},[item])).toThrow(/not been enabled/);
    expect(publicCartItem(item).assetUrl).toBeUndefined();expect(publicCartItem(item).productionCost).toBeUndefined();
  }finally{delete prints[id];}
});
