import React from 'react';
import './ChatWindow.css';
import HeaderBar from '../HeaderBar/HeaderBar'; 

// Asegúrate de aceptar `messages` como una prop
const ChatWindow = ({ messages }) => {
  console.log('Messages in ChatWindow:', messages); // Aquí agregas el console.log

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
