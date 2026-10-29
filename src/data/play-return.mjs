// Buyer return chip (studio-tracker #96, #771).
// Soft-point: every “← Back to 3D gallery” chip uses GALLERY_3D_URL, the same
// entry as “Take me to the 3D gallery”. tjm.art/play stays Quake until Gallery
// hub #772, so these CTAs do not resume /play/?resume=1.
// Hex checkout sends from=tags (it used to hardcode from=play). A saved Quake
// session (tjmPlayState) or that legacy from=play must not send the buyer to
// the dungeon. from=<preview id> is accepted from the same constant.
import { GALLERY_3D_URL } from './gallery-entry.mjs';

const PLAY_RETURN_LABEL = '← Back to 3D gallery';
const HEX_RETURN = { show: true, label: PLAY_RETURN_LABEL, href: GALLERY_3D_URL };
const HIDDEN = { show: false, label: '← Back to the gallery', href: '/gallery/' };
const HEX_URL = new URL(GALLERY_3D_URL);
const HEX_ORIGIN = HEX_URL.origin;
const HEX_PREVIEW = HEX_URL.hostname.split('.')[0].toLowerCase();

function playReferrer(referrer) {
  if (!referrer) return null;
  try {
    const ref = new URL(referrer);
    // Cross-origin navigations often send only the origin (pathname "/").
    if (ref.origin === HEX_ORIGIN) return 'hex';
    const onPlay = ref.pathname === '/play' || ref.pathname.startsWith('/play/');
    return onPlay ? 'quake' : null;
  } catch {
    return null;
  }
}

export function playReturn({ search = '', referrer = '', playState = false } = {}) {
  const params = new URLSearchParams(String(search).replace(/^\?/, ''));
  const fromParam = (params.get('from') || '').trim().toLowerCase();
  const from = playReferrer(referrer);
  // Hex checkout wins over a saved Quake session or a leftover from=play.
  if (from === 'hex' || fromParam === 'tags' || fromParam === HEX_PREVIEW) return HEX_RETURN;
  if (fromParam === 'play' || from === 'quake' || playState) return HEX_RETURN;
  return HIDDEN;
}
