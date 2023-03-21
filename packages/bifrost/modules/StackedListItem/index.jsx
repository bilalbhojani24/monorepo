import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

const StackedListItem = ({
  variant,
  actions,
  children,
  hideContentInSmallWidth
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
        'relative px-4 py-4 sm:px-6 flex items-center truncate',
        {
          'px-6 hover:bg-base-50 cursor-pointer rounded-md': variant === 'card'
        }
      )}
    >
      <span className=" block  max-w-full flex-1 justify-between gap-3 md:flex ">
        {effectiveChildren}
      </span>
      {actions && <div className="shrink-0 pl-3">{actions}</div>}
    </li>
  );
};

StackedListItem.propTypes = {
  variant: PropTypes.oneOf(['subtle', 'card']),
  actions: PropTypes.node,
  children: PropTypes.node.isRequired,
  hideContentInSmallWidth: PropTypes.bool
};
StackedListItem.defaultProps = {
  variant: 'subtle',
  actions: null,
  hideContentInSmallWidth: false
};

export default StackedListItem;
