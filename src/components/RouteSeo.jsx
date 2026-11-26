import { useLocation } from 'react-router-dom'
import Seo from './Seo'

// Titles & descriptions for fixed pages. Hotel, destination and article pages set their own.
const PAGES = {
  '/': { title: null, description: 'Your local guide in Morocco: guided tours of Marrakech, Fes, Chefchaouen and Tangier, Sahara desert trips and custom journeys across the country. Book on WhatsApp.' },
  '/destinations': { title: 'Morocco Destinations & City Guides', description: 'Guides to Morocco\'s best destinations: Marrakech, Fes, Chefchaouen, Tangier, Casablanca, Essaouira, Merzouga and the Atlas Mountains — when to go, how to get there and what to see.' },
  '/food': { title: 'Moroccan Food: 16 Dishes to Try', description: 'Tagine, couscous, pastilla, harira, tanjia, zaalouk, bissara, briouats, baghrir, sfenj, chebakia, mint tea and more — what they are, where to eat them and tips for ordering in Morocco.' },
  '/transport': { title: 'Getting Around Morocco: Trains, Buses, Taxis & Ferries', description: 'How to travel around Morocco: Al Boraq high-speed train, ONCF trains, CTM and Supratours buses, petit and grand taxis, airports and ferries to Spain.' },
  '/emergency': { title: 'Morocco Emergency Numbers & Embassies', description: 'Emergency numbers in Morocco (police 19/190, ambulance 15/150, 112 from mobile), major hospitals and embassy contacts in Rabat.' },
  '/weather': { title: 'Morocco Weather Today & Best Time to Visit', description: 'Live weather and 7-day forecast for Marrakech, Fes, Tangier, Chefchaouen, Essaouira, Merzouga, Casablanca, Agadir and Rabat, plus monthly climate averages.' },
  '/map': { title: 'Interactive Map of Morocco', description: 'Map of restaurants, landmarks, airports and beaches across Morocco.' },
  '/trip-planner': { title: 'Morocco Trip Planner', description: 'Build a day-by-day Morocco itinerary based on the cities you want to see, your budget and the length of your trip.' },
  '/gallery': { title: 'Morocco Photo Gallery', description: 'Photos of Morocco: Marrakech, Fes, Chefchaouen, the Sahara, the Atlas Mountains, Essaouira and Tangier.' },
  '/blog': { title: 'Morocco Travel Blog: Itineraries & Tips', description: 'Practical Morocco travel articles: Sahara itineraries, city guides, food, transport and what to pack for each season.' },
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
