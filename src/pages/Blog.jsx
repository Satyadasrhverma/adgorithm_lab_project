import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SEO from '../components/SEO'

const page = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit:    { opacity: 0, y: -10, transition: { duration: 0.2 } },
}

const CATS = [
  { key: 'all',      label: 'All',             tags: ['marketing', 'ai'] },
  { key: 'ai',       label: 'AI & Automation', tags: ['ai', 'machinelearning'] },
  { key: 'content',  label: 'Content',         tags: ['contentmarketing', 'writing'] },
  { key: 'branding', label: 'Branding',        tags: ['branding', 'design'] },
  { key: 'growth',   label: 'Growth',          tags: ['seo', 'growthhacking'] },
]

/* Niche keywords — more hits = higher match score */
const NICHE = [
  'ai', 'marketing', 'content', 'brand', 'growth', 'seo',
  'automation', 'digital', 'creative', 'social', 'strategy',
  'analytics', 'startup', 'campaign', 'engagement', 'roi',
]

const GRAD = [
  'linear-gradient(135deg,#6366f1,#22d3ee)',
  'linear-gradient(135deg,#f59e0b,#ef4444)',
  'linear-gradient(135deg,#10b981,#22d3ee)',
  'linear-gradient(135deg,#a855f7,#6366f1)',
  'linear-gradient(135deg,#7c3aed,#a855f7)',
  'linear-gradient(135deg,#0f766e,#10b981)',
]

function matchScore(article) {
  const text = [
    ...(article.tag_list || []),
    article.title || '',
    article.description || '',
  ].join(' ').toLowerCase()
  const hits = NICHE.filter(k => text.includes(k)).length
  return Math.min(83 + hits, 99)
}

function fmtDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  })
}

export default function Blog() {
  const [cat, setCat]         = useState('all')
  const [posts, setPosts]     = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    const { tags } = CATS.find(c => c.key === cat)
    setLoading(true)
    setError(null)
    setPosts([])

    Promise.all(
      tags.map(tag =>
        fetch(`https://dev.to/api/articles?tag=${tag}&per_page=8&top=1`)
          .then(r => r.ok ? r.json() : [])
          .catch(() => [])
      )
    ).then(results => {
      const seen = new Set()
      const unique = results
        .flat()
        .filter(a => {
          if (!a.title || !a.url || seen.has(a.id)) return false
          seen.add(a.id)
          return true
        })
      /* Sort highest match first */
      unique.sort((a, b) => matchScore(b) - matchScore(a))
      setPosts(unique.slice(0, 9))
      setLoading(false)
    }).catch(() => {
      setError('Could not fetch articles. Check your connection and try again.')
      setLoading(false)
    })
  }, [cat])

  const featured = posts[0]
  const rest     = posts.slice(1)

  return (
    <motion.div variants={page} initial="initial" animate="animate" exit="exit">
      <SEO
        title="Blog | AI, Marketing & Brand Growth Insights | Vorldx"
        description="Insights on AI, creativity, brand building and growth marketing from the Vorldx Adgorithm Lab team. Stay ahead of the digital curve."
        path="/blog"
      />
      <section className="page-head">
        <div className="container">
          <h1>The Blog</h1>
          <p>Insights on AI, creativity, brand building and growth marketing.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">

          {/* ── Category filters ── */}
          <div className="cats">
            {CATS.map(({ key, label }) => (
              <button
                key={key}
                className={cat === key ? 'active' : ''}
                onClick={() => setCat(key)}
              >
                {label}
              </button>
            ))}
          </div>

          {/* ── Loading ── */}
          {loading && (
            <div className="blog-loading">
              <div className="blog-spinner" />
              <p>Fetching latest articles…</p>
            </div>
          )}

          {/* ── Error ── */}
          {!loading && error && (
            <div className="blog-error">
              <p>⚠️ {error}</p>
              <button
                className="btn btn-ghost"
                style={{ marginTop: 14 }}
                onClick={() => setCat(c => c)}
              >
                Retry
              </button>
            </div>
          )}

          {/* ── No results ── */}
          {!loading && !error && posts.length === 0 && (
            <p style={{ textAlign: 'center', color: 'var(--text-soft)', padding: '80px 0' }}>
              No articles found for this category.
            </p>
          )}

          {/* ── Content ── */}
          {!loading && !error && featured && (
            <>
              {/* Featured card — full article link */}
              <motion.a
                href={featured.url}
                target="_blank"
                rel="noopener noreferrer"
                className="featured"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.01, boxShadow: '0 24px 60px rgba(99,102,241,.18)' }}
                style={{ textDecoration: 'none', color: 'inherit', display: 'grid' }}
              >
                <div className="img" style={{ position: 'relative', overflow: 'hidden', background: GRAD[0] }}>
                  <img
                    src={featured.cover_image || `https://picsum.photos/seed/${featured.id}/800/500`}
                    alt={featured.title}
                    fetchpriority="high"
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={e => { e.target.src = `https://picsum.photos/seed/${featured.id + 1}/800/500` }}
                  />
                  <span className="tag">Featured</span>
                </div>
                <div className="txt">
                  <p className="meta">
                    {fmtDate(featured.published_at)} · {featured.reading_time_minutes} min read
                    {featured.user?.name && <> · {featured.user.name}</>}
                  </p>
                  <h2>{featured.title}</h2>
                  <p>{featured.description || ''}</p>
                  <span className="blog-read-link">Read Full Article →</span>
                </div>
              </motion.a>

              {/* ── Blog grid ── */}
              <div className="blog-grid" style={{ marginTop: 32 }}>
                <AnimatePresence mode="wait">
                  {rest.map((post, i) => (
                    <motion.a
                      key={post.id}
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="post"
                      initial={{ opacity: 0, y: 24, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.94 }}
                      transition={{ delay: i * 0.06, duration: 0.4 }}
                      whileHover={{ y: -8, boxShadow: '0 24px 56px rgba(99,102,241,.16)' }}
                      style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column' }}
                    >
                      <div
                        className="thumb"
                        style={{ background: GRAD[i % GRAD.length] }}
                      >
                        <img
                          src={post.cover_image || `https://picsum.photos/seed/${post.id}/600/400`}
                          alt={post.title}
                          loading="lazy"
                          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                          onError={e => { e.target.src = `https://picsum.photos/seed/${post.id + 10}/600/400` }}
                        />
                        <span>
                          {(post.tag_list?.[0] || 'Article')
                            .replace(/-/g, ' ')
                            .replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                      </div>
                      <div className="body">
                        <p className="meta">
                          {fmtDate(post.published_at)} · {post.reading_time_minutes} min read
                        </p>
                        <h3>{post.title}</h3>
                        <span className="blog-read-link" style={{ fontSize: '.85rem' }}>
                          Read Full Article →
                        </span>
                      </div>
                    </motion.a>
                  ))}
                </AnimatePresence>
              </div>
            </>
          )}

        </div>
      </section>
    </motion.div>
  )
}
