import React, { useEffect, useRef, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { MdCheck, MdOutlineContentCopy } from '@browserstack/bifrost';
import PropTypes from 'prop-types';

function Copy2Clipboard({ text, showBtnText, onCopyCb }) {
  const mounted = useRef(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleClick = () => {
    setIsCopied(true);
    onCopyCb();
    setTimeout(() => {
      if (mounted.current) {
        setIsCopied(false);
      }
    }, 2000);
  };

  const handleOnKeyPressCopy = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.target.click();
    }
  };

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  return (
    <CopyToClipboard
      text={text}
      onCopy={handleClick}
      className="hover:bg-base-200 flex items-center gap-1 rounded px-3 py-2"
    >
      <div
        role="button"
        tabIndex={0}
        aria-label="Copy text"
        onKeyDown={(e) => {
          handleOnKeyPressCopy(e);
        }}
      >
        {showBtnText && (
          <>
            {isCopied ? (
              <span className="text-brand-500 text-xs">Copied</span>
            ) : (
              <span className="text-xs">Copy to Clipboard</span>
            )}
          </>
        )}
        {isCopied ? (
          <MdCheck className="text-brand-500 h-4 w-4" />
        ) : (
          <MdOutlineContentCopy className="h-4 w-4" />
        )}
      </div>
    </CopyToClipboard>
  );
}

Copy2Clipboard.propTypes = {
  text: PropTypes.string,
  showBtnText: PropTypes.bool,
  onCopyCb: PropTypes.func
};

Copy2Clipboard.defaultProps = {
  text: '',
  showBtnText: false,
  onCopyCb: () => {}
};

export default Copy2Clipboard;
