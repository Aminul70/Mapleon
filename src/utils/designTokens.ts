// Design System Tokens for Business Discovery Platform
// Based on DESIGN_UPGRADE_PLAN.md specifications

export const colors = {
  // Primary Colors
  primary: {
    brand: '#FF6B35',
    dark: '#E85A2A',
    light: '#FF8555',
    subtle: '#FFF4F0',
  },
  
  // Secondary Colors
  secondary: {
    teal: '#2DD4BF',
    purple: '#A855F7',
    blue: '#3B82F6',
  },
  
  // Neutral Colors
  neutral: {
    900: '#0F172A',
    800: '#1E293B',
    700: '#334155',
    600: '#475569',
    500: '#64748B',
    400: '#94A3B8',
    300: '#CBD5E1',
    200: '#E2E8F0',
    100: '#F1F5F9',
    50: '#F8FAFC',
  },
  
  // Semantic Colors
  semantic: {
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  },
  
  // Business Account Colors
  business: {
    badge: '#F59E0B',
    highlight: '#FEF3C7',
  },
  
  white: '#FFFFFF',
};

export const typography = {
  fontFamily: {
    primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    display: "'Plus Jakarta Sans', 'Inter', sans-serif",
  },
  
  fontSize: {
    // Display
    'display-lg': ['48px', { lineHeight: '1.1', fontWeight: '700' }],
    'display-md': ['36px', { lineHeight: '1.2', fontWeight: '700' }],
    'display-sm': ['30px', { lineHeight: '1.2', fontWeight: '700' }],
    
    // Headings
    h1: ['24px', { lineHeight: '1.3', fontWeight: '700' }],
    h2: ['20px', { lineHeight: '1.4', fontWeight: '600' }],
    h3: ['18px', { lineHeight: '1.4', fontWeight: '600' }],
    h4: ['16px', { lineHeight: '1.5', fontWeight: '600' }],
    
    // Body
    'body-lg': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
    'body-md': ['15px', { lineHeight: '1.6', fontWeight: '400' }],
    'body-sm': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
    'body-xs': ['13px', { lineHeight: '1.5', fontWeight: '400' }],
    
    // Labels
    'label-lg': ['14px', { lineHeight: '1.4', fontWeight: '500' }],
    'label-md': ['13px', { lineHeight: '1.4', fontWeight: '500' }],
    'label-sm': ['12px', { lineHeight: '1.4', fontWeight: '500' }],
    'label-xs': ['11px', { lineHeight: '1.3', fontWeight: '500' }],
  },
};

export const spacing = {
  0: '0px',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
  20: '80px',
  24: '96px',
};

export const borderRadius = {
  sm: '6px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  full: '9999px',
};

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
};

export const transitions = {
  fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
  base: '250ms cubic-bezier(0.4, 0, 0.2, 1)',
  slow: '400ms cubic-bezier(0.4, 0, 0.2, 1)',
  bounce: '500ms cubic-bezier(0.34, 1.56, 0.64, 1)',
};

// Account type constants
export const accountTypes = {
  BUSINESS: 'business',
  USER: 'user',
} as const;

export type AccountType = typeof accountTypes[keyof typeof accountTypes];
