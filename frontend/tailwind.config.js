/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#e0e7ff",
          600: "#4f46e5",
        },
      },
    },
  },
  plugins: [],
};
