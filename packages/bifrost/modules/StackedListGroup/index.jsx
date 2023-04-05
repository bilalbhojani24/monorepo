import React, { isValidElement } from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

const StackedListGroup = ({ heading, children, isCard, wrapperClassName }) => (
  <>
    {heading && (
      <strong className="border-base-200 bg-base-50 text-base-500 sticky top-0 z-10 block border-y px-6 py-1 text-sm font-medium">
        {heading}
      </strong>
    )}
    <ul
      className={twClassNames(
        'divide-base-200 divide-y bg-white',
        {
          'shadow rounded-md': isCard
        },
        wrapperClassName
      )}
    >
      {React.Children.map(children, (child) => {
        if (isValidElement(child))
          return React.cloneElement(child, {
            isCard
          });
        return child;
      })}
    </ul>
  </>
);

StackedListGroup.propTypes = {
  heading: PropTypes.node,
  children: PropTypes.node.isRequired,
  isCard: PropTypes.bool.isRequired,
  wrapperClassName: PropTypes.string
};
StackedListGroup.defaultProps = {
  heading: null,
  wrapperClassName: ''
};

export default StackedListGroup;
