import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import axios from 'axios'

gsap.registerPlugin(ScrollTrigger)

const BLOG_CATEGORIES = ['All', 'Travel Tips', 'City Guides', 'Food & Drink', 'Culture', 'Adventure']

export default function Blog() {
  const [posts, setPosts] = useState([])
  const [activeCategory, setActiveCategory] = useState('All')
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('/api/blog')
      .then(r => setPosts(r.data))
      .catch(err => console.error('Failed to load blog:', err))
  }, [])

  useEffect(() => {
    const reveals = gsap.utils.toArray('.blog-page .bp-card')
    reveals.forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          delay: i * 0.08,
          scrollTrigger: { trigger: el, start: 'top 90%' },
        }
      )
    })
    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [posts, activeCategory])

  const filtered = activeCategory === 'All'
    ? posts
    : posts.filter(p => p.category === activeCategory)

  const featured = posts.find(p => p.featured)

  return (
    <div className="blog-page">
      {/* Hero */}
      <section className="bp-hero">
        <div className="bp-hero-bg" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=1600&q=80&fit=crop)` }} />
        <div className="bp-hero-overlay" />
        <div className="bp-hero-content">
          <div className="section-label" style={{ color: 'var(--gold-light)', justifyContent: 'center' }}>Travel Stories</div>
          <h1>Morocco<br /><em>Travel Guides</em></h1>
          <p>Practical itineraries, city guides and tips for travelling in Morocco</p>
        </div>
      </section>

      {/* Featured Post */}
      {featured && (
        <div className="bp-featured" onClick={() => navigate(`/blog/${featured.slug}`)} role="link" tabIndex={0} onKeyDown={e => { if (e.key === 'Enter') navigate(`/blog/${featured.slug}`) }}>
          <div className="bp-featured-img">
            <img src={featured.image} alt={featured.title} />
            <div className="bp-featured-badge">Featured Story</div>
          </div>
          <div className="bp-featured-content">
            <div className="bp-tag">{featured.category}</div>
            <h2>{featured.title}</h2>
            <p>{featured.excerpt}</p>
            <div className="bp-meta">
              <span className="bp-avatar" aria-hidden="true" style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', background:'var(--gold)', color:'#fff', fontWeight:700 }}>MT</span>
              <div>
                <div className="bp-author">{featured.author}</div>
                <div className="bp-date">{featured.date} · {featured.readTime}</div>
              </div>
            </div>
            <Link to={`/blog/${featured.slug}`} className="btn-primary" style={{ marginTop: '1.2rem', display: 'inline-block' }} onClick={e => e.stopPropagation()}>Read Article →</Link>
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div className="bp-filters">
        <div className="bp-filters-inner">
          {BLOG_CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`bp-filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Posts Grid */}
      <div className="bp-grid">
        {filtered.map(post => (
          <Link key={post.id} to={`/blog/${post.slug}`} className="bp-card" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
            <div className="bp-card-img">
              <img src={post.image} alt={post.title} loading="lazy" />
              <div className="bp-card-tag">{post.category}</div>
            </div>
            <div className="bp-card-body">
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <div className="bp-card-footer">
                <span className="bp-avatar-sm" aria-hidden="true" style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', background:'var(--gold)', color:'#fff', fontWeight:700 }}>MT</span>
                <div>
                  <div className="bp-card-author">{post.author}</div>
                  <div className="bp-card-date">{post.date} · {post.readTime}</div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="bp-empty">
          <p>No stories found in this category yet.</p>
          <button className="btn-primary" onClick={() => setActiveCategory('All')}>View All Stories</button>
        </div>
      )}

    </div>
  )
}
