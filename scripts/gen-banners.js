// Generates a standalone banners.html at the site root — a shareable reel of all
// live HTML5/GSAP banners under assets/banners/<client>/<name>/.
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const BAN = path.join(ROOT, 'assets', 'banners');

const CLIENT_LABEL = { cmc: 'CMC Markets', mediamenu: 'Media Menu', privatbank: 'PrivatBank' };
const CLIENT_ORDER = ['cmc', 'mediamenu', 'privatbank'];

function adSize(indexHtml) {
  const html = fs.readFileSync(indexHtml, 'utf8');
  const m = html.match(/ad\.size"?[^>]*content="([^"]*)"/i);
  if (!m) return null;
  const w = (m[1].match(/width[=:\s]*([0-9]+)/i) || [])[1];
  const h = (m[1].match(/height[=:\s]*([0-9]+)/i) || [])[1];
  return w && h ? { w: +w, h: +h } : null;
}

// collect banners grouped by client
const groups = {};
for (const client of fs.readdirSync(BAN)) {
  const cdir = path.join(BAN, client);
  if (!fs.statSync(cdir).isDirectory()) continue;
  for (const name of fs.readdirSync(cdir)) {
    const idx = path.join(cdir, name, 'index.html');
    if (!fs.existsSync(idx)) continue;
    const size = adSize(idx);
    if (!size) continue;
    (groups[client] = groups[client] || []).push({ name, ...size });
  }
}

const clients = CLIENT_ORDER.filter(c => groups[c]).concat(
  Object.keys(groups).filter(c => !CLIENT_ORDER.includes(c)));

const total = Object.values(groups).reduce((n, a) => n + a.length, 0);

function stage(client, b) {
  const wide = b.w >= 900;
  const label = `${b.w} × ${b.h}`;
  return `
        <div class="banner-stage${wide ? ' banner-stage--wide' : ''} reveal">
          <div class="banner-stage__frame"><iframe src="assets/banners/${client}/${b.name}/index.html" width="${b.w}" height="${b.h}" title="${CLIENT_LABEL[client] || client} ${label}" loading="lazy" scrolling="no"></iframe></div>
          <span class="banner-stage__cap">${label}</span>
        </div>`;
}

const sections = clients.map(c => {
  // non-wide first, then wide (leaderboards) so the row reads tidily
  const items = groups[c].slice().sort((a, b) => (a.w >= 900) - (b.w >= 900));
  return `
      <section class="section--tight">
        <div class="container">
          <div class="case-subhead reveal"><span class="mono-label">${CLIENT_LABEL[c] || c}</span><h2>${CLIENT_LABEL[c] || c}</h2></div>
          <div class="live-row">${items.map(b => stage(c, b)).join('')}</div>
        </div>
      </section>`;
}).join('\n');

const page = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>HTML5 Banner Reel — Taras Skalny</title>
  <meta name="description" content="A reel of live, animated HTML5/GSAP display banners by Taras Skalny — ${total} units for CMC Markets, Media Menu and PrivatBank, running in your browser." />
  <meta property="og:title" content="HTML5 Banner Reel — Taras Skalny" />
  <meta property="og:description" content="Live animated HTML5/GSAP display banners, running in your browser." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://tskalny.github.io/banners.html" />
  <meta property="og:image" content="https://tskalny.github.io/assets/og-image.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:image" content="https://tskalny.github.io/assets/og-image.png" />
  <link rel="icon" href="assets/favicon.svg" type="image/svg+xml" />
  <link rel="icon" href="assets/favicon-32.png" sizes="32x32" type="image/png" />
  <link rel="apple-touch-icon" href="assets/apple-touch-icon.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="stylesheet" href="assets/css/style.css" />
</head>
<body>
  <header class="nav">
    <div class="container nav__inner">
      <a class="nav__logo" href="index.html"><span class="dot"></span>Taras Skalny</a>
      <nav><ul class="nav__menu">
        <li><a href="index.html#work">Full portfolio</a></li>
      </ul></nav>
      <div class="nav__right"><a class="btn btn--ghost" href="assets/Taras_Skalny_CV.pdf" download>CV</a><a class="btn btn--primary js-mail" data-u="tskalny" data-d="gmail.com" href="#">Get in touch</a></div>
      <button class="nav__toggle" aria-label="Menu" aria-expanded="false">☰</button>
    </div>
  </header>

  <main>
    <section class="hero" style="padding-bottom:0;">
      <div class="container">
        <p class="mono-label hero__label reveal">Live HTML5 / GSAP — ${total} banners</p>
        <h1 class="display reveal">Banner reel.</h1>
        <p class="lead hero__sub reveal">Animated display banners built in HTML5/GSAP — all running live in your browser, right here. Produced for CMC Markets, Media Menu and PrivatBank.</p>
      </div>
    </section>
${sections}

    <section class="section">
      <div class="container">
        <div class="contact-cta reveal">
          <p class="mono-label">More</p>
          <h2 class="section-heading">Want the full picture?</h2>
          <div class="contact-links">
            <a class="btn btn--primary" href="index.html#work">View full portfolio →</a>
            <a class="btn btn--outline js-mail" data-u="tskalny" data-d="gmail.com" data-showaddr="1" href="#">Email me</a>
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer class="footer">
    <div class="container">
      <div class="footer__top">
        <div class="footer__brand">Taras Skalny — Senior Digital Designer</div>
        <div class="footer__links">
          <a href="index.html#work">Portfolio</a>
          <a href="assets/Taras_Skalny_CV.pdf" download>CV (PDF)</a>
          <a href="#" class="js-mail" data-u="tskalny" data-d="gmail.com">Email</a>
          <a href="https://linkedin.com/in/taras-skalny" target="_blank" rel="noopener">LinkedIn</a>
          <a href="https://behance.net/tskalny62b1" target="_blank" rel="noopener">Behance</a>
        </div>
      </div>
      <div class="footer__bottom">
        <span>© <span id="year">2026</span> Taras Skalny. All rights reserved.</span>
        <span>Live HTML5/GSAP banner reel.</span>
      </div>
    </div>
  </footer>

  <script src="assets/js/main.js"></script>
</body>
</html>`;

fs.writeFileSync(path.join(ROOT, 'banners.html'), page);
console.log(`wrote banners.html — ${total} banners across ${clients.length} clients (${clients.join(', ')})`);
