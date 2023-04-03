import React, { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { MdOpenInNew } from '@browserstack/bifrost';
import { O11yButton, O11yHyperlink } from 'common/bifrostProxy';
import PropTypes from 'prop-types';

function ViewMetaPopOverItem({ title, text, showCopy, textToCopy, link }) {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  return (
    <div className="flex flex-col py-2 first:pt-0 last:pb-0">
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
        {!!link && (
          <O11yHyperlink
            target="__blank"
            href={link}
            wrapperClassName="text-sm flex items-center gap-1 text-brand-600 hover:text-brand-500 font-medium"
          >
            View <MdOpenInNew className="text-sm" />
          </O11yHyperlink>
        )}
      </div>
    </div>
  );
}

ViewMetaPopOverItem.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  textToCopy: PropTypes.string,
  showCopy: PropTypes.bool,
  link: PropTypes.string
};

ViewMetaPopOverItem.defaultProps = {
  showCopy: false,
  textToCopy: '',
  link: ''
};

export default ViewMetaPopOverItem;
