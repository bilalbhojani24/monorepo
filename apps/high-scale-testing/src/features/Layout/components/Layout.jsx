import React from 'react';
import { Outlet } from 'react-router-dom';
import {
  HomeIcon,
  MdOutlineTextSnippet,
  SidebarItem,
  SidebarNavigation,
  UsersIcon
} from '@browserstack/bifrost';
import HSTHeader from 'features/HSTHeader/component';

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
