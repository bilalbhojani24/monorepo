module.exports = {
  purge: ['./modules/**/*.{js,jsx,ts,tsx}'],
  darkMode: false,
  theme: {
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: [require('@tailwindcss/forms')]
};
