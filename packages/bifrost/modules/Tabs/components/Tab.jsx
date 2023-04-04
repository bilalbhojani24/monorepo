import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import Badge from '../../Badge';
import { BADGE_MODIFIER } from '../../Badge/const/badgeConstants';
import { TAB_SHAPE } from '../const/tabsConstants';

const effectiveClasses = ({
  isCurrent,
  isContained,
  tabIdx,
  shape,
  totalTabs,
  isFullWidth
}) =>
  twClassNames(
    isContained && isCurrent
      ? 'text-base-900'
      : 'text-base-500 hover:text-base-700',
    isContained && tabIdx === 0 ? 'rounded-l-lg' : '',
    isContained && tabIdx === totalTabs - 1 ? 'rounded-r-lg' : '',
    isContained
      ? 'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-base-50 focus:z-10'
      : '',
    {
      'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex border-transparent text-base-500 hover:text-base-700 hover:border-base-300':
        shape === TAB_SHAPE[0] && !isContained,
      'hover:text-brand-600 hover:border-brand-500':
        shape === TAB_SHAPE[0] && !isContained && isCurrent,
      'px-3 py-2 font-medium text-sm rounded-md text-base-500 hover:text-base-700':
        shape === TAB_SHAPE[1] && !isContained,

      'border-brand-500 text-brand-600':
        shape === TAB_SHAPE[0] && isCurrent && !isContained,

      'bg-base-100 text-base-700':
        shape === TAB_SHAPE[1] && isCurrent && !isContained,

      [`w-1/${totalTabs} flex justify-center`]: isFullWidth && !isContained
    }
  );

const Tab = ({
  tab,
  isCurrent,
  isContained,
  isFullWidth,
  onTabClick,
  shape,
  totalTabs,
  tabIdx
}) => {
  const classNames = effectiveClasses({
    isFullWidth,
    totalTabs,
    tabIdx,
    isContained,
    isCurrent,
    shape
  });

  return (
    <button
      type="button"
      onClick={(event) => onTabClick(event, tab)}
      key={tab.name}
      value={tab.name}
      className={classNames}
      aria-current={isCurrent ? 'page' : undefined}
    >
      {tab.icon && shape === TAB_SHAPE[0] && !isContained && (
        <tab.icon
          className={twClassNames(
            isCurrent ? '' : 'group-hover:text-base-500',
            '-ml-0.5 mr-2 h-5 w-5'
          )}
          aria-hidden="true"
        />
      )}
      <span>
        {tab.name}
        {isContained && (
          <span
            aria-hidden="true"
            className={twClassNames(
              isCurrent ? 'bg-brand-500' : 'bg-transparent',
              'absolute inset-x-0 bottom-0 h-0.5'
            )}
          />
        )}
        {tab.count && shape === TAB_SHAPE[0] && !isContained ? (
          <Badge
            text={tab.count}
            wrapperClassName="ml-3"
            modifier={isCurrent ? BADGE_MODIFIER[1] : BADGE_MODIFIER[0]}
            role="none"
          />
        ) : null}
      </span>
    </button>
  );
};

Tab.propTypes = {
  isCurrent: PropTypes.bool,
  isContained: PropTypes.bool,
  isFullWidth: PropTypes.bool,
  onTabClick: PropTypes.func,
  tab: PropTypes.shape({
    name: PropTypes.string,
    icon: PropTypes.oneOfType([PropTypes.object, PropTypes.node]),
    count: PropTypes.string
  }).isRequired,
  shape: PropTypes.string,
  totalTabs: PropTypes.number,
  tabIdx: PropTypes.number
};

Tab.defaultProps = {
  isCurrent: false,
  onTabClick: () => {},
  shape: TAB_SHAPE[0],
  tabIdx: 0,
  isContained: false,
  isFullWidth: false,
  totalTabs: 0
};

export default Tab;
