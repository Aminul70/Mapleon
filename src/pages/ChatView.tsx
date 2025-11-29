import React, { useState } from 'react';
import { ArrowLeftIcon, SendIcon, ImageIcon, SmileIcon } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'business';
  timestamp: string;
}
export function ChatView() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    businessName,
    businessImage
  } = location.state || {
    businessName: 'Business',
    businessImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200'
  };
  const [messages, setMessages] = useState<ChatMessage[]>([{
    id: '1',
    text: 'Hi! Thanks for reaching out. How can we help you today?',
    sender: 'business',
    timestamp: '10:30 AM'
  }, {
    id: '2',
    text: 'I would like to book a table for tonight',
    sender: 'user',
    timestamp: '10:32 AM'
  }, {
    id: '3',
    text: 'Sounds good! What time works best for you?',
    sender: 'business',
    timestamp: '10:33 AM'
  }]);
  const [inputText, setInputText] = useState('');
  const handleSend = () => {
    if (inputText.trim()) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        text: inputText,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit'
        })
      };
      setMessages([...messages, newMessage]);
      setInputText('');
      // Simulate business response
      setTimeout(() => {
        const response: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: 'Got it! Let me check our availability for you.',
          sender: 'business',
          timestamp: new Date().toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit'
          })
        };
        setMessages(prev => [...prev, response]);
      }, 1000);
    }
  };
  return <div className="h-screen flex flex-col bg-mapleon-gray">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate('/messages')} className="p-2 -ml-2 active:scale-95 transition-transform">
          <ArrowLeftIcon size={24} className="text-mapleon-slate" />
        </button>
        <img src={businessImage} alt={businessName} className="w-10 h-10 rounded-full object-cover" />
        <div className="flex-1">
          <h2 className="font-bold text-mapleon-slate">{businessName}</h2>
          <p className="text-xs text-green-600">● Active now</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map(message => <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${message.sender === 'user' ? 'bg-gradient-to-r from-mapleon-coral to-mapleon-pink text-white rounded-br-sm' : 'bg-white text-mapleon-slate rounded-bl-sm shadow-sm'}`}>
              <p className="text-sm">{message.text}</p>
              <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-white/70' : 'text-gray-400'}`}>
                {message.timestamp}
              </p>
            </div>
          </div>)}
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-400 active:scale-95 transition-transform">
            <ImageIcon size={24} />
          </button>
          <button className="p-2 text-gray-400 active:scale-95 transition-transform">
            <SmileIcon size={24} />
          </button>
          <input type="text" value={inputText} onChange={e => setInputText(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSend()} placeholder="Type a message..." className="flex-1 px-4 py-2.5 rounded-full bg-mapleon-gray border-none focus:outline-none focus:ring-2 focus:ring-mapleon-coral/30" />
          <button onClick={handleSend} disabled={!inputText.trim()} className={`p-2.5 rounded-full transition-all ${inputText.trim() ? 'bg-gradient-to-r from-mapleon-coral to-mapleon-pink text-white active:scale-95' : 'bg-gray-200 text-gray-400'}`}>
            <SendIcon size={20} />
          </button>
        </div>
      </div>
    </div>;
}