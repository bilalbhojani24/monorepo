// NOTE: Don't remove sidebar logic, will add once it required
import React from 'react';
import { useSelector } from 'react-redux';
import { MdOutlineHome } from '@browserstack/bifrost';
// import Sidebar from 'app/bsA11y/Sidebar';
import {
  ASBadge,
  ASSidebarItem,
  ASSidebarNavigation
} from 'middleware/bifrost';
import { arrayOf, node, oneOfType, string } from 'prop-types';

import { getSidebarCollapsedStatus } from '../slices/selectors';

export default function Dashboard({ children }) {
  const isSidebarCollapsed = useSelector(getSidebarCollapsedStatus);
  const primaryNavs = [
    {
      id: 'dashboard',
      label: 'All reports',
      activeIcon: MdOutlineHome,
      inActiveIcon: MdOutlineHome,
      path: '/dashboard'
    },
    {
      id: 'dashboard',
      label: 'Assistive tech',
      activeIcon: MdOutlineHome,
      inActiveIcon: MdOutlineHome,
      path: '/dashboard',
      badge: <ASBadge text="New" />
    }
  ];

  const SWBSidebarPri = (
    <>
      {primaryNavs.map((item, idx) => (
        <React.Fragment key={Math.random()}>
          <ASSidebarItem nav={item} current={idx === 3} />
        </React.Fragment>
      ))}
    </>
  );

  return (
    <div>
      <ASSidebarNavigation sidebarPrimaryNavigation={SWBSidebarPri} />
      <main className={`${isSidebarCollapsed ? 'pl-0' : 'pl-64'}`}>
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
