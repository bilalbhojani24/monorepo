import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getUserNamesData } from '../../slices/dataSlice';

function useFetchUser(allowFetchingData) {
  const dispatch = useDispatch();
  const { projectNormalisedName } = useParams();
  const [allUsersData, setAllUsersData] = useState({
    isLoading: false,
    data: []
  });

  const fetchUsersData = useCallback(
    (query = '') => {
      if (!projectNormalisedName) return;
      setAllUsersData({ isLoading: false, data: [] });
      dispatch(
        getUserNamesData({
          projectNormalisedName,
          query
        })
      )
        .unwrap()
        .then((res) => {
          setAllUsersData({ isLoading: false, data: res.data });
        })
        .catch(() => {
          setAllUsersData({ isLoading: false, data: [] });
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
