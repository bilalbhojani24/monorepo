import { useSelector } from 'react-redux';
import { useMountEffect } from '@browserstack/hooks';
import { logEvent } from '@browserstack/utils';
import { AGClusterDetailsVisited } from 'constants/event-names';

import { getClusterData } from '../slices/selector';

const useClusterOverview = () => {
  // All Store variables
  const clusterData = useSelector(getClusterData);

  const containerClassName =
    'border-base-200 rounded-lg border bg-white p-6 shadow';
  const fontColor900ClassName = 'text-base-900 text-base font-normal mt-0.5';

  useMountEffect(() => {
    logEvent([], 'web_events', AGClusterDetailsVisited, {
      cluster_name: clusterData.name
    });
  });

  return { containerClassName, fontColor900ClassName, clusterData };
};

export default useClusterOverview;
