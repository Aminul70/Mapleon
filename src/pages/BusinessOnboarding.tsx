import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, MapPin, Tag, Briefcase, ArrowRight } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white">
      {/* Header */}
      <div className="px-6 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-2">Set Up Your Business</h1>
          <p className="text-neutral-400">Let's make your profile shine ✨</p>
          
          {/* Progress */}
          <div className="flex gap-2 mt-6">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1 flex-1 rounded-full transition-all ${
                  s <= step ? 'bg-primary-brand' : 'bg-neutral-700'
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
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="w-24 h-24 bg-neutral-800 rounded-full mx-auto mb-4 flex items-center justify-center border-4 border-neutral-700">
                  <Camera size={32} className="text-neutral-500" />
                </div>
                <h2 className="text-xl font-semibold mb-2">Add Your Logo</h2>
                <p className="text-neutral-400 text-sm">Help customers recognize you</p>
              </div>

              <Button variant="primary" size="lg" fullWidth onClick={() => setStep(2)}>
                Upload Logo
              </Button>
              <Button variant="secondary" size="lg" fullWidth onClick={() => setStep(2)}>
                Skip for now
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="w-full h-32 bg-neutral-800 rounded-2xl mb-4 flex items-center justify-center border-2 border-neutral-700">
                  <Camera size={32} className="text-neutral-500" />
                </div>
                <h2 className="text-xl font-semibold mb-2">Add Cover Photo</h2>
                <p className="text-neutral-400 text-sm">Showcase your business vibe</p>
              </div>

              <Button variant="primary" size="lg" fullWidth onClick={() => setStep(3)}>
                Upload Cover
              </Button>
              <Button variant="secondary" size="lg" fullWidth onClick={() => setStep(3)}>
                Skip for now
              </Button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-6">Business Details</h2>

              <div>
                <label className="block text-sm font-medium mb-2">
                  <MapPin size={16} className="inline mr-2" />
                  Business Address
                </label>
                <input
                  type="text"
                  placeholder="Enter your business address"
                  className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-brand focus:border-transparent"
                  value={data.address}
                  onChange={(e) => setData({ ...data, address: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  <Briefcase size={16} className="inline mr-2" />
                  Services (Optional)
                </label>
                <textarea
                  placeholder="E.g., Haircut, Beard Trim, Hair Coloring..."
                  className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-brand focus:border-transparent resize-none"
                  rows={3}
                />
              </div>

              <div className="pt-4">
                <Button variant="primary" size="lg" fullWidth onClick={handleComplete}>
                  Complete Setup
                  <ArrowRight size={20} className="ml-2" />
                </Button>
                <button
                  onClick={handleSkip}
                  className="w-full mt-3 text-neutral-400 text-sm hover:text-white transition-colors"
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
