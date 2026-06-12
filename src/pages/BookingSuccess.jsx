import { useLocation, Link } from 'react-router-dom'

export default function BookingSuccess() {
  const { state } = useLocation()
  const booking = state?.booking

  return (
    <div className="success-page">
      <div className="success-icon">✅</div>
      <h1>Booking Confirmed!</h1>
      <p>Your stay in Morocco has been reserved. We'll send a confirmation to your email.</p>

      {booking && (
        <div className="success-card">
          <div style={{marginBottom:'1rem', fontWeight:700, fontSize:'1.1rem'}}>Booking #{booking.id}</div>
          <div className="summary-row" style={{display:'flex', justifyContent:'space-between', padding:'0.4rem 0', borderBottom:'1px solid #f0ebe3'}}>
            <span style={{color:'#888'}}>Hotel</span><span style={{fontWeight:600}}>{booking.hotelName}</span>
          </div>
          <div className="summary-row" style={{display:'flex', justifyContent:'space-between', padding:'0.4rem 0', borderBottom:'1px solid #f0ebe3'}}>
            <span style={{color:'#888'}}>Guest</span><span>{booking.name}</span>
          </div>
          <div className="summary-row" style={{display:'flex', justifyContent:'space-between', padding:'0.4rem 0', borderBottom:'1px solid #f0ebe3'}}>
            <span style={{color:'#888'}}>Check-In</span><span>{booking.checkIn}</span>
          </div>
          <div className="summary-row" style={{display:'flex', justifyContent:'space-between', padding:'0.4rem 0', borderBottom:'1px solid #f0ebe3'}}>
            <span style={{color:'#888'}}>Check-Out</span><span>{booking.checkOut}</span>
          </div>
          <div className="summary-row" style={{display:'flex', justifyContent:'space-between', padding:'0.4rem 0', borderBottom:'1px solid #f0ebe3'}}>
            <span style={{color:'#888'}}>Nights</span><span>{booking.nights}</span>
          </div>
          <div className="summary-row" style={{display:'flex', justifyContent:'space-between', padding:'0.6rem 0', fontWeight:700, fontSize:'1.1rem'}}>
            <span>Total Paid</span><span style={{color:'#f4a830'}}>${booking.total}</span>
          </div>
        </div>
      )}

      <Link to="/" className="btn-primary" style={{marginRight:'1rem'}}>Back to Home</Link>
      <Link to="/hotels" className="btn-secondary">Browse More Hotels</Link>
    </div>
  )
}
