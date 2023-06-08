import { useSelector } from 'react-redux';

import { getGridData } from '../slices/selector';

const useGridListing = () => {
  const isRounded = true;

  // All Store variables:
  const gridList = useSelector(getGridData);

  const tableCellWrapperClassName =
    'text-xs px-6 py-3 text-base-500 font-medium';

  return {
    gridList,
    isRounded,
    tableCellWrapperClassName
  };
};

export { useGridListing };
