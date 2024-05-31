/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{ts,tsx,html,js,jsx}",
    './static/*html'
  ],
  theme: {
    extend: {
      padding: {
        '3px': '3px',
      }
    },
  },
  plugins: [],
}

