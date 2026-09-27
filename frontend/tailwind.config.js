/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#F2F8F4',
          100: '#E4F1E8',
          200: '#C5DFCF',
          300: '#97C3A8',
          400: '#5F9F7A',
          500: '#357C54',
          600: '#276241',
          700: '#1E4D36', // Primary forest green
          800: '#173D2B',
          900: '#112C20', // Dark green text
        },
        cream: {
          50: '#FDFBF7',
          100: '#FAF7F0', // Primary warm cream background
          200: '#F4EFE3',
          300: '#EAE1CE',
          400: '#DBD0B6',
          500: '#C4B594',
        },
        pastel: {
          green: '#EAF5EE',
          greenBorder: '#CEE6D5',
          greenText: '#1B4D36',

          blue: '#EBF4F7',
          blueBorder: '#CFE4EC',
          blueText: '#1D4E64',

          peach: '#FDF1EB',
          peachBorder: '#F7D8CB',
          peachText: '#8A3D22',

          purple: '#F4F0F9',
          purpleBorder: '#E3D7F2',
          purpleText: '#55337E',

          amber: '#FDF8E8',
          amberBorder: '#F8EAC2',
          amberText: '#855A16',
        }
      },
      fontFamily: {
        sans: ['"Mukta"', '"Noto Sans Devanagari"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        hindi: ['"Mukta"', '"Noto Sans Devanagari"', 'system-ui', 'sans-serif'],
        display: ['"Rozha One"', '"Noto Sans Devanagari"', 'serif'],
        numeric: ['"Outfit"', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 10px -2px rgba(30, 77, 54, 0.05), 0 1px 3px -1px rgba(0, 0, 0, 0.05)',
        'card': '0 4px 16px -3px rgba(30, 77, 54, 0.07), 0 2px 6px -2px rgba(0, 0, 0, 0.04)',
        'float': '0 12px 28px -6px rgba(30, 77, 54, 0.12), 0 4px 10px -3px rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [],
}
