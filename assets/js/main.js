// Mobile nav toggle
const nav = document.querySelector('.nav');
const toggle = document.querySelector('.nav__toggle');
if (toggle) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

// Scroll reveal
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// Auto-size live HTML email iframes to their content (same-origin)
document.querySelectorAll('iframe.email').forEach((f) => {
  const fit = () => {
    try {
      const h = f.contentWindow.document.body.scrollHeight;
      if (h > 0) f.style.height = h + 'px';
    } catch (e) { /* cross-origin or not ready */ }
  };
  f.addEventListener('load', fit);
  setTimeout(fit, 500);
  setTimeout(fit, 1500);
});

// Email obfuscation — assemble address client-side so it isn't in the HTML source
document.querySelectorAll('.js-mail').forEach((a) => {
  const addr = (a.dataset.u || '') + '@' + (a.dataset.d || '');
  a.href = 'mailto:' + addr;
  if (a.dataset.showaddr) a.textContent = addr;
});

// Footer year
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();
