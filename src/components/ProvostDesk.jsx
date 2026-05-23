import provostImg from '../assets/Provost.jpeg'

export default function ProvostDesk({ handleSectionClick }) {
  return (
    <div className="content-panel" key="provost">
      <div className="content-panel-header">
        <div className="content-breadcrumb">
          <span onClick={() => handleSectionClick(null)} style={{ cursor: 'pointer' }}>Portal</span>
          <span className="content-breadcrumb-sep">›</span>
          <span className="content-breadcrumb-active">Provost's Desk</span>
        </div>

        <h2 className="content-panel-title">From the Provost's Desk</h2>
      </div>
      <div className="content-panel-body">
        <div className="provost-card" id="provost-message-panel">
          <img className="provost-avatar" src={provostImg} alt="Engr. Prof. Femi M. Onibonoje" />
          <div className="provost-name">Engr. Prof. Femi M. Onibonoje</div>
          <div className="provost-role">Office of the Provost</div>
          <div className="provost-subtitle">College of Engineering, ABUAD</div>
          <p className="provost-text">
            "Greetings to all stakeholders in Engineering Education, within and outside Afe Babalola University. Our College of Engineering maintains the absolute highest benchmark of technical training and Outcomes-Based Education (OBE) to equip you with standard professional expertise, leadership values, and research competence. It is my pleasure for you to utilize this interactive platform to explore our course learning maps."
          </p>
        </div>
      </div>
    </div>
  );
}
