/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#0B0B0F',
        charcoal: '#1A1A22',
        'charcoal-mid': '#22222C',
        gold: '#C9A84C',
        'gold-dim': 'rgba(201,168,76,0.15)',
        ivory: '#F0E6D3',
        'ivory-dim': 'rgba(240,230,211,0.55)',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        sans: ['DM Sans', 'sans-serif'],
      },
      animation: {
        'scroll-prompt': 'scrollPrompt 2s ease-in-out infinite',
        'float-card': 'floatCard 6s ease-in-out infinite',
        'gold-pulse': 'goldPulse 3s ease-in-out infinite',
        'pan-slow': 'panSlow 8s ease-in-out infinite alternate',
      },
      backgroundImage: {
        'radial-gold': 'radial-gradient(ellipse at center, rgba(201,168,76,0.08) 0%, transparent 70%)',
      },
    },
  },
  plugins: [],
};