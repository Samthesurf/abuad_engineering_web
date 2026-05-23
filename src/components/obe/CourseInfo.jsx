import { sortCourseKeys } from '../../hooks/useHashRoute'

export default function CourseInfo({
  deptData,
  activeDept,
  activeCourse,
  courseData,
  handleCourseSelect,
  handleSectionClick,
  handleSubSectionClick,
}) {
  return (
    <div className="content-panel" key={`course-info-${activeCourse}`}>
      <div className="content-panel-header">
        <div className="content-breadcrumb">
          <span onClick={() => handleSectionClick(null)} style={{ cursor: 'pointer' }}>Portal</span>
          <span className="content-breadcrumb-sep">›</span>
          <span onClick={() => handleSubSectionClick(null)} style={{ cursor: 'pointer' }}>{deptData.name}</span>
          <span className="content-breadcrumb-sep">›</span>
          <span className="content-breadcrumb-active">Course Info</span>
        </div>

        <h2 className="content-panel-title">Course Level Information (CLOs)</h2>
      </div>
      <div className="content-panel-body">
        <div className="course-selector">
          <span className="course-selector-label">Select Course Model:</span>
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
          <>
            <div className="data-grid">
              <div className="data-card">
                <span className="data-card-label">Course Code</span>
                <span className="data-card-value">{courseData.code}</span>
              </div>
              <div className="data-card">
                <span className="data-card-label">Course Title</span>
                <span className="data-card-value">{courseData.title}</span>
              </div>
              <div className="data-card">
                <span className="data-card-label">Semester</span>
                <span className="data-card-value">{courseData.semester}</span>
              </div>
              <div className="data-card">
                <span className="data-card-label">Credit Units</span>
                <span className="data-card-value">{courseData.credits === '--' ? '--' : `${courseData.credits} Units`}</span>
              </div>
              <div className="data-card">
                <span className="data-card-label">Lecture Venue</span>
                <span className="data-card-value">{courseData.location}</span>
              </div>
              <div className="data-card">
                <span className="data-card-label">Pre-requisites</span>
                <span className="data-card-value">{courseData.prerequisites}</span>
              </div>
            </div>

            <div className="data-card featured">
              <span className="data-card-label">Lecturer(s)</span>
              <span className="data-card-value highlight">{courseData.lecturer}</span>
            </div>

            <div className="info-section">
              <h4 className="info-section-title">Course Overview & Description</h4>
              <p className="info-section-text">{courseData.overview}</p>
            </div>

            {courseData.textbooks && courseData.textbooks.length > 0 && (
              <div className="info-section">
                <h4 className="info-section-title">Textbooks & Reference Materials</h4>
                <ul className="styled-list">
                  {courseData.textbooks.map((bk, i) => (
                    <li key={i}>{bk}</li>
                  ))}
                </ul>
              </div>
            )}

            {courseData.clos && courseData.clos.length > 0 && (
              <div className="clo-container">
                <h4 className="clo-header">Course Learning Outcomes (CLOs)</h4>
                {courseData.clos.map((clo) => (
                  <div className="clo-item" key={clo.id}>
                    <span className="clo-id">{clo.id}:</span>
                    <span className="clo-desc">{clo.desc}</span>
                    <span className="clo-po-tag">{clo.pos}</span>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
