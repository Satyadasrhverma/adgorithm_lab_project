import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import SEO from '../components/SEO'

const page = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit:    { opacity: 0, y: -10, transition: { duration: 0.2 } },
}

const FAQS = [
  { q: 'How long does a project take?', a: 'It depends on scope. A brand identity typically takes 2–3 weeks; content campaigns and automation builds range from 1–4 weeks. We\'ll give you a clear timeline upfront.' },
  { q: 'What does it cost?', a: 'We offer flexible pricing based on your needs. Book a free consultation and we\'ll build a custom proposal that fits your goals and budget.' },
  { q: 'Can you work with an existing brand?', a: 'Absolutely. We work with brands at every stage — whether you\'re starting from scratch or looking to refresh and scale an existing identity.' },
  { q: 'Do you offer ongoing support?', a: 'Yes! Most of our clients stay with us on monthly retainers for content, growth and AI automation. We love long-term partnerships.' },
]

const INFO = [
  { icon: '📧', title: 'Email', value: 'adgorithminfo@gmail.com' },
  { icon: '📍', title: 'Location', value: 'Remote · Worldwide' },
  { icon: '🕒', title: 'Response Time', value: 'Within 24 hours' },
]

export default function Contact() {
  const [searchParams] = useSearchParams()
  const [form, setForm]     = useState({ name: '', email: '', service: '', message: '' })
  const [sent, setSent]     = useState(false)
  const [sending, setSending] = useState(false)
  const [errors, setErrors] = useState({})
  const [openFaq, setOpenFaq] = useState(null)

  useEffect(() => {
    const plan = searchParams.get('plan')
    if (plan) setForm(f => ({ ...f, service: plan }))
  }, [searchParams])

  const validate = () => {
    const e = {}
    if (!form.name.trim())           e.name    = 'Name is required'
    if (!form.email.includes('@'))   e.email   = 'Valid email required'
    if (!form.message.trim())        e.message = 'Message is required'
    return e
  }

  const submit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setSending(true)
    try {
      await fetch('https://formsubmit.co/ajax/adgorithminfo@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `New inquiry from ${form.name} — Vorldx website`,
          name: form.name,
          email: form.email,
          service: form.service,
          message: form.message,
        }),
      })
      setSent(true)
      setForm({ name: '', email: '', service: '', message: '' })
      setErrors({})
    } catch {
      setErrors({ submit: 'Something went wrong sending your message. Please email us directly at adgorithminfo@gmail.com.' })
    } finally {
      setSending(false)
    }
  }

  const contactJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Vorldx Adgorithm Lab',
    description: 'Get in touch with Vorldx Adgorithm Lab. We respond within 24 hours.',
    url: 'https://vorldx.com/contact',
    mainEntity: {
      '@type': 'Organization',
      name: 'Vorldx Adgorithm Lab',
      email: 'adgorithminfo@gmail.com',
    },
  }

  return (
    <motion.div variants={page} initial="initial" animate="animate" exit="exit">
      <SEO
        title="Contact Us | Vorldx Adgorithm Lab — Start Your Project"
        description="Get in touch with Vorldx Adgorithm Lab. Tell us about your project, goals and timeline — we respond within 24 hours."
        path="/contact"
        jsonLd={contactJsonLd}
      />
      <section className="page-head">
        <div className="container">
          <h1>Get In Touch</h1>
          <p>Tell us about your project — we respond within 24 hours.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            {/* Info */}
            <motion.div
              className="contact-info"
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 style={{ marginBottom: 24, fontWeight: 800, fontSize: '1.4rem' }}>Let's build something great together.</h3>
              {INFO.map(({ icon, title, value }) => (
                <div key={title} className="info-row">
                  <div className="ic" style={{ background: 'var(--grad)', color: '#fff', margin: 0, flexShrink: 0 }}>{icon}</div>
                  <div><h4>{title}</h4><p>{value}</p></div>
                </div>
              ))}
              {/* FAQ */}
              <div className="faq" style={{ marginTop: 36 }}>
                <h4 style={{ marginBottom: 14, fontWeight: 700 }}>Frequently Asked</h4>
                {FAQS.map((faq, i) => (
                  <div key={i} className={`faq-item${openFaq === i ? ' open' : ''}`}>
                    <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                      {faq.q} <span className="plus">+</span>
                    </button>
                    <div className="faq-a"><p>{faq.a}</p></div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="form-card">
                {sent && (
                  <div className="form-msg show">
                    ✅ Thank you! We'll be in touch within 24 hours.
                  </div>
                )}
                <form onSubmit={submit} noValidate>
                  <div className="form-row">
                    <div className={`field${errors.name ? ' invalid' : ''}`}>
                      <label>Name *</label>
                      <input
                        type="text" placeholder="Your full name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                      />
                      {errors.name && <p className="err">{errors.name}</p>}
                    </div>
                    <div className={`field${errors.email ? ' invalid' : ''}`}>
                      <label>Email *</label>
                      <input
                        type="email" placeholder="you@company.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                      />
                      {errors.email && <p className="err">{errors.email}</p>}
                    </div>
                  </div>
                  <div className="field">
                    <label>Service / Plan of Interest</label>
                    <select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}>
                      <option value="">Select a service or plan…</option>
                      <optgroup label="Monthly Plans">
                        <option>Starter Plan — ₹15,000/mo</option>
                        <option>Basic Plan — ₹20,000/mo</option>
                        <option>Growth Plan — ₹25,000/mo</option>
                        <option>Pro Plan — ₹30,000/mo</option>
                        <option>Scale Plan — ₹35,000/mo</option>
                      </optgroup>
                      <optgroup label="One-time Services">
                        <option>Content Creation</option>
                        <option>AI Automation</option>
                        <option>Branding</option>
                        <option>Growth Marketing</option>
                        <option>Web & App Design</option>
                        <option>Market Research</option>
                        <option>Custom / Not Sure</option>
                      </optgroup>
                    </select>
                  </div>
                  <div className={`field${errors.message ? ' invalid' : ''}`}>
                    <label>Message *</label>
                    <textarea
                      placeholder="Tell us about your project, goals and timeline…"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                    />
                    {errors.message && <p className="err">{errors.message}</p>}
                  </div>
                  {errors.submit && <p className="err" style={{ marginBottom: 12 }}>{errors.submit}</p>}
                  <motion.button
                    type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}
                    whileHover={{ y: -2, boxShadow: '0 16px 36px rgba(99,102,241,.4)' }}
                    whileTap={{ scale: 0.98 }}
                    disabled={sending}
                  >
                    {sending ? 'Sending…' : 'Send Message →'}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
