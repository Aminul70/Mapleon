import { useState } from 'react';
import { ArrowLeftIcon, HeartIcon, MapPinIcon, StarIcon, TrashIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '../components/BottomNav';
import { mockBusinesses, Business } from '../utils/mockData';

export function Favorites() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<Business[]>(mockBusinesses.slice(0, 4));
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const removeFavorite = (id: string) => {
    setFavorites(favorites.filter(business => business.id !== id));
    setShowDeleteConfirm(null);
  };

  return (
    <div className="min-h-screen bg-mapleon-gray pb-24">
      {/* Header */}
      <div className="bg-white px-4 sm:px-6 pt-4 pb-4 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={() => navigate('/home')}
            className="p-2 -ml-2 active:scale-95 transition-transform"
          >
            <ArrowLeftIcon size={22} className="text-mapleon-slate" />
          </button>
          <h1 className="text-2xl font-bold text-mapleon-slate">
            Saved Places
          </h1>
        </div>
        <p className="text-sm text-gray-500">
          {favorites.length} saved place{favorites.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Favorites List */}
      {favorites.length > 0 ? (
        <div className="px-4 sm:px-6 py-4">
          <div className="space-y-3">
            {favorites.map(business => (
              <div
                key={business.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => navigate(`/business/${business.id}`)}
                  className="w-full text-left active:opacity-80 transition-opacity"
                >
                  <div className="flex gap-4 p-4">
                    {/* Business Image */}
                    <img
                      src={business.image}
                      alt={business.name}
                      className="w-24 h-24 rounded-xl object-cover flex-shrink-0"
                    />

                    {/* Business Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-mapleon-slate mb-1 truncate">
                        {business.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2 truncate">
                        {business.description}
                      </p>

                      {/* Rating & Distance */}
                      <div className="flex items-center gap-3 text-sm">
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

                      {/* Status Badge */}
                      <div className="mt-2">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          business.openNow
                            ? 'bg-green-50 text-green-700'
                            : 'bg-red-50 text-red-700'
                        }`}>
                          {business.openNow ? 'Open Now' : 'Closed'}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>

                {/* Remove Button */}
                <div className="border-t border-gray-100 px-4 py-3 flex justify-end">
                  <button
                    onClick={() => setShowDeleteConfirm(business.id)}
                    className="flex items-center gap-2 text-red-600 font-medium text-sm active:scale-95 transition-transform"
                  >
                    <TrashIcon size={16} />
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-20 px-6">
          <div className="w-20 h-20 bg-mapleon-gray rounded-full flex items-center justify-center mb-4">
            <HeartIcon size={40} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-mapleon-slate mb-2 text-center">
            No saved places yet
          </h3>
          <p className="text-gray-500 text-center max-w-sm mb-6">
            Start exploring and save your favorite places to easily find them later
          </p>
          <button
            onClick={() => navigate('/explore')}
            className="px-6 py-3 bg-gradient-to-r from-mapleon-coral to-mapleon-pink text-white rounded-2xl font-semibold active:scale-95 transition-transform"
          >
            Explore Places
          </button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center sm:justify-center">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowDeleteConfirm(null)}
          />

          <div className="relative w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-6 animate-slide-up">
            <h3 className="text-xl font-bold text-mapleon-slate mb-2">
              Remove from Saved?
            </h3>
            <p className="text-gray-600 mb-6">
              This place will be removed from your saved list.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-2xl font-semibold active:scale-95 transition-transform"
              >
                Cancel
              </button>
              <button
                onClick={() => removeFavorite(showDeleteConfirm)}
                className="flex-1 py-3 bg-red-600 text-white rounded-2xl font-semibold active:scale-95 transition-transform"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
