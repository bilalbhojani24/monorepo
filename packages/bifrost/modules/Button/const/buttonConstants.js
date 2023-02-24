/* eslint-disable prettier/prettier */
/* eslint-disable sonarjs/no-duplicate-string */
export const BUTTON_SIZES = [
  'extra-small',
  'small',
  'default',
  'large',
  'extra-large'
];

export const BUTTON_COLORS = [
  'brand',
  'success',
  'attention',
  'danger',
  'white'
];
export const BUTTON_VARIANTS = ['primary', 'secondary', 'rounded', 'minimal'];

export const BUTTON_ICON_PLACEMENT = ['start', 'end'];

export const BUTTON_LOADER_CLASSES = {
  'brand-primary': 'fill-brand-50 text-brand-400',
  'brand-secondary': 'fill-brand-500 text-brand-300',
  'brand-rounded': 'fill-brand-50 text-brand-400',
  'brand-minimal': '',

  'success-primary': 'fill-success-50 text-success-400',
  'success-secondary': 'fill-success-500 text-success-300',
  'success-rounded': 'fill-success-50 text-success-400',
  'success-minimal': '',

  'attention-primary': 'fill-attention-100 text-attention-600',
  'attention-secondary': 'fill-attention-600 text-attention-400',
  'attention-rounded': 'fill-attention-100 text-attention-600',
  'attention-minimal': '',

  'danger-primary': 'fill-danger-50 text-danger-400',
  'danger-secondary': 'fill-danger-300 text-danger-500',
  'danger-rounded': 'fill-danger-50 text-danger-400',
  'danger-minimal': '',

  'white-primary': 'fill-base-400 text-base-300',
  'white-rounded': 'fill-base-400 text-base-300',
  'white-minimal': ''
};

