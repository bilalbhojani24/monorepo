/* eslint-disable react/prop-types */
import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { O11yTooltip } from 'common/bifrostProxy';
import StackTraceTooltip from 'common/StackTraceTooltip';
import { LOG_TYPES } from 'features/BuildDetails/constants';
import { transformUnsupportedTags } from 'utils/common';

function TestListStackTrace({ details }) {
  const { retries } = details;

  if (
    !retries?.length ||
    !retries[retries.length - 1].logs?.[LOG_TYPES.STACKTRACE]?.length
  ) {
    return null;
  }

  return (
    <O11yTooltip
      size="lg"
      arrowWidth={0}
      arrowHeight={0}
      sideOffset={2}
      delay={500}
      placementSide="bottom"
      placementAlign="start"
      wrapperClassName="p-1 shadow-lg"
      content={
        <StackTraceTooltip
          traceLines={
            retries[retries.length - 1].logs?.[LOG_TYPES.STACKTRACE] || []
          }
          copyText={retries[retries.length - 1].logs?.[
            LOG_TYPES.STACKTRACE
          ]?.join('\n')}
        />
      }
      triggerWrapperClassName="max-w-full ml-6 line-clamp-2 text-danger-700 text-sm font-normal leading-5"
    >
      <p className="text-danger-700 my-1 font-mono text-xs">
        {ReactHtmlParser(
          retries[retries.length - 1].logs?.[LOG_TYPES.STACKTRACE][0],
          {
            transform: transformUnsupportedTags
          }
        )}
      </p>
    </O11yTooltip>
  );
}

export default TestListStackTrace;
