import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import axios from 'axios'
import HotelCard from '../components/HotelCard'

gsap.registerPlugin(ScrollTrigger)

export default function Hotels() {
  const [hotels, setHotels] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams()
  const [city, setCity] = useState(searchParams.get('city') || '')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [sortBy, setSortBy] = useState('default')
  const [stars, setStars] = useState('')
  const headerRef = useRef()

  useEffect(() => {
    setLoading(true)
    const params = {}
    if (city) params.city = city
    if (minPrice) params.minPrice = minPrice
    if (maxPrice) params.maxPrice = maxPrice
    if (stars) params.stars = stars
    axios.get('/api/hotels', { params })
      .then(r => {
        let data = r.data
        if (sortBy === 'price-asc')  data = [...data].sort((a, b) => a.price - b.price)
        if (sortBy === 'price-desc') data = [...data].sort((a, b) => b.price - a.price)
        if (sortBy === 'rating')     data = [...data].sort((a, b) => b.rating - a.rating)
        setHotels(data)
        setLoading(false)
      })
  }, [city, minPrice, maxPrice, sortBy, stars])

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
        <p className="subtitle">{hotels.length} handpicked stays across the kingdom</p>
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
          <label>Min Price ($/night)</label>
          <input type="number" placeholder="0" value={minPrice} onChange={e => setMinPrice(e.target.value)} />
        </div>
        <div className="filter-group">
          <label>Max Price ($/night)</label>
          <input type="number" placeholder="1000" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} />
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
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading hotels...</div>
      ) : hotels.length === 0 ? (
        <div className="loading">No hotels found. Try different filters.</div>
      ) : (
        <div className="hotels-grid">
          {hotels.map(h => <HotelCard key={h.id} hotel={h} />)}
        </div>
      )}
    </div>
  )
}
