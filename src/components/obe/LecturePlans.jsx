import { sortCourseKeys } from '../../hooks/useHashRoute'

export default function LecturePlans({
  deptData,
  activeDept,
  activeCourse,
  courseData,
  handleCourseSelect,
  handleSectionClick,
  handleSubSectionClick,
}) {
  return (
    <div className="content-panel" key={`lecture-plans-${activeCourse}`}>
      <div className="content-panel-header">
        <div className="content-breadcrumb">
          <span onClick={() => handleSectionClick(null)} style={{ cursor: 'pointer' }}>Portal</span>
          <span className="content-breadcrumb-sep">›</span>
          <span onClick={() => handleSubSectionClick(null)} style={{ cursor: 'pointer' }}>{deptData.name}</span>
          <span className="content-breadcrumb-sep">›</span>
          <span className="content-breadcrumb-active">Lecture Plans</span>
        </div>

        <h2 className="content-panel-title">Academic Lecture Plans</h2>
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
          <div className={`lecture-plan-card ${activeDept === 'electrical' ? 'accent' : ''}`}>
            <h3>{courseData.code} Plan Compact</h3>
            <p>{courseData.lecturePlans}</p>
          </div>
        )}
      </div>
    </div>
  );
}
