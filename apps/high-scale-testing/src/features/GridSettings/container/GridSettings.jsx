import React, { useCallback } from 'react';
import {
  matchPath,
  Outlet,
  useLocation,
  useNavigate,
  useParams
} from 'react-router-dom';
import { SidebarItem, SidebarNavigation } from '@browserstack/bifrost';
import ROUTES from 'constants/routes';

const GridSettings = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  const { id: gridID } = params;

  const SETTINGS_BASE_URL = `${ROUTES.GRID_CONSOLE}/grid/${gridID}/settings`;

  const navItems = [
    {
      id: 'general',
      label: 'General',
      activeIcon: () => <></>,
      inActiveIcon: () => <></>,
      path: `${SETTINGS_BASE_URL}/general`
    },
    {
      id: 'browsers',
      label: 'Browsers',
      activeIcon: () => <></>,
      inActiveIcon: () => <></>,
      path: `${SETTINGS_BASE_URL}/browsers`
    },
    {
      id: 'timeouts',
      label: 'Timeouts',
      activeIcon: () => <></>,
      inActiveIcon: () => <></>,
      path: `${SETTINGS_BASE_URL}/timeout`
    },
    {
      id: 'test-artifacts',
      label: 'Test Artifacts',
      activeIcon: () => <></>,
      inActiveIcon: () => <></>,
      path: `${SETTINGS_BASE_URL}/test-artifacts`
    }
  ];

  const isCurrent = useCallback(
    (navItem) => !!matchPath({ path: navItem.path }, location.pathname),
    [location.pathname]
  );

  const navigationClickHandler = (item) => {
    const { path } = item;
    navigate(path);
  };

  return (
    <div className="flex">
      <SidebarNavigation
        sidebarPrimaryNavigation={navItems.map((item) => (
          <SidebarItem
            current={isCurrent(item)}
            nav={item}
            handleNavigationClick={navigationClickHandler}
          />
        ))}
        wrapperClassName=" border-0 md:sticky bg-base-50 p-6 w-64 flex-none md:inset-y-16"
      />

      <div className="border-base-200 my-6 mr-6 grow rounded-lg border">
        <div className="bg-white ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default GridSettings;
