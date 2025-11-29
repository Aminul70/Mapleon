import React, { useState, Component } from 'react';
import { SearchIcon, CameraIcon, Flame, Dumbbell, Coffee, UtensilsCrossed, Scissors, Sparkles, Dog, Store } from 'lucide-react';
import { BottomNav } from '../components/BottomNav';
import { TrendingCard } from '../components/TrendingCard';
import { DiscoveryCard } from '../components/DiscoveryCard';
import { categories } from '../utils/mockData';
const iconMap: Record<string, ComponentType<{
  size?: number;
  className?: string;
}>> = {
  UtensilsCrossed,
  Dumbbell,
  Scissors,
  Coffee,
  Sparkles
};
export function Explore() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const trendingItems = [{
    title: 'Burger Wars Cook-Off',
    subtitle: 'Downtown Delis',
    icon: 'Flame',
    gradient: 'bg-gradient-to-br from-mapleon-coral to-mapleon-pink'
  }, {
    title: 'Gyms for Every Goal',
    subtitle: 'Fitness Fanatics',
    icon: 'Dumbbell',
    gradient: 'bg-gradient-to-br from-mapleon-teal to-mapleon-aqua'
  }, {
    title: 'Brewing Up New Cafes',
    subtitle: 'Connoisseurs',
    icon: 'Coffee',
    gradient: 'bg-gradient-to-br from-amber-600 to-amber-800'
  }];
  const discoveryItems = [{
    image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=800',
    title: 'Taco Tuesdays are Back!',
    subtitle: 'El Fuego Taqueria',
    size: 'large' as const
  }, {
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800',
    title: 'Revolutionize Your Ride',
    subtitle: 'SpinCycle Studio',
    size: 'large' as const
  }, {
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800',
    title: 'Fresh Cuts & Good Vibes',
    subtitle: "The Gents' Barbershop",
    size: 'medium' as const
  }];
  const exploreCategories = [{
    id: 'restaurants',
    name: 'Restaurants',
    icon: UtensilsCrossed
  }, {
    id: 'gyms',
    name: 'Gyms & Wellness',
    icon: Dumbbell
  }, {
    id: 'salons',
    name: 'Salons & Bars',
    icon: Scissors
  }, {
    id: 'beauty',
    name: 'Beauty',
    icon: Sparkles
  }, {
    id: 'pets',
    name: 'Pets',
    icon: Dog
  }, {
    id: 'local',
    name: 'Local Shops',
    icon: Store
  }];
  return <div className="min-h-screen bg-mapleon-gray pb-24 overflow-x-hidden">
      {/* Header */}
      <div className="bg-white px-4 sm:px-6 pt-12 pb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-mapleon-slate mb-4">
          Beyond Your Hood
        </h1>

        {/* Search Bar */}
        <div className="relative">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input type="text" placeholder="Search topics, places..." className="w-full pl-12 pr-14 py-3.5 sm:py-4 rounded-2xl bg-mapleon-gray border-none focus:outline-none focus:ring-2 focus:ring-mapleon-coral/30 transition-all" />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 active:scale-95 transition-transform">
            <CameraIcon className="text-mapleon-coral" size={22} />
          </button>
        </div>
      </div>

      {/* Trending Today */}
      <div className="px-4 sm:px-6 py-6">
        <h2 className="text-lg sm:text-xl font-bold text-mapleon-slate mb-4 flex items-center gap-2">
          <Flame size={24} className="text-mapleon-coral" />
          Trending Today
        </h2>
        <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          {trendingItems.map((item, index) => <TrendingCard key={index} {...item} />)}
        </div>
      </div>

      {/* Popular Categories */}
      <div className="px-4 sm:px-6 py-4">
        <h2 className="text-lg sm:text-xl font-bold text-mapleon-slate mb-4">
          Popular Categories
        </h2>
        <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          {exploreCategories.map(category => {
          const IconComponent = category.icon;
          return <button key={category.id} onClick={() => setSelectedCategory(category.id)} className={`px-4 sm:px-5 py-2.5 sm:py-3 rounded-full whitespace-nowrap transition-all font-medium active:scale-95 flex items-center gap-2 ${selectedCategory === category.id ? 'bg-white shadow-md text-mapleon-slate' : 'bg-white/60 text-gray-600'}`}>
                <IconComponent size={18} />
                <span className="text-sm sm:text-base">{category.name}</span>
              </button>;
        })}
        </div>
      </div>

      {/* Discover More */}
      <div className="px-4 sm:px-6 py-4">
        <h2 className="text-lg sm:text-xl font-bold text-mapleon-slate mb-4">
          Discover More
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {discoveryItems.map((item, index) => <div key={index} className={index === 0 ? 'col-span-2' : ''}>
              <DiscoveryCard {...item} />
            </div>)}
        </div>
      </div>

      <BottomNav />
    </div>;
}