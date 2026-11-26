import express from 'express';
import cors from 'cors';
import { DESTINATION_PHOTOS } from './destinationPhotos.js';
import { MORE_DESTINATIONS } from './moreDestinations.js';
const app = express();
app.use(cors());
app.use(express.json());

// All photo IDs verified individually from unsplash.com/photos/[id]
const p = id => `https://images.unsplash.com/${id}?w=900&q=85&fit=crop&auto=format`;
const commons = file => `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=900`;
const commonsPage = file => `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file)}`;
const I = {
  // Marrakech
  mrk1: p('photo-1597212618440-806262de4f6b'),
  mrk2: p('photo-1561642769-1bca263542e0'),
  mrk3: p('photo-1618423205267-e95744f57edf'),
  mrk4: p('photo-1653323792487-6ecc6217040b'),
  mrk5: p('flagged/photo-1553617569-8ef7a8da3146'),
  // Fes
  fes1: p('photo-1559925523-10de9e23cf90'),
  fes2: p('photo-1531230689007-0b32d7a7c33e'),
  fes3: p('photo-1528657249085-c569d3c869e4'),
  // Chefchaouen
  chef1: p('photo-1538600838042-6a0c694ffab5'),
  chef2: p('flagged/photo-1555169048-3c4845cfcf1c'),
  // Merzouga / Sahara
  sah1: p('photo-1559586616-361e18714958'),
  sah2: p('photo-1489573280374-2e193c63726c'),
  // Atlas
  atl1: p('photo-1593535988128-7214bc2cbedc'),
  atl2: p('photo-1560789590-ee4cc7125967'),
  atl3: p('photo-1739464889400-e87ec57f246d'),
  atl4: p('photo-1534003085889-5e1870403fdc'),
  // Essaouira
  ess1: p('photo-1624802746702-60ca95bdb605'),
  ess2: p('photo-1624802710884-f7c40598140c'),
  // Casablanca
  cas1: p('photo-1548018560-4cb48a8837c1'),
  // Tangier
  tng1: p('photo-1533501747004-381b96042e88'),
  tng2: p('photo-1692084923368-f4c1a2dae50c'),
  tng3: p('photo-1582919534700-acf2374f10d3'),
  tng4: p('photo-1717654855451-9fd9b12c3fbd'),
  tng5: p('photo-1671518283785-2e43588774b7'),
  tng6: p('photo-1505868067580-817d09206bed'),
  tng7: p('photo-1701676639172-421b5e0b148b'),
  tng8: p('photo-1682972443796-1da80df666f3'),
  cap:  p('photo-1633264542743-c1acdb5eff0e'),
  herc: p('photo-1589278173760-b2f426dc0903'),
  paul: p('photo-1692084745522-90c9a162329e'),
  // Food — real photos of each dish from Wikimedia Commons (free licences, credited on the Food page)
  food_tagine: commons('Tajine_Moroccan.jpg'),
  food_couscous: commons('Couscous_Royal_Marocain.JPG'),
  food_pastilla: commons('Pastilla_au_poulet_et_amandes.jpg'),
  food_harira: commons('Harira..JPG'),
  food_tea: commons('Moroccan_tea_1.jpg'),
  food_mechoui: commons('Mechwi_noices.JPG'),
  food_msemen: commons('Msemmen.JPG'),
  food_rfissa: commons('Rfisa_رفيسة.jpg'),
};

const hotels = [
  // ═══ TANGIER ═══
  {
    id:1, name:"Fairmont Tazi Palace Tangier", city:"Tangier", stars:5, price:259, image:I.cap,
    badge:"Luxury Palace",
    description:"A restored 1920s royal palace nestled among eucalyptus forests on a hilltop above Tangier with panoramic city and forest views. A large luxury resort with a spa, several restaurants and an outdoor pool, a short drive from the medina.",
    amenities:["Pool","Free WiFi","Spa","Restaurants","Fitness Center","Gardens"]
  },
  {
    id:2, name:"El Minzah Hotel", city:"Tangier", stars:4, price:140, image:I.tng7,
    badge:"Historic Icon",
    description:"Tangier's most storied hotel, opened in 1930 by Lord Bute. A masterpiece of Moorish architecture with hand-painted ceilings, a lush courtyard garden and a terrace with direct views of the Strait of Gibraltar and the Spanish coast 14km beyond. Churchill, Matisse, the Rolling Stones and every notable visitor to Tangier stayed here.",
    amenities:["Pool","Free WiFi","Breakfast","Spa","Garden","Strait View","Historic Bar","Hammam"], rooms:140
  },
  {
    id:3, name:"Grand Hotel Villa de France", city:"Tangier", stars:4, price:120, image:I.tng8,
    badge:"Matisse Heritage",
    description:"The hotel where Henri Matisse stayed in 1912 and painted some of his greatest Tangier canvases from Room 35 — the same room is preserved as it was. A beautifully restored Belle Époque property near the medina with a piano bar offering live music nightly and panoramic views over the white city and the Strait.",
    amenities:["Free WiFi","Breakfast","Piano Bar","Live Music","Panoramic Views","Historic Rooms"], rooms:48
  },
  {
    id:4, name:"Hilton Garden Inn Tanger City Center", city:"Tangier", stars:4, price:95, image:I.tng5,
    badge:"Modern City Hotel",
    description:"A large modern 4-star hotel next to Tanger Ville train station (Al Boraq high-speed trains to Casablanca), a few minutes' walk from the city beach. Convenient for business and transit; no swimming pool.",
    amenities:["Free WiFi","Breakfast","Gym","Near Beach","Business Center","Family Rooms"], rooms:320
  },
  {
    id:5, name:"Riad Dar Saba — Saba's House", city:"Tangier", stars:5, price:80, image:I.tng6,
    badge:"Kasbah Boutique Riad",
    description:"A small, luxurious boutique riad in the kasbah, a few steps from the Kasbah Museum. Individually designed rooms full of art, a steam room and a rooftop terrace with views over the medina and the port.",
    amenities:["Free WiFi","Rooftop Terrace","Kasbah Views","Steam Room","Spa Services","Bar"], rooms:6
  },
  {
    id:6, name:"Palais Zahia", city:"Tangier", stars:3, price:65, image:I.tng4,
    badge:"Traditional Riad",
    description:"A traditional hotel on the Petit Socco in the heart of the old medina, with a sunny terrace, a small spa and hammam, and Moroccan breakfasts. No alcohol is served. A good base for exploring the medina on foot.",
    amenities:["Free WiFi","Breakfast","Terrace","Spa & Hammam","Traditional Decor","Central Location"], rooms:18
  },
  // ═══ MARRAKECH ═══
  {
    id:7, name:"La Mamounia", city:"Marrakech", stars:5, price:480, image:I.mrk2,
    badge:"Historic Palace Hotel",
    description:"Opened as a hotel in 1923 in gardens that were once an 18th-century royal wedding gift, La Mamounia is Marrakech's most famous address. Winston Churchill was a regular guest. Vast Moorish gardens just inside the medina walls, several restaurants and bars, a large spa and pool.",
    amenities:["Pool","Free WiFi","Spa","Hammam","Gardens","Restaurants","Bars"]
  },
  {
    id:8, name:"La Maison Arabe", city:"Marrakech", stars:5, price:250, image:I.mrk1,
    badge:"Boutique Hotel & Cooking School",
    description:"Founded in 1946 as Marrakech's first restaurant, La Maison Arabe became Morocco's first boutique hotel and remains one of the finest. Andalusian-style architecture, a pool, a traditional hammam, restaurants and a well-known cooking school where guests learn Moroccan recipes.",
    amenities:["Pool","Free WiFi","Breakfast","Hammam","Cooking School","2 Restaurants","Spa","Rooftop"], rooms:26
  },
  {
    id:9, name:"Les Jardins de la Koutoubia", city:"Marrakech", stars:5, price:185, image:I.mrk4,
    badge:"Central Medina",
    description:"Steps from the Koutoubia Mosque — Marrakech's most iconic landmark — this elegant 5-star hotel wraps around two lush courtyards with heated pools and rose gardens. The rooftop Sky Bar offers one of the best views in the city. A rare combination of central location, luxury and calm in the heart of the old medina.",
    amenities:["2 Pools","Free WiFi","Breakfast","Spa","Sky Bar","Gardens","Hammam","Rooftop"], rooms:72
  },
  {
    id:10, name:"Riad AndallaSpa", city:"Marrakech", stars:5, price:150, image:I.mrk3,
    badge:"Medina Riad & Spa",
    description:"An authentically decorated riad just steps from Djemaa el-Fna square with spacious suites, an expert hammam and spa, a mosaic courtyard pool and a rooftop terrace where Moroccan mint tea and pastries await at any hour.",
    amenities:["Pool","Free WiFi","Breakfast","Hammam & Spa","Rooftop","Airport Transfer","Personal Service"], rooms:8
  },
  {
    id:11, name:"Mövenpick Hotel Mansour Eddahbi", city:"Marrakech", stars:5, price:200, image:I.mrk5,
    badge:"5-Star Resort",
    description:"A luxurious resort set within serene palm-filled grounds near the Palmeraie. Multiple outdoor pools, world-class spa, six dining options from Moroccan to Asian, a kids club, and direct access to one of Marrakech's top golf courses. A popular choice for families and couples.",
    amenities:["Multiple Pools","Free WiFi","Breakfast","Spa","6 Restaurants","Kids Club","Golf Access","Hammam"], rooms:336
  },
  // ═══ FES ═══
  {
    id:12, name:"Palais Jamaï", city:"Fes", stars:5, price:280, image:I.fes1,
    badge:"Restored Palace (2026)",
    description:"Built in 1879 for Grand Vizier Si Mohammed ben Arbi el Jamaï, this palace hotel near Bab Guissa closed in 2014 for a long restoration and is reopening in 2026 as part of the Preferred Hotels & Resorts Legend Collection. Gardens and terraces overlook the Fes medina. Check the hotel's official site for the opening date before planning a stay.",
    amenities:["Pool","Gardens","Spa","Restaurants","Historic Palace","Medina Views"]
  },
  {
    id:13, name:"Riad Fes — Relais & Châteaux", city:"Fes", stars:5, price:194, image:I.fes2,
    badge:"Relais & Châteaux",
    description:"A jewel of Moroccan heritage and a Relais & Châteaux member. Four harmoniously styled Andalusian patios, sculpted plaster arcades, marble fountains and zellige walls. The rooftop bar has a wide view over the Fes medina at sunset.",
    amenities:["Pool","Free WiFi","Breakfast","Spa","Rooftop Bar","Hammam","Fine Dining"], rooms:22
  },
  {
    id:14, name:"Riad Laaroussa Hotel & Spa", city:"Fes", stars:4, price:130, image:I.fes3,
    badge:"Medina Palace & Spa",
    description:"A tranquil restored palace in the heart of the Fes medina with a rooftop terrace offering panoramic views, lush gardens, a peaceful courtyard pool and a full spa and hammam. Known for spacious rooms and Fassi home cooking.",
    amenities:["Pool","Free WiFi","Breakfast","Spa","Hammam","Rooftop","Gardens","Fassi Cuisine"], rooms:9
  },
  {
    id:15, name:"Riad Fes Maya Suite & Spa", city:"Fes", stars:4, price:160, image:I.fes1,
    badge:"Palace Architecture",
    description:"A historic palace in the ancient medina transformed into a stunning boutique hotel — walls covered in hand-carved plaster, ceilings of hand-painted cedar, and marble fountains in every courtyard. The rooftop pool seems to float above the medina rooftops. A true example of traditional Fassi aristocratic architecture.",
    amenities:["Pool","Free WiFi","Breakfast","Spa","Hammam","Rooftop","Historic Architecture"], rooms:15
  },
  // ═══ CHEFCHAOUEN ═══
  {
    id:16, name:"Lina Ryad & Spa", city:"Chefchaouen", stars:4, price:110, image:I.chef1,
    badge:"Medina Riad",
    description:"A luxurious riad in the heart of Chefchaouen's famous blue medina, surrounded by the Rif Mountains. Bright, spacious suites with private terraces overlooking the cobalt and indigo alleys. A large terrace provides a haven of tranquility above the maze of the old city. Traditional hammam, spa treatments and rooftop breakfasts with mountain views.",
    amenities:["Free WiFi","Breakfast","Spa","Hammam","Rooftop","Mountain Views","Central Medina"], rooms:15
  },
  {
    id:17, name:"Casa Sabila", city:"Chefchaouen", stars:4, price:70, image:I.chef2,
    badge:"Blue City Gem",
    description:"A much-loved boutique guesthouse in the old medina with spacious, beautifully air-conditioned rooms decorated in traditional blue and white tile and local craftsmanship. The rooftop terrace breakfast area offers incredible views over the blue rooftops to the Rif Mountains. Praised by guests for exceptional friendliness and value.",
    amenities:["Free WiFi","Breakfast","Rooftop Terrace","Mountain Views","Air Conditioning","Traditional Decor"], rooms:10
  },
  {
    id:18, name:"La Petite Chefchaouen", city:"Chefchaouen", stars:4, price:55, image:I.chef1,
    badge:"Intimate Boutique",
    description:"A small, intimate boutique hotel with just five rooms within the kasbah walls of Chefchaouen, run by warm and welcoming hosts. A panoramic rooftop terrace, innovative Moroccan-Mediterranean cooking, and the closest possible connection to the extraordinary blue-painted world outside your door.",
    amenities:["Free WiFi","Breakfast","Rooftop","Innovative Cuisine","Intimate (5 Rooms)","Inside Kasbah Walls"], rooms:5
  },
  {
    id:19, name:"Dar Jasmine", city:"Chefchaouen", stars:4, price:60, image:I.chef2,
    badge:"Hilltop Views",
    description:"Situated on a hilltop above Chefchaouen with extraordinary views over the entire blue city, the valley and the Rif Mountains. Stylish rooms with local decor, scenic terraces at every level and warm service, a seasonal outdoor pool and a restaurant. The climb up the steps is rewarded with one of the best views of the blue city.",
    amenities:["Free WiFi","Breakfast","Outdoor Pool","Hilltop Terrace","Panoramic Views","Restaurant"], rooms:9
  },
  // ═══ MERZOUGA ═══
  {
    id:20, name:"Desert Luxury Camp Morocco", city:"Merzouga", stars:5, price:275, image:I.sah1,
    badge:"Secluded Dune Camp",
    description:"A secluded luxury camp tucked against the western flank of the 150m Erg Chebbi dunes. Beautifully designed private tents with en-suite bathrooms, all meals included, camel trekking at sunset and superb stargazing.",
    amenities:["All Meals Included","Camel Trek","Stargazing","Private Bathroom","Desert Excursions","Traditional Music"], rooms:16
  },
  {
    id:21, name:"Kam Kam Dunes", city:"Merzouga", stars:5, price:310, image:I.sah2,
    badge:"Contemporary Berber Design",
    description:"Run by a Moroccan-Spanish family with a passion for design, Kam Kam Dunes stands apart from other Sahara camps for its restrained, contemporary Berber aesthetic — neutral tones, thoughtful lighting, excellent linens and inspired cooking. One of the most beautiful camps in the Moroccan Sahara and utterly unlike anything else in the desert.",
    amenities:["All Meals Included","Camel Trek","Stargazing","Designer Tents","Gourmet Cuisine","Photography Tours"], rooms:12
  },
  {
    id:22, name:"Sahara Stars Camp", city:"Merzouga", stars:3, price:180, image:I.sah1,
    badge:"Classic Desert Camp",
    description:"A simple, well-reviewed camp of around a dozen tents right at the edge of the Erg Chebbi dunes, with shared bathrooms, Moroccan rugs and proper beds. A large Berber tent serves as the communal restaurant where evening meals of slow-cooked tagine and fresh bread from a clay oven are served by candlelight under the stars.",
    amenities:["Breakfast","Camel Trek","Stargazing","Shared Bathrooms","Restaurant","Sandboarding"], rooms:12
  },
  // ═══ ATLAS MOUNTAINS ═══
  {
    id:23, name:"Kasbah Tamadot", city:"Atlas Mountains", stars:5, price:350, image:I.atl1,
    badge:"Richard Branson's Retreat",
    description:"Richard Branson's legendary mountain retreat — a converted Berber kasbah at 1,500m in the High Atlas with views across a valley of almond and walnut trees to snow-capped peaks. World-class spa, heated outdoor pool, hiking routes to Mount Toubkal (4,167m — North Africa's highest peak), and one of the finest dining experiences in Morocco.",
    amenities:["Heated Pool","Free WiFi","Breakfast","Spa","Hiking","Yoga","Hammam","Airport Transfer"], rooms:28
  },
  {
    id:24, name:"Kasbah du Toubkal", city:"Atlas Mountains", stars:4, price:165, image:I.atl2,
    badge:"Trekkers' Base Camp",
    description:"The original mountain kasbah of Imlil village at 1,740m — an eco-lodge run in partnership with the local Berber community. Trekkers use it as their base camp for Mount Toubkal (4,167m). Mule treks, Berber guides, the most genuine Moroccan mountain food imaginable, and one of the most authentic experiences available in Morocco.",
    amenities:["Free WiFi","Breakfast","Hiking","Mule Trekking","Berber Guides","Hammam","Community-Owned"], rooms:14
  },
  {
    id:25, name:"Kasbah Bab Ourika", city:"Atlas Mountains", stars:5, price:240, image:I.atl3,
    badge:"Infinity Pool + Organic Farm",
    description:"A boutique kasbah perched above the Ourika Valley at 1,300m with a spectacular infinity pool seemingly suspended above the valley with Atlas peaks in every direction. Certified organic kitchen garden, yoga deck, guided walks and one of the warmest family welcomes in the mountains.",
    amenities:["Infinity Pool","Free WiFi","Breakfast","Organic Garden","Hiking","Yoga","Valley Views"], rooms:10
  },
  // ═══ ESSAOUIRA ═══
  {
    id:26, name:"La Sultana Essaouira", city:"Essaouira", stars:5, price:150, image:I.ess1,
    badge:"5 Riads — UNESCO Medina",
    description:"Five interconnected 18th-century riads inside Essaouira's UNESCO-listed medina, steps from the Atlantic ramparts. A labyrinth of individually decorated suites with arched doorways and hand-painted ceilings. Rooftop terrace with direct ocean views, spa using local argan and rose, and a well-regarded restaurant.",
    amenities:["Free WiFi","Breakfast","Spa","Rooftop","Ocean Views","Hammam","Argan Spa Treatments"], rooms:18
  },
  {
    id:27, name:"Heure Bleue Palais", city:"Essaouira", stars:5, price:190, image:I.ess2,
    badge:"Rooftop Cinema",
    description:"A grand 18th-century riad inside the medina with an indoor heated pool, a hammam and spa, and a rooftop cinema — classic films screened under the stars each evening. The name ('blue hour') refers to the extraordinary Atlantic dusk light that bathes the city every evening. A full restaurant in a beautiful vaulted stone cellar.",
    amenities:["Heated Pool","Free WiFi","Breakfast","Spa","Hammam","Rooftop Cinema","Restaurant"], rooms:33
  },
  {
    id:28, name:"Ocean Vagabond", city:"Essaouira", stars:3, price:85, image:I.ess1,
    badge:"Surfer's Paradise",
    description:"The legendary surf lodge of Essaouira, 200m from the beach — a favourite of kitesurfers, windsurfers and Atlantic wave-riders from across the world. Fresh-caught fish grilled daily, daily surf lessons from local pros, surfboard and kite rentals. The Essaouira trade wind (the Alizee) blows almost every afternoon from April to October.",
    amenities:["Free WiFi","Breakfast","Surf Lessons","Kitesurfing","Kite Rental","Beach Access (200m)"], rooms:9
  },
  // ═══ CASABLANCA ═══
  {
    id:29, name:"Four Seasons Hotel Casablanca", city:"Casablanca", stars:5, price:320, image:I.cas1,
    badge:"Oceanfront 5-Star",
    description:"A luxury oceanfront hotel on the Anfa corniche with Atlantic views, an outdoor pool, a spa and several restaurants and bars. About a 10-minute drive from the Hassan II Mosque.",
    amenities:["Pool","Free WiFi","Spa","Gym","Ocean View","Restaurants","Bar"]
  },
];

