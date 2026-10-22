// studio-tracker #311 photo booth: every tunable lives here.
// TJ's decisions (Oct 22, 2026): consenting photos stay up indefinitely (no expiry), photos without consent are never stored,
// no frame, an inappropriate-content filter runs on every upload and publishes the photos that pass with no approval queue.

export const LIMITS = {
  MAX_PHOTO_BYTES: 2 * 1024 * 1024, // the client should downscale (about 1280 px on the long side) before upload
  CONTENT_TYPES: { 'image/jpeg': 'jpg', 'image/webp': 'webp', 'image/png': 'png' },
  WALL_CAP: 60,                     // card: newest first, capped at about 60
  ADMIN_LIST_MAX: 200,
};

export const FILTER = {
  // Workers AI vision model used as the filter (Workers AI has no dedicated NSFW image classifier, see the design doc).
  MODEL: '@cf/meta/llama-3.2-11b-vision-instruct',
  MAX_TOKENS: 60,
  // Hard cap on filter runs per rolling 24 hours, so a flood of uploads cannot run past Workers AI's free daily allowance.
  // Over the cap, uploads are refused (nothing stored) until the window moves on. A guess to keep usage inside the free allowance: measure neurons per image on the first real uploads, then tune.
  DAILY_MAX: 300,
};
