import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import axios from 'axios'
import { useApp } from '../context/AppContext'

gsap.registerPlugin(ScrollTrigger)

export default function Favorites() {
  const { favorites, toggleFavorite, convertPrice } = useApp()
  const [hotels, setHotels] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('/api/hotels')
      .then(r => {
        setHotels(r.data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load hotels:', err)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    const reveals = gsap.utils.toArray('.favorites-page .fav-card')
    reveals.forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
          delay: i * 0.08,
          scrollTrigger: { trigger: el, start: 'top 92%' },
        }
      )
    })
    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [hotels, favorites])

  const favoriteHotels = hotels.filter(h => favorites.includes(h.id))

  if (loading) {
    return (
      <div className="favorites-page">
        <section className="fav-hero">
          <div className="fav-hero-bg" />
          <div className="fav-hero-overlay" />
          <div className="fav-hero-content">
            <h1>Loading...</h1>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="favorites-page">
      {/* Hero */}
      <section className="fav-hero">
        <div className="fav-hero-bg" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1624802746702-60ca95bdb605?w=1600&q=80&fit=crop)` }} />
        <div className="fav-hero-overlay" />
        <div className="fav-hero-content">
          <div className="section-label" style={{ color: 'var(--gold-light)', justifyContent: 'center' }}>Your Wishlist</div>
          <h1>Saved<br /><em>Destinations</em></h1>
          <p>Your handpicked collection of Moroccan hotels and riads</p>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="fav-stats-bar">
        <div className="fav-stat">
          <span className="fav-stat-number">{favoriteHotels.length}</span>
          <span className="fav-stat-label">Saved Hotels</span>
        </div>
        <div className="fav-stat">
          <span className="fav-stat-number">{[...new Set(favoriteHotels.map(h => h.city))].length}</span>
          <span className="fav-stat-label">Cities</span>
        </div>
        <div className="fav-stat">
          <span className="fav-stat-number">
            {favoriteHotels.length > 0 ? convertPrice(Math.min(...favoriteHotels.map(h => h.price))) : '—'}
          </span>
          <span className="fav-stat-label">Lowest Price</span>
        </div>
      </div>

      {/* Favorites Grid */}
      {favoriteHotels.length > 0 ? (
        <div className="fav-grid">
          {favoriteHotels.map(hotel => (
            <div key={hotel.id} className="fav-card">
              <div className="fav-card-img">
                <img src={hotel.image} alt={hotel.name} />
                <button
                  className="fav-card-remove"
                  onClick={(e) => { e.preventDefault(); toggleFavorite(hotel.id) }}
                  title="Remove from favorites"
                >
                  ♥
                </button>
                {hotel.badge && <div className="fav-card-badge">{hotel.badge}</div>}
              </div>
              <div className="fav-card-body">
                <div className="fav-card-stars">
                  {'★'.repeat(hotel.stars)}{'☆'.repeat(5 - hotel.stars)}
                </div>
                <h3>{hotel.name}</h3>
                <div className="fav-card-location">📍 {hotel.city}</div>
                <p className="fav-card-desc">{hotel.description.substring(0, 120)}...</p>
                <div className="fav-card-footer">
                  <div className="fav-card-price">
                    <span className="fav-price-label">From</span>
                    <span className="fav-price-value">{convertPrice(hotel.price)}</span>
                    <span className="fav-price-label">/ night</span>
                  </div>
                  <div className="fav-card-rating">
                    <span className="fav-rating-score">{hotel.rating}</span>
                    <span className="fav-rating-count">{hotel.reviews} reviews</span>
                  </div>
                </div>
                <div className="fav-card-actions">
                  <Link to={`/hotels/${hotel.id}`} className="btn-primary" style={{ flex: 1, textAlign: 'center', fontSize: '0.85rem', padding: '0.7rem' }}>View Details</Link>
                  <Link to={`/hotels/${hotel.id}/book`} className="btn-secondary" style={{ flex: 1, textAlign: 'center', fontSize: '0.85rem', padding: '0.7rem' }}>Book Now</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="fav-empty">
          <div className="fav-empty-icon">♡</div>
          <h2>Your wishlist is empty</h2>
          <p>Start exploring Morocco's finest hotels and save your favorites here.</p>
          <Link to="/hotels" className="btn-primary" style={{ marginTop: '1.5rem' }}>Browse Hotels</Link>
        </div>
      )}
    </div>
  )
}
