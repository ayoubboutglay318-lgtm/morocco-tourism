import { useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import axios from 'axios'

gsap.registerPlugin(ScrollTrigger)

const BLOG_CATEGORIES = ['All', 'Travel Tips', 'City Guides', 'Food & Drink', 'Culture', 'Adventure']

export default function Blog() {
  const [posts, setPosts] = useState([])
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedPost, setSelectedPost] = useState(null)

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

  // Lock body scroll when article is open
  useEffect(() => {
    if (selectedPost) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [selectedPost])

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
          <h1>Stories from<br /><em>the Kingdom</em></h1>
          <p>Tips, guides, and tales from Morocco — written by travellers, for travellers</p>
        </div>
      </section>

      {/* Featured Post */}
      {featured && (
        <div className="bp-featured" onClick={() => setSelectedPost(featured)}>
          <div className="bp-featured-img">
            <img src={featured.image} alt={featured.title} />
            <div className="bp-featured-badge">Featured Story</div>
          </div>
          <div className="bp-featured-content">
            <div className="bp-tag">{featured.category}</div>
            <h2>{featured.title}</h2>
            <p>{featured.excerpt}</p>
            <div className="bp-meta">
              <img src={featured.authorAvatar} alt={featured.author} className="bp-avatar" />
              <div>
                <div className="bp-author">{featured.author}</div>
                <div className="bp-date">{featured.date} · {featured.readTime}</div>
              </div>
            </div>
            <button className="btn-primary" style={{ marginTop: '1.2rem' }}>Read Story →</button>
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
          <article key={post.id} className="bp-card" onClick={() => setSelectedPost(post)}>
            <div className="bp-card-img">
              <img src={post.image} alt={post.title} loading="lazy" />
              <div className="bp-card-tag">{post.category}</div>
            </div>
            <div className="bp-card-body">
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <div className="bp-card-footer">
                <img src={post.authorAvatar} alt={post.author} className="bp-avatar-sm" />
                <div>
                  <div className="bp-card-author">{post.author}</div>
                  <div className="bp-card-date">{post.date} · {post.readTime}</div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="bp-empty">
          <p>No stories found in this category yet.</p>
          <button className="btn-primary" onClick={() => setActiveCategory('All')}>View All Stories</button>
        </div>
      )}

      {/* Article Modal */}
      {selectedPost && (
        <div className="bp-modal-overlay" onClick={() => setSelectedPost(null)}>
          <div className="bp-modal" onClick={e => e.stopPropagation()}>
            <button className="bp-modal-close" onClick={() => setSelectedPost(null)}>✕</button>
            <div className="bp-modal-hero">
              <img src={selectedPost.image.replace('w=900', 'w=1400')} alt={selectedPost.title} />
              <div className="bp-modal-hero-overlay" />
              <div className="bp-modal-hero-content">
                <div className="bp-tag" style={{ background: 'var(--gold)', color: '#fff' }}>{selectedPost.category}</div>
                <h1>{selectedPost.title}</h1>
              </div>
            </div>
            <div className="bp-modal-body">
              <div className="bp-modal-meta">
                <img src={selectedPost.authorAvatar} alt={selectedPost.author} className="bp-avatar" />
                <div>
                  <div className="bp-author">{selectedPost.author}</div>
                  <div className="bp-date">{selectedPost.date} · {selectedPost.readTime}</div>
                </div>
              </div>
              <div className="bp-modal-content" dangerouslySetInnerHTML={{ __html: selectedPost.content }} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
