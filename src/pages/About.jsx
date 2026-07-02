import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useModal } from '../context/ModalContext'
import SEO, { ORG_SCHEMA } from '../components/SEO'

const page = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit:    { opacity: 0, y: -10, transition: { duration: 0.2 } },
}

const MVV = [
  {
    icon: '◎', title: 'Our Mission', color: '#6366f1',
    gradient: 'linear-gradient(135deg,#6366f1,#22d3ee)',
    desc: 'Empower brands with creativity and AI to grow faster in the digital world.',
    description: 'We believe every brand — regardless of size or budget — deserves world-class creative and AI capabilities. Our mission is to democratize access to the tools and strategies that make brands truly unforgettable and unstoppable in the digital age.',
    result: 'Powering 50+ brands',
  },
  {
    icon: '👁', title: 'Our Vision', color: '#a855f7',
    gradient: 'linear-gradient(135deg,#7c3aed,#a855f7)',
    desc: 'Be the global leader in AI-powered creative growth solutions.',
    description: "We're building toward a future where the line between human creativity and AI intelligence blurs completely — where brands can create, automate, and grow at a pace that was previously unimaginable. That future is already here, and we're leading it.",
    result: 'Global reach, local heart',
  },
  {
    icon: '♥', title: 'Our Values', color: '#f59e0b',
    gradient: 'linear-gradient(135deg,#f59e0b,#ef4444)',
    desc: 'Innovation, transparency and real impact for every client.',
    description: "We don't sell promises — we deliver proof. Transparency in process, honesty in results, and relentless innovation in every project we take on. Your success is the only metric that matters to us, and we'll never stop pushing until we hit it.",
    result: '95% client retention',
  },
]

const STATS = [
  { count: '100+', label: 'Projects Delivered' },
  { count: '50+',  label: 'Brands Served' },
  { count: '10M+', label: 'Audience Reached' },
  { count: '95%',  label: 'Client Retention' },
]

const DETAIL_SECTIONS = [
  {
    icon: '🚀', label: 'What We Do',
    color: '#6366f1',
    items: [
      'Content creation — video, design, copy that converts',
      'AI automation — workflows, personalisation & chatbots at scale',
      'Performance marketing — ads, SEO, analytics that compound',
      'Brand strategy — identity, positioning & digital roadmaps',
    ],
  },
  {
    icon: '⚡', label: 'Why Choose Us',
    color: '#06b6d4',
    items: [
      'AI-First — We amplify every campaign with cutting-edge AI',
      '48h Turnaround — Fast production, zero quality compromise',
      'Data-Driven — Every move backed by real numbers',
      'True Partnership — Your growth is our only metric',
      'Scalable — Startup to enterprise, we grow with you',
    ],
  },
  {
    icon: '🌟', label: 'Why Work With Us',
    color: '#a855f7',
    items: [
      'Build at the intersection of creativity and AI',
      'Remote-friendly, fast-moving, zero-politics culture',
      'Hands-on experience across 10+ industries',
      'Fast-growing team with real ownership & career growth',
    ],
  },
]

