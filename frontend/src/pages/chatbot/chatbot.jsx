import React, { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { ChefHat } from 'lucide-react';
import './chatbot.css';


const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, sender: 'user' }];
    setMessages(newMessages);
    setInput('');

    try {
      const response = await axios.post(
        'https://cooking-assistent-bend.onrender.com/generate-recipe',
        { ingredients: input.split(',').map((item) => item.trim()) }
      );
      setMessages([...newMessages, { text: response.data.recipe, sender: 'bot' }]);
    } catch (error) {
      setMessages([...newMessages, { text: "I'm sorry, I couldn't generate a recipe.", sender: 'bot' }]);
    }
  };
  // Outer container styles


  return (
    <div className="maincon">
      
      <div className="chat-container">
      
      <h2 className="heading"><ChefHat className="w-5 h-5 mr-2" />YOUR AI CHEF</h2>
      
      <div className="chat-box">
        
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender === 'user' ? 'user-message' : 'bot-message'}>
            {msg.sender === 'bot' ? (
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            ) : (
              msg.text
            )}
          </div>
        ))}
      </div>
      <div className="input-box">
        <input
          type="text"
          placeholder="Enter ingredients (comma separated)..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
    </div>
    
    
    
  );
};

export default Chatbot;
