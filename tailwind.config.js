/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '',
      screens: {
        lg: '1280px',
        xl: '1280px',
        '2xl': '1280px',
      },
    },
    fontSize: {
      'heading1-bold': [
        '36px',
        {
          lineHeight: '140%',
          fontWeight: '700',
        },
      ],
      'heading1-semibold': [
        '36px',
        {
          lineHeight: '140%',
          fontWeight: '600',
        },
      ],
      'heading2-bold': [
        '30px',
        {
          lineHeight: '140%',
          fontWeight: '700',
        },
      ],
      'heading2-semibold': [
        '30px',
        {
          lineHeight: '140%',
          fontWeight: '600',
        },
      ],
      'heading3-bold': [
        '24px',
        {
          lineHeight: '140%',
          fontWeight: '700',
        },
      ],
      'heading4-medium': [
        '20px',
        {
          lineHeight: '140%',
          fontWeight: '500',
        },
      ],
      'body-bold': [
        '18px',
        {
          lineHeight: '140%',
          fontWeight: '700',
        },
      ],
      'body-semibold': [
        '18px',
        {
          lineHeight: '140%',
          fontWeight: '600',
        },
      ],
      'body-medium': [
        '18px',
        {
          lineHeight: '140%',
          fontWeight: '500',
        },
      ],
      'body-normal': [
        '18px',
        {
          lineHeight: '140%',
          fontWeight: '400',
        },
      ],
      'body1-bold': [
        '18px',
        {
          lineHeight: '140%',
          fontWeight: '700',
        },
      ],
      'base-regular': [
        '16px',
        {
          lineHeight: '140%',
          fontWeight: '400',
        },
      ],
      'base-medium': [
        '16px',
        {
          lineHeight: '140%',
          fontWeight: '500',
        },
      ],
      'base-semibold': [
        '16px',
        {
          lineHeight: '140%',
          fontWeight: '600',
        },
      ],
      'base1-semibold': [
        '16px',
        {
          lineHeight: '140%',
          fontWeight: '600',
        },
      ],
      'small-regular': [
        '14px',
        {
          lineHeight: '140%',
          fontWeight: '400',
        },
      ],
      'small-medium': [
        '14px',
        {
          lineHeight: '140%',
          fontWeight: '500',
        },
      ],
      'small-semibold': [
        '14px',
        {
          lineHeight: '140%',
          fontWeight: '600',
        },
      ],
      'subtle-medium': [
        '12px',
        {
          lineHeight: '16px',
          fontWeight: '500',
        },
      ],
      'subtle-semibold': [
        '12px',
        {
          lineHeight: '16px',
          fontWeight: '600',
        },
      ],
      'tiny-medium': [
        '10px',
        {
          lineHeight: '140%',
          fontWeight: '500',
        },
      ],
      'x-small-semibold': [
        '7px',
        {
          lineHeight: '9.318px',
          fontWeight: '600',
        },
      ],
    },
    fontFamily: {
      body: [
        'Inter',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'system-ui',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji',
      ],
      sans: [
        'Inter',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'system-ui',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji',
      ],
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        // Custom colorsを追加butombar
        'custom-gray': 'rgba(16, 16, 18, 0.60)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      screens: {
        xs: '400px',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
