import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Image as ImageIcon, Video, MapPin, Tag, Smile, AtSign, Hash, Upload } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/Button';

export function CreatePost() {
  const navigate = useNavigate();
  const { currentUser, isBusinessAccount } = useAuth();
  const [postType, setPostType] = useState<'image' | 'video'>('image');
  const [imageUrl, setImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [videoPreview, setVideoPreview] = useState('');
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Redirect if not a business account
  if (!isBusinessAccount) {
    navigate('/home');
    return null;
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        if (postType === 'image') {
          setImageUrl(result);
          setImagePreview(result);
        } else {
          setVideoUrl(result);
          setVideoPreview(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        if (postType === 'image' && file.type.startsWith('image/')) {
          setImageUrl(result);
          setImagePreview(result);
        } else if (postType === 'video' && file.type.startsWith('video/')) {
          setVideoUrl(result);
          setVideoPreview(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const removeMedia = () => {
    if (postType === 'image') {
      setImageUrl('');
      setImagePreview('');
    } else {
      setVideoUrl('');
      setVideoPreview('');
    }
  };

  const handleSubmit = async () => {
    if (!imageUrl && !videoUrl) {
      alert('Please upload an image or video');
      return;
    }

    if (!caption.trim()) {
      alert('Please add a caption');
      return;
    }

    setIsSubmitting(true);

    // Simulate post creation
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Post created successfully! 🎉');
      navigate('/business-profile');
    }, 1500);
  };

  const handleClose = () => {
    if (imageUrl || videoUrl || caption) {
      if (window.confirm('Discard this post?')) {
        navigate(-1);
      }
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 max-w-4xl mx-auto">
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            data-testid="close-create-post-btn"
          >
            <X size={24} className="text-gray-700" />
          </button>
          <h1 className="text-lg font-bold text-neutral-900">Create Post</h1>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || (!imageUrl && !videoUrl) || !caption.trim()}
            className="px-6 py-2 bg-primary-brand text-white rounded-full font-semibold hover:bg-primary-dark disabled:opacity-40 disabled:cursor-not-allowed transition-all text-sm"
            data-testid="publish-post-btn"
          >
            {isSubmitting ? 'Publishing...' : 'Publish'}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-5 pb-24 max-w-2xl mx-auto">
        {/* Business Info */}
        <div className="flex items-center gap-3 bg-gradient-to-r from-white to-primary-brand/5 rounded-2xl p-4 border border-gray-200 shadow-sm">
          <img
            src={currentUser?.profileImage}
            alt={currentUser?.name}
            className="w-14 h-14 rounded-full object-cover border-2 border-primary-brand/20 shadow-md"
          />
          <div>
            <p className="font-bold text-neutral-900">{currentUser?.name}</p>
            <p className="text-sm text-neutral-600">@{currentUser?.username}</p>
          </div>
        </div>

        {/* Post Type Selector */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <label className="block text-sm font-semibold text-gray-800 mb-3">
            Post Type
          </label>
          <div className="flex gap-3">
            <button
              onClick={() => setPostType('image')}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold transition-all duration-200 ${
                postType === 'image'
                  ? 'bg-gradient-to-r from-primary-brand to-primary-dark text-white shadow-lg scale-[1.02]'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-[1.01]'
              }`}
              data-testid="image-post-type-btn"
            >
              <ImageIcon size={20} />
              <span>Image</span>
            </button>
            <button
              onClick={() => setPostType('video')}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold transition-all duration-200 ${
                postType === 'video'
                  ? 'bg-gradient-to-r from-primary-brand to-primary-dark text-white shadow-lg scale-[1.02]'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-[1.01]'
              }`}
              data-testid="video-post-type-btn"
            >
              <Video size={20} />
              <span>Video</span>
            </button>
          </div>
        </div>

        {/* Media Upload */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          {postType === 'image' ? (
            <ImageUploadField
              label="Post Image"
              value={imageUrl}
              onChange={setImageUrl}
              aspectRatio="square"
              maxSizeMB={10}
              helperText="High-quality images get more engagement"
            />
          ) : (
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-3">
                Video URL or Upload
              </label>
              <input
                type="text"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="Paste video URL or upload file"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-brand/30 focus:border-primary-brand transition-all"
                data-testid="video-url-input"
              />
              <div className="mt-3 flex items-start gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">i</div>
                <p className="text-xs text-blue-800">
                  <strong>Note:</strong> Video upload feature coming soon. You can paste a video URL for now.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Caption */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <label className="block text-sm font-semibold text-gray-800 mb-3">
            Caption
          </label>
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Write a caption for your post..."
            rows={4}
            maxLength={500}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-brand/30 focus:border-primary-brand resize-none transition-all"
            data-testid="caption-input"
          />
          <div className="flex justify-between items-center mt-2">
            <p className="text-xs text-gray-500">{caption.length}/500 characters</p>
            {caption.length > 450 && (
              <p className="text-xs text-orange-600 font-medium">Almost at limit!</p>
            )}
          </div>
        </div>

        {/* Location */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <label className="block text-sm font-semibold text-gray-800 mb-3">
            Location (Optional)
          </label>
          <div className="relative">
            <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Add location"
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-brand/30 focus:border-primary-brand transition-all"
              data-testid="location-input"
            />
          </div>
        </div>

        {/* Tags */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <label className="block text-sm font-semibold text-gray-800 mb-3">
            Tags (Optional)
          </label>
          <div className="flex gap-2 mb-3">
            <div className="relative flex-1">
              <Tag size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
                placeholder="Add tag"
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-brand/30 focus:border-primary-brand text-sm transition-all"
                data-testid="tag-input"
              />
            </div>
            <button
              onClick={handleAddTag}
              className="px-5 py-3 bg-gradient-to-r from-secondary-teal to-secondary-teal/90 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all text-sm"
              data-testid="add-tag-btn"
            >
              Add
            </button>
          </div>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-primary-brand/10 to-secondary-teal/10 text-primary-brand rounded-full text-sm font-semibold border border-primary-brand/20"
                >
                  #{tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:bg-primary-brand/20 rounded-full p-0.5 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="sticky bottom-0 bg-neutral-50 pt-4 pb-8">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full py-4 bg-gradient-to-r from-primary-brand via-primary-dark to-secondary-teal text-white rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            data-testid="publish-post-btn"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Publishing...
              </span>
            ) : (
              '✨ Publish Post'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
