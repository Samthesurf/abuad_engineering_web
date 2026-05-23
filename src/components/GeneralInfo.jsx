export default function GeneralInfo({ generalData, handleSectionClick }) {
  return (
    <div className="content-panel" key="general">
      <div className="content-panel-header">
        <div className="content-breadcrumb">
          <span onClick={() => handleSectionClick(null)} style={{ cursor: 'pointer' }}>Portal</span>
          <span className="content-breadcrumb-sep">›</span>
          <span className="content-breadcrumb-active">General Info</span>
        </div>

        <h2 className="content-panel-title">{generalData.title}</h2>
        <p className="content-panel-subtitle">{generalData.subtitle}</p>
      </div>
      <div className="content-panel-body">
        <div className="data-grid">
          <div className="data-card">
            <span className="data-card-label">University Founded</span>
            <span className="data-card-value">{generalData.establishment.university}</span>
          </div>
          <div className="data-card">
            <span className="data-card-label">College Established</span>
            <span className="data-card-value">{generalData.establishment.college}</span>
          </div>
          <div className="data-card">
            <span className="data-card-label">Vice Chancellor</span>
            <span className="data-card-value">{generalData.establishment.vc}</span>
          </div>
          <div className="data-card">
            <span className="data-card-label">Founder & Chancellor</span>
            <span className="data-card-value">{generalData.establishment.founder}</span>
          </div>
        </div>

        <div className="info-section">
          <h4 className="info-section-title">
            <span className="info-section-title-icon">✦</span>
            University Academic Vision
          </h4>
          <p className="info-section-text">{generalData.vision}</p>
        </div>

        <div className="info-section">
          <h4 className="info-section-title">
            <span className="info-section-title-icon">◎</span>
            University Academic Mission
          </h4>
          <p className="info-section-text">{generalData.mission}</p>
        </div>

        <div className="info-section">
          <h4 className="info-section-title">
            <span className="info-section-title-icon">▸</span>
            University Core Goals
          </h4>
          <ul className="styled-list">
            {generalData.coreGoals.map((goal, idx) => (
              <li key={idx}>{goal}</li>
            ))}
          </ul>
        </div>

        <div className="info-section">
          <h4 className="info-section-title">
            <span className="info-section-title-icon">◆</span>
            OBE Criteria & Quality Benchmarks
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {generalData.qaPrinciples.map((princ, idx) => (
              <div className="callout-block" key={idx}>
                <div className="callout-block-title">{princ.title}</div>
                <div className="callout-block-text">{princ.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
