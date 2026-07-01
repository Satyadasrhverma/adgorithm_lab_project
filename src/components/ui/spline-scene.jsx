'use client'

import { Suspense, lazy, useEffect, useRef, Component } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))

function SplinePlaceholder() {
  return (
    <div className="spline-placeholder">
      <div className="sp-orb sp-orb-1" />
      <div className="sp-orb sp-orb-2" />
      <div className="sp-orb sp-orb-3" />
      <div className="sp-ring sp-ring-1" />
      <div className="sp-ring sp-ring-2" />
      <div className="sp-particles">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="sp-dot" style={{ '--i': i }} />
        ))}
      </div>
    </div>
  )
}

class SplineErrorBoundary extends Component {
  state = { hasError: false }
  static getDerivedStateFromError() { return { hasError: true } }
  render() {
    return this.state.hasError ? <SplinePlaceholder /> : this.props.children
  }
}

export function SplineScene({ scene, className, style }) {
  const wrapRef = useRef(null)
  const appRef = useRef(null)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        const app = appRef.current
        if (!app) return
        if (entry.isIntersecting) app.play()
        else app.stop()
      },
      { threshold: 0, rootMargin: '200px 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={wrapRef} className={className} style={style}>
      <SplineErrorBoundary>
        <Suspense fallback={<SplinePlaceholder />}>
          <Spline
            scene={scene}
            style={{ width: '100%', height: '100%' }}
            onLoad={(app) => { appRef.current = app }}
          />
        </Suspense>
      </SplineErrorBoundary>
    </div>
  )
}
