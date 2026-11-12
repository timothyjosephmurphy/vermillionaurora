// Expands src/content/blog into static/blog/<slug>/index.html before Astro copies publicDir.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {renderArticle} from '../src/content/blog/shell.mjs';
import {logStyle} from '../src/content/blog/styles.mjs';
import {posts} from '../src/content/blog/posts/index.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const styles = {logStyle};

export function renderBlogPages() {
  for (const post of posts) {
    const css = post.cssName ? styles[post.cssName] : post.css;
    if (!css) throw new Error(`Blog post ${post.slug} has no CSS`);
    const html = renderArticle(post, css);
    const file = path.join(root, 'static/blog', post.slug, 'index.html');
    fs.mkdirSync(path.dirname(file), {recursive: true});
    if (!fs.existsSync(file) || fs.readFileSync(file, 'utf8') !== html) fs.writeFileSync(file, html);
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) renderBlogPages();
