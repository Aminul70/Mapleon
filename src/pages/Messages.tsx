import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '../components/BottomNav';
import { mockMessages } from '../utils/mockData';
export function Messages() {
  const navigate = useNavigate();
  const handleMessageClick = (message: (typeof mockMessages)[0]) => {
    navigate('/chat', {
      state: {
        businessName: message.businessName,
        businessImage: message.profileImage
      }
    });
  };
  return <div className="min-h-screen bg-mapleon-gray pb-24 overflow-x-hidden">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-10 p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl font-bold text-mapleon-slate">
            Messages
          </h1>
          <button className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-mapleon-gray flex items-center justify-center overflow-hidden active:scale-95 transition-transform">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200" alt="Profile" className="w-full h-full object-cover" />
          </button>
        </div>
      </div>

      {/* Messages List */}
      <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
        {mockMessages.map(message => <button key={message.id} onClick={() => handleMessageClick(message)} className="w-full neumorphic-card rounded-3xl p-4 flex items-center gap-3 sm:gap-4 active:shadow-lg transition-all">
            <img src={message.profileImage} alt={message.businessName} className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover shadow-inner flex-shrink-0" />

            <div className="flex-1 min-w-0 text-left">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-bold text-mapleon-slate truncate text-sm sm:text-base">
                  {message.businessName}
                </h3>
                <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                  {message.timestamp}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 truncate">
                {message.message}
              </p>
            </div>

            {message.unread > 0 && <div className="w-6 h-6 rounded-full bg-mapleon-pink flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-bold">
                  {message.unread}
                </span>
              </div>}
          </button>)}
      </div>

      <BottomNav />
    </div>;
}