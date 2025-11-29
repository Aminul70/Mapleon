export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
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
        'mapleon-gradient': 'linear-gradient(135deg, #FF7A57 0%, #FF4D7A 25%, #F53DFF 50%, #A54DFF 75%, #1DA9A1 100%)',
        'mapleon-gradient-soft': 'linear-gradient(135deg, rgba(255,122,87,0.3) 0%, rgba(255,77,122,0.3) 50%, rgba(165,77,255,0.3) 100%)',
        'glass': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(255, 77, 122, 0.3)',
        'glow-strong': '0 0 30px rgba(255, 77, 122, 0.5)',
        'neumorphic': '8px 8px 16px rgba(0,0,0,0.1), -8px -8px 16px rgba(255,255,255,0.7)',
        'neumorphic-inset': 'inset 4px 4px 8px rgba(0,0,0,0.1), inset -4px -4px 8px rgba(255,255,255,0.7)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'slide-up': 'slide-up 0.3s ease-out',
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
      },
      backdropBlur: {
        xs: '2px',
      },
      borderWidth: {
        '12': '12px',
      }
    },
  },
  plugins: [],
}