import React from 'react';
import { useSelector } from 'react-redux';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
import { SidebarItem } from '@browserstack/bifrost';
import { ROUTES } from 'constants/routes';
import { getActiveProject } from 'globalSlice/selectors';
import { getSettingsPath } from 'utils/routeUtils';

const getNav = ({ projectNormalisedName }) => [
  {
    id: 'general',
    label: 'General',
    activeIcon: () => <></>,
    inActiveIcon: () => <></>,
    path: getSettingsPath(projectNormalisedName, 'general'),
    pattern: ROUTES.settings_general
  },
  {
    id: 'alerts',
    label: 'Alerts',
    activeIcon: () => <></>,
    inActiveIcon: () => <></>,
    path: getSettingsPath(projectNormalisedName, 'alerts'),
    pattern: ROUTES.settings_alerts
  },
  {
    id: 'auto_analyser',
    label: 'Auto Failure Analysis',
    activeIcon: () => <></>,
    inActiveIcon: () => <></>,
    path: getSettingsPath(projectNormalisedName, 'auto_analyser'),
    pattern: ROUTES.settings_auto_analyser
  },
  {
    id: 'failure_categories',
    label: 'Failure Categories',
    activeIcon: () => <></>,
    inActiveIcon: () => <></>,
    path: getSettingsPath(projectNormalisedName, 'failure_categories'),
    pattern: ROUTES.settings_failure_categories
  },
  {
    id: 're_run',
    label: 'Re-run Configuration',
    activeIcon: () => <></>,
    inActiveIcon: () => <></>,
    path: getSettingsPath(projectNormalisedName, 're_run'),
    pattern: ROUTES.settings_re_run
  }
];

export default function SettingsSidebar() {
  const activeProject = useSelector(getActiveProject);
  const location = useLocation();
  const navigate = useNavigate();
  const onLinkChange = (item) => {
    navigate(item.path);
    window.scrollTo(0, 0);
  };
  return (
    <aside className="sticky top-0 max-w-xs flex-1 shrink-0 pr-8">
      {getNav({ projectNormalisedName: activeProject.normalisedName }).map(
        (item) => (
          <SidebarItem
            key={item.id}
            nav={item}
            current={
              !!matchPath(
                {
                  path: item.pattern
                },
                location.pathname
              )
            }
            handleNavigationClick={onLinkChange}
          />
        )
      )}
    </aside>
  );
}
