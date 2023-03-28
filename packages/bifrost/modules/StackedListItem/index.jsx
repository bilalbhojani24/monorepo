import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

const StackedListItem = ({
  isCard,
  actions,
  children,
  focusParentOnChildFocused,
  hideContentInSmallWidth,
  wrapperClassName
}) => {
  const effectiveChildren =
    children.length > 1
      ? children.map((child, index) => {
          if (index !== 0) {
            if (hideContentInSmallWidth) {
              return <span className="hidden grow md:inline">{child}</span>;
            }
            return <span className="mt-3 block grow md:mt-0">{child}</span>;
          }
          return child;
        })
      : children;
  return (
    <li
      className={twClassNames(
        'relative px-4 py-5 sm:px-6 flex items-center truncate',
        {
          'px-6 hover:bg-base-50 cursor-pointer': isCard,
          'focus-within:ring-2 focus-within:ring-inset focus-within:ring-brand-500 cursor-pointer hover:bg-base-50':
            focusParentOnChildFocused
        },
        wrapperClassName
      )}
    >
      <span className="block max-w-full flex-1 justify-between gap-3 md:flex ">
        {effectiveChildren}
      </span>
      {actions && <div className="shrink-0 pl-3">{actions}</div>}
    </li>
  );
};

StackedListItem.propTypes = {
  actions: PropTypes.node,
  children: PropTypes.node.isRequired,
  focusParentOnChildFocused: PropTypes.bool,
  isCard: PropTypes.bool.isRequired,
  hideContentInSmallWidth: PropTypes.bool,
  wrapperClassName: PropTypes.string
};
StackedListItem.defaultProps = {
  actions: null,
  focusParentOnChildFocused: false,
  hideContentInSmallWidth: false,
  wrapperClassName: ''
};

export default StackedListItem;
