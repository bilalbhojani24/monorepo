import React, { useEffect, useState } from 'react';
import { twClassNames } from '@browserstack/utils';
// import { TMHyperlink } from 'common/bifrostProxy';
import PropTypes from 'prop-types';

const CopyButton = ({ children, copyValue, wrapperClassName }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [timeoutID, setTimeoutID] = useState(null);
  const copyHelper = () => {
    setIsCopied(true);
    const id = setTimeout(() => {
      setIsCopied(false);
    }, [3000]);
    setTimeoutID(id);
    navigator.clipboard.writeText(copyValue);
  };

  useEffect(
    () => () => {
      clearTimeout(timeoutID);
    },
    [timeoutID]
  );

  return (
    <div // to be changed to TMHyperLink
      onClick={copyHelper}
      onKeyDown={copyHelper}
      tabIndex={0}
      role="button"
      variant="minimal"
      color="text-white"
      underlined
      fontWeight="font-semibold"
      className={twClassNames(
        'font-semibold text-white underline',
        {
          'cursor-not-allowed': isCopied,
          'opacity-40': isCopied
        },
        wrapperClassName
      )}
    >
      {children}
    </div>
  );
};

CopyButton.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  copyValue: PropTypes.string,
  wrapperClassName: PropTypes.string
};

CopyButton.defaultProps = {
  children: '',
  copyValue: '',
  wrapperClassName: ''
};

export default CopyButton;
