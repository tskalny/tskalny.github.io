// Pre-publish audit: broken local links/assets, leftover placeholders, deploy files.
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');

const htmlFiles = ['index.html', ...fs.readdirSync(path.join(ROOT, 'work')).filter(f => f.endsWith('.html')).map(f => 'work/' + f)];
let missing = [], placeholders = [];

function resolveRef(fromFile, ref) {
  if (/^(https?:|mailto:|#|data:)/.test(ref)) return null;
  const base = path.dirname(path.join(ROOT, fromFile));
  return path.normalize(path.join(base, ref.split('#')[0].split('?')[0]));
}

for (const f of htmlFiles) {
  const html = fs.readFileSync(path.join(ROOT, f), 'utf8');
  // src="" and href="" local refs
  const refs = [...html.matchAll(/(?:src|href)="([^"]+)"/g)].map(m => m[1]);
  for (const r of refs) {
    const p = resolveRef(f, r);
    if (p && !fs.existsSync(p)) missing.push(`${f}  →  ${r}`);
  }
  // leftover placeholders / stale strings
  const bad = ['Web & Digital Designer', 'Web &amp; Digital Designer', '7+ years', 'href="#"', 'TODO', 'Studio: Allshore', 'lorem'];
  for (const b of bad) {
    if (html.includes(b)) placeholders.push(`${f}: "${b}"`);
  }
}

// deploy files
const deploy = ['.nojekyll', 'README.md', '.gitignore', 'assets/Taras_Skalny_CV.pdf',
                'assets/css/style.css', 'assets/js/main.js'];
const deployMissing = deploy.filter(d => !fs.existsSync(path.join(ROOT, d)));

// gitignore excludes node_modules
const gi = fs.readFileSync(path.join(ROOT, '.gitignore'), 'utf8');
const nmIgnored = /node_modules/.test(gi);

console.log('HTML pages checked:', htmlFiles.length);
console.log('\nMISSING local refs:', missing.length);
missing.forEach(m => console.log('  ✗', m));
console.log('\nLeftover placeholders/stale:', placeholders.length);
placeholders.forEach(p => console.log('  ⚠', p));
console.log('\nDeploy files missing:', deployMissing.length ? deployMissing.join(', ') : 'none ✓');
console.log('node_modules in .gitignore:', nmIgnored ? 'yes ✓' : 'NO ✗');
