import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { gsap } from 'gsap'
import axios from 'axios'
import { AffiliateLinks, AdBanner } from '../components/Monetization'
import HotelImage from '../components/HotelImage'
import Seo from '../components/Seo'
import { whatsappLink, AD_SLOTS } from '../config'

export default function HotelDetail() {
  const { id } = useParams()
  const [hotel, setHotel] = useState(null)
  const [loading, setLoading] = useState(true)
  const imgRef = useRef()
  const contentRef = useRef()

  useEffect(() => {
    axios.get(`/api/hotels/${id}`)
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
      <Seo
        title={`${hotel.name}, ${hotel.city}`}
        description={`${hotel.name} in ${hotel.city}: ${hotel.stars}-star ${hotel.badge ? hotel.badge.toLowerCase() + ' — ' : ''}${hotel.description.slice(0, 120)}…`}
        image={hotel.image || undefined}
      />
      <Link to="/hotels" className="back-link">← All Hotels</Link>

      <div className="hotel-detail-hero" ref={imgRef} style={{ position: 'relative' }}>
        <HotelImage hotel={hotel} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>

      <div ref={contentRef}>
        <div className="hotel-detail-header">
          <div>
            <span className="badge-city">{hotel.city}</span>
            <h1 style={{ marginTop: '0.6rem' }}>{hotel.name}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', margin: '0.6rem 0' }}>
              <span style={{ color: 'var(--gold)', fontSize: '1.1rem' }} title={`${hotel.stars}-star hotel`}>{'★'.repeat(hotel.stars)}</span>
              <span style={{ color: 'var(--text3)', fontSize: '0.9rem' }}>{hotel.stars}-star{hotel.rooms ? ` · ${hotel.rooms} rooms` : ''}</span>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="hotel-detail-price" title="Approximate price range">{hotel.priceLevel}</div>
            <div style={{ color: 'var(--text3)', fontSize: '0.85rem', marginBottom: '1rem' }}>Approximate price range — prices vary by date</div>
            <Link to={`/hotels/${hotel.id}/book`} className="btn-primary" style={{ fontSize: '1rem' }}>Ask About This Hotel →</Link>
          </div>
        </div>

        <p className="hotel-detail-desc">{hotel.description}</p>

        <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem' }}>What's Included</h3>
        <div className="amenities">
          {hotel.amenities.map(a => (
            <span key={a} className="amenity-tag">✓ {a}</span>
          ))}
        </div>

        {/* Affiliate Booking Options (Monetization) */}
        <AffiliateLinks hotel={hotel} />

        <div style={{ margin: '1.5rem 0' }}>
          <AdBanner slot={AD_SLOTS.hotel} />
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
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.3rem' }}>Questions about {hotel.name}?</div>
            <div style={{ color: 'var(--text3)', fontSize: '0.9rem' }}>Send us your dates on WhatsApp and we will help you plan your stay.</div>
          </div>
          <a href={whatsappLink(`Hello! I'm interested in ${hotel.name} (${hotel.city}). Can you help me?`)} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: '1.05rem', padding: '0.9rem 2.8rem' }}>Chat on WhatsApp</a>
        </div>
      </div>
    </div>
  )
}
