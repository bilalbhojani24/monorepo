import { useDispatch, useSelector } from 'react-redux';
import { getUserData, logUserOutAndPurgeSessionData } from 'features/Dashboard';

const useUserNavModal = () => {
  const userData = useSelector(getUserData);

  const dispatch = useDispatch();

  const logOutUser = () => {
    dispatch(logUserOutAndPurgeSessionData());
  };

  return { logOutUser, userData };
};

export default useUserNavModal;
