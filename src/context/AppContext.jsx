import { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext()

export function AppProvider({ children }) {
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark')
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'en')
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem('favorites') || '[]') } catch { return [] }
  })

  useEffect(() => {
    document.body.setAttribute('data-theme', dark ? 'dark' : 'light')
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  useEffect(() => {
    localStorage.setItem('lang', lang)
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }, [lang])
  useEffect(() => { localStorage.setItem('favorites', JSON.stringify(favorites)) }, [favorites])

  const toggleFavorite = (id) => setFavorites(prev => prev.includes(id) ? prev.filter(f=>f!==id) : [...prev, id])

  // Clear data left in browsers by the old (removed) demo sign-in
  useEffect(() => { localStorage.removeItem('authUser'); localStorage.removeItem('authToken') }, [])

  const t = (key) => {
    const translations = {
      en: { home:'Home', destinations:'Destinations', hotels:'Hotels', food:'Food', culture:'Culture', transport:'Transport', weather:'Weather', map:'Map', tripPlanner:'Trip Planner', emergency:'Emergency', bookNow:'Plan Your Trip', viewAll:'View All', search:'Search', from:'From', night:'night', reviews:'reviews', gallery:'Gallery', blog:'Blog', favorites:'Favorites', profile:'Profile', login:'Sign In' },
      fr: { home:'Accueil', destinations:'Destinations', hotels:'Hôtels', food:'Cuisine', culture:'Culture', transport:'Transport', weather:'Météo', map:'Carte', tripPlanner:'Planificateur', emergency:'Urgences', bookNow:'Planifier', viewAll:'Voir tout', search:'Rechercher', from:'À partir de', night:'nuit', reviews:'avis', gallery:'Galerie', blog:'Blog', favorites:'Favoris', profile:'Profil', login:'Connexion' },
      ar: { home:'الرئيسية', destinations:'الوجهات', hotels:'الفنادق', food:'المطبخ', culture:'الثقافة', transport:'النقل', weather:'الطقس', map:'الخريطة', tripPlanner:'مخطط الرحلة', emergency:'الطوارئ', bookNow:'خطط رحلتك', viewAll:'عرض الكل', search:'بحث', from:'ابتداءً من', night:'ليلة', reviews:'تقييم', gallery:'معرض', blog:'مدونة', favorites:'المفضلة', profile:'الملف الشخصي', login:'تسجيل الدخول' },
    }
    return translations[lang]?.[key] || translations.en[key] || key
  }

  return (
    <AppContext.Provider value={{ dark, setDark, lang, setLang, favorites, toggleFavorite, t }}>
      {children}
    </AppContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useApp = () => useContext(AppContext)
