import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const PRICE_LABELS = { '$': 'Budget', '$$': 'Mid-range', '$$$': 'Luxury' }
const PRICE_COLORS = { '$': '#27ae60', '$$': '#f39c12', '$$$': '#8e44ad' }

function StarRating({ rating }) {
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5
  return (
    <span style={{ color: '#f4a830', fontSize: '0.9rem', letterSpacing: 1 }}>
      {'★'.repeat(full)}{half ? '½' : ''}{'☆'.repeat(5 - full - (half ? 1 : 0))}
    </span>
  )
}

export default function Destinations() {
  const [destinations, setDestinations] = useState([])
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('/api/destinations').then(r => {
      setDestinations(r.data)
      setLoading(false)
    })
  }, [])


  const filtered = destinations.filter(d => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.tagline.toLowerCase().includes(search.toLowerCase()) ||
      d.region.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'All' || d.region.includes(filter)
    return matchSearch && matchFilter
  })

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh', paddingBottom: '4rem' }}>
      {/* Hero Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #1a0a00 0%, #3e1e00 50%, #1a0a00 100%)',
        padding: '5rem 2rem 3rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(201,151,58,0.15) 0%, transparent 60%), radial-gradient(circle at 70% 50%, rgba(201,151,58,0.1) 0%, transparent 60%)',
        }} />
        <div style={{ position: 'relative' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 4, marginBottom: '1rem' }}>
            ✦ DISCOVER MOROCCO ✦
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, color: '#fff', fontFamily: "'Playfair Display', serif", marginBottom: '1rem', lineHeight: 1.1 }}>
            9 Extraordinary Destinations
          </h1>
          <p style={{ fontSize: '1.15rem', color: '#c8b89a', maxWidth: 600, margin: '0 auto 2rem', lineHeight: 1.7 }}>
            From the Sahara's golden dunes to Atlantic ramparts, ancient medinas to mountain peaks — every corner of Morocco tells a different story.
          </p>
          {/* Stats row */}
          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            {[['9', 'Destinations'], ['18', 'Guided Tours'], ['50+', 'Attractions'], ['29', 'Hotels']].map(([val, label]) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--gold-light)', lineHeight: 1 }}>{val}</div>
                <div style={{ fontSize: '0.75rem', color: '#8a7060', textTransform: 'uppercase', letterSpacing: 1, marginTop: '0.2rem' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div style={{ background: '#fff', boxShadow: '0 4px 24px rgba(0,0,0,0.07)', position: 'sticky', top: 64, zIndex: 40 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '1rem 2rem', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 200, position: 'relative' }}>
            <span style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', fontSize: '1rem', color: '#aaa' }}>🔍</span>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search destinations..."
              style={{
                width: '100%', border: '1.5px solid #e8e0d0', borderRadius: 50,
                padding: '0.65rem 1rem 0.65rem 2.6rem',
                fontSize: '0.9rem', outline: 'none', background: '#faf8f5',
                transition: 'border 0.2s',
              }}
              onFocus={e => e.target.style.borderColor = '#c9973a'}
              onBlur={e => e.target.style.borderColor = '#e8e0d0'}
            />
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {['All', 'Budget', 'Mid-range', 'Luxury'].map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{
                padding: '0.5rem 1rem', borderRadius: 50, border: '1.5px solid',
                borderColor: filter === f ? '#c9973a' : '#e8e0d0',
                background: filter === f ? '#c9973a' : 'transparent',
                color: filter === f ? '#fff' : '#666',
                fontWeight: filter === f ? 700 : 400,
                fontSize: '0.83rem', cursor: 'pointer', transition: 'all 0.2s',
              }}>
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2.5rem 2rem' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#888', fontSize: '1.1rem' }}>Loading destinations...</div>
        ) : (
          <>
            <div style={{ marginBottom: '1.5rem', color: '#888', fontSize: '0.9rem' }}>
              Showing <strong style={{ color: '#333' }}>{filtered.length}</strong> destinations
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '2rem' }}>
              {filtered.map(dest => (
                <DestinationCard key={dest.id} dest={dest} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function DestinationCard({ dest }) {
  const [hovered, setHovered] = useState(false)
  const priceLevel = dest.priceLevel || '$$'
  const priceColor = PRICE_COLORS[priceLevel] || '#888'

  return (
    <Link to={`/destinations/${dest.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: '#fff',
          borderRadius: 20,
          overflow: 'hidden',
          boxShadow: hovered ? '0 16px 48px rgba(0,0,0,0.16)' : '0 2px 16px rgba(0,0,0,0.07)',
          transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
          transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
          border: '1px solid rgba(0,0,0,0.05)',
        }}
      >
        {/* Image */}
        <div style={{ position: 'relative', height: 240, overflow: 'hidden' }}>
          <img
            src={dest.image}
            alt={dest.name}
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              transform: hovered ? 'scale(1.06)' : 'scale(1)',
              transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1)',
            }}
          />
          {/* Overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.72) 100%)',
          }} />

          {/* Top badges */}
          <div style={{ position: 'absolute', top: 14, left: 14, right: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{
              background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)',
              color: '#f4c06f', padding: '0.3rem 0.8rem', borderRadius: 50,
              fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1,
            }}>
              {dest.region.split('/')[0].split('-')[0].trim()}
            </span>
            <span style={{
              background: priceColor, color: '#fff',
              padding: '0.3rem 0.8rem', borderRadius: 50,
              fontSize: '0.72rem', fontWeight: 700,
            }}>
              {priceLevel} · {PRICE_LABELS[priceLevel]}
            </span>
          </div>

          {/* Bottom overlay: name & tagline */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem 1.4rem 1.2rem' }}>
            <div style={{ fontSize: '1.9rem', fontWeight: 900, color: '#fff', fontFamily: "'Playfair Display', serif", lineHeight: 1.1 }}>{dest.name}</div>
            <div style={{ fontSize: '0.88rem', color: '#e0d4c0', fontStyle: 'italic', marginTop: '0.2rem' }}>{dest.tagline}</div>
          </div>
        </div>

        {/* Card Body */}
        <div style={{ padding: '1.4rem' }}>
          {/* Rating row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.9rem' }}>
            <StarRating rating={dest.rating || 4.8} />
            <span style={{ fontWeight: 700, color: '#333', fontSize: '0.9rem' }}>{dest.rating}</span>
            <span style={{ color: '#aaa', fontSize: '0.82rem' }}>({(dest.reviewCount || 0).toLocaleString()} reviews)</span>
          </div>

          {/* Description snippet */}
          <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1rem' }}>
            {dest.description?.split('\n')[0].substring(0, 160)}...
          </p>

          {/* Info pills */}
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.8rem', color: '#777', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <span style={{ fontSize: '0.9rem' }}>🌡</span>
              {dest.temperature?.split('—')[0].split(' — ')[0].substring(0, 30)}
            </span>
            <span style={{ fontSize: '0.8rem', color: '#777', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <span style={{ fontSize: '0.9rem' }}>📅</span>
              {dest.bestTime}
            </span>
          </div>

          {/* Highlights tags */}
          {dest.highlights && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.2rem' }}>
              {dest.highlights.map(h => (
                <span key={h} style={{
                  background: '#fef3e2', color: '#b5650d',
                  padding: '0.22rem 0.7rem', borderRadius: 50,
                  fontSize: '0.75rem', fontWeight: 600,
                }}>
                  {h}
                </span>
              ))}
            </div>
          )}

          {/* CTA */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            borderTop: '1px solid #f0ebe3', paddingTop: '1rem',
          }}>
            <div style={{ fontSize: '0.8rem', color: '#aaa' }}>
              🌍 {dest.language?.split(',')[0]}
            </div>
            <span style={{
              background: 'linear-gradient(135deg, #c9973a, #f4c06f)',
              color: '#fff', padding: '0.5rem 1.3rem', borderRadius: 50,
              fontSize: '0.85rem', fontWeight: 700,
              boxShadow: hovered ? '0 4px 16px rgba(201,151,58,0.45)' : 'none',
              transition: 'box-shadow 0.3s',
            }}>
              Explore →
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
