import React, { useEffect, useState, useRef } from 'react';
import { XIcon, HeartIcon, SendIcon, SmileIcon } from 'lucide-react';
import { Post } from '../utils/mockData';
interface Comment {
  id: string;
  username: string;
  profileImage: string;
  text: string;
  timestamp: string;
  likes: number;
  replies?: Comment[];
}
interface CommentsModalProps {
  post: Post;
  isOpen: boolean;
  onClose: () => void;
}
export function CommentsModal({
  post,
  isOpen,
  onClose
}: CommentsModalProps) {
  const [comments, setComments] = useState<Comment[]>([{
    id: '1',
    username: 'foodie_adventures',
    profileImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200',
    text: 'This place looks absolutely amazing! 😍',
    timestamp: '2h',
    likes: 8098,
    replies: [{
      id: '1-1',
      username: 'chef_mike',
      profileImage: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200',
      text: 'Totally agree! Been there twice already',
      timestamp: '1h',
      likes: 234
    }]
  }, {
    id: '2',
    username: 'local_explorer',
    profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
    text: 'Adding this to my must-visit list!',
    timestamp: '3h',
    likes: 5642
  }, {
    id: '3',
    username: 'taste_tester',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    text: 'The vibes here are unmatched 🔥',
    timestamp: '5h',
    likes: 3421
  }]);
  const [newComment, setNewComment] = useState('');
  const [expandedReplies, setExpandedReplies] = useState<Set<string>>(new Set());
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set());
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
  const toggleReplies = (commentId: string) => {
    const newExpanded = new Set(expandedReplies);
    if (newExpanded.has(commentId)) {
      newExpanded.delete(commentId);
    } else {
      newExpanded.add(commentId);
    }
    setExpandedReplies(newExpanded);
  };
  const toggleLike = (commentId: string) => {
    const newLiked = new Set(likedComments);
    if (newLiked.has(commentId)) {
      newLiked.delete(commentId);
    } else {
      newLiked.add(commentId);
    }
    setLikedComments(newLiked);
  };
  const handleSubmit = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        username: 'Coffee_Lover92',
        profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
        text: newComment,
        timestamp: 'Just now',
        likes: 0
      };
      setComments([comment, ...comments]);
      setNewComment('');
    }
  };
  if (!isOpen) return null;
  return <div className="fixed inset-0 z-50 flex items-end sm:items-center sm:justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      {/* Modal */}
      <div ref={modalRef} className="relative w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-3xl max-h-[85vh] flex flex-col animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-mapleon-slate">
            {post.comments} comments
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <XIcon size={24} className="text-gray-600" />
          </button>
        </div>
        {/* Comments List */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {comments.map(comment => <div key={comment.id} className="mb-6">
              <div className="flex gap-3">
                <img src={comment.profileImage} alt={comment.username} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex-1">
                      <span className="font-semibold text-mapleon-slate text-sm">
                        {comment.username}
                      </span>
                      <p className="text-mapleon-slate text-sm mt-1 break-words">
                        {comment.text}
                      </p>
                    </div>
                    <button onClick={() => toggleLike(comment.id)} className="flex-shrink-0 flex flex-col items-center gap-1 p-2 -mr-2">
                      <HeartIcon size={20} className={`transition-colors ${likedComments.has(comment.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                      <span className="text-xs text-gray-500 font-medium">
                        {comment.likes > 1000 ? `${(comment.likes / 1000).toFixed(1)}K` : comment.likes}
                      </span>
                    </button>
                  </div>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-xs text-gray-500">
                      {comment.timestamp}
                    </span>
                    <button className="text-xs font-semibold text-gray-600">
                      Reply
                    </button>
                    {comment.replies && comment.replies.length > 0 && <button onClick={() => toggleReplies(comment.id)} className="text-xs font-semibold text-gray-600 flex items-center gap-1">
                        View replies ({comment.replies.length})
                        <span className={`transition-transform ${expandedReplies.has(comment.id) ? 'rotate-180' : ''}`}>
                          ▼
                        </span>
                      </button>}
                  </div>
                  {/* Replies */}
                  {expandedReplies.has(comment.id) && comment.replies && <div className="mt-4 space-y-4 pl-4 border-l-2 border-gray-200">
                      {comment.replies.map(reply => <div key={reply.id} className="flex gap-3">
                          <img src={reply.profileImage} alt={reply.username} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                          <div className="flex-1">
                            <span className="font-semibold text-mapleon-slate text-sm">
                              {reply.username}
                            </span>
                            <p className="text-mapleon-slate text-sm mt-1">
                              {reply.text}
                            </p>
                            <span className="text-xs text-gray-500 mt-2 inline-block">
                              {reply.timestamp}
                            </span>
                          </div>
                        </div>)}
                    </div>}
                </div>
              </div>
            </div>)}
        </div>
        {/* Input */}
        <div className="border-t border-gray-200 px-6 py-4 bg-white">
          <div className="flex items-center gap-3">
            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200" alt="Your profile" className="w-8 h-8 rounded-full object-cover" />
            <input type="text" value={newComment} onChange={e => setNewComment(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSubmit()} placeholder="Add comment..." className="flex-1 px-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-mapleon-coral/30" />
            <button className="p-2 text-gray-400">
              <SmileIcon size={20} />
            </button>
            <button onClick={handleSubmit} disabled={!newComment.trim()} className={`transition-colors ${newComment.trim() ? 'text-mapleon-coral' : 'text-gray-300'}`}>
              <SendIcon size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>;
}