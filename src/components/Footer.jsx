import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  const [email, setEmail] = useState('')
  const year = new Date().getFullYear()

  const subscribe = (e) => {
    e.preventDefault()
    if (email.includes('@')) { alert('Thanks for subscribing, ' + email + '!'); setEmail('') }
    else alert('Please enter a valid email.')
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link to="/" className="brand footer-brand">
              <img className="logo" src="/logo-white.png" alt="Vorldx Adgorithm Lab" />
            </Link>
            <p className="about">We combine creativity and AI to help brands grow faster and smarter in the digital world.</p>
            <div className="socials">
              <a href="https://www.facebook.com/profile.php?id=61590730171594" target="_blank" rel="noopener noreferrer" aria-label="Facebook">f</a>
              <a href="https://x.com/AdgorithLab" target="_blank" rel="noopener noreferrer" aria-label="Twitter">𝕏</a>
              <a href="https://www.instagram.com/vorldxadgorithm/?hl=en" target="_blank" rel="noopener noreferrer" aria-label="Instagram">◎</a>
              <a href="https://www.youtube.com/channel/UCaNks7AB4elGsrqWXicIz3w" target="_blank" rel="noopener noreferrer" aria-label="YouTube">▶</a>
            </div>
          </div>
          <div>
            <h5>Company</h5>
            <Link to="/about">About Us</Link>
            <Link to="/careers">Careers</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div>
            <h5>Services</h5>
            <Link to="/services">Content Creation</Link>
            <Link to="/services">AI Automation</Link>
            <Link to="/services">Branding</Link>
            <Link to="/services">Growth Marketing</Link>
          </div>
          <div className="news">
            <h5>Newsletter</h5>
            <p style={{ fontSize: '.9rem', color: '#9aa6be' }}>Subscribe for updates and insights.</p>
            <form className="row" onSubmit={subscribe}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">→</button>
            </form>
          </div>
        </div>
        <div className="footer-bottom">© {year} Vorldx Adgorithm Lab. All rights reserved.</div>
      </div>
    </footer>
  )
}
