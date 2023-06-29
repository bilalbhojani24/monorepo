import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
import { MdOutlineTextSnippet, MdWeb } from '@browserstack/bifrost';
import AutomatioConsole from 'assets/icons/components/AutomationConsole';
import { AGAutomationConsoleInteracted } from 'constants/event-names';
import ROUTES from 'constants/routes';
import { getSelectedGridData } from 'features/GridConsole/slices/selector';
import { getEnvConfig } from 'utils/common';
import { logHSTEvent } from 'utils/logger';
import {
  getCurrentOnboardingTooltipcount,
  getShowOnboardingTooltips
} from 'features/GridDetail/slices/selector';
import { setCurrentOnboardingTooltipCount } from 'features/GridDetail/slices';
import { AUTOMATION_CONSOLE, BUILDS_DASHBOARD } from 'constants/strings';

const useLayout = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { docHomeURL } = getEnvConfig();

  const currentOnboardingTooltipCount = useSelector(
    getCurrentOnboardingTooltipcount
  );
  const selectedGridData = useSelector(getSelectedGridData);
  const showOnboardingTooltips = useSelector(getShowOnboardingTooltips);

  const [
    showTrialGridBannerInGridOverview,
    setShowTrialGridBannerInGridOverview
  ] = useState(false);

  const primaryNavs = [
    {
      id: 'grid-console',
      label: AUTOMATION_CONSOLE,
      activeIcon: AutomatioConsole,
      inActiveIcon: AutomatioConsole,
      onboardingTooltipContent:
        'Use Automation Console to view all your grids and create a new grid in future',
      onboardingTooltipHeader: 'View all grids',
      onboardingTooltipNextBtnhandler: () => {
        dispatch(setCurrentOnboardingTooltipCount(4));
      },
      path: ROUTES.GRID_CONSOLE,
      pattern: `${ROUTES.GRID_CONSOLE}/*`
    },
    {
      id: 'builds-dashboard',
      label: BUILDS_DASHBOARD,
      activeIcon: MdWeb,
      inActiveIcon: MdWeb,
      onboardingTooltipContent: 'Check your test results on Build Dashboard',
      onboardingTooltipHeader: 'Run and view build results ',
      onboardingTooltipNextBtnhandler: () => {
        dispatch(setCurrentOnboardingTooltipCount(5));
      },
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

  const isCurrent = useCallback(
    (navItem) => !!matchPath({ path: navItem.pattern }, location.pathname),
    [location.pathname]
  );

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

  useEffect(() => {
    if (selectedGridData && selectedGridData.isTrialGrid) {
      setShowTrialGridBannerInGridOverview(true);
    } else {
      setShowTrialGridBannerInGridOverview(false);
    }
  }, [selectedGridData]);

  return {
    currentOnboardingTooltipCount,
    isCurrent,
    navigate,
    navigationClickHandler,
    primaryNavs,
    secondaryNavs,
    showOnboardingTooltips,
    showTrialGridBannerInGridOverview
  };
};

export { useLayout };
