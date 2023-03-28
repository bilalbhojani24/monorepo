import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
  Button,
  MdContentCopy,
  MdFileCopy,
  Tooltip,
  TooltipBody
} from '@browserstack/bifrost';
import PropTypes from 'prop-types';

export default function CopyButton({ className, text, hasBorder }) {
  const [isCopied, setIsCopied] = useState(false);
  return (
    <Tooltip
      show={isCopied}
      theme="dark"
      placementSide="bottom"
      content={
        <TooltipBody wrapperClassName="mb-0">
          {isCopied ? 'Copied' : null}
        </TooltipBody>
      }
    >
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
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              e.target.click();
            }
          }}
          colors="white"
          size="small"
          isIconOnlyButton
          variant={hasBorder ? 'primary' : 'minimal'}
          wrapperClassName={className}
        />
      </CopyToClipboard>
    </Tooltip>
  );
}

CopyButton.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
  hasBorder: PropTypes.bool
};

CopyButton.defaultProps = {
  className: '',
  hasBorder: true
};
