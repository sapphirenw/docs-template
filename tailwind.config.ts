import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary accent - Mintlify-inspired teal/green
        primary: {
          50: '#ecfdf7',
          100: '#d1fae9',
          200: '#a7f3d6',
          300: '#6ee7bf',
          400: '#34d3a3',
          500: '#18E299',
          600: '#0d9373',
          700: '#0f7a60',
          800: '#11614d',
          900: '#105040',
          950: '#032d24',
        },
        // Background colors using CSS variables with rgb()
        background: {
          DEFAULT: 'rgb(var(--background) / <alpha-value>)',
          soft: 'rgb(var(--background-soft) / <alpha-value>)',
          muted: 'rgb(var(--background-muted) / <alpha-value>)',
        },
        // Text colors
        foreground: {
          DEFAULT: 'rgb(var(--foreground) / <alpha-value>)',
          muted: 'rgb(var(--foreground-muted) / <alpha-value>)',
          soft: 'rgb(var(--foreground-soft) / <alpha-value>)',
        },
        // Border colors
        border: {
          DEFAULT: 'rgb(var(--border) / <alpha-value>)',
          soft: 'rgb(var(--border-soft) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'Menlo', 'monospace'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'rgb(var(--foreground))',
            a: {
              color: '#18E299',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
            'h1, h2, h3, h4': {
              color: 'rgb(var(--foreground))',
              fontWeight: '600',
            },
            code: {
              color: 'rgb(var(--foreground))',
              backgroundColor: 'rgb(var(--background-muted))',
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
              fontWeight: '400',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: 'rgb(var(--background-soft))',
              color: 'rgb(var(--foreground))',
            },
            blockquote: {
              borderLeftColor: '#18E299',
              color: 'rgb(var(--foreground-muted))',
            },
          },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-in': 'slideIn 0.2s ease-out',
        'scale-in': 'scaleIn 0.15s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
