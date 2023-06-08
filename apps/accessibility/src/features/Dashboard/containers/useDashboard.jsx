import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Badge,
  MdOutlineDynamicFeed,
  MdOutlineHome,
  MdOutlineRecordVoiceOver,
  MdTextSnippet
} from '@browserstack/bifrost';
import {
  initErrorLogger,
  setErrorLoggerUserContext,
  setStorage
} from '@browserstack/utils';
import { CHROME_EXTENSION_URL, events, SENTRY_DSN } from 'constants';
import { stagingEnvs } from 'constants/config';
import { setIsShowingBanner } from 'features/Reports/slices/appSlice';
import { getIsShowingBanner } from 'features/Reports/slices/selector';
import { defaultPath, getBrowserStackBase, getCurrentEnv } from 'utils';
import { getTimeDiffInDays } from 'utils/helper';
import { logEvent, startLogging } from 'utils/logEvent';

import { getIsFreeUser, getUser } from '../slices/selectors';

const envConfig = stagingEnvs[getCurrentEnv()];

export default function useDashboard() {
  const mainRef = useRef(null);
  const dispatch = useDispatch();
  const isShowingBanner = useSelector(getIsShowingBanner);
  const user = useSelector(getUser);
  const isFreeUser = useSelector(getIsFreeUser);
  const [currentPath, setCurrentPath] = useState(defaultPath());
  const navigate = useNavigate();
  const shouldShowNewBadge = () => {
    const lastTimeSaved = new Date(
      parseInt(localStorage.getItem('newSiteScannerBadge'), 10)
    );
    if (lastTimeSaved) {
      const currentTime = new Date().getTime();
      return getTimeDiffInDays(currentTime, lastTimeSaved) <= 14;
    }
    return true;
  };
  const primaryNav = [
    {
      id: 'report-listing',
      label: 'All reports',
      activeIcon: MdOutlineHome,
      inActiveIcon: MdOutlineHome,
      path: '/reports'
    },
    {
      id: 'screen-reader',
      label: 'Screen reader',
      activeIcon: MdOutlineRecordVoiceOver,
      inActiveIcon: MdOutlineRecordVoiceOver,
      path: '/screen-reader'
    },
    {
      id: 'site-scanner',
      label: 'Website scanner',
      activeIcon: MdOutlineDynamicFeed,
      inActiveIcon: MdOutlineDynamicFeed,
      path: '/site-scanner',
      badge: shouldShowNewBadge() ? <Badge text="New" /> : null
    }
  ];

  const secondaryNav = [
    {
      id: 'doc',
      label: 'View documentation',
      activeIcon: MdTextSnippet,
      inActiveIcon: MdTextSnippet,
      path: '/reports',
      link: 'https://www.browserstack.com/docs/accessibility/overview/introduction'
    }
  ];

  const handleNavigationClick = (nav) => {
    if (nav.id === 'doc') {
      window.open(nav.link, '_target');
    }
    navigate(nav.path);
    setCurrentPath(nav.id);
  };

  const onCloseClick = () => {
    dispatch(setIsShowingBanner(false));
    logEvent('InteractedWithADHomepage', {
      actionType: events.CLOSE_BANNER
    });
  };

  const onDownloadExtensionClick = () => {
    dispatch(setIsShowingBanner(false));
    setStorage('showed-extension-banner', true);
    window.open(CHROME_EXTENSION_URL, '_target');
  };

  const onGetADemoClick = () => {
    logEvent('ClickedGetaDemo', {
      signed_in: true,
      Product: 'Accessibility Testing',
      Section: 'dashboard-left-panel',
      URL: window.location.href
    });
    window.open(
      `${getBrowserStackBase()}/contact?&ref=accessibility-dashboard-demo-lead`,
      '_blank'
    );
  };

  useEffect(() => {
    if (!localStorage.getItem('newSiteScannerBadge')) {
      localStorage.setItem('newSiteScannerBadge', new Date().getTime());
    }
    try {
      startLogging();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('EDS already initialize...');
    }
  }, []);

  // init sentry
  useEffect(() => {
    const { enableSentry } = envConfig;
    if (enableSentry && !window.isSentryInitialized) {
      window.isSentryInitialized = true;
      initErrorLogger({
        dsn: SENTRY_DSN,
        debug: false,
        release: 'v0.1-o11y',
        environment: 'production',
        tracesSampleRate: 1.0,
        denyUrls: [
          // Ignoring errors getting generated from Chrome extensions as these are not to be logged under our sentry env.
          /extensions\//i,
          /^chrome:\/\//i,
          /extension:\//i,
          // Ignoring VWO related errors as there is no specific library upgrade which can resolve the errors.
          // Also the errors we are getting are more or less specfic to some of the users.
          /https:\/\/dev.visualwebsiteoptimizer.com\/.*/gi,
          // Ignore errors getting raised from freshchat widget related code.
          /https:\/\/wchat.freshchat.com\/.*/gi
        ]
      });
    }
    if (user.user_id && window.isSentryInitialized) {
      setErrorLoggerUserContext(user.user_id);
    }
  }, [user.user_id]);

  return {
    mainRef,
    isShowingBanner,
    isFreeUser,
    primaryNav,
    currentPath,
    secondaryNav,
    onGetADemoClick,
    handleNavigationClick,
    onDownloadExtensionClick,
    onCloseClick
  };
}
