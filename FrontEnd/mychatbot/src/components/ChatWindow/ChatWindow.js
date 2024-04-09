import React, { useState } from 'react';
import './ChatWindow.css';
import HeaderBar from '../HeaderBar/HeaderBar'; 

const ChatWindow = ({ messages }) => {
  // console.log('Messages in ChatWindow.js:', messages);
  return (
    <div className="chat-window">
      <div className="chat-header">
        Chat with Us 💬
      </div>
      {messages.map((message) => (
        <div key={message.id} className={`message ${message.sender}`}>
          {message.text}
        </div>
      ))}
      {/* Aquí agregarías tu componente InputBar y manejarías el envío de mensajes */}
    </div>
  );
};

export default ChatWindow;
