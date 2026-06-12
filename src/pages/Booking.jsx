import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Booking() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [hotel, setHotel] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', checkIn: '', checkOut: '', guests: 1 })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    axios.get(`http://localhost:5000/api/hotels/${id}`).then(r => setHotel(r.data))
  }, [id])

  const nights = form.checkIn && form.checkOut
    ? Math.max(0, Math.ceil((new Date(form.checkOut) - new Date(form.checkIn)) / 86400000))
    : 0
  const total = hotel ? nights * hotel.price : 0

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (nights <= 0) { setError('Check-out must be after check-in.'); return }
    setSubmitting(true)
    try {
      const res = await axios.post('http://localhost:5000/api/bookings', { hotelId: id, ...form })
      navigate('/booking-success', { state: { booking: res.data } })
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong.')
      setSubmitting(false)
    }
  }

  if (!hotel) return <div className="loading">Loading...</div>

  return (
    <div className="booking-page">
      <Link to={`/hotels/${id}`} className="back-link">← Back to Hotel</Link>
      <h1>Book Your Stay</h1>
      <p className="booking-hotel-name">{hotel.name} — {hotel.city}</p>

      <div className="booking-form">
        {error && <div className="error-msg">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input name="name" required placeholder="Ahmed El Mansouri" value={form.name} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input name="email" type="email" required placeholder="you@example.com" value={form.email} onChange={handleChange} />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Check-In</label>
              <input name="checkIn" type="date" required value={form.checkIn} onChange={handleChange} min={new Date().toISOString().split('T')[0]} />
            </div>
            <div className="form-group">
              <label>Check-Out</label>
              <input name="checkOut" type="date" required value={form.checkOut} onChange={handleChange} min={form.checkIn || new Date().toISOString().split('T')[0]} />
            </div>
          </div>
          <div className="form-group">
            <label>Guests</label>
            <select name="guests" value={form.guests} onChange={handleChange}>
              {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} guest{n > 1 ? 's' : ''}</option>)}
            </select>
          </div>

          {nights > 0 && (
            <div className="booking-summary">
              <h3>Booking Summary</h3>
              <div className="summary-row"><span>Hotel</span><span>{hotel.name}</span></div>
              <div className="summary-row"><span>Price per night</span><span>${hotel.price}</span></div>
              <div className="summary-row"><span>Nights</span><span>{nights}</span></div>
              <div className="summary-row"><span>Guests</span><span>{form.guests}</span></div>
              <div className="summary-row total"><span>Total</span><span>${total}</span></div>
            </div>
          )}

          <button type="submit" className="btn-primary" style={{width:'100%', padding:'0.9rem', fontSize:'1.05rem'}} disabled={submitting}>
            {submitting ? 'Booking...' : 'Confirm Booking'}
          </button>
        </form>
      </div>
    </div>
  )
}
