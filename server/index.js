const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

// All photo IDs verified individually from unsplash.com/photos/[id]
const p = id => `https://images.unsplash.com/${id}?w=900&q=85&fit=crop&auto=format`;
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
  // Food — real Moroccan dish photos
  food_tagine:   p('photo-1540189549336-e6e99eb4adb3'),
  food_couscous: p('photo-1590846406792-0aefa5358172'),
  food_pastilla: p('photo-1574894709920-11b28e7367e3'),
  food_harira:   p('photo-1547592180-85f173990554'),
  food_tea:      p('photo-1564890369478-c89ca3d9cde8'),
  food_mechoui:  p('photo-1529042410759-befb1204b468'),
  food_msemen:   p('photo-1603133872878-684f208fb84b'),
  food_rfissa:   p('photo-1617196034183-421b4040ed20'),
};

const hotels = [
  // ═══ TANGIER ═══
  {
    id:1, name:"Fairmont Tazi Palace Tangier", city:"Tangier", stars:5, price:259, rating:4.7, reviews:399,
    image:I.cap,
    badge:"Luxury Palace",
    description:"A restored 1920s royal palace nestled among eucalyptus forests on a hilltop above Tangier with panoramic city and forest views. Fairmont's flagship North Africa property — 133 elegant rooms, 7 restaurants, 2,500m² spa, and a heated outdoor pool. Ranked #3 of 78 hotels in Tangier on TripAdvisor.",
    amenities:["Pool","Free WiFi","Breakfast","Spa","7 Restaurants","Fitness Center","Kids Club","Gardens","Airport Transfer"], rooms:133
  },
  {
    id:2, name:"El Minzah Hotel", city:"Tangier", stars:4, price:140, rating:4.5, reviews:1240,
    image:I.tng7,
    badge:"Historic Icon",
    description:"Tangier's most storied hotel, opened in 1930 by Lord Bute. A masterpiece of Moorish architecture with hand-painted ceilings, a lush courtyard garden and a terrace with direct views of the Strait of Gibraltar and the Spanish coast 14km beyond. Churchill, Matisse, the Rolling Stones and every notable visitor to Tangier stayed here.",
    amenities:["Pool","Free WiFi","Breakfast","Spa","Garden","Strait View","Historic Bar","Hammam"], rooms:140
  },
  {
    id:3, name:"Grand Hotel Villa de France", city:"Tangier", stars:4, price:120, rating:4.2, reviews:786,
    image:I.tng8,
    badge:"Matisse Heritage",
    description:"The hotel where Henri Matisse stayed in 1912 and painted some of his greatest Tangier canvases from Room 35 — the same room is preserved as it was. A beautifully restored Belle Époque property near the medina with a piano bar offering live music nightly and panoramic views over the white city and the Strait.",
    amenities:["Free WiFi","Breakfast","Piano Bar","Live Music","Panoramic Views","Historic Rooms"], rooms:48
  },
  {
    id:4, name:"Hilton Garden Inn Tanger City Center", city:"Tangier", stars:4, price:95, rating:4.4, reviews:2100,
    image:I.tng5,
    badge:"Beachfront Modern",
    description:"Modern 4-star hotel in the heart of Tangier's city centre with direct beach access, spacious contemporary rooms and an excellent breakfast buffet. Walking distance to the Grand Socco, the medina, the beach and Tangier Ville train station for the Al Boraq high-speed train to Casablanca.",
    amenities:["Free WiFi","Breakfast","Gym","Beach Access","Business Center","Family Rooms"], rooms:166
  },
  {
    id:5, name:"Saba's House — Riad Dar Saba", city:"Tangier", stars:5, price:80, rating:5.0, reviews:312,
    image:I.tng6,
    badge:"#1 Rated Tangier",
    description:"The highest-rated property in Tangier on TripAdvisor. A beautifully restored boutique riad inside the ancient kasbah, described by guests as 'feeling like a private art gallery'. Spectacular rooftop terrace with panoramic views over the medina rooftops, the port and the Bay of Tangier. Extraordinary breakfasts included.",
    amenities:["Free WiFi","Breakfast","Rooftop Terrace","Kasbah Views","Art Collection","Personalised Service"], rooms:7
  },
  {
    id:6, name:"Palais Zahia", city:"Tangier", stars:4, price:65, rating:4.5, reviews:428,
    image:I.tng4,
    badge:"Traditional Riad",
    description:"A traditional Moroccan riad in the heart of the old Medina with a beautiful rooftop terrace overlooking the maze of white alleyways. Guests are welcomed with mint tea on arrival and served fresh Moroccan breakfasts each morning. An authentic and tranquil base for exploring the medina on foot.",
    amenities:["Free WiFi","Breakfast","Rooftop","Mint Tea Welcome","Traditional Decor","Central Location"], rooms:12
  },
  // ═══ MARRAKECH ═══
  {
    id:7, name:"La Mamounia", city:"Marrakech", stars:5, price:480, rating:5.0, reviews:4320,
    image:I.mrk2,
    badge:"Most Legendary Hotel in Africa",
    description:"Built in 1923 as a royal wedding gift and opened as a hotel in 1929, La Mamounia has been the definitive address in Marrakech for a century. Winston Churchill painted here every winter; he called it 'the most lovely spot in the world'. Set within 17 acres of Moorish gardens inside the ancient medina walls, with 3 pools, 9 restaurants, a legendary casino and the finest spa in Morocco.",
    amenities:["3 Pools","Free WiFi","Breakfast","Spa","Casino","17-Acre Gardens","9 Restaurants","Hammam","Tennis"], rooms:209
  },
  {
    id:8, name:"La Maison Arabe", city:"Marrakech", stars:5, price:250, rating:4.9, reviews:1876,
    image:I.mrk1,
    badge:"Relais & Châteaux",
    description:"Founded in 1946 as Marrakech's first restaurant, La Maison Arabe became Morocco's first boutique hotel and remains one of the finest. Stunning Andalusian architecture, a heated pool, a traditional hammam, two acclaimed restaurants and Marrakech's only residential cooking school where guests learn authentic Moroccan recipes from master chefs.",
    amenities:["Pool","Free WiFi","Breakfast","Hammam","Cooking School","2 Restaurants","Spa","Rooftop"], rooms:26
  },
  {
    id:9, name:"Les Jardins de la Koutoubia", city:"Marrakech", stars:5, price:185, rating:4.5, reviews:2341,
    image:I.mrk4,
    badge:"Central Medina",
    description:"Steps from the Koutoubia Mosque — Marrakech's most iconic landmark — this elegant 5-star hotel wraps around two lush courtyards with heated pools and rose gardens. The rooftop Sky Bar offers one of the best views in the city. A rare combination of central location, luxury and calm in the heart of the old medina.",
    amenities:["2 Pools","Free WiFi","Breakfast","Spa","Sky Bar","Gardens","Hammam","Rooftop"], rooms:72
  },
  {
    id:10, name:"Riad AndallaSpa", city:"Marrakech", stars:5, price:150, rating:5.0, reviews:987,
    image:I.mrk3,
    badge:"TripAdvisor #1",
    description:"The highest-rated hotel in Marrakech on TripAdvisor. An authentically decorated riad just steps from Djemaa el-Fna square with spacious suites, an expert hammam and spa, a mosaic courtyard pool and a rooftop terrace where Moroccan mint tea and pastries await at any hour. Every review mentions the extraordinary personal service.",
    amenities:["Pool","Free WiFi","Breakfast","Hammam & Spa","Rooftop","Airport Transfer","Personal Service"], rooms:8
  },
  {
    id:11, name:"Mövenpick Hotel Mansour Eddahbi", city:"Marrakech", stars:5, price:200, rating:4.6, reviews:3102,
    image:I.mrk5,
    badge:"5-Star Resort",
    description:"A luxurious resort set within serene palm-filled grounds near the Palmeraie. Multiple outdoor pools, world-class spa, six dining options from Moroccan to Asian, a kids club, and direct access to one of Marrakech's top golf courses. One of the best family and couples resorts in the city.",
    amenities:["Multiple Pools","Free WiFi","Breakfast","Spa","6 Restaurants","Kids Club","Golf Access","Hammam"], rooms:336
  },
  // ═══ FES ═══
  {
    id:12, name:"Palais Jamaï", city:"Fes", stars:5, price:280, rating:5.0, reviews:856,
    image:I.fes1,
    badge:"19th-Century Palace",
    description:"Built in 1879 as the private residence of the Grand Vizier Jamai, this is the most significant hotel in Fes and one of the most important reopenings in North Africa in 2026. Alain Ducasse oversees three restaurants and four bars including a sky bar with panoramic views over the 1,200-year-old Fes medina. Perched on the hillside above the old city, it is unforgettable.",
    amenities:["Pool","Free WiFi","Breakfast","3 Restaurants","Sky Bar","Spa","Gardens","Hammam","Historic Palace"], rooms:118
  },
  {
    id:13, name:"Riad Fes — Relais & Châteaux", city:"Fes", stars:5, price:194, rating:4.9, reviews:1423,
    image:I.fes2,
    badge:"Michelin Key Award",
    description:"A jewel of Moroccan heritage — the only Relais & Châteaux property in Fes and winner of the Michelin Key for exceptional character, design and service. Four harmoniously styled Andalusian patios, sculpted plaster arcades, marble fountains and zellige walls. The rooftop bar offers the finest panoramic view over the Fes medina at sunset.",
    amenities:["Pool","Free WiFi","Breakfast","Spa","Rooftop Bar","Hammam","Fine Dining","Michelin Key"], rooms:22
  },
  {
    id:14, name:"Riad Laaroussa Hotel & Spa", city:"Fes", stars:4, price:130, rating:4.9, reviews:1108,
    image:I.fes3,
    badge:"TripAdvisor #1 Fes",
    description:"A tranquil restored palace in the heart of the Fes medina with a rooftop terrace offering panoramic views, lush gardens, a peaceful courtyard pool and a full spa and hammam. The highest TripAdvisor rating of any hotel in Fes — guests consistently praise the spacious rooms, exceptional Fassi cuisine and deeply personal service.",
    amenities:["Pool","Free WiFi","Breakfast","Spa","Hammam","Rooftop","Gardens","Fassi Cuisine"], rooms:9
  },
  {
    id:15, name:"Riad Fes Maya Suite & Spa", city:"Fes", stars:4, price:160, rating:4.9, reviews:892,
    image:I.fes1,
    badge:"Palace Architecture",
    description:"A historic palace in the ancient medina transformed into a stunning boutique hotel — walls covered in hand-carved plaster, ceilings of hand-painted cedar, and marble fountains in every courtyard. The rooftop pool seems to float above the medina rooftops. A true example of traditional Fassi aristocratic architecture.",
    amenities:["Pool","Free WiFi","Breakfast","Spa","Hammam","Rooftop","Historic Architecture"], rooms:15
  },
  // ═══ CHEFCHAOUEN ═══
  {
    id:16, name:"Lina Ryad & Spa", city:"Chefchaouen", stars:4, price:110, rating:4.6, reviews:1234,
    image:I.chef1,
    badge:"Medina Riad",
    description:"A luxurious riad in the heart of Chefchaouen's famous blue medina, surrounded by the Rif Mountains. Bright, spacious suites with private terraces overlooking the cobalt and indigo alleys. A large terrace provides a haven of tranquility above the maze of the old city. Traditional hammam, spa treatments and rooftop breakfasts with mountain views.",
    amenities:["Free WiFi","Breakfast","Spa","Hammam","Rooftop","Mountain Views","Central Medina"], rooms:15
  },
  {
    id:17, name:"Casa Sabila", city:"Chefchaouen", stars:4, price:70, rating:4.8, reviews:876,
    image:I.chef2,
    badge:"Blue City Gem",
    description:"A much-loved boutique guesthouse in the old medina with spacious, beautifully air-conditioned rooms decorated in traditional blue and white tile and local craftsmanship. The rooftop terrace breakfast area offers incredible views over the blue rooftops to the Rif Mountains. Praised by guests for exceptional friendliness and value.",
    amenities:["Free WiFi","Breakfast","Rooftop Terrace","Mountain Views","Air Conditioning","Traditional Decor"], rooms:10
  },
  {
    id:18, name:"La Petite Chefchaouen", city:"Chefchaouen", stars:4, price:55, rating:4.8, reviews:643,
    image:I.chef1,
    badge:"Intimate Boutique",
    description:"A small, intimate boutique hotel with just five rooms within the kasbah walls of Chefchaouen, run by warm and welcoming hosts. A panoramic rooftop terrace, innovative Moroccan-Mediterranean cooking, and the closest possible connection to the extraordinary blue-painted world outside your door.",
    amenities:["Free WiFi","Breakfast","Rooftop","Innovative Cuisine","Intimate (5 Rooms)","Inside Kasbah Walls"], rooms:5
  },
  {
    id:19, name:"Dar Jasmine", city:"Chefchaouen", stars:4, price:60, rating:4.6, reviews:712,
    image:I.chef2,
    badge:"Hilltop Views",
    description:"Situated on a hilltop above Chefchaouen with extraordinary views over the entire blue city, the valley and the Rif Mountains. Stylish rooms with local decor, scenic terraces at every level and warm five-star service. Guests describe the view from Dar Jasmine as one of the best in all of Morocco.",
    amenities:["Free WiFi","Breakfast","Hilltop Terrace","Panoramic Views","Local Decor","Mountain Walks"], rooms:9
  },
  // ═══ MERZOUGA ═══
  {
    id:20, name:"Desert Luxury Camp Morocco", city:"Merzouga", stars:5, price:275, rating:4.9, reviews:1876,
    image:I.sah1,
    badge:"#1 Erg Chebbi — TripAdvisor",
    description:"The highest-rated camp in Erg Chebbi on TripAdvisor and a consistent favourite of luxury travel writers. A small, owner-operated property tucked against the western flank of the 150m Erg Chebbi dunes. Beautifully designed private tents with en-suite bathrooms, all meals included, camel trekking at sunset and the most spectacular stargazing on earth.",
    amenities:["All Meals Included","Camel Trek","Stargazing","Private Bathroom","Desert Excursions","Traditional Music"], rooms:16
  },
  {
    id:21, name:"Kam Kam Dunes", city:"Merzouga", stars:5, price:310, rating:5.0, reviews:654,
    image:I.sah2,
    badge:"Contemporary Berber Design",
    description:"Run by a Moroccan-Spanish family with a passion for design, Kam Kam Dunes stands apart from other Sahara camps for its restrained, contemporary Berber aesthetic — neutral tones, thoughtful lighting, excellent linens and inspired cooking. One of the most beautiful camps in the Moroccan Sahara and utterly unlike anything else in the desert.",
    amenities:["All Meals Included","Camel Trek","Stargazing","Designer Tents","Gourmet Cuisine","Photography Tours"], rooms:12
  },
  {
    id:22, name:"Sahara Stars Camp", city:"Merzouga", stars:4, price:180, rating:4.8, reviews:1102,
    image:I.sah1,
    badge:"Luxury Desert Tents",
    description:"Sixteen luxurious, fully equipped tents on the edge of the Erg Chebbi dunes with private bathrooms, Moroccan rugs and proper beds. A large Berber tent serves as the communal restaurant where evening meals of slow-cooked tagine and fresh bread from a clay oven are served by candlelight under the stars.",
    amenities:["All Meals Included","Camel Trek","Stargazing","16 Luxury Tents","Berber Tent Restaurant","Sandboarding"], rooms:16
  },
  // ═══ ATLAS MOUNTAINS ═══
  {
    id:23, name:"Kasbah Tamadot", city:"Atlas Mountains", stars:5, price:350, rating:5.0, reviews:2134,
    image:I.atl1,
    badge:"Richard Branson's Retreat",
    description:"Richard Branson's legendary mountain retreat — a converted Berber kasbah at 1,500m in the High Atlas with views across a valley of almond and walnut trees to snow-capped peaks. World-class spa, heated outdoor pool, hiking routes to Mount Toubkal (4,167m — North Africa's highest peak), and one of the finest dining experiences in Morocco.",
    amenities:["Heated Pool","Free WiFi","Breakfast","Spa","Hiking","Yoga","Hammam","Airport Transfer"], rooms:28
  },
  {
    id:24, name:"Kasbah du Toubkal", city:"Atlas Mountains", stars:4, price:165, rating:4.8, reviews:1456,
    image:I.atl2,
    badge:"Trekkers' Base Camp",
    description:"The original mountain kasbah of Imlil village at 1,740m — a community-owned lodge where all profits benefit local Berber villages. Trekkers use it as their base camp for Mount Toubkal (4,167m). Mule treks, Berber guides, the most genuine Moroccan mountain food imaginable, and one of the most authentic experiences available in Morocco.",
    amenities:["Free WiFi","Breakfast","Hiking","Mule Trekking","Berber Guides","Hammam","Community-Owned"], rooms:14
  },
  {
    id:25, name:"Kasbah Bab Ourika", city:"Atlas Mountains", stars:5, price:240, rating:4.9, reviews:934,
    image:I.atl3,
    badge:"Infinity Pool + Organic Farm",
    description:"A boutique kasbah perched above the Ourika Valley at 1,300m with what may be the most spectacular infinity pool in Morocco — seemingly suspended above the valley with Atlas peaks in every direction. Certified organic kitchen garden, yoga deck, guided walks and one of the warmest family welcomes in the mountains.",
    amenities:["Infinity Pool","Free WiFi","Breakfast","Organic Garden","Hiking","Yoga","Valley Views"], rooms:10
  },
  // ═══ ESSAOUIRA ═══
  {
    id:26, name:"La Sultana Essaouira", city:"Essaouira", stars:5, price:150, rating:4.7, reviews:1654,
    image:I.ess1,
    badge:"5 Riads — UNESCO Medina",
    description:"Five interconnected 18th-century riads inside Essaouira's UNESCO-listed medina, steps from the Atlantic ramparts. A labyrinth of individually decorated suites with arched doorways and hand-painted ceilings. Rooftop terrace with direct ocean views, spa using local argan and rose, and a restaurant recognised as one of the finest in coastal Morocco.",
    amenities:["Free WiFi","Breakfast","Spa","Rooftop","Ocean Views","Hammam","Argan Spa Treatments"], rooms:18
  },
  {
    id:27, name:"Heure Bleue Palais", city:"Essaouira", stars:5, price:190, rating:4.8, reviews:2012,
    image:I.ess2,
    badge:"Rooftop Cinema",
    description:"A grand 18th-century riad inside the medina with an indoor heated pool, a hammam and spa, and Essaouira's only rooftop cinema — classic films screened under the stars each evening. The name ('blue hour') refers to the extraordinary Atlantic dusk light that bathes the city every evening. A full restaurant in a beautiful vaulted stone cellar.",
    amenities:["Heated Pool","Free WiFi","Breakfast","Spa","Hammam","Rooftop Cinema","Restaurant"], rooms:33
  },
  {
    id:28, name:"Ocean Vagabond", city:"Essaouira", stars:3, price:85, rating:4.5, reviews:1342,
    image:I.ess1,
    badge:"Surfer's Paradise",
    description:"The legendary surf lodge of Essaouira, 200m from the beach — a favourite of kitesurfers, windsurfers and Atlantic wave-riders from across the world. Fresh-caught fish grilled daily, daily surf lessons from local pros, surfboard and kite rentals. The Essaouira trade wind (the Alizee) blows almost every afternoon from April to October.",
    amenities:["Free WiFi","Breakfast","Surf Lessons","Kitesurfing","Kite Rental","Beach Access (200m)"], rooms:9
  },
  // ═══ CASABLANCA ═══
  {
    id:29, name:"Four Seasons Hotel Casablanca", city:"Casablanca", stars:5, price:320, rating:4.9, reviews:2876,
    image:I.cas1,
    badge:"Oceanfront 5-Star",
    description:"Casablanca's finest address — a sleek oceanfront tower on the Anfa corniche with direct Atlantic views from every room. Floor-to-ceiling windows, an infinity pool at the water's edge, the city's best Japanese restaurant, and a rooftop bar where the sunset views over the Atlantic are unmissable. 10 minutes from the Hassan II Mosque.",
    amenities:["Infinity Pool","Free WiFi","Breakfast","Spa","Gym","Ocean View","Japanese Restaurant","Rooftop Bar"], rooms:186
  },
];

