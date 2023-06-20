import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Badge,
  MdOpenInNew,
  MdOutlineDynamicFeed,
  MdOutlineHome,
  MdOutlineRecordVoiceOver,
  MdStar,
  MdTextSnippet
} from '@browserstack/bifrost';
import {
  initErrorLogger,
  setErrorLoggerUserContext,
  setStorage
} from '@browserstack/utils';
import {
  CHROME_EXTENSION_URL,
  events,
  PAID_PLAN,
  sentryConfig,
  TRIAL_EXPIRED,
  TRIAL_FAILED,
  TRIAL_IN_PROGRESS,
  TRIAL_NOT_STARTED
} from 'constants';
import { stagingEnvs } from 'constants/config';
import { addDays } from 'date-fns';
import { setIsShowingBanner } from 'features/Reports/slices/appSlice';
import { getIsShowingBanner } from 'features/Reports/slices/selector';
import { defaultPath, getBrowserStackBase, getCurrentEnv } from 'utils';
import {
  buyAcceesibilityPlan,
  countRemainingDays,
  getTimeDiffInDays
} from 'utils/helper';
import { logEvent, startLogging } from 'utils/logEvent';

import { setModalName, setModalShow } from '../slices/appSlice';
import {
  getIsFreeUser,
  getShowBanner,
  getTrialEndDate,
  getTrialState,
  getUser
} from '../slices/selectors';

const envConfig = stagingEnvs[getCurrentEnv()];

export default function useDashboard() {
  const mainRef = useRef(null);
  const dispatch = useDispatch();
  const showBanner = useSelector(getShowBanner);
  const isShowingBanner = useSelector(getIsShowingBanner);
  const user = useSelector(getUser);
  const isFreeUser = useSelector(getIsFreeUser);
  const [currentPath, setCurrentPath] = useState(defaultPath());
  const navigate = useNavigate();
  const trialEndDate = useSelector(getTrialEndDate);
  const trialState = useSelector(getTrialState);
  const remainingDays = countRemainingDays(new Date(), new Date(trialEndDate));
  const {
    plan_type: planType,
    show_expiry_sidebar_component: showTile,
    rft_eligible: isEligible
  } = useSelector(getUser);

  const showTrialTile = () => {
    const show =
      showTile &&
      trialState !== TRIAL_NOT_STARTED &&
      trialState !== TRIAL_IN_PROGRESS &&
      countRemainingDays(new Date(), addDays(new Date(trialEndDate), 60)) > 0;

    if (show) {
      logEvent('OnRTTrackingTile');
    }

    return show;
  };

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
      path: '/screen-reader',
      badge:
        planType !== PAID_PLAN ? (
          <Badge text="Premium" modifier="success" disabled />
        ) : null
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
      id: 'trial',
      label: 'Get 14-day free trial',
      activeIcon: MdStar,
      inActiveIcon: MdStar,
      path: '/',
      link: '',
      show:
        [TRIAL_NOT_STARTED, TRIAL_FAILED].includes(trialState) &&
        !showBanner &&
        planType !== PAID_PLAN &&
        isEligible
    },
    {
      id: 'extension',
      label: 'Download extension',
      activeIcon: MdOpenInNew,
      inActiveIcon: MdOpenInNew,
      path: '/',
      link: CHROME_EXTENSION_URL,
      show: true
    },
    {
      id: 'doc',
      label: 'View documentation',
      activeIcon: MdTextSnippet,
      inActiveIcon: MdTextSnippet,
      path: '/reports',
      link: 'https://www.browserstack.com/docs/accessibility/overview/introduction',
      show: true
    }
  ];

  const handleNavigationClick = (nav) => {
    if (nav.id === 'trial') {
      dispatch(setModalName('accessibility'));
      dispatch(setModalShow(true));
      logEvent('OnRTFeaturesUI', {
        platform: 'Dashboard',
        type: 'General',
        state: trialState === TRIAL_EXPIRED ? 'RT expired' : 'RT pending'
      });
      return;
    }
    if (nav.id === 'doc' || nav.id === 'extension') {
      window.open(nav.link, '_target');
    }
    navigate(nav.path);
    setCurrentPath(nav.id);
    if (nav.id === 'extension') {
      logEvent('ClickedOnDownloadExtensionCTA', {
        source: 'Left navbar'
      });
    }
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
    const data = {
      type: remainingDays > 0 ? 'Days left' : 'No days left',
      action: 'Get a demo'
    };
    if (remainingDays > 0) data.daysLeft = remainingDays;
    logEvent('InteractedWithRTTrackingTile', data);
  };

  const onBuyPlanClick = () => {
    buyAcceesibilityPlan();
    const data = {
      type: remainingDays > 0 ? 'Days left' : 'No days left',
      action: 'Buy a plan'
    };
    if (remainingDays > 0) data.daysLeft = remainingDays;
    logEvent('InteractedWithRTTrackingTile', data);
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
      initErrorLogger(sentryConfig);
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
    onCloseClick,
    onBuyPlanClick,
    showBanner,
    trialEndDate,
    showTrialTile,
    remainingDays
  };
}
