import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function HotelCard({ hotel }) {
  const { toggleFavorite, favorites } = useApp()
  const isFav = favorites.includes(hotel.id)
  const cardRef = useRef()
  const glowRef = useRef()

  const onMove = (e) => {
    const r = cardRef.current.getBoundingClientRect()
    const x = e.clientX - r.left, y = e.clientY - r.top
    const cx = r.width / 2, cy = r.height / 2
    cardRef.current.style.transform = `perspective(900px) rotateX(${((y-cy)/cy)*-8}deg) rotateY(${((x-cx)/cx)*8}deg) translateZ(10px) scale(1.02)`
    cardRef.current.style.transition = 'transform 0.05s linear'
    if (glowRef.current) { glowRef.current.style.left=`${x}px`; glowRef.current.style.top=`${y}px`; glowRef.current.style.opacity='1' }
  }
  const onLeave = () => {
    cardRef.current.style.transform = 'perspective(900px) rotateX(0) rotateY(0) translateZ(0) scale(1)'
    cardRef.current.style.transition = 'transform 0.5s cubic-bezier(0.4,0,0.2,1)'
    if (glowRef.current) glowRef.current.style.opacity = '0'
  }

  return (
    <Link to={`/hotels/${hotel.id}`} className="hotel-card" ref={cardRef} onMouseMove={onMove} onMouseLeave={onLeave} style={{ position:'relative', overflow:'hidden', willChange:'transform' }}>

      {/* Cursor glow */}
      <div ref={glowRef} style={{ position:'absolute', width:200, height:200, borderRadius:'50%', background:'radial-gradient(circle, rgba(201,151,58,0.22) 0%, transparent 70%)', transform:'translate(-50%,-50%)', pointerEvents:'none', zIndex:5, opacity:0, transition:'opacity 0.3s' }} />

      {/* Image */}
      <div className="hotel-card-img-wrap">
        <img src={hotel.image} alt={hotel.name} className="hotel-card-img" loading="lazy" />

        {/* Stars overlay */}
        <div style={{ position:'absolute', top:12, left:12, background:'rgba(15,8,0,0.72)', backdropFilter:'blur(8px)', borderRadius:20, padding:'0.28rem 0.75rem', display:'flex', alignItems:'center', gap:3 }}>
          {Array.from({ length: hotel.stars }).map((_,i) => (
            <span key={i} style={{ color:'#f4c06f', fontSize:'0.7rem' }}>★</span>
          ))}
        </div>

        {/* Favorite button */}
        <button onClick={e => { e.preventDefault(); toggleFavorite(hotel.id) }} style={{ position:'absolute', top:12, right:12, background:'rgba(15,8,0,0.6)', backdropFilter:'blur(8px)', border:'none', borderRadius:'50%', width:34, height:34, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', fontSize:'1rem', zIndex:6 }}>
          {isFav ? '❤️' : '🤍'}
        </button>

        {/* Badge */}
        {hotel.badge && (
          <div style={{ position:'absolute', bottom:12, left:12, right:12, background:'rgba(201,151,58,0.92)', backdropFilter:'blur(6px)', borderRadius:8, padding:'0.3rem 0.75rem', color:'#0f0800', fontSize:'0.72rem', fontWeight:800, letterSpacing:'0.5px', textAlign:'center', textTransform:'uppercase' }}>
            {hotel.badge}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="hotel-card-body">
        <div className="hotel-card-city">{hotel.city}</div>
        <div className="hotel-card-name">{hotel.name}</div>

        {/* Rating row */}
        <div style={{ display:'flex', alignItems:'center', gap:'0.6rem', marginBottom:'0.75rem' }}>
          <div style={{ background:'#1a5c2a', color:'#fff', fontWeight:800, fontSize:'0.8rem', padding:'0.2rem 0.55rem', borderRadius:6 }}>
            {hotel.rating}
          </div>
          <div style={{ display:'flex', gap:2 }}>
            {[1,2,3,4,5].map(s => (
              <span key={s} style={{ color: s <= Math.round(hotel.rating) ? '#f4a830' : '#ddd', fontSize:'0.75rem' }}>★</span>
            ))}
          </div>
          <span style={{ color:'var(--text3)', fontSize:'0.78rem' }}>({hotel.reviews?.toLocaleString()} reviews)</span>
        </div>

        {/* Amenities pills */}
        <div className="hotel-card-amenities">
          {hotel.amenities.slice(0, 4).map(a => (
            <span key={a} className="amenity-pill">{a}</span>
          ))}
          {hotel.amenities.length > 4 && (
            <span className="amenity-pill" style={{ background:'var(--cream)', color:'var(--text3)' }}>+{hotel.amenities.length - 4} more</span>
          )}
        </div>

        {/* Footer */}
        <div className="hotel-card-footer">
          <div>
            <div className="hotel-card-price">${hotel.price} <span>/ night</span></div>
            <div style={{ fontSize:'0.72rem', color:'var(--text3)' }}>{hotel.rooms} rooms available</div>
          </div>
          <span className="btn-primary" style={{ padding:'0.5rem 1.2rem', fontSize:'0.85rem' }}>View →</span>
        </div>
      </div>
    </Link>
  )
}
