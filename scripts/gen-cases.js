// Generates work/<slug>.html case pages from a data table + shared chrome.
const fs = require('fs');
const path = require('path');

const OUT = path.resolve(__dirname, '..', 'work');
const IMG = path.resolve(__dirname, '..', 'assets', 'img');

const order = ['allshore','cmc','kassowrobots','brooks','tricension','condado','mototravel','primewatch','mediamenu','privatbank','tslmedia','email'];

const data = {
  allshore: {
    title: 'Allshore Talent', cat: 'Web &amp; Print · UI / UX', layout: 'web',
    lead: 'A visual identity across two deliverables for a global technology-staffing company — a corporate website system and a printed marketing booklet — translating a broad service offering (onshoring, nearshoring, offshoring and technology-as-a-service) into clear, trust-building design.',
    meta: { Client: 'Allshore Talent', Group: 'Cloud Primero', Role: 'UI/UX Designer · Freelance', Tools: 'Figma · Adobe CC' },
    overview: ['The brief was to make global tech staffing feel controlled and credible across both screen and print. The website is a flexible page system anchored by a strong editorial hero, scannable service modules, proof through stats and client logos, and a recurring four-step rhythm.',
      'The booklet carries the same brand language into a printed format — a “4 Pillars of Success” story told through bold type, generous imagery and consistent data points.'],
    cap: 'Homepage — hero, services, proof and conversion flow.',
    sectionLabel: { mono: 'Part 01 — Website', heading: 'Corporate website system' },
    booklet: { slug: 'allshore-booklet', mono: 'Part 02 — Booklet', heading: 'Print booklet — “4 Pillars of Success”',
      intro: 'A 17-page marketing booklet presenting the company story, capabilities and proof points — designed to be handed to enterprise clients alongside the website.' },
  },
  cmc: {
    title: 'CMC Markets', cat: 'Display · App Store · Social', layout: 'devices',
    lead: 'Multi-channel creative for CMC Markets, a global trading and CFD brand — App Store &amp; Google Play store previews, animated HTML5 display banners, and social / app-install campaign assets across markets (AU, CA).',
    meta: { Client: 'CMC Markets', Studio: 'Media Menu', Role: 'Digital Designer', Scope: 'Store · display · social' },
    overview: ['An ongoing client served through Media Menu: I produce store-listing previews for iOS, iPad and Android, resize and animate HTML5/GSAP display banners across the full IAB matrix, and build social and app-install (UAC) creative sets.',
      'The sections below show store previews, live display banners and campaign social assets.'],
    sectionLabel: { mono: 'Part 01 — App Store', heading: 'App Store &amp; Google Play previews' },
    tabletSlug: 'cmc-ipad',
    storeLinks: {
      appstore: 'https://apps.apple.com/ca/app/cmc-cfd-trading/id535426268',
      googleplay: 'https://play.google.com/store/apps/details?id=com.cmcmarkets.android.cfd&hl=en_CA',
    },
    extraSections: [
      { mono: 'Part 02 — Display banners', heading: 'HTML5 / GSAP display', layout: 'banner',
        intro: 'Animated banner resizes across the standard IAB matrix. The units below are live; static frames follow.',
        bannerSlug: 'cmc', live: [
          { f: '970x250', w: 970, h: 250, l: '970 × 250 · leaderboard', wide: true },
          { f: '300x250', w: 300, h: 250, l: '300 × 250' },
          { f: '300x600', w: 300, h: 600, l: '300 × 600' },
        ],
        slug: 'cmc-banners-static' },
      { mono: 'Part 03 — Social &amp; app campaign', heading: 'Social / UAC creative', layout: 'banner',
        intro: 'Social and app-install campaign assets (CFD, Forex, Social Proof) for the Canadian market.',
        slug: 'cmc-uac' },
      { mono: 'Part 04 — Email', heading: 'Responsive HTML email',
        intro: 'A responsive, inbox-safe HTML email — shown live below, running in your browser.',
        emailSlug: 'cmc' },
    ],
  },
  kassowrobots: {
    title: 'Kassow Robots', cat: 'Exhibition · Print · Brand', layout: 'gallery',
    lead: 'Exhibition and print design for Kassow Robots (Denmark) — a full booth package for AUTOMATE 2026 in Chicago, plus brochures, white papers and brand collateral, all prepared for large-format print production.',
    meta: { Company: 'Kassow Robots · Denmark', Role: 'Graphic Designer · Freelance', Scope: 'Booth + print + brand', Tools: 'InDesign · Adobe CC' },
    overview: ['As a freelance graphic designer I produced a large-format exhibition booth for AUTOMATE 2026 (Chicago), technical white papers and brand-consistent marketing materials — all press-ready for professional print production.',
      'The work spans stand graphics, printed brochures and supporting brand assets.'],
    sectionLabel: { mono: 'Part 01 — Exhibition booth', heading: 'AUTOMATE 2026 booth · Chicago' },
    extraSections: [
      { slug: 'kassowrobots-live', mono: 'Part 02 — Built', heading: 'Live on the show floor · AUTOMATE 2026',
        intro: 'The booth design realized and built at AUTOMATE 2026 in Chicago — the stand I designed, in use on the trade-show floor.', layout: 'gallery' },
      { slug: 'kassowrobots-brochure', mono: 'Part 03 — Print', heading: 'Brochure &amp; collateral',
        intro: 'Printed brochures and marketing materials carrying the brand system into large-format print.', layout: 'gallery' },
      { slug: 'kassowrobots-sig', mono: 'Part 04 — Brand assets', heading: 'Email signature',
        intro: 'A branded email-signature template for company-wide communications.', layout: 'small' },
    ],
  },
  brooks: {
    title: 'Brooks England', cat: 'E-commerce · Web &amp; Mobile', layout: 'web',
    lead: 'A redesign exploration for Brooks England, the heritage British maker of leather saddles and bags — bringing catalog, product and store-locator experiences into a calm, product-first layout for desktop and mobile.',
    meta: { Client: 'Brooks England', Role: 'UI &amp; E-commerce', Scope: 'Catalog · PDP · Mobile', Tools: 'Figma' },
    overview: ['The focus was letting craftsmanship lead. Generous product imagery, quiet typography and a restrained palette put the goods front and centre, while filtering, product detail and store-locator flows stay effortless to scan.',
      'Mobile screens carry the same hierarchy down to a single column without losing the editorial feel.'],
    cap: 'Homepage — product-first hero and catalog entry points.',
    mobileCount: 5, mobileLabel: 'Mobile', autoPhones: [0, 1],
  },
  tricension: {
    title: 'Tricension', cat: 'Web Design · Case Study', layout: 'web',
    lead: 'A website template and visual identity study for Tricension, an IT-services company — defining a reusable page system and the supporting brand language. Tricension is part of the Cloud Primero group, alongside Allshore Talent and Condado.',
    meta: { Client: 'Tricension', Group: 'Cloud Primero', Role: 'Web &amp; Visual Design', Tools: 'Figma · Adobe CC' },
    overview: ['Starting from an editable website template, I developed a consistent component rhythm and a visual case study showing how the system scales across pages and content types.',
      'The result is a flexible, on-brand foundation the team can extend without redesigning each page.'],
    cap: 'Editable website template — base page system.',
  },
  condado: {
    title: 'Condado', cat: 'Branding · Print', layout: 'gallery',
    lead: 'A brand identity case study for Condado, presented as a polished A4 deck and a printed booklet — covering logo, type, color and applied collateral. Condado is part of the Cloud Primero group, alongside Allshore Talent and Tricension.',
    meta: { Client: 'Condado', Group: 'Cloud Primero', Role: 'Brand &amp; Print Design', Tools: 'Adobe CC' },
    overview: ['The case study walks through the identity system end to end: concept, logo construction, palette, typography and applied collateral.',
      'Booklet spreads translate the system into a tactile, print-ready format.'],
  },
  mototravel: {
    title: 'Moto Travel', cat: 'Web Design · Mobile', layout: 'web',
    lead: 'A tour-booking website concept for a motorcycle-travel brand — a bold landing experience and tour pages, designed for desktop and mobile.',
    meta: { Client: 'Moto Travel', Role: 'Web &amp; Mobile Design', Scope: 'Landing + tour pages', Tools: 'Figma' },
    overview: ['The design leans into adventure imagery with confident type and a clear booking path, from inspiration on the homepage to detail on individual tour pages.',
      'Mobile layouts preserve the energy while tightening the flow for on-the-go browsing.'],
    cap: 'Homepage — landing experience.',
    mobileCount: 3, mobileLabel: 'Mobile',
  },
  primewatch: {
    title: 'Primewatch', cat: 'Web · Landing', layout: 'single',
    lead: 'A website landing page for Primewatch — a clean, conversion-focused layout, designed while working at Media Menu.',
    meta: { Client: 'Primewatch', Studio: 'Media Menu', Role: 'Web Design', Tools: 'Figma' },
    overview: ['A focused landing page — clear hierarchy, one primary action, and a layout that keeps attention on the offer.'],
    cap: 'Landing page.',
  },
  mediamenu: {
    title: 'Display Advertising', cat: 'HTML5 · GSAP Banners', layout: 'banner',
    lead: 'Animated HTML5/GSAP banner campaigns for recognizable brands — Paco Rabanne, HSL, Magnussons, ecostor and many more — produced at Media Menu, where I have designed 500+ banners across the full IAB format matrix since 2019.',
    meta: { Clients: 'Rabanne · HSL · Magnussons · +more', Studio: 'Media Menu · Estonia', Role: 'HTML5 Banner Design', Scope: '500+ banners' },
    overview: ['Banner families span the full size matrix — from square mobile units to wide leaderboards — each kept on-brand and within ad-platform weight limits. Work ranges from small one-off sets to ongoing, at-scale production for brands Media Menu serves as an outsourcing studio.',
      'The banners below are real, live HTML5/GSAP units running in your browser.'],
    live: [
      { f: 'sq320', w: 320, h: 320, l: '320 × 320' },
      { f: 'sq320b', w: 320, h: 320, l: '320 × 320' },
      { f: 'rect336', w: 336, h: 280, l: '336 × 280' },
      { f: 'lead980', w: 980, h: 240, l: '980 × 240 · leaderboard', wide: true },
    ],
    extraSections: [
      { mono: 'Global brands', heading: 'Selected brand work', layout: 'banner',
        intro: 'A few of the international brands I have produced display and social creative for at Media Menu.',
        slug: 'brands', labels: ['Vodafone Business', 'Grey Goose', 'Paco Rabanne — Fame'] },
      { mono: 'And more', heading: 'Also produced for',
        intro: 'Additional brands delivered through Media Menu across display, social, email and video.',
        logos: ['Amazon', 'Mercedes-Benz', 'KLM', 'Air France', 'ALDI', 'ADAC', 'AIDA Cruises', 'Honda', 'Nissan', 'Altra Running', 'Veikkaus', 'Bacardi'] },
    ],
  },
  privatbank: {
    title: 'PrivatBank', cat: 'HTML5 · Banners', layout: 'banner',
    lead: 'A one-off HTML5 banner project for PrivatBank, produced for the agency Grape — animated horizontal and vertical formats for card and merchant products, delivered as lightweight HTML5.',
    meta: { Client: 'PrivatBank', Agency: '<a href="https://grape.ua/en" target="_blank" rel="noopener" style="text-decoration:underline;text-underline-offset:2px;">Grape</a>', Role: 'HTML5 Banner Design · One-off', Tools: 'Adobe Animate' },
    overview: ['A single, self-contained engagement for the agency Grape: matching horizontal and vertical banner formats built with consistent animation timing and clear, single-message storytelling.',
      'The units below are the real, live HTML5 banners running in your browser; static fallback frames follow.'],
    live: [
      { f: 'horizontal', w: 480, h: 320, l: '480 × 320 · card' },
      { f: 'pizza-h', w: 480, h: 320, l: '480 × 320 · merchant' },
      { f: 'vertical', w: 320, h: 480, l: '320 × 480 · card' },
      { f: 'pizza-v', w: 320, h: 480, l: '320 × 480 · merchant' },
    ],
  },
  tslmedia: {
    title: 'TSL Media', cat: 'Display Ads · Production', layout: 'banner',
    lead: 'High-volume static ad production for TSL Media Ltd (UK) — designing up to 200–300 display creatives per week for online lead-generation campaigns, at agency scale and pace.',
    meta: { Company: 'TSL Media Ltd · United Kingdom', Role: 'Graphic Designer · Freelance', Scope: '200–300 ads / week', Tools: 'Adobe CC' },
    overview: ['Freelance production (Aug 2024 – Mar 2026) across many concurrent lead-generation campaigns and formats, with an emphasis on speed, consistency and pixel-tight adaptation across sizes.'],
  },
  email: {
    title: 'Email Design', cat: 'Email · HTML', layout: 'gallery',
    lead: 'Responsive email design for HP, Mercedes-Benz and banking clients — templates built to render reliably across inbox clients, produced at Media Menu.',
    meta: { Clients: 'HP · Mercedes-Benz · banking', Studio: 'Media Menu', Role: 'Email Design', Tools: 'HTML · CSS' },
    overview: ['From promotional sends to product announcements, these templates pair clear hierarchy with bulletproof, inbox-safe construction.',
      'Designs scale from desktop width down to a single mobile column.'],
  },
};

