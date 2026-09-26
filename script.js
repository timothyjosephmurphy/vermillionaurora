document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  const productNames = {
  "warszawska-syrenka": "Warszawska Syrenka",
  "honeybadger-and-cub-with-genesis-block": "Honeybadger and Cub with Genesis Block",
  "el-zonte-at-sunrise": "El Zonte at Sunrise",
  "single-portrait": "Single portrait",
  "double-portrait": "Double portrait",
  "small-landscape": "Small landscape",
  "sunset-over-water": "Sunset Over Water",
  "velvet-dawn": "Velvet Dawn",
  "personal-portrait": "Personal Portrait"
};
  const productSlug = new URLSearchParams(window.location.search).get('product');
  const message = form.querySelector('[name="message"]');
  if (Object.hasOwn(productNames, productSlug) && message && !message.value) {
    message.value = 'Hello, I’m interested in ' + productNames[productSlug] + '.\n\n';
  }

  const button = form.querySelector('button[type="submit"]');
  const status = form.querySelector('.form-status');
  const originalText = button.textContent;
  let sending = false;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (sending || !form.reportValidity()) return;

    sending = true;
    button.disabled = true;
    button.textContent = 'Sending…';
    status.textContent = 'Sending your message…';
    form.setAttribute('aria-busy', 'true');

    try {
      const data = new FormData(form);
      const firstName = (data.get('firstName') || '').toString().trim();
      const lastName = (data.get('lastName') || '').toString().trim();
      const name = [firstName, lastName].filter(Boolean).join(' ') || 'Website visitor';

      const response = await fetch(form.action, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          name,
          email: (data.get('email') || '').toString(),
          description: (data.get('message') || '').toString(),
          size: '',
          palette: '',
          website: ''
        })
      });

      if (!response.ok) {
        status.textContent = 'Your message could not be sent. Please try again or email TJ@VermillionAurora.com directly.';
        return;
      }

      status.textContent = 'Thank you! Your message has been submitted.';
      form.reset();
    } catch (error) {
      status.textContent = 'We could not confirm your submission. Please check your connection and try again, or email TJ@VermillionAurora.com directly.';
    } finally {
      sending = false;
      button.disabled = false;
      button.textContent = originalText;
      form.removeAttribute('aria-busy');
    }
  });
});
