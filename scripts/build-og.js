// Rasterize favicon + og-image SVGs to PNG using sharp.
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const A = path.resolve(__dirname, '..', 'assets');

const faviconSvg = fs.readFileSync(path.join(A, 'favicon.svg'));

const og = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#ffffff"/>
  <rect x="0" y="0" width="1200" height="10" fill="#17171c"/>
  <text x="80" y="150" font-family="Arial, Helvetica, sans-serif" font-size="22" letter-spacing="6" fill="#75758a">HTML5 / GSAP BANNERS · MOTION · PRINT · WEB</text>
  <text x="76" y="300" font-family="Arial, Helvetica, sans-serif" font-size="118" font-weight="700" letter-spacing="-4" fill="#17171c">Taras Skalny</text>
  <text x="80" y="380" font-family="Arial, Helvetica, sans-serif" font-size="46" font-weight="400" fill="#c0432a">Senior Digital Designer</text>
  <text x="80" y="452" font-family="Arial, Helvetica, sans-serif" font-size="26" fill="#616161">Web · e-commerce · HTML5/GSAP banners · motion · print · email</text>
  <circle cx="92" cy="556" r="9" fill="#ff7759"/>
  <text x="112" y="564" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="700" fill="#17171c">tskalny.github.io</text>
  <text x="1120" y="564" font-family="Arial, Helvetica, sans-serif" font-size="22" fill="#93939f" text-anchor="end">Portfolio 2026</text>
</svg>`;

(async () => {
  await sharp(faviconSvg).resize(180, 180).png().toFile(path.join(A, 'apple-touch-icon.png'));
  await sharp(faviconSvg).resize(32, 32).png().toFile(path.join(A, 'favicon-32.png'));
  await sharp(Buffer.from(og)).png().toFile(path.join(A, 'og-image.png'));
  console.log('wrote apple-touch-icon.png, favicon-32.png, og-image.png');
})();
