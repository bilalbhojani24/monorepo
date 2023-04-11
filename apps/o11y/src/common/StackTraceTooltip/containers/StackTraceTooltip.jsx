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
  maxHeight
}) {
  return (
    <PropagationBlocker>
      {!showOnlyTraceData && (
        <div className="bg-base-100 flex items-center justify-between">
          <p className="px-3 text-xs">Stack trace</p>
          <Copy2Clipboard text={copyText} showBtnText />
        </div>
      )}

      <pre
        className={twClassNames(
          'text-danger-600 overflow-auto p-3',
          `max-h-[${maxHeight}px]`
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
  maxHeight: PropTypes.number
};

StackTraceTooltip.defaultProps = {
  traceLines: [],
  copyText: '',
  showOnlyTraceData: false,
  maxHeight: 250
};
