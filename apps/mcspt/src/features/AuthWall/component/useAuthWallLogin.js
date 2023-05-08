import { useEffect } from 'react';
import { SSO_AUTH_URL } from 'constants/mcpConstants';
import { mcpAnalyticsEvent } from 'utils/analyticsUtils';

const useAuthWallLogin = () => {
  const authLoginButtonClicked = () => {
    window.remoteThreadFunctions?.openUrlInSystemBrowser(SSO_AUTH_URL);

    mcpAnalyticsEvent('csptUserLoginLogoutClick', {
      loginbtn_action: 'login'
    });
  };

  useEffect(() => {
    mcpAnalyticsEvent('csptLoginScreenView');
  }, []);

  return {
    authLoginButtonClicked
  };
};

export default useAuthWallLogin;
