import abuadLogo from '../assets/abuad_logo.png'
import SearchBar from './SearchBar'

export default function Navbar({ isMobileMenuOpen, setIsMobileMenuOpen, onLogoClick }) {
  return (
    <nav className="navbar" id="app-navbar">
      <div className="brand-section" onClick={onLogoClick} style={{ cursor: 'pointer' }} title="Go to home page">
        <img src={abuadLogo} alt="ABUAD Logo" className="logo-img" />
        <div className="brand-text">
          <span className="brand-title">College of Engineering</span>
          <span className="brand-subtitle">Afe Babalola University</span>
        </div>
      </div>

      <div className="navbar-actions">
        <SearchBar onNavigate={() => setIsMobileMenuOpen(false)} />

        <button 
          className="mobile-menu-btn" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          )}
        </button>
      </div>
    </nav>
  )
}
