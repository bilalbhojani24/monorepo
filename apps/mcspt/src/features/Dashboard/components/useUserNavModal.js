import { useDispatch, useSelector } from 'react-redux';
import { getUserData, logUserOutAndPurgeSessionData } from 'features/Dashboard';

const useUserNavModal = (setShowUserNavModal) => {
  const userData = useSelector(getUserData);

  const dispatch = useDispatch();

  const logOutUser = () => {
    dispatch(logUserOutAndPurgeSessionData());
    setShowUserNavModal(false);
  };

  return { logOutUser, userData };
};

export default useUserNavModal;
