# 🇲🇦 Morocco Tourism & Travel Platform

A full-stack, responsive luxury tourism and travel web application for Morocco. Explore imperial cities, hand-curated riads and luxury hotels, authentic culinary culture, travel guides, interactive Leaflet maps, weather updates, and seamless booking inquiry flows.

---

## 🌟 Key Features

- **🏛️ Destinations & Imperial Cities:** In-depth curated travel guides for Marrakech, Fes, Chefchaouen, Tangier, Casablanca, Rabat, Essaouira, Merzouga, Agadir, and the Atlas Mountains.
- **🏨 Handpicked Hotels & Riads:** Detailed lodging directory with star ratings, verified amenities, high-resolution photo galleries, price conversions, and direct booking flows.
- **🗺️ Interactive Travel Map:** Leaflet map with custom category markers for hotels, restaurants, landmarks, beaches, and airports across Morocco.
- **✨ 3D Hero Experience:** Dynamic interactive Three.js starry celestial dome with smooth GSAP animations and mouse parallax effects.
- **🍲 Moroccan Culinary Guide:** Authentic dish explorations (Tagines, Couscous, Pastilla, Harira, Mint Tea, Mechoui, Rfissa).
- **🌤️ Live Weather & Season Guide:** Real-time city weather forecasts and packing recommendations for all seasons.
- **💬 Direct WhatsApp Booking:** Integrated floating booking concierge button.
- **🌐 Multi-Currency & Multi-Language:** Built-in switchers for MAD, USD, EUR, GBP, CAD, JPY and English, French, and Arabic.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Full-Stack Dev Server (Express API + Vite Frontend)
```bash
npm run dev
```

- **Frontend:** [http://localhost:5173](http://localhost:5173)
- **Backend API:** [http://localhost:5000](http://localhost:5000)

### 3. Build for Production
```bash
npm run build
```

### 4. Code Quality & Lint
```bash
npm run lint
```

---

## 💰 Monetization Guide (How to Make Money from this Platform)

This platform is configured with 5 direct revenue channels:

### 1. 🏨 Hotel Affiliate Commissions (Booking.com & Agoda)
- **What it is:** When visitors click to book any of the hotels/riads, you earn **4% to 8% commission** on the entire booking total.
- **Where to configure:** Edit `src/components/Monetization.jsx`:
  - Replace `YOUR_AFFILIATE_ID` with your [Booking.com Affiliate Partner ID](https://www.booking.com/affiliate-program/v2/index.html).
  - Replace `YOUR_AGODA_CID` with your [Agoda Partner ID](https://partners.agoda.com/).
- **Potential:** 1 luxury riad booking in Marrakech ($300/night × 4 nights = $1,200) earns ~$50–$100 in affiliate commission.

### 2. 🎟️ Guided Tours & Desert Excursions (GetYourGuide / Viator)
- **What it is:** High-converting tour affiliate buttons in hotel details, city guides, and blog articles.
- **Where to configure:** In `src/components/Monetization.jsx` and `src/pages/Blog.jsx`:
  - Replace `YOUR_GYG_ID` with your [GetYourGuide Partner ID](https://partner.getyourguide.com/).
- **Potential:** High margin (8%–10% per booking on desert excursions, camel treks, cooking classes).

### 3. 📢 Google AdSense / Programmatic Display Ads
- **What it is:** Banner and in-feed ads placed unobtrusively on the Homepage, Hotel listings, and Blog pages.
- **Where to configure:**
  - In `index.html`, uncomment the AdSense script and replace `ca-pub-XXXXXXXXXXXXXXXX` with your publisher ID.
  - In `src/components/Monetization.jsx`, set `AD_CLIENT` to your AdSense ID.

### 4. 💬 WhatsApp Concierge Booking Fee / Local Commissions
- **What it is:** The floating WhatsApp button connects travelers directly to you.
- **How to monetize:**
  - Partner with local riad owners, drivers, and desert camps in Morocco.
  - Charge a 10%–15% booking/concierge fee or commission per confirmed reservation.

### 5. 📧 Email Newsletter Sponsorships & Deals
- **What it is:** Emails collected via the newsletter form are saved to `/api/newsletter` (accessible via `/api/newsletter/subscribers`).
- **How to monetize:** Send weekly Moroccan travel deals, sponsored hotel spotlights, or affiliate tour promotions.

---

## 🛠️ Tech Stack

- **Frontend:** React 19, React Router 7, Vite 8, GSAP 3, Three.js, Leaflet / React-Leaflet, Axios
- **Backend:** Node.js, Express 5, CORS
- **Styling:** Custom luxury Moroccan palette CSS with light/dark theme support
