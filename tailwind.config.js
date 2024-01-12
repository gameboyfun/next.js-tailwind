const { nextui } = require("@nextui-org/react");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false,
  plugins: [require("@tailwindcss/typography"), require("daisyui"), nextui()],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#72BE66",
          secondary: "#6c757d",
          accent: "#eeaf3a",
          neutral: "#291334",
          "base-100": "#faf7f5",
          info: "#17a2b8",
          success: "#28a745",
          warning: "#ffc107",
          error: "#dc3545",
        },
      },
    ],
  },
};
