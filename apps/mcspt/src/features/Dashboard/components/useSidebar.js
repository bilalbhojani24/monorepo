import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { MCP_CONSTANTS, mcpAnalyticsEvent } from '@browserstack/mcp-shared';
import { MCP_ROUTES } from 'constants/routeConstants';
import { getUserData } from 'features/Dashboard';

const generatePrimaryNavs = (iconMap) => {
  const initialPrimaryNavsrimaryNavs = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      routePath: MCP_ROUTES.HOME,
      active: true
    },
    {
      id: 'testHistory',
      label: 'Test History',
      routePath: MCP_ROUTES.TEST_HISTORY
    }
  ];

  return initialPrimaryNavsrimaryNavs.map((nav) => ({
    ...nav,
    icon: iconMap[nav.id]
  }));
};

const generateSecondaryNav = (userData, iconMap) => {
  if (userData?.id) {
    return {
      id: 'logOut',
      label: userData?.attributes?.name,
      icon: iconMap.logOut
    };
  }
  return {
    id: 'logIn',
    label: 'Login',
    icon: iconMap.logIn
  };
};

const useSidebar = (sideNavIcons) => {
  const userData = useSelector(getUserData);

  const [primaryNavs, setPrimaryNavs] = useState(
    generatePrimaryNavs(sideNavIcons)
  );
  const [secondaryNavs, setSecondaryNavs] = useState(null);
  const [showUserNavModal, setShowUserNavModal] = useState(false);

  const { pathname } = useLocation();
  const navigateToPath = useNavigate();

  const loginViaSSO = () => {
    window.remoteThreadFunctions?.openUrlInSystemBrowser(
      MCP_CONSTANTS.SSO_AUTH_URL
    );

    mcpAnalyticsEvent('csptUserLoginLogoutClick', {
      loginbtn_action: 'login'
    });
  };

  const sidebarClicked = (event, clickedNavLink) => {
    if (clickedNavLink?.routePath) {
      navigateToPath(clickedNavLink?.routePath);
    } else if (userData?.id) {
      setShowUserNavModal(true);
    } else {
      loginViaSSO();
    }
  };

  useEffect(() => {
    setSecondaryNavs([generateSecondaryNav(userData, sideNavIcons)]);
  }, [sideNavIcons, userData]);

  useEffect(() => {
    setPrimaryNavs((prev) =>
      prev.map((nav) => ({
        ...nav,
        active: nav.routePath === pathname
      }))
    );
  }, [pathname]);

  return {
    primaryNavs,
    secondaryNavs,
    sidebarClicked,
    showUserNavModal,
    setShowUserNavModal
  };
};

export default useSidebar;