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


// Live conditions from Open-Meteo (free, no API key): https://open-meteo.com
const CITY_COORDS = {
  Marrakech: [31.63, -8.0], Tangier: [35.77, -5.8], Fes: [34.03, -5.0], Chefchaouen: [35.17, -5.27],
  Essaouira: [31.51, -9.77], Merzouga: [31.1, -4.01], Casablanca: [33.57, -7.59], Agadir: [30.42, -9.6], Rabat: [34.02, -6.83],
}
const WMO = { 0:'☀️ Clear', 1:'🌤️ Mostly clear', 2:'⛅ Partly cloudy', 3:'☁️ Overcast', 45:'🌫️ Fog', 48:'🌫️ Fog', 51:'🌦️ Light drizzle', 53:'🌦️ Drizzle', 55:'🌦️ Drizzle', 61:'🌧️ Light rain', 63:'🌧️ Rain', 65:'🌧️ Heavy rain', 71:'🌨️ Light snow', 73:'🌨️ Snow', 75:'❄️ Heavy snow', 80:'🌦️ Showers', 81:'🌧️ Showers', 82:'⛈️ Heavy showers', 95:'⛈️ Thunderstorm', 96:'⛈️ Thunderstorm', 99:'⛈️ Thunderstorm' }
const wmo = c => WMO[c] || '🌡️'

function LiveWeather({ city }) {
  const [state, setState] = useState({ status: 'loading', data: null })
  useEffect(() => {
    const coords = CITY_COORDS[city]
    if (!coords) return
    let cancelled = false
    // eslint-disable-next-line
    setState({ status: 'loading', data: null })
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords[0]}&longitude=${coords[1]}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Africa%2FCasablanca&forecast_days=7`
    fetch(url)
      .then(r => { if (!r.ok) throw new Error(r.status); return r.json() })
      .then(data => { if (!cancelled) setState({ status: 'ok', data }) })
      .catch(() => { if (!cancelled) setState({ status: 'error', data: null }) })
    return () => { cancelled = true }
  }, [city])

  if (!CITY_COORDS[city]) return null
  if (state.status === 'loading') return <div className="loading" style={{ padding: '1.5rem' }}>Loading live weather for {city}…</div>
  if (state.status === 'error') return <div style={{ padding: '1rem', background: 'var(--cream)', borderRadius: 12, marginBottom: '2rem', fontSize: '0.9rem' }}>Live weather is unavailable right now — the monthly averages below still apply.</div>

  const { current, daily } = state.data
  return (
    <div style={{ background: 'var(--white)', border: '1px solid var(--cream2)', borderRadius: 20, padding: '1.5rem', marginBottom: '2rem', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
        <h2 style={{ fontFamily: 'Playfair Display,serif', fontSize: '1.3rem', margin: 0 }}>Live in {city}</h2>
        <span style={{ fontSize: '0.75rem', color: 'var(--text3)' }}>Updated {current.time.replace('T', ' ')} · data: Open-Meteo</span>
      </div>
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '1.2rem' }}>
        <div style={{ fontSize: '2.6rem', fontWeight: 900 }}>{Math.round(current.temperature_2m)}°C</div>
        <div style={{ fontSize: '1rem' }}>{wmo(current.weather_code)}</div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text2)' }}>Feels like {Math.round(current.apparent_temperature)}° · Humidity {current.relative_humidity_2m}% · Wind {Math.round(current.wind_speed_10m)} km/h</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))', gap: '0.6rem' }}>
        {daily.time.map((d, i) => (
          <div key={d} style={{ background: 'var(--cream)', borderRadius: 12, padding: '0.7rem', textAlign: 'center', fontSize: '0.8rem' }}>
            <div style={{ fontWeight: 700 }}>{new Date(d + 'T12:00:00').toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric' })}</div>
            <div style={{ fontSize: '1.3rem', margin: '0.2rem 0' }}>{wmo(daily.weather_code[i]).split(' ')[0]}</div>
            <div><strong>{Math.round(daily.temperature_2m_max[i])}°</strong> / {Math.round(daily.temperature_2m_min[i])}°</div>
            <div style={{ color: '#3498db' }}>💧 {daily.precipitation_probability_max[i] ?? 0}%</div>
          </div>
        ))}
      </div>
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
      <p className="section-subtitle">Live conditions, a 7-day forecast and monthly climate averages for major cities in Morocco</p>

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

      <LiveWeather city={selected} />

      {/* Current month climate averages */}
      <div style={{ background:'linear-gradient(135deg, var(--dark) 0%, var(--dark2) 100%)', borderRadius:20, padding:'2rem', color:'#fff', marginBottom:'2rem', display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr', gap:'1.5rem' }}>
        <div>
          <div style={{ fontSize:'0.78rem', color:'rgba(255,255,255,0.5)', textTransform:'uppercase', letterSpacing:1, marginBottom:'0.3rem' }}>Average for this month · {selected}</div>
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
