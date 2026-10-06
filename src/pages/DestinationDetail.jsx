import { useState, useEffect, useRef, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

/* ─── Type badge colours ─── */
const TYPE_COLORS = {
  Heritage:   '#b5451b',
  Nature:     '#1e8a4c',
  Culture:    '#6d3fa0',
  Experience: '#d4720a',
}

/* ─── Transport chips inferred from keywords ─── */
function getTransportChips(text = '') {
  const chips = []
  if (/airport|flight|fly/i.test(text))  chips.push({ icon: '✈️', label: 'By Air' })
  if (/train|rail|boraq|oncf/i.test(text)) chips.push({ icon: '🚄', label: 'By Train' })
  if (/ferry|boat|ship/i.test(text))      chips.push({ icon: '⛴️', label: 'By Ferry' })
  if (/bus|coach|cmt|supr/i.test(text))   chips.push({ icon: '🚌', label: 'By Bus' })
  if (chips.length === 0)                 chips.push({ icon: '🚗', label: 'By Road' })
  return chips
}

/* ─── IntersectionObserver scroll-reveal hook ─── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.dd-reveal, .dd-reveal-left, .dd-reveal-right, .dd-reveal-scale')
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('dd-visible'); observer.unobserve(e.target) } }),
      { threshold: 0.12 }
    )
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  })
}

/* ─── Main component ─── */
export default function DestinationDetail() {
  const { slug } = useParams()
  const [dest, setDest]             = useState(null)
  const [attractions, setAttractions] = useState([])
  const [tours, setTours]           = useState([])
  const [hotels, setHotels]         = useState([])
  const [tab, setTab]               = useState('overview')
  const [openFact, setOpenFact]     = useState(null)
  const [notedTips, setNotedTips]   = useState(new Set())
  const [starFilter, setStarFilter] = useState(0)
  const [lightbox, setLightbox]     = useState(null)
  const heroImgRef = useRef(null)

  /* ── Fetch data ── */
  useEffect(() => {
    setDest(null)
    setAttractions([]); setTours([]); setHotels([])
    setTab('overview'); setOpenFact(null); setNotedTips(new Set()); setStarFilter(0)
    axios.get(`/api/destinations/${slug}`).then(r => {
      setDest(r.data)
      const city = r.data.name
      axios.get(`/api/attractions?city=${city}`).then(r2 => setAttractions(r2.data))
      axios.get(`/api/tours?city=${city}`).then(r3 => setTours(r3.data))
      axios.get(`/api/hotels?city=${city}`).then(r4 => setHotels(r4.data))
    }).catch(console.error)
  }, [slug])

  /* ── Parallax hero ── */
  useEffect(() => {
    const onScroll = () => {
      if (heroImgRef.current) {
        heroImgRef.current.style.transform = `translateY(${window.scrollY * 0.35}px)`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* ── Scroll-reveal ── */
  useReveal()

  /* ── Lightbox keyboard close ── */
  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') setLightbox(null) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const toggleTip = useCallback(i => {
    setNotedTips(prev => {
      const next = new Set(prev)
      next.has(i) ? next.delete(i) : next.add(i)
      return next
    })
  }, [])

  if (!dest) return (
    <div className="loading" style={{ paddingTop: '10rem' }}>
      <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🌍</div>
      Loading destination…
    </div>
  )

  const TABS = [
    { id: 'overview',    icon: '🗺️',  label: 'Overview' },
    { id: 'attractions', icon: '🏛️',  label: 'Attractions', count: attractions.length },
    { id: 'tours',       icon: '🎒',  label: 'Tours',       count: tours.length },
    { id: 'hotels',      icon: '🏨',  label: 'Hotels',      count: hotels.length },
    { id: 'tips',        icon: '💡',  label: 'Tips',        count: dest.tips?.length },
  ]

  const WA_URL = `https://wa.me/212689122018?text=${encodeURIComponent(`Hello! I'm interested in a tour to ${dest.name}. Can you help me plan my trip?`)}`
  const filteredHotels = starFilter === 0 ? hotels : hotels.filter(h => h.stars === starFilter)

  /* ── Gallery images (hero + image, max 5 slots remaining) ── */
  const galleryImgs = [dest.heroImage, dest.image, ...attractions.slice(0, 4).map(a => a.image)].filter(Boolean).filter((v, i, a) => a.indexOf(v) === i).slice(0, 5)

  /* ── Render ── */
  return (
    <div style={{ background: 'var(--cream)' }}>

      {/* ══ HERO ══ */}
      <div className="dd-hero">
        <img
          ref={heroImgRef}
          className="dd-hero-img"
          src={dest.heroImage || dest.image}
          alt={dest.name}
        />
        <div className="dd-hero-overlay" />

        {/* Breadcrumb */}
        <nav className="dd-hero-breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/destinations">Destinations</Link>
          <span>/</span>
          <span style={{ color: 'rgba(255,255,255,0.9)' }}>{dest.name}</span>
        </nav>

        {/* Content */}
        <div className="dd-hero-content">
          <div className="dd-hero-region">{dest.region}</div>
          <h1 className="dd-hero-title">{dest.name}</h1>
          <p className="dd-hero-tagline">{dest.tagline}</p>
          {dest.highlights && (
            <div className="dd-hero-highlights">
              {dest.highlights.map(h => (
                <span key={h} className="dd-hero-pill">{h}</span>
              ))}
            </div>
          )}
        </div>

        {/* Scroll cue */}
        <div className="dd-hero-scroll">
          <div className="dd-hero-scroll-line" />
          Scroll
        </div>
      </div>

      {/* ══ STATS BAR ══ */}
      <div className="dd-stats-bar">
        <div className="dd-stats-inner">
          {[
            { icon: '⭐', value: dest.rating, label: 'Rating' },
            { icon: '🗣️', value: dest.reviewCount?.toLocaleString(), label: 'Reviews' },
            { icon: '🏨', value: hotels.length, label: 'Hotels' },
            { icon: '🏛️', value: attractions.length, label: 'Attractions' },
            { icon: '🎒', value: tours.length, label: 'Tours' },
          ].map(s => (
            <div key={s.label} className="dd-stat">
              <span className="dd-stat-icon">{s.icon}</span>
              <div className="dd-stat-text">
                <div className="dd-stat-value">{s.value ?? '—'}</div>
                <div className="dd-stat-label">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ TABS ══ */}
      <div className="dd-tabs-bar">
        <div className="dd-tabs-inner">
          {TABS.map(t => (
            <button
              key={t.id}
              className={`dd-tab${tab === t.id ? ' active' : ''}`}
              onClick={() => setTab(t.id)}
            >
              <span className="dd-tab-icon">{t.icon}</span>
              {t.label}
              {t.count != null && (
                <span className="dd-tab-count">{t.count}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ══ TAB CONTENT ══ */}
      <div className="dd-content">

        {/* ── OVERVIEW ── */}
        {tab === 'overview' && (
          <div className="dd-tab-panel">
            <div className="dd-overview-grid">

              {/* Left: description + facts + getting there */}
              <div>
                <div className="dd-section-eyebrow">About {dest.name}</div>
                <h2 className="dd-section-title">Discover {dest.name}</h2>
                <div style={{ marginTop: '1.5rem' }}>
                  {dest.description.split('\n\n').map((para, i) => (
                    <p key={i} className="dd-desc-para">{para}</p>
                  ))}
                </div>

                {/* Getting There */}
                <div className="dd-getting-there dd-reveal">
                  <h3 className="dd-getting-there-title">✈️ Getting There</h3>
                  <p className="dd-getting-there-text">{dest.gettingThere}</p>
                  <div className="dd-transport-chips">
                    {getTransportChips(dest.gettingThere).map(c => (
                      <span key={c.label} className="dd-transport-chip">{c.icon} {c.label}</span>
                    ))}
                  </div>
                </div>

                {/* Facts Accordion */}
                <div className="dd-reveal">
                  <h3 className="dd-facts-title">📌 Key Facts</h3>
                  {dest.facts.map((f, i) => (
                    <div
                      key={i}
                      className={`dd-fact-item${openFact === i ? ' open' : ''}`}
                    >
                      <button
                        className="dd-fact-btn"
                        onClick={() => setOpenFact(openFact === i ? null : i)}
                      >
                        <span className="dd-fact-num">{i + 1}</span>
                        <span style={{ flex: 1 }}>{f.length > 80 ? f.slice(0, 80) + '…' : f}</span>
                        <span className="dd-fact-chevron">▼</span>
                      </button>
                      <div className="dd-fact-body">{f}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: sidebar */}
              <div>
                {/* Quick Info */}
                <div className="dd-sidebar-card dd-reveal-scale">
                  <h3>Quick Info</h3>
                  {[
                    ['📍 Region',      dest.region],
                    ['📅 Best Time',   dest.bestTime],
                    ['🗣️ Language',    dest.language],
                    ['💰 Currency',    dest.currency],
                    ['🌡️ Climate',     dest.temperature],
                    ['💲 Price Level', dest.priceLevel],
                  ].map(([k, v]) => v && (
                    <div key={k} className="dd-info-row">
                      <span className="dd-info-key">{k}</span>
                      <span className="dd-info-val">{v}</span>
                    </div>
                  ))}
                </div>

                {/* Rating Card */}
                <div className="dd-sidebar-card dd-reveal-scale" style={{ transitionDelay: '0.1s' }}>
                  <h3>Traveller Rating</h3>
                  <div className="dd-rating-display">
                    <span className="dd-rating-num">{dest.rating}</span>
                    <div>
                      <div className="dd-rating-stars">{'★'.repeat(Math.round(dest.rating))}</div>
                      <div className="dd-rating-count">{dest.reviewCount?.toLocaleString()} reviews</div>
                    </div>
                  </div>
                </div>

                {/* CTA Card */}
                <div className="dd-sidebar-card dd-reveal-scale" style={{ transitionDelay: '0.2s' }}>
                  <h3>Plan Your Visit</h3>
                  <div className="dd-cta-btns">
                    <button className="btn-secondary" style={{ color: 'var(--dark)', border: '1.5px solid var(--cream2)' }} onClick={() => setTab('attractions')}>
                      🏛️ {attractions.length} Attractions →
                    </button>
                    <button className="btn-secondary" style={{ color: 'var(--dark)', border: '1.5px solid var(--cream2)' }} onClick={() => setTab('tours')}>
                      🎒 {tours.length} Tours →
                    </button>
                    <Link to={`/hotels?city=${dest.name}`} className="btn-primary">
                      🏨 Browse Hotels
                    </Link>
                    <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                       style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: '#25d366', color: '#fff', padding: '0.7rem 1.5rem', borderRadius: '50px', fontWeight: 700, textDecoration: 'none', fontSize: '0.9rem', transition: 'background 0.2s' }}
                       onMouseEnter={e => e.currentTarget.style.background = '#1eb957'}
                       onMouseLeave={e => e.currentTarget.style.background = '#25d366'}
                    >
                      💬 Ask via WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── ATTRACTIONS ── */}
        {tab === 'attractions' && (
          <div className="dd-tab-panel">
            <div className="dd-section-eyebrow">{dest.name}</div>
            <h2 className="dd-section-title">Things to Do</h2>
            <p className="dd-section-sub">{attractions.length} must-see attractions and experiences</p>

            <div className="dd-attractions-grid">
              {attractions.map((a, i) => (
                <div
                  key={a.id}
                  className="dd-attraction-card dd-reveal"
                  style={{ transitionDelay: `${(i % 3) * 0.08}s` }}
                >
                  <div className="dd-attraction-img-wrap">
                    <img src={a.image} alt={a.name} loading="lazy" />
                    <span
                      className="dd-attraction-type"
                      style={{ background: TYPE_COLORS[a.type] || '#555' }}
                    >{a.type}</span>
                  </div>
                  <div className="dd-attraction-body">
                    <h3 className="dd-attraction-name">{a.name}</h3>
                    <p className="dd-attraction-desc">{a.description}</p>
                    <div className="dd-attraction-meta">
                      <span className="dd-meta-chip">⏱ {a.duration}</span>
                      <span className="dd-meta-chip">💰 {a.price}</span>
                      <Link to="/map" className="dd-meta-chip" style={{ textDecoration: 'none', color: 'var(--gold-dark)', background: 'rgba(201,151,58,0.1)', borderColor: 'transparent' }}>
                        🗺️ Map
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {attractions.length === 0 && (
              <p style={{ color: 'var(--text3)', textAlign: 'center', padding: '3rem' }}>
                No attractions listed for {dest.name} yet.
              </p>
            )}
          </div>
        )}

        {/* ── TOURS ── */}
        {tab === 'tours' && (
          <div className="dd-tab-panel">
            <div className="dd-section-eyebrow">{dest.name}</div>
            <h2 className="dd-section-title">Tours & Experiences</h2>
            <p className="dd-section-sub">Guided tours with local experts — small groups only</p>

            <div className="dd-tours-grid">
              {tours.map((t, i) => (
                <div
                  key={t.id}
                  className="dd-tour-card dd-reveal"
                  style={{ transitionDelay: `${(i % 3) * 0.08}s` }}
                >
                  <div className="dd-tour-img-wrap">
                    <img src={t.image} alt={t.title} loading="lazy" />
                    <span className="dd-tour-rating-badge">★ {t.rating}</span>
                  </div>
                  <div className="dd-tour-body">
                    <h3 className="dd-tour-title">{t.title}</h3>
                    <div className="dd-tour-meta">
                      <span className="dd-tour-meta-pill">⏱ {t.duration}</span>
                      <span className="dd-tour-meta-pill">👥 {t.groupSize}</span>
                    </div>
                    <p className="dd-tour-desc">{t.description}</p>
                    <div className="dd-tour-highlights">
                      <div className="dd-tour-highlights-label">Highlights</div>
                      <div className="dd-tour-highlights-list">
                        {t.highlights.map(h => (
                          <span key={h} className="dd-tour-highlight">{h}</span>
                        ))}
                      </div>
                    </div>
                    <div className="dd-tour-footer">
                      <div className="dd-tour-price">
                        {t.price} MAD
                        <span> / person</span>
                      </div>
                      <a
                        href={`https://wa.me/212689122018?text=${encodeURIComponent(`Hello! I'd like to book the "${t.title}" tour in ${dest.name}. Price: ${t.price} MAD/person.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="dd-tour-book-btn"
                      >
                        💬 Book
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {tours.length === 0 && (
              <p style={{ color: 'var(--text3)', textAlign: 'center', padding: '3rem' }}>
                No tours listed for {dest.name} yet.
              </p>
            )}
          </div>
        )}

        {/* ── HOTELS ── */}
        {tab === 'hotels' && (
          <div className="dd-tab-panel">
            <div className="dd-section-eyebrow">{dest.name}</div>
            <h2 className="dd-section-title">Where to Stay</h2>
            <p className="dd-section-sub">{hotels.length} handpicked accommodations</p>

            {/* Star filter */}
            <div className="dd-star-filters">
              {[0, 5, 4, 3].map(s => (
                <button
                  key={s}
                  className={`dd-star-btn${starFilter === s ? ' active' : ''}`}
                  onClick={() => setStarFilter(s)}
                >
                  {s === 0 ? 'All' : `${'★'.repeat(s)} ${s}-star`}
                </button>
              ))}
            </div>

            <div className="hotels-grid">
              {filteredHotels.map((h, i) => (
                <Link
                  key={h.id}
                  to={`/hotels/${h.id}`}
                  className="hotel-card dd-reveal"
                  style={{ transitionDelay: `${(i % 3) * 0.08}s` }}
                >
                  <div className="hotel-card-img-wrap">
                    <img src={h.image} alt={h.name} className="hotel-card-img" loading="lazy" />
                    <span className="hotel-card-badge">{h.badge}</span>
                  </div>
                  <div className="hotel-card-body">
                    <div className="hotel-card-city">{h.city}</div>
                    <div className="hotel-card-name">{h.name}</div>
                    <div className="hotel-card-rating">
                      <span className="stars">{'★'.repeat(Math.round(h.rating))}</span>
                      <span className="rating-num">{h.rating} · {h.reviews.toLocaleString()} reviews</span>
                    </div>
                    <div className="hotel-card-amenities">
                      {h.amenities.slice(0, 4).map(a => (
                        <span key={a} className="amenity-pill">{a}</span>
                      ))}
                    </div>
                    <div className="hotel-card-footer">
                      <div className="hotel-card-price">
                        ${h.price}<span> / night</span>
                      </div>
                      <span className="btn-primary" style={{ padding: '0.45rem 1.1rem', fontSize: '0.85rem' }}>
                        Book
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {filteredHotels.length === 0 && (
              <p style={{ color: 'var(--text3)', textAlign: 'center', padding: '3rem' }}>
                No {starFilter > 0 ? `${starFilter}-star ` : ''}hotels found.
              </p>
            )}
          </div>
        )}

        {/* ── TIPS ── */}
        {tab === 'tips' && (
          <div className="dd-tab-panel">
            <div className="dd-section-eyebrow">{dest.name}</div>
            <h2 className="dd-section-title">Insider Tips</h2>
            <p className="dd-section-sub">
              Click a tip to mark it as noted — {notedTips.size} of {dest.tips?.length} noted
            </p>

            <div className="dd-tips-list">
              {dest.tips?.map((tip, i) => (
                <div
                  key={i}
                  className={`dd-tip-card dd-reveal${notedTips.has(i) ? ' noted' : ''}`}
                  style={{ transitionDelay: `${i * 0.04}s` }}
                  onClick={() => toggleTip(i)}
                >
                  <div className="dd-tip-check">
                    {notedTips.has(i) ? '✓' : ''}
                  </div>
                  <div className="dd-tip-num">{i + 1}</div>
                  <p className="dd-tip-text">{tip}</p>
                </div>
              ))}
            </div>

            {/* CTA block */}
            <div className="dd-tips-cta dd-reveal">
              <div>
                <h3>Ready to visit {dest.name}?</h3>
                <p>Let our local experts craft your perfect itinerary</p>
              </div>
              <div className="dd-tips-cta-btns">
                <Link to={`/hotels?city=${dest.name}`} className="btn-primary">
                  🏨 Browse Hotels
                </Link>
                <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                   style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#25d366', color: '#fff', padding: '0.75rem 1.6rem', borderRadius: '50px', fontWeight: 700, textDecoration: 'none', fontSize: '0.9rem' }}
                >
                  💬 Plan via WhatsApp
                </a>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ══ PHOTO GALLERY (always visible) ══ */}
      {galleryImgs.length > 0 && (
        <section className="dd-gallery-section">
          <div className="dd-gallery-inner">
            <div className="dd-gallery-header dd-reveal">
              <div className="dd-section-eyebrow" style={{ justifyContent: 'center' }}>Visual Journey</div>
              <h2 className="dd-section-title" style={{ textAlign: 'center' }}>{dest.name} in Photos</h2>
            </div>
            <div className="dd-gallery-grid">
              {galleryImgs.map((src, i) => (
                <div
                  key={i}
                  className="dd-gallery-item dd-reveal-scale"
                  style={{ transitionDelay: `${i * 0.07}s` }}
                  onClick={() => setLightbox(src)}
                >
                  <img src={src} alt={`${dest.name} photo ${i + 1}`} loading="lazy" />
                  <div className="dd-gallery-cap">{dest.name} — Photo {i + 1}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══ LIGHTBOX ══ */}
      {lightbox && (
        <div className="dd-lightbox" onClick={() => setLightbox(null)}>
          <button
            className="dd-lightbox-close"
            onClick={() => setLightbox(null)}
            aria-label="Close lightbox"
          >×</button>
          <img src={lightbox} alt="Gallery" onClick={e => e.stopPropagation()} />
        </div>
      )}
    </div>
  )
}
