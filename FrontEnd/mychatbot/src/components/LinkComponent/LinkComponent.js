// LinkComponent.js
import React from 'react';
import './LinkComponent.css';

const LinkComponent = () => {
  return (
    <div className="link-container">
      <a href="https://docs.google.com/document/d/1c4hNRwKZSZ8Cv0JGvk4ZYy9dCgDZo5D28x1sLsSohjA/edit?usp=sharing" target="_blank" rel="noopener noreferrer">
        New Client Onboarding
      </a>
      <a href="https://docs.google.com/document/d/165tkapgKh4f_OX_-OgG2PdN5gQ0Suu2-fGf_RzwgMsw/edit?usp=sharing" target="_blank" rel="noopener noreferrer">
        Employee Handbook
      </a>
      <a href="https://docs.google.com/document/d/1iWD45tn8DlCR3iG71RMfRWuhRaYQsxRipziUzZFP-xM/edit?usp=sharing" target="_blank" rel="noopener noreferrer">
        Sample FAQ
      </a>
      <a href="https://docs.google.com/document/d/1iWD45tn8DlCR3iG71RMfRWuhRaYQsxRipziUzZFP-xM/edit?usp=sharing" target="_blank" rel="noopener noreferrer">
        Resources 
      </a>
      {/* Otros enlaces importantes */}
    </div>
  );
};

export default LinkComponent;