function imgs(slug) {
  return fs.readdirSync(path.join(IMG, slug))
    .filter(f => /^\d+\.webp$/.test(f)).sort()
    .map(f => `../assets/img/${slug}/${f}`);
}

function chrome(active) {
  return {
    head: (title, desc) => `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title}</title>
  <meta name="description" content="${desc}" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${desc}" />
  <meta property="og:type" content="article" />
  <meta property="og:image" content="https://tskalny.github.io/assets/og-image.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:image" content="https://tskalny.github.io/assets/og-image.png" />
  <link rel="icon" href="../assets/favicon.svg" type="image/svg+xml" />
  <link rel="icon" href="../assets/favicon-32.png" sizes="32x32" type="image/png" />
  <link rel="apple-touch-icon" href="../assets/apple-touch-icon.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="stylesheet" href="../assets/css/style.css" />
</head>
<body>
  <div class="announce">Open to new opportunities — <a href="#" class="js-mail" data-u="tskalny" data-d="gmail.com">Get in touch</a></div>
  <header class="nav">
    <div class="container nav__inner">
      <a class="nav__logo" href="../index.html"><span class="dot"></span>Taras Skalny</a>
      <nav><ul class="nav__menu">
        <li><a href="../index.html#work">Work</a></li>
        <li><a href="../index.html#experience">Experience</a></li>
        <li><a href="../index.html#about">About</a></li>
        <li><a href="../index.html#contact">Contact</a></li>
      </ul></nav>
      <div class="nav__right"><a class="btn btn--ghost" href="../assets/Taras_Skalny_CV.pdf" download>CV</a><a class="btn btn--primary js-mail" data-u="tskalny" data-d="gmail.com" href="#">Get in touch</a></div>
      <button class="nav__toggle" aria-label="Menu" aria-expanded="false">☰</button>
    </div>
  </header>
  <main>`,
    foot: `
  </main>
  <footer class="footer">
    <div class="container">
      <div class="footer__top">
        <div class="footer__brand">Taras Skalny — Senior Digital Designer</div>
        <div class="footer__links">
          <a href="../index.html#work">Work</a><a href="../index.html#about">About</a>
          <a href="../assets/Taras_Skalny_CV.pdf" download>CV (PDF)</a>
          <a href="#" class="js-mail" data-u="tskalny" data-d="gmail.com">Email</a>
          <a href="https://linkedin.com/in/taras-skalny" target="_blank" rel="noopener">LinkedIn</a>
          <a href="https://behance.net/tskalny62b1" target="_blank" rel="noopener">Behance</a>
          <a href="https://github.com/tskalny" target="_blank" rel="noopener">GitHub</a>
        </div>
      </div>
      <div class="footer__bottom">
        <span>© <span id="year">2026</span> Taras Skalny. All rights reserved.</span>
        <span>Designed &amp; built by Taras Skalny.</span>
      </div>
    </div>
  </footer>
  <script src="../assets/js/main.js"></script>
</body>
</html>`,
  };
}

