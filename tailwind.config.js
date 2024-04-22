/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xs: '350px',
      maxXs: { max: '350px' },
      sm: { min: '500px' },
      maxSm: { max: '499px' },
      md: { min: '668px' },
      maxMd: { max: '667px' },
      lg: { min: '1100px' },
      maxLg: { max: '1099px' },
      xl: { min: '1440px' },
      maxXl: { max: '1439px' }
    },
    extend: {
      colors: {
        'vanilla-mist': '#FFFFF4',
        'aqua-shadow': '#226568',
        'pearl-mist': '#F3EFD6',
        primary: '#226568',
        secondary: '#FFFFF4',
        danger: '#AD181B',
        white: '#ffffff',
        light: '#f4f5f8',
        dark: '#222428',
        medium: '#666666',
        tertiary: '#3A3653',
        ShadowedPlum: '#3A36538A'
      }
    }
  },
  plugins: []
};
