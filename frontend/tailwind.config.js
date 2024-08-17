/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  theme: {
    extend: {
      colors: {
        "custom-green": "#1D8344",
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
};
