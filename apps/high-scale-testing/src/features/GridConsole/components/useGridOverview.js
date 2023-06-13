import { useSelector } from 'react-redux';
import { useMountEffect } from '@browserstack/hooks';
import {
  AGGridDetailsInteracted,
  AGGridDetailsVisited
} from 'constants/event-names';
import { logHSTEvent } from 'utils/logger';

import { getGridData } from '../slices/selector';

const useGridOverview = () => {
  // All Store variables
  const gridData = useSelector(getGridData);

  const {
    identifier,
    name,
    user,
    cluster,
    status,
    frameworks,
    connected,
    browserSettings,
    gridVersion,
    runningTests,
    queuedTests
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

  useMountEffect(() => {
    logHSTEvent([], 'web_events', AGGridDetailsVisited, {
      grid_name: gridData.name
    });
  });

  return {
    allowedBrowsers,
    cluster,
    connected,
    containerClassName,
    copyBtnCbFn,
    fontColor900ClassName,
    frameworks,
    gridData,
    gridVersion,
    identifier,
    name,
    runningTests,
    status,
    queuedTests,
    user
  };
};

export { useGridOverview };
