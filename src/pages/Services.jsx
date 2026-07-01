import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useModal } from '../context/ModalContext'
import { SERVICES_LIST } from '../data/cards'
import SEO from '../components/SEO'

const page = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit:    { opacity: 0, y: -10, transition: { duration: 0.2 } },
}

const WHY = [
  { icon: '⚡', title: 'Fast Delivery',    desc: 'We move quickly without cutting corners — you see results sooner.' },
  { icon: '🤖', title: 'AI-Powered',       desc: 'Human creativity amplified by AI to work smarter and faster.' },
  { icon: '📊', title: 'Data-Driven',      desc: 'Every decision is backed by real numbers and measurable goals.' },
  { icon: '🤝', title: 'True Partnership', desc: 'We work as an extension of your team, fully invested in growth.' },
]

export default function Services() {
  const { openModal } = useModal()

  const servicesJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Vorldx Services',
    description: 'Full range of AI-powered content, marketing and branding services.',
    itemListElement: SERVICES_LIST.map((svc, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: svc.title,
      description: svc.items?.[0] || '',
      url: `https://vorldx.com/services`,
    })),
  }

  return (
    <motion.div variants={page} initial="initial" animate="animate" exit="exit">
      <SEO
        title="Our Services | Content Creation, AI Automation & Growth Marketing | Vorldx"
        description="Explore Vorldx services: Content Creation, AI Automation, Branding, Growth Marketing, Market Research and Web & App Design. Proven workflows built for real results."
        path="/services"
        jsonLd={servicesJsonLd}
      />
      <section className="page-head">
        <div className="container">
          <h1>Our Services</h1>
          <p>Click any service card to see our full workflow — built for real results.</p>
        </div>
      </section>

      {/* Clickable service cards */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">What We Offer</span>
            <h2>Pick a service to <span className="gradient-text">explore the process</span></h2>
            <p>Each service comes with a clear, proven workflow — no guesswork, just results.</p>
          </div>
          <div className="cards service-cards">
            {SERVICES_LIST.map((svc, i) => (
              <motion.article
                key={svc.id}
                className="card clickable-card"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -10, boxShadow: `0 28px 60px ${svc.color}28`, borderColor: svc.color + '55' }}
                onClick={() => openModal({ ...svc, mode: 'full' })}
                role="button" tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && openModal(svc)}
                style={{ cursor: 'pointer' }}
              >
                <div className="ic" style={{ background: svc.gradient }}>{svc.icon}</div>
                <h3>{svc.title}</h3>
                <ul>
                  {svc.items.slice(0, 4).map((item) => <li key={item}>{item}</li>)}
                </ul>
                <span className="card-click-hint" style={{ color: svc.color }}>
                  View detailed process →
                </span>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="section" style={{ background: 'var(--bg-light)' }}>
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Why Vorldx</span>
            <h2>Why Brands Choose Us</h2>
          </div>
          <div className="cards">
            {WHY.map(({ icon, title, desc }, i) => (
              <motion.article
                key={title}
                className="card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -8 }}
              >
                <div className="ic" style={{ fontSize: '1.4rem', background: 'var(--chip-bg)', color: 'var(--blue)' }}>{icon}</div>
                <h3>{title}</h3>
                <p style={{ color: 'var(--text-soft)', fontSize: '.9rem' }}>{desc}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="cta-strip">
            <h2>Not sure which service you need?</h2>
            <p>Tell us about your goals — we'll recommend the right plan.</p>
            <Link to="/contact" className="btn">Get a Free Consultation</Link>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
