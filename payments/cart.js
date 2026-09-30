/* Anonymous cart: only IDs/quantities and opaque order access keys persist locally.
   Prices, availability, reservations and totals always come from the server. */
(() => {
  const API='https://vermillion-commissions.timothyjosephmurphy.workers.dev/checkout/cart';
  const CART='va-cart-v1',ATTEMPT='va-cart-order-v1',MAX=12;
  const read=key=>{try{return JSON.parse(localStorage.getItem(key));}catch{return null;}};
  const write=(key,value)=>{try{if(value===null)localStorage.removeItem(key);else localStorage.setItem(key,JSON.stringify(value));return true;}catch{return false;}};
  const clean=value=>Array.isArray(value)?[...new Map(value.filter(x=>x&&/^[a-z0-9-]+$/.test(x.id||'')&&Number.isSafeInteger(x.quantity)&&x.quantity>=1&&x.quantity<=(x.id.startsWith('print-')?10:1)).map(x=>[x.id,{id:x.id,quantity:x.quantity}])).values()].slice(0,MAX):[];
  let cart=clean(read(CART)),meta={},capabilities=null,busy=false,quoted=null,current=null,timer,buyOnly=null;
  const node=(tag,text,cls)=>{const el=document.createElement(tag);if(text!==undefined)el.textContent=text;if(cls)el.className=cls;return el;};
  const money=value=>`$${Number(value).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}`;
  const api=async(action,body)=>{
    const response=await fetch(`${API}/${action}`,body?{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body),signal:AbortSignal.timeout(60000)}:{cache:'no-store',signal:AbortSignal.timeout(15000)});
    const value=await response.json();if(!response.ok)throw Error(value.error||'Checkout is temporarily unavailable.');return value;
  };
  const capabilitiesPromise=api('catalog').catch(()=>null);
  window.vaCartReady=capabilitiesPromise;
  const counts=()=>document.querySelectorAll('[data-cart-count]').forEach(el=>{const count=(buyOnly?clean(read(CART)):cart).reduce((n,i)=>n+i.quantity,0);el.textContent=String(count);el.closest('a')?.setAttribute('aria-label',`Cart, ${count} item${count===1?'':'s'}`);});
  function saveCart(){if(buyOnly){const rest=clean(read(CART)).filter(i=>i.id!==buyOnly);write(CART,[...rest,...cart]);}else write(CART,cart);counts();document.dispatchEvent(new CustomEvent('cart:changed'));}
  const methodIntersection=()=>['paypal','bitcoin'].filter(m=>cart.length&&cart.every(line=>capabilities?.products.find(p=>p.id===line.id)?.methods.includes(m)));
  const eligible=id=>capabilities?.enabled&&capabilities.products.find(p=>p.id===id&&p.status==='available');
  const pending=d=>d&&!['quoted','paid','cancelled','expired','unavailable','missing'].includes(d.status);
  document.addEventListener('DOMContentLoaded',async()=>{
    const nav=document.querySelector('.main-nav');
    if(nav&&!nav.querySelector('[data-cart-link]')){const a=node('a',undefined,'cart-nav');a.href='/cart/';a.dataset.cartLink='';a.append(node('span','Cart'));const count=node('span',String(cart.length),'cart-count');count.dataset.cartCount='';a.append(count);nav.append(a);}counts();
    const root=document.querySelector('[data-cart-page]');
    capabilities=await capabilitiesPromise;
    if(root) {
      try{const r=await fetch('/catalog/products.json');const data=await r.json();meta=Object.fromEntries([...data.products,...(data.prints||[])].map(p=>[p.id,p]));}catch{}
      initializePage(root);
    }
    const slug=location.pathname.match(/^\/products\/([a-z0-9-]+)\/?$/)?.[1];
    const area=document.querySelector('[data-cart-product]');
    // Preserve old payment return handlers, including outstanding Bitcoin invoices.
    let legacyBitcoin;try{legacyBitcoin=sessionStorage.getItem(`bitcoin-order:${slug}`);}catch{}
    if(area&&eligible(slug)&&!new URLSearchParams(location.search).has('checkout')&&!new URLSearchParams(location.search).has('bitcoin')&&!legacyBitcoin) {
      area.hidden=false;
      const add=area.querySelector('[data-cart-add]'),buy=area.querySelector('[data-cart-buy]'),message=area.querySelector('[data-cart-added]');
      const update=()=>{add.textContent=cart.some(i=>i.id===slug)?'Added to cart':'Add to cart';};update();
      const addItem=()=>{
        if(!cart.some(i=>i.id===slug)){if(cart.length>=MAX){message.textContent=`Your cart holds up to ${MAX} different items.`;return false;}cart.push({id:slug,quantity:1});saveCart();}
        update();message.replaceChildren(node('span','Added. '));const view=node('a','View your cart');view.href='/cart/';view.className='cart-text-link';message.append(view);return true;
      };
      add.addEventListener('click',addItem);
      buy.addEventListener('click',()=>{if(addItem())location.assign(`/cart/?buy=${encodeURIComponent(slug)}`);});
      document.addEventListener('catalog:availability',e=>{if(e.detail?.[slug]&&e.detail[slug]!=='available'){add.disabled=true;buy.disabled=true;message.textContent='This original is currently reserved or sold.';}});
    }
    window.addEventListener('storage',event=>{if(event.key===CART){cart=clean(read(CART));counts();if(root&&!busy&&!pending(current)){invalidate();render();}}});
  });
  document.addEventListener('cart:add-print',event=>{
    const {id,quantity,onResult}=event.detail||{},product=eligible(id);
    const respond=(ok,message)=>typeof onResult==='function'&&onResult({ok,message});
    if(!product||product.type!=='print'||!Number.isSafeInteger(quantity)||quantity<1||quantity>10)return respond(false,'This print selection is unavailable.');
    if(product.sampleOnly){
      if(quantity!==1)return respond(false,'Choose one copy of each sample.');
      cart=cart.filter(i=>!capabilities.products.some(p=>p.id===i.id&&p.sampleOnly&&p.productId===product.productId));
    }
    const existing=cart.find(i=>i.id===id);
    if(existing&&existing.quantity+quantity>10)return respond(false,'Your cart can hold up to 10 copies of this print.');
    if(!existing&&cart.length>=MAX)return respond(false,`Your cart holds up to ${MAX} different items.`);
    if(existing)existing.quantity+=quantity;else cart.push({id,quantity});saveCart();respond(true,'Print added to your cart.');
  });
  let root,notice,layout,orderPanel,form;
  function announce(text){notice.textContent=text;}
  function invalidate(){quoted=null;root.querySelector('[data-cart-payments]').hidden=true;root.querySelector('[data-cart-shipping]').textContent='Calculated below';root.querySelector('[data-cart-tax]').textContent='Calculated below';root.querySelector('[data-cart-total]').textContent='—';}
  function render(){
    const list=root.querySelector('[data-cart-items]');list.replaceChildren();
    let subtotal=0,invalid=false;
    for(const line of cart){
      const p=meta[line.id],live=capabilities?.products.find(p=>p.id===line.id),isPrint=(live?.type||p?.type)==='print',details=live||p,amount=live?.amount||p?.amount||p?.listing?.price?.amount;
      if(amount)subtotal+=Number(amount)*line.quantity;
      const row=node('article',undefined,'cart-line'),link=node('a');link.href=`/products/${details?.productId||line.id}/`;
      if(p?.image||details?.preview){const img=node('img');img.src=(p?.image||details.preview).src;img.alt=p?.title||details.title;link.append(img);}row.append(link);
      const info=node('div'),title=node('h2'),titleLink=node('a',p?.title||live?.title||'Unavailable artwork');titleLink.href=link.href;title.append(titleLink);info.append(title,node('p',isPrint?`Fine-art print · Image ${details.imageSize.width} × ${details.imageSize.height} in · Paper ${details.paperSize.width} × ${details.paperSize.height} in${details.mat?` · ${details.mat.name} · Mat / frame ${details.mat.outer.width} × ${details.mat.outer.height} in`:""}`:'Original artwork · Quantity 1'),node('p',amount?money(Number(amount)*line.quantity):'Price unavailable','cart-line-price'));
      if(isPrint&&details.frame)info.append(node('p',`${details.frame.name} frame · ${details.frame.glazing.name} acrylic · Assembled by FinerWorks`,'cart-frame-description'));
      if(!eligible(line.id)){invalid=true;info.append(node('p',live?.status==='sold'?'Sold':live?.status==='reserved'?'Temporarily reserved':'Checkout unavailable — please inquire','cart-line-unavailable'));}
      if(details?.sampleOnly)info.append(node('p','Low-resolution sample · Real printed order · One copy','cart-footnote'));
      if(isPrint&&!details.sampleOnly){const label=node('label','Quantity '),quantity=node('input');quantity.type='number';quantity.min='1';quantity.max='10';quantity.step='1';quantity.value=String(line.quantity);quantity.setAttribute('aria-label',`Quantity of ${details.title}`);quantity.style.width='70px';quantity.addEventListener('change',()=>{const n=Number(quantity.value);if(!Number.isSafeInteger(n)||n<1||n>10){quantity.value=String(line.quantity);announce('Choose between 1 and 10 copies.');return;}line.quantity=n;saveCart();invalidate();render();});label.append(quantity);info.append(label);}const remove=node('button','Remove','cart-text-link');remove.type='button';remove.setAttribute('aria-label',`Remove ${p?.title||live?.title||'artwork'}`);remove.addEventListener('click',()=>{cart=cart.filter(i=>i.id!==line.id);saveCart();invalidate();render();announce('Artwork removed from your cart.');});info.append(remove);row.append(info);list.append(row);
    }
    root.querySelector('[data-cart-subtotal]').textContent=money(subtotal);
    const active=!!current&&(pending(current)||current.status==='paid');
    layout.hidden=!cart.length||active;root.querySelector('[data-cart-empty]').hidden=!!cart.length||active;
    form.querySelector('[data-cart-quote]').disabled=invalid||!capabilities?.enabled||!methodIntersection().length;
    if(!active)announce(!capabilities?'Availability could not be verified. Please refresh before checkout.':!capabilities.enabled?'Cart checkout is not available yet. Please contact TJ to arrange a purchase.':invalid?'Please remove unavailable items before checking out.':cart.length&&!methodIntersection().length?'These artworks do not share a payment method. Please contact TJ.':'');
  }
  function showQuote(q){
    quoted=q;root.querySelector('[data-cart-shipping]').textContent=money(q.quote.shipping);root.querySelector('[data-cart-tax]').textContent=money(q.quote.tax);root.querySelector('[data-cart-total]').textContent=money(q.quote.total);
    const buttons=root.querySelector('[data-cart-methods]');buttons.replaceChildren();
    for(const method of q.methods){const button=node('button',method==='paypal'?'Continue with PayPal':'Pay with Bitcoin / Lightning','button button-solid');button.type='button';button.addEventListener('click',()=>startPayment(method));buttons.append(button);}
    root.querySelector('[data-cart-payments]').hidden=false;
  }
  const credentials=()=>({orderId:current.orderId,key:current.key});
  function remember(q){const value={orderId:q.orderId,key:q.key};if(!write(ATTEMPT,value))throw Error('Your browser could not save this checkout. Enable site storage before continuing.');}
  async function startPayment(method){
    if(busy||!quoted)return;busy=true;setDisabled(true);announce('Checking your items and preparing payment…');
    try{
      remember(quoted);current={...quoted,status:'creating',method};
      const result=await api('start',{...credentials(),method});current={...result,key:current.key};showOrder();
      if(result.url&&result.status==='pending'){location.assign(result.url);return;}
      poll();
    }catch(error){announce(error.message);if(current){showOrder();poll();}}
    finally{busy=false;setDisabled(false);}
  }
  function setDisabled(value){form.querySelectorAll('input,button').forEach(el=>el.disabled=value);root.querySelectorAll('[data-cart-methods] button').forEach(el=>el.disabled=value);root.querySelectorAll('[data-cart-items] button, [data-cart-items] input').forEach(el=>el.disabled=value);}
  const messages={quoted:['Ready to check out','Enter your delivery details to calculate a fresh total.'],reserving:['Reserving your originals','Please keep this page open while we confirm availability.'],creating:['Preparing your payment','We are checking with the payment provider. Please wait before starting another order.'],pending:['Payment pending','Continue to the secure payment page, or check here after paying.'],capturing:['Confirming your payment','Your originals remain reserved while we confirm payment. Please do not pay again.'],processing:['Bitcoin payment received','Waiting for payment confirmation. Your originals remain reserved.'],settling:['Confirming your order','Your payment has been received. We are updating the inventory.'],paid:['Thank you for collecting my work.','Your payment is confirmed. Prints ship from the print lab, separately from any originals.'],expired:['Checkout expired','Your cart has been kept. Review availability and begin a new checkout when ready.'],cancelled:['Checkout cancelled','Your cart has been kept. No payment was captured through this checkout.'],unavailable:['An original is no longer available','No payment was started. Return to your cart to review availability.'],review:['Your payment needs a closer look','TJ will review this order. Please do not pay again. Contact tj@vermillionaurora.com with the order reference below.'],missing:['Order not found','Please contact TJ if you have already paid.']};
  function showOrder(){
    if(!current)return;orderPanel.hidden=false;layout.hidden=true;root.querySelector('[data-cart-empty]').hidden=true;
    const message=messages[current.status]||['Checking your order','Please wait.'];root.querySelector('#order-title').textContent=message[0];root.querySelector('[data-order-message]').textContent=message[1];root.querySelector('[data-order-reference]').textContent=`Order reference: ${current.orderId}`;
    const items=root.querySelector('[data-order-items]');items.replaceChildren();for(const i of current.quote?.items||[]){const row=node('div',undefined,'cart-order-item');row.append(node('span',`${i.title}${i.quantity>1?` × ${i.quantity}`:''}`),node('span',money(Number(i.amount)*i.quantity)));items.append(row);}
    const breakdown=root.querySelector('[data-order-breakdown]');breakdown.replaceChildren();if(current.quote)for(const [label,value] of [['Artwork',current.quote.base],['Shipping',current.quote.shipping],['Tax',current.quote.tax]]){const line=node('div');line.append(node('dt',label),node('dd',money(value)));breakdown.append(line);}
    root.querySelector('[data-order-total]').textContent=current.quote?`${current.status==='paid'?'Total paid':'Order total'}: ${money(current.quote.total)} USD · Includes shipping and tax`:'';
    const resume=root.querySelector('[data-order-resume]');resume.hidden=!(current.url&&['pending','processing'].includes(current.status));if(!resume.hidden)resume.href=current.url;
    root.querySelector('[data-order-cancel]').hidden=current.method!=='paypal'||current.status!=='pending';
    root.querySelector('[data-order-check]').hidden=['paid','expired','cancelled','unavailable','missing','quoted'].includes(current.status);
    root.querySelector('[data-order-back]').hidden=pending(current);root.querySelector('[data-order-print]').hidden=current.status!=='paid';
    if(current.status==='paid'){const saved=read(ATTEMPT);if(!saved?.cartAdjusted){const purchased=new Map(current.quote.items.map(i=>[i.id,i.quantity]));cart=clean(read(CART)).map(i=>({...i,quantity:i.quantity-(purchased.get(i.id)||0)})).filter(i=>i.quantity>0);buyOnly=null;saveCart();write(ATTEMPT,{orderId:current.orderId,key:current.key,cartAdjusted:true});}const tracking=root.querySelector('[data-order-tracking]');if(tracking){tracking.replaceChildren();if(current.printStatus)tracking.append(node('p',`Print fulfillment: ${{'in-production':'In production',complete:'Shipped',pending:'Preparing your print order',creating:'Preparing your print order',review:'TJ is reviewing your print order',cancelled:'TJ is reviewing your print order'}[current.printStatus]||'Processing'}`));for(const shipment of current.shipments||[]){if(shipment.trackingUrl&&/^https:\/\//.test(shipment.trackingUrl)){const link=node('a',`Track shipment${shipment.trackingNumber?' '+shipment.trackingNumber:''}`);link.href=shipment.trackingUrl;link.target='_blank';link.rel='noopener noreferrer';tracking.append(link);}}}announce('');}
  }
  async function updateOrder(action='status'){
    if(!current||busy)return;busy=true;root.querySelector('[data-order-check]').disabled=true;
    try{const result=await api(action,credentials());current={...result,key:current.key};showOrder();announce('');if(pending(current)&&current.status!=='review')poll();}
    catch(error){announce(error.message);poll();}
    finally{busy=false;root.querySelector('[data-order-check]').disabled=false;}
  }
  function poll(){clearTimeout(timer);if(!document.hidden)timer=setTimeout(()=>updateOrder(),6000);}
  async function initializePage(el){
    root=el;notice=root.querySelector('[data-cart-notice]');layout=root.querySelector('[data-cart-layout]');orderPanel=root.querySelector('[data-order-panel]');form=root.querySelector('[data-cart-form]');
    const params=new URLSearchParams(location.search),buy=params.get('buy');
    // Buy now is a one-item checkout; existing cart contents remain for a later order.
    if(buy&&eligible(buy)&&eligible(buy).type!=='print'){buyOnly=buy;cart=[{id:buy,quantity:1}]; /* view only; do not overwrite a saved multi-item cart */}
    form.addEventListener('input',()=>{if(quoted)invalidate();});
    form.addEventListener('submit',async event=>{
      event.preventDefault();if(busy||!form.reportValidity())return;busy=true;setDisabled(true);announce('Calculating shipping and tax…');
      const values=Object.fromEntries(new FormData(form));
      // FormData omits disabled controls; collect from named elements explicitly.
      for(const input of form.querySelectorAll('input[name]'))values[input.name]=input.value.trim();
      const {email,...address}=values;
      try{const q=await api('quote',{items:cart,address,email,catalogVersion:capabilities.version});showQuote(q);announce('Your total is ready. Choose a payment method below.');}
      catch(error){announce(error.message);invalidate();}
      finally{busy=false;setDisabled(false);}
    });
    root.querySelector('[data-order-check]').addEventListener('click',()=>updateOrder());root.querySelector('[data-order-cancel]').addEventListener('click',()=>updateOrder('cancel'));
    root.querySelector('[data-order-print]').addEventListener('click',()=>window.print());
    root.querySelector('[data-order-back]').addEventListener('click',async()=>{
      write(ATTEMPT,null);current=null;quoted=null;buyOnly=null;clearTimeout(timer);orderPanel.hidden=true;history.replaceState(null,'','/cart/');cart=clean(read(CART));
      try{capabilities=await api('catalog');}catch{capabilities=null;}invalidate();render();root.querySelector('h1').focus();
    });
    const saved=read(ATTEMPT),id=params.get('order');
    if(id&&(!saved||saved.orderId!==id)){render();announce('This order belongs to another browser session. Please contact TJ with your order reference if you have paid.');return;}
    if(saved){
      current=saved;try{const result=await api('status',saved);current={...result,key:saved.key};
        if(result.status==='quoted'&&!id){current=null;write(ATTEMPT,null);render();}
        else {showOrder();if(params.get('result')==='return')await updateOrder('capture');else if(params.get('result')==='cancel')await updateOrder('cancel');else if(pending(current))poll();}
      }catch(error){showOrder();announce(error.message);poll();}
      history.replaceState(null,'','/cart/');
    }else render();
    document.addEventListener('visibilitychange',()=>{if(!document.hidden&&pending(current))updateOrder();});
  }
})();
