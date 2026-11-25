import { Link } from 'react-router-dom'
import { WHATSAPP_NUMBER, WHATSAPP_URL } from '../config'

const pretty = `+${WHATSAPP_NUMBER.slice(0, 3)} ${WHATSAPP_NUMBER.slice(3, 6)} ${WHATSAPP_NUMBER.slice(6, 9)} ${WHATSAPP_NUMBER.slice(9)}`

export default function Contact() {
  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '2.5rem 1.5rem 4rem' }}>
      <div className="section-label">Contact</div>
      <h1 className="section-title">Get in<br /><em style={{ color: 'var(--gold)' }}>Touch</em></h1>
      <p className="section-subtitle">The fastest way to reach us is WhatsApp. We reply personally, usually the same day.</p>

      <div style={{ background: 'var(--white)', border: '1px solid var(--cream2)', borderRadius: 20, padding: '1.8rem', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
        <div style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.3rem' }}>💬 WhatsApp</div>
        <div style={{ color: 'var(--text2)', marginBottom: '1.2rem' }}>{pretty}</div>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">Open WhatsApp chat</a>

        <div style={{ marginTop: '1.8rem', fontSize: '0.9rem', color: 'var(--text3)', lineHeight: 1.7 }}>
          To help us answer quickly, please include:
          <ul style={{ paddingLeft: '1.2rem', marginTop: '0.4rem' }}>
            <li>your travel dates and number of travellers</li>
            <li>the cities or regions you want to visit</li>
            <li>your approximate budget and anything special (desert night, airport transfer…)</li>
          </ul>
        </div>
      </div>

      <p style={{ marginTop: '2rem', fontSize: '0.9rem', color: 'var(--text3)' }}>
        In an emergency in Morocco, do not wait for a reply — see our <Link to="/emergency" style={{ color: 'var(--gold)' }}>emergency numbers</Link>.
      </p>
    </div>
  )
}
