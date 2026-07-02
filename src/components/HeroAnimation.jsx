import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function HeroAnimation({ className, style }) {
  const mountRef = useRef(null)

  useEffect(() => {
    // Skip WebGL init during the react-snap prerender crawl — its bundled
    // headless Chromium can't reliably initialize WebGL and hangs the crawl.
    if (navigator.userAgent === 'ReactSnap') return
    const el = mountRef.current
    if (!el) return

    const W = el.clientWidth
    const H = el.clientHeight

    // ── Renderer ──────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setClearColor(0x000000, 0)
    el.appendChild(renderer.domElement)

    // ── Scene & Camera ────────────────────────────────────
    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 100)
    camera.position.z = 7.5

    // ── Master group (drag rotates this) ──────────────────
    const group = new THREE.Group()
    scene.add(group)

    // ── Core wireframe (AI brain) ─────────────────────────
    const brainGeo = new THREE.IcosahedronGeometry(1.4, 1)
    const brainMat = new THREE.MeshBasicMaterial({
      color: 0x6366f1, wireframe: true,
      transparent: true, opacity: 0.5,
    })
    const brain = new THREE.Mesh(brainGeo, brainMat)
    group.add(brain)

    // ── Inner glow core ───────────────────────────────────
    const coreGeo = new THREE.SphereGeometry(0.75, 24, 24)
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x4f46e5, transparent: true, opacity: 0.25,
    })
    group.add(new THREE.Mesh(coreGeo, coreMat))

    // ── Orbital rings ──────────────────────────────────────
    const makeRing = (r, color, rotX, rotY, opacity = 0.35) => {
      const g = new THREE.RingGeometry(r, r + 0.05, 90)
      const m = new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide, transparent: true, opacity })
      const mesh = new THREE.Mesh(g, m)
      mesh.rotation.x = rotX
      mesh.rotation.y = rotY
      group.add(mesh)
      return mesh
    }
    const ring1 = makeRing(2.1, 0x22d3ee, Math.PI / 3,  0.2,  0.40)
    const ring2 = makeRing(2.7, 0xa855f7, Math.PI / 6,  1.1,  0.32)
    const ring3 = makeRing(1.7, 0x6366f1, Math.PI / 2, -0.4,  0.28)

    // ── Particle cloud ────────────────────────────────────
    const PTS = 180
    const pos = new Float32Array(PTS * 3)
    for (let i = 0; i < PTS; i++) {
      const r     = 2.2 + Math.random() * 1.8
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(2 * Math.random() - 1)
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
    }
    const ptGeo = new THREE.BufferGeometry()
    ptGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    const ptMat = new THREE.PointsMaterial({
      color: 0xa5b4fc, size: 0.05, transparent: true, opacity: 0.75,
    })
    const particles = new THREE.Points(ptGeo, ptMat)
    group.add(particles)

    // ── Bright node dots ──────────────────────────────────
    const NODE_POS = new Float32Array(28 * 3)
    for (let i = 0; i < 28; i++) {
      const r     = 1.8 + Math.random() * 1.4
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(2 * Math.random() - 1)
      NODE_POS[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      NODE_POS[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      NODE_POS[i * 3 + 2] = r * Math.cos(phi)
    }
    const nodeGeo = new THREE.BufferGeometry()
    nodeGeo.setAttribute('position', new THREE.BufferAttribute(NODE_POS, 3))
    const nodeMat = new THREE.PointsMaterial({
      color: 0x22d3ee, size: 0.12, transparent: true, opacity: 0.95,
    })
    group.add(new THREE.Points(nodeGeo, nodeMat))

    // ── Drag state ────────────────────────────────────────
    const drag = { active: false, prevX: 0, prevY: 0, velX: 0, velY: 0 }

    const onPointerDown = (e) => {
      drag.active = true
      drag.prevX  = e.clientX ?? e.touches?.[0]?.clientX ?? 0
      drag.prevY  = e.clientY ?? e.touches?.[0]?.clientY ?? 0
      drag.velX = drag.velY = 0
      el.style.cursor = 'grabbing'
    }
    const onPointerMove = (e) => {
      if (!drag.active) return
      const x = e.clientX ?? e.touches?.[0]?.clientX ?? drag.prevX
      const y = e.clientY ?? e.touches?.[0]?.clientY ?? drag.prevY
      drag.velX = (x - drag.prevX) * 0.008
      drag.velY = (y - drag.prevY) * 0.008
      group.rotation.y += drag.velX
      group.rotation.x += drag.velY
      drag.prevX = x
      drag.prevY = y
    }
    const onPointerUp = () => {
      drag.active = false
      el.style.cursor = 'grab'
    }

    el.style.cursor = 'grab'
    el.addEventListener('mousedown',  onPointerDown)
    el.addEventListener('mousemove',  onPointerMove)
    el.addEventListener('mouseup',    onPointerUp)
    el.addEventListener('mouseleave', onPointerUp)
    el.addEventListener('touchstart', onPointerDown, { passive: true })
    el.addEventListener('touchmove',  onPointerMove, { passive: true })
    el.addEventListener('touchend',   onPointerUp)

    // ── Animation loop ─────────────────────────────────────
    let rafId = null
    let t = 0
    const render = () => {
      t += 0.005

      if (!drag.active) {
        // Inertia + auto-rotate
        drag.velX *= 0.92
        drag.velY *= 0.92
        group.rotation.y += drag.velX + 0.003
        group.rotation.x += drag.velY
      }

      // Self-rotate the brain (inside the group)
      brain.rotation.y = t * 0.6
      brain.rotation.x = t * 0.2

      // Rings spin on their own z-axis (gives the blue/violet orbital spin)
      ring1.rotation.z =  t * 0.55
      ring2.rotation.z = -t * 0.40
      ring3.rotation.y =  t * 0.70

      // Pulse opacity
      ring1.material.opacity = 0.35 + 0.1  * Math.sin(t * 1.3)
      ring2.material.opacity = 0.28 + 0.08 * Math.sin(t * 0.9 + 1)
      brainMat.opacity       = 0.42 + 0.10 * Math.sin(t * 0.7)

      particles.rotation.y = -t * 0.04

      renderer.render(scene, camera)
    }

    const loop = () => { rafId = requestAnimationFrame(loop); render() }

    // ── Pause off-screen ──────────────────────────────────
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { if (!rafId) loop() }
      else { cancelAnimationFrame(rafId); rafId = null }
    }, { threshold: 0, rootMargin: '200px 0px' })
    io.observe(el)
    loop()

    // ── Resize ────────────────────────────────────────────
    const onResize = () => {
      const w = el.clientWidth, h = el.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
      io.disconnect()
      el.removeEventListener('mousedown',  onPointerDown)
      el.removeEventListener('mousemove',  onPointerMove)
      el.removeEventListener('mouseup',    onPointerUp)
      el.removeEventListener('mouseleave', onPointerUp)
      el.removeEventListener('touchstart', onPointerDown)
      el.removeEventListener('touchmove',  onPointerMove)
      el.removeEventListener('touchend',   onPointerUp)
      renderer.dispose()
      if (renderer.domElement.parentNode === el) el.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className={className} style={style} />
}
