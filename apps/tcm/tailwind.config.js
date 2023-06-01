const globalConfigs = require('@browserstack/tailwind-config');

module.exports = {
  ...globalConfigs.globalTailwindConfig,
  content: [
    'src/**/*.{js,jsx}',
    './node_modules/@browserstack/bifrost/dist/*.js',
    './node_modules/@browserstack/growth/dist/*.js'
  ],
  theme: {
    ...globalConfigs.globalTailwindConfig.theme,
    colors: {
      ...globalConfigs.globalTailwindConfig.theme.colors,
      green: {
        50: 'var(--colors-green-50)',
        100: 'var(--colors-green-100)',
        200: 'var(--colors-green-200)',
        300: 'var(--colors-green-300)',
        400: 'var(--colors-green-400)',
        500: 'var(--colors-green-500)',
        600: 'var(--colors-green-600)',
        700: 'var(--colors-green-700)',
        800: 'var(--colors-green-800)',
        900: 'var(--colors-green-900)'
      },
      slate: {
        50: 'var(--colors-slate-50)',
        100: 'var(--colors-slate-100)',
        200: 'var(--colors-slate-200)',
        300: 'var(--colors-slate-300)',
        400: 'var(--colors-slate-400)',
        500: 'var(--colors-slate-500)',
        600: 'var(--colors-slate-600)',
        700: 'var(--colors-slate-700)',
        800: 'var(--colors-slate-800)',
        900: 'var(--colors-slate-900)'
      },
      zinc: {
        50: 'var(--colors-zinc-50)',
        100: 'var(--colors-zinc-100)',
        200: 'var(--colors-zinc-200)',
        300: 'var(--colors-zinc-300)',
        400: 'var(--colors-zinc-400)',
        500: 'var(--colors-zinc-500)',
        600: 'var(--colors-zinc-600)',
        700: 'var(--colors-zinc-700)',
        800: 'var(--colors-zinc-800)',
        900: 'var(--colors-zinc-900)'
      },
      neutral: {
        50: 'var(--colors-neutral-50)',
        100: 'var(--colors-neutral-100)',
        200: 'var(--colors-neutral-200)',
        300: 'var(--colors-neutral-300)',
        400: 'var(--colors-neutral-400)',
        500: 'var(--colors-neutral-500)',
        600: 'var(--colors-neutral-600)',
        700: 'var(--colors-neutral-700)',
        800: 'var(--colors-neutral-800)',
        900: 'var(--colors-neutral-900)'
      },
      stone: {
        50: 'var(--colors-stone-50)',
        100: 'var(--colors-stone-100)',
        200: 'var(--colors-stone-200)',
        300: 'var(--colors-stone-300)',
        400: 'var(--colors-stone-400)',
        500: 'var(--colors-stone-500)',
        600: 'var(--colors-stone-600)',
        700: 'var(--colors-stone-700)',
        800: 'var(--colors-stone-800)',
        900: 'var(--colors-stone-900)'
      },
      orange: {
        50: 'var(--colors-orange-50)',
        100: 'var(--colors-orange-100)',
        200: 'var(--colors-orange-200)',
        300: 'var(--colors-orange-300)',
        400: 'var(--colors-orange-400)',
        500: 'var(--colors-orange-500)',
        600: 'var(--colors-orange-600)',
        700: 'var(--colors-orange-700)',
        800: 'var(--colors-orange-800)',
        900: 'var(--colors-orange-900)'
      },
      yellow: {
        50: 'var(--colors-yellow-50)',
        100: 'var(--colors-yellow-100)',
        200: 'var(--colors-yellow-200)',
        300: 'var(--colors-yellow-300)',
        400: 'var(--colors-yellow-400)',
        500: 'var(--colors-yellow-500)',
        600: 'var(--colors-yellow-600)',
        700: 'var(--colors-yellow-700)',
        800: 'var(--colors-yellow-800)',
        900: 'var(--colors-yellow-900)'
      },
      lime: {
        50: 'var(--colors-lime-50)',
        100: 'var(--colors-lime-100)',
        200: 'var(--colors-lime-200)',
        300: 'var(--colors-lime-300)',
        400: 'var(--colors-lime-400)',
        500: 'var(--colors-lime-500)',
        600: 'var(--colors-lime-600)',
        700: 'var(--colors-lime-700)',
        800: 'var(--colors-lime-800)',
        900: 'var(--colors-lime-900)'
      },
      teal: {
        50: 'var(--colors-teal-50)',
        100: 'var(--colors-teal-100)',
        200: 'var(--colors-teal-200)',
        300: 'var(--colors-teal-300)',
        400: 'var(--colors-teal-400)',
        500: 'var(--colors-teal-500)',
        600: 'var(--colors-teal-600)',
        700: 'var(--colors-teal-700)',
        800: 'var(--colors-teal-800)',
        900: 'var(--colors-teal-900)'
      },
      cyan: {
        50: 'var(--colors-cyan-50)',
        100: 'var(--colors-cyan-100)',
        200: 'var(--colors-cyan-200)',
        300: 'var(--colors-cyan-300)',
        400: 'var(--colors-cyan-400)',
        500: 'var(--colors-cyan-500)',
        600: 'var(--colors-cyan-600)',
        700: 'var(--colors-cyan-700)',
        800: 'var(--colors-cyan-800)',
        900: 'var(--colors-cyan-900)'
      },
      indigo: {
        50: 'var(--colors-indigo-50)',
        100: 'var(--colors-indigo-100)',
        200: 'var(--colors-indigo-200)',
        300: 'var(--colors-indigo-300)',
        400: 'var(--colors-indigo-400)',
        500: 'var(--colors-indigo-500)',
        600: 'var(--colors-indigo-600)',
        700: 'var(--colors-indigo-700)',
        800: 'var(--colors-indigo-800)',
        900: 'var(--colors-indigo-900)'
      },
      violet: {
        50: 'var(--colors-violet-50)',
        100: 'var(--colors-violet-100)',
        200: 'var(--colors-violet-200)',
        300: 'var(--colors-violet-300)',
        400: 'var(--colors-violet-400)',
        500: 'var(--colors-violet-500)',
        600: 'var(--colors-violet-600)',
        700: 'var(--colors-violet-700)',
        800: 'var(--colors-violet-800)',
        900: 'var(--colors-violet-900)'
      },
      purple: {
        50: 'var(--colors-purple-50)',
        100: 'var(--colors-purple-100)',
        200: 'var(--colors-purple-200)',
        300: 'var(--colors-purple-300)',
        400: 'var(--colors-purple-400)',
        500: 'var(--colors-purple-500)',
        600: 'var(--colors-purple-600)',
        700: 'var(--colors-purple-700)',
        800: 'var(--colors-purple-800)',
        900: 'var(--colors-purple-900)'
      },
      fuchsia: {
        50: 'var(--colors-fuchsia-50)',
        100: 'var(--colors-fuchsia-100)',
        200: 'var(--colors-fuchsia-200)',
        300: 'var(--colors-fuchsia-300)',
        400: 'var(--colors-fuchsia-400)',
        500: 'var(--colors-fuchsia-500)',
        600: 'var(--colors-fuchsia-600)',
        700: 'var(--colors-fuchsia-700)',
        800: 'var(--colors-fuchsia-800)',
        900: 'var(--colors-fuchsia-900)'
      },
      pink: {
        50: 'var(--colors-pink-50)',
        100: 'var(--colors-pink-100)',
        200: 'var(--colors-pink-200)',
        300: 'var(--colors-pink-300)',
        400: 'var(--colors-pink-400)',
        500: 'var(--colors-pink-500)',
        600: 'var(--colors-pink-600)',
        700: 'var(--colors-pink-700)',
        800: 'var(--colors-pink-800)',
        900: 'var(--colors-pink-900)'
      },
      rose: {
        50: 'var(--colors-rose-50)',
        100: 'var(--colors-rose-100)',
        200: 'var(--colors-rose-200)',
        300: 'var(--colors-rose-300)',
        400: 'var(--colors-rose-400)',
        500: 'var(--colors-rose-500)',
        600: 'var(--colors-rose-600)',
        700: 'var(--colors-rose-700)',
        800: 'var(--colors-rose-800)',
        900: 'var(--colors-rose-900)'
      }
    }
  }
};
