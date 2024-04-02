import React from 'react';
import './ChatWindow.css';
import HeaderBar from '../HeaderBar/HeaderBar'; 

const ChatWindow = ({ messages }) => {
  console.log('Messages in ChatWindow:', messages);
  return (
    <div className="chat-container">
      <HeaderBar />
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
