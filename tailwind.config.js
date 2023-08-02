/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        "light-green": "#14c7a3",
        green: "#009F7F",
        "filter-green": "#AEDABE",
        footer: {
          bg: "#009F7F66",
          Text: "#00000059",
        },
        "dark-blue": "#121D3C",
        "dark-green": "#047d65",
        "hero-heading": "#121D3C",
        "banner-text": "#323C4D",
        pagination: "#DAE3EA",
        "secondary-button": "#2E7D32",
        "blog-title": "#323C4D",
      },
      borderWidth: {
        tiny: "0.5px",
      },
    },
  },
};
