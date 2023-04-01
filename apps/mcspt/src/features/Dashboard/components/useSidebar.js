import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { SSO_AUTH_URL } from 'constants/mcpConstants';
import { getTotalCompletedSessions, getUserData } from 'features/Dashboard';
import { mcpAnalyticsEvent } from 'utils/analyticsUtils';

const generatePrimaryNavs = (iconMap) => {
  const initialPrimaryNavsrimaryNavs = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      routePath: '/',
      active: true
    },
    {
      id: 'testHistory',
      label: 'Test History',
      routePath: '/testHistory'
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
  const totalCompletedSessions = useSelector(getTotalCompletedSessions);

  const [primaryNavs, setPrimaryNavs] = useState(
    generatePrimaryNavs(sideNavIcons)
  );
  const [secondaryNavs, setSecondaryNavs] = useState(null);
  const [showUserNavModal, setShowUserNavModal] = useState(false);

  const { pathname } = useLocation();
  const navigateToPath = useNavigate();

  const loginViaSSO = () => {
    window.remoteThreadFunctions?.openUrlInSystemBrowser(SSO_AUTH_URL);

    mcpAnalyticsEvent('csptUserLoginClick', { totalCompletedSessions });
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
