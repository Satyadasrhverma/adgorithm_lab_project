import { useState, useEffect, Fragment } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

const robotSlideVariants = {
  hidden:  { x: 120, opacity: 1, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
  visible: { x: 0,   opacity: 1, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
}

const NAV_ITEMS = [
  { name: 'Home',      path: '/',         accent: '#6366f1' },
  { name: 'About',     path: '/about',    accent: '#10b981' },
  { name: 'Services',  path: '/services', accent: '#a855f7' },
  { name: 'Pricing',   path: '/pricing',  accent: '#f59e0b' },
  { name: 'Blog',      path: '/blog',     accent: '#ec4899' },
  { name: 'Careers',   path: '/careers',  accent: '#06b6d4' },
  { name: 'Connect',   path: '/contact',  accent: '#ef4444' },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [hovered,  setHovered]  = useState(null)
  const [dark,     setDark]     = useState(() => localStorage.getItem('vorldx_theme') === 'dark')
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [robotPeek, setRobotPeek] = useState(false)
  const [robotSettle, setRobotSettle] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
    localStorage.setItem('vorldx_theme', dark ? 'dark' : 'light')
  }, [dark])

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 50)
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0)
    }
    fn()
    window.addEventListener('scroll', fn, { passive: true })
    window.addEventListener('resize', fn)
    return () => {
      window.removeEventListener('scroll', fn)
      window.removeEventListener('resize', fn)
    }
  }, [])

  useEffect(() => setMenuOpen(false), [pathname])

  /* Robot mascot: slides behind the navbar's right edge on route change,
     then peeks back out — also fires once on first mount for the intro reveal. */
  useEffect(() => {
    setRobotPeek(false)
    const t = setTimeout(() => setRobotPeek(true), 300)
    return () => clearTimeout(t)
  }, [pathname])

  return (
    <Fragment>
    <nav
      className={`navbar${scrolled ? ' navbar--compact' : ''}`}
      style={scrolled ? { boxShadow: '0 2px 30px rgba(0,0,0,.14)' } : {}}
    >
      <span className="nav-progress" style={{ transform: `scaleX(${progress})` }} />
      <div className="container nav-inner">

        <Link to="/" className="brand">
          <img
            className="logo"
            src={dark ? '/logo-white.png' : '/logo.png'}
            alt="Vorldx Adgorithm Lab"
          />
          <div className="nav-mascot-scale" aria-hidden="true">
            <div className="nav-mascot-float">
              <span className="nav-mascot-glow" />
              <div className="nav-mascot-crop">
                <img className="nav-mascot" src="/a_boy.png" alt="" />
              </div>
            </div>
          </div>
        </Link>

        <div
          className={`nav-links${menuOpen ? ' open' : ''}`}
          onMouseLeave={() => setHovered(null)}
        >
          {NAV_ITEMS.map((item) => {
            const isActive  = pathname === item.path
            const isHovered = hovered === item.path
            return (
              <motion.div
                key={item.path}
                style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}
                onMouseEnter={() => setHovered(item.path)}
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 420, damping: 18 }}
              >
                {/* Sliding pill behind hovered item — tinted to that page's own accent color */}
                {isHovered && (
                  <motion.span
                    layoutId="navPill"
                    className="nav-pill"
                    style={{
                      background: item.accent + '1f',
                      borderColor: item.accent + '48',
                      boxShadow: `0 4px 18px ${item.accent}30`,
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <Link
                  to={item.path}
                  className={isActive ? 'active' : ''}
                  style={{ color: (isActive || isHovered) ? item.accent : undefined }}
                >
                  <span className="nav-label">{item.name}</span>
                  {isActive && (
                    <span
                      className="nav-active-dot"
                      style={{ background: item.accent, color: item.accent }}
                    />
                  )}
                </Link>
              </motion.div>
            )
          })}
        </div>

        <div className="nav-cta">
          <button
            type="button"
            className={`theme-slider${dark ? ' is-dark' : ''}`}
            onClick={() => setDark(d => !d)}
            aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
            aria-pressed={dark}
          >
            <span className="theme-slider-icon theme-slider-icon--sun">☀️</span>
            <span className="theme-slider-icon theme-slider-icon--moon">🌙</span>
            <motion.span
              className="theme-slider-knob"
              animate={{ x: dark ? 0 : 26 }}
              transition={{ type: 'spring', stiffness: 500, damping: 32 }}
            />
          </button>
          <Link to="/contact" className="btn btn-primary nav-cta-btn">Let's Talk</Link>
          <button
            className="hamburger"
            aria-label="Menu"
            onClick={() => setMenuOpen(o => !o)}
          >
            <span style={menuOpen ? { transform: 'rotate(45deg) translate(5px,5px)' } : {}} />
            <span style={menuOpen ? { opacity: 0 } : {}} />
            <span style={menuOpen ? { transform: 'rotate(-45deg) translate(5px,-5px)' } : {}} />
          </button>
        </div>

      </div>
    </nav>

    {/* Robot mascot — deliberately NOT a descendant of <nav>. It's a fully
        independent, viewport-fixed layer (see .nav-robot-fixed), so it can
        never affect the navbar's box, width, or push its flex children. */}
    <div className={`nav-robot-fixed${scrolled ? ' is-compact' : ''}`} aria-hidden="true">
      <motion.div
        className="nav-robot-slide"
        variants={robotSlideVariants}
        initial="hidden"
        animate={robotPeek ? 'visible' : 'hidden'}
        onAnimationComplete={(def) => {
          if (def === 'visible') {
            setRobotSettle(true)
            setTimeout(() => setRobotSettle(false), 520)
          }
        }}
      >
        <div className="nav-robot-float">
          <img
            className={`nav-robot${robotSettle ? ' nav-robot-settle' : ''}`}
            src="/robot-mascot.png"
            alt=""
          />
        </div>
      </motion.div>
    </div>
    </Fragment>
  )
}
