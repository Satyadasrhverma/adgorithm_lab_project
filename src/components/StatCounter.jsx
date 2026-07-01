import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

function parse(str) {
  const m = str.match(/^(\d+)(.*)$/)
  return m ? { num: parseInt(m[1], 10), suffix: m[2] } : { num: 0, suffix: '' }
}

export default function StatCounter({ count, label }) {
  const { num, suffix } = parse(count)
  const [display, setDisplay]   = useState(0)
  const [flipKey, setFlipKey]   = useState(0)
  const [burst, setBurst]       = useState(false)
  const ref    = useRef(null)
  const inView = useInView(ref, { once: false, amount: 0.5 })

  useEffect(() => {
    if (!inView) return
    setDisplay(0)
    setBurst(false)
    let current = 0
    const STEPS = 65
    const INTERVAL = 22
    const increment = num / STEPS

    const timer = setInterval(() => {
      current += increment
      if (current >= num) {
        setDisplay(num)
        clearInterval(timer)
        setBurst(true)
        setTimeout(() => setBurst(false), 900)
      } else {
        setDisplay(Math.round(current))
      }
    }, INTERVAL)

    return () => clearInterval(timer)
  }, [inView, flipKey, num])

  useEffect(() => {
    const id = setInterval(() => {
      setDisplay(0)
      setFlipKey((k) => k + 1)
    }, 30000)
    return () => clearInterval(id)
  }, [])

  return (
    <div ref={ref} className="stat-item" style={{ position: 'relative' }}>
      {burst && (
        <div className="stat-burst" aria-hidden>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="stat-particle" style={{ '--i': i }} />
          ))}
        </div>
      )}
      <motion.div
        key={flipKey}
        className="stat-num"
        initial={{ opacity: 0, rotateX: 80, y: 24 }}
        animate={{ opacity: 1, rotateX: 0, y: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        style={{ perspective: 800 }}
      >
        {display}{suffix}
      </motion.div>
      <motion.div
        className="stat-label"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
      >
        {label}
      </motion.div>
    </div>
  )
}
