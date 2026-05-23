import { useState, useEffect } from 'react';
import { collegeData } from '../collegeData';

// Sort course keys purely by numeric code so all courses (including ABUAD certs) are in numerical order
export const sortCourseKeys = (keys) => {
  return [...keys].sort((a, b) => {
    // Extract the last numeric portion from the key (e.g. ABUADCOE102 -> 102, COE302 -> 302, CPE112 -> 112)
    const aNum = parseInt((a.match(/(\d+)$/) || ['0','0'])[1], 10);
    const bNum = parseInt((b.match(/(\d+)$/) || ['0','0'])[1], 10);
    if (aNum !== bNum) return aNum - bNum;
    // If same number, sort alphabetically (e.g. ABUADCOE102 vs CPE102)
    return a.localeCompare(b);
  });
};

// Helper to get the first course for a department
export const getFirstCourse = (dept) => {
  if (!dept || !collegeData[dept] || !collegeData[dept].courses) return null;
  const sorted = sortCourseKeys(Object.keys(collegeData[dept].courses));
  return sorted.length > 0 ? sorted[0] : null;
};

// Parse current window hash location into routing states
export const parseHash = (hash) => {
  const path = hash.replace(/^#\/?/, '');
  if (!path) {
    return { section: null, dept: null, subSection: null, course: null };
  }

  const parts = path.split('/');
  const section = parts[0] || null;
  
  if (section === 'obe') {
    const dept = parts[1] || 'computer';
    const subSection = parts[2] || null;
    let course = parts[3] || null;
    
    // Fallback default course if it's a course-specific sub-section but no course is in hash
    if (!course && subSection && ['course_info', 'outlines', 'lecture_plans'].includes(subSection)) {
      course = getFirstCourse(dept);
    }
    return { section, dept, subSection, course };
  }

  return { section, dept: null, subSection: null, course: null };
};

// Navigate to a route by updating the window location hash
export const navigate = (section, dept, subSection, course) => {
  if (!section) {
    // For welcome page, completely clear the hash from the URL
    if (window.location.hash && window.location.hash !== '#') {
      window.history.pushState(null, '', window.location.pathname + window.location.search);
      // Manually dispatch hashchange event to trigger the React state update
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    }
    return;
  }

  let newHash = '#' + section;
  if (section === 'obe' && dept) {
    newHash += `/${dept}`;
    if (subSection) {
      newHash += `/${subSection}`;
      if (course) {
        newHash += `/${course}`;
      }
    }
  }
  window.location.hash = newHash;
};

export const useHashRoute = () => {
  // Unified route state synced with browser URL hash
  const [route, setRoute] = useState(() => parseHash(window.location.hash));

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(parseHash(window.location.hash));
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return {
    route,
    navigate,
    getFirstCourse,
    sortCourseKeys
  };
};