const attractions = [
  { id:1,  city:"Tangier", name:"Kasbah & Kasbah Museum",            type:"Heritage", duration:"2–3 hrs",  price:"20 MAD",  image:I.tng1,  description:"Tangier's ancient kasbah at the highest point of the medina. The Dar el-Makhzen — the Sultan's former palace, now the Musée de la Kasbah — houses Roman mosaics from Volubilis, ancient sea charts and 3,000 years of Tangier's extraordinary history. The kasbah alleys, rooftop views and doorways carved in cedar are extraordinary." },
  { id:2,  city:"Tangier", name:"Cap Spartel & the Lighthouse",       type:"Nature",   duration:"Half day", price:"Free",    image:I.cap,   description:"Where the Atlantic Ocean and Mediterranean Sea collide — one of the most dramatic natural spectacles on earth. The striped Cap Spartel lighthouse (1864) marks the exact meeting point of two seas. The surrounding Rmilat forest has beautiful walking trails with constant sea views. Best visited before 10am." },
  { id:3,  city:"Tangier", name:"Grottes d'Hercule",                  type:"Nature",   duration:"1.5 hrs",  price:"15 MAD",  image:I.herc,  description:"Ancient sea caves 14km west of Tangier carved partly by Neolithic millstone-quarriers and partly by millennia of Atlantic waves. Legend says Hercules rested here. The most famous feature is an ocean-facing opening shaped exactly like the inverted outline of the African continent." },
  { id:4,  city:"Tangier", name:"Grand Socco",                        type:"Culture",  duration:"1–2 hrs",  price:"Free",    image:I.tng1,  description:"Tangier's great central square surrounded by the ornate gateway of Bab Fahs, the Grande Mosquée, and the Mendoubia Gardens with an 800-year-old dragon tree. On Thursday and Sunday mornings, Rif Berber women arrive in traditional striped dresses selling honey, olives and fresh herbs." },
  { id:5,  city:"Tangier", name:"Petit Socco",                        type:"Culture",  duration:"1 hr",     price:"Free",    image:I.tng4,  description:"The legendary café square deep in the medina where Burroughs, Kerouac, Ginsberg, Tennessee Williams and Paul Bowles were regulars. Still retains its timeless bohemian atmosphere. Order mint tea at Café Central and watch the world pass exactly as it has for a century." },
  { id:6,  city:"Tangier", name:"American Legation Museum",           type:"Heritage", duration:"1.5 hrs",  price:"Free",    image:I.tng3,  description:"The only US National Historic Landmark outside America. Morocco was among the first nations to recognise American independence (1777). Houses paintings by Delacroix, historic maps, documents and a comprehensive exhibit on Tangier's literary and artistic legacy. Open Tue–Sat." },
  { id:7,  city:"Tangier", name:"Tangier Bay & Corniche",             type:"Nature",   duration:"Half day", price:"Free",    image:I.tng5,  description:"A 5km arc of white sand along the Bay of Tangier framed by the Rif Mountains and the Spanish coast across the Strait. The beachfront corniche is lined with fresh fish restaurants serving the morning's catch. Summer buzzes with life; winter is dramatically empty and windswept." },
  { id:8,  city:"Tangier", name:"Tangier Medina & Souk",              type:"Culture",  duration:"2–3 hrs",  price:"Free",    image:I.tng6,  description:"Compact and navigable alone — unlike Marrakech or Fes. Rue es-Siaghines leads through souks selling kaftans, babouches, Rif carpets, argan oil and fresh-ground spices. Don't miss the covered food market on Rue de la Plage or the kasbah wall view over the medina rooftops." },
  { id:9,  city:"Tangier", name:"Strait of Gibraltar Viewpoint",      type:"Nature",   duration:"1 hr",     price:"Free",    image:I.tng7,  description:"From the kasbah walls and the Marshan plateau, you can see Africa and Europe simultaneously — Spain just 14km away. On clear days the white buildings of Tarifa are visible with the naked eye. Over 100,000 ships per year pass through — the world's busiest international waterway." },
  { id:10, city:"Tangier", name:"Charf Hill Panorama",                type:"Nature",   duration:"45 min",   price:"Free",    image:I.tng8,  description:"The highest accessible point in Tangier: a 360° panorama of the medina, the port, the Bay, the full length of the Strait and the mountains of Andalusia. Best 30 minutes before sunset when the sea turns gold and the Spanish coast lights up." },
  { id:11, city:"Tangier", name:"Church of Saint Andrew",             type:"Heritage", duration:"45 min",   price:"Free",    image:I.paul,  description:"Built in 1894 on land gifted by Sultan Hassan I. The Lord's Prayer is inscribed in Arabic calligraphy in the chancel arch — a symbol of Tangier's interfaith history. The churchyard holds the graves of many notable foreign residents. A profound and peaceful place in the medina." },
  { id:12, city:"Tangier", name:"Literary Tangier Walking Tour",      type:"Culture",  duration:"2 hrs",    price:"Free",    image:I.tng2,  description:"A self-guided walk through the sites that shaped Paul Bowles, William Burroughs, Jack Kerouac and Allen Ginsberg. The El Muniria hotel (Room 9 where Naked Lunch was written), Café Hafa on the Marshan cliff, the American Legation and the Petit Socco cafés. Essential for literature lovers." },
  { id:13, city:"Marrakech", name:"Djemaa el-Fna",                   type:"Culture",  duration:"Evening",  price:"Free",    image:I.mrk3,  description:"UNESCO Intangible Cultural Heritage. By night the world's greatest open-air theatre — storytellers, Gnawa musicians, acrobats, snake charmers and the smoke of a hundred grills. By day: orange juice vendors, henna artists and the best people-watching in Africa." },
  { id:14, city:"Fes", name:"Chouara Tanneries",                     type:"Heritage", duration:"2 hrs",    price:"Free",    image:I.fes2,  description:"One of the oldest tanneries in the world, in use for centuries. Viewed from the leather merchant terraces above, the stone honeycomb vats dyed in saffron, poppy, mint and indigo create an image unlike anything else on earth. Visit Tuesday–Sunday morning." },
];

const tours = [
  { id:1, city:"Tangier", title:"Literary Tangier Walking Tour", duration:"3 hours", groupSize:"Max 8", image:I.tng2, description:"Walk in the footsteps of Burroughs, Bowles and Kerouac. Visit Room 9 of the El Muniria, Café Hafa on the Marshan cliff, the American Legation and the Petit Socco.", highlights:["Café Hafa","American Legation Museum","El Muniria Hotel","Petit Socco cafés"] },
  { id:2, city:"Tangier", title:"Cap Spartel & Hercules Caves", duration:"Half day", groupSize:"Max 12", image:I.cap, description:"Where two seas collide. Visit the striped Cap Spartel lighthouse where the Atlantic meets the Mediterranean, then descend into the ancient Hercules Caves carved by Neolithic millstone-cutters.", highlights:["Cap Spartel lighthouse","Two-sea confluence","Hercules Caves","Rmilat forest walk"] },
  { id:3, city:"Marrakech", title:"Medina Souk Deep Dive", duration:"4 hours", groupSize:"Max 10", image:I.mrk3, description:"Navigate the 18 souk quarters with a master guide. Tanneries, dyers, brass-beaters, spice merchants and carpet weavers — the full living medieval marketplace experience.", highlights:["Dyers souk","Spice market","Brass workshops","Carpet souk"] },
  { id:4, city:"Marrakech", title:"Djemaa el-Fna by Night", duration:"3 hours", groupSize:"Max 15", image:I.mrk5, description:"The world's greatest open-air theatre after dark. Storytellers, Gnawa musicians, acrobats, snake charmers and the smoke and noise of a hundred food grills. Includes dinner at a stall.", highlights:["Gnawa musicians","Storytellers","Snake charmers","Local street dinner"] },
  { id:5, city:"Fes", title:"Full-Day Fes Medina Tour", duration:"8 hours", groupSize:"Max 8", image:I.fes1, description:"The most comprehensive Fes medina experience available. Chouara Tannery, Bou Inania Madrasa, Al-Qarawiyyin, the souks, a Fassi lunch and the covered food market. Transformative.", highlights:["Chouara Tannery","Bou Inania Madrasa","Al-Qarawiyyin","Fassi lunch"] },
  { id:6, city:"Fes", title:"Fassi Cooking Class", duration:"5 hours", groupSize:"Max 8", image:I.fes2, description:"Learn Fassi pastilla, couscous and bastilla from a Fassi family in their home. The most refined cuisine in Morocco, taught by the hands that have been making it for generations.", highlights:["Pastilla preparation","Couscous technique","Preserved lemon","Local family home"] },
  { id:7, city:"Chefchaouen", title:"Blue City Photography Walk", duration:"3 hours", groupSize:"Max 8", image:I.chef1, description:"An early-morning guided walk through Chefchaouen's most photogenic blue alleys before tour groups arrive. The best angles, best light and hidden corners known only to locals.", highlights:["Hidden blue alleys","Spanish Mosque view","Morning golden light","Riff Mountains backdrop"] },
  { id:8, city:"Chefchaouen", title:"Akchour Waterfalls Trek", duration:"Full day", groupSize:"Max 12", image:I.chef2, description:"A spectacular full-day hike through the Talassemtane National Park to the Akchour waterfalls — the most beautiful natural site in northern Morocco. Swimming included.", highlights:["Akchour waterfalls","Talassemtane park","Natural swimming pools","Cedar forest"] },
  { id:9, city:"Merzouga", title:"Sahara Sunset Camel Trek", duration:"2 hours + overnight", groupSize:"Max 16", image:I.sah1, description:"The classic Sahara experience — a camel trek at sunset into the heart of Erg Chebbi, an overnight in a luxury Berber tent, and a dawn walk on the silent dunes. Life-changing.", highlights:["Sunset camel trek","Luxury desert camp","Sahara stargazing","Dune sunrise"] },
  { id:10, city:"Merzouga", title:"4x4 Desert Explorer", duration:"Full day", groupSize:"Max 6", image:I.sah2, description:"A full-day 4WD expedition across the Sahara — fossil sites of Erfoud, the Gnaoua village of Khemliya, nomad families, salt flats and the hidden southern face of Erg Chebbi.", highlights:["Fossil workshops Erfoud","Khemliya Gnaoua village","Nomad family visit","Erg Chebbi south face"] },
  { id:11, city:"Essaouira", title:"Gnaoua Music & Ramparts", duration:"3 hours", groupSize:"Max 12", image:I.ess1, description:"The spirit of Essaouira — the Atlantic ramparts at sunset, a live Gnaoua music session with a master musician, and the story of this UNESCO port city's extraordinary multicultural history.", highlights:["Atlantic ramparts sunset","Live Gnaoua music","Portuguese fortifications","UNESCO heritage story"] },
  { id:12, city:"Essaouira", title:"Argan Oil Farm & Cooperatives", duration:"Half day", groupSize:"Max 10", image:I.ess2, description:"Visit the argan forest UNESCO Biosphere Reserve and a women's argan oil cooperative — see the traditional hand-pressing process and taste the finest culinary argan oil directly from the source.", highlights:["Argan forest UNESCO reserve","Women's cooperative visit","Hand-pressing process","Argan oil tasting"] },
  { id:13, city:"Atlas Mountains", title:"Mount Toubkal Ascent (2 days)", duration:"2 days", groupSize:"Max 8", image:I.atl1, description:"The greatest mountain trek in North Africa. Two days from the Berber village of Imlil to the summit of Mount Toubkal (4,167m) — highest peak in Africa north of the Sahara. No technical experience needed.", highlights:["Toubkal summit 4167m","Imlil Berber village","Mountain refuge overnight","360° Atlas panorama"] },
  { id:14, city:"Atlas Mountains", title:"Aït Ben Haddou & Dades Valley", duration:"Full day", groupSize:"Max 12", image:I.atl3, description:"The most spectacular road trip in Morocco — the Tizi n'Tichka pass, the UNESCO ksar of Aït Ben Haddou (Gladiator, Game of Thrones), the Dades Valley rose gardens and clay kasbahs.", highlights:["Tizi n'Tichka pass 2260m","Aït Ben Haddou UNESCO","Dades Valley kasbahs","Valley of Roses"] },
  { id:15, city:"Agadir", title:"Taghazout Surf Experience", duration:"Half day", groupSize:"Max 8", image:I.ess1, description:"Africa's best surf spot — professional instruction at Taghazout beach (20km north of Agadir) with certified surf coaches. Suitable for complete beginners to advanced surfers.", highlights:["Taghazout beach","Professional surf coaching","Board and wetsuit included","Atlantic waves"] },
  { id:16, city:"Agadir", title:"Souss-Massa Birdwatching", duration:"Full day", groupSize:"Max 6", image:I.ess2, description:"The critically endangered Northern Bald Ibis — the rarest bird in Africa — nests only in Souss-Massa National Park. A guided ornithology expedition with a park ranger and specialist guide.", highlights:["Northern Bald Ibis","Souss-Massa park","Flamingos and herons","Atlantic estuary ecosystem"] },
  { id:17, city:"Casablanca", title:"Hassan II Mosque Private Tour", duration:"2 hours", groupSize:"Max 10", image:I.cas1, description:"A private guided tour of one of the largest mosques in the world — the extraordinary architecture, the retractable roof, the prayer hall built partly over the Atlantic, and the story of its construction.", highlights:["Interior guided tour","Prayer hall over the Atlantic","210m minaret","Retractable roof mechanism"] },
  { id:18, city:"Casablanca", title:"Art Deco Architecture Walk", duration:"3 hours", groupSize:"Max 12", image:I.cas1, description:"The finest collection of 1930s Art Deco architecture in Africa — the Ville Nouvelle of Casablanca rivals Miami Beach and Naples in its concentration of extraordinary buildings. A unique architectural safari.", highlights:["Maarif Art Deco quarter","Place Mohammed V","Cinema Rex (1929)","Colonial administration buildings"] },
];

