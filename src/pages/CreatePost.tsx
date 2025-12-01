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
      {/* Minimal Fixed Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-20">
        <div className="flex items-center justify-between px-4 py-3 max-w-2xl mx-auto">
          <button
            onClick={handleClose}
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
            data-testid="close-create-post-btn"
          >
            <X size={22} className="text-gray-700" />
          </button>
          <h1 className="text-base font-semibold text-gray-900">Create Post</h1>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || (!hasMedia && !caption.trim())}
            className="px-5 py-1.5 bg-primary-brand text-white rounded-lg font-medium hover:bg-primary-dark disabled:opacity-40 disabled:cursor-not-allowed transition-all text-sm"
            data-testid="publish-post-btn"
          >
            {isSubmitting ? 'Publishing...' : 'Publish'}
          </button>
        </div>
      </div>

      {/* Clean Content Container */}
      <div className="max-w-2xl mx-auto px-4 py-4 pb-24">
        {/* Minimal User Info Row */}
        <div className="flex items-center gap-3 mb-4">
          <img
            src={currentUser?.profileImage}
            alt={currentUser?.name}
            className="w-11 h-11 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-gray-900 text-sm">{currentUser?.name}</p>
            <p className="text-xs text-gray-500">@{currentUser?.username}</p>
          </div>
        </div>

        {/* Large Auto-Expanding Caption */}
        <div className="mb-4">
          <textarea
            ref={captionRef}
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Write a caption..."
            maxLength={2000}
            className="w-full px-3 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary-brand/30 rounded-xl resize-none min-h-[100px] transition-all bg-white"
            data-testid="caption-input"
          />
          <div className="flex justify-end mt-1">
            <span className={`text-xs font-medium ${caption.length > 1800 ? 'text-orange-600' : 'text-gray-400'}`}>
              {caption.length}/2000
            </span>
          </div>
        </div>

        {/* Hidden File Inputs */}
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

        {/* Simple Media Action Icons (shown when no media added) */}
        {!videoUrl && images.length === 0 && (
          <div className="flex items-center gap-3 mb-4 px-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-3 py-2 text-primary-brand hover:bg-primary-brand/10 rounded-lg transition-all"
              data-testid="add-photo-icon-btn"
            >
              <ImageIcon size={20} />
              <span className="text-sm font-medium">Photo</span>
            </button>
            <button
              onClick={() => videoInputRef.current?.click()}
              className="flex items-center gap-2 px-3 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-all"
              data-testid="add-video-icon-btn"
            >
              <Video size={20} />
              <span className="text-sm font-medium">Video</span>
            </button>
            <button
              className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-all"
            >
              <Smile size={20} />
            </button>
          </div>
        )}

        {/* Video Preview - Edge to Edge */}
        {videoUrl && (
          <div className="mb-4 relative group">
            <video
              src={videoUrl}
              controls
              className="w-full rounded-2xl bg-black"
              data-testid="video-preview"
            />
            <button
              onClick={removeVideo}
              className="absolute top-3 right-3 p-2 bg-black/70 hover:bg-black/90 text-white rounded-full transition-all"
              data-testid="remove-video-btn"
            >
              <X size={18} />
            </button>
          </div>
        )}

        {/* Image Grid - Clean and Minimal */}
        {images.length > 0 && (
          <div className="mb-4">
            <div className={`grid gap-2 rounded-2xl overflow-hidden ${
              images.length === 1 ? 'grid-cols-1' : 
              images.length === 2 ? 'grid-cols-2' : 
              images.length === 3 ? 'grid-cols-3' : 
              'grid-cols-2'
            }`}>
              {images.map((image, index) => (
                <div
                  key={index}
                  draggable
                  onDragStart={() => handleImageDragStart(index)}
                  onDragOver={(e) => handleImageDragOver(e, index)}
                  onDragEnd={handleImageDragEnd}
                  className={`relative group cursor-move ${
                    images.length === 1 ? 'aspect-[4/3]' : 
                    images.length <= 3 ? 'aspect-square' : 
                    'aspect-square'
                  } ${draggedIndex === index ? 'opacity-50 scale-95' : ''}`}
                  data-testid={`image-thumbnail-${index}`}
                >
                  <img
                    src={image}
                    alt={`Upload ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all" />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 p-1.5 bg-black/70 hover:bg-black/90 text-white rounded-full transition-all opacity-0 group-hover:opacity-100"
                    data-testid={`remove-image-${index}-btn`}
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
            {images.length < 10 && (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full mt-2 py-2 text-sm font-medium text-primary-brand hover:bg-primary-brand/5 rounded-lg transition-all"
                data-testid="add-more-photos-btn"
              >
                + Add more photos ({images.length}/10)
              </button>
            )}
          </div>
        )}

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
