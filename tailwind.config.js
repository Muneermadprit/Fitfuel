/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable dark mode with the 'class' strategy
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'], // Specify content sources
  theme: {
    screens: {
      xs: '320px',
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
      xxl: '1536px', // Extra large screen
    },
    extend: {
      colors: {
        primary: {
          light: '#93c5fd',
          DEFAULT: '#3b82f6',
          dark: '#1e40af',
        },
        secondary: {
          light: '#fef3c7',
          DEFAULT: '#fbbf24',
          dark: '#b45309',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
        nunito: ['Nunito Sans', 'sans-serif'],
        parata:[ "Prata","serif"],
        Dosis:["Dosis", "serif"],
      },
      spacing: {
        128: '32rem',
        144: '36rem',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideInFromTop: {
          '0%': {
            transform: 'translateY(-100%)', // Start off-screen at the top
          },
          '100%': {
            transform: 'translateY(0)', // End at the original position
          },
        },
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
        fadeIn: 'fadeIn 0.5s ease-in-out',
        slideInFromTop: 'slideInFromTop 2s ease-in-out',
      },
    
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // Plugin for styling forms
    require('@tailwindcss/typography'), // Plugin for typography utilities
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none', /* Internet Explorer 10+ */
          'scrollbar-width': 'none', /* Firefox */
        },
        '.scrollbar-hide::-webkit-scrollbar': {
          'display': 'none', /* Webkit browsers (Chrome, Safari) */
        },
      })
    },
  ],
};

