/* eslint-disable react/prop-types */
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { twClassNames } from '@browserstack/utils';
import { O11yTooltip } from 'common/bifrostProxy';
import { TEST_STATUS } from 'constants/common';
import { getHistoryDetails } from 'features/TestList/slices/testListSlice';

import TestListHistoryTooltip from './TestListHistoryTooltip';

function TestlistTimeline({ details }) {
  const { history } = details;
  const dispatch = useDispatch();

  const getClassesByStatus = (status) => {
    switch (status) {
      case TEST_STATUS.FAIL:
        return 'bg-danger-600 border-danger-400';
      case TEST_STATUS.PASS:
        return 'bg-success-600 border-success-400';
      case TEST_STATUS.SKIPPED:
        return 'bg-base-600 border-base-400';
      case TEST_STATUS.TIMEOUT:
        return 'bg-attention-600 border-attention-400';
      default:
        return 'bg-base-600 border-base-400';
    }
  };

  const loadHistory = useCallback(() => {
    const testRunIds = history.map((item) => item.testRunId);
    if (testRunIds.length) {
      dispatch(getHistoryDetails({ testRunIds }));
    }
  }, [dispatch, history]);

  if (!history.length) {
    return (
      <div className="flex items-center justify-center">
        <p className="text-base-500 text-sm">No historical data found</p>
      </div>
    );
  }

  return (
    <div className="flex scale-75 items-center" onMouseEnter={loadHistory}>
      {history?.map((singleHistoryItem) => (
        <O11yTooltip
          size="md"
          placementSide="bottom"
          key={singleHistoryItem.testRunId}
          triggerWrapperClassName="inline-flex items-center"
          content={
            // eslint-disable-next-line tailwindcss/no-arbitrary-value
            <div className="min-w-[250px] px-4">
              <TestListHistoryTooltip {...singleHistoryItem} />
            </div>
          }
        >
          <div
            className={twClassNames(
              'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 bg-white p-1 opacity-0.5',
              getClassesByStatus(singleHistoryItem.status),
              'bg-white'
            )}
          >
            <div
              className={twClassNames(
                'bg-base-500 h-2 w-2 shrink-0 rounded-full',
                getClassesByStatus(singleHistoryItem.status)
              )}
            />
          </div>
          <div className="bg-base-400 h-0.5 w-3 shrink-0 rounded-full" />
        </O11yTooltip>
      ))}
    </div>
  );
}

export default TestlistTimeline;
