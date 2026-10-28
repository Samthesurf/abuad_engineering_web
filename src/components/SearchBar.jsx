import { useState, useEffect, useRef, useMemo } from 'react';
import { collegeData } from '../collegeData';
import { OBE_SUBSECTIONS } from '../obeSubsections';
import { navigate as hashNavigate, getFirstCourse } from '../hooks/useHashRoute';

// SVG icons
const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// Category config for badges and icons
const CATEGORY_CONFIG = {
  course: { label: 'Course', color: '#2563eb', bg: '#eff6ff' },
  peo: { label: 'PEO', color: '#7c3aed', bg: '#f5f3ff' },
  po: { label: 'PO', color: '#059669', bg: '#ecfdf5' },
  section: { label: 'Section', color: '#d97706', bg: '#fffbeb' },
  department: { label: 'Dept', color: '#dc2626', bg: '#fef2f2' },
  info: { label: 'Info', color: '#0891b2', bg: '#ecfeff' },
  handbook: { label: 'Handbook', color: '#be185d', bg: '#fdf2f8' },
};

/**
 * Build a flat searchable index from collegeData.
 * Each entry has: { title, subtitle, category, keywords, route }
 * route = { section, dept, subSection, course }
 */
function buildSearchIndex() {
  const items = [];

  // -- Static pages --
  items.push({
    title: "Provost's Desk",
    subtitle: 'Message and guidelines from the Provost',
    category: 'section',
    keywords: 'provost desk message guidelines',
    route: { section: 'provost', dept: null, subSection: null, course: null },
  });

  items.push({
    title: 'General College Information',
    subtitle: 'Vision, mission, quality assurance & core goals',
    category: 'section',
    keywords: 'general college information vision mission quality assurance qa core goals establishment',
    route: { section: 'general', dept: null, subSection: null, course: null },
  });

  items.push({
    title: 'Media Gallery',
    subtitle: 'Photos and events',
    category: 'section',
    keywords: 'gallery photos events images media pictures',
    route: { section: 'gallery', dept: null, subSection: null, course: null },
  });

  // -- General info sub-items --
  const general = collegeData.general;
  if (general) {
    items.push({
      title: 'University Vision & Mission',
      subtitle: general.vision?.substring(0, 90) + '…',
      category: 'info',
      keywords: `vision mission ${general.vision} ${general.mission}`,
      route: { section: 'general', dept: null, subSection: null, course: null },
    });

    if (general.qaPrinciples) {
      general.qaPrinciples.forEach((qa) => {
        items.push({
          title: qa.title,
          subtitle: qa.desc.substring(0, 100) + '…',
          category: 'info',
          keywords: `qa quality assurance criterion ${qa.title} ${qa.desc}`,
          route: { section: 'general', dept: null, subSection: null, course: null },
        });
      });
    }
  }

  // -- Per-department data --
  const depts = ['computer', 'electrical'];
  const deptLabels = { computer: 'Computer Eng.', electrical: 'Electrical/Electronics Eng.' };

  for (const dept of depts) {
    const d = collegeData[dept];
    if (!d) continue;

    // Department profile
    items.push({
      title: d.name,
      subtitle: `${d.abbreviation} — ${d.duration}`,
      category: 'department',
      keywords: `${d.name} ${d.abbreviation} department profile ${dept} hod ${d.hod}`,
      route: { section: 'obe', dept, subSection: null, course: null },
    });

    // Department vision/mission
    items.push({
      title: `${deptLabels[dept]} — Vision & Mission`,
      subtitle: d.vision?.substring(0, 90) + '…',
      category: 'info',
      keywords: `${dept} vision mission philosophy ${d.vision} ${d.mission} ${d.philosophy}`,
      route: { section: 'obe', dept, subSection: null, course: null },
    });

    // OBE sub-section pages (shared config: sidebar + search stay in sync automatically)
    OBE_SUBSECTIONS.forEach((sub) => {
      const extra = sub.key === 'history' && d.history ? ` ${d.history}` : '';
      items.push({
        title: `${sub.label} — ${deptLabels[dept]}`,
        subtitle: sub.blurb,
        category: 'section',
        keywords: `${dept} ${sub.key} ${sub.label} ${sub.keywords}${extra}`,
        route: {
          section: 'obe',
          dept,
          subSection: sub.key,
          course: sub.courseSpecific ? getFirstCourse(dept) : null,
        },
      });
    });

    // PEOs
    if (d.peos) {
      d.peos.forEach((peo) => {
        items.push({
          title: `${peo.id} — ${deptLabels[dept]}`,
          subtitle: peo.desc.substring(0, 120) + (peo.desc.length > 120 ? '…' : ''),
          category: 'peo',
          keywords: `${dept} peo programme educational objective ${peo.id} ${peo.desc}`,
          route: { section: 'obe', dept, subSection: 'objectives', course: null },
        });
      });
    }

    // POs
    if (d.pos) {
      d.pos.forEach((po) => {
        items.push({
          title: `${po.id}: ${po.name} — ${deptLabels[dept]}`,
          subtitle: po.desc.substring(0, 120) + (po.desc.length > 120 ? '…' : ''),
          category: 'po',
          keywords: `${dept} po programme outcome ${po.id} ${po.name} ${po.desc}`,
          route: { section: 'obe', dept, subSection: 'objectives', course: null },
        });
      });
    }

    // Handbooks
    if (d.handbooks) {
      Object.values(d.handbooks).forEach((hb) => {
        items.push({
          title: `${hb.title}`,
          subtitle: hb.desc.substring(0, 110) + '…',
          category: 'handbook',
          keywords: `${dept} handbook ${hb.title} ${hb.desc}`,
          route: { section: 'obe', dept, subSection: 'handbooks', course: null },
        });
      });
    }

    // Courses
    if (d.courses) {
      Object.entries(d.courses).forEach(([key, course]) => {
        items.push({
          title: `${course.code} — ${course.title}`,
          subtitle: `${course.semester} · ${course.credits} credits · ${course.lecturer || 'TBA'}`,
          category: 'course',
          keywords: `${dept} course ${course.code} ${course.title} ${course.semester} ${course.lecturer || ''} ${course.overview || ''} ${key}`.toLowerCase(),
          route: { section: 'obe', dept, subSection: 'course_info', course: key },
        });
      });
    }
  }

  return items;
}

