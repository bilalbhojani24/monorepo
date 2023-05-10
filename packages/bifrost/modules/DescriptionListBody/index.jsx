import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

const DescriptionListBody = ({ children, wrapperClassName, isCard }) => (
  <div
    className={twClassNames(
      'border-base-200 border-t',
      {
        'px-6 py-5': isCard,
        'p-0 mt-5': !isCard
      },
      wrapperClassName
    )}
  >
    {children}
  </div>
);

DescriptionListBody.propTypes = {
  children: PropTypes.node,
  isCard: PropTypes.bool.isRequired,
  wrapperClassName: PropTypes.string
};
DescriptionListBody.defaultProps = {
  children: null,
  wrapperClassName: ''
};

export default DescriptionListBody;
