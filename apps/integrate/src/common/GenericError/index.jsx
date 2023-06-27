import React from 'react';
import { MdWarning } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import { INTGButton } from '../bifrostProxy';

const ErrorWithTryAgain = ({
  wrapperClassName,
  errorMessage,
  handleTryAgain
}) => {
  const isTryAgainHandlerProvided = typeof handleTryAgain === 'function';

  return (
    <div
      className={twClassNames(
        'py-6 flex h-full flex-col items-center text-base-500 justify-center',
        wrapperClassName
      )}
    >
      <MdWarning className="text-3xl" />
      <p className="mb-4 pt-5">{errorMessage}</p>
      {isTryAgainHandlerProvided && (
        <INTGButton
          colors="white"
          onClick={handleTryAgain}
          wrapperClassName="text-base-500"
          size="extra-small"
        >
          Try again
        </INTGButton>
      )}
    </div>
  );
};

ErrorWithTryAgain.propTypes = {
  wrapperClassName: PropTypes.string,
  errorMessage: PropTypes.string,
  handleTryAgain: PropTypes.func
};

ErrorWithTryAgain.defaultProps = {
  wrapperClassName: '',
  errorMessage: 'Error loading details',
  handleTryAgain: null
};
export default ErrorWithTryAgain;
