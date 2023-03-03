import React from 'react';
import { Loader } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

const O11yLoader = ({
  isOverlayed,
  wrapperClassName,
  loaderClass,
  text,
  textClass
}) => (
  <div
    className={twClassNames(
      'flex justify-center items-center w-full min-h-min gap-2',
      wrapperClassName,
      {
        'absolute left-0 top-0': isOverlayed
      }
    )}
  >
    <Loader wrapperStyle={loaderClass} />
    {text && <p className={twClassNames('text-lg', textClass)}>{text}</p>}
  </div>
);

O11yLoader.propTypes = {
  wrapperClassName: PropTypes.string,
  isOverlayed: PropTypes.bool,
  loaderClass: PropTypes.string,
  text: PropTypes.string,
  textClass: PropTypes.string
};

O11yLoader.defaultProps = {
  wrapperClassName: '',
  isOverlayed: false,
  loaderClass: '',
  text: '',
  textClass: ''
};

export default O11yLoader;
