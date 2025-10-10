/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html","./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0B1220",
        night: "#0F172A",
        sky: "#60A5FA",
        ocean: "#2563EB",
        deep: "#1E3A8A",
        pink: "#F472B6",
        rose: "#FB7185",
        magenta: "#E879F9",
        purple: "#A855F7"
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"]
      }
    }
  },
  plugins: []
}
