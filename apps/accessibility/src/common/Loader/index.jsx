import React from 'react';
import { twClassNames } from '@browserstack/utils';
import LoaderImage from 'assets/blue-spinner.svg';
import PropTypes from 'prop-types';

export default function Loader({ wrapperClassName }) {
  return (
    <div
      className={twClassNames(
        'flex h-screen items-center justify-center',
        wrapperClassName
      )}
    >
      <img src={LoaderImage} alt="loading" />
    </div>
  );
}

Loader.propTypes = {
  wrapperClassName: PropTypes.string
};

Loader.defaultProps = {
  wrapperClassName: ''
};
