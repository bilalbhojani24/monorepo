import { useSelector } from 'react-redux';
import { useMountEffect } from '@browserstack/hooks';
import { AGGridDetailsVisited } from 'constants/event-names';
import { logHSTEvent } from 'utils/logger';

import { getGridData } from '../slices/selector';

const useGridOverview = () => {
  // All Store variables
  const gridData = useSelector(getGridData);

  // loading state also needs to be added

  const containerClassName =
    'border-base-200 rounded-lg border bg-white p-6 shadow';
  const fontColor900ClassName = 'text-base-900 text-base font-normal mt-0.5';

  useMountEffect(() => {
    logHSTEvent([], 'web_events', AGGridDetailsVisited, {
      grid_name: gridData.name
    });
  });

  return {
    containerClassName,
    fontColor900ClassName,
    gridData
  };
};

export { useGridOverview };
