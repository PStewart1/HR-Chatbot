// HeaderBar.js
import React from 'react';
import './HeaderBar.css';
import logo from '../../assets/images/EMSlogo2-removebg.png';

const HeaderBar = () => {
  return (
    <div className="header-bar">
      <span>Chat with Us 💬</span>
      <img src={logo} alt="Company Logo" className="header-logo" />
    </div>
  );
};

export default HeaderBar;
