import { useState } from 'react'

const cityData = {
  Tangier:          { days:2, highlights:['Kasbah & Museum','Cap Spartel','Petit Socco cafés','Tangier Bay beach','Hercules Caves','American Legation Museum'], hotels:['Fairmont Tazi Palace','Saba\'s House Riad','El Minzah Hotel'], food:['Fresh seafood at the port','Harira soup at Grand Socco','Msemen breakfast at medina bakery'] },
  Chefchaouen:      { days:2, highlights:['Blue Medina walk','Kasbah Gardens','Ras el Ma waterfall','Rif Mountains hike','Artisan souk shopping'], hotels:['Casa Sabila','Lina Ryad & Spa','La Petite Chefchaouen'], food:['Mountain goat tagine','Fresh herb omelettes','Chefchaouen honey'] },
  Fes:              { days:2, highlights:['Fes el-Bali Medina','Chouara Tanneries','Al-Qarawiyyin University (oldest in world)','Bou Inania Madrasa','Merenid Tombs viewpoint'], hotels:['Riad Fes Relais & Châteaux','Riad Laaroussa','Palais Jamaï'], food:['Pastilla at a Fassi restaurant','Harira with chebakia','Mechoui at souk'] },
  Marrakech:        { days:2, highlights:['Djemaa el-Fna evening','Koutoubia Mosque','Bahia Palace','Majorelle Garden','Saadian Tombs','Souk Semmarine'], hotels:['La Mamounia','La Maison Arabe','Riad AndallaSpa'], food:['Mechoui at Place des Ferblantiers','Moroccan pastries at Café des Épices','Couscous Friday lunch'] },
  Essaouira:        { days:1, highlights:['Ramparts walk','Skala de la Ville','Beach & kitesurfing','Thuya wood workshops','Gnaoua music quarter'], hotels:['La Sultana','Heure Bleue Palais','Ocean Vagabond'], food:['Grilled sardines at port stalls','Argan oil tasting','Fish tagine at medina restaurant'] },
  Merzouga:         { days:2, highlights:['Erg Chebbi camel trek','Sahara sunset','Stargazing at camp','Desert 4x4 excursion','Nomad village visit','Sandboarding'], hotels:['Desert Luxury Camp Morocco','Kam Kam Dunes','Sahara Stars Camp'], food:['Berber tent dinner','Desert breakfast at sunrise','Nomad mint tea'] },
  'Atlas Mountains':{ days:1, highlights:['Imlil village walk','Toubkal National Park','Berber village visit','Atlas waterfall hike','Ourika Valley drive'], hotels:['Kasbah Tamadot','Kasbah du Toubkal','Kasbah Bab Ourika'], food:['Berber tagine at mountain hut','Fresh Atlas spring water','Atlas honey and walnuts'] },
  Casablanca:       { days:1, highlights:['Hassan II Mosque (guided tour)','Corniche oceanfront walk','Art Deco architecture tour','Central Market','Boulevard Mohammed V'], hotels:['Four Seasons Casablanca'], food:['Seafood at La Sqala restaurant','Moroccan pastries at Rick\'s Café','Casawi white bean soup'] },
  Agadir:           { days:1, highlights:['Agadir Beach (10km)','Souk El Had (largest market)','Old Kasbah hill viewpoint','Agadir Marina','Crocoparc'],hotels:['Sofitel Agadir Thalassa','Royal Atlas & Spa'], food:['Fresh Argan oil products','Tiznit pastries','Atlantic seafood tagine'] },
  Rabat:            { days:1, highlights:['Kasbah des Oudayas','Hassan Tower & Mohammed V Mausoleum','Chellah Roman ruins','National Museum of Archaeology','Oudayas beach'], hotels:['La Tour Hassan Palace','Sofitel Rabat Jardin des Roses','Riad Dar Soufa'], food:['Rfissa at a traditional restaurant','Pastilla au pigeon','Rabati briouats'] },
}

const budgetMultiplier = { budget:0.5, midrange:1, luxury:2.2 }
const budgetLabels = { budget:'Budget (under $80/night)', midrange:'Mid-Range ($80–$200/night)', luxury:'Luxury ($200+/night)' }

