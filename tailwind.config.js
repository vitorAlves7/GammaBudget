/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // add this line
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    colors: {
      primaryGreen: '#00A897',
      darkGreen: '#007E71',
      grayText: '#626161',
      grayBg: 'F5F5F5'
      
      // Configure your color palette here
    },
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')({
      charts: true,
    })
  ],
}