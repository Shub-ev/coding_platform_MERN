/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: '360px',
        sm: '480px',
        md: '600px',
        lg: '900px'
      }
    },
  },
  plugins: [],
}