import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Share2, Phone, MapPin, Globe, Star, ChevronRight, Clock, Heart, MessageCircle, Bookmark } from 'lucide-react';
import { mockBusinesses, mockReviews, mockPosts } from '../utils/mockData';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { ReviewCard } from '../components/ReviewCard';
import { BottomNav } from '../components/BottomNav';

export function BusinessDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<'posts' | 'about' | 'photos' | 'reviews'>('posts');
  const [showHours, setShowHours] = useState(false);
  
  // Find the business by ID
  const business = mockBusinesses.find(b => b.id === id);
  
  // If business not found, redirect back
  if (!business) {
    navigate(-1);
    return null;
  }

  const reviews = mockReviews.filter(r => r.businessId === business.id);
  const posts = mockPosts.filter(p => p.businessId === business.id);

  const handleShare = async () => {
    const shareData = {
      title: business.name,
      text: `Check out ${business.name}!`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 pb-24">
      {/* Header */}
      <div className="relative">
        {/* Cover Photo */}
        <div className="relative h-48 sm:h-56 bg-gray-200">
          <img
            src={business.coverImage || business.image}
            alt={business.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent" />
          
          {/* Header Actions */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              data-testid="back-button"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              onClick={handleShare}
              className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              <Share2 size={20} />
            </button>
          </div>
        </div>

        {/* Profile Info */}
        <div className="px-4 pb-4">
          {/* Avatar */}
          <div className="relative -mt-12 mb-3">
            <img
              src={business.profileImage || business.image}
              alt={business.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white object-cover"
            />
          </div>

          {/* Name and Badge */}
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 break-words">{business.name}</h1>
            {business.verified && (
              <Badge type="business" icon="crown" size="md">
                Business
              </Badge>
            )}
          </div>

          {/* Category and Location */}
          <div className="flex items-center gap-2 text-neutral-600 mb-2 flex-wrap">
            <span className="text-xs sm:text-sm font-medium capitalize">{business.category}</span>
            <span className="text-neutral-400">•</span>
            <span className="text-xs sm:text-sm truncate max-w-[200px]">{business.address?.split(',')[0] || 'Location'}</span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <div className="flex items-center gap-1">
              <Star size={16} className="fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-neutral-900">{business.rating}</span>
            </div>
            <span className="text-xs sm:text-sm text-neutral-600">({business.reviews} reviews)</span>
            <span className="text-neutral-400">•</span>
            <span className="text-xs sm:text-sm text-neutral-600">{business.distance}km away</span>
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base text-neutral-700 mb-4 break-words">{business.description}</p>

          {/* Book Button - For Users Viewing Business Profile */}
          <div className="mb-4">
            <Button 
              variant="primary" 
              size="md" 
              fullWidth 
              onClick={() => navigate(`/bookings?business=${business.id}`)}
              data-testid="book-button"
            >
              Book Now
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mb-6 overflow-x-auto">
            {business.phone && (
              <a href={`tel:${business.phone}`} className="flex-1 min-w-[90px] sm:min-w-[100px]">
                <Button variant="secondary" size="md" fullWidth>
                  <Phone size={16} className="sm:w-[18px] sm:h-[18px]" />
                  <span className="text-xs sm:text-sm">Call</span>
                </Button>
              </a>
            )}
            <button onClick={() => navigate('/map', { state: { targetLocation: business.location, businessName: business.name } })} className="flex-1 min-w-[90px] sm:min-w-[100px]">
              <Button variant="secondary" size="md" fullWidth>
                <MapPin size={16} className="sm:w-[18px] sm:h-[18px]" />
                <span className="text-xs sm:text-sm">Directions</span>
              </Button>
            </button>
            {business.website && (
              <a href={business.website.startsWith('http') ? business.website : `https://${business.website}`} target="_blank" rel="noopener noreferrer" className="flex-1 min-w-[90px] sm:min-w-[100px]">
                <Button variant="secondary" size="md" fullWidth>
                  <Globe size={16} className="sm:w-[18px] sm:h-[18px]" />
                  <span className="text-xs sm:text-sm">Website</span>
                </Button>
              </a>
            )}
          </div>

          {/* Business Info Section */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
            <h3 className="font-semibold text-neutral-900 mb-3 text-sm sm:text-base">Business Info</h3>
            
            {/* Hours */}
            <button
              onClick={() => setShowHours(!showHours)}
              className="w-full flex items-center justify-between py-2 hover:bg-gray-50 rounded-lg px-2 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Clock size={18} className="sm:w-5 sm:h-5 text-neutral-600 flex-shrink-0" />
                <div className="text-left">
                  <p className="text-xs sm:text-sm font-medium text-neutral-900">Hours</p>
                  <p className="text-xs text-neutral-500">
                    {business.openNow ? 'Open now' : 'Closed'}
                  </p>
                </div>
              </div>
              <ChevronRight size={18} className={`sm:w-5 sm:h-5 text-neutral-400 transition-transform ${
                showHours ? 'rotate-90' : ''
              }`} />
            </button>

            {showHours && business.hours && (
              <div className="ml-7 sm:ml-9 mt-2 space-y-2">
                {Object.entries(business.hours).map(([day, hours]) => (
                  <div key={day} className="flex justify-between text-xs sm:text-sm">
                    <span className="text-neutral-700">{day}</span>
                    <span className="text-neutral-900 font-medium">{hours}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="border-t border-gray-100 my-3" />

            {/* Contact Info */}
            <div className="space-y-3">
              {business.phone && (
                <div className="flex items-center gap-3 text-xs sm:text-sm">
                  <Phone size={16} className="sm:w-[18px] sm:h-[18px] text-neutral-600 flex-shrink-0" />
                  <span className="text-neutral-900 break-all">{business.phone}</span>
                </div>
              )}
              {business.email && (
                <div className="flex items-center gap-3 text-xs sm:text-sm">
                  <Globe size={16} className="sm:w-[18px] sm:h-[18px] text-neutral-600 flex-shrink-0" />
                  <span className="text-neutral-900 break-all">{business.email}</span>
                </div>
              )}
              {business.address && (
                <div className="flex items-start gap-3 text-xs sm:text-sm">
                  <MapPin size={16} className="sm:w-[18px] sm:h-[18px] text-neutral-600 flex-shrink-0 mt-0.5" />
                  <span className="text-neutral-900 break-words">{business.address}</span>
                </div>
              )}
            </div>

            {business.amenities && business.amenities.length > 0 && (
              <>
                <div className="border-t border-gray-100 my-3" />
                <div>
                  <p className="text-xs sm:text-sm font-medium text-neutral-900 mb-2">Amenities</p>
                  <div className="flex flex-wrap gap-2">
                    {business.amenities.map((amenity, index) => (
                      <span
                        key={index}
                        className="px-2 sm:px-3 py-1 bg-neutral-100 text-neutral-700 text-xs rounded-full"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
        <div className="flex overflow-x-auto">
          {(['posts', 'about', 'photos', 'reviews'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 min-w-[80px] py-3 text-xs sm:text-sm font-medium transition-colors relative whitespace-nowrap ${
                activeTab === tab
                  ? 'text-primary-brand'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-brand" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-4">
        {activeTab === 'posts' && (
          <div className="space-y-4">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div key={post.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  {/* Post Header */}
                  <div className="p-3 sm:p-4 flex items-center gap-3">
                    <img
                      src={post.profileImage}
                      alt={post.businessName}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm sm:text-base text-neutral-900 truncate">{post.businessName}</h4>
                      <p className="text-xs text-neutral-500">2 hours ago</p>
                    </div>
                  </div>

                  {/* Post Media */}
                  {post.video ? (
                    <video
                      src={post.video}
                      className="w-full aspect-video object-cover"
                      controls
                      playsInline
                    />
                  ) : (
                    <img
                      src={post.image}
                      alt="Post"
                      className="w-full aspect-video object-cover"
                    />
                  )}

                  {/* Post Actions */}
                  <div className="p-3 sm:p-4">
                    <div className="flex items-center gap-4 mb-3">
                      <button className="flex items-center gap-2 text-neutral-600 hover:text-red-500 transition-colors">
                        <Heart size={20} className="sm:w-6 sm:h-6" />
                        <span className="text-sm sm:text-base font-semibold">{(post.likes / 1000).toFixed(1)}K</span>
                      </button>
                      <button className="flex items-center gap-2 text-neutral-600 hover:text-blue-500 transition-colors">
                        <MessageCircle size={20} className="sm:w-6 sm:h-6" />
                        <span className="text-sm sm:text-base font-semibold">{post.comments}</span>
                      </button>
                      <button className="ml-auto text-neutral-600 hover:text-yellow-500 transition-colors">
                        <Bookmark size={20} className="sm:w-6 sm:h-6" />
                      </button>
                    </div>

                    {/* Post Caption */}
                    <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                      <span className="font-semibold">{post.businessName}</span> {post.caption}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-neutral-500 text-sm sm:text-base">No posts yet</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'about' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h3 className="font-semibold text-neutral-900 mb-2 text-sm sm:text-base">About</h3>
              <p className="text-neutral-700 text-xs sm:text-sm leading-relaxed">{business.description}</p>
            </div>
          </div>
        )}

        {activeTab === 'photos' && business.photos && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {business.photos.map((photo, index) => (
              <div key={index} className="relative aspect-square bg-gray-200 rounded-lg overflow-hidden">
                <img src={photo} alt={`Photo ${index + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-3">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-neutral-500 text-sm sm:text-base">No reviews yet</p>
              </div>
            )}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
