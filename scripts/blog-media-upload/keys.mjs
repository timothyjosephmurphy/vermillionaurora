// Object keys the temporary tjm-images uploader is allowed to write.
// Display and social names match the files committed for a story. Video and posters
// live under publish-assets/<slug>/ and are served from https://img.tjm.art/blog/<slug>/.
// Workers request bodies are capped well under the platform limit.
export const MAX_BYTES = 90_000_000;

const displayName = '[a-z0-9][a-z0-9.-]{0,180}\\.(?:webp|jpe?g|png)';
const socialName = '[a-z0-9][a-z0-9.-]{0,180}\\.(?:jpe?g|png|webp)';
const blogName = '[a-z0-9][a-z0-9.-]{0,180}\\.(?:webp|jpe?g|png|mp4)';
const slug = '[a-z0-9-]{1,80}';

const DISPLAY = new RegExp(`^static/display/(${displayName})$`);
const SOCIAL = new RegExp(`^static/social/(${socialName})$`);
const PUBLISH = new RegExp(`^scripts/blog-media-upload/publish-assets/(${slug})/(${blogName})$`);

export function objectKey(repoPath) {
  const file = String(repoPath).trim();
  let match = DISPLAY.exec(file);
  if (match) return `display/${match[1]}`;
  match = SOCIAL.exec(file);
  if (match) return `social/${match[1]}`;
  match = PUBLISH.exec(file);
  if (match) return `blog/${match[1]}/${match[2]}`;
  return null;
}

export function keyAllowed(key) {
  if (key.startsWith('display/') || key.startsWith('social/')) return objectKey(`static/${key}`) === key;
  const match = /^blog\/([a-z0-9-]{1,80})\/([^/]+)$/.exec(key);
  if (!match) return false;
  return objectKey(`scripts/blog-media-upload/publish-assets/${match[1]}/${match[2]}`) === key;
}

export function contentType(key) {
  const ext = key.split('.').pop().toLowerCase();
  return { webp: 'image/webp', jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', mp4: 'video/mp4' }[ext] || null;
}
