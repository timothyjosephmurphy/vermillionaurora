export const post = {
  slug: 'halloween-doc-holliday',
  headMeta: `<title>I Shaved My Beard to Be Doc Holliday | TJ Murphy</title>
  <meta name="description" content="Halloween as Doc Holliday: shaving the beard, a wild carnival party, betting a singing bowl at Treasure Blackjack, and the joy of gyroscope toys.">
  <link rel="canonical" href="https://tjm.art/blog/halloween-doc-holliday/">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="TJ Murphy">
  <meta property="og:title" content="I Shaved My Beard to Be Doc Holliday">
  <meta property="og:description" content="Halloween as Doc Holliday: shaving the beard, a wild carnival party, betting a singing bowl at Treasure Blackjack, and the joy of gyroscope toys.">
  <meta property="og:url" content="https://tjm.art/blog/halloween-doc-holliday/">
  <meta property="og:image" content="https://tjm.art/blog/halloween-doc-holliday/media/og-halloween-doc-holliday.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="TJ Murphy as Doc Holliday in a tan cowboy hat and red bow tie, raising a small metal cup">
  <meta property="article:published_time" content="2026-11-11">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="I Shaved My Beard to Be Doc Holliday">
  <meta name="twitter:description" content="Halloween as Doc Holliday: shaving the beard, a wild carnival party, betting a singing bowl at Treasure Blackjack, and the joy of gyroscope toys.">
  <meta name="twitter:image" content="https://tjm.art/blog/halloween-doc-holliday/media/og-halloween-doc-holliday.jpg">
  <meta name="theme-color" content="#ffffff">
  <link href="/fonts/fonts.css" rel="stylesheet">
  `,
  css: `
    :root{--paper:#fff;--ink:#2c2924;--muted:#6f685e;--red:#9c3e32;--line:#d8cfc2;--gold:#c5a46d}
    *{box-sizing:border-box}
    html{background:#fff}
    body{margin:0;color:var(--ink);font:16px/1.78 Inter,system-ui,sans-serif;background:#fff}
    a{color:inherit}
    .topbar{max-width:1200px;margin:auto;padding:24px clamp(20px,5vw,68px);display:flex;justify-content:space-between;align-items:center;gap:12px;border-bottom:1px solid var(--line);font-size:.77rem;letter-spacing:.12em;text-transform:uppercase}
    .topbar a{text-decoration:none}.brand{font-weight:600;color:var(--red)}
    .hero{max-width:1000px;margin:auto;padding:clamp(56px,9vw,112px) 24px 56px;text-align:center}
    h1,h2{font-family:"Cormorant Garamond",Georgia,serif}
    h1{font-size:clamp(2.5rem,6vw,5rem);font-weight:500;line-height:.98;letter-spacing:-.035em;max-width:900px;margin:0 auto 26px}
    .byline{color:var(--muted);font-size:.78rem;letter-spacing:.09em;text-transform:uppercase;margin:0}
    .article{max-width:808px;padding:0 24px 100px;margin:auto}
    h2{font-size:clamp(2.2rem,5vw,3.4rem);line-height:1;font-weight:500;margin:64px 0 22px;letter-spacing:-.02em}
    p{margin:0 0 1.25em}
    .article p a{color:var(--red);text-underline-offset:3px}
    figure.photo{margin:36px 0;background:#f2f2f2}
    figure.photo img{display:block;width:100%;height:auto}
    figure.photo video{display:block;width:100%;height:auto;aspect-ratio:16/9;background:#000}
    figure.photo.portrait img{width:auto;max-width:100%;max-height:82vh;margin:auto}
    footer{border-top:1px solid var(--line);max-width:1200px;margin:auto;padding:28px 24px 42px;display:flex;justify-content:space-between;gap:16px;color:var(--muted);font-size:.78rem}
    @media(max-width:700px){.topbar{padding:17px 20px}.hero{padding:56px 20px 40px}.article{padding:0 19px 66px}figure.photo{margin:28px -19px}footer{padding:22px 20px;flex-direction:column}}
    .pay-bitcoin{padding:14px 18px;border-left:3px solid var(--gold);background:#fafafa}
    figure.single{margin:32px auto;max-width:640px;text-align:center}
    figure.single.small{max-width:480px}
    figure.single img,figure.single video{display:block;margin:auto;max-width:100%;max-height:60vh;width:auto;height:auto;object-fit:contain;background:#f2f2f2;cursor:zoom-in}
    figure.single video{background:#000;cursor:default}
    figure.single.video.small{max-width:400px}
    figcaption{font-size:.82rem;line-height:1.45;color:var(--muted);margin-top:8px;text-align:left}
    .thumbs{display:grid;gap:12px;margin:32px 0;grid-template-columns:repeat(3,1fr)}
    .thumbs.n2{grid-template-columns:repeat(2,minmax(0,240px));justify-content:center}
    .thumbs.n4{grid-template-columns:repeat(4,1fr)}
    .thumbs .cell{margin:0}
    .thumbs img{display:block;width:100%;height:240px;object-position:50% 25%;object-fit:cover;border-radius:4px;cursor:zoom-in;background:#f2f2f2}
    .thumbs figcaption{font-size:.74rem}
    #lb{position:fixed;inset:0;background:rgba(20,18,15,.92);display:none;align-items:center;justify-content:center;flex-direction:column;z-index:99;padding:24px;cursor:zoom-out}
    #lb.on{display:flex}
    #lb img{max-width:92vw;max-height:82vh;object-fit:contain}
    #lb p{color:#eee;font-size:.85rem;max-width:760px;margin:12px 0 0;text-align:center}
    @media(max-width:700px){.thumbs,.thumbs.n4{grid-template-columns:repeat(2,1fr)}.thumbs img{height:200px}figure.single{margin:26px auto}}
    @media print{figure,.thumbs .cell{break-inside:avoid}h2{break-after:avoid}#lb{display:none!important}}
      figure.single.small img{max-width:min(100%,480px)}
    .credit{font-size:.8rem;color:var(--muted);text-align:center;margin:-14px 0 28px}
    .credit a{color:var(--red)}
    blockquote{margin:28px 0;padding:6px 0 6px 22px;border-left:3px solid var(--gold);font-family:"Cormorant Garamond",Georgia,serif;font-size:1.45rem;line-height:1.45}
    figure.side{float:right;width:220px;max-width:40%;margin:6px 0 16px 28px}
    figure.side img{display:block;width:100%;height:auto;max-height:60vh;object-fit:contain;cursor:zoom-in;background:#f2f2f2;border-radius:4px}
    figure.single,.thumbs,h2{clear:both}
    @media(max-width:700px){figure.side{float:none;width:auto;max-width:200px;margin:24px auto}}
    `,
  headRest: `
  <style>
    html,body{background:#fff}

  </style>
`,
  between: `
  <header class="hero">
    <h1>I Shaved My Beard to Be Doc Holliday</h1>
    <p class="byline">By TJ Murphy · <time datetime="2026-11-11">November 11, 2026</time></p>
  </header>
  `,
  main: `
    <p class="pay-bitcoin"><strong>You can pay with Bitcoin for my original paintings and prints on <a href="https://tjm.art/gallery/available/">tjm.art</a>.</strong></p>
    <p>This Halloween I went as Doc Holliday. Which meant the beard had to go.</p>
    <h2>Shaving for the part</h2>
    <p>Doc Holliday was a gambler with a sharp mustache, not a guy with a big beard. So on Halloween afternoon, a little after two, I got out the straight razor and the lather and went to work.</p>
    <p>There&#x27;s a point halfway through a shave like this where you&#x27;re not either guy. The cheeks are gone, the mustache and the chin are still hanging on, and you look like you lost a bet. I took a picture of that moment, because why not.</p>
    <div class="thumbs n2"><figure class="cell"><img src="media/doc-holliday-shave-halfway.jpg" width="1024" height="768" alt="Halfway there: cheeks cleared, mustache and chin beard still on." class="zoom" data-caption="Halfway there: cheeks cleared, mustache and chin beard still on." loading="eager" fetchpriority="high" decoding="async"><figcaption>Halfway there: cheeks cleared, mustache and chin beard still on.</figcaption></figure><figure class="cell"><img src="media/doc-holliday-straight-razor.jpg" width="768" height="1024" alt="Straight razor and lather: the beard comes off for Doc." class="zoom" data-caption="Straight razor and lather: the beard comes off for Doc." loading="lazy" decoding="async"><figcaption>Straight razor and lather: the beard comes off for Doc.</figcaption></figure></div>
    <h2>Becoming Doc</h2>
    <figure class="side"><img src="media/zatcabala-holster-makers-mark.jpg" width="900" height="1200" alt="The maker&#x27;s mark on my holsters." class="zoom" data-caption="The maker&#x27;s mark on my holsters." loading="lazy" decoding="async"><figcaption>The maker&#x27;s mark on my holsters.</figcaption></figure>
    <p>By that night I was Doc. A tan cowboy hat from Ouray, Colorado. A red bow tie, a blue shirt, a dark vest, and a burgundy patterned jacket from Nordstrom. Holsters by <a href="https://www.etsy.com/shop/oregonLeathercraft">Zatcabala Oregon Leathercraft</a> of Eugene, Oregon (<a href="https://www.instagram.com/oregonleathercraft/">@oregonleathercraft</a> on Instagram, zatcabala@gmail.com), which I found at the Revival festival in Chimacum. The mustache, styled. And a little tiny cup, the metal one in my hand in these photos.</p>
    <p>Several women at the party were very excited about that jacket. Thank you, Nordstrom.</p>
    <figure class="single small"><img src="media/doc-holliday-beanbag-tin-cup.jpg" width="339" height="508" alt="Doc Holliday holding court on a beanbag: hat, bow tie, patterned jacket, little tin cup." class="zoom" data-caption="Doc Holliday holding court on a beanbag: hat, bow tie, patterned jacket, little tin cup." loading="lazy" decoding="async"><figcaption>Doc Holliday holding court on a beanbag: hat, bow tie, patterned jacket, little tin cup.</figcaption></figure>
    <figure class="single small"><img src="media/doc-holliday-tin-cup-closeup.jpg" width="508" height="339" alt="Close up, mustache waxed, tin cup in hand." class="zoom" data-caption="Close up, mustache waxed, tin cup in hand." loading="lazy" decoding="async"><figcaption>Close up, mustache waxed, tin cup in hand.</figcaption></figure>
    <p class="credit">Photos by <a href="https://www.sergeyavdeev.com">Sergey Avdeev</a></p>
    <h2>A carnival of a party</h2>
    <p>That night I went to a very wild party, set up as a carnival.</p>
    <p>There was a squirt gun booth, a water gun booth, and a face-slapping booth. Two ways to get wet and one way to get slapped. At one point the carny and the face-slapping guy got into a fight. It was a staged show, I should say, before anyone worries about the face-slapping guy.</p>
    <p>I also got an oracle reading from an ancient crone consulting the ancient gods. The oracle told me the first sign drawn is usually a bad one, because it means someone&#x27;s watching. But the second and third signs canceled it out. So everything was great. I&#x27;ll take it.</p>
    <h2>Treasure Blackjack</h2>
    <p>Then there was Treasure Blackjack, the table where people bet treasures. Nobody bet money. The house had its own pile of stuff to put up: books, a copper water bottle, crystals, knick-knacks. You brought your own things to bet against the house, and the dealer would find something of comparable value to match. I bet a singing bowl and won a copper water bottle. I&#x27;ll take that trade.</p>
    <p>I love this. It&#x27;s gambling where the worst case is you go home with somebody&#x27;s crystal instead of your own thing. Doc would have been right at home, and honestly a lot less likely to get shot.</p>
    <figure class="single small"><img src="media/doc-holliday-4am-hat-off.jpg" width="508" height="339" alt="Nearly 4 AM: hat off, still grinning." class="zoom" data-caption="Nearly 4 AM: hat off, still grinning." loading="lazy" decoding="async"><figcaption>Nearly 4 AM: hat off, still grinning.</figcaption></figure>
    <p class="credit">Photos by <a href="https://www.sergeyavdeev.com">Sergey Avdeev</a></p>
    <p>It went late. That last picture is from almost four in the morning. Hat off, still grinning.</p>
    <h2>The gyroscope</h2>
    <p>The thing I keep coming back to from that night wasn&#x27;t the costume or the cards, though. It was a toy.</p>
    <blockquote>&ldquo;I also discovered the joy of gyroscope toys. It feels like when you&#x27;re dancing with your eyes closed, the gyroscope feels like you&#x27;re moving your hand over a higher dimensional object.&rdquo;</blockquote>
    <p>That feeling, of touching the edge of a shape you can&#x27;t fully see, is a lot of what I&#x27;m after when I paint. It&#x27;s the same thing I&#x27;m chasing with the dancers in <a href="https://tjm.art/neural-dance/">Neural Dance</a>. You feel it moving before you can say what it is.</p>
    <h2>Come see the paintings</h2>
    <p>If you want a higher dimensional object of your own, the closest I can get you is a painting. My original paintings and prints are on <a href="https://tjm.art/gallery/available/">tjm.art</a>.</p>
    <p class="pay-bitcoin"><strong>You can pay with Bitcoin for any original painting or print on <a href="https://tjm.art/gallery/available/">tjm.art</a>.</strong></p>
    <!-- Studio notes signup (studio-tracker #89); same Buttondown form as /about/ -->
    {{signup}}
  `,
  afterFooter: `
  <div id="lb" role="dialog" aria-modal="true"><img alt=""><p></p></div>
  <script>
  (function(){var lb=document.getElementById('lb'),im=lb.querySelector('img'),cp=lb.querySelector('p');
  document.querySelectorAll('img.zoom').forEach(function(el){el.addEventListener('click',function(){im.src=el.src;im.alt=el.alt;cp.textContent=el.dataset.caption||'';lb.classList.add('on');});});
  lb.addEventListener('click',function(){lb.classList.remove('on');});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')lb.classList.remove('on');});})();
  </script>
`,
};
