/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef2f4',
          100: '#fde6e9',
          200: '#fad2d9',
          300: '#f6a8b8',
          400: '#f07493',
          500: '#E85D75',
          600: '#db3a5c',
          700: '#b8294a',
          800: '#9a2644',
          900: '#84243f',
        },
        slate: {
          500: '#64748b',
          600: '#4A5568',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        success: {
          500: '#48BB78',
          600: '#38a169',
        },
        background: '#F7FAFC',
        surface: '#FFFFFF',
        warning: '#ED8936',
        error: '#E53E3E',
        info: '#4299E1',
      },
      fontFamily: {
        'display': ['DM Sans', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
      },
      borderRadius: {
        'lg': '12px',
        'xl': '16px',
      },
      boxShadow: {
        'card': '0 4px 8px rgba(0, 0, 0, 0.1)',
        'float': '0 8px 24px rgba(0, 0, 0, 0.15)',
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
}