const attractions = [
  { id:1,  city:"Tangier", name:"Kasbah & Kasbah Museum",            type:"Heritage", duration:"2–3 hrs",  price:"20 MAD",  image:I.tng1,  description:"Tangier's ancient kasbah at the highest point of the medina. The Dar el-Makhzen — the Sultan's former palace, now the Musée de la Kasbah — houses Roman mosaics from Volubilis, ancient sea charts and 3,000 years of Tangier's extraordinary history. The kasbah alleys, rooftop views and doorways carved in cedar are extraordinary." },
  { id:2,  city:"Tangier", name:"Cap Spartel & the Lighthouse",       type:"Nature",   duration:"Half day", price:"Free",    image:I.cap,   description:"Where the Atlantic Ocean and Mediterranean Sea collide — one of the most dramatic natural spectacles on earth. The striped Cap Spartel lighthouse (1864) marks the exact meeting point of two seas. The surrounding Rmilat forest has beautiful walking trails with constant sea views. Best visited before 10am." },
  { id:3,  city:"Tangier", name:"Grottes d'Hercule",                  type:"Nature",   duration:"1.5 hrs",  price:"15 MAD",  image:I.herc,  description:"Ancient sea caves 14km west of Tangier carved partly by Neolithic millstone-quarriers and partly by millennia of Atlantic waves. Legend says Hercules rested here. The most famous feature is an ocean-facing opening shaped exactly like the inverted outline of the African continent." },
  { id:4,  city:"Tangier", name:"Grand Socco",                        type:"Culture",  duration:"1–2 hrs",  price:"Free",    image:I.tng1,  description:"Tangier's great central square surrounded by the ornate gateway of Bab Fahs, the Grande Mosquée, and the Mendoubia Gardens with an 800-year-old dragon tree. On Thursday and Sunday mornings, Rif Berber women arrive in traditional striped dresses selling honey, olives and fresh herbs." },
  { id:5,  city:"Tangier", name:"Petit Socco",                        type:"Culture",  duration:"1 hr",     price:"Free",    image:I.tng4,  description:"The legendary café square deep in the medina where Burroughs, Kerouac, Ginsberg, Tennessee Williams and Paul Bowles were regulars. Still retains its timeless bohemian atmosphere. Order mint tea at Café Central and watch the world pass exactly as it has for a century." },
  { id:6,  city:"Tangier", name:"American Legation Museum",           type:"Heritage", duration:"1.5 hrs",  price:"Free",    image:I.tng3,  description:"The only US National Historic Landmark outside America. Morocco was the first nation to recognise American independence (1786). Houses paintings by Delacroix, historic maps, documents and a comprehensive exhibit on Tangier's literary and artistic legacy. Open Tue–Sat." },
  { id:7,  city:"Tangier", name:"Tangier Bay & Corniche",             type:"Nature",   duration:"Half day", price:"Free",    image:I.tng5,  description:"A 5km arc of white sand along the Bay of Tangier framed by the Rif Mountains and the Spanish coast across the Strait. The beachfront corniche is lined with fresh fish restaurants serving the morning's catch. Summer buzzes with life; winter is dramatically empty and windswept." },
  { id:8,  city:"Tangier", name:"Tangier Medina & Souk",              type:"Culture",  duration:"2–3 hrs",  price:"Free",    image:I.tng6,  description:"Compact and navigable alone — unlike Marrakech or Fes. Rue es-Siaghines leads through souks selling kaftans, babouches, Rif carpets, argan oil and fresh-ground spices. Don't miss the covered food market on Rue de la Plage or the kasbah wall view over the medina rooftops." },
  { id:9,  city:"Tangier", name:"Strait of Gibraltar Viewpoint",      type:"Nature",   duration:"1 hr",     price:"Free",    image:I.tng7,  description:"From the kasbah walls and the Marshan plateau, you can see Africa and Europe simultaneously — Spain just 14km away. On clear days the white buildings of Tarifa are visible with the naked eye. Over 100,000 ships per year pass through — the world's busiest international waterway." },
  { id:10, city:"Tangier", name:"Charf Hill Panorama",                type:"Nature",   duration:"45 min",   price:"Free",    image:I.tng8,  description:"The highest accessible point in Tangier: a 360° panorama of the medina, the port, the Bay, the full length of the Strait and the mountains of Andalusia. Best 30 minutes before sunset when the sea turns gold and the Spanish coast lights up." },
  { id:11, city:"Tangier", name:"Church of Saint Andrew",             type:"Heritage", duration:"45 min",   price:"Free",    image:I.paul,  description:"Built in 1894 on land gifted by Sultan Hassan I. The Lord's Prayer is inscribed in Arabic calligraphy in the chancel arch — a symbol of Tangier's interfaith history. The churchyard holds the graves of many notable foreign residents. A profound and peaceful place in the medina." },
  { id:12, city:"Tangier", name:"Literary Tangier Walking Tour",      type:"Culture",  duration:"2 hrs",    price:"Free",    image:I.tng2,  description:"A self-guided walk through the sites that shaped Paul Bowles, William Burroughs, Jack Kerouac and Allen Ginsberg. The El Muniria hotel (Room 9 where Naked Lunch was written), Café Hafa on the Marshan cliff, the American Legation and the Petit Socco cafés. Essential for literature lovers." },
  { id:13, city:"Marrakech", name:"Djemaa el-Fna",                   type:"Culture",  duration:"Evening",  price:"Free",    image:I.mrk3,  description:"UNESCO Intangible Cultural Heritage. By night the world's greatest open-air theatre — storytellers, Gnawa musicians, acrobats, snake charmers and the smoke of a hundred grills. By day: orange juice vendors, henna artists and the best people-watching in Africa." },
  { id:14, city:"Fes", name:"Chouara Tanneries",                     type:"Heritage", duration:"2 hrs",    price:"Free",    image:I.fes2,  description:"The world's oldest working tannery in continuous operation since the 11th century. Viewed from the leather merchant terraces above, the stone honeycomb vats dyed in saffron, poppy, mint and indigo create an image unlike anything else on earth. Visit Tuesday–Sunday morning." },
];

