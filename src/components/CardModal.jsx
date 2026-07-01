import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

/* ─── animation variants ─────────────────────────────── */
const fadeOverlay = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.22 } },
  exit:    { opacity: 0, transition: { duration: 0.18 } },
}

const scaleCard = {
  hidden:  { opacity: 0, scale: 0.82, y: -40 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 320, damping: 26, delay: 0.04 } },
  exit:    { opacity: 0, scale: 0.88, y: -24, transition: { duration: 0.16 } },
}

const slidePanel = {
  hidden:  { opacity: 0, scale: 0.94, y: -36 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 270, damping: 26, delay: 0.06 } },
  exit:    { opacity: 0, scale: 0.96, y: -18, transition: { duration: 0.18 } },
}

const staggerItem = (i) => ({
  hidden:  { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { delay: 0.18 + i * 0.08, duration: 0.38, ease: 'easeOut' } },
})

const fadeItem = (i) => ({
  hidden:  { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { delay: 0.16 + i * 0.07, duration: 0.38 } },
})

/* ─── hook ───────────────────────────────────────────── */
function useLockBody(onClose) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])
}

/* ═══════════════════════════════════════════════════════
   HOME PAGE — short preview popup
═══════════════════════════════════════════════════════ */
function ShortModal({ data, onClose }) {
  useLockBody(onClose)
  return (
    <motion.div
      className="modal-overlay"
      variants={fadeOverlay} initial="hidden" animate="visible" exit="exit"
      onClick={onClose}
    >
      <motion.div
        className="short-modal"
        variants={scaleCard}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top accent bar */}
        <div className="short-accent" style={{ background: data.gradient }} />

        <button className="modal-close short-close" onClick={onClose} aria-label="Close">✕</button>

        {/* Header */}
        <div className="short-head">
          <div className="short-icon" style={{ background: data.gradient }}>{data.icon}</div>
          <div>
            {data.tag && <span className="short-tag" style={{ color: data.color, background: data.color + '14', borderColor: data.color + '28' }}>{data.tag}</span>}
            <h3 className="short-title">{data.title}</h3>
            <p className="short-tagline">{data.tagline}</p>
          </div>
        </div>

        {/* Description */}
        <motion.p className="short-desc" variants={fadeItem(0)} initial="hidden" animate="visible">
          {data.description}
        </motion.p>

        {/* Quick chips */}
        <motion.div className="short-chips" variants={fadeItem(1)} initial="hidden" animate="visible">
          {data.items.slice(0, 4).map((it) => (
            <span key={it} className="short-chip" style={{ color: data.color, borderColor: data.color + '30', background: data.color + '0e' }}>{it}</span>
          ))}
        </motion.div>

        {/* Result */}
        {data.result && (
          <motion.div className="short-result" style={{ borderColor: data.color + '40', background: data.color + '10' }} variants={fadeItem(2)} initial="hidden" animate="visible">
            <span style={{ color: data.color }}>✦</span>
            <strong style={{ color: data.color }}>{data.result}</strong>
          </motion.div>
        )}

        {/* CTAs */}
        <motion.div className="short-ctas" variants={fadeItem(3)} initial="hidden" animate="visible">
          <Link
            to="/services"
            className="btn btn-primary"
            style={{ background: data.gradient }}
            onClick={onClose}
          >
            See Full Details
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
          <button className="btn btn-outline" onClick={onClose}>Close</button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════
   SERVICES PAGE — full detailed page with workflow diagram
═══════════════════════════════════════════════════════ */
function FullModal({ data, onClose }) {
  useLockBody(onClose)
  return (
    <motion.div
      className="svc-overlay"
      variants={fadeOverlay} initial="hidden" animate="visible" exit="exit"
      onClick={onClose}
    >
      <motion.div
        className="svc-modal"
        variants={slidePanel}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="svc-close" onClick={onClose} aria-label="Close">✕</button>

        {/* ── LEFT: gradient hero ── */}
        <div className="svc-left" style={{ background: data.gradient }}>
          {data.tag && <span className="svc-tag">{data.tag}</span>}
          <div className="svc-big-icon">{data.icon}</div>
          <h2>{data.title}</h2>
          <p className="svc-tagline">{data.tagline}</p>
          {data.result && (
            <div className="svc-result-badge">
              <span>✦</span>
              <strong>{data.result}</strong>
            </div>
          )}
          {/* Deliverables preview */}
          <div className="svc-left-chips">
            {data.deliverables.map((d) => (
              <span key={d} className="svc-left-chip">{d}</span>
            ))}
          </div>
        </div>

        {/* ── RIGHT: workflow diagram + theory ── */}
        <div className="svc-right" data-lenis-prevent>

          {/* Description */}
          <motion.p className="svc-desc" variants={staggerItem(0)} initial="hidden" animate="visible">
            {data.description}
          </motion.p>

          {/* Workflow diagram */}
          <motion.div variants={staggerItem(1)} initial="hidden" animate="visible">
            <p className="svc-label">How It Works — Step by Step</p>
            <div className="wf-diagram">
              {(data.workflowDetails || data.workflow.map((w) => ({ icon: '→', label: w, desc: '' }))).map((step, i) => (
                <div key={step.label} className="wf-step-card">
                  {/* connector line */}
                  {i < (data.workflowDetails || data.workflow).length - 1 && (
                    <div className="wf-connector" style={{ background: `linear-gradient(to bottom, ${data.color}80, transparent)` }} />
                  )}
                  <div className="wf-step-left">
                    <div className="wf-step-num" style={{ background: data.gradient }}>{i + 1}</div>
                    <div className="wf-step-icon" style={{ color: data.color }}>{step.icon}</div>
                  </div>
                  <div className="wf-step-body">
                    <h4 className="wf-step-title" style={{ color: data.color }}>{step.label}</h4>
                    <p className="wf-step-desc">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* What you get */}
          <motion.div variants={staggerItem(2)} initial="hidden" animate="visible">
            <p className="svc-label">What You Get</p>
            <div className="svc-chips">
              {data.deliverables.map((d) => (
                <span key={d} className="svc-chip" style={{ color: data.color, borderColor: data.color + '30', background: data.color + '10' }}>
                  {d}
                </span>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div className="svc-ctas" variants={staggerItem(3)} initial="hidden" animate="visible">
            <Link
              to="/contact"
              className="btn btn-primary"
              style={{ background: data.gradient }}
              onClick={onClose}
            >
              {data.cta}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <button className="btn btn-outline" onClick={onClose}>Close</button>
          </motion.div>

        </div>
      </motion.div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════
   BLOG / JOB — original small modal (unchanged)
═══════════════════════════════════════════════════════ */
function SmallModal({ data, onClose }) {
  useLockBody(onClose)
  const isJob  = !!data.dept
  const isBlog = !!data.readTime

  const item = (i) => ({
    hidden:  { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.18 + i * 0.07, duration: 0.42, ease: 'easeOut' } },
  })

  return (
    <motion.div
      className="modal-overlay"
      variants={fadeOverlay} initial="hidden" animate="visible" exit="exit"
      onClick={onClose}
    >
      <motion.div
        className="modal-card"
        variants={scaleCard}
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent
      >
        <div className="modal-hero" style={{ background: data.gradient || data.color || 'var(--grad)' }}>
          <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
          {data.tag && <span className="modal-tag">{data.tag}</span>}
          <div className="modal-hero-icon">{data.icon}</div>
          <div className="modal-hero-text">
            <h2>{data.title}</h2>
            {isBlog && <p className="modal-meta">{data.date} · {data.readTime}</p>}
            {isJob  && <p className="modal-meta">{data.dept} · {data.type}</p>}
          </div>
        </div>
        <div className="modal-body">
          <motion.p className="modal-desc" variants={item(0)} initial="hidden" animate="visible">
            {data.description || data.excerpt}
          </motion.p>
          {isJob && (
            <motion.div variants={item(1)} initial="hidden" animate="visible">
              <p className="modal-section-label">Skills needed</p>
              <div className="modal-chips">
                {data.skills.map((s) => <span key={s} className="modal-chip">{s}</span>)}
              </div>
            </motion.div>
          )}
          <motion.div className="modal-cta-row" variants={item(2)} initial="hidden" animate="visible">
            {isBlog && <button className="btn btn-primary" style={{ background: data.gradient || 'var(--grad)' }}>Read Full Article →</button>}
            {isJob  && <Link to="/contact" className="btn btn-primary" onClick={onClose}>Apply Now →</Link>}
            <button className="btn btn-outline" onClick={onClose}>Close</button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════
   ROUTER — pick the right modal based on mode / type
═══════════════════════════════════════════════════════ */
export default function CardModal({ data, onClose }) {
  if (data.workflow && data.mode === 'short') return <ShortModal data={data} onClose={onClose} />
  if (data.workflow)                           return <FullModal  data={data} onClose={onClose} />
  return <SmallModal data={data} onClose={onClose} />
}
