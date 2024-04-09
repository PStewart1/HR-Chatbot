// App.js
//
//import React, { useState } from 'react';
//import SideBar from './components/SideBar/SideBar';
//import ChatWindow from './components/ChatWindow/ChatWindow';
//import InputBar from './components/InputBar/InputBar';
//import LinkComponent from './components/LinkComponent/LinkComponent';
//import './App.css';
//
//const predefinedAnswers = {
//  'How much PTO can I get in a year?': 'You are entitled to 20 days of PTO per year.',
//  'What benefits are offered?': 'We offer a range of benefits including health care, retirement plans, and more.',
//  'How do I resign from my position?': 'You can resign by submitting a written notice to HR.',
//  'What is the salary range for my role?': 'You salary will be xxxx',
//  'What are the standard work hours?': 'Our standard work hours are from 9 AM to 5 PM, Monday through Friday.',
//  'Can I work remotely?':'We offer flexible remote work options based on job roles and performance evaluations',
//  'What are the career path options?':'We have a structured career development program with opportunities for advancement and skill enhancement.',
//};
//
//const App = () => {
//  const [messages, setMessages] = useState([]);
//  const handleSendMessage = (text) => {
//    const newMessage = { id: Date.now(), text: text, sender: 'user' };
//    setMessages(currentMessages => {
//        console.log("Before update:", currentMessages);
//        const updatedMessages = [...currentMessages, newMessage];
//        console.log("After update:", updatedMessages);
//        return updatedMessages;
//    });
//};
//
//const handleQuestionSelect = (question) => {
//  console.log("Question selected:", question);
//  const userMessage = { id: Date.now(), text: question, sender: 'user' };
//  setMessages(currentMessages => [...currentMessages, userMessage]);
//
//  const answer = predefinedAnswers[question];
//  console.log("Answer found:", answer);  // Para depurar
//  if (answer) {
//      setTimeout(() => {
//          setMessages(currentMessages => [
//              ...currentMessages,
//              { id: Date.now() + 1, text: answer, sender: 'bot' }
//          ]);
//      }, 1000);
//  }    
//};
//
//  return (
//    <div className="App" >
//      <SideBar onQuestionSelect={handleQuestionSelect} />
//      <div className="chat-area">
//        <ChatWindow messages={messages} />
//        <InputBar onSendMessage={handleSendMessage} />
//      </div>
//      <LinkComponent />
//    </div>
//  );
//  }
//export default App;
//


// App.js
import React, { useState } from 'react';
import axios from 'axios';
import SideBar from './components/SideBar/SideBar';
import ChatWindow from './components/ChatWindow/ChatWindow';
import InputBar from './components/InputBar/InputBar';
import LinkComponent from './components/LinkComponent/LinkComponent';
import './App.css';

//import { BASE_URL } from './config';  

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

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

    // Consulta al backend para una respuesta
    api.get(`/your-endpoint?question=${encodeURIComponent(question)}`)
      .then(response => {
        const backendAnswer = response.data.answer; // Asegúrate de que esto coincida con la estructura de tu respuesta del backend
        if (backendAnswer && backendAnswer !== predefinedAnswer) {
          setTimeout(() => {
            setMessages(currentMessages => [
                ...currentMessages,
                { id: Date.now() + 2, text: backendAnswer, sender: 'bot' }
            ]);
          }, 2000);
        }
      })
      .catch(error => {
        console.error('Error fetching from backend:', error);
      });
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
