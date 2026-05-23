import hodElecCompImg from '../../assets/HOD_Electrical_Computer.jpeg';

export default function DeptProfile({ deptData, activeDept, handleSectionClick, handleSubSectionClick }) {
  return (
    <div className="content-panel" key={`dept-${activeDept}`}>
      <div className="content-panel-header">
        <div className="content-breadcrumb">
          <span onClick={() => handleSectionClick(null)} style={{ cursor: 'pointer' }}>Portal</span>
          <span className="content-breadcrumb-sep">›</span>
          <span onClick={() => handleSectionClick('obe')} style={{ cursor: 'pointer' }}>OBE</span>
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

        { (activeDept === 'computer' || activeDept === 'electrical') ? (
          <div className="provost-card" style={{ margin: '20px 0' }}>
            <img className="provost-avatar" src={hodElecCompImg} alt={deptData.hod} />
            <div className="provost-name">{deptData.hod.split(',')[0]}</div>
            <div className="provost-role">Head of Programme (HOD)</div>
            <div className="provost-subtitle">{deptData.name}, ABUAD</div>
          </div>
        ) : (
          <div className="data-card featured">
            <span className="data-card-label">Head of Programme (HOD)</span>
            <span className="data-card-value highlight">{deptData.hod}</span>
          </div>
        )}

        <div className="info-section">
          <h4 className="info-section-title">Department Philosophy</h4>
          <p className="info-section-text">{deptData.philosophy}</p>
        </div>
        <div className="info-section">
          <h4 className="info-section-title">Vision</h4>
          <p className="info-section-text">{deptData.vision}</p>
        </div>
        <div className="info-section">
          <h4 className="info-section-title">Mission</h4>
          <p className="info-section-text">{deptData.mission}</p>
        </div>
      </div>
    </div>
  );
}
