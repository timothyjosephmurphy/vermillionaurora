// Browser-facing image URL. Full-resolution print masters are not public.
export function publicImageSrc(image) {
  const src = image?.src || '';
  if (!/\/print-masters\//.test(src)) return src;
  const full = image?.fullSrc || '';
  return full && !/print-masters/.test(full) ? full : '';
}
