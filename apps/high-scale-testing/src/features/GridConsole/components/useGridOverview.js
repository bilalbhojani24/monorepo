import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchGridDataById } from 'api/index';
import { getUserDetails } from 'globalSlice/selector';

import { setGridData } from '../slices';
import { getGridData } from '../slices/selector';

const useGridOverview = () => {
  const dispatch = useDispatch();

  const params = useParams();
  const paramId = params; // grid id

  // All Store variables
  const gridData = useSelector(getGridData);
  const userDetails = useSelector(getUserDetails);

  // loading state also needs to be added

  const containerClassName =
    'border-base-200 rounded-lg border bg-white p-6 shadow';
  const fontColor900ClassName = 'text-base-900 text-sm font-normal';

  useEffect(() => {
    const fetchGridDataByIdFromAPI = async (gridId) => {
      const res = await fetchGridDataById(gridId, userDetails.id);
      dispatch(
        setGridData({
          gridData: res.data
        })
      );
    };

    if (paramId) fetchGridDataByIdFromAPI(paramId);
  }, [dispatch, paramId, userDetails]);

  return {
    containerClassName,
    fontColor900ClassName,
    gridData
  };
};

export { useGridOverview };
