import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { twClassNames } from '@browserstack/utils';
import { O11yTooltip } from 'common/bifrostProxy';
import StackTraceTooltip from 'common/StackTraceTooltip';
import { LOG_TYPES, singleItemTestDetails } from 'features/TestList/constants';
import PropTypes from 'prop-types';
import { transformUnsupportedTags } from 'utils/common';

function TestListStackTrace({ wrapperClassName, details }) {
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
      triggerWrapperClassName={twClassNames(
        'max-w-full ml-6 line-clamp-2 text-danger-700 text-sm font-normal leading-5',
        wrapperClassName
      )}
    >
      <p className="text-danger-700 line-clamp-1 my-1 cursor-default break-all font-mono text-xs">
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

TestListStackTrace.propTypes = {
  details: PropTypes.shape(singleItemTestDetails).isRequired,
  wrapperClassName: PropTypes.string.isRequired
};
TestListStackTrace.defaultProps = {};
