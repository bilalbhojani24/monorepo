/* eslint-disable sonarjs/no-duplicate-string */
export const BUTTON_SIZES = [
  'extra-small',
  'small',
  'default',
  'large',
  'extra-large',
];

export const BUTTON_VARIANTS = ['primary', 'secondary', 'white', 'minimalist'];

export const BUTTON_TYPES = [
  'half-rounded-button',
  'icon-button',
  'rounded-button',
];

export const BUTTON_STYLE_CLASSES = {
  'extra-small-primary-half-rounded-button':
    'text-xs rounded py-1.5 px-2.5 bg-information-600 text-white shadow-sm hover:bg-information-700 focus:outline-none focus:ring-2 focus:ring-information-500 focus:ring-offset-2',
  'extra-small-primary-icon-button':
    'rounded-full p-1 text-sm bg-information-600 text-white shadow-sm hover:bg-information-700 focus:outline-none focus:ring-2 focus:ring-information-500 focus:ring-offset-2',
  'extra-small-primary-rounded-button':
    'rounded-full px-3 py-1.5 text-xs bg-information-600 text-white shadow-sm hover:bg-information-700 focus:outline-none focus:ring-2 focus:ring-information-500 focus:ring-offset-2',
  'extra-small-secondary-half-rounded-button':
    'rounded px-2.5 py-1.5 text-xs bg-information-100 text-information-700 hover:bg-information-200 focus:outline-none focus:ring-2 focus:ring-information-500 focus:ring-offset-2',
  'extra-small-secondary-icon-button':
    'rounded-full p-1 text-sm bg-information-100 text-information-700 hover:bg-information-200 focus:outline-none focus:ring-2 focus:ring-information-500 focus:ring-offset-2',
  'extra-small-secondary-rounded-button':
    'rounded-full px-3 py-1.5 text-xs bg-information-100 text-information-700 hover:bg-information-200 focus:outline-none focus:ring-2 focus:ring-information-500 focus:ring-offset-2',
  'extra-small-white-half-rounded-button':
    'rounded px-2.5 py-1.5 text-xs border border-base-300 bg-white text-base-700 shadow-sm hover:bg-base-50 focus:outline-none focus:ring-2 focus:ring-information-500 focus:ring-offset-2',
  'extra-small-white-icon-button':
    'rounded-full p-1 text-sm border border-base-300 bg-white text-base-700 shadow-sm hover:bg-base-50 focus:outline-none focus:ring-2 focus:ring-information-500 focus:ring-offset-2',
  'extra-small-white-rounded-button':
    'rounded-full px-3 py-1.5 text-xs border border-base-300 bg-white text-base-700 shadow-sm hover:bg-base-50 focus:outline-none focus:ring-2 focus:ring-information-500 focus:ring-offset-2',
  'extra-small-minimalist-half-rounded-button':
    'rounded text-xs bg-transparent text-base-700 hover:text-base-500 focus:ring-2 focus:ring-information-500 focus:ring-offset-2 leading-4',
  'extra-small-minimalist-icon-button':
    'rounded text-xs bg-transparent text-base-700 hover:text-base-500 focus:ring-2 focus:ring-information-500 focus:ring-offset-2',
  'extra-small-minimalist-rounded-button':
    'rounded text-xs bg-transparent text-base-700 hover:text-base-500 focus:ring-2 focus:ring-information-500 focus:ring-offset-2',
  'extra-small-success-half-rounded-button': 'rounded px-2.5 py-1.5 text-xs',
  'extra-small-success-icon-button': 'rounded-full p-1 text-sm',
  'extra-small-success-rounded-button': 'rounded-full px-3 py-1.5 text-xs',
  'extra-small-danger-half-rounded-button': 'rounded px-2.5 py-1.5 text-xs',
  'extra-small-danger-icon-button': 'rounded-full p-1 text-sm',
  'extra-small-danger-rounded-button': 'rounded-full px-3 py-1.5 text-xs',
  'extra-small-warning-half-rounded-button': 'rounded px-2.5 py-1.5 text-xs',
  'extra-small-warning-icon-button': 'rounded-full p-1 text-sm',
  'extra-small-warning-rounded-button': 'rounded-full px-3 py-1.5 text-xs',
  'small-primary-half-rounded-button':
    'rounded-md px-3 py-2 text-sm leading-4 bg-information-600 text-white shadow-sm hover:bg-information-700 focus:outline-none focus:ring-2 focus:ring-information-500 focus:ring-offset-2',
  'small-primary-icon-button':
    'rounded-full p-1.5 text-base bg-information-600 text-white shadow-sm hover:bg-information-700 focus:outline-none focus:ring-2 focus:ring-information-500 focus:ring-offset-2',
  'small-primary-rounded-button':
    'rounded-full px-3.5 py-2 text-sm leading-4 bg-information-600 text-white shadow-sm hover:bg-information-700 focus:outline-none focus:ring-2 focus:ring-information-500 focus:ring-offset-2',
  'small-secondary-half-rounded-button':
    'rounded-md px-3 py-2 text-sm leading-4 bg-information-100 text-information-700 hover:bg-information-200 focus:outline-none focus:ring-2 focus:ring-information-500 focus:ring-offset-2',
  'small-secondary-icon-button':
    'rounded-full p-1.5 text-base bg-information-100 text-information-700 hover:bg-information-200 focus:outline-none focus:ring-2 focus:ring-information-500 focus:ring-offset-2',
  'small-secondary-rounded-button':
    'rounded-full px-3.5 py-2 text-sm leading-4 bg-information-100 text-information-700 hover:bg-information-200 focus:outline-none focus:ring-2 focus:ring-information-500 focus:ring-offset-2',
  'small-white-half-rounded-button':
    'rounded-md px-3 py-2 text-sm leading-4 border border-base-300 bg-white text-base-700 shadow-sm hover:bg-base-50 focus:outline-none focus:ring-2 focus:ring-information-500 focus:ring-offset-2',
  'small-white-icon-button':
    'rounded-full p-1.5 text-base border border-base-300 bg-white text-base-700 shadow-sm hover:bg-base-50 focus:outline-none focus:ring-2 focus:ring-information-500 focus:ring-offset-2',
  'small-white-rounded-button':
    'rounded-full px-3.5 py-2 text-sm leading-4 border border-base-300 bg-white text-base-700 shadow-sm hover:bg-base-50 focus:outline-none focus:ring-2 focus:ring-information-500 focus:ring-offset-2',
  'small-minimalist-half-rounded-button':
    'rounded-md text-sm bg-transparent text-base-700 hover:text-base-500 focus:ring-2 focus:ring-information-500 focus:ring-offset-2 leading-4',
  'small-minimalist-icon-button':
    'rounded-md text-sm bg-transparent text-base-700 hover:text-base-500 focus:ring-2 focus:ring-information-500 focus:ring-offset-2',
  'small-minimalist-rounded-button':
    'rounded-md text-sm bg-transparent text-base-700 hover:text-base-500 focus:ring-2 focus:ring-information-500 focus:ring-offset-2',
  'small-success-half-rounded-button': 'rounded-md px-3 py-2 text-sm leading-4',
  'small-success-icon-button': 'rounded-full p-1.5 text-base',
  'small-success-rounded-button': 'rounded-full px-3.5 py-2 text-sm leading-4',
  'small-danger-half-rounded-button': 'rounded-md px-3 py-2 text-sm leading-4',
  'small-danger-icon-button': 'rounded-full p-1.5 text-base',
  'small-danger-rounded-button': 'rounded-full px-3.5 py-2 text-sm leading-4',
  'small-warning-half-rounded-button': 'rounded-md px-3 py-2 text-sm leading-4',
  'small-warning-icon-button': 'rounded-full p-1.5 text-base',
  'small-warning-rounded-button': 'rounded-full px-3.5 py-2 text-sm leading-4',
  'default-primary-half-rounded-button':
    'rounded-md px-4 py-2 text-sm bg-information-600 text-white shadow-sm hover:bg-information-700 focus:outline-none focus:ring-2 focus:ring-information-500 focus:ring-offset-2',
  'default-primary-icon-button':
    'rounded-full p-2 text-lg bg-information-600 text-white shadow-sm hover:bg-information-700 focus:outline-none focus:ring-2 focus:ring-information-500 focus:ring-offset-2',
  'default-primary-rounded-button':
    'rounded-full px-4 py-2 text-sm bg-information-600 text-white shadow-sm hover:bg-information-700 focus:outline-none focus:ring-2 focus:ring-information-500 focus:ring-offset-2',
  'default-secondary-half-rounded-button':
    'rounded-md px-4 py-2 text-sm bg-information-100 text-information-700 hover:bg-information-200 focus:outline-none focus:ring-2 focus:ring-information-500 focus:ring-offset-2',
  'default-secondary-icon-button':
    'rounded-full p-2 text-lg bg-information-100 text-information-700 hover:bg-information-200 focus:outline-none focus:ring-2 focus:ring-information-500 focus:ring-offset-2',
  'default-secondary-rounded-button':
    'rounded-full px-4 py-2 text-sm bg-information-100 text-information-700 hover:bg-information-200 focus:outline-none focus:ring-2 focus:ring-information-500 focus:ring-offset-2',
  'default-white-half-rounded-button':
    'rounded-md px-4 py-2 text-sm border border-base-300 bg-white text-base-700 shadow-sm hover:bg-base-50 focus:outline-none focus:ring-2 focus:ring-information-500 focus:ring-offset-2',
  'default-white-icon-button':
    'rounded-full p-2 text-lg border border-base-300 bg-white text-base-700 shadow-sm hover:bg-base-50 focus:outline-none focus:ring-2 focus:ring-information-500 focus:ring-offset-2',
  'default-white-rounded-button':
    'rounded-full px-4 py-2 text-sm border border-base-300 bg-white text-base-700 shadow-sm hover:bg-base-50 focus:outline-none focus:ring-2 focus:ring-information-500 focus:ring-offset-2',
  'default-minimalist-half-rounded-button':
    'rounded-md text-sm bg-transparent text-base-700 hover:text-base-500 focus:ring-2 focus:ring-information-500 focus:ring-offset-2 leading-5',
  'default-minimalist-icon-button':
    'rounded-md text-sm bg-transparent text-base-700 hover:text-base-500 focus:ring-2 focus:ring-information-500 focus:ring-offset-2',
  'default-minimalist-rounded-button':
    'rounded-md text-sm bg-transparent text-base-700 hover:text-base-500 focus:ring-2 focus:ring-information-500 focus:ring-offset-2',
  'default-success-half-rounded-button': 'rounded-md px-4 py-2 text-sm',
  'default-success-icon-button': 'rounded-full p-2 text-lg',
  'default-success-rounded-button': 'rounded-full px-4 py-2 text-sm',
  'default-danger-half-rounded-button': 'rounded-md px-4 py-2 text-sm',
  'default-danger-icon-button': 'rounded-full p-2 text-lg',
  'default-danger-rounded-button': 'rounded-full px-4 py-2 text-sm',
  'default-warning-half-rounded-button': 'rounded-md px-4 py-2 text-sm',
  'default-warning-icon-button': 'rounded-full p-2 text-lg',
  'default-warning-rounded-button': 'rounded-full px-4 py-2 text-sm',
  'large-primary-half-rounded-button':
    'rounded-md px-4 py-2 text-base bg-information-600 text-white shadow-sm hover:bg-information-700 focus:outline-none focus:ring-2 focus:ring-information-500 focus:ring-offset-2',
  'large-primary-icon-button':
    'rounded-full p-2 text-lg bg-information-600 text-white shadow-sm hover:bg-information-700 focus:outline-none focus:ring-2 focus:ring-information-500 focus:ring-offset-2',
  'large-primary-rounded-button':
    'rounded-full px-5 py-2 text-base bg-information-600 text-white shadow-sm hover:bg-information-700 focus:outline-none focus:ring-2 focus:ring-information-500 focus:ring-offset-2',
  'large-secondary-half-rounded-button':
    'rounded-md px-4 py-2 text-base bg-information-100 text-information-700 hover:bg-information-200 focus:outline-none focus:ring-2 focus:ring-information-500 focus:ring-offset-2',
  'large-secondary-icon-button':
    'rounded-full p-2 text-lg bg-information-100 text-information-700 hover:bg-information-200 focus:outline-none focus:ring-2 focus:ring-information-500 focus:ring-offset-2',
  'large-secondary-rounded-button':
    'rounded-full px-5 py-2 text-base bg-information-100 text-information-700 hover:bg-information-200 focus:outline-none focus:ring-2 focus:ring-information-500 focus:ring-offset-2',
  'large-white-half-rounded-button':
    'rounded-md px-4 py-2 text-base border border-base-300 bg-white text-base-700 shadow-sm hover:bg-base-50 focus:outline-none focus:ring-2 focus:ring-information-500 focus:ring-offset-2',
  'large-white-icon-button':
    'rounded-full p-2 text-lg border border-base-300 bg-white text-base-700 shadow-sm hover:bg-base-50 focus:outline-none focus:ring-2 focus:ring-information-500 focus:ring-offset-2',
  'large-white-rounded-button':
    'rounded-full px-5 py-2 text-base border border-base-300 bg-white text-base-700 shadow-sm hover:bg-base-50 focus:outline-none focus:ring-2 focus:ring-information-500 focus:ring-offset-2',
  'large-minimalist-half-rounded-button':
    'rounded-md text-base bg-transparent text-base-700 hover:text-base-500 focus:ring-2 focus:ring-information-500 focus:ring-offset-2 leading-6',
  'large-minimalist-icon-button':
    'rounded-md text-base bg-transparent text-base-700 hover:text-base-500 focus:ring-2 focus:ring-information-500 focus:ring-offset-2',
  'large-minimalist-rounded-button':
    'rounded-md text-base bg-transparent text-base-700 hover:text-base-500 focus:ring-2 focus:ring-information-500 focus:ring-offset-2',
  'large-success-half-rounded-button': 'rounded-md px-4 py-2 text-base',
  'large-success-icon-button': 'rounded-full p-2 text-lg',
  'large-success-rounded-button': 'rounded-full px-5 py-2 text-base',
  'large-danger-half-rounded-button': 'rounded-md px-4 py-2 text-base',
  'large-danger-icon-button': 'rounded-full p-2 text-lg',
  'large-danger-rounded-button': 'rounded-full px-5 py-2 text-base',
  'large-warning-half-rounded-button': 'rounded-md px-4 py-2 text-base',
  'large-warning-icon-button': 'rounded-full p-2 text-lg',
  'large-warning-rounded-button': 'rounded-full px-5 py-2 text-base',
  'extra-large-primary-half-rounded-button':
    'rounded-md px-6 py-3 text-base bg-information-600 text-white shadow-sm hover:bg-information-700 focus:outline-none focus:ring-2 focus:ring-information-500 focus:ring-offset-2',
  'extra-large-primary-icon-button':
    'rounded-full p-3 text-lg bg-information-600 text-white shadow-sm hover:bg-information-700 focus:outline-none focus:ring-2 focus:ring-information-500 focus:ring-offset-2',
  'extra-large-primary-rounded-button':
    'rounded-full px-6 py-3 text-base bg-information-600 text-white shadow-sm hover:bg-information-700 focus:outline-none focus:ring-2 focus:ring-information-500 focus:ring-offset-2',
  'extra-large-secondary-half-rounded-button':
    'rounded-md px-6 py-3 text-base bg-information-100 text-information-700 hover:bg-information-200 focus:outline-none focus:ring-2 focus:ring-information-500 focus:ring-offset-2',
  'extra-large-secondary-icon-button':
    'rounded-full p-3 text-lg bg-information-100 text-information-700 hover:bg-information-200 focus:outline-none focus:ring-2 focus:ring-information-500 focus:ring-offset-2',
  'extra-large-secondary-rounded-button':
    'rounded-full px-6 py-3 text-base bg-information-100 text-information-700 hover:bg-information-200 focus:outline-none focus:ring-2 focus:ring-information-500 focus:ring-offset-2',
  'extra-large-white-half-rounded-button':
    'rounded-md px-6 py-3 text-base border border-base-300 bg-white text-base-700 shadow-sm hover:bg-base-50 focus:outline-none focus:ring-2 focus:ring-information-500 focus:ring-offset-2',
  'extra-large-white-icon-button':
    'rounded-full p-3 text-lg border border-base-300 bg-white text-base-700 shadow-sm hover:bg-base-50 focus:outline-none focus:ring-2 focus:ring-information-500 focus:ring-offset-2',
  'extra-large-white-rounded-button':
    'rounded-full px-6 py-3 text-base border border-base-300 bg-white text-base-700 shadow-sm hover:bg-base-50 focus:outline-none focus:ring-2 focus:ring-information-500 focus:ring-offset-2',
  'extra-large-minimalist-half-rounded-button':
    'rounded-md text-base bg-transparent text-base-700 hover:text-base-500 focus:ring-2 focus:ring-information-500 focus:ring-offset-2 leading-6',
  'extra-large-minimalist-icon-button':
    'rounded-md text-base bg-transparent text-base-700 hover:text-base-500 focus:ring-2 focus:ring-information-500 focus:ring-offset-2',
  'extra-large-minimalist-rounded-button':
    'rounded-md text-base bg-transparent text-base-700 hover:text-base-500 focus:ring-2 focus:ring-information-500 focus:ring-offset-2',
  'extra-large-success-half-rounded-button': 'rounded-md px-6 py-3 text-base',
  'extra-large-success-icon-button': 'rounded-full p-3 text-lg',
  'extra-large-success-rounded-button': 'rounded-full px-6 py-3 text-base',
  'extra-large-danger-half-rounded-button': 'rounded-md px-6 py-3 text-base',
  'extra-large-danger-icon-button': 'rounded-full p-3 text-lg',
  'extra-large-danger-rounded-button': 'rounded-full px-6 py-3 text-base',
  'extra-large-warning-half-rounded-button': 'rounded-md px-6 py-3 text-base',
  'extra-large-warning-icon-button': 'rounded-full p-3 text-lg',
  'extra-large-warning-rounded-button': 'rounded-full px-6 py-3 text-base',

  // disabled states

  'extra-small-primary-half-rounded-button-disabled':
    'rounded px-2.5 py-1.5 text-xs bg-neutral-200 text-neutral-400 cursor-not-allowed',
  'extra-small-primary-icon-button-disabled':
    'bg-neutral-200 text-neutral-400 cursor-not-allowed rounded-full p-1 text-sm',
  'extra-small-primary-rounded-button-disabled':
    'rounded-full px-3 py-1.5 text-xs bg-neutral-200 text-neutral-400 cursor-not-allowed',
  'extra-small-secondary-half-rounded-button-disabled':
    'rounded px-2.5 py-1.5 text-xs bg-neutral-100 text-neutral-400 cursor-not-allowed',
  'extra-small-secondary-icon-button-disabled':
    'bg-neutral-100 text-neutral-400 cursor-not-allowed rounded-full p-1 text-sm',
  'extra-small-secondary-rounded-button-disabled':
    'rounded-full px-3 py-1.5 text-xs bg-neutral-100 text-neutral-400 cursor-not-allowed',
  'extra-small-white-half-rounded-button-disabled':
    'rounded px-2.5 py-1.5 text-xs border-neutral-100 text-neutral-400 cursor-not-allowed',
  'extra-small-white-icon-button-disabled':
    'border-neutral-100 text-neutral-400 cursor-not-allowed rounded-full p-1 text-sm',
  'extra-small-white-rounded-button-disabled':
    'rounded-full px-3 py-1.5 text-xs border-neutral-100 text-neutral-400 cursor-not-allowed',
  'extra-small-minimalist-half-rounded-button-disabled':
    'cursor-not-allowed text-base-400 rounded text-xs',
  'extra-small-minimalist-icon-button-disabled':
    'cursor-not-allowed text-base-400 rounded text-xs',
  'extra-small-minimalist-rounded-button-disabled':
    'cursor-not-allowed text-base-400 rounded text-xs',
  'extra-small-success-half-rounded-button-disabled':
    'rounded px-2.5 py-1.5 text-xs',
  'extra-small-success-icon-button-disabled': 'rounded-full p-1 text-sm',
  'extra-small-success-rounded-button-disabled':
    'rounded-full px-3 py-1.5 text-xs',
  'extra-small-danger-half-rounded-button-disabled':
    'rounded px-2.5 py-1.5 text-xs',
  'extra-small-danger-icon-button-disabled': 'rounded-full p-1 text-sm',
  'extra-small-danger-rounded-button-disabled':
    'rounded-full px-3 py-1.5 text-xs',
  'extra-small-warning-half-rounded-button-disabled':
    'rounded px-2.5 py-1.5 text-xs',
  'extra-small-warning-icon-button-disabled': 'rounded-full p-1 text-sm',
  'extra-small-warning-rounded-button-disabled':
    'rounded-full px-3 py-1.5 text-xs',
  'small-primary-half-rounded-button-disabled':
    'rounded-md px-3 py-2 text-sm leading-4 bg-neutral-200 text-neutral-400 cursor-not-allowed',
  'small-primary-icon-button-disabled':
    'bg-neutral-200 text-neutral-400 cursor-not-allowed rounded-full p-1.5 text-base',
  'small-primary-rounded-button-disabled':
    'rounded-full px-3.5 py-2 text-sm leading-4 bg-neutral-200 text-neutral-400 cursor-not-allowed',
  'small-secondary-half-rounded-button-disabled':
    'rounded-md px-3 py-2 text-sm leading-4 bg-neutral-100 text-neutral-400 cursor-not-allowed',
  'small-secondary-icon-button-disabled':
    'bg-neutral-100 text-neutral-400 cursor-not-allowed rounded-full p-1.5 text-base',
  'small-secondary-rounded-button-disabled':
    'rounded-full px-3.5 py-2 text-sm leading-4 bg-neutral-100 text-neutral-400 cursor-not-allowed',
  'small-white-half-rounded-button-disabled':
    'rounded-md px-3 py-2 text-sm leading-4 border-neutral-100 text-neutral-400 cursor-not-allowed',
  'small-white-icon-button-disabled':
    'border-neutral-100 text-neutral-400 cursor-not-allowed rounded-full p-1.5 text-base',
  'small-white-rounded-button-disabled':
    'rounded-full px-3.5 py-2 text-sm leading-4 border-neutral-100 text-neutral-400 cursor-not-allowed',
  'small-minimalist-half-rounded-button-disabled':
    'cursor-not-allowed text-base-400 text-sm',
  'small-minimalist-icon-button-disabled':
    'cursor-not-allowed text-base-400 text-sm',
  'small-minimalist-rounded-button-disabled':
    'text-sm cursor-not-allowed text-base-400',
  'small-success-half-rounded-button-disabled':
    'rounded-md px-3 py-2 text-sm leading-4',
  'small-success-icon-button-disabled': 'rounded-full p-1.5 text-base',
  'small-success-rounded-button-disabled':
    'rounded-full px-3.5 py-2 text-sm leading-4',
  'small-danger-half-rounded-button-disabled':
    'rounded-md px-3 py-2 text-sm leading-4',
  'small-danger-icon-button-disabled': 'rounded-full p-1.5 text-base',
  'small-danger-rounded-button-disabled':
    'rounded-full px-3.5 py-2 text-sm leading-4',
  'small-warning-half-rounded-button-disabled':
    'rounded-md px-3 py-2 text-sm leading-4',
  'small-warning-icon-button-disabled': 'rounded-full p-1.5 text-base',
  'small-warning-rounded-button-disabled':
    'rounded-full px-3.5 py-2 text-sm leading-4',
  'default-primary-half-rounded-button-disabled':
    'rounded-md px-4 py-2 text-sm bg-neutral-200 text-neutral-400 cursor-not-allowed',
  'default-primary-icon-button-disabled':
    'bg-neutral-200 text-neutral-400 cursor-not-allowed rounded-full p-2 text-lg',
  'default-primary-rounded-button-disabled':
    'rounded-full px-4 py-2 text-sm bg-neutral-200 text-neutral-400 cursor-not-allowed',
  'default-secondary-half-rounded-button-disabled':
    'rounded-md px-4 py-2 text-sm bg-neutral-100 text-neutral-400 cursor-not-allowed',
  'default-secondary-icon-button-disabled':
    'bg-neutral-100 text-neutral-400 cursor-not-allowed rounded-full p-2 text-lg',
  'default-secondary-rounded-button-disabled':
    'bg-neutral-100 text-neutral-400 cursor-not-allowed rounded-full px-4 py-2 text-sm',
  'default-white-half-rounded-button-disabled':
    'rounded-md px-4 py-2 text-sm border-neutral-100 text-neutral-400 cursor-not-allowed',
  'default-white-icon-button-disabled':
    'border-neutral-100 text-neutral-400 cursor-not-allowed rounded-full p-2 text-lg',
  'default-white-rounded-button-disabled':
    'border-neutral-100 text-neutral-400 cursor-not-allowed rounded-full px-4 py-2 text-sm',
  'default-minimalist-half-rounded-button-disabled':
    'cursor-not-allowed text-base-400 text-sm',
  'default-minimalist-icon-button-disabled':
    'text-sm cursor-not-allowed text-base-400',
  'default-minimalist-rounded-button-disabled':
    'text-sm cursor-not-allowed text-base-400',
  'default-success-half-rounded-button-disabled':
    'rounded-md px-4 py-2 text-sm',
  'default-success-icon-button-disabled': 'rounded-full p-2 text-lg',
  'default-success-rounded-button-disabled': 'rounded-full px-4 py-2 text-sm',
  'default-danger-half-rounded-button-disabled': 'rounded-md px-4 py-2 text-sm',
  'default-danger-icon-button-disabled': 'rounded-full p-2 text-lg',
  'default-danger-rounded-button-disabled': 'rounded-full px-4 py-2 text-sm',
  'default-warning-half-rounded-button-disabled':
    'rounded-md px-4 py-2 text-sm',
  'default-warning-icon-button-disabled': 'rounded-full p-2 text-lg',
  'default-warning-rounded-button-disabled': 'rounded-full px-4 py-2 text-sm',
  'large-primary-half-rounded-button-disabled':
    'rounded-md px-4 py-2 text-base bg-neutral-200 text-neutral-400 cursor-not-allowed',
  'large-primary-icon-button-disabled':
    'rounded-full p-2 text-lg bg-neutral-200 text-neutral-400 cursor-not-allowed',
  'large-primary-rounded-button-disabled':
    'rounded-full px-5 py-2 text-base bg-neutral-200 text-neutral-400 cursor-not-allowed',
  'large-secondary-half-rounded-button-disabled':
    'rounded-md px-4 py-2 text-base bg-neutral-100 text-neutral-400 cursor-not-allowed',
  'large-secondary-icon-button-disabled':
    'bg-neutral-100 text-neutral-400 cursor-not-allowed rounded-full p-2 text-lg',
  'large-secondary-rounded-button-disabled':
    'bg-neutral-100 text-neutral-400 cursor-not-allowed rounded-full px-5 py-2 text-base',
  'large-white-half-rounded-button-disabled':
    'rounded-md px-4 py-2 text-base border-neutral-100 text-neutral-400 cursor-not-allowed',
  'large-white-icon-button-disabled':
    'border-neutral-100 text-neutral-400 cursor-not-allowed rounded-full p-2 text-lg',
  'large-white-rounded-button-disabled':
    'border-neutral-100 text-neutral-400 cursor-not-allowed rounded-full px-5 py-2 text-base',
  'large-minimalist-half-rounded-button-disabled':
    'cursor-not-allowed text-base-400 text-base',
  'large-minimalist-icon-button-disabled':
    'text-base cursor-not-allowed text-base-400',
  'large-minimalist-rounded-button-disabled':
    'text-base cursor-not-allowed text-base-400',
  'large-success-half-rounded-button-disabled':
    'rounded-md px-4 py-2 text-base',
  'large-success-icon-button-disabled': 'rounded-full p-2 text-lg',
  'large-success-rounded-button-disabled': 'rounded-full px-5 py-2 text-base',
  'large-danger-half-rounded-button-disabled': 'rounded-md px-4 py-2 text-base',
  'large-danger-icon-button-disabled': 'rounded-full p-2 text-lg',
  'large-danger-rounded-button-disabled': 'rounded-full px-5 py-2 text-base',
  'large-warning-half-rounded-button-disabled':
    'rounded-md px-4 py-2 text-base',
  'large-warning-icon-button-disabled': 'rounded-full p-2 text-lg',
  'large-warning-rounded-button-disabled': 'rounded-full px-5 py-2 text-base',
  'extra-large-primary-half-rounded-button-disabled':
    'rounded-md px-6 py-3 text-base bg-neutral-200 text-neutral-400 cursor-not-allowed',
  'extra-large-primary-icon-button-disabled':
    'rounded-full p-3 text-lg bg-neutral-200 text-neutral-400 cursor-not-allowed',
  'extra-large-primary-rounded-button-disabled':
    'rounded-full px-6 py-3 text-base bg-neutral-200 text-neutral-400 cursor-not-allowed',
  'extra-large-secondary-half-rounded-button-disabled':
    'rounded-md px-6 py-3 text-base bg-neutral-100 text-neutral-400 cursor-not-allowed',
  'extra-large-secondary-icon-button-disabled':
    'bg-neutral-100 text-neutral-400 cursor-not-allowed rounded-full p-3 text-lg',
  'extra-large-secondary-rounded-button-disabled':
    'rounded-full px-6 py-3 text-base bg-neutral-100 text-neutral-400 cursor-not-allowed',
  'extra-large-white-half-rounded-button-disabled':
    'border-neutral-100 text-neutral-400 cursor-not-allowed rounded-md px-6 py-3 text-base',
  'extra-large-white-icon-button-disabled':
    'border-neutral-100 text-neutral-400 cursor-not-allowed rounded-full p-3 text-lg',
  'extra-large-white-rounded-button-disabled':
    'rounded-full px-6 py-3 text-base border-neutral-100 text-neutral-400 cursor-not-allowed',
  'extra-large-minimalist-half-rounded-button-disabled':
    'cursor-not-allowed text-base-400 rounded-md text-base',
  'extra-large-minimalist-icon-button-disabled':
    'cursor-not-allowed text-base-400 rounded-md text-base',
  'extra-large-minimalist-rounded-button-disabled':
    'rounded-md text-base cursor-not-allowed text-base-400',
  'extra-large-success-half-rounded-button-disabled':
    'rounded-md px-6 py-3 text-base',
  'extra-large-success-icon-button-disabled': 'rounded-full p-3 text-lg',
  'extra-large-success-rounded-button-disabled':
    'rounded-full px-6 py-3 text-base',
  'extra-large-danger-half-rounded-button-disabled':
    'rounded-md px-6 py-3 text-base',
  'extra-large-danger-icon-button-disabled': 'rounded-full p-3 text-lg',
  'extra-large-danger-rounded-button-disabled':
    'rounded-full px-6 py-3 text-base',
  'extra-large-warning-half-rounded-button-disabled':
    'rounded-md px-6 py-3 text-base',
  'extra-large-warning-icon-button-disabled': 'rounded-full p-3 text-lg',
  'extra-large-warning-rounded-button-disabled':
    'rounded-full px-6 py-3 text-base',
};
