# Taras Skalny — Portfolio

Personal portfolio site. Static HTML/CSS/JS, no build step. Visual system based on
`DESIGN-cohere.md` (Space Grotesk display + Inter body, near-black pill CTAs,
deep-green/navy bands, coral accents, flat surfaces with thin rules).

## Structure

```
index.html              Home (hero, work grid, approach, about, contact)
work/*.html             Case-study pages (one per project)
assets/css/style.css    Design system + components
assets/js/main.js       Nav toggle, scroll reveal, footer year
assets/img/<slug>/      Optimized WebP images per project
scripts/optimize.js     Regenerates optimized images from the source work folders
scripts/gen-cases.js    Regenerates all work/*.html from the data table inside it
```

## Local preview

```bash
python -m http.server 4321
# open http://localhost:4321
```

## Editing content

- **Text / case copy:** edit the `data` table in `scripts/gen-cases.js`, then run
  `node scripts/gen-cases.js` to rebuild the case pages. Home-page copy lives directly
  in `index.html`.
- **Images:** edit the `M` manifest in `scripts/optimize.js`, then run
  `node scripts/optimize.js`. Requires `npm install` first (installs `sharp`).

## Deploy to GitHub Pages

This repo is meant to be served at the **root** of a GitHub Pages site.

**Option A — user site (recommended), `https://tskalny.github.io`:**

1. Create a repo named exactly `tskalny.github.io`.
2. Push the contents of this `portfolio-site/` folder to the repo root (not the folder itself).
3. In the repo: Settings → Pages → Source = `Deploy from a branch`, Branch = `main` / `root`.

```bash
cd portfolio-site
git init
git add .
git commit -m "Portfolio site"
git branch -M main
git remote add origin https://github.com/tskalny/tskalny.github.io.git
git push -u origin main
```

**Option B — project site, `https://tskalny.github.io/portfolio`:**
Same steps, but name the repo `portfolio`. All links are relative, so it works under a
subpath without changes.

`.nojekyll` is included so GitHub Pages serves all files as-is.

## Identity (aligned with CV, 2026-07)

- Name / title: **Taras Skalny — Senior Digital Designer**
- LinkedIn: https://linkedin.com/in/taras-skalny
- Behance: https://behance.net/tskalny62b1 · GitHub: https://github.com/tskalny
- Email: tskalny@gmail.com · Based in Kyiv, Ukraine
- Phone from the CV (+380 97 592 98 49) is intentionally **not** published on the public site.

## CV & minimal protection

- **Downloadable CV** (`assets/Taras_Skalny_CV.pdf`) is the **public version without the phone number**. The
  full version *with* phone is `Taras_Skalny_CV_2026.pdf` (kept off the repo — send directly to recruiters).
  Regenerate with the scratchpad `make_cv.py` (`--nophone --out <path>` for the public one).
- **Email is obfuscated**: it never appears literally in the HTML. Links use
  `class="js-mail" data-u="tskalny" data-d="gmail.com"` and `assets/js/main.js` assembles the `mailto:` at
  runtime. Reduces spam-bot scraping; works normally for humans.
- Note: a static GitHub Pages site is fully public — there is **no access control**. These are only minimal
  anti-scrape measures. Anything under NDA (client campaigns) should be reviewed before publishing.
