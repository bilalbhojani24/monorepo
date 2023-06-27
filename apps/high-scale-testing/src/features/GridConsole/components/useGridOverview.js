import { useSelector } from 'react-redux';
import { useMountEffect } from '@browserstack/hooks';
import {
  AGGridDetailsInteracted,
  AGGridDetailsVisited
} from 'constants/event-names';
import { logHSTEvent } from 'utils/logger';
import { calculateRelativeTime } from 'utils/time';

import { getSelectedGridData } from '../slices/selector';

const useGridOverview = () => {
  // All Store variables
  const selectedGridData = useSelector(getSelectedGridData);

  const {
    cluster,
    connected,
    frameworks,
    gridVersion,
    identifier,
    name,
    stats,
    status
  } = selectedGridData;

  // loading state also needs to be added

  const containerClassName =
    'border-base-200 rounded-lg border bg-white p-6 shadow';
  const fontColor900ClassName = 'text-base-900 text-base font-normal mt-0.5';

  const copyBtnCbFn = (framework) => {
    logHSTEvent(['amplitude'], 'web_events', AGGridDetailsInteracted, {
      action: 'url_copied',
      framework
    });
  };
  const hasBrowsersUsed = stats?.browsersUsed.length > 0;
  const relativeTime = calculateRelativeTime(connected);

  useMountEffect(() => {
    logHSTEvent([], 'web_events', AGGridDetailsVisited, {
      grid_name: selectedGridData.name
    });
  });

  return {
    cluster,
    containerClassName,
    copyBtnCbFn,
    fontColor900ClassName,
    frameworks,
    selectedGridData,
    gridVersion,
    hasBrowsersUsed,
    identifier,
    name,
    relativeTime,
    stats,
    status
  };
};

export { useGridOverview };
