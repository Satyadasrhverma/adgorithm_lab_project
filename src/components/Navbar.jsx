import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

const NAV_ITEMS = [
  { name: 'Home',      path: '/' },
  { name: 'About',     path: '/about' },
  { name: 'Services',  path: '/services' },
  { name: 'Pricing',   path: '/pricing' },
  { name: 'Blog',      path: '/blog' },
  { name: 'Careers',   path: '/careers' },
  { name: 'Contact',   path: '/contact' },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [hovered,  setHovered]  = useState(null)
  const [dark,     setDark]     = useState(() => localStorage.getItem('vorldx_theme') === 'dark')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
    localStorage.setItem('vorldx_theme', dark ? 'dark' : 'light')
  }, [dark])

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => setMenuOpen(false), [pathname])

  return (
    <nav className="navbar" style={scrolled ? { boxShadow: '0 2px 30px rgba(0,0,0,.14)' } : {}}>
      <div className="container nav-inner">

        <Link to="/" className="brand">
          <img
            className="logo"
            src={dark ? '/logo-white.png' : '/logo.png'}
            alt="Vorldx Adgorithm Lab"
          />
        </Link>

        <div
          className={`nav-links${menuOpen ? ' open' : ''}`}
          onMouseLeave={() => setHovered(null)}
        >
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.path
            return (
              <motion.div
                key={item.path}
                style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}
                onMouseEnter={() => setHovered(item.path)}
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 420, damping: 18 }}
              >
                {/* Sliding pill behind hovered item */}
                {hovered === item.path && (
                  <motion.span
                    layoutId="navPill"
                    className="nav-pill"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <Link
                  to={item.path}
                  className={isActive ? 'active' : ''}
                >
                  <span className="nav-label">{item.name}</span>
                </Link>
              </motion.div>
            )
          })}
        </div>

        <div className="nav-cta">
          <motion.button
            className="theme-toggle"
            onClick={() => setDark(d => !d)}
            aria-label="Toggle theme"
            whileHover={{ rotate: 18, scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
          >
            {dark ? '☀️' : '🌙'}
          </motion.button>
          <Link to="/contact" className="btn btn-primary">Let's Talk</Link>
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
  )
}
