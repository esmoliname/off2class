/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#07090e',
        surface: {
          50: '#1e2430',
          100: '#161b24',
          200: '#11151c',
          300: '#0d1017',
          DEFAULT: '#0a0d13',
        },
        brand: {
          cyan: '#00F0FF',
          blue: '#0071e3',
          purple: '#9d4edd',
          indigo: '#5e60ce',
          emerald: '#10b981',
          amber: '#f59e0b',
        },
        // Liquid Glass design tokens (see .glass-grain in src/index.css)
        glass: {
          fill: 'rgba(255, 255, 255, 0.05)',
          border: 'rgba(255, 255, 255, 0.08)',
        },
      },
      fontFamily: {
        // Single source of truth: SF on Apple devices, Inter as cross-platform webfont.
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"SF Pro Text"',
          '"Segoe UI"',
          'Inter',
          'Roboto',
          'sans-serif'
        ],
        // Display / headings: geometric grotesk for optical hierarchy.
        display: [
          'Outfit',
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          'Inter',
          'sans-serif'
        ],
        mono: [
          '"JetBrains Mono"',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'monospace'
        ],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
        'glass-hover': '0 12px 40px 0 rgba(0, 240, 255, 0.15)',
        'glow-cyan': '0 0 25px -3px rgba(0, 240, 255, 0.35)',
        'glow-purple': '0 0 25px -3px rgba(157, 78, 221, 0.35)',
        'glow-blue': '0 0 25px -3px rgba(0, 113, 227, 0.4)',
        'inner-light': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.15)',
      },
      backdropBlur: {
        'xs': '2px',
        '2xl': '40px',
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
        'gradient-shift': 'gradientShift 12s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: 0.7 },
          '50%': { opacity: 1 },
        },
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        }
      }
    },
  },
  plugins: [require('tailwindcss-animate')],
}
