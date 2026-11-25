import { Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import ScrollToTop from './components/ScrollToTop'
import Navbar from './components/Navbar'
import { lazy, Suspense } from 'react'
import { Analytics } from '@vercel/analytics/react'
import RouteSeo from './components/RouteSeo'
import CookieBanner from './components/CookieBanner'
import Footer from './components/Footer'
import Home from './pages/Home'

// Other pages load on demand so the first visit downloads less code (faster on phones)
const Hotels = lazy(() => import('./pages/Hotels'))
const HotelDetail = lazy(() => import('./pages/HotelDetail'))
const Booking = lazy(() => import('./pages/Booking'))
const Destinations = lazy(() => import('./pages/Destinations'))
const DestinationDetail = lazy(() => import('./pages/DestinationDetail'))
const Food = lazy(() => import('./pages/Food'))
const Culture = lazy(() => import('./pages/Culture'))
const Transport = lazy(() => import('./pages/Transport'))
const Emergency = lazy(() => import('./pages/Emergency'))
const Weather = lazy(() => import('./pages/Weather'))
const TripPlanner = lazy(() => import('./pages/TripPlanner'))
const MapPage = lazy(() => import('./pages/MapPage'))
const Gallery = lazy(() => import('./pages/Gallery'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const Favorites = lazy(() => import('./pages/Favorites'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const Privacy = lazy(() => import('./pages/Privacy'))
const NotFound = lazy(() => import('./pages/NotFound'))
import { WHATSAPP_URL } from './config'
import './App.css'

function App() {
  return (
    <AppProvider>
      <ScrollToTop />
      <Navbar />

      {/* Floating WhatsApp Booking Button */}
      <a
        id="whatsapp-booking-btn"
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label="Chat with us on WhatsApp"
      >
        <span className="whatsapp-float__icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.112 1.522 5.847L.057 23.882a.5.5 0 0 0 .606.625l6.218-1.634A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.003-1.368l-.358-.213-3.712.976.993-3.624-.234-.373A9.818 9.818 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
          </svg>
        </span>
        <span className="whatsapp-float__label">Chat on WhatsApp</span>
      </a>

      <RouteSeo />
      <Suspense fallback={<div className="loading">Loading…</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/hotels/:id" element={<HotelDetail />} />
        <Route path="/hotels/:id/book" element={<Booking />} />
        <Route path="/booking-success" element={<Navigate to="/hotels" replace />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/destinations/:slug" element={<DestinationDetail />} />
        <Route path="/food" element={<Food />} />
        <Route path="/culture" element={<Culture />} />
        <Route path="/transport" element={<Transport />} />
        <Route path="/emergency" element={<Emergency />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/trip-planner" element={<TripPlanner />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/reviews" element={<Navigate to="/hotels" replace />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/auth" element={<Navigate to="/favorites" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </Suspense>
      <Footer />
      <CookieBanner />
      <Analytics />
    </AppProvider>
  )
}

export default App
