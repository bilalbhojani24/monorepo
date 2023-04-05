import { useSelector } from 'react-redux';

import {
  getAuthModalStatusText,
  getShowAuthLoadingModal
} from '../slices/dashboardSlice';

const useAuthLoadingModal = () => {
  const showAuthLoadingModal = useSelector(getShowAuthLoadingModal);
  const authModalStatusText = useSelector(getAuthModalStatusText);

  return {
    showAuthLoadingModal,
    authModalStatusText
  };
};

export default useAuthLoadingModal;