const tours = [
  { id:1, city:"Tangier", title:"Literary Tangier Walking Tour", duration:"3 hours", groupSize:"Max 8", rating:4.9, price:350, image:I.tng2, description:"Walk in the footsteps of Burroughs, Bowles and Kerouac. Visit Room 9 of the El Muniria, Café Hafa on the Marshan cliff, the American Legation and the Petit Socco.", highlights:["Café Hafa","American Legation Museum","El Muniria Hotel","Petit Socco cafés"] },
  { id:2, city:"Tangier", title:"Cap Spartel & Hercules Caves", duration:"Half day", groupSize:"Max 12", rating:4.8, price:280, image:I.cap, description:"Where two seas collide. Visit the striped Cap Spartel lighthouse where the Atlantic meets the Mediterranean, then descend into the ancient Hercules Caves carved by Neolithic millstone-cutters.", highlights:["Cap Spartel lighthouse","Two-sea confluence","Hercules Caves","Rmilat forest walk"] },
  { id:3, city:"Marrakech", title:"Medina Souk Deep Dive", duration:"4 hours", groupSize:"Max 10", rating:5.0, price:420, image:I.mrk3, description:"Navigate the 18 souk quarters with a master guide. Tanneries, dyers, brass-beaters, spice merchants and carpet weavers — the full living medieval marketplace experience.", highlights:["Dyers souk","Spice market","Brass workshops","Carpet souk"] },
  { id:4, city:"Marrakech", title:"Djemaa el-Fna by Night", duration:"3 hours", groupSize:"Max 15", rating:4.9, price:300, image:I.mrk5, description:"The world's greatest open-air theatre after dark. Storytellers, Gnawa musicians, acrobats, snake charmers and the smoke and noise of a hundred food grills. Includes dinner at a stall.", highlights:["Gnawa musicians","Storytellers","Snake charmers","Local street dinner"] },
  { id:5, city:"Fes", title:"Full-Day Fes Medina Tour", duration:"8 hours", groupSize:"Max 8", rating:4.9, price:550, image:I.fes1, description:"The most comprehensive Fes medina experience available. Chouara Tannery, Bou Inania Madrasa, Al-Qarawiyyin, the souks, a Fassi lunch and the covered food market. Transformative.", highlights:["Chouara Tannery","Bou Inania Madrasa","Al-Qarawiyyin","Fassi lunch"] },
  { id:6, city:"Fes", title:"Fassi Cooking Class", duration:"5 hours", groupSize:"Max 8", rating:5.0, price:480, image:I.fes2, description:"Learn Fassi pastilla, couscous and bastilla from a Fassi family in their home. The most refined cuisine in Morocco, taught by the hands that have been making it for generations.", highlights:["Pastilla preparation","Couscous technique","Preserved lemon","Local family home"] },
  { id:7, city:"Chefchaouen", title:"Blue City Photography Walk", duration:"3 hours", groupSize:"Max 8", rating:4.9, price:250, image:I.chef1, description:"An early-morning guided walk through Chefchaouen's most photogenic blue alleys before tour groups arrive. The best angles, best light and hidden corners known only to locals.", highlights:["Hidden blue alleys","Spanish Mosque view","Morning golden light","Riff Mountains backdrop"] },
  { id:8, city:"Chefchaouen", title:"Akchour Waterfalls Trek", duration:"Full day", groupSize:"Max 12", rating:4.8, price:400, image:I.chef2, description:"A spectacular full-day hike through the Talassemtane National Park to the Akchour waterfalls — the most beautiful natural site in northern Morocco. Swimming included.", highlights:["Akchour waterfalls","Talassemtane park","Natural swimming pools","Cedar forest"] },
  { id:9, city:"Merzouga", title:"Sahara Sunset Camel Trek", duration:"2 hours + overnight", groupSize:"Max 16", rating:5.0, price:890, image:I.sah1, description:"The classic Sahara experience — a camel trek at sunset into the heart of Erg Chebbi, an overnight in a luxury Berber tent, and a dawn walk on the silent dunes. Life-changing.", highlights:["Sunset camel trek","Luxury desert camp","Sahara stargazing","Dune sunrise"] },
  { id:10, city:"Merzouga", title:"4x4 Desert Explorer", duration:"Full day", groupSize:"Max 6", rating:4.8, price:1200, image:I.sah2, description:"A full-day 4WD expedition across the Sahara — fossil sites of Erfoud, the Gnaoua village of Khemliya, nomad families, salt flats and the hidden southern face of Erg Chebbi.", highlights:["Fossil workshops Erfoud","Khemliya Gnaoua village","Nomad family visit","Erg Chebbi south face"] },
  { id:11, city:"Essaouira", title:"Gnaoua Music & Ramparts", duration:"3 hours", groupSize:"Max 12", rating:4.8, price:320, image:I.ess1, description:"The spirit of Essaouira — the Atlantic ramparts at sunset, a live Gnaoua music session with a master musician, and the story of this UNESCO port city's extraordinary multicultural history.", highlights:["Atlantic ramparts sunset","Live Gnaoua music","Portuguese fortifications","UNESCO heritage story"] },
  { id:12, city:"Essaouira", title:"Argan Oil Farm & Cooperatives", duration:"Half day", groupSize:"Max 10", rating:4.7, price:380, image:I.ess2, description:"Visit the argan forest UNESCO Biosphere Reserve and a women's argan oil cooperative — see the traditional hand-pressing process and taste the finest culinary argan oil directly from the source.", highlights:["Argan forest UNESCO reserve","Women's cooperative visit","Hand-pressing process","Argan oil tasting"] },
  { id:13, city:"Atlas Mountains", title:"Mount Toubkal Ascent (2 days)", duration:"2 days", groupSize:"Max 8", rating:5.0, price:1800, image:I.atl1, description:"The greatest mountain trek in North Africa. Two days from the Berber village of Imlil to the summit of Mount Toubkal (4,167m) — highest peak in Africa north of the Sahara. No technical experience needed.", highlights:["Toubkal summit 4167m","Imlil Berber village","Mountain refuge overnight","360° Atlas panorama"] },
  { id:14, city:"Atlas Mountains", title:"Aït Ben Haddou & Dades Valley", duration:"Full day", groupSize:"Max 12", rating:4.9, price:850, image:I.atl3, description:"The most spectacular road trip in Morocco — the Tizi n'Tichka pass, the UNESCO ksar of Aït Ben Haddou (Gladiator, Game of Thrones), the Dades Valley rose gardens and clay kasbahs.", highlights:["Tizi n'Tichka pass 2260m","Aït Ben Haddou UNESCO","Dades Valley kasbahs","Valley of Roses"] },
  { id:15, city:"Agadir", title:"Taghazout Surf Experience", duration:"Half day", groupSize:"Max 8", rating:4.8, price:450, image:I.ess1, description:"Africa's best surf spot — professional instruction at Taghazout beach (20km north of Agadir) with certified surf coaches. Suitable for complete beginners to advanced surfers.", highlights:["Taghazout beach","Professional surf coaching","Board and wetsuit included","Atlantic waves"] },
  { id:16, city:"Agadir", title:"Souss-Massa Birdwatching", duration:"Full day", groupSize:"Max 6", rating:4.7, price:600, image:I.ess2, description:"The critically endangered Northern Bald Ibis — the rarest bird in Africa — nests only in Souss-Massa National Park. A guided ornithology expedition with a park ranger and specialist guide.", highlights:["Northern Bald Ibis","Souss-Massa park","Flamingos and herons","Atlantic estuary ecosystem"] },
  { id:17, city:"Casablanca", title:"Hassan II Mosque Private Tour", duration:"2 hours", groupSize:"Max 10", rating:5.0, price:380, image:I.cas1, description:"A private guided tour of the world's third largest mosque — the extraordinary architecture, the retractable roof, the glass floor over the Atlantic, and the full story of its construction (17 years, 10,000 craftsmen).", highlights:["Interior guided tour","Glass floor over Atlantic","210m minaret facts","Retractable roof mechanism"] },
  { id:18, city:"Casablanca", title:"Art Deco Architecture Walk", duration:"3 hours", groupSize:"Max 12", rating:4.6, price:280, image:I.cas1, description:"The finest collection of 1930s Art Deco architecture in Africa — the Ville Nouvelle of Casablanca rivals Miami Beach and Naples in its concentration of extraordinary buildings. A unique architectural safari.", highlights:["Maarif Art Deco quarter","Place Mohammed V","Cinema Rex (1929)","Colonial administration buildings"] },
];

