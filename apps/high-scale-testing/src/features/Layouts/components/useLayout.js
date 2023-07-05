import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
import { MdOutlineTextSnippet, MdWeb } from '@browserstack/bifrost';
import { updateMetadata } from 'api/index';
import AutomatioConsole from 'assets/icons/components/AutomationConsole';
import { AGAutomationConsoleInteracted } from 'constants/event-names';
import ROUTES from 'constants/routes';
import { AUTOMATION_CONSOLE, BUILDS_DASHBOARD } from 'constants/strings';
import {
  getGridsData,
  getSelectedGridData
} from 'features/GridConsole/slices/selector';
import {
  setCurrentOnboardingTooltipCount,
  setShowOnboardingTooltips
} from 'features/GridDetail/slices';
import {
  getCurrentOnboardingTooltipcount,
  getShowOnboardingTooltips
} from 'features/GridDetail/slices/selector';
import {
  getLastKnownSetupType,
  getTrialGrid,
  getUserDetails
} from 'globalSlice/selector';
import { getEnvConfig } from 'utils/common';
import { logHSTEvent } from 'utils/logger';

const useLayout = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { docHomeURL } = getEnvConfig();

  // All Store variables:
  const currentOnboardingTooltipCount = useSelector(
    getCurrentOnboardingTooltipcount
  );
  const gridsList = useSelector(getGridsData);
  const lastKnownSetupType = useSelector(getLastKnownSetupType);
  const selectedGridData = useSelector(getSelectedGridData);
  const showOnboardingTooltips = useSelector(getShowOnboardingTooltips);
  const trialGrid = useSelector(getTrialGrid);
  const userDetails = useSelector(getUserDetails);

  // All State variables:
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
      onboardingTooltipSkipBtnHandler: () => {
        updateMetadata(userDetails.id, true);
        dispatch(setShowOnboardingTooltips(false));
      },
      path: ROUTES.AUTOMATION_CONSOLE,
      pattern: `${ROUTES.AUTOMATION_CONSOLE}/*`
    },
    {
      id: 'builds-dashboard',
      label: BUILDS_DASHBOARD,
      activeIcon: MdWeb,
      inActiveIcon: MdWeb,
      onboardingTooltipContent: 'Check your test results on Build Dashboard',
      onboardingTooltipHeader: 'Run and view build results ',
      onboardingTooltipNextBtnhandler: () => {
        updateMetadata(userDetails.id, true);
        dispatch(setCurrentOnboardingTooltipCount(5));
      },
      onboardingTooltipSkipBtnHandler: () => {
        updateMetadata(userDetails.id, true);
        dispatch(setShowOnboardingTooltips(false));
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

  // All Functions:
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

  // All use effects
  useEffect(() => {
    const { isUsed } = trialGrid;

    setShowTrialGridBannerInGridOverview(isUsed || false);
  }, [selectedGridData, trialGrid]);

  return {
    currentOnboardingTooltipCount,
    gridsList,
    isCurrent,
    lastKnownSetupType,
    navigate,
    navigationClickHandler,
    primaryNavs,
    secondaryNavs,
    selectedGridData,
    showOnboardingTooltips,
    showTrialGridBannerInGridOverview,
    trialGrid,
    userDetails
  };
};

export { useLayout };
