import { useState, useEffect, useRef, lazy, Suspense } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HotelCard from '../components/HotelCard'
import { useApp } from '../context/AppContext'
import { AdBanner } from '../components/Monetization'
import { WHATSAPP_URL, AD_SLOTS } from '../config'

gsap.registerPlugin(ScrollTrigger)

// The 3D sky is decorative: load it after the page so text appears first
const ThreeHero = lazy(() => import('../components/ThreeHero'))

const cdnImg = path => `https://images.unsplash.com/${path}?w=700&q=85&fit=crop&auto=format`

const cityImages = {
  Marrakech: cdnImg('photo-1597212618440-806262de4f6b'),
  Fes: cdnImg('photo-1559925523-10de9e23cf90'),
  Chefchaouen: cdnImg('photo-1538600838042-6a0c694ffab5'),
  Essaouira: cdnImg('photo-1624802746702-60ca95bdb605'),
  Merzouga: cdnImg('photo-1559586616-361e18714958'),
  'Atlas Mountains': cdnImg('photo-1593535988128-7214bc2cbedc'),
  Casablanca: cdnImg('photo-1548018560-4cb48a8837c1'),
  Tangier: cdnImg('photo-1533501747004-381b96042e88'),
  Rabat: cdnImg('photo-1560789590-ee4cc7125967'),
  Agadir: cdnImg('photo-1624802746702-60ca95bdb605'),
}

const tangierHighlights = [
  { icon: '🌊', title: 'Cap Spartel', desc: 'Watch the Atlantic meet the Mediterranean at the dramatic northwestern tip of Africa.' },
  { icon: '🏰', title: 'Kasbah Museum', desc: "The Sultan's palace — 3,000 years of history in one breathtaking building." },
  { icon: '🦁', title: 'Hercules Caves', desc: 'Ancient sea caves where legend says Hercules rested. The Atlantic frames a perfect map of Africa.' },
  { icon: '☕', title: 'Petit Socco', desc: 'The legendary café square where Burroughs, Kerouac and Matisse once passed their days.' },
  { icon: '🌍', title: 'Two Continents View', desc: 'See Europe from the kasbah — Spain is just 14km across the Strait of Gibraltar.' },
  { icon: '🏖️', title: '5km Beach & Corniche', desc: "Tangier's sweeping bay beach with fresh seafood restaurants and mountain views." },
]

function useCountUp(target, duration = 2, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [start, target, duration])
  return count
}

function StatItem({ value, suffix, label }) {
  const ref = useRef()
  const count = useCountUp(value, 2, true)

  return (
    <div className="stat-item reveal" ref={ref}>
      <div className="stat-number">{count.toLocaleString()}{suffix}</div>
      <div className="stat-label">{label}</div>
    </div>
  )
}

