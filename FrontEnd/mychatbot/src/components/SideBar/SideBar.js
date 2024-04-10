// Sidebar.js
import React from 'react';
import './Sidebar.css';

// Importa las imágenes
// import ptoImage from '../../assets/images/pto.png';
// import benefitsImage from '../../assets/images/benefits.png';
// import resignationImage from '../../assets/images/resignation.png';
// import salaryImage from '../../assets/images/salaryrange.png';
// import workHoursImage from '../../assets/images/hours.png';
// import remoteWorkImage from '../../assets/images/remotely.png';
// import careerPathImage from '../../assets/images/path.png';

function Sidebar({ onQuestionSelect }) {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">FAQ's</h2>
      <ul className='sidebar-buttons'>
        <li onClick={() => onQuestionSelect('How much PTO do I get?')}>
          {/* <img src={ptoImage} alt="PTO"/>  */}
          <span> PTO  </span>
        </li>
        <li onClick={() => onQuestionSelect('What benefits are offered?')}>
          {/* <img src={benefitsImage} alt="Benefits"/>  */}
          <span> Benefits  </span>
        </li>
        <li onClick={() => onQuestionSelect('How do I request time off?')}>
          {/* <img src={resignationImage} alt="Resignation"/>  */}
          <span> Time-off </span>
        </li>
        <li onClick={() => onQuestionSelect('What is the dress code policy?')}>
          {/* <img src={workHoursImage} alt="Work Hours" />  */}
          <span> Dress code</span>
        </li>
        <li onClick={() => onQuestionSelect('Can I work remotely?')}>
          {/* <img src={remoteWorkImage} alt="Remote Work" />  */}
          <span> Remote work </span>
        </li>
        <li onClick={() => onQuestionSelect('Can I request a leave of absence for personal reasons?')}>
          {/* <img src={careerPathImage} alt="Career Path" />  */}
          <span> Leave of absence</span>
        </li>
      </ul>
      {/* Agrega más botones según sea necesario */}
    </div>
  );
}

export default Sidebar;
