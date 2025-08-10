/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'xs': '360px',
      // => @media (min-width: 360px) { ... }
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        'brand-beige-light': '#F5F1EC',
        'brand-beige': '#F3EEE7',
        'brand-beige-dark': '#EFEAE5',
        'brand-brown-dark': '#2D221B',
        'brand-brown': '#2A2522',
        'brand-gray-light': '#E7E0D8',
        'brand-gray': '#8A837E',
        'brand-gray-dark': '#5E5853',
        'brand-border': '#D9D2CA',
        'brand-placeholder': '#A9A29C',
      },
      fontFamily: {
        primary: ['Avenir Next', 'Helvetica Neue', 'Arial', 'sans-serif'],
        secondary: ['Open Sans', 'sans-serif'],
      },
      borderRadius: {
        'card': '20px',
        'pill': '9999px',
        'input': '14px',
        'btn': '14px',
      },
      boxShadow: {
        'card': '0 6px 18px rgba(0,0,0,0.08)',
        'input': 'inset 0 1px 0 rgba(0,0,0,0.02), 0 2px 8px rgba(0,0,0,0.06)',
        'chip-active': '0 2px 6px rgba(0,0,0,0.10)',
      }
    },
  },
  plugins: [],
};

export default config;
