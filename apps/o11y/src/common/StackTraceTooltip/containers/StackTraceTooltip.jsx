/* eslint-disable tailwindcss/no-arbitrary-value */
import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { twClassNames } from '@browserstack/utils';
import Copy2Clipboard from 'common/Copy2Clipboard';
import PropagationBlocker from 'common/PropagationBlocker';
import PropTypes from 'prop-types';
import { transformUnsupportedTags } from 'utils/common';

export default function StackTraceTooltip({
  traceLines,
  copyText,
  showOnlyTraceData,
  size
}) {
  return (
    <PropagationBlocker>
      {!showOnlyTraceData && (
        <div className="border-b-base-200 flex items-center justify-between border-b bg-white">
          <p className="px-3 text-xs">Stack trace</p>
          <Copy2Clipboard text={copyText} showBtnText />
        </div>
      )}

      <pre
        className={twClassNames(
          'text-danger-700 overflow-auto p-3 bg-base-50',
          {
            'max-h-60': size === 'large',
            'max-h-40': size === 'medium',
            'max-h-28': size === 'small'
          }
        )}
      >
        {traceLines.map((item, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <p className="font-mono text-xs" key={`${item}-${idx}`}>
            {ReactHtmlParser(item, {
              transform: transformUnsupportedTags
            })}
          </p>
        ))}
      </pre>
    </PropagationBlocker>
  );
}

StackTraceTooltip.propTypes = {
  traceLines: PropTypes.arrayOf(PropTypes.string),
  copyText: PropTypes.string,
  showOnlyTraceData: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large'])
};

StackTraceTooltip.defaultProps = {
  traceLines: [],
  copyText: '',
  showOnlyTraceData: false,
  size: 'large'
};
