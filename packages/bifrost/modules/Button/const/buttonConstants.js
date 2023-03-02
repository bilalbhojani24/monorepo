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
    'leading-4 rounded py-1.5 px-2.5 text-xs bg-brand-600 text-white hover:bg-brand-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-small-brand-secondary':
    'leading-4 rounded py-1.5 px-2.5 text-xs bg-brand-100 text-brand-700 hover:bg-brand-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-small-brand-rounded':
    'leading-4 rounded-full py-1.5 px-2.5 text-xs bg-brand-600 text-white hover:bg-brand-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-small-brand-minimal':
    'leading-4  rounded text-xs text-brand-600 hover:text-brand-500 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-small-success-primary':
    'leading-4 rounded py-1.5 px-2.5 text-xs bg-success-600 text-white hover:bg-success-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-small-success-secondary':
    'leading-4 rounded py-1.5 px-2.5 text-xs bg-success-100 text-success-700 hover:bg-success-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-small-success-rounded':
    'leading-4 rounded-full py-1.5 px-2.5 text-xs bg-success-600 text-white hover:bg-success-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-small-danger-primary':
    'leading-4 rounded py-1.5 px-2.5 text-xs bg-danger-600 text-white hover:bg-danger-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-small-danger-secondary':
    'leading-4 rounded py-1.5 px-2.5 text-xs bg-danger-100 text-danger-700 hover:bg-danger-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-small-danger-rounded':
    'leading-4 rounded-full py-1.5 px-2.5 text-xs bg-danger-600 text-white hover:bg-danger-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-small-attention-primary':
    'leading-4 rounded py-1.5 px-2.5 text-xs bg-attention-300 text-attention-900 hover:bg-attention-400 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-small-attention-secondary':
    'leading-4 rounded py-1.5 px-2.5 text-xs bg-attention-100 text-attention-800 hover:bg-attention-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-small-attention-rounded':
    'leading-4 rounded-full py-1.5 px-2.5 text-xs bg-attention-300 text-attention-900 hover:bg-attention-400 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-small-white-primary':
    'leading-4 rounded py-1.5 px-2.5 text-xs bg-white shadow-sm text-base-700 border border-base-300 hover:bg-base-50 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-small-white-rounded':
    'leading-4 rounded-full py-1.5 px-2.5 text-xs bg-white shadow-sm text-base-700 border border-base-300 hover:bg-base-50 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-small-white-minimal':
    'leading-4  text-xs rounded text-base-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 hover:text-base-500',
  'small-brand-primary':
    'leading-4 rounded-md py-1.5 px-3 text-sm bg-brand-600 text-white hover:bg-brand-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'small-brand-secondary':
    'leading-4 rounded-md py-1.5 px-3 text-sm bg-brand-100 text-brand-700 hover:bg-brand-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'small-brand-rounded':
    'leading-4 rounded-full py-1.5 px-3 text-sm bg-brand-600 text-white hover:bg-brand-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'small-brand-minimal':
    'leading-4 text-sm rounded  text-brand-600 hover:text-brand-500 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'small-success-primary':
    'leading-4 rounded-md py-1.5 px-3 text-sm bg-success-600 text-white hover:bg-success-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'small-success-secondary':
    'leading-4 rounded-md py-1.5 px-3 text-sm bg-success-100 text-success-700 hover:bg-success-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'small-success-rounded':
    'leading-4 rounded-full py-1.5 px-3 text-sm bg-success-600 text-white hover:bg-success-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'small-danger-primary':
    'leading-4 rounded-md py-1.5 px-3 text-sm bg-danger-600 text-white hover:bg-danger-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'small-danger-secondary':
    'leading-4 rounded-md py-1.5 px-3 text-sm bg-danger-100 text-danger-700 hover:bg-danger-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'small-danger-rounded':
    'leading-4 rounded-full py-1.5 px-3 text-sm bg-danger-600 text-white hover:bg-danger-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'small-attention-primary':
    'leading-4 rounded-md py-1.5 px-3 text-sm bg-attention-300 text-attention-900 hover:bg-attention-400 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'small-attention-secondary':
    'leading-4 rounded-md py-1.5 px-3 text-sm bg-attention-100 text-attention-800 hover:bg-attention-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'small-attention-rounded':
    'leading-4 rounded-full py-1.5 px-3 text-sm bg-attention-300 text-attention-900 hover:bg-attention-400 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'small-white-primary':
    'leading-4 rounded-md py-1.5 px-3 text-sm bg-white shadow-sm text-base-700 border border-base-300 hover:bg-base-50 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'small-white-rounded':
    'leading-4 rounded-full py-1.5 px-3 text-sm bg-white shadow-sm text-base-700 border border-base-300 hover:bg-base-50 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'small-white-minimal':
    'leading-4 text-sm rounded focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 hover:text-base-500',
  'default-brand-primary':
    'leading-5 text-sm py-2 px-4 rounded-md bg-brand-600 text-white hover:bg-brand-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'default-brand-secondary':
    'leading-5 text-sm py-2 px-4 rounded-md bg-brand-100 text-brand-700 hover:bg-brand-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'default-brand-rounded':
    'leading-5 text-sm py-2 px-4 rounded-full bg-brand-600 text-white hover:bg-brand-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'default-brand-minimal':
    'leading-5 text-sm rounded-md text-brand-600 hover:text-brand-500 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'default-success-primary':
    'leading-5 text-sm py-2 px-4 rounded-md bg-success-600 text-white hover:bg-success-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'default-success-secondary':
    'leading-5 text-sm py-2 px-4 rounded-md bg-success-100 text-success-700 hover:bg-success-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'default-success-rounded':
    'leading-5 text-sm py-2 px-4 rounded-full bg-success-600 text-white hover:bg-success-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'default-danger-primary':
    'leading-5 text-sm py-2 px-4 rounded-md bg-danger-600 text-white hover:bg-danger-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'default-danger-secondary':
    'leading-5 text-sm py-2 px-4 rounded-md bg-danger-100 text-danger-700 hover:bg-danger-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'default-danger-rounded':
    'leading-5 text-sm py-2 px-4 rounded-full bg-danger-600 text-white hover:bg-danger-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'default-attention-primary':
    'leading-5 text-sm py-2 px-4 rounded-md bg-attention-300 text-attention-900 hover:bg-attention-400 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'default-attention-secondary':
    'leading-5 text-sm py-2 px-4 rounded-md bg-attention-100 text-attention-800 hover:bg-attention-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'default-attention-rounded':
    'leading-5 text-sm py-2 px-4 rounded-full bg-attention-300 text-attention-900 hover:bg-attention-400 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'default-white-primary':
    'leading-5 text-sm py-2 px-4 rounded-md bg-white shadow-sm text-base-700 border border-base-300 hover:bg-base-50 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'default-white-rounded':
    'leading-5 text-sm py-2 px-4 rounded-full bg-white shadow-sm text-base-700 border border-base-300 hover:bg-base-50 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'default-white-minimal':
    'leading-5 text-sm rounded-md focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 hover:text-base-500',
  'large-brand-primary':
    'leading-6 text-base py-2 px-4 rounded-md bg-brand-600 text-white hover:bg-brand-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'large-brand-secondary':
    'leading-6 text-base py-2 px-4 rounded-md bg-brand-100 text-brand-700 hover:bg-brand-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'large-brand-rounded':
    'leading-6 text-base py-2 px-4 rounded-full bg-brand-600 text-white hover:bg-brand-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'large-brand-minimal':
    'leading-6 text-base rounded-md text-brand-600 hover:text-brand-500 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'large-success-primary':
    'leading-6 text-base py-2 px-4 rounded-md bg-success-600 text-white hover:bg-success-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'large-success-secondary':
    'leading-6 text-base py-2 px-4 rounded-md bg-success-100 text-success-700 hover:bg-success-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'large-success-rounded':
    'leading-6 text-base py-2 px-4 rounded-full bg-success-600 text-white hover:bg-success-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'large-danger-primary':
    'leading-6 text-base py-2 px-4 rounded-md bg-danger-600 text-white hover:bg-danger-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'large-danger-secondary':
    'leading-6 text-base py-2 px-4 rounded-md bg-danger-100 text-danger-700 hover:bg-danger-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'large-danger-rounded':
    'leading-6 text-base py-2 px-4 rounded-full bg-danger-600 text-white hover:bg-danger-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'large-attention-primary':
    'leading-6 text-base py-2 px-4 rounded-md bg-attention-300 text-attention-900 hover:bg-attention-400 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'large-attention-secondary':
    'leading-6 text-base py-2 px-4 rounded-md bg-attention-100 text-attention-800 hover:bg-attention-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'large-attention-rounded':
    'leading-6 text-base py-2 px-4 rounded-full bg-attention-300 text-attention-900 hover:bg-attention-400 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'large-white-primary':
    'leading-6 text-base py-2 px-4 rounded-md bg-white shadow-sm text-base-700 border border-base-300 hover:bg-base-50 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'large-white-rounded':
    'leading-6 text-base py-2 px-4 rounded-full bg-white shadow-sm text-base-700 border border-base-300 hover:bg-base-50 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'large-white-minimal':
    'leading-6 text-base rounded-md focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 hover:text-base-500',
  'extra-large-brand-primary':
    'leading-6 text-base rounded-md py-3 px-6 bg-brand-600 text-white hover:bg-brand-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-large-brand-secondary':
    'leading-6 text-base rounded-md py-3 px-6 bg-brand-100 text-brand-700 hover:bg-brand-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-large-brand-rounded':
    'leading-6 rounded-full text-base py-3 px-6 bg-brand-600 text-white hover:bg-brand-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-large-brand-minimal':
    'leading-6 text-base rounded-md text-brand-600 hover:text-brand-500 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-large-success-primary':
    'leading-6 text-base rounded-md py-3 px-6 bg-success-600 text-white hover:bg-success-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-large-success-secondary':
    'leading-6 text-base rounded-md py-3 px-6 bg-success-100 text-success-700 hover:bg-success-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-large-success-rounded':
    'leading-6 rounded-full text-base py-3 px-6 bg-success-600 text-white hover:bg-success-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-large-danger-primary':
    'leading-6 text-base rounded-md py-3 px-6 bg-danger-600 text-white hover:bg-danger-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-large-danger-secondary':
    'leading-6 text-base rounded-md py-3 px-6 bg-danger-100 text-danger-700 hover:bg-danger-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-large-danger-rounded':
    'leading-6 rounded-full text-base py-3 px-6 bg-danger-600 text-white hover:bg-danger-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-large-attention-primary':
    'leading-6 text-base rounded-md py-3 px-6 bg-attention-300 text-attention-900 hover:bg-attention-400 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-large-attention-secondary':
    'leading-6 text-base rounded-md py-3 px-6 bg-attention-100 text-attention-800 hover:bg-attention-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-large-attention-rounded':
    'leading-6 rounded-full text-base py-3 px-6 bg-attention-300 text-attention-900 hover:bg-attention-400 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-large-white-primary':
    'leading-6 text-base rounded-md py-3 px-6 bg-white shadow-sm text-base-700 border border-base-300 hover:bg-base-50 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-large-white-rounded':
    'leading-6 rounded-full text-base py-3 px-6 bg-white shadow-sm text-base-700 border border-base-300 hover:bg-base-50 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-large-white-minimal':
    'leading-6 text-base rounded-md focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 hover:text-base-500',

  // disabled states

  'extra-small-brand-primary-disabled':
    'leading-4 rounded py-1.5 px-2.5 text-xs text-brand-200 bg-brand-500 cursor-not-allowed',
  'extra-small-brand-secondary-disabled':
    'leading-4 rounded py-1.5 px-2.5 text-xs bg-brand-50 text-brand-300 cursor-not-allowed',
  'extra-small-brand-rounded-disabled':
    'leading-4 rounded-full py-1.5 px-2.5 text-xs text-brand-200 bg-brand-500 cursor-not-allowed',
  'extra-small-brand-minimal-disabled':
    'leading-4  text-xs text-brand-300 cursor-not-allowed',
  'extra-small-success-primary-disabled':
    'leading-4 rounded py-1.5 px-2.5 text-xs bg-success-500 text-success-200 cursor-not-allowed',
  'extra-small-success-secondary-disabled':
    'leading-4 rounded py-1.5 px-2.5 text-xs bg-success-50 text-success-300 cursor-not-allowed',
  'extra-small-success-rounded-disabled':
    'leading-4 rounded-full py-1.5 px-2.5 text-xs bg-success-500 text-success-200 cursor-not-allowed',
  'extra-small-danger-primary-disabled':
    'leading-4 rounded py-1.5 px-2.5 text-xs bg-danger-500 text-danger-200 cursor-not-allowed',
  'extra-small-danger-secondary-disabled':
    'leading-4 rounded py-1.5 px-2.5 text-xs bg-danger-50 text-danger-300 cursor-not-allowed',
  'extra-small-danger-rounded-disabled':
    'leading-4 rounded-full py-1.5 px-2.5 text-xs bg-danger-500 text-danger-200 cursor-not-allowed',
  'extra-small-attention-primary-disabled':
    'leading-4 rounded py-1.5 px-2.5 text-xs bg-attention-200 text-attention-500 cursor-not-allowed',
  'extra-small-attention-secondary-disabled':
    'leading-4 rounded py-1.5 px-2.5 text-xs bg-attention-50 text-attention-400 cursor-not-allowed',
  'extra-small-attention-rounded-disabled':
    'leading-4 rounded-full py-1.5 px-2.5 text-xs bg-attention-200 text-attention-500 cursor-not-allowed',
  'extra-small-white-primary-disabled':
    'leading-4 rounded py-1.5 px-2.5 text-xs bg-base-200 text-base-500 cursor-not-allowed',
  'extra-small-white-rounded-disabled':
    'leading-4 rounded-full py-1.5 px-2.5 text-xs bg-base-200 text-base-500 cursor-not-allowed',
  'extra-small-white-minimal-disabled':
    'leading-4  text-xs text-base-400 cursor-not-allowed',
  'small-brand-primary-disabled':
    'leading-4 rounded-md py-1.5 px-3 text-sm text-brand-200 bg-brand-500 cursor-not-allowed',
  'small-brand-secondary-disabled':
    'leading-4 rounded-md py-1.5 px-3 text-sm bg-brand-50 text-brand-300 cursor-not-allowed',
  'small-brand-rounded-disabled':
    'leading-4 rounded-full py-1.5 px-3 text-sm text-brand-200 bg-brand-500 cursor-not-allowed',
  'small-brand-minimal-disabled':
    'leading-4 text-sm rounded text-brand-300 cursor-not-allowed',
  'small-success-primary-disabled':
    'leading-4 rounded-md py-1.5 px-3 text-sm bg-success-500 text-success-200 cursor-not-allowed',
  'small-success-secondary-disabled':
    'leading-4 rounded-md py-1.5 px-3 text-sm bg-success-50 text-success-300 cursor-not-allowed',
  'small-success-rounded-disabled':
    'leading-4 rounded-full py-1.5 px-3 text-sm bg-success-500 text-success-200 cursor-not-allowed',
  'small-danger-primary-disabled':
    'leading-4 rounded-md py-1.5 px-3 text-sm bg-danger-500 text-danger-200 cursor-not-allowed',
  'small-danger-secondary-disabled':
    'leading-4 rounded-md py-1.5 px-3 text-sm bg-danger-50 text-danger-300 cursor-not-allowed',
  'small-danger-rounded-disabled':
    'leading-4 rounded-full py-1.5 px-3 text-sm bg-danger-500 text-danger-200 cursor-not-allowed',
  'small-attention-primary-disabled':
    'leading-4 rounded-md py-1.5 px-3 text-sm bg-attention-200 text-attention-500 cursor-not-allowed',
  'small-attention-secondary-disabled':
    'leading-4 rounded-md py-1.5 px-3 text-sm bg-attention-50 text-attention-400 cursor-not-allowed',
  'small-attention-rounded-disabled':
    'leading-4 rounded-full py-1.5 px-3 text-sm bg-attention-200 text-attention-500 cursor-not-allowed',
  'small-white-primary-disabled':
    'leading-4 rounded-md py-1.5 px-3 text-sm bg-base-200 text-base-500 cursor-not-allowed',
  'small-white-rounded-disabled':
    'leading-4 rounded-full py-1.5 px-3 text-sm bg-base-200 text-base-500 cursor-not-allowed',
  'small-white-minimal-disabled':
    'leading-4 text-sm rounded text-base-400 cursor-not-allowed',
  'default-brand-primary-disabled':
    'leading-5 text-sm py-2 px-4 rounded-md text-brand-200 bg-brand-500 cursor-not-allowed',
  'default-brand-secondary-disabled':
    'leading-5 text-sm py-2 px-4 rounded-md bg-brand-50 text-brand-300 cursor-not-allowed',
  'default-brand-rounded-disabled':
    'leading-5 text-sm py-2 px-4 rounded-full text-brand-200 bg-brand-500 cursor-not-allowed',
  'default-brand-minimal-disabled':
    'leading-5 text-sm rounded-md text-brand-300 cursor-not-allowed',
  'default-success-primary-disabled':
    'leading-5 text-sm py-2 px-4 rounded-md bg-success-500 text-success-200 cursor-not-allowed',
  'default-success-secondary-disabled':
    'leading-5 text-sm py-2 px-4 rounded-md bg-success-50 text-success-300 cursor-not-allowed',
  'default-success-rounded-disabled':
    'leading-5 text-sm py-2 px-4 rounded-full bg-success-500 text-success-200 cursor-not-allowed',
  'default-danger-primary-disabled':
    'leading-5 text-sm py-2 px-4 rounded-md bg-danger-500 text-danger-200 cursor-not-allowed',
  'default-danger-secondary-disabled':
    'leading-5 text-sm py-2 px-4 rounded-md bg-danger-50 text-danger-300 cursor-not-allowed',
  'default-danger-rounded-disabled':
    'leading-5 text-sm py-2 px-4 rounded-full bg-danger-500 text-danger-200 cursor-not-allowed',
  'default-attention-primary-disabled':
    'leading-5 text-sm py-2 px-4 rounded-md bg-attention-200 text-attention-500 cursor-not-allowed',
  'default-attention-secondary-disabled':
    'leading-5 text-sm py-2 px-4 rounded-md bg-attention-50 text-attention-400 cursor-not-allowed',
  'default-attention-rounded-disabled':
    'leading-5 text-sm py-2 px-4 rounded-full bg-attention-200 text-attention-500 cursor-not-allowed',
  'default-white-primary-disabled':
    'leading-5 text-sm py-2 px-4 rounded-md bg-base-200 text-base-500 cursor-not-allowed',
  'default-white-rounded-disabled':
    'leading-5 text-sm py-2 px-4 rounded-full bg-base-200 text-base-500 cursor-not-allowed',
  'default-white-minimal-disabled':
    'leading-5 text-sm rounded-md text-base-400 cursor-not-allowed',
  'large-brand-primary-disabled':
    'leading-6 text-base py-2 px-4 rounded-md text-brand-200 bg-brand-500 cursor-not-allowed',
  'large-brand-secondary-disabled':
    'leading-6 text-base py-2 px-4 rounded-md bg-brand-50 text-brand-300 cursor-not-allowed',
  'large-brand-rounded-disabled':
    'leading-6 text-base py-2 px-4 rounded-full text-brand-200 bg-brand-500 cursor-not-allowed',
  'large-brand-minimal-disabled':
    'leading-6 text-base rounded-md text-brand-300 cursor-not-allowed',
  'large-success-primary-disabled':
    'leading-6 text-base py-2 px-4 rounded-md bg-success-500 text-success-200 cursor-not-allowed',
  'large-success-secondary-disabled':
    'leading-6 text-base py-2 px-4 rounded-md bg-success-50 text-success-300 cursor-not-allowed',
  'large-success-rounded-disabled':
    'leading-6 text-base py-2 px-4 rounded-full bg-success-500 text-success-200 cursor-not-allowed',
  'large-danger-primary-disabled':
    'leading-6 text-base py-2 px-4 rounded-md bg-danger-500 text-danger-200 cursor-not-allowed',
  'large-danger-secondary-disabled':
    'leading-6 text-base py-2 px-4 rounded-md bg-danger-50 text-danger-300 cursor-not-allowed',
  'large-danger-rounded-disabled':
    'leading-6 text-base py-2 px-4 rounded-full bg-danger-500 text-danger-200 cursor-not-allowed',
  'large-attention-primary-disabled':
    'leading-6 text-base py-2 px-4 rounded-md bg-attention-200 text-attention-500 cursor-not-allowed',
  'large-attention-secondary-disabled':
    'leading-6 text-base py-2 px-4 rounded-md bg-attention-50 text-attention-400 cursor-not-allowed',
  'large-attention-rounded-disabled':
    'leading-6 text-base py-2 px-4 rounded-full bg-attention-200 text-attention-500 cursor-not-allowed',
  'large-white-primary-disabled':
    'leading-6 text-base py-2 px-4 rounded-md bg-base-200 text-base-500 cursor-not-allowed',
  'large-white-rounded-disabled':
    'leading-6 text-base py-2 px-4 rounded-full bg-base-200 text-base-500 cursor-not-allowed',
  'large-white-minimal-disabled':
    'leading-6 text-base rounded-md text-base-400 cursor-not-allowed',
  'extra-large-brand-primary-disabled':
    'leading-6 text-base rounded-md py-3 px-6 text-brand-200 bg-brand-500 cursor-not-allowed',
  'extra-large-brand-secondary-disabled':
    'leading-6 text-base rounded-md py-3 px-6 bg-brand-50 text-brand-300 cursor-not-allowed',
  'extra-large-brand-rounded-disabled':
    'leading-6 rounded-full text-base py-3 px-6 text-brand-200 bg-brand-500 cursor-not-allowed',
  'extra-large-brand-minimal-disabled':
    'leading-6 text-base rounded-md text-brand-300 cursor-not-allowed',
  'extra-large-success-primary-disabled':
    'leading-6 text-base rounded-md py-3 px-6 bg-success-500 text-success-200 cursor-not-allowed',
  'extra-large-success-secondary-disabled':
    'leading-6 text-base rounded-md py-3 px-6 bg-success-50 text-success-300 cursor-not-allowed',
  'extra-large-success-rounded-disabled':
    'leading-6 rounded-full text-base py-3 px-6 bg-success-500 text-success-200 cursor-not-allowed',
  'extra-large-danger-primary-disabled':
    'leading-6 text-base rounded-md py-3 px-6 bg-danger-500 text-danger-200 cursor-not-allowed',
  'extra-large-danger-secondary-disabled':
    'leading-6 text-base rounded-md py-3 px-6 bg-danger-50 text-danger-300 cursor-not-allowed',
  'extra-large-danger-rounded-disabled':
    'leading-6 rounded-full text-base py-3 px-6 bg-danger-500 text-danger-200 cursor-not-allowed',
  'extra-large-attention-primary-disabled':
    'leading-6 text-base rounded-md py-3 px-6 bg-attention-200 text-attention-500 cursor-not-allowed',
  'extra-large-attention-secondary-disabled':
    'leading-6 text-base rounded-md py-3 px-6 bg-attention-50 text-attention-400 cursor-not-allowed',
  'extra-large-attention-rounded-disabled':
    'leading-6 rounded-full text-base py-3 px-6 bg-attention-200 text-attention-500 cursor-not-allowed',
  'extra-large-white-primary-disabled':
    'leading-6 text-base rounded-md py-3 px-6 bg-base-200 text-base-500 cursor-not-allowed',
  'extra-large-white-rounded-disabled':
    'leading-6 rounded-full text-base py-3 px-6 bg-base-200 text-base-500 cursor-not-allowed',
  'extra-large-white-minimal-disabled':
    'leading-6 text-base rounded-md text-base-400 cursor-not-allowed',

  // loading
  'extra-small-brand-primary-loading':
    'leading-4 rounded py-1.5 px-2.5 text-xs text-white bg-brand-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-small-brand-secondary-loading':
    'leading-4 rounded py-1.5 px-2.5 text-xs text-brand-700 bg-brand-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-small-brand-rounded-loading':
    'leading-4 rounded-full py-1.5 px-2.5 text-xs text-white bg-brand-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-small-success-primary-loading':
    'leading-4 rounded py-1.5 px-2.5 text-xs text-white bg-success-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-small-success-secondary-loading':
    'leading-4 rounded py-1.5 px-2.5 text-xs text-success-700 bg-success-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-small-success-rounded-loading':
    'leading-4 rounded-full py-1.5 px-2.5 text-xs text-white bg-success-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-small-danger-primary-loading':
    'leading-4 rounded py-1.5 px-2.5 text-xs text-white bg-danger-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-small-danger-secondary-loading':
    'leading-4 rounded py-1.5 px-2.5 text-xs text-danger-700 bg-danger-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-small-danger-rounded-loading':
    'leading-4 rounded-full py-1.5 px-2.5 text-xs text-white bg-danger-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-small-attention-primary-loading':
    'leading-4 rounded py-1.5 px-2.5 text-xs text-attention-900 bg-attention-400 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-small-attention-secondary-loading':
    'leading-4 rounded py-1.5 px-2.5 text-xs text-attention-800 bg-attention-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-small-attention-rounded-loading':
    'leading-4 rounded-full py-1.5 px-2.5 text-xs text-attention-900 bg-attention-400 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-small-white-primary-loading':
    'leading-4 rounded py-1.5 px-2.5 text-xs shadow-sm text-base-700 border border-base-300 bg-base-50 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-small-white-rounded-loading':
    'leading-4 rounded-full py-1.5 px-2.5 text-xs shadow-sm text-base-700 border border-base-300 bg-base-50 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'small-brand-primary-loading':
    'leading-4 rounded-md py-1.5 px-3 text-sm text-white bg-brand-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'small-brand-secondary-loading':
    'leading-4 rounded-md py-1.5 px-3 text-sm text-brand-700 bg-brand-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'small-brand-rounded-loading':
    'leading-4 rounded-full py-1.5 px-3 text-sm text-white bg-brand-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'small-success-primary-loading':
    'leading-4 rounded-md py-1.5 px-3 text-sm text-white bg-success-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'small-success-secondary-loading':
    'leading-4 rounded-md py-1.5 px-3 text-sm text-success-700 bg-success-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'small-success-rounded-loading':
    'leading-4 rounded-full py-1.5 px-3 text-sm text-white bg-success-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'small-danger-primary-loading':
    'leading-4 rounded-md py-1.5 px-3 text-sm text-white bg-danger-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'small-danger-secondary-loading':
    'leading-4 rounded-md py-1.5 px-3 text-sm text-danger-700 bg-danger-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'small-danger-rounded-loading':
    'leading-4 rounded-full py-1.5 px-3 text-sm text-white bg-danger-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'small-attention-primary-loading':
    'leading-4 rounded-md py-1.5 px-3 text-sm text-attention-900 bg-attention-400 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'small-attention-secondary-loading':
    'leading-4 rounded-md py-1.5 px-3 text-sm text-attention-800 bg-attention-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'small-attention-rounded-loading':
    'leading-4 rounded-full py-1.5 px-3 text-sm text-attention-900 bg-attention-400 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'small-white-primary-loading':
    'leading-4 rounded-md py-1.5 px-3 text-sm shadow-sm text-base-700 border border-base-300 bg-base-50 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'small-white-rounded-loading':
    'leading-4 rounded-full py-1.5 px-3 text-sm shadow-sm text-base-700 border border-base-300 bg-base-50 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'default-brand-primary-loading':
    'leading-5 text-sm py-2 px-4 rounded-md text-white bg-brand-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'default-brand-secondary-loading':
    'leading-5 text-sm py-2 px-4 rounded-md text-brand-700 bg-brand-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'default-brand-rounded-loading':
    'leading-5 text-sm py-2 px-4 rounded-full text-white bg-brand-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'default-success-primary-loading':
    'leading-5 text-sm py-2 px-4 rounded-md text-white bg-success-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'default-success-secondary-loading':
    'leading-5 text-sm py-2 px-4 rounded-md text-success-700 bg-success-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'default-success-rounded-loading':
    'leading-5 text-sm py-2 px-4 rounded-full text-white bg-success-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'default-danger-primary-loading':
    'leading-5 text-sm py-2 px-4 rounded-md text-white bg-danger-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'default-danger-secondary-loading':
    'leading-5 text-sm py-2 px-4 rounded-md text-danger-700 bg-danger-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'default-danger-rounded-loading':
    'leading-5 text-sm py-2 px-4 rounded-full text-white bg-danger-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'default-attention-primary-loading':
    'leading-5 text-sm py-2 px-4 rounded-md text-attention-900 bg-attention-400 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'default-attention-secondary-loading':
    'leading-5 text-sm py-2 px-4 rounded-md text-attention-800 bg-attention-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'default-attention-rounded-loading':
    'leading-5 text-sm py-2 px-4 rounded-full text-attention-900 bg-attention-400 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'default-white-primary-loading':
    'leading-5 text-sm py-2 px-4 rounded-md shadow-sm text-base-700 border border-base-300 bg-base-50 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'default-white-rounded-loading':
    'leading-5 text-sm py-2 px-4 rounded-full shadow-sm text-base-700 border border-base-300 bg-base-50 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'large-brand-primary-loading':
    'leading-6 text-base py-2 px-4 rounded-md text-white bg-brand-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'large-brand-secondary-loading':
    'leading-6 text-base py-2 px-4 rounded-md text-brand-700 bg-brand-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'large-brand-rounded-loading':
    'leading-6 text-base py-2 px-4 rounded-full text-white bg-brand-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'large-success-primary-loading':
    'leading-6 text-base py-2 px-4 rounded-md text-white bg-success-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'large-success-secondary-loading':
    'leading-6 text-base py-2 px-4 rounded-md text-success-700 bg-success-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'large-success-rounded-loading':
    'leading-6 text-base py-2 px-4 rounded-full text-white bg-success-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'large-danger-primary-loading':
    'leading-6 text-base py-2 px-4 rounded-md text-white bg-danger-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'large-danger-secondary-loading':
    'leading-6 text-base py-2 px-4 rounded-md text-danger-700 bg-danger-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'large-danger-rounded-loading':
    'leading-6 text-base py-2 px-4 rounded-full text-white bg-danger-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'large-attention-primary-loading':
    'leading-6 text-base py-2 px-4 rounded-md text-attention-900 bg-attention-400 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'large-attention-secondary-loading':
    'leading-6 text-base py-2 px-4 rounded-md text-attention-800 bg-attention-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'large-attention-rounded-loading':
    'leading-6 text-base py-2 px-4 rounded-full text-attention-900 bg-attention-400 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'large-white-primary-loading':
    'leading-6 text-base py-2 px-4 rounded-md shadow-sm text-base-700 border border-base-300 bg-base-50 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'large-white-rounded-loading':
    'leading-6 text-base py-2 px-4 rounded-full shadow-sm text-base-700 border border-base-300 bg-base-50 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-large-brand-primary-loading':
    'leading-6 text-base rounded-md py-3 px-6 text-white bg-brand-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-large-brand-secondary-loading':
    'leading-6 text-base rounded-md py-3 px-6 text-brand-700 bg-brand-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-large-brand-rounded-loading':
    'leading-6 rounded-full text-base py-3 px-6 text-white bg-brand-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-large-success-primary-loading':
    'leading-6 text-base rounded-md py-3 px-6 text-white bg-success-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-large-success-secondary-loading':
    'leading-6 text-base rounded-md py-3 px-6 text-success-700 bg-success-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-large-success-rounded-loading':
    'leading-6 rounded-full text-base py-3 px-6 text-white bg-success-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-large-danger-primary-loading':
    'leading-6 text-base rounded-md py-3 px-6 text-white bg-danger-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-large-danger-secondary-loading':
    'leading-6 text-base rounded-md py-3 px-6 text-danger-700 bg-danger-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-large-danger-rounded-loading':
    'leading-6 rounded-full text-base py-3 px-6 text-white bg-danger-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-large-attention-primary-loading':
    'leading-6 text-base rounded-md py-3 px-6 text-attention-900 bg-attention-400 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-large-attention-secondary-loading':
    'leading-6 text-base rounded-md py-3 px-6 text-attention-800 bg-attention-200 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-large-attention-rounded-loading':
    'leading-6 rounded-full text-base py-3 px-6 text-attention-900 bg-attention-400 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-large-white-primary-loading':
    'leading-6 text-base rounded-md py-3 px-6 shadow-sm text-base-700 border border-base-300 bg-base-50 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
  'extra-large-white-rounded-loading':
    'leading-6 rounded-full text-base py-3 px-6 shadow-sm text-base-700 border border-base-300 bg-base-50 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2'
};
