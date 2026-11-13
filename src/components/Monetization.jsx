// Ad component for Google AdSense placements
// Replace 'ca-pub-XXXXXXXXXXXXXXXX' with your real AdSense publisher ID
// Replace 'XXXXXXXXXX' with your real ad slot IDs

import { useEffect, useRef } from 'react'

const AD_CLIENT = 'ca-pub-XXXXXXXXXXXXXXXX' // TODO: Replace with your AdSense publisher ID

export function AdBanner({ slot = 'XXXXXXXXXX', format = 'auto', style = {} }) {
  const adRef = useRef(null)
  const pushed = useRef(false)

  useEffect(() => {
    if (pushed.current) return
    try {
      if (window.adsbygoogle && adRef.current) {
        window.adsbygoogle.push({})
        pushed.current = true
      }
    } catch {
      // AdSense not loaded yet or ad blocker active
    }
  }, [])

  return (
    <div style={{ textAlign: 'center', margin: '2rem 0', minHeight: 90, ...style }}>
      <ins
        className="adsbygoogle"
        ref={adRef}
        style={{ display: 'block' }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  )
}

// Affiliate link component for hotels
export function AffiliateLinks({ hotel }) {
  const bookingUrl = `https://www.booking.com/search.html?ss=${encodeURIComponent(hotel.name + ' ' + hotel.city + ' Morocco')}&aid=YOUR_AFFILIATE_ID`
  const agodaUrl = `https://www.agoda.com/search?q=${encodeURIComponent(hotel.name + ' ' + hotel.city)}&cid=YOUR_AGODA_CID`
  const gyUrl = `https://www.getyourguide.com/s/?q=${encodeURIComponent(hotel.city + ' Morocco tours')}&partner_id=YOUR_GYG_ID`

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
      <div style={{ fontSize: '0.7rem', color: 'var(--text3)', marginTop: '0.8rem', opacity: 0.7 }}>
        We may earn a small commission — at no extra cost to you
      </div>
    </div>
  )
}

// In-feed ad placeholder (between hotel listings)
export function InFeedAd() {
  return (
    <div style={{
      background: 'var(--cream)',
      border: '1px dashed var(--cream2)',
      borderRadius: 16,
      padding: '2rem',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 280,
    }}>
      <AdBanner slot="IN_FEED_SLOT" format="fluid" />
    </div>
  )
}

