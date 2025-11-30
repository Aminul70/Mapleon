import React, { createContext, useContext, useState, ReactNode } from 'react';

interface NavBarContextType {
  isNavBarVisible: boolean;
  hideNavBar: () => void;
  showNavBar: () => void;
}

const NavBarContext = createContext<NavBarContextType | undefined>(undefined);

export function NavBarProvider({ children }: { children: ReactNode }) {
  const [isNavBarVisible, setIsNavBarVisible] = useState(true);

  const hideNavBar = () => setIsNavBarVisible(false);
  const showNavBar = () => setIsNavBarVisible(true);

  return (
    <NavBarContext.Provider value={{ isNavBarVisible, hideNavBar, showNavBar }}>
      {children}
    </NavBarContext.Provider>
  );
}

export function useNavBar() {
  const context = useContext(NavBarContext);
  if (context === undefined) {
    throw new Error('useNavBar must be used within a NavBarProvider');
  }
  return context;
}
