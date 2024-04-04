// InputBar.js
import React, { useState } from 'react';
import './InputBar.css';

const InputBar = ({ onSendMessage }) => {
  const [inputText, setInputText] = useState('');

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSendClick = () => {
    if (inputText.trim() !== '') {
      onSendMessage(inputText);
      setInputText(''); 
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && inputText.trim() !== '') {
      onSendMessage(inputText);
      setInputText(''); 
    }
  };

  return (
    <div className="input-bar">
      <input
        type="text"
        value={inputText}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Ask me anything..."
      />
      <button onClick={handleSendClick}>🚀</button>
    </div>
  );
};

export default InputBar;
