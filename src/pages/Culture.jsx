import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Culture() {
  const [culture, setCulture] = useState(null)
  const [tab, setTab] = useState('festivals')

  useEffect(() => {
    axios.get('http://localhost:5000/api/culture').then(r => setCulture(r.data))
  }, [])

  if (!culture) return <div className="loading">Loading...</div>

  return (
    <div style={{ maxWidth:1200, margin:'0 auto', padding:'2.5rem 2rem' }}>
      <div className="section-label">Moroccan Heritage</div>
      <h1 className="section-title">Culture, Festivals<br /><em style={{ color:'var(--gold)', fontStyle:'italic' }}>& Traditions</em></h1>
      <p className="section-subtitle">A kingdom where Berber, Arab, Andalusian and African cultures have woven together over 3,000 years into something utterly unique</p>

      {/* Tabs */}
      <div style={{ display:'flex', gap:0, borderBottom:'2px solid var(--cream2)', marginBottom:'2.5rem', overflowX:'auto' }}>
        {['festivals','customs','crafts'].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding:'0.9rem 1.8rem', border:'none', background:'none', cursor:'pointer',
            fontWeight: tab===t ? 700 : 400,
            color: tab===t ? 'var(--gold)' : 'var(--text3)',
            borderBottom: tab===t ? '3px solid var(--gold)' : '3px solid transparent',
            textTransform:'capitalize', fontSize:'0.95rem', whiteSpace:'nowrap'
          }}>{t === 'festivals' ? '🎉 Festivals' : t === 'customs' ? '🤝 Customs & Etiquette' : '🏺 Traditional Crafts'}</button>
        ))}
      </div>

      {/* FESTIVALS */}
      {tab === 'festivals' && (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(360px, 1fr))', gap:'2rem' }}>
          {culture.festivals.map(f => (
            <div key={f.id} style={{ background:'var(--white)', borderRadius:20, overflow:'hidden', boxShadow:'0 2px 16px rgba(0,0,0,0.07)', border:'1px solid var(--cream2)' }}>
              <div style={{ position:'relative', height:200 }}>
                <img src={f.image} alt={f.name} style={{ width:'100%', height:'100%', objectFit:'cover' }} loading="lazy" />
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(15,8,0,0.75) 0%, transparent 50%)' }} />
                <div style={{ position:'absolute', top:12, left:12, display:'flex', gap:'0.5rem' }}>
                  <span style={{ background:'var(--gold)', color:'var(--dark)', padding:'0.2rem 0.8rem', borderRadius:20, fontSize:'0.72rem', fontWeight:700 }}>{f.month}</span>
                  {f.free && <span style={{ background:'#27ae60', color:'#fff', padding:'0.2rem 0.8rem', borderRadius:20, fontSize:'0.72rem', fontWeight:700 }}>FREE</span>}
                </div>
                <div style={{ position:'absolute', bottom:'1rem', left:'1rem', right:'1rem', color:'#fff' }}>
                  <div style={{ fontFamily:'Playfair Display, serif', fontSize:'1.2rem', fontWeight:700 }}>{f.name}</div>
                  <div style={{ fontSize:'0.82rem', color:'rgba(255,255,255,0.7)' }}>📍 {f.city}</div>
                </div>
              </div>
              <div style={{ padding:'1.3rem' }}>
                <div style={{ fontSize:'0.8rem', color:'var(--gold)', fontWeight:700, marginBottom:'0.5rem' }}>📅 {f.dates}</div>
                <p style={{ color:'var(--text2)', fontSize:'0.88rem', lineHeight:1.75 }}>{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CUSTOMS */}
      {tab === 'customs' && (
        <div>
          <div style={{ background:'rgba(201,151,58,0.08)', border:'1px solid rgba(201,151,58,0.25)', borderRadius:16, padding:'1.5rem', marginBottom:'2rem' }}>
            <p style={{ color:'var(--text2)', lineHeight:1.8 }}>Morocco is a warm, welcoming country with a deeply rooted culture of hospitality. Understanding a few key customs will enrich your experience enormously and show respect for the people who call this extraordinary country home.</p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(320px, 1fr))', gap:'1.5rem' }}>
            {culture.customs.map(c => (
              <div key={c.title} style={{ background:'var(--white)', borderRadius:16, padding:'1.5rem', boxShadow:'0 2px 12px rgba(0,0,0,0.06)', border:'1px solid var(--cream2)' }}>
                <div style={{ fontSize:'2.2rem', marginBottom:'0.8rem' }}>{c.icon}</div>
                <h3 style={{ fontFamily:'Playfair Display, serif', fontWeight:700, fontSize:'1.1rem', marginBottom:'0.6rem' }}>{c.title}</h3>
                <p style={{ color:'var(--text2)', fontSize:'0.9rem', lineHeight:1.7 }}>{c.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CRAFTS */}
      {tab === 'crafts' && (
        <div>
          <p style={{ color:'var(--text3)', marginBottom:'2rem', lineHeight:1.7 }}>Morocco's artisan traditions are among the finest in the world — many techniques unchanged for centuries. Buying directly from craftsmen in the souks supports communities and preserves living heritage.</p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:'1.5rem' }}>
            {culture.crafts.map(c => (
              <div key={c.name} style={{ background:'var(--white)', borderRadius:16, padding:'1.8rem', boxShadow:'0 2px 12px rgba(0,0,0,0.06)', border:'1px solid var(--cream2)', textAlign:'center' }}>
                <div style={{ fontSize:'3rem', marginBottom:'1rem' }}>{c.icon}</div>
                <h3 style={{ fontFamily:'Playfair Display, serif', fontWeight:700, fontSize:'1.2rem', marginBottom:'0.3rem' }}>{c.name}</h3>
                <div style={{ fontSize:'0.78rem', color:'var(--gold)', fontWeight:700, marginBottom:'0.8rem', textTransform:'uppercase', letterSpacing:1 }}>📍 {c.city}</div>
                <p style={{ color:'var(--text2)', fontSize:'0.88rem', lineHeight:1.7 }}>{c.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
