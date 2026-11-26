import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { whatsappLink } from '../config'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl:'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl:'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl:'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

const mkIcon = (emoji, color, size = 36) => L.divIcon({
  html: `<div style="background:${color};border-radius:50% 50% 50% 0;width:${size}px;height:${size}px;display:flex;align-items:center;justify-content:center;font-size:${size * 0.45}px;border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.3);transform:rotate(-45deg)"><span style="transform:rotate(45deg)">${emoji}</span></div>`,
  iconSize:[size, size], iconAnchor:[size/2, size], popupAnchor:[0, -size], className:''
})

const restaurantIcon = mkIcon('🍽️','#e67e22', 40)
const attractionIcon = mkIcon('⭐','#e74c3c', 38)
const cityIcon = mkIcon('📍','#2980b9', 36)
const airportIcon = mkIcon('✈️','#27ae60', 40)
const beachIcon = mkIcon('🏖️','#f39c12', 38)

const cities = [
  { name:'Tangier', lat:35.7595, lng:-5.8340, desc:'Where Two Continents Meet' },
  { name:'Chefchaouen', lat:35.1714, lng:-5.2685, desc:'The Blue City' },
  { name:'Fes', lat:34.0181, lng:-5.0078, desc:'Imperial City' },
  { name:'Rabat', lat:34.0209, lng:-6.8416, desc:'Capital of Morocco' },
  { name:'Casablanca', lat:33.5731, lng:-7.5898, desc:'Economic Capital' },
  { name:'Marrakech', lat:31.6295, lng:-7.9811, desc:'The Red City' },
  { name:'Essaouira', lat:31.5085, lng:-9.7595, desc:'Atlantic Medina' },
  { name:'Agadir', lat:30.4278, lng:-9.5981, desc:'Sun & Beach' },
  { name:'Merzouga', lat:31.0800, lng:-4.0143, desc:'Gateway to Sahara' },
]

const airports = [
  { name:'Mohammed V (CMN)', city:'Casablanca', lat:33.3675, lng:-7.5897 },
  { name:'Marrakech Menara (RAK)', city:'Marrakech', lat:31.6069, lng:-8.0363 },
  { name:'Tangier Ibn Battouta (TNG)', city:'Tangier', lat:35.7269, lng:-5.9169 },
  { name:'Fes-Saïss (FEZ)', city:'Fes', lat:33.9273, lng:-4.9779 },
  { name:'Agadir Al Massira (AGA)', city:'Agadir', lat:30.3250, lng:-9.4131 },
  { name:'Rabat-Salé (RBA)', city:'Rabat', lat:34.0515, lng:-6.7515 },
]

const beaches = [
  { name:'Agadir Beach', lat:30.4278, lng:-9.6000 },
  { name:'Tangier Bay Beach', lat:35.7870, lng:-5.8050 },
  { name:'Essaouira Beach', lat:31.5010, lng:-9.7750 },
  { name:'Dakhla Beach', lat:23.7136, lng:-15.9355 },
  { name:'Oualidia Beach', lat:32.7358, lng:-9.0381 },
]

const featuredPlaces = [
  { name:'Hassan II Mosque', lat:33.6086, lng:-7.6326, city:'Casablanca', type:'Landmark' },
  { name:'Jemaa el-Fnaa', lat:31.6258, lng:-7.9892, city:'Marrakech', type:'Square' },
  { name:'Aït Ben Haddou', lat:31.0472, lng:-7.1325, city:'Ouarzazate', type:'UNESCO Ksar' },
  { name:'Volubilis', lat:34.0724, lng:-5.5561, city:'near Meknès', type:'Roman Ruins' },
  { name:'Majorelle Garden', lat:31.6415, lng:-8.0036, city:'Marrakech', type:'Garden' },
  { name:'Kasbah des Oudayas', lat:34.0331, lng:-6.8408, city:'Rabat', type:'Kasbah' },
]

