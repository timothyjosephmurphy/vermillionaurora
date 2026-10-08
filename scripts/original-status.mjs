// Mark one original sold, unavailable, or available.
// Usage: node scripts/original-status.mjs <product-id> sold|unavailable|available [--note "Gallery 110"]
// Requires INVENTORY_ADMIN_TOKEN in the environment. The token is never printed.
const id = process.argv[2];
const status = process.argv[3];
const noteAt = process.argv.indexOf('--note');
const note = noteAt >= 0 ? process.argv[noteAt + 1] || '' : '';
const allowed = new Set(['sold', 'unavailable', 'available']);
if (!id || !allowed.has(status) || (noteAt >= 0 && !process.argv[noteAt + 1])) {
  console.error('Usage: node scripts/original-status.mjs <product-id> sold|unavailable|available [--note "..."]');
  process.exit(1);
}
const token = process.env.INVENTORY_ADMIN_TOKEN;
if (!token) {
  console.error('INVENTORY_ADMIN_TOKEN is not set.');
  process.exit(1);
}
const origin = 'https://vermillion-commissions.timothyjosephmurphy.workers.dev';
const response = await fetch(origin + '/inventory/originals', {
  method: 'POST',
  headers: {Origin: 'https://tjm.art', Authorization: 'Bearer ' + token, 'Content-Type': 'application/json'},
  body: JSON.stringify({action: 'set', id, status, note})
});
const body = await response.json().catch(() => ({}));
if (!response.ok) {
  console.error(body.error || 'Status was not changed.');
  process.exit(2);
}
const etsy = body.etsy?.ok === false ? 'Etsy was not updated.' : body.etsy?.skipped === 'unmapped' ? 'No Etsy listing is linked.' : 'Etsy updated.';
console.log(`${body.id} is ${body.status}. ${etsy}`);
