import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Destinations() {
  const [destinations, setDestinations] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/api/destinations').then(r => setDestinations(r.data))
  }, [])

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '2rem' }}>
      <h1 className="section-title" style={{ marginBottom: '0.4rem' }}>Destinations</h1>
      <p className="section-subtitle">Explore Morocco's most iconic and hidden places</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(480px, 1fr))', gap: '2rem' }}>
        {destinations.map(dest => (
          <Link key={dest.id} to={`/destinations/${dest.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{
              background: '#fff',
              borderRadius: 20,
              overflow: 'hidden',
              boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.14)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 2px 16px rgba(0,0,0,0.08)' }}
            >
              <div style={{ position: 'relative', height: 260 }}>
                <img src={dest.image} alt={dest.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.75))',
                  padding: '2rem 1.5rem 1.2rem',
                  color: '#fff',
                }}>
                  <div style={{ fontSize: '0.8rem', color: '#f4a830', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>{dest.region}</div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>{dest.name}</div>
                  <div style={{ fontSize: '1rem', color: '#e0d4c0', fontStyle: 'italic' }}>{dest.tagline}</div>
                </div>
              </div>
              <div style={{ padding: '1.5rem' }}>
                <p style={{ color: '#555', lineHeight: 1.7, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                  {dest.description.split('\n')[0].substring(0, 200)}...
                </p>
                <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.85rem', color: '#888' }}>
                  <span>🌡 {dest.temperature.split('—')[0].trim()}</span>
                  <span>📅 Best: {dest.bestTime}</span>
                </div>
                <div style={{ marginTop: '1.2rem' }}>
                  <span className="btn-primary" style={{ fontSize: '0.9rem', padding: '0.5rem 1.4rem' }}>Explore {dest.name} →</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
