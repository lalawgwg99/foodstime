/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Noto Serif TC"', '"Playfair Display"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        ink: '#1A1818',
        paper: '#FFFBF5',
        gold: '#C5A059',
        accent: '#8B4513',
        terra: '#A0522D',
        cream: '#FDF9F3',
        muted: '#9E9E9E',
      },
      boxShadow: {
        card: '0 4px 24px -4px rgba(26,24,24,0.07)',
        float: '0 20px 60px -12px rgba(26,24,24,0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp: { from: { opacity: '0', transform: 'translateY(20px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
};
