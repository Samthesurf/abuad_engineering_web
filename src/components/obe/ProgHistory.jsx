export default function ProgHistory({ deptData, activeDept, handleSectionClick, handleSubSectionClick }) {
  return (
    <div className="content-panel" key={`history-${activeDept}`}>
      <div className="content-panel-header">
        <div className="content-breadcrumb">
          <span onClick={() => handleSectionClick(null)} style={{ cursor: 'pointer' }}>Portal</span>
          <span className="content-breadcrumb-sep">›</span>
          <span onClick={() => handleSubSectionClick(null)} style={{ cursor: 'pointer' }}>{deptData.name}</span>
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
  );
}
