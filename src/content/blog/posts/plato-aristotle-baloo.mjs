export const post = {
  slug: 'plato-aristotle-baloo',
  headMeta: `<title>Plato, Aristotle, and a Bear Named Baloo | TJ Murphy</title>
  <meta name="description" content="In 2008 I painted a School of Athens parody with Jungle Book characters on a Head Start wall in Falmouth, Kentucky.">
  <link rel="canonical" href="https://tjm.art/blog/plato-aristotle-baloo/">
  <link rel="preconnect" href="https://img.tjm.art" crossorigin>
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="TJ Murphy">
  <meta property="og:title" content="Plato, Aristotle, and a Bear Named Baloo">
  <meta property="og:description" content="In 2008 I painted a School of Athens parody with Jungle Book characters on a Head Start wall in Falmouth, Kentucky.">
  <meta property="og:url" content="https://tjm.art/blog/plato-aristotle-baloo/">
  <meta property="og:image" content="https://img.tjm.art/blog/plato-aristotle-baloo/og-plato-aristotle-baloo.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="A 2008 mural in Falmouth, Kentucky: Baloo as Plato and Mowgli as Aristotle under a painted sunburst, after Raphael&rsquo;s School of Athens.">
  <meta property="article:published_time" content="2026-11-19">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Plato, Aristotle, and a Bear Named Baloo">
  <meta name="twitter:description" content="In 2008 I painted a School of Athens parody with Jungle Book characters on a Head Start wall in Falmouth, Kentucky.">
  <meta name="twitter:image" content="https://img.tjm.art/blog/plato-aristotle-baloo/og-plato-aristotle-baloo.jpg">
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
  <script type="application/ld+json">{"@context":"https://schema.org","@type":"BlogPosting","headline":"Plato, Aristotle, and a Bear Named Baloo","description":"In 2008 I painted a School of Athens parody with Jungle Book characters on a Head Start wall in Falmouth, Kentucky.","datePublished":"2026-11-19","image":"https://img.tjm.art/blog/plato-aristotle-baloo/og-plato-aristotle-baloo.jpg","author":{"@type":"Person","name":"TJ Murphy","url":"https://tjm.art/about/"},"publisher":{"@type":"Organization","name":"Vermillion Aurora Productions","url":"https://tjm.art/"},"mainEntityOfPage":{"@type":"WebPage","@id":"https://tjm.art/blog/plato-aristotle-baloo/"}}</script>
`,
  between: `
  <header class="hero">
    <h1>Plato, Aristotle, and a Bear Named Baloo</h1>
    <p class="byline">By TJ Murphy · <time datetime="2026-11-19">November 19, 2026</time></p>
  </header>
  `,
  main: `
    <p>Back in 2008 I had a day job at Toyota, and Toyota had a volunteer program. One project had a group of us painting a Winnie the Pooh mural at a community center in Covington. The organizer liked how the Pooh wall turned out and asked if I&#x27;d do another one, this time at a Head Start center in Falmouth, Kentucky. This time I got to pick the subject.</p>
    <p>Here&#x27;s how I put it on the blog that August:</p>
    <blockquote>&ldquo;Subjects immediately began swirling around in my head; I was trying to think of something that would be recognizable and endearing to children, inspiration, and symbolic of the time we live in.&rdquo;</blockquote>
    <p>The first plan was a parody of Raphael&#x27;s <em>School of Athens</em> with Sesame Street characters, plus a computer, a DNA helix, a steam engine, an artist and a poet. &ldquo;Oscar the Grouch will be Diogenes, by the way.&rdquo; The idea was that the six-year-olds wouldn&#x27;t get the symbolism, but &ldquo;some spark of interest may stick with them as they get older.&rdquo;</p>
    <figure class="photo"><img class="zoom" data-caption="Raphael&#x27;s School of Athens reference, from the Aug 15 2008 post." src="https://img.tjm.art/blog/plato-aristotle-baloo/school-athens.jpg" width="1200" height="890" alt="Raphael&rsquo;s School of Athens, the reference for the Falmouth mural." loading="eager" fetchpriority="high" decoding="async"><figcaption>Raphael&#x27;s School of Athens reference, from the Aug 15 2008 post.</figcaption></figure>
    <p>The School of Athens stuck with me from a high school history class. My teacher pointed out Plato in the middle, pointing up toward the gods and the world of ideas, and Aristotle next to him with his hand held flat toward the earth. Two ways of knowing, standing side by side. I never forgot it.</p>
    <p>Sesame Street turned into the Jungle Book. Mowgli is Aristotle, and Baloo is Plato, each holding a book, Baloo with his paw pointing straight up. King Louie sprawls across the steps doing geometry. Shere Khan and Bagheera lounge around the edges. There might have been a snake in the plan at some point (Kaa didn&#x27;t make the final wall).</p>
    <p>I composed it myself, using an old overhead projector and transparency slides to throw the Jungle Book figures up onto the wall. One weekend I drove down by myself, taped out the wall, and spray-painted a huge sunburst across the whole thing. Then I came back with a Toyota coworker to paint the characters.</p>
    <figure class="photo portrait"><img class="zoom" data-caption="Me on a chair painting the sunburst rays." src="https://img.tjm.art/blog/plato-aristotle-baloo/sunburst-rays.jpg" width="900" height="1200" alt="TJ standing on a folding chair, taping and painting sunburst rays on the wall." loading="lazy" decoding="async"><figcaption>Me on a chair painting the sunburst rays.</figcaption></figure>
    <figure class="photo"><img class="zoom" data-caption="The finished background, sunburst and steps." src="https://img.tjm.art/blog/plato-aristotle-baloo/finished-background.jpg" width="1200" height="900" alt="The finished mural background: a painted sunburst, steps, and tree forms, before the characters." loading="lazy" decoding="async"><figcaption>The finished background, sunburst and steps.</figcaption></figure>
    <figure class="photo"><img class="zoom" data-caption="The full mural." src="https://img.tjm.art/blog/plato-aristotle-baloo/full-mural.jpg" width="1200" height="900" alt="The finished Jungle Book School of Athens mural on the Head Start wall in Falmouth, Kentucky." loading="lazy" decoding="async"><figcaption>The full mural.</figcaption></figure>
    <p>Was it great art? No. It was amateurish. The faces are, as I wrote at the time, &ldquo;a little lame, but the overall impression is impressive enough for preschoolers, I should think.&rdquo; For a preschool learning center that felt just right. A bear and a boy in a loincloth arguing about the nature of reality, under a giant orange sun, for kids learning their letters.</p>
    <p>The October 2008 post was titled &ldquo;Mowgli&#x27;s two-dimensionality limits comraderie,&rdquo; because the last photo is me with my arm around Mowgli&#x27;s shoulder. &ldquo;In case that&#x27;s not obvious.&rdquo;</p>
    <figure class="photo"><img class="zoom" data-caption="Me with my arm around Mowgli." src="https://img.tjm.art/blog/plato-aristotle-baloo/arm-around-mowgli.jpg" width="800" height="600" alt="TJ with his arm around the painted Mowgli on the finished mural." loading="lazy" decoding="async"><figcaption>Me with my arm around Mowgli.</figcaption></figure>
    <p>It still makes me laugh. And it&#x27;s one of the earliest walls where I got to decide what went on it.</p>
    <p>You can find this wall on my <a href="/exhibitions/world-map/">exhibitions and murals map</a>.</p>
    <p>-TJ</p>
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
