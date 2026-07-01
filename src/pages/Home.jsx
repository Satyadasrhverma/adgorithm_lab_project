import React, { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useModal } from '../context/ModalContext'
import { SERVICES_LIST } from '../data/cards'
import StatCounter from '../components/StatCounter'
import HeroAnimation from '../components/HeroAnimation'
import VantaBg from '../components/VantaBg'
import { useTilt } from '../hooks/useTilt'
import SEO, { ORG_SCHEMA, WEBSITE_SCHEMA } from '../components/SEO'

const page = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.4 } },
  exit:    { opacity: 0, transition: { duration: 0.2 } },
}

const stagger = {
  animate: { transition: { staggerChildren: 0.09 } },
}

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.8, 0.3, 1] } },
}

const STATS = [
  { count: '100+', label: 'Projects Delivered' },
  { count: '50+',  label: 'Brands Served' },
  { count: '10M+', label: 'Audience Reached' },
  { count: '95%',  label: 'Client Retention' },
]

const PROCESS = [
  {
    n: '01', title: 'Discovery', color: '#6366f1', icon: '🔍',
    desc: 'Understand your brand, goals and audience deeply.',
    why: 'Without deep discovery, campaigns miss the mark. We study your brand DNA, audience psychology and competitive landscape so every move is intentional.',
    how: 'Brand audit → Audience persona mapping → Competitor gap analysis → Goal alignment session',
  },
  {
    n: '02', title: 'Strategy', color: '#06b6d4', icon: '🗺️',
    desc: 'Research competitors and plan a clear roadmap.',
    why: 'Strategy is the difference between random content and a content machine. We build data-backed plans that tie every action to measurable growth.',
    how: 'Market research → Content calendar → Channel selection → KPI framework',
  },
  {
    n: '03', title: 'Creation', color: '#a855f7', icon: '✏️',
    desc: 'Design, write and produce high-quality content.',
    why: 'Great content is the engine of every campaign. Our creative team blends design, copy and video to build assets that stop the scroll and drive action.',
    how: 'Script & brief → Design & production → Review cycles → Asset delivery',
  },
  {
    n: '04', title: 'AI Enhancement', color: '#3b82f6', icon: '🤖',
    desc: 'Automate workflows and amplify output with AI.',
    why: 'AI lets us do in hours what used to take weeks — personalisation at scale, auto-optimised copy, and workflow automation that frees your team.',
    how: 'Tool audit → Prompt engineering → Workflow automation → AI-assisted A/B testing',
  },
  {
    n: '05', title: 'Distribution', color: '#f59e0b', icon: '🚀',
    desc: 'Launch strategically across all relevant channels.',
    why: 'The best content goes unseen without smart distribution. We pick the right channels, right times and right formats to maximise reach and relevance.',
    how: 'Channel mapping → Scheduling → Paid amplification → Cross-platform repurposing',
  },
  {
    n: '06', title: 'Analytics', color: '#10b981', icon: '📊',
    desc: 'Track results, iterate fast and continuously grow.',
    why: 'Growth is a loop, not a launch. We track every metric that matters, find what\'s working, cut what\'s not and compound gains month over month.',
    how: 'Dashboard setup → Weekly reporting → Insight extraction → Strategy iteration',
  },
]

const BRANDS = ['Google', 'Microsoft', 'Airbnb', 'HubSpot', 'Slack', 'Notion', 'Figma', 'Stripe']

