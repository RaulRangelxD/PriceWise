import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      backgroundImage: {
        'bg-light': "url('/img/bg-light.jpg')",
        'bg-dark': "url('/img/bg-dark.jpg')",
      },
      colors: {
        primary: {
          DEFAULT: '#1D4ED8',
          light: '#3B82F6',
          dark: '#1E40AF',
        },
        secondary: {
          DEFAULT: '#9333EA',
          light: '#C084FC',
          dark: '#7E22CE',
        },
      },
    },
  },
  plugins: [],
} satisfies Config
