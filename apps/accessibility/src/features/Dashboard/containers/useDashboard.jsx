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
import { setStorage } from '@browserstack/utils';
import { CHROME_EXTENSION_URL, events } from 'constants';
import { setIsShowingBanner } from 'features/Reports/slices/appSlice';
import { getIsShowingBanner } from 'features/Reports/slices/selector';
import { defaultPath } from 'utils';
import { logEvent } from 'utils/logEvent';

// import { getSidebarCollapsedStatus } from '../slices/selectors';

export default function useDashboard() {
  const mainRef = useRef(null);
  const dispatch = useDispatch();
  const isShowingBanner = useSelector(getIsShowingBanner);
  const [currentPath, setCurrentPath] = useState(defaultPath());
  const navigate = useNavigate();
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
      badge:
        localStorage.getItem('newSiteScannerBadge') === 'true' ? (
          <Badge text="New" />
        ) : null
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
    if (nav.id === 'site-scanner') {
      localStorage.setItem('newSiteScannerBadge', 'false');
    }
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

  useEffect(() => {
    if (localStorage.getItem('newSiteScannerBadge') !== 'false') {
      localStorage.setItem('newSiteScannerBadge', true);
    }
  }, []);

  return {
    mainRef,
    isShowingBanner,
    primaryNav,
    currentPath,
    secondaryNav,
    handleNavigationClick,
    onDownloadExtensionClick,
    onCloseClick
  };
}
