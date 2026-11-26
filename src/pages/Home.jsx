import { useEffect, lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { whatsappLink, WHATSAPP_URL } from '../config'
import './Home.css'

// The 3D sky is decorative: load it after the page so text appears first
const ThreeHero = lazy(() => import('../components/ThreeHero'))

const img = path => `https://images.unsplash.com/${path}?w=800&q=80&fit=crop&auto=format`

const TOURS = [
  {
    title: 'City Tours',
    length: 'Half day or full day',
    image: img('photo-1597212618440-806262de4f6b'),
    desc: 'Walk the medinas of Marrakech, Fes, Tangier or Chefchaouen with a local. Hidden alleys, souks, palaces and the best places to eat.',
    includes: ['Walking tour of the old town', 'Main monuments & hidden corners', 'Local food stops'],
  },
  {
    title: 'Sahara Desert Trip',
    length: '2 to 4 days',
    image: img('photo-1559586616-361e18714958'),
    desc: 'Cross the Atlas Mountains, visit Aït Benhaddou and the Dades Gorges, then ride camels into the dunes of Merzouga and sleep under the stars.',
    includes: ['Atlas Mountains & kasbahs', 'Camel ride at sunset', 'Night in a desert camp'],
  },
  {
    title: 'Atlas Mountains Day Trip',
    length: '1 day',
    image: img('photo-1593535988128-7214bc2cbedc'),
    desc: 'Escape the city to Berber villages, waterfalls and mountain views — Imlil, the Ourika Valley or a gentle hike in Toubkal National Park.',
    includes: ['Berber village visit', 'Easy hike with views', 'Tea with a local family'],
  },
  {
    title: 'Imperial Cities',
    length: '5 to 7 days',
    image: img('photo-1559925523-10de9e23cf90'),
    desc: "Morocco's four royal capitals — Rabat, Meknes, Fes and Marrakech — with their palaces, mosques, gardens and ancient medinas.",
    includes: ['Rabat, Meknes, Fes, Marrakech', 'Volubilis Roman ruins', 'Guided medina visits'],
  },
  {
    title: 'The North: Tangier & Chefchaouen',
    length: '2 to 4 days',
    image: img('photo-1538600838042-6a0c694ffab5'),
    desc: 'Where Africa meets Europe: the kasbah of Tangier, Cap Spartel, Tetouan and the blue streets of Chefchaouen in the Rif Mountains.',
    includes: ['Tangier kasbah & Cap Spartel', 'The blue city of Chefchaouen', 'Akchour waterfalls (optional)'],
  },
  {
    title: 'Grand Tour of Morocco',
    length: '10 to 14 days',
    image: img('photo-1624802746702-60ca95bdb605'),
    desc: 'See the whole country in one journey: the north, the imperial cities, the Sahara, the Atlas and the Atlantic coast at Essaouira.',
    includes: ['North to south in one trip', 'Desert, mountains & coast', 'Planned around your pace'],
  },
]

const PLACES = [
  { name: 'Marrakech', slug: 'marrakech', image: img('photo-1597212618440-806262de4f6b') },
  { name: 'Fes', slug: 'fes', image: img('photo-1559925523-10de9e23cf90') },
  { name: 'Chefchaouen', slug: 'chefchaouen', image: img('photo-1538600838042-6a0c694ffab5') },
  { name: 'Sahara (Merzouga)', slug: 'merzouga', image: img('photo-1559586616-361e18714958') },
  { name: 'Tangier', slug: 'tangier', image: img('photo-1533501747004-381b96042e88') },
  { name: 'Atlas Mountains', slug: 'atlas-mountains', image: img('photo-1593535988128-7214bc2cbedc') },
  { name: 'Essaouira', slug: 'essaouira', image: img('photo-1624802746702-60ca95bdb605') },
  { name: 'Casablanca', slug: 'casablanca', image: img('photo-1548018560-4cb48a8837c1') },
]

const WHY = [
  { icon: '🇲🇦', title: 'A Real Local', desc: 'I live in Morocco. You get the places, food and stories that tourists usually miss.' },
  { icon: '🧭', title: 'Your Trip, Your Way', desc: 'No fixed packages. We plan the route, the pace and the budget together.' },
  { icon: '🛡️', title: 'Travel With Confidence', desc: 'No getting lost, no tourist traps, no stress with prices — I take care of it.' },
  { icon: '💬', title: 'Easy to Reach', desc: 'Message me on WhatsApp before and during your trip. I reply personally.' },
]

const STEPS = [
  { n: '1', title: 'Message me', desc: 'Send me your dates, how many people you are, and what you would like to see.' },
  { n: '2', title: 'We plan together', desc: 'I suggest a route and a price. We adjust it until it is exactly right for you.' },
  { n: '3', title: 'Enjoy Morocco', desc: 'I meet you and guide you — you just relax and enjoy the journey.' },
]

const tourMessage = title => `Hello! I'm interested in the "${title}" tour. Can you tell me more?`

// Fade sections in as they scroll into view. If anything goes wrong, everything stays visible.
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.g-reveal')
    if (!('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('is-visible'))
      return
    }
    document.documentElement.classList.add('g-reveal-ready')
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target) }
      })
    }, { rootMargin: '0px 0px -8% 0px' })
    els.forEach(el => io.observe(el))
    return () => { io.disconnect(); document.documentElement.classList.remove('g-reveal-ready') }
  }, [])
}

