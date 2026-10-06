import { useState, useEffect } from 'react'
import axios from 'axios'

const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const monthKeys = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec']

function TempBar({ high, low }) {
  const max = 45
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:4, flex:1 }}>
      <div style={{ fontSize:'0.7rem', fontWeight:700, color:'#e74c3c' }}>{high}°</div>
      <div style={{ width:8, borderRadius:4, background:'linear-gradient(to bottom, #e74c3c, #f39c12, #3498db)', height: Math.max(20, (high/max)*80) + 'px' }} />
      <div style={{ fontSize:'0.7rem', color:'#3498db' }}>{low}°</div>
    </div>
  )
}

export default function Weather() {
  const [weatherData, setWeatherData] = useState(null)
  const [selected, setSelected] = useState('Marrakech')

  useEffect(() => {
    axios.get('/api/weather').then(r => setWeatherData(r.data))
  }, [])

  if (!weatherData) return <div className="loading">Loading weather data...</div>

  const cities = Object.keys(weatherData)
  const city = weatherData[selected]

  const getCurrentMonth = () => new Date().getMonth()
  const cur = city[monthKeys[getCurrentMonth()]]

  return (
    <div style={{ maxWidth:1100, margin:'0 auto', padding:'2.5rem 2rem' }}>
      <div className="section-label">Climate Guide</div>
      <h1 className="section-title">Morocco Weather<br /><em style={{ color:'var(--gold)', fontStyle:'italic' }}>& Best Time to Visit</em></h1>
      <p className="section-subtitle">Monthly temperature, rainfall and travel advice for every major city in Morocco</p>

      {/* City selector */}
      <div style={{ display:'flex', gap:'0.6rem', flexWrap:'wrap', marginBottom:'2.5rem' }}>
        {cities.map(c => (
          <button key={c} onClick={() => setSelected(c)} style={{
            padding:'0.5rem 1.2rem', borderRadius:50, cursor:'pointer', fontWeight:600, fontSize:'0.85rem', border:'1.5px solid', transition:'all 0.2s',
            borderColor: selected===c ? 'var(--gold)' : 'var(--cream2)',
            background: selected===c ? 'var(--gold)' : 'var(--white)',
            color: selected===c ? 'var(--dark)' : 'var(--text2)',
          }}>{c}</button>
        ))}
      </div>

      {/* Current month highlight */}
      <div style={{ background:'linear-gradient(135deg, var(--dark) 0%, var(--dark2) 100%)', borderRadius:20, padding:'2rem', color:'#fff', marginBottom:'2rem', display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr', gap:'1.5rem' }}>
        <div>
          <div style={{ fontSize:'0.78rem', color:'rgba(255,255,255,0.5)', textTransform:'uppercase', letterSpacing:1, marginBottom:'0.3rem' }}>Right Now in {selected}</div>
          <div style={{ fontFamily:'Playfair Display,serif', fontSize:'1.8rem', fontWeight:900 }}>{months[getCurrentMonth()]}</div>
          <div style={{ fontSize:'0.85rem', color:'rgba(255,255,255,0.6)', marginTop:'0.3rem' }}>Current month</div>
        </div>
        <div style={{ textAlign:'center' }}>
          <div style={{ fontSize:'0.75rem', color:'rgba(255,255,255,0.5)', marginBottom:'0.3rem' }}>HIGH</div>
          <div style={{ fontSize:'2.5rem', fontWeight:900, color:'#e74c3c' }}>{cur.high}°C</div>
        </div>
        <div style={{ textAlign:'center' }}>
          <div style={{ fontSize:'0.75rem', color:'rgba(255,255,255,0.5)', marginBottom:'0.3rem' }}>LOW</div>
          <div style={{ fontSize:'2.5rem', fontWeight:900, color:'#3498db' }}>{cur.low}°C</div>
        </div>
        <div style={{ textAlign:'center' }}>
          <div style={{ fontSize:'0.75rem', color:'rgba(255,255,255,0.5)', marginBottom:'0.3rem' }}>RAIN</div>
          <div style={{ fontSize:'2.5rem', fontWeight:900, color:'#74b9ff' }}>{cur.rain}<span style={{ fontSize:'1rem' }}>mm</span></div>
        </div>
      </div>

      {/* Monthly chart */}
      <div style={{ background:'var(--white)', borderRadius:20, padding:'2rem', boxShadow:'0 2px 16px rgba(0,0,0,0.07)', border:'1px solid var(--cream2)', marginBottom:'2rem' }}>
        <h3 style={{ fontWeight:700, marginBottom:'1.5rem' }}>Monthly Temperature — {selected}</h3>
        <div style={{ display:'flex', gap:'0.5rem', alignItems:'flex-end', height:120 }}>
          {monthKeys.map((mk, i) => (
            <div key={mk} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
              <TempBar high={city[mk].high} low={city[mk].low} />
              <div style={{ fontSize:'0.65rem', color: i === getCurrentMonth() ? 'var(--gold)' : 'var(--text3)', fontWeight: i === getCurrentMonth() ? 700 : 400 }}>{months[i]}</div>
            </div>
          ))}
        </div>
        <div style={{ display:'flex', gap:'1.5rem', marginTop:'1rem', fontSize:'0.8rem' }}>
          <span style={{ display:'flex', alignItems:'center', gap:4 }}><span style={{ width:12, height:12, background:'#e74c3c', borderRadius:'50%', display:'inline-block' }} /> High temp</span>
          <span style={{ display:'flex', alignItems:'center', gap:4 }}><span style={{ width:12, height:12, background:'#3498db', borderRadius:'50%', display:'inline-block' }} /> Low temp</span>
        </div>
      </div>

      {/* Rainfall table */}
      <div style={{ background:'var(--white)', borderRadius:20, padding:'1.5rem 2rem', boxShadow:'0 2px 16px rgba(0,0,0,0.07)', border:'1px solid var(--cream2)', marginBottom:'2rem' }}>
        <h3 style={{ fontWeight:700, marginBottom:'1.2rem' }}>Monthly Rainfall — {selected}</h3>
        <div style={{ display:'flex', gap:'0.5rem', alignItems:'flex-end' }}>
          {monthKeys.map((mk, i) => {
            const maxRain = Math.max(...monthKeys.map(k => city[k].rain))
            const pct = maxRain > 0 ? (city[mk].rain / maxRain) * 60 : 0
            return (
              <div key={mk} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
                <div style={{ fontSize:'0.62rem', color:'var(--text3)' }}>{city[mk].rain}</div>
                <div style={{ width:'100%', background:'rgba(52,152,219,0.2)', borderRadius:4, height:60, display:'flex', alignItems:'flex-end' }}>
                  <div style={{ width:'100%', height:pct+'px', background:'#3498db', borderRadius:4 }} />
                </div>
                <div style={{ fontSize:'0.62rem', color:'var(--text3)' }}>{months[i]}</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Info card */}
      <div style={{ background:'rgba(201,151,58,0.08)', border:'1px solid rgba(201,151,58,0.25)', borderRadius:16, padding:'1.5rem' }}>
        <div style={{ display:'flex', gap:'1.5rem', flexWrap:'wrap' }}>
          <div style={{ flex:'1', minWidth:200 }}>
            <div style={{ fontSize:'0.75rem', color:'var(--gold)', fontWeight:700, textTransform:'uppercase', letterSpacing:1, marginBottom:'0.3rem' }}>Best Time to Visit</div>
            <div style={{ fontWeight:700, fontSize:'1rem' }}>{city.best}</div>
          </div>
          <div style={{ flex:'2', minWidth:280 }}>
            <div style={{ fontSize:'0.75rem', color:'var(--gold)', fontWeight:700, textTransform:'uppercase', letterSpacing:1, marginBottom:'0.3rem' }}>Climate Description</div>
            <div style={{ color:'var(--text2)', fontSize:'0.9rem', lineHeight:1.6 }}>{city.description}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
