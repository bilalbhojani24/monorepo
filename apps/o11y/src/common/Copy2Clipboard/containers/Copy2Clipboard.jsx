import React, { useEffect, useRef, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { MdCheck, MdOutlineContentCopy } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

function Copy2Clipboard({
  text,
  showBtnText,
  onCopyCb,
  wrapperClassName,
  btnText,
  icon
}) {
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
      className={twClassNames(
        'hover:bg-base-200 flex items-center gap-1 rounded px-3 py-2',
        wrapperClassName
      )}
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
              <span className="text-brand-600 text-xs">Copied</span>
            ) : (
              <span className="text-xs">{btnText}</span>
            )}
          </>
        )}
        {isCopied ? (
          <MdCheck className="text-brand-500 h-4 w-4" />
        ) : (
          <>{icon || <MdOutlineContentCopy className="h-4 w-4" />}</>
        )}
      </div>
    </CopyToClipboard>
  );
}

Copy2Clipboard.propTypes = {
  btnText: PropTypes.string,
  icon: PropTypes.node,
  onCopyCb: PropTypes.func,
  showBtnText: PropTypes.bool,
  text: PropTypes.string,
  wrapperClassName: PropTypes.string
};

Copy2Clipboard.defaultProps = {
  btnText: 'Copy to clipboard',
  icon: null,
  onCopyCb: () => {},
  showBtnText: false,
  text: '',
  wrapperClassName: ''
};

export default Copy2Clipboard;
