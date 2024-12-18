import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/components/(Dropdown).js',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'bg-light': "url('/img/bg-light.jpg')",
        'bg-dark': "url('/img/bg-dark.jpg')",
      },
      colors: {
        default: {
          DEFAULT: '#1D4ED8',
          light: '#F5F5F5',
          dark: '#0A0A0A',
        },
        primary: {
          DEFAULT: '#1398F6',
          light: '#3AA9F8',
          dark: '#098DEC',
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