// reusable live-banner iframe row; bannerSlug points at assets/banners/<bannerSlug>/<f>/
function liveRow(bannerSlug, arr, title) {
  const stages = arr.map(b => `
        <div class="banner-stage${b.wide ? ' banner-stage--wide' : ''} reveal">
          <div class="banner-stage__frame"><iframe src="../assets/banners/${bannerSlug}/${b.f}/index.html" width="${b.w}" height="${b.h}" title="${title} ${b.l}" loading="lazy" scrolling="no"></iframe></div>
          <span class="banner-stage__cap">${b.l}</span>
        </div>`).join('');
  return `<p class="mono-label" style="margin-bottom:8px;">Live HTML5 — animated</p>
      <p class="live-note">Real banners running in your browser. They loop automatically.</p>
      <div class="live-row">${stages}</div>`;
}

function liveBanners(slug, d) {
  if (!d.live) return '';
  return liveRow(slug, d.live, d.title);
}

function phoneGallery(d, mobs) {
  // auto-scroll the chosen phones (default: just the first); others static with a fade
  const auto = d.autoPhones || [0];
  const items = mobs.map((s, i) => {
    const isAuto = auto.includes(i);
    const cls = isAuto ? 'phone phone--auto' : 'phone phone--scroll';
    // desync the 2nd+ auto phones so they don't pan in lockstep
    const imgStyle = isAuto && auto.indexOf(i) > 0 ? ` style="animation-delay:-13s;"` : '';
    return `<figure class="${cls}" style="margin:0;"><img src="${s}" alt="${d.title} mobile" loading="lazy"${imgStyle} /></figure>`;
  }).join('');
  return `<p class="mono-label" style="margin:56px 0 18px;">${d.mobileLabel || 'Mobile'}</p>
      <div class="phone-panel"><div class="phone-row">${items}</div></div>`;
}

