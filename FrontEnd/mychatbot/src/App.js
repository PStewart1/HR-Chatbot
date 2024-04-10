// App.js
import React, { useState } from 'react';
import axios from 'axios';
import SideBar from './components/SideBar/SideBar';
import ChatWindow from './components/ChatWindow/ChatWindow';
import InputBar from './components/InputBar/InputBar';
import LinkComponent from './components/LinkComponent/LinkComponent';
import './App.css';

const predefinedAnswers = {
  'How much PTO can I get in a year?': 'You are entitled to 20 days of PTO per year.',
  'What benefits are offered?': 'We offer a range of benefits including health care, retirement plans, and more.',
  'How do I resign from my position?': 'You can resign by submitting a written notice to HR.',
  'What is the salary range for my role?': 'Your salary will be xxxxx.',
  'What are the standard work hours?': 'Our standard work hours are from 9 AM to 5 PM, Monday through Friday.',
  'Can I work remotely?': 'We offer flexible remote work options based on job roles and performance evaluations.',
  'What are the career path options?': 'We have a structured career development program with opportunities for advancement and skill enhancement.',
};

const App = () => {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (text) => {
    const newMessage = { id: Date.now(), text: text, sender: 'user' };
    setMessages(currentMessages => [...currentMessages, newMessage]);
    axios.post(process.env.REACT_APP_API_URL, { query: text })
      .then(response => {
        console.log('Response from backend:', response);
        const botMessage = { id: Date.now() + 1, text: response.data, sender: 'bot' };
        setMessages(currentMessages => [...currentMessages, botMessage]);
      })
      .catch(error => {
        console.error('Error fetching from backend:', error);
      });
  };

  const handleQuestionSelect = (question) => {
    console.log("Question selected:", question);
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
      <SideBar onQuestionSelect={handleQuestionSelect} />
      <div className="chat-area">
        <ChatWindow messages={messages} />
        <InputBar onSendMessage={handleSendMessage} />
      </div>
      <LinkComponent />
    </div>
  );
}

export default App;
