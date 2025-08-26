/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      boxShadow: {
        'glow': '0 10px 30px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.06)',
      },
      backdropBlur: { xs:'2px' }
    },
  },
  plugins: [],
}
