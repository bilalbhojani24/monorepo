import React, { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Hyperlink, MdOpenInNew } from '@browserstack/bifrost';
import PropTypes from 'prop-types';

import { A11yButton } from './A11yButton';

function ViewMetaPopOverItem({ title, text, showCopy, textToCopy, link }) {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  return (
    <div className="flex flex-col py-1 first:pt-0 last:pb-0">
      <p className="text-base-500 text-sm">{title}</p>
      <div className="flex items-center justify-between gap-4 pb-0.5">
        <p className="truncate text-sm">{text}</p>
        {showCopy && (
          <div className="flex w-16 justify-end">
            <CopyToClipboard text={textToCopy || text} onCopy={handleClick}>
              <A11yButton
                type="submit"
                variant="minimal"
                wrapperClassName="focus:ring-offset-0"
              >
                {copied ? 'Copied' : 'Copy'}
              </A11yButton>
            </CopyToClipboard>
          </div>
        )}
        {!!link && (
          <Hyperlink
            target="_blank"
            href={link}
            wrapperClassName="text-sm flex items-center gap-1 text-brand-600 hover:text-brand-500 font-medium"
          >
            View <MdOpenInNew className="text-sm" />
          </Hyperlink>
        )}
      </div>
    </div>
  );
}

ViewMetaPopOverItem.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
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
