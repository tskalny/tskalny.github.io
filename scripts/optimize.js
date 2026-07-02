// Image curation + optimization pipeline for the portfolio site.
// Reads curated source images from the parent work folders, writes optimized
// WebP into assets/img/<slug>/. Also makes a top-cropped cover thumb per project.
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SRC = path.resolve(__dirname, '..', '..');      // "сайт портфолио" root
const OUT = path.resolve(__dirname, '..', 'assets', 'img');

// slug -> { cover: src, full: [src...] }  (paths relative to SRC)
const M = {
  allshore: {
    cover: 'Allshore/website/Website Homepage.png',
    full: [
      'Allshore/website/Website Homepage.png',
      'Allshore/website/Who We Are Page.png',
      'Allshore/website/Our Services.png',
      'Allshore/website/Expertise Page.png',
      'Allshore/website/Technology as a service.png',
      'Allshore/website/Onshoring.png',
      'Allshore/website/Nearshoring.png',
      'Allshore/website/Offshoring.png',
    ],
  },
  'allshore-booklet': {
    // pages numbered 1..17 in the source folder — keep that exact order
    cover: 'Allshore/Booklet/1.png',
    full: Array.from({ length: 17 }, (_, i) => `Allshore/Booklet/${i + 1}.png`),
  },
  cmc: {
    // card cover = iPad slide (4:3, fits the card); section = individual iPhone 6.9" preview slides
    cover: 'CMC/app store preview/iPad/iPad frame 1.jpg',
    full: [
      'CMC/app store preview/iPhone 6.9”/6.9 frame 1.jpg',
      'CMC/app store preview/iPhone 6.9”/6.9 frame 2.jpg',
      'CMC/app store preview/iPhone 6.9”/6.9 frame 3.jpg',
      'CMC/app store preview/iPhone 6.9”/6.9 frame 4.jpg',
      'CMC/app store preview/iPhone 6.9”/6.9 frame 5.jpg',
    ],
  },
  'cmc-ipad': {
    cover: 'CMC/app store preview/iPad/iPad frame 1.jpg',
    full: [
      'CMC/app store preview/iPad/iPad frame 1.jpg',
      'CMC/app store preview/iPad/ipad frame 2.jpg',
      'CMC/app store preview/iPad/ipad frame 3.jpg',
    ],
  },
  'cmc-banners-static': {
    cover: 'CMC/banners/MT4 - Liquidity - AU/MT4 - Liquidity - AU - static/300x250.jpg',
    full: [
      'CMC/banners/MT4 - Liquidity - AU/MT4 - Liquidity - AU - static/970x250.jpg',
      'CMC/banners/MT4 - Liquidity - AU/MT4 - Liquidity - AU - static/728x90.jpg',
      'CMC/banners/MT4 - Liquidity - AU/MT4 - Liquidity - AU - static/300x250.jpg',
      'CMC/banners/MT4 - Liquidity - AU/MT4 - Liquidity - AU - static/300x600.jpg',
      'CMC/banners/MT4 - Liquidity - AU/MT4 - Liquidity - AU - static/320x50.jpg',
    ],
  },
  'cmc-uac': {
    cover: 'CMC/CMC Markets Canada  UAC Assets/new/CFD/img/CA_-_CFD-1200x1200-English.jpg',
    full: [
      'CMC/CMC Markets Canada  UAC Assets/new/CFD/img/CA_-_CFD-1200x1200-English.jpg',
      'CMC/CMC Markets Canada  UAC Assets/new/Forex/img/CA_-_Forex-1200x1200-English.jpg',
      'CMC/CMC Markets Canada  UAC Assets/new/Social Proof/img/CA_-_Social_Proof-1200x1200-English.jpg',
      'CMC/CMC Markets Canada  UAC Assets/new/CFD/img/CA_-_CFD-1200x628-English.jpg',
      'CMC/CMC Markets Canada  UAC Assets/new/Forex/img/CA_-_Forex-1200x628-English.jpg',
      'CMC/CMC Markets Canada  UAC Assets/new/Social Proof/img/CA_-_Social_Proof-1200x628-English.jpg',
    ],
  },
  brands: {
    // clean premium display creatives produced at Media Menu (order = labels in gen-cases)
    cover: '../Mediamenu_02/Vodafone 102022/VF_K_0020_22_Business_2for1_Banner_Ads_NK_1080x1080-6.jpg',
    full: [
      '../Mediamenu_02/Vodafone 102022/VF_K_0020_22_Business_2for1_Banner_Ads_NK_1080x1080-6.jpg',
      '../Mediamenu_02/Bacardi AUS - Grey Goose Q4 2024 - Managed/wetransfer_drive-download-20240423t092150z-001_2024-04-23_0924/FY24_GreyGoose_MartiniMonth_WetMartiniCocktail_Global_Uber Display_975x861px_V1.jpg',
      '../Mediamenu_02/Puig Paco Rabanne Fame - Interstitial/uk/Группа 2.jpg',
    ],
  },
  kassowrobots: {
    // exhibition booth boards (large presentation panels)
    cover: 'kassowrobots/Booth design/A.png',
    full: [
      'kassowrobots/Booth design/A.png',
      'kassowrobots/Booth design/D.png',
      'kassowrobots/Booth design/С.png',
      'kassowrobots/Booth design/3638 × 1181_B.png',
    ],
  },
  'kassowrobots-brochure': {
    cover: 'kassowrobots/Brochure/4.jpg',
    full: [
      'kassowrobots/Brochure/4.jpg',
      'kassowrobots/Brochure/44.jpg',
      'kassowrobots/Brochure/4444.jpg',
      'kassowrobots/Brochure/44444.jpg',
    ],
  },
  'kassowrobots-sig': {
    cover: 'kassowrobots/mail signature/Frame 93.png',
    full: ['kassowrobots/mail signature/Frame 93.png'],
  },
  brooks: {
    // desktop views (root, 1440px) first, then the 5 true 375px phone screenshots
    cover: 'Brooks/home.png',
    full: [
      'Brooks/home.png',
      'Brooks/card_prod.png',
      'Brooks/filter_active.png',
      'Brooks/filter_active2.png',
      'Brooks/History.png',
      'Brooks/mobile/home.png',
      'Brooks/mobile/card_prod.png',
      'Brooks/mobile/filter_active.png',
      'Brooks/mobile/filter_hover.png',
      'Brooks/mobile/location_shop.png',
    ],
  },
  tricension: {
    cover: 'Tricension/website/Website Template Editable.png',
    full: [
      'Tricension/website/Website Template Editable.png',
      'Tricension/Case Stady/1/Frame 63.png',
      'Tricension/Case Stady/1/Frame 64.png',
      'Tricension/Case Stady/1/Frame 65.png',
      'Tricension/Case Stady/1/Frame 74.png',
      'Tricension/Case Stady/2/Frame 83.png',
      'Tricension/Case Stady/2/Frame 84.png',
      'Tricension/Case Stady/3/Frame 90.png',
      'Tricension/Case Stady/3/Frame 91.png',
    ],
  },
  condado: {
    cover: 'Condado/Case Study/A4/1.png',
    full: [
      'Condado/Case Study/A4/1.png',
      'Condado/Case Study/A4/2.png',
      'Condado/Case Study/A4/3.png',
      'Condado/Case Study/A4/4.png',
      'Condado/Case Study/A4/5.png',
      'Condado/Case Study/A4/6.png',
      'Condado/Case Study/A4/7.png',
      'Condado/Case Study/A4/8.png',
      'Condado/Case Study/A4/9.png',
      'Condado/Case Study/A4/10.png',
      'Condado/Case Study/Booklet/1.jpg',
      'Condado/Case Study/Booklet/2.jpg',
      'Condado/Case Study/Booklet/3.jpg',
    ],
  },
  primewatch: {
    cover: 'Primewatch/website/Frame 5.png',
    full: ['Primewatch/website/Frame 5.png'],
  },
  mototravel: {
    // site/ desktop views first, then mobile/ phone screenshots (375px)
    cover: 'mototravel/site/Main_design.png',
    full: [
      'mototravel/site/Main_design.png',
      'mototravel/site/Main_design-1.png',
      'mototravel/site/Main_design-2.png',
      'mototravel/site/Tour`s page.png',
      'mototravel/site/Tour`s page-1.png',
      'mototravel/site/Tour`s page-2.png',
      'mototravel/site/teame.png',
      'mototravel/mobile/mobile.png',
      'mototravel/mobile/mobile2.png',
      'mototravel/mobile/mobile3.png',
    ],
  },
  mediamenu: {
    cover: 'Media Menu/RABANNE_FAME_SL_2023_Media_Banner_720x300px_FR_v3.jpg',
    full: [
      'Media Menu/1080x1920_ts.jpg',
      'Media Menu/300x600.jpg',
      'Media Menu/250x360.jpg',
      'Media Menu/320x320.jpg',
      'Media Menu/980x240.jpg',
      'Media Menu/980x240_1.jpg',
      'Media Menu/RABANNE_FAME_SL_2023_Media_Banner_720x300px_FR_v3.jpg',
    ],
  },
  privatbank: {
    cover: 'Privat Bank/work4/banner_horizontal Folder/jpeg/banner_horizontal4.jpg',
    full: [
      'Privat Bank/work4/banner_horizontal Folder/jpeg/banner_horizontal4.jpg',
      'Privat Bank/work4/banner_horizontal Folder/jpeg/banner_horizontal_1.jpg',
      'Privat Bank/work4/banner_horizontal Folder/jpeg/banner_horizontal_2.jpg',
      'Privat Bank/work4/banner_horizontal Folder/jpeg/banner_horizontal_3.jpg',
      'Privat Bank/work4/banner_vertical Folder/jpeg/banner_vertical_1.jpg',
      'Privat Bank/work4/banner_vertical Folder/jpeg/banner_vertical_2.jpg',
      'Privat Bank/work4/Новая папка/banner_horiz_pizza/jpeg/banner_horizontal_pizza_1.jpg',
      'Privat Bank/work4/Новая папка/banner_vert_pizza/jpeg/pizza_v_1.jpg',
    ],
  },
  tslmedia: {
    cover: 'TSL MEdia/Frame 1068.png',
    full: [
      'TSL MEdia/Frame 1068.png',
      'TSL MEdia/Frame 1425.png',
      'TSL MEdia/Frame 1459.png',
    ],
  },
  email: {
    cover: 'email/HP/Frame 1.png',
    full: [
      'email/HP/Frame 1.png',
      'email/HP/Frame 2.png',
      'email/HP/Frame 3.png',
      'email/Mersedes/Frame 2.png',
      'email/psd Bank/Frame 4.png',
    ],
  },
};

