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
      <div className="max-w-2xl mx-auto p-4 pb-24">
        <div className="space-y-4">
          {/* Author Info */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3">
              <img
                src={currentUser?.profileImage}
                alt={currentUser?.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-gray-900">{currentUser?.name}</p>
                <p className="text-sm text-gray-500">@{currentUser?.username}</p>
              </div>
            </div>
          </div>

          {/* Caption */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Write a caption..."
              rows={5}
              maxLength={500}
              className="w-full px-0 py-0 text-gray-900 placeholder-gray-400 focus:outline-none resize-none"
              data-testid="caption-input"
            />
            <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-400 hover:text-primary-brand hover:bg-gray-50 rounded-full transition-all">
                  <Smile size={20} />
                </button>
                <button className="p-2 text-gray-400 hover:text-primary-brand hover:bg-gray-50 rounded-full transition-all">
                  <Hash size={20} />
                </button>
                <button className="p-2 text-gray-400 hover:text-primary-brand hover:bg-gray-50 rounded-full transition-all">
                  <AtSign size={20} />
                </button>
              </div>
              <span className={`text-sm font-medium ${caption.length > 450 ? 'text-orange-600' : 'text-gray-400'}`}>
                {caption.length}/500
              </span>
            </div>
          </div>

          {/* Media Upload */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200">
            {/* Media Type Tabs */}
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setPostType('image')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 font-medium transition-all ${
                  postType === 'image'
                    ? 'bg-primary-brand/5 text-primary-brand border-b-2 border-primary-brand'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
                data-testid="image-post-type-btn"
              >
                <ImageIcon size={18} />
                <span>Image</span>
              </button>
              <button
                onClick={() => setPostType('video')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 font-medium transition-all ${
                  postType === 'video'
                    ? 'bg-primary-brand/5 text-primary-brand border-b-2 border-primary-brand'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
                data-testid="video-post-type-btn"
              >
                <Video size={18} />
                <span>Video</span>
              </button>
            </div>

            {/* Upload Area */}
            <div className="p-6">
              <input
                ref={fileInputRef}
                type="file"
                accept={postType === 'image' ? 'image/*' : 'video/*'}
                onChange={handleFileSelect}
                className="hidden"
              />

              {(postType === 'image' && imagePreview) || (postType === 'video' && videoPreview) ? (
                <div className="relative group">
                  {postType === 'image' ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full aspect-square object-cover rounded-xl"
                    />
                  ) : (
                    <video
                      src={videoPreview}
                      controls
                      className="w-full aspect-square object-cover rounded-xl bg-black"
                    />
                  )}
                  <button
                    onClick={removeMedia}
                    className="absolute top-3 right-3 p-2 bg-black/60 hover:bg-black/80 text-white rounded-full backdrop-blur-sm transition-all"
                  >
                    <X size={20} />
                  </button>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-3 right-3 px-4 py-2 bg-white/90 hover:bg-white text-gray-800 rounded-full backdrop-blur-sm transition-all font-medium text-sm shadow-lg"
                  >
                    Change
                  </button>
                </div>
              ) : (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative aspect-square border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all ${
                    isDragging
                      ? 'border-primary-brand bg-primary-brand/5 scale-[1.02]'
                      : 'border-gray-300 hover:border-primary-brand hover:bg-gray-50'
                  }`}
                >
                  <div className="text-center p-8">
                    <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-primary-brand/10 to-secondary-teal/10 rounded-full flex items-center justify-center">
                      <Upload size={40} className="text-primary-brand" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {postType === 'image' ? 'Upload an image' : 'Upload a video'}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Drag and drop or click to browse
                    </p>
                    <button className="px-6 py-2.5 bg-primary-brand text-white rounded-full font-medium hover:bg-primary-dark transition-all">
                      Select File
                    </button>
                    <p className="text-xs text-gray-500 mt-4">
                      {postType === 'image' 
                        ? 'Recommended: 1080x1080px or higher, JPG, PNG'
                        : 'Recommended: MP4, MOV, max 100MB'
                      }
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Location */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary-brand/10 rounded-full">
                <MapPin size={20} className="text-primary-brand" />
              </div>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Add location"
                className="flex-1 text-gray-900 placeholder-gray-400 focus:outline-none"
                data-testid="location-input"
              />
            </div>
          </div>

          {/* Tags */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-primary-brand/10 rounded-full">
                <Hash size={20} className="text-primary-brand" />
              </div>
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
                placeholder="Add tags (press Enter)"
                className="flex-1 text-gray-900 placeholder-gray-400 focus:outline-none"
                data-testid="tag-input"
              />
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-100">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-primary-brand/10 text-primary-brand rounded-full text-sm font-medium"
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
        </div>
      </div>
    </div>
  );
}
