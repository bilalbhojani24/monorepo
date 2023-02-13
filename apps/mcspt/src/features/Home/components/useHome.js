import { useState } from 'react';
import { useSelector } from 'react-redux';

import { getPreviousUserSessions } from '../slices/homeSlice';

export default function useHome() {
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
}
