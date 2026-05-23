const icons = {
  handbooks: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    </svg>
  ),
  outlines: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
    </svg>
  ),
};

export default function Handbooks({ deptData, activeDept, handleSectionClick, handleSubSectionClick }) {
  return (
    <div className="content-panel" key={`handbooks-${activeDept}`}>
      <div className="content-panel-header">
        <div className="content-breadcrumb">
          <span onClick={() => handleSectionClick(null)} style={{ cursor: 'pointer' }}>Portal</span>
          <span className="content-breadcrumb-sep">›</span>
          <span onClick={() => handleSubSectionClick(null)} style={{ cursor: 'pointer' }}>{deptData.name}</span>
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
  );
}
