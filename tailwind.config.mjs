/** @type {import('tailwindcss').Config} */
const config = {
  theme: {
    extend: {
      colors: {
        ink: "#0a0d0b",
        panel: "#111713",
        accent: "#c5fb72",
        muted: "#9ca89f",
      },
      fontFamily: {
        sans: ["Arial", "Helvetica Neue", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
