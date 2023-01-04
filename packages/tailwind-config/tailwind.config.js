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
        50: 'var(--colors-information-50)',
        100: 'var(--colors-information-100)',
        200: 'var(--colors-information-200)',
        300: 'var(--colors-information-300)',
        400: 'var(--colors-information-400)',
        500: 'var(--colors-information-500)',
        600: 'var(--colors-information-600)',
        700: 'var(--colors-information-700)',
        800: 'var(--colors-information-800)',
        900: 'var(--colors-information-900)'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require('@tailwindcss/forms')]
};
