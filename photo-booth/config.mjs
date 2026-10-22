// studio-tracker #311 photo booth: every tunable lives here. Items marked TODO are open questions for TJ (see the PR).
const DAY = 86400e3;

export const EXPIRY = {
  // TODO(#311, OPEN): the exact expiry rule. The card has two readings of TJ's voice message
  // ("I want photos to expire if they give consent to keep them"): expire, or speech-to-text for "don't expire".
  // Placeholder follows the literal message: consenting photos expire after this many days. Set to null for "never expires".
  CONSENTED_TTL_DAYS: 90,
  // TODO(#311, OPEN): how long photos WITHOUT consent to keep stay up (card: "photos without that consent expire").
  UNCONSENTED_TTL_DAYS: 7,
};

export function expiresAt(consentKeep, createdAt) {
  const days = consentKeep ? EXPIRY.CONSENTED_TTL_DAYS : EXPIRY.UNCONSENTED_TTL_DAYS;
  return days == null ? null : createdAt + days * DAY;
}

// TODO(#311, OPEN): branded frame or overlay? Off until TJ chooses. The visitor picks one of FRAME.options (ids only);
// the id is stored with the photo and returned by the API. The frame itself is drawn by the client, never by this Worker.
export const FRAME = { enabled: false, options: ['none'] };

export const LIMITS = {
  MAX_PHOTO_BYTES: 2 * 1024 * 1024,
  CONTENT_TYPES: { 'image/jpeg': 'jpg', 'image/webp': 'webp', 'image/png': 'png' },
  WALL_CAP: 60,            // card: newest first, capped at about 60
  OWNER_TOKENS_MAX: 10,    // owner tokens accepted per request (one browser may have taken several photos)
  QUEUE_MAX: 200,
};