export default function About() {
  const { openModal } = useModal()

  const aboutJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Vorldx Adgorithm Lab',
    description: 'Learn about Vorldx Adgorithm Lab — a next-generation content creation and AI automation company.',
    url: 'https://vorldx.com/about',
    mainEntity: ORG_SCHEMA,
  }

  return (
    <motion.div variants={page} initial="initial" animate="animate" exit="exit">
      <SEO
        title="About Us | Vorldx Adgorithm Lab — AI Marketing Agency"
        description="Learn about Vorldx Adgorithm Lab — a next-generation content creation and AI automation company helping brands grow with creative storytelling, intelligent automation and performance marketing."
        path="/about"
        jsonLd={aboutJsonLd}
      />

      {/* Hero */}
      <section className="section">
        <div className="container">
          <div className="about-hero">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <span className="eyebrow">About Us</span>
              <h1 style={{ fontSize: 'clamp(1.9rem, 5vw, 2.4rem)', fontWeight: 800, lineHeight: 1.2 }}>
                We're a team of <span className="gradient-text">innovators</span>,<br />
                creators and problem solvers.
              </h1>
              <p style={{ color: 'var(--text-soft)', marginTop: 16 }}>
                Vorldx Adgorithm Lab is a next-generation content creation and AI automation company. We help brands grow with creative storytelling, smart automation and performance marketing.
              </p>
              <p style={{ color: 'var(--text-soft)', marginTop: 14 }}>
                Our mission is to make world-class creativity and AI accessible to every brand — big or small — so they can stand out and scale faster.
              </p>
              <Link to="/contact" className="btn btn-primary" style={{ marginTop: 24 }}>Work With Us</Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="about-logo-frame"
            >
              <img src="/logo.png" alt="Vorldx Adgorithm Lab logo" width={260} height={260} style={{ objectFit: 'contain' }} className="theme-logo-light" />
              <img src="/logo-white.png" alt="Vorldx Adgorithm Lab logo" width={260} height={260} style={{ objectFit: 'contain' }} className="theme-logo-dark" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Built different — pulled out from the old flip card */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <motion.div
            className="about-showcase"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
          >
            <div className="afc-back-inner">
              <span className="afc-eyebrow">✦ Built different</span>
              <h3 className="afc-headline">
                Not just an agency. <span className="gradient-text">Your growth engine.</span>
              </h3>
              <ul className="afc-hooks">
                <li><span>🚀</span> AI + creativity, under one roof</li>
                <li><span>🎯</span> We don't pitch — we deliver proof</li>
                <li><span>⚡</span> 48h turnaround, zero compromises</li>
                <li><span>🤝</span> Your success is our obsession</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="team-grid">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <span className="eyebrow">The People Behind It</span>
              <h2>Meet the <span className="gradient-text">Team</span></h2>
              <p style={{ color: 'var(--text-soft)', marginTop: 16 }}>
                A small, driven crew of creators, strategists and engineers building the future of AI-powered growth.
              </p>
            </motion.div>
            <motion.div
              className="team-photo-wrap"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <img src="/group-photo.png" alt="The Vorldx Adgorithm Lab team" className="team-photo" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Do / Why Choose Us / Why Work With Us — laid out directly, no card, no click */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">More About Us</span>
            <h2>Everything you'd want to know, <span className="gradient-text">upfront</span></h2>
            <p>We're a next-gen content &amp; AI company helping brands grow with creative storytelling, intelligent automation and performance marketing — all under one roof.</p>
          </div>
          <div className="about-detail-grid">
            {DETAIL_SECTIONS.map(({ label, color, items }, i) => (
              <motion.div
                key={label}
                className="about-detail-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div className="afd-section-head">
                  <h4 style={{ color }}>{label}</h4>
                </div>
                <ul className="afd-list">
                  {items.map(item => (
                    <li key={item}>
                      <span className="afd-dot" style={{ background: color }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          <div className="about-detail-cta">
            <Link to="/contact" className="btn btn-primary">
              Start Your Project →
            </Link>
            <Link to="/services" className="btn btn-outline">
              Explore Services
            </Link>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Values — CLICKABLE cards */}
      <section className="section" style={{ background: 'var(--bg-light)' }}>
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">What Drives Us</span>
            <h2>Mission, Vision &amp; Values</h2>
            <p>Click any card to read the full story behind each pillar.</p>
          </div>
          <div className="mvv">
            {MVV.map((item, i) => (
              <motion.div
                key={item.title}
                className="card clickable-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -10, boxShadow: `0 28px 60px ${item.color}2a`, borderColor: item.color + '44' }}
                onClick={() => openModal(item)}
                role="button" tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && openModal(item)}
                style={{ cursor: 'pointer' }}
              >
                <div className="ic" style={{ background: item.gradient, color: '#fff' }}>{item.icon}</div>
                <h3>{item.title}</h3>
                <p style={{ color: 'var(--text-soft)' }}>{item.desc}</p>
                <span className="card-click-hint" style={{ color: item.color, marginTop: 12 }}>Learn more →</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section">
        <div className="container">
          <motion.div
            className="stats"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="section-head" style={{ marginBottom: 0, paddingTop: 36 }}>
              <h2 style={{ color: '#fff' }}>Our Journey So Far</h2>
            </div>
            <div className="stats-grid">
              {STATS.map(({ count, label }, i) => (
                <motion.div
                  key={label}
                  className="stat"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <h3>{count}</h3>
                  <p>{label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}
