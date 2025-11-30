import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SettingsIcon, PlusIcon, XIcon, MapPin, Camera, Trash2, Share2, Edit2, Heart, MessageCircle, Bookmark } from 'lucide-react';
import { BottomNav } from '../components/BottomNav';
export function Profile() {
  const navigate = useNavigate();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPhotoOptions, setShowPhotoOptions] = useState(false);
  const [profileImage, setProfileImage] = useState('https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200');
  const [coverImage, setCoverImage] = useState('https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800');
  const [editForm, setEditForm] = useState({
    username: 'Coffee_Lover92',
    bio: 'Exploring the best coffee spots in NYC ☕ | Food enthusiast 🍝 | Sharing my local finds',
    location: 'New York City'
  });
  // Mock posts with full post data for feed layout
  const mockPosts = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800',
      caption: 'Amazing coffee experience at this hidden gem! The atmosphere is cozy and the latte art is incredible. Highly recommend trying their signature blend.',
      location: 'Brooklyn, NY',
      likes: 342,
      comments: 28,
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800',
      caption: 'Best brunch spot in the city! The avocado toast is to die for and the service is exceptional.',
      location: 'Manhattan, NY',
      likes: 521,
      comments: 45,
      timestamp: '5 hours ago'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800',
      caption: 'Perfect place to work remotely. Great wifi, delicious food, and amazing vibes!',
      location: 'Queens, NY',
      likes: 198,
      comments: 12,
      timestamp: '1 day ago'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
      caption: 'Friday night vibes! The cocktails here are absolutely perfect. Great atmosphere for a night out.',
      location: 'Manhattan, NY',
      likes: 687,
      comments: 54,
      timestamp: '2 days ago'
    }
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
  return <div className="min-h-screen bg-mapleon-gray pb-24">
      {/* Cover Image Section */}
      <div className="relative">
        <div className="h-32 sm:h-40 bg-gradient-to-r from-mapleon-coral to-mapleon-pink overflow-hidden">
          <img src={coverImage} alt="Cover" className="w-full h-full object-cover opacity-40" />
        </div>
        
        {/* Header Icons - Absolute positioned on cover */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <button 
            onClick={() => alert('Create new post feature - Upload photos and share your experiences!')}
            className="p-2 bg-white/20 backdrop-blur-md rounded-full active:scale-95 transition-transform"
          >
            <PlusIcon size={20} className="text-white" />
          </button>
          <button onClick={() => navigate('/settings')} className="p-2 bg-white/20 backdrop-blur-md rounded-full active:scale-95 transition-transform">
            <SettingsIcon size={20} className="text-white" />
          </button>
        </div>

        {/* Profile Picture - Overlapping cover */}
        <div className="absolute -bottom-12 left-4 sm:left-6">
          <button onClick={() => setShowPhotoOptions(true)} className="relative active:scale-95 transition-transform group">
            <img src={profileImage} alt="Profile" className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-white shadow-lg" />
            <div className="absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
              <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera size={16} className="text-gray-700" />
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Profile Info Section */}
      <div className="px-4 sm:px-6 pt-16 pb-4">
        {/* Username and Edit */}
        <div className="flex items-start justify-between mb-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-mapleon-slate mb-1">
              {editForm.username}
            </h2>
            <p className="text-sm text-gray-600 flex items-center gap-1 mb-2">
              <MapPin size={14} className="text-mapleon-coral" />
              {editForm.location}
            </p>
          </div>
        </div>

        {/* Bio */}
        <p className="text-sm sm:text-base text-gray-700 mb-4 leading-relaxed">
          {editForm.bio}
        </p>

        {/* Stats Row - More prominent */}
        <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
          <div className="flex justify-around">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-mapleon-coral to-mapleon-pink bg-clip-text text-transparent">
                42
              </div>
              <div className="text-xs sm:text-sm text-gray-500 font-medium">Posts</div>
            </div>
            <div className="w-px bg-gray-200"></div>
            <button className="text-center active:scale-95 transition-transform">
              <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-mapleon-teal to-mapleon-aqua bg-clip-text text-transparent">
                2.4K
              </div>
              <div className="text-xs sm:text-sm text-gray-500 font-medium">Followers</div>
            </button>
            <div className="w-px bg-gray-200"></div>
            <button className="text-center active:scale-95 transition-transform">
              <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                312
              </div>
              <div className="text-xs sm:text-sm text-gray-500 font-medium">Following</div>
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mb-4">
          <button onClick={() => setShowEditModal(true)} className="flex-1 py-3 bg-gradient-to-r from-mapleon-coral to-mapleon-pink text-white rounded-xl font-semibold text-sm active:scale-95 transition-transform shadow-md flex items-center justify-center gap-2">
            <Edit2 size={16} />
            Edit Profile
          </button>
          <button onClick={handleShareProfile} className="flex-1 py-3 bg-white rounded-xl font-semibold text-mapleon-slate text-sm active:scale-95 transition-transform shadow-sm border border-gray-200 flex items-center justify-center gap-2">
            <Share2 size={16} />
            Share
          </button>
        </div>

      </div>

      {/* Posts Feed - Twitter/Facebook Style */}
      <div className="bg-white">
        <div className="border-b border-gray-200 py-4 px-4">
          <h3 className="text-lg font-bold text-mapleon-slate">Posts</h3>
        </div>

        {/* Feed Posts */}
        <div className="divide-y divide-gray-200">
          {mockPosts.map((post) => (
            <div key={post.id} className="p-4 bg-white">
              {/* Post Header */}
              <div className="flex items-center gap-3 mb-3">
                <img 
                  src={profileImage} 
                  alt="Profile" 
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-mapleon-slate text-sm">
                    {editForm.username}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{post.timestamp}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <MapPin size={12} />
                      <span>{post.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Post Caption */}
              <p className="text-sm text-gray-800 mb-3 leading-relaxed">
                {post.caption}
              </p>

              {/* Post Image */}
              <div className="rounded-2xl overflow-hidden mb-3 bg-gray-100">
                <img 
                  src={post.image} 
                  alt="Post" 
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Engagement Stats */}
              <div className="flex items-center justify-between text-xs text-gray-500 mb-3 px-1">
                <span>{post.likes} likes</span>
                <span>{post.comments} comments</span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 pt-2 border-t border-gray-100">
                <button className="flex items-center gap-2 flex-1 justify-center py-2 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors">
                  <Heart size={18} className="text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">Like</span>
                </button>
                <button className="flex items-center gap-2 flex-1 justify-center py-2 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors">
                  <MessageCircle size={18} className="text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">Comment</span>
                </button>
                <button className="flex items-center gap-2 flex-1 justify-center py-2 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors">
                  <Bookmark size={18} className="text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">Save</span>
                </button>
              </div>
            </div>
          ))}
        </div>
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

          <div className="relative w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-3xl p-6 animate-slide-up max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-mapleon-slate">
                Edit Profile
              </h2>
              <button onClick={() => setShowEditModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <XIcon size={24} className="text-gray-600" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Profile Photo Preview */}
              <div className="flex justify-center">
                <div className="relative">
                  <img src={profileImage} alt="Profile Preview" className="w-24 h-24 rounded-full object-cover border-4 border-gray-200" />
                  <button 
                    onClick={() => setShowPhotoOptions(true)}
                    className="absolute bottom-0 right-0 p-2 bg-gradient-to-r from-mapleon-coral to-mapleon-pink rounded-full shadow-lg active:scale-95 transition-transform"
                  >
                    <Camera size={16} className="text-white" />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input type="text" value={editForm.username} onChange={e => setEditForm({
              ...editForm,
              username: e.target.value
            })} className="w-full px-4 py-3 bg-mapleon-gray rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-mapleon-coral/30" placeholder="Your username" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                <textarea value={editForm.bio} onChange={e => setEditForm({
              ...editForm,
              bio: e.target.value
            })} rows={4} className="w-full px-4 py-3 bg-mapleon-gray rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-mapleon-coral/30 resize-none" placeholder="Tell us about yourself..." />
                <p className="text-xs text-gray-500 mt-1">{editForm.bio.length}/150 characters</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <div className="relative">
                  <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" value={editForm.location} onChange={e => setEditForm({
              ...editForm,
              location: e.target.value
            })} className="w-full pl-10 pr-4 py-3 bg-mapleon-gray rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-mapleon-coral/30" placeholder="City, State" />
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowEditModal(false)} className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-2xl font-semibold active:scale-95 transition-transform">
                Cancel
              </button>
              <button onClick={handleSaveProfile} className="flex-1 py-3 bg-gradient-to-r from-mapleon-coral to-mapleon-pink text-white rounded-2xl font-semibold active:scale-95 transition-transform shadow-lg">
                Save Changes
              </button>
            </div>
          </div>
        </div>}

      {/* Bottom Nav - Hidden when modal is open */}
      {!showEditModal && <BottomNav />}
    </div>;
}