import { useState } from 'react';
import { useSelector } from 'react-redux';

import { getPreviousUserSessions } from '../slices/homeSlice';

const useHome = () => {
  const [showNewSessionModal, setShowNewSessionModal] = useState(false);

  const previousUserSessions = useSelector(getPreviousUserSessions);

  const newTestClicked = () => {
    setShowNewSessionModal(true);
  };

  return {
    newTestClicked,
    showNewSessionModal,
    setShowNewSessionModal,
    previousUserSessions
  };
};

export default useHome;
