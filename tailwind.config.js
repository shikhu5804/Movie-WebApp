/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'], // Apply Poppins font globally
      },
      fontSize: {
        base: '0.175rem', // Adjust the default font size
      },
    },
  },
  plugins: [],
}

