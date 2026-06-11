/* =========================================================
   main.js — small, easy-to-read animations
   1) Scroll reveal: fades elements in as you scroll
   2) Counter: counts numbers up (e.g. 100+, 95%)
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  setupScrollReveal();
  setupCounters();
  setupFlowCards();
  setupFaq();
  setupBlogFilter();
  setupFlowLine();
  setupNumberRewrite();
});

/* Build the connected, flowing line + arrows through the process steps */
function setupFlowLine() {
  document.querySelectorAll('.steps.flow-line').forEach(steps => {
    const track = document.createElement('div');
    track.className = 'flow-track';
    track.innerHTML = '<span class="pulse"></span>';
    steps.appendChild(track);

    // arrowheads sit in the gaps between the 6 dots (1→2, 2→3, …)
    [16.67, 33.33, 50, 66.67, 83.33].forEach(pos => {
      const arrow = document.createElement('span');
      arrow.className = 'flow-arrow';
      arrow.textContent = '›';
      arrow.style.left = pos + '%';
      steps.appendChild(arrow);
    });
  });
}

/* Re-animate (flip/rewrite) the step numbers every 30 seconds */
function setupNumberRewrite() {
  const dots = document.querySelectorAll('.steps .dot');
  if (!dots.length) return;

  const run = () => dots.forEach((d, i) => setTimeout(() => {
    d.classList.add('rewrite');
    setTimeout(() => d.classList.remove('rewrite'), 700);
  }, i * 160));

  run();                       // play once shortly after load
  setInterval(run, 30000);     // then every 30 seconds
}


/* Open/close FAQ answers (Contact + Careers pages) */
function setupFaq() {
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => btn.closest('.faq-item').classList.toggle('open'));
  });
}

/* Filter blog posts by category chip */
function setupBlogFilter() {
  const buttons = document.querySelectorAll('.cats button');
  const posts = document.querySelectorAll('.blog-grid .post');
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

/* Tap a Home service card to open/close its workflow (hover also works on desktop) */
function setupFlowCards() {
  document.querySelectorAll('.flow-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.flow-card').classList.toggle('open');
    });
  });
}

/* 1) Reveal elements with class "reveal" when they enter the screen */
function setupScrollReveal() {
  const items = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // tiny stagger so cards appear one after another
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  items.forEach(el => observer.observe(el));
}

/* 2) Animate numbers from 0 to their target value.
   Put the final value in data-count, e.g. <h3 data-count="100" data-suffix="+"> */
function setupCounters() {
  const counters = document.querySelectorAll('[data-count]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const prefix = el.dataset.prefix || '';
      let current = 0;
      const steps = 50;
      const increment = target / steps;

      const tick = () => {
        current += increment;
        if (current < target) {
          el.textContent = prefix + Math.round(current) + suffix;
          requestAnimationFrame(tick);
        } else {
          el.textContent = prefix + target + suffix;
        }
      };
      tick();
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}
