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
    'bg-purple-900', 'bg-lime-500', 'bg-purple-500', 'bg-sky-300',
    'border-blue-500', 'border-red-500', 'border-yellow-800', 'border-gray-500', 
    'border-green-700', 'border-purple-900', 'border-lime-500', 'border-purple-500', 'border-sky-300'
  ],
  plugins: [],
}
