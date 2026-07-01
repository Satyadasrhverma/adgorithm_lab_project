/* =========================================================
   background.js — Interactive tech background
   Mouse-reactive particle network with depth layers.
   ========================================================= */

(function () {
  const canvas = document.createElement('canvas');
  canvas.id = 'bg-canvas';
  let ctx, w, h, dots = [];
  let mouseX = -9999, mouseY = -9999;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function isDark() {
    return document.documentElement.getAttribute('data-theme') === 'dark';
  }

  function makeDots() {
    const density = Math.min(100, Math.floor((w * h) / 14000));
    dots = Array.from({ length: density }, (_, i) => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      r: Math.random() * 2.2 + 0.8,
      layer: i % 3,  // 0=far, 1=mid, 2=near — parallax depth
      opacity: Math.random() * 0.5 + 0.3,
    }));
  }

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    makeDots();
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);

    const dark = isDark();
    const dotColor = dark ? [99, 102, 241] : [99, 102, 241];
    const lineColor = dark ? [34, 211, 238] : [99, 102, 241];
    const connectDist = 140;
    const mouseRepelDist = 130;

    dots.forEach(d => {
      // Mouse repulsion
      const dmx = d.x - mouseX;
      const dmy = d.y - mouseY;
      const mouseDist = Math.hypot(dmx, dmy);
      if (mouseDist < mouseRepelDist && mouseDist > 0) {
        const force = (1 - mouseDist / mouseRepelDist) * 1.5;
        d.x += (dmx / mouseDist) * force;
        d.y += (dmy / mouseDist) * force;
      }

      // Normal drift (near dots drift slightly faster)
      const speedMult = 1 + d.layer * 0.2;
      d.x += d.vx * speedMult;
      d.y += d.vy * speedMult;

      // Bounce
      if (d.x < 0 || d.x > w) { d.vx *= -1; d.x = Math.max(0, Math.min(w, d.x)); }
      if (d.y < 0 || d.y > h) { d.vy *= -1; d.y = Math.max(0, Math.min(h, d.y)); }

      // Draw dot — near layer is brighter
      const alpha = dark
        ? 0.25 + d.layer * 0.18
        : 0.18 + d.layer * 0.14;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r * (1 + d.layer * 0.3), 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${dotColor.join(',')},${alpha})`;
      ctx.fill();
    });

    // Connect nearby dots
    for (let i = 0; i < dots.length; i++) {
      for (let j = i + 1; j < dots.length; j++) {
        const dx = dots[i].x - dots[j].x;
        const dy = dots[i].y - dots[j].y;
        const dist = Math.hypot(dx, dy);
        if (dist < connectDist) {
          const t = 1 - dist / connectDist;
          const alpha = dark
            ? t * 0.22
            : t * 0.12;
          ctx.beginPath();
          ctx.moveTo(dots[i].x, dots[i].y);
          ctx.lineTo(dots[j].x, dots[j].y);
          ctx.strokeStyle = `rgba(${lineColor.join(',')},${alpha})`;
          ctx.lineWidth = t * 1.2;
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
