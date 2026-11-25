import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { whatsappLink, bookingSearchUrl } from '../config'

// Stay request: this site does not take bookings or payments itself.
// The form builds a WhatsApp message to the Morocco Travel team, and links to live prices on Booking.com.
export default function Booking() {
  const { id } = useParams()
  const [hotel, setHotel] = useState(null)
  const [notFound, setNotFound] = useState(false)
  const [form, setForm] = useState({ name: '', checkIn: '', checkOut: '', guests: 2, notes: '' })
  const [error, setError] = useState('')

  useEffect(() => {
    axios.get(`/api/hotels/${id}`).then(r => setHotel(r.data)).catch(() => setNotFound(true))
  }, [id])

  const today = new Date().toISOString().split('T')[0]
  const nights = form.checkIn && form.checkOut
    ? Math.max(0, Math.round((new Date(form.checkOut) - new Date(form.checkIn)) / 86400000))
    : 0

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = e => {
    e.preventDefault()
    setError('')
    if (nights <= 0) { setError('Check-out must be after check-in.'); return }
    const message = [
      `Hello! I'd like to ask about a stay at ${hotel.name} (${hotel.city}).`,
      `Name: ${form.name}`,
      `Dates: ${form.checkIn} → ${form.checkOut} (${nights} night${nights > 1 ? 's' : ''})`,
      `Guests: ${form.guests}`,
      form.notes && `Notes: ${form.notes}`,
    ].filter(Boolean).join('\n')
    window.open(whatsappLink(message), '_blank', 'noopener,noreferrer')
  }

  if (notFound) return <div className="loading">Hotel not found. <Link to="/hotels">Browse hotels</Link></div>
  if (!hotel) return <div className="loading">Loading...</div>

  return (
    <div className="booking-page">
      <Link to={`/hotels/${id}`} className="back-link">← Back to Hotel</Link>
      <h1>Ask About Your Stay</h1>
      <p className="booking-hotel-name">{hotel.name} — {hotel.city}</p>

      <div className="booking-form">
        <p style={{ fontSize: '0.9rem', color: 'var(--text3)', marginBottom: '1.2rem', lineHeight: 1.6 }}>
          Send us your dates on WhatsApp and we will reply personally with availability and options.
          This is a request, not a booking: nothing is reserved or charged until you confirm with us.
        </p>
        {error && <div className="error-msg">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="bk-name">Your Name</label>
            <input id="bk-name" name="name" required placeholder="Your full name" value={form.name} onChange={handleChange} />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="bk-in">Check-In</label>
              <input id="bk-in" name="checkIn" type="date" required value={form.checkIn} onChange={handleChange} min={today} />
            </div>
            <div className="form-group">
              <label htmlFor="bk-out">Check-Out</label>
              <input id="bk-out" name="checkOut" type="date" required value={form.checkOut} onChange={handleChange} min={form.checkIn || today} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="bk-guests">Guests</label>
            <select id="bk-guests" name="guests" value={form.guests} onChange={handleChange}>
              {[1, 2, 3, 4, 5, 6, 7, 8].map(n => <option key={n} value={n}>{n} guest{n > 1 ? 's' : ''}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="bk-notes">Anything else? (optional)</label>
            <textarea id="bk-notes" name="notes" rows={3} placeholder="Airport transfer, desert tour, budget…" value={form.notes} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', borderRadius: 10, border: '1px solid var(--cream2)', font: 'inherit' }} />
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', padding: '0.9rem', fontSize: '1.05rem' }}>
            Send Request on WhatsApp
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.2rem', fontSize: '0.88rem', color: 'var(--text3)' }}>
          Prefer to book yourself?{' '}
          <a href={bookingSearchUrl(`${hotel.name} ${hotel.city} Morocco`)} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)', fontWeight: 600 }}>
            Check live prices on Booking.com
          </a>
        </div>
      </div>
    </div>
  )
}
