import { sortCourseKeys } from '../../hooks/useHashRoute'

export default function CourseOutlines({
  deptData,
  activeDept,
  activeCourse,
  courseData,
  handleCourseSelect,
  handleSectionClick,
  handleSubSectionClick,
}) {
  return (
    <div className="content-panel" key={`outlines-${activeCourse}`}>
      <div className="content-panel-header">
        <div className="content-breadcrumb">
          <span onClick={() => handleSectionClick(null)} style={{ cursor: 'pointer' }}>Portal</span>
          <span className="content-breadcrumb-sep">›</span>
          <span onClick={() => handleSubSectionClick(null)} style={{ cursor: 'pointer' }}>{deptData.name}</span>
          <span className="content-breadcrumb-sep">›</span>
          <span className="content-breadcrumb-active">Outlines</span>
        </div>

        <h2 className="content-panel-title">Syllabus Course Outlines</h2>
      </div>
      <div className="content-panel-body">
        <div className="course-selector">
          <span className="course-selector-label">Select Course:</span>
          <div className="course-pills">
            {deptData && sortCourseKeys(Object.keys(deptData.courses)).map((courseKey) => {
              const c = deptData.courses[courseKey];
              return (
                <span
                  key={courseKey}
                  className={`course-pill ${activeCourse === courseKey ? 'active' : ''}`}
                  onClick={() => handleCourseSelect(courseKey)}
                >
                  {c.code}
                </span>
              );
            })}
          </div>
        </div>

        {courseData && (
          <div className="info-section">
            <h4 className="info-section-title">{courseData.code} Weekly Outline Breakdown</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {courseData.outlines.map((otl, i) => (
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
  );
}
