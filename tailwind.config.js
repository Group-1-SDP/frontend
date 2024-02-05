/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Work Sans', 'sans-serif'],
      },
      colors: {
        greenAccent: '#046244',
        greenHighlight: '#368169',
        blackAccent: '#110b11',
        yellowAccent: '#ffc233',
        redAccent: '#bf211e',
        blueAccent: '#21a2e8',
        greyAccent: '#696969',
        
      }
    },
  },
  plugins: [],
}