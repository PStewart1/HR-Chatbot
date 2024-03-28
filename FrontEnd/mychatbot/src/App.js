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
  // ... y así sucesivamente para cada pregunta
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
    const answer = predefinedAnswers[question];
    if (answer) {
      handleSendMessage(answer);
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
};

export default App;
