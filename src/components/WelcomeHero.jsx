const icons = {
  provost: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  general: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </svg>
  ),
  obe: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 6 3 6 3s6-1 6-3v-5"/>
    </svg>
  ),
};

export default function WelcomeHero({ handleSectionClick, handleWelcomeObeClick }) {
  return (
    <div className="welcome-hero" id="welcome-hero">
      <h1 className="welcome-title">
        Explore the <span className="welcome-title-accent">College of Engineering</span>
      </h1>
      <p className="welcome-subtitle">
        Navigate programme objectives, course learning outcomes, and departmental information
        through the ABUAD Outcomes-Based Education portal.
      </p>
      <div className="welcome-cards">
        <div 
          className="welcome-card" 
          onClick={() => handleSectionClick('provost')} 
          id="welcome-card-provost"
        >
          <div className="welcome-card-icon">{icons.provost}</div>
          <div className="welcome-card-title">Provost's Desk</div>
          <div className="welcome-card-desc">Message from the Provost and academic excellence guidelines.</div>
        </div>
        <div 
          className="welcome-card" 
          onClick={() => handleSectionClick('general')} 
          id="welcome-card-general"
        >
          <div className="welcome-card-icon">{icons.general}</div>
          <div className="welcome-card-title">College Information</div>
          <div className="welcome-card-desc">Vision, mission, and quality assurance benchmarks.</div>
        </div>
        <div 
          className="welcome-card" 
          onClick={handleWelcomeObeClick} 
          id="welcome-card-obe"
        >
          <div className="welcome-card-icon">{icons.obe}</div>
          <div className="welcome-card-title">OBE Portal</div>
          <div className="welcome-card-desc">Department-specific outcomes, courses, and curriculum mapping.</div>
        </div>
      </div>
    </div>
  );
}
