import { useRef, useCallback } from 'react'

export function useTilt(intensity = 14) {
  const ref = useRef(null)

  const onMouseMove = useCallback((e) => {
    const el = ref.current
    if (!el) return
    const { left, top, width, height } = el.getBoundingClientRect()
    const x = (e.clientX - left) / width - 0.5
    const y = (e.clientY - top) / height - 0.5
    el.style.transform = `perspective(900px) rotateY(${x * intensity}deg) rotateX(${-y * intensity}deg) scale3d(1.04,1.04,1.04)`
    el.style.transition = 'transform 0.08s ease-out'
  }, [intensity])

  const onMouseLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)'
    el.style.transition = 'transform 0.55s cubic-bezier(0.23, 1, 0.32, 1)'
  }, [])

  return { ref, onMouseMove, onMouseLeave }
}
