import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { BellIcon } from 'lucide-react';
import { FeedPost } from '../components/FeedPost';
import { BottomNav } from '../components/BottomNav';
import { CategoryFilter } from '../components/CategoryFilter';
import { mockPosts } from '../utils/mockData';

export function HomeFeed() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Filter posts based on selected category
  const filteredPosts = selectedCategory
    ? mockPosts.filter(post => post.businessCategory.toLowerCase() === selectedCategory.toLowerCase())
    : mockPosts;
  
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
  
  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* Top Bar - Category Filter & Notification */}
      {!isModalOpen && (
        <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-4 bg-gradient-to-b from-black/60 to-transparent">
          {/* Category Filter */}
          <CategoryFilter 
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          
          {/* Notification Bell */}
          <button
            onClick={() => navigate('/notifications')}
            className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center active:scale-95 transition-transform"
          >
            <BellIcon size={20} className="text-white" />
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">3</span>
            </div>
          </button>
        </div>
      )}
      
      <div ref={containerRef} className="h-full w-full overflow-y-scroll snap-y snap-mandatory snap-container">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <FeedPost key={post.id} post={post} onModalStateChange={setIsModalOpen} />
          ))
        ) : (
          <div className="h-screen flex items-center justify-center">
            <div className="text-center px-6">
              <p className="text-white text-lg font-semibold mb-2">No posts in this category</p>
              <p className="text-white/60 text-sm">Try selecting a different category</p>
            </div>
          </div>
        )}
      </div>
      {!isModalOpen && <BottomNav />}
    </div>
  );
}