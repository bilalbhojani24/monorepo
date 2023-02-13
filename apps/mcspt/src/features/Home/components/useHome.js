import { useState } from 'react';
import { useSelector } from 'react-redux';

import { getPreviousUserSessions } from '../slices/homeSlice';

const useHome = () => {
  const [showNewSessionModal, setShowNewSessionModal] = useState(false);

  const previousUserSessions = useSelector(getPreviousUserSessions);

  const newTestClickHandler = () => {
    setShowNewSessionModal(true);
  };

  return {
    newTestClickHandler,
    showNewSessionModal,
    setShowNewSessionModal,
    previousUserSessions
  };
};

export default useHome;
