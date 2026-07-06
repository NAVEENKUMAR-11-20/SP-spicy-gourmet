/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-maroon': {
          900: '#E6F2EC', // Soft mint / pale sage green background
          800: '#FAF8F5', // Very light cream section background
        },
        'brand-orange': {
          DEFAULT: '#2D4A36', // Deep olive green (Primary)
          light: '#5A8F6C', // Fresh leaf green (Secondary)
        },
        'brand-gold': '#417251', // Accent / Natural herb green
        'brand-offwhite': '#1D3525', // Dark forest green text color
        'card-dark': 'rgba(250, 248, 245, 0.95)', // Cream card background
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-brand': 'linear-gradient(to bottom right, #E6F2EC, #FAF8F5)',
        'gradient-accent': 'linear-gradient(to right, #2D4A36, #5A8F6C)',
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
