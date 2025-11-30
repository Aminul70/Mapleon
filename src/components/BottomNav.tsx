import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { HomeIcon, MapPinIcon, CalendarIcon, MessageCircleIcon, UserIcon, PlusCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavBar } from '../contexts/NavBarContext';

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isBusinessAccount } = useAuth();
  const { isNavBarVisible } = useNavBar();

  const baseTabs = [
    {
      id: 'home',
      label: 'Home',
      icon: HomeIcon,
      path: '/home'
    },
    {
      id: 'map',
      label: 'Near Me',
      icon: MapPinIcon,
      path: '/map'
    }
  ];

  const endTabs = [
    {
      id: 'messages',
      label: 'Messages',
      icon: MessageCircleIcon,
      path: '/messages'
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: UserIcon,
      path: '/profile'
    }
  ];

  const isDarkPage = location.pathname === '/home';

  return (
    <div className={`fixed bottom-0 left-0 right-0 ${isDarkPage ? 'bg-[#5A5A5A]/95 backdrop-blur-xl border-t border-white/10' : 'bg-white/95 backdrop-blur-xl border-t border-gray-200/50'} px-4 pb-safe z-[9999] transition-colors`}>
      <div className="flex justify-around items-center h-20 max-w-2xl mx-auto">
        {/* First two tabs */}
        {baseTabs.map(tab => {
          const Icon = tab.icon;
          const isActive = location.pathname === tab.path;
          return (
            <button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              className="flex flex-col items-center justify-center gap-1 min-w-[60px] transition-all relative active:scale-95"
            >
              {isActive && <div className="absolute -top-1 w-12 h-12 bg-white/20 rounded-full blur-md animate-pulse" />}
              <div className={`transition-all relative z-10 ${isDarkPage ? isActive ? 'text-white scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : 'text-white/60' : isActive ? 'text-gray-800 scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : 'text-gray-400'}`}>
                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`text-xs font-medium relative z-10 transition-all ${isDarkPage ? isActive ? 'text-white' : 'text-white/60' : isActive ? 'text-gray-800' : 'text-gray-500'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}

        {/* Upload button (business only) */}
        {isBusinessAccount && (
          <button
            onClick={() => alert('Upload video feature - Coming soon!\n\nBusiness accounts can upload and share videos to showcase their business.')}
            className="flex flex-col items-center justify-center gap-1 min-w-[60px] transition-all relative active:scale-95"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-primary-brand to-primary-dark rounded-full flex items-center justify-center shadow-lg shadow-primary-brand/30 hover:shadow-xl hover:shadow-primary-brand/40 transition-all hover:scale-105">
              <PlusCircle size={28} className="text-white" strokeWidth={2.5} />
            </div>
          </button>
        )}

        {/* Last two tabs */}
        {endTabs.map(tab => {
          const Icon = tab.icon;
          const isActive = location.pathname === tab.path;
          return (
            <button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              className="flex flex-col items-center justify-center gap-1 min-w-[60px] transition-all relative active:scale-95"
            >
              {isActive && <div className="absolute -top-1 w-12 h-12 bg-white/20 rounded-full blur-md animate-pulse" />}
              <div className={`transition-all relative z-10 ${isDarkPage ? isActive ? 'text-white scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : 'text-white/60' : isActive ? 'text-gray-800 scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : 'text-gray-400'}`}>
                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`text-xs font-medium relative z-10 transition-all ${isDarkPage ? isActive ? 'text-white' : 'text-white/60' : isActive ? 'text-gray-800' : 'text-gray-500'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}