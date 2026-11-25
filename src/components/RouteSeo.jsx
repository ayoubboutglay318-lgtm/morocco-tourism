import { useLocation } from 'react-router-dom'
import Seo from './Seo'

// Titles & descriptions for fixed pages. Hotel, destination and article pages set their own.
const PAGES = {
  '/': { title: null, description: 'Plan your trip to Morocco: city guides for Marrakech, Fes, Chefchaouen, Tangier and the Sahara, hotels and riads, Moroccan food, live weather and practical safety info.' },
  '/hotels': { title: 'Hotels & Riads in Morocco', description: 'Well-known hotels, riads and desert camps in Marrakech, Fes, Chefchaouen, Tangier, Essaouira, Merzouga, Agadir and Rabat — with star category, amenities and price range.' },
  '/destinations': { title: 'Morocco Destinations & City Guides', description: 'Guides to Morocco\'s best destinations: Marrakech, Fes, Chefchaouen, Tangier, Casablanca, Essaouira, Merzouga and the Atlas Mountains — when to go, how to get there and what to see.' },
  '/food': { title: 'Moroccan Food: 8 Dishes to Try', description: 'Tagine, couscous, pastilla, harira, mint tea, mechoui, msemen and rfissa — what they are, where to eat them and tips for ordering in Morocco.' },
  '/culture': { title: 'Moroccan Culture, Festivals & Etiquette', description: 'Festivals, customs, crafts and etiquette in Morocco: dress, greetings, Ramadan, bargaining in the souks and visiting mosques.' },
  '/transport': { title: 'Getting Around Morocco: Trains, Buses, Taxis & Ferries', description: 'How to travel around Morocco: Al Boraq high-speed train, ONCF trains, CTM and Supratours buses, petit and grand taxis, airports and ferries to Spain.' },
  '/emergency': { title: 'Morocco Emergency Numbers & Embassies', description: 'Emergency numbers in Morocco (police 19/190, ambulance 15/150, 112 from mobile), major hospitals and embassy contacts in Rabat.' },
  '/weather': { title: 'Morocco Weather Today & Best Time to Visit', description: 'Live weather and 7-day forecast for Marrakech, Fes, Tangier, Chefchaouen, Essaouira, Merzouga, Casablanca, Agadir and Rabat, plus monthly climate averages.' },
  '/map': { title: 'Interactive Map of Morocco', description: 'Map of hotels, restaurants, landmarks, airports and beaches across Morocco.' },
  '/trip-planner': { title: 'Morocco Trip Planner', description: 'Build a day-by-day Morocco itinerary based on the cities you want to see, your budget and the length of your trip.' },
  '/gallery': { title: 'Morocco Photo Gallery', description: 'Photos of Morocco: Marrakech, Fes, Chefchaouen, the Sahara, the Atlas Mountains, Essaouira and Tangier.' },
  '/blog': { title: 'Morocco Travel Blog: Itineraries & Tips', description: 'Practical Morocco travel articles: Sahara itineraries, city guides, food, transport and what to pack for each season.' },
  '/favorites': { title: 'Your Saved Hotels', description: 'Hotels and riads you saved while planning your Morocco trip.', noindex: true },
  '/about': { title: 'About Morocco Travel', description: 'Who is behind Morocco Travel, how this guide is made and how we can help you plan your trip.' },
  '/contact': { title: 'Contact Us', description: 'Contact Morocco Travel on WhatsApp for help planning your trip to Morocco.' },
  '/privacy': { title: 'Privacy Policy', description: 'How Morocco Travel handles your data, cookies and third-party services.' },
}

export default function RouteSeo() {
  const { pathname } = useLocation()
  const page = PAGES[pathname.replace(/\/$/, '') || '/']
  if (!page) return null
  return <Seo {...page} />
}
