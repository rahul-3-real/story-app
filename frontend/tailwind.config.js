/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      sans: ["Poppins"],
      serif: ["Playfair Display"],
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "2rem",
      },
    },
  },
  plugins: [],
};
