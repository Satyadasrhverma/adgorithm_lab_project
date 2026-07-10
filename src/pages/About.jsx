import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useModal } from '../context/ModalContext'
import SEO, { ORG_SCHEMA } from '../components/SEO'

const page = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit:    { opacity: 0, y: -10, transition: { duration: 0.2 } },
}

function HookIcon({ type }) {
  const gid = `hookGrad-${type}`
  const gradients = {
    rocket: ['#22d3ee', '#6366f1'],
    target: ['#38bdf8', '#a855f7'],
    bolt:   ['#facc15', '#f97316'],
    heart:  ['#f97316', '#a855f7'],
  }
  const [c1, c2] = gradients[type]

  return (
    <svg className="afc-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={gid} x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={c1} />
          <stop offset="100%" stopColor={c2} />
        </linearGradient>
      </defs>

      {type === 'rocket' && (
        <g stroke={`url(#${gid})`} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2.2c2.7 2.4 4.3 5.8 4.3 9.3 0 2.6-1.3 4.6-2.1 5.6a1 1 0 0 1-1.5 0c-.8-1-2.1-3-2.1-5.6 0-3.5 1.6-6.9 4.3-9.3z" fill={`url(#${gid})`} fillOpacity=".18" />
          <circle cx="12" cy="10.4" r="1.5" fill={`url(#${gid})`} stroke="none" />
          <path d="M8.4 13.2 5.6 16.4l2.7-.6" fill="none" />
          <path d="M15.6 13.2l2.8 3.2-2.7-.6" fill="none" />
          <path d="M10.3 18.6 12 22l1.7-3.4" fill="none" strokeWidth="1.4" />
        </g>
      )}

      {type === 'target' && (
        <g stroke={`url(#${gid})`} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="10.5" cy="13.5" r="7.7" strokeWidth="1.5" />
          <circle cx="10.5" cy="13.5" r="4.8" strokeWidth="1.5" />
          <circle cx="10.5" cy="13.5" r="1.9" fill={`url(#${gid})`} stroke="none" />
          <path d="M21.5 2.5 12.6 11.4" strokeWidth="1.6" />
          <path d="M21.5 2.5 17.6 2.9 21.1 6.4z" fill={`url(#${gid})`} stroke="none" />
        </g>
      )}

      {type === 'bolt' && (
        <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" fill={`url(#${gid})`} stroke={`url(#${gid})`} strokeWidth="1.1" strokeLinejoin="round" />
      )}

      {type === 'heart' && (
        <g>
          <path d="M12 20.2s-7-4.3-9.3-8.7C1.2 8.6 2.5 4.9 6 4.4c2-.3 3.7.7 4.7 2.1a5.4 5.4 0 0 1 1.3 0c1-1.4 2.7-2.4 4.7-2.1 3.5.5 4.8 4.2 3.3 7.1-2.3 4.4-9.3 8.7-9.3 8.7z" fill={`url(#${gid})`} fillOpacity=".85" />
          <path d="M8.4 13.6c.9.9 2.2 1 3.1.2M10.9 15.9c.9.9 2.2 1 3.1.2M13.4 18.1c.9.9 2.1 1 3 .2" stroke="#0b0f1f" strokeWidth="1.1" strokeLinecap="round" opacity=".55" />
        </g>
      )}
    </svg>
  )
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

const FOUNDER_PILLARS = [
  { icon: '👁', title: 'Our Vision', desc: 'To be a global AI-first innovation company that empowers businesses to grow smarter and faster.' },
  { icon: '🎯', title: 'Our Mission', desc: 'To bridge the gap between strategy and technology through AI, creativity, and automation.' },
  { icon: '💎', title: 'Our Values', desc: 'Innovation, integrity, impact, and a commitment to deliver excellence in everything we do.' },
  { icon: '👥', title: 'Our Promise', desc: "We don't just deliver solutions, we deliver results that transform businesses." },
]

const DETAIL_SECTIONS = [
  {
    icon: '/what_we_do_header.png', label: 'What We Do',
    color: '#6366f1',
    items: [
      'Content creation — video, design, copy that converts',
      'AI automation — workflows, personalisation & chatbots at scale',
      'Performance marketing — ads, SEO, analytics that compound',
      'Brand strategy — identity, positioning & digital roadmaps',
    ],
  },
  {
    icon: '/why_choose_header.png', label: 'Why Choose Us',
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
    icon: '/why_work_header.png', label: 'Why Work With Us',
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
                <li><HookIcon type="rocket" /> AI + creativity, under one roof</li>
                <li><HookIcon type="target" /> We don't pitch — we deliver proof</li>
                <li><HookIcon type="bolt" /> 48h turnaround, zero compromises</li>
                <li><HookIcon type="heart" /> Your success is our obsession</li>
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
            {DETAIL_SECTIONS.map(({ label, color, items, icon }, i) => (
              <motion.div
                key={label}
                className="about-detail-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div className="afd-section-head">
                  <img className="afd-icon" src={icon} alt="" aria-hidden="true" />
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

      {/* Founder's Message */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Founder's Message</span>
          </div>
          <div className="founder-grid">
            <motion.div
              className="founder-photo-wrap"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <img src="/sir.jpeg" alt="Prakash Chandra — Founder & CEO, Adgorithm" className="founder-photo" />
            </motion.div>
            <motion.div
              className="founder-content"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h2>From Vision to Impact.<br />That's <span style={{ color: '#a855f7' }}>Our Promise.</span></h2>
              <p>Adgorithm was founded with a simple belief – technology should solve real business problems and create meaningful impact.</p>
              <p>In today's AI-driven world, businesses need more than just tools; they need the right strategy, creativity, and innovation to stay ahead. We combine AI, automation, data, and design to build intelligent solutions that drive measurable growth.</p>
              <p>We are not just a service provider; we are your long-term growth partner. Every project we take on is a step towards building smarter businesses and a better future.</p>
              <p className="founder-cta-line">Let's build the future together.</p>
              <img src="/sign.png" alt="Prakash Chandra signature" className="founder-signature" />
              <div className="founder-name">Prakash Chandra</div>
              <div className="founder-title">Founder &amp; CEO, Adgorithm</div>
            </motion.div>
          </div>
          <div className="founder-pillars">
            {FOUNDER_PILLARS.map(({ icon, title, desc }, i) => (
              <motion.div
                key={title}
                className="founder-pillar"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <span className="founder-pillar-icon">{icon}</span>
                <div>
                  <h4>{title}</h4>
                  <p>{desc}</p>
                </div>
              </motion.div>
            ))}
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
