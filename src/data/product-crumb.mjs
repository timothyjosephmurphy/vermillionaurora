// Visible category in product breadcrumbs (studio-tracker #95).
// Available originals that only pointed at the whole gallery now name Available Paintings.
// Sold and not-for-sale originals stay on Gallery. Book sections use their own back label.
export function productCrumb(product) {
  const href = product.back?.href || '/gallery/';
  const fromLabel = String(product.back?.label || '').replace(/^←\s*Back to\s+/u, '').trim();
  if (product.archive) return { href, name: 'Archived Paintings' };
  if (product.olderWork && !href.startsWith('/products/')) return { href, name: 'Older Work' };
  if (product.series === 'strawberry-point' && !href.startsWith('/products/')) return { href, name: 'Strawberry Point Backpacking Trip' };
  if (product.artist === 'Paul Murphy') return { href, name: 'Paul Murphy' };
  if (product.type === 'commission') return { href, name: 'Commissions' };
  if (href.startsWith('/products/') || href.startsWith('/book-galleries/')) return { href, name: fromLabel || 'Gallery' };
  if (product.type === 'painting' && product.listing?.status === 'available' && (href === '/gallery/' || href === '/gallery')) {
    return { href: '/gallery/available/', name: 'Available Paintings' };
  }
  return { href, name: 'Gallery' };
}
