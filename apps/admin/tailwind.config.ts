import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary:        '#7C6FF7',
        'primary-dark': '#5B4FD4',
        'primary-light':'#A78BFA',
        'accent-orange':'#E85D2F',
        'accent-amber': '#F4A227',
        success:        '#10B981',
        danger:         '#EF4444',
        'bg-page':      '#0A0A14',
        'bg-screen':    '#0D0D18',
        'bg-topbar':    '#111120',
        surface:        'rgba(255,255,255,0.04)',
        border:         'rgba(255,255,255,0.07)',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        heading: ['Syne', 'sans-serif'],
        label:   ['Outfit', 'sans-serif'],
        body:    ['DM Sans', 'sans-serif'],
      },
      borderRadius: {
        chip:   '5px',
        card:   '10px',
        button: '10px',
      },
    },
  },
  plugins: [],
} satisfies Config;
