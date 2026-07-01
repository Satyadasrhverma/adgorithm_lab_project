import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    // Only on pointer-precise devices
    if (!window.matchMedia('(pointer: fine)').matches) return
    document.body.classList.add('has-cursor')

    let mx = 0, my = 0, rx = 0, ry = 0, raf

    const onMove = (e) => {
      mx = e.clientX; my = e.clientY
      dot.style.left = mx + 'px'
      dot.style.top  = my + 'px'
    }
    document.addEventListener('mousemove', onMove)

    const animate = () => {
      rx += (mx - rx) * 0.10
      ry += (my - ry) * 0.10
      ring.style.left = rx + 'px'
      ring.style.top  = ry + 'px'
      raf = requestAnimationFrame(animate)
    }
    animate()

    const targets = 'a,button,.magnetic,.bento-card,.pflow-node,.card,.post,.perk,.job,.modal-card'
    const els = document.querySelectorAll(targets)
    const enter = () => document.body.classList.add('cursor-hover')
    const leave = () => document.body.classList.remove('cursor-hover')
    els.forEach(el => { el.addEventListener('mouseenter', enter); el.addEventListener('mouseleave', leave) })

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('mousemove', onMove)
      document.body.classList.remove('has-cursor')
    }
  }, [])

  return (
    <>
      <div className="cursor-dot"  ref={dotRef}  />
      <div className="cursor-ring" ref={ringRef} />
    </>
  )
}
