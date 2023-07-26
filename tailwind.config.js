/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // theme: {
  //   extend: {
  //     backgroundImage: {
  //       "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
  //       "gradient-conic":
  //         "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
  //     },
  //   },
  //   colors: {
  //     form: "#e3e8ec",
  //     primary: {
  //       default: "#223389",
  //       hover: "#1e2e7b",
  //       active: "#182561",
  //     },
  //     white: "white",
  //   },
  // },
  darkMode: false,
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#1A286A",
          "secondary": "#6c757d",
          "accent": "#eeaf3a",
          "neutral": "#291334",
          "base-100": "#faf7f5",
          "info": "#17a2b8",
          "success": "#28a745",
          "warning": "#ffc107",
          "error": "#dc3545",
        },
      },
    ],
  },
};
