// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

 const withMT = require("@material-tailwind/react/utils/withMT");
 const colors = require('tailwindcss/colors')

module.exports = withMT(
  {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  darkMode: "class",
});


