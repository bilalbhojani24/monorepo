import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { API_STATUSES } from 'constants/common';

import { getBuildFilterDetailsData } from '../../slices/dataSlice';

function useBuildFilterDetails() {
  const dispatch = useDispatch();
  const { projectNormalisedName } = useParams();
  const [allFilterDetails, setAllFilterDetails] = useState({
    filterDetailsApiStatus: API_STATUSES.IDLE,
    filterDetailsData: {}
  });

  const fetchFiltersDetailsData = useCallback(() => {
    if (!projectNormalisedName) return;
    setAllFilterDetails({
      filterDetailsApiStatus: API_STATUSES.PENDING,
      filterDetailsData: []
    });
    dispatch(
      getBuildFilterDetailsData({
        projectNormalisedName
      })
    )
      .unwrap()
      .then((res) => {
        setAllFilterDetails({
          filterDetailsApiStatus: API_STATUSES.FULFILLED,
          filterDetailsData: res
        });
      })
      .catch(() => {
        setAllFilterDetails({
          filterDetailsApiStatus: false,
          filterDetailsData: {}
        });
      });
  }, [dispatch, projectNormalisedName]);

  useEffect(() => {
    fetchFiltersDetailsData();
  }, [fetchFiltersDetailsData]);

  return { ...allFilterDetails };
}

export default useBuildFilterDetails;