const restaurants = [
  { id:1, name:'Le Saveur du Poisson', city:'Tangier', lat:35.7750, lng:-5.8100, cuisine:'Seafood' },
  { id:2, name:'El Morocco Club', city:'Tangier', lat:35.7680, lng:-5.8150, cuisine:'Moroccan' },
  { id:4, name:'Dar Yacout', city:'Marrakech', lat:31.6380, lng:-7.9850, cuisine:'Fine Dining' },
  { id:5, name:'Nomad', city:'Marrakech', lat:31.6290, lng:-7.9920, cuisine:'Modern' },
  { id:6, name:'Al Fassia Aguedal', city:'Marrakech', lat:31.6180, lng:-7.9750, cuisine:'Fassi' },
  { id:7, name:'Restaurant Palais de Fes', city:'Fes', lat:34.0750, lng:-5.0050, cuisine:'Moroccan' },
  { id:8, name:'Dar Roumana', city:'Fes', lat:34.0680, lng:-5.0120, cuisine:'Fusion' },
  { id:10, name:'La Fromagerie', city:'Essaouira', lat:31.5120, lng:-9.7650, cuisine:'French-Moroccan' },
  { id:12, name:'Rick\'s Café', city:'Casablanca', lat:33.5650, lng:-7.6100, cuisine:'International' },
  { id:13, name:'La Sqala', city:'Casablanca', lat:33.5750, lng:-7.6050, cuisine:'Moroccan' },
  { id:15, name:'Restaurant Dinarjat', city:'Rabat', lat:34.0350, lng:-6.8350, cuisine:'Classic Moroccan' },
]

