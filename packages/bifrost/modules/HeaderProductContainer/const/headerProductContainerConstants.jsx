import React from 'react';

// import AccessibilityToolkitIcon from '../../Icon/HeaderIcons/AccessibilityToolkitIcon';
import AppAutomateIcon from '../../Icon/HeaderIcons/AppAutomateIcon';
import AppLiveIcon from '../../Icon/HeaderIcons/AppLiveIcon';
import AppPercyIcon from '../../Icon/HeaderIcons/AppPercyIcon';
import AutomateIcon from '../../Icon/HeaderIcons/AutomateIcon';
import LiveIcon from '../../Icon/HeaderIcons/LiveIcon';
import NightwatchIcon from '../../Icon/HeaderIcons/NightwatchIcon';
import PercyIcon from '../../Icon/HeaderIcons/PercyIcon';
import TestObservabilityIcon from '../../Icon/HeaderIcons/TestObservabilityIcon';

export const WEBSITE_TESTING_PRODUCTS = [
  {
    name: 'Live',
    description: 'Interactive cross browser testing',
    icon: <LiveIcon iconClass="w-9 h-[34px]" />,
    link: 'https://live.browserstack.com/dashboard'
  },
  {
    name: 'Automate',
    description: 'Selenium testing at scale',
    icon: <AutomateIcon iconClass="w-9 h-[34px]" />,
    link: 'https://automate.browserstack.com'
  },
  {
    name: 'Percy',
    description: 'Visual testing & review',
    icon: <PercyIcon iconClass="w-9 h-[34px]" />,
    link: 'https://percy.io/api/auth/start-sso'
  }
  // {
  //   name: 'Accessibility Toolkit',
  //   description: 'Interactive accessibility testing',
  //   icon: <AccessibilityToolkitIcon iconClass="w-9 h-[34px]" />,
  //   link: ''
  // }
];
export const MOBILE_APP_TESTING_PRODUCTS = [
  {
    name: 'App Live',
    description: 'Interactive mobile app testing',
    icon: <AppLiveIcon iconClass="w-9 h-[34px]" />,
    link: 'https://app-live.browserstack.com/dashboard'
  },
  {
    name: 'App Automate',
    description: 'Test automation for mobile apps',
    icon: <AppAutomateIcon iconClass="w-9 h-[34px]" />,
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
    name: 'Test Observability',
    description: 'Interactive cross browser testing',
    icon: <TestObservabilityIcon iconClass="w-9 h-[34px]" />,
    link: 'http://observability.browserstack.com'
  }
];
export const TEST_DEVELOPMENT_PRODUCTS = [
  {
    name: 'Nightwatch.js',
    description: 'Interactive mobile app testing',
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