function bookletSection(d) {
  if (!d.booklet) return '';
  const list = imgs(d.booklet.slug);
  const pages = list.map(s => `<figure class="shot reveal" style="margin:0;"><img src="${s}" alt="${d.title} booklet page" loading="lazy" /></figure>`).join('');
  return `<hr class="case-divider" />
        <div class="case-subhead reveal"><span class="mono-label">${d.booklet.mono}</span><h2>${d.booklet.heading}</h2><p>${d.booklet.intro}</p></div>
        <div class="booklet-grid">${pages}</div>`;
}

// generic extra sections rendered after the main shots (each its own image slug + layout)
function extraSections(d) {
  if (!d.extraSections) return '';
  return d.extraSections.map(sec => {
    const fig = s => `<figure class="shot reveal" style="margin:0;"><img src="${s}" alt="${d.title} — ${sec.heading}" loading="lazy" /></figure>`;
    // captioned figure (brand name under the creative)
    const figCap = (s, cap) => `<figure class="shot reveal" style="margin:0;"><img src="${s}" alt="${d.title} — ${cap}" loading="lazy" /><figcaption class="shot__cap">${cap}</figcaption></figure>`;
    // optional live-banner row (iframes) first
    const live = sec.live ? liveRow(sec.bannerSlug, sec.live, d.title) : '';
    // optional live HTML email (self-contained), auto-sized by main.js
    const emailFit = `onload="try{this.style.height=this.contentWindow.document.body.scrollHeight+'px'}catch(e){}"`;
    const email = sec.emailSlug ? `<div class="email-showcase">
          <div class="email-col reveal">
            <span class="banner-stage__cap">Desktop</span>
            <div class="email-frame"><iframe class="email" src="../assets/emails/${sec.emailSlug}/index.html" title="${d.title} email — desktop" scrolling="no" ${emailFit}></iframe></div>
          </div>
          <div class="email-col reveal">
            <span class="banner-stage__cap">Mobile — scroll inside</span>
            <div class="email-phone"><iframe src="../assets/emails/${sec.emailSlug}/index.html" title="${d.title} email — mobile" scrolling="yes"></iframe></div>
          </div>
        </div>` : '';
    // optional text logo wall
    const logos = sec.logos ? `<div class="logo-strip">${sec.logos.map(l => `<span>${l}</span>`).join('')}</div>` : '';
    // optional static image grid
    let staticBody = '';
    if (sec.slug) {
      const list = imgs(sec.slug);
      const staticHead = live ? `<p class="mono-label" style="margin:44px 0 18px;">Static frames</p>` : '';
      if (sec.layout === 'small') {
        staticBody = `${staticHead}<div class="shot-small">${fig(list[0])}</div>`;
      } else if (sec.layout === 'banner') {
        const cells = sec.labels ? list.map((s, i) => figCap(s, sec.labels[i] || '')).join('') : list.map(fig).join('');
        staticBody = `${staticHead}<div class="banner-grid">${cells}</div>`;
      } else { // gallery — pairs
        let g = '<div class="case-shots">';
        for (let i = 0; i < list.length; i += 2) {
          const pair = list.slice(i, i + 2);
          g += pair.length === 2 ? `<div class="gallery-2">${fig(pair[0])}${fig(pair[1])}</div>` : fig(pair[0]);
        }
        staticBody = staticHead + g + '</div>';
      }
    }
    const intro = sec.intro ? `<p>${sec.intro}</p>` : '';
    return `<hr class="case-divider" />
        <div class="case-subhead reveal"><span class="mono-label">${sec.mono}</span><h2>${sec.heading}</h2>${intro}</div>
        ${live}${email}${staticBody}${logos}`;
  }).join('');
}

