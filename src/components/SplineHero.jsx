import { SplineScene } from './ui/spline-scene'
import { Spotlight }   from './ui/spotlight'
import { motion }      from 'framer-motion'

export default function SplineHero() {
  return (
    <motion.div
      className="spline-hero-card"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.2, 0.8, 0.3, 1], delay: 0.2 }}
    >
      {/* Mouse-follow spotlight */}
      <Spotlight size={320} />

      <div className="spline-hero-inner">

        {/* Left — text */}
        <div className="spline-hero-text">
          <span className="spline-eyebrow">Powered by AI + 3D</span>
          <h2 className="spline-title">
            Interactive<br />
            <span className="spline-gradient">3D Experience</span>
          </h2>
          <p className="spline-desc">
            We blend creativity, technology and AI to build content, automate
            processes and grow brands in the digital world.
          </p>
          <div className="spline-badges">
            {['Creative Studio', 'AI Workflows', 'Brand Growth'].map((b) => (
              <span key={b} className="spline-badge">{b}</span>
            ))}
          </div>
        </div>

        {/* Right — live Spline 3D scene */}
        <div className="spline-hero-scene">
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            style={{ width: '100%', height: '100%' }}
          />
        </div>

      </div>
    </motion.div>
  )
}
