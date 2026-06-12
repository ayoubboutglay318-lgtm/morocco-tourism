import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HotelCard from '../components/HotelCard'
import ThreeHero from '../components/ThreeHero'
import { useApp } from '../context/AppContext'

gsap.registerPlugin(ScrollTrigger)

const cdnImg = path => `https://images.unsplash.com/${path}?w=700&q=85&fit=crop&auto=format`

const cityImages = {
  Marrakech:        cdnImg('photo-1597212618440-806262de4f6b'),
  Fes:              cdnImg('photo-1559925523-10de9e23cf90'),
  Chefchaouen:      cdnImg('photo-1538600838042-6a0c694ffab5'),
  Essaouira:        cdnImg('photo-1624802746702-60ca95bdb605'),
  Merzouga:         cdnImg('photo-1559586616-361e18714958'),
  'Atlas Mountains':cdnImg('photo-1593535988128-7214bc2cbedc'),
  Casablanca:       cdnImg('photo-1548018560-4cb48a8837c1'),
  Tangier:          cdnImg('photo-1533501747004-381b96042e88'),
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
  const [started, setStarted] = useState(false)
  const count = useCountUp(value, 2, started)

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 85%',
      onEnter: () => setStarted(true),
    })
    return () => trigger.kill()
  }, [])

  return (
    <div className="stat-item reveal" ref={ref}>
      <div className="stat-number">{count.toLocaleString()}{suffix}</div>
      <div className="stat-label">{label}</div>
    </div>
  )
}

