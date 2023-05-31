import { useSelector } from 'react-redux';

import { getClusterData } from '../slices/selector';

const useClusterOverview = () => {
  // All Store variables
  const clusterData = useSelector(getClusterData);

  const containerClassName =
    'border-base-200 rounded-lg border bg-white p-6 shadow';
  const fontColor900ClassName = 'text-base-900 text-sm font-normal';

  return { containerClassName, fontColor900ClassName, clusterData };
};

export default useClusterOverview;
