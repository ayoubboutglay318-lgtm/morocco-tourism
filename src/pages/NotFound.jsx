import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '3rem 2rem' }}>
      <div style={{ fontSize: '6rem', marginBottom: '1rem', opacity: 0.3 }}>🏜️</div>
      <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, marginBottom: '0.5rem', color: 'var(--dark)' }}>
        404 — Lost in the Sahara
      </h1>
      <p style={{ color: 'var(--text3)', fontSize: '1.1rem', maxWidth: 480, marginBottom: '2rem', lineHeight: 1.7 }}>
        This page doesn't exist. But don't worry — Morocco has plenty of real wonders waiting for you.
      </p>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link to="/" className="btn-primary">Back to Home</Link>
        <Link to="/hotels" className="btn-outline">Browse Hotels</Link>
      </div>
    </div>
  )
}

