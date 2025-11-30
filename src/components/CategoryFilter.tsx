import React, { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { categories } from '../utils/mockData';

interface CategoryFilterProps {
  onSelectCategory: (categoryId: string | null) => void;
  selectedCategory: string | null;
}

export function CategoryFilter({ onSelectCategory, selectedCategory }: CategoryFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (categoryId: string | null) => {
    onSelectCategory(categoryId);
    setIsOpen(false);
  };

  const selectedCategoryName = selectedCategory 
    ? categories.find(c => c.id === selectedCategory)?.name 
    : 'All Categories';

  return (
    <div className="relative">
      {/* Filter Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 text-white text-sm font-medium active:scale-95 transition-transform"
      >
        <span>{selectedCategoryName}</span>
        <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown Menu */}
          <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden animate-slide-up">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">Discover Businesses</h3>
                <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <X size={20} />
                </button>
              </div>

              {/* All Categories */}
              <button
                onClick={() => handleSelect(null)}
                className={`w-full text-left px-4 py-3 rounded-xl mb-2 transition-colors ${
                  !selectedCategory
                    ? 'bg-primary-brand text-white'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <span className="font-medium">✓ All Categories</span>
              </button>

              {/* Divider */}
              <div className="border-t border-gray-200 my-3" />

              {/* Category List */}
              <div className="space-y-1">
                {categories.filter(c => c.id !== 'all').map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleSelect(category.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-colors flex items-center gap-3 ${
                      selectedCategory === category.id
                        ? 'bg-primary-brand text-white'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <span className="text-xl">
                      {category.id === 'restaurant' && '🍽️'}
                      {category.id === 'cafe' && '☕'}
                      {category.id === 'gym' && '💪'}
                      {category.id === 'salon' && '✂️'}
                      {category.id === 'service' && '✨'}
                    </span>
                    <span className="font-medium">{category.name}</span>
                  </button>
                ))}
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 my-3" />

              {/* Quick Filters */}
              <div className="space-y-1">
                <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-100 text-gray-700 flex items-center gap-3">
                  <span>📍</span>
                  <span className="font-medium">Near Me</span>
                </button>
                <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-100 text-gray-700 flex items-center gap-3">
                  <span>🔥</span>
                  <span className="font-medium">Trending Now</span>
                </button>
                <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-100 text-gray-700 flex items-center gap-3">
                  <span>⭐</span>
                  <span className="font-medium">Top Rated</span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
