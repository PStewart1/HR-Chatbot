// App.js
import React, { useState } from 'react';
import axios from 'axios';
import SideBar from './components/SideBar/SideBar';
import ChatWindow from './components/ChatWindow/ChatWindow';
import InputBar from './components/InputBar/InputBar';
import LinkComponent from './components/LinkComponent/LinkComponent';
import HeaderBar from './components/HeaderBar/HeaderBar'; 
import './App.css';

const predefinedAnswers = {
  'How much PTO do I get?': 'We offer unlimited PTO, but we encourage responsible time management and ensuring adequate coverage for your responsibilities when taking time off.',
  'What benefits are offered?': ' We provide 100% employer-paid medical, dental, and vision insurance for all full-time employees. Our healthcare provider is Aetna.',
  'How do I request time off?': 'You can request time off by submitting a request through our HR system, Gusto. As we offer unlimited PTO, please ensure adequate coverage for your responsibilities when planning your time off.',
  'What is the dress code policy?': 'We maintain a business casual dress code, with flexibility for remote work environments.',
  'Can I work remotely?': 'Yes, remote work is the default arrangement for all employees. We trust our team to manage their time effectively and maintain open communication while working remotely.',
  'Can I request a leave of absence for personal reasons?': 'Employees may request a leave of absence for personal reasons, subject to approval by HR and management.',
};

const App = () => {
  const firstMessage = { id: Date.now(), text: 'Hello! How can I help you today?', sender: 'bot' };
  const [messages, setMessages] = useState([firstMessage]);

  const handleSendMessage = (text) => {
    const newMessage = { id: Date.now(), text: text, sender: 'user' };
    setMessages(currentMessages => [...currentMessages, newMessage]);
    axios.post(process.env.REACT_APP_API_URL, { query: text })
      .then(response => {
        console.log('Response from backend: ', response);
        const botMessage = { id: Date.now(), text: response.data, sender: 'bot' };
        setMessages(currentMessages => [...currentMessages, botMessage]);
        setTimeout(() => {
          setMessages(currentMessages => [
              ...currentMessages,
              { id: Date.now(), text: 'Was this helpful?', sender: 'auto' }
          ]);
        }, 3000);
      })
      .catch(error => {
        const errMessage = { id: Date.now(), text: "I'm sorry, I'm having a little trouble at the moment. Please try again later.", sender: 'bot' };
        setMessages(currentMessages => [...currentMessages, errMessage]);
        console.error('Error fetching from backend: ', error);
      });
  };

  const handleQuestionSelect = (question) => {
    console.log("Question selected: ", question);
    const userMessage = { id: Date.now(), text: question, sender: 'user' };
    setMessages(currentMessages => [...currentMessages, userMessage]);

    const predefinedAnswer = predefinedAnswers[question];
    if (predefinedAnswer) {
      setTimeout(() => {
        setMessages(currentMessages => [
            ...currentMessages,
            { id: Date.now() + 1, text: predefinedAnswer, sender: 'bot' }
        ]);
      }, 1000);
    }
  };

  return (
    <div className="App">
      <div className="App-header">
        <HeaderBar />
      </div>
      <div className="App-body">
        <div className="App-sidebar">
          <SideBar onQuestionSelect={handleQuestionSelect} />
        </div>
        <div className="App-chat-area">
          <ChatWindow messages={messages} setMessages={setMessages} />
          <InputBar onSendMessage={handleSendMessage} />
        </div>
        <div className="App-links">
          <LinkComponent />
        </div>
      </div>
      <div className="App-footer">
        <SideBar onQuestionSelect={handleQuestionSelect} />
        <LinkComponent />
      </div>
    </div>
  );
}

export default App;
