import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  extractSessionDetailsById,
  getPreviousUserSessions
} from 'features/TestHistory';

const useRecentTests = () => {
  const previousUserSessions = useSelector(getPreviousUserSessions);

  const navigateToPath = useNavigate();

  const dispatch = useDispatch();

  const [tableRows, setTableRows] = useState([]);

  const navigateToTestHistory = () => {
    navigateToPath('/testHistory');
  };

  const sessionSelected = (row) => {
    dispatch(extractSessionDetailsById(row?.uuid, navigateToPath));
  };

  useEffect(() => {
    setTableRows(previousUserSessions?.slice(previousUserSessions?.length - 3));
  }, [previousUserSessions]);

  return {
    navigateToTestHistory,
    recentTestRows: tableRows,
    sessionSelected
  };
};

export default useRecentTests;
