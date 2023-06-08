import React, { useCallback } from 'react';
import { matchPath, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  HomeIcon,
  MdOutlineTextSnippet,
  NotificationsContainer,
  SidebarItem,
  SidebarNavigation,
  UsersIcon
} from '@browserstack/bifrost';
import { logEvent } from '@browserstack/utils';
import { AGAutomationConsoleInteracted } from 'constants/event-names';
import ROUTES from 'constants/routes';
import HSTHeader from 'features/HSTHeader/component';

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const primaryNavs = [
    {
      id: 'grid-console',
      label: 'Automation Console',
      activeIcon: HomeIcon,
      inActiveIcon: HomeIcon,
      path: ROUTES.GRID_CONSOLE,
      pattern: `${ROUTES.GRID_CONSOLE}/*`
    },
    {
      id: 'builds-dashboard',
      label: 'Builds Dashboard',
      activeIcon: UsersIcon,
      inActiveIcon: UsersIcon,
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
      logEvent(['amplitude'], 'web_events', AGAutomationConsoleInteracted, {
        action: 'builddashboard_clicked'
      });
      window.location.href = item.path;
    } else {
      const { path } = item;
      navigate(path);
    }
  };

  return (
    <>
      <HSTHeader />
      <main className="bg-base-50 flex">
        <nav
          className="sticky"
          style={{
            height: `calc(100vh - 64px)`,
            top: `64px`
          }}
        >
          <SidebarNavigation
            sidebarPrimaryNavigation={primaryNavs.map((item) => (
              <SidebarItem
                current={isCurrent(item)}
                nav={item}
                handleNavigationClick={navigationClickHandler}
              />
            ))}
            sidebarSecondaryNavigation={secondaryNavs.map((item) => (
              <SidebarItem nav={item} />
            ))}
            wrapperClassName="md:sticky bg-white py-5 px-2 w-64 flex-none md:inset-y-16 h-full"
          />
        </nav>
        <Outlet />

        <NotificationsContainer />
      </main>
    </>
  );
};

export default Layout;
