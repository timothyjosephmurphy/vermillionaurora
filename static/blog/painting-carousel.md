# Blog painting carousel

Static posts under `static/blog/` can embed a horizontal painting or product carousel. Swipe and scroll-snap work without JavaScript. The script adds previous/next buttons on screens wider than 800px, arrow-key (and Home/End) movement, a “1 / n” readout, and instant scrolling when `prefers-reduced-motion: reduce` is set.

These examples are paste-ready for later posts. They are not linked from the blog index. Do not add a new `static/blog/<slug>/index.html` or a card in `src/pages/blog/index.astro` until that post is ready to publish.

Load the assets once per page (the blog font stylesheet is already on each post):

```html
<link rel="stylesheet" href="/blog/painting-carousel.css">
<script src="/blog/painting-carousel.js" defer></script>
```

Place the `<section>` in `<main class="article">`, as a sibling of `.chapter`, not inside `.photo-grid`.

## Snippet

One `<figure class="blog-painting-slide">` per work. `data-product-id` is the catalog id. The link is `/products/{id}/`. Use the canonical product id when a book scan redirects (noted on the slides below).

Image rules, matching the catalog:

- Book-gallery scans are already a single WebP: `image.src` on the product, usually `https://media.vermillionaurora.com/images/book-galleries/v1/{hash}.webp`. No `srcset`.
- Gallery paintings whose `image.src` is in `scripts/display-images.json` use that file’s WebP variants as `srcset`. Point `src` at the largest variant that is 960px wide or smaller. `sizes` for this carousel is `(max-width: 800px) 78vw, 480px`.
- `alt` is the catalog image alt. The visible title is `.blog-painting-title`. Omit `.blog-painting-caption` when there is no short caption.

```html
<section class="blog-painting-carousel" aria-roledescription="carousel" aria-label="Paintings">
  <div class="blog-painting-track" tabindex="0" aria-label="Swipe or use arrow keys to browse paintings.">
    <figure class="blog-painting-slide" data-product-id="PRODUCT-ID">
      <a href="/products/PRODUCT-ID/">
        <img src="WEBP-OR-DISPLAY-URL" alt="Title" loading="lazy" decoding="async">
        <span class="blog-painting-title">Title</span>
        <span class="blog-painting-caption">Optional short caption</span>
      </a>
    </figure>
  </div>
  <div class="blog-painting-controls" hidden>
    <button type="button" data-dir="-1" aria-label="Previous painting">←</button>
    <p class="blog-painting-status" role="status" aria-live="polite"></p>
    <button type="button" data-dir="1" aria-label="Next painting">→</button>
  </div>
</section>
```

## El Salvador

```html
<section class="blog-painting-carousel" aria-roledescription="carousel" aria-label="Bitcoiners in El Salvador">
  <div class="blog-painting-track" tabindex="0" aria-label="Swipe or use arrow keys to browse paintings.">
    <figure class="blog-painting-slide" data-product-id="book-art-4afb5cab4bdbe1ff6845">
      <a href="/products/book-art-4afb5cab4bdbe1ff6845/">
        <img src="https://media.vermillionaurora.com/images/book-galleries/v1/4afb5cab4bdbe1ff6845.webp" alt="Viv @btcviv" loading="lazy" decoding="async">
        <span class="blog-painting-title">Viv @btcviv</span>
        <span class="blog-painting-caption">Met in El Salvador</span>
      </a>
    </figure>
    <figure class="blog-painting-slide" data-product-id="book-art-b38b9ae1893908d604da">
      <a href="/products/book-art-b38b9ae1893908d604da/">
        <img src="https://media.vermillionaurora.com/images/book-galleries/v1/b38b9ae1893908d604da.webp" alt="Alejandra Guajardo @MissBitcoin_sv" loading="lazy" decoding="async">
        <span class="blog-painting-title">Alejandra Guajardo @MissBitcoin_sv</span>
        <span class="blog-painting-caption">Adopting Bitcoin</span>
      </a>
    </figure>
    <figure class="blog-painting-slide" data-product-id="book-art-4d53927ad111f0259402">
      <a href="/products/book-art-4d53927ad111f0259402/">
        <img src="https://media.vermillionaurora.com/images/book-galleries/v1/4d53927ad111f0259402.webp" alt="Scott Dedels @LanternBitcoin" loading="lazy" decoding="async">
        <span class="blog-painting-title">Scott Dedels @LanternBitcoin</span>
        <span class="blog-painting-caption">Gifted in El Salvador</span>
      </a>
    </figure>
    <figure class="blog-painting-slide" data-product-id="book-art-c04c7e48687fe35e65f5">
      <a href="/products/book-art-c04c7e48687fe35e65f5/">
        <img src="https://media.vermillionaurora.com/images/book-galleries/v1/c04c7e48687fe35e65f5.webp" alt="Maya Parbhoe @MayaPar25" loading="lazy" decoding="async">
        <span class="blog-painting-title">Maya Parbhoe @MayaPar25</span>
        <span class="blog-painting-caption">Gifted in El Salvador</span>
      </a>
    </figure>
    <!-- Optional. book-art-ccff23f1e469654faa05 redirects to this page. Display WebP srcset from scripts/display-images.json.
    <figure class="blog-painting-slide" data-product-id="painting-portrait-in-green">
      <a href="/products/painting-portrait-in-green/">
        <img src="/display/portrait-in-green-f8263a9d41-808.webp" srcset="/display/portrait-in-green-f8263a9d41-160.webp 160w, /display/portrait-in-green-f8263a9d41-480.webp 480w, /display/portrait-in-green-f8263a9d41-808.webp 808w" sizes="(max-width: 800px) 78vw, 480px" alt="Chase Toole by TJ Murphy" loading="lazy" decoding="async">
        <span class="blog-painting-title">Chase Toole</span>
        <span class="blog-painting-caption">El Salvador</span>
      </a>
    </figure>
    -->
  </div>
  <div class="blog-painting-controls" hidden>
    <button type="button" data-dir="-1" aria-label="Previous painting">←</button>
    <p class="blog-painting-status" role="status" aria-live="polite"></p>
    <button type="button" data-dir="1" aria-label="Next painting">→</button>
  </div>
</section>
```

