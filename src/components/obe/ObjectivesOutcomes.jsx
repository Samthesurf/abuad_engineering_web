export default function ObjectivesOutcomes({ deptData, activeDept, handleSectionClick, handleSubSectionClick }) {
  return (
    <div className="content-panel" key={`objectives-${activeDept}`}>
      <div className="content-panel-header">
        <div className="content-breadcrumb">
          <span onClick={() => handleSectionClick(null)} style={{ cursor: 'pointer' }}>Portal</span>
          <span className="content-breadcrumb-sep">›</span>
          <span onClick={() => handleSubSectionClick(null)} style={{ cursor: 'pointer' }}>{deptData.name}</span>
          <span className="content-breadcrumb-sep">›</span>
          <span className="content-breadcrumb-active">Objectives & Outcomes</span>
        </div>

        <h2 className="content-panel-title">Educational Objectives & Outcomes</h2>
      </div>
      <div className="content-panel-body">
        <div className="info-section">
          <h4 className="info-section-title">Programme Educational Objectives (PEOs)</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {deptData.peos.map((peo) => (
              <div className="list-card" key={peo.id}>
                <span className="list-card-badge">{peo.id}</span>
                <p className="list-card-desc">{peo.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="info-section">
          <h4 className="info-section-title">12 COREN Programme Outcomes (POs)</h4>
          <div className="scroll-list">
            {deptData.pos.map((po) => (
              <div className="callout-block" key={po.id}>
                <div className="callout-block-title">{po.id}: {po.name}</div>
                <div className="callout-block-text">{po.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
