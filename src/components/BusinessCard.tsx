import React from 'react';
import { StarIcon, MapPinIcon } from 'lucide-react';
import { Business } from '../utils/mockData';
import { Button } from './Button';
interface BusinessCardProps {
  business: Business;
  onViewDetails?: () => void;
}
export function BusinessCard({
  business,
  onViewDetails
}: BusinessCardProps) {
  return <div className="neumorphic-card rounded-3xl p-4 animate-slide-up">
      <div className="flex gap-4">
        <img src={business.image} alt={business.name} className="w-24 h-24 rounded-2xl object-cover" />
        <div className="flex-1">
          <h3 className="font-bold text-lg text-mapleon-slate">
            {business.name}
          </h3>
          <p className="text-sm text-gray-500 capitalize">
            {business.category}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center gap-1">
              <StarIcon size={16} className="fill-mapleon-warning text-mapleon-warning" />
              <span className="font-semibold text-sm">{business.rating}</span>
              <span className="text-xs text-gray-400">
                ({business.reviews})
              </span>
            </div>
            <div className="flex items-center gap-1 text-mapleon-teal">
              <MapPinIcon size={14} />
              <span className="text-xs font-medium">
                {business.distance} km
              </span>
            </div>
          </div>
          <div className="mt-2">
            {business.openNow && <span className="text-xs font-semibold text-mapleon-success">
                Open Now
              </span>}
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <Button variant="primary" size="sm" fullWidth onClick={onViewDetails}>
          View Details
        </Button>
        <Button variant="secondary" size="sm" className="min-w-[100px]">
          Directions
        </Button>
      </div>
    </div>;
}