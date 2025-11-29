import React from 'react';
import { Star, MapPin, Navigation } from 'lucide-react';
import { Business } from '../utils/mockData';
import { Button } from './Button';
import { Badge } from './Badge';

interface BusinessCardProps {
  business: Business;
  onViewDetails?: () => void;
  variant?: 'default' | 'compact';
  showActions?: boolean;
}

export function BusinessCard({
  business,
  onViewDetails,
  variant = 'default',
  showActions = true,
}: BusinessCardProps) {
  if (variant === 'compact') {
    return (
      <div className="bg-white border border-neutral-200 rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex gap-3">
          <img 
            src={business.image} 
            alt={business.name} 
            className="w-20 h-20 rounded-lg object-cover flex-shrink-0" 
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-base text-neutral-900 truncate">
              {business.name}
            </h3>
            <Badge type="category" size="sm" className="mt-1">
              {business.category}
            </Badge>
            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center gap-1">
                <Star size={14} className="fill-semantic-warning text-semantic-warning" />
                <span className="font-semibold text-sm text-neutral-900">{business.rating}</span>
                <span className="text-xs text-neutral-500">({business.reviews})</span>
              </div>
              <div className="flex items-center gap-1 text-secondary-teal">
                <MapPin size={14} />
                <span className="text-xs font-medium">{business.distance} km</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-neutral-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow animate-slide-up">
      <div className="flex gap-4">
        <img 
          src={business.image} 
          alt={business.name} 
          className="w-30 h-30 rounded-xl object-cover flex-shrink-0" 
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-lg text-neutral-900 truncate">
            {business.name}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <Badge type="category" size="sm">
              {business.category}
            </Badge>
            {business.openNow && (
              <Badge variant="success" size="sm">
                Open Now
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center gap-1">
              <Star size={16} className="fill-semantic-warning text-semantic-warning" />
              <span className="font-semibold text-sm text-neutral-900">{business.rating}</span>
              <span className="text-xs text-neutral-500">({business.reviews})</span>
            </div>
            <div className="flex items-center gap-1 text-secondary-teal">
              <MapPin size={14} />
              <span className="text-xs font-medium">{business.distance} km away</span>
            </div>
          </div>
          <p className="text-sm text-neutral-600 mt-2 line-clamp-2">
            {business.description}
          </p>
        </div>
      </div>
      {showActions && (
        <div className="flex gap-2 mt-4">
          <Button variant="primary" size="sm" fullWidth onClick={onViewDetails}>
            View Details
          </Button>
          <Button variant="secondary" size="sm" icon={<Navigation size={16} />}>
            Directions
          </Button>
        </div>
      )}
    </div>
  );
}