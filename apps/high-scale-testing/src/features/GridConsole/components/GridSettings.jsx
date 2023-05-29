import React from 'react';
import { Outlet, useLocation, useMatch, useNavigate } from 'react-router-dom';
import { SidebarItem, SidebarNavigation } from '@browserstack/bifrost';
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

  return (
    <div className="flex">
      <SidebarNavigation
        sidebarPrimaryNavigation={navItems.map((item) => (
          <SidebarItem
            nav={item}
            handleNavigationClick={navigationClickHandler}
          />
        ))}
        wrapperClassName="md:sticky bg-base-50 py-5 px-2 w-64 flex-none md:inset-y-16"
      />
      <Outlet />
    </div>
  );
};

export default GridSettings;
