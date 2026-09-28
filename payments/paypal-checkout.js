// Hosted PayPal links are enabled only after their fixed price matches the product page.
document.addEventListener('DOMContentLoaded', async () => {
  const summary = document.querySelector('.product-summary');
  const inquiry = summary?.querySelector('.product-inquiry');
  const priceText = summary?.querySelector('.product-detail-price')?.textContent?.trim();
  const availability = summary?.querySelector('.product-availability')?.textContent?.trim();
  const title = document.querySelector('.product-layout h1')?.textContent?.trim();
  const slug = location.pathname.match(/^\/products\/([a-z0-9-]+)\/?$/)?.[1];
  if (!inquiry || !slug || !title || availability !== 'Available' || !priceText) return;

  try {
    const response = await fetch('/payments/paypal-links.json');
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