export default function Home() {
  const { t } = useApp()
  const [hotels, setHotels] = useState([])
  const [cities, setCities] = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [gallery, setGallery] = useState([])
  const [stats, setStats] = useState([])
  const [search, setSearch] = useState('')
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const navigate = useNavigate()

  const heroBgRef = useRef()
  const heroEyebrowRef = useRef()
  const heroH1Ref = useRef()
  const heroSubRef = useRef()
  const heroActionsRef = useRef()
  const heroSearchRef = useRef()

  useEffect(() => {
    axios.get('http://localhost:5000/api/hotels')
      .then(r => setHotels(r.data))
      .catch(err => console.error('Failed to load hotels:', err))

    axios.get('http://localhost:5000/api/cities')
      .then(r => setCities(r.data))
      .catch(err => console.error('Failed to load cities:', err))

    axios.get('http://localhost:5000/api/testimonials')
      .then(r => setTestimonials(r.data))
      .catch(err => console.error('Failed to load testimonials:', err))

    axios.get('http://localhost:5000/api/gallery')
      .then(r => setGallery(r.data))
      .catch(err => console.error('Failed to load gallery:', err))

    axios.get('http://localhost:5000/api/stats')
      .then(r => setStats(r.data))
      .catch(err => console.error('Failed to load stats:', err))
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
  }, [hotels, testimonials, gallery])

  const handleSearch = (e) => {
    e.preventDefault()
    navigate(`/hotels?city=${search}`)
  }

  const hotelCountByCity = (city) => hotels.filter(h => h.city === city).length

  return (
    <>
      {/* ── HERO ── */}
      <section className="hero">
        <ThreeHero />
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

      {/* ── STATS BAND ── */}
      <div className="stats-band">
        <div className="stats-inner">
          {stats.map(s => <StatItem key={s.label} value={s.value} suffix={s.suffix} label={s.label} />)}
        </div>
      </div>

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
            <p className="section-subtitle">Every property verified for authenticity, comfort, and that unmistakable Moroccan magic</p>
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
        <div style={{ position:'absolute', top:'-10%', right:'-5%', width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle, rgba(100,160,255,0.1) 0%, transparent 70%)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:'-10%', left:'-5%', width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle, rgba(201,151,58,0.08) 0%, transparent 70%)', pointerEvents:'none' }} />

        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {/* Header */}
          <div style={{ textAlign:'center', marginBottom:'4rem' }} className="reveal">
            <div className="section-label" style={{ color:'#7db8ff', justifyContent:'center' }}>Featured Destination</div>
            <h2 className="section-title" style={{ color:'#fff', fontSize:'clamp(2rem,4vw,3rem)' }}>
              Tangier — <em style={{ color:'#7db8ff', fontStyle:'italic' }}>Where Two Continents Meet</em>
            </h2>
            <p style={{ color:'rgba(255,255,255,0.55)', maxWidth:580, margin:'0 auto', fontSize:'1.05rem' }}>
              Africa's most cosmopolitan city. 14km from Europe. 3,000 years of history. The city that inspired Matisse, Burroughs and Kerouac.
            </p>
          </div>

          {/* Two-column layout */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'4rem', alignItems:'center', marginBottom:'4rem' }}>
            <div className="reveal-left">
              <div style={{ position:'relative', borderRadius:24, overflow:'hidden', height:440 }}>
                <img
                  src={cdnImg('photo-1533501747004-381b96042e88')}
                  alt="Tangier"
                  style={{ width:'100%', height:'100%', objectFit:'cover' }}
                />
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(6,12,26,0.7) 0%, transparent 50%)' }} />
                <div style={{ position:'absolute', bottom:'1.5rem', left:'1.5rem', right:'1.5rem' }}>
                  <div style={{ display:'flex', gap:'1rem', flexWrap:'wrap' }}>
                    {[['6', 'Hotels'],['12', 'Attractions'],['14km', 'From Europe']].map(([v,l]) => (
                      <div key={l} style={{ background:'rgba(255,255,255,0.12)', backdropFilter:'blur(10px)', borderRadius:12, padding:'0.6rem 1.1rem', textAlign:'center' }}>
                        <div style={{ fontSize:'1.3rem', fontWeight:800, color:'#7db8ff' }}>{v}</div>
                        <div style={{ fontSize:'0.72rem', color:'rgba(255,255,255,0.7)', textTransform:'uppercase', letterSpacing:1 }}>{l}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="reveal-right">
              <p style={{ color:'rgba(255,255,255,0.65)', lineHeight:1.9, fontSize:'1rem', marginBottom:'2rem' }}>
                From the kasbah walls you can see two continents at once. The Atlantic crashes into the Mediterranean at Cap Spartel. The Beat Generation wrote their masterpieces in its cafés. Paul Bowles never left. Matisse called it the most beautiful light in the world.
                <br /><br />
                Tangier is Morocco's most layered, most cosmopolitan, most surprising city — and the only place on earth where Africa and Europe feel like one.
              </p>
              <div style={{ display:'flex', gap:'1rem', flexWrap:'wrap' }}>
                <Link to="/destinations/tangier" className="btn-primary">Discover Tangier</Link>
                <Link to="/hotels?city=Tangier" style={{ color:'#7db8ff', border:'1.5px solid rgba(125,184,255,0.4)', padding:'0.85rem 2.2rem', borderRadius:50, fontWeight:600, fontSize:'0.95rem', textDecoration:'none', transition:'all 0.2s' }}
                  onMouseEnter={e=>{e.currentTarget.style.background='rgba(125,184,255,0.1)'}}
                  onMouseLeave={e=>{e.currentTarget.style.background='transparent'}}
                >View Hotels →</Link>
              </div>
            </div>
          </div>

          {/* Highlights grid */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px,1fr))', gap:'1.2rem' }}>
            {tangierHighlights.map((h, i) => (
              <div key={h.title} className="reveal"
                style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(125,184,255,0.12)', borderRadius:16, padding:'1.4rem', transition:'all 0.25s', cursor:'default' }}
                onMouseEnter={e=>{ e.currentTarget.style.background='rgba(125,184,255,0.1)'; e.currentTarget.style.borderColor='rgba(125,184,255,0.3)' }}
                onMouseLeave={e=>{ e.currentTarget.style.background='rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor='rgba(125,184,255,0.12)' }}
              >
                <div style={{ fontSize:'2rem', marginBottom:'0.6rem' }}>{h.icon}</div>
                <div style={{ fontWeight:700, marginBottom:'0.4rem', fontSize:'1rem' }}>{h.title}</div>
                <div style={{ color:'rgba(255,255,255,0.5)', fontSize:'0.875rem', lineHeight:1.65 }}>{h.desc}</div>
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
            <h2 className="section-title">Your Journey,<br />Perfectly Crafted</h2>
            <p className="section-subtitle">We've been connecting travellers with authentic Moroccan experiences since 2014</p>
          </div>
          <div className="features-grid">
            {[
              { icon: '🏰', title: 'Curated Properties', desc: 'Every riad, kasbah and hotel is personally vetted. No algorithm — only places we\'d stay ourselves.' },
              { icon: '🔐', title: 'Secure Booking', desc: 'Bank-level encryption on every transaction. Your data and payments are always protected.' },
              { icon: '⭐', title: 'Best Price Guarantee', desc: 'Find the same room cheaper elsewhere? We\'ll match it, no questions asked.' },
              { icon: '🌍', title: 'Local Expertise', desc: 'Our team of Moroccan travel experts is available 24/7 with insider tips and real advice.' },
              { icon: '🚀', title: 'Instant Confirmation', desc: 'Book in under 2 minutes. Instant confirmation straight to your inbox every time.' },
              { icon: '♻️', title: 'Responsible Travel', desc: 'We partner with eco-conscious properties and support local Moroccan communities.' },
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

      {/* ── TESTIMONIALS ── */}
      <div style={{ background: 'var(--cream)' }}>
        <div className="section">
          <div className="reveal">
            <div className="section-label">Traveller Stories</div>
            <h2 className="section-title">What Our Guests<br />Are Saying</h2>
            <p className="section-subtitle">Real experiences from travellers who fell in love with Morocco</p>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div key={t.id} className="testimonial-card reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
                <div className="testimonial-stars">{'★'.repeat(t.rating)}</div>
                <p className="testimonial-text">{t.text}</p>
                <div className="testimonial-author">
                  <img src={t.avatar} alt={t.name} className="testimonial-avatar" />
                  <div>
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-country">{t.country}</div>
                    <div className="testimonial-hotel">{t.hotel}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── QUICK EXPLORE ── */}
      <div style={{ background:'var(--cream2)' }}>
        <div className="section">
          <div className="reveal">
            <div className="section-label">Everything Morocco</div>
            <h2 className="section-title">Explore Every<br />Corner of the Kingdom</h2>
            <p className="section-subtitle">From Saharan deserts to Atlantic coasts — discover food, culture, transport and more</p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(200px, 1fr))', gap:'1.2rem' }}>
            {[
              { to:'/food',         icon:'🍲', title:'Moroccan Food',    desc:'Tagine, Couscous, Pastilla & more' },
              { to:'/culture',      icon:'🎉', title:'Culture & Festivals', desc:'Music, crafts, customs & etiquette' },
              { to:'/transport',    icon:'✈️', title:'Transport Guide',  desc:'Airports, trains, buses & ferries' },
              { to:'/weather',      icon:'🌤️', title:'Weather & Climate', desc:'Best time to visit every city' },
              { to:'/map',          icon:'🗺️', title:'Interactive Map',  desc:'Hotels, attractions & airports' },
              { to:'/trip-planner', icon:'✨', title:'AI Trip Planner',  desc:'Build your perfect itinerary' },
              { to:'/emergency',    icon:'🆘', title:'Emergency Info',   desc:'Numbers, hospitals & embassies' },
              { to:'/destinations', icon:'📍', title:'Destinations',     desc:'City guides & travel tips' },
            ].map(item => (
              <Link key={item.to} to={item.to} className="reveal" style={{ background:'var(--white)', borderRadius:16, padding:'1.5rem', textDecoration:'none', color:'inherit', boxShadow:'0 2px 12px rgba(0,0,0,0.05)', border:'1px solid var(--cream2)', transition:'all 0.25s', display:'block' }}
                onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='0 8px 28px rgba(0,0,0,0.12)'; e.currentTarget.style.borderColor='var(--gold)' }}
                onMouseLeave={e=>{ e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='0 2px 12px rgba(0,0,0,0.05)'; e.currentTarget.style.borderColor='var(--cream2)' }}
              >
                <div style={{ fontSize:'2.2rem', marginBottom:'0.8rem' }}>{item.icon}</div>
                <div style={{ fontFamily:'Playfair Display,serif', fontWeight:700, fontSize:'1rem', marginBottom:'0.3rem', color:'var(--dark)' }}>{item.title}</div>
                <div style={{ fontSize:'0.8rem', color:'var(--text3)', lineHeight:1.5 }}>{item.desc}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── NEWSLETTER ── */}
      <div className="newsletter-section reveal">
        <div className="section-label" style={{ color: 'var(--gold-light)', justifyContent: 'center' }}>Stay Inspired</div>
        <h2>Get Morocco Travel Inspiration<br /><em style={{ fontStyle: 'italic', color: 'var(--gold-light)' }}>Delivered to You</em></h2>
        <p>Hidden riads, secret desert camps, local festivals — straight to your inbox. No spam, ever.</p>
        {subscribed ? (
          <div style={{ color: '#7ecf7e', fontSize: '1.1rem', fontWeight: 600 }}>✓ You're on the list — get ready to explore Morocco!</div>
        ) : (
          <form className="newsletter-form" onSubmit={e => { e.preventDefault(); setSubscribed(true) }}>
            <input
              type="email"
              placeholder="Your email address"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <button type="submit" className="btn-primary">Subscribe</button>
          </form>
        )}
      </div>

      {/* ── FOOTER ── */}
      <footer>
        <div className="footer-inner">
          <div>
            <div className="footer-brand-name">Morocco<span>Travel</span></div>
            <p className="footer-desc">Your trusted guide to the Kingdom of Morocco. Curated hotels, authentic experiences, and the warmest hospitality on earth.</p>
          </div>
          <div className="footer-col">
            <h4>Destinations</h4>
            <ul>
              {['Marrakech', 'Fes', 'Chefchaouen', 'Essaouira', 'Merzouga', 'Tangier'].map(c => (
                <li key={c}><Link to={`/hotels?city=${c}`}>{c}</Link></li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h4>Explore</h4>
            <ul>
              <li><Link to="/hotels">All Hotels</Link></li>
              <li><Link to="/destinations">Destinations</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Info</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 <span>MoroccoTravel</span>. All rights reserved.</span>
          <span>Made with ♥ for Morocco</span>
        </div>
      </footer>
    </>
  )
}
