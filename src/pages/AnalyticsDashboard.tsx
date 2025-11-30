import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Eye, Heart, MessageCircle, Users, Calendar } from 'lucide-react';
import { BottomNav } from '../components/BottomNav';

export function AnalyticsDashboard() {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('week');

  const stats = {
    views: 12500,
    viewsChange: '+15%',
    engagement: 8234,
    engagementChange: '+23%',
    followers: 3200,
    followersChange: '+12%',
    bookings: 45,
    bookingsChange: '+8%',
  };

  const topPosts = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400',
      title: 'Cozy morning setup',
      views: 3200,
      likes: 450,
      comments: 67,
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400',
      title: 'New menu items',
      views: 2800,
      likes: 380,
      comments: 45,
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-xl font-bold">Analytics</h1>
          </div>
        </div>

        {/* Time Range Selector */}
        <div className="flex gap-2 px-4 pb-3">
          {(['week', 'month', 'year'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                timeRange === range
                  ? 'bg-primary-brand text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="p-4 grid grid-cols-2 gap-3">
        {/* Views */}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Eye size={20} className="text-blue-500" />
            <span className="text-sm text-neutral-600">Views</span>
          </div>
          <div className="text-2xl font-bold text-neutral-900 mb-1">
            {stats.views.toLocaleString()}
          </div>
          <div className="flex items-center gap-1 text-xs text-green-600">
            <TrendingUp size={12} />
            <span>{stats.viewsChange}</span>
          </div>
        </div>

        {/* Engagement */}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Heart size={20} className="text-red-500" />
            <span className="text-sm text-neutral-600">Engagement</span>
          </div>
          <div className="text-2xl font-bold text-neutral-900 mb-1">
            {stats.engagement.toLocaleString()}
          </div>
          <div className="flex items-center gap-1 text-xs text-green-600">
            <TrendingUp size={12} />
            <span>{stats.engagementChange}</span>
          </div>
        </div>

        {/* Followers */}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users size={20} className="text-purple-500" />
            <span className="text-sm text-neutral-600">Followers</span>
          </div>
          <div className="text-2xl font-bold text-neutral-900 mb-1">
            {stats.followers.toLocaleString()}
          </div>
          <div className="flex items-center gap-1 text-xs text-green-600">
            <TrendingUp size={12} />
            <span>{stats.followersChange}</span>
          </div>
        </div>

        {/* Bookings */}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Calendar size={20} className="text-orange-500" />
            <span className="text-sm text-neutral-600">Bookings</span>
          </div>
          <div className="text-2xl font-bold text-neutral-900 mb-1">
            {stats.bookings}
          </div>
          <div className="flex items-center gap-1 text-xs text-green-600">
            <TrendingUp size={12} />
            <span>{stats.bookingsChange}</span>
          </div>
        </div>
      </div>

      {/* Top Posts */}
      <div className="p-4">
        <h2 className="text-lg font-bold text-neutral-900 mb-3">Top Performing Posts</h2>
        <div className="space-y-3">
          {topPosts.map((post, index) => (
            <div key={post.id} className="bg-white rounded-xl border border-gray-200 p-3 flex items-center gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary-brand text-white rounded-full flex items-center justify-center font-bold">
                {index + 1}
              </div>
              <img
                src={post.image}
                alt={post.title}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-neutral-900 truncate">{post.title}</h3>
                <div className="flex items-center gap-3 mt-1 text-xs text-neutral-600">
                  <span className="flex items-center gap-1">
                    <Eye size={12} />
                    {post.views.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart size={12} />
                    {post.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle size={12} />
                    {post.comments}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="p-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <h2 className="text-lg font-bold text-neutral-900 mb-3">Views Over Time</h2>
          <div className="h-48 flex items-center justify-center bg-neutral-50 rounded-lg">
            <p className="text-neutral-500 text-sm">Chart visualization would go here</p>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
