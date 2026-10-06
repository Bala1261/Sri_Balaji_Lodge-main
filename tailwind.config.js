/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lodge: {
          bg: "#FFFFFF",
          soft: "#F7FAFC",
          primary: "#123A63",
          secondary: "#1E5B8F",
          surface: "#EAF3F9",
          dark: "#17212B",
          muted: "#64717D",
          border: "#DFE7EE",
          warm: "#E6DDCF",
          brandDark: "#0f1115",
          glassDark: "rgba(18, 20, 26, 0.45)",
          glassLight: "rgba(255, 255, 255, 0.85)",
        }
      },
      fontFamily: {
        rendol: ['Rendol', 'Plus Jakarta Sans', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        sans: ['Rendol', 'Plus Jakarta Sans', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 15px 35px rgba(0, 0, 0, 0.08)',
        'glass': '0 15px 35px rgba(0, 0, 0, 0.30)',
        'card': '0 15px 35px rgba(18, 35, 60, 0.06)',
        'card-hover': '0 20px 45px rgba(18, 35, 60, 0.12)',
        'luxury-ambient': '0 15px 35px rgba(0, 0, 0, 0.30)',
        'luxury-cta': '0 8px 20px rgba(0, 0, 0, 0.25)',
        'luxury-cta-hover': '0 12px 28px rgba(0, 0, 0, 0.35)',
        'luxury-light': '0 15px 35px rgba(18, 35, 60, 0.06)',
      },
      borderRadius: {
        'none': '0px',
        'sm': '0px',
        'md': '0px',
        'lg': '0px',
        'xl': '0px',
        '2xl': '0px',
        '3xl': '0px',
        'full': '0px',
        'glass': '0px',
      }
    },
  },
  plugins: [],
}