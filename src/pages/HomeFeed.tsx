import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { BellIcon } from 'lucide-react';
import { FeedPost } from '../components/FeedPost';
import { BottomNav } from '../components/BottomNav';
import { mockPosts } from '../utils/mockData';

export function HomeFeed() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const preventScroll = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };
    container.addEventListener('touchmove', preventScroll, {
      passive: false
    });
    return () => {
      container.removeEventListener('touchmove', preventScroll);
    };
  }, []);
  
  return <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* Notification Bell */}
      {!isModalOpen && (
        <button
          onClick={() => navigate('/notifications')}
          className="absolute top-6 right-6 z-50 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center active:scale-95 transition-transform"
        >
          <BellIcon size={20} className="text-white" />
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-xs text-white font-bold">3</span>
          </div>
        </button>
      )}
      
      <div ref={containerRef} className="h-full w-full overflow-y-scroll snap-y snap-mandatory snap-container">
        {mockPosts.map(post => <FeedPost key={post.id} post={post} onModalStateChange={setIsModalOpen} />)}
      </div>
      {!isModalOpen && <BottomNav />}
    </div>;
}