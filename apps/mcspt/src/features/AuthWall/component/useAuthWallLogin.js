import { useEffect } from 'react';
import { MCP_CONSTANTS, mcpAnalyticsEvent } from '@browserstack/mcp-shared';

const useAuthWallLogin = () => {
  const authLoginButtonClicked = () => {
    window.remoteThreadFunctions?.openUrlInSystemBrowser(
      MCP_CONSTANTS.SSO_AUTH_URL
    );

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
