import React from 'react';

interface DiscoveryCardProps {
  image: string;
  title: string;
  subtitle: string;
  size?: 'large' | 'medium';
  onClick?: () => void;
}

export function DiscoveryCard({
  image,
  title,
  subtitle,
  size = 'medium',
  onClick
}: DiscoveryCardProps) {
  return (
    <button
      onClick={onClick}
      className={`relative rounded-3xl overflow-hidden shadow-lg active:scale-95 transition-transform w-full ${
        size === 'large' ? 'h-52' : 'h-44'
      }`}
    >
      <img src={image} alt={title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
        <h3 className="text-white font-bold text-lg mb-1">{title}</h3>
        <p className="text-white/80 text-sm">{subtitle}</p>
      </div>
    </button>
  );
}