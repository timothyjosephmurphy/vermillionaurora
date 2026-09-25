'use strict';
const form = document.querySelector('.commission-form');
const palette = document.querySelector('#palette-colors');
const paletteValue = document.querySelector('#palette-value');
const addColor = document.querySelector('#add-color');
const status = document.querySelector('.form-status');
const submit = form.querySelector('[type=submit]');
const size = form.elements.size;
const customSize = document.querySelector('#custom-size');
const previews = new Map();
let sending = false;
let colorId = 0;

function updateSize() {
  customSize.hidden = size.value !== 'Custom';
  for (const input of customSize.querySelectorAll('input, select')) {
    input.disabled = customSize.hidden;
    input.required = !customSize.hidden;
  }
}
size.addEventListener('change', updateSize);
updateSize();
const presets = {
  'single-portrait': ['Single portrait', '9 × 12 inches'],
  'double-portrait': ['Double portrait', '12 × 9 inches'],
  'small-landscape': ['Landscape', '12 × 15 inches']
};
const product = new URLSearchParams(location.search).get('product');
if (Object.hasOwn(presets, product)) {
  [form.elements.artwork_type.value, size.value] = presets[product];
}

function updatePalette() {
  const colors = [...palette.querySelectorAll('input')].map(input => input.value.toUpperCase());
  paletteValue.value = colors.join(', ');
  addColor.disabled = colors.length >= 5;
}
addColor.addEventListener('click', () => {
  if (palette.children.length >= 5) return;
  const id = `color-${++colorId}`;
  const cell = document.createElement('div');
  cell.className = 'palette-color';
  cell.innerHTML = `<label for="${id}">Color ${colorId}</label><input type="color" id="${id}" value="#8c4d39"><output for="${id}">#8C4D39</output><button type="button" aria-label="Remove color ${colorId}">Remove</button>`;
  const input = cell.querySelector('input');
  input.addEventListener('input', () => {
    cell.querySelector('output').textContent = input.value.toUpperCase();
    updatePalette();
  });
  cell.querySelector('button').addEventListener('click', () => {
    cell.remove(); updatePalette(); addColor.focus();
  });
  palette.append(cell);
  updatePalette();
  input.focus();
});

function validateFile(input) {
  const file = input.files[0];
  let error = '';
  if (file && !['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) error = 'Choose a JPG, PNG, or WebP image.';
  if (file && file.size > 10 * 1024 * 1024) error = 'Choose an image smaller than 10 MB, or paste an image link instead.';
  input.setCustomValidity(error);
  return !error;
}
for (const input of form.querySelectorAll('[type=file]')) {
  input.addEventListener('change', () => {
    const preview = document.querySelector(`#${input.id}-preview`);
    if (previews.has(input)) URL.revokeObjectURL(previews.get(input));
    previews.delete(input);
    preview.hidden = true;
    preview.removeAttribute('src');
    if (!validateFile(input)) { input.reportValidity(); return; }
    if (input.files[0]) {
      const url = URL.createObjectURL(input.files[0]);
      previews.set(input, url);
      preview.src = url;
      preview.hidden = false;
    }
  });
}
form.addEventListener('reset', () => {
  for (const url of previews.values()) URL.revokeObjectURL(url);
  previews.clear();
  for (const preview of form.querySelectorAll('.upload-preview')) { preview.hidden = true; preview.removeAttribute('src'); }
  for (const input of form.querySelectorAll('[type=file]')) input.setCustomValidity('');
  palette.replaceChildren();
  colorId = 0;
  queueMicrotask(() => { updatePalette(); updateSize(); });
});
form.addEventListener('submit', async event => {
  event.preventDefault();
  if (sending) return;
  for (const input of form.querySelectorAll('[type=file]')) validateFile(input);
  if (!form.reportValidity()) return;
  updatePalette();
  const data = new FormData(form);
  // Empty file fields must not turn a text-only inquiry into an upload request.
  for (const input of form.querySelectorAll('[type=file]')) if (!input.files.length) data.delete(input.name);
  if (size.value === 'Custom') data.set('size', `${form.elements.width.value} × ${form.elements.height.value} ${form.elements.units.value} (width × height)`);
  if (!paletteValue.value) data.delete('color_palette');
  sending = true;
  submit.disabled = true;
  submit.textContent = 'Sending…';
  form.setAttribute('aria-busy', 'true');
  status.dataset.state = 'sending';
  status.textContent = 'Sending your commission request…';
  try {
    const response = await fetch(form.action, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
    if (!response.ok) {
      const hasFiles = [...data.values()].some(value => value instanceof File && value.size);
      throw new Error(hasFiles
        ? 'Your request was not sent. Please try again, or remove the attachments and provide an image link. You can also email your images and request to TJ@VermillionAurora.com. Your entries are still here.'
        : 'Your request was not sent. Please try again or email TJ@VermillionAurora.com. Your entries are still here.');
    }
    form.reset();
    status.dataset.state = 'success';
    status.textContent = 'Thank you! Your commission request has been submitted. TJ will reply by email to discuss the details.';
  } catch (error) {
    status.dataset.state = 'error';
    status.textContent = error instanceof TypeError
      ? 'We could not confirm your submission. Check your connection before trying again, or email TJ@VermillionAurora.com. Your entries are still here.'
      : error.message;
  } finally {
    sending = false;
    submit.disabled = false;
    submit.textContent = 'Send commission request';
    form.removeAttribute('aria-busy');
  }
});
