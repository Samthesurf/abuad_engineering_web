import SearchBar from './SearchBar'

// SVG icons for sidebar items
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
  computer: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/>
    </svg>
  ),
  electrical: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>
    </svg>
  ),
  history: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  objectives: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
    </svg>
  ),
  handbooks: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    </svg>
  ),
  course_info: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
    </svg>
  ),
  outlines: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
    </svg>
  ),
  lecture_plans: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
  mapping: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
    </svg>
  ),
  clo: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="11" x2="8.01" y2="11"/><line x1="12" y1="11" x2="12.01" y2="11"/><line x1="16" y1="11" x2="16.01" y2="11"/><line x1="8" y1="15" x2="8.01" y2="15"/><line x1="12" y1="15" x2="12.01" y2="15"/><line x1="16" y1="15" x2="16.01" y2="15"/><line x1="8" y1="19" x2="16" y2="19"/>
    </svg>
  ),
  gallery: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
    </svg>
  ),
};

const hodItems = [
  { key: 'history', label: 'Programme History', hint: 'Founding & milestones', icon: icons.history },
  { key: 'objectives', label: 'Objectives & Outcomes', hint: 'PEOs, POs & philosophy', icon: icons.objectives },
  { key: 'handbooks', label: 'Handbooks & Regulations', hint: 'Student & lab guides', icon: icons.handbooks },
];

const staffItems = [
  { key: 'course_info', label: 'Course Information', hint: 'Credits, CLOs & compacts', icon: icons.course_info },
  { key: 'outlines', label: 'Course Outlines', hint: 'Weekly topic breakdown', icon: icons.outlines },
  { key: 'lecture_plans', label: 'Lecture Plans', hint: 'Schedules & assessments', icon: icons.lecture_plans },
  { key: 'mapping', label: 'Mapping to POs', hint: 'OBE emphasis matrix', icon: icons.mapping },
  { key: 'clo', label: 'CLO Attainment', hint: 'Scores to dept report', icon: icons.clo },
];

export default function Sidebar({
  activeSection,
  activeDept,
  activeSubSection,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  handleSectionClick,
  handleDeptSelect,
  handleSubSectionClick,
}) {
  // Extract complex OBE nested layout to a clean helper function.
  // This avoids nesting complex curly dynamic expressions deep in JSX return,
  // which prevents Vite oxc/esbuild parser issues.
  const renderObeNested = () => {
    if (activeSection !== 'obe') return null;

    return (
      <div className="sidebar-nested">
        <div className="sidebar-divider" />
        <div className="sidebar-section">
          <div className="sidebar-section-label">Departments</div>

          <div
            className={`sidebar-item ${activeDept === 'computer' ? 'active' : ''}`}
            onClick={() => handleDeptSelect('computer')}
            id="sidebar-dept-computer"
          >
            <div className="sidebar-item-icon">{icons.computer}</div>
            <div className="sidebar-item-text">
              <span className="sidebar-item-label">Computer Engineering</span>
            </div>
          </div>

          <div
            className={`sidebar-item ${activeDept === 'electrical' ? 'active' : ''}`}
            onClick={() => handleDeptSelect('electrical')}
            id="sidebar-dept-electrical"
          >
            <div className="sidebar-item-icon">{icons.electrical}</div>
            <div className="sidebar-item-text">
              <span className="sidebar-item-label">Electrical/Electronics</span>
            </div>
          </div>

          <div className="sidebar-item disabled" id="sidebar-dept-other">
            <div className="sidebar-item-icon">⋯</div>
            <div className="sidebar-item-text">
              <span className="sidebar-item-label">Other Departments</span>
              <span className="sidebar-item-hint">Coming Soon</span>
            </div>
          </div>
        </div>

        {activeDept && (
          <>
            <div className="sidebar-divider" />
            <div className="sidebar-section">
              <div className="sidebar-section-label">HOD Access</div>
              {hodItems.map((item) => (
                <div
                  key={item.key}
                  className={`sidebar-item ${activeSubSection === item.key ? 'active' : ''}`}
                  onClick={() => handleSubSectionClick(item.key)}
                  id={`sidebar-${item.key}`}
                >
                  <div className="sidebar-item-icon">{item.icon}</div>
                  <div className="sidebar-item-text">
                    <span className="sidebar-item-label">{item.label}</span>
                    <span className="sidebar-item-hint">{item.hint}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="sidebar-section">
              <div className="sidebar-section-label">Staff & OBE Access</div>
              {staffItems.map((item) => (
                <div
                  key={item.key}
                  className={`sidebar-item ${activeSubSection === item.key ? 'active' : ''}`}
                  onClick={() => handleSubSectionClick(item.key)}
                  id={`sidebar-${item.key}`}
                >
                  <div className="sidebar-item-icon">{item.icon}</div>
                  <div className="sidebar-item-text">
                    <span className="sidebar-item-label">{item.label}</span>
                    <span className="sidebar-item-hint">{item.hint}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <>
      <div 
        className={`mobile-overlay ${isMobileMenuOpen ? 'mobile-open' : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />
      <aside className={`sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`} id="sidebar-nav">
        {/* Mobile-only search bar at top of sidebar */}
        <div className="sidebar-search-mobile">
          <SearchBar onNavigate={() => setIsMobileMenuOpen(false)} />
        </div>

        {/* Primary navigation */}
        <div className="sidebar-section">
          <div className="sidebar-section-label">Academic Portal</div>

          {/* Provost */}
          <div
            className={`sidebar-item ${activeSection === 'provost' ? 'active' : ''}`}
            onClick={() => handleSectionClick('provost')}
            id="sidebar-provost"
          >
            <div className="sidebar-item-icon">{icons.provost}</div>
            <div className="sidebar-item-text">
              <span className="sidebar-item-label">Provost's Desk</span>
              <span className="sidebar-item-hint">Message & guidelines</span>
            </div>
          </div>

          {/* General */}
          <div
            className={`sidebar-item ${activeSection === 'general' ? 'active' : ''}`}
            onClick={() => handleSectionClick('general')}
            id="sidebar-general"
          >
            <div className="sidebar-item-icon">{icons.general}</div>
            <div className="sidebar-item-text">
              <span className="sidebar-item-label">General College Information</span>
              <span className="sidebar-item-hint">Vision, mission & QA</span>
            </div>
          </div>

          {/* OBE */}
          <div
            className={`sidebar-item ${activeSection === 'obe' ? 'active' : ''}`}
            onClick={() => handleSectionClick('obe')}
            id="sidebar-obe"
          >
            <div className="sidebar-item-icon">{icons.obe}</div>
            <div className="sidebar-item-text">
              <span className="sidebar-item-label">OBE Information</span>
              <span className="sidebar-item-hint">Departments & curriculum</span>
            </div>
            <span className="sidebar-chevron">{activeSection === 'obe' ? '▼' : '▶'}</span>
          </div>

          {/* Gallery */}
          <div
            className={`sidebar-item ${activeSection === 'gallery' ? 'active' : ''}`}
            onClick={() => handleSectionClick('gallery')}
            id="sidebar-gallery"
          >
            <div className="sidebar-item-icon">{icons.gallery}</div>
            <div className="sidebar-item-text">
              <span className="sidebar-item-label">Media Gallery</span>
              <span className="sidebar-item-hint">Photos & events</span>
            </div>
          </div>
        </div>

        {renderObeNested()}
      </aside>
    </>
  );
}