const destinations = [
  {
    id:1, slug:"tangier", name:"Tangier", region:"Tanger-Tétouan-Al Hoceïma", tagline:"Where Two Continents Meet",
    description:"Tangier — Tanger in French, Tanja in Arabic — is unlike any other city in Morocco. Perched at the northwestern tip of Africa where the Atlantic Ocean meets the Mediterranean Sea and Europe is just 14km away, Tangier has always been a city between worlds.\n\nFor centuries it was the most cosmopolitan city on the African continent — home to Berbers, Arabs, Andalusians, Sephardic Jews, Spanish, French, British and Americans living side by side. During the International Zone era (1923–1956), it became a playground for spies, writers, artists and adventurers. William Burroughs wrote Naked Lunch here. Henri Matisse was transformed by its light. Paul Bowles arrived in 1947 and never left.\n\nToday Tangier is Morocco's fastest-growing city, transformed by a new port (Tanger-Med, the largest in Africa), a high-speed rail link to Casablanca, and a modern motorway — while its ancient medina, legendary kasbah and bohemian literary legacy remain perfectly intact.",
    image:I.tng1, heroImage:I.cap,
    bestTime:"April–June, September–November",
    language:"Darija (Moroccan Arabic), Spanish, French, Tarifit Berber",
    currency:"Moroccan Dirham (MAD)", temperature:"Mediterranean — 28°C summer, 12°C winter",
    facts:["14km from Spain — the Spanish coast is visible from the kasbah","One of the oldest continuously inhabited cities in the world (3,000+ years)","The American Legation is the only US National Historic Landmark outside America","Morocco was among the first nations to recognise American independence (1777)","William Burroughs wrote Naked Lunch in Room 9 of the El Muniria hotel (1957)","Paul Bowles lived in Tangier from 1947 until his death in 1999","Henri Matisse visited in 1912 and produced 24 masterworks here","Tanger-Med is the largest container port in Africa","Al Boraq high-speed train: Tangier to Casablanca in 2h10","Cap Spartel is where the Atlantic Ocean and Mediterranean Sea collide"],
    gettingThere:"Tangier Ibn Battouta Airport (TNG) has direct flights from Paris, Madrid, Brussels, Amsterdam, London. Tanger-Med ferry port (40km east) connects to Tarifa (35 min), Algeciras (90 min) and Barcelona. Al Boraq high-speed train to Casablanca (2h10) and Rabat (1h30).",
    tips:["Walk up to the kasbah at sunset — the Strait view is unforgettable","Cap Spartel at 8am before tour groups — sea collision most visible in morning light","Mint tea at Café Hafa on the Marshan cliff — where Burroughs and Kerouac sat","The medina is compact — easy to navigate alone unlike Marrakech or Fes","Fresh seafood on Avenue d'Espagne near the port — fish caught that morning","American Legation Museum: Tue–Sat, free entry","Grand Socco Thursday & Sunday markets: arrive by 7am","Petit taxi to Cap Spartel: agree 200–250 MAD return before getting in","Hercules Caves 3km past Cap Spartel — combine both in one half-day","Book Fairmont Tazi Palace or Villa Josephine well in advance"],
    highlights:["Strait of Gibraltar views","Literary history","Cap Spartel","Kasbah Museum"],
    priceLevel:"$$",
  },
  {
    id:2, slug:"marrakech", name:"Marrakech", region:"Marrakech-Safi", tagline:"The Red City",
    description:"Marrakech — the Red City — is Morocco's beating heart. Founded in 1062, its medina is a UNESCO World Heritage Site of souks, palaces, mosques and riads barely changed in a thousand years.\n\nThe legendary Djemaa el-Fna square transforms from a market by day to the world's greatest open-air theatre by night — storytellers, Gnawa musicians, acrobats, snake charmers and the smoke of a hundred grills.\n\nBeyond the medina, the Jardin Majorelle (restored by Yves Saint Laurent), the Saadian Tombs, the Ben Youssef Madrasa and the Palais de la Bahia are unmissable. And just 60km away, the snowy peaks of Mount Toubkal (4,167m) — the highest mountain in North Africa — await hikers.",
    image:I.mrk1, heroImage:I.mrk2,
    bestTime:"March–May, September–November",
    language:"Darija (Moroccan Arabic), French, Tamazight", currency:"Moroccan Dirham (MAD)",
    temperature:"Hot and dry — 38°C summer, 18°C winter",
    facts:["Founded in 1062 by Youssef ibn Tachfin","UNESCO World Heritage medina since 1985","La Mamounia hotel has operated since 1929 — Churchill's favourite","Gateway to Mount Toubkal (4,167m) — North Africa's highest peak","Djemaa el-Fna: UNESCO Intangible Cultural Heritage","The Ben Youssef Madrasa (1570) is the largest theological college in North Africa","Over 3 million tourists visit Marrakech each year","The souks cover 18 distinct trade quarters — a living medieval marketplace","Rose water from the Dades Valley is distilled in the city's ancient workshops","Marrakech hosted the COP22 climate conference in 2016"],
    gettingThere:"Marrakech Menara Airport (RAK) has direct flights from most European cities (London, Paris, Amsterdam, Madrid). Train to Casablanca (3h) and Rabat (4h). CTM buses from Fes, Casablanca and Agadir. Supratours coaches from Agadir and Essaouira.",
    tips:["Visit Djemaa el-Fna between 9pm–11pm for the full experience","Start souk exploration at 9am before tour groups arrive","Book riads at least 3 weeks ahead in spring/autumn","Hire a calèche (horse-drawn carriage) for a sunset ramparts circuit","Majorelle Garden: arrive at 8am opening to avoid crowds","Bargain respectfully in the souks — 40–50% of initial price is fair","Try the mechoui (slow-roasted lamb) at the plaza near Djemaa el-Fna at noon","Hammam Dar el-Bacha offers an authentic local hammam experience for 30 MAD","Book a cooking class — learning tagine at a riad is a highlight of any visit","The Saadian Tombs are free and less crowded than other sites"],
    highlights:["Djemaa el-Fna","Medina souks","Jardin Majorelle","Atlas day trips"],
    priceLevel:"$$",
  },
  {
    id:3, slug:"fes", name:"Fes", region:"Fès-Meknès", tagline:"The Ancient Soul of Morocco",
    description:"Fes — the oldest of Morocco's Imperial Cities — is the country's spiritual and intellectual heart. Founded in 789 AD, Fes el-Bali (the old city) is the largest living medieval city in the world and a UNESCO World Heritage Site of extraordinary density and beauty.\n\nThe medina's 9,400 alleys make it the largest car-free urban area on earth. Getting lost is not just inevitable — it is the experience. A maze of ancient mosques, Quranic schools, tanneries, craft workshops and fondouks (merchants' inns) where time has barely moved since the 13th century.\n\nThe Chouara Tannery — one of the oldest tanneries in the world — is one of the most striking sights in Morocco. The Al-Qarawiyyin University, founded in 859 AD, is the oldest continuously operating university on earth.",
    image:I.fes1, heroImage:I.fes2,
    bestTime:"March–May, September–November",
    language:"Darija (Moroccan Arabic), French, Classical Arabic",
    currency:"Moroccan Dirham (MAD)", temperature:"Continental — 35°C summer, 5°C winter",
    facts:["Founded in 789 AD by Idris I — Morocco's oldest imperial city","Fes el-Bali is the largest living medieval city in the world (UNESCO)","Al-Qarawiyyin University (859 AD) is the world's oldest continuously operating university","The Chouara Tannery has been in use for centuries","The medina has over 9,400 alleys and is entirely car-free","The Bou Inania Madrasa (1350) is the finest example of Marinid architecture in Morocco","Fassi cuisine is considered the most refined in Morocco","The Fes Festival of World Sacred Music draws 600,000 visitors each May–June","Over 100 fondouks (ancient caravanserais) survive in the medina","Fes was one of the largest cities in the world in medieval times"],
    gettingThere:"Fes-Saïss Airport (FEZ) has direct flights from Paris, Brussels, Amsterdam, Madrid. ONCF train from Casablanca (4h30), Tangier (4h) and Rabat (3h). CTM buses from all major cities. Taxi from airport: 100–150 MAD.",
    tips:["Hire a local guide for the medina — the 9,400 alleys are genuinely impossible to navigate alone the first time","Visit Chouara Tannery in the morning for the best colours and light","The Bou Inania Madrasa (1350) is free and the most beautiful building in Fes","Fassi couscous on Friday — find a neighbourhood restaurant that serves the real family version","Buy saffron, ras el hanout and preserved lemons from the spice souk near Bab Rcif","Al-Qarawiyyin Library is not open to visitors — appreciate it from the courtyard","Book dinner at Riad Fes or Dar Roumana for genuine Fassi fine dining","The Blue Gate (Bab Bou Jeloud) at sunset is Fes's most photographed sight","Lunch at a rooftop restaurant above the medina for the full cityscape panorama","Day trip to Meknès (45 min) and Volubilis Roman ruins"],
    highlights:["Chouara Tanneries","Bou Inania Madrasa","Medieval medina","Fassi cuisine"],
    priceLevel:"$",
  },
  {
    id:4, slug:"chefchaouen", name:"Chefchaouen", region:"Tanger-Tétouan-Al Hoceïma", tagline:"The Blue Pearl of Morocco",
    description:"Chefchaouen — the Blue City, the Blue Pearl — is one of the most photographed places on earth. Founded in 1471 as a refuge for Muslims and Jews expelled from Andalusia, every alley, staircase, flowerpot and wall in the old medina is painted in infinite shades of cobalt, indigo, cerulean and powder blue.\n\nNestled in the Rif Mountains at 600m altitude, Chefchaouen offers a natural freshness and tranquility that makes it unlike any other Moroccan city. The source of the Ras el-Maa river tumbles through the town centre. Goats wander through the medina. The pace of life is gentle and the welcome is warm.\n\nAbove the medina, a 45-minute hike brings you to the Spanish Mosque with its panoramic view of the blue rooftops against the green Rif Mountains — the most iconic view in Morocco.",
    image:I.chef1, heroImage:I.chef2,
    bestTime:"April–June, September–October",
    language:"Tarifit Berber (Riffian), Moroccan Arabic, Spanish",
    currency:"Moroccan Dirham (MAD)", temperature:"Mountain Mediterranean — 25°C summer, 4°C winter",
    facts:["Founded in 1471 by Moroccan and Andalusian refugees expelled from Spain","The blue colour originates from a Jewish tradition — blue wards off evil spirits","Altitude 600m — up to 10°C cooler than coastal cities in summer","The Rif Mountains surrounding Chefchaouen receive snow in winter","Home to the Akchour waterfalls — a full-day hiking destination","The medina was closed to non-Muslims until 1920","Chefchaouen is known for its goat cheese — unusually rare in Morocco","The local carpet style is distinctive — bold red and white Riffian geometric patterns","Just 3 hours from Tangier and 4 hours from Fes by bus","Often combined with a visit to Tétouan, the 'White Dove' city 60km south"],
    gettingThere:"No direct flights. CTM and Supratours buses from Tangier (3h), Fes (4h), Casablanca (5h30). Grand taxi from Tetouan (1h30) or Tangier (2h30). The town is walkable — no car needed.",
    tips:["The blue walls glow most beautifully in golden morning light — explore 7–9am before tour groups arrive","Hike to the Spanish Mosque (45 min) — the panoramic view is the iconic shot of Morocco","Swim at Akchour Waterfalls — a magnificent full-day trek (20km return)","The local kefta and goat cheese tagine is among the best in Morocco","Buy hand-woven Riffian rugs — the geometric patterns are unique to this region","The Plaza Uta el-Hammam is the heart of the medina — perfect for watching the world pass","Stay at least 2 nights — the city has a way of extending every stay","The hammam on the main square is open to all and costs 15 MAD","Overnight buses from Fes make an easy connection","Try the local bissara (broad bean soup) for breakfast — 5 MAD a bowl"],
    highlights:["Blue painted medina","Spanish Mosque viewpoint","Akchour Waterfalls","Rif Mountains hiking"],
    priceLevel:"$",
  },
  {
    id:5, slug:"merzouga", name:"Merzouga & Sahara", region:"Drâa-Tafilalet", tagline:"Desert of a Thousand Stars",
    description:"Merzouga is the gateway to Erg Chebbi — the most spectacular dune field in Morocco and one of the most beautiful landscapes on earth. The orange and gold dunes rise up to 150 metres from the flat hammada desert floor, creating a sea of perfectly sculpted sand.\n\nThe Sahara Desert experience — a camel trek at sunset, a night in a luxury desert camp under 3,000 stars, watching the sun rise over the dunes — is for many travellers the single most profound experience of their lives.\n\nBeyond Erg Chebbi, the region reveals the ancient ksar of Khemliya where the Gnaoua music tradition was born, the fossils of Erfoud (Morocco is one of the world's richest fossil sites), and the palm oasis of Tafilalet — the largest in North Africa.",
    image:I.sah1, heroImage:I.sah2,
    bestTime:"October–April",
    language:"Tamazight (Berber), Hassaniya Arabic, Moroccan Arabic",
    currency:"Moroccan Dirham (MAD)", temperature:"Desert — 43°C summer, 4°C winter (freezing nights)",
    facts:["Erg Chebbi dunes rise up to 150 metres — Morocco's highest dunes","The Sahara is the world's largest hot desert (9.2 million km²)","Morocco's fossils include 450-million-year-old trilobites, one of the world's richest sites","The village of Khemliya is the birthplace of the ancient Gnaoua music tradition","The Tafilalet palm oasis is the largest in North Africa","Dromedary camels can go 7 days without water","The Milky Way is visible every night from October to April in the Sahara","Erfoud is the world capital of ammonite fossil exports","Road from Marrakech to Merzouga crosses the High Atlas via the Tizi n'Tichka pass (2,260m)","Night temperatures in January can drop to -5°C in the desert"],
    gettingThere:"No direct flights. Most visitors fly to Marrakech (RAK) and drive 9–10 hours via the Dades Valley and Draa Valley route. CTM buses from Marrakech (10h). Shared grands taxis from Erfoud (45 min). Many visitors do a 3-day circuit from Marrakech through the Atlas and the Sahara.",
    tips:["Book a luxury desert camp in advance — the best fill up 3 months ahead","Sunset camel trek: depart 1 hour before sunset, arrive at camp in darkness","The coldest months (Dec–Jan) have the clearest skies — best stargazing","Ride a camel one-way, quad bike the other — the best of both worlds","Visit Khemliya village for an authentic Gnaoua music evening with local musicians","Buy ammonite fossils directly from the cutters in Erfoud — avoid tourist shops","4WD is not needed for Erg Chebbi — all roads are paved to Merzouga village","Bring layers even in spring — desert nights are cold even in April","Dawn (5:30am) on the dunes is even more beautiful than sunset","The 3-day Marrakech–Atlas–Sahara road trip is the greatest drive in Morocco"],
    highlights:["Erg Chebbi dunes","Camel sunset trek","Luxury desert camp","Sahara stargazing"],
    priceLevel:"$$$",
  },
  {
    id:6, slug:"essaouira", name:"Essaouira", region:"Marrakech-Safi", tagline:"The Wind City of Africa",
    description:"Essaouira — Mogador to the Portuguese, the Wind City of Africa — is Morocco's most beloved coastal escape. A fortified Atlantic port city of whitewashed walls, blue shutters and Portuguese ramparts, it has been declared a UNESCO World Heritage Site.\n\nThe Alizée trade wind blows every afternoon from April to October, making Essaouira the kitesurfing and windsurfing capital of Africa. The 10km beach south of the ramparts is one of the finest in Morocco.\n\nThe medina is relaxed, navigable and bohemian — full of art galleries, thuya wood workshops, live music venues and some of Morocco's finest seafood. Jimi Hendrix visited in 1969. Orson Welles filmed Othello on the ramparts in 1952.",
    image:I.ess1, heroImage:I.ess2,
    bestTime:"Year-round (avoid July–August for wind)",
    language:"Darija (Moroccan Arabic), French, Tachelhit Berber",
    currency:"Moroccan Dirham (MAD)", temperature:"Mild Atlantic — 23°C summer, 14°C winter (never extreme)",
    facts:["UNESCO World Heritage Site since 2001","Orson Welles filmed Othello on the ramparts in 1952","Jimi Hendrix visited in 1969 — reportedly considered buying a palace here","Home to Morocco's largest argan forest (a UNESCO Biosphere Reserve)","Essaouira is the world capital of thuya wood carving","The Gnaoua World Music Festival (June) draws 500,000 visitors annually","Morocco's finest fishing port — over 300 tonnes of sardines landed daily","The Alizée wind blows at 25–30 knots most summer afternoons","Morocco's Jewish heritage is strong in Essaouira — a significant mellah (Jewish quarter)","The ramparts were built by Portuguese engineer Théodore Cornut in 1769"],
    gettingThere:"Nearest airport: Marrakech RAK (2.5h by road). Supratours buses from Marrakech (2.5h, 80 MAD). CTM buses from Casablanca (5h) and Agadir (3h). No train. Shared grands taxis from Marrakech (3h, 100 MAD).",
    tips:["Buy grilled sardines straight from the port fishing boats at 7am — the freshest in Morocco","The rampart walk at sunset: 45 minutes of extraordinary Atlantic views","Gnaoua World Music Festival (June) — book accommodation 6 months ahead","Argan oil cooperative visits are free and fascinating","Kitesurfing lessons: many schools on the beach — 500 MAD for 2 hours","The medina is small and walkable — allow 2 hours","Heure Bleue Palais rooftop cinema: films under the stars every evening","La Fromagerie on Place Moulay Hassan: the best restaurant terrace in town","Essaouira is 10°C cooler than Marrakech in summer — a perfect July escape","Buy thuya wood objects from the craftsmen in the medina, not the tourist stalls"],
    highlights:["Atlantic ramparts","Gnaoua music","Kitesurfing beach","Thuya wood crafts"],
    priceLevel:"$$",
  },
  {
    id:7, slug:"atlas-mountains", name:"Atlas Mountains", region:"Marrakech-Safi / Drâa-Tafilalet", tagline:"Roof of North Africa",
    description:"The Atlas Mountains — running 2,500km across Morocco, Algeria and Tunisia — are Africa's highest mountain range outside the East African Rift. In Morocco, they divide the Atlantic coast from the Sahara Desert, creating dramatic landscapes of Berber villages, kasbahs, fossil valleys and the dramatic Draa and Dades gorges.\n\nMount Toubkal (4,167m) — just 60km from Marrakech — is the highest peak in North Africa. The two-day ascent from the Berber village of Imlil is one of the great mountain treks of the world, achievable with no technical equipment from October to May.\n\nThe Dades Valley and Todra Gorge are among the most dramatic landscapes in Africa. The kasbahs of Aït Ben Haddou (UNESCO) and Skoura appear like movie sets — because they are: Gladiator, Game of Thrones and Lawrence of Arabia were all filmed here.",
    image:I.atl1, heroImage:I.atl3,
    bestTime:"April–June, September–November",
    language:"Tachelhit Berber (Souss), Darija (Moroccan Arabic), French",
    currency:"Moroccan Dirham (MAD)", temperature:"Alpine — 25°C summer, -5°C winter peaks (snow Nov–May)",
    facts:["Mount Toubkal (4,167m) is the highest peak in North Africa","The Atlas range stretches 2,500km across Morocco, Algeria and Tunisia","Aït Ben Haddou is a UNESCO World Heritage ksar — filming location for Gladiator and Game of Thrones","The Todra Gorge has sheer 300m limestone walls — a world-class rock climbing destination","The Draa Valley palm oasis stretches 200km — the longest in Morocco","Berber villages in the Atlas have been inhabited for over 2,000 years","The Tizi n'Tichka pass (2,260m) on the Marrakech–Ouarzazate road is Morocco's most scenic drive","The Valley of Roses produces 4,000 tonnes of roses per year for perfumers","Snow covers Mount Toubkal from November to May","Morocco's fossil riches include the largest Cretaceous shark ever found (near Taouz)"],
    gettingThere:"Most Atlas destinations are accessed from Marrakech. Imlil (for Toubkal) is 90 minutes by taxi from Marrakech. The Tizi n'Tichka road to Ouarzazate takes 3h. Dades and Todra gorges are day trips from Tinghir or Ouarzazate. No train to the Atlas — car or guided tour recommended.",
    tips:["Toubkal ascent: two days, base camp at Neltner Refuge (3,207m). No technical experience needed Apr–Oct","Hire a local Berber mountain guide in Imlil — they know every path and rock","Aït Ben Haddou: arrive at sunrise for golden light on the ksar walls","Kasbah Tamadot (Richard Branson's mountain retreat) is 45 min from Marrakech","The Marrakech–Ouarzazate road is the greatest drive in Morocco — allow the full day","Todra Gorge: the walls glow most dramatically 10–11am when sun reaches the canyon floor","Valley of Roses: visit during the May harvest festival","Atlas circuit from Marrakech: Tizi n'Tichka → Ouarzazate → Aït Ben Haddou → Dades → Todra (3 days)","In winter (Dec–Feb), snow chains are required on the Tizi n'Tichka pass","Local Berber hospitality: accept any offer of mint tea in a mountain home"],
    highlights:["Toubkal summit trek","Aït Ben Haddou ksar","Todra Gorge","Dades Valley kasbahs"],
    priceLevel:"$$",
  },
  {
    id:8, slug:"agadir", name:"Agadir", region:"Souss-Massa", tagline:"Morocco's Sun & Beach Capital",
    description:"Agadir — rebuilt entirely after the devastating 1960 earthquake — is Morocco's premier beach resort and the country's most visited city by international tourists. A 10km arc of golden Atlantic sand framed by a casbah hill, palm-lined promenade and year-round sunshine (300+ days per year) makes it an irresistible destination for beach lovers.\n\nBut Agadir is more than its beach. The Souss-Massa National Park shelters the last wild populations of the critically endangered Northern Bald Ibis. The argan forest of the surrounding region is a UNESCO Biosphere Reserve where women's cooperatives hand-press the world's most valuable culinary oil.\n\nThe Thursday Souk El Had — one of the largest traditional markets in North Africa — is an extraordinary spectacle.",
    image:I.ess1, heroImage:I.ess2,
    bestTime:"Year-round (beach destination — 300+ sun days)",
    language:"Tachelhit Berber (Souss), Darija (Moroccan Arabic), French",
    currency:"Moroccan Dirham (MAD)", temperature:"Atlantic — 28°C summer, 18°C winter (sunniest city in Morocco)",
    facts:["Agadir gets over 300 days of sunshine per year — the sunniest city in Morocco","The 1960 earthquake destroyed the old city (15,000 deaths) — the entire city was rebuilt","The 10km Agadir beach is consistently ranked one of the best in Africa","Souk El Had is one of the largest traditional markets in North Africa (6,500 vendors)","The Souss-Massa National Park shelters the world's last wild Northern Bald Ibis","Morocco produces 95% of the world's argan oil — most from the Agadir region","The Agadir marina has 700 berths — one of the largest yacht marinas in West Africa","Agadir is Morocco's main sardine-exporting port","The Val d'Argan winery produces excellent Atlantic-influenced Moroccan wine","Agadir airport handles over 4 million passengers per year"],
    gettingThere:"Agadir Al Massira Airport (AGA) has flights from London, Paris, Amsterdam, Frankfurt, Brussels and many European cities. Supratours buses from Marrakech (3.5h) and Casablanca (7h). No train to Agadir. Car rental is the best way to explore the surrounding area.",
    tips:["The beach is 10km long — the southern end near Tikida Beach hotels is the most beautiful","Souk El Had on Thursdays is the most authentic market experience in the region","Book a day trip to Imouzzer Ida Outanane waterfalls (60km north)","Argan oil cooperative visit: Cooperative Ibn Baitar is the most reputable","Surfing: Taghazout (20km north) is Africa's best surf spot — board rental from 100 MAD","The kasbah hill at sunset: the Arabic inscription glows gold in the last light","Cap Rhir to the north: a lighthouse perched on dramatic Atlantic cliffs","Fresh fish at the port market early morning — negotiate with the fishermen","Agadir–Tiznit road (60km south): the most scenic coastal drive in Morocco","Try argan-infused amlou (almond butter) — the best breakfast spread in Morocco"],
    highlights:["10km golden beach","Souss-Massa National Park","Argan oil cooperatives","Taghazout surfing"],
    priceLevel:"$$",
  },
  {
    id:9, slug:"casablanca", name:"Casablanca", region:"Casablanca-Settat", tagline:"Morocco's Modern Heart",
    description:"Casablanca — Casa to its residents, Dar el-Beida (White House) in Arabic — is Morocco's economic capital and largest city. A dynamic, modern metropolis of 4 million people built on French Art Deco architecture and Moorish grandeur, it is Morocco's pulse of business, culture, fashion and gastronomy.\n\nThe Hassan II Mosque — rising from a promontory directly over the Atlantic Ocean — is one of the largest mosques in the world and Morocco's greatest architectural achievement. Its 210-metre minaret is the tallest religious structure on earth.\n\nBeyond the mosque, the city offers Morocco's best restaurants, a vibrant arts scene, a revitalized Art Deco old medina, the Corniche Ain Diab oceanfront, and the kind of sophisticated nightlife found nowhere else in the country.",
    image:I.cas1, heroImage:I.cas1,
    bestTime:"April–October",
    language:"Darija (Moroccan Arabic), French, English (business)",
    currency:"Moroccan Dirham (MAD)", temperature:"Atlantic — 26°C summer, 14°C winter (mild, never extreme)",
    facts:["Hassan II Mosque is one of the largest mosques in the world (about 25,000 worshippers inside)","Its 210m minaret is one of the tallest in the world","Part of the mosque is built out over the Atlantic Ocean","Casablanca generates 50% of Morocco's national industrial production","Mohammed V International Airport (CMN) is the busiest in Morocco (10 million pax/year)","The Rick's Café (inspired by the 1942 film Casablanca) is a genuine fine dining destination","Casablanca was Morocco's first city to have a tramway (2012)","The Casa-Port to Tangier TGV takes just 2h10","Port of Casablanca handles 35 million tonnes of freight per year","The 1930s Art Deco architecture of the Ville Nouvelle is one of the finest collections in the world"],
    gettingThere:"Mohammed V International Airport (CMN) is Morocco's main hub with direct flights from 100+ destinations globally. Al Boraq high-speed train: Casablanca to Tangier (2h10), to Rabat (1h). ONCF train to Marrakech (3h), Fes (4h30). Tramway connects the city centre.",
    tips:["Hassan II Mosque: guided tours daily 9am–6pm (non-Muslims welcome) — book at the mosque door","Rick's Café: dinner reservation essential — call ahead on the day","La Sqala: the most beautiful garden restaurant in Casablanca, inside Portuguese ramparts","Corniche Ain Diab: the 5km ocean boulevard is best at sunset","Art Deco walking tour of the Ville Nouvelle: the greatest collection in Africa","The old medina is small and safe — the Sqala (rampart tower) is the highlight","Mohammed V Square at night: the art deco architecture illuminated is extraordinary","Day trip to Azemmour (80km south) — a blue-and-white medina on the Oum er-Rbia river","Casa Voyageurs station: one of the most beautiful in Africa","Morocco's best sushi and Japanese food is in Casablanca — try Bleu Marine at Four Seasons"],
    highlights:["Hassan II Mosque","Art Deco architecture","Rick's Café","Atlantic Corniche"],
    priceLevel:"$$$",
  },
];



