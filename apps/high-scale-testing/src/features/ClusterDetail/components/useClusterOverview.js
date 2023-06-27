import { useSelector } from 'react-redux';
import { useMountEffect } from '@browserstack/hooks';
import {
  AGClusterDetailsInteracted,
  AGClusterDetailsVisited
} from 'constants/event-names';
import { getClustersData } from 'features/GridConsole/slices/selector';
import { logHSTEvent } from 'utils/logger';

const useClusterOverview = () => {
  // All Store variables
  const clusterData = useSelector(getClustersData);

  const containerClassName =
    'border-base-200 rounded-lg border bg-white p-6 shadow';
  const fontColor900ClassName = 'text-base-900 text-base font-normal mt-0.5';

  const vpcCopiedCallbackFn = () => {
    logHSTEvent(['amplitude'], 'web_events', AGClusterDetailsInteracted, {
      action: 'vpc_copied'
    });
  };

  useMountEffect(() => {
    logHSTEvent([], 'web_events', AGClusterDetailsVisited, {
      cluster_name: clusterData.name
    });
  });

  return {
    containerClassName,
    fontColor900ClassName,
    clusterData,
    vpcCopiedCallbackFn
  };
};

export default useClusterOverview;
