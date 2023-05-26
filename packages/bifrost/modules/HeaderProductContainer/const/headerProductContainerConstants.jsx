import React from 'react';

import AccessibilityToolkitIcon from '../../Icon/HeaderIcons/AccessibilityToolkitIcon';
import AppAutomateIcon from '../../Icon/HeaderIcons/AppAutomateIcon';
import AppLiveIcon from '../../Icon/HeaderIcons/AppLiveIcon';
import AppPercyIcon from '../../Icon/HeaderIcons/AppPercyIcon';
import AutomateIcon from '../../Icon/HeaderIcons/AutomateIcon';
import LiveIcon from '../../Icon/HeaderIcons/LiveIcon';
import NightwatchIcon from '../../Icon/HeaderIcons/NightwatchIcon';
import PercyIcon from '../../Icon/HeaderIcons/PercyIcon';
import TestManagementIcon from '../../Icon/HeaderIcons/TestManagementIcon';
import TestObservabilityIcon from '../../Icon/HeaderIcons/TestObservabilityIcon';

export const WEBSITE_TESTING_PRODUCTS = [
  {
    name: 'Live',
    description: 'Manual cross-browser testing',
    icon: <LiveIcon />,
    link: 'https://live.browserstack.com/dashboard'
  },
  {
    name: 'Automate',
    description: 'Browser automation grid',
    icon: <AutomateIcon />,
    link: 'https://automate.browserstack.com'
  },
  {
    name: 'Percy',
    description: 'Visual testing & review',
    icon: <PercyIcon iconClass="w-9 h-[34px]" />,
    link: 'https://percy.io/api/auth/start-sso'
  },
  {
    name: 'Accessibility Testing',
    description: 'Super app to find & report issues',
    icon: <AccessibilityToolkitIcon iconClass="w-9 h-[34px]" />,
    link: 'https://accessibility.browserstack.com/'
  }
];
export const MOBILE_APP_TESTING_PRODUCTS = [
  {
    name: 'App Live',
    description: 'Manual real device testing',
    icon: <AppLiveIcon />,
    link: 'https://app-live.browserstack.com/dashboard'
  },
  {
    name: 'App Automate',
    description: 'Real device automation grid',
    icon: <AppAutomateIcon />,
    link: 'https://app-automate.browserstack.com'
  },
  {
    name: 'App Percy',
    description: 'Visual testing for mobile apps',
    icon: <AppPercyIcon iconClass="w-9 h-[34px]" />,
    link: 'https://www.browserstack.com/app-percy'
  }
];
export const TEST_MANAGEMENT_PRODUCTS = [
  {
    name: 'Test Management',
    description: 'Unify & track all test cases',
    icon: <TestManagementIcon iconClass="w-9 h-[34px]" />,
    link: 'https://test-management.browserstack.com'
  },
  {
    name: 'Test Observability',
    description: 'Smart test reporting & debugging',
    icon: <TestObservabilityIcon iconClass="w-9 h-[34px]" />,
    link: 'https://observability.browserstack.com'
  }
];
export const TEST_DEVELOPMENT_PRODUCTS = [
  {
    name: 'Nightwatch.js',
    description: 'End-to-End testing framework',
    icon: <NightwatchIcon iconClass="w-9 h-[34px]" />,
    link: 'https://nightwatchjs.org/'
  }
];
export const FOR_TEAMS_PRODUCTS = [
  {
    name: 'Enterprise',
    link: 'https://www.browserstack.com/enterprise'
  }
];
export const TOOL_PRODUCTS = [
  {
    name: 'Speedlab',
    link: 'https://www.browserstack.com/speedlab/home'
  },
  {
    name: 'Screenshots',
    link: 'https://www.browserstack.com/screenshots'
  },
  {
    name: 'Responsive',
    link: 'https://www.browserstack.com/responsive'
  }
];
