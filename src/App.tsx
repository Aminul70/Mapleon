import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Onboarding } from './pages/Onboarding';
import { InterestSelection } from './pages/InterestSelection';
import { HomeFeed } from './pages/HomeFeed';
import { Explore } from './pages/Explore';
import { MapView } from './pages/MapView';
import { Messages } from './pages/Messages';
import { ChatView } from './pages/ChatView';
import { Profile } from './pages/Profile';
import { BusinessProfile } from './pages/BusinessProfile';
import { UserProfile } from './pages/UserProfile';
import { Settings } from './pages/Settings';
import { Bookings } from './pages/Bookings';
import { BusinessDetail } from './pages/BusinessDetail';
import { Notifications } from './pages/Notifications';
import { EnhancedNotifications } from './pages/EnhancedNotifications';
import { AnalyticsDashboard } from './pages/AnalyticsDashboard';
import { Favorites } from './pages/Favorites';
import { SearchResults } from './pages/SearchResults';
import { Help } from './pages/Help';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfService } from './pages/TermsOfService';
import { DesignSystem } from './pages/DesignSystem';

export function App() {
  return <BrowserRouter>
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/interests" element={<InterestSelection />} />
        <Route path="/home" element={<HomeFeed />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/map" element={<MapView />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/chat" element={<ChatView />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/business/:id" element={<BusinessDetail />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/help" element={<Help />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/design-system" element={<DesignSystem />} />
      </Routes>
    </BrowserRouter>;
}