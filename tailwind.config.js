/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#07090f',
        'bg-secondary': '#0e1420',
        'bg-card': '#131a28',
        'accent-primary': '#4fc3f7',
        'accent-secondary': '#e8b84b',
        'accent-tertiary': '#7ecb7e',
        'text-primary': '#e8edf5',
        'text-secondary': '#8a9bbf',
      },
      fontFamily: {
        'cormorant': ['"Cormorant Garamond"', 'serif'],
        'mono': ['"IBM Plex Mono"', 'monospace'],
        'geologica': ['Geologica', 'sans-serif'],
      },
      boxShadow: {
        'glow-blue': '0 0 30px rgba(79,195,247,0.2)',
        'glow-gold': '0 0 30px rgba(232,184,75,0.2)',
      },
    },
  },
  plugins: [],
}

