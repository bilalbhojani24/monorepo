import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Badge,
  MdOpenInNew,
  MdOutlineDynamicFeed,
  MdOutlineHome,
  MdOutlineRecordVoiceOver,
  MdTextSnippet
} from '@browserstack/bifrost';
import { setStorage } from '@browserstack/utils';
import confetti from 'canvas-confetti';
import {
  CHROME_EXTENSION_URL,
  events,
  TRIAL_IN_PROGRESS,
  TRIAL_NOT_STARTED
} from 'constants';
import { addDays } from 'date-fns';
import { setIsShowingBanner } from 'features/Reports/slices/appSlice';
import { defaultPath, getBrowserStackBase } from 'utils';
import { getTimeDiffInDays } from 'utils/helper';
import { logEvent, startLogging } from 'utils/logEvent';

import {
  getShowBanner,
  getTrialEligibility,
  getTrialEndDate,
  getTrialState
} from '../slices/selectors';

export default function useDashboard() {
  const mainRef = useRef(null);
  const dispatch = useDispatch();
  const showBanner = useSelector(getShowBanner);
  const [currentPath, setCurrentPath] = useState(defaultPath());
  const navigate = useNavigate();
  const isEligible = useSelector(getTrialEligibility);
  const trialEndDate = useSelector(getTrialEndDate);
  const trialState = useSelector(getTrialState);

  const getRemainingDays = (
    date1 = new Date(),
    date2 = new Date(trialEndDate)
  ) => {
    const difference = date2 - date1;
    if (difference < 0) {
      return 0;
    }
    const remainingDays = difference / (1000 * 3600 * 24);
    if (remainingDays > 0 && remainingDays < 1) {
      return 1;
    }
    return Math.floor(remainingDays);
  };

  const showTrialTile = () =>
    isEligible &&
    trialState !== TRIAL_NOT_STARTED &&
    trialState !== TRIAL_IN_PROGRESS &&
    getRemainingDays(new Date(), addDays(new Date(trialEndDate), 60)) > 0;

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
      id: 'extension',
      label: 'Download extension',
      activeIcon: MdOpenInNew,
      inActiveIcon: MdOpenInNew,
      path: '/',
      link: CHROME_EXTENSION_URL
    },
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
    if (nav.id === 'doc' || nav.id === 'extension') {
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

  const onBuyPlanClick = () => {
    logEvent('ClickedBuyaPlan', {
      signed_in: true,
      Product: 'Accessibility Testing',
      Section: 'dashboard-left-panel',
      URL: window.location.href
    });
    window.open(
      `${getBrowserStackBase()}/pricing?product=accessibility-testing`,
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
      console.log('EDS already initialize...');
    }
  }, []);

  useEffect(() => {
    confetti({
      particleCount: 400,
      spread: 120,
      startVelocity: 40,
      origin: {
        x: 0,
        y: 0.5
      }
    });
    confetti({
      particleCount: 400,
      spread: 120,
      startVelocity: 40,
      origin: {
        x: 1,
        y: 0.5
      }
    });
  }, []);

  return {
    mainRef,
    primaryNav,
    currentPath,
    secondaryNav,
    onGetADemoClick,
    handleNavigationClick,
    onDownloadExtensionClick,
    onCloseClick,
    onBuyPlanClick,
    showBanner,
    trialEndDate,
    getRemainingDays,
    showTrialTile
  };
}
