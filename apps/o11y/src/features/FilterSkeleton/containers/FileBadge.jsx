import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

export default function FileBadge({
  onClose,
  text,
  wrapperClassName,
  onClick,
  disabled,
  hasRemoveButton
}) {
  const handleClick = (e) => {
    onClick(e);
  };

  return (
    <span
      onClick={handleClick}
      onKeyDown={() => {}}
      role="button"
      tabIndex={-1}
      className={twClassNames(
        'inline-flex items-center font-medium cursor-pointer px-2.5 py-0.5 text-xs bg-base-100 text-base-800 rounded-full pr-0.5 truncate max-w-[150px]',
        {
          'cursor-not-allowed': disabled,
          'hover:bg-base-200': !disabled
        },
        wrapperClassName
      )}
    >
      <span className="truncate" dir="rtl">
        {text}
      </span>
      {hasRemoveButton && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose(e);
          }}
          type="button"
          disabled={disabled}
          className={twClassNames(
            'ml-0.5 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full focus:text-white focus:outline-none focus:bg-base-500 text-base-400',
            {
              'cursor-not-allowed': disabled,
              'hover:text-base-500 hover:bg-base-200': !disabled
            }
          )}
        >
          <span className="sr-only">Remove small option</span>
          <svg
            className="h-2 w-2"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 8 8"
          >
            <path
              strokeLinecap="round"
              strokeWidth="1.5"
              d="M1 1l6 6m0-6L1 7"
            />
          </svg>
        </button>
      )}
    </span>
  );
}

FileBadge.propTypes = {
  hasRemoveButton: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  wrapperClassName: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool
};

FileBadge.defaultProps = {
  disabled: false,
  onClick: () => {},
  wrapperClassName: ''
};
