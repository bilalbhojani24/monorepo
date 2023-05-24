import React from 'react';
import { Outlet } from 'react-router-dom';
import {
  Badge,
  Header,
  HomeIcon,
  SidebarItem,
  SidebarNavigation,
  UsersIcon
} from '@browserstack/bifrost';
import ROUTES from 'constants/routes';

const Layout = () => {
  const primaryNavs = [
    {
      id: 'dashboard',
      label: 'Automation Console',
      activeIcon: HomeIcon,
      inActiveIcon: HomeIcon,
      path: '/'
    },
    {
      id: 'team',
      label: 'Builds Dashboard',
      activeIcon: UsersIcon,
      inActiveIcon: UsersIcon,
      path: '/team'
    }
  ];
  return (
    <>
      <Header
        documentation={{
          options: [
            {
              link: 'https://www.browserstack.com',
              name: 'lorem'
            },
            {
              link: 'https://www.browserstack.com',
              name: 'ipsum'
            }
          ],
          title: 'Documentation'
        }}
        headerElementArray={['team', 'help', 'account']}
        onSignoutClick={(e) => {
          e.preventDefault();
          window.location.href = window.location.origin + ROUTES.SIGN_OUT;
        }}
        productName="Automation Grid"
        productLink={ROUTES.GRID_CONSOLE}
        planButtonVisible={false}
        references={{
          options: [
            {
              link: 'https://www.browserstack.com',
              name: 'lorem'
            },
            {
              link: 'https://www.browserstack.com',
              name: 'ipsum'
            }
          ],
          title: 'References'
        }}
        release="alpha"
        wrapperClassName="sticky"
      />
      <main className="bg-base-50 flex">
        <nav
          className="sticky"
          style={{
            height: `calc(100vh - 64px)`,
            top: `64px`
          }}
        >
          <SidebarNavigation
            sidebarPrimaryNavigation={primaryNavs.map((item, idx) => (
              <SidebarItem nav={item} current={idx === 3} />
            ))}
            wrapperClassName="md:sticky bg-white py-5 px-2 w-64 flex-none md:inset-y-16 h-full"
          />
        </nav>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
