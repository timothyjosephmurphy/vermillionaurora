// Collector testimonials. Edit src/data/testimonials.json; see docs/testimonials.md for the format.
import raw from './testimonials.json' with { type: 'json' };

const ok = value => value === true;
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const ID = /^[a-z0-9][a-z0-9-]{0,80}$/;
const DATE = /^(\d{4})-(\d{2})-(\d{2})$/;
// Hand-curated video stays on the public image host. The page CSP allows media and images from there.
const VIDEO_URL = /^https:\/\/img\.tjm\.art\/[a-z0-9][a-z0-9._/-]*$/;
const POSTER_URL = /^https:\/\/img\.tjm\.art\/[a-z0-9][a-z0-9._/-]*\.(?:jpe?g|png|webp)$/i;
const VTYPE = /^video\/(?:mp4|webm)$/;

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function receivedLabel(iso) {
  const match = DATE.exec(iso || '');
  if (!match) return '';
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (month < 1 || month > 12 || day < 1 || day > 31) return '';
  return `${MONTHS[month - 1]} ${day}, ${match[1]}`;
}

function onImageHost(url, pattern) {
  return typeof url === 'string' && pattern.test(url) && !url.includes('..');
}

function videoOf(t) {
  const video = t?.video;
  if (!ok(t?.consent?.video) || !video || typeof video !== 'object') return null;
  if (!onImageHost(video.src, VIDEO_URL) || !VTYPE.test(video.type)) return null;
  const poster = onImageHost(video.poster, POSTER_URL) ? video.poster : '';
  const width = Number.isInteger(video.width) && video.width > 0 && video.width <= 7680 ? video.width : 0;
  const height = Number.isInteger(video.height) && video.height > 0 && video.height <= 4320 ? video.height : 0;
  return {src: video.src, type: video.type, poster, width, height};
}

const safeHref = href => typeof href === 'string' && href.startsWith('/') && !href.startsWith('//') && !/[\s"<>]/.test(href) ? href : '';

// Publish consent is required. A quote or a consented video is enough; photos, selfies, city and map pins each need their own consent.
export function curateTestimonials(list) {
  if (!Array.isArray(list)) return [];
  return list.flatMap(t => {
    if (!ok(t?.consent?.publish) || typeof t.id !== 'string' || !ID.test(t.id)) return [];
    const quote = typeof t.quote === 'string' ? t.quote.trim() : '';
    const video = videoOf(t);
    if (!quote && !video) return [];
    const name = t.anonymous || !ok(t.consent.name) || !String(t.name || '').trim() ? 'A collector' : String(t.name).trim();
    return [{
      id: t.id,
      name,
      painting: typeof t.painting === 'string' ? t.painting : '',
      paintingHref: safeHref(t.paintingHref),
      quote,
      photo: ok(t.consent.photo) && typeof t.photo === 'string' ? t.photo : null,
      selfie: ok(t.consent.selfie) && typeof t.selfie === 'string' ? t.selfie : null,
      city: ok(t.consent.city) && typeof t.city === 'string' ? t.city : '',
      pin: ok(t.consent.map) && Number.isFinite(t.lat) && Number.isFinite(t.lng) ? [t.lat, t.lng] : null,
      received: receivedLabel(t.received) ? t.received : '',
      video,
    }];
  });
}

const nearRatio = (video, width, height) => video.width > 0 && video.height > 0 && Math.abs(video.width / video.height - width / height) < 0.01;
const videoFrameClass = video => nearRatio(video, 9, 16) ? ' testimonial-video-portrait' : nearRatio(video, 16, 9) ? ' testimonial-video-landscape' : '';

// Same card shape as the approved-submission cards in worker/testimonials-html.mjs.
// Width and height plus aspect-ratio reserve the box so the poster does not shift the page.
// A 9:16 player is capped and centered. preload="metadata", controls and playsinline; nothing autoplays.
export function renderCuratedTestimonial(t) {
  const parts = [];
  if (t.photo) {
    const who = t.name === 'A collector' ? 'a collector' : `${t.name}’s`;
    const alt = `${t.painting || 'Painting by TJ Murphy'} in ${who} home`;
    parts.push(`<img class="testimonial-photo" src="${esc(t.photo)}" alt="${esc(alt)}" loading="lazy" decoding="async">`);
  }
  if (t.video) {
    const video = t.video;
    const label = `Video from ${t.name}${t.painting ? ` about “${t.painting}”` : ''}`;
    const poster = video.poster ? ` poster="${esc(video.poster)}"` : '';
    const dims = video.width && video.height ? ` width="${video.width}" height="${video.height}"` : '';
    parts.push(`<figure class="testimonial-video${videoFrameClass(video)}"><video controls playsinline preload="metadata" aria-label="${esc(label)}"${dims}${poster}><source src="${esc(video.src)}" type="${esc(video.type)}"></video><p class="video-fallback" hidden>This video can’t play in this browser. Try Safari or another device, or <a href="${esc(video.src)}">open the video file</a>.</p></figure>`);
  }
  if (t.quote) parts.push(`<blockquote><p>${esc(`“${t.quote}”`)}</p></blockquote>`);
  let meta = `<strong>${esc(t.name)}</strong>`;
  if (t.city) meta += esc(` · ${t.city}`);
  if (t.received) meta += `<br><time datetime="${esc(t.received)}">${esc(receivedLabel(t.received))}</time>`;
  if (t.painting || t.paintingHref) {
    meta += '<br>';
    meta += t.paintingHref ? `<a href="${esc(t.paintingHref)}">${esc(t.painting || 'See the painting')}</a>` : esc(t.painting);
  }
  const selfie = t.selfie ? `<img class="testimonial-selfie" src="${esc(t.selfie)}" alt="" width="48" height="48" loading="lazy" decoding="async">` : '';
  parts.push(`<p class="testimonial-meta">${selfie}<span>${meta}</span></p>`);
  return `<li class="testimonial" id="${esc(t.id)}">${parts.join('')}</li>`;
}

export const testimonials = curateTestimonials(raw);
export const testimonialPins = testimonials.filter(t => t.pin).map(t => ({id: t.id, name: t.name, city: t.city, painting: t.painting, lat: t.pin[0], lng: t.pin[1]}));
