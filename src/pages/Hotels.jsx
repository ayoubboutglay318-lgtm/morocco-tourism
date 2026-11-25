import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import axios from 'axios'
import HotelCard from '../components/HotelCard'
import { InFeedAd } from '../components/Monetization'
import { AD_SLOTS } from '../config'

gsap.registerPlugin(ScrollTrigger)

export default function Hotels() {
  const [hotels, setHotels] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams()
  const [city, setCity] = useState(searchParams.get('city') || '')
  const [priceLevel, setPriceLevel] = useState('')
  const [sortBy, setSortBy] = useState('default')
  const [stars, setStars] = useState('')
  const headerRef = useRef()

  useEffect(() => {
    // eslint-disable-next-line
    setLoading(true)
    const params = {}
    if (city) params.city = city
    if (priceLevel) params.priceLevel = priceLevel
    if (stars) params.stars = stars
    axios.get('/api/hotels', { params })
      .then(r => {
        let data = r.data
        if (sortBy === 'price-asc')  data = [...data].sort((a, b) => a.priceLevel.length - b.priceLevel.length)
        if (sortBy === 'price-desc') data = [...data].sort((a, b) => b.priceLevel.length - a.priceLevel.length)
        if (sortBy === 'stars')      data = [...data].sort((a, b) => b.stars - a.stars)
        setHotels(data)
        setLoading(false)
      })
      .catch(() => { setHotels([]); setLoading(false) })
  }, [city, priceLevel, sortBy, stars])

  useEffect(() => {
    gsap.fromTo(headerRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
  }, [])

  useEffect(() => {
    if (!loading) {
      gsap.utils.toArray('.hotel-card').forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, delay: i * 0.06, ease: 'power3.out' }
        )
      })
    }
  }, [loading])

  return (
    <div className="hotels-page">
      <div ref={headerRef}>
        <div className="section-label" style={{ marginBottom: '0.5rem' }}>All Properties</div>
        <h1>Hotels & Riads<br /><span style={{ color: 'var(--gold)', fontStyle: 'italic' }}>in Morocco</span></h1>
        <p className="subtitle">{hotels.length} well-known stays across the kingdom · price ranges are approximate, check live rates before booking</p>
      </div>

      <div className="filters">
        <div className="filter-group">
          <label>City</label>
          <input
            type="text"
            placeholder="e.g. Marrakech"
            value={city}
            onChange={e => { setCity(e.target.value); setSearchParams(e.target.value ? { city: e.target.value } : {}) }}
          />
        </div>
        <div className="filter-group">
          <label>Price Range</label>
          <select value={priceLevel} onChange={e => setPriceLevel(e.target.value)}>
            <option value="">Any</option>
            <option value="$">$ Budget</option>
            <option value="$$">$$ Mid-range</option>
            <option value="$$$">$$$ Upscale</option>
            <option value="$$$$">$$$$ Luxury</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Stars</label>
          <select value={stars} onChange={e => setStars(e.target.value)}>
            <option value="">All Stars</option>
            <option value="5">★★★★★ 5-Star</option>
            <option value="4">★★★★ 4-Star</option>
            <option value="3">★★★ 3-Star</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Sort By</label>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="default">Default</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="stars">Star Category</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading hotels...</div>
      ) : hotels.length === 0 ? (
        <div className="loading">No hotels found. Try different filters.</div>
      ) : (
        <div className="hotels-grid">
          {hotels.map((h, i) => (
            <div key={h.id} style={{ display: 'contents' }}>
              <HotelCard hotel={h} />
              {i === 5 && AD_SLOTS.inFeed && (
                <div style={{ gridColumn: '1 / -1', margin: '1rem 0' }}>
                  <InFeedAd slot={AD_SLOTS.inFeed} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