function shots(slug, d, list) {
  const fig = (src, cap) => `<figure class="shot reveal" style="margin:0;"><img src="${src}" alt="${d.title}" loading="lazy" />${cap ? `<figcaption class="shot__cap">${cap}</figcaption>` : ''}</figure>`;
  if (d.layout === 'single') return `<div class="case-shots">${fig(list[0], d.cap)}</div>`;
  if (d.layout === 'banner') {
    const live = liveBanners(slug, d);
    const staticHead = live ? `<p class="mono-label" style="margin:56px 0 18px;">More formats — static frames</p>` : '';
    return `${live}${staticHead}<div class="banner-grid">${list.map(s => fig(s, '')).join('')}</div>`;
  }
  if (d.layout === 'devices') {
    let html = '';
    if (d.sectionLabel) html += `<div class="case-subhead reveal"><span class="mono-label">${d.sectionLabel.mono}</span><h2>${d.sectionLabel.heading}</h2></div>`;
    if (d.storeLinks) {
      const btn = (href, top, name) => `<a class="store-btn" href="${href}" target="_blank" rel="noopener"><span class="mono-label">${top}</span>&nbsp;${name} ↗</a>`;
      html += `<div class="store-buttons reveal">`;
      if (d.storeLinks.appstore) html += btn(d.storeLinks.appstore, 'Download on the', 'App&nbsp;Store');
      if (d.storeLinks.googleplay) html += btn(d.storeLinks.googleplay, 'Get it on', 'Google&nbsp;Play');
      html += `</div>`;
    }
    const phone = s => `<figure class="phone reveal" style="margin:0;"><img src="${s}" alt="${d.title} iPhone preview" loading="lazy" /></figure>`;
    const tablet = s => `<figure class="tablet reveal" style="margin:0;"><img src="${s}" alt="${d.title} iPad preview" loading="lazy" /></figure>`;
    html += `<div class="phone-panel"><div class="phone-row">${list.map(phone).join('')}</div>`;
    if (d.tabletSlug) html += `<div class="device-row" style="margin-top:28px;">${imgs(d.tabletSlug).map(tablet).join('')}</div>`;
    html += `</div>`;
    return html;
  }
  if (d.layout === 'gallery') {
    let html = '';
    if (d.sectionLabel) html += `<div class="case-subhead reveal"><span class="mono-label">${d.sectionLabel.mono}</span><h2>${d.sectionLabel.heading}</h2></div>`;
    html += '<div class="case-shots">';
    for (let i = 0; i < list.length; i += 2) {
      const pair = list.slice(i, i + 2);
      if (pair.length === 2) html += `<div class="gallery-2">${fig(pair[0],'')}${fig(pair[1],'')}</div>`;
      else html += fig(pair[0], '');
    }
    return html + '</div>';
  }
  // web: first full (with caption), rest in pairs; optional trailing phone gallery
  const mobN = d.mobileCount || 0;
  const desk = mobN ? list.slice(0, list.length - mobN) : list;
  const mobs = mobN ? list.slice(list.length - mobN) : [];
  let html = '';
  if (d.sectionLabel) html += `<div class="case-subhead reveal"><span class="mono-label">${d.sectionLabel.mono}</span><h2>${d.sectionLabel.heading}</h2></div>`;
  html += '<div class="case-shots">';
  html += fig(desk[0], d.cap);
  const rest = desk.slice(1);
  for (let i = 0; i < rest.length; i += 2) {
    const pair = rest.slice(i, i + 2);
    if (pair.length === 2) html += `<div class="gallery-2">${fig(pair[0],'')}${fig(pair[1],'')}</div>`;
    else html += fig(pair[0], '');
  }
  html += '</div>';
  if (mobs.length) html += phoneGallery(d, mobs);
  return html;
}

