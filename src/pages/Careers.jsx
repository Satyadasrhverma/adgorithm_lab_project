import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useModal } from '../context/ModalContext'
import { JOBS } from '../data/cards'
import SEO from '../components/SEO'

const page = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit:    { opacity: 0, y: -10, transition: { duration: 0.2 } },
}

const PERKS = [
  { icon: '🌍', title: 'Remote First',    desc: 'Work from anywhere in the world — we care about results, not location.' },
  { icon: '📈', title: 'Growth Budget',   desc: '$1,000/year for courses, books and tools to keep you sharp.' },
  { icon: '🤖', title: 'AI Tools Access', desc: 'Full access to the best AI tools on the market, paid for by us.' },
  { icon: '⚡', title: 'Async Culture',   desc: 'No pointless meetings. You own your schedule and your outcomes.' },
]

const DEPT_COLOR = { Content: '#6366f1', Engineering: '#a855f7', Design: '#f59e0b', Growth: '#10b981' }
const DEPT_GRAD  = {
  Content: 'linear-gradient(135deg,#6366f1,#22d3ee)',
  Engineering: 'linear-gradient(135deg,#7c3aed,#a855f7)',
  Design: 'linear-gradient(135deg,#f59e0b,#ef4444)',
  Growth: 'linear-gradient(135deg,#10b981,#22d3ee)',
}

export default function Careers() {
  const { openModal } = useModal()

  const careersJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    hiringOrganization: {
      '@type': 'Organization',
      name: 'Vorldx Adgorithm Lab',
      url: 'https://vorldx.com',
    },
    jobLocation: {
      '@type': 'Place',
      address: { '@type': 'PostalAddress', addressCountry: 'Remote' },
    },
  }

  return (
    <motion.div variants={page} initial="initial" animate="animate" exit="exit">
      <SEO
        title="Careers | Join Vorldx Adgorithm Lab — Remote AI & Creative Jobs"
        description="Join the Vorldx Adgorithm Lab team. Work remotely on AI-powered marketing projects. Explore our open roles in Content, Engineering, Design and Growth."
        path="/careers"
        jsonLd={careersJsonLd}
      />
      <section className="page-head">
        <div className="container">
          <h1>Join Our Team</h1>
          <p>Work with a crew that's passionate about creativity, AI and real impact.</p>
        </div>
      </section>

      {/* Perks — clickable */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">The Perks</span>
            <h2>Why work at Vorldx?</h2>
            <p>Click a perk card to learn more.</p>
          </div>
          <div className="perks">
            {PERKS.map(({ icon, title, desc }, i) => (
              <motion.div
                key={title}
                className="perk clickable-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.09, duration: 0.5 }}
                whileHover={{ y: -8, boxShadow: '0 24px 56px rgba(99,102,241,.15)' }}
                onClick={() => openModal({
                  icon, title, description: desc,
                  color: '#6366f1', gradient: 'linear-gradient(135deg,#6366f1,#22d3ee)',
                })}
                role="button" tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && openModal({ icon, title, description: desc, color: '#6366f1', gradient: 'linear-gradient(135deg,#6366f1,#22d3ee)' })}
                style={{ cursor: 'pointer' }}
              >
                <div className="ic" style={{ fontSize: '1.8rem', width: 'auto', height: 'auto', background: 'none' }}>{icon}</div>
                <h4 style={{ fontWeight: 700, marginBottom: 6 }}>{title}</h4>
                <p>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Roles — clickable */}
      <section className="section" style={{ background: 'var(--bg-light)' }}>
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Open Roles</span>
            <h2>Current Openings</h2>
            <p>Click any role to see the full description and apply.</p>
          </div>
          <div className="jobs">
            {JOBS.map((job, i) => (
              <motion.div
                key={job.id}
                className="job clickable-card"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ x: 6, borderColor: DEPT_COLOR[job.dept] + '88', boxShadow: `0 12px 30px ${DEPT_COLOR[job.dept]}20` }}
                onClick={() => openModal({ ...job, icon: '💼', color: DEPT_COLOR[job.dept], gradient: DEPT_GRAD[job.dept] })}
                role="button" tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && openModal({ ...job, icon: '💼', color: DEPT_COLOR[job.dept], gradient: DEPT_GRAD[job.dept] })}
                style={{ cursor: 'pointer' }}
              >
                <div>
                  <h4>{job.title}</h4>
                  <p>{job.dept} · {job.type}</p>
                </div>
                <span className="btn btn-outline" style={{ borderColor: DEPT_COLOR[job.dept], color: DEPT_COLOR[job.dept], pointerEvents: 'none' }}>
                  View Role
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="cta-strip">
            <h2>Don't see your role?</h2>
            <p>We're always on the lookout for exceptional talent. Send us your story.</p>
            <Link to="/contact" className="btn">Get In Touch</Link>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
