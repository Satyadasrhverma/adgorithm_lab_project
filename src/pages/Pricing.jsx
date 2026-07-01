import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

const WHY = {
  Starter:  'Perfect for new brands or small businesses that want to establish a consistent online presence without a big commitment. You get real content, real posting and a team behind you.',
  Basic:    'Ideal for growing brands that need more content volume, stronger online presence and professional website care — all handled without hiring in-house.',
  Growth:   'The sweet spot for brands ready to scale. You get content, your first AI automation and real SEO work — everything needed to start compounding growth.',
  Pro:      'Built for brands that are serious about results. Paid ads, strong SEO, more content and AI workflows — your growth machine, fully running.',
  Scale:    'For brands that want everything — maximum content, full ad management, AI automation and weekly insights. Fastest turnaround, deepest support.',
}

const fadeOverlay = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.22 } },
  exit:    { opacity: 0, transition: { duration: 0.18 } },
}

const scaleUp = {
  hidden:  { opacity: 0, scale: 0.88, y: 32 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 28, delay: 0.04 } },
  exit:    { opacity: 0, scale: 0.92, y: 20, transition: { duration: 0.16 } },
}

function PricingModal({ plan, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <motion.div
      className="modal-overlay"
      variants={fadeOverlay} initial="hidden" animate="visible" exit="exit"
      onClick={onClose}
    >
      <motion.div
        className="plan-modal"
        variants={scaleUp}
        onClick={e => e.stopPropagation()}
        data-lenis-prevent
      >
        {/* Header */}
        <div className="plan-modal-header" style={{ background: plan.gradient }}>
          <button className="modal-close plan-modal-close" onClick={onClose} aria-label="Close">✕</button>
          <div className="plan-modal-icon">{plan.icon}</div>
          <div className="plan-modal-title-group">
            <h2 className="plan-modal-name">{plan.name} Plan</h2>
            <div className="plan-modal-price">
              <span>₹</span>{plan.price}<span style={{ fontSize: '1rem', fontWeight: 500, opacity: .8 }}>/mo</span>
            </div>
            <span className="plan-modal-turnaround">⚡ {plan.turnaround} turnaround</span>
          </div>
        </div>

        {/* Body */}
        <div className="plan-modal-body">
          {/* Why this plan */}
          <div className="plan-modal-why" style={{ borderColor: plan.color + '30', background: plan.color + '0d' }}>
            <span style={{ color: plan.color, fontWeight: 700, fontSize: '.8rem', textTransform: 'uppercase', letterSpacing: '.06em' }}>
              ✦ Why {plan.name}?
            </span>
            <p style={{ margin: '6px 0 0', color: 'var(--text-soft)', fontSize: '.9rem', lineHeight: 1.65 }}>
              {WHY[plan.name]}
            </p>
          </div>

          {/* Categories */}
          <div className="plan-modal-cats">
            {plan.categories.map(cat => (
              <div key={cat.label} className="plan-modal-cat">
                <div className="plan-modal-cat-head">
                  <span className="plan-modal-cat-icon" style={cat.included ? { color: plan.color, background: plan.color + '1a' } : {}}>
                    {cat.icon}
                  </span>
                  <span style={{ fontWeight: 800, fontSize: '.82rem', textTransform: 'uppercase', letterSpacing: '.06em', color: cat.included ? plan.color : 'var(--text-soft)' }}>
                    {cat.label}
                  </span>
                  {!cat.included && (
                    <span style={{ marginLeft: 'auto', fontSize: '.72rem', color: 'var(--text-soft)', fontStyle: 'italic' }}>Not included</span>
                  )}
                </div>
                {cat.included && cat.items && (
                  <ul className="plan-modal-cat-list">
                    {cat.items.map(item => (
                      <li key={item}>
                        <span style={{ color: plan.color, fontWeight: 700 }}>✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                {!cat.included && (
                  <p className="plan-modal-cat-na">Upgrade to Growth plan or above to unlock this.</p>
                )}
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="plan-modal-ctas">
            <Link
              to={`/contact?plan=${encodeURIComponent(plan.name + ' Plan — ₹' + plan.price + '/mo')}`}
              className="btn btn-primary"
              style={{ background: plan.gradient, borderColor: 'transparent' }}
              onClick={onClose}
            >
              Get Started with {plan.name} →
            </Link>
            <button className="btn btn-outline" onClick={onClose}>← Go Back</button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

const page = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit:    { opacity: 0, y: -10, transition: { duration: 0.2 } },
}

const PLANS = [
  {
    name: 'Starter',
    price: '15,000',
    color: '#6366f1',
    gradient: 'linear-gradient(135deg,#6366f1,#818cf8)',
    popular: false,
    icon: '🚀',
    turnaround: '72h',
    categories: [
      {
        label: 'Website',
        icon: '💻',
        items: ['Monthly health check', 'Minor bug fixes', 'Speed audit (quarterly)'],
        included: true,
      },
      {
        label: 'Content',
        icon: '🎬',
        items: ['10 Social Media Posts', '2 Reels / Shorts', 'Captions + Hashtags', 'Content Calendar'],
        included: true,
      },
      {
        label: 'AI Automation',
        icon: '🤖',
        items: null,
        included: false,
      },
      {
        label: 'Marketing',
        icon: '📈',
        items: ['Organic posting + scheduling', 'Basic hashtag strategy'],
        included: true,
      },
      {
        label: 'Analytics',
        icon: '📊',
        items: ['Monthly performance report'],
        included: true,
      },
    ],
  },
  {
    name: 'Basic',
    price: '20,000',
    color: '#06b6d4',
    gradient: 'linear-gradient(135deg,#0891b2,#06b6d4)',
    popular: false,
    icon: '📱',
    turnaround: '72h',
    categories: [
      {
        label: 'Website',
        icon: '💻',
        items: ['Monthly health check', 'Bug fixes + minor updates', 'Speed audit (monthly)', 'Uptime monitoring'],
        included: true,
      },
      {
        label: 'Content',
        icon: '🎬',
        items: ['15 Social Media Posts', '3 Reels / Shorts', 'Captions + Hashtags', 'Content Calendar'],
        included: true,
      },
      {
        label: 'AI Automation',
        icon: '🤖',
        items: null,
        included: false,
      },
      {
        label: 'Marketing',
        icon: '📈',
        items: ['Organic posting + scheduling', 'Hashtag + keyword strategy', 'Competitor tracking'],
        included: true,
      },
      {
        label: 'Analytics',
        icon: '📊',
        items: ['Monthly report + insights', 'Social media metrics'],
        included: true,
      },
    ],
  },
  {
    name: 'Growth',
    price: '25,000',
    color: '#a855f7',
    gradient: 'linear-gradient(135deg,#7c3aed,#a855f7)',
    popular: true,
    icon: '⚡',
    turnaround: '48h',
    categories: [
      {
        label: 'Website',
        icon: '💻',
        items: ['Full maintenance + monitoring', '1 new page/section per month', 'SEO on-page fixes', 'Speed optimisation'],
        included: true,
      },
      {
        label: 'Content',
        icon: '🎬',
        items: ['20 Social Media Posts', '5 Reels / Shorts', '1 Blog Post/mo', 'Captions + Hashtags', 'Content Calendar'],
        included: true,
      },
      {
        label: 'AI Automation',
        icon: '🤖',
        items: ['1 workflow automation', 'Basic lead capture bot'],
        included: true,
      },
      {
        label: 'Marketing',
        icon: '📈',
        items: ['Organic social growth', 'Basic SEO strategy', 'Email list setup'],
        included: true,
      },
      {
        label: 'Analytics',
        icon: '📊',
        items: ['Bi-weekly performance report', 'GA4 + Search Console setup', 'Growth insights'],
        included: true,
      },
    ],
  },
  {
    name: 'Pro',
    price: '30,000',
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg,#d97706,#f59e0b)',
    popular: false,
    icon: '📊',
    turnaround: '48h',
    categories: [
      {
        label: 'Website',
        icon: '💻',
        items: ['Full maintenance + monitoring', '2 new pages/month', 'Technical SEO', 'Speed + CRO optimisation', 'Security scanning'],
        included: true,
      },
      {
        label: 'Content',
        icon: '🎬',
        items: ['25 Social Media Posts', '7 Reels / Shorts', '2 Blog Posts/mo', 'Ad Creatives (5/mo)', 'Content Calendar'],
        included: true,
      },
      {
        label: 'AI Automation',
        icon: '🤖',
        items: ['2 workflow automations', 'Lead qualification bot', 'Auto-reporting setup'],
        included: true,
      },
      {
        label: 'Marketing',
        icon: '📈',
        items: ['SEO (on + off-page)', 'Meta Ads management (₹20k budget)', 'Email campaigns (2/mo)', 'Social media growth'],
        included: true,
      },
      {
        label: 'Analytics',
        icon: '📊',
        items: ['Bi-weekly detailed report', 'Ad performance analytics', 'SEO ranking report', 'Custom KPI dashboard'],
        included: true,
      },
    ],
  },
  {
    name: 'Scale',
    price: '35,000',
    color: '#10b981',
    gradient: 'linear-gradient(135deg,#059669,#10b981)',
    popular: false,
    icon: '🌟',
    turnaround: '24h',
    categories: [
      {
        label: 'Website',
        icon: '💻',
        items: ['Full maintenance + monitoring', '3+ pages/month', 'Advanced SEO + CRO', 'Performance + security', 'A/B testing'],
        included: true,
      },
      {
        label: 'Content',
        icon: '🎬',
        items: ['30 Social Media Posts', '10 Reels / Shorts', '3 Blog Posts/mo', 'Ad Creatives (10/mo)', 'Email newsletter/mo'],
        included: true,
      },
      {
        label: 'AI Automation',
        icon: '🤖',
        items: ['3 workflow automations', 'AI chatbot (WhatsApp/Web)', 'AI content pipeline', 'CRM integration'],
        included: true,
      },
      {
        label: 'Marketing',
        icon: '📈',
        items: ['Full SEO strategy', 'Meta + Google Ads (₹40k budget)', 'Email automation sequences', 'Monthly strategy session'],
        included: true,
      },
      {
        label: 'Analytics',
        icon: '📊',
        items: ['Weekly report + insights', 'Live analytics dashboard', 'Conversion tracking', 'ROI + ROAS reporting'],
        included: true,
      },
    ],
  },
]

const FAQS = [
  { q: 'Kya plans customize ho sakte hain?', a: 'Haan — agar koi plan perfectly fit nahi karta to hum custom proposal banate hain. Contact karo aur batao kya chahiye.' },
  { q: 'Ad spend plan price mein included hai?', a: 'Nahi. Ad spend (Google/Meta budget) alag hota hai — plan mein sirf management fee included hai.' },
  { q: 'Minimum contract kitna hai?', a: '3 months. Uske baad month-to-month continue kar sakte ho ya upgrade kar sakte ho.' },
  { q: 'Kya ek se zyada services ek saath le sakte hain?', a: 'Bilkul. Scale plan mein sab kuch included hai. Ya alag add-ons bhi available hain.' },
]

export default function Pricing() {
  const [activePlan, setActivePlan] = useState(null)

  const pricingJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'PriceSpecification',
    name: 'Vorldx Adgorithm Lab Pricing',
    description: 'Monthly retainer pricing plans for AI-powered content creation and marketing.',
    url: 'https://vorldx.com/pricing',
  }

  return (
    <motion.div variants={page} initial="initial" animate="animate" exit="exit">
      <SEO
        title="Pricing | Monthly Plans Starting ₹15,000 | Vorldx Adgorithm Lab"
        description="Choose from 5 monthly marketing plans — Starter at ₹15,000 to Scale at ₹35,000. Website, content creation, AI automation, marketing and analytics."
        path="/pricing"
        jsonLd={pricingJsonLd}
      />

      {/* Hero */}
      <section className="page-head">
        <div className="container">
          <h1>Simple, Transparent Pricing</h1>
          <p>No hidden fees. Pick a plan, start growing. Cancel anytime after 3 months.</p>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {activePlan && <PricingModal plan={activePlan} onClose={() => setActivePlan(null)} />}
      </AnimatePresence>

      {/* Plans */}
      <section className="section">
        <div className="container">
          <div className="pricing-grid">
            {PLANS.map((plan, i) => (
              <motion.div
                key={plan.name}
                className={`pricing-card clickable-card${plan.popular ? ' pricing-popular' : ''}`}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                style={{ '--pc': plan.color, cursor: 'pointer' }}
                onClick={() => setActivePlan(plan)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && setActivePlan(plan)}
              >
                {plan.popular && (
                  <div className="pricing-badge" style={{ background: plan.gradient }}>
                    ⚡ Most Popular
                  </div>
                )}

                {/* Top */}
                <div className="pricing-top">
                  <div className="pricing-icon" style={{ background: plan.gradient }}>{plan.icon}</div>
                  <h3 className="pricing-name">{plan.name}</h3>
                  <div className="pricing-price">
                    <span className="pricing-currency">₹</span>
                    <span className="pricing-amount">{plan.price}</span>
                    <span className="pricing-period">/mo</span>
                  </div>
                  <span className="pricing-turnaround" style={{ color: plan.color }}>
                    ⚡ {plan.turnaround} turnaround
                  </span>
                </div>

                {/* Categories */}
                <ul className="pricing-features">
                  {plan.categories.map(cat => (
                    <li key={cat.label} className="pricing-cat-group">
                      <span className="pricing-cat-divider" style={{ color: cat.included ? plan.color : 'var(--text-soft)', borderColor: cat.included ? plan.color + '30' : 'var(--border)' }}>
                        <span className="pricing-cat-div-icon">{cat.icon}</span>
                        {cat.label}
                      </span>
                      {cat.included && cat.items ? (
                        cat.items.map(item => (
                          <div key={item} className="pricing-feat pricing-feat--yes">
                            <span className="pricing-check" style={{ color: plan.color }}>✓</span>
                            {item}
                          </div>
                        ))
                      ) : (
                        <div className="pricing-feat pricing-feat--no">
                          <span className="pricing-check">—</span>
                          Not included
                        </div>
                      )}
                    </li>
                  ))}
                </ul>

                <Link
                  to={`/contact?plan=${encodeURIComponent(plan.name + ' Plan — ₹' + plan.price + '/mo')}`}
                  className={`btn pricing-cta${plan.popular ? ' btn-primary' : ' btn-outline'}`}
                  style={plan.popular ? {} : { borderColor: plan.color, color: plan.color }}
                  onClick={e => e.stopPropagation()}
                >
                  Get Started →
                </Link>
              </motion.div>
            ))}
          </div>

          <p style={{ textAlign: 'center', marginTop: 36, color: 'var(--text-soft)', fontSize: '.9rem' }}>
            Need something custom?{' '}
            <Link to="/contact" style={{ color: 'var(--blue)', fontWeight: 600 }}>
              Let's talk →
            </Link>
          </p>
        </div>
      </section>

      {/* Always included */}
      <section className="section" style={{ background: 'var(--bg-light)' }}>
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Every Plan Includes</span>
            <h2>Always included, <span className="gradient-text">zero exceptions</span></h2>
          </div>
          <div className="pricing-always">
            {[
              { icon: '🤖', title: 'AI-Enhanced Content', desc: 'Every piece of content is amplified with AI for better reach and engagement.' },
              { icon: '🎯', title: 'Dedicated Point of Contact', desc: 'One person who knows your brand — no switching between random team members.' },
              { icon: '📋', title: 'Content Calendar', desc: 'Full monthly plan shared 7 days in advance so you always know what\'s coming.' },
              { icon: '🔄', title: '2 Revision Rounds', desc: 'Not happy with something? We revise until it\'s right — always 2 rounds included.' },
              { icon: '📊', title: 'Performance Reports', desc: 'Real numbers, honest insights. No vanity metrics, only what actually matters.' },
              { icon: '🔒', title: 'Brand Safety', desc: 'NDA on request. Your ideas, strategies and brand data stay completely private.' },
            ].map(({ icon, title, desc }, i) => (
              <motion.div
                key={title}
                className="pricing-always-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.07, duration: 0.45 }}
              >
                <span className="pricing-always-icon">{icon}</span>
                <h4>{title}</h4>
                <p>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container" style={{ maxWidth: 720 }}>
          <div className="section-head">
            <span className="eyebrow">Common Questions</span>
            <h2>Before you decide</h2>
          </div>
          <div className="faq">
            {FAQS.map((faq, i) => (
              <PricingFaq key={i} faq={faq} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="cta-strip">
            <h2>Not sure which plan is right?</h2>
            <p>Book a free 20-minute call — we'll recommend the exact plan for your goals.</p>
            <Link to="/contact" className="btn btn-primary">Book Free Consultation →</Link>
          </div>
        </div>
      </section>
    </motion.div>
  )
}

function PricingFaq({ faq }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className={`faq-item${isOpen ? ' open' : ''}`}>
      <button className="faq-q" onClick={() => setIsOpen(o => !o)}>
        {faq.q} <span className="plus">{isOpen ? '−' : '+'}</span>
      </button>
      <div className="faq-a"><p>{faq.a}</p></div>
    </div>
  )
}