export default function Home() {
  useApp()
  const [hotels, setHotels] = useState([])
  const [cities, setCities] = useState([])
  const [gallery, setGallery] = useState([])
  const [stats, setStats] = useState([])
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const heroBgRef = useRef()
  const heroEyebrowRef = useRef()
  const heroH1Ref = useRef()
  const heroSubRef = useRef()
  const heroActionsRef = useRef()
  const heroSearchRef = useRef()

  useEffect(() => {
    axios.get('/api/hotels')
      .then(r => setHotels(r.data))
      .catch(err => console.error('Failed to load hotels:', err))

    axios.get('/api/cities')
      .then(r => setCities(r.data))
      .catch(err => console.error('Failed to load cities:', err))

    axios.get('/api/gallery')
      .then(r => setGallery(r.data))
      .catch(err => console.error('Failed to load gallery:', err))

    axios.get('/api/stats')
      .then(r => {
        if (Array.isArray(r.data) && r.data.length > 0) {
          setStats(r.data)
        }
      })
      .catch(() => {})
  }, [])

  // Hero entrance animation
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.to(heroEyebrowRef.current, { opacity: 1, y: 0, duration: 0.8, delay: 0.2 })
      .to(heroH1Ref.current, { opacity: 1, y: 0, duration: 1 }, '-=0.4')
      .to(heroSubRef.current, { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
      .to(heroActionsRef.current, { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')
      .to(heroSearchRef.current, { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')
  }, [])

  // Hero parallax
  useEffect(() => {
    if (!heroBgRef.current) return
    const tl = gsap.to(heroBgRef.current, {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: { trigger: heroBgRef.current, start: 'top top', end: 'bottom top', scrub: true },
    })
    return () => tl.scrollTrigger?.kill()
  }, [])

  // Scroll reveal for sections
  useEffect(() => {
    const reveals = gsap.utils.toArray('.reveal')
    reveals.forEach(el => {
      gsap.to(el, {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
      })
    })

    const lefts = gsap.utils.toArray('.reveal-left')
    lefts.forEach(el => {
      gsap.to(el, {
        opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%' },
      })
    })

    const rights = gsap.utils.toArray('.reveal-right')
    rights.forEach(el => {
      gsap.to(el, {
        opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%' },
      })
    })

    const scales = gsap.utils.toArray('.reveal-scale')
    scales.forEach(el => {
      gsap.to(el, {
        opacity: 1, scale: 1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%' },
      })
    })

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [hotels, gallery])

  const handleSearch = (e) => {
    e.preventDefault()
    navigate(`/hotels?city=${search}`)
  }

  const hotelCountByCity = (city) => hotels.filter(h => h.city === city).length

  return (
    <>
      {/* ── HERO ── */}
      <section className="hero">
        <Suspense fallback={null}><ThreeHero /></Suspense>
        <div className="hero-bg" ref={heroBgRef} style={{ opacity: 0.18 }} />
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="hero-eyebrow" ref={heroEyebrowRef}>Explore Morocco</div>
          <h1 ref={heroH1Ref}>
            Where Every Journey<br />Becomes a <em>Legend</em>
          </h1>
          <p className="hero-subtitle" ref={heroSubRef}>
            Ancient medinas, golden deserts, mountain kasbahs, and Atlantic coastlines — discover Morocco's infinite wonders.
          </p>
          <div className="hero-actions" ref={heroActionsRef}>
            <Link to="/hotels" className="btn-primary">Browse Hotels</Link>
            <Link to="/destinations" className="btn-secondary">Explore Destinations</Link>
          </div>
          <form className="hero-search-bar" ref={heroSearchRef} onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search by city — Marrakech, Fes, Chefchaouen..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <button type="submit" className="btn-primary" style={{ padding: '0.65rem 1.6rem', fontSize: '0.88rem' }}>Search</button>
          </form>
        </div>
        <div className="hero-scroll">
          <div className="scroll-line" />
          Scroll
        </div>
      </section>

      {/* ── STATS BAND (real counts from our own guide data) ── */}
      {stats.length > 0 && <div className="stats-band">
        <div className="stats-inner">
          {stats.map(s => <StatItem key={s.label} value={s.value} suffix={s.suffix} label={s.label} />)}
        </div>
      </div>}

      {/* ── DESTINATIONS ── */}
      <div className="section">
        <div className="reveal">
          <div className="section-label">Destinations</div>
          <h2 className="section-title">Explore Morocco's<br />Iconic Cities</h2>
          <p className="section-subtitle">From the rose-red walls of Marrakech to the infinite silence of the Sahara</p>
        </div>
        <div className="cities-grid">
          {cities.map((city, i) => (
            <Link key={city} to={`/hotels?city=${city}`} className="city-card reveal" style={{ transitionDelay: `${i * 0.07}s` }}>
              <img src={cityImages[city] || cityImages.Marrakech} alt={city} />
              <div className="city-card-overlay">
                <div className="city-card-name">{city}</div>
                <div className="city-card-count">{hotelCountByCity(city)} hotel{hotelCountByCity(city) !== 1 ? 's' : ''} available</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── FEATURED HOTELS ── */}
      <div style={{ background: '#fff' }}>
        <div className="section">
          <div className="reveal">
            <div className="section-label">Featured Stays</div>
            <h2 className="section-title">Handpicked Hotels<br />& Riads</h2>
            <p className="section-subtitle">A selection of well-known hotels, riads and desert camps across Morocco — check live prices and availability before you go</p>
          </div>
          <div className="hotels-grid">
            {hotels.slice(0, 6).map((h, i) => (
              <div key={h.id} className="reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
                <HotelCard hotel={h} />
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }} className="reveal">
            <Link to="/hotels" className="btn-primary" style={{ fontSize: '1rem' }}>View All {hotels.length} Hotels</Link>
          </div>
        </div>
      </div>

      {/* ── SPONSORED BANNER (MONETIZATION) ── */}
      <div style={{ maxWidth: 1100, margin: '1rem auto' }}>
        <AdBanner slot={AD_SLOTS.home} />
      </div>

      {/* ── GALLERY ── */}
      <div className="section">
        <div className="reveal">
          <div className="section-label">Gallery</div>
          <h2 className="section-title">A Kingdom of<br />Breathtaking Beauty</h2>
          <p className="section-subtitle">Morocco in pictures — every frame tells a thousand-year story</p>
        </div>
        <div className="gallery-grid">
          {gallery.map((item, i) => (
            <div key={item.id} className={`gallery-item ${item.size} reveal-scale`} style={{ transitionDelay: `${i * 0.06}s` }}>
              <img src={item.url} alt={item.caption} />
              <div className="gallery-caption">{item.caption}</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '2rem' }} className="reveal">
          <Link to="/hotels" className="btn-outline">Plan Your Visit</Link>
        </div>
      </div>

      {/* ── TANGIER SPOTLIGHT ── */}
      <div style={{ background: 'linear-gradient(135deg, #060c1a 0%, #0d1a2e 50%, #0a1020 100%)', padding: '6rem 3rem', color: '#fff', position: 'relative', overflow: 'hidden' }}>
        {/* decorative blurs */}
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(100,160,255,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,151,58,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '4rem' }} className="reveal">
            <div className="section-label" style={{ color: '#7db8ff', justifyContent: 'center' }}>Featured Destination</div>
            <h2 className="section-title" style={{ color: '#fff', fontSize: 'clamp(2rem,4vw,3rem)' }}>
              Tangier — <em style={{ color: '#7db8ff', fontStyle: 'italic' }}>Where Two Continents Meet</em>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.55)', maxWidth: 580, margin: '0 auto', fontSize: '1.05rem' }}>
              Africa's most cosmopolitan city. 14km from Europe. 3,000 years of history. The city that inspired Matisse, Burroughs and Kerouac.
            </p>
          </div>

          {/* Two-column layout */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center', marginBottom: '4rem' }}>
            <div className="reveal-left">
              <div style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', height: 440 }}>
                <img
                  src={cdnImg('photo-1533501747004-381b96042e88')}
                  alt="Tangier"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(6,12,26,0.7) 0%, transparent 50%)' }} />
                <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', right: '1.5rem' }}>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    {[['6', 'Hotels'], ['12', 'Attractions'], ['14km', 'From Europe']].map(([v, l]) => (
                      <div key={l} style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)', borderRadius: 12, padding: '0.6rem 1.1rem', textAlign: 'center' }}>
                        <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#7db8ff' }}>{v}</div>
                        <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: 1 }}>{l}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="reveal-right">
              <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.9, fontSize: '1rem', marginBottom: '2rem' }}>
                From the kasbah walls you can see two continents at once. The Atlantic crashes into the Mediterranean at Cap Spartel. The Beat Generation wrote their masterpieces in its cafés. Paul Bowles never left. Matisse called it the most beautiful light in the world.
                <br /><br />
                Tangier is Morocco's most layered, most cosmopolitan, most surprising city — and the only place on earth where Africa and Europe feel like one.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link to="/destinations/tangier" className="btn-primary">Discover Tangier</Link>
                <Link to="/hotels?city=Tangier" style={{ color: '#7db8ff', border: '1.5px solid rgba(125,184,255,0.4)', padding: '0.85rem 2.2rem', borderRadius: 50, fontWeight: 600, fontSize: '0.95rem', textDecoration: 'none', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(125,184,255,0.1)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
                >View Hotels →</Link>
              </div>
            </div>
          </div>

          {/* Highlights grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))', gap: '1.2rem' }}>
            {tangierHighlights.map((h) => (
              <div key={h.title} className="reveal"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(125,184,255,0.12)', borderRadius: 16, padding: '1.4rem', transition: 'all 0.25s', cursor: 'default' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(125,184,255,0.1)'; e.currentTarget.style.borderColor = 'rgba(125,184,255,0.3)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(125,184,255,0.12)' }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '0.6rem' }}>{h.icon}</div>
                <div style={{ fontWeight: 700, marginBottom: '0.4rem', fontSize: '1rem' }}>{h.title}</div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', lineHeight: 1.65 }}>{h.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── WHY US ── */}
      <div style={{ background: '#fff' }}>
        <div className="section">
          <div className="reveal">
            <div className="section-label">Why Morocco Travel</div>
            <h2 className="section-title">Plan Smarter,<br />Travel Deeper</h2>
            <p className="section-subtitle">A free, independent guide to Morocco — practical information first, no hidden fees</p>
          </div>
          <div className="features-grid">
            {[
              { icon: '🗺️', title: 'Practical City Guides', desc: 'When to go, how to get there, what to see and what to eat — for 10 destinations across Morocco.' },
              { icon: '💬', title: 'Ask Us on WhatsApp', desc: 'Send us your dates and plans on WhatsApp and we will help you organise your stay and tours.' },
              { icon: '🔎', title: 'Compare Before You Book', desc: 'Check live prices and availability on trusted platforms like Booking.com and GetYourGuide.' },
              { icon: '🌤️', title: 'Live Weather', desc: 'Current conditions and a 7-day forecast for every city, plus monthly climate averages.' },
              { icon: '🆘', title: 'Safety Information', desc: 'Emergency numbers, hospitals and useful contacts in one place, before you need them.' },
              { icon: '♻️', title: 'Travel Responsibly', desc: 'Tips on etiquette, bargaining and supporting local cooperatives and family-run riads.' },
            ].map((f, i) => (
              <div key={f.title} className="feature-card reveal" style={{ transitionDelay: `${i * 0.07}s` }}>
                <span className="feature-icon">{f.icon}</span>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── QUICK EXPLORE ── */}
      <div style={{ background: 'var(--cream2)' }}>
        <div className="section">
          <div className="reveal">
            <div className="section-label">Everything Morocco</div>
            <h2 className="section-title">Explore Every<br />Corner of the Kingdom</h2>
            <p className="section-subtitle">From Saharan deserts to Atlantic coasts — discover food, culture, transport and more</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.2rem' }}>
            {[
              { to: '/food', icon: '🍲', title: 'Moroccan Food', desc: 'Tagine, Couscous, Pastilla & more' },
              { to: '/culture', icon: '🎉', title: 'Culture & Festivals', desc: 'Music, crafts, customs & etiquette' },
              { to: '/gallery', icon: '📸', title: 'Photo Gallery', desc: 'Morocco through the lens' },
              { to: '/blog', icon: '📖', title: 'Travel Stories', desc: 'Tips, guides & tales from Morocco' },
              { to: '/transport', icon: '✈️', title: 'Transport Guide', desc: 'Airports, trains, buses & ferries' },
              { to: '/weather', icon: '🌤️', title: 'Weather & Climate', desc: 'Best time to visit every city' },
              { to: '/map', icon: '🗺️', title: 'Interactive Map', desc: 'Hotels, attractions & airports' },
              { to: '/trip-planner', icon: '✨', title: 'Trip Planner', desc: 'Build a day-by-day itinerary' },
              { to: '/emergency', icon: '🆘', title: 'Emergency Info', desc: 'Numbers, hospitals & embassies' },
              { to: '/destinations', icon: '📍', title: 'Destinations', desc: 'City guides & travel tips' },
            ].map(item => (
              <Link key={item.to} to={item.to} className="reveal" style={{ background: 'var(--white)', borderRadius: 16, padding: '1.5rem', textDecoration: 'none', color: 'inherit', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', border: '1px solid var(--cream2)', transition: 'all 0.25s', display: 'block' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,0,0,0.12)'; e.currentTarget.style.borderColor = 'var(--gold)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.05)'; e.currentTarget.style.borderColor = 'var(--cream2)' }}
              >
                <div style={{ fontSize: '2.2rem', marginBottom: '0.8rem' }}>{item.icon}</div>
                <div style={{ fontFamily: 'Playfair Display,serif', fontWeight: 700, fontSize: '1rem', marginBottom: '0.3rem', color: 'var(--dark)' }}>{item.title}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text3)', lineHeight: 1.5 }}>{item.desc}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── CONTACT CTA ── */}
      <div className="newsletter-section reveal">
        <div className="section-label" style={{ color: 'var(--gold-light)', justifyContent: 'center' }}>Plan With Us</div>
        <h2>Questions About Your Trip?<br /><em style={{ fontStyle: 'italic', color: 'var(--gold-light)' }}>Message Us on WhatsApp</em></h2>
        <p>Tell us your dates, cities and budget — we reply personally.</p>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ display: 'inline-block', textDecoration: 'none' }}>Chat on WhatsApp</a>
      </div>

    </>
  )
}
