import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
import {
  MdOutlineBuildCircle,
  MdOutlineDataUsage,
  MdOutlineExtension,
  MdOutlineSettings,
  MdOutlineStackedLineChart,
  MdOutlineTopic,
  SidebarItem,
  SidebarNavigation
} from '@browserstack/bifrost';
import { DOC_KEY_MAPPING, WRAPPER_GAP_CLASS } from 'constants/common';
import { ROUTES } from 'constants/routes';
import { getActiveProject } from 'globalSlice/selectors';
import { getDocUrl } from 'utils/common';
import {
  getProjectBuildsPath,
  getSettingsPath,
  getSuitHealthPath,
  getTestingTrendPath
} from 'utils/routeUtils';

import ProjectSelector from '../components/ProjectSelector';

const getPrimaryNav = ({ projectNormalisedName }) => [
  {
    id: 'builds',
    label: 'Builds',
    activeIcon: MdOutlineBuildCircle,
    inActiveIcon: MdOutlineBuildCircle,
    path: getProjectBuildsPath(projectNormalisedName),
    pattern: `${ROUTES.builds}/*`
  },
  {
    id: 'suite_health',
    label: 'Suite Health',
    activeIcon: MdOutlineDataUsage,
    inActiveIcon: MdOutlineDataUsage,
    path: getSuitHealthPath(projectNormalisedName),
    pattern: ROUTES.suite_health
  },
  {
    id: 'testing_trends',
    label: 'Testing Trends',
    activeIcon: MdOutlineStackedLineChart,
    inActiveIcon: MdOutlineStackedLineChart,
    path: getTestingTrendPath(projectNormalisedName),
    pattern: ROUTES.testing_trends
  },
  {
    id: 'settings',
    label: 'Settings',
    activeIcon: MdOutlineSettings,
    inActiveIcon: MdOutlineSettings,
    path: getSettingsPath(projectNormalisedName, 'general'),
    pattern: `${ROUTES.settings}/*`
  }
];

const secondaryNav = [
  {
    id: 'integrations',
    label: 'Integrations',
    activeIcon: MdOutlineExtension,
    inActiveIcon: MdOutlineExtension,
    path: ROUTES.integrations_base,
    pattern: ROUTES.integrations_base
  },
  {
    id: 'documentation',
    label: 'Documentation',
    activeIcon: MdOutlineTopic,
    inActiveIcon: MdOutlineTopic,
    isExternalLink: true,
    path: getDocUrl({ path: DOC_KEY_MAPPING.introduction })
  }
];

export default function Sidebar() {
  const activeProject = useSelector(getActiveProject);
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
    <SidebarNavigation
      wrapperClassName={`
        md:sticky bg-white py-5 px-2 w-64 flex-none md:inset-y-16
        ${WRAPPER_GAP_CLASS}
      `}
      sidebarHeader={<ProjectSelector />}
      sidebarPrimaryNavigation={getPrimaryNav({
        projectNormalisedName: activeProject.normalisedName
      }).map((item) => (
        <SidebarItem
          key={item.id}
          nav={item}
          current={isCurrent(item)}
          handleNavigationClick={onLinkChange}
        />
      ))}
      sidebarSecondaryNavigation={secondaryNav.map((item) => (
        <SidebarItem
          key={item.id}
          nav={item}
          current={isCurrent(item)}
          handleNavigationClick={onLinkChange}
        />
      ))}
    />
  );
}
