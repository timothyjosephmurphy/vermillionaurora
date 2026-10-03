/* Anonymous cart: only IDs/quantities and opaque order access keys persist locally.
   Prices, availability, reservations and totals always come from the server. */
(() => {
  const API='https://vermillion-commissions.timothyjosephmurphy.workers.dev/checkout/cart';
  const CART='va-cart-v1',ATTEMPT='va-cart-order-v1',HOLD='va-cart-reservation-v1',MAX=12;
  const read=key=>{try{return JSON.parse(localStorage.getItem(key));}catch{return null;}};
  const write=(key,value)=>{try{if(value===null)localStorage.removeItem(key);else localStorage.setItem(key,JSON.stringify(value));return true;}catch{return false;}};
  const clean=value=>Array.isArray(value)?[...new Map(value.filter(x=>x&&/^[a-z0-9-]+$/.test(x.id||'')&&Number.isSafeInteger(x.quantity)&&x.quantity>=1&&x.quantity<=(x.id.startsWith('print-')?10:1)).map(x=>[x.id,{id:x.id,quantity:x.quantity}])).values()].slice(0,MAX):[];
  let cart=clean(read(CART)),meta={},capabilities=null,busy=false,quoted=null,current=null,timer,buyOnly=null,holdSession=null,heldIds=new Set(),holdQueue=Promise.resolve(),awaitingBitcoinRedirect=false;
  const node=(tag,text,cls)=>{const el=document.createElement(tag);if(text!==undefined)el.textContent=text;if(cls)el.className=cls;return el;};
  const money=value=>`$${Number(value).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}`;
  const api=async(action,body)=>{
    const response=await fetch(`${API}/${action}`,body?{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body),signal:AbortSignal.timeout(action==='hold'?10000:60000)}:{cache:'no-store',signal:AbortSignal.timeout(15000)});
    const value=await response.json();if(!response.ok){const error=Error(value.error||'Checkout is temporarily unavailable.');error.data=value;throw error;}return value;
  };
  const capabilitiesPromise=api('catalog').catch(()=>null);
  window.vaCartReady=capabilitiesPromise;
  const counts=()=>document.querySelectorAll('[data-cart-count]').forEach(el=>{const count=(buyOnly?clean(read(CART)):cart).reduce((n,i)=>n+i.quantity,0);el.textContent=String(count);el.closest('a')?.setAttribute('aria-label',`Cart, ${count} item${count===1?'':'s'}`);});
  function persistCart(){if(buyOnly){const rest=clean(read(CART)).filter(i=>i.id!==buyOnly);write(CART,[...rest,...cart]);}else write(CART,cart);counts();document.dispatchEvent(new CustomEvent('cart:changed'));}
   const methodIntersection=()=>['square','bitcoin'].filter(m=>cart.length&&cart.every(line=>capabilities?.products.find(p=>p.id===line.id)?.methods.includes(m)));
  const eligible=id=>capabilities?.enabled&&capabilities.products.find(p=>p.id===id&&(p.status==='available'||heldIds.has(id)));
  const pending=d=>d&&!['quoted','paid','cancelled','expired','unavailable','missing'].includes(d.status);
  const makeHold=()=>({holdId:crypto.randomUUID(),key:[...crypto.getRandomValues(new Uint8Array(32))].map(n=>n.toString(16).padStart(2,'0')).join('')});
  function holdCredentials(){if(!holdSession||!/^[0-9a-f-]{36}$/.test(holdSession.holdId||'')||!/^[a-f0-9]{64}$/.test(holdSession.key||'')){holdSession=makeHold();write(HOLD,holdSession);}return holdSession;}
  function applyHeldState(result){
    const previous=heldIds;heldIds=new Set(result?.heldIds||[]);
    for(const product of capabilities?.products||[])if(product.type!=='print'){
      if(heldIds.has(product.id))product.status='available';
      else if(previous.has(product.id))product.status='reserved';
    }
    const slug=location.pathname.match(/^\/products\/([a-z0-9-]+)\/?$/)?.[1],area=document.querySelector('[data-cart-product]');
    if(slug&&heldIds.has(slug)&&area){area.querySelector('[data-cart-add]').disabled=false;area.querySelector('[data-cart-buy]').disabled=false;}
    const note=document.querySelector('[data-cart-reservation]');
    if(note){const hasOriginal=cart.some(item=>!item.id.startsWith('print-'));note.hidden=!hasOriginal;note.textContent=hasOriginal?`Originals in your cart are reserved until ${new Date(result.expiresAt).toLocaleTimeString([], {hour:'numeric',minute:'2-digit'})}. Complete checkout before then to keep the reservation.`:'';}
  }
  function syncHold(items=cart){
    if(!capabilities?.enabled)return Promise.resolve(null);
    const snapshot=clean(items),identity=holdCredentials();
    holdQueue=holdQueue.catch(()=>{}).then(async()=>{
      const result=await api('hold',{holdId:identity.holdId,key:identity.key,items:snapshot});
      if(result.status==='unavailable'){
        const product=capabilities?.products.find(item=>item.id===result.unavailable);if(product)product.status='reserved';
        heldIds=new Set(result.heldIds||[]);
        const error=Error('That original was reserved by another buyer. Remove it from the cart to continue.');error.data=result;throw error;
      }
      applyHeldState(result);return result;
    });
    return holdQueue;
  }
  function saveCart(){persistCart();return syncHold(cart);}
  document.addEventListener('DOMContentLoaded',async()=>{
    const nav=document.querySelector('.main-nav');
    if(nav&&!nav.querySelector('[data-cart-link]')){const a=node('a',undefined,'cart-nav');a.href='/cart/';a.dataset.cartLink='';a.append(node('span','Cart'));const count=node('span',String(cart.length),'cart-count');count.dataset.cartCount='';a.append(count,cartPaymentIcons());nav.append(a);}counts();
    const root=document.querySelector('[data-cart-page]');
    capabilities=await capabilitiesPromise;
    holdSession=read(HOLD);
    if(!root&&cart.length&&capabilities?.enabled)try{await syncHold(cart);}catch{}
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
      const fallback=area.querySelector('[data-purchase-inquiry]');
      const add=area.querySelector('[data-cart-add]'),buy=area.querySelector('[data-cart-buy]'),message=area.querySelector('[data-cart-added]');
      if(fallback)fallback.hidden=true;
      add.hidden=false;buy.hidden=false;
      const update=()=>{add.textContent=cart.some(i=>i.id===slug)?'Added to cart':'Add to cart';};update();
      const addItem=async()=>{
        let added=false,holdDeferred=false;
        if(!cart.some(i=>i.id===slug)){if(cart.length>=MAX){message.textContent=`Your cart holds up to ${MAX} different items.`;return false;}cart.push({id:slug,quantity:1});persistCart();added=true;}
        try{await syncHold(cart);}catch(error){
          if(error.data?.code==='CHECKOUT_STARTED'||error.message==='Checkout has already started.')holdDeferred=true;
          else {if(added){cart=cart.filter(i=>i.id!==slug);persistCart();}message.textContent=error.message;return false;}
        }
        update();
        message.replaceChildren(node('span',holdDeferred?'Added locally. Finish the current checkout before reserving or paying for another order. ':'Added and reserved for 15 minutes. '));
        const view=node('a','View your cart');view.href='/cart/';view.className='cart-text-link';message.append(view);return true;
      };
      add.addEventListener('click',async()=>{add.disabled=true;buy.disabled=true;await addItem();add.disabled=!eligible(slug);buy.disabled=!eligible(slug);});
      buy.addEventListener('click',async()=>{const hasOtherItems=cart.some(item=>item.id!==slug);add.disabled=true;buy.disabled=true;if(await addItem())location.assign(hasOtherItems?'/cart/':`/cart/?buy=${encodeURIComponent(slug)}`);else{add.disabled=!eligible(slug);buy.disabled=!eligible(slug);}});
      document.addEventListener('catalog:availability',e=>{const status=e.detail?.[slug];if(!status||heldIds.has(slug))return;const product=capabilities?.products.find(item=>item.id===slug);if(product)product.status=status;if(status==='available'){add.disabled=false;buy.disabled=false;message.textContent='';}else{add.disabled=true;buy.disabled=true;message.textContent=status==='sold'?'This original has sold.':'This original is currently reserved.';}});
    }
    window.addEventListener('storage',event=>{if(event.key===CART){cart=clean(read(CART));counts();if(root&&!busy&&!pending(current)){syncHold(cart).catch(()=>{});invalidate();render();}}if(event.key===HOLD)holdSession=read(HOLD);});
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
    if(existing)existing.quantity+=quantity;else cart.push({id,quantity});persistCart();syncHold(cart).then(()=>respond(true,'Print added to your cart.')).catch(error=>respond(false,error.message));
  });
  let root,notice,layout,orderPanel,form,pendingOrder=null;
  function announce(text){notice.textContent=text;}
  function quoteAllowed(){
    // Keep submit available so native validation can explain missing details.
    // Browser autofill does not always emit input/change events.
    return !!(form&&cart.length&&capabilities?.enabled&&cart.every(item=>!!eligible(item.id))&&!(pendingOrder&&pending(pendingOrder))&&!busy&&!quoted);
  }
  function updateQuoteButton(){
    const button=form?.querySelector('[data-cart-quote]');if(!button)return;
    button.textContent=quoted?'Shipping & tax calculated':busy?'Calculating…':'Calculate shipping & tax';
    button.disabled=!quoteAllowed();
  }
  function invalidate(){
    quoted=null;
    updateQuoteButton();
    updatePaymentControls(false);
    root.querySelector('[data-cart-shipping]').textContent='Calculated below';root.querySelector('[data-cart-tax]').textContent='Calculated below';root.querySelector('[data-cart-total]').textContent='—';
  }
  function cartPaymentIcons(){
    const icons=node('span',undefined,'cart-payment-icons');icons.setAttribute('aria-hidden','true');
    for(const kind of ['bitcoin','lightning']){const icon=paymentIcon(kind);icon.setAttribute('class',`cart-${kind}-icon`);icon.setAttribute('width','14');icon.setAttribute('height','14');icons.append(icon);}
    return icons;
  }
  function paymentIcon(kind){
    const ns='http://www.w3.org/2000/svg',svg=document.createElementNS(ns,'svg');
    svg.setAttribute('viewBox','0 0 24 24');svg.setAttribute('class','payment-button-icon');
    svg.setAttribute('aria-hidden','true');svg.setAttribute('focusable','false');
    const shape=(name,attrs)=>{const el=document.createElementNS(ns,name);for(const [key,value] of Object.entries(attrs))el.setAttribute(key,value);svg.append(el);return el;};
    if(kind==='bitcoin'){
      shape('circle',{cx:'12',cy:'12',r:'10',fill:'none',stroke:'currentColor','stroke-width':'1.8'});
      shape('path',{d:'M8.2 5.2h4.9c2.6 0 4.2 1.2 4.2 3.2 0 1.1-.5 1.9-1.4 2.4 1.3.4 2.1 1.5 2.1 3 0 2.2-1.7 3.7-4.5 3.7H8.2V5.2zm2.2 1.9V10H13c1.3 0 2-.5 2-1.5 0-.9-.7-1.4-2-1.4h-2.6zm0 4.8v3.7h2.9c1.4 0 2.1-.7 2.1-1.9s-.7-1.8-2.1-1.8h-2.9z',fill:'currentColor'});
      shape('path',{d:'M10.1 3.4v2M14.2 3.4v2M10.1 18.6v2M14.2 18.6v2',fill:'none',stroke:'currentColor','stroke-width':'1.3'});
    }else if(kind==='lightning'){
      shape('path',{d:'M13.1 1.8 5.7 13h5l-.8 9.2L18.3 10.8h-5.1z',fill:'currentColor'});
    }else{
      shape('path',{d:'M4.01 0A4.01 4.01 0 000 4.01v15.98c0 2.21 1.8 4 4.01 4.01h15.98C22.2 24 24 22.2 24 19.99V4A4.01 4.01 0 0019.99 0H4zm1.62 4.36h12.74c.7 0 1.26.57 1.26 1.27v12.74c0 .7-.56 1.27-1.26 1.27H5.63c-.7 0-1.26-.57-1.26-1.27V5.63a1.27 1.27 0 011.26-1.27zm3.83 4.35a.73.73 0 00-.73.73v5.09c0 .4.32.72.72.72h5.1a.73.73 0 00.73-.72V9.44a.73.73 0 00-.73-.73h-5.1Z',fill:'currentColor'});
    }
    return svg;
  }
  function updatePaymentControls(enabled=false,methods=methodIntersection()){
    const availableMethods=methods.filter(method=>['square','bitcoin'].includes(method));
    const bitcoinAvailable=availableMethods.includes('bitcoin');
    const showBitcoin=bitcoinAvailable||availableMethods.includes('square');
    methods=['bitcoin','square'].filter(method=>method==='bitcoin'?showBitcoin:availableMethods.includes(method));
    const box=root.querySelector('[data-cart-payments]'),host=root.querySelector('[data-cart-methods]');
    const squareBox=root.querySelector('[data-square-card-box]');
    host.replaceChildren();
    if(squareBox)squareBox.hidden=!(enabled&&availableMethods.includes('square'));
    if(enabled&&availableMethods.includes('square'))ensureSquareCard().catch(error=>announce(`Square card entry could not load: ${error.message}`));
    for(const method of methods){
      const button=node('button',undefined,'button button-solid');
      button.type='button';button.disabled=!enabled||(method==='bitcoin'&&!bitcoinAvailable)||busy||!!(pendingOrder&&pending(pendingOrder));
      const content=node('span',undefined,'payment-button-content');
      if(method==='bitcoin'){
        content.append(paymentIcon('bitcoin'),node('span','Pay with Bitcoin'),paymentIcon('lightning'));
      }else content.append(paymentIcon('square'),node('span','Pay with credit card'));
      button.append(content);
      button.addEventListener('click',()=>startPayment(method));host.append(button);
    }
    box.hidden=!methods.length;
    const help=box.querySelector('[data-cart-payment-help]');
    if(help)help.textContent=enabled?'Your total is ready. Choose how you would like to pay.':'Calculate shipping and tax to enable payment.';
  }
  let squareCard=null,squareCardReady=null;
  function ensureSquareCard(){
    if(squareCard)return Promise.resolve(squareCard);
    if(squareCardReady)return squareCardReady;
    const config=capabilities?.square;if(!config) return Promise.reject(Error('Square card details are not configured.'));
    squareCardReady=(async()=>{
      if(!window.Square){await new Promise((resolve,reject)=>{const script=document.createElement('script');script.src=config.mode==='sandbox'?'https://sandbox.web.squarecdn.com/v1/square.js':'https://web.squarecdn.com/v1/square.js';script.onload=resolve;script.onerror=()=>reject(Error('Square payment form could not be loaded.'));document.head.append(script);});}
      if(!window.Square)throw Error('Square payment form is unavailable.');
      const payments=window.Square.payments(config.applicationId,config.locationId),card=await payments.card();
      const mount=root.querySelector('[data-square-card]');if(!mount.id)mount.id=`square-card-${crypto.randomUUID()}`;
      await card.attach(`#${mount.id}`);squareCard=card;return card;
    })().finally(()=>{squareCardReady=null;});
    return squareCardReady;
  }
  function showPendingNotice(order,requestedBuy=buyOnly,errorMessage=''){
    const items=order?.quote?.items||[],names=items.map(item=>item.title).filter(Boolean).join(', ');
    const requested=requestedBuy&&(capabilities?.products.find(item=>item.id===requestedBuy)?.title||meta[requestedBuy]?.title);
    const isDifferent=requested&&!items.some(item=>item.id===requestedBuy);
    const lead=isDifferent?'Buy Now for '+requested+' has not started. ':'Your cart is shown below. ';
    const detail=errorMessage?errorMessage+' ':'There is an unfinished checkout'+(names?' for '+names:'')+'. Review or cancel it before starting another checkout. ';
    notice.replaceChildren(document.createTextNode(lead+detail));
    const link=node('a','Review existing order');link.href='/cart/?order='+encodeURIComponent(order?.orderId||'');link.className='cart-text-link';notice.append(link);
    if(requestedBuy){notice.append(document.createTextNode(' '));const fullCart=node('a','View full cart');fullCart.href='/cart/';fullCart.className='cart-text-link';notice.append(fullCart);}
  }
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
      if(isPrint&&!details.sampleOnly){const label=node('label','Quantity '),quantity=node('input');quantity.type='number';quantity.min='1';quantity.max='10';quantity.step='1';quantity.value=String(line.quantity);quantity.setAttribute('aria-label',`Quantity of ${details.title}`);quantity.style.width='70px';quantity.addEventListener('change',()=>{const n=Number(quantity.value);if(!Number.isSafeInteger(n)||n<1||n>10){quantity.value=String(line.quantity);announce('Choose between 1 and 10 copies.');return;}line.quantity=n;saveCart().catch(error=>announce(error.message));invalidate();render();});label.append(quantity);info.append(label);}const remove=node('button','Remove','cart-text-link');remove.type='button';remove.setAttribute('aria-label',`Remove ${p?.title||live?.title||'artwork'}`);remove.addEventListener('click',()=>{cart=cart.filter(i=>i.id!==line.id);saveCart().catch(error=>announce(`The item was removed here, but its reservation could not be updated yet: ${error.message}`));invalidate();render();announce('Artwork removed from your cart.');});info.append(remove);row.append(info);list.append(row);
    }
    root.querySelector('[data-cart-subtotal]').textContent=money(subtotal);
    const active=!!current&&(pending(current)||current.status==='paid');
    layout.hidden=!cart.length||active;root.querySelector('[data-cart-empty]').hidden=!!cart.length||active;
    updateQuoteButton();
    updatePaymentControls(false);
    if(!active){announce(!capabilities?'Availability could not be verified. Please refresh before checkout.':!capabilities.enabled?'Cart checkout is not available yet. Please contact TJ to arrange a purchase.':invalid?'Please remove unavailable items before checking out.':cart.length&&!methodIntersection().length?'These artworks do not share a payment method. Please contact TJ.':'');}
  }
  function showQuote(q){
    quoted=q;root.querySelector('[data-cart-shipping]').textContent=money(q.quote.shipping);root.querySelector('[data-cart-tax]').textContent=money(q.quote.tax);root.querySelector('[data-cart-total]').textContent=money(q.quote.total);
    applyHeldState({heldIds:cart.filter(i=>!i.id.startsWith('print-')).map(i=>i.id),expiresAt:q.expiresAt});
    const quoteButton=form.querySelector('[data-cart-quote]');quoteButton.disabled=true;quoteButton.textContent='Shipping & tax calculated';
    updatePaymentControls(true,q.methods);
  }
  const credentials=()=>({orderId:current.orderId,key:current.key});
  function remember(q){const value={orderId:q.orderId,key:q.key};if(!write(ATTEMPT,value))throw Error('Your browser could not save this checkout. Enable site storage before continuing.');}
  async function startPayment(method){
    if(busy||!quoted)return;busy=true;setDisabled(true);announce('Checking your items and preparing payment…');
    try{
      let sourceId;
      if(method==='square'){
        const card=await ensureSquareCard(),values=Object.fromEntries(new FormData(form));
        const names=String(values.name||'').trim().split(/\s+/),token=await card.tokenize({amount:quoted.quote.total,currencyCode:'USD',intent:'CHARGE',customerInitiated:true,sellerKeyedIn:false,
          billingContact:{givenName:names.shift()||'',familyName:names.join(' '),email:String(values.email||''),countryCode:'US'}});
        if(token.status!=='OK'||!token.token)throw Error('Square could not tokenize these card details. Check them and try again.');
        sourceId=token.token;
      }
      remember(quoted);current={...quoted,status:'creating',method};awaitingBitcoinRedirect=method==='bitcoin';
      const previousKey=current.key,result=await api('start',{...credentials(),method,...(sourceId?{sourceId}:{})});current={...result,key:previousKey};
      if(result.status==='quoted'&&result.paymentError){quoted={...result,key:previousKey};current=null;orderPanel.hidden=true;layout.hidden=false;showQuote(quoted);announce(result.paymentError);return;}
      showOrder();
      if(result.url&&result.status==='pending'){awaitingBitcoinRedirect=false;location.assign(result.url);return;}
      poll();
    }catch(error){announce(error.message);if(current){showOrder();poll();}}
    finally{busy=false;setDisabled(false);}
  }
  function setDisabled(value){
    form.querySelectorAll('input,button').forEach(el=>{if(el.matches('[data-cart-quote]'))el.disabled=value||!quoteAllowed();else el.disabled=value||(!!(pendingOrder&&pending(pendingOrder)));});
    root.querySelectorAll('[data-cart-methods] button').forEach(el=>el.disabled=value||!quoted||!!(pendingOrder&&pending(pendingOrder)));
    root.querySelectorAll('[data-cart-items] button, [data-cart-items] input').forEach(el=>el.disabled=value);
  }
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
    if(current.status==='paid'){const saved=read(ATTEMPT);if(!saved?.cartAdjusted){const purchased=new Map(current.quote.items.map(i=>[i.id,i.quantity]));cart=clean(read(CART)).map(i=>({...i,quantity:i.quantity-(purchased.get(i.id)||0)})).filter(i=>i.quantity>0);buyOnly=null;holdSession=null;write(HOLD,null);heldIds=new Set();saveCart().catch(()=>{});write(ATTEMPT,{orderId:current.orderId,key:current.key,cartAdjusted:true});}const tracking=root.querySelector('[data-order-tracking]');if(tracking){tracking.replaceChildren();if(current.printStatus)tracking.append(node('p',`Print fulfillment: ${{'in-production':'In production',complete:'Shipped',pending:'Preparing your print order',creating:'Preparing your print order',review:'TJ is reviewing your print order',cancelled:'TJ is reviewing your print order'}[current.printStatus]||'Processing'}`));for(const shipment of current.shipments||[]){if(shipment.trackingUrl&&/^https:\/\//.test(shipment.trackingUrl)){const link=node('a',`Track shipment${shipment.trackingNumber?' '+shipment.trackingNumber:''}`);link.href=shipment.trackingUrl;link.target='_blank';link.rel='noopener noreferrer';tracking.append(link);}}}announce('');}
  }
  async function updateOrder(action='status'){
    if(!current||busy)return;busy=true;root.querySelector('[data-order-check]').disabled=true;
    try{const result=await api(action,credentials());current={...result,key:current.key};showOrder();announce('');
      if(awaitingBitcoinRedirect&&current.method==='bitcoin'&&current.status==='pending'&&current.url){awaitingBitcoinRedirect=false;location.assign(current.url);return;}
      if(!pending(current)||current.status==='review')awaitingBitcoinRedirect=false;
      if(pending(current)&&current.status!=='review')poll();}
    catch(error){announce(error.message);poll();}
    finally{busy=false;root.querySelector('[data-order-check]').disabled=false;}
  }
  function poll(){clearTimeout(timer);if(!document.hidden)timer=setTimeout(()=>updateOrder(),6000);}
  async function initializePage(el){
    root=el;notice=root.querySelector('[data-cart-notice]');layout=root.querySelector('[data-cart-layout]');orderPanel=root.querySelector('[data-order-panel]');form=root.querySelector('[data-cart-form]');
    const params=new URLSearchParams(location.search),buy=params.get('buy');
    // Buy now is a one-item checkout; existing cart contents remain for a later order.
    if(buy&&(eligible(buy)||cart.some(item=>item.id===buy))&&eligible(buy)?.type!=='print'){buyOnly=buy;cart=[{id:buy,quantity:1}]; /* view only; do not overwrite a saved multi-item cart */}
    const addressChanged=()=>{if(quoted)invalidate();else updateQuoteButton();};
    form.addEventListener('input',addressChanged);form.addEventListener('change',addressChanged);
    form.addEventListener('invalid',()=>announce('Check the highlighted delivery field. Enter your email, name, street, city, two-letter state and ZIP code.'),true);
    form.addEventListener('submit',async event=>{
      event.preventDefault();if(busy)return;if(pendingOrder&&pending(pendingOrder)){showPendingNotice(pendingOrder,buyOnly);return;}if(!form.reportValidity())return;busy=true;setDisabled(true);form.querySelector('[data-cart-quote]').textContent='Calculating…';announce('Calculating shipping and tax…');
      const values=Object.fromEntries(new FormData(form));
      // FormData omits disabled controls; collect from named elements explicitly.
      for(const input of form.querySelectorAll('input[name]'))values[input.name]=input.value.trim();
      const {email,...address}=values;
      try{await syncHold(cart);const identity=holdCredentials();const q=await api('quote',{items:cart,address,email,catalogVersion:capabilities.version,holdId:identity.holdId,key:identity.key});showQuote(q);announce('Your total is ready. Choose a payment method below.');}
      catch(error){announce(error.message);invalidate();}
      finally{busy=false;setDisabled(false);}
    });
    root.querySelector('[data-order-check]').addEventListener('click',()=>updateOrder());root.querySelector('[data-order-cancel]').addEventListener('click',()=>updateOrder('cancel'));
    root.querySelector('[data-order-print]').addEventListener('click',()=>window.print());
    root.querySelector('[data-order-back]').addEventListener('click',async()=>{
      write(ATTEMPT,null);write(HOLD,null);holdSession=null;heldIds=new Set();current=null;quoted=null;pendingOrder=null;buyOnly=null;clearTimeout(timer);orderPanel.hidden=true;history.replaceState(null,'','/cart/');cart=clean(read(CART));
      try{capabilities=await api('catalog');await syncHold(cart);}catch{capabilities=null;}invalidate();render();root.querySelector('h1').focus();
    });
    const saved=read(ATTEMPT),id=params.get('order');
    if(id&&(!saved||saved.orderId!==id)){render();announce('This order belongs to another browser session. Please contact TJ with your order reference if you have paid.');return;}
    if(saved){
      try{
        const result=await api('status',saved),restored={...result,key:saved.key};
        if(result.status==='quoted'&&!id){write(ATTEMPT,null);current=null;await syncHold(cart);render();}
        else if(id===saved.orderId){
          current=restored;showOrder();
          if(params.get('result')==='return')await updateOrder('capture');else if(params.get('result')==='cancel')await updateOrder('cancel');else if(pending(current))poll();
          history.replaceState(null,'','/cart/');
        }else{
          current=null;
          if(pending(restored)){pendingOrder=restored;render();showPendingNotice(restored,buy);}
          else {write(ATTEMPT,null);write(HOLD,null);holdSession=null;heldIds=new Set();await syncHold(cart);render();}
        }
      }catch(error){
        current=null;pendingOrder={...saved};render();showPendingNotice(pendingOrder,buy,'The existing order status could not be checked ('+error.message+').');
      }
    }else {try{await syncHold(cart);}catch(error){announce(error.message);}render();}
    document.addEventListener('visibilitychange',()=>{if(!document.hidden&&pending(current))updateOrder();});
  }
})();
