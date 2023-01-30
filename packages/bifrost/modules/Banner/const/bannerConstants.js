export const BANNER_PLACEMENT = ['top', 'bottom'];
export const BANNER_ALIGN = ['extreme', 'centered'];

export const BANNER_SIZE = [
  'full',
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
  '3xl',
  '4xl',
  '5xl',
  '6xl',
  '7xl'
];

export const BANNER_MODIFIER = ['info', 'success', 'warning', 'error'];

export const classes = {
  info: {
    containerColor: 'bg-brand-600',
    iconBackgroundColor: 'bg-brand-800'
  },
  success: {
    containerColor: 'bg-success-600',
    iconBackgroundColor: 'bg-success-800'
  },
  warning: {
    containerColor: 'bg-attention-300',
    textColor: 'text-attention-900',
    iconBackgroundColor: 'bg-attention-700',
    dismissIconColor: 'text-attention-900'
  },
  error: {
    containerColor: 'bg-danger-600',
    iconBackgroundColor: 'bg-danger-800'
  }
};