const gallery = [
  { id:1, url:I.mrk3,  caption:"Marrakech — Medina Street",         city:"Marrakech",  size:"large" },
  { id:2, url:I.sah1,  caption:"Erg Chebbi — Sahara Dunes",         city:"Merzouga",   size:"small" },
  { id:3, url:I.chef2, caption:"Chefchaouen — Blue City",           city:"Chefchaouen",size:"small" },
  { id:4, url:I.atl1,  caption:"High Atlas Mountains",              city:"Atlas",      size:"large" },
  { id:5, url:I.cap,   caption:"Cap Spartel — Where Two Seas Meet", city:"Tangier",    size:"small" },
  { id:6, url:I.fes2,  caption:"Fes el-Bali Ancient Medina",        city:"Fes",        size:"small" },
  { id:7, url:I.tng5,  caption:"Tangier Bay Beach",                 city:"Tangier",    size:"large" },
  { id:8, url:I.mrk5,  caption:"Marrakech Spice Souk",              city:"Marrakech",  size:"small" },
  { id:9, url:I.ess1,  caption:"Essaouira Atlantic Port",           city:"Essaouira",  size:"small" },
  { id:10, url:I.mrk1, caption:"Marrakech — Riad Courtyard",        city:"Marrakech",  size:"small" },
  { id:11, url:I.fes1, caption:"Fes — Royal Palace Gate",           city:"Fes",        size:"large" },
  { id:12, url:I.tng1, caption:"Tangier — Medina Streets",          city:"Tangier",    size:"small" },
  { id:13, url:I.sah2, caption:"Sahara — Camel Caravan at Sunset",  city:"Merzouga",   size:"large" },
  { id:14, url:I.chef1,caption:"Chefchaouen — Blue Stairs",         city:"Chefchaouen",size:"small" },
  { id:15, url:I.ess2, caption:"Essaouira — Harbour View",          city:"Essaouira",  size:"small" },
  { id:16, url:I.atl2, caption:"Atlas — Valley Village",            city:"Atlas",      size:"small" },
  { id:17, url:I.mrk4, caption:"Marrakech — Koutoubia at Dusk",     city:"Marrakech",  size:"large" },
  { id:18, url:I.fes3, caption:"Fes — Leather Tanneries",           city:"Fes",        size:"small" },
];

