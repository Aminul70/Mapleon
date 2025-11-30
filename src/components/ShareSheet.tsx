import React, { useEffect, useRef } from 'react';
import { XIcon, LinkIcon, FlagIcon, MessageCircleIcon, MailIcon, Share2Icon, BookmarkIcon } from 'lucide-react';
import { Post } from '../utils/mockData';
import { useNavBar } from '../contexts/NavBarContext';
interface ShareSheetProps {
  post: Post;
  isOpen: boolean;
  onClose: () => void;
}
export function ShareSheet({
  post,
  isOpen,
  onClose
}: ShareSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const { hideNavBar, showNavBar } = useNavBar();
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      hideNavBar();
    } else {
      document.body.style.overflow = 'unset';
      showNavBar();
    }
    return () => {
      document.body.style.overflow = 'unset';
      showNavBar();
    };
  }, [isOpen, hideNavBar, showNavBar]);
  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://mapleon.app/post/${post.id}`);
    alert('Link copied to clipboard!');
    onClose();
  };
  const shareOptions = [{
    icon: MessageCircleIcon,
    label: 'Messages',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50'
  }, {
    icon: MailIcon,
    label: 'Email',
    color: 'text-purple-500',
    bgColor: 'bg-purple-50'
  }, {
    icon: Share2Icon,
    label: 'WhatsApp',
    color: 'text-green-500',
    bgColor: 'bg-green-50'
  }, {
    icon: Share2Icon,
    label: 'Twitter',
    color: 'text-sky-500',
    bgColor: 'bg-sky-50'
  }, {
    icon: Share2Icon,
    label: 'Facebook',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  }, {
    icon: Share2Icon,
    label: 'Instagram',
    color: 'text-pink-500',
    bgColor: 'bg-pink-50'
  }];
  const actions = [{
    icon: LinkIcon,
    label: 'Copy Link',
    onClick: handleCopyLink
  }, {
    icon: BookmarkIcon,
    label: 'Save Post',
    onClick: () => {
      alert('Post saved!');
      onClose();
    }
  }, {
    icon: FlagIcon,
    label: 'Report',
    onClick: () => {
      alert('Report submitted');
      onClose();
    },
    danger: true
  }];
  if (!isOpen) return null;
  return <div className="fixed inset-0 z-50 flex items-end sm:items-center sm:justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      {/* Sheet */}
      <div ref={sheetRef} className="relative w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-3xl animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-mapleon-slate">Share</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <XIcon size={24} className="text-gray-600" />
          </button>
        </div>
        {/* Share Options Grid */}
        <div className="px-6 py-6">
          <div className="grid grid-cols-4 gap-4 mb-6">
            {shareOptions.map(option => {
            const Icon = option.icon;
            return <button key={option.label} onClick={onClose} className="flex flex-col items-center gap-2 active:scale-95 transition-transform">
                  <div className={`w-14 h-14 ${option.bgColor} rounded-full flex items-center justify-center`}>
                    <Icon size={24} className={option.color} />
                  </div>
                  <span className="text-xs text-gray-600 text-center">
                    {option.label}
                  </span>
                </button>;
          })}
          </div>
          {/* Action Buttons */}
          <div className="space-y-2">
            {actions.map(action => {
            const Icon = action.icon;
            return <button key={action.label} onClick={action.onClick} className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-colors ${action.danger ? 'hover:bg-red-50 text-red-600' : 'hover:bg-gray-100 text-mapleon-slate'}`}>
                  <Icon size={22} />
                  <span className="font-medium">{action.label}</span>
                </button>;
          })}
          </div>
        </div>
      </div>
    </div>;
}