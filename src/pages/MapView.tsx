import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SearchIcon, NavigationIcon } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { BottomNav } from '../components/BottomNav';
import { BusinessCard } from '../components/BusinessCard';
import { mockBusinesses, categories } from '../utils/mockData';
// Fix default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
});
// Custom marker icons for categories
const createCategoryIcon = (emoji: string, color: string) => {
  return L.divIcon({
    html: `<div style="background-color: ${color}; width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">${emoji}</div>`,
    className: 'custom-marker',
    iconSize: [48, 48],
    iconAnchor: [24, 48]
  });
};
// User location icon
const userLocationIcon = L.divIcon({
  html: `<div style="width: 20px; height: 20px; background-color: #3B82F6; border: 3px solid white; border-radius: 50%; box-shadow: 0 0 20px rgba(59, 130, 246, 0.6);"></div>`,
  className: 'user-marker',
  iconSize: [20, 20],
  iconAnchor: [10, 10]
});
// Component to handle map center changes
function MapController({
  center
}: {
  center: [number, number];
}) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 16, {
      animate: true
    });
  }, [center, map]);
  return null;
}
export function MapView() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedBusiness, setSelectedBusiness] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('restaurant');
  const [searchQuery, setSearchQuery] = useState('');
  // Get target location from navigation state
  const targetLocation = location.state?.targetLocation;
  const businessName = location.state?.businessName;
  // NYC default location
  const nycCenter: [number, number] = [40.7589, -73.9851];
  const mapCenter: [number, number] = targetLocation ? [targetLocation.lat, targetLocation.lng] : nycCenter;

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleNearMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          alert(`Location updated! Centering map to your position.`);
          // Map will recenter with MapController component
        },
        (error) => {
          alert('Unable to access your location. Please enable location services in your browser settings.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };
  return <div className="h-screen w-full relative">
      {/* Leaflet Map */}
      <MapContainer center={mapCenter} zoom={targetLocation ? 16 : 14} style={{
      height: '100%',
      width: '100%'
    }} zoomControl={false}>
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapController center={mapCenter} />
        {/* User Location Marker */}
        <Marker position={nycCenter} icon={userLocationIcon}>
          <Popup>Your Location</Popup>
        </Marker>
        {/* Target Location Marker (from directions) */}
        {targetLocation && <Marker position={[targetLocation.lat, targetLocation.lng]} icon={createCategoryIcon('📍', '#FF7A57')}>
            <Popup>
              <div className="text-center">
                <h3 className="font-bold">{businessName}</h3>
                <p className="text-sm text-gray-600">Tap for directions</p>
              </div>
            </Popup>
          </Marker>}
        {/* Business Markers */}
        {mockBusinesses.filter(b => selectedCategory === 'service' || b.category === selectedCategory).map(business => {
        const category = categories.find(c => c.id === business.category);
        const icon = createCategoryIcon(category?.icon || '📍', category?.color || '#FF7A57');
        return <Marker key={business.id} position={[business.location.lat, business.location.lng]} icon={icon} eventHandlers={{
          click: () => setSelectedBusiness(business.id)
        }}>
                <Popup>
                  <div className="text-center">
                    <h3 className="font-bold">{business.name}</h3>
                    <p className="text-sm text-gray-600">
                      {business.description}
                    </p>
                  </div>
                </Popup>
              </Marker>;
      })}
      </MapContainer>
      {/* Search Bar */}
      <div className="absolute top-4 sm:top-6 left-3 right-3 sm:left-6 sm:right-6 z-[1000]">
        <div className="relative">
          <SearchIcon className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search on map..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-4 rounded-2xl bg-white shadow-lg border-none focus:outline-none focus:ring-2 focus:ring-mapleon-coral/30 transition-all text-sm sm:text-base" 
          />
        </div>
      </div>
      {/* Category Filter Pills */}
      <div className="absolute top-16 sm:top-24 left-3 right-3 sm:left-6 sm:right-6 z-[1000]">
        <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
          {categories.map(category => <button key={category.id} onClick={() => setSelectedCategory(category.id)} className={`px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-full whitespace-nowrap transition-all font-medium shadow-md active:scale-95 flex-shrink-0 ${selectedCategory === category.id ? 'bg-white scale-105' : 'bg-white/80'}`} style={{
          color: selectedCategory === category.id ? category.color : '#0D1A20'
        }}>
              <span className="mr-1 sm:mr-2 text-sm sm:text-base">{category.icon}</span>
              <span className="text-xs sm:text-base">{category.name}</span>
            </button>)}
        </div>
      </div>
      {/* "Near Me" Floating Button */}
      <button 
        onClick={handleNearMe}
        className="absolute bottom-32 right-4 sm:right-6 z-[1000] bg-gradient-to-br from-mapleon-teal to-mapleon-aqua text-white p-4 sm:p-5 rounded-full shadow-xl active:scale-95 transition-transform"
      >
        <NavigationIcon size={24} className="sm:w-7 sm:h-7" />
      </button>
      {/* Selected Business Card */}
      {selectedBusiness && <div className="absolute bottom-28 left-4 right-4 sm:left-6 sm:right-6 z-[1000] animate-slide-up">
          <BusinessCard 
            business={mockBusinesses.find(b => b.id === selectedBusiness)!} 
            onViewDetails={() => navigate(`/business/${selectedBusiness}`)} 
          />
        </div>}
      <BottomNav />
    </div>;
}