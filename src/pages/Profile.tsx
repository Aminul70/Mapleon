import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SettingsIcon, GridIcon, HeartIcon, BookmarkIcon, PlusIcon, XIcon, UtensilsCrossed, Coffee, Dumbbell, Scissors, MapPin, Camera, Trash2, Award, TrendingUp, Share2, Edit2 } from 'lucide-react';
import { BottomNav } from '../components/BottomNav';
export function Profile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'posts' | 'liked' | 'saved'>('posts');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPhotoOptions, setShowPhotoOptions] = useState(false);
  const [profileImage, setProfileImage] = useState('https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200');
  const [coverImage, setCoverImage] = useState('https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800');
  const [editForm, setEditForm] = useState({
    username: 'Coffee_Lover92',
    bio: 'Exploring the best coffee spots in NYC ☕ | Food enthusiast 🍝 | Sharing my local finds',
    location: 'New York City'
  });
  const mockPosts = ['https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400', 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400', 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400', 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400', 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400', 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400', 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400', 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400'];
  const interests = [{
    icon: UtensilsCrossed,
    label: 'Restaurants',
    color: '#FF7A57',
    count: 28
  }, {
    icon: Coffee,
    label: 'Coffee',
    color: '#FF4D7A',
    count: 35
  }, {
    icon: Dumbbell,
    label: 'Fitness',
    color: '#1DA9A1',
    count: 12
  }, {
    icon: Scissors,
    label: 'Beauty',
    color: '#A54DFF',
    count: 8
  }];
  
  const achievements = [
    { icon: Award, label: 'Top Reviewer', color: '#FFD700' },
    { icon: TrendingUp, label: 'Local Explorer', color: '#FF7A57' },
    { icon: Share2, label: 'Influencer', color: '#A54DFF' }
  ];
  const handleSaveProfile = () => {
    setShowEditModal(false);
    alert('Profile updated successfully!');
  };
  const handleShareProfile = async () => {
    const shareData = {
      title: 'Check out my MapLeon profile!',
      text: `Follow ${editForm.username} on MapLeon`,
      url: 'https://mapleon.app/profile/coffee_lover92'
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(shareData.url);
      alert('Profile link copied to clipboard!');
    }
  };
  const handleChangePhoto = () => {
    // Simulate file picker
    const newPhotos = ['https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200'];
    const randomPhoto = newPhotos[Math.floor(Math.random() * newPhotos.length)];
    setProfileImage(randomPhoto);
    setShowPhotoOptions(false);
  };
  const handleRemovePhoto = () => {
    setProfileImage('https://via.placeholder.com/200?text=No+Photo');
    setShowPhotoOptions(false);
  };
  return <div className="min-h-screen bg-white pb-24">
      {/* Header - Fixed positioning */}
      <div className="px-4 sm:px-6 pt-4 pb-3 flex items-center justify-end">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => alert('Create new post feature - Upload photos and share your experiences!')}
            className="p-2 active:scale-95 transition-transform"
          >
            <PlusIcon size={24} className="text-mapleon-slate" />
          </button>
          <button onClick={() => navigate('/settings')} className="p-2 active:scale-95 transition-transform">
            <SettingsIcon size={24} className="text-mapleon-slate" />
          </button>
        </div>
      </div>

      {/* Profile Info - Centered layout */}
      <div className="px-4 sm:px-6 pb-6">
        {/* Profile Picture and Stats Row */}
        <div className="flex items-center gap-6 mb-4">
          {/* Profile Picture */}
          <div className="relative flex-shrink-0">
            <button onClick={() => setShowPhotoOptions(true)} className="relative active:scale-95 transition-transform">
              <img src={profileImage} alt="Profile" className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-gray-200" />
              <div className="absolute inset-0 rounded-full bg-black/0 hover:bg-black/10 transition-colors flex items-center justify-center">
                <Camera size={20} className="text-white opacity-0 hover:opacity-100 transition-opacity" />
              </div>
            </button>
          </div>

          {/* Stats */}
          <div className="flex-1 flex justify-around">
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-mapleon-slate">
                42
              </div>
              <div className="text-xs sm:text-sm text-gray-500">Posts</div>
            </div>
            <button className="text-center active:scale-95 transition-transform">
              <div className="text-xl sm:text-2xl font-bold text-mapleon-slate">
                2.4K
              </div>
              <div className="text-xs sm:text-sm text-gray-500">Followers</div>
            </button>
            <button className="text-center active:scale-95 transition-transform">
              <div className="text-xl sm:text-2xl font-bold text-mapleon-slate">
                312
              </div>
              <div className="text-xs sm:text-sm text-gray-500">Following</div>
            </button>
          </div>
        </div>

        {/* Bio */}
        <div className="mb-4">
          <h2 className="font-bold text-mapleon-slate mb-1 text-base">
            {editForm.username}
          </h2>
          <p className="text-sm text-gray-600 mb-1">{editForm.bio}</p>
          <p className="text-sm text-gray-600 flex items-center gap-1">
            <MapPin size={14} className="text-gray-400" />
            {editForm.location}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button onClick={() => setShowEditModal(true)} className="flex-1 py-2.5 bg-mapleon-gray rounded-xl font-semibold text-mapleon-slate text-sm active:scale-95 transition-transform">
            Edit Profile
          </button>
          <button onClick={handleShareProfile} className="flex-1 py-2.5 bg-mapleon-gray rounded-xl font-semibold text-mapleon-slate text-sm active:scale-95 transition-transform">
            Share Profile
          </button>
        </div>
      </div>

      {/* Interests Pills */}
      <div className="px-4 sm:px-6 pb-4 flex gap-2 overflow-x-auto scrollbar-hide">
        <button
          onClick={() => navigate('/favorites')}
          className="px-4 py-2 bg-gradient-to-r from-mapleon-coral to-mapleon-pink text-white rounded-full text-xs font-medium whitespace-nowrap flex items-center gap-1.5 active:scale-95 transition-transform"
        >
          <BookmarkIcon size={14} />
          Saved Places
        </button>
        {interests.map(interest => {
        const IconComponent = interest.icon;
        return <div key={interest.label} className="px-4 py-2 bg-mapleon-gray rounded-full text-xs font-medium text-mapleon-slate whitespace-nowrap flex items-center gap-1.5">
              <IconComponent size={14} style={{
            color: interest.color
          }} />
              {interest.label}
            </div>;
      })}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex">
          <button onClick={() => setActiveTab('posts')} className={`flex-1 py-3 flex items-center justify-center gap-2 transition-colors relative ${activeTab === 'posts' ? 'text-mapleon-slate' : 'text-gray-400'}`}>
            <GridIcon size={20} />
            {activeTab === 'posts' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-mapleon-slate" />}
          </button>
          <button onClick={() => setActiveTab('liked')} className={`flex-1 py-3 flex items-center justify-center gap-2 transition-colors relative ${activeTab === 'liked' ? 'text-mapleon-slate' : 'text-gray-400'}`}>
            <HeartIcon size={20} />
            {activeTab === 'liked' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-mapleon-slate" />}
          </button>
          <button onClick={() => setActiveTab('saved')} className={`flex-1 py-3 flex items-center justify-center gap-2 transition-colors relative ${activeTab === 'saved' ? 'text-mapleon-slate' : 'text-gray-400'}`}>
            <BookmarkIcon size={20} />
            {activeTab === 'saved' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-mapleon-slate" />}
          </button>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-3 gap-0.5 bg-gray-100">
        {mockPosts.map((image, index) => <button key={index} className="aspect-square relative overflow-hidden bg-gray-200 active:opacity-80 transition-opacity">
            <img src={image} alt={`Post ${index + 1}`} className="w-full h-full object-cover" />
          </button>)}
      </div>

      {/* Photo Options Modal */}
      {showPhotoOptions && <div className="fixed inset-0 z-50 flex items-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowPhotoOptions(false)} />

          <div className="relative w-full bg-white rounded-t-3xl p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-mapleon-slate">
                Profile Photo
              </h3>
              <button onClick={() => setShowPhotoOptions(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <XIcon size={20} className="text-gray-600" />
              </button>
            </div>

            <div className="space-y-2">
              <button onClick={handleChangePhoto} className="w-full flex items-center gap-3 p-4 rounded-2xl hover:bg-gray-50 active:bg-gray-100 transition-colors">
                <div className="w-10 h-10 bg-mapleon-coral/10 rounded-full flex items-center justify-center">
                  <Camera size={20} className="text-mapleon-coral" />
                </div>
                <span className="font-semibold text-mapleon-slate">
                  Change Photo
                </span>
              </button>

              <button onClick={handleRemovePhoto} className="w-full flex items-center gap-3 p-4 rounded-2xl hover:bg-gray-50 active:bg-gray-100 transition-colors">
                <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center">
                  <Trash2 size={20} className="text-red-600" />
                </div>
                <span className="font-semibold text-red-600">Remove Photo</span>
              </button>
            </div>
          </div>
        </div>}

      {/* Edit Profile Modal - Hides BottomNav */}
      {showEditModal && <div className="fixed inset-0 z-[60] flex items-end sm:items-center sm:justify-center">
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
                  Bio
                </label>
                <textarea value={editForm.bio} onChange={e => setEditForm({
              ...editForm,
              bio: e.target.value
            })} rows={3} className="w-full px-4 py-3 bg-mapleon-gray rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-mapleon-coral/30 resize-none" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input type="text" value={editForm.location} onChange={e => setEditForm({
              ...editForm,
              location: e.target.value
            })} className="w-full px-4 py-3 bg-mapleon-gray rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-mapleon-coral/30" />
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

      {/* Bottom Nav - Hidden when modal is open */}
      {!showEditModal && <BottomNav />}
    </div>;
}