export default function ObeMapping({ deptData, activeDept, handleSectionClick, handleSubSectionClick }) {
  return (
    <div className="content-panel" key={`mapping-${activeDept}`}>
      <div className="content-panel-header">
        <div className="content-breadcrumb">
          <span onClick={() => handleSectionClick(null)} style={{ cursor: 'pointer' }}>Portal</span>
          <span className="content-breadcrumb-sep">›</span>
          <span onClick={() => handleSubSectionClick(null)} style={{ cursor: 'pointer' }}>{deptData.name}</span>
          <span className="content-breadcrumb-sep">›</span>
          <span className="content-breadcrumb-active">Mapping</span>
        </div>

        <h2 className="content-panel-title">Mapping of Courses to POs</h2>
      </div>
      <div className="content-panel-body">
        <p className="mapping-note">
          The following table shows the Outcomes-Based Education (OBE) mapping matrix, plotting core engineering subjects against COREN's 12 Programme Outcomes.
          <br />
          <strong>Key:</strong> 3 = High Emphasis; 2 = Medium Emphasis; 1 = Low Emphasis
        </p>

        <div className="mapping-table-wrapper">
          <table className="mapping-table">
            <thead>
              <tr>
                <th>Course</th>
                <th>PO1</th><th>PO2</th><th>PO3</th><th>PO4</th>
                <th>PO5</th><th>PO6</th><th>PO7</th><th>PO8</th>
                <th>PO9</th><th>PO10</th><th>PO11</th><th>PO12</th>
              </tr>
            </thead>
            <tbody>
              {(deptData && deptData.mappings || []).map((map) => (
                <tr key={map.course}>
                  <td style={{ fontWeight: 600, color: 'var(--primary-dark)' }}>{map.course}</td>
                  {[map.po1, map.po2, map.po3, map.po4, map.po5, map.po6, map.po7, map.po8, map.po9, map.po10, map.po11, map.po12].map((val, i) => (
                    <td key={i}>
                      <span className={`map-value ${val === 3 ? 'high' : val === 2 ? 'medium' : 'low'}`}>
                        {val}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
