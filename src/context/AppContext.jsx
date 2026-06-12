import { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext()

const RATES = { MAD:1, USD:0.099, EUR:0.091, GBP:0.078, CAD:0.135, JPY:14.6 }

export function AppProvider({ children }) {
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark')
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'en')
  const [currency, setCurrency] = useState('USD')
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem('favorites') || '[]'))

  useEffect(() => {
    document.body.setAttribute('data-theme', dark ? 'dark' : 'light')
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  useEffect(() => { localStorage.setItem('lang', lang) }, [lang])
  useEffect(() => { localStorage.setItem('favorites', JSON.stringify(favorites)) }, [favorites])

  const toggleFavorite = (id) => setFavorites(prev => prev.includes(id) ? prev.filter(f=>f!==id) : [...prev, id])

  const convertPrice = (mad) => {
    const rate = RATES[currency] || 1
    const converted = (mad * rate).toFixed(0)
    const symbols = { MAD:'MAD', USD:'$', EUR:'€', GBP:'£', CAD:'CA$', JPY:'¥' }
    return `${symbols[currency]}${Number(converted).toLocaleString()}`
  }

  const t = (key) => {
    const translations = {
      en: { home:'Home', destinations:'Destinations', hotels:'Hotels', food:'Food', culture:'Culture', transport:'Transport', weather:'Weather', map:'Map', tripPlanner:'Trip Planner', emergency:'Emergency', bookNow:'Book Now', viewAll:'View All', search:'Search', from:'From', night:'night', reviews:'reviews' },
      fr: { home:'Accueil', destinations:'Destinations', hotels:'Hôtels', food:'Cuisine', culture:'Culture', transport:'Transport', weather:'Météo', map:'Carte', tripPlanner:'Planificateur', emergency:'Urgences', bookNow:'Réserver', viewAll:'Voir tout', search:'Rechercher', from:'À partir de', night:'nuit', reviews:'avis' },
      ar: { home:'الرئيسية', destinations:'الوجهات', hotels:'الفنادق', food:'المطبخ', culture:'الثقافة', transport:'النقل', weather:'الطقس', map:'الخريطة', tripPlanner:'مخطط الرحلة', emergency:'الطوارئ', bookNow:'احجز الآن', viewAll:'عرض الكل', search:'بحث', from:'ابتداءً من', night:'ليلة', reviews:'تقييم' },
    }
    return translations[lang]?.[key] || translations.en[key] || key
  }

  return (
    <AppContext.Provider value={{ dark, setDark, lang, setLang, currency, setCurrency, favorites, toggleFavorite, convertPrice, t, RATES }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
