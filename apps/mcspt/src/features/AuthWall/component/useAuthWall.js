import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { checkHistoryAndUserForAuthWall } from '../slices/authWallThunks';

const useAuthWall = () => {
  const dispatch = useDispatch();

  const navigateToPath = useNavigate();

  useEffect(() => {
    dispatch(checkHistoryAndUserForAuthWall(navigateToPath));
  }, [dispatch, navigateToPath]);
};

export default useAuthWall;
