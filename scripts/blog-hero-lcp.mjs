// The first image in a blog article is the LCP element. It must not be lazy-loaded.
// Later images stay lazy. Idempotent: running twice leaves the same markup.
const IMG = /<img\b[^>]*>/gi;

function setAttr(tag, name, value) {
  const re = new RegExp(`\\s${name}\\s*=\\s*(["'])[^"']*\\1`, 'i');
  if (re.test(tag)) return tag.replace(re, ` ${name}="${value}"`);
  return tag.replace(/<img\b/i, `<img ${name}="${value}"`);
}

export function eagerBlogHero(html) {
  const mainAt = html.search(/<main\b/i);
  const start = mainAt >= 0 ? mainAt : html.search(/<body\b/i);
  if (start < 0) return html;
  let seen = 0;
  const next = html.slice(start).replace(IMG, tag => {
    seen += 1;
    if (seen === 1) {
      let out = setAttr(tag, 'loading', 'eager');
      out = setAttr(out, 'fetchpriority', 'high');
      if (!/\bdecoding\s*=/.test(out)) out = setAttr(out, 'decoding', 'async');
      return out;
    }
    if (/\bloading\s*=\s*(["'])eager\1/i.test(tag)) return setAttr(tag, 'loading', 'lazy');
    if (!/\bloading\s*=/.test(tag)) return setAttr(tag, 'loading', 'lazy');
    return tag;
  });
  return html.slice(0, start) + next;
}
