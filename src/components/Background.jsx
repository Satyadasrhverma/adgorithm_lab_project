import { useEffect, useRef } from 'react'

const COLORS = ['#6366f1', '#22d3ee', '#a855f7', '#818cf8', '#67e8f9']
const COUNT   = 80
const LINK    = 125

export default function Background() {
  const ref = useRef(null)

  useEffect(() => {
    const c  = ref.current
    const cx = c.getContext('2d')
    let raf, W, H
    let pts = []
    const mouse = { x: -9999, y: -9999 }

    const resize = () => {
      W = c.width  = window.innerWidth
      H = c.height = window.innerHeight
    }

    const mkPt = () => ({
      x:  Math.random() * W,
      y:  Math.random() * H,
      vx: (Math.random() - .5) * .32,
      vy: (Math.random() - .5) * .32,
      r:  Math.random() * 1.5 + .7,
      col: COLORS[0 | (Math.random() * COLORS.length)],
      ph:  Math.random() * 6.28,
    })

    const init = () => { resize(); pts = Array.from({ length: COUNT }, mkPt) }

    const tick = (t = 0) => {
      const dark = document.documentElement.getAttribute('data-theme') === 'dark'
      const sec  = t * 0.001
      cx.clearRect(0, 0, W, H)

      /* ── base background ──────────────────────────────── */
      cx.fillStyle = dark ? '#07091a' : '#f4f5ff'
      cx.fillRect(0, 0, W, H)

      /* ── ambient orb glows ────────────────────────────── */
      const orbs = [
        { x: W * .88, y: -H * .18, r: W * .52,
          col: dark ? 'rgba(99,102,241,.25)'  : 'rgba(99,102,241,.10)' },
        { x: -W * .08, y: H * .92, r: W * .44,
          col: dark ? 'rgba(34,211,238,.16)'  : 'rgba(34,211,238,.07)' },
        { x: W * .58,  y: H * .52, r: W * .38,
          col: dark ? 'rgba(168,85,247,.20)'  : 'rgba(168,85,247,.08)' },
        { x: W * .18,  y: H * .28, r: W * .28,
          col: dark ? 'rgba(245,158,11,.10)'  : 'rgba(245,158,11,.05)' },
      ]
      orbs.forEach(o => {
        const g = cx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r)
        g.addColorStop(0, o.col)
        g.addColorStop(1, 'transparent')
        cx.fillStyle = g
        cx.fillRect(0, 0, W, H)
      })

      /* ── diagonal hairlines ───────────────────────────── */
      cx.save()
      cx.strokeStyle = dark ? 'rgba(99,102,241,.05)' : 'rgba(99,102,241,.04)'
      cx.lineWidth   = .6
      const step = 72
      for (let x = -H; x < W + H; x += step) {
        cx.beginPath(); cx.moveTo(x, 0); cx.lineTo(x + H, H); cx.stroke()
      }
      cx.restore()

      /* ── connecting lines ─────────────────────────────── */
      for (let i = 0; i < pts.length - 1; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x
          const dy = pts[i].y - pts[j].y
          const d  = Math.sqrt(dx*dx + dy*dy)
          if (d < LINK) {
            const a = (1 - d / LINK) * (dark ? .20 : .09)
            cx.beginPath()
            cx.strokeStyle = `rgba(99,102,241,${a})`
            cx.lineWidth   = .7
            cx.moveTo(pts[i].x, pts[i].y)
            cx.lineTo(pts[j].x, pts[j].y)
            cx.stroke()
          }
        }
      }

      /* ── particles ────────────────────────────────────── */
      pts.forEach(p => {
        /* mouse repulsion */
        const mdx = p.x - mouse.x
        const mdy = p.y - mouse.y
        const md  = Math.hypot(mdx, mdy)
        if (md < 110 && md > 0) {
          const f = (110 - md) / 110 * .45
          p.vx += (mdx / md) * f
          p.vy += (mdy / md) * f
        }

        /* speed cap + damping */
        const sp = Math.hypot(p.vx, p.vy)
        if (sp > .75) { p.vx *= .75 / sp; p.vy *= .75 / sp }
        p.vx *= .997; p.vy *= .997

        /* move */
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) { p.x = 0; p.vx =  Math.abs(p.vx) }
        if (p.x > W) { p.x = W; p.vx = -Math.abs(p.vx) }
        if (p.y < 0) { p.y = 0; p.vy =  Math.abs(p.vy) }
        if (p.y > H) { p.y = H; p.vy = -Math.abs(p.vy) }

        /* pulsing glow */
        const r = p.r + Math.sin(sec * 1.3 + p.ph) * .4
        const gl = cx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 3)
        gl.addColorStop(0, p.col + (dark ? 'dd' : '66'))
        gl.addColorStop(1, 'transparent')
        cx.fillStyle = gl
        cx.beginPath()
        cx.arc(p.x, p.y, r * 3, 0, 6.28)
        cx.fill()

        cx.beginPath()
        cx.arc(p.x, p.y, r, 0, 6.28)
        cx.fillStyle = p.col + (dark ? 'ee' : '88')
        cx.fill()
      })

      raf = requestAnimationFrame(tick)
    }

    const onMouse  = e => { mouse.x = e.clientX; mouse.y = e.clientY }
    const onLeave  = ()  => { mouse.x = mouse.y = -9999 }
    const onVis    = ()  => document.hidden
      ? cancelAnimationFrame(raf)
      : (raf = requestAnimationFrame(tick))

    init()
    raf = requestAnimationFrame(tick)

    window.addEventListener('resize',            init)
    window.addEventListener('mousemove',         onMouse)
    window.addEventListener('mouseleave',        onLeave)
    document.addEventListener('visibilitychange', onVis)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize',          init)
      window.removeEventListener('mousemove',       onMouse)
      window.removeEventListener('mouseleave',      onLeave)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none', display: 'block' }}
    />
  )
}
