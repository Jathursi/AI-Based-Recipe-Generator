/** @type {import('tailwindcss').Config} */
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
  theme: {
    extend: {
      screens: {
        xs: '400px',  // Extra small screens
        sm: '640px',  // Small devices
        md: '768px',  // Medium devices (tablets)
        lg: '1024px', // Large devices (laptops)
        xl: '1280px', // Extra large devices
        '2xl': '1536px', // Larger desktops
      },
      colors: {    // Pure white
      
      },
    },
  },
}