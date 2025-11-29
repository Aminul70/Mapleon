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
import { Settings } from './pages/Settings';
import { Bookings } from './pages/Bookings';
import { BusinessDetail } from './pages/BusinessDetail';
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
      </Routes>
    </BrowserRouter>;
}