import React from 'react';
import { useSelector } from 'react-redux';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
import { SidebarItem } from '@browserstack/bifrost';
import { ROUTES } from 'constants/routes';
import { PlanTypeBadge } from 'features/Paywall';
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
    pattern: ROUTES.settings_alerts,
    badge: <PlanTypeBadge />
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
    pattern: ROUTES.settings_failure_categories,
    badge: <PlanTypeBadge />
  },
  {
    id: 're_run',
    label: 'Re-run Configuration',
    activeIcon: () => <></>,
    inActiveIcon: () => <></>,
    path: getSettingsPath(projectNormalisedName, 're_run'),
    pattern: ROUTES.settings_re_run
  },
  {
    id: 'notifications',
    label: 'Notifications',
    activeIcon: () => <></>,
    inActiveIcon: () => <></>,
    path: getSettingsPath(projectNormalisedName, 'notifications'),
    pattern: ROUTES.settings_notifications
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
    // eslint-disable-next-line tailwindcss/no-arbitrary-value
    <aside className="sticky top-0 min-w-[250px] max-w-[250px] flex-1 shrink-0 pr-8">
      {getNav({
        projectNormalisedName: activeProject.normalisedName
      }).map((item) => (
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
      ))}
    </aside>
  );
}
