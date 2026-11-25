import { Link } from 'react-router-dom'
import { WHATSAPP_URL } from '../config'

// Edit this page with your own story and a photo of yourself — real people build trust.
export default function About() {
  return (
    <div style={{ maxWidth: 820, margin: '0 auto', padding: '2.5rem 1.5rem 4rem' }}>
      <div className="section-label">About</div>
      <h1 className="section-title">About<br /><em style={{ color: 'var(--gold)' }}>Morocco Travel</em></h1>

      <div style={{ lineHeight: 1.85, color: 'var(--text2)', fontSize: '1.02rem' }}>
        <p>
          Morocco Travel is an independent travel guide made by <strong>Ayoub</strong>, based in Morocco.
          The goal is simple: give travellers clear, honest and practical information to plan a trip —
          where to go, how to get around, what to eat, where to stay, and what to do if something goes wrong.
        </p>

        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', margin: '2rem 0 0.6rem', color: 'var(--dark)' }}>How this guide is made</h2>
        <ul style={{ paddingLeft: '1.2rem' }}>
          <li>We do not publish invented reviews, ratings or visitor numbers.</li>
          <li>Hotels listed are real, well-known properties. Prices change daily, so we show an approximate range and link to live prices.</li>
          <li>Emergency numbers and embassy contacts are checked against official government sources.</li>
          <li>Photos marked "Photo: city name" show the destination, not the hotel itself. Food photos are credited to their photographers.</li>
        </ul>

        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', margin: '2rem 0 0.6rem', color: 'var(--dark)' }}>How we can help</h2>
        <p>
          Send us your dates, the cities you want to see and your budget on WhatsApp, and we will reply personally
          with suggestions for drivers, desert camps, riads and day trips. We do not take payments on this website.
        </p>

        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', margin: '2rem 0 0.6rem', color: 'var(--dark)' }}>How the site is funded</h2>
        <p>
          Some links to booking and tour websites may be affiliate links: if you book through them, we may earn a small
          commission at no extra cost to you. This never changes what we recommend.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '2rem' }}>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">Chat on WhatsApp</a>
        <Link to="/contact" className="btn-outline">Contact</Link>
      </div>
    </div>
  )
}
