import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  getIsTestHistoryLoading,
  getPreviousUserSessions
} from '../slices/testHistorySlice';
import {
  checkForPreviousUserSessions,
  extractSessionDetailsById
} from '../slices/testHistoryThunks';

const useExistingUserHome = () => {
  const [tableRows, setTableRows] = useState([]);
  const [currentSortDir, setCurrentSortDir] = useState('asc');

  const previousUserSessions = useSelector(getPreviousUserSessions);
  const isHistoryLoading = useSelector(getIsTestHistoryLoading);

  const navigateToPath = useNavigate();

  const dispatch = useDispatch();

  const sortRows = () => {
    const rowsToBeSorted = [...previousUserSessions];

    setTableRows(
      rowsToBeSorted.sort((a, b) => {
        if (a.name > b.name) {
          return currentSortDir === 'asc' ? -1 : 1;
        }

        if (b.name > a.name) {
          return currentSortDir === 'asc' ? 1 : -1;
        }

        return 0;
      })
    );

    setCurrentSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const sessionSelected = (row) => {
    dispatch(extractSessionDetailsById(row?.uuid, navigateToPath));
  };

  useEffect(() => {
    dispatch(checkForPreviousUserSessions(false));
  }, [dispatch]);

  useEffect(() => {
    setTableRows(previousUserSessions);
  }, [previousUserSessions]);

  return {
    tableRows,
    sortRows,
    currentSortDir,
    sessionSelected,
    isHistoryLoading
  };
};

export default useExistingUserHome;