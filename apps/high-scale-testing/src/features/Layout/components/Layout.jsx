import React from 'react';
import { Outlet } from 'react-router-dom';
import {
  Header,
  HomeIcon,
  MdOutlineTextSnippet,
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

  const secondaryNavs = [
    {
      id: 'documentation',
      label: 'Documentation',
      activeIcon: MdOutlineTextSnippet,
      inActiveIcon: MdOutlineTextSnippet,
      path: '/'
    }
  ];

  return (
    <>
      <Header
        documentation={{
          options: [
            {
              link: 'https://www.browserstack.com/',
              name: 'lorem'
            },
            {
              link: 'https://www.browserstack.com/live',
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
              link: 'https://www.browserstack.com/app-live',
              name: 'lorem'
            },
            {
              link: 'https://www.browserstack.com/automate',
              name: 'ipsum'
            }
          ],
          title: 'References'
        }}
        release="alpha"
        wrapperClassName="sticky"
      />
      <main className="flex bg-base-50">
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
            sidebarSecondaryNavigation={secondaryNavs.map((item, idx) => (
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
