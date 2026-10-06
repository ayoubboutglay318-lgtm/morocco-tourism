import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import axios from 'axios'

gsap.registerPlugin(ScrollTrigger)

const CATEGORIES = ['All', 'Marrakech', 'Fes', 'Chefchaouen', 'Tangier', 'Merzouga', 'Essaouira', 'Atlas']

export default function Gallery() {
  const [photos, setPhotos] = useState([])
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightbox, setLightbox] = useState(null)
  const gridRef = useRef()

  useEffect(() => {
    axios.get('/api/gallery')
      .then(r => setPhotos(r.data))
      .catch(err => console.error('Failed to load gallery:', err))
  }, [])

  useEffect(() => {
    const reveals = gsap.utils.toArray('.gallery-page .gp-item')
    reveals.forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out',
          delay: i * 0.06,
          scrollTrigger: { trigger: el, start: 'top 90%' },
        }
      )
    })
    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [photos, activeCategory])

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightbox === null) return
    const handleKey = (e) => {
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowRight') setLightbox(prev => (prev + 1) % filtered.length)
      if (e.key === 'ArrowLeft') setLightbox(prev => (prev - 1 + filtered.length) % filtered.length)
    }
    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [lightbox])

  const filtered = activeCategory === 'All'
    ? photos
    : photos.filter(p => p.city.toLowerCase().includes(activeCategory.toLowerCase()))

  return (
    <div className="gallery-page">
      {/* Hero */}
      <section className="gp-hero">
        <div className="gp-hero-bg" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1538600838042-6a0c694ffab5?w=1600&q=80&fit=crop)` }} />
        <div className="gp-hero-overlay" />
        <div className="gp-hero-content">
          <div className="section-label" style={{ color: '#7db8ff', justifyContent: 'center' }}>Photo Gallery</div>
          <h1>Morocco Through<br /><em>the Lens</em></h1>
          <p>Every frame tells a thousand-year story — from Saharan dunes to blue mountain villages</p>
        </div>
      </section>

      {/* Category Filter */}
      <div className="gp-filters">
        <div className="gp-filters-inner">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`gp-filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Photo Count */}
      <div className="gp-count">
        <span>{filtered.length} photo{filtered.length !== 1 ? 's' : ''}</span>
        {activeCategory !== 'All' && (
          <button className="gp-clear" onClick={() => setActiveCategory('All')}>
            ✕ Clear filter
          </button>
        )}
      </div>

      {/* Masonry Grid */}
      <div className="gp-grid" ref={gridRef}>
        {filtered.map((photo, i) => (
          <div
            key={photo.id}
            className={`gp-item ${photo.size === 'large' ? 'gp-item--large' : ''}`}
            onClick={() => setLightbox(i)}
          >
            <img src={photo.url} alt={photo.caption} loading="lazy" />
            <div className="gp-item-overlay">
              <div className="gp-item-caption">{photo.caption}</div>
              <div className="gp-item-city">📍 {photo.city}</div>
              <div className="gp-item-expand">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox !== null && filtered[lightbox] && (
        <div className="gp-lightbox" onClick={() => setLightbox(null)}>
          <div className="gp-lightbox-inner" onClick={e => e.stopPropagation()}>
            <button className="gp-lightbox-close" onClick={() => setLightbox(null)}>✕</button>
            <button
              className="gp-lightbox-nav gp-lightbox-prev"
              onClick={() => setLightbox((lightbox - 1 + filtered.length) % filtered.length)}
            >
              ‹
            </button>
            <img src={filtered[lightbox].url.replace('w=900', 'w=1400')} alt={filtered[lightbox].caption} />
            <button
              className="gp-lightbox-nav gp-lightbox-next"
              onClick={() => setLightbox((lightbox + 1) % filtered.length)}
            >
              ›
            </button>
            <div className="gp-lightbox-info">
              <div className="gp-lightbox-caption">{filtered[lightbox].caption}</div>
              <div className="gp-lightbox-meta">📍 {filtered[lightbox].city} · {lightbox + 1} / {filtered.length}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
