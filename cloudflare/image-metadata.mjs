// Image type sniffing and metadata stripping for public uploads (testimonial photos).
// Works on raw bytes without re-encoding pixels:
// - JPEG: drops EXIF/XMP/IPTC/comments and every APPn segment except JFIF, ICC profile and Adobe colour info,
//   and anything after the end-of-image marker (embedded MPF previews carry their own EXIF/GPS).
//   The EXIF orientation is kept by writing a fresh one-tag EXIF block, so phone photos stay upright.
// - PNG: drops eXIf, tEXt, zTXt, iTXt and tIME chunks and anything after IEND.
// - WebP: drops EXIF and XMP chunks and clears their VP8X flags.
// HEIC/HEIF cannot be stripped here; callers must keep those private (never publish them).
const ascii = (b, o, n) => String.fromCharCode(...b.subarray(o, o + n));
const u16be = (b, o) => (b[o] << 8) | b[o + 1];
const u32be = (b, o) => ((b[o] << 24) >>> 0) + (b[o + 1] << 16) + (b[o + 2] << 8) + b[o + 3];
const u32le = (b, o) => (b[o] | (b[o + 1] << 8) | (b[o + 2] << 16)) + ((b[o + 3] << 24) >>> 0);
const HEIF_BRANDS = new Set(['heic', 'heix', 'hevc', 'hevx', 'heim', 'heis', 'hevm', 'hevs', 'mif1', 'msf1']);

