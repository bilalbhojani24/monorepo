import React from 'react';
import { twClassNames } from '@browserstack/utils';
import { O11yTooltip } from 'common/bifrostProxy';
import MiniChart from 'common/MiniChart';
import StackTraceTooltip from 'common/StackTraceTooltip';
import PropTypes from 'prop-types';

import { UNIQUE_ERROR_MAIN_HEADER } from '../constants';

const UERowHeader = ({ data }) => (
  <>
    <div
      className={twClassNames(
        UNIQUE_ERROR_MAIN_HEADER.error.bodyClass,
        'pl-1 pr-4 text-left items-center flex'
      )}
    >
      <O11yTooltip
        triggerWrapperClassName="max-w-full truncate"
        content={
          <StackTraceTooltip
            traceLines={data?.error || []}
            copyText={data?.error?.join('\n')}
          />
        }
        wrapperClassName="p-0 border border-base-200 rounded max-w-xl sm:max-w-3xl"
        placementSide="bottom"
        placementAlign="start"
        size="lg"
        arrowWidth={0}
        arrowHeight={0}
        sideOffset={2}
      >
        <span className="text-base-900 text-sm font-medium leading-5">
          {data?.error?.[0]}
        </span>
      </O11yTooltip>
    </div>
    <div className={twClassNames(UNIQUE_ERROR_MAIN_HEADER.testCount.bodyClass)}>
      <p className="text-base-500 text-sm leading-5">
        {data.impactedTests ? data.impactedTests : '-'}
      </p>
    </div>
    <div
      className={twClassNames(
        UNIQUE_ERROR_MAIN_HEADER.errorCount.bodyClass,
        'flex items-center gap-4'
      )}
    >
      <div className="h-5 w-12">
        <MiniChart
          data={data.chartData}
          chartType="area"
          color="var(--colors-danger-100)"
          lineColor="var(--colors-danger-400)"
        />
      </div>
      <p className="text-base-500 text-sm leading-5">
        {data.errorCount ? data.errorCount : '-'}
      </p>
    </div>
  </>
);

UERowHeader.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired
};

export default UERowHeader;
