import { useSelector } from 'react-redux';

import { getGridData } from '../slices/selector';

const useGridOverview = () => {
  // All Store variables
  const gridData = useSelector(getGridData);

  // loading state also needs to be added

  const containerClassName =
    'border-base-200 rounded-lg border bg-white p-6 shadow';
  const fontColor900ClassName = 'text-base-900 text-base font-normal mt-1';

  return {
    containerClassName,
    fontColor900ClassName,
    gridData
  };
};

export { useGridOverview };