export default function MapPage() {
  const [activeFilter, setActiveFilter] = useState('all')

  const filteredRestaurants = restaurants

  return (
    <div style={{ maxWidth:1200, margin:'0 auto', padding:'2.5rem 2rem' }}>
      <div className="section-label">Explore Morocco</div>
      <h1 className="section-title">Interactive Map<br /><em style={{ color:'var(--gold)', fontStyle:'italic' }}>of Morocco's Best Places</em></h1>
      <p className="section-subtitle">Restaurants, attractions, airports and beaches. Restaurant pins show the approximate area, not the exact address.</p>

      {/* Filter pills */}
      <div style={{ display:'flex', gap:'0.6rem', flexWrap:'wrap', marginBottom:'1.5rem' }}>
        {[['all','🗺️ All'],['restaurants','🍽️ Restaurants'],['attractions','⭐ Attractions'],['airports','✈️ Airports'],['beaches','🏖️ Beaches']].map(([k,l]) => (
          <button key={k} onClick={() => setActiveFilter(k)} style={{
            padding:'0.45rem 1.1rem', borderRadius:50, border:'1.5px solid', cursor:'pointer', fontSize:'0.82rem', fontWeight:600, transition:'all 0.2s',
            borderColor: activeFilter===k ? 'var(--gold)' : 'var(--cream2)',
            background: activeFilter===k ? 'var(--gold)' : 'var(--white)',
            color: activeFilter===k ? 'var(--dark)' : 'var(--text2)',
          }}>{l}</button>
        ))}
      </div>

      {(
        <>
          {/* Map */}
          <div style={{ borderRadius:20, overflow:'hidden', boxShadow:'0 4px 32px rgba(0,0,0,0.15)', border:'2px solid var(--cream2)', height:600 }}>
            <MapContainer center={[31.7917, -7.0926]} zoom={6} style={{ height:'100%', width:'100%' }} scrollWheelZoom={true}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* Cities */}
              {(activeFilter==='all') && cities.map(c => (
                <Marker key={c.name} position={[c.lat, c.lng]} icon={cityIcon}>
                  <Popup><div style={{ minWidth:150 }}>
                    <strong style={{ fontFamily:'Playfair Display,serif', fontSize:'1.05rem', display:'block', marginBottom:'0.3rem' }}>{c.name}</strong>
                    <div style={{ color:'#666', fontSize:'0.85rem', marginBottom:'0.5rem' }}>{c.desc}</div>
                    <a href={whatsappLink(`Hello! I would like a guided trip to ${c.name}.`)} target="_blank" rel="noopener noreferrer" style={{ color:'#c9973a', fontSize:'0.82rem', fontWeight:600, textDecoration:'none' }}>→ Book a guide here</a>
                  </div></Popup>
                </Marker>
              ))}

              {/* Restaurants */}
              {(activeFilter==='all'||activeFilter==='restaurants') && filteredRestaurants.map(r => (
                <Marker key={`restaurant-${r.id}`} position={[r.lat, r.lng]} icon={restaurantIcon}>
                  <Popup><div style={{ minWidth:180 }}>
                    <strong style={{ fontFamily:'Playfair Display,serif', fontSize:'1rem', display:'block' }}>{r.name}</strong>
                    <div style={{ color:'#888', fontSize:'0.8rem' }}>{r.city} · {r.cuisine}</div>
                  </div></Popup>
                </Marker>
              ))}

              {/* Attractions */}
              {(activeFilter==='all'||activeFilter==='attractions') && featuredPlaces.map(a => (
                <Marker key={a.name} position={[a.lat, a.lng]} icon={attractionIcon}>
                  <Popup><div style={{ minWidth:150 }}>
                    <strong style={{ fontFamily:'Playfair Display,serif', fontSize:'1rem', display:'block' }}>{a.name}</strong>
                    <div style={{ color:'#888', fontSize:'0.85rem', marginTop:'0.3rem' }}>{a.city}</div>
                    <div style={{ color:'#666', fontSize:'0.8rem', marginTop:'0.2rem' }}>{a.type}</div>
                  </div></Popup>
                </Marker>
              ))}

              {/* Airports */}
              {(activeFilter==='all'||activeFilter==='airports') && airports.map(a => (
                <Marker key={a.name} position={[a.lat, a.lng]} icon={airportIcon}>
                  <Popup><div style={{ minWidth:160 }}>
                    <strong style={{ fontFamily:'Playfair Display,serif' }}>{a.name}</strong>
                    <div style={{ color:'#888', fontSize:'0.8rem' }}>{a.city}</div>
                  </div></Popup>
                </Marker>
              ))}

              {/* Beaches */}
              {(activeFilter==='all'||activeFilter==='beaches') && beaches.map(b => (
                <Marker key={b.name} position={[b.lat, b.lng]} icon={beachIcon}>
                  <Popup><strong>{b.name}</strong></Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          {/* Legend & Stats */}
          <div style={{ marginTop:'1.5rem' }}>
            <div style={{ display:'flex', gap:'1.5rem', flexWrap:'wrap', padding:'1rem 1.5rem', background:'var(--white)', borderRadius:14, border:'1px solid var(--cream2)', marginBottom:'1rem' }}>
              {[['#e67e22','🍽️','Restaurants'],['#e74c3c','⭐','Attractions'],['#2980b9','📍','Cities'],['#27ae60','✈️','Airports'],['#f39c12','🏖️','Beaches']].map(([c,i,l]) => (
                <div key={l} style={{ display:'flex', alignItems:'center', gap:'0.4rem', fontSize:'0.82rem', color:'var(--text2)' }}>
                  <span style={{ background:c, borderRadius:'50%', width:18, height:18, display:'inline-flex', alignItems:'center', justifyContent:'center', fontSize:'0.7rem' }}>{i}</span>
                  {l}
                </div>
              ))}
            </div>

            {/* Stats */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:'1rem' }}>
              <div style={{ padding:'1rem', background:'var(--cream)', borderRadius:12, textAlign:'center' }}>
                <div style={{ fontSize:'1.8rem', fontWeight:700, color:'#e67e22' }}>{filteredRestaurants.length}</div>
                <div style={{ color:'var(--text2)', fontSize:'0.9rem' }}>Top Restaurants</div>
              </div>
              <div style={{ padding:'1rem', background:'var(--cream)', borderRadius:12, textAlign:'center' }}>
                <div style={{ fontSize:'1.8rem', fontWeight:700, color:'#e74c3c' }}>{cities.length}</div>
                <div style={{ color:'var(--text2)', fontSize:'0.9rem' }}>Cities to Explore</div>
              </div>
              <div style={{ padding:'1rem', background:'var(--cream)', borderRadius:12, textAlign:'center' }}>
                <div style={{ fontSize:'1.8rem', fontWeight:700, color:'#27ae60' }}>{airports.length}</div>
                <div style={{ color:'var(--text2)', fontSize:'0.9rem' }}>International Airports</div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