// ═══ Blog Posts ═══
const blogPosts = [
  {
    id:1, featured:true, category:"Travel Tips",
    title:"10 Things to Know Before Visiting Morocco",
    excerpt:"From navigating the medinas to tipping etiquette — the essential tips that will transform your Moroccan adventure.",
    image:I.mrk3, readTime:"6 min read", date:"September 2026",
    author:"Morocco Travel Team", authorAvatar:null,
    content:`<p>Morocco is a country that rewards the curious traveller — but a little preparation goes a long way. Here are 10 practical tips for a first trip.</p>
<h2>1. Learn a Few Words of Darija</h2>
<p>Even a simple "Salam" (hello) or "Shukran" (thank you) in Moroccan Arabic opens doors that stay closed to tourists who don't try. Moroccans are deeply appreciative of any effort to speak their language.</p>
<h2>2. Bargaining is Expected — and Fun</h2>
<p>In the souks, the first price is almost never the final price. Start at about 40% of the asking price and work your way up. It's a social ritual, not a confrontation. Smile, drink tea if it's offered, and enjoy the performance.</p>
<h2>3. Dress Modestly Outside Tourist Areas</h2>
<p>Morocco is relatively liberal by regional standards, but covering shoulders and knees is respectful in medinas, rural areas, and when visiting mosques. In modern city centres like Casablanca's Maarif or Tangier's city centre, fashion is much more Western.</p>
<h2>4. The Best Food is in People's Homes</h2>
<p>Moroccan home cooking is almost always better than restaurant food. If you're invited to eat with a family, accept. You'll experience tagines, couscous, and pastilla that no restaurant can replicate.</p>
<h2>5. Friday is a Special Day</h2>
<p>Friday is the main weekly prayer day and mosques are busiest around midday; some shops close for a few hours. Couscous Friday is a nationwide tradition — families gather for the weekly couscous meal after Friday prayers. Many restaurants serve only couscous on Fridays.</p>
<h2>6. Cash is King</h2>
<p>Outside luxury hotels and major tourist restaurants, Morocco runs on cash. ATMs are plentiful in cities, but carry enough dirhams for rural areas and medina shopping.</p>
<h2>7. The Train System is Excellent</h2>
<p>Morocco has Africa's first high-speed train (Al Boraq) connecting Tangier to Casablanca in 2 hours 10 minutes. The regular ONCF network is reliable, comfortable and affordable.</p>
<h2>8. Mint Tea is a Ritual</h2>
<p>Tea is never just a drink in Morocco. It's a ceremony of hospitality. Refusing tea can be considered impolite. The sugar is always generous — asking for less is fine, but "no sugar" might earn you a puzzled look.</p>
<h2>9. Medinas Have Their Own Logic</h2>
<p>Getting lost in a medina is inevitable — and it's the best way to discover hidden riads, craftsmen and local life. If you're truly stuck, ask a shopkeeper (not a "helpful" stranger) for directions.</p>
<h2>10. Morocco is Safer Than You Think</h2>
<p>Most visits are trouble-free. Petty theft and scams happen in crowded tourist areas, so keep valuables out of sight, use official taxis and check your government's travel advice before you go.</p>`
  },
  {
    id:2, featured:false, category:"City Guides",
    title:"The Ultimate Tangier City Guide: 3 Days in the Gateway to Africa",
    excerpt:"Where two continents meet — a local's guide to the most cosmopolitan city in Morocco.",
    image:I.tng1, readTime:"8 min read", date:"August 2026",
    author:"Morocco Travel Team", authorAvatar:null,
    content:`<p>Tangier sits at the northwestern tip of Africa, 14km from Spain, where the Atlantic meets the Mediterranean. It's Morocco's most layered, most surprising city.</p>
<h2>Day 1: The Old Medina & Kasbah</h2>
<p>Start at the Grand Socco (Place du 9 Avril 1947) — the grand square that connects the new and old cities. Walk through Bab Fahs gate into the medina. Follow the narrow streets uphill to the Kasbah, where the Kasbah Museum (former Sultan's palace) houses 3,000 years of Tangier history.</p>
<p>From the kasbah walls, you can see Spain — the coast of Tarifa is clearly visible on most days. It is one of the few places where you can stand in Africa and see Europe.</p>
<h2>Day 2: Cap Spartel & Hercules</h2>
<p>Take a taxi to Cap Spartel — the dramatic headland where the Atlantic Ocean meets the Mediterranean Sea. The lighthouse marks the exact point. Continue to the Caves of Hercules, ancient sea-carved grottoes where legend says the Greek hero rested.</p>
<h2>Day 3: Modern Tangier</h2>
<p>Explore the new city: Boulevard Pasteur, Place de France, and the stunning Tangier City beach stretching 5km along the bay. End with sunset at Café Hafa — the legendary cliff-side café where Paul Bowles and the Rolling Stones once sat.</p>`
  },
  {
    id:3, featured:false, category:"Food & Drink",
    title:"A Foodie's Guide to Moroccan Cuisine: Beyond the Tagine",
    excerpt:"From street-side bissara to royal pastilla — discover the incredible depth of Moroccan cooking.",
    image:I.food_tagine, readTime:"7 min read", date:"August 2026",
    author:"Morocco Travel Team", authorAvatar:null,
    content:`<p>Moroccan cuisine is one of the world's great culinary traditions — a living blend of Berber, Arab, Andalusian, and French influences refined over centuries.</p>
<h2>The Tagine: Morocco's Signature Dish</h2>
<p>Named after the conical clay pot it's cooked in, the tagine is a slow-cooked stew where meat, vegetables, dried fruits and spices meld into something transcendent. The classic combinations: lamb with prunes and almonds, chicken with preserved lemon and olives, and kefta (meatball) with tomato and egg.</p>
<h2>Couscous Friday</h2>
<p>Every Friday, families across Morocco gather for the weekly couscous meal. Hand-rolled semolina steamed over a rich broth of seven vegetables and tender meat. It's Morocco's national dish and a sacred family tradition.</p>
<h2>Pastilla: The Crown Jewel</h2>
<p>A delicate pie of shredded pigeon (or chicken), eggs, almonds, cinnamon and sugar wrapped in tissue-thin warqa pastry. Sweet and savoury in perfect balance — originally from Fes, now beloved nationwide.</p>
<h2>Street Food You Must Try</h2>
<p>Bissara (broad bean soup), msemen (crispy layered flatbread), sfenj (Moroccan doughnuts), and snail soup from the carts of Jemaa el-Fnaa. The best food in Morocco often costs under 10 dirhams.</p>`
  },
  {
    id:4, featured:false, category:"Adventure",
    title:"Sahara Desert: A Night Under the Stars in Merzouga",
    excerpt:"Camel trekking, sandboarding, and sleeping under the Milky Way — the ultimate desert experience.",
    image:I.sah1, readTime:"5 min read", date:"July 2026",
    author:"Morocco Travel Team", authorAvatar:null,
    content:`<p>The Erg Chebbi dunes of Merzouga rise 150 metres from the flat hamada desert like golden waves frozen in time. Spending a night here is one of the most profound travel experiences in the world.</p>
<h2>The Journey</h2>
<p>Most visitors arrive from Marrakech or Fes via a day's drive through the Atlas Mountains, Todra Gorge and the Draa Valley — one of Morocco's most spectacular road trips. At the edge of the dunes, you'll mount a camel for the trek to your desert camp.</p>
<h2>The Desert at Night</h2>
<p>With zero light pollution, the Sahara sky is overwhelming. The Milky Way is so bright it casts shadows on the sand. Berber guides play traditional Gnawa drums around the fire, and the silence between songs is unlike any silence you've ever heard.</p>
<h2>Luxury Desert Camps</h2>
<p>Gone are the days of basic bivouacs. Today's luxury desert camps feature king-size beds, private bathrooms, heated pools and gourmet dining — all in the middle of the Sahara.</p>`
  },
  {
    id:5, featured:false, category:"Culture",
    title:"The Art of Moroccan Zellige: 1,000 Years of Mosaic Mastery",
    excerpt:"How Moroccan artisans create the most intricate tile mosaics on earth — and where to see the best examples.",
    image:I.fes1, readTime:"5 min read", date:"July 2026",
    author:"Morocco Travel Team", authorAvatar:null,
    content:`<p>Zellige (from the Arabic 'al-zulayj', meaning polished stone) is Morocco's most iconic art form — intricate geometric mosaic tilework found in palaces, mosques, riads and fountains across the country.</p>
<h2>How It's Made</h2>
<p>Each tiny piece is hand-cut from larger glazed tiles using a traditional hammer called a 'menqash'. The artisan (called a 'maâlem') works entirely by eye, cutting thousands of pieces to create complex geometric patterns without any guide or template. A single square metre of zellige can contain over 1,000 individual pieces.</p>
<h2>Where to See the Best Examples</h2>
<p>Fes is the world capital of zellige — the Bou Inania Madrasa, Al-Attarine Madrasa and the Royal Palace gates contain the finest examples. In Marrakech, the Ben Youssef Madrasa and Bahia Palace are stunning. In Casablanca, the Hassan II Mosque features the most ambitious modern zellige project ever undertaken.</p>`
  },
  {
    id:6, featured:false, category:"Travel Tips",
    title:"Getting Around Morocco: The Complete Transport Guide",
    excerpt:"Trains, buses, grand taxis, and the Al Boraq high-speed rail — how to navigate the Kingdom like a local.",
    image:I.cas1, readTime:"6 min read", date:"June 2026",
    author:"Morocco Travel Team", authorAvatar:null,
    content:`<p>Morocco has an excellent transport network that makes independent travel easy and affordable. Here's everything you need to know.</p>
<h2>Al Boraq High-Speed Train</h2>
<p>Africa's first high-speed railway connects Tangier to Casablanca in just 2 hours 10 minutes at speeds up to 320km/h. It's modern, comfortable and punctual. Book at oncf.ma.</p>
<h2>Regular Trains (ONCF)</h2>
<p>The national railway connects all major cities: Tangier, Rabat, Casablanca, Marrakech, Fes and Meknès. First class is comfortable and very affordable (Casablanca to Marrakech is about 150 MAD first class).</p>
<h2>Grand Taxis</h2>
<p>Shared Mercedes taxis that run fixed routes between cities. They leave when full (6 passengers) and are faster than buses. Agree on the price before departure.</p>
<h2>CTM & Supratours Buses</h2>
<p>Modern, air-conditioned long-distance buses covering routes the trains don't reach — essential for Chefchaouen, Essaouira, and Sahara destinations.</p>`
  },
  {
    id:7, featured:false, category:"City Guides",
    title:"Chefchaouen: The Blue City Photography Guide",
    excerpt:"The most photogenic city in Morocco — when to go, where to shoot, and how to capture the magic.",
    image:I.chef1, readTime:"4 min read", date:"June 2026",
    author:"Morocco Travel Team", authorAvatar:null,
    content:`<p>Chefchaouen's medina is painted entirely in shades of blue — cobalt, indigo, turquoise, powder blue and periwinkle. It's the most photographed small town in Africa.</p>
<h2>Best Time for Photography</h2>
<p>The golden hour (early morning and late afternoon) is magical — warm light against cool blue walls creates extraordinary contrast. Midday light is harsh but makes the blues vibrant. Overcast days create soft, even tones.</p>
<h2>Must-Photograph Spots</h2>
<p>The Spanish Mosque on the hill above town (best sunset viewpoint), Rue El Haouta (the most photographed alley), Place Uta el-Hammam (the main square), and the Ras El Maa waterfall where locals wash wool. The narrow alleys around the kasbah are endlessly photogenic.</p>
<h2>Tips</h2>
<p>Always ask permission before photographing people. Many locals are happy to be photographed, but some prefer not to be. A small tip is appreciated if someone poses for you.</p>`
  },
  {
    id:8, featured:false, category:"Adventure",
    title:"Trekking the Atlas: A Guide to Morocco's Mountain Trails",
    excerpt:"From day hikes to multi-day treks — exploring the dramatic High Atlas and Rif mountains.",
    image:I.atl1, readTime:"6 min read", date:"May 2026",
    author:"Morocco Travel Team", authorAvatar:null,
    content:`<p>The Atlas Mountains stretch 2,500km across Morocco, Tunisia and Algeria. In Morocco, the High Atlas rises to 4,167m at Jebel Toubkal — the highest peak in North Africa.</p>
<h2>Jebel Toubkal Trek</h2>
<p>The most popular trek in Morocco: a 2-day ascent from the village of Imlil (1,740m) to the summit at 4,167m. No technical climbing required, but good fitness is essential. The views from the top are extraordinary — on a clear day you can see the Sahara to the south and the Atlantic to the west.</p>
<h2>Berber Villages of the Ourika Valley</h2>
<p>An easy day trip from Marrakech — the Ourika Valley follows a rushing river past terraced farms, walnut groves and traditional Berber villages clinging to the mountainsides. The Setti Fatma waterfalls at the end of the valley are spectacular.</p>
<h2>When to Trek</h2>
<p>Spring (April–May) and autumn (September–October) offer the best conditions. Summer is too hot at lower altitudes. Winter brings snow above 2,000m — Toubkal summit is snow-covered from November to April.</p>`
  },
  {
    id:9, featured:false, category:"Adventure",
    title:"Marrakech to Merzouga in 3 Days: A Realistic Sahara Itinerary",
    excerpt:"The classic road trip from Marrakech over the High Atlas to the Erg Chebbi dunes — day by day, with honest advice on driving times.",
    image:I.sah1, readTime:"7 min read", date:"November 2026",
    author:"Morocco Travel Team", authorAvatar:null,
    content:`<p>The trip from Marrakech to the Erg Chebbi dunes at Merzouga is one of the most popular journeys in Morocco. It is roughly 550km each way on mountain and desert roads, so the most important advice is simple: <strong>do not try to do it in two days.</strong> Three days is the realistic minimum, and four is more comfortable.</p>
<h2>Day 1: Marrakech → Tizi n'Tichka → Aït Benhaddou → Dades Valley</h2>
<p>Leave Marrakech early. The road climbs into the High Atlas and crosses the Tizi n'Tichka pass at about 2,260m, with long series of hairpin bends — take motion-sickness tablets if you need them. In the afternoon, stop at <strong>Aït Benhaddou</strong>, the fortified earthen village (ksar) listed by UNESCO and used as a set for many films. Continue past Ouarzazate and spend the night in the <strong>Dades Valley</strong>, known for its red rock formations and kasbahs.</p>
<h2>Day 2: Todra Gorge → Merzouga, camel ride at sunset</h2>
<p>In the morning, walk into the <strong>Todra Gorge</strong> near Tinghir, where the canyon walls rise steeply on both sides of a shallow river. Then drive on through the desert towns towards Erfoud and Rissani to reach <strong>Merzouga</strong> in the afternoon. Most visitors leave their luggage at a hotel or camp office, take a camel or 4x4 into the dunes for sunset, and sleep in a desert camp.</p>
<h2>Day 3: Sunrise on the dunes → back to Marrakech (or on to Fes)</h2>
<p>Wake up early for sunrise over the dunes. The drive back to Marrakech is long — usually a full day of 9 hours or more with stops. Many travellers prefer to continue north to <strong>Fes</strong> instead, which is a similar distance and avoids driving the same road twice.</p>
<h2>Practical tips</h2>
<p><strong>Group tour, private driver or self-drive?</strong> Group tours are the cheapest but stick to a fixed schedule. A private driver lets you stop when you want. Self-driving is possible on good roads, but mountain bends and long distances make it tiring.</p>
<p><strong>What to bring:</strong> a scarf for sun and sand, sunglasses, a warm layer for the evening (desert nights are cold from November to March), a power bank, and cash for small purchases along the way.</p>
<p><strong>Weather:</strong> spring (March–May) and autumn (September–November) are the most pleasant. Summer days in Merzouga are extremely hot, and in winter the Tizi n'Tichka pass can be closed by snow for a few hours or days.</p>
<p>Want help arranging a driver or a desert camp? Send us your dates on WhatsApp.</p>`
  },
  {
    id:10, featured:false, category:"City Guides",
    title:"Is Chefchaouen Worth Visiting? A Practical Guide to the Blue City",
    excerpt:"How to get there, how long to stay, the best viewpoints and the waterfalls nearby — everything you need to plan a visit.",
    image:I.chef1, readTime:"6 min read", date:"November 2026",
    author:"Morocco Travel Team", authorAvatar:null,
    content:`<p>Chefchaouen sits in the Rif Mountains of northern Morocco, and its old medina is painted in shades of blue. It is calmer and smaller than Marrakech or Fes, which is exactly why many travellers love it. <strong>Yes, it is worth visiting</strong> — as long as you plan the journey, because it is not on the train network.</p>
<h2>How to get there</h2>
<p>There is no train to Chefchaouen. The usual options are a <strong>CTM bus</strong> from Tangier or Fes, a <strong>grand taxi</strong> via Tetouan, or a private driver. From Tangier the trip takes roughly 2.5–3 hours; from Fes, around 4 hours. Book buses a day ahead in busy seasons.</p>
<h2>How long to stay</h2>
<p>One full day is enough to see the medina, but <strong>two nights</strong> is better: you get the quiet early mornings in the blue streets before day-trippers arrive, and time for a hike or the waterfalls.</p>
<h2>What to see</h2>
<p><strong>The medina:</strong> wander without a plan — the town is small and you cannot get seriously lost. <strong>Place Outa el-Hammam:</strong> the main square, with the kasbah and its garden. <strong>Ras El Maa:</strong> the spring at the edge of town where the river flows out of the mountain. <strong>The Spanish Mosque viewpoint:</strong> a 30-minute walk uphill for the classic sunset view over the town.</p>
<h2>Day trip: Akchour waterfalls</h2>
<p>In Talassemtane National Park, about an hour's drive away, trails lead along a river to waterfalls and natural pools, and to the rock arch known as "God's Bridge". Wear proper shoes — the paths are rocky and can be slippery.</p>
<h2>Good to know</h2>
<p>Winters in the Rif are cold and wet, so pack warm clothes from November to March. Always ask before photographing people. You may be offered hashish in the streets — it is illegal for recreational use in Morocco, so simply say no and keep walking.</p>`
  },
  {
    id:11, featured:false, category:"Travel Tips",
    title:"Morocco in Winter: Weather, Where to Go and What to Pack",
    excerpt:"December to February can be a great time to visit — if you know that sunny days come with cold nights and snow in the mountains.",
    image:I.atl1, readTime:"6 min read", date:"November 2026",
    author:"Morocco Travel Team", authorAvatar:null,
    content:`<p>Many people imagine Morocco as hot all year. In winter (December to February) the days are often sunny and pleasant, but <strong>nights are cold</strong>, the mountains get snow and the north is rainy. With the right expectations it is a quiet, beautiful season with fewer crowds.</p>
<h2>What the weather is like</h2>
<p><strong>Marrakech:</strong> daytime highs are typically around 18–20°C with lots of sun, but nights can drop to around 5°C. <strong>Fes and Chefchaouen:</strong> colder and wetter, with chilly evenings. <strong>Agadir and the south coast:</strong> the mildest region, often around 20°C in the day. <strong>The Sahara (Merzouga):</strong> warm days, but nights can fall close to freezing. <strong>The High Atlas:</strong> snow on the peaks and often in the villages around Imlil.</p>
<p>Check our <a href="/weather">live weather page</a> for the current forecast in each city.</p>
<h2>Where to go</h2>
<p><strong>Marrakech and the south coast</strong> are the most comfortable. <strong>The desert</strong> is excellent if you bring warm layers for the camp at night. <strong>The Atlas Mountains</strong> are spectacular under snow, and Oukaïmeden, about an hour and a half from Marrakech, has a small ski area when there is enough snow. Mountain passes such as Tizi n'Tichka can close temporarily after heavy snowfall, so keep some flexibility in your plans.</p>
<h2>Riads in winter</h2>
<p>Traditional riads are built around open courtyards and are designed to stay cool, which means they can be cold in winter. Before booking, ask whether the rooms have heating and extra blankets.</p>
<h2>What to pack</h2>
<p>Layers: a warm jacket or fleece, a jumper, a scarf and a hat for evenings and the desert; comfortable walking shoes; a light rain jacket for the north; sunglasses and sunscreen for the bright days.</p>
<p>Winter is also a good time to visit for prices and crowds — except around Christmas and New Year, when Marrakech is very busy and should be booked early.</p>`
  },
];

