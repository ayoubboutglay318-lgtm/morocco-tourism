import { WHATSAPP_URL } from '../config'

const h2 = { fontFamily: 'Playfair Display, serif', fontSize: '1.3rem', margin: '2rem 0 0.6rem', color: 'var(--dark)' }

// Describes what this site actually does with data. Update it if you add new services.
export default function Privacy() {
  return (
    <div style={{ maxWidth: 820, margin: '0 auto', padding: '2.5rem 1.5rem 4rem', lineHeight: 1.8, color: 'var(--text2)' }}>
      <div className="section-label">Legal</div>
      <h1 className="section-title">Privacy Policy</h1>
      <p style={{ fontSize: '0.85rem', color: 'var(--text3)' }}>Last updated: November 2026</p>

      <p>This page explains what information Morocco Travel ("we") collects when you use this website, and how it is used.</p>

      <h2 style={h2}>Information we collect</h2>
      <p><strong>No accounts.</strong> You do not need to create an account, and we do not ask for passwords or payment details.</p>
      <p><strong>Saved in your browser only.</strong> Your favourite hotels, language choice, light/dark theme and cookie choice are stored in your own browser (local storage). They are not sent to us and you can clear them at any time in your browser settings.</p>
      <p><strong>WhatsApp messages.</strong> When you use a WhatsApp button, a message is prepared on your device and sent through WhatsApp only if you choose to send it. We then receive your message and phone number like any WhatsApp contact, and use them only to answer your request. WhatsApp's own privacy policy applies to that service.</p>
      <p><strong>Technical logs and statistics.</strong> Our hosting provider (Vercel) processes standard technical data such as IP address and browser type to deliver the site and protect it from abuse. If enabled, Vercel Web Analytics gives us anonymous visit statistics without using cookies.</p>

      <h2 style={h2}>Third-party services</h2>
      <ul style={{ paddingLeft: '1.2rem' }}>
        <li><strong>Weather:</strong> the weather page loads forecasts from Open-Meteo directly from your browser.</li>
        <li><strong>Maps and images:</strong> map tiles (OpenStreetMap) and photos (Unsplash, Wikimedia Commons) are loaded from those services, which receive your IP address as part of the request.</li>
        <li><strong>Booking and tour websites:</strong> links to sites such as Booking.com, Agoda or GetYourGuide may include an affiliate code. Once you leave our site, their privacy policies apply.</li>
        <li><strong>Advertising:</strong> if advertising is shown on this site, it is provided by Google AdSense, which may use cookies to show and measure ads. Ads and their cookies load only after you accept them in the cookie banner. You can learn more at policies.google.com/technologies/ads.</li>
      </ul>

      <h2 style={h2}>Your choices</h2>
      <p>You can refuse advertising cookies in the banner, or change your choice at any time with the "Cookie settings" link at the bottom of this page. You can also block or delete cookies in your browser.</p>

      <h2 style={h2}>Contact</h2>
      <p>For any question about your data, or to ask us to delete your messages, contact us on <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)' }}>WhatsApp</a>.</p>

      <button
        type="button"
        className="btn-outline"
        style={{ marginTop: '1.5rem' }}
        onClick={() => { try { localStorage.removeItem('cookieConsent') } catch { /* storage unavailable */ } window.location.reload() }}
      >
        Cookie settings
      </button>
    </div>
  )
}
