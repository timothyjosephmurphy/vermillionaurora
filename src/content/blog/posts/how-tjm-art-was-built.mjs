export const post = {
  slug: 'how-tjm-art-was-built',
  headMeta: `<title>How tjm.art was built | TJ Murphy</title>
  <meta name="description" content="A dated log of how I built my art website, from the first commit in September 2026 to my first blog post on October 4, 2026.">
  <link rel="canonical" href="https://tjm.art/blog/how-tjm-art-was-built/">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="TJ Murphy">
  <meta property="og:title" content="How tjm.art was built">
  <meta property="og:description" content="A dated log of how I built my art website, from the first commit in September 2026 to my first blog post on October 4, 2026.">
  <meta property="og:url" content="https://tjm.art/blog/how-tjm-art-was-built/">
  <meta property="og:image" content="https://img.tjm.art/social/how-tjm-art-was-built-aba277665d.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="Esperanza, a painting by TJ Murphy">
  <meta property="article:published_time" content="2026-10-03">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="How tjm.art was built">
  <meta name="twitter:description" content="A dated log of how I built my art website, from the first commit in September 2026 to my first blog post on October 4, 2026.">
  <meta name="twitter:image" content="https://img.tjm.art/social/how-tjm-art-was-built-aba277665d.jpg">
  <meta name="theme-color" content="#fff">
  <link href="/fonts/fonts.css" rel="stylesheet">
  `,
  cssName: 'logStyle',
  headRest: `
`,
  between: `
  <header class="hero">
    <h1>How tjm.art was built</h1>
    <p class="byline">By TJ Murphy · <time datetime="2026-10-03">October 3, 2026</time></p>
  </header>
  `,
  main: `
    <figure class="photo"><img fetchpriority="high" loading="eager" src="/display/esperanza-hero-aba277665d-1134.webp" width="1134" height="638" alt="Esperanza, a painting by TJ Murphy" decoding="async"></figure>
    <p>I'm TJ Murphy, a painter based in Seattle. My studio is Vermillion Aurora Productions. This is the short version of how the site got from a first commit to a first blog post, in about three weeks. The site lived at vermillionaurora.com during this stretch.</p>
    <ul class="timeline">
      <li><strong>Sep 14, 2026.</strong> First commit: a simple portfolio site on Cloudflare Pages. Added the Neural Dance page the same day.</li>
      <li><strong>Sep 21.</strong> Moved deployment off Bluehost to Cloudflare. Connected the contact form. Homepage copy now says what I do: watercolor pastels and acrylic murals. Added product and commission pages. Built out the Neural Dance story with the mural simulation.</li>
      <li><strong>Sep 23.</strong> Murals page with the Friends Club and garden mural stories. Artist statement, portraits and documentary on the About page. Book pages, including Reflections on Time. Full painting gallery with detail pages.</li>
      <li><strong>Sep 24.</strong> Art books readable on the site (Portraits, Landscapes, Reflections on Time). Exhibition galleries and homepage carousels. Film section with the Gavin Robertson documentary. Credited Brian and Marcos on the Cormorant mural. Added my dad, Paul Murphy, as a featured artist.</li>
      <li><strong>Sep 25.</strong> Cleaned up painting titles, dimensions and availability. Portrait commission galleries. Commission form with image uploads, plus a purchase form for existing paintings. Intiman Auction exhibition.</li>
      <li><strong>Sep 28.</strong> Paul Murphy painting pages. Stories for six paintings. First online checkout with PayPal, then a sandbox to test shipping, tax and stock holds before going live.</li>
      <li><strong>Sep 29.</strong> Moved checkout toward a controlled production rollout. Shipping labels through Shippo.</li>
      <li><strong>Sep 30.</strong> Berlin mural and Bitcoin Film Festival Warsaw galleries. Exhibition world map with dates. Artist-led homepage intro. Checkout turned on for paintings with dimensions.</li>
      <li><strong>Oct 1.</strong> Buy Now goes through a cart. Protected release branch for production. Moved the last images off Squarespace. Purchase policies published. Print editions of my work and my dad's, with supplier-verified framing. Started the Etsy connection.</li>
      <li><strong>Oct 2.</strong> Sitemap and robots.txt. Etsy print drafts for FinerWorks. Square card checkout, with Bitcoin and Lightning shown alongside. Curated the Travels gallery and homepage.</li>
      <li><strong>Oct 3.</strong> Links page for social profiles. Buffer scheduling. Bitcoin checkout pilot through BTCPay. Nostr publisher. Product sharing. Blog page added, synced with Nostr, with three launch stories scheduled.</li>
      <li><strong>Oct 4.</strong> First blog post: "Coined in Watercolor: Warsaw, Kraków, and Prague."</li>
    </ul>
    <p>tjm.art became the main domain a few days later, on Oct 7.</p>
    <!-- Studio notes signup (studio-tracker #89); same Buttondown form as /about/ -->
    <p class="pay-bitcoin"><strong>You can pay with Bitcoin.</strong></p>
    {{signup}}
  `,
  afterFooter: `
`,
};
