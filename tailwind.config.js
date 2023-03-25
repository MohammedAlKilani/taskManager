/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes:{
       'from-botton':{
          '0%': { transform: 'translatey(50px)' }, '100%': { transform: 'translatey(0px)' },
        },
        
      },
      animation:{
          'from-botton':'from-botton 3s ease-in-out ',
        }
    },
  },
  plugins: [],
}