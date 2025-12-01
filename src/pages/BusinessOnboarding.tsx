import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, MapPin, Tag, Briefcase, ArrowRight, Upload, X } from 'lucide-react';
import { Button } from '../components/Button';
import { useAuth } from '../contexts/AuthContext';

interface BusinessOnboardingData {
  logo: string;
  cover: string;
  category: string;
  subcategory: string;
  address: string;
  services: string[];
}

export function BusinessOnboarding() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<BusinessOnboardingData>({
    logo: '',
    cover: '',
    category: '',
    subcategory: '',
    address: '',
    services: [],
  });

  // Image upload refs
  const logoInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  // Handle logo upload
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setData({ ...data, logo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle cover upload
  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setData({ ...data, cover: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove logo
  const handleRemoveLogo = () => {
    setData({ ...data, logo: '' });
    if (logoInputRef.current) {
      logoInputRef.current.value = '';
    }
  };

  // Remove cover
  const handleRemoveCover = () => {
    setData({ ...data, cover: '' });
    if (coverInputRef.current) {
      coverInputRef.current.value = '';
    }
  };

  const handleComplete = () => {
    // Save business profile data
    console.log('Business onboarding data:', data);
    // Navigate to business profile
    navigate('/business-profile');
  };

  const handleSkip = () => {
    navigate('/business-profile');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-mapleon-teal via-mapleon-gray to-mapleon-teal-tint">
      {/* Header */}
      <div className="px-6 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-mapleon-slate mb-2">Set Up Your Business</h1>
          <p className="text-mapleon-slate/70">Let's make your profile shine ✨</p>
          
          {/* Progress */}
          <div className="flex gap-2 mt-6">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-2 flex-1 rounded-full transition-all ${
                  s <= step ? 'bg-primary-brand' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-20">
        <div className="max-w-2xl mx-auto">
          {step === 1 && (
            <div className="space-y-6 animate-slide-up">
              <div className="text-center mb-8">
                {/* Logo Preview/Upload Area */}
                <div className="relative w-40 h-40 mx-auto mb-6">
                  {data.logo ? (
                    <>
                      <img
                        src={data.logo}
                        alt="Business Logo"
                        className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
                      />
                      <button
                        onClick={handleRemoveLogo}
                        className="absolute -top-2 -right-2 w-10 h-10 bg-semantic-error rounded-full flex items-center justify-center text-white shadow-lg hover:bg-semantic-error/90 transition-colors"
                        data-testid="remove-logo-button"
                      >
                        <X size={20} />
                      </button>
                    </>
                  ) : (
                    <div className="w-full h-full bg-white/80 backdrop-blur-lg rounded-full flex items-center justify-center border-4 border-white/40 shadow-lg">
                      <Camera size={48} className="text-mapleon-slate/40" />
                    </div>
                  )}
                </div>
                <h2 className="text-2xl font-bold text-mapleon-slate mb-2">Add Your Logo</h2>
                <p className="text-mapleon-slate/70">Help customers recognize you</p>
              </div>

              <input
                ref={logoInputRef}
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
                data-testid="logo-file-input"
              />

              <Button 
                variant="primary" 
                size="lg" 
                fullWidth 
                onClick={() => logoInputRef.current?.click()}
                data-testid="upload-logo-button"
              >
                <Upload size={20} className="mr-2" />
                Upload Logo
              </Button>
              <button
                onClick={() => setStep(2)}
                className="w-full mt-3 text-mapleon-slate/60 text-sm hover:text-mapleon-slate transition-colors font-medium"
                data-testid="skip-logo-button"
              >
                Skip for now
              </button>
              {data.logo && (
                <Button 
                  variant="secondary" 
                  size="lg" 
                  fullWidth 
                  onClick={() => setStep(2)}
                  data-testid="continue-from-logo-button"
                >
                  Continue
                  <ArrowRight size={20} className="ml-2" />
                </Button>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-slide-up">
              <div className="text-center mb-8">
                {/* Cover Preview/Upload Area */}
                <div className="relative w-full h-48 mx-auto mb-6">
                  {data.cover ? (
                    <>
                      <img
                        src={data.cover}
                        alt="Business Cover"
                        className="w-full h-full rounded-2xl object-cover border-4 border-white shadow-lg"
                      />
                      <button
                        onClick={handleRemoveCover}
                        className="absolute top-2 right-2 w-10 h-10 bg-semantic-error rounded-full flex items-center justify-center text-white shadow-lg hover:bg-semantic-error/90 transition-colors"
                        data-testid="remove-cover-button"
                      >
                        <X size={20} />
                      </button>
                    </>
                  ) : (
                    <div className="w-full h-full bg-white/80 backdrop-blur-lg rounded-2xl flex items-center justify-center border-4 border-white/40 shadow-lg">
                      <Camera size={48} className="text-mapleon-slate/40" />
                    </div>
                  )}
                </div>
                <h2 className="text-2xl font-bold text-mapleon-slate mb-2">Add Cover Photo</h2>
                <p className="text-mapleon-slate/70">Showcase your business vibe</p>
              </div>

              <input
                ref={coverInputRef}
                type="file"
                accept="image/*"
                onChange={handleCoverUpload}
                className="hidden"
                data-testid="cover-file-input"
              />

              <Button 
                variant="primary" 
                size="lg" 
                fullWidth 
                onClick={() => coverInputRef.current?.click()}
                data-testid="upload-cover-button"
              >
                <Upload size={20} className="mr-2" />
                Upload Cover
              </Button>
              <button
                onClick={() => setStep(3)}
                className="w-full mt-3 text-mapleon-slate/60 text-sm hover:text-mapleon-slate transition-colors font-medium"
                data-testid="skip-cover-button"
              >
                Skip for now
              </button>
              {data.cover && (
                <Button 
                  variant="secondary" 
                  size="lg" 
                  fullWidth 
                  onClick={() => setStep(3)}
                  data-testid="continue-from-cover-button"
                >
                  Continue
                  <ArrowRight size={20} className="ml-2" />
                </Button>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-slide-up">
              <h2 className="text-2xl font-bold text-mapleon-slate mb-6">Business Details</h2>

              <div>
                <label className="block text-sm font-medium text-mapleon-slate/80 mb-2">
                  <MapPin size={16} className="inline mr-2" />
                  Business Address
                </label>
                <input
                  type="text"
                  placeholder="Enter your business address"
                  className="w-full px-4 py-3 bg-white border-2 border-mapleon-gray rounded-xl text-mapleon-slate placeholder-mapleon-slate/40 focus:outline-none focus:ring-2 focus:ring-mapleon-teal focus:border-transparent transition-all"
                  value={data.address}
                  onChange={(e) => setData({ ...data, address: e.target.value })}
                  data-testid="business-address-input"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-mapleon-slate/80 mb-2">
                  <Briefcase size={16} className="inline mr-2" />
                  Services <span className="text-mapleon-slate/40">(Optional)</span>
                </label>
                <textarea
                  placeholder="E.g., Haircut, Beard Trim, Hair Coloring..."
                  className="w-full px-4 py-3 bg-white border-2 border-mapleon-gray rounded-xl text-mapleon-slate placeholder-mapleon-slate/40 focus:outline-none focus:ring-2 focus:ring-mapleon-teal focus:border-transparent resize-none transition-all"
                  rows={3}
                  data-testid="business-services-input"
                />
              </div>

              <div className="pt-4">
                <Button variant="primary" size="lg" fullWidth onClick={handleComplete} data-testid="complete-setup-button">
                  Complete Setup
                  <ArrowRight size={20} className="ml-2" />
                </Button>
                <button
                  onClick={handleSkip}
                  className="w-full mt-3 text-mapleon-slate/60 text-sm hover:text-mapleon-slate transition-colors font-medium"
                  data-testid="skip-business-details-button"
                >
                  I'll do this later
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