export const BUTTON_STYLE_CLASSES = {
  'extra-small-brand-primary':
    'rounded py-1.5 px-2.5 text-xs bg-brand-600 text-white hover:bg-brand-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-small-brand-secondary':
    'rounded py-1.5 px-2.5 text-xs bg-brand-100 text-brand-700 hover:bg-brand-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-small-brand-rounded':
    'rounded-full py-1.5 px-2.5 text-xs bg-brand-600 text-white hover:bg-brand-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-small-brand-minimal':
    ' rounded text-xs text-brand-600 hover:text-brand-500 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-small-success-primary':
    'rounded py-1.5 px-2.5 text-xs bg-success-600 text-white hover:bg-success-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-small-success-secondary':
    'rounded py-1.5 px-2.5 text-xs bg-success-100 text-success-700 hover:bg-success-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-small-success-rounded':
    'rounded-full py-1.5 px-2.5 text-xs bg-success-600 text-white hover:bg-success-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-small-danger-primary':
    'rounded py-1.5 px-2.5 text-xs bg-danger-600 text-white hover:bg-danger-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-small-danger-secondary':
    'rounded py-1.5 px-2.5 text-xs bg-danger-100 text-danger-700 hover:bg-danger-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-small-danger-rounded':
    'rounded-full py-1.5 px-2.5 text-xs bg-danger-600 text-white hover:bg-danger-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-small-attention-primary':
    'rounded py-1.5 px-2.5 text-xs bg-attention-300 text-attention-900 hover:bg-attention-400 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-small-attention-secondary':
    'rounded py-1.5 px-2.5 text-xs bg-attention-100 text-attention-800 hover:bg-attention-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-small-attention-rounded':
    'rounded-full py-1.5 px-2.5 text-xs bg-attention-300 text-attention-900 hover:bg-attention-400 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-small-white-primary':
    'rounded py-1.5 px-2.5 text-xs bg-white shadow-sm text-base-700 border border-base-300 hover:bg-base-50 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-small-white-rounded':
    'rounded-full py-1.5 px-2.5 text-xs bg-white shadow-sm text-base-700 border border-base-300 hover:bg-base-50 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-small-white-minimal':
    ' text-xs rounded text-base-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 hover:text-base-500',
  'small-brand-primary':
    'rounded-md py-2 px-3 text-sm bg-brand-600 text-white hover:bg-brand-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'small-brand-secondary':
    'rounded-md py-2 px-3 text-sm bg-brand-100 text-brand-700 hover:bg-brand-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'small-brand-rounded':
    'rounded-full py-2 px-3 text-sm bg-brand-600 text-white hover:bg-brand-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'small-brand-minimal':
    'text-sm rounded  text-brand-600 hover:text-brand-500 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'small-success-primary':
    'rounded-md py-2 px-3 text-sm bg-success-600 text-white hover:bg-success-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'small-success-secondary':
    'rounded-md py-2 px-3 text-sm bg-success-100 text-success-700 hover:bg-success-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'small-success-rounded':
    'rounded-full py-2 px-3 text-sm bg-success-600 text-white hover:bg-success-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'small-danger-primary':
    'rounded-md py-2 px-3 text-sm bg-danger-600 text-white hover:bg-danger-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'small-danger-secondary':
    'rounded-md py-2 px-3 text-sm bg-danger-100 text-danger-700 hover:bg-danger-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'small-danger-rounded':
    'rounded-full py-2 px-3 text-sm bg-danger-600 text-white hover:bg-danger-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'small-attention-primary':
    'rounded-md py-2 px-3 text-sm bg-attention-300 text-attention-900 hover:bg-attention-400 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'small-attention-secondary':
    'rounded-md py-2 px-3 text-sm bg-attention-100 text-attention-800 hover:bg-attention-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'small-attention-rounded':
    'rounded-full py-2 px-3 text-sm bg-attention-300 text-attention-900 hover:bg-attention-400 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'small-white-primary':
    'rounded-md py-2 px-3 text-sm bg-white shadow-sm text-base-700 border border-base-300 hover:bg-base-50 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'small-white-rounded':
    'rounded-full py-2 px-3 text-sm bg-white shadow-sm text-base-700 border border-base-300 hover:bg-base-50 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'small-white-minimal':
    'text-sm rounded focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 hover:text-base-500',
  'default-brand-primary':
    'text-sm py-2 px-4 rounded-md bg-brand-600 text-white hover:bg-brand-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'default-brand-secondary':
    'text-sm py-2 px-4 rounded-md bg-brand-100 text-brand-700 hover:bg-brand-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'default-brand-rounded':
    'text-sm py-2 px-4 rounded-full bg-brand-600 text-white hover:bg-brand-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'default-brand-minimal':
    'text-sm rounded-md text-brand-600 hover:text-brand-500 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'default-success-primary':
    'text-sm py-2 px-4 rounded-md bg-success-600 text-white hover:bg-success-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'default-success-secondary':
    'text-sm py-2 px-4 rounded-md bg-success-100 text-success-700 hover:bg-success-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'default-success-rounded':
    'text-sm py-2 px-4 rounded-full bg-success-600 text-white hover:bg-success-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'default-danger-primary':
    'text-sm py-2 px-4 rounded-md bg-danger-600 text-white hover:bg-danger-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'default-danger-secondary':
    'text-sm py-2 px-4 rounded-md bg-danger-100 text-danger-700 hover:bg-danger-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'default-danger-rounded':
    'text-sm py-2 px-4 rounded-full bg-danger-600 text-white hover:bg-danger-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'default-attention-primary':
    'text-sm py-2 px-4 rounded-md bg-attention-300 text-attention-900 hover:bg-attention-400 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'default-attention-secondary':
    'text-sm py-2 px-4 rounded-md bg-attention-100 text-attention-800 hover:bg-attention-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'default-attention-rounded':
    'text-sm py-2 px-4 rounded-full bg-attention-300 text-attention-900 hover:bg-attention-400 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'default-white-primary':
    'text-sm py-2 px-4 rounded-md bg-white shadow-sm text-base-700 border border-base-300 hover:bg-base-50 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'default-white-rounded':
    'text-sm py-2 px-4 rounded-full bg-white shadow-sm text-base-700 border border-base-300 hover:bg-base-50 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'default-white-minimal':
    'text-sm rounded-md focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 hover:text-base-500',
  'large-brand-primary':
    'text-base py-2 px-4 rounded-md bg-brand-600 text-white hover:bg-brand-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'large-brand-secondary':
    'text-base py-2 px-4 rounded-md bg-brand-100 text-brand-700 hover:bg-brand-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'large-brand-rounded':
    'text-base py-2 px-4 rounded-full bg-brand-600 text-white hover:bg-brand-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'large-brand-minimal':
    'text-base rounded-md text-brand-600 hover:text-brand-500 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'large-success-primary':
    'text-base py-2 px-4 rounded-md bg-success-600 text-white hover:bg-success-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'large-success-secondary':
    'text-base py-2 px-4 rounded-md bg-success-100 text-success-700 hover:bg-success-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'large-success-rounded':
    'text-base py-2 px-4 rounded-full bg-success-600 text-white hover:bg-success-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'large-danger-primary':
    'text-base py-2 px-4 rounded-md bg-danger-600 text-white hover:bg-danger-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'large-danger-secondary':
    'text-base py-2 px-4 rounded-md bg-danger-100 text-danger-700 hover:bg-danger-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'large-danger-rounded':
    'text-base py-2 px-4 rounded-full bg-danger-600 text-white hover:bg-danger-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'large-attention-primary':
    'text-base py-2 px-4 rounded-md bg-attention-300 text-attention-900 hover:bg-attention-400 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'large-attention-secondary':
    'text-base py-2 px-4 rounded-md bg-attention-100 text-attention-800 hover:bg-attention-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'large-attention-rounded':
    'text-base py-2 px-4 rounded-full bg-attention-300 text-attention-900 hover:bg-attention-400 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'large-white-primary':
    'text-base py-2 px-4 rounded-md bg-white shadow-sm text-base-700 border border-base-300 hover:bg-base-50 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'large-white-rounded':
    'text-base py-2 px-4 rounded-full bg-white shadow-sm text-base-700 border border-base-300 hover:bg-base-50 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'large-white-minimal':
    'text-base rounded-md focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 hover:text-base-500',
  'extra-large-brand-primary':
    'text-base rounded-md py-4 px-6 bg-brand-600 text-white hover:bg-brand-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-large-brand-secondary':
    'text-base rounded-md py-4 px-6 bg-brand-100 text-brand-700 hover:bg-brand-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-large-brand-rounded':
    'rounded-full text-base py-4 px-6 bg-brand-600 text-white hover:bg-brand-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-large-brand-minimal':
    'text-base rounded-md text-brand-600 hover:text-brand-500 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-large-success-primary':
    'text-base rounded-md py-4 px-6 bg-success-600 text-white hover:bg-success-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-large-success-secondary':
    'text-base rounded-md py-4 px-6 bg-success-100 text-success-700 hover:bg-success-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-large-success-rounded':
    'rounded-full text-base py-4 px-6 bg-success-600 text-white hover:bg-success-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-large-danger-primary':
    'text-base rounded-md py-4 px-6 bg-danger-600 text-white hover:bg-danger-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-large-danger-secondary':
    'text-base rounded-md py-4 px-6 bg-danger-100 text-danger-700 hover:bg-danger-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-large-danger-rounded':
    'rounded-full text-base py-4 px-6 bg-danger-600 text-white hover:bg-danger-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-large-attention-primary':
    'text-base rounded-md py-4 px-6 bg-attention-300 text-attention-900 hover:bg-attention-400 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-large-attention-secondary':
    'text-base rounded-md py-4 px-6 bg-attention-100 text-attention-800 hover:bg-attention-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-large-attention-rounded':
    'rounded-full text-base py-4 px-6 bg-attention-300 text-attention-900 hover:bg-attention-400 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-large-white-primary':
    'text-base rounded-md py-4 px-6 bg-white shadow-sm text-base-700 border border-base-300 hover:bg-base-50 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-large-white-rounded':
    'rounded-full text-base py-4 px-6 bg-white shadow-sm text-base-700 border border-base-300 hover:bg-base-50 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-large-white-minimal':
    'text-base rounded-md focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 hover:text-base-500',

  // disabled states

  'extra-small-brand-primary-disabled':
    'rounded py-1.5 px-2.5 text-xs text-brand-200 bg-brand-500 cursor-not-allowed',
  'extra-small-brand-secondary-disabled':
    'rounded py-1.5 px-2.5 text-xs bg-brand-50 text-brand-300 cursor-not-allowed',
  'extra-small-brand-rounded-disabled':
    'rounded-full py-1.5 px-2.5 text-xs text-brand-200 bg-brand-500 cursor-not-allowed',
  'extra-small-brand-minimal-disabled':
    ' text-xs text-brand-300 cursor-not-allowed',
  'extra-small-success-primary-disabled':
    'rounded py-1.5 px-2.5 text-xs bg-success-500 text-success-200 cursor-not-allowed',
  'extra-small-success-secondary-disabled':
    'rounded py-1.5 px-2.5 text-xs bg-success-50 text-success-300 cursor-not-allowed',
  'extra-small-success-rounded-disabled':
    'rounded-full py-1.5 px-2.5 text-xs bg-success-500 text-success-200 cursor-not-allowed',
  'extra-small-danger-primary-disabled':
    'rounded py-1.5 px-2.5 text-xs bg-danger-500 text-danger-200 cursor-not-allowed',
  'extra-small-danger-secondary-disabled':
    'rounded py-1.5 px-2.5 text-xs bg-danger-50 text-danger-300 cursor-not-allowed',
  'extra-small-danger-rounded-disabled':
    'rounded-full py-1.5 px-2.5 text-xs bg-danger-500 text-danger-200 cursor-not-allowed',
  'extra-small-attention-primary-disabled':
    'rounded py-1.5 px-2.5 text-xs bg-attention-200 text-attention-500 cursor-not-allowed',
  'extra-small-attention-secondary-disabled':
    'rounded py-1.5 px-2.5 text-xs bg-attention-50 text-attention-400 cursor-not-allowed',
  'extra-small-attention-rounded-disabled':
    'rounded-full py-1.5 px-2.5 text-xs bg-attention-200 text-attention-500 cursor-not-allowed',
  'extra-small-white-primary-disabled':
    'rounded py-1.5 px-2.5 text-xs bg-base-200 text-base-500 cursor-not-allowed',
  'extra-small-white-rounded-disabled':
    'rounded-full py-1.5 px-2.5 text-xs bg-base-200 text-base-500 cursor-not-allowed',
  'extra-small-white-minimal-disabled':
    ' text-xs text-base-400 cursor-not-allowed',
  'small-brand-primary-disabled':
    'rounded-md py-2 px-3 text-sm text-brand-200 bg-brand-500 cursor-not-allowed',
  'small-brand-secondary-disabled':
    'rounded-md py-2 px-3 text-sm bg-brand-50 text-brand-300 cursor-not-allowed',
  'small-brand-rounded-disabled':
    'rounded-full py-2 px-3 text-sm text-brand-200 bg-brand-500 cursor-not-allowed',
  'small-brand-minimal-disabled':
    'text-sm rounded text-brand-300 cursor-not-allowed',
  'small-success-primary-disabled':
    'rounded-md py-2 px-3 text-sm bg-success-500 text-success-200 cursor-not-allowed',
  'small-success-secondary-disabled':
    'rounded-md py-2 px-3 text-sm bg-success-50 text-success-300 cursor-not-allowed',
  'small-success-rounded-disabled':
    'rounded-full py-2 px-3 text-sm bg-success-500 text-success-200 cursor-not-allowed',
  'small-danger-primary-disabled':
    'rounded-md py-2 px-3 text-sm bg-danger-500 text-danger-200 cursor-not-allowed',
  'small-danger-secondary-disabled':
    'rounded-md py-2 px-3 text-sm bg-danger-50 text-danger-300 cursor-not-allowed',
  'small-danger-rounded-disabled':
    'rounded-full py-2 px-3 text-sm bg-danger-500 text-danger-200 cursor-not-allowed',
  'small-attention-primary-disabled':
    'rounded-md py-2 px-3 text-sm bg-attention-200 text-attention-500 cursor-not-allowed',
  'small-attention-secondary-disabled':
    'rounded-md py-2 px-3 text-sm bg-attention-50 text-attention-400 cursor-not-allowed',
  'small-attention-rounded-disabled':
    'rounded-full py-2 px-3 text-sm bg-attention-200 text-attention-500 cursor-not-allowed',
  'small-white-primary-disabled':
    'rounded-md py-2 px-3 text-sm bg-base-200 text-base-500 cursor-not-allowed',
  'small-white-rounded-disabled':
    'rounded-full py-2 px-3 text-sm bg-base-200 text-base-500 cursor-not-allowed',
  'small-white-minimal-disabled':
    'text-sm rounded text-base-400 cursor-not-allowed',
  'default-brand-primary-disabled':
    'text-sm py-2 px-4 rounded-md text-brand-200 bg-brand-500 cursor-not-allowed',
  'default-brand-secondary-disabled':
    'text-sm py-2 px-4 rounded-md bg-brand-50 text-brand-300 cursor-not-allowed',
  'default-brand-rounded-disabled':
    'text-sm py-2 px-4 rounded-full text-brand-200 bg-brand-500 cursor-not-allowed',
  'default-brand-minimal-disabled':
    'text-sm rounded-md text-brand-300 cursor-not-allowed',
  'default-success-primary-disabled':
    'text-sm py-2 px-4 rounded-md bg-success-500 text-success-200 cursor-not-allowed',
  'default-success-secondary-disabled':
    'text-sm py-2 px-4 rounded-md bg-success-50 text-success-300 cursor-not-allowed',
  'default-success-rounded-disabled':
    'text-sm py-2 px-4 rounded-full bg-success-500 text-success-200 cursor-not-allowed',
  'default-danger-primary-disabled':
    'text-sm py-2 px-4 rounded-md bg-danger-500 text-danger-200 cursor-not-allowed',
  'default-danger-secondary-disabled':
    'text-sm py-2 px-4 rounded-md bg-danger-50 text-danger-300 cursor-not-allowed',
  'default-danger-rounded-disabled':
    'text-sm py-2 px-4 rounded-full bg-danger-500 text-danger-200 cursor-not-allowed',
  'default-attention-primary-disabled':
    'text-sm py-2 px-4 rounded-md bg-attention-200 text-attention-500 cursor-not-allowed',
  'default-attention-secondary-disabled':
    'text-sm py-2 px-4 rounded-md bg-attention-50 text-attention-400 cursor-not-allowed',
  'default-attention-rounded-disabled':
    'text-sm py-2 px-4 rounded-full bg-attention-200 text-attention-500 cursor-not-allowed',
  'default-white-primary-disabled':
    'text-sm py-2 px-4 rounded-md bg-base-200 text-base-500 cursor-not-allowed',
  'default-white-rounded-disabled':
    'text-sm py-2 px-4 rounded-full bg-base-200 text-base-500 cursor-not-allowed',
  'default-white-minimal-disabled':
    'text-sm rounded-md text-base-400 cursor-not-allowed',
  'large-brand-primary-disabled':
    'text-base py-2 px-4 rounded-md text-brand-200 bg-brand-500 cursor-not-allowed',
  'large-brand-secondary-disabled':
    'text-base py-2 px-4 rounded-md bg-brand-50 text-brand-300 cursor-not-allowed',
  'large-brand-rounded-disabled':
    'text-base py-2 px-4 rounded-full text-brand-200 bg-brand-500 cursor-not-allowed',
  'large-brand-minimal-disabled':
    'text-base rounded-md text-brand-300 cursor-not-allowed',
  'large-success-primary-disabled':
    'text-base py-2 px-4 rounded-md bg-success-500 text-success-200 cursor-not-allowed',
  'large-success-secondary-disabled':
    'text-base py-2 px-4 rounded-md bg-success-50 text-success-300 cursor-not-allowed',
  'large-success-rounded-disabled':
    'text-base py-2 px-4 rounded-full bg-success-500 text-success-200 cursor-not-allowed',
  'large-danger-primary-disabled':
    'text-base py-2 px-4 rounded-md bg-danger-500 text-danger-200 cursor-not-allowed',
  'large-danger-secondary-disabled':
    'text-base py-2 px-4 rounded-md bg-danger-50 text-danger-300 cursor-not-allowed',
  'large-danger-rounded-disabled':
    'text-base py-2 px-4 rounded-full bg-danger-500 text-danger-200 cursor-not-allowed',
  'large-attention-primary-disabled':
    'text-base py-2 px-4 rounded-md bg-attention-200 text-attention-500 cursor-not-allowed',
  'large-attention-secondary-disabled':
    'text-base py-2 px-4 rounded-md bg-attention-50 text-attention-400 cursor-not-allowed',
  'large-attention-rounded-disabled':
    'text-base py-2 px-4 rounded-full bg-attention-200 text-attention-500 cursor-not-allowed',
  'large-white-primary-disabled':
    'text-base py-2 px-4 rounded-md bg-base-200 text-base-500 cursor-not-allowed',
  'large-white-rounded-disabled':
    'text-base py-2 px-4 rounded-full bg-base-200 text-base-500 cursor-not-allowed',
  'large-white-minimal-disabled':
    'text-base rounded-md text-base-400 cursor-not-allowed',
  'extra-large-brand-primary-disabled':
    'text-base rounded-md py-4 px-6 text-brand-200 bg-brand-500 cursor-not-allowed',
  'extra-large-brand-secondary-disabled':
    'text-base rounded-md py-4 px-6 bg-brand-50 text-brand-300 cursor-not-allowed',
  'extra-large-brand-rounded-disabled':
    'rounded-full text-base py-4 px-6 text-brand-200 bg-brand-500 cursor-not-allowed',
  'extra-large-brand-minimal-disabled':
    'text-base rounded-md text-brand-300 cursor-not-allowed',
  'extra-large-success-primary-disabled':
    'text-base rounded-md py-4 px-6 bg-success-500 text-success-200 cursor-not-allowed',
  'extra-large-success-secondary-disabled':
    'text-base rounded-md py-4 px-6 bg-success-50 text-success-300 cursor-not-allowed',
  'extra-large-success-rounded-disabled':
    'rounded-full text-base py-4 px-6 bg-success-500 text-success-200 cursor-not-allowed',
  'extra-large-danger-primary-disabled':
    'text-base rounded-md py-4 px-6 bg-danger-500 text-danger-200 cursor-not-allowed',
  'extra-large-danger-secondary-disabled':
    'text-base rounded-md py-4 px-6 bg-danger-50 text-danger-300 cursor-not-allowed',
  'extra-large-danger-rounded-disabled':
    'rounded-full text-base py-4 px-6 bg-danger-500 text-danger-200 cursor-not-allowed',
  'extra-large-attention-primary-disabled':
    'text-base rounded-md py-4 px-6 bg-attention-200 text-attention-500 cursor-not-allowed',
  'extra-large-attention-secondary-disabled':
    'text-base rounded-md py-4 px-6 bg-attention-50 text-attention-400 cursor-not-allowed',
  'extra-large-attention-rounded-disabled':
    'rounded-full text-base py-4 px-6 bg-attention-200 text-attention-500 cursor-not-allowed',
  'extra-large-white-primary-disabled':
    'text-base rounded-md py-4 px-6 bg-base-200 text-base-500 cursor-not-allowed',
  'extra-large-white-rounded-disabled':
    'rounded-full text-base py-4 px-6 bg-base-200 text-base-500 cursor-not-allowed',
  'extra-large-white-minimal-disabled':
    'text-base rounded-md text-base-400 cursor-not-allowed',

  // loading
  'extra-small-brand-primary-loading':
    'rounded py-1.5 px-2.5 text-xs text-white bg-brand-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-small-brand-secondary-loading':
    'rounded py-1.5 px-2.5 text-xs text-brand-700 bg-brand-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-small-brand-rounded-loading':
    'rounded-full py-1.5 px-2.5 text-xs text-white bg-brand-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-small-success-primary-loading':
    'rounded py-1.5 px-2.5 text-xs text-white bg-success-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-small-success-secondary-loading':
    'rounded py-1.5 px-2.5 text-xs text-success-700 bg-success-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-small-success-rounded-loading':
    'rounded-full py-1.5 px-2.5 text-xs text-white bg-success-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-small-danger-primary-loading':
    'rounded py-1.5 px-2.5 text-xs text-white bg-danger-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-small-danger-secondary-loading':
    'rounded py-1.5 px-2.5 text-xs text-danger-700 bg-danger-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-small-danger-rounded-loading':
    'rounded-full py-1.5 px-2.5 text-xs text-white bg-danger-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-small-attention-primary-loading':
    'rounded py-1.5 px-2.5 text-xs text-attention-900 bg-attention-400 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-small-attention-secondary-loading':
    'rounded py-1.5 px-2.5 text-xs text-attention-800 bg-attention-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-small-attention-rounded-loading':
    'rounded-full py-1.5 px-2.5 text-xs text-attention-900 bg-attention-400 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-small-white-primary-loading':
    'rounded py-1.5 px-2.5 text-xs shadow-sm text-base-700 border border-base-300 bg-base-50 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-small-white-rounded-loading':
    'rounded-full py-1.5 px-2.5 text-xs shadow-sm text-base-700 border border-base-300 bg-base-50 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'small-brand-primary-loading':
    'rounded-md py-2 px-3 text-sm text-white bg-brand-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'small-brand-secondary-loading':
    'rounded-md py-2 px-3 text-sm text-brand-700 bg-brand-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'small-brand-rounded-loading':
    'rounded-full py-2 px-3 text-sm text-white bg-brand-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'small-success-primary-loading':
    'rounded-md py-2 px-3 text-sm text-white bg-success-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'small-success-secondary-loading':
    'rounded-md py-2 px-3 text-sm text-success-700 bg-success-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'small-success-rounded-loading':
    'rounded-full py-2 px-3 text-sm text-white bg-success-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'small-danger-primary-loading':
    'rounded-md py-2 px-3 text-sm text-white bg-danger-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'small-danger-secondary-loading':
    'rounded-md py-2 px-3 text-sm text-danger-700 bg-danger-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'small-danger-rounded-loading':
    'rounded-full py-2 px-3 text-sm text-white bg-danger-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'small-attention-primary-loading':
    'rounded-md py-2 px-3 text-sm text-attention-900 bg-attention-400 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'small-attention-secondary-loading':
    'rounded-md py-2 px-3 text-sm text-attention-800 bg-attention-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'small-attention-rounded-loading':
    'rounded-full py-2 px-3 text-sm text-attention-900 bg-attention-400 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'small-white-primary-loading':
    'rounded-md py-2 px-3 text-sm shadow-sm text-base-700 border border-base-300 bg-base-50 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'small-white-rounded-loading':
    'rounded-full py-2 px-3 text-sm shadow-sm text-base-700 border border-base-300 bg-base-50 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'default-brand-primary-loading':
    'text-sm py-2 px-4 rounded-md text-white bg-brand-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'default-brand-secondary-loading':
    'text-sm py-2 px-4 rounded-md text-brand-700 bg-brand-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'default-brand-rounded-loading':
    'text-sm py-2 px-4 rounded-full text-white bg-brand-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'default-success-primary-loading':
    'text-sm py-2 px-4 rounded-md text-white bg-success-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'default-success-secondary-loading':
    'text-sm py-2 px-4 rounded-md text-success-700 bg-success-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'default-success-rounded-loading':
    'text-sm py-2 px-4 rounded-full text-white bg-success-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'default-danger-primary-loading':
    'text-sm py-2 px-4 rounded-md text-white bg-danger-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'default-danger-secondary-loading':
    'text-sm py-2 px-4 rounded-md text-danger-700 bg-danger-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'default-danger-rounded-loading':
    'text-sm py-2 px-4 rounded-full text-white bg-danger-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'default-attention-primary-loading':
    'text-sm py-2 px-4 rounded-md text-attention-900 bg-attention-400 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'default-attention-secondary-loading':
    'text-sm py-2 px-4 rounded-md text-attention-800 bg-attention-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'default-attention-rounded-loading':
    'text-sm py-2 px-4 rounded-full text-attention-900 bg-attention-400 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'default-white-primary-loading':
    'text-sm py-2 px-4 rounded-md shadow-sm text-base-700 border border-base-300 bg-base-50 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'default-white-rounded-loading':
    'text-sm py-2 px-4 rounded-full shadow-sm text-base-700 border border-base-300 bg-base-50 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'large-brand-primary-loading':
    'text-base py-2 px-4 rounded-md text-white bg-brand-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'large-brand-secondary-loading':
    'text-base py-2 px-4 rounded-md text-brand-700 bg-brand-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'large-brand-rounded-loading':
    'text-base py-2 px-4 rounded-full text-white bg-brand-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'large-success-primary-loading':
    'text-base py-2 px-4 rounded-md text-white bg-success-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'large-success-secondary-loading':
    'text-base py-2 px-4 rounded-md text-success-700 bg-success-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'large-success-rounded-loading':
    'text-base py-2 px-4 rounded-full text-white bg-success-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'large-danger-primary-loading':
    'text-base py-2 px-4 rounded-md text-white bg-danger-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'large-danger-secondary-loading':
    'text-base py-2 px-4 rounded-md text-danger-700 bg-danger-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'large-danger-rounded-loading':
    'text-base py-2 px-4 rounded-full text-white bg-danger-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'large-attention-primary-loading':
    'text-base py-2 px-4 rounded-md text-attention-900 bg-attention-400 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'large-attention-secondary-loading':
    'text-base py-2 px-4 rounded-md text-attention-800 bg-attention-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'large-attention-rounded-loading':
    'text-base py-2 px-4 rounded-full text-attention-900 bg-attention-400 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'large-white-primary-loading':
    'text-base py-2 px-4 rounded-md shadow-sm text-base-700 border border-base-300 bg-base-50 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'large-white-rounded-loading':
    'text-base py-2 px-4 rounded-full shadow-sm text-base-700 border border-base-300 bg-base-50 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-large-brand-primary-loading':
    'text-base rounded-md py-4 px-6 text-white bg-brand-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-large-brand-secondary-loading':
    'text-base rounded-md py-4 px-6 text-brand-700 bg-brand-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-large-brand-rounded-loading':
    'rounded-full text-base py-4 px-6 text-white bg-brand-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-large-success-primary-loading':
    'text-base rounded-md py-4 px-6 text-white bg-success-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-large-success-secondary-loading':
    'text-base rounded-md py-4 px-6 text-success-700 bg-success-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-large-success-rounded-loading':
    'rounded-full text-base py-4 px-6 text-white bg-success-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-large-danger-primary-loading':
    'text-base rounded-md py-4 px-6 text-white bg-danger-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-large-danger-secondary-loading':
    'text-base rounded-md py-4 px-6 text-danger-700 bg-danger-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-large-danger-rounded-loading':
    'rounded-full text-base py-4 px-6 text-white bg-danger-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-large-attention-primary-loading':
    'text-base rounded-md py-4 px-6 text-attention-900 bg-attention-400 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-large-attention-secondary-loading':
    'text-base rounded-md py-4 px-6 text-attention-800 bg-attention-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-large-attention-rounded-loading':
    'rounded-full text-base py-4 px-6 text-attention-900 bg-attention-400 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-large-white-primary-loading':
    'text-base rounded-md py-4 px-6 shadow-sm text-base-700 border border-base-300 bg-base-50 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-large-white-rounded-loading':
    'rounded-full text-base py-4 px-6 shadow-sm text-base-700 border border-base-300 bg-base-50 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2'
};
