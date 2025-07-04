/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        charcoalGreen: '#2F4F4F',
        accentOrange: '#F28C38',
        lightGray: '#D3D3D3',
        white: '#FFFFFF',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      boxShadow: {
        ios: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
        glow: '0 0 15px rgba(242, 140, 56, 0.6)',
      },
      backgroundOpacity: {
        glass: '0.8',
      },
      animation: {
        'cosmic-spark': 'spark 10s infinite linear',
      },
      keyframes: {
        spark: {
          '0%': { transform: 'translateY(100vh) rotate(0deg)' },
          '100%': { transform: 'translateY(-100vh) rotate(360deg)' },
        },
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
      maxWidth: {
        'md': '28rem', // 448px
        '2xl': '42rem', // 672px
      },
    },
  },
  plugins: [],
};