const FULL_W = 1400;     // max width for case-page images
const COVER_W = 900;     // cover thumb width
const COVER_RATIO = 4 / 3; // cover crop aspect (w/h)

async function makeFull(src, dest) {
  // Never enlarge: narrow phone screenshots (e.g. 375px) stay crisp at native size.
  await sharp(src, { failOn: 'none' })
    .resize({ width: FULL_W, withoutEnlargement: true })
    .webp({ quality: 80, effort: 5 })
    .toFile(dest);
}

async function makeCover(src, dest) {
  const meta = await sharp(src, { failOn: 'none' }).metadata();
  // top-crop to COVER_RATIO from the top of the (often very tall) screenshot
  const cropH = Math.min(meta.height, Math.round(meta.width / COVER_RATIO));
  await sharp(src, { failOn: 'none' })
    .extract({ left: 0, top: 0, width: meta.width, height: cropH })
    .resize({ width: COVER_W })
    .webp({ quality: 82, effort: 5 })
    .toFile(dest);
}

(async () => {
  let ok = 0, miss = 0;
  for (const [slug, cfg] of Object.entries(M)) {
    const dir = path.join(OUT, slug);
    fs.mkdirSync(dir, { recursive: true });
    // cover
    const csrc = path.join(SRC, cfg.cover);
    if (fs.existsSync(csrc)) {
      try { await makeCover(csrc, path.join(dir, 'cover.webp')); ok++; }
      catch (e) { console.error('cover fail', slug, e.message); }
    } else { console.warn('MISSING cover', cfg.cover); miss++; }
    // full set
    let i = 1;
    for (const rel of cfg.full) {
      const s = path.join(SRC, rel);
      if (!fs.existsSync(s)) { console.warn('MISSING', rel); miss++; continue; }
      try { await makeFull(s, path.join(dir, String(i).padStart(2, '0') + '.webp')); ok++; i++; }
      catch (e) { console.error('full fail', rel, e.message); }
    }
    console.log(`${slug}: ${i - 1} images`);
  }
  console.log(`\nDone. ${ok} written, ${miss} missing.`);
})();
