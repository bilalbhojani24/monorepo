import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Badge from '../../Badge';
import { BADGE_MODIFIER } from '../../Badge/const/badgeConstants';
import { TAB_SHAPE } from '../const/tabsConstants';

const Tab = ({ tab, isCurrent, isContained, isFullWidth, onTabClick, shape, totalTabs, tabIdx }) => {
  console.log(isContained);
  console.log(isFullWidth);
  console.log(totalTabs);
  return (
    <button
      onClick={(event) => onTabClick(event, tab)}
      key={tab.name}
      value={tab.name}
      className={classNames(
        // contained
        isContained && isCurrent ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700',
        isContained && tabIdx === 0 ? 'rounded-l-lg' : '',
        isContained && tabIdx === totalTabs - 1 ? 'rounded-r-lg' : '',
        isContained
          ? 'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10'
          : '',
        {
          'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300':
            shape === TAB_SHAPE[0] && !isContained,
          'px-3 py-2 font-medium text-sm rounded-md text-gray-500 hover:text-gray-700':
            shape === TAB_SHAPE[1] && !isContained,

          'border-blue-500 text-blue-600': shape === TAB_SHAPE[0] && isCurrent && !isContained,

          'bg-gray-100 text-gray-700': shape === TAB_SHAPE[1] && isCurrent && !isContained,

          [`w-1/${totalTabs} flex justify-center`]: isFullWidth && !isContained,
        }
      )}
      aria-current={isCurrent ? 'page' : undefined}
    >
      {tab.icon && shape === TAB_SHAPE[0] && !isContained && (
        <tab.icon
          className={classNames(isCurrent ? '' : 'group-hover:text-gray-500', '-ml-0.5 mr-2 h-5 w-5')}
          aria-hidden="true"
        />
      )}
      <span>
        {tab.name}
        {isContained && (
          <span
            aria-hidden="true"
            className={classNames(isCurrent ? 'bg-indigo-500' : 'bg-transparent', 'absolute inset-x-0 bottom-0 h-0.5')}
          />
        )}
        {tab.count && shape === TAB_SHAPE[0] && !isContained ? (
          <Badge
            text={tab.count}
            wrapperClassName={'ml-3'}
            modifier={isCurrent ? BADGE_MODIFIER[1] : BADGE_MODIFIER[0]}
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
    count: PropTypes.string,
  }).isRequired,
  shape: PropTypes.string,
  totalTabs: PropTypes.number,
};

Tab.defaultProps = {
  isCurrent: false,
  onTabClick: () => {},
  tab: {},
  shape: TAB_SHAPE[0],
};

export default Tab;
