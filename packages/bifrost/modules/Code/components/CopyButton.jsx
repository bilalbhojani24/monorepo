import React, { useState } from 'react';
import { useLatestRef } from '@browserstack/hooks';
import { func, string } from 'prop-types';

import Button from '../../Button';
import { MdOutlineContentCopy } from '../../Icon';
import { copyToClipboard } from '../utils';

const CopyButton = ({ code, setShowCopy }) => {
  const [isCopied, setIsCopied] = useState(false);

  const setShowCopyRef = useLatestRef(setShowCopy);

  return (
    <Button
      onMouseEnter={() => setShowCopyRef.current(true)}
      wrapperClassName="z-10 absolute top-14 right-2 rounded-md"
      variant="rounded"
      colors="white"
      onClick={() => {
        copyToClipboard(code);
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      }}
    >
      <div className="flex items-center space-x-1">
        <MdOutlineContentCopy />
        <span>{!isCopied ? 'Copy' : 'Copied!'}</span>
      </div>
    </Button>
  );
};

export default CopyButton;

CopyButton.propTypes = {
  code: string.isRequired,
  setShowCopy: func.isRequired
};
