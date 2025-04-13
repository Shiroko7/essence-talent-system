/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  safelist: [
    // Ensure these dynamic classes are included
    'bg-blue-500', 'bg-red-500', 'bg-yellow-800', 'bg-gray-500', 'bg-green-700',
    'bg-green-500', 'bg-emerald-600', 'bg-purple-500', 'bg-sky-300',
    'border-blue-500', 'border-red-500', 'border-yellow-800', 'border-gray-500', 
    'border-green-700', 'border-green-500', 'border-emerald-600', 'border-purple-500', 'border-sky-300'
  ],
  plugins: [],
}
