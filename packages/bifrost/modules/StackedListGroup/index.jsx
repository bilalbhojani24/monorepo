import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

const StackedListGroup = ({ heading, children, wrapperClassName }) => (
  <div className={twClassNames(wrapperClassName)}>
    {heading && (
      <strong className="border-base-200 bg-base-50 text-base-500 sticky top-0 z-10 block border-y px-6 py-1 text-sm font-medium">
        {heading}
      </strong>
    )}
    <ul className="divide-base-200 divide-y">{children}</ul>
  </div>
);

StackedListGroup.propTypes = {
  heading: PropTypes.node,
  children: PropTypes.node.isRequired,
  wrapperClassName: PropTypes.string
};
StackedListGroup.defaultProps = {
  heading: null,
  wrapperClassName: ''
};

export default StackedListGroup;
