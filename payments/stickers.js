(() => {
  document.addEventListener('DOMContentLoaded', () => {
    const dialog = document.querySelector('[data-sticker-dialog]');
    const trigger = document.querySelector('[data-sticker-open]');
    if (!dialog || !trigger) return;
    let scrollX = 0, scrollY = 0, startedOnBackdrop = false;
    const open = () => {
      if (dialog.open) return;
      scrollX = window.scrollX;
      scrollY = window.scrollY;
      dialog.showModal();
      dialog.scrollTop = 0;
      document.documentElement.style.setProperty('--print-dialog-scroll', `-${scrollY}px`);
      document.documentElement.classList.add('print-dialog-open');
    };
    trigger.addEventListener('click', open);
    dialog.querySelector('[data-sticker-close]').addEventListener('click', () => dialog.close());
    const outside = (event) => {
      const rect = dialog.getBoundingClientRect();
      return event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
    };
    dialog.addEventListener('pointerdown', (event) => { startedOnBackdrop = event.target === dialog && outside(event); });
    dialog.addEventListener('click', (event) => {
      if (startedOnBackdrop && event.target === dialog && outside(event)) dialog.close();
      startedOnBackdrop = false;
    });
    dialog.addEventListener('close', () => {
      document.documentElement.classList.remove('print-dialog-open');
      document.documentElement.style.removeProperty('--print-dialog-scroll');
      window.scrollTo({ left: scrollX, top: scrollY, behavior: 'instant' });
      trigger.focus({ preventScroll: true });
    });
    const openFromHash = () => { if (location.hash === '#order-sticker') open(); };
    window.addEventListener('hashchange', openFromHash);
    openFromHash();

    const form = dialog.querySelector('[data-sticker-form]');
    const message = dialog.querySelector('[data-sticker-message]');
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const body = {
        productId: form.dataset.productId,
        variantId: data.get('variantId'),
        quantity: Number(data.get('quantity') || 1),
        recipient: {
          name: String(data.get('name') || '').trim(),
          email: String(data.get('email') || '').trim(),
          phone: String(data.get('phone') || '').trim(),
          address1: String(data.get('address1') || '').trim(),
          address2: String(data.get('address2') || '').trim(),
          city: String(data.get('city') || '').trim(),
          state: String(data.get('state') || '').trim(),
          zip: String(data.get('zip') || '').trim(),
          country: 'US',
        },
      };
      const button = form.querySelector('[type="submit"]');
      button.disabled = true;
      message.textContent = 'Checking…';
      try {
        const response = await fetch('/checkout/stickers/order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(body),
        });
        const payload = await response.json().catch(() => ({}));
        message.textContent = payload.message || payload.error || 'The sticker check could not be completed.';
      } catch {
        message.textContent = 'The sticker check could not be completed.';
      } finally {
        button.disabled = false;
      }
    });
  });
})();
