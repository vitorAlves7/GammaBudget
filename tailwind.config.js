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
      grayBg: 'F5F5F5',
      launchesScreenRed: '#F05252',
      launchesScreenGreen: '#007E71',
      alertGreen: '#d6f3f0',
      customGray: '#f1f2f3'
    },
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')({
      charts: true,
    })
  ],
}