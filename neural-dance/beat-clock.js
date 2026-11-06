// Beat grid for Neural Dance dots. Kick locks beat 1. Bass, snare, and
// hi-hat sit on beats 2, 3, and 4. The clock free-runs so a quiet room
// still shows the count, and a kick onset pulls beat 1 back to the hit.
export const BEAT_LABELS = ['1', '2', '3', '4'];
const MIN_BPM = 70;
const MAX_BPM = 180;
const MIN_GAP = 280;
const MAX_GAP = 1100;

export function beatLabel(band) {
  const slot = (band | 0) & 3;
  return BEAT_LABELS[slot];
}

// 1 at the start of this band's beat, falling to 0 over the first 30%.
export function beatFlash(beatIndex, frac, band) {
  const slot = ((band | 0) & 3) + 1;
  if ((beatIndex | 0) !== slot) return 0;
  const t = +frac || 0;
  if (t <= 0) return 1;
  if (t >= 0.3) return 0;
  return 1 - t / 0.3;
}

export function createBeatClock({bpm = 120, now = 0} = {}) {
  let estimate = clampBpm(bpm);
  let period = 60000 / estimate;
  let origin = now;
  let lastKick = null;
  const gaps = [];

  function clampBpm(value) {
    const n = +value;
    if (!Number.isFinite(n)) return 120;
    return Math.max(MIN_BPM, Math.min(MAX_BPM, n));
  }

  function at(time) {
    const elapsed = (+time || 0) - origin;
    const wrapped = ((elapsed / period) % 4 + 4) % 4;
    const index = Math.floor(wrapped);
    return {beat: index + 1, frac: wrapped - index, bpm: Math.round(estimate)};
  }

  return {
    onset(band, time) {
      const slot = band | 0;
      const t = +time || 0;
      if (slot === 0) {
        if (lastKick != null) {
          const gap = t - lastKick;
          if (gap >= MIN_GAP && gap <= MAX_GAP) {
            gaps.push(gap);
            if (gaps.length > 6) gaps.shift();
            const mean = gaps.reduce((sum, gapMs) => sum + gapMs, 0) / gaps.length;
            estimate = clampBpm(60000 / mean);
            period = 60000 / estimate;
          }
        }
        lastKick = t;
        origin = t;
        return;
      }
      if (lastKick == null || t - lastKick > period * 8) origin = t - (slot & 3) * period;
    },
    note(mask, time) {
      const bits = mask | 0;
      for (let band = 0; band < 4; band++) if (bits & (1 << band)) this.onset(band, time);
    },
    at,
    bpm() { return Math.round(estimate); },
    flash(band, time) {
      const place = at(time);
      return beatFlash(place.beat, place.frac, band);
    },
    label: beatLabel,
    readout(time) {
      const place = at(time);
      return place.bpm + ' BPM · ' + place.beat;
    }
  };
}
