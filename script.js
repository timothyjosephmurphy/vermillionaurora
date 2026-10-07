document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  const params = new URLSearchParams(window.location.search);
  const productSlug = params.get('product');
  const purchaseSlug = params.get('buy');
  const packageSlug = params.get('package');
  const message = form.querySelector('[name="message"]');
  const packageSelect = form.querySelector('[name="package"]');
  const sizeInput = form.querySelector('[name="size"]');

  const packageDefaults = {
    'single-portrait': { size: '9 × 12 inches', label: 'Single portrait' },
    'double-portrait': { size: '12 × 9 inches', label: 'Double portrait' },
    'small-landscape': { size: '12 × 15 inches', label: 'Small landscape' }
  };

  if (packageSlug && packageSelect) {
    const option = [...packageSelect.options].find(entry => entry.value === packageSlug);
    if (option) packageSelect.value = packageSlug;
    const defaults = packageDefaults[packageSlug];
    if (defaults) {
      if (sizeInput && !sizeInput.value) sizeInput.value = defaults.size;
      if (message && !message.value) {
        message.value = 'Hello, I’d like to commission a ' + defaults.label + '.\n\n';
      }
      const summary = form.querySelector('.package-summary');
      if (summary) {
        summary.hidden = false;
        const title = summary.querySelector('.package-title');
        const price = summary.querySelector('.package-price');
        if (title) title.textContent = option?.textContent?.split('—')[0]?.trim() || defaults.label;
        if (price) price.textContent = '50% deposit to start · Typical turnaround 2–4 weeks';
      }
    }
  }

  if (purchaseSlug || productSlug) {
    fetch('/catalog/products.json').then(response=>response.json()).then(async catalog=>{
      const product=catalog.products.find(p=>p.slug===(purchaseSlug||productSlug));
      if(!product)return;
      if(message && !message.value)message.value='Hello, I’m interested in '+product.title+'.\n\n';
      if(!purchaseSlug || product.listing?.status!=='available')return;
      const response=await fetch('https://vermillion-commissions.timothyjosephmurphy.workers.dev/inventory/status?ids='+encodeURIComponent(product.id),{cache:'no-store'});
      if(!response.ok || (await response.json()).availability?.[product.id]!=='available')return;
      const price=new Intl.NumberFormat('en-US',{style:'currency',currency:product.listing.price.currency,maximumFractionDigits:2}).format(Number(product.listing.price.amount));
      form.querySelector('[name="inquiryType"]').value='purchase';
      form.querySelector('[name="paintingSlug"]').value=product.slug;
      form.querySelector('[name="paintingTitle"]').value=product.title;
      form.querySelector('[name="paintingPrice"]').value=price;
      form.classList.add('purchase-mode');
      form.querySelectorAll('.commission-only').forEach(element=>{element.hidden=true;});
      const summary=form.querySelector('.purchase-summary');summary.hidden=false;
      summary.querySelector('.purchase-title').textContent=product.title;
      summary.querySelector('.purchase-price').textContent=price;
      if(message)message.value='Hello, I’m interested in purchasing '+product.title+' for '+price+'.\n\n';
    }).catch(()=>{});
  }

  if (packageSelect && message) {
    packageSelect.addEventListener('change', () => {
      const defaults = packageDefaults[packageSelect.value];
      if (defaults && sizeInput && !sizeInput.value) sizeInput.value = defaults.size;
    });
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
      const packageLabel = packageSelect?.selectedOptions?.[0]?.textContent?.trim();
      let description = (data.get('message') || '').toString();
      if (packageLabel && packageSelect?.value) {
        description = 'Package: ' + packageLabel + '\n\n' + description;
      }
      data.set('description', description);

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
