import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext'

const CURRENCIES = ['USD','EUR','GBP','MAD','CAD','JPY']
const LANGS = [{ code:'en', label:'EN 🇬🇧' }, { code:'fr', label:'FR 🇫🇷' }, { code:'ar', label:'AR 🇲🇦' }]

export default function Navbar() {
  const { pathname } = useLocation()
  const { dark, setDark, lang, setLang, currency, setCurrency, t } = useApp()
  const [menuOpen, setMenuOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const isActive = (path) => pathname === path || (path !== '/' && pathname.startsWith(path))

  const navLinkStyle = (path) => ({
    color: isActive(path) ? 'var(--gold)' : 'rgba(255,255,255,0.75)',
    textDecoration:'none', fontWeight:500, fontSize:'0.88rem', transition:'color 0.2s', position:'relative',
  })

  return (
    <nav className="navbar" style={{ gap:'1rem' }}>
      <Link to="/" className="navbar-logo">Morocco<span>Travel</span></Link>

      {/* Main links */}
      <ul className="navbar-links" style={{ flex:1, justifyContent:'center' }}>
        <li className="hide-mobile"><Link to="/" style={navLinkStyle('/')} onClick={() => setMenuOpen(false)}>{t('home')}</Link></li>
        <li><Link to="/destinations" style={navLinkStyle('/destinations')} onClick={() => setMenuOpen(false)}>{t('destinations')}</Link></li>
        <li><Link to="/hotels" style={navLinkStyle('/hotels')} onClick={() => setMenuOpen(false)}>{t('hotels')}</Link></li>
        <li><Link to="/food" style={navLinkStyle('/food')} onClick={() => setMenuOpen(false)}>{t('food')}</Link></li>
        <li className="hide-mobile"><Link to="/culture" style={navLinkStyle('/culture')} onClick={() => setMenuOpen(false)}>{t('culture')}</Link></li>
        <li className="hide-mobile"><Link to="/transport" style={navLinkStyle('/transport')} onClick={() => setMenuOpen(false)}>{t('transport')}</Link></li>
        <li className="hide-mobile"><Link to="/weather" style={navLinkStyle('/weather')} onClick={() => setMenuOpen(false)}>{t('weather')}</Link></li>
        <li className="hide-mobile"><Link to="/map" style={navLinkStyle('/map')} onClick={() => setMenuOpen(false)}>{t('map')}</Link></li>
        {/* More dropdown */}
        <li style={{ position:'relative' }}>
          <button onClick={() => setMoreOpen(!moreOpen)} style={{ background:'none', border:'none', color:'rgba(255,255,255,0.75)', cursor:'pointer', fontSize:'0.88rem', fontWeight:500, display:'flex', alignItems:'center', gap:4, padding:0 }}>
            More ▾
          </button>
          {moreOpen && (
            <div style={{ position:'absolute', top:'100%', left:0, background:'#1a0a00', border:'1px solid rgba(201,151,58,0.2)', borderRadius:12, padding:'0.5rem', minWidth:180, zIndex:200, marginTop:8, boxShadow:'0 8px 32px rgba(0,0,0,0.4)' }}>
              {[['trip-planner',`✨ ${t('tripPlanner')}`],['emergency',`🆘 ${t('emergency')}`],['destinations/tangier','✦ Tangier Guide'],['hotels?city=Agadir','🏖️ Agadir'],['hotels?city=Rabat','🏛️ Rabat']].map(([path, label]) => (
                <Link key={path} to={`/${path}`} onClick={() => { setMoreOpen(false); setMenuOpen(false) }} style={{ display:'block', padding:'0.5rem 1rem', color:'rgba(255,255,255,0.75)', textDecoration:'none', fontSize:'0.85rem', borderRadius:8, transition:'background 0.2s' }} onMouseEnter={e=>e.target.style.background='rgba(201,151,58,0.1)'} onMouseLeave={e=>e.target.style.background='transparent'}>{label}</Link>
              ))}
            </div>
          )}
        </li>
      </ul>

      {/* Right tools */}
      <div style={{ display:'flex', alignItems:'center', gap:'0.6rem', flexShrink:0 }}>
        {/* Language */}
        <select value={lang} onChange={e => setLang(e.target.value)} style={{ background:'transparent', border:'1px solid rgba(255,255,255,0.2)', borderRadius:8, color:'rgba(255,255,255,0.8)', padding:'0.3rem 0.5rem', fontSize:'0.78rem', cursor:'pointer', outline:'none' }}>
          {LANGS.map(l => <option key={l.code} value={l.code} style={{ background:'#1a0a00' }}>{l.label}</option>)}
        </select>

        {/* Currency */}
        <select value={currency} onChange={e => setCurrency(e.target.value)} style={{ background:'transparent', border:'1px solid rgba(255,255,255,0.2)', borderRadius:8, color:'rgba(255,255,255,0.8)', padding:'0.3rem 0.5rem', fontSize:'0.78rem', cursor:'pointer', outline:'none' }}>
          {CURRENCIES.map(c => <option key={c} value={c} style={{ background:'#1a0a00' }}>{c}</option>)}
        </select>

        {/* Dark mode */}
        <button onClick={() => setDark(!dark)} style={{ background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.15)', borderRadius:8, width:34, height:34, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', fontSize:'1rem', transition:'background 0.2s' }} title={dark ? 'Light mode' : 'Dark mode'}>
          {dark ? '☀️' : '🌙'}
        </button>

        {/* Book Now CTA */}
        <Link to="/hotels" className="nav-cta" style={{ padding:'0.45rem 1.1rem', fontSize:'0.82rem', borderRadius:50, background:'var(--gold)', color:'var(--dark)', fontWeight:700, textDecoration:'none' }}>{t('bookNow')}</Link>
      </div>
    </nav>
  )
}
