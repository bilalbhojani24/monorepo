export const MODIFIER_CLASSNAMES = {
  simple: {
    activeItemClass: 'bg-base-100 text-base-600',
    inActiveItemClass: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
    activeIconClass: 'text-base-500 h-6 w-6',
    inActiveIconClass: 'text-base-400 h-6 w-6 group-hover:text-base-500'
  },
  brand: {
    activeItemClass:
      'bg-brand-400 text-base-600 rounded-none pl-2 border-l-4 border-brand-700 text-white',
    inActiveItemClass:
      'text-base-600 hover:bg-base-50 hover:text-base-900 rounded-none pl-4',
    activeIconClass: 'text-white-500 h-6 w-6',
    inActiveIconClass: 'text-base-400 h-6 w-6 group-hover:text-base-500'
  }
};

export const SIDEBAR_MODIFIER = ['simple', 'brand'];
