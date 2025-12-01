import React from 'react';
import { X, Camera, Trash2, Upload } from 'lucide-react';

interface PhotoActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  hasPhoto: boolean;
  onAddPhoto: () => void;
  onChangePhoto: () => void;
  onRemovePhoto: () => void;
  photoType: 'profile' | 'cover';
}

export function PhotoActionModal({
  isOpen,
  onClose,
  hasPhoto,
  onAddPhoto,
  onChangePhoto,
  onRemovePhoto,
  photoType,
}: PhotoActionModalProps) {
  if (!isOpen) return null;

  const title = photoType === 'profile' ? 'Profile Photo' : 'Cover Photo';

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-fadeIn"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-x-0 bottom-0 z-50 animate-slideUp">
        <div className="bg-white rounded-t-3xl shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-bold text-neutral-900">{title}</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} className="text-gray-600" />
            </button>
          </div>

          {/* Actions */}
          <div className="p-4">
            {!hasPhoto ? (
              // Add Photo Option
              <button
                onClick={() => {
                  onAddPhoto();
                  onClose();
                }}
                className="w-full flex items-center gap-4 px-4 py-4 hover:bg-gray-50 rounded-xl transition-colors text-left"
              >
                <div className="w-12 h-12 bg-primary-brand/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Upload size={24} className="text-primary-brand" />
                </div>
                <div>
                  <p className="font-semibold text-neutral-900">Add {title}</p>
                  <p className="text-sm text-gray-600">Choose from gallery</p>
                </div>
              </button>
            ) : (
              // Change and Remove Options
              <div className="space-y-2">
                <button
                  onClick={() => {
                    onChangePhoto();
                    onClose();
                  }}
                  className="w-full flex items-center gap-4 px-4 py-4 hover:bg-gray-50 rounded-xl transition-colors text-left"
                >
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <Camera size={24} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900">Change {title}</p>
                    <p className="text-sm text-gray-600">Select a new photo</p>
                  </div>
                </button>

                <button
                  onClick={() => {
                    onRemovePhoto();
                    onClose();
                  }}
                  className="w-full flex items-center gap-4 px-4 py-4 hover:bg-red-50 rounded-xl transition-colors text-left"
                >
                  <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <Trash2 size={24} className="text-red-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-red-600">Remove {title}</p>
                    <p className="text-sm text-gray-600">Delete current photo</p>
                  </div>
                </button>
              </div>
            )}

            {/* Cancel Button */}
            <button
              onClick={onClose}
              className="w-full mt-4 px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium text-neutral-900 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