const destinations = [
  {
    id:1, slug:"tangier", name:"Tangier", region:"Tanger-Tétouan-Al Hoceïma", tagline:"Where Two Continents Meet",
    description:"Tangier — Tanger in French, Tanja in Arabic — is unlike any other city in Morocco. Perched at the northwestern tip of Africa where the Atlantic Ocean meets the Mediterranean Sea and Europe is just 14km away, Tangier has always been a city between worlds.\n\nFor centuries it was the most cosmopolitan city on the African continent — home to Berbers, Arabs, Andalusians, Sephardic Jews, Spanish, French, British and Americans living side by side. During the International Zone era (1923–1956), it became a playground for spies, writers, artists and adventurers. William Burroughs wrote Naked Lunch here. Henri Matisse was transformed by its light. Paul Bowles arrived in 1947 and never left.\n\nToday Tangier is Morocco's fastest-growing city, transformed by a new port (Tanger-Med, the largest in Africa), a high-speed rail link to Casablanca, and a modern motorway — while its ancient medina, legendary kasbah and bohemian literary legacy remain perfectly intact.",
    image:I.tng1, heroImage:I.cap,
    bestTime:"April–June, September–November",
    language:"Darija (Moroccan Arabic), Spanish, French, Tarifit Berber",
    currency:"Moroccan Dirham (MAD)", temperature:"Mediterranean — 28°C summer, 12°C winter",
    facts:["14km from Spain — the Spanish coast is visible from the kasbah","One of the oldest continuously inhabited cities in the world (3,000+ years)","The American Legation is the only US National Historic Landmark outside America","Morocco was the first nation to recognise American independence (1777)","William Burroughs wrote Naked Lunch in Room 9 of the El Muniria hotel (1957)","Paul Bowles lived in Tangier from 1947 until his death in 1999","Henri Matisse visited in 1912 and produced 24 masterworks here","Tanger-Med is the largest container port in Africa","Al Boraq high-speed train: Tangier to Casablanca in 2h10","Cap Spartel is where the Atlantic Ocean and Mediterranean Sea collide"],
    gettingThere:"Tangier Ibn Battouta Airport (TNG) has direct flights from Paris, Madrid, Brussels, Amsterdam, London. Tanger-Med ferry port (40km east) connects to Tarifa (35 min), Algeciras (90 min) and Barcelona. Al Boraq high-speed train to Casablanca (2h10) and Rabat (1h30).",
    tips:["Walk up to the kasbah at sunset — the Strait view is unforgettable","Cap Spartel at 8am before tour groups — sea collision most visible in morning light","Mint tea at Café Hafa on the Marshan cliff — where Burroughs and Kerouac sat","The medina is compact — easy to navigate alone unlike Marrakech or Fes","Fresh seafood on Avenue d'Espagne near the port — fish caught that morning","American Legation Museum: Tue–Sat, free entry","Grand Socco Thursday & Sunday markets: arrive by 7am","Petit taxi to Cap Spartel: agree 200–250 MAD return before getting in","Hercules Caves 3km past Cap Spartel — combine both in one half-day","Book Fairmont Tazi Palace or Villa Josephine well in advance"],
    highlights:["Strait of Gibraltar views","Literary history","Cap Spartel","Kasbah Museum"],
    rating:4.8, reviewCount:3420, priceLevel:"$$",
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
    rating:4.9, reviewCount:18740, priceLevel:"$$",
  },
  {
    id:3, slug:"fes", name:"Fes", region:"Fès-Meknès", tagline:"The Ancient Soul of Morocco",
    description:"Fes — the oldest of Morocco's Imperial Cities — is the country's spiritual and intellectual heart. Founded in 789 AD, Fes el-Bali (the old city) is the largest living medieval city in the world and a UNESCO World Heritage Site of extraordinary density and beauty.\n\nThe medina's 9,400 alleys make it the largest car-free urban area on earth. Getting lost is not just inevitable — it is the experience. A maze of ancient mosques, Quranic schools, tanneries, craft workshops and fondouks (merchants' inns) where time has barely moved since the 13th century.\n\nThe Chouara Tannery — the world's oldest working tannery (11th century) — is one of the most visually spectacular sights in all of Africa. The Al-Qarawiyyin University, founded in 859 AD, is the oldest continuously operating university on earth.",
    image:I.fes1, heroImage:I.fes2,
    bestTime:"March–May, September–November",
    language:"Darija (Moroccan Arabic), French, Classical Arabic",
    currency:"Moroccan Dirham (MAD)", temperature:"Continental — 35°C summer, 5°C winter",
    facts:["Founded in 789 AD by Idris I — Morocco's oldest imperial city","Fes el-Bali is the largest living medieval city in the world (UNESCO)","Al-Qarawiyyin University (859 AD) is the world's oldest continuously operating university","The Chouara Tannery has been in operation since the 11th century","The medina has over 9,400 alleys and is entirely car-free","The Bou Inania Madrasa (1350) is the finest example of Marinid architecture in Morocco","Fassi cuisine is considered the most refined in Morocco","The Fes Festival of World Sacred Music draws 600,000 visitors each May–June","Over 100 fondouks (ancient caravanserais) survive in the medina","The city was the world's largest city in the 13th century"],
    gettingThere:"Fes-Saïss Airport (FEZ) has direct flights from Paris, Brussels, Amsterdam, Madrid. ONCF train from Casablanca (4h30), Tangier (4h) and Rabat (3h). CTM buses from all major cities. Taxi from airport: 100–150 MAD.",
    tips:["Hire a local guide for the medina — the 9,400 alleys are genuinely impossible to navigate alone the first time","Visit Chouara Tannery in the morning for the best colours and light","The Bou Inania Madrasa (1350) is free and the most beautiful building in Fes","Fassi couscous on Friday — find a neighbourhood restaurant that serves the real family version","Buy saffron, ras el hanout and preserved lemons from the spice souk near Bab Rcif","Al-Qarawiyyin Library is not open to visitors — appreciate it from the courtyard","Book dinner at Riad Fes or Dar Roumana for genuine Fassi fine dining","The Blue Gate (Bab Bou Jeloud) at sunset is Fes's most photographed sight","Lunch at a rooftop restaurant above the medina for the full cityscape panorama","Day trip to Meknès (45 min) and Volubilis Roman ruins"],
    highlights:["Chouara Tanneries","Bou Inania Madrasa","Medieval medina","Fassi cuisine"],
    rating:4.8, reviewCount:9210, priceLevel:"$",
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
    rating:4.9, reviewCount:7830, priceLevel:"$",
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
    rating:4.9, reviewCount:11250, priceLevel:"$$$",
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
    rating:4.8, reviewCount:6890, priceLevel:"$$",
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
    rating:4.9, reviewCount:5620, priceLevel:"$$",
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
    rating:4.6, reviewCount:8940, priceLevel:"$$",
  },
  {
    id:9, slug:"casablanca", name:"Casablanca", region:"Casablanca-Settat", tagline:"Morocco's Modern Heart",
    description:"Casablanca — Casa to its residents, Dar el-Beida (White House) in Arabic — is Morocco's economic capital and largest city. A dynamic, modern metropolis of 4 million people built on French Art Deco architecture and Moorish grandeur, it is Morocco's pulse of business, culture, fashion and gastronomy.\n\nThe Hassan II Mosque — rising from a promontory directly over the Atlantic Ocean — is the third largest mosque in the world and Morocco's greatest architectural achievement. Its 210-metre minaret is the tallest religious structure on earth.\n\nBeyond the mosque, the city offers Morocco's best restaurants, a vibrant arts scene, a revitalized Art Deco old medina, the Corniche Ain Diab oceanfront, and the kind of sophisticated nightlife found nowhere else in the country.",
    image:I.cas1, heroImage:I.cas1,
    bestTime:"April–October",
    language:"Darija (Moroccan Arabic), French, English (business)",
    currency:"Moroccan Dirham (MAD)", temperature:"Atlantic — 26°C summer, 14°C winter (mild, never extreme)",
    facts:["Hassan II Mosque is the 3rd largest mosque in the world (25,000 worshippers inside)","Its 210m minaret is the tallest religious structure on earth — visible 50km out at sea","The mosque is built directly over the Atlantic Ocean — the sea is visible through glass floors","Casablanca generates 50% of Morocco's national industrial production","Mohammed V International Airport (CMN) is the busiest in Morocco (10 million pax/year)","The Rick's Café (inspired by the 1942 film Casablanca) is a genuine fine dining destination","Casablanca was Morocco's first city to have a tramway (2012)","The Casa-Port to Tangier TGV takes just 2h10","Port of Casablanca handles 35 million tonnes of freight per year","The 1930s Art Deco architecture of the Ville Nouvelle is one of the finest collections in the world"],
    gettingThere:"Mohammed V International Airport (CMN) is Morocco's main hub with direct flights from 100+ destinations globally. Al Boraq high-speed train: Casablanca to Tangier (2h10), to Rabat (1h). ONCF train to Marrakech (3h), Fes (4h30). Tramway connects the city centre.",
    tips:["Hassan II Mosque: guided tours daily 9am–6pm (non-Muslims welcome) — book at the mosque door","Rick's Café: dinner reservation essential — call ahead on the day","La Sqala: the most beautiful garden restaurant in Casablanca, inside Portuguese ramparts","Corniche Ain Diab: the 5km ocean boulevard is best at sunset","Art Deco walking tour of the Ville Nouvelle: the greatest collection in Africa","The old medina is small and safe — the Sqala (rampart tower) is the highlight","Mohammed V Square at night: the art deco architecture illuminated is extraordinary","Day trip to Azemmour (80km south) — a blue-and-white medina on the Oum er-Rbia river","Casa Voyageurs station: one of the most beautiful in Africa","Morocco's best sushi and Japanese food is in Casablanca — try Bleu Marine at Four Seasons"],
    highlights:["Hassan II Mosque","Art Deco architecture","Rick's Café","Atlantic Corniche"],
    rating:4.5, reviewCount:12300, priceLevel:"$$$",
  },
];

const testimonials = [
  { id:1, name:"Sophie Laurent",   country:"France",      avatar:"https://i.pravatar.cc/80?img=5",  rating:5, text:"Absolutely magical. Booking through MoroccoTravel was effortless and the riad in Marrakech exceeded every expectation. The rooftop breakfast with views over the medina was unforgettable.", hotel:"La Maison Arabe, Marrakech" },
  { id:2, name:"James Whitfield",  country:"UK",          avatar:"https://i.pravatar.cc/80?img=12", rating:5, text:"The Sahara overnight camel trek was the most incredible experience of my life. Waking up to a desert sunrise with not another soul in sight — pure magic. Will be back next year.", hotel:"Desert Luxury Camp Morocco, Merzouga" },
  { id:3, name:"Amara Diallo",     country:"Senegal",     avatar:"https://i.pravatar.cc/80?img=21", rating:5, text:"Chefchaouen is a dream. Every alley is painted in a different shade of blue. The riad had the most stunning mountain views. I came for 3 days and stayed for 10.", hotel:"Lina Ryad & Spa, Chefchaouen" },
  { id:4, name:"Carlos Mendes",    country:"Portugal",    avatar:"https://i.pravatar.cc/80?img=33", rating:5, text:"We spent a week in Fes and didn't want to leave. Riad Laaroussa was extraordinary — waking up to the call to prayer echoing over the medina rooftops every single morning.", hotel:"Riad Laaroussa, Fes" },
  { id:5, name:"Lucas Fernandez",  country:"Spain",       avatar:"https://i.pravatar.cc/80?img=15", rating:5, text:"Standing at Cap Spartel watching the Atlantic crash into the Mediterranean while Spain shimmered 14km away — I had to pinch myself. Tangier is unlike anywhere I've ever been.", hotel:"Fairmont Tazi Palace, Tangier" },
  { id:6, name:"Isabelle Moreau",  country:"Belgium",     avatar:"https://i.pravatar.cc/80?img=25", rating:5, text:"El Minzah is pure old-world glamour. Sipping cocktails on the terrace with the Strait of Gibraltar at sunset and Spain visible on the horizon — I finally understood why writers never left.", hotel:"El Minzah Hotel, Tangier" },
  { id:7, name:"Yuki Tanaka",      country:"Japan",       avatar:"https://i.pravatar.cc/80?img=47", rating:5, text:"Kasbah Tamadot in the Atlas Mountains was beyond anything I'd imagined. Hiking at dawn, then returning to a heated pool with mountain views. Richard Branson has impeccable taste.", hotel:"Kasbah Tamadot, Atlas Mountains" },
  { id:8, name:"Emma van Dijk",    country:"Netherlands", avatar:"https://i.pravatar.cc/80?img=9",  rating:5, text:"Essaouira stole my heart. The wind, the whitewashed ramparts, the Atlantic crashing against the old Portuguese fortifications. La Sultana felt like a private palace.", hotel:"La Sultana, Essaouira" },
];

