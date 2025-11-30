import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Bell,
  Lock,
  Globe,
  User,
  Database,
  Briefcase,
  HelpCircle,
  FileText,
  Shield,
  LogOut,
  Trash2,
  Download,
  Mail,
  Volume2,
  Search,
  ChevronRight,
  ChevronDown,
} from 'lucide-react';
import { ToggleSwitchField } from '../components/form/ToggleSwitchField';
import { SelectField } from '../components/form/SelectField';
import { Button } from '../components/Button';
import { BottomNav } from '../components/BottomNav';
import { saveSettings, loadSettings, clearAllData } from '../utils/localStorage';
import { useAuth } from '../contexts/AuthContext';

export function Settings() {
  const navigate = useNavigate();
  const { isBusinessAccount } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  // Load settings from localStorage
  const [settings, setSettings] = useState(() => {
    const saved = loadSettings();
    return saved || {
      // Notifications
      pushNotifications: {
        likes: true,
        comments: true,
        followers: true,
        messages: true,
        bookings: true,
        nearbyEvents: false,
      },
      emailNotifications: {
        digest: true,
        promotional: false,
        important: true,
      },
      inAppNotifications: {
        sound: true,
        badge: true,
      },
      // Privacy
      privacy: {
        profileVisibility: 'public',
        activityStatus: true,
        lastSeen: true,
        locationSharing: 'while_using',
        searchVisibility: true,
      },
      // Preferences
      preferences: {
        language: 'en',
        measurementUnit: 'miles',
        currency: 'USD',
        mapView: 'standard',
      },
    };
  });

  // Auto-save settings
  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  const updateSetting = (category: string, field: string, value: any) => {
    setSettings((prev: any) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value,
      },
    }));
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const isSectionExpanded = (section: string) => expandedSections.includes(section);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      // Clear auth and navigate to login
      navigate('/login');
    }
  };

  const handleDeactivateAccount = () => {
    if (window.confirm('Are you sure you want to deactivate your account? You can reactivate it later.')) {
      alert('Account deactivated. You can reactivate by logging in again.');
      navigate('/login');
    }
  };

  const handleDeleteAccount = () => {
    const confirmation = prompt(
      'This action cannot be undone. Type "DELETE" to confirm account deletion:'
    );
    if (confirmation === 'DELETE') {
      clearAllData();
      alert('Your account and all data have been deleted.');
      navigate('/');
    }
  };

  const handleExportData = () => {
    alert('Your data export has been initiated. You will receive an email when it is ready for download.');
  };

  const handleClearCache = () => {
    if (window.confirm('Clear cache? This will remove temporary files.')) {
      alert('Cache cleared successfully!');
    }
  };

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Español' },
    { value: 'fr', label: 'Français' },
    { value: 'de', label: 'Deutsch' },
  ];

  const measurementOptions = [
    { value: 'miles', label: 'Miles' },
    { value: 'km', label: 'Kilometers' },
  ];

  const currencyOptions = [
    { value: 'USD', label: 'USD ($)' },
    { value: 'EUR', label: 'EUR (€)' },
    { value: 'GBP', label: 'GBP (£)' },
  ];

  const mapViewOptions = [
    { value: 'standard', label: 'Standard' },
    { value: 'satellite', label: 'Satellite' },
    { value: 'hybrid', label: 'Hybrid' },
  ];

  const privacyVisibilityOptions = [
    { value: 'public', label: 'Public' },
    { value: 'private', label: 'Private' },
    { value: 'friends', label: 'Friends Only' },
  ];

  const locationOptions = [
    { value: 'always', label: 'Always' },
    { value: 'while_using', label: 'While Using App' },
    { value: 'never', label: 'Never' },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 pb-24">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/profile')}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-lg font-bold text-neutral-900">Settings</h1>
          </div>
        </div>

        {/* Search Settings */}
        <div className="px-4 pb-3">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search settings..."
              className="w-full pl-10 pr-4 py-2 bg-neutral-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-brand/30"
            />
          </div>
        </div>
      </div>

      <div className="p-4 max-w-2xl mx-auto space-y-4">
        {/* Account Section */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <User size={20} className="text-primary-brand" />
              <h2 className="font-semibold text-neutral-900">Account</h2>
            </div>
          </div>
          <div className="p-4">
            <button
              onClick={() => navigate(isBusinessAccount ? '/business-profile-edit' : '/user-profile-edit')}
              className="w-full flex items-center justify-between py-3 hover:bg-gray-50 rounded-lg px-3 transition-colors"
            >
              <span className="text-sm font-medium text-neutral-900">Edit Profile</span>
              <ChevronRight size={18} className="text-gray-400" />
            </button>
            <button
              onClick={() => alert('Change password feature')}
              className="w-full flex items-center justify-between py-3 hover:bg-gray-50 rounded-lg px-3 transition-colors"
            >
              <span className="text-sm font-medium text-neutral-900">Change Password</span>
              <ChevronRight size={18} className="text-gray-400" />
            </button>
            <button
              onClick={() => alert('Phone verification feature')}
              className="w-full flex items-center justify-between py-3 hover:bg-gray-50 rounded-lg px-3 transition-colors"
            >
              <span className="text-sm font-medium text-neutral-900">Phone Verification</span>
              <ChevronRight size={18} className="text-gray-400" />
            </button>
            <button
              onClick={() => alert('Two-factor authentication setup')}
              className="w-full flex items-center justify-between py-3 hover:bg-gray-50 rounded-lg px-3 transition-colors"
            >
              <span className="text-sm font-medium text-neutral-900">Two-Factor Authentication</span>
              <ChevronRight size={18} className="text-gray-400" />
            </button>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <button
            onClick={() => toggleSection('notifications')}
            className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Bell size={20} className="text-primary-brand" />
              <h2 className="font-semibold text-neutral-900">Notifications</h2>
            </div>
            <ChevronDown 
              size={20} 
              className={`text-gray-400 transition-transform ${isSectionExpanded('notifications') ? 'rotate-180' : ''}`}
            />
          </button>
          {isSectionExpanded('notifications') && (
          <div className="p-4 space-y-1 border-t border-gray-100">
            <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">Push Notifications</h3>
            <ToggleSwitchField
              label="Likes"
              value={settings.pushNotifications.likes}
              onChange={(value) => updateSetting('pushNotifications', 'likes', value)}
              description="When someone likes your content"
            />
            <ToggleSwitchField
              label="Comments"
              value={settings.pushNotifications.comments}
              onChange={(value) => updateSetting('pushNotifications', 'comments', value)}
              description="When someone comments on your posts"
            />
            <ToggleSwitchField
              label="New Followers"
              value={settings.pushNotifications.followers}
              onChange={(value) => updateSetting('pushNotifications', 'followers', value)}
              description="When someone follows you"
            />
            <ToggleSwitchField
              label="Messages"
              value={settings.pushNotifications.messages}
              onChange={(value) => updateSetting('pushNotifications', 'messages', value)}
              description="When you receive a new message"
            />
            {isBusinessAccount && (
              <ToggleSwitchField
                label="Bookings"
                value={settings.pushNotifications.bookings}
                onChange={(value) => updateSetting('pushNotifications', 'bookings', value)}
                description="When you receive a new booking"
              />
            )}
            <ToggleSwitchField
              label="Nearby Events"
              value={settings.pushNotifications.nearbyEvents}
              onChange={(value) => updateSetting('pushNotifications', 'nearbyEvents', value)}
              description="Discover events near you"
            />

            <div className="border-t border-gray-100 my-3" />

            <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2 mt-4">Email Notifications</h3>
            <ToggleSwitchField
              label="Weekly Digest"
              value={settings.emailNotifications.digest}
              onChange={(value) => updateSetting('emailNotifications', 'digest', value)}
              description="Weekly summary of your activity"
            />
            <ToggleSwitchField
              label="Promotional Emails"
              value={settings.emailNotifications.promotional}
              onChange={(value) => updateSetting('emailNotifications', 'promotional', value)}
              description="Special offers and updates"
            />
            <ToggleSwitchField
              label="Important Updates"
              value={settings.emailNotifications.important}
              onChange={(value) => updateSetting('emailNotifications', 'important', value)}
              description="Security and account updates"
            />

            <div className="border-t border-gray-100 my-3" />

            <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2 mt-4">In-App</h3>
            <ToggleSwitchField
              label="Sound"
              value={settings.inAppNotifications.sound}
              onChange={(value) => updateSetting('inAppNotifications', 'sound', value)}
              description="Play sound for notifications"
            />
            <ToggleSwitchField
              label="Badge"
              value={settings.inAppNotifications.badge}
              onChange={(value) => updateSetting('inAppNotifications', 'badge', value)}
              description="Show notification badge"
            />
          </div>
          )}
        </div>

        {/* Privacy Settings */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <button
            onClick={() => toggleSection('privacy')}
            className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Lock size={20} className="text-primary-brand" />
              <h2 className="font-semibold text-neutral-900">Privacy</h2>
            </div>
            <ChevronDown 
              size={20} 
              className={`text-gray-400 transition-transform ${isSectionExpanded('privacy') ? 'rotate-180' : ''}`}
            />
          </button>
          {isSectionExpanded('privacy') && (
          <div className="p-4 space-y-4 border-t border-gray-100">
            <SelectField
              label="Profile Visibility"
              value={settings.privacy.profileVisibility}
              onChange={(value) => updateSetting('privacy', 'profileVisibility', value)}
              options={privacyVisibilityOptions}
            />

            <ToggleSwitchField
              label="Show Activity Status"
              value={settings.privacy.activityStatus}
              onChange={(value) => updateSetting('privacy', 'activityStatus', value)}
              description="Let others see when you're active"
            />

            <ToggleSwitchField
              label="Show Last Seen"
              value={settings.privacy.lastSeen}
              onChange={(value) => updateSetting('privacy', 'lastSeen', value)}
              description="Display your last active time"
            />

            <SelectField
              label="Location Sharing"
              value={settings.privacy.locationSharing}
              onChange={(value) => updateSetting('privacy', 'locationSharing', value)}
              options={locationOptions}
            />

            <ToggleSwitchField
              label="Search Visibility"
              value={settings.privacy.searchVisibility}
              onChange={(value) => updateSetting('privacy', 'searchVisibility', value)}
              description="Allow others to find you by email/phone"
            />
          </div>
          )}
        </div>

        {/* Content Preferences */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <button
            onClick={() => toggleSection('preferences')}
            className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Globe size={20} className="text-primary-brand" />
              <h2 className="font-semibold text-neutral-900">Preferences</h2>
            </div>
            <ChevronDown 
              size={20} 
              className={`text-gray-400 transition-transform ${isSectionExpanded('preferences') ? 'rotate-180' : ''}`}
            />
          </button>
          {isSectionExpanded('preferences') && (
          <div className="p-4 space-y-4 border-t border-gray-100">
            <SelectField
              label="Language"
              value={settings.preferences.language}
              onChange={(value) => updateSetting('preferences', 'language', value)}
              options={languageOptions}
            />

            <SelectField
              label="Measurement Unit"
              value={settings.preferences.measurementUnit}
              onChange={(value) => updateSetting('preferences', 'measurementUnit', value)}
              options={measurementOptions}
            />

            <SelectField
              label="Currency"
              value={settings.preferences.currency}
              onChange={(value) => updateSetting('preferences', 'currency', value)}
              options={currencyOptions}
            />

            <SelectField
              label="Default Map View"
              value={settings.preferences.mapView}
              onChange={(value) => updateSetting('preferences', 'mapView', value)}
              options={mapViewOptions}
            />
          </div>
        </div>

        {/* Data & Storage */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Database size={20} className="text-primary-brand" />
              <h2 className="font-semibold text-neutral-900">Data & Storage</h2>
            </div>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between py-3 px-3">
              <div>
                <p className="text-sm font-medium text-neutral-900">Cache Size</p>
                <p className="text-xs text-gray-500">~12.5 MB</p>
              </div>
              <Button variant="secondary" size="sm" onClick={handleClearCache}>
                Clear Cache
              </Button>
            </div>
            <button
              onClick={handleExportData}
              className="w-full flex items-center justify-between py-3 hover:bg-gray-50 rounded-lg px-3 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Download size={18} className="text-gray-600" />
                <span className="text-sm font-medium text-neutral-900">Download Your Data</span>
              </div>
              <ChevronRight size={18} className="text-gray-400" />
            </button>
          </div>
        </div>

        {/* Business Tools (Only for Business Accounts) */}
        {isBusinessAccount && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Briefcase size={20} className="text-primary-brand" />
                <h2 className="font-semibold text-neutral-900">Business Tools</h2>
              </div>
            </div>
            <div className="p-4">
              <button
                onClick={() => navigate('/analytics')}
                className="w-full flex items-center justify-between py-3 hover:bg-gray-50 rounded-lg px-3 transition-colors"
              >
                <span className="text-sm font-medium text-neutral-900">Analytics Dashboard</span>
                <ChevronRight size={18} className="text-gray-400" />
              </button>
              <button
                onClick={() => navigate('/bookings')}
                className="w-full flex items-center justify-between py-3 hover:bg-gray-50 rounded-lg px-3 transition-colors"
              >
                <span className="text-sm font-medium text-neutral-900">Manage Bookings</span>
                <ChevronRight size={18} className="text-gray-400" />
              </button>
              <button
                onClick={() => alert('Promote posts feature')}
                className="w-full flex items-center justify-between py-3 hover:bg-gray-50 rounded-lg px-3 transition-colors"
              >
                <span className="text-sm font-medium text-neutral-900">Promote Posts</span>
                <ChevronRight size={18} className="text-gray-400" />
              </button>
            </div>
          </div>
        )}

        {/* Support & Legal */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <HelpCircle size={20} className="text-primary-brand" />
              <h2 className="font-semibold text-neutral-900">Support & Legal</h2>
            </div>
          </div>
          <div className="p-4">
            <button
              onClick={() => navigate('/help')}
              className="w-full flex items-center justify-between py-3 hover:bg-gray-50 rounded-lg px-3 transition-colors"
            >
              <span className="text-sm font-medium text-neutral-900">Help Center</span>
              <ChevronRight size={18} className="text-gray-400" />
            </button>
            <button
              onClick={() => alert('Contact support feature')}
              className="w-full flex items-center justify-between py-3 hover:bg-gray-50 rounded-lg px-3 transition-colors"
            >
              <span className="text-sm font-medium text-neutral-900">Contact Support</span>
              <ChevronRight size={18} className="text-gray-400" />
            </button>
            <button
              onClick={() => alert('Report a problem feature')}
              className="w-full flex items-center justify-between py-3 hover:bg-gray-50 rounded-lg px-3 transition-colors"
            >
              <span className="text-sm font-medium text-neutral-900">Report a Problem</span>
              <ChevronRight size={18} className="text-gray-400" />
            </button>
            <button
              onClick={() => navigate('/privacy')}
              className="w-full flex items-center justify-between py-3 hover:bg-gray-50 rounded-lg px-3 transition-colors"
            >
              <span className="text-sm font-medium text-neutral-900">Privacy Policy</span>
              <ChevronRight size={18} className="text-gray-400" />
            </button>
            <button
              onClick={() => navigate('/terms')}
              className="w-full flex items-center justify-between py-3 hover:bg-gray-50 rounded-lg px-3 transition-colors"
            >
              <span className="text-sm font-medium text-neutral-900">Terms of Service</span>
              <ChevronRight size={18} className="text-gray-400" />
            </button>
            <button
              onClick={() => alert('About Mapleon')}
              className="w-full flex items-center justify-between py-3 hover:bg-gray-50 rounded-lg px-3 transition-colors"
            >
              <span className="text-sm font-medium text-neutral-900">About Mapleon</span>
              <ChevronRight size={18} className="text-gray-400" />
            </button>
          </div>
        </div>

        {/* Account Management */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Shield size={20} className="text-red-600" />
              <h2 className="font-semibold text-neutral-900">Account Management</h2>
            </div>
          </div>
          <div className="p-4 space-y-2">
            <Button
              variant="secondary"
              size="md"
              fullWidth
              onClick={handleLogout}
            >
              <LogOut size={18} />
              <span>Log Out</span>
            </Button>

            <button
              onClick={handleDeactivateAccount}
              className="w-full py-3 text-orange-600 hover:bg-orange-50 rounded-xl font-medium transition-colors text-sm"
            >
              Deactivate Account
            </button>

            <button
              onClick={handleDeleteAccount}
              className="w-full py-3 text-red-600 hover:bg-red-50 rounded-xl font-medium transition-colors text-sm"
            >
              Delete Account Permanently
            </button>
          </div>
        </div>

        {/* App Version */}
        <div className="text-center text-sm text-gray-500 py-4">
          Mapleon v1.0.0
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
