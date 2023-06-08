import React from 'react';
import { Loader } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

const INTGLoader = ({ wrapperClassName }) => (
  <div
    className={twClassNames(
      'flex items-center justify-center',
      wrapperClassName
    )}
  >
    <Loader
      wrapperClassName="mx-auto fill-base-500 text-base-300"
      height="h-8"
      width="h-8"
    />
  </div>
);
INTGLoader.propTypes = {
  wrapperClassName: PropTypes.string
};
INTGLoader.defaultProps = {
  wrapperClassName: ''
};

export default INTGLoader;
