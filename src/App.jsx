import { Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Hotels from './pages/Hotels'
import HotelDetail from './pages/HotelDetail'
import Booking from './pages/Booking'
import BookingSuccess from './pages/BookingSuccess'
import Destinations from './pages/Destinations'
import DestinationDetail from './pages/DestinationDetail'
import Food from './pages/Food'
import Culture from './pages/Culture'
import Transport from './pages/Transport'
import Emergency from './pages/Emergency'
import Weather from './pages/Weather'
import TripPlanner from './pages/TripPlanner'
import MapPage from './pages/MapPage'
import Reviews from './pages/Reviews'
import Gallery from './pages/Gallery'
import Blog from './pages/Blog'
import Favorites from './pages/Favorites'
import Auth from './pages/Auth'
import './App.css'

const WHATSAPP_NUMBER = '212689122018'
const WHATSAPP_MSG = encodeURIComponent('Hello! I would like to book a trip to Morocco. Could you help me?')
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`

function App() {
  return (
    <AppProvider>
      <Navbar />

      {/* Floating WhatsApp Booking Button */}
      <a
        id="whatsapp-booking-btn"
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label="Book via WhatsApp"
      >
        <span className="whatsapp-float__icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.112 1.522 5.847L.057 23.882a.5.5 0 0 0 .606.625l6.218-1.634A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.003-1.368l-.358-.213-3.712.976.993-3.624-.234-.373A9.818 9.818 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
          </svg>
        </span>
        <span className="whatsapp-float__label">Book via WhatsApp</span>
      </a>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/hotels/:id" element={<HotelDetail />} />
        <Route path="/hotels/:id/book" element={<Booking />} />
        <Route path="/booking-success" element={<BookingSuccess />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/destinations/:slug" element={<DestinationDetail />} />
        <Route path="/food" element={<Food />} />
        <Route path="/culture" element={<Culture />} />
        <Route path="/transport" element={<Transport />} />
        <Route path="/emergency" element={<Emergency />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/trip-planner" element={<TripPlanner />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </AppProvider>
  )
}

export default App
