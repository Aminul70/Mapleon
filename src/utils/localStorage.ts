// localStorage utility functions for data persistence

const STORAGE_KEYS = {
  BUSINESS_PROFILE: 'mapleon_business_profile',
  USER_PROFILE: 'mapleon_user_profile',
  SETTINGS: 'mapleon_settings',
};

// Business Profile
export const saveBusinessProfile = (data: any) => {
  try {
    localStorage.setItem(STORAGE_KEYS.BUSINESS_PROFILE, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error saving business profile:', error);
    return false;
  }
};

export const loadBusinessProfile = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.BUSINESS_PROFILE);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading business profile:', error);
    return null;
  }
};

// User Profile
export const saveUserProfile = (data: any) => {
  try {
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error saving user profile:', error);
    return false;
  }
};

export const loadUserProfile = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading user profile:', error);
    return null;
  }
};

// Settings
export const saveSettings = (data: any) => {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error saving settings:', error);
    return false;
  }
};

export const loadSettings = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading settings:', error);
    return null;
  }
};

// Clear all data
export const clearAllData = () => {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    return true;
  } catch (error) {
    console.error('Error clearing data:', error);
    return false;
  }
};