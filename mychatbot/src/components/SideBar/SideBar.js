// Sidebar.js
import React from 'react';
import './Sidebar.css';

function Sidebar({ onQuestionSelect }) {
  return (
    <div className="sidebar">
      <button onClick={() => onQuestionSelect('How much PTO can I get in a year?')}>PTO Inquiry</button>
      <button onClick={() => onQuestionSelect('What benefits are offered?')}>Benefits Inquiry</button>
      <button onClick={() => onQuestionSelect('How do I resign from my position?')}>Resignation Inquiry</button>
      {/* Agrega más botones o enlaces según sea necesario */}
    </div>
  );
}

export default Sidebar;
