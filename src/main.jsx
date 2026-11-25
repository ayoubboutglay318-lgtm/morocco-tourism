import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'
import './index.css'
import App from './App.jsx'
import { ADSENSE_CLIENT, ADS_ALLOWED } from './config'

// Set production API URL if provided in environment variables
if (import.meta.env.VITE_API_URL) {
  axios.defaults.baseURL = import.meta.env.VITE_API_URL;
}

// Load Google AdSense only when a publisher ID is configured AND the visitor accepted cookies
if (ADS_ALLOWED()) {
  const script = document.createElement('script')
  script.async = true
  script.crossOrigin = 'anonymous'
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(ADSENSE_CLIENT)}`
  document.head.appendChild(script)
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
