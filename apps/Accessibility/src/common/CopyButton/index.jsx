import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Button, MdContentCopy, MdFileCopy } from '@browserstack/bifrost';
import PropTypes from 'prop-types';

export default function CopyButton({ className, text }) {
  const [isCopied, setIsCopied] = useState(false);
  return (
    <CopyToClipboard
      onCopy={() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 2500);
      }}
      text={text}
    >
      <Button
        icon={
          isCopied ? (
            <MdFileCopy className="text-xl" />
          ) : (
            <MdContentCopy className="text-xl" />
          )
        }
        colors="white"
        size="small"
        isIconOnlyButton
        wrapperClassName={className}
      />
    </CopyToClipboard>
  );
}

CopyButton.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired
};

CopyButton.defaultProps = {
  className: ''
};
