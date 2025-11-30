import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, Phone, MapPin, Globe, Star, ChevronRight, Clock, Settings, BarChart2, Users } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { mockBusinesses, mockReviews, mockPosts } from '../utils/mockData';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { ReviewCard } from '../components/ReviewCard';
import { AccountSwitcher } from '../components/AccountSwitcher';
import { BottomNav } from '../components/BottomNav';

export function BusinessProfile() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'about' | 'posts' | 'photos' | 'reviews'>('about');
  const [showHours, setShowHours] = useState(false);
  const [showAccountSwitcher, setShowAccountSwitcher] = useState(false);
  
  const business = mockBusinesses[0]; // Using first business as example
  const reviews = mockReviews.filter(r => r.businessId === business.id);
  const posts = mockPosts.filter(p => p.businessId === business.id);

  return (
    <div className="min-h-screen bg-neutral-50 pb-24">
      {/* Header */}
      <div className="relative">
        {/* Cover Photo */}
        <div className="relative h-48 bg-gray-200">
          <img
            src={business.coverImage || business.image}
            alt={business.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent" />
          
          {/* Header Actions */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <button
              onClick={() => setShowAccountSwitcher(true)}
              className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white"
            >
              <Users size={20} />
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('/analytics')}
                className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white"
              >
                <BarChart2 size={20} />
              </button>
              <button
                onClick={() => navigate('/settings')}
                className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white"
              >
                <Settings size={20} />
              </button>
              <button className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white">
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="px-4 pb-4">
          {/* Avatar */}
          <div className="relative -mt-12 mb-3">
            <img
              src={business.profileImage}
              alt={business.name}
              className="w-24 h-24 rounded-full border-4 border-white object-cover"
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
            <span className="text-xs sm:text-sm truncate max-w-[200px]">{business.address?.split(',')[0]}</span>
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

          {/* Edit Profile Button */}
          <div className="mb-4">
            <Button 
              variant="primary" 
              size="md" 
              fullWidth 
              onClick={() => navigate('/business-profile-edit')}
            >
              Edit Profile
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mb-6 overflow-x-auto">
            <a href={`tel:${business.phone}`} className="flex-1 min-w-[100px]">
              <Button variant="secondary" size="md" fullWidth>
                <Phone size={18} />
                <span className="text-xs sm:text-sm">Call</span>
              </Button>
            </a>
            <button onClick={() => navigate('/map')} className="flex-1 min-w-[100px]">
              <Button variant="secondary" size="md" fullWidth>
                <MapPin size={18} />
                <span className="text-xs sm:text-sm">Directions</span>
              </Button>
            </button>
            <a href={business.website} target="_blank" rel="noopener noreferrer" className="flex-1 min-w-[100px]">
              <Button variant="secondary" size="md" fullWidth>
                <Globe size={18} />
                <span className="text-xs sm:text-sm">Website</span>
              </Button>
            </a>
          </div>

          {/* Business Info Section */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
            <h3 className="font-semibold text-neutral-900 mb-3">Business Info</h3>
            
            {/* Hours */}
            <button
              onClick={() => setShowHours(!showHours)}
              className="w-full flex items-center justify-between py-2 hover:bg-gray-50 rounded-lg px-2"
            >
              <div className="flex items-center gap-3">
                <Clock size={20} className="text-neutral-600" />
                <div className="text-left">
                  <p className="text-sm font-medium text-neutral-900">Hours</p>
                  <p className="text-xs text-neutral-500">
                    {business.openNow ? 'Open now' : 'Closed'}
                  </p>
                </div>
              </div>
              <ChevronRight size={20} className={`text-neutral-400 transition-transform ${
                showHours ? 'rotate-90' : ''
              }`} />
            </button>

            {showHours && business.hours && (
              <div className="ml-9 mt-2 space-y-2">
                {Object.entries(business.hours).map(([day, hours]) => (
                  <div key={day} className="flex justify-between text-sm">
                    <span className="text-neutral-700">{day}</span>
                    <span className="text-neutral-900 font-medium">{hours}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="border-t border-gray-100 my-3" />

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Phone size={18} className="text-neutral-600" />
                <span className="text-neutral-900">{business.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Globe size={18} className="text-neutral-600" />
                <span className="text-neutral-900">{business.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin size={18} className="text-neutral-600" />
                <span className="text-neutral-900">{business.address}</span>
              </div>
            </div>

            {business.amenities && business.amenities.length > 0 && (
              <>
                <div className="border-t border-gray-100 my-3" />
                <div>
                  <p className="text-sm font-medium text-neutral-900 mb-2">Amenities</p>
                  <div className="flex flex-wrap gap-2">
                    {business.amenities.map((amenity, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-neutral-100 text-neutral-700 text-xs rounded-full"
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
        <div className="flex">
          {(['about', 'posts', 'photos', 'reviews'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-sm font-medium transition-colors relative ${
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
        {activeTab === 'about' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h3 className="font-semibold text-neutral-900 mb-2">About</h3>
              <p className="text-neutral-700 text-sm leading-relaxed">{business.description}</p>
            </div>
          </div>
        )}

        {activeTab === 'posts' && (
          <div className="grid grid-cols-3 gap-1">
            {posts.map((post) => (
              <div key={post.id} className="relative aspect-square bg-gray-200 rounded-lg overflow-hidden">
                <img src={post.image} alt="Post" className="w-full h-full object-cover" />
                <div className="absolute bottom-1 left-1 flex items-center gap-1 text-white text-xs">
                  <Star size={12} className="fill-white" />
                  <span>{(post.likes / 1000).toFixed(1)}K</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'photos' && business.photos && (
          <div className="grid grid-cols-2 gap-2">
            {business.photos.map((photo, index) => (
              <div key={index} className="relative aspect-square bg-gray-200 rounded-lg overflow-hidden">
                <img src={photo} alt={`Photo ${index + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-3">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}
      </div>

      {/* Account Switcher Modal */}
      {showAccountSwitcher && (
        <AccountSwitcher onClose={() => setShowAccountSwitcher(false)} />
      )}

      <BottomNav />
    </div>
  );
}
