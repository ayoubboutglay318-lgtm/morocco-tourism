import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

const typeColors = {
  Heritage: '#c0392b',
  Nature: '#27ae60',
  Culture: '#8e44ad',
  Experience: '#e67e22',
}

export default function DestinationDetail() {
  const { slug } = useParams()
  const [dest, setDest] = useState(null)
  const [attractions, setAttractions] = useState([])
  const [tours, setTours] = useState([])
  const [hotels, setHotels] = useState([])
  const [tab, setTab] = useState('overview')

  useEffect(() => {
    axios.get(`http://localhost:5000/api/destinations/${slug}`).then(r => {
      setDest(r.data)
      const city = r.data.name
      axios.get(`http://localhost:5000/api/attractions?city=${city}`).then(r2 => setAttractions(r2.data))
      axios.get(`http://localhost:5000/api/tours?city=${city}`).then(r3 => setTours(r3.data))
      axios.get(`http://localhost:5000/api/hotels?city=${city}`).then(r4 => setHotels(r4.data))
    })
  }, [slug])

  if (!dest) return <div className="loading">Loading destination...</div>

  const tabs = ['overview', 'attractions', 'tours', 'hotels', 'tips']

  return (
    <div>
      {/* Hero */}
      <div style={{ position: 'relative', height: '65vh', minHeight: 400, overflow: 'hidden' }}>
        <img src={dest.heroImage || dest.image} alt={dest.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.7) 100%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end',
          padding: '3rem 2rem', textAlign: 'center', color: '#fff',
        }}>
          <div style={{ fontSize: '0.9rem', color: '#f4a830', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, marginBottom: '0.5rem' }}>{dest.region}</div>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 900, lineHeight: 1, marginBottom: '0.5rem' }}>{dest.name}</h1>
          <p style={{ fontSize: '1.3rem', color: '#e0d4c0', fontStyle: 'italic' }}>{dest.tagline}</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div style={{ background: '#1a0a00', color: '#fff', padding: '1.2rem 2rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', gap: '2.5rem', flexWrap: 'wrap', justifyContent: 'center', fontSize: '0.9rem' }}>
          <span>🌡 <strong>{dest.temperature}</strong></span>
          <span>📅 Best time: <strong>{dest.bestTime}</strong></span>
          <span>🗣 <strong>{dest.language}</strong></span>
          <span>💰 <strong>{dest.currency}</strong></span>
          <span>🏨 <strong>{hotels.length} hotels available</strong></span>
          <span>🎯 <strong>{attractions.length} attractions</strong></span>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ background: '#fff', borderBottom: '2px solid #f0ebe3', position: 'sticky', top: 64, zIndex: 50 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', gap: 0, overflowX: 'auto' }}>
          {tabs.map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: '1rem 1.8rem', border: 'none', background: 'none', cursor: 'pointer',
              fontWeight: tab === t ? 700 : 400,
              color: tab === t ? '#f4a830' : '#555',
              borderBottom: tab === t ? '3px solid #f4a830' : '3px solid transparent',
              textTransform: 'capitalize', fontSize: '0.95rem', whiteSpace: 'nowrap',
            }}>
              {t === 'overview' ? 'Overview' : t === 'attractions' ? `Attractions (${attractions.length})` : t === 'tours' ? `Tours (${tours.length})` : t === 'hotels' ? `Hotels (${hotels.length})` : 'Tips'}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '2.5rem 2rem' }}>

        {/* OVERVIEW */}
        {tab === 'overview' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '3rem', alignItems: 'start' }}>
              <div>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '1rem' }}>About {dest.name}</h2>
                {dest.description.split('\n\n').map((para, i) => (
                  <p key={i} style={{ color: '#555', lineHeight: 1.9, fontSize: '1.05rem', marginBottom: '1rem' }}>{para}</p>
                ))}

                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, margin: '2rem 0 1rem' }}>Getting There</h3>
                <p style={{ color: '#555', lineHeight: 1.8 }}>{dest.gettingThere}</p>

                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, margin: '2rem 0 1rem' }}>Key Facts</h3>
                <ul style={{ paddingLeft: '1.2rem' }}>
                  {dest.facts.map((f, i) => (
                    <li key={i} style={{ color: '#555', marginBottom: '0.6rem', lineHeight: 1.6 }}>{f}</li>
                  ))}
                </ul>
              </div>

              <div>
                <div style={{ background: '#fef3e2', borderRadius: 16, padding: '1.5rem', marginBottom: '1.5rem' }}>
                  <h3 style={{ fontWeight: 700, marginBottom: '1rem', color: '#1a0a00' }}>Quick Info</h3>
                  {[
                    ['Region', dest.region],
                    ['Best Time', dest.bestTime],
                    ['Language', dest.language],
                    ['Currency', dest.currency],
                    ['Climate', dest.temperature],
                  ].map(([k, v]) => (
                    <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #f0e8d0', fontSize: '0.9rem' }}>
                      <span style={{ color: '#888', fontWeight: 600 }}>{k}</span>
                      <span style={{ color: '#333', textAlign: 'right', maxWidth: 180 }}>{v}</span>
                    </div>
                  ))}
                </div>

                <div style={{ background: '#fff', borderRadius: 16, padding: '1.5rem', boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
                  <h3 style={{ fontWeight: 700, marginBottom: '1rem' }}>Explore {dest.name}</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                    {[['attractions', `${attractions.length} Attractions`], ['tours', `${tours.length} Tours`], ['hotels', `${hotels.length} Hotels`]].map(([t, label]) => (
                      <button key={t} onClick={() => setTab(t)} className="btn-secondary" style={{ textAlign: 'left', width: '100%' }}>{label} →</button>
                    ))}
                    <Link to={`/hotels?city=${dest.name}`} className="btn-primary" style={{ textAlign: 'center' }}>Book a Hotel</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ATTRACTIONS */}
        {tab === 'attractions' && (
          <div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>Things to Do in {dest.name}</h2>
            <p style={{ color: '#888', marginBottom: '2rem' }}>{attractions.length} must-see attractions and experiences</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.8rem' }}>
              {attractions.map(a => (
                <div key={a.id} style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
                  <div style={{ position: 'relative', height: 200 }}>
                    <img src={a.image} alt={a.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <span style={{
                      position: 'absolute', top: 12, left: 12,
                      background: typeColors[a.type] || '#555',
                      color: '#fff', padding: '0.25rem 0.8rem', borderRadius: 20,
                      fontSize: '0.75rem', fontWeight: 700,
                    }}>{a.type}</span>
                  </div>
                  <div style={{ padding: '1.2rem' }}>
                    <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>{a.name}</h3>
                    <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '0.8rem' }}>{a.description}</p>
                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.82rem', color: '#888' }}>
                      <span>⏱ {a.duration}</span>
                      <span>💰 {a.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TOURS */}
        {tab === 'tours' && (
          <div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>Tours & Experiences in {dest.name}</h2>
            <p style={{ color: '#888', marginBottom: '2rem' }}>Guided tours and packages — all with local experts</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2rem' }}>
              {tours.map(t => (
                <div key={t.id} style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
                  <img src={t.image} alt={t.title} style={{ width: '100%', height: 200, objectFit: 'cover' }} />
                  <div style={{ padding: '1.3rem' }}>
                    <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>{t.title}</h3>
                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.82rem', color: '#888', marginBottom: '0.8rem' }}>
                      <span>⏱ {t.duration}</span>
                      <span>👥 {t.groupSize}</span>
                      <span>{'★'.repeat(Math.round(t.rating))} {t.rating}</span>
                    </div>
                    <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1rem' }}>{t.description}</p>
                    <div style={{ marginBottom: '1rem' }}>
                      <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#555', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Highlights</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                        {t.highlights.map(h => (
                          <span key={h} style={{ background: '#fef3e2', color: '#c47a1e', padding: '0.2rem 0.7rem', borderRadius: 12, fontSize: '0.8rem' }}>{h}</span>
                        ))}
                      </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f0ebe3', paddingTop: '1rem' }}>
                      <div>
                        <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1a0a00' }}>{t.price} MAD</span>
                        <span style={{ fontSize: '0.85rem', color: '#888' }}> / person</span>
                      </div>
                      <Link to={`/hotels?city=${dest.name}`} className="btn-primary" style={{ fontSize: '0.85rem', padding: '0.5rem 1.2rem' }}>Book Tour</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* HOTELS */}
        {tab === 'hotels' && (
          <div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>Where to Stay in {dest.name}</h2>
            <p style={{ color: '#888', marginBottom: '2rem' }}>{hotels.length} handpicked accommodations</p>
            <div className="hotels-grid">
              {hotels.map(h => (
                <Link key={h.id} to={`/hotels/${h.id}`} className="hotel-card">
                  <img src={h.image} alt={h.name} className="hotel-card-img" />
                  <div className="hotel-card-body">
                    <div className="hotel-card-city">{h.city}</div>
                    <div className="hotel-card-name">{h.name}</div>
                    <div className="hotel-card-rating">{'★'.repeat(Math.round(h.rating))} <span style={{ color: '#555' }}>{h.rating}</span></div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.8rem' }}>
                      {h.amenities.slice(0, 4).map(a => (
                        <span key={a} style={{ background: '#fef3e2', color: '#c47a1e', padding: '0.2rem 0.6rem', borderRadius: 10, fontSize: '0.75rem' }}>{a}</span>
                      ))}
                    </div>
                    <div className="hotel-card-footer">
                      <div className="hotel-card-price">${h.price} <span>/ night</span></div>
                      <span className="btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}>Book</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* TIPS */}
        {tab === 'tips' && (
          <div style={{ maxWidth: 750 }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>Travel Tips for {dest.name}</h2>
            <p style={{ color: '#888', marginBottom: '2rem' }}>Insider advice to make the most of your visit</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {dest.tips.map((tip, i) => (
                <div key={i} style={{
                  background: '#fff', borderRadius: 14, padding: '1.2rem 1.5rem',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  display: 'flex', gap: '1rem', alignItems: 'flex-start',
                }}>
                  <span style={{ background: '#fef3e2', color: '#f4a830', fontWeight: 800, fontSize: '1rem', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{i + 1}</span>
                  <p style={{ color: '#444', lineHeight: 1.7, fontSize: '1rem', margin: 0 }}>{tip}</p>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '2.5rem', background: '#fef3e2', borderRadius: 16, padding: '1.5rem' }}>
              <h3 style={{ fontWeight: 700, marginBottom: '1rem' }}>Ready to visit {dest.name}?</h3>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link to={`/hotels?city=${dest.name}`} className="btn-primary">Browse Hotels</Link>
                <button onClick={() => setTab('tours')} className="btn-secondary">View Tours</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
