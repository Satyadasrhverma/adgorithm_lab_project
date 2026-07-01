/* =========================================================
   main.js — Premium interactions & animations
   Uses GSAP + ScrollTrigger when available (loaded via CDN
   in index.html). Falls back gracefully on other pages.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  initMagnetic();
  initScrollReveal();
  setupCounters();
  setupFlowCards();
  setupFaq();
  setupBlogFilter();
  setupFlowLine();
  setupNumberRewrite();
  initGSAP();
});

/* =========================================================
   CUSTOM CURSOR
   ========================================================= */
function initCursor() {
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;

  // Only show on non-touch devices
  if (!window.matchMedia('(pointer: fine)').matches) {
    dot.style.display = 'none';
    ring.style.display = 'none';
    return;
  }
  document.body.classList.add('has-cursor');

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;
  let raf;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';
  });

  function animateCursor() {
    ringX += (mouseX - ringX) * 0.10;
    ringY += (mouseY - ringY) * 0.10;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    raf = requestAnimationFrame(animateCursor);
  }
  animateCursor();

  document.querySelectorAll('a, button, .magnetic, .bento-card, .pstep, .card, .post, .perk, .job').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}

/* =========================================================
   MAGNETIC BUTTONS
   ========================================================= */
function initMagnetic() {
  document.querySelectorAll('.magnetic').forEach(el => {
    el.addEventListener('mousemove', e => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width  / 2;
      const cy = rect.top  + rect.height / 2;
      const dx = (e.clientX - cx) * 0.30;
      const dy = (e.clientY - cy) * 0.30;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });
}

/* =========================================================
   GSAP ANIMATIONS (index.html)
   ========================================================= */
function initGSAP() {
  if (typeof gsap === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  // Hero stagger is handled by CSS keyframes (faster first paint)
  // Add parallax to orb container
  const orb = document.getElementById('heroOrb');
  if (orb) {
    document.addEventListener('mousemove', e => {
      const cx = window.innerWidth  / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;
      gsap.to(orb, { x: dx * 14, y: dy * 10, duration: 1.2, ease: 'power2.out' });
    });
  }

  // Float cards gentle parallax
  document.querySelectorAll('.float-card').forEach((fc, i) => {
    document.addEventListener('mousemove', e => {
      const cx = window.innerWidth  / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;
      const depth = (i + 1) * 6;
      gsap.to(fc, { x: dx * depth, y: dy * depth, duration: 1.4, ease: 'power2.out' });
    });
  });

  // Section reveals — replace .reveal class logic with GSAP for smoother curves
  gsap.utils.toArray('.reveal').forEach((el, i) => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      onEnter: () => {
        gsap.to(el, {
          opacity: 1, y: 0, duration: 0.75,
          ease: 'power3.out',
          delay: (i % 4) * 0.07
        });
      },
      once: true
    });
  });

  // Bento cards stagger
  const bentoCards = gsap.utils.toArray('.bento-card');
  if (bentoCards.length) {
    ScrollTrigger.create({
      trigger: '.bento',
      start: 'top 82%',
      onEnter: () => {
        gsap.from(bentoCards, {
          opacity: 0, y: 36, duration: 0.65,
          ease: 'power3.out', stagger: 0.1
        });
      },
      once: true
    });
  }

  // Process steps stagger
  const psteps = gsap.utils.toArray('.pstep');
  if (psteps.length) {
    ScrollTrigger.create({
      trigger: '.process-grid',
      start: 'top 82%',
      onEnter: () => {
        gsap.from(psteps, {
          opacity: 0, y: 28, duration: 0.6,
          ease: 'power3.out', stagger: 0.08
        });
      },
      once: true
    });
  }

  // Stats numbers scale-in
  const statBand = document.querySelector('.stats-band');
  if (statBand) {
    ScrollTrigger.create({
      trigger: statBand,
      start: 'top 80%',
      onEnter: () => {
        gsap.from('.stat-item', {
          opacity: 0, y: 20, duration: 0.55, stagger: 0.10, ease: 'power3.out'
        });
      },
      once: true
    });
  }

  // CTA card reveal
  const ctaCard = document.querySelector('.cta-card');
  if (ctaCard) {
    ScrollTrigger.create({
      trigger: ctaCard,
      start: 'top 85%',
      onEnter: () => {
        gsap.from(ctaCard, { opacity: 0, y: 40, duration: 0.8, ease: 'power3.out' });
      },
      once: true
    });
  }
}

/* =========================================================
   SCROLL REVEAL (vanilla fallback when GSAP not loaded)
   ========================================================= */
function initScrollReveal() {
  if (typeof gsap !== 'undefined') return;  // GSAP handles it

  const items = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 70);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach(el => observer.observe(el));
}

/* =========================================================
   COUNTERS
   ========================================================= */
function setupCounters() {
  const counters = document.querySelectorAll('[data-count]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';

      if (typeof gsap !== 'undefined') {
        gsap.fromTo({ val: 0 }, { val: target }, {
          duration: 1.8, ease: 'power2.out',
          onUpdate: function () { el.textContent = Math.round(this.targets()[0].val) + suffix; }
        });
      } else {
        let current = 0;
        const steps = 55;
        const increment = target / steps;
        const tick = () => {
          current += increment;
          if (current < target) { el.textContent = Math.round(current) + suffix; requestAnimationFrame(tick); }
          else { el.textContent = target + suffix; }
        };
        tick();
      }
      observer.unobserve(el);
    });
  }, { threshold: 0.4 });
  counters.forEach(el => observer.observe(el));
}

/* =========================================================
   FLOW CARDS (home service cards expand on tap)
   ========================================================= */
function setupFlowCards() {
  document.querySelectorAll('.flow-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.flow-card').classList.toggle('open');
    });
  });
}

/* =========================================================
   FAQ ACCORDION
   ========================================================= */
function setupFaq() {
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => btn.closest('.faq-item').classList.toggle('open'));
  });
}

/* =========================================================
   BLOG FILTER
   ========================================================= */
function setupBlogFilter() {
  const buttons = document.querySelectorAll('.cats button');
  const posts   = document.querySelectorAll('.blog-grid .post');
  if (!buttons.length) return;
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cat;
      posts.forEach(p => {
        const show = cat === 'all' || p.dataset.cat === cat;
        p.style.display = show ? '' : 'none';
      });
    });
  });
}

/* =========================================================
   FLOW LINE + ARROWS (services.html process section)
   ========================================================= */
function setupFlowLine() {
  document.querySelectorAll('.steps.flow-line').forEach(steps => {
    const track = document.createElement('div');
    track.className = 'flow-track';
    track.innerHTML = '<span class="pulse"></span>';
    steps.appendChild(track);
    [16.67, 33.33, 50, 66.67, 83.33].forEach(pos => {
      const arrow = document.createElement('span');
      arrow.className = 'flow-arrow';
      arrow.textContent = '›';
      arrow.style.left = pos + '%';
      steps.appendChild(arrow);
    });
  });
}

/* =========================================================
   STEP NUMBER REWRITE ANIMATION
   ========================================================= */
function setupNumberRewrite() {
  const dots = document.querySelectorAll('.steps .dot');
  if (!dots.length) return;
  const run = () => dots.forEach((d, i) => setTimeout(() => {
    d.classList.add('rewrite');
    setTimeout(() => d.classList.remove('rewrite'), 700);
  }, i * 160));
  run();
  setInterval(run, 30000);
}
