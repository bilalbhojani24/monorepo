import { useDispatch, useSelector } from 'react-redux';
import { mcpAnalyticsEvent } from '@browserstack/mcp-shared';
import { getUserData, logUserOutAndPurgeSessionData } from 'features/Dashboard';

const useUserNavModal = (setShowUserNavModal) => {
  const userData = useSelector(getUserData);

  const dispatch = useDispatch();

  const logOutUser = () => {
    dispatch(logUserOutAndPurgeSessionData());
    setShowUserNavModal(false);

    mcpAnalyticsEvent('csptUserLoginLogoutClick', {
      loginbtn_action: 'logout'
    });
  };

  return { logOutUser, userData };
};

export default useUserNavModal;
