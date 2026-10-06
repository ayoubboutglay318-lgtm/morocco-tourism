import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Emergency() {
  const [data, setData] = useState(null)

  useEffect(() => {
    axios.get('/api/emergency').then(r => setData(r.data))
  }, [])

  if (!data) return <div className="loading">Loading...</div>

  return (
    <div style={{ maxWidth:1100, margin:'0 auto', padding:'2.5rem 2rem' }}>
      {/* Alert banner */}
      <div style={{ background:'#c0392b', borderRadius:16, padding:'1.2rem 1.8rem', color:'#fff', marginBottom:'2rem', display:'flex', alignItems:'center', gap:'1rem' }}>
        <span style={{ fontSize:'1.8rem' }}>🆘</span>
        <div>
          <strong>In a life-threatening emergency, call 15 (ambulance/fire) or 19 (police).</strong>
          <div style={{ fontSize:'0.88rem', opacity:0.85, marginTop:'0.2rem' }}>These numbers work from any phone in Morocco, including foreign SIM cards.</div>
        </div>
      </div>

      <div className="section-label">Safety & Assistance</div>
      <h1 className="section-title">Emergency<br /><em style={{ color:'var(--gold)', fontStyle:'italic' }}>Information</em></h1>
      <p className="section-subtitle">Essential contacts, hospitals and safety information for travellers in Morocco</p>

      {/* Emergency Numbers */}
      <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:'1.5rem', fontWeight:700, marginBottom:'1.2rem', marginTop:'2.5rem' }}>📞 Emergency Numbers</h2>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:'1rem', marginBottom:'3rem' }}>
        {data.numbers.map(n => (
          <div key={n.service} style={{ background:'var(--white)', borderRadius:16, padding:'1.3rem', boxShadow:'0 2px 12px rgba(0,0,0,0.07)', border:'1px solid var(--cream2)', display:'flex', gap:'1rem', alignItems:'flex-start' }}>
            <div style={{ fontSize:'2rem', flexShrink:0 }}>{n.icon}</div>
            <div>
              <div style={{ fontWeight:700, fontSize:'0.95rem' }}>{n.service}</div>
              <div style={{ fontSize:'1.6rem', fontWeight:900, color:'#c0392b', lineHeight:1.2, margin:'0.2rem 0' }}>{n.number}</div>
              <div style={{ fontSize:'0.8rem', color:'var(--text3)', marginBottom:'0.3rem' }}>{n.description}</div>
              <div style={{ fontSize:'0.72rem', background:'rgba(39,174,96,0.12)', color:'#27ae60', padding:'0.15rem 0.6rem', borderRadius:20, display:'inline-block', fontWeight:700 }}>{n.available}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Hospitals */}
      <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:'1.5rem', fontWeight:700, marginBottom:'1.2rem' }}>🏥 Major Hospitals</h2>
      <div style={{ display:'flex', flexDirection:'column', gap:'0.8rem', marginBottom:'3rem' }}>
        {data.hospitals.map(h => (
          <div key={h.name} style={{ background:'var(--white)', borderRadius:14, padding:'1.2rem 1.5rem', boxShadow:'0 2px 8px rgba(0,0,0,0.06)', border:'1px solid var(--cream2)', display:'grid', gridTemplateColumns:'1fr auto auto', gap:'1rem', alignItems:'center' }}>
            <div>
              <div style={{ fontWeight:700, fontSize:'0.95rem' }}>{h.name}</div>
              <div style={{ fontSize:'0.82rem', color:'var(--text3)' }}>📍 {h.address}</div>
            </div>
            <span style={{ background:'var(--cream2)', color:'var(--text2)', padding:'0.3rem 0.8rem', borderRadius:20, fontSize:'0.75rem', fontWeight:600, whiteSpace:'nowrap' }}>{h.type}</span>
            <a href={`tel:${h.phone}`} style={{ color:'var(--gold)', fontWeight:700, fontSize:'0.9rem', textDecoration:'none', whiteSpace:'nowrap' }}>{h.phone}</a>
          </div>
        ))}
      </div>

      {/* Embassies */}
      <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:'1.5rem', fontWeight:700, marginBottom:'1.2rem' }}>🏛️ Embassies in Rabat</h2>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))', gap:'1rem', marginBottom:'3rem' }}>
        {data.embassies.map(e => (
          <div key={e.country} style={{ background:'var(--white)', borderRadius:16, padding:'1.3rem', boxShadow:'0 2px 12px rgba(0,0,0,0.07)', border:'1px solid var(--cream2)' }}>
            <div style={{ fontWeight:700, fontSize:'1.1rem', marginBottom:'0.5rem' }}>{e.country} Embassy</div>
            <div style={{ fontSize:'0.82rem', color:'var(--text3)', marginBottom:'0.4rem' }}>📍 {e.address}</div>
            <div style={{ display:'flex', flexDirection:'column', gap:'0.3rem' }}>
              <a href={`tel:${e.phone}`} style={{ fontSize:'0.85rem', color:'var(--gold)', fontWeight:600, textDecoration:'none' }}>📞 {e.phone}</a>
              <a href={`https://${e.website}`} target="_blank" rel="noopener noreferrer" style={{ fontSize:'0.8rem', color:'var(--text3)', textDecoration:'none' }}>🌐 {e.website}</a>
            </div>
          </div>
        ))}
      </div>

      {/* Safety Tips */}
      <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:'1.5rem', fontWeight:700, marginBottom:'1.2rem' }}>💡 Safety Tips for Travellers</h2>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))', gap:'1rem' }}>
        {data.tips.map((tip, i) => (
          <div key={i} style={{ background:'var(--white)', borderRadius:14, padding:'1.2rem', boxShadow:'0 2px 8px rgba(0,0,0,0.05)', border:'1px solid var(--cream2)', display:'flex', gap:'0.8rem', alignItems:'flex-start' }}>
            <span style={{ background:'rgba(201,151,58,0.15)', color:'var(--gold)', fontWeight:800, fontSize:'0.85rem', borderRadius:'50%', width:28, height:28, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>{i+1}</span>
            <p style={{ color:'var(--text2)', fontSize:'0.88rem', lineHeight:1.65, margin:0 }}>{tip}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
