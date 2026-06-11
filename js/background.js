/* =========================================================
   background.js — animated "tech" background
   Draws floating dots connected by thin lines (a network /
   data-flow look) behind the light sections of every page.
   It's subtle so text stays easy to read.
   ========================================================= */

(function () {
  const canvas = document.createElement('canvas');
  canvas.id = 'bg-canvas';
  let ctx, w, h, dots = [];

  // How dense the network is (auto-scales to screen size)
  function makeDots() {
    const count = Math.min(90, Math.floor((w * h) / 16000));
    dots = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,   // gentle drift
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 1,
    }));
  }

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    makeDots();
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);

    // move + draw dots
    dots.forEach(d => {
      d.x += d.vx; d.y += d.vy;
      if (d.x < 0 || d.x > w) d.vx *= -1;   // bounce off edges
      if (d.y < 0 || d.y > h) d.vy *= -1;

      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(37, 99, 235, 0.35)';
      ctx.fill();
    });

    // connect nearby dots with a fading line
    for (let i = 0; i < dots.length; i++) {
      for (let j = i + 1; j < dots.length; j++) {
        const dx = dots[i].x - dots[j].x;
        const dy = dots[i].y - dots[j].y;
        const dist = Math.hypot(dx, dy);
        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(dots[i].x, dots[i].y);
          ctx.lineTo(dots[j].x, dots[j].y);
          ctx.strokeStyle = `rgba(34, 211, 238, ${0.18 * (1 - dist / 130)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.body.prepend(canvas);
    ctx = canvas.getContext('2d');
    resize();
    draw();
    window.addEventListener('resize', resize);
  });
})();
