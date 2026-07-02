import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

const page = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit:    { opacity: 0, y: -10, transition: { duration: 0.2 } },
}

export default function NotFound() {
  return (
    <motion.div variants={page} initial="initial" animate="animate" exit="exit">
      <SEO title="Page Not Found | Vorldx Adgorithm Lab" path="/404" />
      <section className="section" style={{ textAlign: 'center' }}>
        <div className="container">
          <span className="eyebrow">404</span>
          <h1 style={{ fontSize: 'clamp(1.9rem, 5vw, 2.6rem)', fontWeight: 800, marginTop: 12 }}>
            This page doesn't <span className="gradient-text">exist</span>.
          </h1>
          <p style={{ color: 'var(--text-soft)', marginTop: 16, maxWidth: 480, marginLeft: 'auto', marginRight: 'auto' }}>
            The page you're looking for was moved or never existed. Let's get you back on track.
          </p>
          <Link to="/" className="btn btn-primary" style={{ marginTop: 28, display: 'inline-flex' }}>
            Back to Home
          </Link>
        </div>
      </section>
    </motion.div>
  )
}
