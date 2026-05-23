import { useState, useEffect } from 'react'
import { collegeData } from './collegeData'
import { useHashRoute, getFirstCourse } from './hooks/useHashRoute'

// Layout components
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import FloatingActionButton from './components/FloatingActionButton'

// Section components
import WelcomeHero from './components/WelcomeHero'
import ProvostDesk from './components/ProvostDesk'
import GeneralInfo from './components/GeneralInfo'

// OBE components
import DeptProfile from './components/obe/DeptProfile'
import ProgHistory from './components/obe/ProgHistory'
import ObjectivesOutcomes from './components/obe/ObjectivesOutcomes'
import Handbooks from './components/obe/Handbooks'
import CourseInfo from './components/obe/CourseInfo'
import CourseOutlines from './components/obe/CourseOutlines'
import LecturePlans from './components/obe/LecturePlans'
import ObeMapping from './components/obe/ObeMapping'

function App() {
  const { route, navigate } = useHashRoute();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const { section: activeSection, dept: activeDept, subSection: activeSubSection, course: activeCourse } = route;

  // Scroll listener for FAB
  useEffect(() => {
    const handleScroll = () => {
      const contentEl = document.getElementById('content-area');
      const scrollPos = (contentEl ? contentEl.scrollTop : 0) || window.scrollY;
      setShowBackToTop(scrollPos > 300);
    };

    window.addEventListener('scroll', handleScroll);
    const contentEl = document.getElementById('content-area');
    if (contentEl) {
      contentEl.addEventListener('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (contentEl) {
        contentEl.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const deptData = activeDept ? collegeData[activeDept] : null;

  // Get the active course data depending on activeDept
  const getCourseData = () => {
    if (!activeDept || !collegeData[activeDept]) return null;
    const course = collegeData[activeDept].courses[activeCourse] || Object.values(collegeData[activeDept].courses)[0] || null;
    // Only override ABUAD-COE and ABUAD-EEE courses (New Horizon certification courses).
    // ABUAD-GET courses (e.g. Strength of Materials) are legitimate university courses with real data.
    if (course && course.code && (
      course.code.startsWith('ABUAD-COE') || course.code.startsWith('ABUAD-EEE')
    )) {
      return {
        ...course,
        credits: '--',
        location: 'ICT New Horizon Lab',
        lecturer: 'New Horizon staff',
        overview: 'This professional certification course is taught by our Industry partners',
        textbooks: [],
        clos: []
      };
    }
    return course;
  };

  const courseData = getCourseData();

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
  };

  const handleWelcomeObeClick = () => {
    navigate('obe', activeDept || 'computer', null, null);
    
    if (window.innerWidth <= 768) {
      setIsMobileMenuOpen(true);
    } else {
      setTimeout(() => {
        const contentEl = document.getElementById('content-area');
        if (contentEl) contentEl.scrollTo({ top: 0, behavior: 'smooth' });
      }, 50);
    }
  };

  const handleSectionClick = (section) => {
    if (activeSection === section && section !== 'obe') {
      // Toggle off if clicking same non-obe section
      navigate(null, null, null, null);
      return;
    }
    if (section === 'obe') {
      navigate('obe', activeDept || 'computer', null, null);
    } else {
      navigate(section, null, null, null);
      scrollToContentOnMobile();
    }
  };

  const handleDeptSelect = (dept) => {
    navigate('obe', dept, null, null);
    scrollToContentOnMobile();
  };

  const handleSubSectionClick = (sub) => {
    const isCourseSection = ['course_info', 'outlines', 'lecture_plans'].includes(sub);
    const targetCourse = isCourseSection ? (activeCourse || getFirstCourse(activeDept)) : null;
    navigate('obe', activeDept, sub, targetCourse);
    scrollToContentOnMobile();
  };

  const handleCourseSelect = (courseKey) => {
    navigate('obe', activeDept, activeSubSection, courseKey);
  };

  // Render content based on active state
  const renderContent = () => {
    // Welcome hero state
    if (!activeSection) {
      return (
        <WelcomeHero
          handleSectionClick={handleSectionClick}
          handleWelcomeObeClick={handleWelcomeObeClick}
        />
      );
    }

    // Provost section
    if (activeSection === 'provost') {
      return (
        <ProvostDesk
          handleSectionClick={handleSectionClick}
        />
      );
    }

    // General info section
    if (activeSection === 'general') {
      return (
        <GeneralInfo
          generalData={collegeData.general}
          handleSectionClick={handleSectionClick}
        />
      );
    }

    // OBE sections
    if (activeSection === 'obe' && activeDept) {
      // Default: department profile
      if (!activeSubSection) {
        return (
          <DeptProfile
            deptData={deptData}
            activeDept={activeDept}
            handleSectionClick={handleSectionClick}
            handleSubSectionClick={handleSubSectionClick}
          />
        );
      }

      // History
      if (activeSubSection === 'history') {
        return (
          <ProgHistory
            deptData={deptData}
            activeDept={activeDept}
            handleSectionClick={handleSectionClick}
            handleSubSectionClick={handleSubSectionClick}
          />
        );
      }

      // Objectives & Outcomes
      if (activeSubSection === 'objectives') {
        return (
          <ObjectivesOutcomes
            deptData={deptData}
            activeDept={activeDept}
            handleSectionClick={handleSectionClick}
            handleSubSectionClick={handleSubSectionClick}
          />
        );
      }

      // Handbooks
      if (activeSubSection === 'handbooks') {
        return (
          <Handbooks
            deptData={deptData}
            activeDept={activeDept}
            handleSectionClick={handleSectionClick}
            handleSubSectionClick={handleSubSectionClick}
          />
        );
      }

      // Course Information (CLOs)
      if (activeSubSection === 'course_info') {
        return (
          <CourseInfo
            deptData={deptData}
            activeDept={activeDept}
            activeCourse={activeCourse}
            courseData={courseData}
            handleCourseSelect={handleCourseSelect}
            handleSectionClick={handleSectionClick}
            handleSubSectionClick={handleSubSectionClick}
          />
        );
      }

      // Course Outlines
      if (activeSubSection === 'outlines') {
        return (
          <CourseOutlines
            deptData={deptData}
            activeDept={activeDept}
            activeCourse={activeCourse}
            courseData={courseData}
            handleCourseSelect={handleCourseSelect}
            handleSectionClick={handleSectionClick}
            handleSubSectionClick={handleSubSectionClick}
          />
        );
      }

      // Lecture Plans
      if (activeSubSection === 'lecture_plans') {
        return (
          <LecturePlans
            deptData={deptData}
            activeDept={activeDept}
            activeCourse={activeCourse}
            courseData={courseData}
            handleCourseSelect={handleCourseSelect}
            handleSectionClick={handleSectionClick}
            handleSubSectionClick={handleSubSectionClick}
          />
        );
      }

      // Mapping
      if (activeSubSection === 'mapping') {
        return (
          <ObeMapping
            deptData={deptData}
            activeDept={activeDept}
            handleSectionClick={handleSectionClick}
            handleSubSectionClick={handleSubSectionClick}
          />
        );
      }
    }

    return null;
  };

  const handleLogoClick = () => {
    navigate(null, null, null, null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-container">
      {/* Sticky Navbar */}
      <Navbar
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        onLogoClick={handleLogoClick}
      />

      {/* Main Layout: Sidebar + Content */}
      <main className="main-content">
        <Sidebar
          activeSection={activeSection}
          activeDept={activeDept}
          activeSubSection={activeSubSection}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          handleSectionClick={handleSectionClick}
          handleDeptSelect={handleDeptSelect}
          handleSubSectionClick={handleSubSectionClick}
        />

        {/* CONTENT AREA */}
        <div className="content-area" id="content-area">
          {renderContent()}
        </div>
      </main>

      {/* Floating Action Button */}
      <FloatingActionButton
        showBackToTop={showBackToTop}
        onScrollToTop={scrollToTop}
      />
    </div>
  );
}

export default App;
