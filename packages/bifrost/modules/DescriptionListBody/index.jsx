import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

const DescriptionListBody = ({
  children,
  dataListClassName,
  wrapperClassName
}) => (
  <div
    className={twClassNames(
      'border-base-200 border-t px-4 py-5 sm:p-0',
      wrapperClassName
    )}
  >
    <dl
      className={twClassNames(
        'sm:divide-base-200 sm:divide-y',
        dataListClassName
      )}
    >
      {children}
    </dl>
  </div>
);

DescriptionListBody.propTypes = {
  children: PropTypes.node,
  dataListClassName: PropTypes.string,
  wrapperClassName: PropTypes.string
};
DescriptionListBody.defaultProps = {
  children: null,
  dataListClassName: '',
  wrapperClassName: ''
};

export default DescriptionListBody;
