import React, { useEffect, useRef } from 'react';
import './ChatWindow.css';


const ChatWindow = ({ messages, setMessages }) => {
  const messagesEndRef = useRef(null)
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }
  useEffect(() => {
    scrollToBottom()
  }, [messages]);

  const handleResponse = (answer) => {
    let response = '';
    const hrEmail = 'hello@yourhrstrategist.com';
    if (answer) {
      const userMessage = { id: Date.now(), text: 'Yes', sender: 'user' };
      setMessages(currentMessages => [...currentMessages, userMessage]);
      response = "Great! I'm glad I could be of help to you today."
    } else {
      const userMessage = { id: Date.now(), text: 'No', sender: 'user' };
      setMessages(currentMessages => [...currentMessages, userMessage]);
      response = `I am sorry to hear that. You can contact your HR representative at \t ${hrEmail} ,\n or click the Calendly link to set up an appoinment.`
    }
    setTimeout(() => {
      setMessages(currentMessages => [
          ...currentMessages,
          { id: Date.now() + 1, text: response, sender: 'bot' }
      ]);
    }, 2000);
  }

  let lastMessage = messages[messages.length - 1];

  return (
    <div className="chat-container">
      <div className="chat-window">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
        {(lastMessage.sender === 'auto') ? 
          <div className="response">
            <button className='yes-button' onClick={() => handleResponse(true)}>Yes</button>
            <button className='no-button' onClick={() => handleResponse(false)}>No</button>
          </div>
        : null}
      </div>
    </div>
  );
};

export default ChatWindow;
