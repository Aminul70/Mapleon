import { useState } from 'react';
import { ArrowLeftIcon, HeartIcon, MessageCircleIcon, UserPlusIcon, StarIcon, BellIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '../components/BottomNav';

interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'review';
  user: string;
  userImage: string;
  message: string;
  timestamp: string;
  businessName?: string;
  isRead: boolean;
}

export function Notifications() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'like',
      user: 'Sarah_Foodie',
      userImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
      message: 'liked your post about BrewHaven Cafe',
      timestamp: '2m ago',
      isRead: false
    },
    {
      id: '2',
      type: 'comment',
      user: 'Mike_Fitness',
      userImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
      message: 'commented on your review: "Great recommendation!"',
      timestamp: '15m ago',
      businessName: 'Urban Oasis Gym',
      isRead: false
    },
    {
      id: '3',
      type: 'follow',
      user: 'Emma_Style',
      userImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
      message: 'started following you',
      timestamp: '1h ago',
      isRead: false
    },
    {
      id: '4',
      type: 'review',
      user: 'John_Eats',
      userImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
      message: 'reviewed Tuscany Grill: "Amazing pasta!"',
      timestamp: '3h ago',
      businessName: 'Tuscany Grill',
      isRead: true
    },
    {
      id: '5',
      type: 'like',
      user: 'Lisa_Coffee',
      userImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
      message: 'liked your photo at The Daily Brew',
      timestamp: '5h ago',
      isRead: true
    },
    {
      id: '6',
      type: 'comment',
      user: 'Tom_Wellness',
      userImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200',
      message: 'replied to your comment',
      timestamp: '1d ago',
      isRead: true
    }
  ]);

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, isRead: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, isRead: true })));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <HeartIcon size={20} className="text-red-500" />;
      case 'comment':
        return <MessageCircleIcon size={20} className="text-blue-500" />;
      case 'follow':
        return <UserPlusIcon size={20} className="text-mapleon-teal" />;
      case 'review':
        return <StarIcon size={20} className="text-mapleon-warning" />;
      default:
        return <BellIcon size={20} className="text-gray-500" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="min-h-screen bg-mapleon-gray pb-24">
      {/* Header */}
      <div className="bg-white px-4 sm:px-6 pt-4 pb-4 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/home')}
              className="p-2 -ml-2 active:scale-95 transition-transform"
            >
              <ArrowLeftIcon size={22} className="text-mapleon-slate" />
            </button>
            <h1 className="text-2xl font-bold text-mapleon-slate">
              Notifications
            </h1>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-sm font-medium text-mapleon-coral active:scale-95 transition-transform"
            >
              Mark all read
            </button>
          )}
        </div>
        {unreadCount > 0 && (
          <p className="text-sm text-gray-500">
            {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      {/* Notifications List */}
      <div className="px-4 sm:px-6 py-4">
        <div className="space-y-2">
          {notifications.map(notification => (
            <button
              key={notification.id}
              onClick={() => {
                markAsRead(notification.id);
                if (notification.businessName) {
                  navigate('/business/1');
                }
              }}
              className={`w-full bg-white rounded-2xl p-4 flex items-start gap-3 transition-all active:scale-95 ${
                !notification.isRead ? 'shadow-md border-l-4 border-mapleon-coral' : 'shadow-sm'
              }`}
            >
              {/* User Avatar */}
              <img
                src={notification.userImage}
                alt={notification.user}
                className="w-12 h-12 rounded-full object-cover flex-shrink-0"
              />

              {/* Notification Content */}
              <div className="flex-1 text-left min-w-0">
                <div className="flex items-start gap-2">
                  <div className="flex-1">
                    <p className={`text-sm ${!notification.isRead ? 'font-semibold' : 'font-normal'}`}>
                      <span className="text-mapleon-slate">{notification.user}</span>{' '}
                      <span className="text-gray-600">{notification.message}</span>
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {notification.timestamp}
                    </p>
                  </div>
                  {!notification.isRead && (
                    <div className="w-2 h-2 bg-mapleon-coral rounded-full flex-shrink-0 mt-1" />
                  )}
                </div>
              </div>

              {/* Icon */}
              <div className="flex-shrink-0">
                {getIcon(notification.type)}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Empty State (if needed) */}
      {notifications.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-20 h-20 bg-mapleon-gray rounded-full flex items-center justify-center mb-4">
            <BellIcon size={40} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-mapleon-slate mb-2">
            No notifications yet
          </h3>
          <p className="text-gray-500 text-center max-w-sm">
            When you get notifications, they'll show up here
          </p>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