export function sniffImageType(bytes) {
  const b = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  if (b.length >= 3 && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return 'image/jpeg';
  if (b.length >= 8 && b[0] === 0x89 && ascii(b, 1, 3) === 'PNG' && b[4] === 0x0d && b[5] === 0x0a && b[6] === 0x1a && b[7] === 0x0a) return 'image/png';
  if (b.length >= 12 && ascii(b, 0, 4) === 'RIFF' && ascii(b, 8, 4) === 'WEBP') return 'image/webp';
  if (b.length >= 12 && ascii(b, 4, 4) === 'ftyp' && HEIF_BRANDS.has(ascii(b, 8, 4))) return ascii(b, 8, 4).startsWith('he') && ascii(b, 8, 4) !== 'heif' ? 'image/heic' : 'image/heif';
  return null;
}

function exifOrientation(seg) {
  // seg: APP1 payload starting with "Exif\0\0".
  const t = 6;
  if (seg.length < t + 8) return 0;
  const le = ascii(seg, t, 2) === 'II';
  if (!le && ascii(seg, t, 2) !== 'MM') return 0;
  const r16 = o => le ? seg[o] | (seg[o + 1] << 8) : u16be(seg, o);
  const r32 = o => le ? u32le(seg, o) : u32be(seg, o);
  const ifd = t + r32(t + 4);
  if (ifd + 2 > seg.length) return 0;
  const count = r16(ifd);
  for (let i = 0; i < count; i++) {
    const e = ifd + 2 + i * 12;
    if (e + 12 > seg.length) break;
    if (r16(e) === 0x0112) { const v = r16(e + 8); return v >= 1 && v <= 8 ? v : 0; }
  }
  return 0;
}
function orientationSegment(orientation) {
  const payload = [0x45, 0x78, 0x69, 0x66, 0, 0, 0x4d, 0x4d, 0, 0x2a, 0, 0, 0, 8, 0, 1, 0x01, 0x12, 0, 3, 0, 0, 0, 1, 0, orientation, 0, 0, 0, 0, 0, 0];
  const len = payload.length + 2;
  return new Uint8Array([0xff, 0xe1, len >> 8, len & 255, ...payload]);
}

export function stripJpeg(input) {
  const b = input instanceof Uint8Array ? input : new Uint8Array(input);
  if (sniffImageType(b) !== 'image/jpeg') throw Error('Not a JPEG');
  const keep = [b.subarray(0, 2)];
  const removed = new Set();
  let orientation = 0, o = 2, insertAt = 1, ended = false;
  while (o < b.length) {
    if (b[o] !== 0xff) throw Error('Corrupt JPEG');
    while (b[o] === 0xff && o < b.length) o++;
    const marker = b[o]; o++;
    const start = o - 2;
    if (marker === 0xd9) { keep.push(new Uint8Array([0xff, 0xd9])); ended = true; break; }
    if ((marker >= 0xd0 && marker <= 0xd7) || marker === 0x01) { keep.push(new Uint8Array([0xff, marker])); continue; }
    if (o + 2 > b.length) throw Error('Corrupt JPEG');
    const len = u16be(b, o);
    if (len < 2 || o + len > b.length) throw Error('Corrupt JPEG');
    const payload = b.subarray(o + 2, o + len);
    const end = o + len;
    let keepIt = true;
    if (marker === 0xe1) { if (ascii(payload, 0, 6) === 'Exif\0\0') orientation = exifOrientation(payload) || orientation; removed.add(ascii(payload, 0, 4) === 'Exif' ? 'EXIF' : 'XMP/APP1'); keepIt = false; }
    else if (marker === 0xe0) keepIt = ascii(payload, 0, 5) === 'JFIF\0';
    else if (marker === 0xe2) keepIt = ascii(payload, 0, 12) === 'ICC_PROFILE\0';
    else if (marker === 0xee) keepIt = ascii(payload, 0, 5) === 'Adobe';
    else if (marker >= 0xe3 && marker <= 0xef) keepIt = false;
    else if (marker === 0xfe) keepIt = false;
    if (!keepIt && marker !== 0xe1) removed.add(marker === 0xfe ? 'comment' : 'APP' + (marker - 0xe0));
    if (keepIt) { keep.push(b.subarray(start, end)); if (marker === 0xe0) insertAt = keep.length; }
    o = end;
    if (marker === 0xda) {
      // Entropy-coded scan data: runs until a marker that is not stuffing (FF00) or a restart marker.
      let s = o;
      while (s + 1 < b.length && !(b[s] === 0xff && b[s + 1] !== 0 && !(b[s + 1] >= 0xd0 && b[s + 1] <= 0xd7) && b[s + 1] !== 0xff)) s++;
      if (s + 1 >= b.length) throw Error('Corrupt JPEG');
      keep.push(b.subarray(o, s));
      o = s;
    }
  }
  if (!ended) throw Error('Corrupt JPEG');
  if (orientation > 1) keep.splice(insertAt, 0, orientationSegment(orientation));
  return { bytes: concat(keep), removed: [...removed], orientation };
}

const PNG_DROP = new Set(['eXIf', 'tEXt', 'zTXt', 'iTXt', 'tIME']);
export function stripPng(input) {
  const b = input instanceof Uint8Array ? input : new Uint8Array(input);
  if (sniffImageType(b) !== 'image/png') throw Error('Not a PNG');
  const keep = [b.subarray(0, 8)], removed = new Set();
  let o = 8, ended = false;
  while (o + 12 <= b.length) {
    const len = u32be(b, o), type = ascii(b, o + 4, 4), end = o + 12 + len;
    if (end > b.length) throw Error('Corrupt PNG');
    if (PNG_DROP.has(type)) removed.add(type); else keep.push(b.subarray(o, end));
    o = end;
    if (type === 'IEND') { ended = true; break; }
  }
  if (!ended) throw Error('Corrupt PNG');
  return { bytes: concat(keep), removed: [...removed] };
}

export function stripWebp(input) {
  const b = input instanceof Uint8Array ? input : new Uint8Array(input);
  if (sniffImageType(b) !== 'image/webp') throw Error('Not a WebP');
  const total = Math.min(b.length, 8 + u32le(b, 4));
  const chunks = [], removed = new Set();
  let o = 12;
  while (o + 8 <= total) {
    const id = ascii(b, o, 4), len = u32le(b, o + 4), end = o + 8 + len + (len & 1);
    if (o + 8 + len > total) throw Error('Corrupt WebP');
    if (id === 'EXIF' || id === 'XMP ') removed.add(id.trim());
    else chunks.push(id === 'VP8X' ? (() => { const c = b.slice(o, Math.min(end, total)); c[8] &= ~0x0c; return c; })() : b.subarray(o, Math.min(end, total)));
    o = end;
  }
  const body = concat(chunks), out = new Uint8Array(12 + body.length);
  out.set(b.subarray(0, 12)); out.set(body, 12);
  const size = out.length - 8; out[4] = size & 255; out[5] = (size >> 8) & 255; out[6] = (size >> 16) & 255; out[7] = (size >>> 24) & 255;
  return { bytes: out, removed: [...removed] };
}

// Returns {type, bytes, removed, publishable}. Throws for unsupported or corrupt files.
export function cleanImage(input) {
  const b = input instanceof Uint8Array ? input : new Uint8Array(input);
  const type = sniffImageType(b);
  if (type === 'image/jpeg') return { type, publishable: true, ...stripJpeg(b) };
  if (type === 'image/png') return { type, publishable: true, ...stripPng(b) };
  if (type === 'image/webp') return { type, publishable: true, ...stripWebp(b) };
  if (type === 'image/heic' || type === 'image/heif') return { type, publishable: false, bytes: b, removed: [] };
  throw Error('Unsupported image type');
}

// IFD0 tag numbers of every EXIF block in a JPEG (GPS lives behind tag 0x8825). Used by tests and live verification.
export function jpegExifTags(input) {
  const b = input instanceof Uint8Array ? input : new Uint8Array(input), found = [];
  let o = 2;
  while (o + 4 <= b.length && b[o] === 0xff) {
    const marker = b[o + 1], len = u16be(b, o + 2);
    if (marker === 0xda || marker === 0xd9) break;
    const payload = b.subarray(o + 4, o + 2 + len);
    if (marker === 0xe1 && ascii(payload, 0, 6) === 'Exif\0\0') {
      const le = ascii(payload, 6, 2) === 'II';
      const r16 = x => le ? payload[x] | (payload[x + 1] << 8) : u16be(payload, x);
      const r32 = x => le ? u32le(payload, x) : u32be(payload, x);
      const ifd = 6 + r32(10), tags = [];
      for (let i = 0; i < r16(ifd) && ifd + 14 + i * 12 <= payload.length; i++) tags.push(r16(ifd + 2 + i * 12));
      found.push(tags);
    }
    o += 2 + len;
  }
  return found;
}
function concat(parts) { const n = parts.reduce((s, p) => s + p.length, 0), out = new Uint8Array(n); let o = 0; for (const p of parts) { out.set(p, o); o += p.length; } return out; }
