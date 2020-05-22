/* eslint @typescript-eslint/no-var-requires: off */
const { theme } = require('tailwindcss/defaultConfig');

module.exports = {
  theme: {
    fontFamily: {
      ...theme.fontFamily,
      sans: ['Jost', ...theme.fontFamily.sans],
      body: theme.fontFamily.sans,
    },
    extend: {},
  },
  variants: {},
  plugins: [],
};