## South Africa

```html
<section class="blog-painting-carousel" aria-roledescription="carousel" aria-label="Bitcoiners in South Africa">
  <div class="blog-painting-track" tabindex="0" aria-label="Swipe or use arrow keys to browse paintings.">
    <figure class="blog-painting-slide" data-product-id="book-art-504e3fafdacd7c9bbcd0">
      <a href="/products/book-art-504e3fafdacd7c9bbcd0/">
        <img src="https://media.vermillionaurora.com/images/book-galleries/v1/504e3fafdacd7c9bbcd0.webp" alt="Osisipho Filane @FilaneSisipho" loading="lazy" decoding="async">
        <span class="blog-painting-title">Osisipho Filane @FilaneSisipho</span>
        <span class="blog-painting-caption">Whitsand and Mossel Bay</span>
      </a>
    </figure>
    <figure class="blog-painting-slide" data-product-id="book-art-4a0bb9cdd6c404c4e77c">
      <a href="/products/book-art-4a0bb9cdd6c404c4e77c/">
        <img src="https://media.vermillionaurora.com/images/book-galleries/v1/4a0bb9cdd6c404c4e77c.webp" alt="Scarlette Melon @Scarlette_melon" loading="lazy" decoding="async">
        <span class="blog-painting-title">Scarlette Melon @Scarlette_melon</span>
        <span class="blog-painting-caption">Cape Town to Whitsand</span>
      </a>
    </figure>
    <!-- Optional Cape Town still. Display WebP srcset from scripts/display-images.json.
    <figure class="blog-painting-slide" data-product-id="coined-in-watercolor-film-poster">
      <a href="/products/coined-in-watercolor-film-poster/">
        <img src="/display/coined-in-watercolor-film-poster-7c882f193a-724.webp" srcset="/display/coined-in-watercolor-film-poster-7c882f193a-160.webp 160w, /display/coined-in-watercolor-film-poster-7c882f193a-480.webp 480w, /display/coined-in-watercolor-film-poster-7c882f193a-724.webp 724w" sizes="(max-width: 800px) 78vw, 480px" width="724" height="1084" alt="Coined in Watercolor Film Poster by TJ Murphy" loading="lazy" decoding="async">
        <span class="blog-painting-title">Coined in Watercolor Film Poster</span>
      </a>
    </figure>
    -->
  </div>
  <div class="blog-painting-controls" hidden>
    <button type="button" data-dir="-1" aria-label="Previous painting">←</button>
    <p class="blog-painting-status" role="status" aria-live="polite"></p>
    <button type="button" data-dir="1" aria-label="Next painting">→</button>
  </div>
</section>
```

## Conference