const stats = [
  { label:"Happy Travellers", value:24800, suffix:"+" },
  { label:"Real Hotels",      value:29,    suffix:""  },
  { label:"Cities Covered",   value:8,     suffix:""  },
  { label:"Years Experience", value:12,    suffix:""  },
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
    title:"10 Things I Wish I Knew Before Visiting Morocco",
    excerpt:"From navigating the medinas to tipping etiquette — the essential tips that will transform your Moroccan adventure.",
    image:I.mrk3, readTime:"6 min read", date:"September 2026",
    author:"Amina El Fassi", authorAvatar:"https://i.pravatar.cc/80?img=47",
    content:`<p>Morocco is a country that rewards the curious traveller — but a little preparation goes a long way. Here are 10 things I learned after three years of exploring every corner of the kingdom.</p>
<h2>1. Learn a Few Words of Darija</h2>
<p>Even a simple "Salam" (hello) or "Shukran" (thank you) in Moroccan Arabic opens doors that stay closed to tourists who don't try. Moroccans are deeply appreciative of any effort to speak their language.</p>
<h2>2. Bargaining is Expected — and Fun</h2>
<p>In the souks, the first price is almost never the final price. Start at about 40% of the asking price and work your way up. It's a social ritual, not a confrontation. Smile, drink tea if it's offered, and enjoy the performance.</p>
<h2>3. Dress Modestly Outside Tourist Areas</h2>
<p>Morocco is relatively liberal by regional standards, but covering shoulders and knees is respectful in medinas, rural areas, and when visiting mosques. In modern city centres like Casablanca's Maarif or Tangier's city centre, fashion is much more Western.</p>
<h2>4. The Best Food is in People's Homes</h2>
<p>Moroccan home cooking is almost always better than restaurant food. If you're invited to eat with a family, accept. You'll experience tagines, couscous, and pastilla that no restaurant can replicate.</p>
<h2>5. Friday is the Sabbath</h2>
<p>Many shops and all mosques are busiest on Friday. Couscous Friday is a nationwide tradition — families gather for the weekly couscous meal after Friday prayers. Many restaurants serve only couscous on Fridays.</p>
<h2>6. Cash is King</h2>
<p>Outside luxury hotels and major tourist restaurants, Morocco runs on cash. ATMs are plentiful in cities, but carry enough dirhams for rural areas and medina shopping.</p>
<h2>7. The Train System is Excellent</h2>
<p>Morocco has Africa's first high-speed train (Al Boraq) connecting Tangier to Casablanca in 2 hours 10 minutes. The regular ONCF network is reliable, comfortable and affordable.</p>
<h2>8. Mint Tea is a Ritual</h2>
<p>Tea is never just a drink in Morocco. It's a ceremony of hospitality. Refusing tea can be considered impolite. The sugar is always generous — asking for less is fine, but "no sugar" might earn you a puzzled look.</p>
<h2>9. Medinas Have Their Own Logic</h2>
<p>Getting lost in a medina is inevitable — and it's the best way to discover hidden riads, craftsmen and local life. If you're truly stuck, ask a shopkeeper (not a "helpful" stranger) for directions.</p>
<h2>10. Morocco is Safer Than You Think</h2>
<p>Morocco has one of the lowest violent crime rates in Africa. Petty theft exists in crowded tourist areas, but violent crime against tourists is extremely rare. Use normal precautions and you'll be fine.</p>`
  },
  {
    id:2, featured:false, category:"City Guides",
    title:"The Ultimate Tangier City Guide: 3 Days in the Gateway to Africa",
    excerpt:"Where two continents meet — a local's guide to the most cosmopolitan city in Morocco.",
    image:I.tng1, readTime:"8 min read", date:"August 2026",
    author:"Youssef Tazi", authorAvatar:"https://i.pravatar.cc/80?img=52",
    content:`<p>Tangier sits at the northwestern tip of Africa, 14km from Spain, where the Atlantic meets the Mediterranean. It's Morocco's most layered, most surprising city.</p>
<h2>Day 1: The Old Medina & Kasbah</h2>
<p>Start at the Grand Socco (Place du 9 Avril 1947) — the grand square that connects the new and old cities. Walk through Bab Fahs gate into the medina. Follow the narrow streets uphill to the Kasbah, where the Kasbah Museum (former Sultan's palace) houses 3,000 years of Tangier history.</p>
<p>From the kasbah walls, you can see Spain — the coast of Tarifa is clearly visible on most days. This is the only place on earth where you can stand in Africa and see Europe.</p>
<h2>Day 2: Cap Spartel & Hercules</h2>
<p>Take a taxi to Cap Spartel — the dramatic headland where the Atlantic Ocean meets the Mediterranean Sea. The lighthouse marks the exact point. Continue to the Caves of Hercules, ancient sea-carved grottoes where legend says the Greek hero rested.</p>
<h2>Day 3: Modern Tangier</h2>
<p>Explore the new city: Boulevard Pasteur, Place de France, and the stunning Tangier City beach stretching 5km along the bay. End with sunset at Café Hafa — the legendary cliff-side café where the Rolling Stones, Paul Bowles, and the Beatles once sat.</p>`
  },
  {
    id:3, featured:false, category:"Food & Drink",
    title:"A Foodie's Guide to Moroccan Cuisine: Beyond the Tagine",
    excerpt:"From street-side bissara to royal pastilla — discover the incredible depth of Moroccan cooking.",
    image:I.food_tagine, readTime:"7 min read", date:"August 2026",
    author:"Fatima Zahra", authorAvatar:"https://i.pravatar.cc/80?img=29",
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
    author:"Omar Benali", authorAvatar:"https://i.pravatar.cc/80?img=60",
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
    author:"Laila Berrada", authorAvatar:"https://i.pravatar.cc/80?img=44",
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
    author:"Karim Idrissi", authorAvatar:"https://i.pravatar.cc/80?img=31",
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
    author:"Nadia Chaoui", authorAvatar:"https://i.pravatar.cc/80?img=38",
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
    author:"Hassan Amazigh", authorAvatar:"https://i.pravatar.cc/80?img=56",
    content:`<p>The Atlas Mountains stretch 2,500km across Morocco, Tunisia and Algeria. In Morocco, the High Atlas rises to 4,167m at Jebel Toubkal — the highest peak in North Africa.</p>
<h2>Jebel Toubkal Trek</h2>
<p>The most popular trek in Morocco: a 2-day ascent from the village of Imlil (1,740m) to the summit at 4,167m. No technical climbing required, but good fitness is essential. The views from the top are extraordinary — on a clear day you can see the Sahara to the south and the Atlantic to the west.</p>
<h2>Berber Villages of the Ourika Valley</h2>
<p>An easy day trip from Marrakech — the Ourika Valley follows a rushing river past terraced farms, walnut groves and traditional Berber villages clinging to the mountainsides. The Setti Fatma waterfalls at the end of the valley are spectacular.</p>
<h2>When to Trek</h2>
<p>Spring (April–May) and autumn (September–October) offer the best conditions. Summer is too hot at lower altitudes. Winter brings snow above 2,000m — Toubkal summit is snow-covered from November to April.</p>`
  },
];

// ═══ AGADIR Hotels ═══
const agadirHotels = [
  { id:30, name:"Sofitel Agadir Thalassa Sea & Spa", city:"Agadir", stars:5, price:280, rating:4.8, reviews:2340, image:I.ess1, badge:"Luxury Thalasso Spa", description:"Agadir's finest luxury resort — a spectacular 5-star seafront property with a legendary thalassotherapy spa drawing mineral-rich Atlantic seawater for treatments. 173 rooms with ocean or garden views, 4 restaurants, and direct access to Agadir's famous 10km sandy beach. A true benchmark of Moroccan seaside luxury.", amenities:["Beach Access","Thalasso Spa","4 Pools","Free WiFi","Breakfast","4 Restaurants","Gym","Tennis"], rooms:173 },
  { id:31, name:"Hyatt Place Agadir", city:"Agadir", stars:4, price:110, rating:4.5, reviews:1876, image:I.ess2, badge:"City Center Modern", description:"A sleek, modern 4-star in the heart of Agadir with a rooftop pool and panoramic Atlantic views. Contemporary Moroccan design, spacious rooms, and excellent value. 5 minutes from the beach and walking distance to the Souk El Had (one of the largest markets in Morocco).", amenities:["Rooftop Pool","Free WiFi","Breakfast","Gym","Bar","Sea Views","Airport Shuttle"], rooms:200 },
  { id:32, name:"Royal Atlas & Spa", city:"Agadir", stars:5, price:160, rating:4.6, reviews:1543, image:I.sah2, badge:"All-Inclusive Available", description:"A grand 5-star resort with lush tropical gardens stretching to the beach. Four swimming pools, a full-service spa, five restaurants and the best location on Agadir beach. Particularly popular for families with its extensive entertainment program and kids club. Live Moroccan music every evening.", amenities:["4 Pools","Free WiFi","Breakfast","Spa","5 Restaurants","Kids Club","Beach","Live Music"], rooms:320 },
  { id:33, name:"Riad Villa Blanche", city:"Agadir", stars:4, price:85, rating:4.7, reviews:987, image:I.mrk1, badge:"Boutique Riad", description:"A beautifully designed boutique riad in the Talborjt district — a calm escape from the beach resorts with a focus on authentic Moroccan hospitality. Handcrafted tilework, a courtyard pool and exceptional home-cooked Moroccan breakfasts. Ideally located for the souk, old Kasbah hill and downtown.", amenities:["Pool","Free WiFi","Breakfast","Traditional Decor","Courtyard","Airport Transfer"], rooms:15 },
];

// ═══ RABAT Hotels ═══
const rabatHotels = [
  { id:34, name:"Sofitel Rabat Jardin des Roses", city:"Rabat", stars:5, price:240, rating:4.8, reviews:2109, image:I.fes1, badge:"Palace & Gardens", description:"One of Morocco's most elegant hotels — a palatial 5-star property surrounded by rose gardens in the heart of the capital. Close to the Royal Palace, the Hassan Tower and the Kasbah des Oudayas. The hotel's rose-filled gardens, multiple pools and acclaimed French-Moroccan restaurant make it the premier address in Rabat.", amenities:["2 Pools","Rose Gardens","Free WiFi","Breakfast","Spa","2 Restaurants","Hammam","Fitness"], rooms:378 },
  { id:35, name:"La Tour Hassan Palace", city:"Rabat", stars:5, price:190, rating:4.7, reviews:1654, image:I.fes2, badge:"Historic Icon Since 1914", description:"A legendary palace hotel in continuous operation since 1914, in the shadow of the 12th-century Hassan Tower — Rabat's most iconic monument. Art deco interiors, Moorish arches, antique furnishings and a rooftop pool with views of the tower. Winston Churchill and Charles de Gaulle both stayed here.", amenities:["Pool","Free WiFi","Breakfast","Spa","Fine Dining","Historic Architecture","Hammam"], rooms:140 },
  { id:36, name:"Riad Dar Soufa", city:"Rabat", stars:4, price:95, rating:4.9, reviews:876, image:I.fes3, badge:"UNESCO Kasbah Location", description:"A beautifully restored riad inside Rabat's UNESCO-listed Kasbah des Oudayas — one of the most stunning historic quarters in North Africa. Whitewashed walls, Andalusian gardens, ocean views from the rooftop and the most peaceful setting imaginable in a capital city. Extraordinary Moroccan breakfasts.", amenities:["Free WiFi","Breakfast","Rooftop","Ocean Views","Kasbah Location","Andalusian Garden"], rooms:8 },
  { id:37, name:"Hyatt Regency Rabat", city:"Rabat", stars:5, price:175, rating:4.5, reviews:1234, image:I.cas1, badge:"Business & Leisure", description:"Rabat's leading international 5-star hotel in the marina district, with all the amenities expected of a global Hyatt property. Spacious rooms, a full-service spa, multiple dining options, and an outdoor pool. Walking distance to the Oudayas, the National Museum and the Corniche.", amenities:["Pool","Free WiFi","Breakfast","Spa","Gym","2 Restaurants","Business Center","Marina Views"], rooms:255 },
];

