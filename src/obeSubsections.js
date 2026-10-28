// Single source of truth for OBE sub-section pages.
//
// Both the sidebar (navigation) and the search bar (index) read from this list,
// so adding a page here automatically adds it to both on the next deploy.
// Data-driven entries (courses, PEOs, POs, handbooks) are indexed separately
// from collegeData at runtime and need no manual updates.
//
// Fields:
//   key            hash-route sub-section key (must match App.jsx branches)
//   label          sidebar label + search result title
//   hint           sidebar hint text
//   blurb          search result subtitle
//   keywords       extra search terms
//   group          'hod' (HOD Access) or 'staff' (Staff & OBE Access)
//   courseSpecific pages open on a course; search links to the first course
export const OBE_SUBSECTIONS = [
  {
    key: 'history',
    label: 'Programme History',
    hint: 'Founding & milestones',
    blurb: 'Founding, milestones & historical background',
    keywords: 'history programme founding milestones background',
    group: 'hod',
    courseSpecific: false,
  },
  {
    key: 'objectives',
    label: 'Objectives & Outcomes',
    hint: 'PEOs, POs & philosophy',
    blurb: 'Programme objectives, outcomes & philosophy',
    keywords: 'objectives outcomes peo po philosophy educational',
    group: 'hod',
    courseSpecific: false,
  },
  {
    key: 'handbooks',
    label: 'Handbooks & Regulations',
    hint: 'Student & lab guides',
    blurb: 'Student handbook and lab regulations',
    keywords: 'handbook regulation guide student lab download pdf',
    group: 'hod',
    courseSpecific: false,
  },
  {
    key: 'course_info',
    label: 'Course Information',
    hint: 'Credits, CLOs & compacts',
    blurb: 'Credits, CLOs and course compacts',
    keywords: 'course information credits clo compact details',
    group: 'staff',
    courseSpecific: true,
  },
  {
    key: 'outlines',
    label: 'Course Outlines',
    hint: 'Weekly topic breakdown',
    blurb: 'Weekly topic breakdown for all courses',
    keywords: 'course outline weekly topics breakdown syllabus',
    group: 'staff',
    courseSpecific: true,
  },
  {
    key: 'lecture_plans',
    label: 'Lecture Plans',
    hint: 'Schedules & assessments',
    blurb: 'Schedules and assessments for all courses',
    keywords: 'lecture plan schedule assessment timetable',
    group: 'staff',
    courseSpecific: true,
  },
  {
    key: 'mapping',
    label: 'Mapping to POs',
    hint: 'OBE emphasis matrix',
    blurb: 'PO-to-CLO emphasis matrix for all courses',
    keywords: 'obe mapping matrix emphasis po clo',
    group: 'staff',
    courseSpecific: false,
  },
  {
    key: 'clo',
    label: 'CLO Attainment',
    hint: 'Scores to dept report',
    blurb: 'Compute course and departmental CLO attainment from exam scores',
    keywords: 'clo attainment calculator computation scores percentage departmental report analysis assessment',
    group: 'staff',
    courseSpecific: false,
  },
];
