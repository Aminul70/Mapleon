import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchIcon, MapPin, Phone, Star, Navigation, Filter, X } from 'lucide-react';
import { BottomNav } from '../components/BottomNav';
import { mockBusinesses } from '../utils/mockData';

export function Explore() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Filter businesses based on search and category
  const filteredBusinesses = mockBusinesses.filter(business => {
    const matchesSearch = searchQuery === '' || 
      business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      business.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      business.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !selectedCategory || business.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Get unique categories
  const categories = Array.from(new Set(mockBusinesses.map(b => b.category)));

  const handleSearch = () => {
    // Search is live, no need for explicit action
  };

  const handleBusinessClick = (businessId: string) => {
    navigate(`/business/${businessId}`);
  };

  const handleCallBusiness = (phone: string, e: React.MouseEvent) => {
    e.stopPropagation();
    window.location.href = `tel:${phone}`;
  };

  const handleGetDirections = (business: any, e: React.MouseEvent) => {
    e.stopPropagation();
    navigate('/map', {
      state: {
        targetLocation: business.location,
        businessName: business.name
      }
    });
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} size={14} className="fill-yellow-400 text-yellow-400" />);
    }
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star size={14} className="text-gray-300" />
          <Star size={14} className="fill-yellow-400 text-yellow-400 absolute top-0 left-0" style={{ clipPath: 'inset(0 50% 0 0)' }} />
        </div>
      );
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} size={14} className="text-gray-300" />);
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-neutral-50 pb-24">
      {/* Header with Search */}
      <div className="sticky top-0 z-20 bg-gradient-to-br from-primary-brand to-primary-dark shadow-lg">
        <div className="px-3 sm:px-4 pt-10 sm:pt-12 pb-3 sm:pb-4">
          <h1 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
            Explore Businesses
          </h1>

          {/* Search Bar */}
          <div className="relative mb-2 sm:mb-3">
            <SearchIcon
              className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search on map..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-2.5 sm:py-3.5 rounded-xl bg-white border-none focus:outline-none focus:ring-2 focus:ring-white/50 transition-all text-sm"
              data-testid="search-input"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 p-1.5 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={16} className="text-gray-500" />
              </button>
            )}
          </div>

          {/* Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/20 backdrop-blur-md rounded-lg text-white text-xs sm:text-sm font-medium hover:bg-white/30 transition-colors"
          >
            <Filter size={14} className="sm:w-4 sm:h-4" />
            <span>Filters</span>
            {selectedCategory && <span className="bg-white/30 px-1.5 sm:px-2 py-0.5 rounded-full text-xs">1</span>}
          </button>
        </div>
      </div>

      {/* Category Filters */}
      {showFilters && (
        <div className="bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-semibold text-gray-700">Categories:</span>
            {selectedCategory && (
              <button
                onClick={() => setSelectedCategory(null)}
                className="text-xs text-primary-brand font-medium hover:underline"
              >
                Clear
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category === selectedCategory ? null : category)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-all ${
                  selectedCategory === category
                    ? 'bg-primary-brand text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results Count */}
      <div className="px-4 py-3 bg-white border-b border-gray-100">
        <p className="text-sm text-gray-600">
          Found <span className="font-semibold text-gray-900">{filteredBusinesses.length}</span> businesses
        </p>
      </div>

      {/* Business List */}
      <div className="p-4 space-y-3">
        {filteredBusinesses.length > 0 ? (
          filteredBusinesses.map(business => (
            <div
              key={business.id}
              onClick={() => handleBusinessClick(business.id)}
              className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow cursor-pointer border border-gray-100"
            >
              <div className="flex gap-4 p-4">
                {/* Business Image */}
                <div className="flex-shrink-0">
                  <img
                    src={business.image}
                    alt={business.name}
                    className="w-24 h-24 rounded-xl object-cover"
                  />
                </div>

                {/* Business Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-bold text-neutral-900 text-base truncate">
                      {business.name}
                    </h3>
                    {business.openNow && (
                      <span className="flex-shrink-0 px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        Open
                      </span>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-2">
                    {renderStars(business.rating)}
                    <span className="text-sm font-semibold text-gray-700 ml-1">
                      {business.rating}
                    </span>
                    <span className="text-xs text-gray-500">
                      ({business.reviews} reviews)
                    </span>
                  </div>

                  {/* Category & Distance */}
                  <div className="flex items-center gap-3 text-xs text-gray-600 mb-2">
                    <span className="capitalize font-medium">{business.category}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <MapPin size={12} />
                      <span>{business.distance} mi</span>
                    </div>
                    {business.priceRange && (
                      <>
                        <span>•</span>
                        <span className="font-semibold">{business.priceRange}</span>
                      </>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate('/bookings');
                      }}
                      className="flex-1 bg-primary-brand text-white px-3 py-2 rounded-lg text-xs font-semibold hover:bg-primary-dark transition-colors active:scale-95"
                    >
                      Book!
                    </button>
                    {business.phone && (
                      <button
                        onClick={(e) => handleCallBusiness(business.phone, e)}
                        className="flex items-center justify-center gap-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors active:scale-95"
                      >
                        <Phone size={14} />
                      </button>
                    )}
                    <button
                      onClick={(e) => handleGetDirections(business, e)}
                      className="flex items-center justify-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors active:scale-95"
                    >
                      <Navigation size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <SearchIcon size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No businesses found</h3>
            <p className="text-sm text-gray-600">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
