import { withUt } from "uploadthing/tw"

const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = withUt ({
  darkMode: "class",
   content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background) / var(--tw-bg-opacity))",
        foreground: "hsl(var(--foreground) / var(--tw-text-opacity))",
        border: "hsl(var(--border) / var(--tw-border-opacity))",
        ring: "hsl(var(--ring) / var(--tw-ring-opacity))",
        'muted-foreground': "hsl(var(--muted-foreground) / var(--tw-text-opacity))",
      },
      borderColor: {
        DEFAULT: "hsl(var(--border) / var(--tw-border-opacity))",
      },
      outlineColor: {
        DEFAULT: "hsl(var(--ring) / var(--tw-ring-opacity))",
      },
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
});