// ═══ AGADIR Hotels ═══
const agadirHotels = [
  { id:30, name:"Sofitel Agadir Thalassa Sea & Spa", city:"Agadir", stars:5, price:280, image:null, badge:"Thalasso Spa Resort", description:"A 5-star seafront resort on Agadir Bay known for its thalassotherapy spa, which uses Atlantic seawater for its treatments. Gardens, pools and restaurants lead straight down to Agadir's long sandy beach.", amenities:["Beach","Thalasso Spa","Pools","Free WiFi","Restaurants","Gym"] },
  { id:31, name:"Hyatt Place Taghazout Bay", city:"Agadir", stars:4, price:110, image:null, badge:"Surf & Golf Resort", description:"A modern hotel in the Taghazout Bay resort, about 17km north of Agadir, overlooking the Atlantic and the foothills of the Atlas. Close to the surf spots of Taghazout and a 27-hole golf course, with outdoor pools and a shuttle to the beach and to Agadir.", amenities:["Pools","Free WiFi","Breakfast","Gym","Golf Nearby","Surf Nearby","Beach Shuttle"], rooms:152 },
  { id:32, name:"Royal Atlas & Spa", city:"Agadir", stars:5, price:160, image:null, badge:"Beachfront Resort", description:"A large beachfront resort on Agadir Bay with gardens, several pools, a spa and a choice of restaurants. Popular with families.", amenities:["Pools","Free WiFi","Spa","Restaurants","Kids Club","Beach"] },
  { id:33, name:"Riad Villa Blanche", city:"Agadir", stars:4, price:85, image:null, badge:"Boutique Riad", description:"An elegant boutique riad in the Baie des Palmiers area, a few minutes' walk from Agadir beach — often described as the city's first boutique hotel. Riad-style patios, an outdoor pool, a spa with hammam and a French-Moroccan restaurant.", amenities:["Pool","Free WiFi","Spa & Hammam","Rooftop Terrace","Restaurant","Near Beach"], rooms:28 },
];

// ═══ RABAT Hotels ═══
const rabatHotels = [
  { id:34, name:"Sofitel Rabat Jardin des Roses", city:"Rabat", stars:5, price:240, image:null, badge:"Palace & Gardens", description:"A 5-star hotel set in large rose gardens in the Souissi area, near the Royal Palace. Pools, a spa and several restaurants make it a calm base in the capital.", amenities:["Pools","Gardens","Free WiFi","Spa","Restaurants","Hammam","Fitness"] },
  { id:35, name:"La Tour Hassan Palace", city:"Rabat", stars:5, price:190, image:null, badge:"Historic Hotel", description:"One of Rabat's historic grand hotels, opened in the early 20th century in the city centre. Moorish arches, Andalusian gardens, a pool and a spa, within reach of the Hassan Tower and the medina.", amenities:["Pool","Free WiFi","Spa","Restaurants","Gardens","Hammam"] },
  { id:36, name:"Riad Dar Soufa", city:"Rabat", stars:4, price:95, image:null, badge:"Medina Riad", description:"A small traditional riad in the Rabat medina, a short walk from the Kasbah des Oudayas, the beach and the tram. A patio with a fountain, a rooftop terrace and breakfast included.", amenities:["Free WiFi","Breakfast","Rooftop Terrace","Patio","Medina Location"] },
  { id:37, name:"Rabat Marriott Hotel", city:"Rabat", stars:5, price:175, image:null, badge:"Modern City Hotel", description:"A modern hotel in the Agdal business district (Arribat Center) with around 190 rooms and suites in a blend of modern and Moorish design, a spa, a 24-hour gym and several restaurants and lounges.", amenities:["Free WiFi","Spa","Gym","Restaurants","Business Center"], rooms:190 },
];

// ═══ Moroccan Food ═══
const food = [
  { id:1, name:"Tagine", arabic:"الطاجين", french:"Tajine", category:"Main Course", icon:"🍲", image:I.food_tagine, imageCredit:{ author:'Houssain tork', url:commonsPage('Tajine_Moroccan.jpg') }, description:"Morocco's most iconic dish — a slow-cooked stew named after the conical clay pot it's cooked in. Meat (lamb, chicken or beef) or fish, vegetables, and often preserved lemons, olives or prunes are layered with spices and cooked slowly over charcoal or a low flame until tender. Every family has their own recipe, passed down for generations.", where:"Every restaurant, home and souk in Morocco.", price:"60–150 MAD at restaurants", region:"Nationwide", tip:"Tagines cooked slowly over charcoal are especially good — look for roadside spots with rows of clay pots on the coals." },
  { id:2, name:"Couscous", arabic:"الكسكس", french:"Couscous", category:"Main Course", icon:"🫕", image:I.food_couscous, imageCredit:{ author:'Moncif Ait Ahmed', url:commonsPage('Couscous_Royal_Marocain.JPG') }, description:"One of Morocco's national dishes, traditionally shared by the family on Fridays after midday prayers. Steamed semolina grains served with slow-cooked vegetables, chickpeas, and meat (lamb, chicken or beef) with a rich broth poured over. The grains are steamed several times over the stew and fluffed by hand between steamings.", where:"Best on Fridays at traditional Moroccan restaurants or in family homes.", price:"50–120 MAD", region:"Nationwide", tip:"Many local restaurants serve couscous only on Fridays — that is the best day to try it." },
  { id:3, name:"Pastilla (B'stilla)", arabic:"البسطيلة", french:"Pastilla", category:"Starter / Main", icon:"🥐", image:I.food_pastilla, imageCredit:{ author:'Fatima Zahra Charif Khalifi', url:commonsPage('Pastilla_au_poulet_et_amandes.jpg') }, description:"A festive pie of paper-thin warqa pastry layered with slow-cooked pigeon or chicken, eggs scrambled with saffron and herbs, and a layer of toasted almonds sweetened with cinnamon and sugar. Both sweet and savoury, dusted with sugar and cinnamon. Associated with Fes and served at weddings and celebrations.", where:"Fes, Marrakech — at traditional Fassi restaurants.", price:"80–200 MAD", region:"Fes, Marrakech", tip:"Seafood pastilla (with fish, prawns and vermicelli) is a popular savoury version, especially on the coast." },
  { id:4, name:"Harira", arabic:"الحريرة", french:"Harira", category:"Soup", icon:"🍜", image:I.food_harira, imageCredit:{ author:'Miansari66', url:commonsPage('Harira..JPG') }, description:"Morocco's beloved thick soup of tomatoes, lentils, chickpeas, vermicelli, fresh coriander, parsley and a squeeze of lemon. The traditional meal to break the Ramadan fast each evening at Iftar. Available year-round; during Ramadan it is served with dates and chebakia (honey-sesame pastries).", where:"Everywhere — street stalls, cafés, restaurants. Most authentic at home during Ramadan.", price:"10–25 MAD at street stalls", region:"Nationwide", tip:"Cheap cafés and street stalls sell harira by the bowl — in Ramadan, look for them just before sunset." },
  { id:5, name:"Moroccan Mint Tea", arabic:"أتاي", french:"Thé à la menthe", category:"Drink", icon:"🍵", image:I.food_tea, imageCredit:{ author:'Ekaterina Kvelidze', url:commonsPage('Moroccan_tea_1.jpg') }, description:"Gunpowder green tea brewed with fresh spearmint and plenty of sugar, poured from a height to make a light froth. Nicknamed 'Moroccan whisky', it is served throughout the day and is the classic gesture of hospitality.", where:"Everywhere — cafés, homes, riads, and often offered by shopkeepers in the souks.", price:"Free (hospitality) or 15–20 MAD at cafés", region:"Nationwide", tip:"You can ask for less sugar (\"shwiya sukar\"). A popular saying describes three glasses: the first gentle as life, the second strong as love, the third bitter as death." },
  { id:6, name:"Mechoui", arabic:"المشوي", french:"Méchoui", category:"Main Course", icon:"🐑", image:I.food_mechoui, imageCredit:{ author:'Lucyin', url:commonsPage('Mechwi_noices.JPG') }, description:"Lamb (often a whole lamb or shoulder) slow-roasted in a clay pit oven or on a spit for hours until the meat pulls from the bone. Rubbed with butter, salt and cumin, and eaten with bread and more cumin. Served at weddings, family feasts and at mechoui stalls.", where:"Mechoui Alley next to Jemaa el-Fna in Marrakech, weddings and family celebrations.", price:"Sold by weight — ask the price before ordering", region:"Marrakech, Ouarzazate, Sahara", tip:"In Mechoui Alley the lamb is ready around lunchtime — go early, as the best pieces sell out." },
  { id:7, name:"Msemen", arabic:"المسمن", french:"Msemen", category:"Breakfast / Street Food", icon:"🫓", image:I.food_msemen, imageCredit:{ author:'Juan Emilio Prades Bel', url:commonsPage('Msemmen.JPG') }, description:"Flaky, square Moroccan flatbread made by stretching dough very thin, folding it with oil or butter and semolina, then cooking it on a griddle. Eaten for breakfast or with afternoon tea, with honey, butter or amlou, or stuffed with onions and spices.", where:"Bakeries, street stalls, home kitchens — everywhere in Morocco.", price:"3–5 MAD on the street", region:"Nationwide", tip:"Buy it hot from a street griddle in the morning, with a glass of mint tea." },
  { id:8, name:"Rfissa", arabic:"الرفيسة", french:"Rfissa", category:"Main Course", icon:"🍗", image:I.food_rfissa, imageCredit:{ author:'مصطفى ملو', url:commonsPage('Rfisa_رفيسة.jpg') }, description:"A celebratory dish traditionally prepared for a new mother and for family gatherings — shredded msemen or meloui topped with chicken stewed with lentils, fenugreek seeds and ras el hanout. Warming and deeply spiced.", where:"Mostly home cooking; some traditional restaurants serve it, often on particular days.", price:"Varies — ask the restaurant", region:"Nationwide", tip:"If you stay in a family-run riad, ask whether they can prepare rfissa for you." },
];

// ═══ Culture & Festivals ═══
const culture = {
  festivals: [
    { id:1, name:"Gnaoua World Music Festival", city:"Essaouira", month:"June", dates:"Usually late June — check the official site for this year's dates", description:"One of Africa's greatest music festivals. Four days of free outdoor concerts on the Essaouira ramparts and main square, featuring the ancient Gnaoua trance music tradition alongside global artists. Gnawa music is inscribed on UNESCO's Intangible Cultural Heritage list.", image:I.ess1, free:true },
    { id:2, name:"Fes Festival of World Sacred Music", city:"Fes", month:"May–June", dates:"Usually late May or June — check the official site", description:"A profound and beautiful 9-day festival held within the ancient medina of Fes — one of the world's greatest celebrations of spiritual music. Sufi musicians, gospel choirs, Buddhist monks, Jewish cantors and classical artists from 40 countries perform in the courtyards of Fes's most magnificent palaces.", image:I.fes1, free:false },
    { id:3, name:"Marrakech International Film Festival", city:"Marrakech", month:"November", dates:"Usually late November / early December", description:"One of the most glamorous film festivals on the African continent, held annually in Djemaa el-Fna and the Palais des Congrès. International stars, directors and filmmakers converge on Marrakech for 10 days of screenings, tributes and galas. The Etoile d'Or is the top prize.", image:I.mrk2, free:false },
    { id:4, name:"Rose Festival", city:"Kelaat M'Gouna", month:"May", dates:"Usually early May", description:"Every May in the Valley of Roses near Kelaat M'Gouna, the annual harvest of the Damask rose (used in rose water and argan rose oil) is celebrated with parades, traditional music, Berber folk dancing, and the crowning of the Rose Queen. A deeply authentic rural Moroccan celebration.", image:I.atl1, free:true },
    { id:5, name:"Tan-Tan Moussem", city:"Tan-Tan", month:"October", dates:"Dates vary — check locally", description:"The largest nomadic tribal festival in North Africa — a gathering of over 30 Saharan and sub-Saharan tribes stretching from the Atlas to the Sahara. Camel races, traditional music, poetry recitals and an extraordinary display of Saharan culture. UNESCO Intangible Cultural Heritage.", image:I.sah1, free:true },
    { id:6, name:"Ramadan", city:"All Morocco", month:"Varies", dates:"Varies by year (lunar calendar)", description:"Experiencing Ramadan in Morocco is one of the most profound travel experiences on earth. Cities come alive after Iftar (sunset) with the smell of Harira, the sound of music and the warmth of Moroccan family life. The Tarawih prayers in the Hassan II Mosque are awe-inspiring. Travel during Ramadan for a completely different Morocco.", image:I.mrk4, free:true },
  ],
  customs: [
    { title:"Hospitality (Diyafa)", description:"Moroccan hospitality is legendary and non-negotiable. If you are invited to a Moroccan home, you will be fed regardless of the hour. Refusing hospitality is deeply offensive. Accept with gratitude.", icon:"🏠" },
    { title:"Greetings", description:"A proper Moroccan greeting takes time — shake hands (right hand), inquire about health, family and wellbeing. Men greet men; women greet women. Between genders, let the other person initiate.", icon:"🤝" },
    { title:"Dress Code", description:"Outside beach resorts, dress modestly — shoulders and knees covered for both men and women, especially in medinas, mosques and rural areas. Carry a scarf to cover when needed.", icon:"👗" },
    { title:"Ramadan Etiquette", description:"During Ramadan, avoid eating, drinking or smoking in public during daylight hours out of respect. Most restaurants close until Iftar. This is a beautiful time to visit if you respect the customs.", icon:"🌙" },
    { title:"Mosque Entry", description:"Non-Muslims cannot enter most mosques in Morocco except the Hassan II Mosque in Casablanca, which has guided tours. Always remove shoes before entering any religious site.", icon:"🕌" },
    { title:"Bargaining", description:"Bargaining is expected and enjoyed in Moroccan souks. Start at 40–50% of the asking price and meet in the middle. Accept mint tea during negotiation — it's part of the ritual, not a commitment to buy.", icon:"🛍️" },
  ],
  crafts: [
    { name:"Zellige", description:"Hand-cut geometric mosaic tilework — the art of cutting and assembling tiles into complex mathematical patterns. Originated in Fes in the 10th century.", city:"Fes", icon:"🔷" },
    { name:"Leather Tanning", description:"Fes is famous for its centuries-old tanneries. The leather is softened in pigeon dung, then dyed in natural colours — poppy red, saffron yellow, cobalt blue.", city:"Fes", icon:"👜" },
    { name:"Argan Oil", description:"Produced only in Morocco's argan forest (a UNESCO Biosphere Reserve), argan oil is hand-extracted by women's cooperatives. Used in cooking and cosmetics.", city:"Essaouira / Agadir region", icon:"🫒" },
    { name:"Berber Carpets", description:"Each Berber tribe has its own carpet pattern language — the geometric symbols encode prayers, fertility and protection. No two carpets are identical.", city:"Atlas Mountains / Marrakech", icon:"🪡" },
    { name:"Thuya Wood", description:"Essaouira is the world capital of thuya woodwork — the burled root of the argan tree is carved into extraordinary objects with its swirling grain.", city:"Essaouira", icon:"🪵" },
    { name:"Blue Pottery", description:"Chefchaouen's distinctive cobalt-glazed pottery is painted by hand with geometric designs by artisans in the medina.", city:"Chefchaouen / Fes", icon:"🏺" },
  ],
};

