import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import WAVES from 'vanta/dist/vanta.waves.min'

export default function VantaBg({ children, className = '', style = {} }) {
  const containerRef = useRef(null)
  const effectRef = useRef(null)

  useEffect(() => {
    if (!effectRef.current && containerRef.current) {
      effectRef.current = WAVES({
        el: containerRef.current,
        THREE,
        color: 0x0d0d3a,
        waveColor: 0x3730a3,
        backgroundColor: 0x04061a,
        waveHeight: 14,
        waveSpeed: 0.45,
        zoom: 0.9,
        shininess: 25,
        mouseControls: false,
        touchControls: false,
        gyroControls: false,
        scale: 1,
        scaleMobile: 1,
        pixelRatio: Math.min(window.devicePixelRatio || 1, 1),
      })
    }
    return () => {
      if (effectRef.current) {
        effectRef.current.destroy()
        effectRef.current = null
      }
    }
  }, [])

  return (
    <div ref={containerRef} className={className} style={{ position: 'relative', ...style }}>
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  )
}
