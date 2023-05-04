import React, { useContext, useState } from 'react';
import { twClassNames } from '@browserstack/utils';

import { CodeSnippetContextData } from '../../../shared/codeSnippetContext';
import Button from '../../Button';
import { MdCheckCircle, MdOutlineContentCopy } from '../../Icon';
import { copyToClipboard } from '../utils';

const CopyButton = () => {
  const [isCopied, setIsCopied] = useState(false);
  const { code, setShowCopy, toolbar } = useContext(CodeSnippetContextData);
  return (
    <Button
      onMouseEnter={() => setShowCopy(true)}
      wrapperClassName={twClassNames(
        'z-10 absolute top-14 right-2 rounded-md',
        {
          'top-4': !toolbar
        }
      )}
      variant="rounded"
      colors="white"
      onClick={() => {
        copyToClipboard(code);
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 3000);
      }}
    >
      <div className="flex items-center space-x-1">
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
