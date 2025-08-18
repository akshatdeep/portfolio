/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    // Background colors
    'bg-black',
    'bg-slate-800',
    'bg-white',
    'bg-gray-200',
    'bg-blue-900',

    // Text colors
    'text-white',
    'text-black',
    'text-slate-100',
    'text-red-500',
    'text-emerald-400',
  ],
  darkMode: 'class',  // <-- important for dark mode toggle
  theme: {
    extend: {},
  },
  plugins: [ require('tailwind-scrollbar-hide')],
}