function TiltBentoCard({ svc, i, openModal }) {
  const { ref, onMouseMove, onMouseLeave } = useTilt(10)
  return (
    <motion.article
      ref={ref}
      key={svc.id}
      className="bento-card clickable-card"
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ delay: i * 0.09, duration: 0.55, ease: [0.2, 0.8, 0.3, 1] }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={() => openModal({ ...svc, mode: 'short' })}
      role="button" tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && openModal(svc)}
      style={{
        background: `linear-gradient(140deg, ${svc.color}0d 0%, var(--surface) 55%)`,
        borderColor: svc.color + '25',
        willChange: 'transform',
      }}
    >
      <div className="bc-glow" style={{ background: `radial-gradient(circle,${svc.color}22,transparent 70%)` }} />
      {i === 0 ? (
        <div className="bc-header">
          <div className="ic ic-grad" style={{ background: svc.gradient }}>{svc.icon}</div>
          <span className="bc-tag" style={{ color: svc.color, background: svc.color + '18', borderColor: svc.color + '30' }}>
            {svc.tag}
          </span>
        </div>
      ) : (
        <div className="ic ic-grad" style={{ background: svc.gradient, marginBottom: 16 }}>{svc.icon}</div>
      )}
      <h3>{svc.title}</h3>
      <p className="bc-desc">{svc.items.slice(0, 3).join(' · ')}</p>
      <span className="card-click-hint" style={{ color: svc.color }}>
        Click to explore →
      </span>
    </motion.article>
  )
}

const HERO_WORDS = ['Where', 'Creativity', 'Meets']

