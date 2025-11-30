import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, Settings, Users } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { mockUsers, mockPosts } from '../utils/mockData';
import { Button } from '../components/Button';
import { AccountSwitcher } from '../components/AccountSwitcher';
import { BottomNav } from '../components/BottomNav';
import { FollowersList } from '../components/FollowersList';

export function UserProfile() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'saved' | 'following' | 'activity'>('saved');
  const [showFollowersList, setShowFollowersList] = useState<'followers' | 'following' | null>(null);
  const [showAccountSwitcher, setShowAccountSwitcher] = useState(false);
  
  // Use currentUser or fallback to mock user
  const user = currentUser || mockUsers[0];
  const savedPosts = mockPosts.slice(0, 6); // Mock saved posts

  if (showFollowersList) {
    return <FollowersList type={showFollowersList} onClose={() => setShowFollowersList(null)} />;
  }

  return (
    <div className="min-h-screen bg-neutral-50 pb-24">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => setShowAccountSwitcher(true)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <Users size={24} />
          </button>
          <div className="flex items-center gap-2">
            <button onClick={() => navigate('/settings')} className="p-2 hover:bg-gray-100 rounded-full">
              <Settings size={24} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Share2 size={24} />
            </button>
          </div>
        </div>

        <div className="px-4 pb-4">
          {/* Avatar */}
          <div className="flex items-center gap-4 mb-4">
            <img
              src={user.profileImage}
              alt={user.name}
              className="w-20 h-20 rounded-full object-cover"
            />
            <Button variant="secondary" size="md" onClick={() => navigate('/user-profile-edit')}>
              Edit Profile
            </Button>
          </div>

          {/* Name and Username */}
          <h1 className="text-xl font-bold text-neutral-900 mb-1">{user.name}</h1>
          <p className="text-neutral-600 mb-3">@{user.username}</p>

          {/* Bio */}
          {user.bio && <p className="text-neutral-700 mb-4">{user.bio}</p>}

          {/* Stats */}
          <div className="flex items-center gap-6 mb-4">
            <button
              onClick={() => setShowFollowersList('following')}
              className="text-center hover:opacity-70 transition-opacity"
            >
              <div className="text-xl font-bold text-neutral-900">{user.stats.saved}</div>
              <div className="text-sm text-neutral-600">Saved</div>
            </button>
            <button
              onClick={() => setShowFollowersList('following')}
              className="text-center hover:opacity-70 transition-opacity"
            >
              <div className="text-xl font-bold text-neutral-900">{user.stats.following}</div>
              <div className="text-sm text-neutral-600">Following</div>
            </button>
            <button
              onClick={() => setShowFollowersList('followers')}
              className="text-center hover:opacity-70 transition-opacity"
            >
              <div className="text-xl font-bold text-neutral-900">{user.stats.followers}</div>
              <div className="text-sm text-neutral-600">Followers</div>
            </button>
          </div>

          {/* Member Since */}
          <p className="text-sm text-neutral-500">Member since {user.memberSince}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
        <div className="flex">
          {(['saved', 'following', 'activity'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-sm font-medium transition-colors relative ${
                activeTab === tab
                  ? 'text-primary-brand'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-brand" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-4">
        {activeTab === 'saved' && (
          <div className="grid grid-cols-3 gap-1">
            {savedPosts.map((post) => (
              <div key={post.id} className="relative aspect-square bg-gray-200 rounded-lg overflow-hidden">
                <img src={post.image} alt="Saved post" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        )}

        {activeTab === 'following' && (
          <div className="text-center py-12">
            <p className="text-neutral-600 mb-4">Businesses you follow will appear here</p>
            <Button variant="primary" size="md" onClick={() => navigate('/explore')}>
              Discover Businesses
            </Button>
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-4">
                <p className="text-sm text-neutral-700">
                  You liked a post from <span className="font-semibold">BrewHaven Cafe</span>
                </p>
                <p className="text-xs text-neutral-500 mt-1">{i} day{i > 1 ? 's' : ''} ago</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Account Switcher Modal */}
      {showAccountSwitcher && (
        <AccountSwitcher onClose={() => setShowAccountSwitcher(false)} />
      )}

      <BottomNav />
    </div>
  );
}
