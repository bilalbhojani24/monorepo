import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { API_STATUSES } from 'constants/common';

import { getUserNamesData } from '../../slices/dataSlice';

function useFetchUser(allowFetchingData) {
  const dispatch = useDispatch();
  const { projectNormalisedName } = useParams();
  const [allUsersData, setAllUsersData] = useState({
    status: API_STATUSES.IDLE,
    data: []
  });

  const fetchUsersData = useCallback(
    (query = '') => {
      if (!projectNormalisedName) return;
      setAllUsersData({ status: API_STATUSES.PENDING, data: [] });
      dispatch(
        getUserNamesData({
          projectNormalisedName,
          query
        })
      )
        .unwrap()
        .then((res) => {
          setAllUsersData({
            status: API_STATUSES.FULFILLED,
            data: res.data
          });
        })
        .catch(() => {
          setAllUsersData({ status: false, data: [] });
        });
    },
    [dispatch, projectNormalisedName]
  );

  useEffect(() => {
    if (allowFetchingData) {
      fetchUsersData();
    }
  }, [fetchUsersData, allowFetchingData]);

  return { ...allUsersData };
}

export default useFetchUser;
