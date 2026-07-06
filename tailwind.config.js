/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-maroon': {
          900: '#E3EED4', // Light mint/cream background (fifth capsule)
          800: '#FAF8F5', // Off-white cream card background
        },
        'brand-orange': {
          DEFAULT: '#0F2A1D', // Very dark forest green (first capsule)
          light: '#375534', // Dark moss green (second capsule)
        },
        'brand-gold': '#6B9071', // Sage green accent (third capsule)
        'brand-offwhite': '#0F2A1D', // Dark forest green text for high readability
        'card-dark': 'rgba(250, 248, 245, 0.95)', // Cream background
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-brand': 'linear-gradient(to bottom right, #E3EED4, #FAF8F5)',
        'gradient-accent': 'linear-gradient(to right, #0F2A1D, #375534)',
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
