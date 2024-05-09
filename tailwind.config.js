/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xs: '350px',
      maxXs: { max: '350px' },
      min380px: '380px',
      max380px: { max: '380px' },
      sm: { min: '500px' },
      maxSm: { max: '499px' },
      md: { min: '668px' },
      maxMd: { max: '667px' },
      lg: { min: '1100px' },
      maxLg: { max: '1099px' },
      min900px: { min: '900px' },
      max900px: { max: '900px' },
      xl: { min: '1440px' },
      maxXl: { max: '1439px' }
    },
    extend: {
      colors: {
        'vanilla-mist': '#FFFFF4',
        'aqua-shadow': '#226568',
        'pearl-mist': '#F3EFD6',

        // Primary Colors
        primary: '#08c',
        secondary: '#ff7272',
        tertiary: '#3A3653',
        danger: '#AD181B',

        // warning
        warning: '#ffc409',
        'warning-shade': '#e0ac08',
        'warning-tint': '#ffca22',

        // success
        success: '#2dd36f',
        'success-shade': '#28ba62',
        'success-tint': '#42d77d',

        // Neutral Colors
        white: '#ffffff',
        gray: '#f4f4f4',
        'gray-100': '#e7e7e7',
        'gray-200': '#dae2e6',
        light: '#f4f5f8',
        lightDark: '#2f3946',
        dark: '#222529',
        medium: '#666666',
        'medium-100': '#a8a8a8',

        // Text Colors
        body: '#777',

        // Other Colors
        ShadowedPlum: '#3A36538A',
        'light-blue-100': '#bde1f5',

        // Social Media Colors
        facebook: '#3b5a9a',
        twitter: '#1aa9e1',
        instagram: '#7c4a3a',
        linkedin: '#0073b2',
        googlePlus: '#dd4b39'
      }
    }
  },
  plugins: []
};
