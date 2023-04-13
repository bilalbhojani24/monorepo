import React, { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { O11yButton } from 'common/bifrostProxy';
import PropTypes from 'prop-types';

function ViewMetaPopOverItem({ title, text, showCopy, textToCopy }) {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  return (
    <div className="flex flex-col py-4 first:pt-0 last:pb-0">
      <p className="text-base-500 text-sm font-medium">{title}</p>
      <div className="mt-1 flex items-center justify-between gap-4">
        <p className="truncate text-sm font-medium">{text}</p>
        {showCopy && (
          <div className="flex w-16 justify-end">
            <CopyToClipboard text={textToCopy || text} onCopy={handleClick}>
              <O11yButton type="submit" variant="minimal">
                {copied ? 'Copied' : 'Copy'}
              </O11yButton>
            </CopyToClipboard>
          </div>
        )}
      </div>
    </div>
  );
}

ViewMetaPopOverItem.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  textToCopy: PropTypes.string,
  showCopy: PropTypes.bool
};

ViewMetaPopOverItem.defaultProps = {
  showCopy: false,
  textToCopy: ''
};

export default ViewMetaPopOverItem;
