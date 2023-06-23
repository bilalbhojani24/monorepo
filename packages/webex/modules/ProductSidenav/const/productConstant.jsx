import React from 'react';

import AccessibilityIcon from '../icons/AccessibilityIcon';
import AppAutomateIcon from '../icons/AppAutomateIcon';
import AppLiveIcon from '../icons/AppLiveIcon';
import AutomateIcon from '../icons/AutomateIcon';
import LiveIcon from '../icons/LiveIcon';
import PercyIcon from '../icons/PercyIcon';
import TestManagementIcon from '../icons/TestManagementIcon';
import TestObservabilityIcon from '../icons/TestObservabilityIcon';

const LIVE_PRODUCT = 'Live';
const APP_LIVE_PRODUCT = 'App Live';
const ACCESSIBILITY_TESTING = 'Accessibility Testing';
const AUTOMATE_PRODUCT = 'Automate';
const PERCY_PRODUCT = 'Percy';
const APP_AUTOMATE_PRODUCT = 'App Automate';
const APP_PERCY_PRODUCT = 'App Percy';
const TEST_MANAGEMENT = 'Test Management';
const TEST_OBSERVABILITY = 'Test Observability';

export const WEB_MANUAL_TESTING = {
  title: 'MANUAL TESTING',
  products: [
    {
      name: LIVE_PRODUCT,
      icon: (props) => <LiveIcon {...props} />,
      isPlanPurchased: false,
      link: 'https://live.browserstack.com/dashboard',
      identifier: LIVE_PRODUCT
    },
    {
      name: ACCESSIBILITY_TESTING,
      icon: (props) => <AccessibilityIcon {...props} />,
      isPlanPurchased: false,
      link: 'https://accessibility.browserstack.com/',
      identifier: ACCESSIBILITY_TESTING
      // },
      // {
      //   name: 'API Testing',
      //   icon: '',
      //   isPlanPurchased: false,
      //   link: ''
    }
  ]
};

export const APP_MANUAL_TESTING = {
  title: 'MANUAL TESTING',
  products: [
    {
      name: APP_LIVE_PRODUCT,
      icon: (props) => <AppLiveIcon {...props} />,
      isPlanPurchased: false,
      link: 'https://app-live.browserstack.com/dashboard',
      identifier: APP_LIVE_PRODUCT
      // },
      // {
      //   name: ACCESSIBILITY_TESTING,
      //   icon: '',
      //   isPlanPurchased: false,
      //   link: ''
      // },
      // {
      //   name: 'Performance Testing',
      //   icon: '',
      //   isPlanPurchased: false,
      //   link: ''
      // },
      // {
      //   name: 'API Testing',
      //   icon: '',
      //   isPlanPurchased: false,
      //   link: ''
    }
  ]
};

export const WEB_TEST_AUTOMATION = {
  title: 'TEST AUTOMATION',
  products: [
    {
      name: AUTOMATE_PRODUCT,
      icon: (props) => <AutomateIcon {...props} />,
      isPlanPurchased: false,
      link: 'https://automate.browserstack.com',
      identifier: AUTOMATE_PRODUCT
    },
    {
      name: PERCY_PRODUCT,
      icon: (props) => <PercyIcon {...props} />,
      isPlanPurchased: false,
      link: 'https://percy.io/api/auth/start-sso',
      identifier: PERCY_PRODUCT
      // },
      // {
      //   name: 'Automation Grid',
      //   icon: '',
      //   isPlanPurchased: false,
      //   link: ''
      // },
      // {
      //   name: 'Accessibility Automation',
      //   icon: '',
      //   isPlanPurchased: false,
      //   link: ''
      // },
      // {
      //   name: 'API Automation',
      //   icon: '',
      //   isPlanPurchased: false,
      //   link: ''
      // },
      // {
      //   name: 'Low Code Automation',
      //   icon: '',
      //   isPlanPurchased: false,
      //   link: ''
    }
  ]
};

export const APP_TEST_AUTOMATION = {
  title: 'TEST AUTOMATION',
  products: [
    {
      name: APP_AUTOMATE_PRODUCT,
      icon: (props) => <AppAutomateIcon {...props} />,
      isPlanPurchased: false,
      link: 'https://app-automate.browserstack.com',
      identifier: APP_AUTOMATE_PRODUCT
    },
    {
      name: APP_PERCY_PRODUCT,
      icon: (props) => <PercyIcon {...props} />,
      isPlanPurchased: false,
      link: 'https://www.browserstack.com/app-percy',
      identifier: APP_PERCY_PRODUCT
      // },
      // {
      //   name: 'Accessibility Automation',
      //   icon: '',
      //   isPlanPurchased: false,
      //   link: ''
      // },
      // {
      //   name: 'Performance Automation',
      //   icon: '',
      //   isPlanPurchased: false,
      //   link: ''
      // },
      // {
      //   name: 'API Automation',
      //   icon: '',
      //   isPlanPurchased: false,
      //   link: ''
      // },
      // {
      //   name: 'Low Code Automation',
      //   icon: '',
      //   isPlanPurchased: false,
      //   link: ''
    }
  ]
};

export const TEST_MANAGEMENT_AND_OPTIMIZATION = {
  title: 'MANAGEMENT & OPTIMIZATION',
  products: [
    {
      name: TEST_MANAGEMENT,
      icon: (props) => <TestManagementIcon {...props} />,
      isPlanPurchased: false,
      link: 'https://test-management.browserstack.com',
      identifier: TEST_MANAGEMENT
    },
    {
      name: TEST_OBSERVABILITY,
      icon: (props) => <TestObservabilityIcon {...props} />,
      isPlanPurchased: false,
      link: 'https://observability.browserstack.com',
      identifier: TEST_OBSERVABILITY
    }
  ]
};

export const WEB_PRODUCTS = [
  LIVE_PRODUCT,
  ACCESSIBILITY_TESTING,
  AUTOMATE_PRODUCT,
  PERCY_PRODUCT,
  TEST_MANAGEMENT,
  TEST_OBSERVABILITY
];
export const APP_PRODUCTS = [
  APP_LIVE_PRODUCT,
  APP_AUTOMATE_PRODUCT,
  APP_PERCY_PRODUCT
];
