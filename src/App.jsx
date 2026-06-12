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
import './App.css'

function App() {
  return (
    <AppProvider>
      <Navbar />
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
      </Routes>
    </AppProvider>
  )
}

export default App
