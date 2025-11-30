import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../utils/mockData';

interface AuthContextType {
  currentUser: User | null;
  allAccounts: User[];
  login: (username: string, password: string) => boolean;
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

  const login = (username: string, password: string): boolean => {
    // Demo credentials
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
    };

    // Check credentials (password is just username + '123')
    if (demoAccounts[username] && password === username.split('_')[1] + '123') {
      const user = demoAccounts[username];
      setCurrentUser(user);
      
      // Add to accounts list if not already there
      if (!allAccounts.find(acc => acc.id === user.id)) {
        setAllAccounts([...allAccounts, user]);
      }
      
      return true;
    }
    
    return false;
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
