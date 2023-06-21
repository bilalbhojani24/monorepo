export const RadioWrapperStyles = {
  default: {
    inline:
      'space-y-4 flex sm:items-center flex-col sm:flex-row sm:space-x-10 sm:space-y-0',
    block: 'flex space-y-4 flex-col'
  },

  stackedCard: {
    inline: 'grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4',
    block: 'space-y-4'
  },

  smallCard: {
    inline: 'grid grid-cols-3 gap-3 sm:grid-cols-6',
    block: 'grid grid-cols-3 gap-3 sm:grid-cols-6'
  },

  table: {
    inline: 'relative -space-y-px rounded-md bg-white',
    block: 'relative -space-y-px rounded-md bg-white'
  }
};

export const RadioCardStyles = {
  smallCard: {
    inline:
      'border-base-200 text-base-900 rounded-md p-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1 hover:bg-base-50 focus:ring-2 focus:ring-offset-2 focus:ring-brand-500',
    block:
      'border-base-200 text-base-900 rounded-md p-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1 hover:bg-base-50 focus:ring-2 focus:ring-offset-2 focus:ring-brand-500'
  },

  stackedCard: {
    inline:
      'w-full border-base-300 relative rounded-lg  p-4 shadow-sm  text-left flex p-4',
    block:
      'w-full border-base-300 relative rounded-lg  p-4 shadow-sm  text-left block px-6 py-4 sm:flex sm:justify-between'
  }
};

export const RadioTableBorderStyles = {
  topRounded: 'rounded-tl-md rounded-tr-md',
  bottomRounded: 'rounded-bl-md rounded-br-md'
};
