import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { SITE_URL, SITE_NAME } from '../config'

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=1200&q=85&fit=crop'

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

// Per-page title, description, canonical URL and social-preview tags.
export default function Seo({ title, description, image, type = 'website', noindex = false, jsonLd }) {
  const { pathname } = useLocation()
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Guide to Destinations, Riads, Food & Tips`
    const url = SITE_URL + pathname
    document.title = fullTitle
    if (description) {
      setMeta('name', 'description', description)
      setMeta('property', 'og:description', description)
      setMeta('name', 'twitter:description', description)
    }
    setMeta('property', 'og:title', fullTitle)
    setMeta('name', 'twitter:title', fullTitle)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:type', type)
    setMeta('property', 'og:image', image || DEFAULT_IMAGE)
    setMeta('name', 'twitter:image', image || DEFAULT_IMAGE)
    setMeta('name', 'robots', noindex ? 'noindex, follow' : 'index, follow')
    setLink('canonical', url)

    const id = 'page-jsonld'
    document.getElementById(id)?.remove()
    if (jsonLd) {
      const s = document.createElement('script')
      s.type = 'application/ld+json'
      s.id = id
      s.textContent = JSON.stringify(jsonLd)
      document.head.appendChild(s)
    }
  }, [title, description, image, type, noindex, jsonLd, pathname])
  return null
}
