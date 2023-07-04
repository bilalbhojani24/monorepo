export const MODIFIER_CLASSNAMES = {
  simple: {
    activeItemClass: 'bg-base-50 text-brand-600',
    inActiveItemClass: 'text-base-700 hover:bg-base-50 hover:text-brand-600',
    activeIconClass: 'text-brand-600 h-6 w-6',
    inActiveIconClass: 'text-base-400 h-6 w-6 group-hover:text-brand-600'
  },
  brand: {
    activeItemClass:
      'bg-brand-400 rounded-none pl-2 border-l-4 border-brand-700 text-white',
    inActiveItemClass:
      'text-base-700 hover:bg-base-50 hover:text-brand-600 rounded-none pl-4',
    activeIconClass: 'text-white-500 h-6 w-6',
    inActiveIconClass: 'text-base-400 h-6 w-6 group-hover:text-brand-600'
  }
};

export const SIDEBAR_MODIFIER = ['simple', 'brand'];
