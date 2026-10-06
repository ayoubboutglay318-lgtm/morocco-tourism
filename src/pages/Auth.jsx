import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import axios from 'axios'
import { useApp } from '../context/AppContext'

export default function Auth() {
  const { user, login, logout } = useApp()

  const [mode, setMode] = useState('login') // 'login' | 'register' | 'profile'
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [profileData, setProfileData] = useState(null)

  useEffect(() => {
    if (user) {
      // eslint-disable-next-line
      setMode('profile')
      // Fetch profile data
      const token = localStorage.getItem('authToken')
      if (token) {
        axios.get('/api/auth/profile', { headers: { Authorization: `Bearer ${token}` } })
          .then(r => setProfileData(r.data))
          .catch(() => {})
      }
    }
  }, [user])

  // Animation
  useEffect(() => {
    gsap.fromTo('.auth-card',
      { opacity: 0, y: 30, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out' }
    )
  }, [mode])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (mode === 'register') {
        if (!form.name || !form.email || !form.password) {
          setError('All fields are required')
          setLoading(false)
          return
        }
        if (form.password.length < 6) {
          setError('Password must be at least 6 characters')
          setLoading(false)
          return
        }
        const res = await axios.post('/api/auth/register', form)
        localStorage.setItem('authToken', res.data.token)
        login(res.data.user)
        setMode('profile')
      } else {
        if (!form.email || !form.password) {
          setError('Email and password are required')
          setLoading(false)
          return
        }
        const res = await axios.post('/api/auth/login', { email: form.email, password: form.password })
        localStorage.setItem('authToken', res.data.token)
        login(res.data.user)
        setMode('profile')
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    logout()
    setMode('login')
    setForm({ name: '', email: '', password: '' })
    setProfileData(null)
  }

  // Profile view
  if (mode === 'profile' && user) {
    const data = profileData || user
    return (
      <div className="auth-page">
        <section className="auth-hero">
          <div className="auth-hero-bg" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1559925523-10de9e23cf90?w=1600&q=80&fit=crop)` }} />
          <div className="auth-hero-overlay" />
        </section>

        <div className="auth-container">
          <div className="auth-card profile-card">
            <div className="profile-header">
              <img src={data.avatar} alt={data.name} className="profile-avatar" />
              <h2>{data.name}</h2>
              <p className="profile-email">{data.email}</p>
              <div className="profile-badge">
                <span className="profile-badge-icon">✦</span>
                Morocco Explorer
              </div>
            </div>

            <div className="profile-stats">
              <div className="profile-stat">
                <span className="profile-stat-num">{data.favorites?.length || 0}</span>
                <span className="profile-stat-label">Favorites</span>
              </div>
              <div className="profile-stat">
                <span className="profile-stat-num">0</span>
                <span className="profile-stat-label">Bookings</span>
              </div>
              <div className="profile-stat">
                <span className="profile-stat-num">0</span>
                <span className="profile-stat-label">Reviews</span>
              </div>
            </div>

            <div className="profile-section">
              <h3>Quick Actions</h3>
              <div className="profile-actions">
                <Link to="/favorites" className="profile-action-btn">
                  <span>♥</span> My Wishlist
                </Link>
                <Link to="/hotels" className="profile-action-btn">
                  <span>🏨</span> Browse Hotels
                </Link>
                <Link to="/trip-planner" className="profile-action-btn">
                  <span>✨</span> Plan a Trip
                </Link>
                <Link to="/reviews" className="profile-action-btn">
                  <span>⭐</span> My Reviews
                </Link>
              </div>
            </div>

            <div className="profile-section">
              <h3>Member Since</h3>
              <p className="profile-date">
                {data.createdAt ? new Date(data.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Today'}
              </p>
            </div>

            <button className="auth-logout-btn" onClick={handleLogout}>
              Sign Out
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Login/Register view
  return (
    <div className="auth-page">
      <section className="auth-hero">
        <div className="auth-hero-bg" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1559925523-10de9e23cf90?w=1600&q=80&fit=crop)` }} />
        <div className="auth-hero-overlay" />
      </section>

      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-card-header">
            <h2>{mode === 'login' ? 'Welcome Back' : 'Join Morocco Travel'}</h2>
            <p>{mode === 'login' ? 'Sign in to access your favorites and bookings' : 'Create an account to start your Moroccan adventure'}</p>
          </div>

          {/* Mode Toggle */}
          <div className="auth-toggle">
            <button
              className={`auth-toggle-btn ${mode === 'login' ? 'active' : ''}`}
              onClick={() => { setMode('login'); setError('') }}
            >
              Sign In
            </button>
            <button
              className={`auth-toggle-btn ${mode === 'register' ? 'active' : ''}`}
              onClick={() => { setMode('register'); setError('') }}
            >
              Sign Up
            </button>
          </div>

          {error && (
            <div className="auth-error">
              <span>⚠</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            {mode === 'register' && (
              <div className="auth-field">
                <label htmlFor="auth-name">Full Name</label>
                <input
                  id="auth-name"
                  type="text"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  autoComplete="name"
                />
              </div>
            )}
            <div className="auth-field">
              <label htmlFor="auth-email">Email Address</label>
              <input
                id="auth-email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                autoComplete="email"
              />
            </div>
            <div className="auth-field">
              <label htmlFor="auth-password">Password</label>
              <input
                id="auth-password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
              />
            </div>

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? (
                <span className="auth-spinner" />
              ) : (
                mode === 'login' ? 'Sign In' : 'Create Account'
              )}
            </button>
          </form>

          <div className="auth-footer">
            {mode === 'login' ? (
              <p>Don't have an account? <button onClick={() => { setMode('register'); setError('') }}>Sign up</button></p>
            ) : (
              <p>Already have an account? <button onClick={() => { setMode('login'); setError('') }}>Sign in</button></p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