function generateItinerary(cities, days, budget, interests) {
  const itinerary = []
  let day = 1
  const cityList = cities.length ? cities : ['Tangier','Fes','Marrakech']

  cityList.forEach((city, ci) => {
    const info = cityData[city]
    if (!info) return
    const daysHere = Math.max(1, Math.round((days * (info.days / cityList.reduce((s,c) => s + (cityData[c]?.days||1), 0)))))
    const actualDays = Math.min(daysHere, days - day + 1)

    for (let d = 0; d < actualDays && day <= days; d++, day++) {
      const morningAct = info.highlights[d % info.highlights.length]
      const aftenoonAct = info.highlights[(d+1) % info.highlights.length]
      const food = info.food[d % info.food.length]
      const hotel = info.hotels[Math.min(budget === 'luxury' ? 0 : budget === 'midrange' ? 1 : 2, info.hotels.length-1)]

      itinerary.push({
        day,
        city,
        morning: `Explore ${morningAct}`,
        afternoon: `Visit ${aftenoonAct}`,
        evening: d === 0 && ci === 0 ? `Arrive in ${city}, check into ${hotel}, evening stroll` : `Dinner: ${food}`,
        hotel,
        travel: d === 0 && ci > 0 ? `Travel from ${cityList[ci-1]} to ${city}` : null,
      })
    }
  })
  return itinerary
}

const ALL_CITIES = Object.keys(cityData)

