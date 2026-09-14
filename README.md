# Vermillion Aurora Website

This is a static landing page concept modeled after the current Vermillion Aurora brand and catalog style. It uses a warm editorial palette, gallery-driven product blocks, and a commission/contact flow suited to the existing Squarespace storefront.

## Upload-ready structure

A Bluehost-ready deployment folder has been prepared at `public_html/`.

Upload the contents of `public_html/` directly to your Bluehost `public_html` directory (or zip the folder and upload it as the site root):

- `index.html`
- `styles.css`
- `script.js`
- `.htaccess`

## Files
- `index.html` — homepage structure and content
- `styles.css` — styling, layout, and responsive behavior
- `script.js` — lightweight form interaction
- `public_html/` — Bluehost upload bundle

## Local preview
Open the project in a browser directly, or run a small local server from this folder:

python3 -m http.server 8000

Then visit:

http://localhost:8000

## Bluehost deployment
The simplest Bluehost setup for this site is to upload it as a static website:

1. Log in to Bluehost cPanel.
2. Open File Manager.
3. Navigate to `public_html`.
4. Upload everything inside `public_html/` to the root of `public_html`.
5. Make sure the main page is named `index.html`.
6. Visit your domain to confirm it loads.

### If you want a WordPress version instead
1. Install WordPress through Bluehost.
2. Use a theme that matches the same warm editorial aesthetic.
3. Replace the homepage with a custom landing page using Elementor or the WordPress editor.
4. Add product/service blocks and the contact form.

## Notes
This is a design-forward mockup rather than a full e-commerce backend. If you want, the next step can be converting this into a full Shopify, WordPress, or Bluehost-friendly storefront with real checkout and product management.
