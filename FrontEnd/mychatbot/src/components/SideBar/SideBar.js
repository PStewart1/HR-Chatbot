// Sidebar.js
import React from 'react';
import './Sidebar.css';

// Importa las imágenes
import ptoImage from '../../assets/images/pto.png';
import benefitsImage from '../../assets/images/benefits.png';
import resignationImage from '../../assets/images/resignation.png';
import salaryImage from '../../assets/images/salaryrange.png';
import workHoursImage from '../../assets/images/hours.png';
import remoteWorkImage from '../../assets/images/remotely.png';
import careerPathImage from '../../assets/images/path.png';

function Sidebar({ onQuestionSelect }) {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">FAQ</h2>
      <button onClick={() => onQuestionSelect('How much PTO can I get in a year?')}>
        <img src={ptoImage} alt="PTO Inquiry"/>
        <span> PTO </span>
      </button>
      <button onClick={() => onQuestionSelect('What benefits are offered?')}>
        <img src={benefitsImage} alt="Benefits Inquiry"/>
        <span> Benefits </span>
      </button>
      <button onClick={() => onQuestionSelect('How do I resign from my position?')}>
        <img src={resignationImage} alt="Resignation Inquiry"/>
        <span> Resignation </span>
      </button>
      <button onClick={() => onQuestionSelect('What is the salary range for my role?')}>
        <img src={salaryImage} alt="Salary Inquiry" />
        <span> Salary </span>
      </button>
      <button onClick={() => onQuestionSelect('What are the standard work hours?')}>
        <img src={workHoursImage} alt="Work Hours Inquiry" />
        <span> Work Hours </span>
      </button>
      <button onClick={() => onQuestionSelect('Can I work remotely?')}>
        <img src={remoteWorkImage} alt="Remote Work Inquiry" />
        <span> Remote Work </span>
      </button>
      <button onClick={() => onQuestionSelect('What are the career path options?')}>
        <img src={careerPathImage} alt="Career Path Inquiry" />
        <span> Career Path </span>
      </button>
      {/* Agrega más botones según sea necesario */}
    </div>
  );
}

export default Sidebar;
