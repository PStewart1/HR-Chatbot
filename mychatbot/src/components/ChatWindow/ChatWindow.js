import React, { useState } from 'react';
import './ChatWindow.css';

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);

  const sendMessage = (text) => {
    // Aquí conectarías con tu backend para enviar el texto
    // y luego actualizarías el estado con la respuesta del chatbot
    const newMessage = { id: Date.now(), text: text, sender: 'user' };
    setMessages([...messages, newMessage]);

    // Simular una respuesta del chatbot
    setTimeout(() => {
      const botResponse = { id: Date.now(), text: '¡Hola! ¿En qué puedo ayudarte?', sender: 'bot' };
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    }, 1000);
  };

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