// ═══ Moroccan Food ═══
const food = [
  { id:1, name:"Tagine", arabic:"الطاجين", french:"Tajine", category:"Main Course", icon:"🍲", image:I.food_tagine, description:"Morocco's most iconic dish — a slow-cooked stew named after the conical clay pot it's cooked in. Meat (lamb, chicken or beef), preserved lemons, olives, vegetables and spices are layered and cooked over charcoal for hours until meltingly tender. Every family has their own recipe, passed down for generations.", where:"Every restaurant, home and souk in Morocco.", price:"60–150 MAD at restaurants", region:"Nationwide", tip:"The best tagines are cooked over charcoal, not gas — look for street stalls with real clay pots and smoke." },
  { id:2, name:"Couscous", arabic:"الكسكس", french:"Couscous", category:"Main Course", icon:"🫕", image:I.food_couscous, description:"The national dish of Morocco, traditionally eaten every Friday by the entire family after midday prayers. Steamed semolina grains served with slow-cooked vegetables, chickpeas, and meat (lamb, chicken or beef) with a rich broth poured over. The technique of steaming couscous seven times by hand is a dying art.", where:"Best on Fridays at traditional Moroccan restaurants or in family homes.", price:"50–120 MAD", region:"Nationwide", tip:"Avoid couscous on weekdays at tourist restaurants — find a local spot on a Friday for the real thing." },
  { id:3, name:"Pastilla (B'stilla)", arabic:"البسطيلة", french:"Pastilla", category:"Starter / Main", icon:"🥐", image:I.food_pastilla, description:"One of the world's most extraordinary dishes — paper-thin warka pastry layered with slow-cooked pigeon or chicken, eggs scrambled with saffron and herbs, and a layer of toasted almonds sweetened with cinnamon and sugar. Sweet and savoury simultaneously. Originally from Fes, served at weddings and celebrations.", where:"Fes, Marrakech — at traditional Fassi restaurants.", price:"80–200 MAD", region:"Fes, Marrakech", tip:"Pastilla au poisson (fish pastilla) is Essaouira's coastal variation — equally extraordinary." },
  { id:4, name:"Harira", arabic:"الحريرة", french:"Harira", category:"Soup", icon:"🍜", image:I.food_harira, description:"Morocco's beloved thick soup of tomatoes, lentils, chickpeas, vermicelli, fresh coriander, parsley and a squeeze of lemon. The traditional meal to break the Ramadan fast each evening at Iftar. Available year-round across Morocco, usually served with chebakia (honey-sesame pastries) and dates.", where:"Everywhere — street stalls, cafés, restaurants. Most authentic at home during Ramadan.", price:"10–25 MAD at street stalls", region:"Nationwide", tip:"At 6pm on the streets of any Moroccan city, you'll find vendors selling Harira by the bowl — this is the real version." },
  { id:5, name:"Moroccan Mint Tea", arabic:"أتاي", french:"Thé à la menthe", category:"Drink", icon:"🍵", image:I.food_tea, description:"The 'Moroccan whisky' — gunpowder green tea steeped with fresh spearmint and sugar, poured from a height to create the signature frothy head. An act of hospitality, of friendship and of daily life. To refuse mint tea in Morocco is to refuse the host. The tea ceremony can last an hour.", where:"Everywhere — offered free in every shop, home and riad in Morocco.", price:"Free (hospitality) or 15–20 MAD at cafés", region:"Nationwide", tip:"The higher the pour, the better the host. Three glasses is traditional — one for life, one for love, one for death." },
  { id:6, name:"Mechoui", arabic:"المشوي", french:"Méchoui", category:"Main Course", icon:"🐑", image:I.food_mechoui, description:"A whole lamb slow-roasted in an underground clay oven (the mechoui pit) for 4–8 hours until the meat is so tender it falls from the bone at a touch. Rubbed with ras el hanout, cumin and butter. Served at celebrations, moussems and mechoui restaurants across Morocco. An experience unlike any other.", where:"Mechoui squares in Marrakech (Place des Ferblantiers), desert camps, celebrations.", price:"80–150 MAD per portion", region:"Marrakech, Ouarzazate, Sahara", tip:"In Marrakech, the mechoui sellers near the Djemaa el-Fna set up from noon — arrive by 12:30pm before it runs out." },
  { id:7, name:"Msemen", arabic:"المسمن", french:"Msemen", category:"Breakfast / Street Food", icon:"🫓", image:I.food_msemen, description:"Flaky, layered Moroccan flatbread made by folding butter and semolina into dough and pan-frying until golden. Eaten for breakfast with argan oil and honey, or stuffed with kefta (spiced minced meat) as street food. A staple of every Moroccan breakfast table and every street corner.", where:"Bakeries, street stalls, home kitchens — everywhere in Morocco.", price:"3–5 MAD on the street", region:"Nationwide", tip:"For the best msemen in Morocco, follow the smoke to the nearest bakery at 7am when the day's batch is fresh off the pan." },
  { id:8, name:"Rfissa", arabic:"الرفيسة", french:"Rfissa", category:"Main Course", icon:"🍗", image:I.food_rfissa, description:"A celebratory dish traditionally prepared for new mothers and for Mawlid (the Prophet's birthday) — shredded msemen bread layered under a rich stew of chicken, lentils, fenugreek seeds and ras el hanout spices. One of the most comforting and complex flavour profiles in all of Moroccan cooking.", where:"Traditional homes and speciality Moroccan restaurants in Fes and Marrakech.", price:"80–130 MAD at restaurants", region:"Fes, Marrakech", tip:"Rfissa is almost never made by restaurants — ask your riad host to arrange a home-cooked version. An unforgettable experience." },
];

