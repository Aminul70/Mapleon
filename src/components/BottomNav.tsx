import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { HomeIcon, MapPinIcon, CalendarIcon, MessageCircleIcon, UserIcon, PlusCircle, Compass } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavBar } from '../contexts/NavBarContext';

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isBusinessAccount } = useAuth();
  const { isNavBarVisible } = useNavBar();

  // Filter out explore tab for business accounts
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
    },
    ...(!isBusinessAccount ? [{
      id: 'explore',
      label: 'Explore',
      icon: Compass,
      path: '/explore'
    }] : [])
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
    <div 
      className={`fixed bottom-0 left-0 right-0 ${isDarkPage ? 'bg-[#5A5A5A]/95 backdrop-blur-xl border-t border-white/10' : 'bg-white/95 backdrop-blur-xl border-t border-gray-200/50'} px-2 pb-safe z-[9999] transition-colors ${isNavBarVisible ? 'navbar-show' : 'navbar-hide'}`}
      style={{ pointerEvents: isNavBarVisible ? 'auto' : 'none' }}
    >
      <div className="flex justify-around items-center h-20 max-w-3xl mx-auto">
        {/* First three tabs */}
        {baseTabs.map(tab => {
          const Icon = tab.icon;
          const isActive = location.pathname === tab.path;
          return (
            <button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              className="flex flex-col items-center justify-center gap-1 min-w-[55px] transition-all relative active:scale-95"
            >
              {isActive && <div className="absolute -top-1 w-10 h-10 bg-white/20 rounded-full blur-md animate-pulse" />}
              <div className={`transition-all relative z-10 ${isDarkPage ? isActive ? 'text-white scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : 'text-white/60' : isActive ? 'text-gray-800 scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : 'text-gray-400'}`}>
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`text-[10px] font-medium relative z-10 transition-all ${isDarkPage ? isActive ? 'text-white' : 'text-white/60' : isActive ? 'text-gray-800' : 'text-gray-500'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}

        {/* Upload button (business only) */}
        {isBusinessAccount && (
          <button
            onClick={() => navigate('/create-post')}
            className="flex flex-col items-center justify-center gap-1 min-w-[55px] transition-all relative active:scale-95 group"
            data-testid="create-post-btn"
          >
            {/* Animated glow ring */}
            <div className="absolute w-16 h-16 bg-gradient-to-br from-primary-brand/30 to-secondary-teal/30 rounded-full blur-lg animate-pulse" />
            
            {/* Main button */}
            <div className="relative w-14 h-14 bg-gradient-to-br from-primary-brand via-secondary-teal to-primary-dark rounded-full flex items-center justify-center shadow-2xl shadow-primary-brand/50 hover:shadow-primary-brand/70 transition-all hover:scale-110 group-hover:rotate-90 duration-300 ring-4 ring-white/20">
              <PlusCircle size={28} className="text-white drop-shadow-lg" strokeWidth={2.5} />
            </div>
            
            {/* Label */}
            <span className="text-[10px] font-semibold text-primary-brand mt-0.5 relative z-10">Upload</span>
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
              className="flex flex-col items-center justify-center gap-1 min-w-[55px] transition-all relative active:scale-95"
            >
              {isActive && <div className="absolute -top-1 w-10 h-10 bg-white/20 rounded-full blur-md animate-pulse" />}
              <div className={`transition-all relative z-10 ${isDarkPage ? isActive ? 'text-white scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : 'text-white/60' : isActive ? 'text-gray-800 scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : 'text-gray-400'}`}>
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`text-[10px] font-medium relative z-10 transition-all ${isDarkPage ? isActive ? 'text-white' : 'text-white/60' : isActive ? 'text-gray-800' : 'text-gray-500'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}