import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Camera, Mail, Phone, MapPin, Heart, CheckCircle2, User as UserIcon } from 'lucide-react';
import { ImageUploadField } from '../components/form/ImageUploadField';
import { TextInputField } from '../components/form/TextInputField';
import { TextareaField } from '../components/form/TextareaField';
import { ToggleSwitchField } from '../components/form/ToggleSwitchField';
import { MultiSelectField } from '../components/form/MultiSelectField';
import { Button } from '../components/Button';
import { PhotoActionModal } from '../components/PhotoActionModal';
import { saveUserProfile, loadUserProfile } from '../utils/localStorage';
import { mockUsers } from '../utils/mockData';

export function UserProfileEdit() {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showCoverModal, setShowCoverModal] = useState(false);

  // Load saved data or use mock data
  const [formData, setFormData] = useState(() => {
    const saved = loadUserProfile();
    return saved || {
      ...mockUsers[0],
      email: 'user@example.com',
      phone: '',
      location: 'New York City',
      privacySettings: {
        profileVisibility: 'public',
        showActivity: true,
        showLocation: true,
        allowSearch: true,
      },
    };
  });

  // Track changes
  useEffect(() => {
    setHasUnsavedChanges(true);
  }, [formData]);

  const updateField = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const updatePrivacySetting = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      privacySettings: {
        ...prev.privacySettings,
        [field]: value,
      },
    }));
  };

  const handleSave = async () => {
    // Validation
    if (!formData.name || !formData.username) {
      alert('Please fill in required fields (Name and Username)');
      return;
    }

    setIsSaving(true);
    
    // Simulate save delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const success = saveUserProfile(formData);
    
    setIsSaving(false);
    
    if (success) {
      setHasUnsavedChanges(false);
      alert('✅ Profile saved successfully!');
      navigate('/user-profile');
    } else {
      alert('❌ Error saving profile. Please try again.');
    }
  };

  const handleCancel = () => {
    if (hasUnsavedChanges) {
      if (window.confirm('You have unsaved changes. Are you sure you want to leave?')) {
        navigate('/user-profile');
      }
    } else {
      navigate('/user-profile');
    }
  };

  const interestOptions = ['restaurant', 'cafe', 'gym', 'salon', 'service'];

  // File upload handler
  const handleFileUpload = (field: 'profileImage' | 'coverImage') => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e: any) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => updateField(field, reader.result);
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-neutral-50 to-primary-brand/5 pb-24">
      {/* Header with Gradient */}
      <div className="sticky top-0 z-20 bg-gradient-to-r from-primary-brand to-primary-dark shadow-lg">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={handleCancel}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <ArrowLeft size={24} className="text-white" />
            </button>
            <div>
              <h1 className="text-lg font-bold text-white">Edit Profile</h1>
              {hasUnsavedChanges && (
                <p className="text-xs text-white/80 flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-yellow-300 rounded-full animate-pulse" />
                  Unsaved changes
                </p>
              )}
            </div>
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={handleSave}
            disabled={isSaving}
            className="bg-white text-primary-brand hover:bg-white/90"
          >
            <Save size={16} />
            <span>{isSaving ? 'Saving...' : 'Save'}</span>
          </Button>
        </div>
      </div>

      {/* Content - Single Scrollable Page */}
      <div className="p-4 max-w-3xl mx-auto space-y-5">
        {/* Profile Images Card - Facebook Style Layout */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          {/* Cover Photo Section */}
          <div 
            className="relative h-48 bg-gradient-to-r from-primary-brand/20 via-secondary-teal/20 to-secondary-purple/20 cursor-pointer group"
            onClick={() => setShowCoverModal(true)}
          >
            {formData.coverImage ? (
              <>
                <img
                  src={formData.coverImage}
                  alt="Cover"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
                    <div className="flex items-center gap-2">
                      <Camera size={20} className="text-gray-700" />
                      <span className="text-sm font-medium text-gray-700">Tap to change cover photo</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-primary-brand/30 group-hover:via-secondary-teal/30 group-hover:to-secondary-purple/30 transition-all duration-300">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-md group-hover:scale-110 transition-transform">
                    <Camera size={32} className="text-gray-400" />
                  </div>
                  <p className="text-sm font-medium text-gray-600">Tap to add cover photo</p>
                </div>
              </div>
            )}
          </div>

          {/* Profile Picture Section - Overlaying */}
          <div className="px-6 pb-6">
            <div className="relative -mt-16 mb-4">
              <button
                type="button"
                onClick={() => setShowProfileModal(true)}
                className="inline-block relative group cursor-pointer"
              >
                {formData.profileImage ? (
                  <>
                    <img
                      src={formData.profileImage}
                      alt="Profile"
                      className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 rounded-full transition-all duration-300 flex items-center justify-center border-4 border-white">
                      <Camera size={28} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </>
                ) : (
                  <div className="w-32 h-32 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center group-hover:bg-gray-50 transition-colors">
                    <div className="text-center">
                      <Camera size={40} className="text-gray-400 mx-auto mb-1 group-hover:text-primary-brand group-hover:scale-110 transition-all" />
                      <p className="text-xs text-gray-500 font-medium">Add Photo</p>
                    </div>
                  </div>
                )}
              </button>
            </div>

            {/* Info */}
            <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">i</div>
              <div className="text-xs text-blue-800">
                <p><strong>Profile Picture:</strong> Recommended 400x400px or larger</p>
                <p className="mt-1"><strong>Cover Photo:</strong> Recommended 1200x400px for best results</p>
              </div>
            </div>
          </div>
        </div>

        {/* Basic Info Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <UserIcon size={20} className="text-blue-600" />
              <h2 className="text-lg font-bold text-neutral-900">Basic Information</h2>
            </div>
            <p className="text-sm text-gray-600 mt-1">Tell others about yourself</p>
          </div>
          <div className="p-6 space-y-4">
            <TextInputField
              label="Display Name"
              value={formData.name}
              onChange={(value) => updateField('name', value)}
              placeholder="Your name"
              maxLength={50}
              required
            />

            <TextInputField
              label="Username"
              value={formData.username}
              onChange={(value) => updateField('username', value)}
              placeholder="username"
              maxLength={30}
              required
            />

            <TextareaField
              label="Bio"
              value={formData.bio || ''}
              onChange={(value) => updateField('bio', value)}
              placeholder="Tell us about yourself..."
              maxLength={150}
              rows={3}
            />

            <div className="flex items-start gap-2">
              <MapPin size={18} className="text-gray-400 mt-3 flex-shrink-0" />
              <TextInputField
                label="Location"
                value={formData.location || ''}
                onChange={(value) => updateField('location', value)}
                placeholder="City, State"
                maxLength={50}
              />
            </div>
          </div>
        </div>

        {/* Contact Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Mail size={20} className="text-green-600" />
              <h2 className="text-lg font-bold text-neutral-900">Contact Information</h2>
            </div>
            <p className="text-sm text-gray-600 mt-1">How can people reach you?</p>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-start gap-2">
              <Mail size={18} className="text-gray-400 mt-3 flex-shrink-0" />
              <TextInputField
                label="Email"
                value={formData.email || ''}
                onChange={(value) => updateField('email', value)}
                placeholder="email@example.com"
                type="email"
              />
            </div>

            <div className="flex items-start gap-2">
              <Phone size={18} className="text-gray-400 mt-3 flex-shrink-0" />
              <TextInputField
                label="Phone (Optional)"
                value={formData.phone || ''}
                onChange={(value) => updateField('phone', value)}
                placeholder="+1 (555) 123-4567"
                type="tel"
              />
            </div>
          </div>
        </div>

        {/* Interests Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Heart size={20} className="text-purple-600" />
              <h2 className="text-lg font-bold text-neutral-900">Your Interests</h2>
            </div>
            <p className="text-sm text-gray-600 mt-1">What are you passionate about?</p>
          </div>
          <div className="p-6">
            <MultiSelectField
              label="Select your interests"
              selectedValues={formData.interests || []}
              onChange={(values) => updateField('interests', values)}
              options={interestOptions}
              maxSelections={5}
            />
          </div>
        </div>

        {/* Privacy Settings Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 px-6 py-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={20} className="text-orange-600" />
              <h2 className="text-lg font-bold text-neutral-900">Privacy Settings</h2>
            </div>
            <p className="text-sm text-gray-600 mt-1">Control your visibility</p>
          </div>
          <div className="p-6 space-y-2">
            <ToggleSwitchField
              label="Public Profile"
              value={formData.privacySettings?.profileVisibility === 'public'}
              onChange={(value) => updatePrivacySetting('profileVisibility', value ? 'public' : 'private')}
              description="Allow others to view your profile"
            />

            <ToggleSwitchField
              label="Show Activity"
              value={formData.privacySettings?.showActivity || false}
              onChange={(value) => updatePrivacySetting('showActivity', value)}
              description="Let others see your likes and comments"
            />

            <ToggleSwitchField
              label="Show Location"
              value={formData.privacySettings?.showLocation || false}
              onChange={(value) => updatePrivacySetting('showLocation', value)}
              description="Display your city on your profile"
            />

            <ToggleSwitchField
              label="Allow Search"
              value={formData.privacySettings?.allowSearch || false}
              onChange={(value) => updatePrivacySetting('allowSearch', value)}
              description="Let others find you by email or phone"
            />
          </div>
        </div>

        {/* Stats Card */}
        <div className="bg-gradient-to-br from-primary-brand to-primary-dark rounded-2xl shadow-lg overflow-hidden border border-primary-dark">
          <div className="p-6">
            <h2 className="text-lg font-bold text-white mb-4">Your Stats</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-white">{formData.stats.saved}</div>
                <div className="text-sm text-white/80 mt-1">Saved</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-white">{formData.stats.followers}</div>
                <div className="text-sm text-white/80 mt-1">Followers</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-white">{formData.stats.following}</div>
                <div className="text-sm text-white/80 mt-1">Following</div>
              </div>
            </div>
            <p className="text-sm text-white/70 text-center mt-4">
              Member since {formData.memberSince}
            </p>
          </div>
        </div>

        {/* Action Buttons - Sticky at Bottom */}
        <div className="sticky bottom-4 bg-white rounded-2xl p-4 shadow-2xl border border-gray-200">
          <div className="flex gap-3">
            <Button
              variant="secondary"
              size="md"
              fullWidth
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="md"
              fullWidth
              onClick={handleSave}
              disabled={isSaving}
              className="bg-gradient-to-r from-primary-brand to-primary-dark"
            >
              {isSaving ? 'Saving...' : '✓ Save Changes'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
