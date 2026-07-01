import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { ReactLenis, useLenis } from 'lenis/react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Background from './components/Background'
import ScrollProgressBar from './components/ScrollProgressBar'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Pricing from './pages/Pricing'
import Blog from './pages/Blog'
import Careers from './pages/Careers'
import Contact from './pages/Contact'

function ScrollToTop() {
  const { pathname } = useLocation()
  const lenis = useLenis()
  useEffect(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [pathname, lenis])
  return null
}

export default function App() {
  const location = useLocation()

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
      <ScrollToTop />
      <ScrollProgressBar />
      <Background />
      <Navbar />
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/"         element={<Home />} />
          <Route path="/about"    element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/pricing"   element={<Pricing />} />
          <Route path="/blog"     element={<Blog />} />
          <Route path="/careers"  element={<Careers />} />
          <Route path="/contact"  element={<Contact />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </ReactLenis>
  )
}
