/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#00A7E1',
        'primary-dark': '#1F1885',
        'accent': '#E4007C',
        'gray': {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
        },
      },
      fontFamily: {
        'prompt': ['Prompt', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 4px rgba(0,0,0,0.05)',
        'hover': '0 8px 16px rgba(0,0,0,0.1)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
    },
  },
  plugins: [],
}
