import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import Seo from '../components/Seo'
import { AdBanner } from '../components/Monetization'
import { gygSearchUrl, bookingSearchUrl, whatsappLink, AD_SLOTS, SITE_URL } from '../config'

export default function BlogPost() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [status, setStatus] = useState('loading')
  const [more, setMore] = useState([])

  useEffect(() => {
    let cancelled = false
    // eslint-disable-next-line
    setStatus('loading')
    axios.get(`/api/blog/${slug}`)
      .then(r => { if (!cancelled) { setPost(r.data); setStatus('ok'); window.scrollTo(0, 0) } })
      .catch(() => { if (!cancelled) setStatus('missing') })
    axios.get('/api/blog')
      .then(r => { if (!cancelled) setMore(r.data.filter(p => p.slug !== slug).slice(0, 3)) })
      .catch(() => {})
    return () => { cancelled = true }
  }, [slug])

  if (status === 'loading') return <div className="loading">Loading article…</div>
  if (status === 'missing') return (
    <div className="loading">
      <Seo title="Article not found" noindex />
      Article not found. <Link to="/blog">See all articles</Link>
    </div>
  )

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '2rem 1rem 4rem' }}>
      <Seo
        title={post.title}
        description={post.excerpt}
        image={post.image}
        type="article"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: post.title,
          description: post.excerpt,
          image: post.image,
          author: { '@type': 'Organization', name: 'Morocco Travel' },
          publisher: { '@type': 'Organization', name: 'Morocco Travel' },
          mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
        }}
      />
      <Link to="/blog" className="back-link">← All articles</Link>

      <article className="bp-modal" style={{ marginTop: '1rem', animation: 'none' }}>
        <div className="bp-modal-hero">
          <img src={post.image} alt={post.title} />
          <div className="bp-modal-hero-overlay" />
          <div className="bp-modal-hero-content">
            <div className="bp-tag" style={{ background: 'var(--gold)', color: '#fff' }}>{post.category}</div>
            <h1>{post.title}</h1>
          </div>
        </div>
        <div className="bp-modal-body">
          <div className="bp-modal-meta">
            <span className="bp-avatar" aria-hidden="true" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'var(--gold)', color: '#fff', fontWeight: 700 }}>MT</span>
            <div>
              <div className="bp-author">{post.author}</div>
              <div className="bp-date">{post.date} · {post.readTime}</div>
            </div>
          </div>
          <div className="bp-modal-content" dangerouslySetInnerHTML={{ __html: post.content }} />

          <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'var(--cream2)', borderRadius: 16, textAlign: 'center' }}>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--dark)' }}>
              Planning a trip to Morocco?
            </h2>
            <p style={{ color: 'var(--text3)', fontSize: '0.9rem', marginBottom: '1.2rem' }}>
              Message us on WhatsApp for help with drivers, desert camps and riads — or compare tours and hotels online.
            </p>
            <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href={whatsappLink(`Hello! I read "${post.title}" and I'd like help planning my trip.`)} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: '0.85rem' }}>
                Ask us on WhatsApp
              </a>
              <a href={gygSearchUrl('Morocco')} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ fontSize: '0.85rem' }}>
                Compare tours
              </a>
              <a href={bookingSearchUrl('Morocco')} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ fontSize: '0.85rem' }}>
                Check hotel prices
              </a>
            </div>
          </div>

          <AdBanner slot={AD_SLOTS.blog} />
        </div>
      </article>

      {more.length > 0 && (
        <div style={{ marginTop: '3rem' }}>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', marginBottom: '1rem' }}>More articles</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            {more.map(p => (
              <Link key={p.slug} to={`/blog/${p.slug}`} style={{ background: 'var(--white)', border: '1px solid var(--cream2)', borderRadius: 14, padding: '1rem', textDecoration: 'none', color: 'inherit' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>{p.category}</div>
                <div style={{ fontWeight: 700, marginTop: '0.3rem' }}>{p.title}</div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