```html
<section class="blog-painting-carousel" aria-roledescription="carousel" aria-label="Conference Bitcoiners">
  <div class="blog-painting-track" tabindex="0" aria-label="Swipe or use arrow keys to browse paintings.">
    <figure class="blog-painting-slide" data-product-id="book-art-7a498f39e7a66a2e8eb5">
      <a href="/products/book-art-7a498f39e7a66a2e8eb5/">
        <img src="https://media.vermillionaurora.com/images/book-galleries/v1/7a498f39e7a66a2e8eb5.webp" alt="Nico @BITVOLT" loading="lazy" decoding="async">
        <span class="blog-painting-title">Nico @BITVOLT</span>
        <span class="blog-painting-caption">Simply Bitcoin</span>
      </a>
    </figure>
    <figure class="blog-painting-slide" data-product-id="book-art-b57fc2205e7bce68d524">
      <a href="/products/book-art-b57fc2205e7bce68d524/">
        <img src="https://media.vermillionaurora.com/images/book-galleries/v1/b57fc2205e7bce68d524.webp" alt="Peter St. Onge @profstonge" loading="lazy" decoding="async">
        <span class="blog-painting-title">Peter St. Onge @profstonge</span>
        <span class="blog-painting-caption">Economist on X</span>
      </a>
    </figure>
    <figure class="blog-painting-slide" data-product-id="book-art-0ee2717bc04e65d0507e">
      <a href="/products/book-art-0ee2717bc04e65d0507e/">
        <img src="https://media.vermillionaurora.com/images/book-galleries/v1/0ee2717bc04e65d0507e.webp" alt="Kushboo Kullar @DrKhushboo_K" loading="lazy" decoding="async">
        <span class="blog-painting-title">Kushboo Kullar @DrKhushboo_K</span>
        <span class="blog-painting-caption">Met at Bitcoin conferences</span>
      </a>
    </figure>
    <figure class="blog-painting-slide" data-product-id="book-art-e4bbfe556c3c847d9c90">
      <a href="/products/book-art-e4bbfe556c3c847d9c90/">
        <img src="https://media.vermillionaurora.com/images/book-galleries/v1/e4bbfe556c3c847d9c90-color.webp" width="613" height="635" alt="Nick Szabo @NickSzabo4" loading="lazy" decoding="async">
        <span class="blog-painting-title">Nick Szabo @NickSzabo4</span>
        <span class="blog-painting-caption">Unenumerated</span>
      </a>
    </figure>
    <!-- book-art-e1fa746bb51029294a17 redirects to painting-chef-in-white. -->
    <figure class="blog-painting-slide" data-product-id="painting-chef-in-white">
      <a href="/products/painting-chef-in-white/">
        <img src="/display/chef-in-white-9d08f26feb-360.webp" srcset="/display/chef-in-white-9d08f26feb-160.webp 160w, /display/chef-in-white-9d08f26feb-360.webp 360w" sizes="(max-width: 800px) 78vw, 480px" alt="Jimmy Song @jimmysong by TJ Murphy" loading="lazy" decoding="async">
        <span class="blog-painting-title">Jimmy Song @jimmysong</span>
        <span class="blog-painting-caption">Swan and Pacific Bitcoin</span>
      </a>
    </figure>
    <figure class="blog-painting-slide" data-product-id="book-art-5a462e9705ba39d756a2">
      <a href="/products/book-art-5a462e9705ba39d756a2/">
        <img src="https://media.vermillionaurora.com/images/book-galleries/v1/5a462e9705ba39d756a2.webp" alt="Ser at Pacific Bitcoin Festival" loading="lazy" decoding="async">
        <span class="blog-painting-title">Ser at Pacific Bitcoin Festival</span>
        <span class="blog-painting-caption">Pacific Bitcoin Festival</span>
      </a>
    </figure>
    <figure class="blog-painting-slide" data-product-id="book-art-d95085ce3029e490bb31">
      <a href="/products/book-art-d95085ce3029e490bb31/">
        <img src="https://media.vermillionaurora.com/images/book-galleries/v1/d95085ce3029e490bb31.webp" alt="Cory Klippsten @coryklippsten" loading="lazy" decoding="async">
        <span class="blog-painting-title">Cory Klippsten @coryklippsten</span>
        <span class="blog-painting-caption">Swan and Pacific Bitcoin</span>
      </a>
    </figure>
    <figure class="blog-painting-slide" data-product-id="book-art-6ef848d3ccb6b48184ab">
      <a href="/products/book-art-6ef848d3ccb6b48184ab/">
        <img src="https://media.vermillionaurora.com/images/book-galleries/v1/6ef848d3ccb6b48184ab.webp" alt="Walker @WalkerAmerica" loading="lazy" decoding="async">
        <span class="blog-painting-title">Walker @WalkerAmerica</span>
        <span class="blog-painting-caption">Painted with Carla</span>
      </a>
    </figure>
    <figure class="blog-painting-slide" data-product-id="book-art-044d157c01c7bb07eeab">
      <a href="/products/book-art-044d157c01c7bb07eeab/">
        <img src="https://media.vermillionaurora.com/images/book-galleries/v1/044d157c01c7bb07eeab.webp" alt="Carla @carlabitcoin" loading="lazy" decoding="async">
        <span class="blog-painting-title">Carla @carlabitcoin</span>
        <span class="blog-painting-caption">Painted with Walker</span>
      </a>
    </figure>
  </div>
  <div class="blog-painting-controls" hidden>
    <button type="button" data-dir="-1" aria-label="Previous painting">←</button>
    <p class="blog-painting-status" role="status" aria-live="polite"></p>
    <button type="button" data-dir="1" aria-label="Next painting">→</button>
  </div>
</section>
```
