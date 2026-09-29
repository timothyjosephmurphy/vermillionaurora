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
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'button button-solid paypal-checkout-link';
      button.textContent = 'Buy with PayPal';
      button.setAttribute('aria-label',`Buy ${title} with PayPal`);
      button.addEventListener('click',async () => {
        button.disabled = true;
        button.textContent = 'Opening PayPal…';
        inquiry.prepend(notice);
        try {
          const result = await post('/checkout/create',{slug});
          location.assign(result.url);
        } catch (error) {
          notice.textContent = error.message;
          button.disabled = false;
          button.textContent = 'Buy with PayPal';
        }
      });
      inquiry.prepend(button);
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