export default function Home() {
  const { openModal } = useModal()
  const [activeStep, setActiveStep] = useState(null)
  const { scrollY } = useScroll()
  const heroY    = useTransform(scrollY, [0, 400], [0, -60])
  const heroArtY = useTransform(scrollY, [0, 400], [0, 35])

  /* Horizontal scroll section */
  const hScrollRef = useRef(null)
  const { scrollYProgress: hProgress } = useScroll({ target: hScrollRef, offset: ['start start', 'end end'] })
  const hX = useTransform(hProgress, [0, 1], ['0px', `${-(SERVICES_LIST.length - 1.8) * 364}px`])

  const homeJsonLd = [
    ORG_SCHEMA,
    WEBSITE_SCHEMA,
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'Vorldx Adgorithm Lab',
      description: 'AI-powered content creation, automation and performance marketing agency.',
      url: 'https://vorldx.com',
      priceRange: '$$',
      areaServed: 'Worldwide',
    },
  ]

  return (
    <motion.div variants={page} initial="initial" animate="animate" exit="exit">
      <SEO
        title="Vorldx Adgorithm Lab — Where Creativity Meets Intelligence"
        description="Vorldx Adgorithm Lab is a next-gen AI marketing agency. We blend creativity, technology and AI to build content, automate processes and grow brands in the digital world."
        path="/"
        jsonLd={homeJsonLd}
      />

      {/* ── HERO ── */}
      <header className="hero">
        <div className="hero-bg">
          <div className="hero-mesh-1" />
          <div className="hero-mesh-2" />
          <div className="hero-grid-overlay" />
        </div>
        <div className="container">
          <div className="hero-grid">

            <motion.div className="hero-content" variants={stagger} initial="initial" animate="animate" style={{ y: heroY }}>
              <h1 className="hero-split-h1">
                {HERO_WORDS.map((word, i) => (
                  <motion.span
                    key={word}
                    className="hero-word"
                    initial={{ opacity: 0, y: 48, rotateX: -40 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 0.65, delay: i * 0.13, ease: [0.2, 0.8, 0.3, 1] }}
                  >
                    {word}
                  </motion.span>
                ))}
                <br />
                <motion.span
                  className="hero-word gradient-text"
                  initial={{ opacity: 0, y: 48, rotateX: -40 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 0.65, delay: HERO_WORDS.length * 0.13, ease: [0.2, 0.8, 0.3, 1] }}
                >
                  Intelligence
                </motion.span>
              </h1>
              <motion.p className="lead" variants={fadeUp}>
                We blend creativity, technology and AI to build content, automate processes and grow brands in the digital world.
              </motion.p>
              <motion.div className="hero-actions" variants={fadeUp}>
                <Link to="/contact" className="btn btn-primary magnetic">
                  Start Your Project
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link to="/services" className="btn btn-ghost magnetic">View Our Work</Link>
              </motion.div>
              <motion.div className="hero-proof" variants={fadeUp}>
                <div className="proof-avatars">
                  {['#6366f1,#22d3ee', '#a855f7,#f43f5e', '#f59e0b,#f97316', '#10b981,#22d3ee'].map((g, i) => (
                    <div key={i} className="pavatar" style={{ background: `linear-gradient(135deg,${g})` }} />
                  ))}
                </div>
                <p><strong>50+ brands</strong> trust our creative intelligence</p>
              </motion.div>
            </motion.div>

            <motion.div
              className="hero-art"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: [0.2, 0.8, 0.3, 1], delay: 0.28 }}
              style={{ y: heroArtY }}
            >
              <div className="hero-3d-wrap">
                <HeroAnimation style={{ width: '100%', height: '100%' }} />
                {/* Float cards stay as overlays */}
                {[
                  { cls: 'fc1', icon: '📈', val: '+240%', label: 'Avg. Growth' },
                  { cls: 'fc2', icon: '⚡',  val: '48h',   label: 'Turnaround' },
                  { cls: 'fc3', icon: '🎯',  val: '95%',   label: 'Retention' },
                ].map(({ cls, icon, val, label }) => (
                  <div key={cls} className={`float-card ${cls}`}>
                    <div className="fc-icon">{icon}</div>
                    <div className="fc-body"><strong>{val}</strong><span>{label}</span></div>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>

          {/* Marquee */}
          <motion.div
            className="trusted"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.5 }}
          >
            <p className="trusted-label">TRUSTED BY FORWARD-THINKING BRANDS</p>
            <div className="marquee">
              <div className="marquee-track">
                {[...BRANDS, ...BRANDS].map((b, i) => <span key={i}>{b}</span>)}
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* ── BENTO — WHAT WE DO ── */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">What We Do</span>
            <h2>End-to-end solutions to <span className="gradient-text">elevate your brand</span></h2>
            <p>Click any card to see our full process — everything you need under one roof.</p>
          </div>

          <div className="bento">
            {SERVICES_LIST.map((svc, i) => (
              <TiltBentoCard key={svc.id} svc={svc} i={i} openModal={openModal} />
            ))}
          </div>
        </div>
      </section>

      {/* ── HORIZONTAL SCROLL — Services Showcase ── */}
      <section ref={hScrollRef} className="h-scroll-wrap">
        <div className="h-scroll-sticky">
          <div className="h-scroll-head">
            <span className="eyebrow">Deep Dive</span>
            <h2>Services that <span className="gradient-text">drive growth</span></h2>
          </div>
          <div className="h-scroll-viewport">
            <motion.div className="h-scroll-track" style={{ x: hX }}>
              {SERVICES_LIST.map((svc, i) => (
                <motion.div
                  key={svc.id}
                  className="h-card grad-border"
                  style={{ '--nc': svc.color }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: i * 0.07, duration: 0.5 }}
                  onClick={() => openModal({ ...svc, mode: 'short' })}
                >
                  <div className="h-card-num" style={{ color: svc.color }}>{svc.n || `0${i+1}`}</div>
                  <div className="h-card-icon" style={{ background: svc.gradient }}>{svc.icon}</div>
                  <h3 className="h-card-title">{svc.title}</h3>
                  <p className="h-card-desc">{svc.tagline || svc.items[0]}</p>
                  <div className="h-card-chips">
                    {svc.deliverables?.slice(0,3).map(d => (
                      <span key={d} className="h-chip" style={{ color: svc.color, borderColor: svc.color + '30', background: svc.color + '10' }}>{d}</span>
                    ))}
                  </div>
                  <span className="h-card-cta" style={{ color: svc.color }}>Explore →</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
          <div className="h-scroll-progress-wrap">
            <motion.div className="h-scroll-progress-bar" style={{ scaleX: hProgress }} />
          </div>
        </div>
      </section>

      {/* ── STATS ── animated counters + 30s rewrite */}
      <section className="stats-section">
        <div className="container">
          <motion.div
            className="stats-band"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            {STATS.map(({ count, label }, i) => (
              <>
                <StatCounter key={label} count={count} label={label} />
                {i < STATS.length - 1 && <div key={`div-${i}`} className="stat-div" />}
              </>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Our Process</span>
            <h2>How We Work</h2>
          </div>

          {/* Horizontal flow bar */}
          <div className="process-flow">
            {/* Single continuous neon rail + comet */}
            <div className="pflow-rail"><span className="pflow-comet" /></div>

            {PROCESS.map(({ n, title, color, icon }, i) => (
              <motion.div
                key={n}
                className={`pflow-node${activeStep === i ? ' pflow-node--active' : ''}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: i * 0.07, duration: 0.45 }}
                onClick={() => setActiveStep(activeStep === i ? null : i)}
                style={{ cursor: 'pointer' }}
              >
                <div className="pflow-ring-wrap" style={{ '--nc': color }}>
                  <div className="pflow-icon-wrap" style={{ background: color + '18' }}>
                    {icon}
                  </div>
                </div>
                <span
                  className="pflow-tab"
                  style={{ color, borderColor: color + '44', background: color + '12' }}
                >
                  {title}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Step detail popup */}
          <AnimatePresence>
            {activeStep !== null && (() => {
              const s = PROCESS[activeStep]
              return (
                <motion.div
                  key={activeStep}
                  className="pflow-detail"
                  style={{ borderColor: s.color + '44', background: s.color + '0c' }}
                  initial={{ opacity: 0, y: -12, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -8, height: 0 }}
                  transition={{ duration: 0.3, ease: [0.2, 0.8, 0.3, 1] }}
                >
                  <div className="pflow-detail-inner">
                    <div className="pflow-detail-icon" style={{ background: s.color + '22', color: s.color }}>
                      {s.icon}
                    </div>
                    <div>
                      <h4 style={{ color: s.color }}>{s.n} — {s.title}</h4>
                      <div className="pflow-detail-row">
                        <div>
                          <span className="pflow-detail-label">WHY</span>
                          <p>{s.why}</p>
                        </div>
                        <div>
                          <span className="pflow-detail-label">HOW</span>
                          <p className="pflow-detail-how">{s.how}</p>
                        </div>
                      </div>
                    </div>
                    <button
                      className="pflow-detail-close"
                      onClick={() => setActiveStep(null)}
                      aria-label="Close"
                    >✕</button>
                  </div>
                </motion.div>
              )
            })()}
          </AnimatePresence>

          {/* Detail cards grid */}
          <div className="process-grid">
            {PROCESS.map(({ n, title, desc, color }, i) => (
              <motion.div
                key={n}
                className="pstep"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                whileHover={{
                  y: -7,
                  boxShadow: `0 28px 64px ${color}28`,
                  borderColor: color + '55',
                }}
                style={{
                  background: `linear-gradient(145deg, ${color}13 0%, var(--surface) 62%)`,
                  borderColor: color + '28',
                }}
              >
                <div
                  className="ps-num"
                  style={{
                    background: `linear-gradient(135deg, ${color}cc, ${color}55)`,
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {n}
                </div>
                <h4>{title}</h4>
                <p>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <VantaBg className="section" style={{ paddingTop: 0 }} color={0x6366f1} bgColor={0x04061a}>
        <div className="container">
          <motion.div
            className="cta-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7 }}
            style={{ background: 'transparent', border: 'none', boxShadow: 'none' }}
          >
            <div className="cta-glow cta-glow-1" />
            <div className="cta-glow cta-glow-2" />
            <div className="cta-content">
              <span className="eyebrow" style={{ color: '#a5b4fc' }}>Ready to Grow?</span>
              <h2>Let's build something <span className="gradient-text">amazing</span> together</h2>
              <p>Creativity meets AI. Your brand gets real results.</p>
              <div className="cta-actions">
                <Link to="/contact" className="btn btn-white magnetic">
                  Start Your Project
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link to="/services" className="btn btn-outline-light magnetic">See Our Services</Link>
              </div>
            </div>
          </motion.div>
        </div>
      </VantaBg>

    </motion.div>
  )
}
