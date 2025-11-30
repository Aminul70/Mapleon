import React, { useState } from 'react';
import { ArrowLeftIcon, HeartIcon, Share2Icon, StarIcon, MapPinIcon, ClockIcon, PhoneIcon } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { BottomNav } from '../components/BottomNav';
import { Button } from '../components/Button';
import { mockBusinesses } from '../utils/mockData';

export function BusinessDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('info');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  
  // Find the business by ID
  const business = mockBusinesses.find(b => b.id === id);
  
  // If business not found, redirect back
  if (!business) {
    navigate(-1);
    return null;
  }

  const images = business.photos || [business.image];

  const reviews = [
    {
      id: '1',
      name: 'FoodieFanatic',
      rating: 5,
      comment: 'Amazing pasta, cozy atmosphere!',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200'
    },
    {
      id: '2',
      name: 'PastaLover',
      rating: 4,
      comment: 'Amazing pasta and cozy atmosphere! Highly recommend.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200'
    },
    {
      id: '3',
      name: 'LocalFoodie',
      rating: 5,
      comment: 'Best Italian food in the city! The tiramisu is to die for.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200'
    },
    {
      id: '4',
      name: 'TravelEater',
      rating: 4,
      comment: 'Authentic Italian cuisine. Service was excellent!',
      image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200'
    }
  ];

  const handleBookTable = () => {
    navigate('/bookings');
  };

  const handleCallNow = () => {
    window.location.href = 'tel:+1234567890';
  };

  const handleShare = async () => {
    const shareData = {
      title: 'The Golden Spoon Restaurant',
      text: 'Check out this amazing restaurant!',
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
    <div className="min-h-screen bg-mapleon-gray pb-24">
      {/* Image Carousel */}
      <div className="relative h-80 bg-gray-200">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform"
        >
          <ArrowLeftIcon size={20} className="text-mapleon-slate" />
        </button>

        <img
          src={images[currentImageIndex]}
          alt="Business"
          className="w-full h-full object-cover"
        />

        {/* Image Dots */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentImageIndex ? 'bg-white w-6' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Business Info Card */}
      <div className="bg-white rounded-t-3xl -mt-6 relative z-10 px-6 pt-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-mapleon-slate mb-1">
              The Golden Spoon Restaurant
            </h1>
            <p className="text-gray-500 mb-3">Italian & Mediterranean Cuisine</p>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <span className="text-3xl font-bold text-mapleon-slate">
                  4.7
                </span>
                <div className="flex">
                  {[1, 2, 3, 4].map(star => (
                    <StarIcon
                      key={star}
                      size={16}
                      className="fill-mapleon-warning text-mapleon-warning"
                    />
                  ))}
                  <StarIcon
                    size={16}
                    className="fill-mapleon-warning text-mapleon-warning opacity-50"
                  />
                </div>
              </div>
              <span className="text-sm text-gray-400">(350 Reviews)</span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="w-10 h-10 rounded-full bg-mapleon-gray flex items-center justify-center active:scale-95 transition-transform"
            >
              <HeartIcon
                size={20}
                className={isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}
              />
            </button>
            <button
              onClick={handleShare}
              className="w-10 h-10 rounded-full bg-mapleon-gray flex items-center justify-center active:scale-95 transition-transform"
            >
              <Share2Icon size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 border-b border-gray-200 mb-4">
          {['Info', 'Photos/Videos', 'Reviews'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase().replace('/', ''))}
              className={`pb-3 font-medium transition-colors relative ${
                activeTab === tab.toLowerCase().replace('/', '')
                  ? 'text-mapleon-slate'
                  : 'text-gray-400'
              }`}
            >
              {tab}
              {activeTab === tab.toLowerCase().replace('/', '') && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-mapleon-slate" />
              )}
            </button>
          ))}
        </div>

        {/* Info Content */}
        {activeTab === 'info' && (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPinIcon size={20} className="text-gray-400 mt-0.5" />
              <div>
                <p className="text-mapleon-slate">123 Oak St, Anytown</p>
                <p className="text-sm text-gray-500">0.5 miles</p>
              </div>
            </div>

            {/* Mini Map */}
            <button
              onClick={() => navigate('/map')}
              className="w-full h-24 bg-gradient-to-br from-mapleon-teal-tint to-mapleon-gray rounded-2xl flex items-center justify-center active:scale-95 transition-transform"
            >
              <MapPinIcon size={32} className="text-mapleon-coral" />
            </button>

            <div className="flex items-start gap-3">
              <ClockIcon size={20} className="text-gray-400 mt-0.5" />
              <div>
                <p className="text-mapleon-slate">Mon-Fri: 11 AM - 10 PM</p>
                <p className="text-mapleon-slate">Sat-Sun: 10 AM - 11 PM</p>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                variant="primary"
                fullWidth
                onClick={handleBookTable}
                className="bg-gradient-to-r from-mapleon-coral to-mapleon-pink"
              >
                Book a Table
              </Button>
              <Button
                variant="primary"
                fullWidth
                onClick={handleCallNow}
                className="bg-gradient-to-r from-blue-500 to-blue-600"
              >
                <PhoneIcon size={18} className="inline mr-2" />
                Call Now
              </Button>
            </div>
          </div>
        )}

        {/* Photos/Videos Tab */}
        {activeTab === 'photosvideos' && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentImageIndex(index);
                    setActiveTab('info');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="aspect-square rounded-xl overflow-hidden active:opacity-80 transition-opacity"
                >
                  <img
                    src={image}
                    alt={`Photo ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div className="space-y-4">
            {reviews.map(review => (
              <div key={review.id} className="bg-white rounded-2xl p-4 border border-gray-100">
                <div className="flex items-start gap-3">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-mapleon-slate">
                        {review.name}
                      </h3>
                    </div>
                    <div className="flex mb-2">
                      {[...Array(review.rating)].map((_, i) => (
                        <StarIcon
                          key={i}
                          size={14}
                          className="fill-mapleon-warning text-mapleon-warning"
                        />
                      ))}
                      {[...Array(5 - review.rating)].map((_, i) => (
                        <StarIcon
                          key={i + review.rating}
                          size={14}
                          className="fill-gray-300 text-gray-300"
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600">{review.comment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}