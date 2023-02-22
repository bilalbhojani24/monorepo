import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getPreviousUserSessions } from '../slices/homeSlice';
import { checkForPreviousUserSessions } from '../slices/homeThunks';

const useHome = () => {
  const [showNewSessionModal, setShowNewSessionModal] = useState(false);

  const dispatch = useDispatch();

  const previousUserSessions = useSelector(getPreviousUserSessions);

  const newTestClickHandler = () => {
    setShowNewSessionModal(true);
  };

  useEffect(() => {
    dispatch(checkForPreviousUserSessions());
  }, [dispatch]);

  return {
    newTestClickHandler,
    showNewSessionModal,
    setShowNewSessionModal,
    previousUserSessions
  };
};

export default useHome;
