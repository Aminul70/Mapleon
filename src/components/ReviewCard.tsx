import React from 'react';
import { Star } from 'lucide-react';
import { Review } from '../utils/mockData';

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <div className="flex items-start gap-3 mb-3">
        <img
          src={review.userImage}
          alt={review.userName}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900">{review.userName}</h4>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">{review.date}</span>
          </div>
        </div>
      </div>
      <p className="text-gray-700 text-sm leading-relaxed">{review.comment}</p>
      {review.photos && review.photos.length > 0 && (
        <div className="flex gap-2 mt-3">
          {review.photos.map((photo, index) => (
            <img
              key={index}
              src={photo}
              alt="Review photo"
              className="w-20 h-20 rounded-lg object-cover"
            />
          ))}
        </div>
      )}
    </div>
  );
}
