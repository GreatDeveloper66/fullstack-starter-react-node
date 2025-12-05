/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin';

module.exports = {
  darkMode: "class", // add this line
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(function({ addVariant, e }) {
      addVariant('valid', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`valid${separator}${className}`)}:valid`;
        });
      });
      addVariant('invalid', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`invalid${separator}${className}`)}:invalid`;
        });
      });
    }),
  ],
}
