// Central site configuration.
// Monetization IDs come from Vercel environment variables (Project → Settings → Environment Variables).
// While an ID is empty, the matching feature stays hidden or the link works without a tracking code.

export const WHATSAPP_NUMBER = '212689122018'

export const whatsappLink = (message = 'Hello! I would like to plan a trip to Morocco. Could you help me?') =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

export const WHATSAPP_URL = whatsappLink()

export const ADSENSE_CLIENT = import.meta.env.VITE_ADSENSE_CLIENT || ''   // e.g. ca-pub-1234567890123456
export const BOOKING_AID = import.meta.env.VITE_BOOKING_AID || ''         // Booking.com affiliate id
export const AGODA_CID = import.meta.env.VITE_AGODA_CID || ''             // Agoda partner cid
export const GYG_PARTNER_ID = import.meta.env.VITE_GYG_PARTNER_ID || ''   // GetYourGuide partner id

const withParam = (url, key, value) => (value ? `${url}&${key}=${encodeURIComponent(value)}` : url)

export const bookingSearchUrl = q =>
  withParam(`https://www.booking.com/searchresults.html?ss=${encodeURIComponent(q)}`, 'aid', BOOKING_AID)
export const agodaSearchUrl = q =>
  withParam(`https://www.agoda.com/search?q=${encodeURIComponent(q)}`, 'cid', AGODA_CID)
export const gygSearchUrl = q =>
  withParam(`https://www.getyourguide.com/s/?q=${encodeURIComponent(q)}`, 'partner_id', GYG_PARTNER_ID)

export const HAS_AFFILIATES = Boolean(BOOKING_AID || AGODA_CID || GYG_PARTNER_ID)

// AdSense ad-unit slot IDs (numbers from your AdSense dashboard)
export const AD_SLOTS = {
  home: import.meta.env.VITE_AD_SLOT_HOME || '',
  hotel: import.meta.env.VITE_AD_SLOT_HOTEL || '',
  blog: import.meta.env.VITE_AD_SLOT_BLOG || '',
  inFeed: import.meta.env.VITE_AD_SLOT_INFEED || '',
}

// Public address of the site (used for canonical links and social previews).
// Set VITE_SITE_URL in Vercel when you connect your own domain, e.g. https://www.yourdomain.com
export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://morocco-tourism-ir75.vercel.app').replace(/\/$/, '')
export const SITE_NAME = 'Morocco Travel'

// Visitor's cookie choice for advertising ('accepted' | 'refused' | null)
export const getCookieConsent = () => {
  try { return localStorage.getItem('cookieConsent') } catch { return null }
}
export const ADS_ALLOWED = () => Boolean(ADSENSE_CLIENT) && getCookieConsent() === 'accepted'
