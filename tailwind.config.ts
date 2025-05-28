export default {
  content: ['index.html', 'src/**/*.{ts,tsx,js,jsx}'],
  safelist: [
    'bg-pastelPink/10', 'bg-pastelPink/15',
    'bg-pastelBlue/10', 'bg-pastelBlue/15',
    'bg-pastelLav/10',  'bg-pastelLav/15',
    'bg-pastelMint/10', 'bg-pastelMint/15',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#F8F8F8',
        pastelPink: '#F2C1D1',
        pastelBlue: '#CCE7E8',
        pastelLav: '#E3D4ED',
        pastelMint: '#D0EFEA',
      },
      borderRadius: { xl: '1rem', '2xl': '1.5rem' },
      keyframes: {
        fadeIn: { '0%': { opacity: '0', transform: 'translateY(-8px)' }, '100%': { opacity: '1' } }
      },
      animation: { fadeIn: 'fadeIn .5s ease-out' },
    }
  },
  plugins: [],
};
