import React from 'react';
import { O11yTooltip } from 'common/bifrostProxy';
import StackTraceTooltip from 'common/StackTraceTooltip';
import PropTypes from 'prop-types';

function UniqueErrorTitle({ title }) {
  const titleSplit = title.split('\n');
  return (
    <>
      {titleSplit.slice(0, 3).map((text) => (
        <p className="" key={text}>
          {text}
        </p>
      ))}
      {titleSplit.length > 3 && (
        <O11yTooltip
          placementSide="bottom"
          delay={250}
          wrapperClassName="p-0 border border-base-200 rounded"
          placementAlign="start"
          size="2xl"
          arrowWidth={0}
          arrowHeight={0}
          sideOffset={2}
          content={
            <StackTraceTooltip
              traceLines={titleSplit || []}
              copyText={titleSplit?.join('\n')}
            />
          }
        >
          <p className="text-xs">...{titleSplit.length - 3} more line(s)</p>
        </O11yTooltip>
      )}
    </>
  );
}

UniqueErrorTitle.propTypes = {
  title: PropTypes.string.isRequired
};

export default UniqueErrorTitle;
