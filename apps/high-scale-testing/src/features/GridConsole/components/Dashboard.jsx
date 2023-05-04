import React from 'react';
import {
  Badge,
  HomeIcon,
  SidebarItem,
  SidebarNavigation,
  UsersIcon
} from '@browserstack/bifrost';

const Dashboard = () => {
  // eslint-disable-next-line no-console
  console.log('Log: Dashboard ');

  const primaryNavs = [
    {
      id: 'dashboard',
      label: 'Automation Console',
      activeIcon: HomeIcon,
      inActiveIcon: HomeIcon,
      path: '/',
      badge: <Badge text="Active" />
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
      <main>
        <SidebarNavigation
          sidebarPrimaryNavigation={primaryNavs.map((item, idx) => (
            <SidebarItem nav={item} current={idx === 3} />
          ))}
          wrapperClassName="md:inset-y-16"
        />
      </main>
    </>
  );
};

export default Dashboard;
