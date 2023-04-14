import React from 'react';
import { Button, MdWarning } from '@browserstack/bifrost';
import PropTypes from 'prop-types';

import { GENERIC_ERROR_MESSAGE } from '../../constants';

const ErrorWithTryAgain = ({
  className,
  errorMessage = GENERIC_ERROR_MESSAGE,
  handleTryAgain
}) => {
  const isTryAgainHandlerProvided = typeof handleTryAgain === 'function';

  return (
    <div
      className={'py-6 flex h-full flex-col items-center text-base-500 justify-center '.concat(
        className
      )}
    >
      <MdWarning className="text-3xl" />
      <p className="mb-4 pt-5">{errorMessage}</p>
      {isTryAgainHandlerProvided && (
        <Button
          colors="white"
          onClick={handleTryAgain}
          wrapperClassName="text-base-500"
          size="extra-small"
        >
          Try again
        </Button>
      )}
    </div>
  );
};

ErrorWithTryAgain.propTypes = {
  className: PropTypes.string,
  errorMessage: PropTypes.string,
  handleTryAgain: PropTypes.func
};

ErrorWithTryAgain.defaultProps = {
  className: '',
  errorMessage: GENERIC_ERROR_MESSAGE,
  handleTryAgain: null
};
export default ErrorWithTryAgain;