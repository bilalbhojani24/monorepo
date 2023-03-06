import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
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
import { DOC_KEY_MAPPING } from 'constants/common';
import { ROUTES } from 'constants/routes';
import { setActiveNav } from 'globalSlice';
import { getActiveNav, getProjects } from 'globalSlice/selectors';
import { getDocUrl } from 'utils/common';
import {
  getProjectBuildsPath,
  getSettingsPath,
  getSuitHealthPath,
  getTestingTrendPath,
  isBuildsPage,
  isIntegrations,
  isSettingsPage,
  isSuiteHealth,
  isTestingTrendsPage
} from 'utils/routeUtils';

import ProjectSelector from '../components/ProjectSelector';

const getPrimaryNav = ({ projectNormalisedName }) => [
  {
    id: 'builds',
    label: 'Builds',
    activeIcon: MdOutlineBuildCircle,
    inActiveIcon: MdOutlineBuildCircle,
    path: getProjectBuildsPath(projectNormalisedName)
  },
  {
    id: 'suite_health',
    label: 'Suite Health',
    activeIcon: MdOutlineDataUsage,
    inActiveIcon: MdOutlineDataUsage,
    path: getSuitHealthPath(projectNormalisedName)
  },
  {
    id: 'testing_trends',
    label: 'Testing Trends',
    activeIcon: MdOutlineStackedLineChart,
    inActiveIcon: MdOutlineStackedLineChart,
    path: getTestingTrendPath(projectNormalisedName)
  },
  {
    id: 'settings',
    label: 'Settings',
    activeIcon: MdOutlineSettings,
    inActiveIcon: MdOutlineSettings,
    path: getSettingsPath(projectNormalisedName)
  }
];

const secondaryNav = [
  {
    id: 'integrations',
    label: 'Integrations',
    activeIcon: MdOutlineExtension,
    inActiveIcon: MdOutlineExtension,
    path: ROUTES.integrations_base
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
  const projects = useSelector(getProjects);
  const activeNav = useSelector(getActiveNav);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onLinkChange = (linkItem) => {
    if (linkItem?.isExternalLink) {
      window.open(linkItem.path);
      return;
    }
    if (activeNav !== linkItem.id) {
      dispatch(setActiveNav(linkItem.id));
      navigate(linkItem.path);
      window.scrollTo(0, 0);
    }
  };
  const location = useLocation();
  useEffect(() => {
    if (isBuildsPage()) {
      dispatch(setActiveNav('builds'));
    }
    if (isTestingTrendsPage()) {
      dispatch(setActiveNav('testing_trends'));
    }
    if (isSettingsPage()) {
      dispatch(setActiveNav('settings'));
    }
    if (isSuiteHealth()) {
      dispatch(setActiveNav('suite_health'));
    }
    if (isIntegrations()) {
      dispatch(setActiveNav('integrations'));
    }
  }, [dispatch, location.pathname]);

  return (
    <SidebarNavigation
      wrapperClassName="md:sticky h-[calc(100vh-4rem)] bg-white py-5 px-2 w-64 flex-none md:inset-y-16"
      sidebarHeader={<ProjectSelector />}
      sidebarPrimaryNavigation={getPrimaryNav({
        projectNormalisedName: projects.active.normalisedName
      }).map((item) => (
        <SidebarItem
          key={item.id}
          nav={item}
          current={item.id === activeNav}
          handleNavigationClick={onLinkChange}
        />
      ))}
      sidebarSecondaryNavigation={secondaryNav.map((item) => (
        <SidebarItem
          key={item.id}
          nav={item}
          current={item.id === activeNav}
          handleNavigationClick={onLinkChange}
        />
      ))}
    />
  );
}
