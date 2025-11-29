import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
export function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  useEffect(() => {
    // Auto-advance from logo screen
    if (step === 0) {
      const timer = setTimeout(() => setStep(1), 2000);
      return () => clearTimeout(timer);
    }
  }, [step]);
  if (step === 0) {
    return <div className="min-h-screen bg-gradient-to-br from-mapleon-teal via-mapleon-gray to-mapleon-teal-tint flex items-center justify-center">
        <div className="text-center animate-float">
          <img src="/44077014651.png" alt="Mapleon" className="w-32 h-32 mx-auto mb-6 animate-pulse-glow" />
          <h1 className="text-4xl font-bold text-mapleon-slate mb-2">
            Mapleon
          </h1>
          <p className="text-mapleon-slate/60">Discover what's nearby</p>
        </div>
      </div>;
  }
  return <div className="min-h-screen bg-gradient-to-br from-mapleon-teal via-mapleon-gray to-mapleon-teal-tint flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        <div className="mb-8 relative">
          <div className="w-64 h-64 mx-auto relative">
            {/* Animated Radar Rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute w-full h-full rounded-full border-2 border-white/30 animate-pulse-glow" />
              <div className="absolute w-4/5 h-4/5 rounded-full border-2 border-white/40 animate-pulse-glow" style={{
              animationDelay: '0.3s'
            }} />
              <div className="absolute w-3/5 h-3/5 rounded-full border-2 border-white/50 animate-pulse-glow" style={{
              animationDelay: '0.6s'
            }} />
              <div className="absolute w-2/5 h-2/5 rounded-full border-2 border-white/60 animate-pulse-glow" style={{
              animationDelay: '0.9s'
            }} />
            </div>

            {/* Center Pin */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-glow-strong">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-mapleon-pink">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-mapleon-slate mb-4">
          Finding nearby places...
        </h2>
        <p className="text-mapleon-slate/70 mb-8 text-lg">
          We use your location to show you the best local businesses,
          restaurants, and services around you.
        </p>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mb-8">
          {[0, 1, 2, 3, 4].map(i => <div key={i} className={`h-2 rounded-full transition-all duration-300 ${i === 0 ? 'w-8 bg-mapleon-pink' : 'w-2 bg-gray-300'}`} />)}
        </div>

        <Button variant="primary" size="lg" fullWidth onClick={() => navigate('/interests')}>
          Allow Location Access
        </Button>

        <button onClick={() => navigate('/interests')} className="mt-4 text-mapleon-slate/60 text-sm">
          Skip for now
        </button>
      </div>
    </div>;
}