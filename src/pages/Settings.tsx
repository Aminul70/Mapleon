import React, { useState } from 'react';
import { ArrowLeftIcon, BellIcon, LockIcon, GlobeIcon, HelpCircleIcon, ShieldIcon, LogOutIcon, XIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '../components/BottomNav';
export function Settings() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(true);
  const [locationServices, setLocationServices] = useState(true);
  const [privateProfile, setPrivateProfile] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    username: 'Coffee_Lover92',
    email: 'coffee.lover@email.com',
    bio: 'Coffee Enthusiast'
  });
  const handleMenuItemClick = (label: string) => {
    switch (label) {
      case 'Privacy & Security':
        navigate('/privacy');
        break;
      case 'Help Center':
        navigate('/help');
        break;
      case 'Terms of Service':
        navigate('/terms');
        break;
      default:
        break;
    }
  };

  const settingsSections = [{
    title: 'Account',
    items: [{
      icon: BellIcon,
      label: 'Push Notifications',
      toggle: true,
      value: notifications,
      onChange: setNotifications
    }, {
      icon: GlobeIcon,
      label: 'Location Services',
      toggle: true,
      value: locationServices,
      onChange: setLocationServices
    }, {
      icon: ShieldIcon,
      label: 'Private Profile',
      toggle: true,
      value: privateProfile,
      onChange: setPrivateProfile
    }, {
      icon: LockIcon,
      label: 'Privacy & Security',
      toggle: false,
      onClick: () => handleMenuItemClick('Privacy & Security')
    }]
  }, {
    title: 'Support',
    items: [{
      icon: HelpCircleIcon,
      label: 'Help Center',
      toggle: false,
      onClick: () => handleMenuItemClick('Help Center')
    }, {
      icon: ShieldIcon,
      label: 'Terms of Service',
      toggle: false,
      onClick: () => handleMenuItemClick('Terms of Service')
    }]
  }];
  const handleSaveProfile = () => {
    // Save profile logic would go here
    setShowEditModal(false);
    alert('Profile updated successfully!');
  };
  return <div className="min-h-screen bg-mapleon-gray pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-mapleon-teal to-mapleon-aqua p-4 sm:p-6 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/profile')} className="p-2 -ml-2 text-white active:scale-95 transition-transform">
              <ArrowLeftIcon size={22} className="sm:w-6 sm:h-6" />
            </button>
            <h1 className="text-xl sm:text-2xl font-bold text-white">Settings</h1>
          </div>
          <button 
            onClick={() => navigate('/enhanced-settings')} 
            className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-xl text-white text-sm font-medium hover:bg-white/30 transition-colors"
          >
            Enhanced
          </button>
        </div>
      </div>
      <div className="px-3 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6">
        {/* Profile Section */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-lg">
          <div className="flex items-center gap-3 sm:gap-4">
            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200" alt="Profile" className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <h2 className="font-bold text-mapleon-slate text-base sm:text-lg truncate">
                {editForm.username}
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 truncate">
                {editForm.email}
              </p>
            </div>
            <button onClick={() => setShowEditModal(true)} className="px-3 sm:px-4 py-1.5 sm:py-2 bg-mapleon-gray rounded-full text-xs sm:text-sm font-medium text-mapleon-slate active:scale-95 transition-transform flex-shrink-0">
              Edit
            </button>
          </div>
        </div>
        {/* Settings Sections */}
        {settingsSections.map(section => <div key={section.title}>
            <h3 className="text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-wide mb-2 sm:mb-3 px-2">
              {section.title}
            </h3>
            <div className="bg-white rounded-3xl overflow-hidden shadow-lg">
              {section.items.map((item, index) => {
            const Icon = item.icon;
            return <button 
                    key={item.label} 
                    onClick={() => !item.toggle && item.onClick && item.onClick()}
                    disabled={item.toggle}
                    className={`w-full flex items-center justify-between p-3 sm:p-4 ${index !== section.items.length - 1 ? 'border-b border-gray-100' : ''} ${!item.toggle ? 'active:bg-gray-50 transition-colors cursor-pointer' : 'cursor-default'}`}
                  >
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                      <Icon size={18} className="text-mapleon-coral flex-shrink-0 sm:w-5 sm:h-5" />
                      <span className="font-medium text-mapleon-slate text-sm sm:text-base truncate">
                        {item.label}
                      </span>
                    </div>
                    {item.toggle ? <button onClick={(e) => {
                        e.stopPropagation();
                        item.onChange && item.onChange(!item.value);
                      }} className={`w-11 h-6 sm:w-12 sm:h-6 rounded-full transition-colors relative flex-shrink-0 ${item.value ? 'bg-gradient-to-r from-mapleon-coral to-mapleon-pink' : 'bg-gray-300'}`}>
                        <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${item.value ? 'translate-x-5 sm:translate-x-6' : 'translate-x-0.5'}`} />
                      </button> : <span className="text-gray-400 flex-shrink-0">›</span>}
                  </button>;
          })}
            </div>
          </div>)}
        {/* Logout Button */}
        <button 
          onClick={() => {
            if (window.confirm('Are you sure you want to log out?')) {
              alert('Logged out successfully!');
              navigate('/');
            }
          }}
          className="w-full bg-white rounded-3xl p-3 sm:p-4 flex items-center justify-center gap-2 text-red-600 font-semibold shadow-lg active:scale-95 transition-transform"
        >
          <LogOutIcon size={18} className="sm:w-5 sm:h-5" />
          <span className="text-sm sm:text-base">Log Out</span>
        </button>
        {/* App Version */}
        <p className="text-center text-xs sm:text-sm text-gray-400">
          MapLeon v1.0.0
        </p>
      </div>
      {/* Edit Profile Modal */}
      {showEditModal && <div className="fixed inset-0 z-50 flex items-end sm:items-center sm:justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowEditModal(false)} />
          <div className="relative w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-3xl p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-mapleon-slate">
                Edit Profile
              </h2>
              <button onClick={() => setShowEditModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <XIcon size={24} className="text-gray-600" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input type="text" value={editForm.username} onChange={e => setEditForm({
              ...editForm,
              username: e.target.value
            })} className="w-full px-4 py-3 bg-mapleon-gray rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-mapleon-coral/30" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input type="email" value={editForm.email} onChange={e => setEditForm({
              ...editForm,
              email: e.target.value
            })} className="w-full px-4 py-3 bg-mapleon-gray rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-mapleon-coral/30" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                <textarea value={editForm.bio} onChange={e => setEditForm({
              ...editForm,
              bio: e.target.value
            })} rows={3} className="w-full px-4 py-3 bg-mapleon-gray rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-mapleon-coral/30 resize-none" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowEditModal(false)} className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-2xl font-semibold active:scale-95 transition-transform">
                Cancel
              </button>
              <button onClick={handleSaveProfile} className="flex-1 py-3 bg-gradient-to-r from-mapleon-coral to-mapleon-pink text-white rounded-2xl font-semibold active:scale-95 transition-transform">
                Save Changes
              </button>
            </div>
          </div>
        </div>}
      <BottomNav />
    </div>;
}