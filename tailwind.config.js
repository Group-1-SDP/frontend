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
        blackAccent: '#110b11',
        yellowAccent: '#ffc233',
        redAccent: '#bf211e',
        blueAccent: '#21a2e8',
        greyAccent: '#696969',
        colorE8E8E8: '#E8E8E8',
        color188764: '#188764',
        color046244:'#046244',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      height: {
        '640px': '40rem',
      },
      width:{
        '520px': '32.5rem',
        '640px': '40rem',
      }
    },
  },
  plugins: [],
}