import { SidebarNavigation } from '@browserstack/bifrost';

const SideNav = () => {
  const primaryNavs = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      // activeIcon: HomeIcon,
      // inActiveIcon: HomeIcon,
      path: '/',
      badgeLabel: 'Active'
    }
  ];

  return <SidebarNavigation wrapperClass="mt-16" />;
};

export default SideNav;
