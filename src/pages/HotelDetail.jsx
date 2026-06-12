import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { gsap } from 'gsap'
import axios from 'axios'

export default function HotelDetail() {
  const { id } = useParams()
  const [hotel, setHotel] = useState(null)
  const [loading, setLoading] = useState(true)
  const imgRef = useRef()
  const contentRef = useRef()

  useEffect(() => {
    axios.get(`http://localhost:5000/api/hotels/${id}`)
      .then(r => { setHotel(r.data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [id])

  useEffect(() => {
    if (!hotel) return
    gsap.fromTo(imgRef.current, { scale: 1.08, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: 'power3.out' })
    gsap.fromTo(contentRef.current.children, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out', delay: 0.3 })
  }, [hotel])

  if (loading) return <div className="loading">Loading...</div>
  if (!hotel) return <div className="loading">Hotel not found.</div>

  return (
    <div className="hotel-detail">
      <Link to="/hotels" className="back-link">← All Hotels</Link>

      <div className="hotel-detail-hero" ref={imgRef}>
        <img src={hotel.image} alt={hotel.name} />
      </div>

      <div ref={contentRef}>
        <div className="hotel-detail-header">
          <div>
            <span className="badge-city">{hotel.city}</span>
            <h1 style={{ marginTop: '0.6rem' }}>{hotel.name}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', margin: '0.6rem 0' }}>
              <span style={{ color: 'var(--gold)', fontSize: '1.1rem' }}>{'★'.repeat(Math.round(hotel.rating))}</span>
              <span style={{ color: 'var(--text3)', fontSize: '0.9rem' }}>{hotel.rating} / 5 · {hotel.rooms} rooms</span>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="hotel-detail-price">${hotel.price} <span>/ night</span></div>
            <div style={{ color: 'var(--text3)', fontSize: '0.85rem', marginBottom: '1rem' }}>Taxes & fees included</div>
            <Link to={`/hotels/${hotel.id}/book`} className="btn-primary" style={{ fontSize: '1rem' }}>Book Now →</Link>
          </div>
        </div>

        <p className="hotel-detail-desc">{hotel.description}</p>

        <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem' }}>What's Included</h3>
        <div className="amenities">
          {hotel.amenities.map(a => (
            <span key={a} className="amenity-tag">✓ {a}</span>
          ))}
        </div>

        <div style={{
          background: 'var(--cream2)',
          borderRadius: 20,
          padding: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
          marginTop: '2rem',
        }}>
          <div>
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.3rem' }}>Ready to book {hotel.name}?</div>
            <div style={{ color: 'var(--text3)', fontSize: '0.9rem' }}>Free cancellation on most rates · Instant confirmation</div>
          </div>
          <Link to={`/hotels/${hotel.id}/book`} className="btn-primary" style={{ fontSize: '1.05rem', padding: '0.9rem 2.8rem' }}>Reserve Your Stay</Link>
        </div>
      </div>
    </div>
  )
}
