import { useState, useEffect } from 'react'
import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import axios from 'axios'

gsap.registerPlugin(ScrollTrigger)

const categories = ['All','Main Course','Soup','Breakfast / Street Food','Drink']

export default function Food() {
  const [food, setFood] = useState([])
  const [active, setActive] = useState('All')
  const headerRef = useRef()

  useEffect(() => {
    axios.get('http://localhost:5000/api/food').then(r => setFood(r.data))
    gsap.fromTo(headerRef.current, { opacity:0, y:30 }, { opacity:1, y:0, duration:0.8, ease:'power3.out' })
  }, [])

  useEffect(() => {
    const items = gsap.utils.toArray('.food-card')
    items.forEach((el, i) => gsap.fromTo(el, { opacity:0, y:40 }, { opacity:1, y:0, duration:0.6, delay:i*0.07, ease:'power3.out', scrollTrigger:{ trigger:el, start:'top 90%' } }))
  }, [food, active])

  const filtered = active === 'All' ? food : food.filter(f => f.category === active)

  return (
    <div style={{ maxWidth:1200, margin:'0 auto', padding:'2.5rem 2rem' }}>
      <div ref={headerRef}>
        <div className="section-label">Moroccan Cuisine</div>
        <h1 className="section-title">Food & Flavours<br /><em style={{ color:'var(--gold)', fontStyle:'italic' }}>of Morocco</em></h1>
        <p className="section-subtitle">From the clay tagine pots of the Atlas to the spice souks of Marrakech — the most complex and beautiful cuisine in the Arab world</p>
      </div>

      {/* Category filter */}
      <div style={{ display:'flex', gap:'0.7rem', flexWrap:'wrap', marginBottom:'2.5rem' }}>
        {categories.map(c => (
          <button key={c} onClick={() => setActive(c)} style={{
            padding:'0.5rem 1.2rem', borderRadius:50,
            border: active===c ? 'none' : '1.5px solid var(--cream2)',
            background: active===c ? 'var(--gold)' : 'var(--white)',
            color: active===c ? 'var(--dark)' : 'var(--text2)',
            fontWeight:600, fontSize:'0.85rem', cursor:'pointer', transition:'all 0.2s'
          }}>{c}</button>
        ))}
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(340px, 1fr))', gap:'2rem' }}>
        {filtered.map(item => (
          <div key={item.id} className="food-card" style={{ background:'var(--white)', borderRadius:20, overflow:'hidden', boxShadow:'0 2px 20px rgba(0,0,0,0.07)', border:'1px solid var(--cream2)' }}>
            <div style={{ position:'relative', height:200 }}>
              <img src={item.image} alt={item.name} style={{ width:'100%', height:'100%', objectFit:'cover' }} loading="lazy" />
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(15,8,0,0.7) 0%, transparent 50%)' }} />
              <div style={{ position:'absolute', bottom:'1rem', left:'1rem' }}>
                <span style={{ fontSize:'2rem' }}>{item.icon}</span>
              </div>
              <div style={{ position:'absolute', top:12, right:12, background:'rgba(201,151,58,0.9)', color:'var(--dark)', padding:'0.25rem 0.8rem', borderRadius:20, fontSize:'0.72rem', fontWeight:700 }}>{item.category}</div>
            </div>
            <div style={{ padding:'1.5rem' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'0.5rem' }}>
                <div>
                  <h3 style={{ fontFamily:'Playfair Display, serif', fontSize:'1.3rem', fontWeight:700, marginBottom:'0.2rem' }}>{item.name}</h3>
                  <div style={{ fontSize:'0.78rem', color:'var(--text3)', fontStyle:'italic' }}>{item.arabic} · {item.french}</div>
                </div>
                {item.region && <div style={{ background:'var(--cream2)', color:'var(--text2)', padding:'0.2rem 0.7rem', borderRadius:12, fontSize:'0.72rem', fontWeight:600, whiteSpace:'nowrap', marginLeft:'0.5rem' }}>{item.region}</div>}
              </div>
              <p style={{ color:'var(--text2)', fontSize:'0.9rem', lineHeight:1.75, marginBottom:'1rem' }}>{item.description}</p>
              <div style={{ display:'flex', flexDirection:'column', gap:'0.5rem', paddingTop:'1rem', borderTop:'1px solid var(--cream2)' }}>
                {item.where && <div style={{ fontSize:'0.82rem', color:'var(--text3)' }}><strong style={{ color:'var(--gold)' }}>📍 Where to eat:</strong> {item.where}</div>}
                {item.price && <div style={{ fontSize:'0.82rem', color:'var(--text3)' }}><strong style={{ color:'var(--gold)' }}>💰 Price:</strong> {item.price}</div>}
                {item.tip && <div style={{ fontSize:'0.82rem', background:'rgba(201,151,58,0.08)', border:'1px solid rgba(201,151,58,0.2)', borderRadius:10, padding:'0.6rem 0.8rem', color:'var(--text2)' }}>💡 {item.tip}</div>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Food culture banner */}
      <div style={{ marginTop:'4rem', background:'linear-gradient(135deg, var(--dark) 0%, var(--dark2) 100%)', borderRadius:24, padding:'3rem', color:'#fff', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'3rem', alignItems:'center' }}>
        <div>
          <div className="section-label" style={{ color:'var(--gold-light)', marginBottom:'1rem' }}>Food Culture</div>
          <h2 style={{ fontFamily:'Playfair Display, serif', fontSize:'2rem', fontWeight:900, marginBottom:'1rem' }}>Eating in Morocco</h2>
          <p style={{ color:'rgba(255,255,255,0.65)', lineHeight:1.8 }}>Moroccan meals are communal affairs eaten from a shared central dish. Bread (khobz) is used instead of cutlery to scoop up food. Eating with your right hand is traditional. A meal begins with Bismillah and ends with Hamdullah. Refusing a second helping is an insult — accept more, even if you're full.</p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
          {[['🕐','Lunch is the main meal','Traditionally eaten at 1–2pm with the whole family'],['🍞','Bread with everything','Moroccan khobz is torn by hand and used as a scoop'],['🫖','Mint tea ritual','Served before and after every meal — never refuse'],['🌿','Ras el Hanout','The spice blend of up to 30 spices — every family has their own']].map(([icon, title, desc]) => (
            <div key={title} style={{ background:'rgba(255,255,255,0.07)', borderRadius:14, padding:'1rem' }}>
              <div style={{ fontSize:'1.5rem', marginBottom:'0.4rem' }}>{icon}</div>
              <div style={{ fontWeight:700, fontSize:'0.85rem', marginBottom:'0.3rem' }}>{title}</div>
              <div style={{ fontSize:'0.78rem', color:'rgba(255,255,255,0.5)', lineHeight:1.5 }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
