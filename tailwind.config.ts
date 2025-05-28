import type { Config } from 'tailwindcss'

export default {
  content: ['index.html', 'src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg:          '#F8F8F8',
        pastelPink:  '#F2C1D1',
        pastelBlue:  '#CCE7E8',
        pastelLav:   '#E3D4ED',
        pastelMint:  '#D0EFEA',
      },
      borderRadius: { xl: '1rem', '2xl': '1.5rem' },
      keyframes: {
        fadeIn: { '0%': { opacity: 0, transform: 'translateY(-8px)' }, '100%': { opacity: 1 } }
      },
      animation: { fadeIn: 'fadeIn .5s ease-out' },
    }
  },
  plugins: [],
} satisfies Config
