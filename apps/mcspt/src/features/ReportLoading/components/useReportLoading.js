import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getLatestSessionStatus } from '../slices/reportLoadingSlice';
import { checkSessionStatus } from '../slices/reportLoadingThunks';

const useReportLoading = () => {
  const sessionState = useSelector(getLatestSessionStatus);

  const dispatch = useDispatch();

  const navigateToPath = useNavigate();

  const onCancelClicked = () => {
    navigateToPath('/');
  };

  useEffect(() => {
    dispatch(checkSessionStatus());
  }, [dispatch]);

  return { sessionState, onCancelClicked };
};

export default useReportLoading;
