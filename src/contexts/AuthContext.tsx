import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../utils/mockData';

interface RegisterData {
  name: string;
  email: string;
  password: string;
  accountType: 'personal' | 'business';
  category?: string;
  subcategory?: string;
  customCategory?: string;
  address?: string;
}

interface AuthContextType {
  currentUser: User | null;
  allAccounts: User[];
  login: (email: string, password: string) => boolean;
  register: (data: RegisterData) => boolean;
  logout: () => void;
  switchAccount: (userId: string) => void;
  addAccount: (user: User) => void;
  isBusinessAccount: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [allAccounts, setAllAccounts] = useState<User[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    const savedAccounts = localStorage.getItem('allAccounts');
    
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    if (savedAccounts) {
      setAllAccounts(JSON.parse(savedAccounts));
    }
  }, []);

  // Save to localStorage when changed
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  useEffect(() => {
    if (allAccounts.length > 0) {
      localStorage.setItem('allAccounts', JSON.stringify(allAccounts));
    }
  }, [allAccounts]);

  const login = (email: string, password: string): boolean => {
    // Demo credentials - allow login with email or username
    const demoAccounts: { [key: string]: User } = {
      'user_demo': {
        id: 'user-1',
        username: 'coffee_explorer',
        name: 'Sarah Johnson',
        bio: 'Exploring the best coffee spots in NYC ☕ | Food enthusiast 🍝',
        profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
        accountType: 'user',
        stats: {
          saved: 234,
          followers: 892,
          following: 156,
        },
        interests: ['Coffee', 'Restaurants', 'Cafes'],
        memberSince: '2024',
      },
      'business_demo': {
        id: 'business-1',
        username: 'brewhaven_cafe',
        name: 'BrewHaven Cafe',
        bio: 'Your daily dose of warmth & wifi ☕ | Specialty coffee & fresh pastries',
        profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
        coverImage: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200',
        accountType: 'business',
        verified: true,
        stats: {
          posts: 89,
          saved: 1200,
          followers: 5432,
          following: 234,
        },
        interests: ['Coffee', 'Cafe'],
        memberSince: '2023',
      },
      'sarah@example.com': {
        id: 'user-1',
        username: 'coffee_explorer',
        name: 'Sarah Johnson',
        bio: 'Exploring the best coffee spots in NYC ☕ | Food enthusiast 🍝',
        profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
        accountType: 'user',
        stats: {
          saved: 234,
          followers: 892,
          following: 156,
        },
        interests: ['Coffee', 'Restaurants', 'Cafes'],
        memberSince: '2024',
      },
      'brewhaven@example.com': {
        id: 'business-1',
        username: 'brewhaven_cafe',
        name: 'BrewHaven Cafe',
        bio: 'Your daily dose of warmth & wifi ☕ | Specialty coffee & fresh pastries',
        profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
        coverImage: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200',
        accountType: 'business',
        verified: true,
        stats: {
          posts: 89,
          saved: 1200,
          followers: 5432,
          following: 234,
        },
        interests: ['Coffee', 'Cafe'],
        memberSince: '2023',
      },
    };

    // Check credentials
    if (demoAccounts[email] && (password === 'demo123' || password === email.split('_')[1] + '123')) {
      const user = demoAccounts[email];
      setCurrentUser(user);
      
      // Add to accounts list if not already there
      if (!allAccounts.find(acc => acc.id === user.id)) {
        setAllAccounts([...allAccounts, user]);
      }
      
      return true;
    }
    
    return false;
  };

  const register = (data: RegisterData): boolean => {
    try {
      // Generate a unique ID
      const userId = `${data.accountType}-${Date.now()}`;
      const username = data.email.split('@')[0];
      
      // Create new user
      const newUser: User = {
        id: userId,
        username: username,
        name: data.name,
        bio: data.accountType === 'business' 
          ? `${data.name} | ${data.category || data.customCategory || 'Business'}`
          : `New member on Mapleon`,
        profileImage: data.accountType === 'business'
          ? 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200'
          : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200',
        accountType: data.accountType === 'business' ? 'business' : 'user',
        verified: false,
        stats: {
          posts: 0,
          saved: 0,
          followers: 0,
          following: 0,
        },
        interests: data.category ? [data.category] : [],
        memberSince: new Date().getFullYear().toString(),
      };

      // Add cover image for business accounts
      if (data.accountType === 'business') {
        newUser.coverImage = 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200';
      }

      setCurrentUser(newUser);
      
      // Add to accounts list
      if (!allAccounts.find(acc => acc.id === newUser.id)) {
        setAllAccounts([...allAccounts, newUser]);
      }
      
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const switchAccount = (userId: string) => {
    const account = allAccounts.find(acc => acc.id === userId);
    if (account) {
      setCurrentUser(account);
    }
  };

  const addAccount = (user: User) => {
    if (!allAccounts.find(acc => acc.id === user.id)) {
      setAllAccounts([...allAccounts, user]);
    }
    setCurrentUser(user);
  };

  const isBusinessAccount = currentUser?.accountType === 'business';

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        allAccounts,
        login,
        register,
        logout,
        switchAccount,
        addAccount,
        isBusinessAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
