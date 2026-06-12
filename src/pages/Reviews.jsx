import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Reviews() {
  const [testimonials, setTestimonials] = useState([])
  const [filteredReviews, setFilteredReviews] = useState([])
  const [selectedRating, setSelectedRating] = useState('all')
  const [searchHotel, setSearchHotel] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    axios.get('http://localhost:5000/api/testimonials')
      .then(r => {
        setTestimonials(r.data)
        setError(null)
      })
      .catch(err => {
        setError('Could not load reviews. Please try again later.')
        console.error(err)
      })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    let filtered = testimonials

    if (selectedRating !== 'all') {
      const rating = parseInt(selectedRating)
      filtered = filtered.filter(t => t.rating >= rating)
    }

    if (searchHotel) {
      filtered = filtered.filter(t =>
        t.hotel.toLowerCase().includes(searchHotel.toLowerCase()) ||
        t.name.toLowerCase().includes(searchHotel.toLowerCase()) ||
        t.country.toLowerCase().includes(searchHotel.toLowerCase())
      )
    }

    setFilteredReviews(filtered)
  }, [testimonials, selectedRating, searchHotel])

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2.5rem 2rem' }}>
      <div className="section-label">Guest Stories</div>
      <h1 className="section-title">Real Reviews from<br /><em style={{ color: 'var(--gold)' }}>Real Travellers</em></h1>
      <p className="section-subtitle">See what guests loved about their stays in Morocco</p>

      {error && (
        <div style={{ padding: '1rem', background: '#ffe6e6', borderRadius: 8, color: '#d32f2f', marginBottom: '1.5rem' }}>
          ⚠️ {error}
        </div>
      )}

      {/* Filters */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--text2)' }}>Search Hotel or Guest:</label>
          <input
            type="text"
            placeholder="Search by hotel name, guest name, or country..."
            value={searchHotel}
            onChange={e => setSearchHotel(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              borderRadius: 8,
              border: '1px solid var(--cream2)',
              fontSize: '0.95rem',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--text2)' }}>Filter by Rating:</label>
          <select
            value={selectedRating}
            onChange={e => setSelectedRating(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              borderRadius: 8,
              border: '1px solid var(--cream2)',
              fontSize: '0.95rem',
              cursor: 'pointer',
              boxSizing: 'border-box'
            }}
          >
            <option value="all">All Reviews</option>
            <option value="5">5 Stars ★★★★★</option>
            <option value="4">4+ Stars ★★★★</option>
            <option value="3">3+ Stars ★★★</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text2)' }}>
          Loading reviews...
        </div>
      ) : (
        <>
          <div style={{ marginBottom: '1rem', fontSize: '0.95rem', color: 'var(--text2)' }}>
            Showing {filteredReviews.length} of {testimonials.length} reviews
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {filteredReviews.map((review, i) => (
              <div
                key={review.id}
                style={{
                  background: 'var(--white)',
                  border: '1px solid var(--cream2)',
                  borderRadius: 12,
                  padding: '1.5rem',
                  transition: 'all 0.2s',
                  cursor: 'default'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)'
                  e.currentTarget.style.transform = 'translateY(-4px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = 'none'
                  e.currentTarget.style.transform = 'none'
                }}
              >
                {/* Rating Stars */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                  <div style={{ fontSize: '1.3rem', color: '#f39c12' }}>
                    {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text3)', background: 'var(--cream)', padding: '0.25rem 0.6rem', borderRadius: 4 }}>
                    {review.rating}/5
                  </div>
                </div>

                {/* Review Text */}
                <p style={{
                  fontSize: '0.95rem',
                  lineHeight: 1.6,
                  color: 'var(--text1)',
                  marginBottom: '1rem',
                  fontStyle: 'italic',
                  borderLeft: '3px solid var(--gold)',
                  paddingLeft: '1rem'
                }}>
                  "{review.text}"
                </p>

                {/* Guest Info */}
                <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid var(--cream2)' }}>
                  <img
                    src={review.avatar}
                    alt={review.name}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, color: 'var(--dark)', fontSize: '0.95rem' }}>
                      {review.name}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text3)' }}>
                      {review.country}
                    </div>
                  </div>
                </div>

                {/* Hotel Name */}
                <div style={{
                  marginTop: '0.8rem',
                  padding: '0.6rem 0.8rem',
                  background: 'var(--cream)',
                  borderRadius: 6,
                  fontSize: '0.8rem',
                  color: 'var(--text2)',
                  fontWeight: 500
                }}>
                  📍 {review.hotel}
                </div>
              </div>
            ))}
          </div>

          {filteredReviews.length === 0 && (
            <div style={{
              padding: '3rem 2rem',
              textAlign: 'center',
              background: 'var(--cream)',
              borderRadius: 12,
              color: 'var(--text2)'
            }}>
              <div style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>No reviews found</div>
              <p>Try adjusting your filters</p>
            </div>
          )}
        </>
      )}

      {/* CTA */}
      <div style={{
        marginTop: '3rem',
        padding: '2rem',
        background: 'linear-gradient(135deg, var(--cream) 0%, var(--cream2) 100%)',
        borderRadius: 14,
        textAlign: 'center'
      }}>
        <h3 style={{ fontFamily: 'Playfair Display,serif', fontSize: '1.5rem', color: 'var(--dark)', marginBottom: '0.5rem' }}>
          Ready to Create Your Own Story?
        </h3>
        <p style={{ color: 'var(--text2)', marginBottom: '1.5rem' }}>
          Browse our highest-rated hotels and book your unforgettable Moroccan adventure
        </p>
        <a href="/hotels" style={{
          display: 'inline-block',
          padding: '0.9rem 2rem',
          background: 'var(--gold)',
          color: 'var(--dark)',
          textDecoration: 'none',
          borderRadius: 50,
          fontWeight: 600,
          transition: 'all 0.2s'
        }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          Browse Hotels →
        </a>
      </div>
    </div>
  )
}
