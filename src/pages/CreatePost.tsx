import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Image as ImageIcon, Video, MapPin, Smile, Hash } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function CreatePost() {
  const navigate = useNavigate();
  const { currentUser, isBusinessAccount } = useAuth();
  const [images, setImages] = useState<string[]>([]);
  const [videoUrl, setVideoUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const captionRef = useRef<HTMLTextAreaElement>(null);

  // Auto-populate location from business profile
  useEffect(() => {
    if (currentUser?.location) {
      setLocation(currentUser.location);
    }
  }, [currentUser]);

  // Auto-expand textarea
  useEffect(() => {
    if (captionRef.current) {
      captionRef.current.style.height = 'auto';
      captionRef.current.style.height = captionRef.current.scrollHeight + 'px';
    }
  }, [caption]);

  // Redirect if not a business account
  if (!isBusinessAccount) {
    navigate('/home');
    return null;
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const remainingSlots = 10 - images.length;
      const filesToProcess = Array.from(files).slice(0, remainingSlots);
      
      filesToProcess.forEach((file) => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onloadend = () => {
            const result = reader.result as string;
            setImages(prev => [...prev, result]);
          };
          reader.readAsDataURL(file);
        }
      });
    }
  };

  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setVideoUrl(result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Image reordering handlers
  const handleImageDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleImageDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newImages = [...images];
    const draggedImage = newImages[draggedIndex];
    newImages.splice(draggedIndex, 1);
    newImages.splice(index, 0, draggedImage);
    
    setImages(newImages);
    setDraggedIndex(index);
  };

  const handleImageDragEnd = () => {
    setDraggedIndex(null);
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
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

  const removeVideo = () => {
    setVideoUrl('');
  };

  const handleSubmit = async () => {
    if (!images.length && !videoUrl) {
      alert('Please upload at least one image or video');
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
    if (images.length || videoUrl || caption) {
      if (window.confirm('Discard this post?')) {
        navigate(-1);
      }
    } else {
      navigate(-1);
    }
  };

  const hasMedia = images.length > 0 || !!videoUrl;

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
            disabled={isSubmitting || (!hasMedia) || !caption.trim()}
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
            <div className="p-6">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageSelect}
                className="hidden"
              />
              <input
                ref={videoInputRef}
                type="file"
                accept="video/*"
                onChange={handleVideoSelect}
                className="hidden"
              />

              {/* Video Preview */}
              {videoUrl ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                      <Video size={18} className="text-primary-brand" />
                      Video Post
                    </h3>
                    <span className="text-xs text-gray-500">Video posts can only contain one video</span>
                  </div>
                  <div className="relative group">
                    <video
                      src={videoUrl}
                      controls
                      className="w-full aspect-video object-cover rounded-xl bg-black"
                      data-testid="video-preview"
                    />
                    <button
                      onClick={removeVideo}
                      className="absolute top-3 right-3 p-2 bg-black/60 hover:bg-black/80 text-white rounded-full backdrop-blur-sm transition-all"
                      data-testid="remove-video-btn"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>
              ) : images.length > 0 ? (
                /* Image Grid */
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                      <ImageIcon size={18} className="text-primary-brand" />
                      Photos ({images.length}/10)
                    </h3>
                    {images.length < 10 && (
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="text-sm font-medium text-primary-brand hover:text-primary-dark transition-colors"
                        data-testid="add-more-photos-btn"
                      >
                        + Add more
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {images.map((image, index) => (
                      <div
                        key={index}
                        draggable
                        onDragStart={() => handleImageDragStart(index)}
                        onDragOver={(e) => handleImageDragOver(e, index)}
                        onDragEnd={handleImageDragEnd}
                        className={`relative group aspect-square rounded-lg overflow-hidden cursor-move border-2 transition-all ${
                          draggedIndex === index ? 'border-primary-brand scale-95 opacity-50' : 'border-transparent'
                        }`}
                        data-testid={`image-thumbnail-${index}`}
                      >
                        <img
                          src={image}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all" />
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-black/80 text-white rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
                          data-testid={`remove-image-${index}-btn`}
                        >
                          <X size={16} />
                        </button>
                        {index === 0 && (
                          <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/60 text-white text-xs font-medium rounded backdrop-blur-sm">
                            Cover
                          </div>
                        )}
                      </div>
                    ))}
                    {images.length < 10 && (
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="aspect-square rounded-lg border-2 border-dashed border-gray-300 hover:border-primary-brand hover:bg-primary-brand/5 flex items-center justify-center transition-all group"
                        data-testid="add-photo-btn"
                      >
                        <Plus size={32} className="text-gray-400 group-hover:text-primary-brand transition-colors" />
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 text-center mt-2">
                    Drag to reorder • First photo is the cover
                  </p>
                </div>
              ) : (
                /* Upload Options */
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`space-y-3 ${isDragging ? 'scale-[1.02]' : ''}`}
                >
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className={`w-full p-8 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all ${
                      isDragging
                        ? 'border-primary-brand bg-primary-brand/5'
                        : 'border-gray-300 hover:border-primary-brand hover:bg-gray-50'
                    }`}
                    data-testid="upload-photos-btn"
                  >
                    <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-primary-brand/10 to-secondary-teal/10 rounded-full flex items-center justify-center">
                      <ImageIcon size={32} className="text-primary-brand" />
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 mb-1">Add Photos</h3>
                    <p className="text-sm text-gray-500">Upload up to 10 photos</p>
                  </button>
                  
                  <button
                    onClick={() => videoInputRef.current?.click()}
                    className="w-full p-8 border-2 border-dashed border-gray-300 hover:border-primary-brand rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-gray-50"
                    data-testid="upload-video-btn"
                  >
                    <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full flex items-center justify-center">
                      <Video size={32} className="text-purple-600" />
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 mb-1">Add Video</h3>
                    <p className="text-sm text-gray-500">Upload one video</p>
                  </button>
                  
                  <p className="text-xs text-gray-400 text-center pt-2">
                    Or drag and drop files here
                  </p>
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
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary-brand/10 rounded-full flex-shrink-0">
                <Hash size={20} className="text-primary-brand" />
              </div>
              <div className="flex-1">
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
                  className="w-full text-gray-900 placeholder-gray-400 focus:outline-none"
                  data-testid="tag-input"
                />
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {tags.map((tag, index) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-primary-brand/10 to-secondary-teal/10 text-primary-brand rounded-full text-sm font-medium transition-all hover:shadow-sm"
                        data-testid={`tag-chip-${index}`}
                      >
                        #{tag}
                        <button
                          onClick={() => handleRemoveTag(tag)}
                          className="hover:bg-primary-brand/20 rounded-full p-0.5 transition-colors"
                          data-testid={`remove-tag-${index}-btn`}
                        >
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
            {tags.length === 0 && (
              <p className="text-xs text-gray-400 mt-2 ml-14">
                Add hashtags to help people discover your post
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