export default function TripPlanner() {
  const [form, setForm] = useState({ days:7, budget:'midrange', interests:[], cities:[] })
  const [itinerary, setItinerary] = useState(null)
  const [generated, setGenerated] = useState(false)

  const toggle = (arr, val) => arr.includes(val) ? arr.filter(x=>x!==val) : [...arr, val]

  const handleGenerate = (e) => {
    e.preventDefault()
    const cities = form.cities.length ? form.cities : ALL_CITIES.slice(0,3)
    const result = generateItinerary(cities, Number(form.days), form.budget, form.interests)
    setItinerary(result)
    setGenerated(true)
    setTimeout(() => document.getElementById('itinerary-result')?.scrollIntoView({ behavior:'smooth' }), 100)
  }

  return (
    <div style={{ maxWidth:1000, margin:'0 auto', padding:'2.5rem 2rem' }}>
      <div className="section-label">Plan Your Visit</div>
      <h1 className="section-title">AI Trip Planner<br /><em style={{ color:'var(--gold)', fontStyle:'italic' }}>for Morocco</em></h1>
      <p className="section-subtitle">Tell us your budget, duration and interests — we'll build your perfect Morocco itinerary</p>

      <form onSubmit={handleGenerate} style={{ background:'var(--white)', borderRadius:24, padding:'2.5rem', boxShadow:'0 4px 32px rgba(0,0,0,0.09)', marginBottom:'3rem' }}>
        {/* Days */}
        <div className="form-group">
          <label>How many days? <strong style={{ color:'var(--gold)' }}>{form.days} days</strong></label>
          <input type="range" min={3} max={21} value={form.days} onChange={e => setForm({...form, days:e.target.value})} style={{ width:'100%', accentColor:'var(--gold)' }} />
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:'0.75rem', color:'var(--text3)' }}>
            <span>3 days</span><span>1 week</span><span>2 weeks</span><span>3 weeks</span>
          </div>
        </div>

        {/* Budget */}
        <div className="form-group">
          <label>Budget</label>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'0.8rem' }}>
            {Object.entries(budgetLabels).map(([k,v]) => (
              <button key={k} type="button" onClick={() => setForm({...form, budget:k})} style={{
                padding:'0.8rem', borderRadius:12, border:'2px solid', cursor:'pointer', transition:'all 0.2s', textAlign:'center',
                borderColor: form.budget===k ? 'var(--gold)' : 'var(--cream2)',
                background: form.budget===k ? 'rgba(201,151,58,0.1)' : 'var(--cream)',
              }}>
                <div style={{ fontSize:'1.3rem', marginBottom:'0.3rem' }}>{k==='budget'?'🎒':k==='midrange'?'🏨':'👑'}</div>
                <div style={{ fontWeight:700, fontSize:'0.82rem', textTransform:'capitalize', color: form.budget===k ? 'var(--gold-dark)' : 'var(--text)' }}>{k}</div>
                <div style={{ fontSize:'0.72rem', color:'var(--text3)' }}>{v.split('(')[1]?.replace(')','')}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Interests */}
        <div className="form-group">
          <label>Interests (select all that apply)</label>
          <div style={{ display:'flex', flexWrap:'wrap', gap:'0.6rem' }}>
            {['History & Culture','Desert & Sahara','Mountains & Hiking','Food & Cuisine','Beach & Coast','Architecture','Photography','Souks & Shopping','Nightlife & Music'].map(i => (
              <button key={i} type="button" onClick={() => setForm({...form, interests:toggle(form.interests, i)})} style={{
                padding:'0.4rem 1rem', borderRadius:50, border:'1.5px solid', cursor:'pointer', fontSize:'0.82rem', fontWeight:600, transition:'all 0.2s',
                borderColor: form.interests.includes(i) ? 'var(--gold)' : 'var(--cream2)',
                background: form.interests.includes(i) ? 'var(--gold)' : 'var(--white)',
                color: form.interests.includes(i) ? 'var(--dark)' : 'var(--text2)',
              }}>{i}</button>
            ))}
          </div>
        </div>

        {/* Cities */}
        <div className="form-group">
          <label>Cities to visit (leave blank for recommended)</label>
          <div style={{ display:'flex', flexWrap:'wrap', gap:'0.6rem' }}>
            {ALL_CITIES.map(c => (
              <button key={c} type="button" onClick={() => setForm({...form, cities:toggle(form.cities, c)})} style={{
                padding:'0.4rem 1rem', borderRadius:50, border:'1.5px solid', cursor:'pointer', fontSize:'0.82rem', fontWeight:600, transition:'all 0.2s',
                borderColor: form.cities.includes(c) ? 'var(--gold)' : 'var(--cream2)',
                background: form.cities.includes(c) ? 'rgba(201,151,58,0.12)' : 'var(--white)',
                color: form.cities.includes(c) ? 'var(--gold-dark)' : 'var(--text2)',
              }}>{c}</button>
            ))}
          </div>
        </div>

        <button type="submit" className="btn-primary" style={{ width:'100%', padding:'1rem', fontSize:'1.05rem', justifyContent:'center' }}>
          ✨ Generate My Morocco Itinerary
        </button>
      </form>

      {/* Result */}
      {generated && itinerary && (
        <div id="itinerary-result">
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.5rem', flexWrap:'wrap', gap:'1rem' }}>
            <div>
              <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:'1.8rem', fontWeight:900 }}>Your {form.days}-Day Morocco Itinerary</h2>
              <p style={{ color:'var(--text3)' }}>{form.cities.length || 3} cities · {budgetLabels[form.budget]}</p>
            </div>
            <button onClick={() => window.print()} className="btn-outline" style={{ fontSize:'0.85rem' }}>🖨️ Print Itinerary</button>
          </div>

          <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
            {itinerary.map((d, i) => (
              <div key={d.day} style={{ background:'var(--white)', borderRadius:18, overflow:'hidden', boxShadow:'0 2px 16px rgba(0,0,0,0.07)', border:'1px solid var(--cream2)' }}>
                {d.travel && (
                  <div style={{ background:'rgba(201,151,58,0.08)', padding:'0.7rem 1.5rem', fontSize:'0.85rem', color:'var(--gold-dark)', borderBottom:'1px solid var(--cream2)' }}>
                    🚌 {d.travel}
                  </div>
                )}
                <div style={{ display:'grid', gridTemplateColumns:'100px 1fr', minHeight:100 }}>
                  <div style={{ background: i%2===0 ? 'var(--dark)' : 'var(--dark2)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'1rem', color:'#fff', textAlign:'center' }}>
                    <div style={{ fontSize:'0.72rem', color:'rgba(255,255,255,0.5)', textTransform:'uppercase', letterSpacing:1 }}>Day</div>
                    <div style={{ fontFamily:'Playfair Display,serif', fontSize:'2.5rem', fontWeight:900, color:'var(--gold)', lineHeight:1 }}>{d.day}</div>
                    <div style={{ fontSize:'0.72rem', color:'rgba(255,255,255,0.6)', marginTop:'0.3rem' }}>{d.city}</div>
                  </div>
                  <div style={{ padding:'1.3rem', display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'1rem' }}>
                    {[['🌅 Morning', d.morning], ['☀️ Afternoon', d.afternoon], ['🌙 Evening', d.evening]].map(([label, text]) => (
                      <div key={label}>
                        <div style={{ fontSize:'0.72rem', fontWeight:700, color:'var(--gold)', textTransform:'uppercase', letterSpacing:1, marginBottom:'0.3rem' }}>{label}</div>
                        <div style={{ fontSize:'0.88rem', color:'var(--text2)', lineHeight:1.5 }}>{text}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ padding:'0.7rem 1.5rem', background:'var(--cream)', borderTop:'1px solid var(--cream2)', fontSize:'0.8rem', color:'var(--text3)' }}>
                  🏨 Suggested: <strong style={{ color:'var(--text2)' }}>{d.hotel}</strong>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop:'2rem', background:'rgba(201,151,58,0.08)', border:'1px solid rgba(201,151,58,0.2)', borderRadius:16, padding:'1.5rem', textAlign:'center' }}>
            <p style={{ color:'var(--text2)', marginBottom:'1rem' }}>Ready to book? Browse hotels for your trip:</p>
            <div style={{ display:'flex', gap:'1rem', justifyContent:'center', flexWrap:'wrap' }}>
              {(form.cities.length ? form.cities : ['Marrakech','Fes','Tangier']).slice(0,4).map(c => (
                <a key={c} href={`/hotels?city=${c}`} className="btn-primary" style={{ fontSize:'0.85rem' }}>Hotels in {c}</a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
