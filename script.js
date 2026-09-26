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
  const params = new URLSearchParams(window.location.search);
  const productSlug = params.get('product');
  const purchaseSlug = params.get('buy');
  const message = form.querySelector('[name="message"]');

  if (purchaseSlug) {
    fetch('/gallery/inventory.json')
      .then((response) => response.json())
      .then((inventory) => {
        const painting = (inventory.paintings || []).find((item) => item.A === purchaseSlug);
        if (!painting || painting.E !== 'Available') return;

        const price = painting.C
          ? new Intl.NumberFormat('en-US', { style: 'currency', currency: painting.D || 'USD', maximumFractionDigits: 0 }).format(Number(painting.C))
          : 'Price on request';

        form.querySelector('[name="inquiryType"]').value = 'purchase';
        form.querySelector('[name="paintingSlug"]').value = painting.A;
        form.querySelector('[name="paintingTitle"]').value = painting.B;
        form.querySelector('[name="paintingPrice"]').value = price;

        form.querySelectorAll('.commission-only').forEach((element) => { element.hidden = true; });
        const summary = form.querySelector('.purchase-summary');
        summary.hidden = false;
        summary.querySelector('.purchase-title').textContent = painting.B;
        summary.querySelector('.purchase-price').textContent = price;

        if (message) {
          message.value = 'Hello, I’m interested in purchasing ' + painting.B + ' for ' + price + '.\n\n';
        }
      })
      .catch(() => {});
  }
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
      data.set('name', [firstName, lastName].filter(Boolean).join(' ') || 'Website visitor');
      data.set('description', (data.get('message') || '').toString());

      for (const fieldName of ['referenceImage', 'paletteImage']) {
        const file = data.get(fieldName);
        if (!(file instanceof File) || !file.size) continue;

        if (file.size > 10 * 1024 * 1024) {
          status.textContent = 'Optimizing image…';
          const optimized = await optimizeImage(file);

          if (optimized.size > 10 * 1024 * 1024) {
            status.textContent = 'This image could not be reduced enough to upload. Please choose a smaller image.';
            return;
          }

          data.set(fieldName, optimized, optimized.name);
        }
      }

      const response = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' }
      });

      let result = {};
      try {
        result = await response.json();
      } catch (_) {}

      if (!response.ok) {
        status.textContent = result.error
          ? 'Submission error: ' + result.error
          : 'Your message could not be sent. Please try again or email TJ@VermillionAurora.com directly.';
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


async function optimizeImage(file) {
  const supported = new Set(['image/jpeg', 'image/png', 'image/webp']);
  if (!supported.has(file.type)) return file;

  const bitmap = await createImageBitmap(file);
  const maxDimension = 3000;
  const scale = Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height));
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d', { alpha: false });
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const baseName = file.name.replace(/\.[^.]+$/, '') || 'reference-image';
  const targetBytes = 5 * 1024 * 1024;
  let quality = 0.88;
  let blob = await canvasToBlob(canvas, 'image/jpeg', quality);

  while (blob.size > targetBytes && quality > 0.55) {
    quality -= 0.08;
    blob = await canvasToBlob(canvas, 'image/jpeg', quality);
  }

  return new File([blob], baseName + '-optimized.jpg', {
    type: 'image/jpeg',
    lastModified: Date.now()
  });
}

function canvasToBlob(canvas, type, quality) {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => blob ? resolve(blob) : reject(new Error('Image compression failed')),
      type,
      quality
    );
  });
}
