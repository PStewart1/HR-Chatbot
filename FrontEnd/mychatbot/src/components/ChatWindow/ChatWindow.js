import React from 'react';
import './ChatWindow.css';


const ChatWindow = ({ messages }) => {
  // console.log('Messages in ChatWindow.js:', messages);
  return (
    <div className="chat-container">
      
      <div className="chat-window">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatWindow;
