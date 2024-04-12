// LinkComponent.js
import React from 'react';
import './LinkComponent.css';

const LinkComponent = () => {
  return (
    <div className="link-container">
      <h2>Resources</h2>
      <div className="link-list">
        <a href="https://drive.google.com/file/d/1oIElusoelLIrOxubNZaWF9NvNfzTUol8/view?usp=drive_link" target="_blank" rel="noopener noreferrer">
          New Client Onboarding
        </a>
        <a href="https://drive.google.com/file/d/1PlTemjOIkRN5KsfdyYb3ka9o8LdYqRTD/view?usp=drive_link" target="_blank" rel="noopener noreferrer">
          Employee Handbook
        </a>
        <a href="https://drive.google.com/file/d/1CTmQRzruRisCQU3xj3B5e1vBVnqZRYG3/view?usp=drive_link" target="_blank" rel="noopener noreferrer">
          Sample FAQ
        </a>
        <a href="https://calendly.com/krystalspeed/discoverycall" target="_blank" rel="noopener noreferrer">
          Calendly 
        </a>
      </div>
    </div>
  );
};

export default LinkComponent;
