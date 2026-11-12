// Shared shell for the hand-written studio stories. scripts/render-blog-pages.mjs
// expands each post back to the same HTML that used to live in static/blog.
export const SIGNUP = `<section class="email-signup" aria-labelledby="blog-email-heading"><h2 id="blog-email-heading">Studio notes by email</h2><p>New paintings go to subscribers first, a few times a year. One print at cost when you join. Unsubscribe anytime.</p><form action="/newsletter/subscribe" method="post" class="email-signup-form"><label for="blog-email">Email address</label><input type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-10000px;width:1px;height:1px;overflow:hidden"><div class="email-signup-row"><input type="email" name="email" id="blog-email" autocomplete="email" required placeholder="you@example.com"><button type="submit" class="button button-solid">Subscribe</button></div></form></section>
    <style>.email-signup{max-width:640px;margin:48px auto;padding:24px;border:1px solid var(--line,#d7ccba);border-radius:12px;background:#fafafa}.email-signup h2{margin:0 0 8px;font-size:1.8rem}.email-signup p{margin:0 0 14px;line-height:1.6}.email-signup label{display:block;font-size:.8rem;margin-bottom:6px}.email-signup-row{display:flex;gap:10px;flex-wrap:wrap}.email-signup input[type=email]{flex:1 1 220px;min-height:44px;padding:10px 12px;border:1px solid #cdbfae;border-radius:6px;font:inherit}</style>`;
const NAV = '<nav class="topbar" aria-label="Article navigation"><a class="brand" href="/">TJM.art · Vermillion Aurora Productions</a><a href="/blog/">← Stories from the studio</a></nav>';
const FOOTER = '<footer><span>© Vermillion Aurora Productions</span><a href="/blog/">Back to Stories from the Studio</a></footer>';
const OPEN = '<!doctype html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  ';
const CSSLINK = '<link rel="stylesheet" href="/blog/article.css">';

export function renderArticle(post, css) {
  const main = post.main.replaceAll('{{signup}}', SIGNUP);
  return OPEN + post.headMeta + '<style>' + css + '</style>\n  ' + CSSLINK + post.headRest
    + '</head>\n<body>\n  ' + NAV + post.between + '<main class="article">' + main + '</main>\n  '
    + FOOTER + post.afterFooter + '</body>\n</html>\n';
}
