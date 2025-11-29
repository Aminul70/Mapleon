import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeartIcon, MessageCircleIcon, Share2Icon, MapPinIcon, MoreVerticalIcon, PlayIcon, PauseIcon } from 'lucide-react';
import { Post } from '../utils/mockData';
import { CommentsModal } from './CommentsModal';
import { ShareSheet } from './ShareSheet';
interface FeedPostProps {
  post: Post;
  onModalStateChange?: (isOpen: boolean) => void;
}
export function FeedPost({
  post,
  onModalStateChange
}: FeedPostProps) {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [captionExpanded, setCaptionExpanded] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true); // Video is playing by default
  const [showPauseAnimation, setShowPauseAnimation] = useState(false);
  const captionRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };
  // Notify parent when modal state changes
  useEffect(() => {
    const isAnyModalOpen = showComments || showShare;
    onModalStateChange?.(isAnyModalOpen);
  }, [showComments, showShare, onModalStateChange]);
  // Handle click outside to collapse caption
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (captionRef.current && !captionRef.current.contains(event.target as Node)) {
        setCaptionExpanded(false);
      }
    };
    if (captionExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside as any);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside as any);
    };
  }, [captionExpanded]);
  const handleDirections = () => {
    // Navigate to map with post location
    navigate('/map', {
      state: {
        targetLocation: {
          lat: 40.7589 + (Math.random() - 0.5) * 0.02,
          lng: -73.9851 + (Math.random() - 0.5) * 0.02
        },
        businessName: post.businessName
      }
    });
  };

  const handleVideoClick = () => {
    setIsPlaying(!isPlaying);
    
    // Show pause animation when pausing
    if (isPlaying) {
      setShowPauseAnimation(true);
      setTimeout(() => setShowPauseAnimation(false), 400);
    }
  };
  return <>
      <div className="relative h-screen w-full snap-start snap-always overflow-hidden">
        {/* Background Image - Clickable for play/pause */}
        <div 
          ref={videoContainerRef}
          onClick={handleVideoClick}
          className="absolute inset-0 cursor-pointer"
        >
          <img src={post.image} alt={post.businessName} className="absolute inset-0 w-full h-full object-cover" />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90 pointer-events-none" />
          
          {/* Center Play Button - Only shown when paused */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-black/50 backdrop-blur-sm rounded-full p-6 animate-fade-in">
                <PlayIcon size={48} className="text-white fill-white" />
              </div>
            </div>
          )}

          {/* Pause Animation - Brief animation when pausing */}
          {showPauseAnimation && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-black/50 backdrop-blur-sm rounded-full p-6 animate-pulse-once">
                <PauseIcon size={48} className="text-white fill-white" />
              </div>
            </div>
          )}
        </div>

        {/* Right Side Actions - Show numbers only when paused, just icons when playing */}
        <div className="absolute right-2 bottom-[240px] sm:right-3 sm:bottom-[260px] flex flex-col gap-3 sm:gap-4 z-30">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setLiked(!liked);
            }} 
            className="flex flex-col items-center gap-1 active:scale-95 p-1 icon-transition-fast"
          >
            {isPlaying ? (
              // Playing: Icon only
              <div className="bg-white/20 backdrop-blur-md p-3 rounded-full shadow-lg icon-transition icon-bg-transition">
                <HeartIcon size={24} className={`icon-content-transition ${liked ? 'fill-white text-white' : 'text-white'}`} />
              </div>
            ) : (
              // Paused: Icon with number
              <div className="bg-gray-200/90 backdrop-blur-sm px-4 py-2.5 sm:px-5 sm:py-3 rounded-full flex items-center gap-2 shadow-lg icon-transition icon-bg-transition">
                <HeartIcon size={20} className={`sm:w-6 sm:h-6 icon-content-transition ${liked ? 'fill-red-500 text-red-500' : 'text-gray-800'}`} />
                <span className="text-gray-800 text-sm sm:text-base font-semibold icon-number-enter">
                  {formatNumber(post.likes)}
                </span>
              </div>
            )}
          </button>

          <button 
            onClick={(e) => {
              e.stopPropagation();
              setShowComments(true);
            }} 
            className="flex flex-col items-center gap-1 active:scale-95 p-1 icon-transition-fast"
          >
            {isPlaying ? (
              <div className="bg-white/20 backdrop-blur-md p-3 rounded-full shadow-lg icon-transition icon-bg-transition">
                <MessageCircleIcon size={24} className="text-white icon-content-transition" />
              </div>
            ) : (
              <div className="bg-gray-200/90 backdrop-blur-sm px-4 py-2.5 sm:px-5 sm:py-3 rounded-full flex items-center gap-2 shadow-lg icon-transition icon-bg-transition">
                <MessageCircleIcon size={20} className="sm:w-6 sm:h-6 text-gray-800 icon-content-transition" />
                <span className="text-gray-800 text-sm sm:text-base font-semibold icon-number-enter">
                  {post.comments}
                </span>
              </div>
            )}
          </button>

          <button 
            onClick={(e) => {
              e.stopPropagation();
              setShowShare(true);
            }} 
            className="flex flex-col items-center gap-1 active:scale-95 p-1 icon-transition-fast"
          >
            {isPlaying ? (
              <div className="bg-white/20 backdrop-blur-md p-3 rounded-full shadow-lg icon-transition icon-bg-transition">
                <Share2Icon size={24} className="text-white icon-content-transition" />
              </div>
            ) : (
              <div className="bg-gray-200/90 backdrop-blur-sm px-4 py-2.5 sm:px-5 sm:py-3 rounded-full flex items-center gap-2 shadow-lg icon-transition icon-bg-transition">
                <Share2Icon size={20} className="sm:w-6 sm:h-6 text-gray-800 icon-content-transition" />
                <span className="text-gray-800 text-sm sm:text-base font-semibold icon-number-enter">
                  {formatNumber(post.shares)}
                </span>
              </div>
            )}
          </button>

          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleDirections();
            }} 
            className="active:scale-95 icon-transition-fast"
          >
            {isPlaying ? (
              <div className="bg-white/20 backdrop-blur-md p-3 rounded-full shadow-lg icon-transition icon-bg-transition">
                <MapPinIcon size={24} className="text-white icon-content-transition" />
              </div>
            ) : (
              <div className="bg-gray-800/90 backdrop-blur-sm px-5 py-2.5 sm:px-6 sm:py-3 rounded-full shadow-lg icon-transition icon-bg-transition">
                <span className="text-white text-sm sm:text-base font-semibold icon-number-enter">
                  Directions
                </span>
              </div>
            )}
          </button>
        </div>

        {/* Bottom Info Section */}
        <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none">
          <div className="bg-gradient-to-t from-black/95 via-black/80 to-transparent px-4 sm:px-6 pt-8 pb-24 pointer-events-auto">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <img src={post.profileImage} alt={post.businessName} className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border-2 border-white/30 object-cover" />
                <div>
                  <h3 className="text-white font-bold text-base sm:text-lg">
                    {post.businessName}
                  </h3>
                  <p className="text-white/70 text-xs sm:text-sm">
                    {post.businessCategory}
                  </p>
                </div>
              </div>

              <button className="text-white p-2 -mr-2 active:scale-95 transition-transform">
                <MoreVerticalIcon size={22} />
              </button>
            </div>

            {/* Smaller Book a Table Button */}
            <button 
              onClick={() => navigate('/bookings')}
              className="bg-white text-gray-800 font-semibold px-6 py-2.5 sm:px-7 sm:py-3 rounded-full mb-3 active:scale-95 transition-all shadow-lg text-sm sm:text-base"
            >
              Book a Table
            </button>

            {/* Collapsible Caption */}
            <div ref={captionRef} className="relative">
              <p onClick={() => setCaptionExpanded(!captionExpanded)} className={`text-white text-sm sm:text-base leading-relaxed cursor-pointer transition-all duration-300 ${captionExpanded ? 'line-clamp-none' : 'line-clamp-2'}`}>
                {post.caption}
              </p>
              {!captionExpanded && post.caption.length > 100 && <button onClick={() => setCaptionExpanded(true)} className="text-white/70 text-sm mt-1 font-medium">
                  more
                </button>}
            </div>
          </div>
        </div>
      </div>
      <CommentsModal post={post} isOpen={showComments} onClose={() => setShowComments(false)} />
      <ShareSheet post={post} isOpen={showShare} onClose={() => setShowShare(false)} />
    </>;
}