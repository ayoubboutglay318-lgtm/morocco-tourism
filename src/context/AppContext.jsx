import { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext()

// Rates: how much of each currency equals 1 USD (hotel prices are in USD)
const RATES = { USD:1, MAD:10.1, EUR:0.92, GBP:0.79, CAD:1.36, JPY:149 }

export function AppProvider({ children }) {
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark')
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'en')
  const [currency, setCurrency] = useState('USD')
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem('favorites') || '[]'))
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('authUser')) } catch { return null }
  })

  useEffect(() => {
    document.body.setAttribute('data-theme', dark ? 'dark' : 'light')
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  useEffect(() => { localStorage.setItem('lang', lang) }, [lang])
  useEffect(() => { localStorage.setItem('favorites', JSON.stringify(favorites)) }, [favorites])

  const toggleFavorite = (id) => setFavorites(prev => prev.includes(id) ? prev.filter(f=>f!==id) : [...prev, id])

  const login = (userData) => {
    setUser(userData)
    localStorage.setItem('authUser', JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('authUser')
    localStorage.removeItem('authToken')
  }

  const convertPrice = (usd) => {
    const rate = RATES[currency] || 1
    const converted = (usd * rate).toFixed(currency === 'JPY' || currency === 'MAD' ? 0 : 2)
    const symbols = { USD:'$', MAD:'MAD ', EUR:'€', GBP:'£', CAD:'CA$', JPY:'¥' }
    return `${symbols[currency]}${Number(converted).toLocaleString()}`
  }

  const t = (key) => {
    const translations = {
      en: { home:'Home', destinations:'Destinations', hotels:'Hotels', food:'Food', culture:'Culture', transport:'Transport', weather:'Weather', map:'Map', tripPlanner:'Trip Planner', emergency:'Emergency', bookNow:'Book Now', viewAll:'View All', search:'Search', from:'From', night:'night', reviews:'reviews', gallery:'Gallery', blog:'Blog', favorites:'Favorites', profile:'Profile', login:'Sign In' },
      fr: { home:'Accueil', destinations:'Destinations', hotels:'Hôtels', food:'Cuisine', culture:'Culture', transport:'Transport', weather:'Météo', map:'Carte', tripPlanner:'Planificateur', emergency:'Urgences', bookNow:'Réserver', viewAll:'Voir tout', search:'Rechercher', from:'À partir de', night:'nuit', reviews:'avis', gallery:'Galerie', blog:'Blog', favorites:'Favoris', profile:'Profil', login:'Connexion' },
      ar: { home:'الرئيسية', destinations:'الوجهات', hotels:'الفنادق', food:'المطبخ', culture:'الثقافة', transport:'النقل', weather:'الطقس', map:'الخريطة', tripPlanner:'مخطط الرحلة', emergency:'الطوارئ', bookNow:'احجز الآن', viewAll:'عرض الكل', search:'بحث', from:'ابتداءً من', night:'ليلة', reviews:'تقييم', gallery:'معرض', blog:'مدونة', favorites:'المفضلة', profile:'الملف الشخصي', login:'تسجيل الدخول' },
    }
    return translations[lang]?.[key] || translations.en[key] || key
  }

  return (
    <AppContext.Provider value={{ dark, setDark, lang, setLang, currency, setCurrency, favorites, toggleFavorite, convertPrice, t, RATES, user, login, logout }}>
      {children}
    </AppContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useApp = () => useContext(AppContext)
