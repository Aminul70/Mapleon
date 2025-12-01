import React, { useRef, ChangeEvent, useState } from 'react';
import { Camera, X, Image as ImageIcon, Upload, Trash2 } from 'lucide-react';

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  aspectRatio?: 'square' | 'cover' | 'auto';
  maxSizeMB?: number;
  helperText?: string;
}

export function ImageUploadField({ 
  label, 
  value, 
  onChange, 
  aspectRatio = 'square',
  maxSizeMB = 5,
  helperText 
}: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size
    if (file.size > maxSizeMB * 1024 * 1024) {
      alert(`File size must be less than ${maxSizeMB}MB`);
      return;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Show loading state
    setIsLoading(true);

    // Convert to base64/URL for preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setTimeout(() => {
        onChange(reader.result as string);
        setIsLoading(false);
      }, 300); // Small delay for better UX
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    if (window.confirm('Are you sure you want to remove this image?')) {
      onChange('');
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  };

  const handleChange = () => {
    inputRef.current?.click();
  };

  const aspectClasses = {
    square: 'aspect-square',
    cover: 'aspect-video',
    auto: 'h-40'
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-semibold text-gray-800">
          {label}
        </label>
        {helperText && (
          <span className="text-xs text-gray-500">{helperText}</span>
        )}
      </div>

      {value ? (
        /* Image Preview with Action Buttons */
        <div className="relative">
          <div className={`relative ${aspectClasses[aspectRatio]} w-full rounded-2xl overflow-hidden border-2 border-gray-200 bg-gray-50 shadow-md`}>
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 border-4 border-primary-brand border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-sm text-gray-600 font-medium">Uploading...</p>
                </div>
              </div>
            ) : (
              <img
                src={value}
                alt={label}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          
          {/* Action Buttons - Always Visible */}
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={handleChange}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary-brand to-primary-dark text-white rounded-xl font-medium hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              data-testid="change-image-btn"
            >
              <Camera size={18} />
              <span>Change Image</span>
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border-2 border-red-200 text-red-600 rounded-xl font-medium hover:bg-red-50 hover:border-red-300 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              data-testid="remove-image-btn"
            >
              <Trash2 size={18} />
              <span>Remove</span>
            </button>
          </div>

          {/* Image Info */}
          <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
            <ImageIcon size={14} />
            <span>Image uploaded successfully</span>
          </div>
        </div>
      ) : (
        /* Empty State - Upload Area */
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className={`relative w-full ${aspectClasses[aspectRatio]} border-2 border-dashed border-gray-300 rounded-2xl hover:border-primary-brand transition-all duration-300 overflow-hidden group`}
            data-testid="upload-image-btn"
          >
            {/* Gradient Background on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-brand/5 via-secondary-teal/5 to-secondary-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Content */}
            <div className="relative h-full flex flex-col items-center justify-center gap-3 px-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-brand/10 to-secondary-teal/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Upload size={28} className="text-primary-brand" />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-gray-700 group-hover:text-primary-brand transition-colors">
                  Click to upload image
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  PNG, JPG or WEBP (Max {maxSizeMB}MB)
                </p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200 group-hover:border-primary-brand group-hover:shadow-md transition-all">
                <Camera size={16} className="text-gray-600 group-hover:text-primary-brand transition-colors" />
                <span className="text-xs font-medium text-gray-600 group-hover:text-primary-brand transition-colors">
                  Browse Files
                </span>
              </div>
            </div>
          </button>

          {helperText && (
            <p className="text-xs text-gray-500 text-center">{helperText}</p>
          )}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        data-testid="image-file-input"
      />
    </div>
  );
}