// Buyer return chip (studio-tracker #96). "Dungeon" only when this visit came from /play.
// A saved play session that was not this navigation says "3D gallery" and still resumes.
export function playReturn({ search = '', referrer = '', playState = false } = {}) {
  const params = new URLSearchParams(String(search).replace(/^\?/, ''));
  let refPlay = false;
  if (referrer) {
    try {
      const ref = new URL(referrer);
      refPlay = ref.pathname === '/play' || ref.pathname.startsWith('/play/');
    } catch {
      refPlay = false;
    }
  }
  if (params.get('from') === 'play' || refPlay) {
    return { show: true, label: '← Back to the Dungeon', href: '/play/?resume=1' };
  }
  if (playState) return { show: true, label: '← Back to the 3D gallery', href: '/play/?resume=1' };
  return { show: false, label: '← Back to the gallery', href: '/gallery/' };
}
