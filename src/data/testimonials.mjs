// Collector testimonials. Edit src/data/testimonials.json; see docs/testimonials.md for the format.
import raw from './testimonials.json';
const ok = value => value === true;
// Only entries with publish consent appear; photos, selfies, city and map pins each need their own consent.
export const testimonials = raw.filter(t => ok(t?.consent?.publish) && t.quote).map(t => ({
  id: t.id,
  name: t.anonymous || !ok(t.consent.name) ? 'A collector' : t.name,
  painting: t.painting || '',
  paintingHref: t.paintingHref || '',
  quote: t.quote,
  photo: ok(t.consent.photo) ? t.photo : null,
  selfie: ok(t.consent.selfie) ? t.selfie : null,
  city: ok(t.consent.city) ? t.city : '',
  pin: ok(t.consent.map) && Number.isFinite(t.lat) && Number.isFinite(t.lng) ? [t.lat, t.lng] : null,
}));
export const testimonialPins = testimonials.filter(t => t.pin).map(t => ({ name: t.name, city: t.city, painting: t.painting, lat: t.pin[0], lng: t.pin[1] }));
