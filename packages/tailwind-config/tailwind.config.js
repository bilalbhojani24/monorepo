const tailwindForms = require('@tailwindcss/forms');

module.exports = {
  content: ['../../packages/bifrost/modules/**/*.{js,jsx}'],
  darkMode: false,
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      black: '#000000',
      base: {
        50: 'var(--colors-base-50)',
        100: 'var(--colors-base-100)',
        200: 'var(--colors-base-200)',
        300: 'var(--colors-base-300)',
        400: 'var(--colors-base-400)',
        500: 'var(--colors-base-500)',
        600: 'var(--colors-base-600)',
        700: 'var(--colors-base-700)',
        800: 'var(--colors-base-800)',
        900: 'var(--colors-base-900)'
      },
      brand: {
        50: 'var(--colors-brand-50)',
        100: 'var(--colors-brand-100)',
        200: 'var(--colors-brand-200)',
        300: 'var(--colors-brand-300)',
        400: 'var(--colors-brand-400)',
        500: 'var(--colors-brand-500)',
        600: 'var(--colors-brand-600)',
        700: 'var(--colors-brand-700)',
        800: 'var(--colors-brand-800)',
        900: 'var(--colors-brand-900)'
      },
      danger: {
        50: 'var(--colors-danger-50)',
        100: 'var(--colors-danger-100)',
        200: 'var(--colors-danger-200)',
        300: 'var(--colors-danger-300)',
        400: 'var(--colors-danger-400)',
        500: 'var(--colors-danger-500)',
        600: 'var(--colors-danger-600)',
        700: 'var(--colors-danger-700)',
        800: 'var(--colors-danger-800)',
        900: 'var(--colors-danger-900)'
      },
      success: {
        50: 'var(--colors-success-50)',
        100: 'var(--colors-success-100)',
        200: 'var(--colors-success-200)',
        300: 'var(--colors-success-300)',
        400: 'var(--colors-success-400)',
        500: 'var(--colors-success-500)',
        600: 'var(--colors-success-600)',
        700: 'var(--colors-success-700)',
        800: 'var(--colors-success-800)',
        900: 'var(--colors-success-900)'
      },
      attention: {
        50: 'var(--colors-attention-50)',
        100: 'var(--colors-attention-100)',
        200: 'var(--colors-attention-200)',
        300: 'var(--colors-attention-300)',
        400: 'var(--colors-attention-400)',
        500: 'var(--colors-attention-500)',
        600: 'var(--colors-attention-600)',
        700: 'var(--colors-attention-700)',
        800: 'var(--colors-attention-800)',
        900: 'var(--colors-attention-900)'
      },
      information: {
        50: 'var(--colors-info-50)',
        100: 'var(--colors-info-100)',
        200: 'var(--colors-info-200)',
        300: 'var(--colors-info-300)',
        400: 'var(--colors-info-400)',
        500: 'var(--colors-info-500)',
        600: 'var(--colors-info-600)',
        700: 'var(--colors-info-700)',
        800: 'var(--colors-info-800)',
        900: 'var(--colors-info-900)'
      }
    },
    fontFamily: {
      sans: [
        'Inter var',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji'
      ]
    }
  },
  variants: {
    extend: {}
  },
  plugins: [tailwindForms]
};
