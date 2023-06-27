import { useSelector } from 'react-redux';
import { getClusterData } from 'features/ClusterDetail/slices/selector';

const useClustersListing = () => {
  const isRounded = true;
  const statusModifier = {
    Creating: 'primary',
    Online: 'success',
    Deleting: 'base'
  };
  const tableCellWrapperClassName =
    'text-xs px-6 py-3 text-base-500 font-medium';

  // All Store variables:
  const clustersList = useSelector(getClusterData);

  return {
    clustersList,
    isRounded,
    statusModifier,
    tableCellWrapperClassName
  };
};

export { useClustersListing };
