/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cosmic: {
          black: "#05060A",
          card: "#0b1020",
          purple: "#6D28D9",
          accent: "#7C3AED",
          gold: "#D4AF37",
          glow: "rgba(212, 175, 55, 0.2)",
        },
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      fontSize: {
        "display-lg": ["4rem", { lineHeight: "1.1" }],
        "display-md": ["3rem", { lineHeight: "1.2" }],
        "display-sm": ["2.5rem", { lineHeight: "1.2" }],
      },
      animation: {
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "float": "float 3s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 10px rgba(124, 58, 237, 0.5)" },
          "50%": { boxShadow: "0 0 30px rgba(124, 58, 237, 0.9)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "glow": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
      },
      backgroundImage: {
        "gradient-cosmic":
          "radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.15), transparent 50%)",
        "gradient-energy": "linear-gradient(135deg, #7C3AED, #D4AF37)",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
