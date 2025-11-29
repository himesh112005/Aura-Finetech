import React, { useState, useRef, useEffect } from 'react';
import { generateContent } from '../services/geminiService';
import './AIChat.css';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your personal financial AI assistant. How can I help you optimize your finances today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    const prompt = `You are a helpful financial advisor AI for a fintech app. 
    User asks: "${inputText}". 
    Provide a concise, helpful, and financially sound response. Keep it under 100 words if possible.`;

    const aiResponseText = await generateContent(prompt);

    const aiMessage: Message = {
      id: Date.now() + 1,
      text: aiResponseText,
      sender: 'ai',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMessage]);
    setIsLoading(false);
  };

  return (
    <div className="chat-container">
      <div className="chat-header-main">
        <h2>AI Financial Assistant</h2>
        <span className="status-indicator">● Online</span>
      </div>
      
      <div className="chat-window">
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.sender}`}>
            <div className="message-bubble">
              {msg.text}
            </div>
            <span className="timestamp">
              {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        ))}
        {isLoading && (
          <div className="message ai">
            <div className="message-bubble typing">
              <span>•</span><span>•</span><span>•</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form className="chat-input-area" onSubmit={handleSendMessage}>
        <input 
          type="text" 
          value={inputText} 
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask about savings, investments, or budget..."
          disabled={isLoading}
        />
        <button type="submit" className="btn-send" disabled={isLoading || !inputText.trim()}>
          Send
        </button>
      </form>
    </div>
  );
};

export default AIChat;
