import React, { isValidElement } from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

const DescriptionList = ({ children, isCard, wrapperClassName }) => (
  <div
    className={twClassNames(
      'overflow-hidden bg-white',
      {
        'shadow sm:rounded-lg': isCard
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
  </div>
);

DescriptionList.propTypes = {
  children: PropTypes.node,
  isCard: PropTypes.bool,
  wrapperClassName: PropTypes.string
};
DescriptionList.defaultProps = {
  children: null,
  isCard: true,
  wrapperClassName: ''
};

export default DescriptionList;
