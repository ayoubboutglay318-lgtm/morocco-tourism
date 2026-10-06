import { useState, useEffect } from 'react'
import axios from 'axios'

const tabs = ['airports','trains','buses','taxis','ferries']
const tabIcons = { airports:'✈️', trains:'🚆', buses:'🚌', taxis:'🚕', ferries:'⛴️' }

export default function Transport() {
  const [data, setData] = useState(null)
  const [tab, setTab] = useState('airports')

  useEffect(() => {
    axios.get('/api/transport').then(r => setData(r.data))
  }, [])

  if (!data) return <div className="loading">Loading...</div>

  return (
    <div style={{ maxWidth:1100, margin:'0 auto', padding:'2.5rem 2rem' }}>
      <div className="section-label">Getting Around</div>
      <h1 className="section-title">Transport<br /><em style={{ color:'var(--gold)', fontStyle:'italic' }}>in Morocco</em></h1>
      <p className="section-subtitle">Everything you need to know about getting to and around Morocco — airports, trains, buses, taxis and ferries</p>

      {/* Tab bar */}
      <div style={{ display:'flex', gap:'0.5rem', flexWrap:'wrap', marginBottom:'2.5rem' }}>
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding:'0.6rem 1.4rem', borderRadius:50, border:'1.5px solid', cursor:'pointer', fontWeight:600, fontSize:'0.88rem', transition:'all 0.2s',
            borderColor: tab===t ? 'var(--gold)' : 'var(--cream2)',
            background: tab===t ? 'var(--gold)' : 'var(--white)',
            color: tab===t ? 'var(--dark)' : 'var(--text2)',
          }}>{tabIcons[t]} {t.charAt(0).toUpperCase()+t.slice(1)}</button>
        ))}
      </div>

      {/* AIRPORTS */}
      {tab === 'airports' && (
        <div style={{ display:'flex', flexDirection:'column', gap:'1.5rem' }}>
          {data.airports.map(a => (
            <div key={a.code} style={{ background:'var(--white)', borderRadius:18, padding:'1.8rem', boxShadow:'0 2px 16px rgba(0,0,0,0.07)', border:'1px solid var(--cream2)', display:'grid', gridTemplateColumns:'100px 1fr', gap:'1.5rem', alignItems:'start' }}>
              <div style={{ textAlign:'center', background:'var(--dark)', borderRadius:14, padding:'1rem', color:'var(--gold)' }}>
                <div style={{ fontSize:'1.6rem', fontWeight:900 }}>{a.code}</div>
                <div style={{ fontSize:'0.7rem', color:'rgba(255,255,255,0.5)', textTransform:'uppercase', letterSpacing:1 }}>IATA</div>
              </div>
              <div>
                <h3 style={{ fontWeight:700, fontSize:'1.1rem', marginBottom:'0.2rem' }}>{a.name}</h3>
                <div style={{ color:'var(--gold)', fontSize:'0.8rem', fontWeight:700, marginBottom:'0.7rem' }}>📍 {a.city}</div>
                <p style={{ color:'var(--text2)', fontSize:'0.9rem', lineHeight:1.7, marginBottom:'0.8rem' }}>{a.description}</p>
                <div style={{ display:'flex', flexWrap:'wrap', gap:'0.4rem' }}>
                  {a.airlines.map(al => <span key={al} style={{ background:'var(--cream2)', color:'var(--text2)', padding:'0.25rem 0.7rem', borderRadius:20, fontSize:'0.75rem', fontWeight:500 }}>{al}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TRAINS */}
      {tab === 'trains' && (
        <div style={{ display:'flex', flexDirection:'column', gap:'1.5rem' }}>
          {data.trains.map(t => (
            <div key={t.name} style={{ background:'var(--white)', borderRadius:18, padding:'1.8rem', boxShadow:'0 2px 16px rgba(0,0,0,0.07)', border:'1px solid var(--cream2)' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:'1rem', marginBottom:'1rem' }}>
                <div>
                  <h3 style={{ fontWeight:700, fontSize:'1.2rem' }}>{t.name}</h3>
                  <span style={{ background:'var(--gold)', color:'var(--dark)', padding:'0.2rem 0.8rem', borderRadius:20, fontSize:'0.72rem', fontWeight:700 }}>{t.type}</span>
                </div>
                <div style={{ textAlign:'right' }}>
                  <div style={{ fontSize:'0.8rem', color:'var(--text3)' }}>From</div>
                  <div style={{ fontWeight:700, color:'var(--gold)' }}>{t.price}</div>
                </div>
              </div>
              <p style={{ color:'var(--text2)', fontSize:'0.9rem', lineHeight:1.7, marginBottom:'1rem' }}>{t.description}</p>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(220px, 1fr))', gap:'0.5rem' }}>
                {t.routes.map(r => <div key={r} style={{ background:'var(--cream2)', borderRadius:10, padding:'0.5rem 0.9rem', fontSize:'0.82rem', color:'var(--text2)', display:'flex', alignItems:'center', gap:'0.5rem' }}><span style={{ color:'var(--gold)' }}>🚆</span> {r}</div>)}
              </div>
              <div style={{ marginTop:'1rem', fontSize:'0.82rem', color:'var(--text3)' }}>🌐 Book at: <strong>{t.booking}</strong></div>
            </div>
          ))}
        </div>
      )}

      {/* BUSES */}
      {tab === 'buses' && (
        <div style={{ display:'flex', flexDirection:'column', gap:'1.5rem' }}>
          {data.buses.map(b => (
            <div key={b.name} style={{ background:'var(--white)', borderRadius:18, padding:'1.8rem', boxShadow:'0 2px 16px rgba(0,0,0,0.07)', border:'1px solid var(--cream2)' }}>
              <h3 style={{ fontWeight:700, fontSize:'1.2rem', marginBottom:'0.5rem' }}>{b.name}</h3>
              <p style={{ color:'var(--text2)', fontSize:'0.9rem', lineHeight:1.7, marginBottom:'0.8rem' }}>{b.description}</p>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'0.8rem', fontSize:'0.85rem' }}>
                <div style={{ background:'var(--cream2)', borderRadius:10, padding:'0.6rem 0.9rem' }}><span style={{ color:'var(--text3)' }}>Routes: </span><strong>{b.routes}</strong></div>
                <div style={{ background:'var(--cream2)', borderRadius:10, padding:'0.6rem 0.9rem' }}><span style={{ color:'var(--text3)' }}>From: </span><strong>{b.price}</strong></div>
                <div style={{ background:'var(--cream2)', borderRadius:10, padding:'0.6rem 0.9rem' }}><span style={{ color:'var(--text3)' }}>Book: </span><strong>{b.booking}</strong></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAXIS */}
      {tab === 'taxis' && (
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.5rem' }}>
          {data.taxis.map(t => (
            <div key={t.name} style={{ background:'var(--white)', borderRadius:18, padding:'1.8rem', boxShadow:'0 2px 16px rgba(0,0,0,0.07)', border:'1px solid var(--cream2)' }}>
              <h3 style={{ fontWeight:700, fontSize:'1.1rem', marginBottom:'0.8rem' }}>{t.name}</h3>
              <p style={{ color:'var(--text2)', fontSize:'0.9rem', lineHeight:1.7, marginBottom:'1rem' }}>{t.description}</p>
              <ul style={{ paddingLeft:'1.2rem', display:'flex', flexDirection:'column', gap:'0.4rem' }}>
                {t.tips.map(tip => <li key={tip} style={{ color:'var(--text2)', fontSize:'0.85rem' }}>{tip}</li>)}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* FERRIES */}
      {tab === 'ferries' && (
        <div style={{ display:'flex', flexDirection:'column', gap:'1.5rem' }}>
          {data.ferries.map(f => (
            <div key={f.route} style={{ background:'var(--white)', borderRadius:18, padding:'1.8rem', boxShadow:'0 2px 16px rgba(0,0,0,0.07)', border:'1px solid var(--cream2)' }}>
              <div style={{ display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:'1rem', marginBottom:'0.8rem' }}>
                <div>
                  <h3 style={{ fontWeight:700, fontSize:'1.1rem' }}>{f.route}</h3>
                  <div style={{ color:'var(--text3)', fontSize:'0.82rem' }}>Operated by {f.operator}</div>
                </div>
                <div style={{ display:'flex', gap:'0.8rem', alignItems:'center' }}>
                  <span style={{ background:'var(--cream2)', borderRadius:10, padding:'0.3rem 0.8rem', fontSize:'0.8rem', fontWeight:600 }}>⏱ {f.duration}</span>
                  <span style={{ background:'rgba(201,151,58,0.12)', color:'var(--gold-dark)', borderRadius:10, padding:'0.3rem 0.8rem', fontSize:'0.8rem', fontWeight:600 }}>{f.frequency}</span>
                </div>
              </div>
              <p style={{ color:'var(--text2)', fontSize:'0.9rem', lineHeight:1.7, marginBottom:'0.8rem' }}>{f.description}</p>
              <div style={{ fontSize:'0.85rem', fontWeight:700, color:'var(--text2)' }}>💰 {f.price}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
