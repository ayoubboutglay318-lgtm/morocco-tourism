// Google AdSense placements and affiliate links.
// Ads render ONLY when VITE_ADSENSE_CLIENT is set (and slot IDs are real numbers);
// otherwise nothing is shown — no empty boxes. See src/config.js.

import { useEffect, useRef } from 'react'
import { ADSENSE_CLIENT, ADS_ALLOWED, HAS_AFFILIATES, bookingSearchUrl, agodaSearchUrl, gygSearchUrl } from '../config'

const isRealSlot = slot => /^\d{6,}$/.test(String(slot))

export function AdBanner({ slot, format = 'auto', style = {} }) {
  const adRef = useRef(null)
  const pushed = useRef(false)
  const enabled = ADS_ALLOWED() && isRealSlot(slot)

  useEffect(() => {
    if (!enabled || pushed.current) return
    try {
      if (window.adsbygoogle && adRef.current) {
        window.adsbygoogle.push({})
        pushed.current = true
      }
    } catch {
      // AdSense not loaded yet or ad blocker active
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div style={{ textAlign: 'center', margin: '2rem 0', minHeight: 90, ...style }}>
      <ins
        className="adsbygoogle"
        ref={adRef}
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  )
}

// Affiliate link component for hotels
export function AffiliateLinks({ hotel }) {
  const bookingUrl = bookingSearchUrl(`${hotel.name} ${hotel.city} Morocco`)
  const agodaUrl = agodaSearchUrl(`${hotel.name} ${hotel.city}`)
  const gyUrl = gygSearchUrl(`${hotel.city} Morocco tours`)

  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(201,151,58,0.08) 0%, rgba(201,151,58,0.03) 100%)',
      border: '1px solid rgba(201,151,58,0.2)',
      borderRadius: 16,
      padding: '1.5rem',
      marginTop: '1.5rem',
    }}>
      <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--gold)', marginBottom: '0.8rem' }}>
        Compare Prices & Book
      </div>
      <p style={{ color: 'var(--text3)', fontSize: '0.88rem', marginBottom: '1rem' }}>
        Check availability and prices on these trusted booking platforms:
      </p>
      <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
        <a
          href={bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            padding: '0.6rem 1.2rem', borderRadius: 50, background: '#003580', color: '#fff',
            textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600, transition: 'all 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseLeave={e => e.currentTarget.style.transform = ''}
        >
          🔵 Booking.com
        </a>
        <a
          href={agodaUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            padding: '0.6rem 1.2rem', borderRadius: 50, background: '#5C2D91', color: '#fff',
            textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600, transition: 'all 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseLeave={e => e.currentTarget.style.transform = ''}
        >
          🟣 Agoda
        </a>
        <a
          href={gyUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            padding: '0.6rem 1.2rem', borderRadius: 50, background: '#FF5533', color: '#fff',
            textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600, transition: 'all 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseLeave={e => e.currentTarget.style.transform = ''}
        >
          🟠 Tours in {hotel.city}
        </a>
      </div>
      {HAS_AFFILIATES && (
        <div style={{ fontSize: '0.7rem', color: 'var(--text3)', marginTop: '0.8rem', opacity: 0.7 }}>
          We may earn a small commission — at no extra cost to you
        </div>
      )}
    </div>
  )
}

// In-feed ad between hotel listings — hidden until AdSense is configured
export function InFeedAd({ slot }) {
  if (!ADS_ALLOWED() || !isRealSlot(slot)) return null
  return (
    <div style={{ background: 'var(--cream)', borderRadius: 16, padding: '1rem', minHeight: 280 }}>
      <AdBanner slot={slot} format="fluid" />
    </div>
  )
}
