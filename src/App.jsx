import { useState, useEffect } from 'react'
import abuadLogo from './assets/abuad_logo.png'
import { collegeData } from './collegeData'

function App() {
  // Navigation states
  const [activeSection, setActiveSection] = useState(null) // 'provost', 'general', 'obe'
  const [activeDept, setActiveDept] = useState(null) // 'electrical', 'computer'
  const [activeSubSection, setActiveSubSection] = useState(null) // 'history', 'objectives', 'handbooks', 'course_info', 'outlines', 'lecture_plans', 'mapping'
  const [activeCourse, setActiveCourse] = useState('COE519')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)

  // Scroll listener for FAB
  useEffect(() => {
    const handleScroll = () => {
      const contentEl = document.getElementById('content-area')
      const scrollPos = (contentEl ? contentEl.scrollTop : 0) || window.scrollY
      setShowBackToTop(scrollPos > 300)
    }

    window.addEventListener('scroll', handleScroll)
    const contentEl = document.getElementById('content-area')
    if (contentEl) {
      contentEl.addEventListener('scroll', handleScroll)
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (contentEl) {
        contentEl.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  // Loaded dynamically from ./collegeData.js

  const deptData = activeDept ? collegeData[activeDept] : null

  // Get the active course data depending on activeDept
  const getCourseData = () => {
    if (!activeDept || !collegeData[activeDept]) return null
    return collegeData[activeDept].courses[activeCourse] || Object.values(collegeData[activeDept].courses)[0] || null
  }

  const scrollToContentOnMobile = () => {
    setIsMobileMenuOpen(false); // Close menu on mobile
    if (window.innerWidth <= 768) {
      setTimeout(() => {
        const contentEl = document.getElementById('content-area');
        if (contentEl) {
          // Nav height is roughly 60px on mobile
          const y = contentEl.getBoundingClientRect().top + window.scrollY - 60;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 50); // slight delay to allow rendering
    }
  }

  const handleWelcomeObeClick = () => {
    setActiveSection('obe')
    setActiveSubSection(null)
    if (!activeDept) setActiveDept('computer')
    
    if (window.innerWidth <= 768) {
      setIsMobileMenuOpen(true)
    } else {
      setTimeout(() => {
        const contentEl = document.getElementById('content-area');
        if (contentEl) contentEl.scrollTo({ top: 0, behavior: 'smooth' });
      }, 50)
    }
  }

  const handleSectionClick = (section) => {
    if (activeSection === section && section !== 'obe') {
      // Toggle off if clicking same non-obe section
      setActiveSection(null)
      setActiveDept(null)
      setActiveSubSection(null)
      return
    }
    setActiveSection(section)
    setActiveSubSection(null)
    if (section === 'obe') {
      if (!activeDept) setActiveDept('computer')
    } else {
      setActiveDept(null)
      scrollToContentOnMobile()
    }
  }

  const handleDeptSelect = (dept) => {
    setActiveDept(dept)
    setActiveSubSection(null)
    const deptCourses = Object.keys(collegeData[dept].courses)
    if (deptCourses.length > 0) {
      setActiveCourse(deptCourses[0])
    }
    scrollToContentOnMobile()
  }

  const handleSubSectionClick = (sub) => {
    setActiveSubSection(sub)
    scrollToContentOnMobile()
  }

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
  }

  // Sub-section items for OBE
  const hodItems = [
    { key: 'history', label: 'Programme History', hint: 'Founding & milestones', icon: icons.history },
    { key: 'objectives', label: 'Objectives & Outcomes', hint: 'PEOs, POs & philosophy', icon: icons.objectives },
    { key: 'handbooks', label: 'Handbooks & Regulations', hint: 'Student & lab guides', icon: icons.handbooks },
  ]
  const staffItems = [
    { key: 'course_info', label: 'Course Information', hint: 'Credits, CLOs & compacts', icon: icons.course_info },
    { key: 'outlines', label: 'Course Outlines', hint: 'Weekly topic breakdown', icon: icons.outlines },
    { key: 'lecture_plans', label: 'Lecture Plans', hint: 'Schedules & assessments', icon: icons.lecture_plans },
    { key: 'mapping', label: 'Mapping to POs', hint: 'OBE emphasis matrix', icon: icons.mapping },
  ]

  // Render content based on active state
  const renderContent = () => {
    // Welcome hero state
    if (!activeSection) {
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
            <div className="welcome-card" onClick={() => handleSectionClick('provost')} id="welcome-card-provost">
              <div className="welcome-card-icon">{icons.provost}</div>
              <div className="welcome-card-title">Provost's Desk</div>
              <div className="welcome-card-desc">Message from the Provost and academic excellence guidelines.</div>
            </div>
            <div className="welcome-card" onClick={() => handleSectionClick('general')} id="welcome-card-general">
              <div className="welcome-card-icon">{icons.general}</div>
              <div className="welcome-card-title">College Info</div>
              <div className="welcome-card-desc">Vision, mission, and quality assurance benchmarks.</div>
            </div>
            <div className="welcome-card" onClick={handleWelcomeObeClick} id="welcome-card-obe">
              <div className="welcome-card-icon">{icons.obe}</div>
              <div className="welcome-card-title">OBE Portal</div>
              <div className="welcome-card-desc">Department-specific outcomes, courses, and curriculum mapping.</div>
            </div>
          </div>
        </div>
      )
    }

    // Provost section
    if (activeSection === 'provost') {
      return (
        <div className="content-panel" key="provost">
          <div className="content-panel-header">
            <div className="content-breadcrumb">
              <span onClick={() => handleSectionClick(null)}>Portal</span>
              <span className="content-breadcrumb-sep">›</span>
              <span className="content-breadcrumb-active">Provost's Desk</span>
            </div>

            <h2 className="content-panel-title">From the Provost's Desk</h2>
          </div>
          <div className="content-panel-body">
            <div className="provost-card" id="provost-message-panel">
              <div className="avatar-placeholder">
                <span>No Image</span>
              </div>
              <div className="provost-name">Engr. Prof. Femi M. Onibonoje</div>
              <div className="provost-role">Office of the Provost</div>
              <div className="provost-subtitle">College of Engineering, ABUAD</div>
              <p className="provost-text">
                "Greetings to all returning and fresh scholars. Our College of Engineering maintains the absolute highest benchmark of technical training and Outcomes-Based Education (OBE) to equip you with standard professional expertise, leadership values, and research competence. Utilize this interactive platform to explore your course learning maps."
              </p>
              <div className="provost-upload-hint">
                <span className="data-card-label">Provost Picture Upload</span>
                <p>
                  Replace the default avatar placeholder image by copying the official JPEG image into the assets folder.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    }

    // General info section
    if (activeSection === 'general') {
      return (
        <div className="content-panel" key="general">
          <div className="content-panel-header">
            <div className="content-breadcrumb">
              <span onClick={() => handleSectionClick(null)}>Portal</span>
              <span className="content-breadcrumb-sep">›</span>
              <span className="content-breadcrumb-active">General Info</span>
            </div>

            <h2 className="content-panel-title">{collegeData.general.title}</h2>
            <p className="content-panel-subtitle">{collegeData.general.subtitle}</p>
          </div>
          <div className="content-panel-body">
            <div className="data-grid">
              <div className="data-card">
                <span className="data-card-label">University Founded</span>
                <span className="data-card-value">{collegeData.general.establishment.university}</span>
              </div>
              <div className="data-card">
                <span className="data-card-label">College Established</span>
                <span className="data-card-value">{collegeData.general.establishment.college}</span>
              </div>
              <div className="data-card">
                <span className="data-card-label">Vice Chancellor</span>
                <span className="data-card-value">{collegeData.general.establishment.vc}</span>
              </div>
              <div className="data-card">
                <span className="data-card-label">Founder & Chancellor</span>
                <span className="data-card-value">{collegeData.general.establishment.founder}</span>
              </div>
            </div>

            <div className="info-section">
              <h4 className="info-section-title">
                <span className="info-section-title-icon">✦</span>
                University Academic Vision
              </h4>
              <p className="info-section-text">{collegeData.general.vision}</p>
            </div>

            <div className="info-section">
              <h4 className="info-section-title">
                <span className="info-section-title-icon">◎</span>
                University Academic Mission
              </h4>
              <p className="info-section-text">{collegeData.general.mission}</p>
            </div>

            <div className="info-section">
              <h4 className="info-section-title">
                <span className="info-section-title-icon">▸</span>
                University Core Goals
              </h4>
              <ul className="styled-list">
                {collegeData.general.coreGoals.map((goal, idx) => (
                  <li key={idx}>{goal}</li>
                ))}
              </ul>
            </div>

            <div className="info-section">
              <h4 className="info-section-title">
                <span className="info-section-title-icon">◆</span>
                OBE Criteria & Quality Benchmarks
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {collegeData.general.qaPrinciples.map((princ, idx) => (
                  <div className="callout-block" key={idx}>
                    <div className="callout-block-title">{princ.title}</div>
                    <div className="callout-block-text">{princ.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    }

    // OBE sections
    if (activeSection === 'obe' && activeDept) {
      // Default: department profile
      if (!activeSubSection) {
        return (
          <div className="content-panel" key={`dept-${activeDept}`}>
            <div className="content-panel-header">
              <div className="content-breadcrumb">
                <span onClick={() => handleSectionClick(null)}>Portal</span>
                <span className="content-breadcrumb-sep">›</span>
                <span onClick={() => handleSectionClick('obe')}>OBE</span>
                <span className="content-breadcrumb-sep">›</span>
                <span className="content-breadcrumb-active">{deptData.name}</span>
              </div>

              <h2 className="content-panel-title">{deptData.name}</h2>
            </div>
            <div className="content-panel-body">
              <div className="data-grid">
                <div className="data-card">
                  <span className="data-card-label">Program Duration</span>
                  <span className="data-card-value">{deptData.duration}</span>
                </div>
                <div className="data-card">
                  <span className="data-card-label">Degree Code</span>
                  <span className="data-card-value">{deptData.abbreviation}</span>
                </div>
              </div>

              <div className="data-card featured">
                <span className="data-card-label">Head of Programme (HOD)</span>
                <span className="data-card-value highlight">{deptData.hod}</span>
              </div>

              <div className="info-section">
                <h4 className="info-section-title">Department Philosophy</h4>
                <p className="info-section-text">{deptData.philosophy}</p>
              </div>
              <div className="info-section">
                <h4 className="info-section-title">OBE Learning Vision</h4>
                <p className="info-section-text">{deptData.vision}</p>
              </div>
              <div className="info-section">
                <h4 className="info-section-title">OBE Learning Mission</h4>
                <p className="info-section-text">{deptData.mission}</p>
              </div>
            </div>
          </div>
        )
      }

      // History
      if (activeSubSection === 'history') {
        return (
          <div className="content-panel" key={`history-${activeDept}`}>
            <div className="content-panel-header">
              <div className="content-breadcrumb">
                <span onClick={() => handleSectionClick(null)}>Portal</span>
                <span className="content-breadcrumb-sep">›</span>
                <span onClick={() => handleSubSectionClick(null)}>{deptData.name}</span>
                <span className="content-breadcrumb-sep">›</span>
                <span className="content-breadcrumb-active">History</span>
              </div>

              <h2 className="content-panel-title">Programme History</h2>
            </div>
            <div className="content-panel-body">
              <p className="text-body text-indent">{deptData.history}</p>
              <div className="fact-callout">
                <div className="fact-callout-label">Historical Fact</div>
                <p className="fact-callout-text">
                  Both Computer Engineering and Electrical Engineering programs were established in September 2010 and share pioneering professors, representing a unified history of engineering innovation.
                </p>
              </div>
            </div>
          </div>
        )
      }

      // Objectives & Outcomes
      if (activeSubSection === 'objectives') {
        return (
          <div className="content-panel" key={`objectives-${activeDept}`}>
            <div className="content-panel-header">
              <div className="content-breadcrumb">
                <span onClick={() => handleSectionClick(null)}>Portal</span>
                <span className="content-breadcrumb-sep">›</span>
                <span onClick={() => handleSubSectionClick(null)}>{deptData.name}</span>
                <span className="content-breadcrumb-sep">›</span>
                <span className="content-breadcrumb-active">Objectives & Outcomes</span>
              </div>

              <h2 className="content-panel-title">Educational Objectives & Outcomes</h2>
            </div>
            <div className="content-panel-body">
              <div className="info-section">
                <h4 className="info-section-title">Programme Educational Objectives (PEOs)</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {deptData.peos.map((peo) => (
                    <div className="list-card" key={peo.id}>
                      <span className="list-card-badge">{peo.id}</span>
                      <p className="list-card-desc">{peo.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="info-section">
                <h4 className="info-section-title">12 COREN Programme Outcomes (POs)</h4>
                <div className="scroll-list">
                  {deptData.pos.map((po) => (
                    <div className="callout-block" key={po.id}>
                      <div className="callout-block-title">{po.id}: {po.name}</div>
                      <div className="callout-block-text">{po.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
      }

      // Handbooks
      if (activeSubSection === 'handbooks') {
        return (
          <div className="content-panel" key={`handbooks-${activeDept}`}>
            <div className="content-panel-header">
              <div className="content-breadcrumb">
                <span onClick={() => handleSectionClick(null)}>Portal</span>
                <span className="content-breadcrumb-sep">›</span>
                <span onClick={() => handleSubSectionClick(null)}>{deptData.name}</span>
                <span className="content-breadcrumb-sep">›</span>
                <span className="content-breadcrumb-active">Handbooks</span>
              </div>

              <h2 className="content-panel-title">Academic Handbooks & Regulations</h2>
            </div>
            <div className="content-panel-body">
              <div className="handbook-card">
                <div className="handbook-card-icon green">{icons.handbooks}</div>
                <div className="handbook-card-body">
                  <h3>{deptData.handbooks.student.title}</h3>
                  <p>{deptData.handbooks.student.desc}</p>
                </div>
              </div>
              <div className="handbook-card">
                <div className="handbook-card-icon amber">{icons.outlines}</div>
                <div className="handbook-card-body">
                  <h3>{deptData.handbooks.departmental.title}</h3>
                  <p>{deptData.handbooks.departmental.desc}</p>
                </div>
              </div>
            </div>
          </div>
        )
      }

      // Course Information (CLOs)
      if (activeSubSection === 'course_info') {
        const course = getCourseData()
        return (
          <div className="content-panel" key={`course-info-${activeCourse}`}>
            <div className="content-panel-header">
              <div className="content-breadcrumb">
                <span onClick={() => handleSectionClick(null)}>Portal</span>
                <span className="content-breadcrumb-sep">›</span>
                <span onClick={() => handleSubSectionClick(null)}>{deptData.name}</span>
                <span className="content-breadcrumb-sep">›</span>
                <span className="content-breadcrumb-active">Course Info</span>
              </div>

              <h2 className="content-panel-title">Course Level Information (CLOs)</h2>
            </div>
            <div className="content-panel-body">
              <div className="course-selector">
                <span className="course-selector-label">Select Course Model:</span>
                <div className="course-pills">
                  {deptData && Object.keys(deptData.courses).map((courseKey) => {
                    const c = deptData.courses[courseKey];
                    return (
                      <span
                        key={courseKey}
                        className={`course-pill ${activeCourse === courseKey ? 'active' : ''}`}
                        onClick={() => setActiveCourse(courseKey)}
                      >
                        {c.code}
                      </span>
                    );
                  })}
                </div>
              </div>

              {course && (
                <>
                  <div className="data-grid">
                    <div className="data-card">
                      <span className="data-card-label">Course Code</span>
                      <span className="data-card-value">{course.code}</span>
                    </div>
                    <div className="data-card">
                      <span className="data-card-label">Course Title</span>
                      <span className="data-card-value">{course.title}</span>
                    </div>
                    <div className="data-card">
                      <span className="data-card-label">Semester</span>
                      <span className="data-card-value">{course.semester}</span>
                    </div>
                    <div className="data-card">
                      <span className="data-card-label">Credit Units</span>
                      <span className="data-card-value">{course.credits} Units</span>
                    </div>
                    <div className="data-card">
                      <span className="data-card-label">Lecture Venue</span>
                      <span className="data-card-value">{course.location}</span>
                    </div>
                    <div className="data-card">
                      <span className="data-card-label">Pre-requisites</span>
                      <span className="data-card-value">{course.prerequisites}</span>
                    </div>
                  </div>

                  <div className="data-card featured">
                    <span className="data-card-label">Lecturer(s)</span>
                    <span className="data-card-value highlight">{course.lecturer}</span>
                  </div>

                  <div className="info-section">
                    <h4 className="info-section-title">Course Overview & Description</h4>
                    <p className="info-section-text">{course.overview}</p>
                  </div>

                  <div className="info-section">
                    <h4 className="info-section-title">Textbooks & Reference Materials</h4>
                    <ul className="styled-list">
                      {course.textbooks.map((bk, i) => (
                        <li key={i}>{bk}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="clo-container">
                    <h4 className="clo-header">Course Learning Outcomes (CLOs)</h4>
                    {course.clos.map((clo) => (
                      <div className="clo-item" key={clo.id}>
                        <span className="clo-id">{clo.id}:</span>
                        <span className="clo-desc">{clo.desc}</span>
                        <span className="clo-po-tag">{clo.pos}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )
      }

      // Course Outlines
      if (activeSubSection === 'outlines') {
        const course = getCourseData()
        return (
          <div className="content-panel" key={`outlines-${activeCourse}`}>
            <div className="content-panel-header">
              <div className="content-breadcrumb">
                <span onClick={() => handleSectionClick(null)}>Portal</span>
                <span className="content-breadcrumb-sep">›</span>
                <span onClick={() => handleSubSectionClick(null)}>{deptData.name}</span>
                <span className="content-breadcrumb-sep">›</span>
                <span className="content-breadcrumb-active">Outlines</span>
              </div>

              <h2 className="content-panel-title">Syllabus Course Outlines</h2>
            </div>
            <div className="content-panel-body">
              <div className="course-selector">
                <span className="course-selector-label">Select Course:</span>
                <div className="course-pills">
                  {deptData && Object.keys(deptData.courses).map((courseKey) => {
                    const c = deptData.courses[courseKey];
                    return (
                      <span
                        key={courseKey}
                        className={`course-pill ${activeCourse === courseKey ? 'active' : ''}`}
                        onClick={() => setActiveCourse(courseKey)}
                      >
                        {c.code}
                      </span>
                    );
                  })}
                </div>
              </div>

              {course && (
                <div className="info-section">
                  <h4 className="info-section-title">{course.code} Weekly Outline Breakdown</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {course.outlines.map((otl, i) => (
                      <div className="timeline-item" key={i}>
                        <div className="timeline-marker">
                          <div className="timeline-dot"></div>
                          <div className="timeline-line"></div>
                        </div>
                        <div className="timeline-content">{otl}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )
      }

      // Lecture Plans
      if (activeSubSection === 'lecture_plans') {
        const course = getCourseData()
        return (
          <div className="content-panel" key={`lecture-plans-${activeCourse}`}>
            <div className="content-panel-header">
              <div className="content-breadcrumb">
                <span onClick={() => handleSectionClick(null)}>Portal</span>
                <span className="content-breadcrumb-sep">›</span>
                <span onClick={() => handleSubSectionClick(null)}>{deptData.name}</span>
                <span className="content-breadcrumb-sep">›</span>
                <span className="content-breadcrumb-active">Lecture Plans</span>
              </div>

              <h2 className="content-panel-title">Academic Lecture Plans</h2>
            </div>
            <div className="content-panel-body">
              <div className="course-selector">
                <span className="course-selector-label">Select Course:</span>
                <div className="course-pills">
                  {deptData && Object.keys(deptData.courses).map((courseKey) => {
                    const c = deptData.courses[courseKey];
                    return (
                      <span
                        key={courseKey}
                        className={`course-pill ${activeCourse === courseKey ? 'active' : ''}`}
                        onClick={() => setActiveCourse(courseKey)}
                      >
                        {c.code}
                      </span>
                    );
                  })}
                </div>
              </div>

              {course && (
                <div className={`lecture-plan-card ${activeDept === 'electrical' ? 'accent' : ''}`}>
                  <h3>{course.code} Plan Compact</h3>
                  <p>{course.lecturePlans}</p>
                </div>
              )}
            </div>
          </div>
        )
      }

      // Mapping
      if (activeSubSection === 'mapping') {
        return (
          <div className="content-panel" key={`mapping-${activeDept}`}>
            <div className="content-panel-header">
              <div className="content-breadcrumb">
                <span onClick={() => handleSectionClick(null)}>Portal</span>
                <span className="content-breadcrumb-sep">›</span>
                <span onClick={() => handleSubSectionClick(null)}>{deptData.name}</span>
                <span className="content-breadcrumb-sep">›</span>
                <span className="content-breadcrumb-active">Mapping</span>
              </div>

              <h2 className="content-panel-title">Mapping of Courses to POs</h2>
            </div>
            <div className="content-panel-body">
              <p className="mapping-note">
                The following table shows the Outcomes-Based Education (OBE) mapping matrix, plotting core engineering subjects against COREN's 12 Programme Outcomes.
                <br />
                <strong>Key:</strong> 3 = High Emphasis; 2 = Medium Emphasis; 1 = Low Emphasis
              </p>

              <div className="mapping-table-wrapper">
                <table className="mapping-table">
                  <thead>
                    <tr>
                      <th>Course</th>
                      <th>PO1</th><th>PO2</th><th>PO3</th><th>PO4</th>
                      <th>PO5</th><th>PO6</th><th>PO7</th><th>PO8</th>
                      <th>PO9</th><th>PO10</th><th>PO11</th><th>PO12</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(deptData && deptData.mappings || []).map((map) => (
                      <tr key={map.course}>
                        <td style={{ fontWeight: 600, color: 'var(--primary-dark)' }}>{map.course}</td>
                        {[map.po1, map.po2, map.po3, map.po4, map.po5, map.po6, map.po7, map.po8, map.po9, map.po10, map.po11, map.po12].map((val, i) => (
                          <td key={i}>
                            <span className={`map-value ${val === 3 ? 'high' : val === 2 ? 'medium' : 'low'}`}>
                              {val}
                            </span>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )
      }
    }

    return null
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="app-container">
      {/* Premium Sticky Navbar — KEPT */}
      <nav className="navbar" id="app-navbar">
        <div className="brand-section" onClick={scrollToTop} style={{ cursor: 'pointer' }} title="Scroll to top">
          <img src={abuadLogo} alt="ABUAD Logo" className="logo-img" />
          <div className="brand-text">
            <span className="brand-title">College of Engineering</span>
            <span className="brand-subtitle">Afe Babalola University</span>
          </div>
        </div>

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
      </nav>

      {/* Main Layout: Sidebar + Content */}
      <main className="main-content">
        <div 
          className={`mobile-overlay ${isMobileMenuOpen ? 'mobile-open' : ''}`}
          onClick={() => setIsMobileMenuOpen(false)}
        />
        {/* SIDEBAR */}
        <aside className={`sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`} id="sidebar-nav">
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
                <span className="sidebar-item-label">General College Info</span>
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
          </div>

          {/* Department selection (shown when OBE is active) */}
          {activeSection === 'obe' && (
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

              {/* Sub-sections when a department is selected */}
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
          )}
        </aside>

        {/* CONTENT AREA */}
        <div className="content-area" id="content-area">
          {renderContent()}
        </div>
      </main>

      {/* Floating Action Button */}
      <button 
        className={`fab-back-to-top ${showBackToTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
      </button>
    </div>
  )
}

export default App
