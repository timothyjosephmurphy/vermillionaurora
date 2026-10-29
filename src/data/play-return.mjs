// Buyer return chip (studio-tracker #96, #771).
// Production /play/ is the hex gallery. Every “← Back to 3D gallery” chip uses
// GALLERY_3D_URL. from=tags, from=preview-251, from=play, a saved play session,
// and a /play referrer all return there. They do not resume /play/?resume=1.
// Checkout on the hex preview still sends from=preview-251. Some browsers only
// send that origin as the referrer. Recognize the visit; the chip target is production.
import { GALLERY_3D_URL } from './gallery-entry.mjs';

const PLAY_RETURN_LABEL = '← Back to 3D gallery';
const PLAY_RETURN = { show: true, label: PLAY_RETURN_LABEL, href: GALLERY_3D_URL };
const HIDDEN = { show: false, label: '← Back to the gallery', href: '/gallery/' };
const LEGACY_HEX_HOST = 'preview-251.tjm-tag-gallery-preview.pages.dev';

function fromGallery(referrer) {
  if (!referrer) return false;
  try {
    const ref = new URL(referrer);
    if (ref.hostname === LEGACY_HEX_HOST) return true;
    return ref.pathname === '/play' || ref.pathname.startsWith('/play/');
  } catch {
    return false;
  }
}

export function playReturn({ search = '', referrer = '', playState = false } = {}) {
  const params = new URLSearchParams(String(search).replace(/^\?/, ''));
  const fromParam = (params.get('from') || '').trim().toLowerCase();
  if (fromParam === 'tags' || fromParam === 'preview-251' || fromParam === 'play') return PLAY_RETURN;
  if (fromGallery(referrer) || playState) return PLAY_RETURN;
  return HIDDEN;
}
