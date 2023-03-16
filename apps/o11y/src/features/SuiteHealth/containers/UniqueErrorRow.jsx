import React, { useState } from 'react';
import { ChevronDownIcon, ChevronRightIcon } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import { O11yTableCell, O11yTooltip } from 'common/bifrostProxy';
import StackTraceTooltip from 'common/StackTraceTooltip';
import PropTypes from 'prop-types';

import { UNIQUE_ERROR_MAIN_ROW_STYLES } from '../constants';

export default function UniqueErrorRow({ data }) {
  const [showBreakDown, setShowBreakDown] = useState(false);

  const handleClickAccordion = () => {
    setShowBreakDown((t) => !t);
  };
  return (
    <O11yTableCell wrapperClassName="p-0 first:pl-0 sm:first:pl-0 last:pr-0 sm:last:pr-0">
      <div
        className="flex w-full items-center px-4 sm:px-6 "
        onClick={handleClickAccordion}
        role="button"
        onKeyDown={() => {}}
        tabIndex={0}
      >
        <div
          className={twClassNames(
            UNIQUE_ERROR_MAIN_ROW_STYLES.error,
            'gap-2 flex items-center'
          )}
        >
          {showBreakDown ? (
            <ChevronDownIcon className="text-base-600 h-4 w-4" />
          ) : (
            <ChevronRightIcon className="text-base-400 h-4 w-4" />
          )}
          <div className="flex-1 truncate">
            <O11yTooltip
              triggerWrapperClassName="max-w-full truncate"
              content={
                <StackTraceTooltip
                  traceLines={data?.error || []}
                  copyText={data?.error?.join('\n')}
                />
              }
              wrapperClassName="p-1 shadow-lg"
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
        </div>
        <div className={twClassNames(UNIQUE_ERROR_MAIN_ROW_STYLES.testCount)}>
          {data?.impactedTests === undefined ? (
            '-'
          ) : (
            <p className={twClassNames()}>{data.impactedTests}</p>
          )}
        </div>
        <div className={twClassNames(UNIQUE_ERROR_MAIN_ROW_STYLES.errorCount)}>
          {data?.errorCount === undefined ? (
            '-'
          ) : (
            <p className={twClassNames()}>{data.errorCount}</p>
          )}
        </div>
      </div>
      {showBreakDown && <div className="bg-base-50">sub row</div>}
    </O11yTableCell>
  );
}

UniqueErrorRow.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired
};
