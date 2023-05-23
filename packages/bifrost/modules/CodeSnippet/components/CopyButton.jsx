import React, { useContext, useRef, useState } from 'react';
import { twClassNames } from '@browserstack/utils';

import { CodeSnippetContextData } from '../../../shared/codeSnippetContext';
import Button from '../../Button';
import { MdCheckCircle, MdOutlineContentCopy } from '../../Icon';
import { copyToClipboard } from '../utils';

const CopyButton = () => {
  const ref = useRef(null);
  const [isCopied, setIsCopied] = useState(false);
  const { code, setShowCopy, showCopy } = useContext(CodeSnippetContextData);
  return (
    <Button
      ref={ref}
      onMouseEnter={() => setShowCopy(true)}
      wrapperClassName={twClassNames(
        'absolute top-2 right-2 rounded-md opacity-0',
        {
          'opacity-100': showCopy
        }
      )}
      variant="rounded"
      colors="white"
      onClick={() => {
        copyToClipboard(code);
        setIsCopied(true);
        setShowCopy(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 2000);
        ref.current.focus();
      }}
      onFocus={() => {
        setShowCopy(true);
      }}
      onBlur={() => {
        setShowCopy(false);
      }}
    >
      <div
        className={twClassNames('flex items-center space-x-1', {
          '': showCopy
        })}
      >
        {isCopied ? (
          <MdCheckCircle className="h-4 w-4" />
        ) : (
          <MdOutlineContentCopy className="h-4 w-4" />
        )}
        <span>{!isCopied ? 'Copy' : 'Copied!'}</span>
      </div>
    </Button>
  );
};

export default CopyButton;
