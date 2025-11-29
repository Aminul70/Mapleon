export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        // New Business Discovery Platform Colors
        primary: {
          brand: '#FF6B35',
          dark: '#E85A2A',
          light: '#FF8555',
          subtle: '#FFF4F0',
        },
        secondary: {
          teal: '#2DD4BF',
          purple: '#A855F7',
          blue: '#3B82F6',
        },
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
        semantic: {
          success: '#10B981',
          warning: '#F59E0B',
          error: '#EF4444',
          info: '#3B82F6',
        },
        business: {
          badge: '#F59E0B',
          highlight: '#FEF3C7',
        },
        // Keep old Mapleon colors for backward compatibility during transition
        mapleon: {
          coral: '#FF7A57',
          pink: '#FF4D7A',
          magenta: '#F53DFF',
          purple: '#A54DFF',
          teal: '#1DA9A1',
          aqua: '#146C78',
          slate: '#0D1A20',
          gray: '#E7ECEF',
          'teal-tint': '#CCE7E5',
          success: '#3BE5A9',
          warning: '#FFB84D',
          error: '#FF5E5E',
        }
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(135deg, #FF6B35 0%, #E85A2A 100%)',
        'business-gradient': 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
        'mapleon-gradient': 'linear-gradient(135deg, #FF7A57 0%, #FF4D7A 25%, #F53DFF 50%, #A54DFF 75%, #1DA9A1 100%)',
        'mapleon-gradient-soft': 'linear-gradient(135deg, rgba(255,122,87,0.3) 0%, rgba(255,77,122,0.3) 50%, rgba(165,77,255,0.3) 100%)',
        'glass': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(255, 77, 122, 0.3)',
        'glow-strong': '0 0 30px rgba(255, 77, 122, 0.5)',
        'glow-primary': '0 0 20px rgba(255, 107, 53, 0.3)',
        'neumorphic': '8px 8px 16px rgba(0,0,0,0.1), -8px -8px 16px rgba(255,255,255,0.7)',
        'neumorphic-inset': 'inset 4px 4px 8px rgba(0,0,0,0.1), inset -4px -4px 8px rgba(255,255,255,0.7)',
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      },
      borderRadius: {
        sm: '6px',
        md: '12px',
        lg: '16px',
        xl: '24px',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'slide-up': 'slide-up 0.3s ease-out',
        'heart-burst': 'heart-burst 0.6s ease-out',
        'scale-in': 'scale-in 0.25s ease-out',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.05)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'heart-burst': {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '50%': { transform: 'scale(1.2)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      borderWidth: {
        '12': '12px',
      },
      transitionDuration: {
        '400': '400ms',
      },
      transitionTimingFunction: {
        'bounce': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
}
