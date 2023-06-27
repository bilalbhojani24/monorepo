import { useCallback, useState } from 'react';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
import { MdOutlineTextSnippet, MdWeb } from '@browserstack/bifrost';
import AutomatioConsole from 'assets/icons/components/AutomationConsole';
import { AGAutomationConsoleInteracted } from 'constants/event-names';
import ROUTES from 'constants/routes';
import { getEnvConfig } from 'utils/common';
import { logHSTEvent } from 'utils/logger';

const useLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { docHomeURL } = getEnvConfig();

  const [
    showTrialGridBannerInGridOverview,
    setShowTrialGridBannerInGridOverview
  ] = useState(false);

  const isCurrent = useCallback(
    (navItem) => !!matchPath({ path: navItem.pattern }, location.pathname),
    [location.pathname]
  );

  const primaryNavs = [
    {
      id: 'grid-console',
      label: 'Automation Console',
      activeIcon: AutomatioConsole,
      inActiveIcon: AutomatioConsole,
      path: ROUTES.GRID_CONSOLE,
      pattern: `${ROUTES.GRID_CONSOLE}/*`
    },
    {
      id: 'builds-dashboard',
      label: 'Builds Dashboard',
      activeIcon: MdWeb,
      inActiveIcon: MdWeb,
      path: ROUTES.BUILDS,
      pattern: `${ROUTES.BUILDS}/*`
    }
  ];

  const secondaryNavs = [
    {
      id: 'documentation',
      label: 'Documentation',
      activeIcon: MdOutlineTextSnippet,
      inActiveIcon: MdOutlineTextSnippet,
      path: 'https://www.browserstack.com/docs/automation-grid'
    }
  ];

  const navigationClickHandler = (item) => {
    if (item.id === 'builds-dashboard') {
      logHSTEvent(['amplitude'], 'web_events', AGAutomationConsoleInteracted, {
        action: 'builddashboard_clicked',
        currentPath: location.pathname
      });
      window.location.href = item.path;
    } else if (item.id === 'grid-console') {
      const { path } = item;
      logHSTEvent(['amplitude'], 'web_events', AGAutomationConsoleInteracted, {
        action: 'gridconsole_clicked',
        currentPath: location.pathname
      });
      navigate(path);
    } else if (item.id === 'documentation') {
      logHSTEvent(['amplitude'], 'web_events', AGAutomationConsoleInteracted, {
        action: 'viewdoc_clicked',
        currentPath: location.pathname
      });
      window.location.href = docHomeURL;
    }
  };

  return {
    isCurrent,
    navigate,
    navigationClickHandler,
    primaryNavs,
    secondaryNavs,
    showTrialGridBannerInGridOverview
  };
};

export { useLayout };
