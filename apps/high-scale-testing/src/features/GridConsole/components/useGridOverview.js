import { useDispatch, useSelector } from 'react-redux';
import { fetchGridDataById } from 'api/index';
import { getUserDetails } from 'globalSlice/selector';

import { setGridData } from '../slices';

const useGridOverview = () => {
  const dispatch = useDispatch();
  const userDetails = useSelector(getUserDetails);
  // loading state also needs to be added

  const containerClassName =
    'border-base-200 rounded-lg border bg-white p-6 shadow';
  const fontColor900ClassName = 'text-base-900 text-sm font-normal';

  const fetchGridDataByIdFromAPI = async (gridId) => {
    const res = await fetchGridDataById(gridId, userDetails.id);
    dispatch(
      setGridData({
        gridData: res.data
      })
    );
  };

  return {
    fetchGridDataByIdFromAPI,
    containerClassName,
    fontColor900ClassName
  };
};

export { useGridOverview };
