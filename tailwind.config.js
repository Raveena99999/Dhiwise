/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",],
  darkMode:'selector',
  theme: {
    extend: {
      colors: {
        rovee: {
          DEFAULT: '#007bff', 
          dark: '#0056b3',     
          light: '#7fbfff',   
        },
        customGreen: '#28a745', 
    },

    fontSize:{
      rovee1:"50px"
    },
    components: {
      // Define custom button component
      Button: {
        base: 'border border-gray-300 rounded-md px-4 py-2 font-semibold text-gray-700 bg-white hover:bg-gray-100',
        primary: 'bg-customBlue text-white hover:bg-customBlue-dark',
        secondary: 'bg-customGreen text-white hover:bg-customGreen-dark',
      },
    },

    container: {
      center: true,
      padding:"2rem"
    },


  }
  },
  plugins: [ require('@tailwindcss/forms'),],

}
