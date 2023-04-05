/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineAirplay, MdOutlineTimer } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import { O11yBadge, O11yHyperlink } from 'common/bifrostProxy';
import O11yLoader from 'common/O11yLoader';
import PropagationBlocker from 'common/PropagationBlocker';
import StackTraceTooltip from 'common/StackTraceTooltip';
import StatusIcon from 'common/StatusIcon';
import { TEST_STATUS } from 'constants/common';
import { LOG_TYPES } from 'features/TestList/constants';
import { getTestHistoryDetails } from 'features/TestList/slices/selectors';
import isEmpty from 'lodash/isEmpty';
import { milliSecondsToTime } from 'utils/dateTime';

function TestListHistoryTooltip({ testRunId, status }) {
  const dispatch = useDispatch();
  const mounted = useRef(false);

  const historyData = useSelector((state) =>
    getTestHistoryDetails(state, testRunId)
  );
  const [isLoading, setIsLoading] = useState(false);
  const getClassesByStatus = (historyStatus) => {
    switch (historyStatus) {
      case TEST_STATUS.FAIL:
        return 'text-danger-600';
      case TEST_STATUS.PASS:
        return 'text-success-600';
      case TEST_STATUS.SKIPPED:
        return 'text-base-600';
      case TEST_STATUS.TIMEOUT:
        return 'text-attention-600';
      default:
        return 'text-base-600';
    }
  };

  useEffect(() => {
    mounted.current = true;
    if (mounted.current && isEmpty(historyData)) {
      setIsLoading(true);
    } else if (mounted.current && !isEmpty(historyData)) {
      setIsLoading(false);
    }
    return () => {
      mounted.current = false;
    };
  }, [dispatch, historyData]);

  return (
    <div>
      {isLoading ? (
        <div className="flex h-20 flex-col items-center justify-center">
          <O11yLoader />
          <p className="text-base-500 mt-1 text-center text-sm">
            {status === TEST_STATUS.PENDING
              ? 'Build is still running'
              : 'Fetching data'}
          </p>
        </div>
      ) : (
        <PropagationBlocker>
          <p className="text-sm font-medium leading-5">
            Build #{historyData?.serialId}
          </p>
          <div className="mt-3 text-sm">
            <p className="text-xs font-medium leading-4">Status</p>
            <p className="mt-1 flex items-center">
              {historyData?.status && (
                <StatusIcon status={historyData?.status} />
              )}
              <span
                className={twClassNames(
                  'ml-1 text-xs leading-normal',
                  getClassesByStatus(historyData?.status)
                )}
              >
                {historyData?.status === TEST_STATUS.SKIPPED && 'Skipped'}
                {historyData?.status === TEST_STATUS.FAIL && 'Failed'}
                {historyData?.status === TEST_STATUS.PASS && 'Passed'}
                {historyData?.status === TEST_STATUS.PENDING && 'Running'}
                {historyData?.status === TEST_STATUS.TIMEOUT && 'Timeout'}
              </span>
            </p>
            {!!historyData?.logs?.[LOG_TYPES.STACKTRACE]?.length && (
              <div className="bg-base-200 mt-2">
                <StackTraceTooltip
                  showOnlyTraceData
                  traceLines={historyData?.logs[LOG_TYPES.STACKTRACE] || []}
                />
              </div>
            )}
          </div>
          {!!historyData?.issueType && (
            <div className="mt-3 text-sm">
              <p className="font-medium leading-tight">Defect Type</p>
              <p className="text-base-500 mt-1 flex items-center text-xs font-normal leading-tight">
                {historyData?.issueType?.name}
              </p>
            </div>
          )}
          {(!!historyData?.duration || historyData?.duration === 0) && (
            <div className="mt-3 text-sm">
              <p className="font-medium leading-tight">Duration</p>
              <p className="text-base-500 mt-1 flex items-center text-xs font-normal leading-tight">
                <MdOutlineTimer className="text-base-500 text-xs" />
                <span>{milliSecondsToTime(historyData?.duration)}</span>
              </p>
            </div>
          )}
          {!!historyData?.tags?.length ||
            (historyData?.isFlaky && (
              <div className="mt-3">
                <p className="font-medium leading-tight">Tags</p>
                <div className="mt-2 flex flex-wrap items-center">
                  {historyData?.tags?.map((item) => (
                    <PropagationBlocker className="ml-1" key={item}>
                      <O11yBadge
                        text={item}
                        wrapperClassName="mx-1"
                        hasRemoveButton={false}
                        onClick={() => {}}
                        modifier="base"
                        hasDot={false}
                      />
                    </PropagationBlocker>
                  ))}
                  {historyData?.isFlaky && (
                    <PropagationBlocker className="ml-1">
                      <O11yBadge
                        text="Flaky"
                        modifier="warn"
                        onClick={() => {}}
                      />
                    </PropagationBlocker>
                  )}
                </div>
              </div>
            ))}
          {!!historyData?.sessionUrl && (
            <PropagationBlocker className="mt-1">
              <O11yHyperlink
                href={historyData?.sessionUrl}
                target="_blank"
                rel="noopener noreferrer"
                wrapperClassName="ml-2"
              >
                <MdOutlineAirplay className="text-base-500 h-4 w-4" />
                <span className="text-base-500 ml-1 text-sm font-normal">
                  Interactive Session
                </span>
              </O11yHyperlink>
            </PropagationBlocker>
          )}
        </PropagationBlocker>
      )}
    </div>
  );
}

export default TestListHistoryTooltip;
