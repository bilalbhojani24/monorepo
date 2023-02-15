// NOTE: Don't remove sidebar logic, will add once it required
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
// import Sidebar from 'app/bsA11y/Sidebar';
import { useNavigate } from 'react-router-dom';
import {
  Badge,
  MdOutlineHome,
  SidebarItem,
  SidebarNavigation
} from '@browserstack/bifrost';
import { arrayOf, node, oneOfType, string } from 'prop-types';

import { getSidebarCollapsedStatus } from '../slices/selectors';

export default function Dashboard({ children }) {
  const isSidebarCollapsed = useSelector(getSidebarCollapsedStatus);
  const [currentPath, setCurrentPath] = useState();
  const navigate = useNavigate();
  const primaryNavs = [
    {
      id: 'report-listing',
      label: 'All reports',
      activeIcon: MdOutlineHome,
      inActiveIcon: MdOutlineHome,
      path: '/reports'
    },
    {
      id: 'screen-reader',
      label: 'Assistive tech',
      activeIcon: MdOutlineHome,
      inActiveIcon: MdOutlineHome,
      path: '/screen-reader',
      badge: <Badge text="New" />
    }
  ];

  const handleNavigationClick = (nav) => {
    navigate(nav.path);
    setCurrentPath(nav.id);
  };

  const SWBSidebarPri = primaryNavs.map((item) => (
    <SidebarItem
      key={item.id}
      nav={item}
      current={item.id === currentPath}
      handleNavigationClick={handleNavigationClick}
    />
  ));

  return (
    <div>
      <header className="fixed top-0 z-10 h-16 w-full bg-white pt-4 text-center">
        BrowserStack Header
      </header>
      <SidebarNavigation
        sidebarPrimaryNavigation={SWBSidebarPri}
        wrapperClassName="bg-white pt-16 mt-5"
      />
      <main
        className={`${
          isSidebarCollapsed ? 'pl-0' : 'pl-64'
        } bg-base-50 mt-16 h-screen`}
      >
        {children}
      </main>
    </div>
  );
}

Dashboard.propTypes = {
  children: oneOfType([arrayOf(node), node, string])
};

Dashboard.defaultProps = {
  children: null
};
