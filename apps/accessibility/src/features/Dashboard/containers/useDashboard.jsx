import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Badge,
  MdOutlineDynamicFeed,
  MdOutlineHome,
  MdOutlineMotionPhotosAuto,
  MdOutlineRecordVoiceOver,
  MdTextSnippet
} from '@browserstack/bifrost';
import { setStorage } from '@browserstack/utils';
import { CHROME_EXTENSION_URL, events } from 'constants';
import { getUser } from 'features/Dashboard/slices/selectors';
import { setIsShowingBanner } from 'features/Reports/slices/appSlice';
import { getIsShowingBanner } from 'features/Reports/slices/selector';
import { defaultPath, getBrowserStackBase } from 'utils';
import { getTimeDiffInDays } from 'utils/helper';
import { logEvent, startLogging } from 'utils/logEvent';

export default function useDashboard() {
  const mainRef = useRef(null);
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const isShowingBanner = useSelector(getIsShowingBanner);
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
  const isBrowserStackUser = user.group_id === 2;
  const primaryNav = [
    {
      id: 'report-listing',
      label: 'Manual test reports',
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

  if (isBrowserStackUser) {
    primaryNav.push({
      id: 'automated-tests',
      label: 'Automated tests',
      activeIcon: MdOutlineMotionPhotosAuto,
      inActiveIcon: MdOutlineMotionPhotosAuto,
      path: '/automated-tests/projects',
      badge: shouldShowNewBadge() ? <Badge text="New" /> : null
    });
  }

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
      console.log('EDS already initialize...');
    }
  }, []);

  return {
    mainRef,
    isShowingBanner,
    primaryNav,
    currentPath,
    secondaryNav,
    onGetADemoClick,
    handleNavigationClick,
    onDownloadExtensionClick,
    onCloseClick
  };
}