// ═══ Transport ═══
const transport = {
  airports: [
    { code:"CMN", name:"Mohammed V International Airport", city:"Casablanca", description:"Morocco's main international hub — direct flights to over 100 destinations in Europe, Africa, North America and the Middle East. 30km from Casablanca city centre. ONCF train to Casa-Port (30 min) and connecting trains to all major Moroccan cities.", airlines:["Royal Air Maroc","Air Arabia Maroc","Transavia","Ryanair","easyJet"], phone:"+212 5 22 53 90 40" },
    { code:"RAK", name:"Marrakech Menara Airport", city:"Marrakech", description:"Morocco's busiest tourist airport with over 7 million passengers per year. Direct flights from 50+ European cities. 6km from the medina — taxi 80–100 MAD, 15 minutes.", airlines:["Royal Air Maroc","Ryanair","easyJet","Transavia","Vueling"], phone:"+212 5 24 44 79 10" },
    { code:"TNG", name:"Tangier Ibn Battouta Airport", city:"Tangier", description:"Named after the medieval Tangerine explorer. Direct flights from Paris, Madrid, Brussels, Amsterdam, London and domestic routes. 15km from the city — taxi 80–100 MAD.", airlines:["Royal Air Maroc","Air Arabia Maroc","Ryanair","Transavia"], phone:"+212 5 39 39 37 20" },
    { code:"FEZ", name:"Fes-Saïss Airport", city:"Fes", description:"Direct flights from Paris, Brussels, Amsterdam, Madrid and other European cities. 15km from the medina — taxi 100–150 MAD. CTM bus also available.", airlines:["Royal Air Maroc","Ryanair","easyJet","Transavia"], phone:"+212 5 35 67 47 12" },
    { code:"AGA", name:"Agadir Al Massira Airport", city:"Agadir", description:"Major holiday airport serving southern Morocco. Charter and low-cost flights from UK, Germany, France and Scandinavia. 25km from Agadir beach — taxi 150–200 MAD.", airlines:["Royal Air Maroc","Ryanair","TUI","easyJet"], phone:"+212 5 28 83 90 22" },
  ],
  trains: [
    { name:"Al Boraq High-Speed Train", type:"TGV", description:"Morocco's TGV-style high-speed rail service — the first in Africa. Connects Tangier to Casablanca in about 2h10 via Kenitra and Rabat, with frequent departures throughout the day.", routes:["Tangier → Casablanca: 2h10","Tangier → Rabat: 1h30","Tangier → Kenitra: 55 min"], price:"Fares vary by date and class — check oncf.ma", booking:"oncf.ma" },
    { name:"ONCF National Rail Network", type:"Train", description:"Morocco's national railway links Tangier, Rabat, Casablanca, Marrakech, Fes, Meknes and Oujda. There is no train to the Sahara, Essaouira, Agadir or Chefchaouen — use CTM or Supratours buses. Modern, comfortable, affordable and punctual.", routes:["Casablanca → Marrakech: 3h","Casablanca → Fes: 4h30","Casablanca → Rabat: 1h","Marrakech → Tangier: 4h45"], price:"From 55 MAD second class", booking:"oncf.ma" },
  ],
  buses: [
    { name:"CTM (Compagnie de Transport au Maroc)", description:"Morocco's premium long-distance bus company. Comfortable, air-conditioned coaches with reserved seats, toilets and WiFi on many routes. The most reliable option for intercity travel.", routes:"All major cities and tourist destinations", price:"From 70 MAD Casablanca–Marrakech", booking:"ctm.ma | 0800 090 030" },
    { name:"Supratours", description:"The ONCF-operated coach network connecting rail stations to destinations not served by train — including Marrakech to Agadir, Laayoune and Dakhla. Reliable and well-priced.", routes:"Marrakech–Agadir, Marrakech–Essaouira, and southern routes", price:"From 80 MAD", booking:"At ONCF stations | supratours.ma" },
  ],
  taxis: [
    { name:"Petit Taxi (Small Taxi)", description:"City taxis operating within one city — colour-coded by city (red in Marrakech, blue in Rabat, etc). Maximum 3 passengers. Always negotiate the fare or insist on the meter before getting in.", tips:["Always agree on price first or ask for the compteur (meter)","Shared rides are normal — the driver may pick up other passengers on the same route","At airports, use official taxi stands, not touts"] },
    { name:"Grand Taxi (Long-Distance Taxi)", description:"Shared Mercedes sedans operating between cities — they depart when full (6 passengers). Much cheaper than private taxis but you wait for the car to fill. Ideal for medium distances.", tips:["Negotiate the full fare if you want the whole car to yourself","Grands taxis are faster than buses on short routes","Find them at the main taxi stands near bus stations"] },
  ],
  ferries: [
    { route:"Tanger Med → Algeciras (Spain)", operator:"Baleària Ferries / FRS", duration:"90 minutes", frequency:"Multiple daily", description:"The main route connecting Morocco to Spain — from Tanger-Med port (40km east of Tangier). Frequent sailings throughout the day and overnight. Carries vehicles and foot passengers.", price:"From 350 MAD foot passenger / from 1500 MAD with car" },
    { route:"Tanger Ville → Tarifa (Spain)", operator:"FRS", duration:"35 minutes", frequency:"8 daily", description:"The fastest crossing of the Strait of Gibraltar — high-speed catamaran from Tangier's city-centre port to Tarifa. Foot passengers only. Book in advance in summer.", price:"From 400 MAD" },
    { route:"Nador → Almería (Spain)", operator:"Baleària", duration:"7 hours", frequency:"Daily", description:"Overnight ferry connecting northeast Morocco to southeastern Spain. Convenient for travellers from the eastern Rif region. Carries vehicles.", price:"From 550 MAD foot passenger" },
  ],
};

// ═══ Emergency Information ═══
// Numbers checked against official sources (UK FCDO, US State Dept, Canada, embassy sites) — Nov 2026.
const emergency = {
  numbers: [
    { service:"Police", number:"19", description:"Police in towns and cities. From a mobile phone dial 190 (or 112).", icon:"👮", available:"24/7" },
    { service:"Ambulance & Fire (Civil Protection)", number:"15", description:"Fire, rescue and ambulance. From a mobile phone dial 150.", icon:"🚑", available:"24/7" },
    { service:"SAMU Medical Emergencies", number:"141", description:"Emergency medical service (SAMU) in major cities.", icon:"🏥", available:"24/7" },
    { service:"Royal Gendarmerie", number:"177", description:"Rural areas, highways and outside city limits.", icon:"🪖", available:"24/7" },
    { service:"Mobile Emergency", number:"112", description:"Works from any mobile phone and connects you to the emergency services.", icon:"📱", available:"24/7" },
    { service:"Tourist Police (Marrakech)", number:"0524 38 46 01", description:"Tourist brigade in Marrakech — report scams, theft or harassment. In other cities, call 19 / 190.", icon:"🛡️", available:"24/7" },
  ],
  hospitals: [
    { name:"CHU Ibn Rochd", city:"Casablanca", address:"1 Rue des Hôpitaux, Casablanca", type:"Public University Hospital" },
    { name:"CHU Mohammed VI", city:"Marrakech", address:"Quartier Amerchich, Marrakech", type:"Public University Hospital" },
    { name:"CHU Hassan II", city:"Fes", address:"Route de Sidi Harazem, Fes", type:"Public University Hospital" },
    { name:"CHU Ibn Sina", city:"Rabat", address:"Rabat", type:"Public University Hospital" },
  ],
  embassies: [
    { country:"USA", address:"Km 5.7, Avenue Mohammed VI, Souissi, Rabat (consular services for US citizens are at the Consulate General in Casablanca)", phone:"+212 537 63 72 00", emergency:"+212 661 13 19 39", website:"ma.usembassy.gov" },
    { country:"UK", address:"28 Avenue S.A.R. Sidi Mohammed, Souissi, Rabat", phone:"+212 537 63 33 33", emergency:"+44 20 7008 5000", website:"gov.uk/world/morocco" },
    { country:"France", address:"1 Rue Ibn Hajar, Agdal, Rabat", phone:"+212 537 68 97 00", emergency:"+212 537 68 97 00", website:"ma.ambafrance.org" },
    { country:"Spain", address:"Rue Aïn Khalouiya, Av. Mohammed VI Km 5.3, Souissi, Rabat", phone:"+212 537 63 39 00", emergency:"+212 537 63 39 00", website:"exteriores.gob.es/Embajadas/rabat" },
    { country:"Germany", address:"7 Zankat Madnine, Rabat", phone:"+212 537 21 86 00", emergency:"+212 537 21 86 00", website:"rabat.diplo.de" },
    { country:"Canada", address:"66 Avenue Mehdi Ben Barka, Souissi, Rabat", phone:"+212 537 54 49 49", emergency:"+1 613 996 8885 (Ottawa, 24/7)", website:"international.gc.ca" },
  ],
  tips: [
    "Travel insurance is essential — make sure it covers medical treatment and evacuation",
    "Keep a copy of your passport in your hotel safe and a scan on your phone",
    "Emergency treatment is usually not free for visitors — expect to pay upfront and claim from your insurer",
    "Drink bottled water, especially outside the big cities",
    "Pharmacies (pharmacie) are common; staff usually speak French and often some English",
    "If you lose your passport, report it to the police and contact your embassy for an emergency travel document",
    "Check your own government's travel advice for Morocco before you go",
  ],
};

// ═══ Weather data per city (monthly averages) ═══
const weather = {
  Marrakech:       { jan:{high:18,low:5,rain:25}, feb:{high:21,low:7,rain:20}, mar:{high:24,low:9,rain:18}, apr:{high:28,low:12,rain:15}, may:{high:33,low:16,rain:8},  jun:{high:38,low:20,rain:3},  jul:{high:40,low:22,rain:1},  aug:{high:40,low:22,rain:2},  sep:{high:35,low:19,rain:5},  oct:{high:29,low:14,rain:18}, nov:{high:22,low:9,rain:22},  dec:{high:18,low:5,rain:25},  best:"March–May, September–November", description:"Hot desert climate. Summers (Jun–Aug) are very hot (40°C+). Spring and autumn are perfect. Winters are mild and sunny." },
  Tangier:         { jan:{high:14,low:8,rain:90}, feb:{high:15,low:9,rain:80}, mar:{high:17,low:10,rain:65}, apr:{high:19,low:12,rain:55}, may:{high:22,low:14,rain:30}, jun:{high:25,low:17,rain:8},  jul:{high:27,low:19,rain:2},  aug:{high:28,low:20,rain:3},  sep:{high:26,low:18,rain:20}, oct:{high:22,low:15,rain:55}, nov:{high:18,low:12,rain:80}, dec:{high:15,low:9,rain:90},  best:"April–June, September–October", description:"Mediterranean climate. Warm, dry summers. Mild, rainy winters. The Strait breeze keeps summers comfortable." },
  Fes:             { jan:{high:13,low:3,rain:60}, feb:{high:16,low:5,rain:55}, mar:{high:20,low:7,rain:45}, apr:{high:23,low:10,rain:40}, may:{high:28,low:14,rain:25}, jun:{high:35,low:18,rain:8},  jul:{high:39,low:21,rain:2},  aug:{high:39,low:21,rain:3},  sep:{high:33,low:17,rain:12}, oct:{high:25,low:12,rain:38}, nov:{high:18,low:7,rain:55},  dec:{high:13,low:4,rain:65},  best:"March–May, September–November", description:"Continental climate. Very hot summers (near 40°C in July). Cool winters with occasional frost at night." },
  Chefchaouen:     { jan:{high:12,low:3,rain:80}, feb:{high:13,low:4,rain:75}, mar:{high:16,low:6,rain:65}, apr:{high:19,low:8,rain:55}, may:{high:23,low:12,rain:35}, jun:{high:28,low:16,rain:12}, jul:{high:32,low:18,rain:3},  aug:{high:32,low:18,rain:4},  sep:{high:27,low:15,rain:18}, oct:{high:21,low:11,rain:50}, nov:{high:16,low:7,rain:70},  dec:{high:12,low:4,rain:85},  best:"April–June, September–October", description:"Mountain Mediterranean climate. Cooler than the coast year-round. Snowy in winter at higher elevations." },
  Essaouira:       { jan:{high:17,low:11,rain:55}, feb:{high:17,low:11,rain:45}, mar:{high:18,low:12,rain:35}, apr:{high:19,low:13,rain:30}, may:{high:20,low:14,rain:15}, jun:{high:21,low:15,rain:3},  jul:{high:22,low:16,rain:0},  aug:{high:23,low:17,rain:0},  sep:{high:22,low:16,rain:5},  oct:{high:21,low:14,rain:25}, nov:{high:19,low:13,rain:40}, dec:{high:17,low:11,rain:55}, best:"Year-round (mild), avoid July–Aug (windy)", description:"Mild Atlantic climate year-round. Famously windy (kitesurfing paradise). Summers never too hot, winters never too cold." },
  Merzouga:        { jan:{high:14,low:2,rain:5},  feb:{high:18,low:4,rain:5},  mar:{high:23,low:7,rain:8},  apr:{high:29,low:12,rain:5},  may:{high:35,low:17,rain:3},  jun:{high:41,low:22,rain:1},  jul:{high:43,low:25,rain:0},  aug:{high:43,low:25,rain:0},  sep:{high:37,low:20,rain:3},  oct:{high:29,low:14,rain:5},  nov:{high:21,low:7,rain:5},   dec:{high:14,low:2,rain:5},   best:"October–April (desert)", description:"True desert climate. Extreme heat in summer (43°C). Cool winters with freezing nights. Best in spring/autumn." },
  Casablanca:      { jan:{high:17,low:8,rain:55}, feb:{high:18,low:9,rain:50}, mar:{high:20,low:11,rain:45}, apr:{high:22,low:12,rain:35}, may:{high:24,low:15,rain:18}, jun:{high:26,low:18,rain:5},  jul:{high:27,low:20,rain:1},  aug:{high:28,low:20,rain:1},  sep:{high:27,low:19,rain:10}, oct:{high:24,low:15,rain:35}, nov:{high:20,low:12,rain:50}, dec:{high:17,low:9,rain:60},  best:"April–October", description:"Atlantic coastal climate. Mild and pleasant year-round. Never too hot, never too cold. Some fog in winter." },
  Agadir:          { jan:{high:20,low:10,rain:20}, feb:{high:21,low:11,rain:18}, mar:{high:23,low:13,rain:15}, apr:{high:25,low:14,rain:10}, may:{high:27,low:16,rain:5},  jun:{high:29,low:18,rain:1},  jul:{high:29,low:19,rain:0},  aug:{high:30,low:20,rain:0},  sep:{high:29,low:19,rain:3},  oct:{high:26,low:16,rain:10}, nov:{high:23,low:13,rain:18}, dec:{high:20,low:10,rain:22}, best:"Year-round beach destination", description:"The sunniest climate in Morocco — Agadir gets over 300 days of sunshine per year. A true year-round beach destination." },
  Rabat:           { jan:{high:16,low:7,rain:65}, feb:{high:17,low:8,rain:58}, mar:{high:19,low:9,rain:50}, apr:{high:21,low:11,rain:40}, may:{high:23,low:13,rain:20}, jun:{high:26,low:16,rain:5},  jul:{high:28,low:18,rain:1},  aug:{high:29,low:19,rain:1},  sep:{high:27,low:17,rain:8},  oct:{high:23,low:14,rain:35}, nov:{high:19,low:11,rain:58}, dec:{high:16,low:8,rain:65},  best:"April–October", description:"Atlantic capital climate. Similar to Casablanca — mild and temperate year-round with a pleasant sea breeze." },
};

