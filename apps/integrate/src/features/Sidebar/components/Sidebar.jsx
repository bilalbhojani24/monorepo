import React, { useCallback } from 'react';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
import {
  MdOutlineClass,
  MdOutlineMap,
  MdOutlineSummarize,
  MdOutlineTrendingUp,
  SidebarItem,
  SidebarNavigation
} from '@browserstack/bifrost';

import { ROUTES } from '../../../constants/routes';

const getPrimaryNav = () => [
  {
    id: 'getting_started',
    label: 'Getting Started',
    activeIcon: MdOutlineMap,
    inActiveIcon: MdOutlineMap,
    path: ROUTES.getting_started,
    pattern: `${ROUTES.getting_started}/*`
  },
  {
    id: 'overview',
    label: 'Overview',
    activeIcon: MdOutlineTrendingUp,
    inActiveIcon: MdOutlineTrendingUp,
    path: ROUTES.overview,
    pattern: `${ROUTES.overview}/*`
  },
  {
    id: 'logs',
    label: 'Logs',
    activeIcon: MdOutlineSummarize,
    inActiveIcon: MdOutlineSummarize,
    path: ROUTES.logs,
    pattern: `${ROUTES.logs}/*`
  },
  {
    id: 'documentation',
    label: 'Documentation',
    activeIcon: MdOutlineClass,
    inActiveIcon: MdOutlineClass,
    isExternalLink: true,
    path: '/documentation'
  }
];

export default function Sidebar() {
  const navigate = useNavigate();
  const onLinkChange = (linkItem) => {
    if (linkItem?.isExternalLink) {
      window.open(linkItem.path);
      return;
    }
    navigate(linkItem.path);
    window.scrollTo(0, 0);
  };
  const location = useLocation();

  const isCurrent = useCallback(
    (item) => {
      if (item?.isExternalLink) {
        return false;
      }
      return !!matchPath(
        {
          path: item.pattern
        },
        location.pathname
      );
    },
    [location.pathname]
  );

  return (
    <nav>
      <SidebarNavigation
        wrapperClassName="md:sticky bg-white py-5 px-2 w-64 flex-none md:inset-y-16 h-full"
        sidebarPrimaryNavigation={getPrimaryNav().map((item) => (
          <SidebarItem
            key={item.id}
            nav={item}
            current={isCurrent(item)}
            handleNavigationClick={onLinkChange}
          />
        ))}
      />
    </nav>
  );
}
