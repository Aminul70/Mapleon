import React, { useEffect, useState, useRef } from 'react';
import { FeedPost } from '../components/FeedPost';
import { BottomNav } from '../components/BottomNav';
import { mockPosts } from '../utils/mockData';
export function HomeFeed() {
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
      <div ref={containerRef} className="h-full w-full overflow-y-scroll snap-y snap-mandatory snap-container">
        {mockPosts.map(post => <FeedPost key={post.id} post={post} onModalStateChange={setIsModalOpen} />)}
      </div>
      {!isModalOpen && <BottomNav />}
    </div>;
}