export default function Home() {
  useReveal()

  return (
    <>
      {/* ── HERO ── */}
      <section className="hero guide-hero">
        <Suspense fallback={null}><ThreeHero /></Suspense>
        <div className="hero-bg" style={{ opacity: 0.18 }} />
        <div className="hero-overlay" />
        <div className="hero-content guide-hero-content">
          <div className="hero-eyebrow">Your Local Guide in Morocco</div>
          <h1>Discover Morocco<br />with a <em>Local Guide</em></h1>
          <p className="hero-subtitle">
            Visiting Morocco or travelling around the country? I'll show you the real Morocco — medinas, mountains, the Sahara and the coast — on a trip planned just for you.
          </p>
          <div className="hero-actions">
            <a href={whatsappLink('Hello! I would like to book you as my guide in Morocco.')} target="_blank" rel="noopener noreferrer" className="btn-primary">Book Your Guide</a>
            <a href="#tours" className="btn-secondary">See My Tours</a>
          </div>
        </div>
        <div className="hero-scroll">
          <div className="scroll-line" />
          Scroll
        </div>
      </section>

      {/* ── TRUST STRIP ── */}
      <div className="guide-strip">
        <div className="guide-strip-inner">
          <div><span>👥</span>Private tours for you and your group</div>
          <div><span>🗺️</span>Cities, mountains, desert &amp; coast</div>
          <div><span>📅</span>From a half day to two weeks</div>
          <div><span>💬</span>Book directly on WhatsApp</div>
        </div>
      </div>

      {/* ── ABOUT ME ── */}
      <div className="section guide-about">
        <div className="guide-about-img g-reveal">
          <img src={img('photo-1618423205267-e95744f57edf')} alt="Morocco landscape" loading="lazy" />
        </div>
        <div className="guide-about-text g-reveal">
          <div className="section-label">About Me</div>
          <h2 className="section-title">Salam, welcome<br />to my country</h2>
          <p>
            I'm a Moroccan guide, and nothing makes me happier than showing visitors the Morocco I know — the busy souks, the quiet mountain villages, the endless dunes and the warm people you meet along the way.
          </p>
          <p>
            Whether you come for a weekend in Marrakech or want to cross the whole country, I'll plan the trip with you, guide you on the ground and make sure you feel at home from the first day to the last.
          </p>
          <div className="hero-actions" style={{ justifyContent: 'flex-start', marginTop: '1.5rem' }}>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">Say Hello on WhatsApp</a>
          </div>
        </div>
      </div>

      {/* ── TOURS ── */}
      <div className="guide-tours-bg" id="tours">
        <div className="section">
          <div className="g-reveal">
            <div className="section-label">My Tours</div>
            <h2 className="section-title">Trips I Can<br />Guide You On</h2>
            <p className="section-subtitle">Every tour is private and can be changed to fit your days, your interests and your budget.</p>
          </div>
          <div className="guide-tours-grid">
            {TOURS.map(t => (
              <article key={t.title} className="guide-tour-card g-reveal">
                <div className="guide-tour-img">
                  <img src={t.image} alt={t.title} loading="lazy" />
                  <span className="guide-tour-length">⏱ {t.length}</span>
                </div>
                <div className="guide-tour-body">
                  <h3>{t.title}</h3>
                  <p>{t.desc}</p>
                  <ul>{t.includes.map(i => <li key={i}>{i}</li>)}</ul>
                  <div className="guide-tour-footer">
                    <span className="guide-tour-price">Price on request</span>
                    <a href={whatsappLink(tourMessage(t.title))} target="_blank" rel="noopener noreferrer" className="btn-primary guide-tour-btn">Ask About This Tour</a>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="guide-custom g-reveal">
            <div>
              <h3>Want something different?</h3>
              <p>Tell me what you dream of seeing and I'll build a custom trip around it.</p>
            </div>
            <a href={whatsappLink('Hello! I would like a custom trip in Morocco.')} target="_blank" rel="noopener noreferrer" className="btn-primary">Plan a Custom Trip</a>
          </div>
        </div>
      </div>

      {/* ── WHERE I GUIDE ── */}
      <div className="section">
        <div className="g-reveal">
          <div className="section-label">Where I Guide</div>
          <h2 className="section-title">Explore All<br />of Morocco</h2>
          <p className="section-subtitle">From the rose-red walls of Marrakech to the silence of the Sahara — click a place to learn more about it.</p>
        </div>
        <div className="guide-places-grid">
          {PLACES.map(p => (
            <Link key={p.slug} to={`/destinations/${p.slug}`} className="city-card g-reveal">
              <img src={p.image} alt={p.name} loading="lazy" />
              <div className="city-card-overlay">
                <div className="city-card-name">{p.name}</div>
                <div className="city-card-count">Read the guide →</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── WHY ME ── */}
      <div className="guide-why-bg">
        <div className="section">
          <div className="g-reveal">
            <div className="section-label">Why Travel With Me</div>
            <h2 className="section-title">More Than a Tour —<br />a Friend in Morocco</h2>
          </div>
          <div className="features-grid guide-why-grid">
            {WHY.map(f => (
              <div key={f.title} className="feature-card g-reveal">
                <span className="feature-icon">{f.icon}</span>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <div className="section">
        <div className="g-reveal" style={{ textAlign: 'center' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>How It Works</div>
          <h2 className="section-title">Booking Is Simple</h2>
        </div>
        <div className="guide-steps">
          {STEPS.map(s => (
            <div key={s.n} className="guide-step g-reveal">
              <div className="guide-step-num">{s.n}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── FINAL CTA ── */}
      <div className="newsletter-section">
        <div className="section-label" style={{ color: 'var(--gold-light)', justifyContent: 'center' }}>Ready When You Are</div>
        <h2>Ready for Your Trip<br /><em style={{ fontStyle: 'italic', color: 'var(--gold-light)' }}>to Morocco?</em></h2>
        <p>Send me your dates and ideas — I'll reply personally and we'll plan it together.</p>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ display: 'inline-block', textDecoration: 'none' }}>Chat on WhatsApp</a>
      </div>
    </>
  )
}
