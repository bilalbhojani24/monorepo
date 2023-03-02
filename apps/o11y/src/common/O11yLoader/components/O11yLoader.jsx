import React from 'react';
import { Loader } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

const O11yLoader = ({ isOverlayed, wrapperClassName, loaderClass }) => (
  <div
    className={twClassNames(
      'flex justify-center items-center  w-full min-h-min',
      wrapperClassName,
      {
        'absolute left-0 top-0': isOverlayed
      }
    )}
  >
    <Loader wrapperStyle={loaderClass} />
  </div>
);

O11yLoader.propTypes = {
  wrapperClassName: PropTypes.string,
  isOverlayed: PropTypes.bool,
  loaderClass: PropTypes.string
};

O11yLoader.defaultProps = {
  wrapperClassName: '',
  isOverlayed: false,
  loaderClass: ''
};

export default O11yLoader;
