import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  message?: string;
}

export function LoadingSpinner({ size = 'lg', className = '', message }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-32 h-32',
    xl: 'w-48 h-48',
  };

  const ringClasses = {
    sm: 'border-2',
    md: 'border-3',
    lg: 'border-4',
    xl: 'border-[6px]',
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {/* Animated Rings - Inspired by Mapleon Logo */}
      <div className={`relative ${sizeClasses[size]}`}>
        {/* Outer Ring - Teal */}
        <div className={`absolute inset-0 rounded-full ${ringClasses[size]} border-mapleon-teal border-t-transparent animate-spin`} 
             style={{ animationDuration: '1.5s' }} />
        
        {/* Middle Ring - Coral */}
        <div className={`absolute inset-[15%] rounded-full ${ringClasses[size]} border-primary-brand border-t-transparent animate-spin`}
             style={{ animationDuration: '1.2s', animationDirection: 'reverse' }} />
        
        {/* Inner Ring - Pink */}
        <div className={`absolute inset-[30%] rounded-full ${ringClasses[size]} border-mapleon-pink border-t-transparent animate-spin`}
             style={{ animationDuration: '1s' }} />
        
        {/* Center Glow */}
        <div className="absolute inset-[45%] rounded-full bg-gradient-to-br from-mapleon-teal to-primary-brand animate-pulse-glow opacity-50" />
      </div>

      {/* Optional Loading Message */}
      {message && (
        <p className="mt-4 text-white text-sm font-medium animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
}
