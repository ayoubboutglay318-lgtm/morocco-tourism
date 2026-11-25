import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ADSENSE_CLIENT, getCookieConsent } from '../config'

// Only needed when ads are enabled — the site sets no other cookies.
export default function CookieBanner() {
  const [choice, setChoice] = useState(getCookieConsent)
  if (!ADSENSE_CLIENT || choice) return null

  const decide = value => {
    try { localStorage.setItem('cookieConsent', value) } catch { /* storage unavailable */ }
    setChoice(value)
    if (value === 'accepted') window.location.reload()
  }

  return (
    <div role="dialog" aria-label="Cookie choice" style={{ position: 'fixed', left: 16, right: 16, bottom: 16, zIndex: 9999, maxWidth: 640, margin: '0 auto', background: '#1a0a00', color: '#fff', borderRadius: 16, padding: '1rem 1.2rem', boxShadow: '0 8px 32px rgba(0,0,0,0.35)', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <div style={{ flex: '1 1 280px', fontSize: '0.88rem', lineHeight: 1.5 }}>
        We use advertising cookies from Google to help fund this free guide. You can accept or refuse them. <Link to="/privacy" style={{ color: 'var(--gold-light, #e8c27a)' }}>Privacy policy</Link>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button type="button" onClick={() => decide('refused')} style={{ background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.4)', borderRadius: 50, padding: '0.5rem 1rem', cursor: 'pointer', fontWeight: 600 }}>Refuse</button>
        <button type="button" onClick={() => decide('accepted')} className="btn-primary" style={{ padding: '0.5rem 1.2rem' }}>Accept</button>
      </div>
    </div>
  )
}
