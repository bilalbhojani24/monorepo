import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  getAuthWallState,
  getIsAuthWallChecked
} from '../slices/authWallSlice';
import { checkHistoryAndUserForAuthWall } from '../slices/authWallThunks';

const useAuthWall = () => {
  const dispatch = useDispatch();
  const navigateToPath = useNavigate();

  const isAuthWallChecked = useSelector(getIsAuthWallChecked);
  const authWallActivated = useSelector(getAuthWallState);

  useEffect(() => {
    dispatch(checkHistoryAndUserForAuthWall(navigateToPath));
  }, [dispatch, navigateToPath]);

  return { isAuthWallChecked, authWallActivated };
};

export default useAuthWall;
