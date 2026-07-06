/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-maroon': {
          900: '#120404', // Black-ish maroon
          800: '#2B0A0A', // Deep maroon
        },
        'brand-orange': {
          DEFAULT: '#FF4E1F',
          light: '#FFB020',
        },
        'brand-gold': '#D8A63B',
        'brand-offwhite': '#F5EDE6',
        'card-dark': 'rgba(60, 15, 15, 0.6)',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-brand': 'linear-gradient(to bottom right, #2B0A0A, #120404)',
        'gradient-accent': 'linear-gradient(to right, #FF4E1F, #FFB020)',
      },
      animation: {
        'pulse-slow': 'pulse-slow 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin-slow 20s linear infinite',
        'sway': 'sway 8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
