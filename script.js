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

  // Package options carry their own size (data-size). Sized/faced packages use
  // "<package>-<size>[-<faces>f]" values, e.g. ?package=single-portrait&size=12x15&faces=2.
  // Old links: Double portrait is now Portrait with 2 faces.
  const legacyPackages = { 'double-portrait': ['single-portrait', '2'] };
  const [packageSlugResolved, legacyFaces] = legacyPackages[packageSlug] || [packageSlug, null];
  const facesParam = params.get('faces') || legacyFaces;
  const tokens = [params.get('size'), facesParam && facesParam.replace(/f$/, '') + 'f'].filter(Boolean);
  const options = packageSelect ? [...packageSelect.options] : [];
  const packageValue = !packageSlugResolved ? null : options.some(o => o.value === packageSlugResolved) ? packageSlugResolved
    : (options.find(o => o.value === [packageSlugResolved, ...tokens].join('-'))
      || options.find(o => o.value.startsWith(packageSlugResolved + '-') && tokens.every(t => o.value.split('-').includes(t) || o.value.includes('-' + t)))
      || options.find(o => o.value.startsWith(packageSlugResolved + '-')))?.value;
  const optionFor = value => options.find(o => o.value === value);
  const defaultsFor = value => { const o = optionFor(value); return o && o.value !== 'custom' ? { size: o.dataset.size || '', label: o.textContent.split('—')[0].trim() } : null; };

  if (packageValue && packageSelect) {
    const option = [...packageSelect.options].find(entry => entry.value === packageValue);
    if (option) packageSelect.value = packageValue;
    const defaults = defaultsFor(packageValue);
    if (defaults) {
      if (sizeInput && !sizeInput.value && defaults.size) sizeInput.value = defaults.size;
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
      const defaults = defaultsFor(packageSelect.value);
      // Packages with a fixed size always show it; keep anything the client typed for custom work.
      const known = options.some(o => o.dataset.size && o.dataset.size === sizeInput?.value);
      if (defaults?.size && sizeInput && (!sizeInput.value || known)) sizeInput.value = defaults.size;
    });
  }

  const button = form.querySelector('button[type="submit"]');
  const status = form.querySelector('.form-status');
  const originalText = button.textContent;
  let sending = false;

  // After a request is sent for a fixed-price package, offer the 50% deposit through the
  // site checkout when the checkout service lists it (deposits can be switched off server-side).
  async function offerDeposit(packageId, requestId) {
    form.querySelector('.deposit-offer')?.remove();
    if (!/^[a-z0-9-]+$/.test(packageId || '')) return;
    try {
      const response = await fetch('https://vermillion-commissions.timothyjosephmurphy.workers.dev/checkout/cart/catalog', { cache: 'no-store' });
      const catalog = response.ok ? await response.json() : null;
      const deposit = catalog?.enabled && catalog.products?.find(p => p.id === 'deposit-' + packageId && p.methods?.length);
      if (!deposit) return;
      const methods = deposit.methods.map(m => m === 'bitcoin' ? 'Bitcoin' : m === 'square' ? 'card' : 'PayPal or card');
      const box = document.createElement('div');
      box.className = 'deposit-offer';
      const heading = document.createElement('p');
      heading.className = 'deposit-offer-title';
      heading.textContent = 'Ready to reserve your spot?';
      const text = document.createElement('p');
      text.textContent = 'Pay the 50% deposit of $' + Number(deposit.amount).toFixed(2) + ' (' + [...new Set(methods)].join(', ') + '). The balance is due before the finished work ships.';
      const link = document.createElement('a');
      link.className = 'button button-solid';
      const params = new URLSearchParams({ buy: deposit.id });
      if (/^[0-9a-f-]{36}$/.test(requestId || '')) params.set('request', requestId);
      link.href = '/cart/?' + params;
      link.textContent = 'Pay deposit';
      box.append(heading, text, link);
      status.after(box);
    } catch (_) {}
  }

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
      const chosenPackage = packageSelect?.value || '';
      form.reset();
      offerDeposit(chosenPackage, result.requestId);
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