// ═══ Culture & Festivals ═══
const culture = {
  festivals: [
    { id:1, name:"Gnaoua World Music Festival", city:"Essaouira", month:"June", dates:"June 19–22, 2026", description:"One of Africa's greatest music festivals. Four days of free outdoor concerts on the Essaouira ramparts and main square, featuring the ancient Gnaoua trance music tradition alongside global artists. Over 500,000 attendees from 60 countries. A UNESCO-recognized cultural event.", image:I.ess1, free:true },
    { id:2, name:"Fes Festival of World Sacred Music", city:"Fes", month:"May–June", dates:"May 31 – June 8, 2026", description:"A profound and beautiful 9-day festival held within the ancient medina of Fes — one of the world's greatest celebrations of spiritual music. Sufi musicians, gospel choirs, Buddhist monks, Jewish cantors and classical artists from 40 countries perform in the courtyards of Fes's most magnificent palaces.", image:I.fes1, free:false },
    { id:3, name:"Marrakech International Film Festival", city:"Marrakech", month:"November", dates:"November 2026", description:"One of the most glamorous film festivals on the African continent, held annually in Djemaa el-Fna and the Palais des Congrès. International stars, directors and filmmakers converge on Marrakech for 10 days of screenings, tributes and galas. The Etoile d'Or is the top prize.", image:I.mrk2, free:false },
    { id:4, name:"Rose Festival", city:"Kelaat M'Gouna", month:"May", dates:"May 2026", description:"Every May in the Valley of Roses near Kelaat M'Gouna, the annual harvest of the Damask rose (used in rose water and argan rose oil) is celebrated with parades, traditional music, Berber folk dancing, and the crowning of the Rose Queen. A deeply authentic rural Moroccan celebration.", image:I.atl1, free:true },
    { id:5, name:"Tan-Tan Moussem", city:"Tan-Tan", month:"October", dates:"October 2026", description:"The largest nomadic tribal festival in North Africa — a gathering of over 30 Saharan and sub-Saharan tribes stretching from the Atlas to the Sahara. Camel races, traditional music, poetry recitals and an extraordinary display of Saharan culture. UNESCO Intangible Cultural Heritage.", image:I.sah1, free:true },
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
    { name:"Leather Tanning", description:"Fes has the world's oldest working tanneries. The leather is softened in pigeon dung, then dyed in natural colours — poppy red, saffron yellow, cobalt blue.", city:"Fes", icon:"👜" },
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
    { code:"AGA", name:"Agadir Al Massira Airport", city:"Agadir", description:"Major holiday airport serving southern Morocco. Charter and low-cost flights from UK, Germany, France and Scandinavia. 25km from Agadir beach — taxi 150–200 MAD.", airlines:["Royal Air Maroc","Ryanair","TUI","Thomas Cook Airlines"], phone:"+212 5 28 83 90 22" },
  ],
  trains: [
    { name:"Al Boraq High-Speed Train", type:"TGV", description:"Morocco's TGV-style high-speed rail service — the first in Africa. Connects Tangier to Casablanca in 2h10 (previously 4h45). Operates 6 return trips daily.", routes:["Tangier → Casablanca: 2h10","Tangier → Rabat: 1h30","Tangier → Kenitra: 55 min"], price:"First class: 240 MAD | Second class: 170 MAD", booking:"oncf.ma" },
    { name:"ONCF National Rail Network", type:"Train", description:"Morocco's national railway connects all major cities except Marrakech to the Sahara. Modern, comfortable, affordable and punctual.", routes:["Casablanca → Marrakech: 3h","Casablanca → Fes: 4h30","Casablanca → Rabat: 1h","Marrakech → Tangier: 4h45"], price:"From 55 MAD second class", booking:"oncf.ma" },
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
const emergency = {
  numbers: [
    { service:"Police", number:"19", description:"National Police — for theft, crime, emergencies in cities", icon:"👮", available:"24/7" },
    { service:"SAMU Ambulance", number:"15", description:"Medical emergencies and ambulance dispatch", icon:"🚑", available:"24/7" },
    { service:"Fire Department", number:"15", description:"Fire, rescue and civil emergencies", icon:"🚒", available:"24/7" },
    { service:"Royal Gendarmerie", number:"177", description:"Rural areas, highways, outside city limits", icon:"🪖", available:"24/7" },
    { service:"Tourist Police", number:"0537 77 09 27", description:"Dedicated tourist assistance and protection — report scams, theft, harassment", icon:"🛡️", available:"24/7" },
    { service:"SOS Médecins", number:"0537 20 20 20", description:"Private house-call doctor service in major cities (fee applies)", icon:"🏥", available:"24/7" },
  ],
  hospitals: [
    { name:"CHU Ibn Rochd", city:"Casablanca", address:"1 Rue des Hôpitaux, Casablanca", phone:"+212 5 22 22 47 20", type:"Public University Hospital" },
    { name:"Hôpital Universitaire Mohammed VI", city:"Marrakech", address:"Quartier Amerchich, Marrakech", phone:"+212 5 24 30 10 20", type:"Public University Hospital" },
    { name:"CHU Hassan II", city:"Fes", address:"Route de Sidi Harazem, Fes", phone:"+212 5 35 61 23 23", type:"Public University Hospital" },
    { name:"Clinique Internationale de Tanger", city:"Tangier", address:"Av. Hassan II, Tangier", phone:"+212 5 39 94 00 50", type:"Private Clinic" },
    { name:"Polyclinique Agadir", city:"Agadir", address:"Avenue des FAR, Agadir", phone:"+212 5 28 84 10 60", type:"Private Clinic" },
  ],
  embassies: [
    { country:"USA", address:"Km 5.7, Avenue Mohammed VI, Souissi, Rabat", phone:"+212 5 37 63 73 00", emergency:"+212 5 37 63 73 00", website:"ma.usembassy.gov" },
    { country:"UK", address:"28 Avenue S.A.R Sidi Mohammed, Souissi, Rabat", phone:"+212 5 37 63 33 33", emergency:"+212 5 37 63 33 33", website:"gov.uk/world/morocco" },
    { country:"France", address:"3 Rue Sahnoun, Agdal, Rabat", phone:"+212 5 37 68 97 00", emergency:"+212 5 37 68 97 00", website:"ma.ambafrance.org" },
    { country:"Spain", address:"Rue Aïn Khalouiya, Km 5.3, Souissi, Rabat", phone:"+212 5 37 63 39 00", emergency:"+212 5 37 63 39 00", website:"exteriores.gob.es" },
    { country:"Germany", address:"7 Zankat Madnine, Rabat", phone:"+212 5 37 21 40 09", emergency:"+212 5 37 21 40 09", website:"rabat.diplo.de" },
    { country:"Canada", address:"66 Mehdi Ben Barka Ave, Souissi, Rabat", phone:"+212 5 37 54 49 49", emergency:"+212 5 37 54 49 49", website:"canadainternational.gc.ca/morocco" },
  ],
  tips: [
    "Travel insurance is essential — make sure it covers medical evacuation",
    "Keep a copy of your passport in your hotel safe and email yourself a scan",
    "The emergency app SAMU112 works across Morocco for medical emergencies",
    "Tap water is generally safe in cities but bottled water is recommended",
    "Pharmacies (pharmacie) are common and staff often speak French and some English",
    "If you lose your passport, contact your embassy immediately — they can issue emergency travel documents",
    "Tourist police wear a different uniform (blue) and specifically protect visitors",
    "Morocco has a genuine culture of hospitality — most people will help you willingly if you're in difficulty",
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
  { id:1,  city:"Tangier", name:"Le Saveur du Poisson",     cuisine:"Seafood / Moroccan", price:"$$",   rating:4.9, address:"2 Escalier Waller, Medina, Tangier", description:"Tangier's most legendary restaurant — no menu, no choices. The owner selects the catch of the day and serves a multi-course feast of the freshest fish in Morocco. Sought out by food writers, chefs and travellers from around the world. Reservations essential.", mustTry:"Daily catch — whatever the sea offers", openHours:"Lunch only, Tue–Sun", image:I.tng6 },
  { id:2,  city:"Tangier", name:"El Morocco Club",           cuisine:"Moroccan / International", price:"$$$", rating:4.6, address:"Rue du Prince Moulay Abdallah, Tangier", description:"A grand colonial-era supper club — art deco décor, 1940s ambiance and refined Moroccan cuisine. The kind of restaurant where diplomats, artists and wealthy Tangerines have dined for 80 years. Live piano music, pristine white tablecloths, and the best chicken bastilla in the city.", mustTry:"Chicken Bastilla, Lamb Tagine", openHours:"Daily 12pm–11pm", image:I.tng8 },
  { id:3,  city:"Tangier", name:"Bab Al Maqdis",             cuisine:"Traditional Moroccan", price:"$$",   rating:4.5, address:"Place du 9 Avril, Grand Socco, Tangier", description:"Set on the Grand Socco with terrace views over the square, this warm and welcoming restaurant serves generous, authentic Moroccan plates at very reasonable prices. The slow-cooked lamb shoulder and fresh-baked msemen are outstanding.", mustTry:"Slow-cooked lamb, Msemen", openHours:"Daily 11am–10pm", image:I.tng4 },
  // Marrakech
  { id:4,  city:"Marrakech", name:"Dar Yacout",              cuisine:"Classic Moroccan Fine Dining", price:"$$$$", rating:4.8, address:"79 Sidi Ahmed Soussi, Marrakech Medina", description:"The most iconic dining experience in Marrakech — a 17th-century palace with courtyards, rose petals, candlelight and a feast of Moroccan dishes served in courses. Rooftop terrace with views over the medina. Appeared in almost every travel guide to Morocco ever written.", mustTry:"5-course traditional Moroccan feast", openHours:"Dinner only, daily from 8pm", image:I.mrk2 },
  { id:5,  city:"Marrakech", name:"Nomad",                   cuisine:"Modern Moroccan", price:"$$",   rating:4.7, address:"1 Derb Aarjan, Marrakech Medina", description:"A rooftop restaurant that reinvented Moroccan cuisine for the 21st century — clean, contemporary presentations of classic ingredients with spectacular views over the spice souk. The creative kitchen uses local and seasonal produce. Consistently voted one of the best in the medina.", mustTry:"Lamb & prune tagine, crunchy bastilla", openHours:"Daily 12pm–11pm", image:I.mrk3 },
  { id:6,  city:"Marrakech", name:"Al Fassia Aguedal",       cuisine:"Traditional Fassi", price:"$$$", rating:4.8, address:"55 Boulevard Zerktouni, Guéliz, Marrakech", description:"One of the most respected restaurants in Morocco — entirely staffed and managed by women, serving the finest traditional Fassi (from Fes) cuisine. A rare restaurant where the tagine has been cooked by the same hands for 30 years. No gimmicks, just extraordinary food.", mustTry:"Chicken with preserved lemon & olives, Moroccan desserts", openHours:"Daily 12pm–3pm, 7:30pm–11pm", image:I.mrk1 },
  // Fes
  { id:7,  city:"Fes", name:"Restaurant Palais de Fes",      cuisine:"Traditional Moroccan", price:"$$$", rating:4.6, address:"16 Rue Boutouil, Fes el-Bali", description:"A beautifully restored 15th-century palace in the heart of the Fes medina — rooftop terrace, carved stucco arches and belly dancing on Friday evenings. The menu is a comprehensive tour of Fassi cooking. One of the most photographed restaurants in Morocco.", mustTry:"Bastilla au pigeon, Friday Couscous", openHours:"Daily 12pm–10pm", image:I.fes1 },
  { id:8,  city:"Fes", name:"Dar Roumana Restaurant",        cuisine:"Fusion Moroccan", price:"$$$", rating:4.7, address:"30 Derb el Amer, Zkak Roumane, Fes el-Bali", description:"The restaurant of the celebrated Dar Roumana riad — creative Moroccan-inspired cuisine by a trained international chef using the freshest local ingredients. Rooftop seating with sweeping views over the ancient city. Wine list.", mustTry:"Lamb with rose & preserved lemon, Chocolate pastilla", openHours:"Dinner only, from 7pm", image:I.fes2 },
  // Chefchaouen
  { id:9,  city:"Chefchaouen", name:"Aladdin Restaurant",    cuisine:"Moroccan / International", price:"$",    rating:4.4, address:"Rue Targui, Chefchaouen Medina", description:"A beloved budget-friendly restaurant in the blue medina with a large terrace and honest Moroccan cooking. Best known for enormous portions of kefta tagine and freshly made bissara (broad bean soup). A favourite of backpackers and solo travellers for 20 years.", mustTry:"Kefta tagine, Bissara soup", openHours:"Daily 8am–11pm", image:I.chef1 },
  // Essaouira
  { id:10, city:"Essaouira", name:"La Fromagerie",           cuisine:"Moroccan / French", price:"$$",   rating:4.7, address:"Place Moulay Hassan 1, Essaouira", description:"On the main square with views over the ramparts — creative Moroccan dishes with French influences and an excellent cheese selection (rare in Morocco). The fish tagine with chermoula is the best in Essaouira.", mustTry:"Fish tagine, Argan oil salads, Cheese board", openHours:"Daily 12pm–10pm", image:I.ess1 },
  { id:11, city:"Essaouira", name:"Fish Grills at the Port", cuisine:"Grilled Seafood", price:"$",    rating:4.9, address:"Port de Pêche, Essaouira", description:"Not a restaurant — a row of grill stalls at the working fishing port where the morning's catch is grilled over charcoal and served on plastic tables. Choose your fish from the display, haggle gently, and eat the freshest seafood of your life with bread and harissa. The real Essaouira experience.", mustTry:"Grilled sardines, Calamari, Sole", openHours:"Daily 9am–6pm", image:I.ess2 },
  // Casablanca
  { id:12, city:"Casablanca", name:"Rick's Café",            cuisine:"Moroccan / International", price:"$$$", rating:4.5, address:"248 Boulevard Sour Jdid, Casablanca", description:"Inspired by the 1942 film — a recreation of the legendary bar from Casablanca. Not a tourist trap: genuine Moroccan and international cuisine, live jazz piano nightly and a beautiful 1940s décor. The tagine is excellent and the cocktails are the best in Casablanca.", mustTry:"Chicken tagine, Piano Bar cocktails", openHours:"Daily from 6pm", image:I.cas1 },
  { id:13, city:"Casablanca", name:"La Sqala",               cuisine:"Traditional Moroccan", price:"$$",   rating:4.8, address:"Boulevard des Almohades (inside the ramparts), Casablanca", description:"Hidden inside the 18th-century Portuguese ramparts of Casablanca — a garden restaurant of extraordinary beauty. The menu is a masterclass in Moroccan cooking: pastilla, tagines, couscous and fresh bread baked in clay ovens. The garden is magical at night.", mustTry:"Pastilla, Mixed tagine platter, Moroccan salads", openHours:"Daily 12pm–11pm", image:I.mrk4 },
  // Agadir
  { id:14, city:"Agadir", name:"Le Jardin d'Eau",            cuisine:"Moroccan / Mediterranean", price:"$$",  rating:4.5, address:"Secteur Touristique, Agadir", description:"A beautiful garden restaurant in Agadir's tourist district — a haven of calm with cascading water features, palm trees and excellent fresh seafood. One of the most relaxing dining spots on Morocco's Atlantic coast.", mustTry:"Atlantic grilled fish, Argan-marinated lamb", openHours:"Daily 12pm–11pm", image:I.ess1 },
  // Rabat
  { id:15, city:"Rabat", name:"Restaurant Dinarjat",         cuisine:"Classic Moroccan", price:"$$$",  rating:4.7, address:"6 Rue Belgnaoui, Medina, Rabat", description:"A beautifully restored 17th-century Andalusian-Moorish mansion in the Rabat medina, serving the finest traditional Moroccan cuisine in the capital. Every room has hand-painted ceilings, carved plaster and mosaic floors. The couscous royal is magnificent.", mustTry:"Couscous Royal, Bastilla, Lamb Mechoui", openHours:"Daily 12pm–11pm", image:I.fes3 },
];

// ═══ Car Rentals ═══
const carRentals = [
  { id:1, company:"Avis Morocco",      logo:"🚗", description:"International brand with offices at all major airports and city centres. Wide fleet from economy to SUV. Online booking with cancellation flexibility.", locations:["Casablanca CMN","Marrakech RAK","Agadir AGA","Tangier TNG","Fes FEZ","Rabat"], priceFrom:"350 MAD/day", website:"avis.com.ma", phone:"+212 5 22 97 45 97" },
  { id:2, company:"Hertz Morocco",     logo:"🚙", description:"Global leader with Morocco-wide network. Reliable modern vehicles, 24/7 roadside assistance and English-speaking staff at airports.", locations:["All major airports","Casablanca","Marrakech","Agadir","Tangier"], priceFrom:"400 MAD/day", website:"hertz.com", phone:"+212 5 22 48 47 10" },
  { id:3, company:"Budget Car Rental", logo:"🚐", description:"Best value international brand in Morocco. Competitive rates especially for weekly rentals. GPS available. Desert-ready 4x4s for Sahara trips.", locations:["All major airports","City centres"], priceFrom:"280 MAD/day", website:"budget.ma", phone:"+212 5 22 31 48 00" },
  { id:4, company:"Europcar Morocco",  logo:"🛻", description:"Large fleet including 4x4s ideal for Atlas Mountain and Sahara routes. Morocco driving tips included. Free child seats.", locations:["Casablanca","Marrakech","Agadir","Fes","Tangier","Rabat"], priceFrom:"320 MAD/day", website:"europcar.com.ma", phone:"+212 5 22 31 37 37" },
  { id:5, company:"Sixt Morocco",      logo:"🚕", description:"Premium vehicles including Mercedes and BMW. Perfect for business travellers and those wanting a higher-end driving experience on Morocco's excellent motorways.", locations:["Casablanca CMN","Marrakech RAK","Agadir AGA"], priceFrom:"550 MAD/day", website:"sixt.ma", phone:"+212 5 22 97 46 30" },
];

// ═══ User & Review data (in-memory for now) ═══
const users = [];
const userReviews = [
  { id:1, hotelId:15, userId:'guest', userName:"Sophie Laurent", country:"France", avatar:"https://i.pravatar.cc/80?img=5", rating:5, title:"Absolutely breathtaking", text:"The Fairmont Tazi Palace exceeded every single expectation. The views of Tangier from the hilltop are incredible, the spa is world-class, and the staff made us feel like royalty. A once-in-a-lifetime stay.", date:"2026-05-15", helpful:24 },
  { id:2, hotelId:7, userId:'guest', userName:"James Whitfield", country:"UK", avatar:"https://i.pravatar.cc/80?img=12", rating:5, title:"The most legendary hotel in Africa", text:"La Mamounia is everything they say and more. The gardens at sunset, breakfast by the pool, and the hammam left us completely speechless. Worth every dirham.", date:"2026-04-28", helpful:18 },
  { id:3, hotelId:13, userId:'guest', userName:"Amara Diallo", country:"Senegal", avatar:"https://i.pravatar.cc/80?img=21", rating:5, title:"Chefchaouen magic", text:"Waking up to the sound of the medina and those blue streets from the rooftop — Casa Sabila is the perfect base for the Blue City. The mountain views are unreal.", date:"2026-05-02", helpful:15 },
  { id:4, hotelId:12, userId:'guest', userName:"Carlos Mendes", country:"Portugal", avatar:"https://i.pravatar.cc/80?img=33", rating:5, title:"Best food in the city", text:"Riad Fes Relais & Châteaux is in a league of its own. The breakfast on the rooftop terrace with views over the 1,200-year-old medina was the most beautiful morning of my life.", date:"2026-04-10", helpful:31 },
  { id:5, hotelId:20, userId:'guest', userName:"Lucas Fernandez", country:"Spain", avatar:"https://i.pravatar.cc/80?img=15", rating:5, title:"Sahara changed my life", text:"Desert Luxury Camp Morocco: 3am, walking out of the tent, complete silence, the Milky Way from horizon to horizon, and warm sand between my toes. I will be back every year.", date:"2026-03-18", helpful:42 },
];

// ═══ Featured Attractions ═══
const featuredAttractions = [
  { id:100, name:"Hassan II Mosque", city:"Casablanca", type:"Landmark", UNESCO:false, rating:4.9, image:I.cas1, description:"The third largest mosque in the world and Morocco's greatest architectural achievement. Built on a promontory over the Atlantic Ocean, the 210m minaret is the tallest religious structure on earth. 25,000 worshippers pray inside; 80,000 in the courtyard. The retractable roof opens to the sky. Guided tours for non-Muslims available.", coordinates:[33.6086,-7.6326], visit:"Tours daily 9am–6pm (except prayer times) | 130 MAD" },
  { id:101, name:"Jemaa el-Fnaa", city:"Marrakech", type:"Cultural Square", UNESCO:true, rating:5.0, image:I.mrk3, description:"UNESCO Intangible Cultural Heritage and the beating heart of Marrakech. By day: orange juice sellers, henna artists, fortune tellers and snake charmers. By night: the world's greatest open-air theatre — storytellers, Gnawa musicians, acrobats, and the smoke and noise of 100 food stalls. Like nowhere else on earth.", coordinates:[31.6258,-7.9892], visit:"Open 24/7 — best after 7pm. Free." },
  { id:102, name:"Aït Ben Haddou", city:"Ouarzazate", type:"UNESCO Ksar", UNESCO:true, rating:4.8, image:I.atl3, description:"The most spectacular ksar (fortified village) in Morocco — a UNESCO World Heritage Site on the ancient Saharan caravan route. Built from red earthen clay, it has been the backdrop for over 20 Hollywood films including Gladiator, Game of Thrones and Lawrence of Arabia. Inhabited by a few families who maintain the ancient structures.", coordinates:[31.0472,-7.1325], visit:"Open daily | 20 MAD entry" },
  { id:103, name:"Volubilis", city:"Meknès", type:"Roman Ruins", UNESCO:true, rating:4.7, image:I.fes3, description:"Morocco's most impressive Roman ruins — a UNESCO World Heritage Site near Meknès. The capital of the Roman province of Mauritania Tingitana, Volubilis contains extraordinary floor mosaics, intact triumphal arches, forum, capitol and basilica dating from the 1st–3rd century AD. One of the best-preserved Roman sites in all of Africa.", coordinates:[34.0724,-5.5561], visit:"Open daily 8am–6pm | 70 MAD" },
  { id:104, name:"Chefchaouen Medina", city:"Chefchaouen", type:"Historic Medina", UNESCO:false, rating:4.9, image:I.chef2, description:"The Blue City — every alley, staircase and wall painted in shades of cobalt, indigo and turquoise. Founded in 1471 as a refuge for Muslims and Jews expelled from Andalusia, the medina is a labyrinth of photogenic streets, craft workshops and shaded squares. The colour comes from a Jewish tradition of painting blue to ward off evil spirits.", coordinates:[35.1714,-5.2685], visit:"Open 24/7. Free to explore." },
  { id:105, name:"Kasbah des Oudayas", city:"Rabat", type:"Historic Kasbah", UNESCO:true, rating:4.7, image:I.fes2, description:"A UNESCO World Heritage Site at the mouth of the Bou Regreg river — a 12th-century Almohad fortress with brilliant white and blue painted alleys overlooking the Atlantic. The Andalusian garden inside the kasbah is one of the most peaceful places in Morocco. The view from the walls over the ocean at sunset is unforgettable.", coordinates:[34.0331,-6.8408], visit:"Open daily. Free entry." },
  { id:106, name:"Majorelle Garden", city:"Marrakech", type:"Garden & Museum", UNESCO:false, rating:4.6, image:I.mrk4, description:"Created by French painter Jacques Majorelle in 1924, purchased and restored by Yves Saint Laurent in 1980. A 12-acre botanical garden of rare cacti, bamboo and exotic plants around the iconic cobalt-blue Villa Majorelle, now home to the Berber Museum and Yves Saint Laurent Museum. One of the most visited sites in Morocco.", coordinates:[31.6415,-8.0036], visit:"Daily 8am–6pm | 150 MAD" },
];

const bookings = [];

app.get('/api/hotels', (req,res) => {
  const { city, minPrice, maxPrice, stars } = req.query;
  let r = allHotels;
  if (city)     r = r.filter(h => h.city.toLowerCase().includes(city.toLowerCase()));
  if (minPrice) r = r.filter(h => h.price >= Number(minPrice));
  if (maxPrice) r = r.filter(h => h.price <= Number(maxPrice));
  if (stars)    r = r.filter(h => h.stars === Number(stars));
  res.json(r);
});
app.get('/api/hotels/:id', (req,res) => {
  const h = allHotels.find(h => h.id === Number(req.params.id));
  if (!h) return res.status(404).json({ error:'Not found' });
  res.json(h);
});
app.post('/api/bookings', (req,res) => {
  const { hotelId, name, email, checkIn, checkOut, guests } = req.body;
  if (!hotelId||!name||!email||!checkIn||!checkOut||!guests)
    return res.status(400).json({ error:'All fields are required' });
  const h = allHotels.find(h => h.id === Number(hotelId));
  if (!h) return res.status(404).json({ error:'Hotel not found' });
  const nights = Math.ceil((new Date(checkOut)-new Date(checkIn))/86400000);
  const b = { id:bookings.length+1, hotelId, hotelName:h.name, name, email, checkIn, checkOut, guests, nights, total:nights*h.price, createdAt:new Date() };
  bookings.push(b);
  res.status(201).json(b);
});
const allHotels = [...hotels, ...agadirHotels, ...rabatHotels];

app.get('/api/cities',       (req,res) => res.json([...new Set(allHotels.map(h=>h.city))]));
app.get('/api/testimonials', (req,res) => res.json(testimonials));
app.get('/api/stats',        (req,res) => res.json([{ label:"Happy Travellers", value:24800, suffix:"+" },{ label:"Real Hotels", value:allHotels.length, suffix:"" },{ label:"Cities Covered", value:[...new Set(allHotels.map(h=>h.city))].length, suffix:"" },{ label:"Years Experience", value:12, suffix:"" }]));
app.get('/api/gallery',      (req,res) => res.json(gallery));
app.get('/api/blog',         (req,res) => {
  const { category } = req.query;
  res.json(category ? blogPosts.filter(p=>p.category===category) : blogPosts);
});
app.get('/api/attractions',  (req,res) => {
  const { city } = req.query;
  res.json(city ? attractions.filter(a=>a.city.toLowerCase().includes(city.toLowerCase())) : attractions);
});
app.get('/api/destinations',       (req,res) => res.json(destinations));
app.get('/api/destinations/:slug', (req,res) => {
  const d = destinations.find(d=>d.slug===req.params.slug);
  if (!d) return res.status(404).json({ error:'Not found' });
  res.json(d);
});
app.get('/api/tours', (req,res) => {
  const { city } = req.query;
  res.json(city ? tours.filter(t=>t.city.toLowerCase().includes(city.toLowerCase())) : tours);
});
app.get('/api/food',                 (req,res) => res.json(food));
app.get('/api/culture',              (req,res) => res.json(culture));
app.get('/api/transport',            (req,res) => res.json({ ...transport, carRentals }));
app.get('/api/emergency',            (req,res) => res.json(emergency));
app.get('/api/restaurants',          (req,res) => {
  const { city } = req.query;
  res.json(city ? restaurants.filter(r => r.city.toLowerCase().includes(city.toLowerCase())) : restaurants);
});
app.get('/api/car-rentals',          (req,res) => res.json(carRentals));

// ── Auth routes ──
app.post('/api/auth/register', (req,res) => {
  const { name, email, password } = req.body;
  if (!name||!email||!password) return res.status(400).json({ error:'All fields required' });
  if (users.find(u=>u.email===email)) return res.status(409).json({ error:'Email already registered' });
  const user = { id:users.length+1, name, email, password, avatar:`https://i.pravatar.cc/80?img=${users.length+1}`, favorites:[], createdAt:new Date() };
  users.push(user);
  const { password:_, ...safe } = user;
  res.status(201).json({ user:safe, token:`token_${user.id}_${Date.now()}` });
});
app.post('/api/auth/login', (req,res) => {
  const { email, password } = req.body;
  const user = users.find(u=>u.email===email && u.password===password);
  if (!user) return res.status(401).json({ error:'Invalid email or password' });
  const { password:_, ...safe } = user;
  res.json({ user:safe, token:`token_${user.id}_${Date.now()}` });
});
app.get('/api/auth/profile', (req,res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error:'Not authenticated' });
  const userId = parseInt(token.split('_')[1]);
  const user = users.find(u=>u.id===userId);
  if (!user) return res.status(404).json({ error:'User not found' });
  const { password:_, ...safe } = user;
  res.json(safe);
});

// ── Reviews routes ──
app.get('/api/reviews', (req,res) => {
  const { hotelId } = req.query;
  res.json(hotelId ? userReviews.filter(r=>r.hotelId===Number(hotelId)) : userReviews);
});
app.post('/api/reviews', (req,res) => {
  const { hotelId, userName, country, rating, title, text } = req.body;
  if (!hotelId||!userName||!rating||!title||!text) return res.status(400).json({ error:'All fields required' });
  const review = { id:userReviews.length+1, hotelId:Number(hotelId), userId:'user', userName, country:country||'Morocco', avatar:`https://i.pravatar.cc/80?img=${Math.floor(Math.random()*70)+1}`, rating:Number(rating), title, text, date:new Date().toISOString().split('T')[0], helpful:0 };
  userReviews.push(review);
  res.status(201).json(review);
});

// ── Analytics ──
const analytics = { totalVisits:0, pageViews:{}, bookingCount:0, popularCities:{} };
app.post('/api/analytics/track', (req,res) => {
  const { page, city } = req.body;
  analytics.totalVisits++;
  analytics.pageViews[page] = (analytics.pageViews[page]||0)+1;
  if (city) analytics.popularCities[city] = (analytics.popularCities[city]||0)+1;
  res.json({ ok:true });
});
app.get('/api/analytics', (req,res) => {
  res.json({ ...analytics, totalHotels:allHotels.length, totalReviews:userReviews.length, totalUsers:users.length, totalBookings:bookings.length });
});
app.get('/api/weather',              (req,res) => {
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

module.exports = app;
