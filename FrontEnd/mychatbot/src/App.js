// App.js
import React, { useState } from 'react';
import SideBar from './components/SideBar/SideBar';
import ChatWindow from './components/ChatWindow/ChatWindow';
import InputBar from './components/InputBar/InputBar';
import './App.css';

const predefinedAnswers = {
  'How much PTO can I get in a year?': 'You are entitled to 20 days of PTO per year.',
  'What benefits are offered?': 'We offer a range of benefits including health care, retirement plans, and more.',
  'How do I resign from my position?': 'You can resign by submitting a written notice to HR.',
  'What is the salary range for my role?': 'You salary will be xxxx',
  'What are the standard work hours?': 'Our standard work hours are from 9 AM to 5 PM, Monday through Friday.',
  'Can I Work remotely?':'We offer flexible remote work options based on job roles and performance evaluations',
  'What are the career path options?':'We have a structured career development program with opportunities for advancement and skill enhancement.',
};

const App = () => {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (text) => {
    const newMessage = { id: Date.now(), text: text, sender: 'user' };
    setMessages(currentMessages => {
        console.log("Before update:", currentMessages);
        const updatedMessages = [...currentMessages, newMessage];
        console.log("After update:", updatedMessages);
        return updatedMessages;
    });
};

const handleQuestionSelect = (question) => {
  const userMessage = { id: Date.now(), text: question, sender: 'user' };
  // Agregar inmediatamente la pregunta al chat
  setMessages(messages => [...messages, userMessage]);

  const answer = predefinedAnswers[question];
  if (answer) {
      setTimeout(() => {
          const botResponse = { id: Date.now() + 1, text: answer, sender: 'bot' };
          setMessages(messages => [...messages, botResponse]);
      }, 1000); // Ajusta este tiempo según sea necesario
  }    
};

  return (
    <div className="App">
      <SideBar />
      <div className="chat-area">
        <ChatWindow messages={messages} />
        <InputBar onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default App;