// ═══ Restaurants ═══
const restaurants = [
  // Tangier
  { id:1,  city:"Tangier", name:"Le Saveur du Poisson",     cuisine:"Seafood / Moroccan", price:"$$", address:"2 Escalier Waller, Medina, Tangier", description:"Tangier's most legendary restaurant — no menu, no choices. The owner selects the catch of the day and serves a multi-course feast of the freshest fish in Morocco. Sought out by food writers, chefs and travellers from around the world. Reservations essential.", mustTry:"Daily catch — whatever the sea offers", openHours:"Lunch only, Tue–Sun", image:I.tng6 },
  { id:2,  city:"Tangier", name:"El Morocco Club",           cuisine:"Moroccan / International", price:"$$$", address:"Rue du Prince Moulay Abdallah, Tangier", description:"A grand colonial-era supper club — art deco décor, 1940s ambiance and refined Moroccan cuisine. The kind of restaurant where diplomats, artists and wealthy Tangerines have dined for 80 years. Live piano music, pristine white tablecloths, and the best chicken bastilla in the city.", mustTry:"Chicken Bastilla, Lamb Tagine", openHours:"Daily 12pm–11pm", image:I.tng8 },
  // Marrakech
  { id:4,  city:"Marrakech", name:"Dar Yacout",              cuisine:"Classic Moroccan Fine Dining", price:"$$$$", address:"79 Sidi Ahmed Soussi, Marrakech Medina", description:"The most iconic dining experience in Marrakech — a 17th-century palace with courtyards, rose petals, candlelight and a feast of Moroccan dishes served in courses. Rooftop terrace with views over the medina. Appeared in almost every travel guide to Morocco ever written.", mustTry:"5-course traditional Moroccan feast", openHours:"Dinner only, daily from 8pm", image:I.mrk2 },
  { id:5,  city:"Marrakech", name:"Nomad",                   cuisine:"Modern Moroccan", price:"$$", address:"1 Derb Aarjan, Marrakech Medina", description:"A rooftop restaurant that reinvented Moroccan cuisine for the 21st century — clean, contemporary presentations of classic ingredients with spectacular views over the spice souk. The creative kitchen uses local and seasonal produce. Consistently voted one of the best in the medina.", mustTry:"Lamb & prune tagine, crunchy bastilla", openHours:"Daily 12pm–11pm", image:I.mrk3 },
  { id:6,  city:"Marrakech", name:"Al Fassia Aguedal",       cuisine:"Traditional Fassi", price:"$$$", address:"55 Boulevard Zerktouni, Guéliz, Marrakech", description:"One of the most respected restaurants in Morocco — entirely staffed and managed by women, serving the finest traditional Fassi (from Fes) cuisine. A rare restaurant where the tagine has been cooked by the same hands for 30 years. No gimmicks, just extraordinary food.", mustTry:"Chicken with preserved lemon & olives, Moroccan desserts", openHours:"Daily 12pm–3pm, 7:30pm–11pm", image:I.mrk1 },
  // Fes
  { id:7,  city:"Fes", name:"Restaurant Palais de Fes",      cuisine:"Traditional Moroccan", price:"$$$", address:"16 Rue Boutouil, Fes el-Bali", description:"A beautifully restored 15th-century palace in the heart of the Fes medina — rooftop terrace, carved stucco arches and belly dancing on Friday evenings. The menu is a comprehensive tour of Fassi cooking. One of the most photographed restaurants in Morocco.", mustTry:"Bastilla au pigeon, Friday Couscous", openHours:"Daily 12pm–10pm", image:I.fes1 },
  { id:8,  city:"Fes", name:"Dar Roumana Restaurant",        cuisine:"Fusion Moroccan", price:"$$$", address:"30 Derb el Amer, Zkak Roumane, Fes el-Bali", description:"The restaurant of the celebrated Dar Roumana riad — creative Moroccan-inspired cuisine by a trained international chef using the freshest local ingredients. Rooftop seating with sweeping views over the ancient city. Wine list.", mustTry:"Lamb with rose & preserved lemon, Chocolate pastilla", openHours:"Dinner only, from 7pm", image:I.fes2 },
  // Chefchaouen
  { id:9,  city:"Chefchaouen", name:"Aladdin Restaurant",    cuisine:"Moroccan / International", price:"$", address:"Rue Targui, Chefchaouen Medina", description:"A beloved budget-friendly restaurant in the blue medina with a large terrace and honest Moroccan cooking. Best known for enormous portions of kefta tagine and freshly made bissara (broad bean soup). A favourite of backpackers and solo travellers for 20 years.", mustTry:"Kefta tagine, Bissara soup", openHours:"Daily 8am–11pm", image:I.chef1 },
  // Essaouira
  { id:10, city:"Essaouira", name:"La Fromagerie",           cuisine:"Moroccan / French", price:"$$", address:"Place Moulay Hassan 1, Essaouira", description:"On the main square with views over the ramparts — creative Moroccan dishes with French influences and an excellent cheese selection (rare in Morocco). The fish tagine with chermoula is the best in Essaouira.", mustTry:"Fish tagine, Argan oil salads, Cheese board", openHours:"Daily 12pm–10pm", image:I.ess1 },
  { id:11, city:"Essaouira", name:"Fish Grills at the Port", cuisine:"Grilled Seafood", price:"$", address:"Port de Pêche, Essaouira", description:"Not a restaurant — a row of grill stalls at the working fishing port where the morning's catch is grilled over charcoal and served on plastic tables. Choose your fish from the display, haggle gently, and eat the freshest seafood of your life with bread and harissa. The real Essaouira experience.", mustTry:"Grilled sardines, Calamari, Sole", openHours:"Daily 9am–6pm", image:I.ess2 },
  // Casablanca
  { id:12, city:"Casablanca", name:"Rick's Café",            cuisine:"Moroccan / International", price:"$$$", address:"248 Boulevard Sour Jdid, Casablanca", description:"Inspired by the 1942 film — a recreation of the legendary bar from Casablanca. Not a tourist trap: genuine Moroccan and international cuisine, live jazz piano nightly and a beautiful 1940s décor. The tagine is excellent and the cocktails are the best in Casablanca.", mustTry:"Chicken tagine, Piano Bar cocktails", openHours:"Daily from 6pm", image:I.cas1 },
  { id:13, city:"Casablanca", name:"La Sqala",               cuisine:"Traditional Moroccan", price:"$$", address:"Boulevard des Almohades (inside the ramparts), Casablanca", description:"Hidden inside the 18th-century Portuguese ramparts of Casablanca — a garden restaurant of extraordinary beauty. The menu is a masterclass in Moroccan cooking: pastilla, tagines, couscous and fresh bread baked in clay ovens. The garden is magical at night.", mustTry:"Pastilla, Mixed tagine platter, Moroccan salads", openHours:"Daily 12pm–11pm", image:I.mrk4 },
  // Agadir
  { id:14, city:"Agadir", name:"Le Jardin d'Eau",            cuisine:"Moroccan / Mediterranean", price:"$$", address:"Secteur Touristique, Agadir", description:"A beautiful garden restaurant in Agadir's tourist district — a haven of calm with cascading water features, palm trees and excellent fresh seafood. One of the most relaxing dining spots on Morocco's Atlantic coast.", mustTry:"Atlantic grilled fish, Argan-marinated lamb", openHours:"Daily 12pm–11pm", image:I.ess1 },
  // Rabat
  { id:15, city:"Rabat", name:"Restaurant Dinarjat",         cuisine:"Classic Moroccan", price:"$$$", address:"6 Rue Belgnaoui, Medina, Rabat", description:"A beautifully restored 17th-century Andalusian-Moorish mansion in the Rabat medina, serving the finest traditional Moroccan cuisine in the capital. Every room has hand-painted ceilings, carved plaster and mosaic floors. The couscous royal is magnificent.", mustTry:"Couscous Royal, Bastilla, Lamb Mechoui", openHours:"Daily 12pm–11pm", image:I.fes3 },
];

// ═══ Car Rentals ═══
const carRentals = [
  { id:1, company:"Avis Morocco",      logo:"🚗", description:"International brand with offices at all major airports and city centres. Wide fleet from economy to SUV. Online booking with cancellation flexibility.", locations:["Casablanca CMN","Marrakech RAK","Agadir AGA","Tangier TNG","Fes FEZ","Rabat"], priceFrom:"350 MAD/day", website:"avis.com.ma", phone:"+212 5 22 97 45 97" },
  { id:2, company:"Hertz Morocco",     logo:"🚙", description:"Global leader with Morocco-wide network. Reliable modern vehicles, 24/7 roadside assistance and English-speaking staff at airports.", locations:["All major airports","Casablanca","Marrakech","Agadir","Tangier"], priceFrom:"400 MAD/day", website:"hertz.com", phone:"+212 5 22 48 47 10" },
  { id:3, company:"Budget Car Rental", logo:"🚐", description:"Best value international brand in Morocco. Competitive rates especially for weekly rentals. GPS available. Desert-ready 4x4s for Sahara trips.", locations:["All major airports","City centres"], priceFrom:"280 MAD/day", website:"budget.ma", phone:"+212 5 22 31 48 00" },
  { id:4, company:"Europcar Morocco",  logo:"🛻", description:"Large fleet including 4x4s ideal for Atlas Mountain and Sahara routes. Morocco driving tips included. Free child seats.", locations:["Casablanca","Marrakech","Agadir","Fes","Tangier","Rabat"], priceFrom:"320 MAD/day", website:"europcar.com.ma", phone:"+212 5 22 31 37 37" },
  { id:5, company:"Sixt Morocco",      logo:"🚕", description:"Premium vehicles including Mercedes and BMW. Perfect for business travellers and those wanting a higher-end driving experience on Morocco's excellent motorways.", locations:["Casablanca CMN","Marrakech RAK","Agadir AGA"], priceFrom:"550 MAD/day", website:"sixt.ma", phone:"+212 5 22 97 46 30" },
];


// ═══ Featured Attractions ═══
const featuredAttractions = [
  { id:100, name:"Hassan II Mosque", city:"Casablanca", type:"Landmark", UNESCO:false, image:I.cas1, description:"One of the largest mosques in the world, built on a promontory over the Atlantic Ocean, with a 210m minaret. 25,000 worshippers pray inside; 80,000 in the courtyard. The retractable roof opens to the sky. Guided tours for non-Muslims available.", coordinates:[33.6086,-7.6326], visit:"Tours daily 9am–6pm (except prayer times) | 130 MAD" },
  { id:101, name:"Jemaa el-Fnaa", city:"Marrakech", type:"Cultural Square", UNESCO:true, image:I.mrk3, description:"UNESCO Intangible Cultural Heritage and the beating heart of Marrakech. By day: orange juice sellers, henna artists, fortune tellers and snake charmers. By night: the world's greatest open-air theatre — storytellers, Gnawa musicians, acrobats, and the smoke and noise of 100 food stalls. Like nowhere else on earth.", coordinates:[31.6258,-7.9892], visit:"Open 24/7 — best after 7pm. Free." },
  { id:102, name:"Aït Ben Haddou", city:"Ouarzazate", type:"UNESCO Ksar", UNESCO:true, image:I.atl3, description:"The most spectacular ksar (fortified village) in Morocco — a UNESCO World Heritage Site on the ancient Saharan caravan route. Built from red earthen clay, it has been the backdrop for over 20 Hollywood films including Gladiator, Game of Thrones and Lawrence of Arabia. Inhabited by a few families who maintain the ancient structures.", coordinates:[31.0472,-7.1325], visit:"Open daily | 20 MAD entry" },
  { id:103, name:"Volubilis", city:"Meknès", type:"Roman Ruins", UNESCO:true, image:I.fes3, description:"Morocco's most impressive Roman ruins — a UNESCO World Heritage Site near Meknès. The capital of the Roman province of Mauritania Tingitana, Volubilis contains extraordinary floor mosaics, intact triumphal arches, forum, capitol and basilica dating from the 1st–3rd century AD. One of the best-preserved Roman sites in all of Africa.", coordinates:[34.0724,-5.5561], visit:"Open daily 8am–6pm | 70 MAD" },
  { id:104, name:"Chefchaouen Medina", city:"Chefchaouen", type:"Historic Medina", UNESCO:false, image:I.chef2, description:"The Blue City — every alley, staircase and wall painted in shades of cobalt, indigo and turquoise. Founded in 1471 as a refuge for Muslims and Jews expelled from Andalusia, the medina is a labyrinth of photogenic streets, craft workshops and shaded squares. The colour comes from a Jewish tradition of painting blue to ward off evil spirits.", coordinates:[35.1714,-5.2685], visit:"Open 24/7. Free to explore." },
  { id:105, name:"Kasbah des Oudayas", city:"Rabat", type:"Historic Kasbah", UNESCO:true, image:I.fes2, description:"A UNESCO World Heritage Site at the mouth of the Bou Regreg river — a 12th-century Almohad fortress with brilliant white and blue painted alleys overlooking the Atlantic. The Andalusian garden inside the kasbah is one of the most peaceful places in Morocco. The view from the walls over the ocean at sunset is unforgettable.", coordinates:[34.0331,-6.8408], visit:"Open daily. Free entry." },
  { id:106, name:"Majorelle Garden", city:"Marrakech", type:"Garden & Museum", UNESCO:false, image:I.mrk4, description:"Created by French painter Jacques Majorelle in 1924, purchased and restored by Yves Saint Laurent in 1980. A 12-acre botanical garden of rare cacti, bamboo and exotic plants around the iconic cobalt-blue Villa Majorelle, now home to the Berber Museum and Yves Saint Laurent Museum. One of the most visited sites in Morocco.", coordinates:[31.6415,-8.0036], visit:"Daily 8am–6pm | 150 MAD" },
];


const allHotels = [...hotels, ...agadirHotels, ...rabatHotels];

// Nightly prices change daily, so the API exposes only an approximate price range ($ – $$$$).
// The rough figure is kept internally just to compute that range.
const priceLevel = usd => usd < 80 ? '$' : usd < 150 ? '$$' : usd < 260 ? '$$$' : '$$$$';
const publicHotel = ({ price, ...h }) => ({ ...h, priceLevel: priceLevel(price) });
const publicHotels = allHotels.map(publicHotel);

app.get('/api/hotels', (req,res) => {
  const { city, stars, priceLevel: level } = req.query;
  let r = publicHotels;
  if (city)  r = r.filter(h => h.city.toLowerCase().includes(String(city).toLowerCase()));
  if (stars) r = r.filter(h => h.stars === Number(stars));
  if (level) r = r.filter(h => h.priceLevel === level);
  res.json(r);
});
app.get('/api/hotels/:id', (req,res) => {
  const h = publicHotels.find(h => h.id === Number(req.params.id));
  if (!h) return res.status(404).json({ error:'Not found' });
  res.json(h);
});

app.get('/api/cities', (req,res) => res.json([...new Set(publicHotels.map(h=>h.city))]));
// Real counts of what this guide covers — no invented visitor numbers.
app.get('/api/stats', (req,res) => res.json([
  { label:'Destinations', value:destinations.length, suffix:'' },
  { label:'Hotels & Riads', value:publicHotels.length, suffix:'' },
  { label:'Tour Ideas', value:tours.length, suffix:'' },
  { label:'Restaurants', value:restaurants.length, suffix:'' },
]));
app.get('/api/gallery', (req,res) => res.json(gallery));
const slugify = t => t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const blogWithSlugs = blogPosts.map(p => ({ ...p, slug: slugify(p.title) }));
app.get('/api/blog', (req,res) => {
  const { category } = req.query;
  res.json(category ? blogWithSlugs.filter(p => p.category === category) : blogWithSlugs);
});
app.get('/api/blog/:slug', (req,res) => {
  const post = blogWithSlugs.find(p => p.slug === req.params.slug);
  if (!post) return res.status(404).json({ error:'Not found' });
  res.json(post);
});
app.get('/api/attractions', (req,res) => {
  const { city } = req.query;
  res.json(city ? attractions.filter(a => a.city.toLowerCase().includes(String(city).toLowerCase())) : attractions);
});
// Add the extra destinations, then give every destination its verified, credited photo
MORE_DESTINATIONS.forEach((d, i) => destinations.push({ id: 10 + i, ...d }));
destinations.forEach(d => {
  const ph = DESTINATION_PHOTOS[d.slug];
  if (ph) Object.assign(d, ph);
});

app.get('/api/destinations', (req,res) => res.json(destinations));
app.get('/api/destinations/:slug', (req,res) => {
  const d = destinations.find(d => d.slug === req.params.slug);
  if (!d) return res.status(404).json({ error:'Not found' });
  res.json(d);
});
app.get('/api/tours', (req,res) => {
  const { city } = req.query;
  res.json(city ? tours.filter(t => t.city.toLowerCase().includes(String(city).toLowerCase())) : tours);
});
app.get('/api/food',        (req,res) => res.json(food));
app.get('/api/culture',     (req,res) => res.json(culture));
app.get('/api/transport',   (req,res) => res.json({ ...transport, carRentals }));
app.get('/api/emergency',   (req,res) => res.json(emergency));
app.get('/api/restaurants', (req,res) => {
  const { city } = req.query;
  res.json(city ? restaurants.filter(r => r.city.toLowerCase().includes(String(city).toLowerCase())) : restaurants);
});
app.get('/api/car-rentals', (req,res) => res.json(carRentals));
app.get('/api/weather', (req,res) => {
  const { city } = req.query;
  if (city && weather[city]) return res.json({ city, ...weather[city] });
  res.json(weather);
});
app.get('/api/featured-attractions', (req,res) => res.json(featuredAttractions));

// API health check endpoint
app.get('/api', (req, res) => {
  res.json({ message: '🇲🇦 Morocco Tourism API is running', status: 'OK' });
});

if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
}

export default app;
