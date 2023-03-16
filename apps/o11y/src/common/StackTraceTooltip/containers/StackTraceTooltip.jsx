/* eslint-disable tailwindcss/no-arbitrary-value */
import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import Copy2Clipboard from 'common/Copy2Clipboard';
import PropagationBlocker from 'common/PropagationBlocker';
import PropTypes from 'prop-types';
import { transformUnsupportedTags } from 'utils/common';

export default function StackTraceTooltip({ traceLines, copyText }) {
  return (
    <PropagationBlocker className="inline">
      <div className="bg-base-100 flex items-center justify-between">
        <p className="px-3 text-xs">Stack trace</p>
        <Copy2Clipboard text={copyText} showBtnText />
      </div>
      <pre className="text-danger-500 overflow-auto p-3">
        {traceLines.map((item, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <p className="text-xs" key={`${item}-${idx}`}>
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
  copyText: PropTypes.string
};

StackTraceTooltip.defaultProps = {
  traceLines: [],
  copyText: ''
};
