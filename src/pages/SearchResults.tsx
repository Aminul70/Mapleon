import { useState, useEffect } from 'react';
import { ArrowLeftIcon, SearchIcon, FilterIcon, MapPinIcon, StarIcon } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BottomNav } from '../components/BottomNav';
import { mockBusinesses, Business } from '../utils/mockData';

export function SearchResults() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [results, setResults] = useState<Business[]>([]);
  const [activeFilter, setActiveFilter] = useState<'all' | 'restaurant' | 'cafe' | 'gym' | 'salon'>('all');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    performSearch(initialQuery);
  }, [initialQuery]);

  const performSearch = (query: string) => {
    setIsLoading(true);
    
    // Simulate search delay
    setTimeout(() => {
      if (query.trim() === '') {
        setResults([]);
      } else {
        // Filter businesses based on search query
        const filtered = mockBusinesses.filter(business =>
          business.name.toLowerCase().includes(query.toLowerCase()) ||
          business.description.toLowerCase().includes(query.toLowerCase()) ||
          business.category.toLowerCase().includes(query.toLowerCase())
        );
        
        // Apply category filter if not 'all'
        const finalResults = activeFilter === 'all' 
          ? filtered 
          : filtered.filter(b => b.category === activeFilter);
        
        setResults(finalResults);
      }
      setIsLoading(false);
    }, 300);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      performSearch(searchQuery);
    }
  };

  const handleFilterChange = (filter: typeof activeFilter) => {
    setActiveFilter(filter);
    performSearch(searchQuery);
  };

  const filters = [
    { id: 'all' as const, label: 'All' },
    { id: 'restaurant' as const, label: 'Restaurants' },
    { id: 'cafe' as const, label: 'Cafes' },
    { id: 'gym' as const, label: 'Gyms' },
    { id: 'salon' as const, label: 'Salons' }
  ];

  return (
    <div className="min-h-screen bg-mapleon-gray pb-24">
      {/* Header with Search */}
      <div className="bg-white px-4 sm:px-6 pt-4 pb-4 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 active:scale-95 transition-transform"
          >
            <ArrowLeftIcon size={22} className="text-mapleon-slate" />
          </button>
          
          {/* Search Bar */}
          <div className="flex-1 relative">
            <SearchIcon
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search places..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-mapleon-gray border-none focus:outline-none focus:ring-2 focus:ring-mapleon-coral/30 transition-all text-sm"
            />
          </div>

          <button
            onClick={handleSearch}
            className="p-2.5 bg-gradient-to-r from-mapleon-coral to-mapleon-pink text-white rounded-xl active:scale-95 transition-transform"
          >
            <SearchIcon size={18} />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => handleFilterChange(filter.id)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-all font-medium text-sm active:scale-95 ${
                activeFilter === filter.id
                  ? 'bg-mapleon-slate text-white'
                  : 'bg-white text-gray-600'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="px-4 sm:px-6 py-4">
        {/* Results Count */}
        {searchQuery && !isLoading && (
          <p className="text-sm text-gray-500 mb-4">
            {results.length} result{results.length !== 1 ? 's' : ''} for "{searchQuery}"
          </p>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mapleon-coral"></div>
          </div>
        )}

        {/* Results List */}
        {!isLoading && results.length > 0 && (
          <div className="space-y-3">
            {results.map(business => (
              <button
                key={business.id}
                onClick={() => navigate(`/business/${business.id}`)}
                className="w-full bg-white rounded-2xl overflow-hidden shadow-sm active:opacity-80 transition-opacity"
              >
                <div className="flex gap-4 p-4">
                  {/* Business Image */}
                  <img
                    src={business.image}
                    alt={business.name}
                    className="w-24 h-24 rounded-xl object-cover flex-shrink-0"
                  />

                  {/* Business Info */}
                  <div className="flex-1 text-left min-w-0">
                    <h3 className="font-bold text-mapleon-slate mb-1 truncate">
                      {business.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2 truncate">
                      {business.description}
                    </p>

                    {/* Rating & Distance */}
                    <div className="flex items-center gap-3 text-sm mb-2">
                      <div className="flex items-center gap-1">
                        <StarIcon size={14} className="fill-mapleon-warning text-mapleon-warning" />
                        <span className="font-semibold text-mapleon-slate">
                          {business.rating}
                        </span>
                        <span className="text-gray-400">
                          ({business.reviews})
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <MapPinIcon size={14} />
                        <span>{business.distance}mi</span>
                      </div>
                    </div>

                    {/* Category Badge */}
                    <span className="inline-block px-2 py-1 bg-mapleon-gray rounded-full text-xs font-medium text-mapleon-slate capitalize">
                      {business.category}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* No Results */}
        {!isLoading && searchQuery && results.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4">
              <SearchIcon size={40} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-mapleon-slate mb-2">
              No results found
            </h3>
            <p className="text-gray-500 text-center max-w-sm mb-6">
              We couldn't find any places matching "{searchQuery}". Try different keywords.
            </p>
            <button
              onClick={() => navigate('/explore')}
              className="px-6 py-3 bg-gradient-to-r from-mapleon-coral to-mapleon-pink text-white rounded-2xl font-semibold active:scale-95 transition-transform"
            >
              Explore Places
            </button>
          </div>
        )}

        {/* Initial State (no search yet) */}
        {!isLoading && !searchQuery && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4">
              <SearchIcon size={40} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-mapleon-slate mb-2">
              Start Searching
            </h3>
            <p className="text-gray-500 text-center max-w-sm">
              Enter keywords to find restaurants, cafes, gyms, and more
            </p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
