/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        
        primaryLight: "#DEE8FF",
        primaryMain: "#003cc9",
        primaryDark: "#2767FF",
   },
      fontFamily: {
        metroMedium:  ['metropolisMedium', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
        metroRegular:  ['metropolisRegular', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
        metroSemiBold:  ['metropolisSemiBold', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
        metroBold:['metropolisBold', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
   },
    },
  },
  plugins: [ require('preline/plugin')],
}