// Category boost: when the query matches a page title directly, that page should
// outrank courses that merely mention the term in their description text.
const CATEGORY_BOOST = {
  section: 4,
  department: 4,
  info: 2,
  handbook: 2,
  peo: 2,
  po: 2,
  course: 0,
};

// Simple fuzzy matching: split query into tokens, check all tokens present in target
function matchScore(query, item) {
  const q = query.toLowerCase().trim();
  if (!q) return 0;

  const tokens = q.split(/\s+/).filter(Boolean);
  const target = `${item.title} ${item.subtitle} ${item.keywords}`.toLowerCase();

  let matched = 0;
  for (const token of tokens) {
    if (target.includes(token)) {
      matched++;
    }
  }

  if (matched === 0) return 0;

  // Boost for title matches
  const titleLower = item.title.toLowerCase();
  let titleBoost = 0;
  for (const token of tokens) {
    if (titleLower.includes(token)) titleBoost += 2;
  }

  // Boost for exact-ish matches (query is a substring of title)
  if (titleLower.includes(q)) {
    titleBoost += 5;
    titleBoost += CATEGORY_BOOST[item.category] || 0;
  }

  return (matched / tokens.length) * 10 + titleBoost;
}

export default function SearchBar({ onNavigate }) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const resultsRef = useRef(null);

  // Build index once
  const searchIndex = useMemo(() => buildSearchIndex(), []);

  // Filter results
  const results = useMemo(() => {
    if (!query.trim()) return [];

    const scored = searchIndex
      .map((item) => ({ ...item, score: matchScore(query, item) }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 12);

    return scored;
  }, [query, searchIndex]);

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [results]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Keyboard shortcut: Ctrl/Cmd + K to focus search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Scroll active item into view
  useEffect(() => {
    if (resultsRef.current) {
      const activeEl = resultsRef.current.querySelector('.search-result-item.active');
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  const handleSelect = (item) => {
    const { section, dept, subSection, course } = item.route;
    hashNavigate(section, dept, subSection, course);
    if (onNavigate) onNavigate();
    setQuery('');
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e) => {
    if (!isOpen || results.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleSelect(results[selectedIndex]);
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setIsOpen(true);
  };

  const clearSearch = () => {
    setQuery('');
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const showResults = isOpen && query.trim().length > 0;

  return (
    <div className="search-container" ref={containerRef}>
      <div className={`search-input-wrapper ${isOpen && query ? 'search-active' : ''}`}>
        <span className="search-icon"><SearchIcon /></span>
        <input
          ref={inputRef}
          type="text"
          className="search-input"
          placeholder="Search courses, PEOs, sections…"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          id="global-search-input"
        />
        {query ? (
          <button className="search-clear-btn" onClick={clearSearch} aria-label="Clear search">
            <CloseIcon />
          </button>
        ) : (
          <kbd className="search-shortcut">Ctrl K</kbd>
        )}
      </div>

      {showResults && (
        <div className="search-results-dropdown" ref={resultsRef}>
          {results.length === 0 ? (
            <div className="search-no-results">
              <span className="search-no-results-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4">
                  <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="8" y1="8" x2="14" y2="14" /><line x1="14" y1="8" x2="8" y2="14" />
                </svg>
              </span>
              <span>No results for "<strong>{query}</strong>"</span>
              <span className="search-no-results-hint">Try a different search term</span>
            </div>
          ) : (
            <>
              <div className="search-results-header">
                {results.length} result{results.length !== 1 ? 's' : ''} found
              </div>
              <div className="search-results-list">
                {results.map((item, index) => {
                  const cat = CATEGORY_CONFIG[item.category] || CATEGORY_CONFIG.section;
                  return (
                    <div
                      key={`${item.title}-${index}`}
                      className={`search-result-item ${index === selectedIndex ? 'active' : ''}`}
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setSelectedIndex(index)}
                    >
                      <div className="search-result-badge" style={{ color: cat.color, background: cat.bg }}>
                        {cat.label}
                      </div>
                      <div className="search-result-text">
                        <span className="search-result-title">{highlightMatch(item.title, query)}</span>
                        <span className="search-result-subtitle">{highlightMatch(item.subtitle, query)}</span>
                      </div>
                      <span className="search-result-arrow">→</span>
                    </div>
                  );
                })}
              </div>
              <div className="search-results-footer">
                <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
                <span><kbd>↵</kbd> select</span>
                <span><kbd>esc</kbd> close</span>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

// Highlight matching text segments
function highlightMatch(text, query) {
  if (!query.trim() || !text) return text;

  const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
  // Build a regex that matches any of the query tokens
  const escaped = tokens.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const regex = new RegExp(`(${escaped.join('|')})`, 'gi');

  const parts = text.split(regex);
  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark key={i} className="search-highlight">{part}</mark>
    ) : (
      part
    )
  );
}
