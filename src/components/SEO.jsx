import { Helmet } from 'react-helmet-async'

const SITE = 'https://vorldx.com'
const DEFAULT_OG = `${SITE}/og-image.png`

const ORG_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Vorldx Adgorithm Lab',
  url: SITE,
  logo: `${SITE}/logo-white.png`,
  description: 'Next-generation content creation and AI automation agency helping brands grow with creative storytelling, intelligent automation and performance marketing.',
  email: 'adgorithminfo@gmail.com',
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'adgorithminfo@gmail.com',
    contactType: 'customer service',
    availableLanguage: 'English',
  },
}

const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Vorldx Adgorithm Lab',
  url: SITE,
}

export { ORG_SCHEMA, WEBSITE_SCHEMA }

export default function SEO({ title, description, ogImage, path = '/', jsonLd }) {
  const fullTitle = title || 'Vorldx Adgorithm Lab — Where Creativity Meets Intelligence'
  const desc = description || 'Vorldx Adgorithm Lab is a next-gen AI marketing and content agency. We blend creativity, technology and AI to build content, automate processes and grow brands in the digital world.'
  const canonical = `${SITE}${path}`
  const og = ogImage || DEFAULT_OG

  const schemas = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : []

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Vorldx Adgorithm Lab" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={og} />
      <meta property="og:url" content={canonical} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={og} />

      {/* JSON-LD */}
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  )
}
