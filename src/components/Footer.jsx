import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <>
      {/* ── FOOTER ── */}
      <footer>
        <div className="footer-inner">
          <div>
            <div className="footer-brand-name">Morocco<span>Travel</span></div>
            <p className="footer-desc">Your local guide in Morocco — guided city tours, desert trips and journeys across the whole country.</p>
          </div>
          <div className="footer-col">
            <h4>Destinations</h4>
            <ul>
              {['Marrakech', 'Fes', 'Chefchaouen', 'Essaouira', 'Merzouga', 'Tangier'].map(c => (
                <li key={c}><Link to={`/destinations/${c.toLowerCase()}`}>{c}</Link></li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h4>Explore</h4>
            <ul>
              <li><Link to="/destinations">Destinations</Link></li>
              <li><Link to="/food">Food</Link></li>
              <li><Link to="/blog">Travel Guides</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Info</h4>
            <ul>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/emergency">Emergency Info</Link></li>
              <li><Link to="/transport">Transport Guide</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} <span>MoroccoTravel</span>. All rights reserved.</span>
          <span>Made with ♥ for Morocco</span>
        </div>
      </footer>
    </>
  )
}
