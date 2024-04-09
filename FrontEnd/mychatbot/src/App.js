// App.js
import React, { useState } from 'react';
import SideBar from './components/SideBar/SideBar';
import ChatWindow from './components/ChatWindow/ChatWindow';
import InputBar from './components/InputBar/InputBar';
import LinkComponent from './components/LinkComponent/LinkComponent';
import './App.css';

const predefinedAnswers = {
  'How much PTO can I get in a year?': 'You are entitled to 20 days of PTO per year.',
  'What benefits are offered?': 'We offer a range of benefits including health care, retirement plans, and more.',
  'How do I resign from my position?': 'You can resign by submitting a written notice to HR.',
  'What is the salary range for my role?': 'You salary will be xxxx',
  'What are the standard work hours?': 'Our standard work hours are from 9 AM to 5 PM, Monday through Friday.',
  'Can I work remotely?':'We offer flexible remote work options based on job roles and performance evaluations',
  'What are the career path options?':'We have a structured career development program with opportunities for advancement and skill enhancement.',
};

function App() {
  const [messages, setMessages] = useState([]);

  fetch('https://hr-chatbot-ildr.onrender.com', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ query: messages }),
  mode: 'no-cors'
})
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
      // Handle successful response here
    })
    .catch(error => {
      console.error('Error:', error);
      // Handle errors here
});

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
  console.log("Question selected:", question);
  const userMessage = { id: Date.now(), text: question, sender: 'user' };
  setMessages(currentMessages => [...currentMessages, userMessage]);

  const answer = predefinedAnswers[question];
  console.log("Answer found:", answer);  // Para depurar
  if (answer) {
      setTimeout(() => {
          setMessages(currentMessages => [
              ...currentMessages,
              { id: Date.now() + 1, text: answer, sender: 'bot' }
          ]);
      }, 1000);
  }    
};



  return (
    <div className="App" >
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