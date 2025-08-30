/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        serifDisplay: ["var(--font-dm-serif-display)", "serif"], // for headings
        sans: ["ui-sans-serif", "system-ui", "sans-serif"], // body text
      },
    },
  },
  plugins: [],
};
