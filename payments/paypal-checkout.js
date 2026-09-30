// Hosted PayPal links are enabled only after their fixed price matches the product page.
document.addEventListener('DOMContentLoaded', async () => {
  const summary = document.querySelector('.product-summary');
  const inquiry = summary?.querySelector('.product-inquiry');
  const priceText = summary?.querySelector('.product-detail-price')?.textContent?.trim();
  const availability = summary?.querySelector('.product-availability')?.textContent?.trim();
  const title = document.querySelector('.product-layout h1')?.textContent?.trim();
  const slug = location.pathname.match(/^\/products\/([a-z0-9-]+)\/?$/)?.[1];
  if (!inquiry || !slug || !title) return;

  const endpoint = 'https://vermillion-commissions.timothyjosephmurphy.workers.dev';
  let liveStock;
  document.addEventListener('catalog:availability',event=>{
    liveStock=event.detail?.[slug];
    if(['sold','reserved','retired','not-for-sale'].includes(liveStock)){
      document.querySelectorAll('.purchase-panel,.product-purchase-cta,.paypal-checkout-link').forEach(el=>el.remove());
      document.querySelector('[data-original-purchase]')?.setAttribute('hidden','');
    }
  });
  const catalogVersion = document.querySelector('meta[name="catalog-version"]')?.content;
  const params = new URLSearchParams(location.search);
  const notice = document.createElement('p');
  notice.setAttribute('role','status');
  notice.className = 'checkout-notice';
  const post = async (path, data) => {
    const response = await fetch(`${endpoint}${path}`, {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...data,...(catalogVersion?{catalogVersion}:{})})});
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Checkout is unavailable.');
    return result;
  };
  const bitcoinKey = `bitcoin-order:${slug}`;
  const rememberBitcoin = id => { try { if(id)sessionStorage.setItem(bitcoinKey,id);else sessionStorage.removeItem(bitcoinKey); } catch {} };
  const bitcoinReturn = params.get('bitcoin');
  async function showBitcoinOrder(orderId) {
    inquiry.prepend(notice);
    notice.textContent = 'Checking your Bitcoin payment…';
    const controls = document.createElement('div');
    controls.className = 'bitcoin-order-controls';
    const resume = document.createElement('a');
    resume.className = 'button button-solid'; resume.textContent = 'Resume Bitcoin payment'; resume.hidden = true;
    resume.rel = 'noreferrer';
    const check = document.createElement('button');
    check.type = 'button'; check.className = 'button button-ghost'; check.textContent = 'Check payment status';
    controls.append(resume,check); notice.after(controls);
    let attempts = 0, timer, busy = false, terminal = false;
    const refresh = async () => {
      if(busy || terminal)return;
      clearTimeout(timer); busy = true; check.disabled = true;
      try {
        const result = await post('/checkout/bitcoin/order',{slug,orderId});
        const messages = {
          creating:'Preparing your Bitcoin invoice. Please check again shortly.',
          preparing:'Preparing your Bitcoin invoice. Please check again shortly.',
          pending:'Your painting is reserved. Complete payment on your BTCPay invoice.',
          processing:'Bitcoin payment received and awaiting confirmation. Your painting remains reserved.',
          settled:'Bitcoin payment confirmed. Thank you for purchasing this painting!',
          expired:'This Bitcoin invoice expired without payment. Reload this page to start a new checkout.',
          review:'Your Bitcoin payment needs review. Please contact tj@vermillionaurora.com with your invoice number before paying again.',
          missing:'This Bitcoin order could not be found. Please contact tj@vermillionaurora.com if you sent a payment.',
          unavailable:'This painting was reserved by another buyer before your invoice was created.'
        };
        notice.textContent = messages[result.status] || 'Your Bitcoin payment is being checked.';
        resume.hidden = true;
        if(result.url && result.status === 'pending') {
          const target = new URL(result.url);
          if(target.protocol === 'https:' && !target.username && !target.password) { resume.href=target.href;resume.hidden=false; }
        }
        if(result.status === 'settled') summary.querySelector('.product-availability').textContent = 'Sold';
        terminal = ['settled','expired','unavailable','missing'].includes(result.status);
        if(terminal) { rememberBitcoin(null);check.hidden=true; }
        if(!terminal && result.status !== 'review' && ++attempts < 12) timer=setTimeout(refresh,5000);
      } catch(error) { notice.textContent=error.message; }
      finally { busy=false;check.disabled=false; }
    };
    check.addEventListener('click',refresh);
    await refresh();
  }
  if(bitcoinReturn) { rememberBitcoin(bitcoinReturn);await showBitcoinOrder(bitcoinReturn);return; }
  let savedBitcoin;
  try { savedBitcoin=sessionStorage.getItem(bitcoinKey); } catch {}
  if(savedBitcoin && !params.has('checkout')) { await showBitcoinOrder(savedBitcoin);return; }
  const queryCheckout = params.get('checkout');
  if (queryCheckout === 'return' || queryCheckout === 'cancel') {
    inquiry.prepend(notice);
    const data = {slug,orderId:params.get('token'),holdId:params.get('hold')};
    if (queryCheckout === 'return') notice.textContent = 'Confirming your payment with PayPal…';
    try {
      if (queryCheckout === 'return') {
        await post('/checkout/capture',data);
        summary.querySelector('.product-availability').textContent = 'Sold';
        notice.textContent = 'Payment complete. Thank you for purchasing this painting!';
      } else {
        await post('/checkout/cancel',data);
        notice.textContent = 'Checkout cancelled. No payment was captured.';
      }
      history.replaceState(null,'',location.pathname);
    } catch (error) { notice.textContent = error.message; }
    if (queryCheckout === 'return') return;
  }

  const cartOptions = await window.vaCartReady;
  if (cartOptions?.enabled && cartOptions.products?.some(p=>p.id===slug)) return;

  if (availability !== 'Available' || !priceText) return;

  // Shared checkout is enabled on the Worker only after its credentials and
  // inventory binding are configured. Until then the inquiry link remains.
  try {
    const shownPrice = Number(priceText.replace(/[^\d.]/g,''));
    const loadStatus = async path => {
      try { const response=await fetch(`${endpoint}${path}?slug=${encodeURIComponent(slug)}`,{cache:'no-store'});return response.ok?await response.json():null; }
      catch { return null; }
    };
    const [paypalStatus,bitcoinStatus] = await Promise.all([loadStatus('/checkout/status'),loadStatus('/checkout/bitcoin/status')]);
    const matches = value => value && (!catalogVersion || !value.catalogVersion || value.catalogVersion === catalogVersion) && value.title === title && value.currency === 'USD' && Number(value.amount) === shownPrice;
    const paypalReady = !!matches(paypalStatus), bitcoinReady = bitcoinStatus?.enabled === true && !!matches(bitcoinStatus);
    if (paypalReady || bitcoinReady) {
      const candidates=[paypalReady?paypalStatus:null,bitcoinReady?bitcoinStatus:null].filter(Boolean);
      const current=candidates.find(value=>['sold','reserved'].includes(value.status)) || candidates[0];
      if (current.status === 'sold' || current.status === 'reserved') {
        summary.querySelector('.product-availability').textContent = current.status === 'sold' ? 'Sold' : 'Temporarily reserved';
        return;
      }
      if (current.status !== 'available' || ['sold','reserved','retired','not-for-sale'].includes(liveStock)) return;
      const panel = document.createElement('section');
      panel.id = 'buy-painting';
      panel.className = 'purchase-panel';
      panel.setAttribute('aria-labelledby','purchase-heading');
      panel.innerHTML = '<h2 id="purchase-heading">Buy this original</h2>' +
        '<p id="checkout-instructions">Enter your shipping details to calculate shipping and tax before paying.</p>';
      const form = document.createElement('form');
      form.className = 'checkout-address-form';
      form.setAttribute('aria-describedby','checkout-instructions');
      form.innerHTML = '<fieldset><legend class="checkout-visually-hidden">US shipping address</legend>' +
        '<label class="checkout-full-row">Full name <input name="name" autocomplete="shipping name" maxlength="100" required></label>' +
        '<label class="checkout-full-row">Street address <input name="street1" autocomplete="shipping address-line1" maxlength="100" required></label>' +
        '<label class="checkout-full-row">Apartment or suite (optional) <input name="street2" autocomplete="shipping address-line2" maxlength="100"></label>' +
        '<label class="checkout-full-row">City <input name="city" autocomplete="shipping address-level2" maxlength="100" required></label>' +
        '<label>State <input name="state" autocomplete="shipping address-level1" placeholder="WA" pattern="[A-Za-z]{2}" minlength="2" maxlength="2" title="Enter the two-letter state abbreviation" required></label>' +
        '<label>ZIP code <input name="zip" autocomplete="shipping postal-code" inputmode="numeric" pattern="[0-9]{5}(-[0-9]{4})?" maxlength="10" required></label>' +
        '<p class="checkout-country checkout-full-row">Shipping to the United States</p>' +
        '<button type="submit" class="button button-ghost checkout-full-row">Calculate shipping &amp; tax</button></fieldset>';
      const fields = form.querySelector('fieldset');
      const submit = form.querySelector('[type="submit"]');
      const details = document.createElement('div');
      details.className = 'checkout-total';
      details.setAttribute('role','status');
      details.setAttribute('aria-atomic','true');
      const pay = document.createElement('button');
      pay.type = 'button';
      pay.className = 'button button-solid checkout-pay';
      pay.textContent = 'Buy with PayPal';
      pay.disabled = true;
      pay.hidden = !paypalReady;
      pay.setAttribute('aria-describedby','checkout-payment-help');
      const bitcoin = document.createElement('button');
      bitcoin.type = 'button'; bitcoin.className = 'button button-solid checkout-pay checkout-bitcoin';
      bitcoin.textContent = 'Buy with Bitcoin'; bitcoin.disabled = true; bitcoin.hidden = !bitcoinReady;
      bitcoin.setAttribute('aria-describedby','checkout-payment-help');
      const help = document.createElement('p');
      help.id = 'checkout-payment-help';
      help.className = 'checkout-payment-help';
      help.textContent = 'Calculate your total above to enable payment.';
      let quote = null, quotedAddress = null, revision = 0, creating = false;
      const address = () => Object.fromEntries([...new FormData(form)].map(([key,value]) =>
        [key,key === 'state' ? value.trim().toUpperCase() : value.trim()]));
      const invalidateQuote = () => {
        revision += 1;
        quote = null;
        quotedAddress = null;
        pay.disabled = true;
        pay.textContent = 'Buy with PayPal';
        bitcoin.disabled = true;bitcoin.textContent = 'Buy with Bitcoin';
        details.replaceChildren();
        help.textContent = 'Calculate your total above to enable payment.';
      };
      form.addEventListener('input',() => {
        invalidateQuote();
        // The address can be edited while a quote is loading. Its eventual
        // response must not enable payment or overwrite a newer quote.
        submit.disabled = false;
        submit.textContent = 'Calculate shipping & tax';
        notice.textContent = '';
      });
      form.addEventListener('submit',async event => {
        event.preventDefault();
        if (creating || !form.reportValidity()) return;
        invalidateQuote();
        const requestRevision = revision;
        const requestAddress = address();
        const fingerprint = JSON.stringify(requestAddress);
        submit.disabled = true;
        submit.textContent = 'Calculating…';
        details.textContent = 'Calculating shipping and tax…';
        notice.textContent = '';
        try {
          const result = await post(paypalReady?'/checkout/quote':'/checkout/bitcoin/quote',{slug,address:requestAddress});
          if (revision !== requestRevision || fingerprint !== JSON.stringify(address())) return;
          quote = result;
          quotedAddress = requestAddress;
          const breakdown = document.createElement('dl');
          for (const [label,value] of [['Painting',quote.base],['Shipping',quote.shipping],['Tax',quote.tax],['Total (USD)',quote.total]]) {
            const term = document.createElement('dt'), amount = document.createElement('dd');
            term.textContent = label;
            amount.textContent = `$${value}`;
            breakdown.append(term,amount);
          }
          const delivery = document.createElement('p');
          delivery.textContent = `${quote.carrier} ${quote.service}. ${quote.packaging === 'tube' ? 'Ships in a tube.' : 'Ships flat.'}`;
          details.replaceChildren(breakdown,delivery);
          pay.textContent = `Buy with PayPal · $${quote.total}`;
          pay.disabled = !paypalReady;
          bitcoin.disabled = !bitcoinReady;
          bitcoin.textContent = `Buy with Bitcoin · $${quote.total}`;
          help.textContent = bitcoinReady ? 'Your total includes shipping and tax. Bitcoin payment opens in BTCPay, with Lightning available when enabled there.' : 'Your total includes shipping and tax. Continue to PayPal to pay securely.';
        } catch (error) {
          if (revision === requestRevision) details.textContent = error.message;
        } finally {
          if (revision === requestRevision) {
            submit.disabled = false;
            submit.textContent = 'Calculate shipping & tax';
          }
        }
      });
      const beginPayment = async provider => {
        if (creating || !quote || !quotedAddress) return;
        if (!form.reportValidity() || JSON.stringify(address()) !== JSON.stringify(quotedAddress)) {
          invalidateQuote();
          return;
        }
        creating = true;
        pay.disabled = true;bitcoin.disabled = true;
        // Send the exact address used for the displayed total, and prevent
        // edits or duplicate clicks while the server reserves the original.
        const checkoutAddress = {...quotedAddress}, expectedTotal = quote.total;
        fields.disabled = true;
        const paymentButton = provider === 'bitcoin' ? bitcoin : pay;
        paymentButton.textContent = provider === 'bitcoin' ? 'Opening Bitcoin checkout…' : 'Opening PayPal…';
        notice.textContent = paymentButton.textContent;
        try {
          const result = await post(provider === 'bitcoin' ? '/checkout/bitcoin/create' : '/checkout/create',{slug,address:checkoutAddress,expectedTotal});
          if(provider === 'bitcoin') {
            if(result.status === 'unavailable')throw new Error('This painting was just reserved. Please reload the page.');
            rememberBitcoin(result.orderId);
            if(!result.url) { panel.remove();await showBitcoinOrder(result.orderId);return; }
          }
          location.assign(result.url);
        } catch (error) {
          creating = false;
          fields.disabled = false;
          invalidateQuote();
          notice.textContent = error.message;
          help.textContent = 'Calculate shipping and tax again before retrying payment.';
        }
      };
      pay.addEventListener('click',()=>beginPayment('paypal'));
      bitcoin.addEventListener('click',()=>beginPayment('bitcoin'));
      panel.append(form,details,pay,bitcoin,help,notice);
      const availabilityNode = summary.querySelector('.product-availability');
      (availabilityNode || summary.querySelector('.product-detail-price')).after(panel);

      // Keep a purchase call to action above the painting on mobile and on
      // pages with a wide image. It leads to the visible address form, not PayPal.
      const cta = document.createElement('div');
      cta.className = 'product-purchase-cta';
      const prompt = document.createElement('p');
      prompt.textContent = `${title} · ${priceText}`;
      const buy = document.createElement('a');
      buy.href = '#buy-painting';
      buy.className = 'button button-solid';
      buy.textContent = 'Buy now';
      buy.setAttribute('aria-label',`Enter shipping details to buy ${title}`);
      buy.addEventListener('click',event => {
        event.preventDefault();
        panel.scrollIntoView({block:'start'});
        form.querySelector('input').focus({preventScroll:true});
      });
      const purchaseSlot = document.querySelector('[data-original-purchase]');
      if (purchaseSlot) purchaseSlot.replaceChildren(buy,...purchaseSlot.querySelectorAll('.product-detail-price'));
      else { cta.append(prompt,buy); document.querySelector('.product-layout').before(cta); }
      return;
    }
  } catch (_) { /* Leave the existing inquiry action available. */ }

  try {
    if(catalogVersion) {
      const stockResponse=await fetch(`${endpoint}/inventory/status?ids=${encodeURIComponent(slug)}`,{cache:'no-store'});
      if(!stockResponse.ok)return;
      const stock=await stockResponse.json();
      if(stock.version!==catalogVersion || stock.availability?.[slug]!=='available')return;
    }
    const response = await fetch('/payments/paypal-links.json', { cache: 'no-store' });
    if (!response.ok) return;
    const links = await response.json();
    const item = links[slug];
    if (!item || item.title !== title || item.currency !== 'USD') return;

    const shownPrice = Number(priceText.replace(/[^\d.]/g, ''));
    if (!Number.isFinite(shownPrice) || shownPrice !== Number(item.amount)) return;

    const checkout = new URL(item.url);
    if (checkout.protocol !== 'https:' ||
        !['www.paypal.com', 'paypal.com'].includes(checkout.hostname) ||
        !/^\/ncp\/payment\/[A-Za-z0-9-]+\/?$/.test(checkout.pathname) ||
        checkout.username || checkout.password) return;

    const link = document.createElement('a');
    link.className = 'button button-solid paypal-checkout-link';
    link.href = checkout.href;
    link.textContent = 'Buy now';
    link.setAttribute('aria-label', `Buy ${title} with PayPal`);
    const purchaseSlot = document.querySelector('[data-original-purchase]');
    if (purchaseSlot) purchaseSlot.replaceChildren(link,...purchaseSlot.querySelectorAll('.product-detail-price'));
    else inquiry.prepend(link);
  } catch (_) {
    // The existing purchase inquiry remains available if links are not configured.
  }
});
