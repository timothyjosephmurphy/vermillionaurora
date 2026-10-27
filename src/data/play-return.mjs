// Buyer return chip (studio-tracker #96, #771).
// The default 3D gallery is the hex preview. A visit that came from tjm.art/play
// (or a saved Quake session) resumes that gallery. Both chips use the same label.
import { GALLERY_3D_URL } from './gallery-entry.mjs';

const PLAY_RETURN_LABEL = '← Back to 3D gallery';
const QUAKE_RETURN = { show: true, label: PLAY_RETURN_LABEL, href: '/play/?resume=1' };
const HEX_RETURN = { show: true, label: PLAY_RETURN_LABEL, href: GALLERY_3D_URL };
const HEX_ORIGIN = new URL(GALLERY_3D_URL).origin;

function playReferrer(referrer) {
  if (!referrer) return null;
  try {
    const ref = new URL(referrer);
    const onPlay = ref.pathname === '/play' || ref.pathname.startsWith('/play/');
    if (!onPlay) return null;
    return ref.origin === HEX_ORIGIN ? 'hex' : 'quake';
  } catch {
    return null;
  }
}

export function playReturn({ search = '', referrer = '', playState = false } = {}) {
  const params = new URLSearchParams(String(search).replace(/^\?/, ''));
  const from = playReferrer(referrer);
  if (from === 'hex') return HEX_RETURN;
  if (params.get('from') === 'play' || from === 'quake') return QUAKE_RETURN;
  if (playState) return QUAKE_RETURN;
  return { show: false, label: '← Back to the gallery', href: '/gallery/' };
}
