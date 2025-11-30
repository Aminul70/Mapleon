import React, { useRef, ChangeEvent } from 'react';
import { Camera, X } from 'lucide-react';

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  aspectRatio?: 'square' | 'cover' | 'auto';
  maxSizeMB?: number;
}

export function ImageUploadField({ 
  label, 
  value, 
  onChange, 
  aspectRatio = 'square',
  maxSizeMB = 5 
}: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);

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

    // Convert to base64/URL for preview
    const reader = new FileReader();
    reader.onloadend = () => {
      onChange(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    onChange('');
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const aspectClasses = {
    square: 'aspect-square',
    cover: 'aspect-video',
    auto: 'h-40'
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        {value ? (
          <div className="relative group">
            <img
              src={value}
              alt={label}
              className={`w-full ${aspectClasses[aspectRatio]} object-cover rounded-xl border-2 border-gray-200`}
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="p-3 bg-white rounded-full hover:bg-gray-100 transition-colors"
              >
                <Camera size={20} className="text-gray-700" />
              </button>
              <button
                type="button"
                onClick={handleRemove}
                className="p-3 bg-white rounded-full hover:bg-red-50 transition-colors"
              >
                <X size={20} className="text-red-600" />
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className={`w-full ${aspectClasses[aspectRatio]} border-2 border-dashed border-gray-300 rounded-xl hover:border-primary-brand hover:bg-gray-50 transition-colors flex flex-col items-center justify-center gap-2 text-gray-500 hover:text-primary-brand`}
          >
            <Camera size={32} />
            <span className="text-sm font-medium">Upload Image</span>
            <span className="text-xs">Max {maxSizeMB}MB</span>
          </button>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}