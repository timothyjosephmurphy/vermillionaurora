// Share images: 1200x630 padded web copies on img.tjm.art (scripts/make-social-images.py). Never a print master
// or a legacy full-resolution file. Share descriptions never carry prices (studio-tracker #98).
import manifest from '../../scripts/social-images.json';
import { IMAGE_ORIGIN } from '../../scripts/lib/image-keys.mjs';
export const socialImage = product => manifest[product?.slug] ? `${IMAGE_ORIGIN}/${manifest[product.slug]}` : null;
export const withoutPrices = text => String(text || '').replace(/[^.!?]*\$\s?\d[\d,]*(?:\.\d+)?[^.!?]*[.!?]?/g, '').replace(/\s{2,}/g, ' ').trim();
