import React from 'react';
import { useLocation, useMatch, useNavigate } from 'react-router-dom';
import {
  PageHeadings,
  SidebarItem,
  SidebarNavigation,
  Tabs
} from '@browserstack/bifrost';
import { useMountEffect } from '@browserstack/hooks';
import ROUTES from 'constants/routes';

const GridSettings = () => {
  const navigate = useNavigate();

  const navItems = [
    {
      id: 'general',
      label: 'General',
      activeIcon: () => <></>,
      inActiveIcon: () => <></>,
      path: ROUTES.GRID_SETTINGS_GENERAL
    },
    {
      id: 'browsers',
      label: 'Browsers',
      activeIcon: () => <></>,
      inActiveIcon: () => <></>,
      path: '/browsers'
    },
    {
      id: 'timeouts',
      label: 'Timeouts',
      activeIcon: () => <></>,
      inActiveIcon: () => <></>,
      path: '/timeouts'
    },
    {
      id: 'test-artifacts',
      label: 'Test Artifacts',
      activeIcon: () => <></>,
      inActiveIcon: () => <></>,
      path: '/test-artifacts'
    }
  ];

  const navigationClickHandler = (item) => {
    const { path } = item;
    navigate(path);
  };

  const isRootSettings = useMatch(ROUTES.GRID_SETTINGS);
  const isGeneralSettings = useMatch(ROUTES.GRID_SETTINGS_GENERAL);

  useMountEffect(() => {
    console.log('Log: isRootSettings:', isRootSettings);
    if (isRootSettings === null) {
      if (isGeneralSettings) {
        console.log('Log: Landed on General Settings');
      }
    } else {
      console.log('Log: else');
      // navigate(ROUTES.GRID_SETTINGS_GENERAL);
    }
  });

  return (
    <>
      <SidebarNavigation
        sidebarPrimaryNavigation={navItems.map((item) => (
          <SidebarItem
            nav={item}
            handleNavigationClick={navigationClickHandler}
          />
        ))}
        wrapperClassName="md:sticky bg-base-50 py-5 px-2 w-64 flex-none md:inset-y-16"
      />
    </>
  );
};

export default GridSettings;