order.forEach((slug, idx) => {
  const d = data[slug];
  const list = imgs(slug);
  const c = chrome(slug);
  const next = order[(idx + 1) % order.length];
  const nextLabel = next === order[0] && idx === order.length - 1 ? 'Back to all work' : `Next: ${data[next].title}`;
  const nextHref = (idx === order.length - 1) ? '../index.html#work' : `${next}.html`;

  const metaHtml = Object.entries(d.meta)
    .map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('');

  const page = c.head(`${d.title} — Case · Taras Skalny`, `${d.title} — ${d.lead.replace(/"/g,'')}`) + `
    <section class="case-hero">
      <div class="container">
        <a class="back-link" href="../index.html#work">← All work</a>
        <p class="mono-label" style="margin:24px 0 16px;">${d.cat}</p>
        <h1 class="display">${d.title}</h1>
        <p class="lead" style="max-width:60ch; margin-top:22px;">${d.lead}</p>
        <dl class="case-meta">${metaHtml}</dl>
      </div>
    </section>

    <section class="section section--tight">
      <div class="container">
        <div class="case-overview reveal">
          <div><p class="mono-label">Overview</p></div>
          <div>${d.overview.map((p, i) => i === 0 ? `<p class="lead">${p}</p>` : `<p style="color:var(--body-muted);">${p}</p>`).join('')}</div>
        </div>
      </div>
    </section>

    <section class="section--tight">
      <div class="container">
        ${shots(slug, d, list)}
        ${bookletSection(d)}
        ${extraSections(d)}
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="case-nav">
          <a class="back-link" href="../index.html#work">← All work</a>
          <a class="back-link" href="${nextHref}">${nextLabel} →</a>
        </div>
      </div>
    </section>` + c.foot;

  fs.writeFileSync(path.join(OUT, `${slug}.html`), page);
  console.log(`wrote work/${slug}.html (${list.length} images, ${d.layout})`);
});
console.log('done');
