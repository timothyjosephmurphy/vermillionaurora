// Hosted PayPal links are enabled only after their fixed price matches the product page.
document.addEventListener('DOMContentLoaded', async () => {
  const summary = document.querySelector('.product-summary');
  const inquiry = summary?.querySelector('.product-inquiry');
  const priceText = summary?.querySelector('.product-detail-price')?.textContent?.trim();
  const availability = summary?.querySelector('.product-availability')?.textContent?.trim();
  const title = document.querySelector('.product-layout h1')?.textContent?.trim();
  const slug = location.pathname.match(/^\/products\/([a-z0-9-]+)\/?$/)?.[1];
  if (!inquiry || !slug || !title || availability !== 'Available' || !priceText) return;

  const endpoint = 'https://vermillion-commissions.timothyjosephmurphy.workers.dev';
  const params = new URLSearchParams(location.search);
  const notice = document.createElement('p');
  notice.setAttribute('role','status');
  notice.className = 'checkout-notice';
  const post = async (path, data) => {
    const response = await fetch(`${endpoint}${path}`, {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Checkout is unavailable.');
    return result;
  };
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

  // Shared checkout is enabled on the Worker only after its credentials and
  // inventory binding are configured. Until then the inquiry link remains.
  try {
    const response = await fetch(`${endpoint}/checkout/status?slug=${encodeURIComponent(slug)}`, {cache:'no-store'});
    if (response.ok) {
      const current = await response.json();
      const shownPrice = Number(priceText.replace(/[^\d.]/g,''));
      if (current.title !== title || current.currency !== 'USD' || Number(current.amount) !== shownPrice) return;
      if (current.status === 'sold' || current.status === 'reserved') {
        summary.querySelector('.product-availability').textContent = current.status === 'sold' ? 'Sold' : 'Temporarily reserved';
        return;
      }
      if (current.status !== 'available') return;
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
      pay.setAttribute('aria-describedby','checkout-payment-help');
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
          const result = await post('/checkout/quote',{slug,address:requestAddress});
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
          pay.disabled = false;
          help.textContent = 'Your total includes shipping and tax. Continue to PayPal to pay securely.';
        } catch (error) {
          if (revision === requestRevision) details.textContent = error.message;
        } finally {
          if (revision === requestRevision) {
            submit.disabled = false;
            submit.textContent = 'Calculate shipping & tax';
          }
        }
      });
      pay.addEventListener('click',async () => {
        if (creating || !quote || !quotedAddress) return;
        if (!form.reportValidity() || JSON.stringify(address()) !== JSON.stringify(quotedAddress)) {
          invalidateQuote();
          return;
        }
        creating = true;
        pay.disabled = true;
        // Send the exact address used for the displayed total, and prevent
        // edits or duplicate clicks while the server reserves the original.
        const checkoutAddress = {...quotedAddress}, expectedTotal = quote.total;
        fields.disabled = true;
        pay.textContent = 'Opening PayPal…';
        notice.textContent = 'Opening PayPal…';
        try {
          const result = await post('/checkout/create',{slug,address:checkoutAddress,expectedTotal});
          location.assign(result.url);
        } catch (error) {
          creating = false;
          fields.disabled = false;
          invalidateQuote();
          notice.textContent = error.message;
          help.textContent = 'Calculate shipping and tax again before retrying payment.';
        }
      });
      panel.append(form,details,pay,help,notice);
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
      buy.textContent = 'Buy this painting';
      buy.setAttribute('aria-label',`Enter shipping details to buy ${title}`);
      buy.addEventListener('click',event => {
        event.preventDefault();
        panel.scrollIntoView({block:'start'});
        form.querySelector('input').focus({preventScroll:true});
      });
      cta.append(prompt,buy);
      document.querySelector('.product-layout').before(cta);
      return;
    }
  } catch (_) { /* Leave the existing inquiry action available. */ }

  try {
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
    link.textContent = 'Buy with PayPal';
    link.setAttribute('aria-label', `Buy ${title} with PayPal`);
    inquiry.prepend(link);
  } catch (_) {
    // The existing purchase inquiry remains available if links are not configured.
  }
});

