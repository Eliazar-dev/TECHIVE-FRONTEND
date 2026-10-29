/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['"Inter Variable"', 'system-ui', 'sans-serif'] },
      colors: { ink: '#0a0a0b', brand: { cyan: '#06c3ff', violet: '#a855f7', blue: '#2563eb' } },
      backgroundImage: { 'brand-grad': 'linear-gradient(90deg,#06c3ff,#7c5cff 60%,#a855f7)' },
      keyframes: { fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } }, fadeUp: { '0%': { opacity: 0, transform: 'translateY(16px)' }, '100%': { opacity: 1, transform: 'none' } } },
      animation: { 'fade-up': 'fadeUp .7s ease both', 'fade-in': 'fadeIn 1s ease both' },
    },
  },
  plugins: [],
}
