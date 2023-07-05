import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
import {
  ActionPanel,
  MdOutlineBuildCircle,
  MdOutlineDataUsage,
  MdOutlineExtension,
  MdOutlineRunningWithErrors,
  MdOutlineSettings,
  MdOutlineStackedLineChart,
  MdOutlineTopic,
  SidebarItem,
  SidebarNavigation
} from '@browserstack/bifrost';
import { O11yButton } from 'common/bifrostProxy';
import { DOC_KEY_MAPPING, EXTERNAL_LINKS } from 'constants/common';
import { ROUTE_PATH_KEYS, ROUTES } from 'constants/routes';
import { hideIntegrationsWidget } from 'features/IntegrationsWidget/utils';
import { getActiveProject, getHeaderSize } from 'globalSlice/selectors';
import { getDocUrl, getExternalUrl, logOllyEvent } from 'utils/common';
import {
  getPageUrlByMapping,
  getProjectBuildsPath,
  getSuitHealthTestsPath,
  getSuitHealthUniqueErrorsPath,
  getTestingTrendPath,
  isBuildsPage
} from 'utils/routeUtils';

import ProjectSelector from '../components/ProjectSelector';

const getPrimaryNav = ({ projectNormalisedName }) => [
  {
    id: 'builds',
    label: 'Build Runs',
    activeIcon: MdOutlineBuildCircle,
    inActiveIcon: MdOutlineBuildCircle,
    path: getProjectBuildsPath(projectNormalisedName),
    pattern: `${ROUTES.builds}/*`
  },
  {
    id: 'suite_health_tests',
    label: 'Tests Health',
    activeIcon: MdOutlineDataUsage,
    inActiveIcon: MdOutlineDataUsage,
    path: getSuitHealthTestsPath(projectNormalisedName),
    pattern: ROUTES.suite_health_tests
  },
  {
    id: 'suite_health_unique_errors',
    label: 'Unique Errors',
    activeIcon: MdOutlineRunningWithErrors,
    inActiveIcon: MdOutlineRunningWithErrors,
    path: getSuitHealthUniqueErrorsPath(projectNormalisedName),
    pattern: ROUTES.suite_health_unique_errors
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
    path: getPageUrlByMapping(
      projectNormalisedName,
      ROUTE_PATH_KEYS.settings_general
    ),
    pattern: `${ROUTES.settings}/*`
  }
];

const secondaryNav = [
  {
    id: 'integrations',
    label: 'Integrations',
    activeIcon: MdOutlineExtension,
    inActiveIcon: MdOutlineExtension,
    path: ROUTES.integrations,
    pattern: ROUTES.integrations
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
  const headerSize = useSelector(getHeaderSize);
  const dispatch = useDispatch();
  const activeProject = useSelector(getActiveProject);
  const navigate = useNavigate();

  const location = useLocation();

  const onLinkChange = (linkItem) => {
    if (linkItem?.isExternalLink) {
      window.open(linkItem.path);
      return;
    }

    if (!matchPath(linkItem?.pattern, location.pathname) || isBuildsPage()) {
      dispatch(hideIntegrationsWidget());
      navigate(linkItem.path);
      window.scrollTo(0, 0);
    }
  };

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

  const handleClickGetDemo = () => {
    logOllyEvent({
      event: 'O11yDemoCTAClicked',
      data: {
        source: 'sidebar',
        url: window.location.href
      }
    });
    logOllyEvent({
      event: 'ClickedGetaDemo',
      data: {
        section: 'dashboard-left-panel',
        url: window.location.href,
        signed_in: true
      }
    });
    window.open(
      getExternalUrl({ path: EXTERNAL_LINKS.getADemo }),
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <nav
      className="sticky"
      style={{
        height: `calc(100vh - ${headerSize}px)`,
        top: `${headerSize}px`
      }}
    >
      <SidebarNavigation
        wrapperClassName={`
        md:sticky bg-white pt-5 px-2 w-64 flex-none md:inset-y-16 h-full
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
        sidebarSecondaryNavigation={
          <>
            <div className="mb-4 px-3">
              <ActionPanel
                title="Have questions?"
                description="Unlock the full potential of Test Observability"
                content={
                  <O11yButton
                    colors="white"
                    size="default"
                    onClick={handleClickGetDemo}
                  >
                    Get a demo
                  </O11yButton>
                }
              />
            </div>
            {secondaryNav.map((item) => (
              <SidebarItem
                key={item.id}
                nav={item}
                current={isCurrent(item)}
                handleNavigationClick={onLinkChange}
              />
            ))}
          </>
        }
      />
    </nav>
  );
}
