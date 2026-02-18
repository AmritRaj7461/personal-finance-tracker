export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // Critical for the Dark Mode guideline [cite: 32]
  theme: {
    extend: {
      colors: {
        glass: "rgba(255, 255, 255, 0.03)",
        borderGlass: "rgba(255, 255, 255, 0.1)",
        neonBlue: "#00d2ff",
        neonPurple: "#9d50bb",
      },
    },
  },
  plugins: [],
};
