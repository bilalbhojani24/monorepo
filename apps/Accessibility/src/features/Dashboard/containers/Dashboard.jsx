// NOTE: Don't remove sidebar logic, will add once it required
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Badge,
  Header,
  MdHome,
  MdOutlineHome,
  MdTextSnippet,
  SidebarItem,
  SidebarNavigation
} from '@browserstack/bifrost';
import { getUrlForHeader } from 'constants';
import { arrayOf, node, oneOfType, string } from 'prop-types';
import { defaultPath } from 'utils';

import { getSidebarCollapsedStatus } from '../slices/selectors';

export default function Dashboard({ children }) {
  const isSidebarCollapsed = useSelector(getSidebarCollapsedStatus);
  const [currentPath, setCurrentPath] = useState(defaultPath());
  const navigate = useNavigate();
  const primaryNav = [
    {
      id: 'report-listing',
      label: 'All reports',
      activeIcon: MdHome,
      inActiveIcon: MdOutlineHome,
      path: '/reports'
    },
    {
      id: 'screen-reader',
      label: 'Assistive tech',
      activeIcon: MdHome,
      inActiveIcon: MdOutlineHome,
      path: '/screen-reader',
      badge: <Badge text="New" />
    }
  ];

  const secondaryNav = [
    {
      id: 'doc',
      label: 'View documentation',
      activeIcon: MdTextSnippet,
      inActiveIcon: MdTextSnippet,
      path: '/reports'
    }
  ];

  const handleNavigationClick = (nav) => {
    navigate(nav.path);
    setCurrentPath(nav.id);
  };

  const SWBSidebarPri = primaryNav.map((item) => (
    <SidebarItem
      key={item.id}
      nav={item}
      current={item.id === currentPath}
      handleNavigationClick={handleNavigationClick}
    />
  ));

  const SWBSidebarSec = secondaryNav.map((item) => (
    <SidebarItem
      key={item.id}
      nav={item}
      current={item.id === currentPath}
      handleNavigationClick={handleNavigationClick}
    />
  ));

  return (
    <div>
      <Header
        wrapperClassName="fixed top-0 z-10 w-full"
        productName="Accessibility"
        headerElementArray={[
          'team',
          'pricing',
          'help',
          'search',
          'notifications',
          'account'
        ]}
        documentation={{
          title: 'Documentation',
          options: [
            {
              name: 'Introduction',
              link: getUrlForHeader('docs/accessibility/overview/introduction')
            }
          ]
        }}
        references={{
          title: 'References',
          options: [
            { name: 'WCAG 2.0', link: 'https://www.w3.org/TR/WCAG20/' },
            { name: 'WCAG 2.1', link: 'https://www.w3.org/TR/WCAG21/' }
          ]
        }}
        supportLink={getUrlForHeader('contact#other')}
        documentationLink={getUrlForHeader(
          'docs/accessibility/overview/introduction'
        )}
      />
      <SidebarNavigation
        sidebarPrimaryNavigation={SWBSidebarPri}
        sidebarSecondaryNavigation={SWBSidebarSec}
        wrapperClassName="bg-white pt-16 mt-5"
      />
      <main
        className={`${
          isSidebarCollapsed ? 'pl-0' : 'pl-64'
        } bg-base-50 mt-16 h-full`}
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
