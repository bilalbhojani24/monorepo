import { useSelector } from 'react-redux';

import {
  getIsUserLoggedIn,
  getShowAuthLoadingModal
} from '../slices/dashboardSlice';

const useAuthLoadingModal = () => {
  const showAuthLoadingModal = useSelector(getShowAuthLoadingModal);
  const isUserLoggedIn = useSelector(getIsUserLoggedIn);

  return {
    showAuthLoadingModal,
    isUserLoggedIn
  };
};

export default useAuthLoadingModal;
