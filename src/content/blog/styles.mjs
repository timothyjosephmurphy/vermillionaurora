// Shared article CSS. Posts that still differ keep their own rules in the post file.
export const logStyle = `
    :root{--paper:#fff;--ink:#2c2924;--muted:#6f685e;--red:#9c3e32;--line:#d8cfc2;--gold:#c5a46d}
    *{box-sizing:border-box}
    html{background:var(--paper)}
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
    figure.photo{margin:36px 0;background:#e9e0d4}
    figure.photo img{display:block;width:100%;height:auto}
    figure.photo video{display:block;width:100%;height:auto;aspect-ratio:16/9;background:#000}
    figure.photo.portrait img{width:auto;max-width:100%;max-height:82vh;margin:auto}
    .timeline{padding-left:1.2em;margin:0 0 1.5em}.timeline li{margin:0 0 .8em}
    footer{border-top:1px solid var(--line);max-width:1200px;margin:auto;padding:28px 24px 42px;display:flex;justify-content:space-between;gap:16px;color:var(--muted);font-size:.78rem}
    @media(max-width:700px){.topbar{padding:17px 20px}.hero{padding:56px 20px 40px}.article{padding:0 19px 66px}figure.photo{margin:28px -19px}footer{padding:22px 20px;flex-direction:column}}
  `;
