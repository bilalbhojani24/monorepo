import { useSelector } from 'react-redux';
import { useMountEffect } from '@browserstack/hooks';
import {
  AGGridDetailsInteracted,
  AGGridDetailsVisited
} from 'constants/event-names';
import { logHSTEvent } from 'utils/logger';
import { calculateRelativeTime } from 'utils/time';

import { getGridsData } from '../slices/selector';

const useGridOverview = () => {
  // All Store variables
  const gridData = useSelector(getGridsData);

  const {
    browserSettings,
    cluster,
    connected,
    frameworks,
    gridVersion,
    identifier,
    isTrialGrid,
    name,
    runningTests,
    queuedTests,
    stats,
    status,
    user
  } = gridData;

  // loading state also needs to be added
  const allowedBrowsers =
    (browserSettings && Object.keys(browserSettings?.allowedBrowsers)) || [];

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
      grid_name: gridData.name
    });
  });

  return {
    cluster,
    containerClassName,
    copyBtnCbFn,
    fontColor900ClassName,
    frameworks,
    gridData,
    gridVersion,
    hasBrowsersUsed,
    identifier,
    isTrialGrid,
    name,
    relativeTime,
    stats,
    status
  };
};

export { useGridOverview };
