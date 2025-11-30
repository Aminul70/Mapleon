import React, { useState } from 'react';
import { Search, ArrowLeft } from 'lucide-react';
import { mockUsers } from '../utils/mockData';
import { Button } from './Button';

interface FollowersListProps {
  type: 'followers' | 'following';
  onClose: () => void;
}

export function FollowersList({ type, onClose }: FollowersListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'businesses' | 'users'>('all');
  const [following, setFollowing] = useState<Set<string>>(new Set(['b1']));

  const toggleFollow = (userId: string) => {
    const newFollowing = new Set(following);
    if (newFollowing.has(userId)) {
      newFollowing.delete(userId);
    } else {
      newFollowing.add(userId);
    }
    setFollowing(newFollowing);
  };

  const filteredUsers = mockUsers.filter(user => {
    if (filter === 'businesses' && user.accountType !== 'business') return false;
    if (filter === 'users' && user.accountType !== 'user') return false;
    if (searchQuery && !user.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-auto">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
        <div className="flex items-center gap-3 px-4 py-3">
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold">
            {type === 'followers' ? 'Followers' : 'Following'} ({filteredUsers.length})
          </h1>
        </div>

        {/* Search Bar */}
        <div className="px-4 pb-3">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={`Search ${type}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-brand"
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 px-4 pb-3">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === 'all'
                ? 'bg-primary-brand text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('businesses')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === 'businesses'
                ? 'bg-primary-brand text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Businesses
          </button>
          <button
            onClick={() => setFilter('users')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === 'users'
                ? 'bg-primary-brand text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Users
          </button>
        </div>
      </div>

      {/* User List */}
      <div className="pb-6">
        {filteredUsers.map((user) => (
          <div key={user.id} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50">
            <img
              src={user.profileImage}
              alt={user.name}
              className="w-14 h-14 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-gray-900 truncate">{user.name}</h3>
                {user.verified && (
                  <span className="text-xs bg-business-badge text-white px-2 py-0.5 rounded-full">✓</span>
                )}
              </div>
              <p className="text-sm text-gray-500 truncate">
                {user.accountType === 'business' ? user.bio : `@${user.username}`}
              </p>
            </div>
            <Button
              variant={following.has(user.id) ? 'ghost' : 'primary'}
              size="sm"
              onClick={() => toggleFollow(user.id)}
            >
              {following.has(user.id) ? 'Following' : 'Follow'}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
