import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Badge from '../../Badge';
import { BADGE_MODIFIER } from '../../Badge/const/badgeConstants';

const Tab = ({ tab, isCurrent, onTabClick }) => {
  return (
    <button
      onClick={(event) => onTabClick(event, tab)}
      key={tab.name}
      value={tab.name}
      className={classNames(
        isCurrent
          ? 'border-blue-500 text-blue-600'
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
        'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex'
      )}
      aria-current={isCurrent ? 'page' : undefined}
    >
      {tab.icon && (
        <tab.icon
          className={classNames(
            isCurrent ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500',
            '-ml-0.5 mr-2 h-5 w-5'
          )}
          aria-hidden="true"
        />
      )}
      <span>
        {tab.name}
        {tab.count ? (
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
  onTabClick: PropTypes.func,
  tab: PropTypes.shape({
    name: PropTypes.string,
    icon: PropTypes.oneOfType([PropTypes.object, PropTypes.node]),
    count: PropTypes.string
  }).isRequired
};

Tab.defaultProps = {
  isCurrent: false,
  onTabClick: () => {},
  tab: {}
};

export default Tab;
