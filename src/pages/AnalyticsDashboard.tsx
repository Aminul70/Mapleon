import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Eye, Heart, MessageCircle, Users, Calendar, DollarSign } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { BottomNav } from '../components/BottomNav';

export function AnalyticsDashboard() {
  const navigate = useNavigate();
  const { isBusinessAccount } = useAuth();

  // Redirect if not business account
  if (!isBusinessAccount) {
    navigate('/profile');
    return null;
  }

  // Mock analytics data
  const analyticsData = {
    overview: {
      totalViews: 45678,
      totalLikes: 12543,
      totalComments: 3421,
      totalShares: 892,
      followers: 5432,
      growth: '+12.5%',
    },
    posts: [
      {
        id: '1',
        title: 'New Summer Menu Launch',
        views: 12400,
        likes: 3200,
        comments: 456,
        date: '2 days ago',
        image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400',
      },
      {
        id: '2',
        title: 'Behind the Scenes: Coffee Art',
        views: 8900,
        likes: 2100,
        comments: 234,
        date: '5 days ago',
        image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400',
      },
      {
        id: '3',
        title: 'Customer Favorites',
        views: 6700,
        likes: 1800,
        comments: 189,
        date: '1 week ago',
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
      },
    ],
    weeklyData: [
      { day: 'Mon', views: 1200, engagement: 340 },
      { day: 'Tue', views: 1800, engagement: 520 },
      { day: 'Wed', views: 2100, engagement: 680 },
      { day: 'Thu', views: 1900, engagement: 590 },
      { day: 'Fri', views: 2400, engagement: 780 },
      { day: 'Sat', views: 3200, engagement: 1020 },
      { day: 'Sun', views: 2900, engagement: 890 },
    ],
  };

  const maxViews = Math.max(...analyticsData.weeklyData.map(d => d.views));

  return (
    <div className="min-h-screen bg-neutral-50 pb-24">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center gap-3 px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-xl font-bold text-neutral-900">Analytics</h1>
            <p className="text-sm text-neutral-600">Last 30 days</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Overview Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 bg-primary-brand/10 rounded-full flex items-center justify-center">
                <Eye size={20} className="text-primary-brand" />
              </div>
            </div>
            <p className="text-2xl font-bold text-neutral-900">
              {analyticsData.overview.totalViews.toLocaleString()}
            </p>
            <p className="text-sm text-neutral-600">Total Views</p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp size={14} className="text-success" />
              <span className="text-xs font-medium text-success">
                {analyticsData.overview.growth}
              </span>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 bg-error/10 rounded-full flex items-center justify-center">
                <Heart size={20} className="text-error" />
              </div>
            </div>
            <p className="text-2xl font-bold text-neutral-900">
              {analyticsData.overview.totalLikes.toLocaleString()}
            </p>
            <p className="text-sm text-neutral-600">Total Likes</p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp size={14} className="text-success" />
              <span className="text-xs font-medium text-success">+8.2%</span>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 bg-secondary-blue/10 rounded-full flex items-center justify-center">
                <MessageCircle size={20} className="text-secondary-blue" />
              </div>
            </div>
            <p className="text-2xl font-bold text-neutral-900">
              {analyticsData.overview.totalComments.toLocaleString()}
            </p>
            <p className="text-sm text-neutral-600">Comments</p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp size={14} className="text-success" />
              <span className="text-xs font-medium text-success">+15.3%</span>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 bg-secondary-purple/10 rounded-full flex items-center justify-center">
                <Users size={20} className="text-secondary-purple" />
              </div>
            </div>
            <p className="text-2xl font-bold text-neutral-900">
              {analyticsData.overview.followers.toLocaleString()}
            </p>
            <p className="text-sm text-neutral-600">Followers</p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp size={14} className="text-success" />
              <span className="text-xs font-medium text-success">+12.5%</span>
            </div>
          </div>
        </div>

        {/* Weekly Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <h3 className="font-semibold text-neutral-900 mb-4">Weekly Performance</h3>
          <div className="flex items-end justify-between gap-2 h-40">
            {analyticsData.weeklyData.map((data, index) => {
              const height = (data.views / maxViews) * 100;
              return (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex flex-col items-center justify-end flex-1">
                    <div
                      className="w-full bg-gradient-to-t from-primary-brand to-primary-light rounded-t-lg transition-all hover:opacity-80 cursor-pointer"
                      style={{ height: `${height}%` }}
                      title={`${data.views} views`}
                    />
                  </div>
                  <span className="text-xs text-neutral-600 font-medium">{data.day}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Posts */}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <h3 className="font-semibold text-neutral-900 mb-4">Top Performing Posts</h3>
          <div className="space-y-3">
            {analyticsData.posts.map((post) => (
              <div
                key={post.id}
                className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-neutral-900 truncate">{post.title}</p>
                  <p className="text-xs text-neutral-500">{post.date}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-neutral-600 flex items-center gap-1">
                      <Eye size={12} />
                      {(post.views / 1000).toFixed(1)}K
                    </span>
                    <span className="text-xs text-neutral-600 flex items-center gap-1">
                      <Heart size={12} />
                      {(post.likes / 1000).toFixed(1)}K
                    </span>
                    <span className="text-xs text-neutral-600 flex items-center gap-1">
                      <MessageCircle size={12} />
                      {post.comments}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gradient-to-br from-secondary-teal to-secondary-blue rounded-xl p-4 text-white">
            <Calendar size={24} className="mb-2 opacity-80" />
            <p className="text-2xl font-bold">24</p>
            <p className="text-sm opacity-80">Bookings</p>
          </div>
          <div className="bg-gradient-to-br from-business-badge to-warning rounded-xl p-4 text-white">
            <DollarSign size={24} className="mb-2 opacity-80" />
            <p className="text-2xl font-bold">$2,450</p>
            <p className="text-sm opacity-80">Revenue</p>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
