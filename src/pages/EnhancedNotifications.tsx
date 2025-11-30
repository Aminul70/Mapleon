import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, MessageCircle, UserPlus, AtSign, Video, Calendar } from 'lucide-react';
import { mockNotifications } from '../utils/mockData';
import { Button } from '../components/Button';

export function EnhancedNotifications() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'all' | 'mentions' | 'businesses'>('all');
  const [notifications, setNotifications] = useState(mockNotifications);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'mentions') return n.type === 'mention';
    if (filter === 'businesses') return n.type === 'business_post';
    return true;
  });

  const groupedNotifications: { [key: string]: typeof notifications } = {};
  filteredNotifications.forEach(notification => {
    const key = notification.timestamp.includes('ago') ? 'Today' : notification.timestamp;
    if (!groupedNotifications[key]) {
      groupedNotifications[key] = [];
    }
    groupedNotifications[key].push(notification);
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'like': return <Heart size={16} className="fill-red-500 text-red-500" />;
      case 'comment': return <MessageCircle size={16} className="text-blue-500" />;
      case 'follow': return <UserPlus size={16} className="text-green-500" />;
      case 'mention': return <AtSign size={16} className="text-purple-500" />;
      case 'business_post': return <Video size={16} className="text-orange-500" />;
      case 'booking': return <Calendar size={16} className="text-teal-500" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-xl font-bold">Notifications</h1>
          </div>
          <button
            onClick={markAllAsRead}
            className="text-sm font-medium text-primary-brand hover:text-primary-dark"
          >
            Mark all read
          </button>
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
            onClick={() => setFilter('mentions')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === 'mentions'
                ? 'bg-primary-brand text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Mentions
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
        </div>
      </div>

      {/* Notifications List */}
      <div className="pb-6">
        {Object.entries(groupedNotifications).map(([date, notifs]) => (
          <div key={date}>
            <div className="px-4 py-2 bg-neutral-100">
              <h3 className="text-xs font-semibold text-neutral-600 uppercase">{date}</h3>
            </div>
            {notifs.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-start gap-3 px-4 py-3 hover:bg-gray-50 border-b border-gray-100 ${
                  !notification.read ? 'bg-primary-subtle' : ''
                }`}
              >
                <img
                  src={notification.userImage}
                  alt={notification.userName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-neutral-900">
                    <span className="font-semibold">{notification.userName}</span>{' '}
                    <span className="text-neutral-600">{notification.message}</span>
                  </p>
                  <p className="text-xs text-neutral-500 mt-1">{notification.timestamp}</p>
                </div>
                <div className="flex-shrink-0">
                  {getIcon(notification.type)}
                </div>
                {notification.type === 'follow' && (
                  <Button variant="primary" size="sm">
                    Follow
                  </Button>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
