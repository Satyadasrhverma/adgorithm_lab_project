/* =========================================================
   components.js — shared navbar + footer on every page
   ========================================================= */

document.documentElement.setAttribute(
  'data-theme', localStorage.getItem('vorldx_theme') || 'light'
);

const LOGO_SVG   = `<img class="logo" src="assets/logo.png"       alt="Vorldx Adgorithm Lab logo">`;
const LOGO_WHITE = `<img class="logo" src="assets/logo-white.png" alt="Vorldx Adgorithm Lab logo">`;

const NAV_ITEMS = [
  { name: 'Home',     file: 'index.html',    key: 'home' },
  { name: 'About',    file: 'about.html',    key: 'about' },
  { name: 'Services', file: 'services.html', key: 'services' },
  { name: 'Blog',     file: 'blog.html',     key: 'blog' },
  { name: 'Careers',  file: 'careers.html',  key: 'careers' },
  { name: 'Contact',  file: 'contact.html',  key: 'contact' },
];

function buildNavbar() {
  const current = document.body.dataset.page || 'home';
  const links = NAV_ITEMS
    .map(i => `<a href="${i.file}" class="${i.key === current ? 'active' : ''}">${i.name}</a>`)
    .join('');

  return `
  <nav class="navbar" id="mainNav">
    <div class="container nav-inner">
      <a href="index.html" class="brand">${LOGO_SVG}</a>
      <div class="nav-links" id="navLinks">${links}</div>
      <div class="nav-cta">
        <button class="theme-toggle" id="themeToggle" aria-label="Toggle dark / light theme">🌙</button>
        <a href="contact.html" class="btn btn-primary">Let's Talk</a>
        <button class="hamburger" id="hamburger" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </nav>`;
}

function buildFooter() {
  const year = new Date().getFullYear();
  return `
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <a href="index.html" class="brand footer-brand">${LOGO_WHITE}</a>
          <p class="about">We combine creativity and AI to help brands grow faster and smarter in the digital world.</p>
          <div class="socials">
            <a href="#" aria-label="Facebook">f</a>
            <a href="#" aria-label="Twitter">𝕏</a>
            <a href="#" aria-label="Instagram">◎</a>
            <a href="#" aria-label="YouTube">▶</a>
          </div>
        </div>
        <div>
          <h5>Company</h5>
          <a href="about.html">About Us</a>
          <a href="careers.html">Careers</a>
          <a href="blog.html">Blog</a>
          <a href="contact.html">Contact</a>
        </div>
        <div>
          <h5>Services</h5>
          <a href="services.html">Content Creation</a>
          <a href="services.html">AI Automation</a>
          <a href="services.html">Branding</a>
          <a href="services.html">Growth Marketing</a>
        </div>
        <div class="news">
          <h5>Newsletter</h5>
          <p style="font-size:.9rem;color:#9aa6be">Subscribe for updates and insights.</p>
          <div class="row">
            <input type="email" placeholder="Enter your email" id="newsEmail">
            <button class="btn btn-primary" onclick="subscribeNews()">→</button>
          </div>
        </div>
      </div>
      <div class="footer-bottom">© ${year} Vorldx Adgorithm Lab. All rights reserved.</div>
    </div>
  </footer>`;
}

function subscribeNews() {
  const el = document.getElementById('newsEmail');
  if (el && el.value.includes('@')) {
    alert('Thanks for subscribing, ' + el.value + '!');
    el.value = '';
  } else {
    alert('Please enter a valid email.');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const navMount  = document.getElementById('nav');
  const footMount = document.getElementById('footer');
  if (navMount)  navMount.innerHTML  = buildNavbar();
  if (footMount) footMount.innerHTML = buildFooter();

  // Mobile hamburger
  const burger = document.getElementById('hamburger');
  const links  = document.getElementById('navLinks');
  if (burger && links) {
    burger.addEventListener('click', () => {
      links.classList.toggle('open');
      // Animate hamburger to X
      const spans = burger.querySelectorAll('span');
      if (links.classList.contains('open')) {
        spans[0].style.cssText = 'transform:rotate(45deg) translate(5px,5px)';
        spans[1].style.cssText = 'opacity:0;transform:scaleX(0)';
        spans[2].style.cssText = 'transform:rotate(-45deg) translate(5px,-5px)';
      } else {
        spans.forEach(s => s.style.cssText = '');
      }
    });
  }

  // Navbar shrink on scroll
  const nav = document.getElementById('mainNav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 60) {
        nav.style.boxShadow = '0 2px 24px rgba(0,0,0,.12)';
      } else {
        nav.style.boxShadow = '';
      }
    }, { passive: true });
  }

  // Dark / light theme toggle
  const toggle = document.getElementById('themeToggle');
  if (toggle) {
    const navLogo = document.querySelector('.navbar .brand .logo');
    const updateUI = () => {
      const dark = document.documentElement.getAttribute('data-theme') === 'dark';
      toggle.textContent = dark ? '☀️' : '🌙';
      if (navLogo) navLogo.src = dark ? 'assets/logo-white.png' : 'assets/logo.png';
    };
    updateUI();
    toggle.addEventListener('click', () => {
      const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('vorldx_theme', next);
      updateUI();
    });
  }
});
