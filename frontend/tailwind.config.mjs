/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        "primary-hover": "var(--primary-hover)",
        secondary: "var(--secondary)",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      gridTemplateColumns: {
        auto: "repeat(auto-fit, minmax(200px, 1fr))",
      },
    },
  },
  plugins: [],
};
